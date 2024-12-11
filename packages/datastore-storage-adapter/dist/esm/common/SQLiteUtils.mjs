import { isModelAttributeAuth, isGraphQLScalarType, isModelFieldType, isTargetNameAssociation, isPredicateGroup, isPredicateObj, QueryOne, utils } from '@aws-amplify/datastore';

// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
const { USER, isNonModelConstructor, isModelConstructor } = utils;
const keysFromModel = model => Object.keys(model)
    .map(k => `"${k}"`)
    .join(', ');
const valuesFromModel = (model) => {
    const values = Object.values(model).map(prepareValueForDML);
    const paramaterized = values.map(() => '?').join(', ');
    return [paramaterized, values];
};
const updateSet = model => {
    const values = [];
    const paramaterized = Object.entries(model)
        .filter(([k]) => k !== 'id')
        .map(([k, v]) => {
        values.push(prepareValueForDML(v));
        return `"${k}"=?`;
    })
        .join(', ');
    return [paramaterized, values];
};
function prepareValueForDML(value) {
    const scalarTypes = ['string', 'number', 'boolean'];
    const isScalarType = value === null || value === undefined || scalarTypes.includes(typeof value);
    if (isScalarType) {
        return value;
    }
    const isObjectType = typeof value === 'object' &&
        (Object.getPrototypeOf(value).constructor === Object ||
            isNonModelConstructor(Object.getPrototypeOf(value).constructor) ||
            isModelConstructor(Object.getPrototypeOf(value).constructor));
    if (Array.isArray(value) || isObjectType) {
        return JSON.stringify(value);
    }
    return `${value}`;
}
function getSQLiteType(scalar) {
    switch (scalar) {
        case 'Boolean':
        case 'Int':
        case 'AWSTimestamp':
            return 'INTEGER';
        case 'ID':
        case 'String':
        case 'AWSDate':
        case 'AWSTime':
        case 'AWSDateTime':
        case 'AWSEmail':
        case 'AWSJSON':
        case 'AWSURL':
        case 'AWSPhone':
        case 'AWSIPAddress':
            return 'TEXT';
        case 'Float':
            return 'REAL';
        default: {
            throw new Error(`unknown type ${scalar}`);
        }
    }
}
function generateSchemaStatements(schema) {
    return Object.keys(schema.namespaces).flatMap(namespaceName => {
        const namespace = schema.namespaces[namespaceName];
        const isUserModel = namespaceName === USER;
        return Object.values(namespace.models).map(model => modelCreateTableStatement(model, isUserModel));
    });
}
const implicitAuthFieldsForModel = (model) => {
    if (!model.attributes || !model.attributes.length) {
        return [];
    }
    const authRules = model.attributes.find(isModelAttributeAuth);
    if (!authRules) {
        return [];
    }
    const authFieldsForModel = authRules.properties.rules
        .filter((rule) => rule.ownerField || rule.groupsField)
        .map((rule) => rule.ownerField || rule.groupsField);
    return authFieldsForModel.filter((authField) => {
        const authFieldExplicitlyDefined = Object.values(model.fields).find((f) => f.name === authField);
        return !authFieldExplicitlyDefined;
    });
};
function modelCreateTableStatement(model, userModel = false) {
    // implicitly defined auth fields, e.g., `owner`, `groupsField`, etc.
    const implicitAuthFields = implicitAuthFieldsForModel(model);
    let fields = Object.values(model.fields).reduce((acc, field) => {
        if (isGraphQLScalarType(field.type)) {
            if (field.name === 'id') {
                return [...acc, '"id" PRIMARY KEY NOT NULL'];
            }
            let columnParam = `"${field.name}" ${getSQLiteType(field.type)}`;
            if (field.isRequired) {
                columnParam += ' NOT NULL';
            }
            return [...acc, `${columnParam}`];
        }
        if (isModelFieldType(field.type)) {
            let columnParam = `"${field.name}" TEXT`;
            // add targetName as well as field name for BELONGS_TO relations
            if (isTargetNameAssociation(field.association)) {
                // check if this field has been explicitly defined in the model
                const fkDefinedInModel = Object.values(model.fields).find((f) => f.name === field?.association?.targetName);
                // if the FK is not explicitly defined in the model, we have to add it here
                if (!fkDefinedInModel) {
                    const required = field.isRequired ? ' NOT NULL' : '';
                    columnParam += `, "${field.association.targetName}" TEXT${required}`;
                }
            }
            // ignore isRequired param for model fields, since they will not contain
            // the related data locally
            return [...acc, `${columnParam}`];
        }
        // default to TEXT
        let columnParam = `"${field.name}" TEXT`;
        if (field.isRequired) {
            columnParam += ' NOT NULL';
        }
        return [...acc, `${columnParam}`];
    }, []);
    implicitAuthFields.forEach((authField) => {
        fields.push(`${authField} TEXT`);
    });
    if (userModel) {
        fields = [
            ...fields,
            `"_version" INTEGER`,
            `"_lastChangedAt" INTEGER`,
            `"_deleted" INTEGER`,
        ];
    }
    const createTableStatement = `CREATE TABLE IF NOT EXISTS "${model.name}" (${fields.join(', ')});`;
    return createTableStatement;
}
function modelInsertStatement(model, tableName) {
    const keys = keysFromModel(model);
    const [paramaterized, values] = valuesFromModel(model);
    const insertStatement = `INSERT INTO "${tableName}" (${keys}) VALUES (${paramaterized})`;
    return [insertStatement, values];
}
function modelUpdateStatement(model, tableName) {
    const [paramaterized, values] = updateSet(model);
    const updateStatement = `UPDATE "${tableName}" SET ${paramaterized} WHERE id=?`;
    return [updateStatement, [...values, model.id]];
}
function queryByIdStatement(id, tableName) {
    return [`SELECT * FROM "${tableName}" WHERE "id" = ?`, [id]];
}
/*
    Predicates supported by DataStore:

    Strings: eq | ne | le | lt | ge | gt | contains | notContains | beginsWith | between
    Numbers: eq | ne | le | lt | ge | gt | between
    Lists: contains | notContains
*/
const comparisonOperatorMap = {
    eq: '=',
    ne: '!=',
    le: '<=',
    lt: '<',
    ge: '>=',
    gt: '>',
};
const logicalOperatorMap = {
    beginsWith: '= 1',
    contains: '> 0',
    notContains: '= 0',
    between: 'BETWEEN',
};
/**
 * If the given (operator, operand) indicate the need for a special `NULL` comparison,
 * that `WHERE` clause condition will be returned. If not special `NULL` handling is
 * needed, `null` will be returned, and the caller should construct the `WHERE`
 * clause component using the normal operator map(s) and parameterization.
 *
 * @param operator "beginsWith" | "contains" | "notContains" | "between"
 * | "eq" | "ne" | "le" | "lt" | "ge" | "gt"
 * @param operand any
 * @returns (string | null) The `WHERE` clause component or `null` if N/A.
 */
function buildSpecialNullComparison(field, operator, operand) {
    if (operand === null || operand === undefined) {
        if (operator === 'eq') {
            return `"${field}" IS NULL`;
        }
        else if (operator === 'ne') {
            return `"${field}" IS NOT NULL`;
        }
    }
    // no special null handling required
    return null;
}
const whereConditionFromPredicateObject = ({ field, operator, operand, }) => {
    const specialNullClause = buildSpecialNullComparison(field, operator, operand);
    if (specialNullClause) {
        return [specialNullClause, []];
    }
    const comparisonOperator = comparisonOperatorMap[operator];
    if (comparisonOperator) {
        return [`"${field}" ${comparisonOperator} ?`, [operand]];
    }
    const logicalOperatorKey = operator;
    const logicalOperator = logicalOperatorMap[logicalOperatorKey];
    let statement;
    if (logicalOperator) {
        let rightExp = [];
        switch (logicalOperatorKey) {
            case 'between':
                rightExp = operand; // operand is a 2-tuple
                statement = [
                    `"${field}" ${logicalOperator} ${rightExp
                        .map(_ => '?')
                        .join(' AND ')}`,
                    rightExp,
                ];
                break;
            case 'beginsWith':
            case 'contains':
            case 'notContains':
                statement = [`instr("${field}", ?) ${logicalOperator}`, [operand]];
                break;
            default: {
                // Incorrect WHERE clause can result in data loss
                throw new Error('Cannot map predicate to a valid WHERE clause');
            }
        }
        return statement;
    }
};
function whereClauseFromPredicate(predicate) {
    const result = [];
    const params = [];
    recurse(predicate, result, params);
    const whereClause = `WHERE ${result.join(' ')}`;
    return [whereClause, params];
    function recurse(recursedPredicate, recursedResult = [], recursedParams = []) {
        if (isPredicateGroup(recursedPredicate)) {
            const { type: groupType, predicates: groupPredicates } = recursedPredicate;
            let filterType = '';
            let isNegation = false;
            switch (groupType) {
                case 'not':
                    isNegation = true;
                    break;
                case 'and':
                    filterType = 'AND';
                    break;
                case 'or':
                    filterType = 'OR';
                    break;
                default: {
                    throw new Error(`Invalid ${groupType}`);
                }
            }
            const groupResult = [];
            for (const p of groupPredicates) {
                recurse(p, groupResult, recursedParams);
            }
            recursedResult.push(`${isNegation ? 'NOT' : ''}(${groupResult.join(` ${filterType} `)})`);
        }
        else if (isPredicateObj(recursedPredicate)) {
            const [condition, conditionParams] = whereConditionFromPredicateObject(recursedPredicate);
            recursedResult.push(condition);
            recursedParams.push(...conditionParams);
        }
    }
}
const sortDirectionMap = {
    ASCENDING: 'ASC',
    DESCENDING: 'DESC',
};
function orderByClauseFromSort(sortPredicate = []) {
    const orderByParts = sortPredicate.map(({ field, sortDirection }) => `"${String(field)}" ${sortDirectionMap[sortDirection]}`);
    // We always sort by _rowid_ last
    orderByParts.push(`_rowid_ ${sortDirectionMap.ASCENDING}`);
    return `ORDER BY ${orderByParts.join(', ')}`;
}
function limitClauseFromPagination(limit, page = 0) {
    const params = [limit];
    let clause = 'LIMIT ?';
    if (page) {
        const offset = limit * page;
        params.push(offset);
        clause += ' OFFSET ?';
    }
    return [clause, params];
}
function queryAllStatement(tableName, predicate, sort, limit, page) {
    let statement = `SELECT * FROM "${tableName}"`;
    const params = [];
    if (predicate && predicate.predicates.length) {
        const [whereClause, whereParams] = whereClauseFromPredicate(predicate);
        statement += ` ${whereClause}`;
        params.push(...whereParams);
    }
    const orderByClause = orderByClauseFromSort(sort);
    statement += ` ${orderByClause}`;
    if (limit) {
        const [limitClause, limitParams] = limitClauseFromPagination(limit, page);
        statement += ` ${limitClause}`;
        params.push(...limitParams);
    }
    return [statement, params];
}
function queryOneStatement(firstOrLast, tableName) {
    if (firstOrLast === QueryOne.FIRST) {
        // ORDER BY rowid will no longer work as expected if a customer has
        // a field by that name in their schema. We may want to enforce it
        // as a reserved keyword in Codegen
        return [`SELECT * FROM ${tableName} ORDER BY _rowid_ LIMIT 1`, []];
    }
    else {
        return [`SELECT * FROM ${tableName} ORDER BY _rowid_ DESC LIMIT 1`, []];
    }
}
function deleteByIdStatement(id, tableName) {
    const deleteStatement = `DELETE FROM "${tableName}" WHERE "id"=?`;
    return [deleteStatement, [id]];
}
function deleteByPredicateStatement(tableName, predicate) {
    let statement = `DELETE FROM "${tableName}"`;
    const params = [];
    if (predicate && predicate.predicates.length) {
        const [whereClause, whereParams] = whereClauseFromPredicate(predicate);
        statement += ` ${whereClause}`;
        params.push(...whereParams);
    }
    return [statement, params];
}

export { deleteByIdStatement, deleteByPredicateStatement, generateSchemaStatements, getSQLiteType, implicitAuthFieldsForModel, limitClauseFromPagination, modelCreateTableStatement, modelInsertStatement, modelUpdateStatement, orderByClauseFromSort, queryAllStatement, queryByIdStatement, queryOneStatement, whereClauseFromPredicate, whereConditionFromPredicateObject };
//# sourceMappingURL=SQLiteUtils.mjs.map
