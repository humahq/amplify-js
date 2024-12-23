'use strict';

Object.defineProperty(exports, "__esModule", { value: true });
exports.AmazonLocationServiceProvider = void 0;
const tslib_1 = require("tslib");
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
const camelcase_keys_1 = tslib_1.__importDefault(require("camelcase-keys"));
const core_1 = require("@aws-amplify/core");
const utils_1 = require("@aws-amplify/core/internals/utils");
const client_location_1 = require("@aws-sdk/client-location");
const util_1 = require("../../util");
const logger = new core_1.ConsoleLogger('AmazonLocationServiceProvider');
class AmazonLocationServiceProvider {
    /**
     * Initialize Geo with AWS configurations
     * @param {Object} config - Configuration object for Geo
     */
    constructor(config) {
        this._config = config || {};
        logger.debug('Geo Options', this._config);
    }
    /**
     * get the category of the plugin
     * @returns {string} name of the category
     */
    getCategory() {
        return AmazonLocationServiceProvider.CATEGORY;
    }
    /**
     * get provider name of the plugin
     * @returns {string} name of the provider
     */
    getProviderName() {
        return AmazonLocationServiceProvider.PROVIDER_NAME;
    }
    /**
     * Get the map resources that are currently available through the provider
     * @returns {AmazonLocationServiceMapStyle[]}- Array of available map resources
     */
    getAvailableMaps() {
        this._verifyMapResources();
        const mapStyles = [];
        const availableMaps = this._config.maps.items;
        const { region } = this._config;
        for (const mapName in availableMaps) {
            const { style } = availableMaps[mapName];
            mapStyles.push({ mapName, style, region });
        }
        return mapStyles;
    }
    /**
     * Get the map resource set as default in amplify config
     * @returns {AmazonLocationServiceMapStyle} - Map resource set as the default in amplify config
     */
    getDefaultMap() {
        this._verifyMapResources();
        const mapName = this._config.maps.default;
        const { style } = this._config.maps.items[mapName];
        const { region } = this._config;
        return { mapName, style, region };
    }
    /**
     * Search by text input with optional parameters
     * @param  {string} text The text string that is to be searched for
     * @param  {SearchByTextOptions} options Optional parameters to the search
     * @returns {Promise<Place[]>} - Promise resolves to a list of Places that match search parameters
     */
    async searchByText(text, options) {
        const credentialsOK = await this._ensureCredentials();
        if (!credentialsOK) {
            throw new Error('No credentials');
        }
        this._verifySearchIndex(options?.searchIndexName);
        /**
         * Setup the searchInput
         */
        let locationServiceInput = {
            Text: text,
            IndexName: this._config.searchIndices.default,
        };
        /**
         * Map search options to Amazon Location Service input object
         */
        if (options) {
            locationServiceInput = {
                ...locationServiceInput,
                ...(0, util_1.mapSearchOptions)(options, locationServiceInput),
            };
        }
        const client = new client_location_1.LocationClient({
            credentials: this._credentials,
            region: this._config.region,
            customUserAgent: (0, util_1.getGeoUserAgent)(utils_1.GeoAction.SearchByText),
        });
        const command = new client_location_1.SearchPlaceIndexForTextCommand(locationServiceInput);
        let response;
        try {
            response = await client.send(command);
        }
        catch (error) {
            logger.debug(error);
            throw error;
        }
        /**
         * The response from Amazon Location Service is a "Results" array of objects with a single `Place` item,
         * which are Place objects in PascalCase.
         * Here we want to flatten that to an array of results and change them to camelCase
         */
        const PascalResults = response.Results.map(result => result.Place);
        const results = (0, camelcase_keys_1.default)(PascalResults, {
            deep: true,
        });
        return results;
    }
    /**
     * Search for suggestions based on the input text
     * @param  {string} text The text string that is to be searched for
     * @param  {SearchByTextOptions} options Optional parameters to the search
     * @returns {Promise<SearchForSuggestionsResults>} - Resolves to an array of search suggestion strings
     */
    async searchForSuggestions(text, options) {
        const credentialsOK = await this._ensureCredentials();
        if (!credentialsOK) {
            throw new Error('No credentials');
        }
        this._verifySearchIndex(options?.searchIndexName);
        /**
         * Setup the searchInput
         */
        let locationServiceInput = {
            Text: text,
            IndexName: this._config.searchIndices.default,
        };
        /**
         * Map search options to Amazon Location Service input object
         */
        if (options) {
            locationServiceInput = {
                ...locationServiceInput,
                ...(0, util_1.mapSearchOptions)(options, locationServiceInput),
            };
        }
        const client = new client_location_1.LocationClient({
            credentials: this._credentials,
            region: this._config.region,
            customUserAgent: (0, util_1.getGeoUserAgent)(utils_1.GeoAction.SearchForSuggestions),
        });
        const command = new client_location_1.SearchPlaceIndexForSuggestionsCommand(locationServiceInput);
        let response;
        try {
            response = await client.send(command);
        }
        catch (error) {
            logger.debug(error);
            throw error;
        }
        /**
         * The response from Amazon Location Service is a "Results" array of objects with `Text` and `PlaceId`.
         */
        const results = response.Results.map(result => ({
            text: result.Text,
            placeId: result.PlaceId,
        }));
        return results;
    }
    _verifyPlaceId(placeId) {
        if (placeId.length === 0) {
            const errorString = 'PlaceId cannot be an empty string.';
            logger.debug(errorString);
            throw new Error(errorString);
        }
    }
    async searchByPlaceId(placeId, options) {
        const credentialsOK = await this._ensureCredentials();
        if (!credentialsOK) {
            throw new Error('No credentials');
        }
        this._verifySearchIndex(options?.searchIndexName);
        this._verifyPlaceId(placeId);
        const client = new client_location_1.LocationClient({
            credentials: this._credentials,
            region: this._config.region,
            customUserAgent: (0, util_1.getGeoUserAgent)(utils_1.GeoAction.SearchByPlaceId),
        });
        const searchByPlaceIdInput = {
            PlaceId: placeId,
            IndexName: options?.searchIndexName || this._config.searchIndices.default,
        };
        const command = new client_location_1.GetPlaceCommand(searchByPlaceIdInput);
        let response;
        try {
            response = await client.send(command);
        }
        catch (error) {
            logger.debug(error);
            throw error;
        }
        const place = response.Place;
        if (place) {
            return (0, camelcase_keys_1.default)(place, { deep: true });
        }
    }
    /**
     * Reverse geocoding search via a coordinate point on the map
     * @param coordinates Coordinates array for the search input
     * @param options Options parameters for the search
     * @returns {Promise<Place>} - Promise that resolves to a place matching search coordinates
     */
    async searchByCoordinates(coordinates, options) {
        const credentialsOK = await this._ensureCredentials();
        if (!credentialsOK) {
            throw new Error('No credentials');
        }
        this._verifySearchIndex(options?.searchIndexName);
        const locationServiceInput = {
            Position: coordinates,
            IndexName: this._config.searchIndices.default,
        };
        if (options) {
            if (options.searchIndexName) {
                locationServiceInput.IndexName = options.searchIndexName;
            }
            locationServiceInput.MaxResults = options.maxResults;
        }
        const client = new client_location_1.LocationClient({
            credentials: this._credentials,
            region: this._config.region,
            customUserAgent: (0, util_1.getGeoUserAgent)(utils_1.GeoAction.SearchByCoordinates),
        });
        const command = new client_location_1.SearchPlaceIndexForPositionCommand(locationServiceInput);
        let response;
        try {
            response = await client.send(command);
        }
        catch (error) {
            logger.debug(error);
            throw error;
        }
        /**
         * The response from Amazon Location Service is a "Results" array with a single `Place` object
         * which are Place objects in PascalCase.
         * Here we want to flatten that to an array of results and change them to camelCase
         */
        const PascalResults = response.Results.map(result => result.Place);
        const results = (0, camelcase_keys_1.default)(PascalResults[0], {
            deep: true,
        });
        return results;
    }
    /**
     * Create geofences inside of a geofence collection
     * @param geofences Array of geofence objects to create
     * @param options Optional parameters for creating geofences
     * @returns a promise that resolves to an object that conforms to {@link SaveGeofencesResults}:
     *   successes: list of geofences successfully created
     *   errors: list of geofences that failed to create
     */
    async saveGeofences(geofences, options) {
        if (geofences.length < 1) {
            throw new Error('Geofence input array is empty');
        }
        const credentialsOK = await this._ensureCredentials();
        if (!credentialsOK) {
            throw new Error('No credentials');
        }
        // Verify geofence collection exists in aws-config.js
        try {
            this._verifyGeofenceCollections(options?.collectionName);
        }
        catch (error) {
            logger.debug(error);
            throw error;
        }
        (0, util_1.validateGeofencesInput)(geofences);
        // Convert geofences to PascalCase for Amazon Location Service format
        const PascalGeofences = geofences.map(({ geofenceId, geometry: { polygon } }) => {
            return {
                GeofenceId: geofenceId,
                Geometry: {
                    Polygon: polygon,
                },
            };
        });
        const results = {
            successes: [],
            errors: [],
        };
        const geofenceBatches = [];
        while (PascalGeofences.length > 0) {
            // Splice off 10 geofences from input clone due to Amazon Location Service API limit
            const apiLimit = 10;
            geofenceBatches.push(PascalGeofences.splice(0, apiLimit));
        }
        await Promise.all(geofenceBatches.map(async (batch) => {
            // Make API call for the 10 geofences
            let response;
            try {
                response = await this._AmazonLocationServiceBatchPutGeofenceCall(batch, options?.collectionName || this._config.geofenceCollections.default);
            }
            catch (error) {
                // If the API call fails, add the geofences to the errors array and move to next batch
                batch.forEach(geofence => {
                    results.errors.push({
                        geofenceId: geofence.GeofenceId,
                        error: {
                            code: 'APIConnectionError',
                            message: error.message,
                        },
                    });
                });
                return;
            }
            // Push all successes to results
            response.Successes?.forEach(success => {
                const { GeofenceId: geofenceId, CreateTime, UpdateTime } = success;
                results.successes.push({
                    geofenceId: geofenceId,
                    createTime: CreateTime,
                    updateTime: UpdateTime,
                });
            });
            // Push all errors to results
            response.Errors?.forEach(error => {
                const { Error, GeofenceId: geofenceId } = error;
                const { Code, Message } = Error;
                results.errors.push({
                    error: {
                        code: Code,
                        message: Message,
                    },
                    geofenceId: geofenceId,
                });
            });
        }));
        return results;
    }
    /**
     * Get geofence from a geofence collection
     * @param geofenceId string
     * @param options Optional parameters for getGeofence
     * @returns {Promise<AmazonLocationServiceGeofence>} - Promise that resolves to a geofence object
     */
    async getGeofence(geofenceId, options) {
        const credentialsOK = await this._ensureCredentials();
        if (!credentialsOK) {
            throw new Error('No credentials');
        }
        // Verify geofence collection exists in aws-config.js
        try {
            this._verifyGeofenceCollections(options?.collectionName);
        }
        catch (error) {
            logger.debug(error);
            throw error;
        }
        (0, util_1.validateGeofenceId)(geofenceId);
        // Create Amazon Location Service Client
        const client = new client_location_1.LocationClient({
            credentials: this._credentials,
            region: this._config.region,
            customUserAgent: (0, util_1.getGeoUserAgent)(utils_1.GeoAction.GetGeofence),
        });
        // Create Amazon Location Service command
        const commandInput = {
            GeofenceId: geofenceId,
            CollectionName: options?.collectionName || this._config.geofenceCollections.default,
        };
        const command = new client_location_1.GetGeofenceCommand(commandInput);
        // Make API call
        let response;
        try {
            response = await client.send(command);
        }
        catch (error) {
            logger.debug(error);
            throw error;
        }
        // Convert response to camelCase for return
        const { GeofenceId: responseGeofenceId, CreateTime, UpdateTime, Status, Geometry, } = response;
        const geofence = {
            createTime: CreateTime,
            geofenceId: responseGeofenceId,
            geometry: {
                polygon: Geometry.Polygon,
            },
            status: Status,
            updateTime: UpdateTime,
        };
        return geofence;
    }
    /**
     * List geofences from a geofence collection
     * @param  options ListGeofenceOptions
     * @returns a promise that resolves to an object that conforms to {@link ListGeofenceResults}:
     *   entries: list of geofences - 100 geofences are listed per page
     *   nextToken: token for next page of geofences
     */
    async listGeofences(options) {
        const credentialsOK = await this._ensureCredentials();
        if (!credentialsOK) {
            throw new Error('No credentials');
        }
        // Verify geofence collection exists in aws-config.js
        try {
            this._verifyGeofenceCollections(options?.collectionName);
        }
        catch (error) {
            logger.debug(error);
            throw error;
        }
        // Create Amazon Location Service Client
        const client = new client_location_1.LocationClient({
            credentials: this._credentials,
            region: this._config.region,
            customUserAgent: (0, util_1.getGeoUserAgent)(utils_1.GeoAction.ListGeofences),
        });
        // Create Amazon Location Service input
        const listGeofencesInput = {
            NextToken: options?.nextToken,
            CollectionName: options?.collectionName || this._config.geofenceCollections.default,
        };
        // Create Amazon Location Service command
        const command = new client_location_1.ListGeofencesCommand(listGeofencesInput);
        // Make API call
        let response;
        try {
            response = await client.send(command);
        }
        catch (error) {
            logger.debug(error);
            throw error;
        }
        // Convert response to camelCase for return
        const { NextToken, Entries } = response;
        const results = {
            entries: Entries.map(({ GeofenceId: geofenceId, CreateTime, UpdateTime, Status, Geometry, }) => {
                return {
                    geofenceId: geofenceId,
                    createTime: CreateTime,
                    updateTime: UpdateTime,
                    status: Status,
                    geometry: {
                        polygon: Geometry.Polygon,
                    },
                };
            }),
            nextToken: NextToken,
        };
        return results;
    }
    /**
     * Delete geofences from a geofence collection
     * @param geofenceIds string|string[]
     * @param options GeofenceOptions
     * @returns a promise that resolves to an object that conforms to {@link AmazonLocationServiceDeleteGeofencesResults}:
     *  successes: list of geofences successfully deleted
     *  errors: list of geofences that failed to delete
     */
    async deleteGeofences(geofenceIds, options) {
        if (geofenceIds.length < 1) {
            throw new Error('GeofenceId input array is empty');
        }
        const credentialsOK = await this._ensureCredentials();
        if (!credentialsOK) {
            throw new Error('No credentials');
        }
        this._verifyGeofenceCollections(options?.collectionName);
        // Validate all geofenceIds are valid
        const badGeofenceIds = geofenceIds.filter(geofenceId => {
            try {
                (0, util_1.validateGeofenceId)(geofenceId);
            }
            catch (error) {
                return true;
            }
            return false;
        });
        if (badGeofenceIds.length > 0) {
            throw new Error(`Invalid geofence ids: ${badGeofenceIds.join(', ')}`);
        }
        const results = {
            successes: [],
            errors: [],
        };
        const geofenceIdBatches = [];
        let count = 0;
        while (count < geofenceIds.length) {
            geofenceIdBatches.push(geofenceIds.slice(count, (count += 10)));
        }
        await Promise.all(geofenceIdBatches.map(async (batch) => {
            let response;
            try {
                response = await this._AmazonLocationServiceBatchDeleteGeofenceCall(batch, options?.collectionName || this._config.geofenceCollections.default);
            }
            catch (error) {
                // If the API call fails, add the geofences to the errors array and move to next batch
                batch.forEach(geofenceId => {
                    const errorObject = {
                        geofenceId,
                        error: {
                            code: error
                                .message,
                            message: error
                                .message,
                        },
                    };
                    results.errors.push(errorObject);
                });
                return;
            }
            const targetBadGeofenceIds = response.Errors.map(({ geofenceId }) => geofenceId);
            results.successes.push(...batch.filter(Id => !targetBadGeofenceIds.includes(Id)));
        }));
        return results;
    }
    /**
     * @private
     */
    async _ensureCredentials() {
        try {
            const { credentials } = await (0, core_1.fetchAuthSession)();
            if (!credentials)
                return false;
            logger.debug('Set credentials for storage. Credentials are:', credentials);
            this._credentials = credentials;
            return true;
        }
        catch (error) {
            logger.debug('Ensure credentials error. Credentials are:', error);
            return false;
        }
    }
    _refreshConfig() {
        this._config = core_1.Amplify.getConfig().Geo?.LocationService;
        if (!this._config) {
            const errorString = "No Geo configuration found in amplify config, run 'amplify add geo' to create one and run `amplify push` after";
            logger.debug(errorString);
            throw new Error(errorString);
        }
    }
    _verifyMapResources() {
        this._refreshConfig();
        if (!this._config.maps) {
            const errorString = "No map resources found in amplify config, run 'amplify add geo' to create one and run `amplify push` after";
            logger.debug(errorString);
            throw new Error(errorString);
        }
        if (!this._config.maps.default) {
            const errorString = "No default map resource found in amplify config, run 'amplify add geo' to create one and run `amplify push` after";
            logger.debug(errorString);
            throw new Error(errorString);
        }
    }
    _verifySearchIndex(optionalSearchIndex) {
        this._refreshConfig();
        if ((!this._config.searchIndices || !this._config.searchIndices.default) &&
            !optionalSearchIndex) {
            const errorString = 'No Search Index found in amplify config, please run `amplify add geo` to create one and run `amplify push` after.';
            logger.debug(errorString);
            throw new Error(errorString);
        }
    }
    _verifyGeofenceCollections(optionalGeofenceCollectionName) {
        this._refreshConfig();
        if ((!this._config.geofenceCollections ||
            !this._config.geofenceCollections.default) &&
            !optionalGeofenceCollectionName) {
            const errorString = 'No Geofence Collections found, please run `amplify add geo` to create one and run `amplify push` after.';
            logger.debug(errorString);
            throw new Error(errorString);
        }
    }
    async _AmazonLocationServiceBatchPutGeofenceCall(PascalGeofences, collectionName) {
        // Create the BatchPutGeofence input
        const geofenceInput = {
            Entries: PascalGeofences,
            CollectionName: collectionName || this._config.geofenceCollections.default,
        };
        const client = new client_location_1.LocationClient({
            credentials: this._credentials,
            region: this._config.region,
            customUserAgent: (0, util_1.getGeoUserAgent)(utils_1.GeoAction.SaveGeofences),
        });
        const command = new client_location_1.BatchPutGeofenceCommand(geofenceInput);
        return client.send(command);
    }
    async _AmazonLocationServiceBatchDeleteGeofenceCall(geofenceIds, collectionName) {
        // Create the BatchDeleteGeofence input
        const deleteGeofencesInput = {
            GeofenceIds: geofenceIds,
            CollectionName: collectionName || this._config.geofenceCollections.default,
        };
        const client = new client_location_1.LocationClient({
            credentials: this._credentials,
            region: this._config.region,
            customUserAgent: (0, util_1.getGeoUserAgent)(utils_1.GeoAction.DeleteGeofences),
        });
        const command = new client_location_1.BatchDeleteGeofenceCommand(deleteGeofencesInput);
        return client.send(command);
    }
}
exports.AmazonLocationServiceProvider = AmazonLocationServiceProvider;
AmazonLocationServiceProvider.CATEGORY = 'Geo';
AmazonLocationServiceProvider.PROVIDER_NAME = 'AmazonLocationService';
//# sourceMappingURL=AmazonLocationServiceProvider.js.map
