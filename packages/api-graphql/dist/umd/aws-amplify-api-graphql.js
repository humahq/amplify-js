(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("aws_amplify_core"), require("graphql"));
	else if(typeof define === 'function' && define.amd)
		define("aws_amplify_api-graphql", ["aws_amplify_core", "graphql"], factory);
	else if(typeof exports === 'object')
		exports["aws_amplify_api-graphql"] = factory(require("aws_amplify_core"), require("graphql"));
	else
		root["aws_amplify_api-graphql"] = factory(root["aws_amplify_core"], root["graphql"]);
})(self, (__WEBPACK_EXTERNAL_MODULE__aws_amplify_core__, __WEBPACK_EXTERNAL_MODULE_graphql__) => {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "../../node_modules/@aws-crypto/sha256-js/build/module/RawSha256.js":
/*!**************************************************************************!*\
  !*** ../../node_modules/@aws-crypto/sha256-js/build/module/RawSha256.js ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   RawSha256: () => (/* binding */ RawSha256)
/* harmony export */ });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants */ "../../node_modules/@aws-crypto/sha256-js/build/module/constants.js");

/**
 * @internal
 */
var RawSha256 = /** @class */ (function () {
    function RawSha256() {
        this.state = Int32Array.from(_constants__WEBPACK_IMPORTED_MODULE_0__.INIT);
        this.temp = new Int32Array(64);
        this.buffer = new Uint8Array(64);
        this.bufferLength = 0;
        this.bytesHashed = 0;
        /**
         * @internal
         */
        this.finished = false;
    }
    RawSha256.prototype.update = function (data) {
        if (this.finished) {
            throw new Error("Attempted to update an already finished hash.");
        }
        var position = 0;
        var byteLength = data.byteLength;
        this.bytesHashed += byteLength;
        if (this.bytesHashed * 8 > _constants__WEBPACK_IMPORTED_MODULE_0__.MAX_HASHABLE_LENGTH) {
            throw new Error("Cannot hash more than 2^53 - 1 bits");
        }
        while (byteLength > 0) {
            this.buffer[this.bufferLength++] = data[position++];
            byteLength--;
            if (this.bufferLength === _constants__WEBPACK_IMPORTED_MODULE_0__.BLOCK_SIZE) {
                this.hashBuffer();
                this.bufferLength = 0;
            }
        }
    };
    RawSha256.prototype.digest = function () {
        if (!this.finished) {
            var bitsHashed = this.bytesHashed * 8;
            var bufferView = new DataView(this.buffer.buffer, this.buffer.byteOffset, this.buffer.byteLength);
            var undecoratedLength = this.bufferLength;
            bufferView.setUint8(this.bufferLength++, 0x80);
            // Ensure the final block has enough room for the hashed length
            if (undecoratedLength % _constants__WEBPACK_IMPORTED_MODULE_0__.BLOCK_SIZE >= _constants__WEBPACK_IMPORTED_MODULE_0__.BLOCK_SIZE - 8) {
                for (var i = this.bufferLength; i < _constants__WEBPACK_IMPORTED_MODULE_0__.BLOCK_SIZE; i++) {
                    bufferView.setUint8(i, 0);
                }
                this.hashBuffer();
                this.bufferLength = 0;
            }
            for (var i = this.bufferLength; i < _constants__WEBPACK_IMPORTED_MODULE_0__.BLOCK_SIZE - 8; i++) {
                bufferView.setUint8(i, 0);
            }
            bufferView.setUint32(_constants__WEBPACK_IMPORTED_MODULE_0__.BLOCK_SIZE - 8, Math.floor(bitsHashed / 0x100000000), true);
            bufferView.setUint32(_constants__WEBPACK_IMPORTED_MODULE_0__.BLOCK_SIZE - 4, bitsHashed);
            this.hashBuffer();
            this.finished = true;
        }
        // The value in state is little-endian rather than big-endian, so flip
        // each word into a new Uint8Array
        var out = new Uint8Array(_constants__WEBPACK_IMPORTED_MODULE_0__.DIGEST_LENGTH);
        for (var i = 0; i < 8; i++) {
            out[i * 4] = (this.state[i] >>> 24) & 0xff;
            out[i * 4 + 1] = (this.state[i] >>> 16) & 0xff;
            out[i * 4 + 2] = (this.state[i] >>> 8) & 0xff;
            out[i * 4 + 3] = (this.state[i] >>> 0) & 0xff;
        }
        return out;
    };
    RawSha256.prototype.hashBuffer = function () {
        var _a = this, buffer = _a.buffer, state = _a.state;
        var state0 = state[0], state1 = state[1], state2 = state[2], state3 = state[3], state4 = state[4], state5 = state[5], state6 = state[6], state7 = state[7];
        for (var i = 0; i < _constants__WEBPACK_IMPORTED_MODULE_0__.BLOCK_SIZE; i++) {
            if (i < 16) {
                this.temp[i] =
                    ((buffer[i * 4] & 0xff) << 24) |
                        ((buffer[i * 4 + 1] & 0xff) << 16) |
                        ((buffer[i * 4 + 2] & 0xff) << 8) |
                        (buffer[i * 4 + 3] & 0xff);
            }
            else {
                var u = this.temp[i - 2];
                var t1_1 = ((u >>> 17) | (u << 15)) ^ ((u >>> 19) | (u << 13)) ^ (u >>> 10);
                u = this.temp[i - 15];
                var t2_1 = ((u >>> 7) | (u << 25)) ^ ((u >>> 18) | (u << 14)) ^ (u >>> 3);
                this.temp[i] =
                    ((t1_1 + this.temp[i - 7]) | 0) + ((t2_1 + this.temp[i - 16]) | 0);
            }
            var t1 = ((((((state4 >>> 6) | (state4 << 26)) ^
                ((state4 >>> 11) | (state4 << 21)) ^
                ((state4 >>> 25) | (state4 << 7))) +
                ((state4 & state5) ^ (~state4 & state6))) |
                0) +
                ((state7 + ((_constants__WEBPACK_IMPORTED_MODULE_0__.KEY[i] + this.temp[i]) | 0)) | 0)) |
                0;
            var t2 = ((((state0 >>> 2) | (state0 << 30)) ^
                ((state0 >>> 13) | (state0 << 19)) ^
                ((state0 >>> 22) | (state0 << 10))) +
                ((state0 & state1) ^ (state0 & state2) ^ (state1 & state2))) |
                0;
            state7 = state6;
            state6 = state5;
            state5 = state4;
            state4 = (state3 + t1) | 0;
            state3 = state2;
            state2 = state1;
            state1 = state0;
            state0 = (t1 + t2) | 0;
        }
        state[0] += state0;
        state[1] += state1;
        state[2] += state2;
        state[3] += state3;
        state[4] += state4;
        state[5] += state5;
        state[6] += state6;
        state[7] += state7;
    };
    return RawSha256;
}());

//# sourceMappingURL=RawSha256.js.map

/***/ }),

/***/ "../../node_modules/@aws-crypto/sha256-js/build/module/constants.js":
/*!**************************************************************************!*\
  !*** ../../node_modules/@aws-crypto/sha256-js/build/module/constants.js ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BLOCK_SIZE: () => (/* binding */ BLOCK_SIZE),
/* harmony export */   DIGEST_LENGTH: () => (/* binding */ DIGEST_LENGTH),
/* harmony export */   INIT: () => (/* binding */ INIT),
/* harmony export */   KEY: () => (/* binding */ KEY),
/* harmony export */   MAX_HASHABLE_LENGTH: () => (/* binding */ MAX_HASHABLE_LENGTH)
/* harmony export */ });
/**
 * @internal
 */
var BLOCK_SIZE = 64;
/**
 * @internal
 */
var DIGEST_LENGTH = 32;
/**
 * @internal
 */
var KEY = new Uint32Array([
    0x428a2f98,
    0x71374491,
    0xb5c0fbcf,
    0xe9b5dba5,
    0x3956c25b,
    0x59f111f1,
    0x923f82a4,
    0xab1c5ed5,
    0xd807aa98,
    0x12835b01,
    0x243185be,
    0x550c7dc3,
    0x72be5d74,
    0x80deb1fe,
    0x9bdc06a7,
    0xc19bf174,
    0xe49b69c1,
    0xefbe4786,
    0x0fc19dc6,
    0x240ca1cc,
    0x2de92c6f,
    0x4a7484aa,
    0x5cb0a9dc,
    0x76f988da,
    0x983e5152,
    0xa831c66d,
    0xb00327c8,
    0xbf597fc7,
    0xc6e00bf3,
    0xd5a79147,
    0x06ca6351,
    0x14292967,
    0x27b70a85,
    0x2e1b2138,
    0x4d2c6dfc,
    0x53380d13,
    0x650a7354,
    0x766a0abb,
    0x81c2c92e,
    0x92722c85,
    0xa2bfe8a1,
    0xa81a664b,
    0xc24b8b70,
    0xc76c51a3,
    0xd192e819,
    0xd6990624,
    0xf40e3585,
    0x106aa070,
    0x19a4c116,
    0x1e376c08,
    0x2748774c,
    0x34b0bcb5,
    0x391c0cb3,
    0x4ed8aa4a,
    0x5b9cca4f,
    0x682e6ff3,
    0x748f82ee,
    0x78a5636f,
    0x84c87814,
    0x8cc70208,
    0x90befffa,
    0xa4506ceb,
    0xbef9a3f7,
    0xc67178f2
]);
/**
 * @internal
 */
var INIT = [
    0x6a09e667,
    0xbb67ae85,
    0x3c6ef372,
    0xa54ff53a,
    0x510e527f,
    0x9b05688c,
    0x1f83d9ab,
    0x5be0cd19
];
/**
 * @internal
 */
var MAX_HASHABLE_LENGTH = Math.pow(2, 53) - 1;
//# sourceMappingURL=constants.js.map

/***/ }),

/***/ "../../node_modules/@aws-crypto/sha256-js/build/module/index.js":
/*!**********************************************************************!*\
  !*** ../../node_modules/@aws-crypto/sha256-js/build/module/index.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Sha256: () => (/* reexport safe */ _jsSha256__WEBPACK_IMPORTED_MODULE_0__.Sha256)
/* harmony export */ });
/* harmony import */ var _jsSha256__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./jsSha256 */ "../../node_modules/@aws-crypto/sha256-js/build/module/jsSha256.js");

//# sourceMappingURL=index.js.map

/***/ }),

/***/ "../../node_modules/@aws-crypto/sha256-js/build/module/jsSha256.js":
/*!*************************************************************************!*\
  !*** ../../node_modules/@aws-crypto/sha256-js/build/module/jsSha256.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Sha256: () => (/* binding */ Sha256)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.mjs");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants */ "../../node_modules/@aws-crypto/sha256-js/build/module/constants.js");
/* harmony import */ var _RawSha256__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./RawSha256 */ "../../node_modules/@aws-crypto/sha256-js/build/module/RawSha256.js");
/* harmony import */ var _aws_crypto_util__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @aws-crypto/util */ "../../node_modules/@aws-crypto/util/build/module/index.js");




var Sha256 = /** @class */ (function () {
    function Sha256(secret) {
        this.secret = secret;
        this.hash = new _RawSha256__WEBPACK_IMPORTED_MODULE_1__.RawSha256();
        this.reset();
    }
    Sha256.prototype.update = function (toHash) {
        if ((0,_aws_crypto_util__WEBPACK_IMPORTED_MODULE_2__.isEmptyData)(toHash) || this.error) {
            return;
        }
        try {
            this.hash.update((0,_aws_crypto_util__WEBPACK_IMPORTED_MODULE_2__.convertToBuffer)(toHash));
        }
        catch (e) {
            this.error = e;
        }
    };
    /* This synchronous method keeps compatibility
     * with the v2 aws-sdk.
     */
    Sha256.prototype.digestSync = function () {
        if (this.error) {
            throw this.error;
        }
        if (this.outer) {
            if (!this.outer.finished) {
                this.outer.update(this.hash.digest());
            }
            return this.outer.digest();
        }
        return this.hash.digest();
    };
    /* The underlying digest method here is synchronous.
     * To keep the same interface with the other hash functions
     * the default is to expose this as an async method.
     * However, it can sometimes be useful to have a sync method.
     */
    Sha256.prototype.digest = function () {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__awaiter)(this, void 0, void 0, function () {
            return (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__generator)(this, function (_a) {
                return [2 /*return*/, this.digestSync()];
            });
        });
    };
    Sha256.prototype.reset = function () {
        this.hash = new _RawSha256__WEBPACK_IMPORTED_MODULE_1__.RawSha256();
        if (this.secret) {
            this.outer = new _RawSha256__WEBPACK_IMPORTED_MODULE_1__.RawSha256();
            var inner = bufferFromSecret(this.secret);
            var outer = new Uint8Array(_constants__WEBPACK_IMPORTED_MODULE_0__.BLOCK_SIZE);
            outer.set(inner);
            for (var i = 0; i < _constants__WEBPACK_IMPORTED_MODULE_0__.BLOCK_SIZE; i++) {
                inner[i] ^= 0x36;
                outer[i] ^= 0x5c;
            }
            this.hash.update(inner);
            this.outer.update(outer);
            // overwrite the copied key in memory
            for (var i = 0; i < inner.byteLength; i++) {
                inner[i] = 0;
            }
        }
    };
    return Sha256;
}());

function bufferFromSecret(secret) {
    var input = (0,_aws_crypto_util__WEBPACK_IMPORTED_MODULE_2__.convertToBuffer)(secret);
    if (input.byteLength > _constants__WEBPACK_IMPORTED_MODULE_0__.BLOCK_SIZE) {
        var bufferHash = new _RawSha256__WEBPACK_IMPORTED_MODULE_1__.RawSha256();
        bufferHash.update(input);
        input = bufferHash.digest();
    }
    var buffer = new Uint8Array(_constants__WEBPACK_IMPORTED_MODULE_0__.BLOCK_SIZE);
    buffer.set(input);
    return buffer;
}
//# sourceMappingURL=jsSha256.js.map

/***/ }),

/***/ "../../node_modules/@aws-crypto/util/build/module/convertToBuffer.js":
/*!***************************************************************************!*\
  !*** ../../node_modules/@aws-crypto/util/build/module/convertToBuffer.js ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   convertToBuffer: () => (/* binding */ convertToBuffer)
/* harmony export */ });
/* harmony import */ var _smithy_util_utf8__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @smithy/util-utf8 */ "../../node_modules/@aws-crypto/util/node_modules/@smithy/util-utf8/dist-es/index.js");
// Copyright Amazon.com Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

// Quick polyfill
var fromUtf8 = typeof Buffer !== "undefined" && Buffer.from
    ? function (input) { return Buffer.from(input, "utf8"); }
    : _smithy_util_utf8__WEBPACK_IMPORTED_MODULE_0__.fromUtf8;
function convertToBuffer(data) {
    // Already a Uint8, do nothing
    if (data instanceof Uint8Array)
        return data;
    if (typeof data === "string") {
        return fromUtf8(data);
    }
    if (ArrayBuffer.isView(data)) {
        return new Uint8Array(data.buffer, data.byteOffset, data.byteLength / Uint8Array.BYTES_PER_ELEMENT);
    }
    return new Uint8Array(data);
}
//# sourceMappingURL=convertToBuffer.js.map

/***/ }),

/***/ "../../node_modules/@aws-crypto/util/build/module/index.js":
/*!*****************************************************************!*\
  !*** ../../node_modules/@aws-crypto/util/build/module/index.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   convertToBuffer: () => (/* reexport safe */ _convertToBuffer__WEBPACK_IMPORTED_MODULE_0__.convertToBuffer),
/* harmony export */   isEmptyData: () => (/* reexport safe */ _isEmptyData__WEBPACK_IMPORTED_MODULE_1__.isEmptyData),
/* harmony export */   numToUint8: () => (/* reexport safe */ _numToUint8__WEBPACK_IMPORTED_MODULE_2__.numToUint8),
/* harmony export */   uint32ArrayFrom: () => (/* reexport safe */ _uint32ArrayFrom__WEBPACK_IMPORTED_MODULE_3__.uint32ArrayFrom)
/* harmony export */ });
/* harmony import */ var _convertToBuffer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./convertToBuffer */ "../../node_modules/@aws-crypto/util/build/module/convertToBuffer.js");
/* harmony import */ var _isEmptyData__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./isEmptyData */ "../../node_modules/@aws-crypto/util/build/module/isEmptyData.js");
/* harmony import */ var _numToUint8__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./numToUint8 */ "../../node_modules/@aws-crypto/util/build/module/numToUint8.js");
/* harmony import */ var _uint32ArrayFrom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./uint32ArrayFrom */ "../../node_modules/@aws-crypto/util/build/module/uint32ArrayFrom.js");
// Copyright Amazon.com Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0




//# sourceMappingURL=index.js.map

/***/ }),

/***/ "../../node_modules/@aws-crypto/util/build/module/isEmptyData.js":
/*!***********************************************************************!*\
  !*** ../../node_modules/@aws-crypto/util/build/module/isEmptyData.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   isEmptyData: () => (/* binding */ isEmptyData)
/* harmony export */ });
// Copyright Amazon.com Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
function isEmptyData(data) {
    if (typeof data === "string") {
        return data.length === 0;
    }
    return data.byteLength === 0;
}
//# sourceMappingURL=isEmptyData.js.map

/***/ }),

/***/ "../../node_modules/@aws-crypto/util/build/module/numToUint8.js":
/*!**********************************************************************!*\
  !*** ../../node_modules/@aws-crypto/util/build/module/numToUint8.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   numToUint8: () => (/* binding */ numToUint8)
/* harmony export */ });
// Copyright Amazon.com Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
function numToUint8(num) {
    return new Uint8Array([
        (num & 0xff000000) >> 24,
        (num & 0x00ff0000) >> 16,
        (num & 0x0000ff00) >> 8,
        num & 0x000000ff,
    ]);
}
//# sourceMappingURL=numToUint8.js.map

/***/ }),

/***/ "../../node_modules/@aws-crypto/util/build/module/uint32ArrayFrom.js":
/*!***************************************************************************!*\
  !*** ../../node_modules/@aws-crypto/util/build/module/uint32ArrayFrom.js ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   uint32ArrayFrom: () => (/* binding */ uint32ArrayFrom)
/* harmony export */ });
// Copyright Amazon.com Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
// IE 11 does not support Array.from, so we do it manually
function uint32ArrayFrom(a_lookUpTable) {
    if (!Uint32Array.from) {
        var return_array = new Uint32Array(a_lookUpTable.length);
        var a_index = 0;
        while (a_index < a_lookUpTable.length) {
            return_array[a_index] = a_lookUpTable[a_index];
            a_index += 1;
        }
        return return_array;
    }
    return Uint32Array.from(a_lookUpTable);
}
//# sourceMappingURL=uint32ArrayFrom.js.map

/***/ }),

/***/ "../../node_modules/@aws-crypto/util/node_modules/@smithy/util-utf8/dist-es/fromUtf8.browser.js":
/*!******************************************************************************************************!*\
  !*** ../../node_modules/@aws-crypto/util/node_modules/@smithy/util-utf8/dist-es/fromUtf8.browser.js ***!
  \******************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   fromUtf8: () => (/* binding */ fromUtf8)
/* harmony export */ });
const fromUtf8 = (input) => new TextEncoder().encode(input);


/***/ }),

/***/ "../../node_modules/@aws-crypto/util/node_modules/@smithy/util-utf8/dist-es/index.js":
/*!*******************************************************************************************!*\
  !*** ../../node_modules/@aws-crypto/util/node_modules/@smithy/util-utf8/dist-es/index.js ***!
  \*******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   fromUtf8: () => (/* reexport safe */ _fromUtf8__WEBPACK_IMPORTED_MODULE_0__.fromUtf8),
/* harmony export */   toUint8Array: () => (/* reexport safe */ _toUint8Array__WEBPACK_IMPORTED_MODULE_1__.toUint8Array),
/* harmony export */   toUtf8: () => (/* reexport safe */ _toUtf8__WEBPACK_IMPORTED_MODULE_2__.toUtf8)
/* harmony export */ });
/* harmony import */ var _fromUtf8__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./fromUtf8 */ "../../node_modules/@aws-crypto/util/node_modules/@smithy/util-utf8/dist-es/fromUtf8.browser.js");
/* harmony import */ var _toUint8Array__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./toUint8Array */ "../../node_modules/@aws-crypto/util/node_modules/@smithy/util-utf8/dist-es/toUint8Array.js");
/* harmony import */ var _toUtf8__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./toUtf8 */ "../../node_modules/@aws-crypto/util/node_modules/@smithy/util-utf8/dist-es/toUtf8.browser.js");





/***/ }),

/***/ "../../node_modules/@aws-crypto/util/node_modules/@smithy/util-utf8/dist-es/toUint8Array.js":
/*!**************************************************************************************************!*\
  !*** ../../node_modules/@aws-crypto/util/node_modules/@smithy/util-utf8/dist-es/toUint8Array.js ***!
  \**************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   toUint8Array: () => (/* binding */ toUint8Array)
/* harmony export */ });
/* harmony import */ var _fromUtf8__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./fromUtf8 */ "../../node_modules/@aws-crypto/util/node_modules/@smithy/util-utf8/dist-es/fromUtf8.browser.js");

const toUint8Array = (data) => {
    if (typeof data === "string") {
        return (0,_fromUtf8__WEBPACK_IMPORTED_MODULE_0__.fromUtf8)(data);
    }
    if (ArrayBuffer.isView(data)) {
        return new Uint8Array(data.buffer, data.byteOffset, data.byteLength / Uint8Array.BYTES_PER_ELEMENT);
    }
    return new Uint8Array(data);
};


/***/ }),

/***/ "../../node_modules/@aws-crypto/util/node_modules/@smithy/util-utf8/dist-es/toUtf8.browser.js":
/*!****************************************************************************************************!*\
  !*** ../../node_modules/@aws-crypto/util/node_modules/@smithy/util-utf8/dist-es/toUtf8.browser.js ***!
  \****************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   toUtf8: () => (/* binding */ toUtf8)
/* harmony export */ });
const toUtf8 = (input) => {
    if (typeof input === "string") {
        return input;
    }
    if (typeof input !== "object" || typeof input.byteOffset !== "number" || typeof input.byteLength !== "number") {
        throw new Error("@smithy/util-utf8: toUtf8 encoder function only accepts string | Uint8Array.");
    }
    return new TextDecoder("utf-8").decode(input);
};


/***/ }),

/***/ "../../node_modules/@smithy/util-base64/dist-es/constants.browser.js":
/*!***************************************************************************!*\
  !*** ../../node_modules/@smithy/util-base64/dist-es/constants.browser.js ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   alphabetByEncoding: () => (/* binding */ alphabetByEncoding),
/* harmony export */   alphabetByValue: () => (/* binding */ alphabetByValue),
/* harmony export */   bitsPerByte: () => (/* binding */ bitsPerByte),
/* harmony export */   bitsPerLetter: () => (/* binding */ bitsPerLetter),
/* harmony export */   maxLetterValue: () => (/* binding */ maxLetterValue)
/* harmony export */ });
const alphabetByEncoding = {};
const alphabetByValue = new Array(64);
for (let i = 0, start = "A".charCodeAt(0), limit = "Z".charCodeAt(0); i + start <= limit; i++) {
    const char = String.fromCharCode(i + start);
    alphabetByEncoding[char] = i;
    alphabetByValue[i] = char;
}
for (let i = 0, start = "a".charCodeAt(0), limit = "z".charCodeAt(0); i + start <= limit; i++) {
    const char = String.fromCharCode(i + start);
    const index = i + 26;
    alphabetByEncoding[char] = index;
    alphabetByValue[index] = char;
}
for (let i = 0; i < 10; i++) {
    alphabetByEncoding[i.toString(10)] = i + 52;
    const char = i.toString(10);
    const index = i + 52;
    alphabetByEncoding[char] = index;
    alphabetByValue[index] = char;
}
alphabetByEncoding["+"] = 62;
alphabetByValue[62] = "+";
alphabetByEncoding["/"] = 63;
alphabetByValue[63] = "/";
const bitsPerLetter = 6;
const bitsPerByte = 8;
const maxLetterValue = 0b111111;



/***/ }),

/***/ "../../node_modules/@smithy/util-base64/dist-es/fromBase64.browser.js":
/*!****************************************************************************!*\
  !*** ../../node_modules/@smithy/util-base64/dist-es/fromBase64.browser.js ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   fromBase64: () => (/* binding */ fromBase64)
/* harmony export */ });
/* harmony import */ var _constants_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants.browser */ "../../node_modules/@smithy/util-base64/dist-es/constants.browser.js");

const fromBase64 = (input) => {
    let totalByteLength = (input.length / 4) * 3;
    if (input.slice(-2) === "==") {
        totalByteLength -= 2;
    }
    else if (input.slice(-1) === "=") {
        totalByteLength--;
    }
    const out = new ArrayBuffer(totalByteLength);
    const dataView = new DataView(out);
    for (let i = 0; i < input.length; i += 4) {
        let bits = 0;
        let bitLength = 0;
        for (let j = i, limit = i + 3; j <= limit; j++) {
            if (input[j] !== "=") {
                if (!(input[j] in _constants_browser__WEBPACK_IMPORTED_MODULE_0__.alphabetByEncoding)) {
                    throw new TypeError(`Invalid character ${input[j]} in base64 string.`);
                }
                bits |= _constants_browser__WEBPACK_IMPORTED_MODULE_0__.alphabetByEncoding[input[j]] << ((limit - j) * _constants_browser__WEBPACK_IMPORTED_MODULE_0__.bitsPerLetter);
                bitLength += _constants_browser__WEBPACK_IMPORTED_MODULE_0__.bitsPerLetter;
            }
            else {
                bits >>= _constants_browser__WEBPACK_IMPORTED_MODULE_0__.bitsPerLetter;
            }
        }
        const chunkOffset = (i / 4) * 3;
        bits >>= bitLength % _constants_browser__WEBPACK_IMPORTED_MODULE_0__.bitsPerByte;
        const byteLength = Math.floor(bitLength / _constants_browser__WEBPACK_IMPORTED_MODULE_0__.bitsPerByte);
        for (let k = 0; k < byteLength; k++) {
            const offset = (byteLength - k - 1) * _constants_browser__WEBPACK_IMPORTED_MODULE_0__.bitsPerByte;
            dataView.setUint8(chunkOffset + k, (bits & (255 << offset)) >> offset);
        }
    }
    return new Uint8Array(out);
};


/***/ }),

/***/ "../../node_modules/@smithy/util-base64/dist-es/index.js":
/*!***************************************************************!*\
  !*** ../../node_modules/@smithy/util-base64/dist-es/index.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   fromBase64: () => (/* reexport safe */ _fromBase64__WEBPACK_IMPORTED_MODULE_0__.fromBase64),
/* harmony export */   toBase64: () => (/* reexport safe */ _toBase64__WEBPACK_IMPORTED_MODULE_1__.toBase64)
/* harmony export */ });
/* harmony import */ var _fromBase64__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./fromBase64 */ "../../node_modules/@smithy/util-base64/dist-es/fromBase64.browser.js");
/* harmony import */ var _toBase64__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./toBase64 */ "../../node_modules/@smithy/util-base64/dist-es/toBase64.browser.js");




/***/ }),

/***/ "../../node_modules/@smithy/util-base64/dist-es/toBase64.browser.js":
/*!**************************************************************************!*\
  !*** ../../node_modules/@smithy/util-base64/dist-es/toBase64.browser.js ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   toBase64: () => (/* binding */ toBase64)
/* harmony export */ });
/* harmony import */ var _smithy_util_utf8__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @smithy/util-utf8 */ "../../node_modules/@smithy/util-utf8/dist-es/index.js");
/* harmony import */ var _constants_browser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./constants.browser */ "../../node_modules/@smithy/util-base64/dist-es/constants.browser.js");


function toBase64(_input) {
    let input;
    if (typeof _input === "string") {
        input = (0,_smithy_util_utf8__WEBPACK_IMPORTED_MODULE_0__.fromUtf8)(_input);
    }
    else {
        input = _input;
    }
    const isArrayLike = typeof input === "object" && typeof input.length === "number";
    const isUint8Array = typeof input === "object" &&
        typeof input.byteOffset === "number" &&
        typeof input.byteLength === "number";
    if (!isArrayLike && !isUint8Array) {
        throw new Error("@smithy/util-base64: toBase64 encoder function only accepts string | Uint8Array.");
    }
    let str = "";
    for (let i = 0; i < input.length; i += 3) {
        let bits = 0;
        let bitLength = 0;
        for (let j = i, limit = Math.min(i + 3, input.length); j < limit; j++) {
            bits |= input[j] << ((limit - j - 1) * _constants_browser__WEBPACK_IMPORTED_MODULE_1__.bitsPerByte);
            bitLength += _constants_browser__WEBPACK_IMPORTED_MODULE_1__.bitsPerByte;
        }
        const bitClusterCount = Math.ceil(bitLength / _constants_browser__WEBPACK_IMPORTED_MODULE_1__.bitsPerLetter);
        bits <<= bitClusterCount * _constants_browser__WEBPACK_IMPORTED_MODULE_1__.bitsPerLetter - bitLength;
        for (let k = 1; k <= bitClusterCount; k++) {
            const offset = (bitClusterCount - k) * _constants_browser__WEBPACK_IMPORTED_MODULE_1__.bitsPerLetter;
            str += _constants_browser__WEBPACK_IMPORTED_MODULE_1__.alphabetByValue[(bits & (_constants_browser__WEBPACK_IMPORTED_MODULE_1__.maxLetterValue << offset)) >> offset];
        }
        str += "==".slice(0, 4 - bitClusterCount);
    }
    return str;
}


/***/ }),

/***/ "../../node_modules/@smithy/util-utf8/dist-es/fromUtf8.browser.js":
/*!************************************************************************!*\
  !*** ../../node_modules/@smithy/util-utf8/dist-es/fromUtf8.browser.js ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   fromUtf8: () => (/* binding */ fromUtf8)
/* harmony export */ });
const fromUtf8 = (input) => new TextEncoder().encode(input);


/***/ }),

/***/ "../../node_modules/@smithy/util-utf8/dist-es/index.js":
/*!*************************************************************!*\
  !*** ../../node_modules/@smithy/util-utf8/dist-es/index.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   fromUtf8: () => (/* reexport safe */ _fromUtf8__WEBPACK_IMPORTED_MODULE_0__.fromUtf8),
/* harmony export */   toUint8Array: () => (/* reexport safe */ _toUint8Array__WEBPACK_IMPORTED_MODULE_1__.toUint8Array),
/* harmony export */   toUtf8: () => (/* reexport safe */ _toUtf8__WEBPACK_IMPORTED_MODULE_2__.toUtf8)
/* harmony export */ });
/* harmony import */ var _fromUtf8__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./fromUtf8 */ "../../node_modules/@smithy/util-utf8/dist-es/fromUtf8.browser.js");
/* harmony import */ var _toUint8Array__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./toUint8Array */ "../../node_modules/@smithy/util-utf8/dist-es/toUint8Array.js");
/* harmony import */ var _toUtf8__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./toUtf8 */ "../../node_modules/@smithy/util-utf8/dist-es/toUtf8.browser.js");





/***/ }),

/***/ "../../node_modules/@smithy/util-utf8/dist-es/toUint8Array.js":
/*!********************************************************************!*\
  !*** ../../node_modules/@smithy/util-utf8/dist-es/toUint8Array.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   toUint8Array: () => (/* binding */ toUint8Array)
/* harmony export */ });
/* harmony import */ var _fromUtf8__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./fromUtf8 */ "../../node_modules/@smithy/util-utf8/dist-es/fromUtf8.browser.js");

const toUint8Array = (data) => {
    if (typeof data === "string") {
        return (0,_fromUtf8__WEBPACK_IMPORTED_MODULE_0__.fromUtf8)(data);
    }
    if (ArrayBuffer.isView(data)) {
        return new Uint8Array(data.buffer, data.byteOffset, data.byteLength / Uint8Array.BYTES_PER_ELEMENT);
    }
    return new Uint8Array(data);
};


/***/ }),

/***/ "../../node_modules/@smithy/util-utf8/dist-es/toUtf8.browser.js":
/*!**********************************************************************!*\
  !*** ../../node_modules/@smithy/util-utf8/dist-es/toUtf8.browser.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   toUtf8: () => (/* binding */ toUtf8)
/* harmony export */ });
const toUtf8 = (input) => {
    if (typeof input === "string") {
        return input;
    }
    if (typeof input !== "object" || typeof input.byteOffset !== "number" || typeof input.byteLength !== "number") {
        throw new Error("@smithy/util-utf8: toUtf8 encoder function only accepts string | Uint8Array.");
    }
    return new TextDecoder("utf-8").decode(input);
};


/***/ }),

/***/ "../../node_modules/rxjs/dist/esm5/internal/NotificationFactories.js":
/*!***************************************************************************!*\
  !*** ../../node_modules/rxjs/dist/esm5/internal/NotificationFactories.js ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   COMPLETE_NOTIFICATION: () => (/* binding */ COMPLETE_NOTIFICATION),
/* harmony export */   createNotification: () => (/* binding */ createNotification),
/* harmony export */   errorNotification: () => (/* binding */ errorNotification),
/* harmony export */   nextNotification: () => (/* binding */ nextNotification)
/* harmony export */ });
var COMPLETE_NOTIFICATION = (function () { return createNotification('C', undefined, undefined); })();
function errorNotification(error) {
    return createNotification('E', undefined, error);
}
function nextNotification(value) {
    return createNotification('N', value, undefined);
}
function createNotification(kind, value, error) {
    return {
        kind: kind,
        value: value,
        error: error,
    };
}
//# sourceMappingURL=NotificationFactories.js.map

/***/ }),

/***/ "../../node_modules/rxjs/dist/esm5/internal/Observable.js":
/*!****************************************************************!*\
  !*** ../../node_modules/rxjs/dist/esm5/internal/Observable.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Observable: () => (/* binding */ Observable)
/* harmony export */ });
/* harmony import */ var _Subscriber__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Subscriber */ "../../node_modules/rxjs/dist/esm5/internal/Subscriber.js");
/* harmony import */ var _Subscription__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Subscription */ "../../node_modules/rxjs/dist/esm5/internal/Subscription.js");
/* harmony import */ var _symbol_observable__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./symbol/observable */ "../../node_modules/rxjs/dist/esm5/internal/symbol/observable.js");
/* harmony import */ var _util_pipe__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./util/pipe */ "../../node_modules/rxjs/dist/esm5/internal/util/pipe.js");
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./config */ "../../node_modules/rxjs/dist/esm5/internal/config.js");
/* harmony import */ var _util_isFunction__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./util/isFunction */ "../../node_modules/rxjs/dist/esm5/internal/util/isFunction.js");
/* harmony import */ var _util_errorContext__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./util/errorContext */ "../../node_modules/rxjs/dist/esm5/internal/util/errorContext.js");







var Observable = (function () {
    function Observable(subscribe) {
        if (subscribe) {
            this._subscribe = subscribe;
        }
    }
    Observable.prototype.lift = function (operator) {
        var observable = new Observable();
        observable.source = this;
        observable.operator = operator;
        return observable;
    };
    Observable.prototype.subscribe = function (observerOrNext, error, complete) {
        var _this = this;
        var subscriber = isSubscriber(observerOrNext) ? observerOrNext : new _Subscriber__WEBPACK_IMPORTED_MODULE_0__.SafeSubscriber(observerOrNext, error, complete);
        (0,_util_errorContext__WEBPACK_IMPORTED_MODULE_1__.errorContext)(function () {
            var _a = _this, operator = _a.operator, source = _a.source;
            subscriber.add(operator
                ?
                    operator.call(subscriber, source)
                : source
                    ?
                        _this._subscribe(subscriber)
                    :
                        _this._trySubscribe(subscriber));
        });
        return subscriber;
    };
    Observable.prototype._trySubscribe = function (sink) {
        try {
            return this._subscribe(sink);
        }
        catch (err) {
            sink.error(err);
        }
    };
    Observable.prototype.forEach = function (next, promiseCtor) {
        var _this = this;
        promiseCtor = getPromiseCtor(promiseCtor);
        return new promiseCtor(function (resolve, reject) {
            var subscriber = new _Subscriber__WEBPACK_IMPORTED_MODULE_0__.SafeSubscriber({
                next: function (value) {
                    try {
                        next(value);
                    }
                    catch (err) {
                        reject(err);
                        subscriber.unsubscribe();
                    }
                },
                error: reject,
                complete: resolve,
            });
            _this.subscribe(subscriber);
        });
    };
    Observable.prototype._subscribe = function (subscriber) {
        var _a;
        return (_a = this.source) === null || _a === void 0 ? void 0 : _a.subscribe(subscriber);
    };
    Observable.prototype[_symbol_observable__WEBPACK_IMPORTED_MODULE_2__.observable] = function () {
        return this;
    };
    Observable.prototype.pipe = function () {
        var operations = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            operations[_i] = arguments[_i];
        }
        return (0,_util_pipe__WEBPACK_IMPORTED_MODULE_3__.pipeFromArray)(operations)(this);
    };
    Observable.prototype.toPromise = function (promiseCtor) {
        var _this = this;
        promiseCtor = getPromiseCtor(promiseCtor);
        return new promiseCtor(function (resolve, reject) {
            var value;
            _this.subscribe(function (x) { return (value = x); }, function (err) { return reject(err); }, function () { return resolve(value); });
        });
    };
    Observable.create = function (subscribe) {
        return new Observable(subscribe);
    };
    return Observable;
}());

function getPromiseCtor(promiseCtor) {
    var _a;
    return (_a = promiseCtor !== null && promiseCtor !== void 0 ? promiseCtor : _config__WEBPACK_IMPORTED_MODULE_4__.config.Promise) !== null && _a !== void 0 ? _a : Promise;
}
function isObserver(value) {
    return value && (0,_util_isFunction__WEBPACK_IMPORTED_MODULE_5__.isFunction)(value.next) && (0,_util_isFunction__WEBPACK_IMPORTED_MODULE_5__.isFunction)(value.error) && (0,_util_isFunction__WEBPACK_IMPORTED_MODULE_5__.isFunction)(value.complete);
}
function isSubscriber(value) {
    return (value && value instanceof _Subscriber__WEBPACK_IMPORTED_MODULE_0__.Subscriber) || (isObserver(value) && (0,_Subscription__WEBPACK_IMPORTED_MODULE_6__.isSubscription)(value));
}
//# sourceMappingURL=Observable.js.map

/***/ }),

/***/ "../../node_modules/rxjs/dist/esm5/internal/Subscriber.js":
/*!****************************************************************!*\
  !*** ../../node_modules/rxjs/dist/esm5/internal/Subscriber.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   EMPTY_OBSERVER: () => (/* binding */ EMPTY_OBSERVER),
/* harmony export */   SafeSubscriber: () => (/* binding */ SafeSubscriber),
/* harmony export */   Subscriber: () => (/* binding */ Subscriber)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.mjs");
/* harmony import */ var _util_isFunction__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./util/isFunction */ "../../node_modules/rxjs/dist/esm5/internal/util/isFunction.js");
/* harmony import */ var _Subscription__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Subscription */ "../../node_modules/rxjs/dist/esm5/internal/Subscription.js");
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./config */ "../../node_modules/rxjs/dist/esm5/internal/config.js");
/* harmony import */ var _util_reportUnhandledError__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./util/reportUnhandledError */ "../../node_modules/rxjs/dist/esm5/internal/util/reportUnhandledError.js");
/* harmony import */ var _util_noop__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./util/noop */ "../../node_modules/rxjs/dist/esm5/internal/util/noop.js");
/* harmony import */ var _NotificationFactories__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./NotificationFactories */ "../../node_modules/rxjs/dist/esm5/internal/NotificationFactories.js");
/* harmony import */ var _scheduler_timeoutProvider__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./scheduler/timeoutProvider */ "../../node_modules/rxjs/dist/esm5/internal/scheduler/timeoutProvider.js");
/* harmony import */ var _util_errorContext__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./util/errorContext */ "../../node_modules/rxjs/dist/esm5/internal/util/errorContext.js");









var Subscriber = (function (_super) {
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__extends)(Subscriber, _super);
    function Subscriber(destination) {
        var _this = _super.call(this) || this;
        _this.isStopped = false;
        if (destination) {
            _this.destination = destination;
            if ((0,_Subscription__WEBPACK_IMPORTED_MODULE_1__.isSubscription)(destination)) {
                destination.add(_this);
            }
        }
        else {
            _this.destination = EMPTY_OBSERVER;
        }
        return _this;
    }
    Subscriber.create = function (next, error, complete) {
        return new SafeSubscriber(next, error, complete);
    };
    Subscriber.prototype.next = function (value) {
        if (this.isStopped) {
            handleStoppedNotification((0,_NotificationFactories__WEBPACK_IMPORTED_MODULE_2__.nextNotification)(value), this);
        }
        else {
            this._next(value);
        }
    };
    Subscriber.prototype.error = function (err) {
        if (this.isStopped) {
            handleStoppedNotification((0,_NotificationFactories__WEBPACK_IMPORTED_MODULE_2__.errorNotification)(err), this);
        }
        else {
            this.isStopped = true;
            this._error(err);
        }
    };
    Subscriber.prototype.complete = function () {
        if (this.isStopped) {
            handleStoppedNotification(_NotificationFactories__WEBPACK_IMPORTED_MODULE_2__.COMPLETE_NOTIFICATION, this);
        }
        else {
            this.isStopped = true;
            this._complete();
        }
    };
    Subscriber.prototype.unsubscribe = function () {
        if (!this.closed) {
            this.isStopped = true;
            _super.prototype.unsubscribe.call(this);
            this.destination = null;
        }
    };
    Subscriber.prototype._next = function (value) {
        this.destination.next(value);
    };
    Subscriber.prototype._error = function (err) {
        try {
            this.destination.error(err);
        }
        finally {
            this.unsubscribe();
        }
    };
    Subscriber.prototype._complete = function () {
        try {
            this.destination.complete();
        }
        finally {
            this.unsubscribe();
        }
    };
    return Subscriber;
}(_Subscription__WEBPACK_IMPORTED_MODULE_1__.Subscription));

var _bind = Function.prototype.bind;
function bind(fn, thisArg) {
    return _bind.call(fn, thisArg);
}
var ConsumerObserver = (function () {
    function ConsumerObserver(partialObserver) {
        this.partialObserver = partialObserver;
    }
    ConsumerObserver.prototype.next = function (value) {
        var partialObserver = this.partialObserver;
        if (partialObserver.next) {
            try {
                partialObserver.next(value);
            }
            catch (error) {
                handleUnhandledError(error);
            }
        }
    };
    ConsumerObserver.prototype.error = function (err) {
        var partialObserver = this.partialObserver;
        if (partialObserver.error) {
            try {
                partialObserver.error(err);
            }
            catch (error) {
                handleUnhandledError(error);
            }
        }
        else {
            handleUnhandledError(err);
        }
    };
    ConsumerObserver.prototype.complete = function () {
        var partialObserver = this.partialObserver;
        if (partialObserver.complete) {
            try {
                partialObserver.complete();
            }
            catch (error) {
                handleUnhandledError(error);
            }
        }
    };
    return ConsumerObserver;
}());
var SafeSubscriber = (function (_super) {
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__extends)(SafeSubscriber, _super);
    function SafeSubscriber(observerOrNext, error, complete) {
        var _this = _super.call(this) || this;
        var partialObserver;
        if ((0,_util_isFunction__WEBPACK_IMPORTED_MODULE_3__.isFunction)(observerOrNext) || !observerOrNext) {
            partialObserver = {
                next: (observerOrNext !== null && observerOrNext !== void 0 ? observerOrNext : undefined),
                error: error !== null && error !== void 0 ? error : undefined,
                complete: complete !== null && complete !== void 0 ? complete : undefined,
            };
        }
        else {
            var context_1;
            if (_this && _config__WEBPACK_IMPORTED_MODULE_4__.config.useDeprecatedNextContext) {
                context_1 = Object.create(observerOrNext);
                context_1.unsubscribe = function () { return _this.unsubscribe(); };
                partialObserver = {
                    next: observerOrNext.next && bind(observerOrNext.next, context_1),
                    error: observerOrNext.error && bind(observerOrNext.error, context_1),
                    complete: observerOrNext.complete && bind(observerOrNext.complete, context_1),
                };
            }
            else {
                partialObserver = observerOrNext;
            }
        }
        _this.destination = new ConsumerObserver(partialObserver);
        return _this;
    }
    return SafeSubscriber;
}(Subscriber));

function handleUnhandledError(error) {
    if (_config__WEBPACK_IMPORTED_MODULE_4__.config.useDeprecatedSynchronousErrorHandling) {
        (0,_util_errorContext__WEBPACK_IMPORTED_MODULE_5__.captureError)(error);
    }
    else {
        (0,_util_reportUnhandledError__WEBPACK_IMPORTED_MODULE_6__.reportUnhandledError)(error);
    }
}
function defaultErrorHandler(err) {
    throw err;
}
function handleStoppedNotification(notification, subscriber) {
    var onStoppedNotification = _config__WEBPACK_IMPORTED_MODULE_4__.config.onStoppedNotification;
    onStoppedNotification && _scheduler_timeoutProvider__WEBPACK_IMPORTED_MODULE_7__.timeoutProvider.setTimeout(function () { return onStoppedNotification(notification, subscriber); });
}
var EMPTY_OBSERVER = {
    closed: true,
    next: _util_noop__WEBPACK_IMPORTED_MODULE_8__.noop,
    error: defaultErrorHandler,
    complete: _util_noop__WEBPACK_IMPORTED_MODULE_8__.noop,
};
//# sourceMappingURL=Subscriber.js.map

/***/ }),

/***/ "../../node_modules/rxjs/dist/esm5/internal/Subscription.js":
/*!******************************************************************!*\
  !*** ../../node_modules/rxjs/dist/esm5/internal/Subscription.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   EMPTY_SUBSCRIPTION: () => (/* binding */ EMPTY_SUBSCRIPTION),
/* harmony export */   Subscription: () => (/* binding */ Subscription),
/* harmony export */   isSubscription: () => (/* binding */ isSubscription)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.mjs");
/* harmony import */ var _util_isFunction__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./util/isFunction */ "../../node_modules/rxjs/dist/esm5/internal/util/isFunction.js");
/* harmony import */ var _util_UnsubscriptionError__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./util/UnsubscriptionError */ "../../node_modules/rxjs/dist/esm5/internal/util/UnsubscriptionError.js");
/* harmony import */ var _util_arrRemove__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./util/arrRemove */ "../../node_modules/rxjs/dist/esm5/internal/util/arrRemove.js");




var Subscription = (function () {
    function Subscription(initialTeardown) {
        this.initialTeardown = initialTeardown;
        this.closed = false;
        this._parentage = null;
        this._finalizers = null;
    }
    Subscription.prototype.unsubscribe = function () {
        var e_1, _a, e_2, _b;
        var errors;
        if (!this.closed) {
            this.closed = true;
            var _parentage = this._parentage;
            if (_parentage) {
                this._parentage = null;
                if (Array.isArray(_parentage)) {
                    try {
                        for (var _parentage_1 = (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__values)(_parentage), _parentage_1_1 = _parentage_1.next(); !_parentage_1_1.done; _parentage_1_1 = _parentage_1.next()) {
                            var parent_1 = _parentage_1_1.value;
                            parent_1.remove(this);
                        }
                    }
                    catch (e_1_1) { e_1 = { error: e_1_1 }; }
                    finally {
                        try {
                            if (_parentage_1_1 && !_parentage_1_1.done && (_a = _parentage_1.return)) _a.call(_parentage_1);
                        }
                        finally { if (e_1) throw e_1.error; }
                    }
                }
                else {
                    _parentage.remove(this);
                }
            }
            var initialFinalizer = this.initialTeardown;
            if ((0,_util_isFunction__WEBPACK_IMPORTED_MODULE_1__.isFunction)(initialFinalizer)) {
                try {
                    initialFinalizer();
                }
                catch (e) {
                    errors = e instanceof _util_UnsubscriptionError__WEBPACK_IMPORTED_MODULE_2__.UnsubscriptionError ? e.errors : [e];
                }
            }
            var _finalizers = this._finalizers;
            if (_finalizers) {
                this._finalizers = null;
                try {
                    for (var _finalizers_1 = (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__values)(_finalizers), _finalizers_1_1 = _finalizers_1.next(); !_finalizers_1_1.done; _finalizers_1_1 = _finalizers_1.next()) {
                        var finalizer = _finalizers_1_1.value;
                        try {
                            execFinalizer(finalizer);
                        }
                        catch (err) {
                            errors = errors !== null && errors !== void 0 ? errors : [];
                            if (err instanceof _util_UnsubscriptionError__WEBPACK_IMPORTED_MODULE_2__.UnsubscriptionError) {
                                errors = (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__spreadArray)((0,tslib__WEBPACK_IMPORTED_MODULE_0__.__spreadArray)([], (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__read)(errors)), (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__read)(err.errors));
                            }
                            else {
                                errors.push(err);
                            }
                        }
                    }
                }
                catch (e_2_1) { e_2 = { error: e_2_1 }; }
                finally {
                    try {
                        if (_finalizers_1_1 && !_finalizers_1_1.done && (_b = _finalizers_1.return)) _b.call(_finalizers_1);
                    }
                    finally { if (e_2) throw e_2.error; }
                }
            }
            if (errors) {
                throw new _util_UnsubscriptionError__WEBPACK_IMPORTED_MODULE_2__.UnsubscriptionError(errors);
            }
        }
    };
    Subscription.prototype.add = function (teardown) {
        var _a;
        if (teardown && teardown !== this) {
            if (this.closed) {
                execFinalizer(teardown);
            }
            else {
                if (teardown instanceof Subscription) {
                    if (teardown.closed || teardown._hasParent(this)) {
                        return;
                    }
                    teardown._addParent(this);
                }
                (this._finalizers = (_a = this._finalizers) !== null && _a !== void 0 ? _a : []).push(teardown);
            }
        }
    };
    Subscription.prototype._hasParent = function (parent) {
        var _parentage = this._parentage;
        return _parentage === parent || (Array.isArray(_parentage) && _parentage.includes(parent));
    };
    Subscription.prototype._addParent = function (parent) {
        var _parentage = this._parentage;
        this._parentage = Array.isArray(_parentage) ? (_parentage.push(parent), _parentage) : _parentage ? [_parentage, parent] : parent;
    };
    Subscription.prototype._removeParent = function (parent) {
        var _parentage = this._parentage;
        if (_parentage === parent) {
            this._parentage = null;
        }
        else if (Array.isArray(_parentage)) {
            (0,_util_arrRemove__WEBPACK_IMPORTED_MODULE_3__.arrRemove)(_parentage, parent);
        }
    };
    Subscription.prototype.remove = function (teardown) {
        var _finalizers = this._finalizers;
        _finalizers && (0,_util_arrRemove__WEBPACK_IMPORTED_MODULE_3__.arrRemove)(_finalizers, teardown);
        if (teardown instanceof Subscription) {
            teardown._removeParent(this);
        }
    };
    Subscription.EMPTY = (function () {
        var empty = new Subscription();
        empty.closed = true;
        return empty;
    })();
    return Subscription;
}());

var EMPTY_SUBSCRIPTION = Subscription.EMPTY;
function isSubscription(value) {
    return (value instanceof Subscription ||
        (value && 'closed' in value && (0,_util_isFunction__WEBPACK_IMPORTED_MODULE_1__.isFunction)(value.remove) && (0,_util_isFunction__WEBPACK_IMPORTED_MODULE_1__.isFunction)(value.add) && (0,_util_isFunction__WEBPACK_IMPORTED_MODULE_1__.isFunction)(value.unsubscribe)));
}
function execFinalizer(finalizer) {
    if ((0,_util_isFunction__WEBPACK_IMPORTED_MODULE_1__.isFunction)(finalizer)) {
        finalizer();
    }
    else {
        finalizer.unsubscribe();
    }
}
//# sourceMappingURL=Subscription.js.map

/***/ }),

/***/ "../../node_modules/rxjs/dist/esm5/internal/config.js":
/*!************************************************************!*\
  !*** ../../node_modules/rxjs/dist/esm5/internal/config.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   config: () => (/* binding */ config)
/* harmony export */ });
var config = {
    onUnhandledError: null,
    onStoppedNotification: null,
    Promise: undefined,
    useDeprecatedSynchronousErrorHandling: false,
    useDeprecatedNextContext: false,
};
//# sourceMappingURL=config.js.map

/***/ }),

/***/ "../../node_modules/rxjs/dist/esm5/internal/observable/from.js":
/*!*********************************************************************!*\
  !*** ../../node_modules/rxjs/dist/esm5/internal/observable/from.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   from: () => (/* binding */ from)
/* harmony export */ });
/* harmony import */ var _scheduled_scheduled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../scheduled/scheduled */ "../../node_modules/rxjs/dist/esm5/internal/scheduled/scheduled.js");
/* harmony import */ var _innerFrom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./innerFrom */ "../../node_modules/rxjs/dist/esm5/internal/observable/innerFrom.js");


function from(input, scheduler) {
    return scheduler ? (0,_scheduled_scheduled__WEBPACK_IMPORTED_MODULE_0__.scheduled)(input, scheduler) : (0,_innerFrom__WEBPACK_IMPORTED_MODULE_1__.innerFrom)(input);
}
//# sourceMappingURL=from.js.map

/***/ }),

/***/ "../../node_modules/rxjs/dist/esm5/internal/observable/innerFrom.js":
/*!**************************************************************************!*\
  !*** ../../node_modules/rxjs/dist/esm5/internal/observable/innerFrom.js ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   fromArrayLike: () => (/* binding */ fromArrayLike),
/* harmony export */   fromAsyncIterable: () => (/* binding */ fromAsyncIterable),
/* harmony export */   fromInteropObservable: () => (/* binding */ fromInteropObservable),
/* harmony export */   fromIterable: () => (/* binding */ fromIterable),
/* harmony export */   fromPromise: () => (/* binding */ fromPromise),
/* harmony export */   fromReadableStreamLike: () => (/* binding */ fromReadableStreamLike),
/* harmony export */   innerFrom: () => (/* binding */ innerFrom)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.mjs");
/* harmony import */ var _util_isArrayLike__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../util/isArrayLike */ "../../node_modules/rxjs/dist/esm5/internal/util/isArrayLike.js");
/* harmony import */ var _util_isPromise__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../util/isPromise */ "../../node_modules/rxjs/dist/esm5/internal/util/isPromise.js");
/* harmony import */ var _Observable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Observable */ "../../node_modules/rxjs/dist/esm5/internal/Observable.js");
/* harmony import */ var _util_isInteropObservable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util/isInteropObservable */ "../../node_modules/rxjs/dist/esm5/internal/util/isInteropObservable.js");
/* harmony import */ var _util_isAsyncIterable__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../util/isAsyncIterable */ "../../node_modules/rxjs/dist/esm5/internal/util/isAsyncIterable.js");
/* harmony import */ var _util_throwUnobservableError__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../util/throwUnobservableError */ "../../node_modules/rxjs/dist/esm5/internal/util/throwUnobservableError.js");
/* harmony import */ var _util_isIterable__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../util/isIterable */ "../../node_modules/rxjs/dist/esm5/internal/util/isIterable.js");
/* harmony import */ var _util_isReadableStreamLike__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../util/isReadableStreamLike */ "../../node_modules/rxjs/dist/esm5/internal/util/isReadableStreamLike.js");
/* harmony import */ var _util_isFunction__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../util/isFunction */ "../../node_modules/rxjs/dist/esm5/internal/util/isFunction.js");
/* harmony import */ var _util_reportUnhandledError__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../util/reportUnhandledError */ "../../node_modules/rxjs/dist/esm5/internal/util/reportUnhandledError.js");
/* harmony import */ var _symbol_observable__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../symbol/observable */ "../../node_modules/rxjs/dist/esm5/internal/symbol/observable.js");












function innerFrom(input) {
    if (input instanceof _Observable__WEBPACK_IMPORTED_MODULE_0__.Observable) {
        return input;
    }
    if (input != null) {
        if ((0,_util_isInteropObservable__WEBPACK_IMPORTED_MODULE_1__.isInteropObservable)(input)) {
            return fromInteropObservable(input);
        }
        if ((0,_util_isArrayLike__WEBPACK_IMPORTED_MODULE_2__.isArrayLike)(input)) {
            return fromArrayLike(input);
        }
        if ((0,_util_isPromise__WEBPACK_IMPORTED_MODULE_3__.isPromise)(input)) {
            return fromPromise(input);
        }
        if ((0,_util_isAsyncIterable__WEBPACK_IMPORTED_MODULE_4__.isAsyncIterable)(input)) {
            return fromAsyncIterable(input);
        }
        if ((0,_util_isIterable__WEBPACK_IMPORTED_MODULE_5__.isIterable)(input)) {
            return fromIterable(input);
        }
        if ((0,_util_isReadableStreamLike__WEBPACK_IMPORTED_MODULE_6__.isReadableStreamLike)(input)) {
            return fromReadableStreamLike(input);
        }
    }
    throw (0,_util_throwUnobservableError__WEBPACK_IMPORTED_MODULE_7__.createInvalidObservableTypeError)(input);
}
function fromInteropObservable(obj) {
    return new _Observable__WEBPACK_IMPORTED_MODULE_0__.Observable(function (subscriber) {
        var obs = obj[_symbol_observable__WEBPACK_IMPORTED_MODULE_8__.observable]();
        if ((0,_util_isFunction__WEBPACK_IMPORTED_MODULE_9__.isFunction)(obs.subscribe)) {
            return obs.subscribe(subscriber);
        }
        throw new TypeError('Provided object does not correctly implement Symbol.observable');
    });
}
function fromArrayLike(array) {
    return new _Observable__WEBPACK_IMPORTED_MODULE_0__.Observable(function (subscriber) {
        for (var i = 0; i < array.length && !subscriber.closed; i++) {
            subscriber.next(array[i]);
        }
        subscriber.complete();
    });
}
function fromPromise(promise) {
    return new _Observable__WEBPACK_IMPORTED_MODULE_0__.Observable(function (subscriber) {
        promise
            .then(function (value) {
            if (!subscriber.closed) {
                subscriber.next(value);
                subscriber.complete();
            }
        }, function (err) { return subscriber.error(err); })
            .then(null, _util_reportUnhandledError__WEBPACK_IMPORTED_MODULE_10__.reportUnhandledError);
    });
}
function fromIterable(iterable) {
    return new _Observable__WEBPACK_IMPORTED_MODULE_0__.Observable(function (subscriber) {
        var e_1, _a;
        try {
            for (var iterable_1 = (0,tslib__WEBPACK_IMPORTED_MODULE_11__.__values)(iterable), iterable_1_1 = iterable_1.next(); !iterable_1_1.done; iterable_1_1 = iterable_1.next()) {
                var value = iterable_1_1.value;
                subscriber.next(value);
                if (subscriber.closed) {
                    return;
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (iterable_1_1 && !iterable_1_1.done && (_a = iterable_1.return)) _a.call(iterable_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        subscriber.complete();
    });
}
function fromAsyncIterable(asyncIterable) {
    return new _Observable__WEBPACK_IMPORTED_MODULE_0__.Observable(function (subscriber) {
        process(asyncIterable, subscriber).catch(function (err) { return subscriber.error(err); });
    });
}
function fromReadableStreamLike(readableStream) {
    return fromAsyncIterable((0,_util_isReadableStreamLike__WEBPACK_IMPORTED_MODULE_6__.readableStreamLikeToAsyncGenerator)(readableStream));
}
function process(asyncIterable, subscriber) {
    var asyncIterable_1, asyncIterable_1_1;
    var e_2, _a;
    return (0,tslib__WEBPACK_IMPORTED_MODULE_11__.__awaiter)(this, void 0, void 0, function () {
        var value, e_2_1;
        return (0,tslib__WEBPACK_IMPORTED_MODULE_11__.__generator)(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 5, 6, 11]);
                    asyncIterable_1 = (0,tslib__WEBPACK_IMPORTED_MODULE_11__.__asyncValues)(asyncIterable);
                    _b.label = 1;
                case 1: return [4, asyncIterable_1.next()];
                case 2:
                    if (!(asyncIterable_1_1 = _b.sent(), !asyncIterable_1_1.done)) return [3, 4];
                    value = asyncIterable_1_1.value;
                    subscriber.next(value);
                    if (subscriber.closed) {
                        return [2];
                    }
                    _b.label = 3;
                case 3: return [3, 1];
                case 4: return [3, 11];
                case 5:
                    e_2_1 = _b.sent();
                    e_2 = { error: e_2_1 };
                    return [3, 11];
                case 6:
                    _b.trys.push([6, , 9, 10]);
                    if (!(asyncIterable_1_1 && !asyncIterable_1_1.done && (_a = asyncIterable_1.return))) return [3, 8];
                    return [4, _a.call(asyncIterable_1)];
                case 7:
                    _b.sent();
                    _b.label = 8;
                case 8: return [3, 10];
                case 9:
                    if (e_2) throw e_2.error;
                    return [7];
                case 10: return [7];
                case 11:
                    subscriber.complete();
                    return [2];
            }
        });
    });
}
//# sourceMappingURL=innerFrom.js.map

/***/ }),

/***/ "../../node_modules/rxjs/dist/esm5/internal/operators/OperatorSubscriber.js":
/*!**********************************************************************************!*\
  !*** ../../node_modules/rxjs/dist/esm5/internal/operators/OperatorSubscriber.js ***!
  \**********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   OperatorSubscriber: () => (/* binding */ OperatorSubscriber),
/* harmony export */   createOperatorSubscriber: () => (/* binding */ createOperatorSubscriber)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.mjs");
/* harmony import */ var _Subscriber__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Subscriber */ "../../node_modules/rxjs/dist/esm5/internal/Subscriber.js");


function createOperatorSubscriber(destination, onNext, onComplete, onError, onFinalize) {
    return new OperatorSubscriber(destination, onNext, onComplete, onError, onFinalize);
}
var OperatorSubscriber = (function (_super) {
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__extends)(OperatorSubscriber, _super);
    function OperatorSubscriber(destination, onNext, onComplete, onError, onFinalize, shouldUnsubscribe) {
        var _this = _super.call(this, destination) || this;
        _this.onFinalize = onFinalize;
        _this.shouldUnsubscribe = shouldUnsubscribe;
        _this._next = onNext
            ? function (value) {
                try {
                    onNext(value);
                }
                catch (err) {
                    destination.error(err);
                }
            }
            : _super.prototype._next;
        _this._error = onError
            ? function (err) {
                try {
                    onError(err);
                }
                catch (err) {
                    destination.error(err);
                }
                finally {
                    this.unsubscribe();
                }
            }
            : _super.prototype._error;
        _this._complete = onComplete
            ? function () {
                try {
                    onComplete();
                }
                catch (err) {
                    destination.error(err);
                }
                finally {
                    this.unsubscribe();
                }
            }
            : _super.prototype._complete;
        return _this;
    }
    OperatorSubscriber.prototype.unsubscribe = function () {
        var _a;
        if (!this.shouldUnsubscribe || this.shouldUnsubscribe()) {
            var closed_1 = this.closed;
            _super.prototype.unsubscribe.call(this);
            !closed_1 && ((_a = this.onFinalize) === null || _a === void 0 ? void 0 : _a.call(this));
        }
    };
    return OperatorSubscriber;
}(_Subscriber__WEBPACK_IMPORTED_MODULE_1__.Subscriber));

//# sourceMappingURL=OperatorSubscriber.js.map

/***/ }),

/***/ "../../node_modules/rxjs/dist/esm5/internal/operators/catchError.js":
/*!**************************************************************************!*\
  !*** ../../node_modules/rxjs/dist/esm5/internal/operators/catchError.js ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   catchError: () => (/* binding */ catchError)
/* harmony export */ });
/* harmony import */ var _observable_innerFrom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../observable/innerFrom */ "../../node_modules/rxjs/dist/esm5/internal/observable/innerFrom.js");
/* harmony import */ var _OperatorSubscriber__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./OperatorSubscriber */ "../../node_modules/rxjs/dist/esm5/internal/operators/OperatorSubscriber.js");
/* harmony import */ var _util_lift__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util/lift */ "../../node_modules/rxjs/dist/esm5/internal/util/lift.js");



function catchError(selector) {
    return (0,_util_lift__WEBPACK_IMPORTED_MODULE_0__.operate)(function (source, subscriber) {
        var innerSub = null;
        var syncUnsub = false;
        var handledResult;
        innerSub = source.subscribe((0,_OperatorSubscriber__WEBPACK_IMPORTED_MODULE_1__.createOperatorSubscriber)(subscriber, undefined, undefined, function (err) {
            handledResult = (0,_observable_innerFrom__WEBPACK_IMPORTED_MODULE_2__.innerFrom)(selector(err, catchError(selector)(source)));
            if (innerSub) {
                innerSub.unsubscribe();
                innerSub = null;
                handledResult.subscribe(subscriber);
            }
            else {
                syncUnsub = true;
            }
        }));
        if (syncUnsub) {
            innerSub.unsubscribe();
            innerSub = null;
            handledResult.subscribe(subscriber);
        }
    });
}
//# sourceMappingURL=catchError.js.map

/***/ }),

/***/ "../../node_modules/rxjs/dist/esm5/internal/operators/filter.js":
/*!**********************************************************************!*\
  !*** ../../node_modules/rxjs/dist/esm5/internal/operators/filter.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   filter: () => (/* binding */ filter)
/* harmony export */ });
/* harmony import */ var _util_lift__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util/lift */ "../../node_modules/rxjs/dist/esm5/internal/util/lift.js");
/* harmony import */ var _OperatorSubscriber__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./OperatorSubscriber */ "../../node_modules/rxjs/dist/esm5/internal/operators/OperatorSubscriber.js");


function filter(predicate, thisArg) {
    return (0,_util_lift__WEBPACK_IMPORTED_MODULE_0__.operate)(function (source, subscriber) {
        var index = 0;
        source.subscribe((0,_OperatorSubscriber__WEBPACK_IMPORTED_MODULE_1__.createOperatorSubscriber)(subscriber, function (value) { return predicate.call(thisArg, value, index++) && subscriber.next(value); }));
    });
}
//# sourceMappingURL=filter.js.map

/***/ }),

/***/ "../../node_modules/rxjs/dist/esm5/internal/operators/map.js":
/*!*******************************************************************!*\
  !*** ../../node_modules/rxjs/dist/esm5/internal/operators/map.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   map: () => (/* binding */ map)
/* harmony export */ });
/* harmony import */ var _util_lift__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util/lift */ "../../node_modules/rxjs/dist/esm5/internal/util/lift.js");
/* harmony import */ var _OperatorSubscriber__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./OperatorSubscriber */ "../../node_modules/rxjs/dist/esm5/internal/operators/OperatorSubscriber.js");


function map(project, thisArg) {
    return (0,_util_lift__WEBPACK_IMPORTED_MODULE_0__.operate)(function (source, subscriber) {
        var index = 0;
        source.subscribe((0,_OperatorSubscriber__WEBPACK_IMPORTED_MODULE_1__.createOperatorSubscriber)(subscriber, function (value) {
            subscriber.next(project.call(thisArg, value, index++));
        }));
    });
}
//# sourceMappingURL=map.js.map

/***/ }),

/***/ "../../node_modules/rxjs/dist/esm5/internal/operators/observeOn.js":
/*!*************************************************************************!*\
  !*** ../../node_modules/rxjs/dist/esm5/internal/operators/observeOn.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   observeOn: () => (/* binding */ observeOn)
/* harmony export */ });
/* harmony import */ var _util_executeSchedule__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../util/executeSchedule */ "../../node_modules/rxjs/dist/esm5/internal/util/executeSchedule.js");
/* harmony import */ var _util_lift__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util/lift */ "../../node_modules/rxjs/dist/esm5/internal/util/lift.js");
/* harmony import */ var _OperatorSubscriber__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./OperatorSubscriber */ "../../node_modules/rxjs/dist/esm5/internal/operators/OperatorSubscriber.js");



function observeOn(scheduler, delay) {
    if (delay === void 0) { delay = 0; }
    return (0,_util_lift__WEBPACK_IMPORTED_MODULE_0__.operate)(function (source, subscriber) {
        source.subscribe((0,_OperatorSubscriber__WEBPACK_IMPORTED_MODULE_1__.createOperatorSubscriber)(subscriber, function (value) { return (0,_util_executeSchedule__WEBPACK_IMPORTED_MODULE_2__.executeSchedule)(subscriber, scheduler, function () { return subscriber.next(value); }, delay); }, function () { return (0,_util_executeSchedule__WEBPACK_IMPORTED_MODULE_2__.executeSchedule)(subscriber, scheduler, function () { return subscriber.complete(); }, delay); }, function (err) { return (0,_util_executeSchedule__WEBPACK_IMPORTED_MODULE_2__.executeSchedule)(subscriber, scheduler, function () { return subscriber.error(err); }, delay); }));
    });
}
//# sourceMappingURL=observeOn.js.map

/***/ }),

/***/ "../../node_modules/rxjs/dist/esm5/internal/operators/subscribeOn.js":
/*!***************************************************************************!*\
  !*** ../../node_modules/rxjs/dist/esm5/internal/operators/subscribeOn.js ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   subscribeOn: () => (/* binding */ subscribeOn)
/* harmony export */ });
/* harmony import */ var _util_lift__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util/lift */ "../../node_modules/rxjs/dist/esm5/internal/util/lift.js");

function subscribeOn(scheduler, delay) {
    if (delay === void 0) { delay = 0; }
    return (0,_util_lift__WEBPACK_IMPORTED_MODULE_0__.operate)(function (source, subscriber) {
        subscriber.add(scheduler.schedule(function () { return source.subscribe(subscriber); }, delay));
    });
}
//# sourceMappingURL=subscribeOn.js.map

/***/ }),

/***/ "../../node_modules/rxjs/dist/esm5/internal/scheduled/scheduleArray.js":
/*!*****************************************************************************!*\
  !*** ../../node_modules/rxjs/dist/esm5/internal/scheduled/scheduleArray.js ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   scheduleArray: () => (/* binding */ scheduleArray)
/* harmony export */ });
/* harmony import */ var _Observable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Observable */ "../../node_modules/rxjs/dist/esm5/internal/Observable.js");

function scheduleArray(input, scheduler) {
    return new _Observable__WEBPACK_IMPORTED_MODULE_0__.Observable(function (subscriber) {
        var i = 0;
        return scheduler.schedule(function () {
            if (i === input.length) {
                subscriber.complete();
            }
            else {
                subscriber.next(input[i++]);
                if (!subscriber.closed) {
                    this.schedule();
                }
            }
        });
    });
}
//# sourceMappingURL=scheduleArray.js.map

/***/ }),

/***/ "../../node_modules/rxjs/dist/esm5/internal/scheduled/scheduleAsyncIterable.js":
/*!*************************************************************************************!*\
  !*** ../../node_modules/rxjs/dist/esm5/internal/scheduled/scheduleAsyncIterable.js ***!
  \*************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   scheduleAsyncIterable: () => (/* binding */ scheduleAsyncIterable)
/* harmony export */ });
/* harmony import */ var _Observable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Observable */ "../../node_modules/rxjs/dist/esm5/internal/Observable.js");
/* harmony import */ var _util_executeSchedule__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util/executeSchedule */ "../../node_modules/rxjs/dist/esm5/internal/util/executeSchedule.js");


function scheduleAsyncIterable(input, scheduler) {
    if (!input) {
        throw new Error('Iterable cannot be null');
    }
    return new _Observable__WEBPACK_IMPORTED_MODULE_0__.Observable(function (subscriber) {
        (0,_util_executeSchedule__WEBPACK_IMPORTED_MODULE_1__.executeSchedule)(subscriber, scheduler, function () {
            var iterator = input[Symbol.asyncIterator]();
            (0,_util_executeSchedule__WEBPACK_IMPORTED_MODULE_1__.executeSchedule)(subscriber, scheduler, function () {
                iterator.next().then(function (result) {
                    if (result.done) {
                        subscriber.complete();
                    }
                    else {
                        subscriber.next(result.value);
                    }
                });
            }, 0, true);
        });
    });
}
//# sourceMappingURL=scheduleAsyncIterable.js.map

/***/ }),

/***/ "../../node_modules/rxjs/dist/esm5/internal/scheduled/scheduleIterable.js":
/*!********************************************************************************!*\
  !*** ../../node_modules/rxjs/dist/esm5/internal/scheduled/scheduleIterable.js ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   scheduleIterable: () => (/* binding */ scheduleIterable)
/* harmony export */ });
/* harmony import */ var _Observable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Observable */ "../../node_modules/rxjs/dist/esm5/internal/Observable.js");
/* harmony import */ var _symbol_iterator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../symbol/iterator */ "../../node_modules/rxjs/dist/esm5/internal/symbol/iterator.js");
/* harmony import */ var _util_isFunction__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../util/isFunction */ "../../node_modules/rxjs/dist/esm5/internal/util/isFunction.js");
/* harmony import */ var _util_executeSchedule__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util/executeSchedule */ "../../node_modules/rxjs/dist/esm5/internal/util/executeSchedule.js");




function scheduleIterable(input, scheduler) {
    return new _Observable__WEBPACK_IMPORTED_MODULE_0__.Observable(function (subscriber) {
        var iterator;
        (0,_util_executeSchedule__WEBPACK_IMPORTED_MODULE_1__.executeSchedule)(subscriber, scheduler, function () {
            iterator = input[_symbol_iterator__WEBPACK_IMPORTED_MODULE_2__.iterator]();
            (0,_util_executeSchedule__WEBPACK_IMPORTED_MODULE_1__.executeSchedule)(subscriber, scheduler, function () {
                var _a;
                var value;
                var done;
                try {
                    (_a = iterator.next(), value = _a.value, done = _a.done);
                }
                catch (err) {
                    subscriber.error(err);
                    return;
                }
                if (done) {
                    subscriber.complete();
                }
                else {
                    subscriber.next(value);
                }
            }, 0, true);
        });
        return function () { return (0,_util_isFunction__WEBPACK_IMPORTED_MODULE_3__.isFunction)(iterator === null || iterator === void 0 ? void 0 : iterator.return) && iterator.return(); };
    });
}
//# sourceMappingURL=scheduleIterable.js.map

/***/ }),

/***/ "../../node_modules/rxjs/dist/esm5/internal/scheduled/scheduleObservable.js":
/*!**********************************************************************************!*\
  !*** ../../node_modules/rxjs/dist/esm5/internal/scheduled/scheduleObservable.js ***!
  \**********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   scheduleObservable: () => (/* binding */ scheduleObservable)
/* harmony export */ });
/* harmony import */ var _observable_innerFrom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../observable/innerFrom */ "../../node_modules/rxjs/dist/esm5/internal/observable/innerFrom.js");
/* harmony import */ var _operators_observeOn__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../operators/observeOn */ "../../node_modules/rxjs/dist/esm5/internal/operators/observeOn.js");
/* harmony import */ var _operators_subscribeOn__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../operators/subscribeOn */ "../../node_modules/rxjs/dist/esm5/internal/operators/subscribeOn.js");



function scheduleObservable(input, scheduler) {
    return (0,_observable_innerFrom__WEBPACK_IMPORTED_MODULE_0__.innerFrom)(input).pipe((0,_operators_subscribeOn__WEBPACK_IMPORTED_MODULE_1__.subscribeOn)(scheduler), (0,_operators_observeOn__WEBPACK_IMPORTED_MODULE_2__.observeOn)(scheduler));
}
//# sourceMappingURL=scheduleObservable.js.map

/***/ }),

/***/ "../../node_modules/rxjs/dist/esm5/internal/scheduled/schedulePromise.js":
/*!*******************************************************************************!*\
  !*** ../../node_modules/rxjs/dist/esm5/internal/scheduled/schedulePromise.js ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   schedulePromise: () => (/* binding */ schedulePromise)
/* harmony export */ });
/* harmony import */ var _observable_innerFrom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../observable/innerFrom */ "../../node_modules/rxjs/dist/esm5/internal/observable/innerFrom.js");
/* harmony import */ var _operators_observeOn__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../operators/observeOn */ "../../node_modules/rxjs/dist/esm5/internal/operators/observeOn.js");
/* harmony import */ var _operators_subscribeOn__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../operators/subscribeOn */ "../../node_modules/rxjs/dist/esm5/internal/operators/subscribeOn.js");



function schedulePromise(input, scheduler) {
    return (0,_observable_innerFrom__WEBPACK_IMPORTED_MODULE_0__.innerFrom)(input).pipe((0,_operators_subscribeOn__WEBPACK_IMPORTED_MODULE_1__.subscribeOn)(scheduler), (0,_operators_observeOn__WEBPACK_IMPORTED_MODULE_2__.observeOn)(scheduler));
}
//# sourceMappingURL=schedulePromise.js.map

/***/ }),

/***/ "../../node_modules/rxjs/dist/esm5/internal/scheduled/scheduleReadableStreamLike.js":
/*!******************************************************************************************!*\
  !*** ../../node_modules/rxjs/dist/esm5/internal/scheduled/scheduleReadableStreamLike.js ***!
  \******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   scheduleReadableStreamLike: () => (/* binding */ scheduleReadableStreamLike)
/* harmony export */ });
/* harmony import */ var _scheduleAsyncIterable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./scheduleAsyncIterable */ "../../node_modules/rxjs/dist/esm5/internal/scheduled/scheduleAsyncIterable.js");
/* harmony import */ var _util_isReadableStreamLike__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util/isReadableStreamLike */ "../../node_modules/rxjs/dist/esm5/internal/util/isReadableStreamLike.js");


function scheduleReadableStreamLike(input, scheduler) {
    return (0,_scheduleAsyncIterable__WEBPACK_IMPORTED_MODULE_0__.scheduleAsyncIterable)((0,_util_isReadableStreamLike__WEBPACK_IMPORTED_MODULE_1__.readableStreamLikeToAsyncGenerator)(input), scheduler);
}
//# sourceMappingURL=scheduleReadableStreamLike.js.map

/***/ }),

/***/ "../../node_modules/rxjs/dist/esm5/internal/scheduled/scheduled.js":
/*!*************************************************************************!*\
  !*** ../../node_modules/rxjs/dist/esm5/internal/scheduled/scheduled.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   scheduled: () => (/* binding */ scheduled)
/* harmony export */ });
/* harmony import */ var _scheduleObservable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./scheduleObservable */ "../../node_modules/rxjs/dist/esm5/internal/scheduled/scheduleObservable.js");
/* harmony import */ var _schedulePromise__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./schedulePromise */ "../../node_modules/rxjs/dist/esm5/internal/scheduled/schedulePromise.js");
/* harmony import */ var _scheduleArray__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./scheduleArray */ "../../node_modules/rxjs/dist/esm5/internal/scheduled/scheduleArray.js");
/* harmony import */ var _scheduleIterable__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./scheduleIterable */ "../../node_modules/rxjs/dist/esm5/internal/scheduled/scheduleIterable.js");
/* harmony import */ var _scheduleAsyncIterable__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./scheduleAsyncIterable */ "../../node_modules/rxjs/dist/esm5/internal/scheduled/scheduleAsyncIterable.js");
/* harmony import */ var _util_isInteropObservable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util/isInteropObservable */ "../../node_modules/rxjs/dist/esm5/internal/util/isInteropObservable.js");
/* harmony import */ var _util_isPromise__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../util/isPromise */ "../../node_modules/rxjs/dist/esm5/internal/util/isPromise.js");
/* harmony import */ var _util_isArrayLike__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../util/isArrayLike */ "../../node_modules/rxjs/dist/esm5/internal/util/isArrayLike.js");
/* harmony import */ var _util_isIterable__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../util/isIterable */ "../../node_modules/rxjs/dist/esm5/internal/util/isIterable.js");
/* harmony import */ var _util_isAsyncIterable__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../util/isAsyncIterable */ "../../node_modules/rxjs/dist/esm5/internal/util/isAsyncIterable.js");
/* harmony import */ var _util_throwUnobservableError__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../util/throwUnobservableError */ "../../node_modules/rxjs/dist/esm5/internal/util/throwUnobservableError.js");
/* harmony import */ var _util_isReadableStreamLike__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../util/isReadableStreamLike */ "../../node_modules/rxjs/dist/esm5/internal/util/isReadableStreamLike.js");
/* harmony import */ var _scheduleReadableStreamLike__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./scheduleReadableStreamLike */ "../../node_modules/rxjs/dist/esm5/internal/scheduled/scheduleReadableStreamLike.js");













function scheduled(input, scheduler) {
    if (input != null) {
        if ((0,_util_isInteropObservable__WEBPACK_IMPORTED_MODULE_0__.isInteropObservable)(input)) {
            return (0,_scheduleObservable__WEBPACK_IMPORTED_MODULE_1__.scheduleObservable)(input, scheduler);
        }
        if ((0,_util_isArrayLike__WEBPACK_IMPORTED_MODULE_2__.isArrayLike)(input)) {
            return (0,_scheduleArray__WEBPACK_IMPORTED_MODULE_3__.scheduleArray)(input, scheduler);
        }
        if ((0,_util_isPromise__WEBPACK_IMPORTED_MODULE_4__.isPromise)(input)) {
            return (0,_schedulePromise__WEBPACK_IMPORTED_MODULE_5__.schedulePromise)(input, scheduler);
        }
        if ((0,_util_isAsyncIterable__WEBPACK_IMPORTED_MODULE_6__.isAsyncIterable)(input)) {
            return (0,_scheduleAsyncIterable__WEBPACK_IMPORTED_MODULE_7__.scheduleAsyncIterable)(input, scheduler);
        }
        if ((0,_util_isIterable__WEBPACK_IMPORTED_MODULE_8__.isIterable)(input)) {
            return (0,_scheduleIterable__WEBPACK_IMPORTED_MODULE_9__.scheduleIterable)(input, scheduler);
        }
        if ((0,_util_isReadableStreamLike__WEBPACK_IMPORTED_MODULE_10__.isReadableStreamLike)(input)) {
            return (0,_scheduleReadableStreamLike__WEBPACK_IMPORTED_MODULE_11__.scheduleReadableStreamLike)(input, scheduler);
        }
    }
    throw (0,_util_throwUnobservableError__WEBPACK_IMPORTED_MODULE_12__.createInvalidObservableTypeError)(input);
}
//# sourceMappingURL=scheduled.js.map

/***/ }),

/***/ "../../node_modules/rxjs/dist/esm5/internal/scheduler/timeoutProvider.js":
/*!*******************************************************************************!*\
  !*** ../../node_modules/rxjs/dist/esm5/internal/scheduler/timeoutProvider.js ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   timeoutProvider: () => (/* binding */ timeoutProvider)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.mjs");

var timeoutProvider = {
    setTimeout: function (handler, timeout) {
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        var delegate = timeoutProvider.delegate;
        if (delegate === null || delegate === void 0 ? void 0 : delegate.setTimeout) {
            return delegate.setTimeout.apply(delegate, (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__spreadArray)([handler, timeout], (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__read)(args)));
        }
        return setTimeout.apply(void 0, (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__spreadArray)([handler, timeout], (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__read)(args)));
    },
    clearTimeout: function (handle) {
        var delegate = timeoutProvider.delegate;
        return ((delegate === null || delegate === void 0 ? void 0 : delegate.clearTimeout) || clearTimeout)(handle);
    },
    delegate: undefined,
};
//# sourceMappingURL=timeoutProvider.js.map

/***/ }),

/***/ "../../node_modules/rxjs/dist/esm5/internal/symbol/iterator.js":
/*!*********************************************************************!*\
  !*** ../../node_modules/rxjs/dist/esm5/internal/symbol/iterator.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getSymbolIterator: () => (/* binding */ getSymbolIterator),
/* harmony export */   iterator: () => (/* binding */ iterator)
/* harmony export */ });
function getSymbolIterator() {
    if (typeof Symbol !== 'function' || !Symbol.iterator) {
        return '@@iterator';
    }
    return Symbol.iterator;
}
var iterator = getSymbolIterator();
//# sourceMappingURL=iterator.js.map

/***/ }),

/***/ "../../node_modules/rxjs/dist/esm5/internal/symbol/observable.js":
/*!***********************************************************************!*\
  !*** ../../node_modules/rxjs/dist/esm5/internal/symbol/observable.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   observable: () => (/* binding */ observable)
/* harmony export */ });
var observable = (function () { return (typeof Symbol === 'function' && Symbol.observable) || '@@observable'; })();
//# sourceMappingURL=observable.js.map

/***/ }),

/***/ "../../node_modules/rxjs/dist/esm5/internal/util/UnsubscriptionError.js":
/*!******************************************************************************!*\
  !*** ../../node_modules/rxjs/dist/esm5/internal/util/UnsubscriptionError.js ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   UnsubscriptionError: () => (/* binding */ UnsubscriptionError)
/* harmony export */ });
/* harmony import */ var _createErrorClass__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./createErrorClass */ "../../node_modules/rxjs/dist/esm5/internal/util/createErrorClass.js");

var UnsubscriptionError = (0,_createErrorClass__WEBPACK_IMPORTED_MODULE_0__.createErrorClass)(function (_super) {
    return function UnsubscriptionErrorImpl(errors) {
        _super(this);
        this.message = errors
            ? errors.length + " errors occurred during unsubscription:\n" + errors.map(function (err, i) { return i + 1 + ") " + err.toString(); }).join('\n  ')
            : '';
        this.name = 'UnsubscriptionError';
        this.errors = errors;
    };
});
//# sourceMappingURL=UnsubscriptionError.js.map

/***/ }),

/***/ "../../node_modules/rxjs/dist/esm5/internal/util/arrRemove.js":
/*!********************************************************************!*\
  !*** ../../node_modules/rxjs/dist/esm5/internal/util/arrRemove.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   arrRemove: () => (/* binding */ arrRemove)
/* harmony export */ });
function arrRemove(arr, item) {
    if (arr) {
        var index = arr.indexOf(item);
        0 <= index && arr.splice(index, 1);
    }
}
//# sourceMappingURL=arrRemove.js.map

/***/ }),

/***/ "../../node_modules/rxjs/dist/esm5/internal/util/createErrorClass.js":
/*!***************************************************************************!*\
  !*** ../../node_modules/rxjs/dist/esm5/internal/util/createErrorClass.js ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createErrorClass: () => (/* binding */ createErrorClass)
/* harmony export */ });
function createErrorClass(createImpl) {
    var _super = function (instance) {
        Error.call(instance);
        instance.stack = new Error().stack;
    };
    var ctorFunc = createImpl(_super);
    ctorFunc.prototype = Object.create(Error.prototype);
    ctorFunc.prototype.constructor = ctorFunc;
    return ctorFunc;
}
//# sourceMappingURL=createErrorClass.js.map

/***/ }),

/***/ "../../node_modules/rxjs/dist/esm5/internal/util/errorContext.js":
/*!***********************************************************************!*\
  !*** ../../node_modules/rxjs/dist/esm5/internal/util/errorContext.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   captureError: () => (/* binding */ captureError),
/* harmony export */   errorContext: () => (/* binding */ errorContext)
/* harmony export */ });
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../config */ "../../node_modules/rxjs/dist/esm5/internal/config.js");

var context = null;
function errorContext(cb) {
    if (_config__WEBPACK_IMPORTED_MODULE_0__.config.useDeprecatedSynchronousErrorHandling) {
        var isRoot = !context;
        if (isRoot) {
            context = { errorThrown: false, error: null };
        }
        cb();
        if (isRoot) {
            var _a = context, errorThrown = _a.errorThrown, error = _a.error;
            context = null;
            if (errorThrown) {
                throw error;
            }
        }
    }
    else {
        cb();
    }
}
function captureError(err) {
    if (_config__WEBPACK_IMPORTED_MODULE_0__.config.useDeprecatedSynchronousErrorHandling && context) {
        context.errorThrown = true;
        context.error = err;
    }
}
//# sourceMappingURL=errorContext.js.map

/***/ }),

/***/ "../../node_modules/rxjs/dist/esm5/internal/util/executeSchedule.js":
/*!**************************************************************************!*\
  !*** ../../node_modules/rxjs/dist/esm5/internal/util/executeSchedule.js ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   executeSchedule: () => (/* binding */ executeSchedule)
/* harmony export */ });
function executeSchedule(parentSubscription, scheduler, work, delay, repeat) {
    if (delay === void 0) { delay = 0; }
    if (repeat === void 0) { repeat = false; }
    var scheduleSubscription = scheduler.schedule(function () {
        work();
        if (repeat) {
            parentSubscription.add(this.schedule(null, delay));
        }
        else {
            this.unsubscribe();
        }
    }, delay);
    parentSubscription.add(scheduleSubscription);
    if (!repeat) {
        return scheduleSubscription;
    }
}
//# sourceMappingURL=executeSchedule.js.map

/***/ }),

/***/ "../../node_modules/rxjs/dist/esm5/internal/util/identity.js":
/*!*******************************************************************!*\
  !*** ../../node_modules/rxjs/dist/esm5/internal/util/identity.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   identity: () => (/* binding */ identity)
/* harmony export */ });
function identity(x) {
    return x;
}
//# sourceMappingURL=identity.js.map

/***/ }),

/***/ "../../node_modules/rxjs/dist/esm5/internal/util/isArrayLike.js":
/*!**********************************************************************!*\
  !*** ../../node_modules/rxjs/dist/esm5/internal/util/isArrayLike.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   isArrayLike: () => (/* binding */ isArrayLike)
/* harmony export */ });
var isArrayLike = (function (x) { return x && typeof x.length === 'number' && typeof x !== 'function'; });
//# sourceMappingURL=isArrayLike.js.map

/***/ }),

/***/ "../../node_modules/rxjs/dist/esm5/internal/util/isAsyncIterable.js":
/*!**************************************************************************!*\
  !*** ../../node_modules/rxjs/dist/esm5/internal/util/isAsyncIterable.js ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   isAsyncIterable: () => (/* binding */ isAsyncIterable)
/* harmony export */ });
/* harmony import */ var _isFunction__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./isFunction */ "../../node_modules/rxjs/dist/esm5/internal/util/isFunction.js");

function isAsyncIterable(obj) {
    return Symbol.asyncIterator && (0,_isFunction__WEBPACK_IMPORTED_MODULE_0__.isFunction)(obj === null || obj === void 0 ? void 0 : obj[Symbol.asyncIterator]);
}
//# sourceMappingURL=isAsyncIterable.js.map

/***/ }),

/***/ "../../node_modules/rxjs/dist/esm5/internal/util/isFunction.js":
/*!*********************************************************************!*\
  !*** ../../node_modules/rxjs/dist/esm5/internal/util/isFunction.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   isFunction: () => (/* binding */ isFunction)
/* harmony export */ });
function isFunction(value) {
    return typeof value === 'function';
}
//# sourceMappingURL=isFunction.js.map

/***/ }),

/***/ "../../node_modules/rxjs/dist/esm5/internal/util/isInteropObservable.js":
/*!******************************************************************************!*\
  !*** ../../node_modules/rxjs/dist/esm5/internal/util/isInteropObservable.js ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   isInteropObservable: () => (/* binding */ isInteropObservable)
/* harmony export */ });
/* harmony import */ var _symbol_observable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../symbol/observable */ "../../node_modules/rxjs/dist/esm5/internal/symbol/observable.js");
/* harmony import */ var _isFunction__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./isFunction */ "../../node_modules/rxjs/dist/esm5/internal/util/isFunction.js");


function isInteropObservable(input) {
    return (0,_isFunction__WEBPACK_IMPORTED_MODULE_0__.isFunction)(input[_symbol_observable__WEBPACK_IMPORTED_MODULE_1__.observable]);
}
//# sourceMappingURL=isInteropObservable.js.map

/***/ }),

/***/ "../../node_modules/rxjs/dist/esm5/internal/util/isIterable.js":
/*!*********************************************************************!*\
  !*** ../../node_modules/rxjs/dist/esm5/internal/util/isIterable.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   isIterable: () => (/* binding */ isIterable)
/* harmony export */ });
/* harmony import */ var _symbol_iterator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../symbol/iterator */ "../../node_modules/rxjs/dist/esm5/internal/symbol/iterator.js");
/* harmony import */ var _isFunction__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./isFunction */ "../../node_modules/rxjs/dist/esm5/internal/util/isFunction.js");


function isIterable(input) {
    return (0,_isFunction__WEBPACK_IMPORTED_MODULE_0__.isFunction)(input === null || input === void 0 ? void 0 : input[_symbol_iterator__WEBPACK_IMPORTED_MODULE_1__.iterator]);
}
//# sourceMappingURL=isIterable.js.map

/***/ }),

/***/ "../../node_modules/rxjs/dist/esm5/internal/util/isPromise.js":
/*!********************************************************************!*\
  !*** ../../node_modules/rxjs/dist/esm5/internal/util/isPromise.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   isPromise: () => (/* binding */ isPromise)
/* harmony export */ });
/* harmony import */ var _isFunction__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./isFunction */ "../../node_modules/rxjs/dist/esm5/internal/util/isFunction.js");

function isPromise(value) {
    return (0,_isFunction__WEBPACK_IMPORTED_MODULE_0__.isFunction)(value === null || value === void 0 ? void 0 : value.then);
}
//# sourceMappingURL=isPromise.js.map

/***/ }),

/***/ "../../node_modules/rxjs/dist/esm5/internal/util/isReadableStreamLike.js":
/*!*******************************************************************************!*\
  !*** ../../node_modules/rxjs/dist/esm5/internal/util/isReadableStreamLike.js ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   isReadableStreamLike: () => (/* binding */ isReadableStreamLike),
/* harmony export */   readableStreamLikeToAsyncGenerator: () => (/* binding */ readableStreamLikeToAsyncGenerator)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.mjs");
/* harmony import */ var _isFunction__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./isFunction */ "../../node_modules/rxjs/dist/esm5/internal/util/isFunction.js");


function readableStreamLikeToAsyncGenerator(readableStream) {
    return (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__asyncGenerator)(this, arguments, function readableStreamLikeToAsyncGenerator_1() {
        var reader, _a, value, done;
        return (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__generator)(this, function (_b) {
            switch (_b.label) {
                case 0:
                    reader = readableStream.getReader();
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, , 9, 10]);
                    _b.label = 2;
                case 2:
                    if (false) {}
                    return [4, (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__await)(reader.read())];
                case 3:
                    _a = _b.sent(), value = _a.value, done = _a.done;
                    if (!done) return [3, 5];
                    return [4, (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__await)(void 0)];
                case 4: return [2, _b.sent()];
                case 5: return [4, (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__await)(value)];
                case 6: return [4, _b.sent()];
                case 7:
                    _b.sent();
                    return [3, 2];
                case 8: return [3, 10];
                case 9:
                    reader.releaseLock();
                    return [7];
                case 10: return [2];
            }
        });
    });
}
function isReadableStreamLike(obj) {
    return (0,_isFunction__WEBPACK_IMPORTED_MODULE_1__.isFunction)(obj === null || obj === void 0 ? void 0 : obj.getReader);
}
//# sourceMappingURL=isReadableStreamLike.js.map

/***/ }),

/***/ "../../node_modules/rxjs/dist/esm5/internal/util/lift.js":
/*!***************************************************************!*\
  !*** ../../node_modules/rxjs/dist/esm5/internal/util/lift.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   hasLift: () => (/* binding */ hasLift),
/* harmony export */   operate: () => (/* binding */ operate)
/* harmony export */ });
/* harmony import */ var _isFunction__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./isFunction */ "../../node_modules/rxjs/dist/esm5/internal/util/isFunction.js");

function hasLift(source) {
    return (0,_isFunction__WEBPACK_IMPORTED_MODULE_0__.isFunction)(source === null || source === void 0 ? void 0 : source.lift);
}
function operate(init) {
    return function (source) {
        if (hasLift(source)) {
            return source.lift(function (liftedSource) {
                try {
                    return init(liftedSource, this);
                }
                catch (err) {
                    this.error(err);
                }
            });
        }
        throw new TypeError('Unable to lift unknown Observable type');
    };
}
//# sourceMappingURL=lift.js.map

/***/ }),

/***/ "../../node_modules/rxjs/dist/esm5/internal/util/noop.js":
/*!***************************************************************!*\
  !*** ../../node_modules/rxjs/dist/esm5/internal/util/noop.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   noop: () => (/* binding */ noop)
/* harmony export */ });
function noop() { }
//# sourceMappingURL=noop.js.map

/***/ }),

/***/ "../../node_modules/rxjs/dist/esm5/internal/util/pipe.js":
/*!***************************************************************!*\
  !*** ../../node_modules/rxjs/dist/esm5/internal/util/pipe.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   pipe: () => (/* binding */ pipe),
/* harmony export */   pipeFromArray: () => (/* binding */ pipeFromArray)
/* harmony export */ });
/* harmony import */ var _identity__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./identity */ "../../node_modules/rxjs/dist/esm5/internal/util/identity.js");

function pipe() {
    var fns = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        fns[_i] = arguments[_i];
    }
    return pipeFromArray(fns);
}
function pipeFromArray(fns) {
    if (fns.length === 0) {
        return _identity__WEBPACK_IMPORTED_MODULE_0__.identity;
    }
    if (fns.length === 1) {
        return fns[0];
    }
    return function piped(input) {
        return fns.reduce(function (prev, fn) { return fn(prev); }, input);
    };
}
//# sourceMappingURL=pipe.js.map

/***/ }),

/***/ "../../node_modules/rxjs/dist/esm5/internal/util/reportUnhandledError.js":
/*!*******************************************************************************!*\
  !*** ../../node_modules/rxjs/dist/esm5/internal/util/reportUnhandledError.js ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   reportUnhandledError: () => (/* binding */ reportUnhandledError)
/* harmony export */ });
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../config */ "../../node_modules/rxjs/dist/esm5/internal/config.js");
/* harmony import */ var _scheduler_timeoutProvider__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../scheduler/timeoutProvider */ "../../node_modules/rxjs/dist/esm5/internal/scheduler/timeoutProvider.js");


function reportUnhandledError(err) {
    _scheduler_timeoutProvider__WEBPACK_IMPORTED_MODULE_0__.timeoutProvider.setTimeout(function () {
        var onUnhandledError = _config__WEBPACK_IMPORTED_MODULE_1__.config.onUnhandledError;
        if (onUnhandledError) {
            onUnhandledError(err);
        }
        else {
            throw err;
        }
    });
}
//# sourceMappingURL=reportUnhandledError.js.map

/***/ }),

/***/ "../../node_modules/rxjs/dist/esm5/internal/util/throwUnobservableError.js":
/*!*********************************************************************************!*\
  !*** ../../node_modules/rxjs/dist/esm5/internal/util/throwUnobservableError.js ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createInvalidObservableTypeError: () => (/* binding */ createInvalidObservableTypeError)
/* harmony export */ });
function createInvalidObservableTypeError(input) {
    return new TypeError("You provided " + (input !== null && typeof input === 'object' ? 'an invalid object' : "'" + input + "'") + " where a stream was expected. You can provide an Observable, Promise, ReadableStream, Array, AsyncIterable, or Iterable.");
}
//# sourceMappingURL=throwUnobservableError.js.map

/***/ }),

/***/ "../../node_modules/uuid/dist/esm-browser/native.js":
/*!**********************************************************!*\
  !*** ../../node_modules/uuid/dist/esm-browser/native.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const randomUUID = typeof crypto !== 'undefined' && crypto.randomUUID && crypto.randomUUID.bind(crypto);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  randomUUID
});

/***/ }),

/***/ "../../node_modules/uuid/dist/esm-browser/regex.js":
/*!*********************************************************!*\
  !*** ../../node_modules/uuid/dist/esm-browser/regex.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (/^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i);

/***/ }),

/***/ "../../node_modules/uuid/dist/esm-browser/rng.js":
/*!*******************************************************!*\
  !*** ../../node_modules/uuid/dist/esm-browser/rng.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ rng)
/* harmony export */ });
// Unique ID creation requires a high quality random # generator. In the browser we therefore
// require the crypto API and do not support built-in fallback to lower quality random number
// generators (like Math.random()).
let getRandomValues;
const rnds8 = new Uint8Array(16);
function rng() {
  // lazy load so that environments that need to polyfill have a chance to do so
  if (!getRandomValues) {
    // getRandomValues needs to be invoked in a context where "this" is a Crypto implementation.
    getRandomValues = typeof crypto !== 'undefined' && crypto.getRandomValues && crypto.getRandomValues.bind(crypto);

    if (!getRandomValues) {
      throw new Error('crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported');
    }
  }

  return getRandomValues(rnds8);
}

/***/ }),

/***/ "../../node_modules/uuid/dist/esm-browser/stringify.js":
/*!*************************************************************!*\
  !*** ../../node_modules/uuid/dist/esm-browser/stringify.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   unsafeStringify: () => (/* binding */ unsafeStringify)
/* harmony export */ });
/* harmony import */ var _validate_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./validate.js */ "../../node_modules/uuid/dist/esm-browser/validate.js");

/**
 * Convert array of 16 byte values to UUID string format of the form:
 * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
 */

const byteToHex = [];

for (let i = 0; i < 256; ++i) {
  byteToHex.push((i + 0x100).toString(16).slice(1));
}

function unsafeStringify(arr, offset = 0) {
  // Note: Be careful editing this code!  It's been tuned for performance
  // and works in ways you may not expect. See https://github.com/uuidjs/uuid/pull/434
  return byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + '-' + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + '-' + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + '-' + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + '-' + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]];
}

function stringify(arr, offset = 0) {
  const uuid = unsafeStringify(arr, offset); // Consistency check for valid UUID.  If this throws, it's likely due to one
  // of the following:
  // - One or more input array values don't map to a hex octet (leading to
  // "undefined" in the uuid)
  // - Invalid input values for the RFC `version` or `variant` fields

  if (!(0,_validate_js__WEBPACK_IMPORTED_MODULE_0__["default"])(uuid)) {
    throw TypeError('Stringified UUID is invalid');
  }

  return uuid;
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (stringify);

/***/ }),

/***/ "../../node_modules/uuid/dist/esm-browser/v4.js":
/*!******************************************************!*\
  !*** ../../node_modules/uuid/dist/esm-browser/v4.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _native_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./native.js */ "../../node_modules/uuid/dist/esm-browser/native.js");
/* harmony import */ var _rng_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./rng.js */ "../../node_modules/uuid/dist/esm-browser/rng.js");
/* harmony import */ var _stringify_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./stringify.js */ "../../node_modules/uuid/dist/esm-browser/stringify.js");




function v4(options, buf, offset) {
  if (_native_js__WEBPACK_IMPORTED_MODULE_0__["default"].randomUUID && !buf && !options) {
    return _native_js__WEBPACK_IMPORTED_MODULE_0__["default"].randomUUID();
  }

  options = options || {};
  const rnds = options.random || (options.rng || _rng_js__WEBPACK_IMPORTED_MODULE_1__["default"])(); // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`

  rnds[6] = rnds[6] & 0x0f | 0x40;
  rnds[8] = rnds[8] & 0x3f | 0x80; // Copy bytes to buffer, if provided

  if (buf) {
    offset = offset || 0;

    for (let i = 0; i < 16; ++i) {
      buf[offset + i] = rnds[i];
    }

    return buf;
  }

  return (0,_stringify_js__WEBPACK_IMPORTED_MODULE_2__.unsafeStringify)(rnds);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (v4);

/***/ }),

/***/ "../../node_modules/uuid/dist/esm-browser/validate.js":
/*!************************************************************!*\
  !*** ../../node_modules/uuid/dist/esm-browser/validate.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _regex_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./regex.js */ "../../node_modules/uuid/dist/esm-browser/regex.js");


function validate(uuid) {
  return typeof uuid === 'string' && _regex_js__WEBPACK_IMPORTED_MODULE_0__["default"].test(uuid);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (validate);

/***/ }),

/***/ "../core/node_modules/@smithy/util-hex-encoding/dist-es/index.js":
/*!***********************************************************************!*\
  !*** ../core/node_modules/@smithy/util-hex-encoding/dist-es/index.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   fromHex: () => (/* binding */ fromHex),
/* harmony export */   toHex: () => (/* binding */ toHex)
/* harmony export */ });
const SHORT_TO_HEX = {};
const HEX_TO_SHORT = {};
for (let i = 0; i < 256; i++) {
    let encodedByte = i.toString(16).toLowerCase();
    if (encodedByte.length === 1) {
        encodedByte = `0${encodedByte}`;
    }
    SHORT_TO_HEX[i] = encodedByte;
    HEX_TO_SHORT[encodedByte] = i;
}
function fromHex(encoded) {
    if (encoded.length % 2 !== 0) {
        throw new Error("Hex encoded strings must have an even number length");
    }
    const out = new Uint8Array(encoded.length / 2);
    for (let i = 0; i < encoded.length; i += 2) {
        const encodedByte = encoded.slice(i, i + 2).toLowerCase();
        if (encodedByte in HEX_TO_SHORT) {
            out[i / 2] = HEX_TO_SHORT[encodedByte];
        }
        else {
            throw new Error(`Cannot decode unrecognized sequence ${encodedByte} as hexadecimal`);
        }
    }
    return out;
}
function toHex(bytes) {
    let out = "";
    for (let i = 0; i < bytes.byteLength; i++) {
        out += SHORT_TO_HEX[bytes[i]];
    }
    return out;
}


/***/ }),

/***/ "@aws-amplify/core":
/*!***********************************!*\
  !*** external "aws_amplify_core" ***!
  \***********************************/
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE__aws_amplify_core__;

/***/ }),

/***/ "graphql":
/*!**************************!*\
  !*** external "graphql" ***!
  \**************************/
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE_graphql__;

/***/ }),

/***/ "../../node_modules/@aws-amplify/data-schema-types/dist/esm/client/symbol.mjs":
/*!************************************************************************************!*\
  !*** ../../node_modules/@aws-amplify/data-schema-types/dist/esm/client/symbol.mjs ***!
  \************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   __modelMeta__: () => (/* binding */ __modelMeta__)
/* harmony export */ });
const __modelMeta__ = Symbol();


//# sourceMappingURL=symbol.mjs.map


/***/ }),

/***/ "../../node_modules/@aws-amplify/data-schema-types/dist/esm/index.mjs":
/*!****************************************************************************!*\
  !*** ../../node_modules/@aws-amplify/data-schema-types/dist/esm/index.mjs ***!
  \****************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   __modelMeta__: () => (/* reexport safe */ _client_symbol_mjs__WEBPACK_IMPORTED_MODULE_0__.__modelMeta__)
/* harmony export */ });
/* harmony import */ var _client_symbol_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./client/symbol.mjs */ "../../node_modules/@aws-amplify/data-schema-types/dist/esm/client/symbol.mjs");

//# sourceMappingURL=index.mjs.map


/***/ }),

/***/ "../../node_modules/@aws-amplify/data-schema/dist/esm/runtime/addSchemaToClient.mjs":
/*!******************************************************************************************!*\
  !*** ../../node_modules/@aws-amplify/data-schema/dist/esm/runtime/addSchemaToClient.mjs ***!
  \******************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   addSchemaToClient: () => (/* binding */ addSchemaToClient)
/* harmony export */ });
/* harmony import */ var _internals_generateCustomOperationsProperty_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internals/generateCustomOperationsProperty.mjs */ "../../node_modules/@aws-amplify/data-schema/dist/esm/runtime/internals/generateCustomOperationsProperty.mjs");
/* harmony import */ var _internals_utils_clientProperties_generateConversationsProperty_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internals/utils/clientProperties/generateConversationsProperty.mjs */ "../../node_modules/@aws-amplify/data-schema/dist/esm/runtime/internals/utils/clientProperties/generateConversationsProperty.mjs");
/* harmony import */ var _internals_utils_clientProperties_generateGenerationsProperty_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./internals/utils/clientProperties/generateGenerationsProperty.mjs */ "../../node_modules/@aws-amplify/data-schema/dist/esm/runtime/internals/utils/clientProperties/generateGenerationsProperty.mjs");
/* harmony import */ var _internals_utils_clientProperties_generateEnumsProperty_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./internals/utils/clientProperties/generateEnumsProperty.mjs */ "../../node_modules/@aws-amplify/data-schema/dist/esm/runtime/internals/utils/clientProperties/generateEnumsProperty.mjs");
/* harmony import */ var _internals_utils_clientProperties_generateModelsProperty_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./internals/utils/clientProperties/generateModelsProperty.mjs */ "../../node_modules/@aws-amplify/data-schema/dist/esm/runtime/internals/utils/clientProperties/generateModelsProperty.mjs");
/* harmony import */ var _internals_cancellation_mjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./internals/cancellation.mjs */ "../../node_modules/@aws-amplify/data-schema/dist/esm/runtime/internals/cancellation.mjs");







// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
function addSchemaToClient(client, apiGraphqlConfig, getInternals) {
    (0,_internals_cancellation_mjs__WEBPACK_IMPORTED_MODULE_5__.upgradeClientCancellation)(client);
    client.models = (0,_internals_utils_clientProperties_generateModelsProperty_mjs__WEBPACK_IMPORTED_MODULE_4__.generateModelsProperty)(client, apiGraphqlConfig, getInternals);
    client.enums = (0,_internals_utils_clientProperties_generateEnumsProperty_mjs__WEBPACK_IMPORTED_MODULE_3__.generateEnumsProperty)(apiGraphqlConfig);
    client.queries = (0,_internals_generateCustomOperationsProperty_mjs__WEBPACK_IMPORTED_MODULE_0__.generateCustomQueriesProperty)(client, apiGraphqlConfig, getInternals);
    client.mutations = (0,_internals_generateCustomOperationsProperty_mjs__WEBPACK_IMPORTED_MODULE_0__.generateCustomMutationsProperty)(client, apiGraphqlConfig, getInternals);
    client.subscriptions = (0,_internals_generateCustomOperationsProperty_mjs__WEBPACK_IMPORTED_MODULE_0__.generateCustomSubscriptionsProperty)(client, apiGraphqlConfig, getInternals);
    client.conversations = (0,_internals_utils_clientProperties_generateConversationsProperty_mjs__WEBPACK_IMPORTED_MODULE_1__.generateConversationsProperty)(client, apiGraphqlConfig, getInternals);
    client.generations = (0,_internals_utils_clientProperties_generateGenerationsProperty_mjs__WEBPACK_IMPORTED_MODULE_2__.generateGenerationsProperty)(client, apiGraphqlConfig, getInternals);
    return client;
}


//# sourceMappingURL=addSchemaToClient.mjs.map


/***/ }),

/***/ "../../node_modules/@aws-amplify/data-schema/dist/esm/runtime/addSchemaToClientWithInstance.mjs":
/*!******************************************************************************************************!*\
  !*** ../../node_modules/@aws-amplify/data-schema/dist/esm/runtime/addSchemaToClientWithInstance.mjs ***!
  \******************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   addSchemaToClientWithInstance: () => (/* binding */ addSchemaToClientWithInstance)
/* harmony export */ });
/* harmony import */ var _internals_utils_runtimeTypeGuards_isApiGraphQLProviderConfig_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internals/utils/runtimeTypeGuards/isApiGraphQLProviderConfig.mjs */ "../../node_modules/@aws-amplify/data-schema/dist/esm/runtime/internals/utils/runtimeTypeGuards/isApiGraphQLProviderConfig.mjs");
/* harmony import */ var _internals_generateCustomOperationsProperty_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internals/generateCustomOperationsProperty.mjs */ "../../node_modules/@aws-amplify/data-schema/dist/esm/runtime/internals/generateCustomOperationsProperty.mjs");
/* harmony import */ var _internals_cancellation_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./internals/cancellation.mjs */ "../../node_modules/@aws-amplify/data-schema/dist/esm/runtime/internals/cancellation.mjs");
/* harmony import */ var _internals_ai_getCustomUserAgentDetails_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./internals/ai/getCustomUserAgentDetails.mjs */ "../../node_modules/@aws-amplify/data-schema/dist/esm/runtime/internals/ai/getCustomUserAgentDetails.mjs");
/* harmony import */ var _smithy_util_base64__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @smithy/util-base64 */ "../../node_modules/@smithy/util-base64/dist-es/index.js");
/* harmony import */ var _internals_utils_clientProperties_generateEnumsProperty_mjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./internals/utils/clientProperties/generateEnumsProperty.mjs */ "../../node_modules/@aws-amplify/data-schema/dist/esm/runtime/internals/utils/clientProperties/generateEnumsProperty.mjs");
/* harmony import */ var _internals_server_generateModelsProperty_mjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./internals/server/generateModelsProperty.mjs */ "../../node_modules/@aws-amplify/data-schema/dist/esm/runtime/internals/server/generateModelsProperty.mjs");









// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
// TODO: separate import path
function addSchemaToClientWithInstance(client, params, getInternals) {
    const apiGraphqlConfig = params.config?.API?.GraphQL;
    if ((0,_internals_utils_runtimeTypeGuards_isApiGraphQLProviderConfig_mjs__WEBPACK_IMPORTED_MODULE_0__.isApiGraphQLConfig)(apiGraphqlConfig)) {
        (0,_internals_cancellation_mjs__WEBPACK_IMPORTED_MODULE_2__.upgradeClientCancellation)(client);
        client.models = (0,_internals_server_generateModelsProperty_mjs__WEBPACK_IMPORTED_MODULE_6__.generateModelsProperty)(client, params, getInternals);
        client.enums = (0,_internals_utils_clientProperties_generateEnumsProperty_mjs__WEBPACK_IMPORTED_MODULE_5__.generateEnumsProperty)(apiGraphqlConfig);
        client.queries = (0,_internals_generateCustomOperationsProperty_mjs__WEBPACK_IMPORTED_MODULE_1__.generateCustomQueriesProperty)(client, apiGraphqlConfig, getInternals);
        client.mutations = (0,_internals_generateCustomOperationsProperty_mjs__WEBPACK_IMPORTED_MODULE_1__.generateCustomMutationsProperty)(client, apiGraphqlConfig, getInternals);
    }
    return client;
}


//# sourceMappingURL=addSchemaToClientWithInstance.mjs.map


/***/ }),

/***/ "../../node_modules/@aws-amplify/data-schema/dist/esm/runtime/index.mjs":
/*!******************************************************************************!*\
  !*** ../../node_modules/@aws-amplify/data-schema/dist/esm/runtime/index.mjs ***!
  \******************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   INTERNAL_USER_AGENT_OVERRIDE: () => (/* reexport safe */ _internals_ai_getCustomUserAgentDetails_mjs__WEBPACK_IMPORTED_MODULE_3__.INTERNAL_USER_AGENT_OVERRIDE),
/* harmony export */   __modelMeta__: () => (/* reexport safe */ _aws_amplify_data_schema_types__WEBPACK_IMPORTED_MODULE_0__.__modelMeta__),
/* harmony export */   addSchemaToClient: () => (/* reexport safe */ _addSchemaToClient_mjs__WEBPACK_IMPORTED_MODULE_1__.addSchemaToClient),
/* harmony export */   addSchemaToClientWithInstance: () => (/* reexport safe */ _addSchemaToClientWithInstance_mjs__WEBPACK_IMPORTED_MODULE_2__.addSchemaToClientWithInstance)
/* harmony export */ });
/* harmony import */ var _aws_amplify_data_schema_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @aws-amplify/data-schema-types */ "../../node_modules/@aws-amplify/data-schema-types/dist/esm/index.mjs");
/* harmony import */ var _addSchemaToClient_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./addSchemaToClient.mjs */ "../../node_modules/@aws-amplify/data-schema/dist/esm/runtime/addSchemaToClient.mjs");
/* harmony import */ var _addSchemaToClientWithInstance_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./addSchemaToClientWithInstance.mjs */ "../../node_modules/@aws-amplify/data-schema/dist/esm/runtime/addSchemaToClientWithInstance.mjs");
/* harmony import */ var _internals_ai_getCustomUserAgentDetails_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./internals/ai/getCustomUserAgentDetails.mjs */ "../../node_modules/@aws-amplify/data-schema/dist/esm/runtime/internals/ai/getCustomUserAgentDetails.mjs");




//# sourceMappingURL=index.mjs.map


/***/ }),

/***/ "../../node_modules/@aws-amplify/data-schema/dist/esm/runtime/internals/APIClient.mjs":
/*!********************************************************************************************!*\
  !*** ../../node_modules/@aws-amplify/data-schema/dist/esm/runtime/internals/APIClient.mjs ***!
  \********************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   authModeParams: () => (/* binding */ authModeParams),
/* harmony export */   buildGraphQLVariables: () => (/* binding */ buildGraphQLVariables),
/* harmony export */   customSelectionSetToIR: () => (/* binding */ customSelectionSetToIR),
/* harmony export */   flattenItems: () => (/* binding */ flattenItems),
/* harmony export */   generateGraphQLDocument: () => (/* binding */ generateGraphQLDocument),
/* harmony export */   generateSelectionSet: () => (/* binding */ generateSelectionSet),
/* harmony export */   getCustomHeaders: () => (/* binding */ getCustomHeaders),
/* harmony export */   getDefaultSelectionSetForNonModelWithIR: () => (/* binding */ getDefaultSelectionSetForNonModelWithIR),
/* harmony export */   graphQLOperationsInfo: () => (/* binding */ graphQLOperationsInfo),
/* harmony export */   initializeModel: () => (/* binding */ initializeModel),
/* harmony export */   normalizeMutationInput: () => (/* binding */ normalizeMutationInput),
/* harmony export */   selectionSetIRToString: () => (/* binding */ selectionSetIRToString)
/* harmony export */ });
/* harmony import */ var _utils_resolveOwnerFields_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/resolveOwnerFields.mjs */ "../../node_modules/@aws-amplify/data-schema/dist/esm/runtime/utils/resolveOwnerFields.mjs");
/* harmony import */ var _utils_stringTransformation_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/stringTransformation.mjs */ "../../node_modules/@aws-amplify/data-schema/dist/esm/runtime/utils/stringTransformation.mjs");
/* harmony import */ var _utils_selfAwareAsync_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/selfAwareAsync.mjs */ "../../node_modules/@aws-amplify/data-schema/dist/esm/runtime/utils/selfAwareAsync.mjs");
/* harmony import */ var _cancellation_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./cancellation.mjs */ "../../node_modules/@aws-amplify/data-schema/dist/esm/runtime/internals/cancellation.mjs");





// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
const connectionType = {
    HAS_ONE: 'HAS_ONE',
    HAS_MANY: 'HAS_MANY',
    BELONGS_TO: 'BELONGS_TO',
};
// When generating an SK's KeyConditionInput name, string-like types map to String
const skGraphQlFieldTypeMap = {
    ID: 'ID',
    String: 'String',
    AWSDate: 'String',
    AWSTime: 'String',
    AWSDateTime: 'String',
    AWSTimestamp: 'Int',
    AWSEmail: 'String',
    AWSPhone: 'String',
    AWSURL: 'String',
    AWSIPAddress: 'String',
    AWSJSON: 'String',
    Boolean: 'Boolean',
    Int: 'Int',
    Float: 'Float',
};
// move to util
const resolvedSkName = (sk) => {
    if (sk.length === 1) {
        return sk[0];
    }
    else {
        return sk.reduce((acc, curr, idx) => {
            if (idx === 0) {
                return curr;
            }
            else {
                return acc + (0,_utils_stringTransformation_mjs__WEBPACK_IMPORTED_MODULE_1__.capitalize)(curr);
            }
        }, '');
    }
};
/**
 * Crawls a model tree, starting with a given **individual** model instance record, looking
 * for related hasMany children to extract from their `items` containers.
 *
 * E.g., if we have a record like this:
 *
 * ```js
 * {
 *   id: 'some-id',
 *   children: {
 *     items: [
 *       { name: 'a' }
 *       { name: 'b' }
 *       { name: 'c' }
 *     ]
 *   }
 * }
 * ```
 *
 * And if `children` refers to *an array of another model* (as opposed to a custom type),
 * the `items` will be extracted. We do this because `items` is just the mechanism for nesting
 * child records -- we don't want customers to have to dig the items out in application code.
 * Ultimately, we return this "flattened" structure:
 *
 * ```js
 * {
 *   id: 'some-id',
 *   children: [
 *     { name: 'a' }
 *     { name: 'b' }
 *     { name: 'c' }
 *   ]
 * }
 * ```
 *
 * Notably, an identical record could be the result of a nested custom type that contains an
 * `items` property. This will *not* be flattened, because in that case the `items` property is
 * actually part of the customer's schema. Similarly if a model contains an explicit `items` field.
 *
 * @param modelIntrospection Top-level model introspection schema.
 * @param modelName The name of the model. Can be `undefined`. E.g., for customOperation return types.
 * @param modelRecord The individual "model instance record" to normalize.
 */
const flattenItems = (modelIntrospection, modelName, modelRecord) => {
    if (!modelRecord)
        return null;
    const mapped = {};
    for (const [fieldName, value] of Object.entries(modelRecord)) {
        const fieldDef = modelName
            ? modelIntrospection.models[modelName]?.fields[fieldName]
            : undefined;
        const dvPair = { fieldDef, value };
        if (isRelatedModelItemsArrayPair(dvPair)) {
            mapped[fieldName] = dvPair.value.items.map((itemValue) => flattenItems(modelIntrospection, dvPair.fieldDef.type.model, itemValue));
        }
        else if (isRelatedModelProperty(fieldDef)) {
            mapped[fieldName] = flattenItems(modelIntrospection, fieldDef.type.model, value);
        }
        else {
            mapped[fieldName] = value;
        }
    }
    return mapped;
};
/**
 * Determines whether the given field definition and associated result value
 * represent a related model array from a HasMany-type relationship.
 *
 * @param dv Pair of field definition and associated result value
 * @returns
 */
function isRelatedModelItemsArrayPair(dv) {
    return (typeof dv.fieldDef?.type === 'object' &&
        'model' in dv.fieldDef.type &&
        typeof dv.fieldDef.type.model === 'string' &&
        dv.fieldDef.isArray &&
        Array.isArray(dv.value?.items));
}
/**
 * Determines whether the given field definition represents a relationship
 * to another model.
 *
 * @param fieldDef
 * @returns
 */
function isRelatedModelProperty(fieldDef) {
    return (typeof fieldDef?.type === 'object' &&
        'model' in fieldDef.type &&
        typeof fieldDef.type.model === 'string');
}
// TODO: this should accept single result to support CRUD methods; create helper for array/list
function initializeModel(client, modelName, result, modelIntrospection, authMode, authToken, context = false) {
    const introModel = modelIntrospection.models[modelName];
    const introModelFields = introModel.fields;
    const modelFields = Object.entries(introModelFields)
        .filter(([_, field]) => field?.type?.model !== undefined)
        .map(([fieldName]) => fieldName);
    return result.map((record) => {
        if (record === null || record === undefined) {
            return record;
        }
        const initializedRelationshipFields = {};
        for (const fieldName of modelFields) {
            const modelField = introModelFields[fieldName];
            const modelFieldType = modelField?.type;
            const relatedModelName = modelFieldType.model;
            const relatedModel = modelIntrospection.models[relatedModelName];
            const relatedModelPKFieldName = relatedModel.primaryKeyInfo.primaryKeyFieldName;
            const relatedModelSKFieldNames = relatedModel.primaryKeyInfo.sortKeyFieldNames;
            const relationType = modelField.association?.connectionType;
            let connectionFields = [];
            if (modelField.association &&
                'associatedWith' in modelField.association) {
                connectionFields = modelField.association.associatedWith;
            }
            const targetNames = [];
            if (modelField.association && 'targetNames' in modelField.association) {
                targetNames.push(...modelField.association.targetNames);
            }
            switch (relationType) {
                case connectionType.BELONGS_TO: {
                    const sortKeyValues = relatedModelSKFieldNames.reduce(
                    // TODO(Eslint): is this implementation correct?
                    // eslint-disable-next-line array-callback-return
                    (acc, curVal) => {
                        if (record[curVal]) {
                            return (acc[curVal] = record[curVal]);
                        }
                    }, {});
                    // if get is disabled on the related model
                    if (client.models[relatedModelName]?.get === undefined) {
                        break;
                    }
                    if (context) {
                        initializedRelationshipFields[fieldName] = (contextSpec, options) => {
                            if (record[targetNames[0]]) {
                                return client.models[relatedModelName].get(contextSpec, {
                                    [relatedModelPKFieldName]: record[targetNames[0]],
                                    ...sortKeyValues,
                                }, {
                                    authMode: options?.authMode || authMode,
                                    authToken: options?.authToken || authToken,
                                });
                            }
                            return { data: null };
                        };
                    }
                    else {
                        initializedRelationshipFields[fieldName] = (options) => {
                            if (record[targetNames[0]]) {
                                return client.models[relatedModelName].get({
                                    [relatedModelPKFieldName]: record[targetNames[0]],
                                    ...sortKeyValues,
                                }, {
                                    authMode: options?.authMode || authMode,
                                    authToken: options?.authToken || authToken,
                                });
                            }
                            return { data: null };
                        };
                    }
                    break;
                }
                case connectionType.HAS_ONE:
                case connectionType.HAS_MANY: {
                    /**
                     * If the loader is a HAS_ONE, we just need to attempt to grab the first item
                     * from the result.
                     */
                    const mapResult = relationType === connectionType.HAS_ONE
                        ? (result) => {
                            return {
                                data: result?.data.shift() || null,
                                errors: result.errors,
                                extensions: result.extensions,
                            };
                        }
                        : (result) => result;
                    const parentPk = introModel.primaryKeyInfo.primaryKeyFieldName;
                    const parentSK = introModel.primaryKeyInfo.sortKeyFieldNames;
                    // M:N check - TODO: refactor
                    const relatedModelField = relatedModel.fields[connectionFields[0]];
                    const relatedModelFieldType = relatedModelField.type;
                    if (relatedModelFieldType.model) {
                        let relatedTargetNames = [];
                        if (relatedModelField.association &&
                            'targetNames' in relatedModelField.association) {
                            relatedTargetNames = relatedModelField.association?.targetNames;
                        }
                        const hasManyFilter = relatedTargetNames.map((field, idx) => {
                            if (idx === 0) {
                                return { [field]: { eq: record[parentPk] } };
                            }
                            return { [field]: { eq: record[parentSK[idx - 1]] } };
                        });
                        // if list is disabled on the related model
                        if (client.models[relatedModelName]?.list === undefined) {
                            break;
                        }
                        if (context) {
                            initializedRelationshipFields[fieldName] = (contextSpec, options) => {
                                if (record[parentPk]) {
                                    return (0,_utils_selfAwareAsync_mjs__WEBPACK_IMPORTED_MODULE_2__.selfAwareAsync)(async (resultPromise) => {
                                        const basePromise = client.models[relatedModelName].list(contextSpec, {
                                            filter: { and: hasManyFilter },
                                            limit: options?.limit,
                                            nextToken: options?.nextToken,
                                            authMode: options?.authMode || authMode,
                                            authToken: options?.authToken || authToken,
                                        });
                                        const extendedBase = (0,_cancellation_mjs__WEBPACK_IMPORTED_MODULE_3__.extendCancellability)(basePromise, resultPromise);
                                        return mapResult((await extendedBase));
                                    });
                                }
                                return [];
                            };
                        }
                        else {
                            initializedRelationshipFields[fieldName] = (options) => {
                                if (record[parentPk]) {
                                    return (0,_utils_selfAwareAsync_mjs__WEBPACK_IMPORTED_MODULE_2__.selfAwareAsync)(async (resultPromise) => {
                                        const basePromise = client.models[relatedModelName].list({
                                            filter: { and: hasManyFilter },
                                            limit: options?.limit,
                                            nextToken: options?.nextToken,
                                            authMode: options?.authMode || authMode,
                                            authToken: options?.authToken || authToken,
                                        });
                                        const extendedBase = (0,_cancellation_mjs__WEBPACK_IMPORTED_MODULE_3__.extendCancellability)(basePromise, resultPromise);
                                        return mapResult((await extendedBase));
                                    });
                                }
                                return [];
                            };
                        }
                        break;
                    }
                    const hasManyFilter = connectionFields.map((field, idx) => {
                        if (idx === 0) {
                            return { [field]: { eq: record[parentPk] } };
                        }
                        return { [field]: { eq: record[parentSK[idx - 1]] } };
                    });
                    // if list is disabled on the related model
                    if (client.models[relatedModelName]?.list === undefined) {
                        break;
                    }
                    if (context) {
                        initializedRelationshipFields[fieldName] = (contextSpec, options) => {
                            if (record[parentPk]) {
                                return (0,_utils_selfAwareAsync_mjs__WEBPACK_IMPORTED_MODULE_2__.selfAwareAsync)(async (resultPromise) => {
                                    const basePromise = client.models[relatedModelName].list(contextSpec, {
                                        filter: { and: hasManyFilter },
                                        limit: options?.limit,
                                        nextToken: options?.nextToken,
                                        authMode: options?.authMode || authMode,
                                        authToken: options?.authToken || authToken,
                                    });
                                    const extendedBase = (0,_cancellation_mjs__WEBPACK_IMPORTED_MODULE_3__.extendCancellability)(basePromise, resultPromise);
                                    return mapResult((await extendedBase));
                                });
                            }
                            return [];
                        };
                    }
                    else {
                        initializedRelationshipFields[fieldName] = (options) => {
                            if (record[parentPk]) {
                                return (0,_utils_selfAwareAsync_mjs__WEBPACK_IMPORTED_MODULE_2__.selfAwareAsync)(async (resultPromise) => {
                                    const basePromise = client.models[relatedModelName].list({
                                        filter: { and: hasManyFilter },
                                        limit: options?.limit,
                                        nextToken: options?.nextToken,
                                        authMode: options?.authMode || authMode,
                                        authToken: options?.authToken || authToken,
                                    });
                                    const extendedBase = (0,_cancellation_mjs__WEBPACK_IMPORTED_MODULE_3__.extendCancellability)(basePromise, resultPromise);
                                    return mapResult((await extendedBase));
                                });
                            }
                            return [];
                        };
                    }
                    break;
                }
            }
        }
        return { ...record, ...initializedRelationshipFields };
    });
}
const graphQLOperationsInfo = {
    CREATE: { operationPrefix: 'create', usePlural: false },
    GET: { operationPrefix: 'get', usePlural: false },
    UPDATE: { operationPrefix: 'update', usePlural: false },
    DELETE: { operationPrefix: 'delete', usePlural: false },
    LIST: { operationPrefix: 'list', usePlural: true },
    INDEX_QUERY: { operationPrefix: '', usePlural: false },
    ONCREATE: { operationPrefix: 'onCreate', usePlural: false },
    ONUPDATE: { operationPrefix: 'onUpdate', usePlural: false },
    ONDELETE: { operationPrefix: 'onDelete', usePlural: false },
    OBSERVEQUERY: { operationPrefix: 'observeQuery', usePlural: false },
};
const SELECTION_SET_WILDCARD = '*';
const getDefaultSelectionSetForNonModelWithIR = (nonModelDefinition, modelIntrospection) => {
    const { fields } = nonModelDefinition;
    const mappedFields = Object.values(fields)
        .map(({ type, name }) => {
        if (typeof type.enum === 'string') {
            return [name, FIELD_IR];
        }
        if (typeof type.nonModel === 'string') {
            return [
                name,
                getDefaultSelectionSetForNonModelWithIR(modelIntrospection.nonModels[type.nonModel], modelIntrospection),
            ];
        }
        if (typeof type === 'string') {
            return [name, FIELD_IR];
        }
        return undefined;
    })
        .filter((pair) => pair !== undefined);
    return Object.fromEntries(mappedFields);
};
const getDefaultSelectionSetForModelWithIR = (modelDefinition, modelIntrospection) => {
    const { fields } = modelDefinition;
    const mappedFields = Object.values(fields)
        .map(({ type, name }) => {
        if (typeof type.enum === 'string' ||
            typeof type === 'string') {
            return [name, FIELD_IR];
        }
        if (typeof type.nonModel === 'string') {
            return [
                name,
                getDefaultSelectionSetForNonModelWithIR(modelIntrospection.nonModels[type.nonModel], modelIntrospection),
            ];
        }
        return undefined;
    })
        .filter((pair) => pair !== undefined);
    const ownerFields = (0,_utils_resolveOwnerFields_mjs__WEBPACK_IMPORTED_MODULE_0__.resolveOwnerFields)(modelDefinition).map((field) => [
        field,
        FIELD_IR,
    ]);
    return Object.fromEntries(mappedFields.concat(ownerFields));
};
function defaultSelectionSetForModel(modelDefinition) {
    // fields that are explicitly part of the graphql schema; not
    // inferred from owner auth rules.
    const { fields } = modelDefinition;
    const explicitFields = Object.values(fields)
        // Default selection set omits model fields
        .map(({ type, name }) => {
        if (typeof type === 'string')
            return name;
        if (typeof type === 'object') {
            if (typeof type?.enum === 'string') {
                return name;
            }
            else if (typeof type?.nonModel === 'string') {
                return `${name}.${SELECTION_SET_WILDCARD}`;
            }
        }
        return undefined;
    })
        .filter(Boolean);
    // fields used for owner auth rules that may or may not also
    // be explicit on the model.
    const ownerFields = (0,_utils_resolveOwnerFields_mjs__WEBPACK_IMPORTED_MODULE_0__.resolveOwnerFields)(modelDefinition);
    return Array.from(new Set(explicitFields.concat(ownerFields)));
}
const FIELD_IR = '';
/**
 * Generates nested Custom Selection Set IR from path
 *
 * @param modelDefinitions
 * @param modelName
 * @param selectionSet - array of object paths
 * @example
 * ### Given
 * `selectionSet = ['id', 'comments.post.id']`
 * ### Returns
 * ```ts
 * {
 *   id: '',
 *   comments: {
 *     items: { post: { id: '' } }
 *   }
 * }
 * ```
 */
function customSelectionSetToIR(modelIntrospection, modelName, selectionSet) {
    const dotNotationToObject = (path, modelOrNonModelName) => {
        const [fieldName, ...rest] = path.split('.');
        const nested = rest[0];
        const modelOrNonModelDefinition = modelIntrospection.models[modelOrNonModelName] ??
            modelIntrospection.nonModels[modelOrNonModelName];
        const modelOrNonModelFields = modelOrNonModelDefinition?.fields;
        const relatedModel = modelOrNonModelFields?.[fieldName]?.type?.model;
        const relatedModelDefinition = modelIntrospection.models[relatedModel];
        const relatedNonModel = modelOrNonModelFields?.[fieldName]?.type?.nonModel;
        const relatedNonModelDefinition = modelIntrospection.nonModels[relatedNonModel];
        const isModelOrNonModelOrFieldType = relatedModelDefinition
            ? 'model'
            : relatedNonModelDefinition
                ? 'nonModel'
                : 'field';
        if (isModelOrNonModelOrFieldType === 'nonModel') {
            let result = {};
            if (!nested) {
                throw Error(`${fieldName} must declare a wildcard (*) or a field of custom type ${relatedNonModel}`);
            }
            if (nested === SELECTION_SET_WILDCARD) {
                result = {
                    [fieldName]: getDefaultSelectionSetForNonModelWithIR(relatedNonModelDefinition, modelIntrospection),
                };
            }
            else {
                result = {
                    [fieldName]: dotNotationToObject(rest.join('.'), relatedNonModel),
                };
            }
            return result;
        }
        else if (isModelOrNonModelOrFieldType === 'model') {
            let result = {};
            if (!nested) {
                throw Error(`${fieldName} must declare a wildcard (*) or a field of model ${relatedModel}`);
            }
            if (nested === SELECTION_SET_WILDCARD) {
                const nestedRelatedModelDefinition = modelIntrospection.models[relatedModel];
                result = {
                    [fieldName]: getDefaultSelectionSetForModelWithIR(nestedRelatedModelDefinition, modelIntrospection),
                };
            }
            else {
                result = {
                    [fieldName]: dotNotationToObject(rest.join('.'), relatedModel),
                };
            }
            if (modelOrNonModelFields[fieldName]?.isArray) {
                result = {
                    [fieldName]: {
                        items: result[fieldName],
                    },
                };
            }
            return result;
        }
        else {
            const modelField = modelOrNonModelFields?.[fieldName];
            const nonModelDefinition = modelIntrospection.nonModels[modelOrNonModelName];
            const nonModelField = nonModelDefinition?.fields?.[fieldName];
            if (!nonModelDefinition) {
                const isOwnerField = (0,_utils_resolveOwnerFields_mjs__WEBPACK_IMPORTED_MODULE_0__.resolveOwnerFields)(modelOrNonModelDefinition).includes(fieldName);
                if (!modelField && !isOwnerField) {
                    throw Error(`${fieldName} is not a field of model ${modelOrNonModelName}`);
                }
            }
            else {
                if (!nonModelField) {
                    throw Error(`${fieldName} is not a field of custom type ${modelOrNonModelName}`);
                }
            }
            return { [fieldName]: FIELD_IR };
        }
    };
    return selectionSet.reduce((resultObj, path) => deepMergeSelectionSetObjects(dotNotationToObject(path, modelName), resultObj), {});
}
/**
 * Stringifies selection set IR
 * * @example
 * ### Given
 * ```ts
 * {
 *   id: '',
 *   comments: {
 *     items: { post: { id: '' } }
 *   }
 * }
 * ```
 * ### Returns
 * `'id comments { items { post { id } } }'`
 */
function selectionSetIRToString(obj) {
    const res = [];
    Object.entries(obj).forEach(([fieldName, value]) => {
        if (value === FIELD_IR) {
            res.push(fieldName);
        }
        else if (typeof value === 'object' && value !== null) {
            if (value?.items) {
                res.push(fieldName, '{', 'items', '{', selectionSetIRToString(value.items), '}', '}');
            }
            else {
                res.push(fieldName, '{', selectionSetIRToString(value), '}');
            }
        }
    });
    return res.join(' ');
}
/**
 * Recursively merges selection set objects from `source` onto `target`.
 *
 * `target` will be updated. `source` will be left alone.
 *
 * @param source The object to merge into target.
 * @param target The object to be mutated.
 */
function deepMergeSelectionSetObjects(source, target) {
    const isObject = (obj) => obj && typeof obj === 'object';
    for (const key in source) {
        // This verification avoids 'Prototype Pollution' issue
        if (!Object.prototype.hasOwnProperty.call(source, key))
            continue;
        if (Object.prototype.hasOwnProperty.call(target, key) &&
            isObject(target[key])) {
            deepMergeSelectionSetObjects(source[key], target[key]);
        }
        else {
            target[key] = source[key];
        }
    }
    return target;
}
function generateSelectionSet(modelIntrospection, modelName, selectionSet) {
    const modelDefinition = modelIntrospection.models[modelName];
    const selSetIr = customSelectionSetToIR(modelIntrospection, modelName, selectionSet ?? defaultSelectionSetForModel(modelDefinition));
    const selSetString = selectionSetIRToString(selSetIr);
    return selSetString;
}
function generateGraphQLDocument(modelIntrospection, modelName, modelOperation, listArgs, indexMeta) {
    const modelDefinition = modelIntrospection.models[modelName];
    const { name, pluralName, fields, primaryKeyInfo: { isCustomPrimaryKey, primaryKeyFieldName, sortKeyFieldNames, }, attributes, } = modelDefinition;
    // Use pascal case of the model name to generate the operations and the arguments.
    // This is required to be in sync with the resources generated by the GraphQL transformers.
    const namePascalCase = name.charAt(0).toUpperCase() + name.slice(1);
    const pluralNamePascalCase = pluralName.charAt(0).toUpperCase() + pluralName.slice(1);
    const { operationPrefix, usePlural } = graphQLOperationsInfo[modelOperation];
    const { selectionSet } = listArgs || {};
    let graphQLFieldName;
    let indexQueryArgs;
    if (operationPrefix) {
        graphQLFieldName = `${operationPrefix}${usePlural ? pluralNamePascalCase : namePascalCase}`;
    }
    else if (indexMeta) {
        const { queryField, pk, sk = [] } = indexMeta;
        graphQLFieldName = queryField;
        /**
         * **a. Single field SK** -> single arg where name is the field name and the type is `Model${gqlFieldType}KeyConditionInput` (nullable)
         *  Note: string-like data types e.g.,  AWSDateTime, AWSEmail, AWSPhone, etc. should map to String. See `skGraphQlFieldTypeMap` above
         * @example
         * ```
         * sk1: ModelStringKeyConditionInput
         * ```
         *
         * **b. Composite SK** -> single arg where the name is camelCase concatenation of all the field names that comprise the SK
         *  and the type is `Model${modelName}${keyAttributeName}CompositeKeyConditionInput` (nullable)
         * @example
         * ```
         * sk1Sk2: ModelMyModelMyModelByPkAndSk1AndSk2CompositeKeyConditionInput
         */
        let skQueryArgs = {};
        if (sk.length === 1) {
            const [skField] = sk;
            const type = (typeof fields[skField].type === 'string'
                ? fields[skField].type
                : 'String');
            const normalizedType = skGraphQlFieldTypeMap[type];
            skQueryArgs = {
                [skField]: `Model${normalizedType}KeyConditionInput`,
            };
        }
        else if (sk.length > 1) {
            const compositeSkArgName = resolvedSkName(sk);
            const keyName = attributes?.find((attr) => attr?.properties?.queryField === queryField)?.properties?.name;
            skQueryArgs = {
                [compositeSkArgName]: `Model${(0,_utils_stringTransformation_mjs__WEBPACK_IMPORTED_MODULE_1__.capitalize)(modelName)}${(0,_utils_stringTransformation_mjs__WEBPACK_IMPORTED_MODULE_1__.capitalize)(keyName)}CompositeKeyConditionInput`,
            };
        }
        indexQueryArgs = {
            [pk]: `${Object.prototype.hasOwnProperty.call(fields[pk].type, 'enum')
                ? fields[pk].type.enum // AppSync schema sets enum type as the type of the enum fields that's used as PK
                : fields[pk].type}!`,
            ...skQueryArgs,
        };
    }
    else {
        throw new Error('Error generating GraphQL Document - invalid operation name');
    }
    let graphQLOperationType;
    let graphQLSelectionSet;
    let graphQLArguments;
    const selectionSetFields = generateSelectionSet(modelIntrospection, modelName, selectionSet);
    // default PK args for get and list operations
    // modified below for CPK
    const getPkArgs = {
        [primaryKeyFieldName]: `${fields[primaryKeyFieldName].type}!`,
    };
    const listPkArgs = {};
    /**
     * Generate query field args for the SK if it's defined
     *
     * **1. Get queries** require each SK field to be present as a separate arg where the type is the field's GraphQL scalar type (non-nullable)
     * @example
     * ```
     * sk1: String!, sk2: Int!
     * ```
     *
     * **2. List queries**
     *
     * **a. Single field SK** -> single arg where name is the field name and the type is `Model${gqlFieldType}KeyConditionInput` (nullable)
     *      Note: string-like data types e.g.,  AWSDateTime, AWSEmail, AWSPhone, etc. should map to String. See `skGraphQlFieldTypeMap` above
     * @example
     * ```
     * sk1: ModelStringKeyConditionInput
     * ```
     *
     * **b. Composite SK** -> single arg where the name is camelCase concatenation of all the field names that comprise the SK
     *  and the type is `Model${modelName}PrimaryCompositeKeyConditionInput` (nullable)
     * @example
     * ```
     * sk1Sk2: ModelMyModelPrimaryCompositeKeyConditionInput
     * ```
     */
    const generateSkArgs = (op) => {
        if (sortKeyFieldNames.length === 0)
            return {};
        if (op === 'get') {
            return sortKeyFieldNames.reduce((acc, fieldName) => {
                const fieldType = fields[fieldName].type;
                if (op === 'get') {
                    acc[fieldName] = `${fieldType}!`; // ! - SK args are non-nullable in Get queries
                }
                return acc;
            }, {});
        }
        else {
            // list SK
            if (sortKeyFieldNames.length === 1) {
                // Single SK
                const [sk] = sortKeyFieldNames;
                const type = (typeof fields[sk].type === 'string' ? fields[sk].type : 'String');
                const normalizedType = skGraphQlFieldTypeMap[type];
                return {
                    [sk]: `Model${normalizedType}KeyConditionInput`,
                };
            }
            else {
                // Composite SK
                const compositeSkArgName = resolvedSkName(sortKeyFieldNames);
                return {
                    [compositeSkArgName]: `Model${(0,_utils_stringTransformation_mjs__WEBPACK_IMPORTED_MODULE_1__.capitalize)(modelName)}PrimaryCompositeKeyConditionInput`,
                };
            }
        }
    };
    if (isCustomPrimaryKey) {
        Object.assign(getPkArgs, generateSkArgs('get'));
        Object.assign(listPkArgs, {
            // PK is only included in list query field args in the generated GQL
            // when explicitly specifying PK with .identifier(['fieldName']) or @primaryKey in the schema definition
            [primaryKeyFieldName]: `${fields[primaryKeyFieldName].type}`, // PK is always a nullable arg for list (no `!` after the type)
            sortDirection: 'ModelSortDirection',
        }, generateSkArgs('list'));
    }
    switch (modelOperation) {
        case 'CREATE':
        case 'UPDATE':
        case 'DELETE':
            graphQLArguments ??
                (graphQLArguments = {
                    input: `${operationPrefix.charAt(0).toLocaleUpperCase() +
                        operationPrefix.slice(1)}${namePascalCase}Input!`,
                });
            graphQLOperationType ?? (graphQLOperationType = 'mutation');
        // TODO(Eslint): this this case clause correct without the break statement?
        // eslint-disable-next-line no-fallthrough
        case 'GET':
            graphQLArguments ?? (graphQLArguments = getPkArgs);
            graphQLSelectionSet ?? (graphQLSelectionSet = selectionSetFields);
        // TODO(Eslint): this this case clause correct without the break statement?
        // eslint-disable-next-line no-fallthrough
        case 'LIST':
            graphQLArguments ??
                (graphQLArguments = {
                    ...listPkArgs,
                    // eslint doesn't like the ts-ignore, because it thinks it's unnecessary.
                    // But TS doesn't like the `filter: ...` because it think it will always be
                    // overwritten. (it won't be.) so, we need to ignore the TS error and then
                    // ignore the eslint error on the ts-ignore.
                    // eslint-disable-next-line
                    // @ts-ignore
                    filter: `Model${namePascalCase}FilterInput`,
                    limit: 'Int',
                    nextToken: 'String',
                });
            graphQLOperationType ?? (graphQLOperationType = 'query');
            graphQLSelectionSet ??
                (graphQLSelectionSet = `items { ${selectionSetFields} } nextToken __typename`);
        // TODO(Eslint): this this case clause correct without the break statement?
        // eslint-disable-next-line no-fallthrough
        case 'INDEX_QUERY':
            graphQLArguments ??
                (graphQLArguments = {
                    ...indexQueryArgs,
                    filter: `Model${namePascalCase}FilterInput`,
                    sortDirection: 'ModelSortDirection',
                    limit: 'Int',
                    nextToken: 'String',
                });
            graphQLOperationType ?? (graphQLOperationType = 'query');
            graphQLSelectionSet ??
                (graphQLSelectionSet = `items { ${selectionSetFields} } nextToken __typename`);
        // TODO(Eslint): this this case clause correct without the break statement?
        // eslint-disable-next-line no-fallthrough
        case 'ONCREATE':
        case 'ONUPDATE':
        case 'ONDELETE':
            graphQLArguments ??
                (graphQLArguments = {
                    filter: `ModelSubscription${namePascalCase}FilterInput`,
                });
            graphQLOperationType ?? (graphQLOperationType = 'subscription');
            graphQLSelectionSet ?? (graphQLSelectionSet = selectionSetFields);
            break;
        case 'OBSERVEQUERY':
        default:
            throw new Error('Internal error: Attempted to generate graphql document for observeQuery. Please report this error.');
    }
    const graphQLDocument = `${graphQLOperationType}${graphQLArguments
        ? `(${Object.entries(graphQLArguments).map(([fieldName, type]) => `$${fieldName}: ${type}`)})`
        : ''} { ${graphQLFieldName}${graphQLArguments
        ? `(${Object.keys(graphQLArguments).map((fieldName) => `${fieldName}: $${fieldName}`)})`
        : ''} { ${graphQLSelectionSet} } }`;
    return graphQLDocument;
}
function buildGraphQLVariables(modelDefinition, operation, arg, modelIntrospection, indexMeta) {
    const { fields, primaryKeyInfo: { isCustomPrimaryKey, primaryKeyFieldName, sortKeyFieldNames, }, } = modelDefinition;
    const skName = sortKeyFieldNames?.length && resolvedSkName(sortKeyFieldNames);
    let variables = {};
    // TODO: process input
    switch (operation) {
        case 'CREATE':
            variables = {
                input: arg
                    ? normalizeMutationInput(arg, modelDefinition, modelIntrospection)
                    : {},
            };
            break;
        case 'UPDATE':
            // readonly fields are not  updated
            variables = {
                input: arg
                    ? Object.fromEntries(Object.entries(normalizeMutationInput(arg, modelDefinition, modelIntrospection)).filter(([fieldName]) => {
                        const { isReadOnly } = fields[fieldName];
                        return !isReadOnly;
                    }))
                    : {},
            };
            break;
        case 'GET':
        case 'DELETE':
            // only identifiers are sent
            if (arg) {
                variables = isCustomPrimaryKey
                    ? [primaryKeyFieldName, ...sortKeyFieldNames].reduce((acc, fieldName) => {
                        acc[fieldName] = arg[fieldName];
                        return acc;
                    }, {})
                    : { [primaryKeyFieldName]: arg[primaryKeyFieldName] };
            }
            if (operation === 'DELETE') {
                variables = { input: variables };
            }
            break;
        case 'LIST':
            if (arg?.filter) {
                variables.filter = arg.filter;
            }
            if (arg?.sortDirection) {
                variables.sortDirection = arg.sortDirection;
            }
            if (arg && arg[primaryKeyFieldName]) {
                variables[primaryKeyFieldName] = arg[primaryKeyFieldName];
            }
            if (skName && arg && arg[skName]) {
                variables[skName] = arg[skName];
            }
            if (arg?.nextToken) {
                variables.nextToken = arg.nextToken;
            }
            if (arg?.limit) {
                variables.limit = arg.limit;
            }
            break;
        case 'INDEX_QUERY': {
            const { pk, sk = [] } = indexMeta;
            const indexQuerySkName = sk?.length && resolvedSkName(sk);
            variables[pk] = arg[pk];
            if (indexQuerySkName && arg && arg[indexQuerySkName]) {
                variables[indexQuerySkName] = arg[indexQuerySkName];
            }
            if (arg?.filter) {
                variables.filter = arg.filter;
            }
            if (arg?.sortDirection) {
                variables.sortDirection = arg.sortDirection;
            }
            if (arg?.nextToken) {
                variables.nextToken = arg.nextToken;
            }
            if (arg?.limit) {
                variables.limit = arg.limit;
            }
            break;
        }
        case 'ONCREATE':
        case 'ONUPDATE':
        case 'ONDELETE':
            if (arg?.filter) {
                variables = { filter: arg.filter };
            }
            break;
        case 'OBSERVEQUERY':
            throw new Error('Internal error: Attempted to build variables for observeQuery. Please report this error.');
        default: {
            const exhaustiveCheck = operation;
            throw new Error(`Unhandled operation case: ${exhaustiveCheck}`);
        }
    }
    return variables;
}
/**
 * Iterates over mutation input values and resolves any model inputs to their corresponding join fields/values
 *
 * @example
 * ### Usage
 * ```ts
 * const result = normalizeMutationInput({ post: post }, model, modelDefinition);
 * ```
 * ### Result
 * ```ts
 * { postId: "abc123" }
 * ```
 *
 */
function normalizeMutationInput(mutationInput, model, modelIntrospection) {
    const { fields } = model;
    const normalized = {};
    Object.entries(mutationInput).forEach(([inputFieldName, inputValue]) => {
        const fieldType = fields[inputFieldName]?.type;
        const relatedModelName = fieldType?.model;
        if (relatedModelName) {
            const association = fields[inputFieldName]?.association;
            const relatedModelDef = modelIntrospection.models[relatedModelName];
            const relatedModelPkInfo = relatedModelDef.primaryKeyInfo;
            if (association?.connectionType === connectionType.HAS_ONE) {
                const associationHasOne = association;
                associationHasOne.targetNames.forEach((targetName, idx) => {
                    const associatedFieldName = associationHasOne.associatedWith[idx];
                    normalized[targetName] = inputValue[associatedFieldName];
                });
            }
            if (association?.connectionType === connectionType.BELONGS_TO) {
                const associationBelongsTo = association;
                associationBelongsTo.targetNames.forEach((targetName, idx) => {
                    if (idx === 0) {
                        const associatedFieldName = relatedModelPkInfo.primaryKeyFieldName;
                        normalized[targetName] = inputValue[associatedFieldName];
                    }
                    else {
                        const associatedFieldName = relatedModelPkInfo.sortKeyFieldNames[idx - 1];
                        normalized[targetName] = inputValue[associatedFieldName];
                    }
                });
            }
        }
        else {
            normalized[inputFieldName] = inputValue;
        }
    });
    return normalized;
}
/**
 * Produces a parameter object that can contains auth mode/token overrides
 * only if present in either `options` (first) or configured on the `client`
 * as a fallback.
 *
 * @param client Configured client from `generateClient`
 * @param options Args/Options object from call site.
 * @returns
 */
function authModeParams(client, getInternals, options = {}) {
    const internals = getInternals(client);
    return {
        authMode: options.authMode || internals.authMode,
        authToken: options.authToken || internals.authToken,
    };
}
/**
 * Retrieves custom headers from either the client or request options.
 * @param client V6Client | V6ClientSSRRequest | V6ClientSSRCookies - for extracting client headers
 * @param requestHeaders {@link CustomHeaders} - request headers
 * @returns custom headers as {@link CustomHeaders}
 */
function getCustomHeaders(client, getInternals, requestHeaders) {
    let headers = getInternals(client).headers || {};
    // Individual request headers will take precedence over client headers.
    // We intentionally do *not* merge client and request headers.
    if (requestHeaders) {
        headers = requestHeaders;
    }
    return headers;
}


//# sourceMappingURL=APIClient.mjs.map


/***/ }),

/***/ "../../node_modules/@aws-amplify/data-schema/dist/esm/runtime/internals/ai/conversationMessageDeserializers.mjs":
/*!**********************************************************************************************************************!*\
  !*** ../../node_modules/@aws-amplify/data-schema/dist/esm/runtime/internals/ai/conversationMessageDeserializers.mjs ***!
  \**********************************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   deserializeContent: () => (/* binding */ deserializeContent)
/* harmony export */ });
/* harmony import */ var _smithy_util_base64__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @smithy/util-base64 */ "../../node_modules/@smithy/util-base64/dist-es/index.js");


// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
const deserializeContent = (content) => content.map((block) => {
    if (block.image) {
        return deserializeImageBlock(block);
    }
    if (block.toolUse) {
        return deserializeToolUseBlock(block);
    }
    if (block.toolResult) {
        return deserializeToolResultBlock(block);
    }
    return removeNullsFromBlock(block);
});
const deserializeImageBlock = ({ image }) => ({
    image: {
        ...image,
        source: {
            ...image.source,
            bytes: (0,_smithy_util_base64__WEBPACK_IMPORTED_MODULE_0__.fromBase64)(image.source.bytes),
        },
    },
});
const deserializeJsonBlock = ({ json }) => ({
    json: JSON.parse(json),
});
const deserializeToolUseBlock = ({ toolUse }) => ({
    toolUse: {
        ...toolUse,
        input: JSON.parse(toolUse.input),
    },
});
const deserializeToolResultBlock = ({ toolResult, }) => ({
    toolResult: {
        toolUseId: toolResult.toolUseId,
        content: toolResult.content.map((toolResultBlock) => {
            if (toolResultBlock.image) {
                return deserializeImageBlock(toolResultBlock);
            }
            if (toolResultBlock.json) {
                return deserializeJsonBlock(toolResultBlock);
            }
            return removeNullsFromBlock(toolResultBlock);
        }),
    },
});
const removeNullsFromBlock = (block) => Object.fromEntries(Object.entries(block).filter(([_, v]) => v !== null));


//# sourceMappingURL=conversationMessageDeserializers.mjs.map


/***/ }),

/***/ "../../node_modules/@aws-amplify/data-schema/dist/esm/runtime/internals/ai/conversationMessageSerializers.mjs":
/*!********************************************************************************************************************!*\
  !*** ../../node_modules/@aws-amplify/data-schema/dist/esm/runtime/internals/ai/conversationMessageSerializers.mjs ***!
  \********************************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   serializeAiContext: () => (/* binding */ serializeAiContext),
/* harmony export */   serializeContent: () => (/* binding */ serializeContent),
/* harmony export */   serializeToolConfiguration: () => (/* binding */ serializeToolConfiguration)
/* harmony export */ });
/* harmony import */ var _smithy_util_base64__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @smithy/util-base64 */ "../../node_modules/@smithy/util-base64/dist-es/index.js");


// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
const serializeAiContext = (aiContext) => JSON.stringify(aiContext);
const serializeContent = (content) => content.map((block) => {
    if (block.image) {
        return serializeImageBlock(block);
    }
    if (block.toolResult) {
        return serializeToolResultBlock(block);
    }
    return block;
});
const serializeToolConfiguration = ({ tools }) => ({
    tools: Object.entries(tools).map(([name, tool]) => ({
        toolSpec: {
            name,
            description: tool.description,
            inputSchema: {
                json: JSON.stringify(tool.inputSchema.json),
            },
        },
    })),
});
const serializeImageBlock = ({ image }) => ({
    image: {
        ...image,
        source: {
            ...image.source,
            bytes: (0,_smithy_util_base64__WEBPACK_IMPORTED_MODULE_0__.toBase64)(image.source.bytes),
        },
    },
});
const serializeJsonBlock = ({ json }) => ({
    json: JSON.stringify(json),
});
const serializeToolResultBlock = ({ toolResult, }) => ({
    toolResult: {
        ...toolResult,
        content: toolResult.content.map((toolResultBlock) => {
            if (toolResultBlock.image) {
                return serializeImageBlock(toolResultBlock);
            }
            if (toolResultBlock.json) {
                return serializeJsonBlock(toolResultBlock);
            }
            return toolResultBlock;
        }),
    },
});


//# sourceMappingURL=conversationMessageSerializers.mjs.map


/***/ }),

/***/ "../../node_modules/@aws-amplify/data-schema/dist/esm/runtime/internals/ai/convertItemToConversation.mjs":
/*!***************************************************************************************************************!*\
  !*** ../../node_modules/@aws-amplify/data-schema/dist/esm/runtime/internals/ai/convertItemToConversation.mjs ***!
  \***************************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   convertItemToConversation: () => (/* binding */ convertItemToConversation)
/* harmony export */ });
/* harmony import */ var _createListMessagesFunction_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./createListMessagesFunction.mjs */ "../../node_modules/@aws-amplify/data-schema/dist/esm/runtime/internals/ai/createListMessagesFunction.mjs");
/* harmony import */ var _createOnMessageFunction_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./createOnMessageFunction.mjs */ "../../node_modules/@aws-amplify/data-schema/dist/esm/runtime/internals/ai/createOnMessageFunction.mjs");
/* harmony import */ var _createSendMessageFunction_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./createSendMessageFunction.mjs */ "../../node_modules/@aws-amplify/data-schema/dist/esm/runtime/internals/ai/createSendMessageFunction.mjs");




// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
const convertItemToConversation = (client, modelIntrospection, conversationId, conversationCreatedAt, conversationUpdatedAt, conversationRouteName, conversationMessageModel, getInternals, conversationMetadata, conversationName) => {
    if (!conversationId) {
        throw new Error(`An error occurred converting a ${conversationRouteName} conversation: Missing ID`);
    }
    return {
        id: conversationId,
        createdAt: conversationCreatedAt,
        updatedAt: conversationUpdatedAt,
        metadata: conversationMetadata,
        name: conversationName,
        onMessage: (0,_createOnMessageFunction_mjs__WEBPACK_IMPORTED_MODULE_1__.createOnMessageFunction)(client, modelIntrospection, conversationId, conversationRouteName, getInternals),
        sendMessage: (0,_createSendMessageFunction_mjs__WEBPACK_IMPORTED_MODULE_2__.createSendMessageFunction)(client, modelIntrospection, conversationId, conversationRouteName, getInternals),
        listMessages: (0,_createListMessagesFunction_mjs__WEBPACK_IMPORTED_MODULE_0__.createListMessagesFunction)(client, modelIntrospection, conversationId, conversationMessageModel, getInternals),
    };
};


//# sourceMappingURL=convertItemToConversation.mjs.map


/***/ }),

/***/ "../../node_modules/@aws-amplify/data-schema/dist/esm/runtime/internals/ai/convertItemToConversationMessage.mjs":
/*!**********************************************************************************************************************!*\
  !*** ../../node_modules/@aws-amplify/data-schema/dist/esm/runtime/internals/ai/convertItemToConversationMessage.mjs ***!
  \**********************************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   convertItemToConversationMessage: () => (/* binding */ convertItemToConversationMessage)
/* harmony export */ });
/* harmony import */ var _conversationMessageDeserializers_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./conversationMessageDeserializers.mjs */ "../../node_modules/@aws-amplify/data-schema/dist/esm/runtime/internals/ai/conversationMessageDeserializers.mjs");


// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
const convertItemToConversationMessage = ({ content, createdAt, id, conversationId, role, }) => ({
    content: (0,_conversationMessageDeserializers_mjs__WEBPACK_IMPORTED_MODULE_0__.deserializeContent)(content),
    conversationId,
    createdAt,
    id,
    role,
});


//# sourceMappingURL=convertItemToConversationMessage.mjs.map


/***/ }),

/***/ "../../node_modules/@aws-amplify/data-schema/dist/esm/runtime/internals/ai/createCreateConversationFunction.mjs":
/*!**********************************************************************************************************************!*\
  !*** ../../node_modules/@aws-amplify/data-schema/dist/esm/runtime/internals/ai/createCreateConversationFunction.mjs ***!
  \**********************************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createCreateConversationFunction: () => (/* binding */ createCreateConversationFunction)
/* harmony export */ });
/* harmony import */ var _operations_get_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../operations/get.mjs */ "../../node_modules/@aws-amplify/data-schema/dist/esm/runtime/internals/operations/get.mjs");
/* harmony import */ var _convertItemToConversation_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./convertItemToConversation.mjs */ "../../node_modules/@aws-amplify/data-schema/dist/esm/runtime/internals/ai/convertItemToConversation.mjs");
/* harmony import */ var _getCustomUserAgentDetails_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./getCustomUserAgentDetails.mjs */ "../../node_modules/@aws-amplify/data-schema/dist/esm/runtime/internals/ai/getCustomUserAgentDetails.mjs");




// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
const createCreateConversationFunction = (client, modelIntrospection, conversationRouteName, conversationModel, conversationMessageModel, getInternals) => async () => {
    const get = (0,_operations_get_mjs__WEBPACK_IMPORTED_MODULE_0__.getFactory)(client, modelIntrospection, conversationModel, 'CREATE', getInternals, false, (0,_getCustomUserAgentDetails_mjs__WEBPACK_IMPORTED_MODULE_2__.getCustomUserAgentDetails)(_getCustomUserAgentDetails_mjs__WEBPACK_IMPORTED_MODULE_2__.AiAction.CreateConversation));
    const { data, errors } = await get();
    return {
        data: (0,_convertItemToConversation_mjs__WEBPACK_IMPORTED_MODULE_1__.convertItemToConversation)(client, modelIntrospection, data?.id, data?.createdAt, data?.updatedAt, conversationRouteName, conversationMessageModel, getInternals, data?.metadata, data?.name),
        errors,
    };
};


//# sourceMappingURL=createCreateConversationFunction.mjs.map


/***/ }),

/***/ "../../node_modules/@aws-amplify/data-schema/dist/esm/runtime/internals/ai/createDeleteConversationFunction.mjs":
/*!**********************************************************************************************************************!*\
  !*** ../../node_modules/@aws-amplify/data-schema/dist/esm/runtime/internals/ai/createDeleteConversationFunction.mjs ***!
  \**********************************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createDeleteConversationFunction: () => (/* binding */ createDeleteConversationFunction)
/* harmony export */ });
/* harmony import */ var _operations_get_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../operations/get.mjs */ "../../node_modules/@aws-amplify/data-schema/dist/esm/runtime/internals/operations/get.mjs");
/* harmony import */ var _convertItemToConversation_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./convertItemToConversation.mjs */ "../../node_modules/@aws-amplify/data-schema/dist/esm/runtime/internals/ai/convertItemToConversation.mjs");
/* harmony import */ var _getCustomUserAgentDetails_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./getCustomUserAgentDetails.mjs */ "../../node_modules/@aws-amplify/data-schema/dist/esm/runtime/internals/ai/getCustomUserAgentDetails.mjs");




// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
const createDeleteConversationFunction = (client, modelIntrospection, conversationRouteName, conversationModel, conversationMessageModel, getInternals) => async ({ id }) => {
    const deleteOperation = (0,_operations_get_mjs__WEBPACK_IMPORTED_MODULE_0__.getFactory)(client, modelIntrospection, conversationModel, 'DELETE', getInternals, false, (0,_getCustomUserAgentDetails_mjs__WEBPACK_IMPORTED_MODULE_2__.getCustomUserAgentDetails)(_getCustomUserAgentDetails_mjs__WEBPACK_IMPORTED_MODULE_2__.AiAction.DeleteConversation));
    const { data, errors } = await deleteOperation({ id });
    return {
        data: data
            ? (0,_convertItemToConversation_mjs__WEBPACK_IMPORTED_MODULE_1__.convertItemToConversation)(client, modelIntrospection, data?.id, data?.createdAt, data?.updatedAt, conversationRouteName, conversationMessageModel, getInternals, data?.metadata, data?.name)
            : data,
        errors,
    };
};


//# sourceMappingURL=createDeleteConversationFunction.mjs.map


/***/ }),

/***/ "../../node_modules/@aws-amplify/data-schema/dist/esm/runtime/internals/ai/createGetConversationFunction.mjs":
/*!*******************************************************************************************************************!*\
  !*** ../../node_modules/@aws-amplify/data-schema/dist/esm/runtime/internals/ai/createGetConversationFunction.mjs ***!
  \*******************************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createGetConversationFunction: () => (/* binding */ createGetConversationFunction)
/* harmony export */ });
/* harmony import */ var _operations_get_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../operations/get.mjs */ "../../node_modules/@aws-amplify/data-schema/dist/esm/runtime/internals/operations/get.mjs");
/* harmony import */ var _convertItemToConversation_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./convertItemToConversation.mjs */ "../../node_modules/@aws-amplify/data-schema/dist/esm/runtime/internals/ai/convertItemToConversation.mjs");
/* harmony import */ var _getCustomUserAgentDetails_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./getCustomUserAgentDetails.mjs */ "../../node_modules/@aws-amplify/data-schema/dist/esm/runtime/internals/ai/getCustomUserAgentDetails.mjs");




// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
const createGetConversationFunction = (client, modelIntrospection, conversationRouteName, conversationModel, conversationMessageModel, getInternals) => async ({ id }) => {
    const get = (0,_operations_get_mjs__WEBPACK_IMPORTED_MODULE_0__.getFactory)(client, modelIntrospection, conversationModel, 'GET', getInternals, false, (0,_getCustomUserAgentDetails_mjs__WEBPACK_IMPORTED_MODULE_2__.getCustomUserAgentDetails)(_getCustomUserAgentDetails_mjs__WEBPACK_IMPORTED_MODULE_2__.AiAction.GetConversation));
    const { data, errors } = await get({ id });
    return {
        data: data
            ? (0,_convertItemToConversation_mjs__WEBPACK_IMPORTED_MODULE_1__.convertItemToConversation)(client, modelIntrospection, data.id, data.createdAt, data.updatedAt, conversationRouteName, conversationMessageModel, getInternals, data?.metadata, data?.name)
            : data,
        errors,
    };
};


//# sourceMappingURL=createGetConversationFunction.mjs.map


/***/ }),

/***/ "../../node_modules/@aws-amplify/data-schema/dist/esm/runtime/internals/ai/createListConversationsFunction.mjs":
/*!*********************************************************************************************************************!*\
  !*** ../../node_modules/@aws-amplify/data-schema/dist/esm/runtime/internals/ai/createListConversationsFunction.mjs ***!
  \*********************************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createListConversationsFunction: () => (/* binding */ createListConversationsFunction)
/* harmony export */ });
/* harmony import */ var _operations_list_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../operations/list.mjs */ "../../node_modules/@aws-amplify/data-schema/dist/esm/runtime/internals/operations/list.mjs");
/* harmony import */ var _convertItemToConversation_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./convertItemToConversation.mjs */ "../../node_modules/@aws-amplify/data-schema/dist/esm/runtime/internals/ai/convertItemToConversation.mjs");
/* harmony import */ var _getCustomUserAgentDetails_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./getCustomUserAgentDetails.mjs */ "../../node_modules/@aws-amplify/data-schema/dist/esm/runtime/internals/ai/getCustomUserAgentDetails.mjs");




// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
const createListConversationsFunction = (client, modelIntrospection, conversationRouteName, conversationModel, conversationMessageModel, getInternals) => async (input) => {
    const list = (0,_operations_list_mjs__WEBPACK_IMPORTED_MODULE_0__.listFactory)(client, modelIntrospection, conversationModel, getInternals, false, (0,_getCustomUserAgentDetails_mjs__WEBPACK_IMPORTED_MODULE_2__.getCustomUserAgentDetails)(_getCustomUserAgentDetails_mjs__WEBPACK_IMPORTED_MODULE_2__.AiAction.ListConversations));
    const { data, nextToken, errors } = await list(input);
    return {
        data: data.map((datum) => {
            return (0,_convertItemToConversation_mjs__WEBPACK_IMPORTED_MODULE_1__.convertItemToConversation)(client, modelIntrospection, datum.id, datum.createdAt, datum.updatedAt, conversationRouteName, conversationMessageModel, getInternals, datum?.metadata, datum?.name);
        }),
        nextToken,
        errors,
    };
};


//# sourceMappingURL=createListConversationsFunction.mjs.map


/***/ }),

/***/ "../../node_modules/@aws-amplify/data-schema/dist/esm/runtime/internals/ai/createListMessagesFunction.mjs":
/*!****************************************************************************************************************!*\
  !*** ../../node_modules/@aws-amplify/data-schema/dist/esm/runtime/internals/ai/createListMessagesFunction.mjs ***!
  \****************************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createListMessagesFunction: () => (/* binding */ createListMessagesFunction)
/* harmony export */ });
/* harmony import */ var _operations_list_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../operations/list.mjs */ "../../node_modules/@aws-amplify/data-schema/dist/esm/runtime/internals/operations/list.mjs");
/* harmony import */ var _convertItemToConversationMessage_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./convertItemToConversationMessage.mjs */ "../../node_modules/@aws-amplify/data-schema/dist/esm/runtime/internals/ai/convertItemToConversationMessage.mjs");
/* harmony import */ var _getCustomUserAgentDetails_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./getCustomUserAgentDetails.mjs */ "../../node_modules/@aws-amplify/data-schema/dist/esm/runtime/internals/ai/getCustomUserAgentDetails.mjs");




// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
const createListMessagesFunction = (client, modelIntrospection, conversationId, conversationMessageModel, getInternals) => async (input) => {
    const list = (0,_operations_list_mjs__WEBPACK_IMPORTED_MODULE_0__.listFactory)(client, modelIntrospection, conversationMessageModel, getInternals, false, (0,_getCustomUserAgentDetails_mjs__WEBPACK_IMPORTED_MODULE_2__.getCustomUserAgentDetails)(_getCustomUserAgentDetails_mjs__WEBPACK_IMPORTED_MODULE_2__.AiAction.ListMessages));
    const { data, nextToken, errors } = await list({
        ...input,
        filter: { conversationId: { eq: conversationId } },
    });
    return {
        data: data.map((item) => (0,_convertItemToConversationMessage_mjs__WEBPACK_IMPORTED_MODULE_1__.convertItemToConversationMessage)(item)),
        nextToken,
        errors,
    };
};


//# sourceMappingURL=createListMessagesFunction.mjs.map


/***/ }),

/***/ "../../node_modules/@aws-amplify/data-schema/dist/esm/runtime/internals/ai/createOnMessageFunction.mjs":
/*!*************************************************************************************************************!*\
  !*** ../../node_modules/@aws-amplify/data-schema/dist/esm/runtime/internals/ai/createOnMessageFunction.mjs ***!
  \*************************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createOnMessageFunction: () => (/* binding */ createOnMessageFunction)
/* harmony export */ });
/* harmony import */ var _operations_custom_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../operations/custom.mjs */ "../../node_modules/@aws-amplify/data-schema/dist/esm/runtime/internals/operations/custom.mjs");
/* harmony import */ var _convertItemToConversationMessage_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./convertItemToConversationMessage.mjs */ "../../node_modules/@aws-amplify/data-schema/dist/esm/runtime/internals/ai/convertItemToConversationMessage.mjs");
/* harmony import */ var _getCustomUserAgentDetails_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./getCustomUserAgentDetails.mjs */ "../../node_modules/@aws-amplify/data-schema/dist/esm/runtime/internals/ai/getCustomUserAgentDetails.mjs");




// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
const createOnMessageFunction = (client, modelIntrospection, conversationId, conversationRouteName, getInternals) => (handler) => {
    const { conversations } = modelIntrospection;
    // Safe guard for standalone function. When called as part of client generation, this should never be falsy.
    if (!conversations) {
        return {};
    }
    const subscribeSchema = conversations[conversationRouteName].message.subscribe;
    const subscribeOperation = (0,_operations_custom_mjs__WEBPACK_IMPORTED_MODULE_0__.customOpFactory)(client, modelIntrospection, 'subscription', subscribeSchema, false, getInternals, (0,_getCustomUserAgentDetails_mjs__WEBPACK_IMPORTED_MODULE_2__.getCustomUserAgentDetails)(_getCustomUserAgentDetails_mjs__WEBPACK_IMPORTED_MODULE_2__.AiAction.OnMessage));
    return subscribeOperation({ conversationId }).subscribe((data) => {
        handler((0,_convertItemToConversationMessage_mjs__WEBPACK_IMPORTED_MODULE_1__.convertItemToConversationMessage)(data));
    });
};


//# sourceMappingURL=createOnMessageFunction.mjs.map


/***/ }),

/***/ "../../node_modules/@aws-amplify/data-schema/dist/esm/runtime/internals/ai/createSendMessageFunction.mjs":
/*!***************************************************************************************************************!*\
  !*** ../../node_modules/@aws-amplify/data-schema/dist/esm/runtime/internals/ai/createSendMessageFunction.mjs ***!
  \***************************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createSendMessageFunction: () => (/* binding */ createSendMessageFunction)
/* harmony export */ });
/* harmony import */ var _operations_custom_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../operations/custom.mjs */ "../../node_modules/@aws-amplify/data-schema/dist/esm/runtime/internals/operations/custom.mjs");
/* harmony import */ var _convertItemToConversationMessage_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./convertItemToConversationMessage.mjs */ "../../node_modules/@aws-amplify/data-schema/dist/esm/runtime/internals/ai/convertItemToConversationMessage.mjs");
/* harmony import */ var _conversationMessageSerializers_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./conversationMessageSerializers.mjs */ "../../node_modules/@aws-amplify/data-schema/dist/esm/runtime/internals/ai/conversationMessageSerializers.mjs");
/* harmony import */ var _getCustomUserAgentDetails_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./getCustomUserAgentDetails.mjs */ "../../node_modules/@aws-amplify/data-schema/dist/esm/runtime/internals/ai/getCustomUserAgentDetails.mjs");





// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
const createSendMessageFunction = (client, modelIntrospection, conversationId, conversationRouteName, getInternals) => async (input) => {
    const { conversations } = modelIntrospection;
    // Safe guard for standalone function. When called as part of client generation, this should never be falsy.
    if (!conversations) {
        return {};
    }
    const processedInput = typeof input === 'string' ? { content: [{ text: input }] } : input;
    const { content, aiContext, toolConfiguration } = processedInput;
    const sendSchema = conversations[conversationRouteName].message.send;
    const sendOperation = (0,_operations_custom_mjs__WEBPACK_IMPORTED_MODULE_0__.customOpFactory)(client, modelIntrospection, 'mutation', sendSchema, false, getInternals, (0,_getCustomUserAgentDetails_mjs__WEBPACK_IMPORTED_MODULE_3__.getCustomUserAgentDetails)(_getCustomUserAgentDetails_mjs__WEBPACK_IMPORTED_MODULE_3__.AiAction.SendMessage));
    const { data, errors } = await sendOperation({
        conversationId,
        content: (0,_conversationMessageSerializers_mjs__WEBPACK_IMPORTED_MODULE_2__.serializeContent)(content),
        ...(aiContext && { aiContext: (0,_conversationMessageSerializers_mjs__WEBPACK_IMPORTED_MODULE_2__.serializeAiContext)(aiContext) }),
        ...(toolConfiguration && {
            toolConfiguration: (0,_conversationMessageSerializers_mjs__WEBPACK_IMPORTED_MODULE_2__.serializeToolConfiguration)(toolConfiguration),
        }),
    });
    return {
        data: data ? (0,_convertItemToConversationMessage_mjs__WEBPACK_IMPORTED_MODULE_1__.convertItemToConversationMessage)(data) : data,
        errors,
    };
};


//# sourceMappingURL=createSendMessageFunction.mjs.map


/***/ }),

/***/ "../../node_modules/@aws-amplify/data-schema/dist/esm/runtime/internals/ai/getCustomUserAgentDetails.mjs":
/*!***************************************************************************************************************!*\
  !*** ../../node_modules/@aws-amplify/data-schema/dist/esm/runtime/internals/ai/getCustomUserAgentDetails.mjs ***!
  \***************************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AiAction: () => (/* binding */ AiAction),
/* harmony export */   INTERNAL_USER_AGENT_OVERRIDE: () => (/* binding */ INTERNAL_USER_AGENT_OVERRIDE),
/* harmony export */   createUserAgentOverride: () => (/* binding */ createUserAgentOverride),
/* harmony export */   getCustomUserAgentDetails: () => (/* binding */ getCustomUserAgentDetails)
/* harmony export */ });
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
/**
 * Symbol used for internal user agent overrides.
 *
 * @internal
 * This symbol is intended for internal use within the Amplify library.
 * It may change or be removed in future versions without notice.
 * External usage of this symbol is discouraged and may lead to unexpected behavior.
 */
const INTERNAL_USER_AGENT_OVERRIDE = Symbol('INTERNAL_USER_AGENT_OVERRIDE');
var AiAction;
(function (AiAction) {
    AiAction["CreateConversation"] = "1";
    AiAction["GetConversation"] = "2";
    AiAction["ListConversations"] = "3";
    AiAction["DeleteConversation"] = "4";
    AiAction["SendMessage"] = "5";
    AiAction["ListMessages"] = "6";
    AiAction["OnMessage"] = "7";
    AiAction["Generation"] = "8";
})(AiAction || (AiAction = {}));
const getCustomUserAgentDetails = (action) => ({
    category: 'ai',
    action,
});
/**
 * Creates a user agent override object based on custom details.
 *
 * @internal
 * This function is intended for internal use within the Amplify library.
 * It may change or be removed in future versions without notice.
 *
 * @param customUserAgentDetails - Optional custom user agent details
 * @returns An object with INTERNAL_USER_AGENT_OVERRIDE symbol as key and customUserAgentDetails as value, or undefined if no details provided
 */
function createUserAgentOverride(customUserAgentDetails) {
    return customUserAgentDetails
        ? { [INTERNAL_USER_AGENT_OVERRIDE]: customUserAgentDetails }
        : undefined;
}


//# sourceMappingURL=getCustomUserAgentDetails.mjs.map


/***/ }),

/***/ "../../node_modules/@aws-amplify/data-schema/dist/esm/runtime/internals/cancellation.mjs":
/*!***********************************************************************************************!*\
  !*** ../../node_modules/@aws-amplify/data-schema/dist/esm/runtime/internals/cancellation.mjs ***!
  \***********************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   extendCancellability: () => (/* binding */ extendCancellability),
/* harmony export */   upgradeClientCancellation: () => (/* binding */ upgradeClientCancellation)
/* harmony export */ });
/**
 * A map of cancellable promise "extensions".
 *
 * Each entry value must either be a directly `cancel()`-able promise, or must
 * refer to another entry.
 *
 * When cancellation of a promise is requested, cancel
 * will check to see if the promise exists in the map. If it does, it pulls
 * the value and repeats the check. If not, it will perform the underlying
 * cancel operation.
 */
const promiseMap = new WeakMap();
function extendCancellability(existingCancellablePromise, newPromiseToRegister) {
    promiseMap.set(newPromiseToRegister, existingCancellablePromise);
    return existingCancellablePromise.finally(() => {
        promiseMap.delete(newPromiseToRegister);
    });
}
/**
 * Wraps the existing `cancel()` method with logic to iteratively search for
 * the corresponding base level promise, if needed, that the core graphql client
 * knows how to cancel.
 *
 * @param client
 */
function upgradeClientCancellation(client) {
    const innerCancel = client.cancel.bind(client);
    client.cancel = function (promise, message) {
        const visited = new Set();
        let targetPromise = promise;
        while (targetPromise && promiseMap.has(targetPromise)) {
            if (visited.has(targetPromise))
                throw new Error('A cycle was detected in the modeled graphql cancellation chain. This is a bug. Please report it!');
            visited.add(targetPromise);
            targetPromise = promiseMap.get(targetPromise);
        }
        // call `innerCancel` with `targetPromise!` to defer to existing implementation
        // on how to handle `null | undefined` or otherwise "non-cancellable" objects.
        return innerCancel(targetPromise, message);
    };
}


//# sourceMappingURL=cancellation.mjs.map


/***/ }),

/***/ "../../node_modules/@aws-amplify/data-schema/dist/esm/runtime/internals/clientUtils.mjs":
/*!**********************************************************************************************!*\
  !*** ../../node_modules/@aws-amplify/data-schema/dist/esm/runtime/internals/clientUtils.mjs ***!
  \**********************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   excludeDisabledOps: () => (/* binding */ excludeDisabledOps),
/* harmony export */   getSecondaryIndexesFromSchemaModel: () => (/* binding */ getSecondaryIndexesFromSchemaModel)
/* harmony export */ });
/* harmony import */ var _APIClient_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./APIClient.mjs */ "../../node_modules/@aws-amplify/data-schema/dist/esm/runtime/internals/APIClient.mjs");


const attributeIsSecondaryIndex = (attr) => {
    return (attr.type === 'key' &&
        // presence of `name` property distinguishes GSI from primary index
        attr.properties?.name &&
        attr.properties?.queryField &&
        attr.properties?.fields.length > 0);
};
const getSecondaryIndexesFromSchemaModel = (model) => {
    const idxs = model.attributes
        ?.filter(attributeIsSecondaryIndex)
        .map((attr) => {
        const queryField = attr.properties.queryField;
        const [pk, ...sk] = attr.properties.fields;
        return {
            queryField,
            pk,
            sk,
        };
    });
    return idxs || [];
};
/**
 * returns graphQLOperationsInfo, but filters out operations that were disabled via model().disableOperations([...])
 */
const excludeDisabledOps = (mis, modelName) => {
    /* Example model attributes in MIS {
      "type": "model",
      "properties": {
        "subscriptions": null,
        "mutations": { "delete": null }
        "timestamps": null
      } }*/
    const modelAttrs = mis.models[modelName].attributes?.find((attr) => attr.type === 'model');
    const coarseToFineDict = {
        queries: ['list', 'get', 'observeQuery'],
        mutations: ['create', 'update', 'delete'],
        subscriptions: ['onCreate', 'onUpdate', 'onDelete'],
    };
    const disabledOps = [];
    if (!modelAttrs) {
        return _APIClient_mjs__WEBPACK_IMPORTED_MODULE_0__.graphQLOperationsInfo;
    }
    if (modelAttrs.properties) {
        for (const [key, value] of Object.entries(modelAttrs.properties)) {
            // model.properties can contain other values that are not relevant to disabling ops, e.g. timestamps
            if (!(key in coarseToFineDict)) {
                continue;
            }
            if (value === null) {
                // coarse-grained disable, e.g. "subscriptions": null,
                disabledOps.push(...coarseToFineDict[key]);
            }
            else if (value instanceof Object) {
                // fine-grained, e.g. "mutations": { "delete": null }
                disabledOps.push(...Object.keys(value));
            }
        }
    }
    // observeQuery only exists on the client side, so can't be explicitly disabled via schema builder.
    // It's unusable without `list`
    if (disabledOps.includes('list')) {
        disabledOps.push('observeQuery');
    }
    // graphQLOperationsInfo keys are in caps
    const disabledOpsUpper = disabledOps.map((op) => op.toUpperCase());
    const filteredGraphQLOperations = Object.fromEntries(Object.entries(_APIClient_mjs__WEBPACK_IMPORTED_MODULE_0__.graphQLOperationsInfo).filter(([key]) => !disabledOpsUpper.includes(key)));
    return filteredGraphQLOperations;
};


//# sourceMappingURL=clientUtils.mjs.map


/***/ }),

/***/ "../../node_modules/@aws-amplify/data-schema/dist/esm/runtime/internals/generateCustomOperationsProperty.mjs":
/*!*******************************************************************************************************************!*\
  !*** ../../node_modules/@aws-amplify/data-schema/dist/esm/runtime/internals/generateCustomOperationsProperty.mjs ***!
  \*******************************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   generateCustomMutationsProperty: () => (/* binding */ generateCustomMutationsProperty),
/* harmony export */   generateCustomOperationsProperty: () => (/* binding */ generateCustomOperationsProperty),
/* harmony export */   generateCustomQueriesProperty: () => (/* binding */ generateCustomQueriesProperty),
/* harmony export */   generateCustomSubscriptionsProperty: () => (/* binding */ generateCustomSubscriptionsProperty)
/* harmony export */ });
/* harmony import */ var _operations_custom_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./operations/custom.mjs */ "../../node_modules/@aws-amplify/data-schema/dist/esm/runtime/internals/operations/custom.mjs");


const operationTypeMap = {
    queries: 'query',
    mutations: 'mutation',
    subscriptions: 'subscription',
};
function generateCustomOperationsProperty(client, config, operationsType, getInternals) {
    // some bundlers end up with `Amplify.configure` being called *after* generate client.
    // if that occurs, we need to *not error* while we wait. handling for late configuration
    // occurs in `generateClient()`. we do not need to subscribe to Hub events here.
    if (!config) {
        return {};
    }
    const modelIntrospection = config.modelIntrospection;
    // model intro schema might be absent if there's not actually a configured GraphQL API
    if (!modelIntrospection) {
        return {};
    }
    // custom operations will be absent from model intro schema if no custom ops
    // are present on the source schema.
    const operations = modelIntrospection[operationsType];
    if (!operations) {
        return {};
    }
    const ops = {};
    const useContext = getInternals(client).amplify === null;
    for (const operation of Object.values(operations)) {
        ops[operation.name] = (0,_operations_custom_mjs__WEBPACK_IMPORTED_MODULE_0__.customOpFactory)(client, modelIntrospection, operationTypeMap[operationsType], operation, useContext, getInternals);
    }
    return ops;
}
function generateCustomMutationsProperty(client, config, getInternals) {
    return generateCustomOperationsProperty(client, config, 'mutations', getInternals);
}
function generateCustomQueriesProperty(client, config, getInternals) {
    return generateCustomOperationsProperty(client, config, 'queries', getInternals);
}
function generateCustomSubscriptionsProperty(client, config, getInternals) {
    return generateCustomOperationsProperty(client, config, 'subscriptions', getInternals);
}


//# sourceMappingURL=generateCustomOperationsProperty.mjs.map


/***/ }),

/***/ "../../node_modules/@aws-amplify/data-schema/dist/esm/runtime/internals/operations/custom.mjs":
/*!****************************************************************************************************!*\
  !*** ../../node_modules/@aws-amplify/data-schema/dist/esm/runtime/internals/operations/custom.mjs ***!
  \****************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   customOpFactory: () => (/* binding */ customOpFactory)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs */ "../../node_modules/rxjs/dist/esm5/internal/operators/map.js");
/* harmony import */ var _APIClient_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../APIClient.mjs */ "../../node_modules/@aws-amplify/data-schema/dist/esm/runtime/internals/APIClient.mjs");
/* harmony import */ var _utils_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils.mjs */ "../../node_modules/@aws-amplify/data-schema/dist/esm/runtime/internals/operations/utils.mjs");
/* harmony import */ var _utils_selfAwareAsync_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../utils/selfAwareAsync.mjs */ "../../node_modules/@aws-amplify/data-schema/dist/esm/runtime/utils/selfAwareAsync.mjs");
/* harmony import */ var _cancellation_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../cancellation.mjs */ "../../node_modules/@aws-amplify/data-schema/dist/esm/runtime/internals/cancellation.mjs");
/* harmony import */ var _ai_getCustomUserAgentDetails_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../ai/getCustomUserAgentDetails.mjs */ "../../node_modules/@aws-amplify/data-schema/dist/esm/runtime/internals/ai/getCustomUserAgentDetails.mjs");







/**
 * Type guard for checking whether a Custom Operation argument is a contextSpec object
 */
const argIsContextSpec = (arg) => {
    return typeof arg?.token?.value === 'symbol';
};
/**
 * Builds an operation function, embedded with all client and context data, that
 * can be attached to a client as a custom query or mutation.
 *
 * If we have this source schema:
 *
 * ```typescript
 * a.schema({
 *   echo: a.query()
 *     .arguments({input: a.string().required()})
 *     .returns(a.string())
 * })
 * ```
 *
 * Our model intro schema will contain an entry like this:
 *
 * ```ts
 * {
 *   queries: {
 *     echo: {
 *       name: "echo",
 *       isArray: false,
 *       type: 'String',
 *       isRequired: false,
 *       arguments: {
 *         input: {
 *           name: 'input',
 *           isArray: false,
 *           type: String,
 *           isRequired: true
 *         }
 *       }
 *     }
 *   }
 * }
 * ```
 *
 * The `echo` object is used to build the `echo' method that goes here:
 *
 * ```typescript
 * const client = generateClent()
 * const { data } = await client.queries.echo({input: 'a string'});
 * //                                    ^
 * //                                    |
 * //                                    +-- This one right here.
 * //
 * ```
 *
 *
 * @param client The client to run graphql queries through.
 * @param modelIntrospection The model introspection schema the op comes from.
 * @param operationType The broad category of graphql operation.
 * @param operation The operation definition from the introspection schema.
 * @param useContext Whether the function needs to accept an SSR context.
 * @returns The operation function to attach to query, mutations, etc.
 */
function customOpFactory(client, modelIntrospection, operationType, operation, useContext, getInternals, customUserAgentDetails) {
    // .arguments() are defined for the custom operation in the schema builder
    // and are present in the model introspection schema
    const argsDefined = operation.arguments !== undefined;
    const op = (...args) => {
        // options is always the last argument
        const options = args[args.length - 1];
        let contextSpec;
        let arg;
        if (useContext) {
            if (argIsContextSpec(args[0])) {
                contextSpec = args[0];
            }
            else {
                throw new Error(`Invalid first argument passed to ${operation.name}. Expected contextSpec`);
            }
        }
        if (argsDefined) {
            if (useContext) {
                arg = args[1];
            }
            else {
                arg = args[0];
            }
        }
        if (operationType === 'subscription') {
            return _opSubscription(
            // subscriptions are only enabled on the clientside
            client, modelIntrospection, operation, getInternals, arg, options, customUserAgentDetails);
        }
        return _op(client, modelIntrospection, operationType, operation, getInternals, arg, options, contextSpec, customUserAgentDetails);
    };
    return op;
}
/**
 * Runtime test and type guard to check whether `o[field]` is a `String`.
 *
 * ```typescript
 * if (hasStringField(o, 'prop')) {
 *   const s = o.prop;
 *   //    ^? const s: string
 * }
 * ```
 *
 * @param o Object to inspect
 * @param field Field to look for
 * @returns Boolean: `true` if the `o[field]` is a `string`
 */
function hasStringField(o, field) {
    return typeof o[field] === 'string';
}
function isEnumType(type) {
    return type instanceof Object && 'enum' in type;
}
function isInputType(type) {
    return type instanceof Object && 'input' in type;
}
/**
 * @param argDef A single argument definition from a custom operation
 * @returns A string naming the base type including the `!` if the arg is required.
 */
function argumentBaseTypeString({ type, isRequired }) {
    const requiredFlag = isRequired ? '!' : '';
    if (isEnumType(type)) {
        return `${type.enum}${requiredFlag}`;
    }
    if (isInputType(type)) {
        return `${type.input}${requiredFlag}`;
    }
    return `${type}${requiredFlag}`;
}
/**
 * Generates "outer" arguments string for a custom operation. For example,
 * in this operation:
 *
 * ```graphql
 * query MyQuery(InputString: String!) {
 *   echoString(InputString: $InputString)
 * }
 * ```
 *
 * This function returns the top/outer level arguments as a string:
 *
 * ```json
 * "InputString: String!"
 * ```
 *
 * @param operation Operation object from model introspection schema.
 * @returns "outer" arguments string
 */
function outerArguments(operation) {
    if (operation.arguments === undefined) {
        return '';
    }
    const args = Object.entries(operation.arguments)
        .map(([k, argument]) => {
        const baseType = argumentBaseTypeString(argument);
        const finalType = argument.isArray
            ? `[${baseType}]${argument.isArrayNullable ? '' : '!'}`
            : baseType;
        return `$${k}: ${finalType}`;
    })
        .join(', ');
    return args.length > 0 ? `(${args})` : '';
}
/**
 * Generates "inner" arguments string for a custom operation. For example,
 * in this operation:
 *
 * ```graphql
 * query MyQuery(InputString: String!) {
 *   echoString(InputString: $InputString)
 * }
 * ```
 *
 * This function returns the inner arguments as a string:
 *
 * ```json
 * "InputString: $InputString"
 * ```
 *
 * @param operation Operation object from model introspection schema.
 * @returns "outer" arguments string
 */
function innerArguments(operation) {
    if (operation.arguments === undefined) {
        return '';
    }
    const args = Object.keys(operation.arguments)
        .map((k) => `${k}: $${k}`)
        .join(', ');
    return args.length > 0 ? `(${args})` : '';
}
/**
 * Generates the selection set string for a custom operation. This is slightly
 * different than the selection set generation for models. If the custom op returns
 * a primitive or enum types, it doesn't require a selection set at all.
 *
 * E.g., the graphql might look like this:
 *
 * ```graphql
 * query MyQuery {
 *   echoString(inputString: "whatever")
 * }
 * #                                     ^
 * #                                     |
 * #                                     +-- no selection set
 * ```
 *
 * Non-primitive return type selection set generation will be similar to other
 * model operations.
 *
 * @param modelIntrospection The full code-generated introspection schema.
 * @param operation The operation object from the schema.
 * @returns The selection set as a string.
 */
function operationSelectionSet(modelIntrospection, operation) {
    if (hasStringField(operation, 'type') ||
        hasStringField(operation.type, 'enum')) {
        return '';
    }
    else if (hasStringField(operation.type, 'nonModel')) {
        const nonModel = modelIntrospection.nonModels[operation.type.nonModel];
        return `{${(0,_APIClient_mjs__WEBPACK_IMPORTED_MODULE_0__.selectionSetIRToString)((0,_APIClient_mjs__WEBPACK_IMPORTED_MODULE_0__.getDefaultSelectionSetForNonModelWithIR)(nonModel, modelIntrospection))}}`;
    }
    else if (hasStringField(operation.type, 'model')) {
        return `{${(0,_APIClient_mjs__WEBPACK_IMPORTED_MODULE_0__.generateSelectionSet)(modelIntrospection, operation.type.model)}}`;
    }
    else {
        return '';
    }
}
/**
 * Maps an arguments objec to graphql variables, removing superfluous args and
 * screaming loudly when required args are missing.
 *
 * @param operation The operation to construct graphql request variables for.
 * @param args The arguments to map variables from.
 * @returns The graphql variables object.
 */
function operationVariables(operation, args = {}) {
    const variables = {};
    if (operation.arguments === undefined) {
        return variables;
    }
    for (const argDef of Object.values(operation.arguments)) {
        if (typeof args[argDef.name] !== 'undefined') {
            variables[argDef.name] = args[argDef.name];
        }
        else if (argDef.isRequired) {
            // At this point, the variable is both required and missing: We don't need
            // to continue. The operation is expected to fail.
            throw new Error(`${operation.name} requires arguments '${argDef.name}'`);
        }
    }
    return variables;
}
/**
 * Executes an operation from the given model intro schema against a client, returning
 * a fully instantiated model when relevant.
 *
 * @param client The client to operate `graphql()` calls through.
 * @param modelIntrospection The model intro schema to construct requests from.
 * @param operationType The high level graphql operation type.
 * @param operation The specific operation name, args, return type details.
 * @param args The arguments to provide to the operation as variables.
 * @param options Request options like headers, etc.
 * @param context SSR context if relevant.
 * @returns Result from the graphql request, model-instantiated when relevant.
 */
function _op(client, modelIntrospection, operationType, operation, getInternals, args, options, context, customUserAgentDetails) {
    return (0,_utils_selfAwareAsync_mjs__WEBPACK_IMPORTED_MODULE_2__.selfAwareAsync)(async (resultPromise) => {
        const { name: operationName } = operation;
        const auth = (0,_APIClient_mjs__WEBPACK_IMPORTED_MODULE_0__.authModeParams)(client, getInternals, options);
        const headers = (0,_APIClient_mjs__WEBPACK_IMPORTED_MODULE_0__.getCustomHeaders)(client, getInternals, options?.headers);
        const outerArgsString = outerArguments(operation);
        const innerArgsString = innerArguments(operation);
        const selectionSet = operationSelectionSet(modelIntrospection, operation);
        const returnTypeModelName = hasStringField(operation.type, 'model')
            ? operation.type.model
            : undefined;
        const query = `
    ${operationType.toLocaleLowerCase()}${outerArgsString} {
      ${operationName}${innerArgsString} ${selectionSet}
    }
  `;
        const variables = operationVariables(operation, args);
        const userAgentOverride = (0,_ai_getCustomUserAgentDetails_mjs__WEBPACK_IMPORTED_MODULE_4__.createUserAgentOverride)(customUserAgentDetails);
        try {
            const basePromise = context
                ? client.graphql(context, {
                    ...auth,
                    query,
                    variables,
                }, headers)
                : client.graphql({
                    ...auth,
                    query,
                    variables,
                    ...userAgentOverride,
                }, headers);
            const extendedPromise = (0,_cancellation_mjs__WEBPACK_IMPORTED_MODULE_3__.extendCancellability)(basePromise, resultPromise);
            const { data, extensions } = await extendedPromise;
            // flatten response
            if (data) {
                const [key] = Object.keys(data);
                const isArrayResult = Array.isArray(data[key]);
                // TODO: when adding support for custom selection set, flattening will need
                // to occur recursively. For now, it's expected that related models are not
                // present in the result. Only FK's are present. Any related model properties
                // should be replaced with lazy loaders under the current implementation.
                const flattenedResult = isArrayResult
                    ? data[key].filter((x) => x)
                    : data[key];
                // TODO: custom selection set. current selection set is default selection set only
                // custom selection set requires data-schema-type + runtime updates above.
                const initialized = returnTypeModelName
                    ? (0,_APIClient_mjs__WEBPACK_IMPORTED_MODULE_0__.initializeModel)(client, returnTypeModelName, isArrayResult ? flattenedResult : [flattenedResult], modelIntrospection, auth.authMode, auth.authToken, !!context)
                    : flattenedResult;
                return {
                    data: !isArrayResult && Array.isArray(initialized)
                        ? initialized.shift()
                        : initialized,
                    extensions,
                };
            }
            else {
                return { data: null, extensions };
            }
        }
        catch (error) {
            /**
             * The `data` type returned by `error` here could be:
             * 1) `null`
             * 2) an empty object
             * 3) "populated" but with a `null` value `{ getPost: null }`
             * 4) an actual record `{ getPost: { id: '1', title: 'Hello, World!' } }`
             */
            const { data, errors } = error;
            /**
             * `data` is not `null`, and is not an empty object:
             */
            if (data && Object.keys(data).length !== 0 && errors) {
                const [key] = Object.keys(data);
                const isArrayResult = Array.isArray(data[key]);
                // TODO: when adding support for custom selection set, flattening will need
                // to occur recursively. For now, it's expected that related models are not
                // present in the result. Only FK's are present. Any related model properties
                // should be replaced with lazy loaders under the current implementation.
                const flattenedResult = isArrayResult
                    ? data[key].filter((x) => x)
                    : data[key];
                /**
                 * `flattenedResult` could be `null` here (e.g. `data: { getPost: null }`)
                 * if `flattenedResult`, result is an actual record:
                 */
                if (flattenedResult) {
                    // TODO: custom selection set. current selection set is default selection set only
                    // custom selection set requires data-schema-type + runtime updates above.
                    const initialized = returnTypeModelName
                        ? (0,_APIClient_mjs__WEBPACK_IMPORTED_MODULE_0__.initializeModel)(client, returnTypeModelName, isArrayResult ? flattenedResult : [flattenedResult], modelIntrospection, auth.authMode, auth.authToken, !!context)
                        : flattenedResult;
                    return {
                        data: !isArrayResult && Array.isArray(initialized)
                            ? initialized.shift()
                            : initialized,
                        errors,
                    };
                }
                else {
                    // was `data: { getPost: null }`)
                    return (0,_utils_mjs__WEBPACK_IMPORTED_MODULE_1__.handleSingularGraphQlError)(error);
                }
            }
            else {
                // `data` is `null`:
                return (0,_utils_mjs__WEBPACK_IMPORTED_MODULE_1__.handleSingularGraphQlError)(error);
            }
        }
    });
}
/**
 * Executes an operation from the given model intro schema against a client, returning
 * a fully instantiated model when relevant.
 *
 * @param client The client to operate `graphql()` calls through.
 * @param modelIntrospection The model intro schema to construct requests from.
 * @param operation The specific operation name, args, return type details.
 * @param args The arguments to provide to the operation as variables.
 * @param options Request options like headers, etc.
 * @returns Result from the graphql request, model-instantiated when relevant.
 */
function _opSubscription(client, modelIntrospection, operation, getInternals, args, options, customUserAgentDetails) {
    const operationType = 'subscription';
    const { name: operationName } = operation;
    const auth = (0,_APIClient_mjs__WEBPACK_IMPORTED_MODULE_0__.authModeParams)(client, getInternals, options);
    const headers = (0,_APIClient_mjs__WEBPACK_IMPORTED_MODULE_0__.getCustomHeaders)(client, getInternals, options?.headers);
    const outerArgsString = outerArguments(operation);
    const innerArgsString = innerArguments(operation);
    const selectionSet = operationSelectionSet(modelIntrospection, operation);
    const returnTypeModelName = hasStringField(operation.type, 'model')
        ? operation.type.model
        : undefined;
    const query = `
    ${operationType.toLocaleLowerCase()}${outerArgsString} {
      ${operationName}${innerArgsString} ${selectionSet}
    }
  `;
    const variables = operationVariables(operation, args);
    const userAgentOverride = (0,_ai_getCustomUserAgentDetails_mjs__WEBPACK_IMPORTED_MODULE_4__.createUserAgentOverride)(customUserAgentDetails);
    const observable = client.graphql({
        ...auth,
        query,
        variables,
        ...userAgentOverride,
    }, headers);
    return observable.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_5__.map)((value) => {
        const [key] = Object.keys(value.data);
        const data = value.data[key];
        const [initialized] = returnTypeModelName
            ? (0,_APIClient_mjs__WEBPACK_IMPORTED_MODULE_0__.initializeModel)(client, returnTypeModelName, [data], modelIntrospection, auth.authMode, auth.authToken)
            : [data];
        return initialized;
    }));
}


//# sourceMappingURL=custom.mjs.map


/***/ }),

/***/ "../../node_modules/@aws-amplify/data-schema/dist/esm/runtime/internals/operations/get.mjs":
/*!*************************************************************************************************!*\
  !*** ../../node_modules/@aws-amplify/data-schema/dist/esm/runtime/internals/operations/get.mjs ***!
  \*************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getFactory: () => (/* binding */ getFactory)
/* harmony export */ });
/* harmony import */ var _APIClient_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../APIClient.mjs */ "../../node_modules/@aws-amplify/data-schema/dist/esm/runtime/internals/APIClient.mjs");
/* harmony import */ var _utils_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils.mjs */ "../../node_modules/@aws-amplify/data-schema/dist/esm/runtime/internals/operations/utils.mjs");
/* harmony import */ var _utils_selfAwareAsync_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../utils/selfAwareAsync.mjs */ "../../node_modules/@aws-amplify/data-schema/dist/esm/runtime/utils/selfAwareAsync.mjs");
/* harmony import */ var _cancellation_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../cancellation.mjs */ "../../node_modules/@aws-amplify/data-schema/dist/esm/runtime/internals/cancellation.mjs");
/* harmony import */ var _ai_getCustomUserAgentDetails_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../ai/getCustomUserAgentDetails.mjs */ "../../node_modules/@aws-amplify/data-schema/dist/esm/runtime/internals/ai/getCustomUserAgentDetails.mjs");






function getFactory(client, modelIntrospection, model, operation, getInternals, useContext = false, customUserAgentDetails) {
    const getWithContext = (contextSpec, arg, options) => {
        return _get(client, modelIntrospection, model, arg, options, operation, getInternals, contextSpec, customUserAgentDetails);
    };
    const get = (arg, options) => {
        return _get(client, modelIntrospection, model, arg, options, operation, getInternals, undefined, customUserAgentDetails);
    };
    return useContext ? getWithContext : get;
}
function _get(client, modelIntrospection, model, arg, options, operation, getInternals, context, customUserAgentDetails) {
    return (0,_utils_selfAwareAsync_mjs__WEBPACK_IMPORTED_MODULE_2__.selfAwareAsync)(async (resultPromise) => {
        const { name } = model;
        const query = (0,_APIClient_mjs__WEBPACK_IMPORTED_MODULE_0__.generateGraphQLDocument)(modelIntrospection, name, operation, options);
        const variables = (0,_APIClient_mjs__WEBPACK_IMPORTED_MODULE_0__.buildGraphQLVariables)(model, operation, arg, modelIntrospection);
        const auth = (0,_APIClient_mjs__WEBPACK_IMPORTED_MODULE_0__.authModeParams)(client, getInternals, options);
        const headers = (0,_APIClient_mjs__WEBPACK_IMPORTED_MODULE_0__.getCustomHeaders)(client, getInternals, options?.headers);
        const userAgentOverride = (0,_ai_getCustomUserAgentDetails_mjs__WEBPACK_IMPORTED_MODULE_4__.createUserAgentOverride)(customUserAgentDetails);
        try {
            const basePromise = context
                ? client.graphql(context, {
                    ...auth,
                    query,
                    variables,
                }, headers)
                : client.graphql({
                    ...auth,
                    query,
                    variables,
                    ...userAgentOverride,
                }, headers);
            const extendedPromise = (0,_cancellation_mjs__WEBPACK_IMPORTED_MODULE_3__.extendCancellability)(basePromise, resultPromise);
            const { data, extensions } = await extendedPromise;
            // flatten response
            if (data) {
                const [key] = Object.keys(data);
                const flattenedResult = (0,_APIClient_mjs__WEBPACK_IMPORTED_MODULE_0__.flattenItems)(modelIntrospection, name, data[key]);
                if (flattenedResult === null) {
                    return { data: null, extensions };
                }
                else if (options?.selectionSet) {
                    return { data: flattenedResult, extensions };
                }
                else {
                    // TODO: refactor to avoid destructuring here
                    const [initialized] = (0,_APIClient_mjs__WEBPACK_IMPORTED_MODULE_0__.initializeModel)(client, name, [flattenedResult], modelIntrospection, auth.authMode, auth.authToken, !!context);
                    return { data: initialized, extensions };
                }
            }
            else {
                return { data: null, extensions };
            }
        }
        catch (error) {
            /**
             * The `data` type returned by `error` here could be:
             * 1) `null`
             * 2) an empty object
             * 3) "populated" but with a `null` value `{ getPost: null }`
             * 4) an actual record `{ getPost: { id: '1', title: 'Hello, World!' } }`
             */
            const { data, errors } = error;
            /**
             * `data` is not `null`, and is not an empty object:
             */
            if (data && Object.keys(data).length !== 0 && errors) {
                const [key] = Object.keys(data);
                const flattenedResult = (0,_APIClient_mjs__WEBPACK_IMPORTED_MODULE_0__.flattenItems)(modelIntrospection, name, data[key]);
                /**
                 * `flattenedResult` could be `null` here (e.g. `data: { getPost: null }`)
                 * if `flattenedResult`, result is an actual record:
                 */
                if (flattenedResult) {
                    if (options?.selectionSet) {
                        return { data: flattenedResult, errors };
                    }
                    else {
                        // TODO: refactor to avoid destructuring here
                        const [initialized] = (0,_APIClient_mjs__WEBPACK_IMPORTED_MODULE_0__.initializeModel)(client, name, [flattenedResult], modelIntrospection, auth.authMode, auth.authToken, !!context);
                        return { data: initialized, errors };
                    }
                }
                else {
                    // was `data: { getPost: null }`)
                    return (0,_utils_mjs__WEBPACK_IMPORTED_MODULE_1__.handleSingularGraphQlError)(error);
                }
            }
            else {
                // `data` is `null`:
                return (0,_utils_mjs__WEBPACK_IMPORTED_MODULE_1__.handleSingularGraphQlError)(error);
            }
        }
    });
}


//# sourceMappingURL=get.mjs.map


/***/ }),

/***/ "../../node_modules/@aws-amplify/data-schema/dist/esm/runtime/internals/operations/indexQuery.mjs":
/*!********************************************************************************************************!*\
  !*** ../../node_modules/@aws-amplify/data-schema/dist/esm/runtime/internals/operations/indexQuery.mjs ***!
  \********************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   indexQueryFactory: () => (/* binding */ indexQueryFactory)
/* harmony export */ });
/* harmony import */ var _APIClient_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../APIClient.mjs */ "../../node_modules/@aws-amplify/data-schema/dist/esm/runtime/internals/APIClient.mjs");
/* harmony import */ var _utils_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils.mjs */ "../../node_modules/@aws-amplify/data-schema/dist/esm/runtime/internals/operations/utils.mjs");
/* harmony import */ var _utils_selfAwareAsync_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../utils/selfAwareAsync.mjs */ "../../node_modules/@aws-amplify/data-schema/dist/esm/runtime/utils/selfAwareAsync.mjs");
/* harmony import */ var _cancellation_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../cancellation.mjs */ "../../node_modules/@aws-amplify/data-schema/dist/esm/runtime/internals/cancellation.mjs");





function indexQueryFactory(client, modelIntrospection, model, indexMeta, getInternals, context = false) {
    const indexQueryWithContext = (contextSpec, args, options) => {
        return _indexQuery(client, modelIntrospection, model, indexMeta, getInternals, {
            ...args,
            ...options,
        }, contextSpec);
    };
    const indexQuery = (args, options) => {
        return _indexQuery(client, modelIntrospection, model, indexMeta, getInternals, {
            ...args,
            ...options,
        });
    };
    return context ? indexQueryWithContext : indexQuery;
}
function processGraphQlResponse(modelIntroSchema, modelName, result, selectionSet, modelInitializer) {
    const { data, extensions } = result;
    const [key] = Object.keys(data);
    if (data[key].items) {
        const flattenedResult = data[key].items.map((value) => (0,_APIClient_mjs__WEBPACK_IMPORTED_MODULE_0__.flattenItems)(modelIntroSchema, modelName, value));
        return {
            data: selectionSet ? flattenedResult : modelInitializer(flattenedResult),
            nextToken: data[key].nextToken,
            extensions,
        };
    }
    // Index queries are always list queries. No `items`? No flattening needed.
    return {
        data: data[key],
        nextToken: data[key].nextToken,
        extensions,
    };
}
function _indexQuery(client, modelIntrospection, model, indexMeta, getInternals, args, contextSpec) {
    return (0,_utils_selfAwareAsync_mjs__WEBPACK_IMPORTED_MODULE_2__.selfAwareAsync)(async (resultPromise) => {
        const { name } = model;
        const query = (0,_APIClient_mjs__WEBPACK_IMPORTED_MODULE_0__.generateGraphQLDocument)(modelIntrospection, name, 'INDEX_QUERY', args, indexMeta);
        const variables = (0,_APIClient_mjs__WEBPACK_IMPORTED_MODULE_0__.buildGraphQLVariables)(model, 'INDEX_QUERY', args, modelIntrospection, indexMeta);
        const auth = (0,_APIClient_mjs__WEBPACK_IMPORTED_MODULE_0__.authModeParams)(client, getInternals, args);
        const modelInitializer = (flattenedResult) => (0,_APIClient_mjs__WEBPACK_IMPORTED_MODULE_0__.initializeModel)(client, name, flattenedResult, modelIntrospection, auth.authMode, auth.authToken, !!contextSpec);
        try {
            const headers = (0,_APIClient_mjs__WEBPACK_IMPORTED_MODULE_0__.getCustomHeaders)(client, getInternals, args?.headers);
            const graphQlParams = {
                ...auth,
                query,
                variables,
            };
            const requestArgs = [graphQlParams, headers];
            if (contextSpec !== undefined) {
                requestArgs.unshift(contextSpec);
            }
            const basePromise = client.graphql(...requestArgs);
            const extendedPromise = (0,_cancellation_mjs__WEBPACK_IMPORTED_MODULE_3__.extendCancellability)(basePromise, resultPromise);
            const response = await extendedPromise;
            if (response.data !== undefined) {
                return processGraphQlResponse(modelIntrospection, name, response, args?.selectionSet, modelInitializer);
            }
        }
        catch (error) {
            /**
             * The `data` type returned by `error` here could be:
             * 1) `null`
             * 2) an empty object
             * 3) "populated" but with a `null` value:
             *   `data: { listByExampleId: null }`
             * 4) an actual record:
             *   `data: { listByExampleId: items: [{ id: '1', ...etc } }]`
             */
            const { data, errors } = error;
            // `data` is not `null`, and is not an empty object:
            if (data !== undefined && Object.keys(data).length !== 0 && errors) {
                const [key] = Object.keys(data);
                if (data[key]?.items) {
                    const flattenedResult = data[key]?.items.map((value) => (0,_APIClient_mjs__WEBPACK_IMPORTED_MODULE_0__.flattenItems)(modelIntrospection, name, value));
                    /**
                     * Check exists since `flattenedResult` could be `null`.
                     * if `flattenedResult` exists, result is an actual record.
                     */
                    if (flattenedResult) {
                        return {
                            data: args?.selectionSet
                                ? flattenedResult
                                : modelInitializer(flattenedResult),
                            nextToken: data[key]?.nextToken,
                        };
                    }
                }
                // response is of type `data: { listByExampleId: null }`
                return {
                    data: data[key],
                    nextToken: data[key]?.nextToken,
                };
            }
            else {
                // `data` is `null` or an empty object:
                return (0,_utils_mjs__WEBPACK_IMPORTED_MODULE_1__.handleListGraphQlError)(error);
            }
        }
    });
}


//# sourceMappingURL=indexQuery.mjs.map


/***/ }),

/***/ "../../node_modules/@aws-amplify/data-schema/dist/esm/runtime/internals/operations/list.mjs":
/*!**************************************************************************************************!*\
  !*** ../../node_modules/@aws-amplify/data-schema/dist/esm/runtime/internals/operations/list.mjs ***!
  \**************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   listFactory: () => (/* binding */ listFactory)
/* harmony export */ });
/* harmony import */ var _APIClient_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../APIClient.mjs */ "../../node_modules/@aws-amplify/data-schema/dist/esm/runtime/internals/APIClient.mjs");
/* harmony import */ var _utils_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils.mjs */ "../../node_modules/@aws-amplify/data-schema/dist/esm/runtime/internals/operations/utils.mjs");
/* harmony import */ var _utils_selfAwareAsync_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../utils/selfAwareAsync.mjs */ "../../node_modules/@aws-amplify/data-schema/dist/esm/runtime/utils/selfAwareAsync.mjs");
/* harmony import */ var _cancellation_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../cancellation.mjs */ "../../node_modules/@aws-amplify/data-schema/dist/esm/runtime/internals/cancellation.mjs");
/* harmony import */ var _ai_getCustomUserAgentDetails_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../ai/getCustomUserAgentDetails.mjs */ "../../node_modules/@aws-amplify/data-schema/dist/esm/runtime/internals/ai/getCustomUserAgentDetails.mjs");






function listFactory(client, modelIntrospection, model, getInternals, context = false, customUserAgentDetails) {
    const listWithContext = (contextSpec, args) => {
        return _list(client, modelIntrospection, model, getInternals, args, contextSpec, customUserAgentDetails);
    };
    const list = (args) => {
        return _list(client, modelIntrospection, model, getInternals, args, undefined, customUserAgentDetails);
    };
    return context ? listWithContext : list;
}
function _list(client, modelIntrospection, model, getInternals, args, contextSpec, customUserAgentDetails) {
    return (0,_utils_selfAwareAsync_mjs__WEBPACK_IMPORTED_MODULE_2__.selfAwareAsync)(async (resultPromise) => {
        const { name } = model;
        const query = (0,_APIClient_mjs__WEBPACK_IMPORTED_MODULE_0__.generateGraphQLDocument)(modelIntrospection, name, 'LIST', args);
        const variables = (0,_APIClient_mjs__WEBPACK_IMPORTED_MODULE_0__.buildGraphQLVariables)(model, 'LIST', args, modelIntrospection);
        const auth = (0,_APIClient_mjs__WEBPACK_IMPORTED_MODULE_0__.authModeParams)(client, getInternals, args);
        const headers = (0,_APIClient_mjs__WEBPACK_IMPORTED_MODULE_0__.getCustomHeaders)(client, getInternals, args?.headers);
        const userAgentOverride = (0,_ai_getCustomUserAgentDetails_mjs__WEBPACK_IMPORTED_MODULE_4__.createUserAgentOverride)(customUserAgentDetails);
        try {
            const basePromise = contextSpec
                ? client.graphql(contextSpec, {
                    ...auth,
                    query,
                    variables,
                }, headers)
                : client.graphql({
                    ...auth,
                    query,
                    variables,
                    ...userAgentOverride,
                }, headers);
            const extendedPromise = (0,_cancellation_mjs__WEBPACK_IMPORTED_MODULE_3__.extendCancellability)(basePromise, resultPromise);
            const { data, extensions } = await extendedPromise;
            // flatten response
            if (data !== undefined) {
                const [key] = Object.keys(data);
                if (data[key].items) {
                    const flattenedResult = data[key].items.map((value) => (0,_APIClient_mjs__WEBPACK_IMPORTED_MODULE_0__.flattenItems)(modelIntrospection, name, value));
                    // don't init if custom selection set
                    if (args?.selectionSet) {
                        return {
                            data: flattenedResult,
                            nextToken: data[key].nextToken,
                            extensions,
                        };
                    }
                    else {
                        const initialized = (0,_APIClient_mjs__WEBPACK_IMPORTED_MODULE_0__.initializeModel)(client, name, flattenedResult, modelIntrospection, auth.authMode, auth.authToken, !!contextSpec);
                        return {
                            data: initialized,
                            nextToken: data[key].nextToken,
                            extensions,
                        };
                    }
                }
                return {
                    data: data[key],
                    nextToken: data[key].nextToken,
                    extensions,
                };
            }
        }
        catch (error) {
            /**
             * The `data` type returned by `error` here could be:
             * 1) `null`
             * 2) an empty object
             * 3) "populated" but with a `null` value `data: { listPosts: null }`
             * 4) actual records `data: { listPosts: items: [{ id: '1', ...etc }] }`
             */
            const { data, errors } = error;
            // `data` is not `null`, and is not an empty object:
            if (data !== undefined &&
                data !== null &&
                Object.keys(data).length !== 0 &&
                errors) {
                const [key] = Object.keys(data);
                if (data[key]?.items) {
                    const flattenedResult = data[key].items.map((value) => (0,_APIClient_mjs__WEBPACK_IMPORTED_MODULE_0__.flattenItems)(modelIntrospection, name, value));
                    /**
                     * Check exists since `flattenedResult` could be `null`.
                     * if `flattenedResult` exists, result is an actual record.
                     */
                    if (flattenedResult) {
                        // don't init if custom selection set
                        if (args?.selectionSet) {
                            return {
                                data: flattenedResult,
                                nextToken: data[key]?.nextToken,
                                errors,
                            };
                        }
                        else {
                            const initialized = (0,_APIClient_mjs__WEBPACK_IMPORTED_MODULE_0__.initializeModel)(client, name, flattenedResult, modelIntrospection, auth.authMode, auth.authToken, !!contextSpec);
                            // data is full record w/out selection set:
                            return {
                                data: initialized,
                                nextToken: data[key]?.nextToken,
                                errors,
                            };
                        }
                    }
                    return {
                        data: data[key],
                        nextToken: data[key]?.nextToken,
                        errors,
                    };
                }
                else {
                    // response is of type `data: { getPost: null }`)
                    return (0,_utils_mjs__WEBPACK_IMPORTED_MODULE_1__.handleListGraphQlError)(error);
                }
            }
            else {
                // `data` is `null` or an empty object:
                return (0,_utils_mjs__WEBPACK_IMPORTED_MODULE_1__.handleListGraphQlError)(error);
            }
        }
    });
}


//# sourceMappingURL=list.mjs.map


/***/ }),

/***/ "../../node_modules/@aws-amplify/data-schema/dist/esm/runtime/internals/operations/observeQuery.mjs":
/*!**********************************************************************************************************!*\
  !*** ../../node_modules/@aws-amplify/data-schema/dist/esm/runtime/internals/operations/observeQuery.mjs ***!
  \**********************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   observeQueryFactory: () => (/* binding */ observeQueryFactory)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "../../node_modules/rxjs/dist/esm5/internal/Observable.js");
/* harmony import */ var _utils_resolvePKFields_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utils/resolvePKFields.mjs */ "../../node_modules/@aws-amplify/data-schema/dist/esm/runtime/utils/resolvePKFields.mjs");
/* harmony import */ var _utils_findIndexByFields_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../utils/findIndexByFields.mjs */ "../../node_modules/@aws-amplify/data-schema/dist/esm/runtime/utils/findIndexByFields.mjs");




// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
function observeQueryFactory(models, model) {
    const { name } = model;
    const observeQuery = (arg) => new rxjs__WEBPACK_IMPORTED_MODULE_2__.Observable((subscriber) => {
        // what we'll be sending to our subscribers
        const items = [];
        // To enqueue subscription messages while we collect our initial
        // result set.
        const messageQueue = [];
        // operation to take when message(s) arrive.
        // this operation will be swapped out once initial "sync" is complete
        // to immediately ingest messsages.
        let receiveMessages = (...messages) => {
            return messageQueue.push(...messages);
        };
        // start subscriptions
        const onCreateSub = models[name].onCreate(arg).subscribe({
            next(item) {
                receiveMessages({ item, type: 'create' });
            },
            error(error) {
                subscriber.error({ type: 'onCreate', error });
            },
        });
        const onUpdateSub = models[name].onUpdate(arg).subscribe({
            next(item) {
                receiveMessages({ item, type: 'update' });
            },
            error(error) {
                subscriber.error({ type: 'onUpdate', error });
            },
        });
        const onDeleteSub = models[name].onDelete(arg).subscribe({
            next(item) {
                receiveMessages({ item, type: 'delete' });
            },
            error(error) {
                subscriber.error({ type: 'onDelete', error });
            },
        });
        // consumes a list of messages and sends a snapshot
        function ingestMessages(messages) {
            for (const message of messages) {
                const idx = (0,_utils_findIndexByFields_mjs__WEBPACK_IMPORTED_MODULE_1__.findIndexByFields)(message.item, items, pkFields);
                switch (message.type) {
                    case 'create':
                        if (idx < 0)
                            items.push(message.item);
                        break;
                    case 'update':
                        if (idx >= 0)
                            items[idx] = message.item;
                        break;
                    case 'delete':
                        if (idx >= 0)
                            items.splice(idx, 1);
                        break;
                    default:
                        console.error('Unrecognized message in observeQuery.', message);
                }
            }
            subscriber.next({
                items,
                isSynced: true,
            });
        }
        const pkFields = (0,_utils_resolvePKFields_mjs__WEBPACK_IMPORTED_MODULE_0__.resolvePKFields)(model);
        // initial results
        (async () => {
            let firstPage = true;
            let nextToken = null;
            while (!subscriber.closed && (firstPage || nextToken)) {
                firstPage = false;
                const { data: page, errors, nextToken: _nextToken, } = await models[name].list({ ...arg, nextToken });
                nextToken = _nextToken;
                items.push(...page);
                // if there are no more pages and no items we already know about
                // that need to be merged in from sub, we're "synced"
                const isSynced = messageQueue.length === 0 &&
                    (nextToken === null || nextToken === undefined);
                subscriber.next({
                    items,
                    isSynced,
                });
                if (Array.isArray(errors)) {
                    for (const error of errors) {
                        subscriber.error(error);
                    }
                }
            }
            // play through the queue
            if (messageQueue.length > 0) {
                ingestMessages(messageQueue);
            }
            // switch the queue to write directly to the items collection
            receiveMessages = (...messages) => {
                ingestMessages(messages);
                return items.length;
            };
        })();
        // when subscriber unsubscribes, tear down internal subs
        return () => {
            // 1. tear down internal subs
            onCreateSub.unsubscribe();
            onUpdateSub.unsubscribe();
            onDeleteSub.unsubscribe();
            // 2. there is no need to explicitly stop paging. instead, we
            // just check `subscriber.closed` above before fetching each page.
        };
    });
    return observeQuery;
}


//# sourceMappingURL=observeQuery.mjs.map


/***/ }),

/***/ "../../node_modules/@aws-amplify/data-schema/dist/esm/runtime/internals/operations/subscription.mjs":
/*!**********************************************************************************************************!*\
  !*** ../../node_modules/@aws-amplify/data-schema/dist/esm/runtime/internals/operations/subscription.mjs ***!
  \**********************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   subscriptionFactory: () => (/* binding */ subscriptionFactory)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ "../../node_modules/rxjs/dist/esm5/internal/operators/map.js");
/* harmony import */ var _APIClient_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../APIClient.mjs */ "../../node_modules/@aws-amplify/data-schema/dist/esm/runtime/internals/APIClient.mjs");



// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
function subscriptionFactory(client, modelIntrospection, model, operation, getInternals) {
    const { name } = model;
    const subscription = (args) => {
        const query = (0,_APIClient_mjs__WEBPACK_IMPORTED_MODULE_0__.generateGraphQLDocument)(modelIntrospection, name, operation, args);
        const variables = (0,_APIClient_mjs__WEBPACK_IMPORTED_MODULE_0__.buildGraphQLVariables)(model, operation, args, modelIntrospection);
        const auth = (0,_APIClient_mjs__WEBPACK_IMPORTED_MODULE_0__.authModeParams)(client, getInternals, args);
        const headers = (0,_APIClient_mjs__WEBPACK_IMPORTED_MODULE_0__.getCustomHeaders)(client, getInternals, args?.headers);
        const observable = client.graphql({
            ...auth,
            query,
            variables,
        }, headers);
        return observable.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_1__.map)((value) => {
            const [key] = Object.keys(value.data);
            const data = value.data[key];
            const flattenedResult = (0,_APIClient_mjs__WEBPACK_IMPORTED_MODULE_0__.flattenItems)(modelIntrospection, name, data);
            if (flattenedResult === null) {
                return null;
            }
            else if (args?.selectionSet) {
                return flattenedResult;
            }
            else {
                const [initialized] = (0,_APIClient_mjs__WEBPACK_IMPORTED_MODULE_0__.initializeModel)(client, name, [flattenedResult], modelIntrospection, auth.authMode, auth.authToken);
                return initialized;
            }
        }));
    };
    return subscription;
}


//# sourceMappingURL=subscription.mjs.map


/***/ }),

/***/ "../../node_modules/@aws-amplify/data-schema/dist/esm/runtime/internals/operations/utils.mjs":
/*!***************************************************************************************************!*\
  !*** ../../node_modules/@aws-amplify/data-schema/dist/esm/runtime/internals/operations/utils.mjs ***!
  \***************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   handleListGraphQlError: () => (/* binding */ handleListGraphQlError),
/* harmony export */   handleSingularGraphQlError: () => (/* binding */ handleSingularGraphQlError)
/* harmony export */ });
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
// import { GraphQLFormattedError } from '@aws-amplify/data-schema-types';
/**
 * Handle errors for list return types (list and index query operations)
 */
function handleListGraphQlError(error) {
    if (error?.errors) {
        // graphql errors pass through
        return {
            ...error,
            data: [],
        };
    }
    else {
        // non-graphql errors are re-thrown
        throw error;
    }
}
/**
 * Handle errors for singular return types (create, get, update, delete operations)
 */
function handleSingularGraphQlError(error) {
    if (error.errors) {
        // graphql errors pass through
        return {
            ...error,
            data: null,
        };
    }
    else {
        // non-graphql errors are re-thrown
        throw error;
    }
}


//# sourceMappingURL=utils.mjs.map


/***/ }),

/***/ "../../node_modules/@aws-amplify/data-schema/dist/esm/runtime/internals/server/generateModelsProperty.mjs":
/*!****************************************************************************************************************!*\
  !*** ../../node_modules/@aws-amplify/data-schema/dist/esm/runtime/internals/server/generateModelsProperty.mjs ***!
  \****************************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   generateModelsProperty: () => (/* binding */ generateModelsProperty)
/* harmony export */ });
/* harmony import */ var _operations_list_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../operations/list.mjs */ "../../node_modules/@aws-amplify/data-schema/dist/esm/runtime/internals/operations/list.mjs");
/* harmony import */ var _operations_indexQuery_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../operations/indexQuery.mjs */ "../../node_modules/@aws-amplify/data-schema/dist/esm/runtime/internals/operations/indexQuery.mjs");
/* harmony import */ var _operations_get_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../operations/get.mjs */ "../../node_modules/@aws-amplify/data-schema/dist/esm/runtime/internals/operations/get.mjs");
/* harmony import */ var _clientUtils_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../clientUtils.mjs */ "../../node_modules/@aws-amplify/data-schema/dist/esm/runtime/internals/clientUtils.mjs");





function generateModelsProperty(client, params, getInternals) {
    const models = {};
    const { config } = params;
    const useContext = params.amplify === null;
    if (!config) {
        throw new Error('generateModelsProperty cannot retrieve Amplify config');
    }
    if (!config.API?.GraphQL) {
        return {};
    }
    const modelIntrospection = config.API.GraphQL.modelIntrospection;
    if (!modelIntrospection) {
        return {};
    }
    const SSR_UNSUPORTED_OPS = [
        'ONCREATE',
        'ONUPDATE',
        'ONDELETE',
        'OBSERVEQUERY',
    ];
    for (const model of Object.values(modelIntrospection.models)) {
        const { name } = model;
        models[name] = {};
        const enabledModelOps = (0,_clientUtils_mjs__WEBPACK_IMPORTED_MODULE_3__.excludeDisabledOps)(modelIntrospection, name);
        Object.entries(enabledModelOps).forEach(([key, { operationPrefix }]) => {
            const operation = key;
            // subscriptions are not supported in SSR
            if (SSR_UNSUPORTED_OPS.includes(operation))
                return;
            if (operation === 'LIST') {
                models[name][operationPrefix] = (0,_operations_list_mjs__WEBPACK_IMPORTED_MODULE_0__.listFactory)(client, modelIntrospection, model, getInternals, useContext);
            }
            else {
                models[name][operationPrefix] = (0,_operations_get_mjs__WEBPACK_IMPORTED_MODULE_2__.getFactory)(client, modelIntrospection, model, operation, getInternals, useContext);
            }
        });
        const secondaryIdxs = (0,_clientUtils_mjs__WEBPACK_IMPORTED_MODULE_3__.getSecondaryIndexesFromSchemaModel)(model);
        for (const idx of secondaryIdxs) {
            models[name][idx.queryField] = (0,_operations_indexQuery_mjs__WEBPACK_IMPORTED_MODULE_1__.indexQueryFactory)(client, modelIntrospection, model, idx, getInternals, useContext);
        }
    }
    return models;
}


//# sourceMappingURL=generateModelsProperty.mjs.map


/***/ }),

/***/ "../../node_modules/@aws-amplify/data-schema/dist/esm/runtime/internals/utils/clientProperties/generateConversationsProperty.mjs":
/*!***************************************************************************************************************************************!*\
  !*** ../../node_modules/@aws-amplify/data-schema/dist/esm/runtime/internals/utils/clientProperties/generateConversationsProperty.mjs ***!
  \***************************************************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   generateConversationsProperty: () => (/* binding */ generateConversationsProperty)
/* harmony export */ });
/* harmony import */ var _ai_createCreateConversationFunction_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../ai/createCreateConversationFunction.mjs */ "../../node_modules/@aws-amplify/data-schema/dist/esm/runtime/internals/ai/createCreateConversationFunction.mjs");
/* harmony import */ var _ai_createGetConversationFunction_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../ai/createGetConversationFunction.mjs */ "../../node_modules/@aws-amplify/data-schema/dist/esm/runtime/internals/ai/createGetConversationFunction.mjs");
/* harmony import */ var _ai_createListConversationsFunction_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../ai/createListConversationsFunction.mjs */ "../../node_modules/@aws-amplify/data-schema/dist/esm/runtime/internals/ai/createListConversationsFunction.mjs");
/* harmony import */ var _ai_createDeleteConversationFunction_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../ai/createDeleteConversationFunction.mjs */ "../../node_modules/@aws-amplify/data-schema/dist/esm/runtime/internals/ai/createDeleteConversationFunction.mjs");





// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
function generateConversationsProperty(client, apiGraphQLConfig, getInternals) {
    const modelIntrospection = apiGraphQLConfig?.modelIntrospection;
    // conversations will be absent from model intro schema if no conversation routes
    // are present on the source schema.
    if (!modelIntrospection?.conversations) {
        return {};
    }
    const conversations = {};
    for (const { name, conversation, message, models, nonModels, enums, } of Object.values(modelIntrospection.conversations)) {
        const conversationModel = models[conversation.modelName];
        const conversationMessageModel = models[message.modelName];
        if (!conversationModel || !conversationMessageModel) {
            return {};
        }
        const conversationModelIntrospection = {
            ...modelIntrospection,
            models: {
                ...modelIntrospection.models,
                ...models,
            },
            nonModels: {
                ...modelIntrospection.nonModels,
                ...nonModels,
            },
            enums: {
                ...modelIntrospection.enums,
                ...enums,
            },
        };
        conversations[name] = {
            create: (0,_ai_createCreateConversationFunction_mjs__WEBPACK_IMPORTED_MODULE_0__.createCreateConversationFunction)(client, conversationModelIntrospection, name, conversationModel, conversationMessageModel, getInternals),
            get: (0,_ai_createGetConversationFunction_mjs__WEBPACK_IMPORTED_MODULE_1__.createGetConversationFunction)(client, conversationModelIntrospection, name, conversationModel, conversationMessageModel, getInternals),
            delete: (0,_ai_createDeleteConversationFunction_mjs__WEBPACK_IMPORTED_MODULE_3__.createDeleteConversationFunction)(client, conversationModelIntrospection, name, conversationModel, conversationMessageModel, getInternals),
            list: (0,_ai_createListConversationsFunction_mjs__WEBPACK_IMPORTED_MODULE_2__.createListConversationsFunction)(client, conversationModelIntrospection, name, conversationModel, conversationMessageModel, getInternals),
        };
    }
    return conversations;
}


//# sourceMappingURL=generateConversationsProperty.mjs.map


/***/ }),

/***/ "../../node_modules/@aws-amplify/data-schema/dist/esm/runtime/internals/utils/clientProperties/generateEnumsProperty.mjs":
/*!*******************************************************************************************************************************!*\
  !*** ../../node_modules/@aws-amplify/data-schema/dist/esm/runtime/internals/utils/clientProperties/generateEnumsProperty.mjs ***!
  \*******************************************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   generateEnumsProperty: () => (/* binding */ generateEnumsProperty)
/* harmony export */ });
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
const generateEnumsProperty = (graphqlConfig) => {
    const modelIntrospection = graphqlConfig.modelIntrospection;
    if (!modelIntrospection) {
        return {};
    }
    const enums = {};
    for (const [_, enumData] of Object.entries(modelIntrospection.enums)) {
        enums[enumData.name] = {
            values: () => enumData.values,
        };
    }
    return enums;
};


//# sourceMappingURL=generateEnumsProperty.mjs.map


/***/ }),

/***/ "../../node_modules/@aws-amplify/data-schema/dist/esm/runtime/internals/utils/clientProperties/generateGenerationsProperty.mjs":
/*!*************************************************************************************************************************************!*\
  !*** ../../node_modules/@aws-amplify/data-schema/dist/esm/runtime/internals/utils/clientProperties/generateGenerationsProperty.mjs ***!
  \*************************************************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   generateGenerationsProperty: () => (/* binding */ generateGenerationsProperty)
/* harmony export */ });
/* harmony import */ var _operations_custom_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../operations/custom.mjs */ "../../node_modules/@aws-amplify/data-schema/dist/esm/runtime/internals/operations/custom.mjs");
/* harmony import */ var _ai_getCustomUserAgentDetails_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../ai/getCustomUserAgentDetails.mjs */ "../../node_modules/@aws-amplify/data-schema/dist/esm/runtime/internals/ai/getCustomUserAgentDetails.mjs");



// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
function generateGenerationsProperty(client, apiGraphQLConfig, getInternals) {
    const modelIntrospection = apiGraphQLConfig?.modelIntrospection;
    // generations will be absent from model intro schema if no generation routes
    // are present on the source schema.
    if (!modelIntrospection?.generations) {
        return {};
    }
    const generations = {};
    for (const generation of Object.values(modelIntrospection.generations)) {
        generations[generation.name] = (0,_operations_custom_mjs__WEBPACK_IMPORTED_MODULE_0__.customOpFactory)(client, modelIntrospection, 'query', generation, false, getInternals, (0,_ai_getCustomUserAgentDetails_mjs__WEBPACK_IMPORTED_MODULE_1__.getCustomUserAgentDetails)(_ai_getCustomUserAgentDetails_mjs__WEBPACK_IMPORTED_MODULE_1__.AiAction.Generation));
    }
    return generations;
}


//# sourceMappingURL=generateGenerationsProperty.mjs.map


/***/ }),

/***/ "../../node_modules/@aws-amplify/data-schema/dist/esm/runtime/internals/utils/clientProperties/generateModelsProperty.mjs":
/*!********************************************************************************************************************************!*\
  !*** ../../node_modules/@aws-amplify/data-schema/dist/esm/runtime/internals/utils/clientProperties/generateModelsProperty.mjs ***!
  \********************************************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   generateModelsProperty: () => (/* binding */ generateModelsProperty)
/* harmony export */ });
/* harmony import */ var _operations_list_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../operations/list.mjs */ "../../node_modules/@aws-amplify/data-schema/dist/esm/runtime/internals/operations/list.mjs");
/* harmony import */ var _operations_indexQuery_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../operations/indexQuery.mjs */ "../../node_modules/@aws-amplify/data-schema/dist/esm/runtime/internals/operations/indexQuery.mjs");
/* harmony import */ var _operations_get_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../operations/get.mjs */ "../../node_modules/@aws-amplify/data-schema/dist/esm/runtime/internals/operations/get.mjs");
/* harmony import */ var _operations_subscription_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../operations/subscription.mjs */ "../../node_modules/@aws-amplify/data-schema/dist/esm/runtime/internals/operations/subscription.mjs");
/* harmony import */ var _operations_observeQuery_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../operations/observeQuery.mjs */ "../../node_modules/@aws-amplify/data-schema/dist/esm/runtime/internals/operations/observeQuery.mjs");
/* harmony import */ var _clientUtils_mjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../clientUtils.mjs */ "../../node_modules/@aws-amplify/data-schema/dist/esm/runtime/internals/clientUtils.mjs");







function generateModelsProperty(client, apiGraphQLConfig, getInternals) {
    const models = {};
    const modelIntrospection = apiGraphQLConfig.modelIntrospection;
    if (!modelIntrospection) {
        return {};
    }
    const SUBSCRIPTION_OPS = ['ONCREATE', 'ONUPDATE', 'ONDELETE'];
    for (const model of Object.values(modelIntrospection.models)) {
        const { name } = model;
        models[name] = {};
        const enabledModelOps = (0,_clientUtils_mjs__WEBPACK_IMPORTED_MODULE_5__.excludeDisabledOps)(modelIntrospection, name);
        Object.entries(enabledModelOps).forEach(([key, { operationPrefix }]) => {
            const operation = key;
            if (operation === 'LIST') {
                models[name][operationPrefix] = (0,_operations_list_mjs__WEBPACK_IMPORTED_MODULE_0__.listFactory)(client, modelIntrospection, model, getInternals);
            }
            else if (SUBSCRIPTION_OPS.includes(operation)) {
                models[name][operationPrefix] = (0,_operations_subscription_mjs__WEBPACK_IMPORTED_MODULE_3__.subscriptionFactory)(client, modelIntrospection, model, operation, getInternals);
            }
            else if (operation === 'OBSERVEQUERY') {
                models[name][operationPrefix] = (0,_operations_observeQuery_mjs__WEBPACK_IMPORTED_MODULE_4__.observeQueryFactory)(models, model);
            }
            else {
                models[name][operationPrefix] = (0,_operations_get_mjs__WEBPACK_IMPORTED_MODULE_2__.getFactory)(client, modelIntrospection, model, operation, getInternals);
            }
        });
        const secondaryIdxs = (0,_clientUtils_mjs__WEBPACK_IMPORTED_MODULE_5__.getSecondaryIndexesFromSchemaModel)(model);
        for (const idx of secondaryIdxs) {
            models[name][idx.queryField] = (0,_operations_indexQuery_mjs__WEBPACK_IMPORTED_MODULE_1__.indexQueryFactory)(client, modelIntrospection, model, idx, getInternals);
        }
    }
    return models;
}


//# sourceMappingURL=generateModelsProperty.mjs.map


/***/ }),

/***/ "../../node_modules/@aws-amplify/data-schema/dist/esm/runtime/internals/utils/runtimeTypeGuards/isApiGraphQLProviderConfig.mjs":
/*!*************************************************************************************************************************************!*\
  !*** ../../node_modules/@aws-amplify/data-schema/dist/esm/runtime/internals/utils/runtimeTypeGuards/isApiGraphQLProviderConfig.mjs ***!
  \*************************************************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   isApiGraphQLConfig: () => (/* binding */ isApiGraphQLConfig)
/* harmony export */ });
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
function isApiGraphQLConfig(apiGraphQLConfig) {
    return apiGraphQLConfig !== undefined;
}


//# sourceMappingURL=isApiGraphQLProviderConfig.mjs.map


/***/ }),

/***/ "../../node_modules/@aws-amplify/data-schema/dist/esm/runtime/utils/findIndexByFields.mjs":
/*!************************************************************************************************!*\
  !*** ../../node_modules/@aws-amplify/data-schema/dist/esm/runtime/utils/findIndexByFields.mjs ***!
  \************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   findIndexByFields: () => (/* binding */ findIndexByFields)
/* harmony export */ });
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
/**
 * Iterates through a collection to find a matching item and returns the index.
 *
 * @param needle The item to search for
 * @param haystack The collection to search
 * @param keyFields The fields used to indicate a match
 * @returns Index of `needle` in `haystack`, otherwise -1 if not found.
 */
function findIndexByFields(needle, haystack, keyFields) {
    const searchObject = Object.fromEntries(keyFields.map((fieldName) => [fieldName, needle[fieldName]]));
    for (let i = 0; i < haystack.length; i++) {
        if (Object.keys(searchObject).every((k) => searchObject[k] === haystack[i][k])) {
            return i;
        }
    }
    return -1;
}


//# sourceMappingURL=findIndexByFields.mjs.map


/***/ }),

/***/ "../../node_modules/@aws-amplify/data-schema/dist/esm/runtime/utils/resolveOwnerFields.mjs":
/*!*************************************************************************************************!*\
  !*** ../../node_modules/@aws-amplify/data-schema/dist/esm/runtime/utils/resolveOwnerFields.mjs ***!
  \*************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   resolveOwnerFields: () => (/* binding */ resolveOwnerFields)
/* harmony export */ });
/**
 * Given an introspection schema model, returns all owner fields.
 *
 * @param model Model from an introspection schema
 * @returns List of owner field names
 */
function resolveOwnerFields(model) {
    const ownerFields = new Set();
    for (const attr of model.attributes || []) {
        if (isAuthAttribute(attr)) {
            for (const rule of attr.properties.rules) {
                if (rule.allow === 'owner') {
                    ownerFields.add(rule.ownerField || 'owner');
                }
                else if (rule.allow === 'groups' && rule.groupsField !== undefined) {
                    // only valid for dynamic group(s)
                    // static group auth will have an array of predefined groups in the attribute, groups: string[]
                    // but `groupsField` will be undefined
                    ownerFields.add(rule.groupsField);
                }
            }
        }
    }
    return Array.from(ownerFields);
}
/**
 * Type guard that identifies an auth attribute with an attached rules list that
 * specifies an `allow` attribute at a minimum.
 *
 * @param attribute Any object. Ideally a model introspection schema model attribute
 * @returns True if given object is an auth attribute
 */
function isAuthAttribute(attribute) {
    if (attribute?.type === 'auth') {
        if (typeof attribute?.properties === 'object') {
            if (Array.isArray(attribute?.properties?.rules)) {
                return (attribute?.properties?.rules).every((rule) => !!rule.allow);
            }
        }
    }
    return false;
}


//# sourceMappingURL=resolveOwnerFields.mjs.map


/***/ }),

/***/ "../../node_modules/@aws-amplify/data-schema/dist/esm/runtime/utils/resolvePKFields.mjs":
/*!**********************************************************************************************!*\
  !*** ../../node_modules/@aws-amplify/data-schema/dist/esm/runtime/utils/resolvePKFields.mjs ***!
  \**********************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   resolvePKFields: () => (/* binding */ resolvePKFields)
/* harmony export */ });
/**
 * Given a SchemaModel from a ModelIntrospectionSchema, returns the primary key
 * as an array of field names.
 *
 * @param model The model object
 * @returns Array of field names
 */
function resolvePKFields(model) {
    const { primaryKeyFieldName, sortKeyFieldNames } = model.primaryKeyInfo;
    return [primaryKeyFieldName, ...sortKeyFieldNames];
}


//# sourceMappingURL=resolvePKFields.mjs.map


/***/ }),

/***/ "../../node_modules/@aws-amplify/data-schema/dist/esm/runtime/utils/selfAwareAsync.mjs":
/*!*********************************************************************************************!*\
  !*** ../../node_modules/@aws-amplify/data-schema/dist/esm/runtime/utils/selfAwareAsync.mjs ***!
  \*********************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   selfAwareAsync: () => (/* binding */ selfAwareAsync)
/* harmony export */ });
/**
 * Executes an `async` resolver function, providing the `Promise`-to-be-returned as the
 * first argument to the resolver so that the resolver can refer to the `Promise` that
 * external callers will see.
 *
 * ```ts
 * const outer = selfAwareAsync(async inner => {
 *  console.log(outer === inner); // true
 * });
 * ```
 *
 * This utility exists to reduce boilerplate in cases where promise resolving code needs
 * to track or register its "own" `Promise` *as seen by the caller* in some way. E.g.,
 * when mapping `Promise` chains for `client.cancel()`.
 *
 * @param resolver
 * @returns
 */
function selfAwareAsync(resolver) {
    let resolve;
    let reject;
    const resultPromise = new Promise((res, rej) => {
        resolve = res;
        reject = rej;
    });
    resolver(resultPromise)
        .then((result) => {
        resolve(result);
    })
        .catch((error) => {
        reject(error);
    });
    return resultPromise;
}


//# sourceMappingURL=selfAwareAsync.mjs.map


/***/ }),

/***/ "../../node_modules/@aws-amplify/data-schema/dist/esm/runtime/utils/stringTransformation.mjs":
/*!***************************************************************************************************!*\
  !*** ../../node_modules/@aws-amplify/data-schema/dist/esm/runtime/utils/stringTransformation.mjs ***!
  \***************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   capitalize: () => (/* binding */ capitalize)
/* harmony export */ });
/**
 * @param s string to capitalize
 * @returns capitalized string
 */
function capitalize(s) {
    return `${s[0].toUpperCase()}${s.slice(1)}`;
}


//# sourceMappingURL=stringTransformation.mjs.map


/***/ }),

/***/ "../../node_modules/tslib/tslib.es6.mjs":
/*!**********************************************!*\
  !*** ../../node_modules/tslib/tslib.es6.mjs ***!
  \**********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   __addDisposableResource: () => (/* binding */ __addDisposableResource),
/* harmony export */   __assign: () => (/* binding */ __assign),
/* harmony export */   __asyncDelegator: () => (/* binding */ __asyncDelegator),
/* harmony export */   __asyncGenerator: () => (/* binding */ __asyncGenerator),
/* harmony export */   __asyncValues: () => (/* binding */ __asyncValues),
/* harmony export */   __await: () => (/* binding */ __await),
/* harmony export */   __awaiter: () => (/* binding */ __awaiter),
/* harmony export */   __classPrivateFieldGet: () => (/* binding */ __classPrivateFieldGet),
/* harmony export */   __classPrivateFieldIn: () => (/* binding */ __classPrivateFieldIn),
/* harmony export */   __classPrivateFieldSet: () => (/* binding */ __classPrivateFieldSet),
/* harmony export */   __createBinding: () => (/* binding */ __createBinding),
/* harmony export */   __decorate: () => (/* binding */ __decorate),
/* harmony export */   __disposeResources: () => (/* binding */ __disposeResources),
/* harmony export */   __esDecorate: () => (/* binding */ __esDecorate),
/* harmony export */   __exportStar: () => (/* binding */ __exportStar),
/* harmony export */   __extends: () => (/* binding */ __extends),
/* harmony export */   __generator: () => (/* binding */ __generator),
/* harmony export */   __importDefault: () => (/* binding */ __importDefault),
/* harmony export */   __importStar: () => (/* binding */ __importStar),
/* harmony export */   __makeTemplateObject: () => (/* binding */ __makeTemplateObject),
/* harmony export */   __metadata: () => (/* binding */ __metadata),
/* harmony export */   __param: () => (/* binding */ __param),
/* harmony export */   __propKey: () => (/* binding */ __propKey),
/* harmony export */   __read: () => (/* binding */ __read),
/* harmony export */   __rest: () => (/* binding */ __rest),
/* harmony export */   __runInitializers: () => (/* binding */ __runInitializers),
/* harmony export */   __setFunctionName: () => (/* binding */ __setFunctionName),
/* harmony export */   __spread: () => (/* binding */ __spread),
/* harmony export */   __spreadArray: () => (/* binding */ __spreadArray),
/* harmony export */   __spreadArrays: () => (/* binding */ __spreadArrays),
/* harmony export */   __values: () => (/* binding */ __values),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise, SuppressedError, Symbol, Iterator */

var extendStatics = function(d, b) {
  extendStatics = Object.setPrototypeOf ||
      ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
      function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
  return extendStatics(d, b);
};

function __extends(d, b) {
  if (typeof b !== "function" && b !== null)
      throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
  extendStatics(d, b);
  function __() { this.constructor = d; }
  d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
  __assign = Object.assign || function __assign(t) {
      for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
      }
      return t;
  }
  return __assign.apply(this, arguments);
}

function __rest(s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
      t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function")
      for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
          if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
              t[p[i]] = s[p[i]];
      }
  return t;
}

function __decorate(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
}

function __param(paramIndex, decorator) {
  return function (target, key) { decorator(target, key, paramIndex); }
}

function __esDecorate(ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
  function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
  var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
  var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
  var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
  var _, done = false;
  for (var i = decorators.length - 1; i >= 0; i--) {
      var context = {};
      for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
      for (var p in contextIn.access) context.access[p] = contextIn.access[p];
      context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
      var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
      if (kind === "accessor") {
          if (result === void 0) continue;
          if (result === null || typeof result !== "object") throw new TypeError("Object expected");
          if (_ = accept(result.get)) descriptor.get = _;
          if (_ = accept(result.set)) descriptor.set = _;
          if (_ = accept(result.init)) initializers.unshift(_);
      }
      else if (_ = accept(result)) {
          if (kind === "field") initializers.unshift(_);
          else descriptor[key] = _;
      }
  }
  if (target) Object.defineProperty(target, contextIn.name, descriptor);
  done = true;
};

function __runInitializers(thisArg, initializers, value) {
  var useValue = arguments.length > 2;
  for (var i = 0; i < initializers.length; i++) {
      value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
  }
  return useValue ? value : void 0;
};

function __propKey(x) {
  return typeof x === "symbol" ? x : "".concat(x);
};

function __setFunctionName(f, name, prefix) {
  if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
  return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};

function __metadata(metadataKey, metadataValue) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}

function __awaiter(thisArg, _arguments, P, generator) {
  function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
  return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
      function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
      function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
}

function __generator(thisArg, body) {
  var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
  return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
  function verb(n) { return function (v) { return step([n, v]); }; }
  function step(op) {
      if (f) throw new TypeError("Generator is already executing.");
      while (g && (g = 0, op[0] && (_ = 0)), _) try {
          if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
          if (y = 0, t) op = [op[0] & 2, t.value];
          switch (op[0]) {
              case 0: case 1: t = op; break;
              case 4: _.label++; return { value: op[1], done: false };
              case 5: _.label++; y = op[1]; op = [0]; continue;
              case 7: op = _.ops.pop(); _.trys.pop(); continue;
              default:
                  if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                  if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                  if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                  if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                  if (t[2]) _.ops.pop();
                  _.trys.pop(); continue;
          }
          op = body.call(thisArg, _);
      } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
      if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
  }
}

var __createBinding = Object.create ? (function(o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  var desc = Object.getOwnPropertyDescriptor(m, k);
  if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
  }
  Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  o[k2] = m[k];
});

function __exportStar(m, o) {
  for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(o, p)) __createBinding(o, m, p);
}

function __values(o) {
  var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
  if (m) return m.call(o);
  if (o && typeof o.length === "number") return {
      next: function () {
          if (o && i >= o.length) o = void 0;
          return { value: o && o[i++], done: !o };
      }
  };
  throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
}

function __read(o, n) {
  var m = typeof Symbol === "function" && o[Symbol.iterator];
  if (!m) return o;
  var i = m.call(o), r, ar = [], e;
  try {
      while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
  }
  catch (error) { e = { error: error }; }
  finally {
      try {
          if (r && !r.done && (m = i["return"])) m.call(i);
      }
      finally { if (e) throw e.error; }
  }
  return ar;
}

/** @deprecated */
function __spread() {
  for (var ar = [], i = 0; i < arguments.length; i++)
      ar = ar.concat(__read(arguments[i]));
  return ar;
}

/** @deprecated */
function __spreadArrays() {
  for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
  for (var r = Array(s), k = 0, i = 0; i < il; i++)
      for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
          r[k] = a[j];
  return r;
}

function __spreadArray(to, from, pack) {
  if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
      if (ar || !(i in from)) {
          if (!ar) ar = Array.prototype.slice.call(from, 0, i);
          ar[i] = from[i];
      }
  }
  return to.concat(ar || Array.prototype.slice.call(from));
}

function __await(v) {
  return this instanceof __await ? (this.v = v, this) : new __await(v);
}

function __asyncGenerator(thisArg, _arguments, generator) {
  if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
  var g = generator.apply(thisArg, _arguments || []), i, q = [];
  return i = Object.create((typeof AsyncIterator === "function" ? AsyncIterator : Object).prototype), verb("next"), verb("throw"), verb("return", awaitReturn), i[Symbol.asyncIterator] = function () { return this; }, i;
  function awaitReturn(f) { return function (v) { return Promise.resolve(v).then(f, reject); }; }
  function verb(n, f) { if (g[n]) { i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; if (f) i[n] = f(i[n]); } }
  function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
  function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
  function fulfill(value) { resume("next", value); }
  function reject(value) { resume("throw", value); }
  function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
}

function __asyncDelegator(o) {
  var i, p;
  return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
  function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: false } : f ? f(v) : v; } : f; }
}

function __asyncValues(o) {
  if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
  var m = o[Symbol.asyncIterator], i;
  return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
  function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
  function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
}

function __makeTemplateObject(cooked, raw) {
  if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
  return cooked;
};

var __setModuleDefault = Object.create ? (function(o, v) {
  Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
  o["default"] = v;
};

function __importStar(mod) {
  if (mod && mod.__esModule) return mod;
  var result = {};
  if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
  __setModuleDefault(result, mod);
  return result;
}

function __importDefault(mod) {
  return (mod && mod.__esModule) ? mod : { default: mod };
}

function __classPrivateFieldGet(receiver, state, kind, f) {
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
}

function __classPrivateFieldSet(receiver, state, value, kind, f) {
  if (kind === "m") throw new TypeError("Private method is not writable");
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
}

function __classPrivateFieldIn(state, receiver) {
  if (receiver === null || (typeof receiver !== "object" && typeof receiver !== "function")) throw new TypeError("Cannot use 'in' operator on non-object");
  return typeof state === "function" ? receiver === state : state.has(receiver);
}

function __addDisposableResource(env, value, async) {
  if (value !== null && value !== void 0) {
    if (typeof value !== "object" && typeof value !== "function") throw new TypeError("Object expected.");
    var dispose, inner;
    if (async) {
      if (!Symbol.asyncDispose) throw new TypeError("Symbol.asyncDispose is not defined.");
      dispose = value[Symbol.asyncDispose];
    }
    if (dispose === void 0) {
      if (!Symbol.dispose) throw new TypeError("Symbol.dispose is not defined.");
      dispose = value[Symbol.dispose];
      if (async) inner = dispose;
    }
    if (typeof dispose !== "function") throw new TypeError("Object not disposable.");
    if (inner) dispose = function() { try { inner.call(this); } catch (e) { return Promise.reject(e); } };
    env.stack.push({ value: value, dispose: dispose, async: async });
  }
  else if (async) {
    env.stack.push({ async: true });
  }
  return value;
}

var _SuppressedError = typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
  var e = new Error(message);
  return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

function __disposeResources(env) {
  function fail(e) {
    env.error = env.hasError ? new _SuppressedError(e, env.error, "An error was suppressed during disposal.") : e;
    env.hasError = true;
  }
  var r, s = 0;
  function next() {
    while (r = env.stack.pop()) {
      try {
        if (!r.async && s === 1) return s = 0, env.stack.push(r), Promise.resolve().then(next);
        if (r.dispose) {
          var result = r.dispose.call(r.value);
          if (r.async) return s |= 2, Promise.resolve(result).then(next, function(e) { fail(e); return next(); });
        }
        else s |= 1;
      }
      catch (e) {
        fail(e);
      }
    }
    if (s === 1) return env.hasError ? Promise.reject(env.error) : Promise.resolve();
    if (env.hasError) throw env.error;
  }
  return next();
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  __extends,
  __assign,
  __rest,
  __decorate,
  __param,
  __metadata,
  __awaiter,
  __generator,
  __createBinding,
  __exportStar,
  __values,
  __read,
  __spread,
  __spreadArrays,
  __spreadArray,
  __await,
  __asyncGenerator,
  __asyncDelegator,
  __asyncValues,
  __makeTemplateObject,
  __importStar,
  __importDefault,
  __classPrivateFieldGet,
  __classPrivateFieldSet,
  __classPrivateFieldIn,
  __addDisposableResource,
  __disposeResources,
});


/***/ }),

/***/ "./dist/esm/GraphQLAPI.mjs":
/*!*********************************!*\
  !*** ./dist/esm/GraphQLAPI.mjs ***!
  \*********************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   GraphQLAPI: () => (/* binding */ GraphQLAPI),
/* harmony export */   GraphQLAPIClass: () => (/* binding */ GraphQLAPIClass),
/* harmony export */   graphqlOperation: () => (/* binding */ graphqlOperation)
/* harmony export */ });
/* harmony import */ var _aws_amplify_core_internals_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @aws-amplify/core/internals/utils */ "../core/dist/esm/Platform/types.mjs");
/* harmony import */ var _aws_amplify_data_schema_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @aws-amplify/data-schema/runtime */ "../../node_modules/@aws-amplify/data-schema/dist/esm/runtime/index.mjs");
/* harmony import */ var _internals_InternalGraphQLAPI_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internals/InternalGraphQLAPI.mjs */ "./dist/esm/internals/InternalGraphQLAPI.mjs");




function isGraphQLOptionsWithOverride(options) {
    return _aws_amplify_data_schema_runtime__WEBPACK_IMPORTED_MODULE_0__.INTERNAL_USER_AGENT_OVERRIDE in options;
}
const graphqlOperation = (query, variables = {}, authToken) => ({
    query,
    variables,
    authToken,
});
/**
 * Export Cloud Logic APIs
 */
class GraphQLAPIClass extends _internals_InternalGraphQLAPI_mjs__WEBPACK_IMPORTED_MODULE_1__.InternalGraphQLAPIClass {
    getModuleName() {
        return 'GraphQLAPI';
    }
    /**
     * Executes a GraphQL operation
     *
     * @param options - GraphQL Options
     * @param [additionalHeaders] - headers to merge in after any `libraryConfigHeaders` set in the config
     * @returns An Observable if the query is a subscription query, else a promise of the graphql result.
     */
    graphql(amplify, options, additionalHeaders) {
        const userAgentDetails = {
            category: _aws_amplify_core_internals_utils__WEBPACK_IMPORTED_MODULE_2__.Category.API,
            action: _aws_amplify_core_internals_utils__WEBPACK_IMPORTED_MODULE_2__.ApiAction.GraphQl,
        };
        if (isGraphQLOptionsWithOverride(options)) {
            const { [_aws_amplify_data_schema_runtime__WEBPACK_IMPORTED_MODULE_0__.INTERNAL_USER_AGENT_OVERRIDE]: internalUserAgentOverride, ...cleanOptions } = options;
            return super.graphql(amplify, cleanOptions, additionalHeaders, {
                ...userAgentDetails,
                ...internalUserAgentOverride,
            });
        }
        return super.graphql(amplify, options, additionalHeaders, {
            ...userAgentDetails,
        });
    }
    /**
     * Checks to see if an error thrown is from an api request cancellation
     * @param error - Any error
     * @returns A boolean indicating if the error was from an api request cancellation
     */
    isCancelError(error) {
        return super.isCancelError(error);
    }
    /**
     * Cancels an inflight request. Only applicable for graphql queries and mutations
     * @param {any} request - request to cancel
     * @returns A boolean indicating if the request was cancelled
     */
    cancel(request, message) {
        return super.cancel(request, message);
    }
}
const GraphQLAPI = new GraphQLAPIClass();


//# sourceMappingURL=GraphQLAPI.mjs.map


/***/ }),

/***/ "./dist/esm/Providers/AWSAppSyncEventsProvider/index.mjs":
/*!***************************************************************!*\
  !*** ./dist/esm/Providers/AWSAppSyncEventsProvider/index.mjs ***!
  \***************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AWSAppSyncEventProvider: () => (/* binding */ AWSAppSyncEventProvider),
/* harmony export */   AppSyncEventProvider: () => (/* binding */ AppSyncEventProvider)
/* harmony export */ });
/* harmony import */ var _aws_amplify_core_internals_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @aws-amplify/core/internals/utils */ "../core/dist/esm/constants.mjs");
/* harmony import */ var _aws_amplify_core_internals_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @aws-amplify/core/internals/utils */ "../core/dist/esm/Platform/index.mjs");
/* harmony import */ var _constants_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../constants.mjs */ "./dist/esm/Providers/constants.mjs");
/* harmony import */ var _AWSWebSocketProvider_index_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../AWSWebSocketProvider/index.mjs */ "./dist/esm/Providers/AWSWebSocketProvider/index.mjs");
/* harmony import */ var _AWSWebSocketProvider_authHeaders_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../AWSWebSocketProvider/authHeaders.mjs */ "./dist/esm/Providers/AWSWebSocketProvider/authHeaders.mjs");





// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
const PROVIDER_NAME = 'AWSAppSyncEventsProvider';
const WS_PROTOCOL_NAME = 'aws-appsync-event-ws';
const CONNECT_URI = ''; // events does not expect a connect uri
class AWSAppSyncEventProvider extends _AWSWebSocketProvider_index_mjs__WEBPACK_IMPORTED_MODULE_0__.AWSWebSocketProvider {
    constructor() {
        super({
            providerName: PROVIDER_NAME,
            wsProtocolName: WS_PROTOCOL_NAME,
            connectUri: CONNECT_URI,
        });
    }
    getProviderName() {
        return PROVIDER_NAME;
    }
    async connect(options) {
        super.connect(options);
    }
    subscribe(options, customUserAgentDetails) {
        return super.subscribe(options, customUserAgentDetails).pipe();
    }
    async publish(options, customUserAgentDetails) {
        super.publish(options, customUserAgentDetails);
    }
    async _prepareSubscriptionPayload({ options, subscriptionId, customUserAgentDetails, additionalCustomHeaders, libraryConfigHeaders, publish, }) {
        const { appSyncGraphqlEndpoint, authenticationType, query, apiKey, region, } = options;
        // This will be needed for WS publish
        // const data = {
        // 	events: [variables],
        // };
        const serializedData = JSON.stringify({ channel: query });
        const headers = {
            ...(await (0,_AWSWebSocketProvider_authHeaders_mjs__WEBPACK_IMPORTED_MODULE_1__.awsRealTimeHeaderBasedAuth)({
                apiKey,
                appSyncGraphqlEndpoint,
                authenticationType,
                payload: serializedData,
                canonicalUri: '',
                region,
                additionalCustomHeaders,
            })),
            ...libraryConfigHeaders,
            ...additionalCustomHeaders,
            [_aws_amplify_core_internals_utils__WEBPACK_IMPORTED_MODULE_2__.USER_AGENT_HEADER]: (0,_aws_amplify_core_internals_utils__WEBPACK_IMPORTED_MODULE_3__.getAmplifyUserAgent)(customUserAgentDetails),
        };
        // Commented out code will be needed for WS publish
        const subscriptionMessage = {
            id: subscriptionId,
            channel: query,
            // events: [JSON.stringify(variables)],
            authorization: {
                ...headers,
            },
            // payload: {
            // 	events: serializedData,
            // 	extensions: {
            // 		authorization: {
            // 			...headers,
            // 		},
            // 	},
            // },
            type: publish
                ? _constants_mjs__WEBPACK_IMPORTED_MODULE_4__.MESSAGE_TYPES.EVENT_PUBLISH
                : _constants_mjs__WEBPACK_IMPORTED_MODULE_4__.MESSAGE_TYPES.EVENT_SUBSCRIBE,
        };
        const serializedSubscriptionMessage = JSON.stringify(subscriptionMessage);
        return serializedSubscriptionMessage;
    }
    _handleSubscriptionData(message) {
        this.logger.debug(`subscription message from AWS AppSync Events: ${message.data}`);
        const { id = '', event: payload, type, } = JSON.parse(String(message.data));
        const { observer = null, query = '', variables = {}, } = this.subscriptionObserverMap.get(id) || {};
        this.logger.debug({ id, observer, query, variables });
        if (type === _constants_mjs__WEBPACK_IMPORTED_MODULE_4__.MESSAGE_TYPES.DATA && payload) {
            const deserializedEvent = JSON.parse(payload);
            if (observer) {
                observer.next({ id, type, event: deserializedEvent });
            }
            else {
                this.logger.debug(`observer not found for id: ${id}`);
            }
            return [true, { id, type, payload: deserializedEvent }];
        }
        return [false, { id, type, payload }];
    }
    _unsubscribeMessage(subscriptionId) {
        return {
            id: subscriptionId,
            type: _constants_mjs__WEBPACK_IMPORTED_MODULE_4__.MESSAGE_TYPES.EVENT_STOP,
        };
    }
    _extractConnectionTimeout(data) {
        const { connectionTimeoutMs = _constants_mjs__WEBPACK_IMPORTED_MODULE_4__.DEFAULT_KEEP_ALIVE_TIMEOUT } = data;
        return connectionTimeoutMs;
    }
    _extractErrorCodeAndType(data) {
        const { errors: [{ errorType = '', errorCode = 0 } = {}] = [] } = data;
        return { errorCode, errorType };
    }
}
const AppSyncEventProvider = new AWSAppSyncEventProvider();


//# sourceMappingURL=index.mjs.map


/***/ }),

/***/ "./dist/esm/Providers/AWSAppSyncRealTimeProvider/index.mjs":
/*!*****************************************************************!*\
  !*** ./dist/esm/Providers/AWSAppSyncRealTimeProvider/index.mjs ***!
  \*****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AWSAppSyncRealTimeProvider: () => (/* binding */ AWSAppSyncRealTimeProvider)
/* harmony export */ });
/* harmony import */ var _aws_amplify_core_internals_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @aws-amplify/core/internals/utils */ "../core/dist/esm/constants.mjs");
/* harmony import */ var _aws_amplify_core_internals_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @aws-amplify/core/internals/utils */ "../core/dist/esm/Platform/index.mjs");
/* harmony import */ var _constants_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../constants.mjs */ "./dist/esm/Providers/constants.mjs");
/* harmony import */ var _AWSWebSocketProvider_index_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../AWSWebSocketProvider/index.mjs */ "./dist/esm/Providers/AWSWebSocketProvider/index.mjs");
/* harmony import */ var _AWSWebSocketProvider_authHeaders_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../AWSWebSocketProvider/authHeaders.mjs */ "./dist/esm/Providers/AWSWebSocketProvider/authHeaders.mjs");





// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
const PROVIDER_NAME = 'AWSAppSyncRealTimeProvider';
const WS_PROTOCOL_NAME = 'graphql-ws';
const CONNECT_URI = '/connect';
class AWSAppSyncRealTimeProvider extends _AWSWebSocketProvider_index_mjs__WEBPACK_IMPORTED_MODULE_0__.AWSWebSocketProvider {
    constructor() {
        super({
            providerName: PROVIDER_NAME,
            wsProtocolName: WS_PROTOCOL_NAME,
            connectUri: CONNECT_URI,
        });
    }
    getProviderName() {
        return PROVIDER_NAME;
    }
    subscribe(options, customUserAgentDetails) {
        return super.subscribe(options, customUserAgentDetails);
    }
    async _prepareSubscriptionPayload({ options, subscriptionId, customUserAgentDetails, additionalCustomHeaders, libraryConfigHeaders, }) {
        const { appSyncGraphqlEndpoint, authenticationType, query, variables, apiKey, region, } = options;
        const data = {
            query,
            variables,
        };
        const serializedData = JSON.stringify(data);
        const headers = {
            ...(await (0,_AWSWebSocketProvider_authHeaders_mjs__WEBPACK_IMPORTED_MODULE_1__.awsRealTimeHeaderBasedAuth)({
                apiKey,
                appSyncGraphqlEndpoint,
                authenticationType,
                payload: serializedData,
                canonicalUri: '',
                region,
                additionalCustomHeaders,
            })),
            ...libraryConfigHeaders,
            ...additionalCustomHeaders,
            [_aws_amplify_core_internals_utils__WEBPACK_IMPORTED_MODULE_2__.USER_AGENT_HEADER]: (0,_aws_amplify_core_internals_utils__WEBPACK_IMPORTED_MODULE_3__.getAmplifyUserAgent)(customUserAgentDetails),
        };
        const subscriptionMessage = {
            id: subscriptionId,
            payload: {
                data: serializedData,
                extensions: {
                    authorization: {
                        ...headers,
                    },
                },
            },
            type: _constants_mjs__WEBPACK_IMPORTED_MODULE_4__.MESSAGE_TYPES.GQL_START,
        };
        const serializedSubscriptionMessage = JSON.stringify(subscriptionMessage);
        return serializedSubscriptionMessage;
    }
    _handleSubscriptionData(message) {
        this.logger.debug(`subscription message from AWS AppSync RealTime: ${message.data}`);
        const { id = '', payload, type } = JSON.parse(String(message.data));
        const { observer = null, query = '', variables = {}, } = this.subscriptionObserverMap.get(id) || {};
        this.logger.debug({ id, observer, query, variables });
        if (type === _constants_mjs__WEBPACK_IMPORTED_MODULE_4__.MESSAGE_TYPES.DATA && payload && payload.data) {
            if (observer) {
                observer.next(payload);
            }
            else {
                this.logger.debug(`observer not found for id: ${id}`);
            }
            return [true, { id, type, payload }];
        }
        return [false, { id, type, payload }];
    }
    _unsubscribeMessage(subscriptionId) {
        return {
            id: subscriptionId,
            type: _constants_mjs__WEBPACK_IMPORTED_MODULE_4__.MESSAGE_TYPES.GQL_STOP,
        };
    }
    _extractConnectionTimeout(data) {
        const { payload: { connectionTimeoutMs = _constants_mjs__WEBPACK_IMPORTED_MODULE_4__.DEFAULT_KEEP_ALIVE_TIMEOUT } = {}, } = data;
        return connectionTimeoutMs;
    }
    _extractErrorCodeAndType(data) {
        const { payload: { errors: [{ errorType = '', errorCode = 0 } = {}] = [] } = {}, } = data;
        return { errorCode, errorType };
    }
}


//# sourceMappingURL=index.mjs.map


/***/ }),

/***/ "./dist/esm/Providers/AWSWebSocketProvider/appsyncUrl.mjs":
/*!****************************************************************!*\
  !*** ./dist/esm/Providers/AWSWebSocketProvider/appsyncUrl.mjs ***!
  \****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   additionalHeadersFromOptions: () => (/* binding */ additionalHeadersFromOptions),
/* harmony export */   getRealtimeEndpointUrl: () => (/* binding */ getRealtimeEndpointUrl),
/* harmony export */   isCustomDomain: () => (/* binding */ isCustomDomain),
/* harmony export */   queryParamsFromCustomHeaders: () => (/* binding */ queryParamsFromCustomHeaders),
/* harmony export */   realtimeUrlWithQueryString: () => (/* binding */ realtimeUrlWithQueryString)
/* harmony export */ });
/* harmony import */ var _aws_amplify_core_internals_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @aws-amplify/core/internals/utils */ "../core/dist/esm/utils/amplifyUrl/index.mjs");


// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
const protocol = 'wss://';
const standardDomainPattern = /^https:\/\/\w{26}\.appsync-api\.\w{2}(?:(?:-\w{2,})+)-\d\.amazonaws.com(?:\.cn)?\/graphql$/i;
const eventDomainPattern = /^https:\/\/\w{26}\.\w+-api\.\w{2}(?:(?:-\w{2,})+)-\d\.amazonaws.com(?:\.cn)?\/event$/i;
const customDomainPath = '/realtime';
const isCustomDomain = (url) => {
    return url.match(standardDomainPattern) === null;
};
const isEventDomain = (url) => url.match(eventDomainPattern) !== null;
const getRealtimeEndpointUrl = (appSyncGraphqlEndpoint) => {
    let realtimeEndpoint = appSyncGraphqlEndpoint ?? '';
    if (isEventDomain(realtimeEndpoint)) {
        realtimeEndpoint = realtimeEndpoint
            .concat(customDomainPath)
            .replace('ddpg-api', 'grt-gamma')
            .replace('appsync-api', 'appsync-realtime-api');
    }
    else if (isCustomDomain(realtimeEndpoint)) {
        realtimeEndpoint = realtimeEndpoint.concat(customDomainPath);
    }
    else {
        realtimeEndpoint = realtimeEndpoint
            .replace('appsync-api', 'appsync-realtime-api')
            .replace('gogi-beta', 'grt-beta')
            .replace('ddpg-api', 'grt-gamma');
    }
    realtimeEndpoint = realtimeEndpoint
        .replace('https://', protocol)
        .replace('http://', 'ws://');
    return new _aws_amplify_core_internals_utils__WEBPACK_IMPORTED_MODULE_0__.AmplifyUrl(realtimeEndpoint);
};
/**
 * Strips out `Authorization` header if present
 */
const extractNonAuthHeaders = (headers) => {
    if (!headers) {
        return {};
    }
    if ('Authorization' in headers) {
        const { Authorization: _, ...nonAuthHeaders } = headers;
        return nonAuthHeaders;
    }
    return headers;
};
/**
 *
 * @param headers - http headers
 * @returns uri-encoded query parameters derived from custom headers
 */
const queryParamsFromCustomHeaders = (headers) => {
    const nonAuthHeaders = extractNonAuthHeaders(headers);
    const params = new _aws_amplify_core_internals_utils__WEBPACK_IMPORTED_MODULE_0__.AmplifyUrlSearchParams();
    Object.entries(nonAuthHeaders).forEach(([k, v]) => {
        params.append(k, v);
    });
    return params;
};
/**
 * Normalizes AppSync realtime endpoint URL
 *
 * @param appSyncGraphqlEndpoint - AppSync endpointUri from config
 * @param urlParams - URLSearchParams
 * @returns fully resolved string realtime endpoint URL
 */
const realtimeUrlWithQueryString = (appSyncGraphqlEndpoint, urlParams) => {
    const realtimeEndpointUrl = getRealtimeEndpointUrl(appSyncGraphqlEndpoint);
    // preserves any query params a customer might manually set in the configuration
    const existingParams = new _aws_amplify_core_internals_utils__WEBPACK_IMPORTED_MODULE_0__.AmplifyUrlSearchParams(realtimeEndpointUrl.search);
    for (const [k, v] of urlParams.entries()) {
        existingParams.append(k, v);
    }
    realtimeEndpointUrl.search = existingParams.toString();
    return realtimeEndpointUrl.toString();
};
// TODO: move to separate file?
const additionalHeadersFromOptions = async (options) => {
    const { appSyncGraphqlEndpoint, query, libraryConfigHeaders = () => ({}), additionalHeaders = {}, authToken, } = options;
    let additionalCustomHeaders = {};
    const _libraryConfigHeaders = await libraryConfigHeaders();
    if (typeof additionalHeaders === 'function') {
        const requestOptions = {
            url: appSyncGraphqlEndpoint || '',
            queryString: query || '',
        };
        additionalCustomHeaders = await additionalHeaders(requestOptions);
    }
    else {
        additionalCustomHeaders = additionalHeaders;
    }
    // if an authorization header is set, have the explicit, operation-level authToken take precedence
    if (authToken) {
        additionalCustomHeaders = {
            ...additionalCustomHeaders,
            Authorization: authToken,
        };
    }
    return {
        additionalCustomHeaders,
        libraryConfigHeaders: _libraryConfigHeaders,
    };
};


//# sourceMappingURL=appsyncUrl.mjs.map


/***/ }),

/***/ "./dist/esm/Providers/AWSWebSocketProvider/authHeaders.mjs":
/*!*****************************************************************!*\
  !*** ./dist/esm/Providers/AWSWebSocketProvider/authHeaders.mjs ***!
  \*****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   awsRealTimeHeaderBasedAuth: () => (/* binding */ awsRealTimeHeaderBasedAuth)
/* harmony export */ });
/* harmony import */ var _aws_amplify_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @aws-amplify/core */ "@aws-amplify/core");
/* harmony import */ var _aws_amplify_core_internals_aws_client_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @aws-amplify/core/internals/aws-client-utils */ "../core/dist/esm/clients/middleware/signing/signer/signatureV4/signRequest.mjs");
/* harmony import */ var _aws_amplify_core_internals_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @aws-amplify/core/internals/utils */ "../core/dist/esm/utils/amplifyUrl/index.mjs");
/* harmony import */ var _constants_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../constants.mjs */ "./dist/esm/Providers/constants.mjs");





// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
const logger = new _aws_amplify_core__WEBPACK_IMPORTED_MODULE_0__.ConsoleLogger('AWSAppSyncRealTimeProvider Auth');
const awsAuthTokenHeader = async ({ host }) => {
    const session = await (0,_aws_amplify_core__WEBPACK_IMPORTED_MODULE_0__.fetchAuthSession)();
    return {
        Authorization: session?.tokens?.accessToken?.toString(),
        host,
    };
};
const awsRealTimeApiKeyHeader = async ({ apiKey, host, }) => {
    const dt = new Date();
    const dtStr = dt.toISOString().replace(/[:-]|\.\d{3}/g, '');
    return {
        host,
        'x-amz-date': dtStr,
        'x-api-key': apiKey,
    };
};
const awsRealTimeIAMHeader = async ({ payload, canonicalUri, appSyncGraphqlEndpoint, region, }) => {
    const endpointInfo = {
        region,
        service: 'appsync',
    };
    const creds = (await (0,_aws_amplify_core__WEBPACK_IMPORTED_MODULE_0__.fetchAuthSession)()).credentials;
    const request = {
        url: `${appSyncGraphqlEndpoint}${canonicalUri}`,
        data: payload,
        method: 'POST',
        headers: { ..._constants_mjs__WEBPACK_IMPORTED_MODULE_1__.AWS_APPSYNC_REALTIME_HEADERS },
    };
    const signedParams = (0,_aws_amplify_core_internals_aws_client_utils__WEBPACK_IMPORTED_MODULE_2__.signRequest)({
        headers: request.headers,
        method: request.method,
        url: new _aws_amplify_core_internals_utils__WEBPACK_IMPORTED_MODULE_3__.AmplifyUrl(request.url),
        body: request.data,
    }, {
        credentials: creds,
        signingRegion: endpointInfo.region,
        signingService: endpointInfo.service,
    });
    return signedParams.headers;
};
const customAuthHeader = async ({ host, additionalCustomHeaders, }) => {
    /**
     * If `additionalHeaders` was provided to the subscription as a function,
     * the headers that are returned by that function will already have been
     * provided before this function is called.
     */
    if (!additionalCustomHeaders?.Authorization) {
        throw new Error('No auth token specified');
    }
    return {
        Authorization: additionalCustomHeaders.Authorization,
        host,
    };
};
const awsRealTimeHeaderBasedAuth = async ({ apiKey, authenticationType, canonicalUri, appSyncGraphqlEndpoint, region, additionalCustomHeaders, payload, }) => {
    const headerHandler = {
        apiKey: awsRealTimeApiKeyHeader,
        iam: awsRealTimeIAMHeader,
        oidc: awsAuthTokenHeader,
        userPool: awsAuthTokenHeader,
        lambda: customAuthHeader,
        none: customAuthHeader,
    };
    if (!authenticationType || !headerHandler[authenticationType]) {
        logger.debug(`Authentication type ${authenticationType} not supported`);
        return undefined;
    }
    else {
        const handler = headerHandler[authenticationType];
        const host = appSyncGraphqlEndpoint
            ? new _aws_amplify_core_internals_utils__WEBPACK_IMPORTED_MODULE_3__.AmplifyUrl(appSyncGraphqlEndpoint).host
            : undefined;
        const resolvedApiKey = authenticationType === 'apiKey' ? apiKey : undefined;
        logger.debug(`Authenticating with ${JSON.stringify(authenticationType)}`);
        const result = await handler({
            payload,
            canonicalUri,
            appSyncGraphqlEndpoint,
            apiKey: resolvedApiKey,
            region,
            host,
            additionalCustomHeaders,
        });
        return result;
    }
};


//# sourceMappingURL=authHeaders.mjs.map


/***/ }),

/***/ "./dist/esm/Providers/AWSWebSocketProvider/index.mjs":
/*!***********************************************************!*\
  !*** ./dist/esm/Providers/AWSWebSocketProvider/index.mjs ***!
  \***********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AWSWebSocketProvider: () => (/* binding */ AWSWebSocketProvider)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! rxjs */ "../../node_modules/rxjs/dist/esm5/internal/Observable.js");
/* harmony import */ var graphql__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! graphql */ "graphql");
/* harmony import */ var _aws_amplify_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @aws-amplify/core */ "@aws-amplify/core");
/* harmony import */ var _aws_amplify_core_internals_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @aws-amplify/core/internals/utils */ "../core/dist/esm/Hub/index.mjs");
/* harmony import */ var _aws_amplify_core_internals_utils__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @aws-amplify/core/internals/utils */ "../core/dist/esm/utils/retry/NonRetryableError.mjs");
/* harmony import */ var _aws_amplify_core_internals_utils__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @aws-amplify/core/internals/utils */ "../core/dist/esm/utils/amplifyUuid/index.mjs");
/* harmony import */ var _aws_amplify_core_internals_utils__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @aws-amplify/core/internals/utils */ "../core/dist/esm/utils/retry/isNonRetryableError.mjs");
/* harmony import */ var _aws_amplify_core_internals_utils__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @aws-amplify/core/internals/utils */ "../core/dist/esm/utils/convert/base64/base64Encoder.mjs");
/* harmony import */ var _aws_amplify_core_internals_utils__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @aws-amplify/core/internals/utils */ "../core/dist/esm/utils/retry/jitteredExponentialRetry.mjs");
/* harmony import */ var _types_PubSub_mjs__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../types/PubSub.mjs */ "./dist/esm/types/PubSub.mjs");
/* harmony import */ var _constants_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../constants.mjs */ "./dist/esm/Providers/constants.mjs");
/* harmony import */ var _utils_ConnectionStateMonitor_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../utils/ConnectionStateMonitor.mjs */ "./dist/esm/utils/ConnectionStateMonitor.mjs");
/* harmony import */ var _utils_ReconnectionMonitor_mjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../utils/ReconnectionMonitor.mjs */ "./dist/esm/utils/ReconnectionMonitor.mjs");
/* harmony import */ var _appsyncUrl_mjs__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./appsyncUrl.mjs */ "./dist/esm/Providers/AWSWebSocketProvider/appsyncUrl.mjs");
/* harmony import */ var _authHeaders_mjs__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./authHeaders.mjs */ "./dist/esm/Providers/AWSWebSocketProvider/authHeaders.mjs");











// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
const dispatchApiEvent = (payload) => {
    _aws_amplify_core__WEBPACK_IMPORTED_MODULE_1__.Hub.dispatch('api', payload, 'PubSub', _aws_amplify_core_internals_utils__WEBPACK_IMPORTED_MODULE_2__.AMPLIFY_SYMBOL);
};
class AWSWebSocketProvider {
    constructor(args) {
        this.subscriptionObserverMap = new Map();
        this.socketStatus = _constants_mjs__WEBPACK_IMPORTED_MODULE_3__.SOCKET_STATUS.CLOSED;
        this.keepAliveTimeout = _constants_mjs__WEBPACK_IMPORTED_MODULE_3__.DEFAULT_KEEP_ALIVE_TIMEOUT;
        this.promiseArray = [];
        this.connectionStateMonitor = new _utils_ConnectionStateMonitor_mjs__WEBPACK_IMPORTED_MODULE_4__.ConnectionStateMonitor();
        this.reconnectionMonitor = new _utils_ReconnectionMonitor_mjs__WEBPACK_IMPORTED_MODULE_5__.ReconnectionMonitor();
        /**
         * Open WebSocket connection & perform handshake
         * Ref: https://docs.aws.amazon.com/appsync/latest/devguide/real-time-websocket-client.html#appsynclong-real-time-websocket-client-implementation-guide-for-graphql-subscriptions
         *
         * @param subprotocol -
         */
        this._establishConnection = async (awsRealTimeUrl, subprotocol) => {
            this.logger.debug(`Establishing WebSocket connection to ${awsRealTimeUrl}`);
            try {
                await this._openConnection(awsRealTimeUrl, subprotocol);
                await this._initiateHandshake();
            }
            catch (err) {
                const { errorType, errorCode } = err;
                if (_constants_mjs__WEBPACK_IMPORTED_MODULE_3__.NON_RETRYABLE_CODES.includes(errorCode) ||
                    // Event API does not currently return `errorCode`. This may change in the future.
                    // For now fall back to also checking known non-retryable error types
                    _constants_mjs__WEBPACK_IMPORTED_MODULE_3__.NON_RETRYABLE_ERROR_TYPES.includes(errorType)) {
                    throw new _aws_amplify_core_internals_utils__WEBPACK_IMPORTED_MODULE_6__.NonRetryableError(errorType);
                }
                else if (errorType) {
                    throw new Error(errorType);
                }
                else {
                    throw err;
                }
            }
        };
        this.logger = new _aws_amplify_core__WEBPACK_IMPORTED_MODULE_1__.ConsoleLogger(args.providerName);
        this.wsProtocolName = args.wsProtocolName;
        this.wsConnectUri = args.connectUri;
        this.connectionStateMonitorSubscription =
            this._startConnectionStateMonitoring();
    }
    /**
     * Mark the socket closed and release all active listeners
     */
    close() {
        // Mark the socket closed both in status and the connection monitor
        this.socketStatus = _constants_mjs__WEBPACK_IMPORTED_MODULE_3__.SOCKET_STATUS.CLOSED;
        this.connectionStateMonitor.record(_utils_ConnectionStateMonitor_mjs__WEBPACK_IMPORTED_MODULE_4__.CONNECTION_CHANGE.CONNECTION_FAILED);
        // Turn off the subscription monitor Hub publishing
        this.connectionStateMonitorSubscription.unsubscribe();
        // Complete all reconnect observers
        this.reconnectionMonitor.close();
        return new Promise((resolve, reject) => {
            if (this.awsRealTimeSocket) {
                this.awsRealTimeSocket.onclose = (_) => {
                    this.subscriptionObserverMap = new Map();
                    this.awsRealTimeSocket = undefined;
                    resolve();
                };
                this.awsRealTimeSocket.onerror = (err) => {
                    reject(err);
                };
                this.awsRealTimeSocket.close();
            }
            else {
                resolve();
            }
        });
    }
    subscribe(options, customUserAgentDetails) {
        return new rxjs__WEBPACK_IMPORTED_MODULE_7__.Observable(observer => {
            if (!options?.appSyncGraphqlEndpoint) {
                // 	observer.error({
                // 		errors: [
                // 			{
                // 				...new GraphQLError(
                // 					`Subscribe only available for AWS AppSync endpoint`,
                // 				),
                // 			},
                // 		],
                // 	});
                // 	observer.complete();
                return;
            }
            let subscriptionStartInProgress = false;
            const subscriptionId = (0,_aws_amplify_core_internals_utils__WEBPACK_IMPORTED_MODULE_8__.amplifyUuid)();
            const startSubscription = () => {
                if (!subscriptionStartInProgress) {
                    subscriptionStartInProgress = true;
                    this._startSubscriptionWithAWSAppSyncRealTime({
                        options,
                        observer,
                        subscriptionId,
                        customUserAgentDetails,
                    })
                        .catch(err => {
                        this.logger.debug(`${_types_PubSub_mjs__WEBPACK_IMPORTED_MODULE_9__.CONTROL_MSG.REALTIME_SUBSCRIPTION_INIT_ERROR}: ${err}`);
                        this.connectionStateMonitor.record(_utils_ConnectionStateMonitor_mjs__WEBPACK_IMPORTED_MODULE_4__.CONNECTION_CHANGE.CLOSED);
                    })
                        .finally(() => {
                        subscriptionStartInProgress = false;
                    });
                }
            };
            // Add an observable to the reconnection list to manage reconnection for this subscription
            const reconnectSubscription = new rxjs__WEBPACK_IMPORTED_MODULE_7__.Observable(reconnectSubscriptionObserver => {
                this.reconnectionMonitor.addObserver(reconnectSubscriptionObserver);
            }).subscribe(() => {
                startSubscription();
            });
            startSubscription();
            return async () => {
                await this._cleanupSubscription(subscriptionId, reconnectSubscription);
            };
        });
    }
    async connect(options) {
        if (this.socketStatus === _constants_mjs__WEBPACK_IMPORTED_MODULE_3__.SOCKET_STATUS.READY) {
            return;
        }
        await this._connectWebSocket(options);
    }
    async publish(options, customUserAgentDetails) {
        if (this.socketStatus !== _constants_mjs__WEBPACK_IMPORTED_MODULE_3__.SOCKET_STATUS.READY) {
            throw new Error('Subscription has not been initialized');
        }
        return this._publishMessage(options, customUserAgentDetails);
    }
    async _connectWebSocket(options) {
        const { apiKey, appSyncGraphqlEndpoint, authenticationType, region } = options;
        const { additionalCustomHeaders } = await (0,_appsyncUrl_mjs__WEBPACK_IMPORTED_MODULE_10__.additionalHeadersFromOptions)(options);
        this.connectionStateMonitor.record(_utils_ConnectionStateMonitor_mjs__WEBPACK_IMPORTED_MODULE_4__.CONNECTION_CHANGE.OPENING_CONNECTION);
        await this._initializeWebSocketConnection({
            apiKey,
            appSyncGraphqlEndpoint,
            authenticationType,
            region,
            additionalCustomHeaders,
        });
    }
    async _publishMessage(options, customUserAgentDetails) {
        const subscriptionId = (0,_aws_amplify_core_internals_utils__WEBPACK_IMPORTED_MODULE_8__.amplifyUuid)();
        const { additionalCustomHeaders, libraryConfigHeaders } = await (0,_appsyncUrl_mjs__WEBPACK_IMPORTED_MODULE_10__.additionalHeadersFromOptions)(options);
        const serializedSubscriptionMessage = await this._prepareSubscriptionPayload({
            options,
            subscriptionId,
            customUserAgentDetails,
            additionalCustomHeaders,
            libraryConfigHeaders,
            publish: true,
        });
        return new Promise((resolve, reject) => {
            if (this.awsRealTimeSocket) {
                const publishListener = (event) => {
                    const data = JSON.parse(event.data);
                    if (data.id === subscriptionId && data.type === 'publish_success') {
                        this.awsRealTimeSocket &&
                            this.awsRealTimeSocket.removeEventListener('message', publishListener);
                        resolve();
                    }
                    if (data.erroredEvents && data.erroredEvents.length > 0) ;
                };
                this.awsRealTimeSocket.addEventListener('message', publishListener);
                this.awsRealTimeSocket.addEventListener('close', () => {
                    reject(new Error('WebSocket is closed'));
                });
                //
                // this.awsRealTimeSocket.addEventListener('error', publishListener);
                this.awsRealTimeSocket.send(serializedSubscriptionMessage);
            }
        });
    }
    async _cleanupSubscription(subscriptionId, reconnectSubscription) {
        // Cleanup reconnection subscription
        reconnectSubscription?.unsubscribe();
        // Cleanup after unsubscribing or observer.complete was called after _startSubscriptionWithAWSAppSyncRealTime
        try {
            // Waiting that subscription has been connected before trying to unsubscribe
            await this._waitForSubscriptionToBeConnected(subscriptionId);
            const { subscriptionState } = this.subscriptionObserverMap.get(subscriptionId) || {};
            if (!subscriptionState) {
                // subscription already unsubscribed
                return;
            }
            if (subscriptionState === _constants_mjs__WEBPACK_IMPORTED_MODULE_3__.SUBSCRIPTION_STATUS.CONNECTED) {
                this._sendUnsubscriptionMessage(subscriptionId);
            }
            else {
                throw new Error('Subscription never connected');
            }
        }
        catch (err) {
            this.logger.debug(`Error while unsubscribing ${err}`);
        }
        finally {
            this._removeSubscriptionObserver(subscriptionId);
        }
    }
    // Monitor the connection state and pass changes along to Hub
    _startConnectionStateMonitoring() {
        return this.connectionStateMonitor.connectionStateObservable.subscribe(connectionState => {
            dispatchApiEvent({
                event: _constants_mjs__WEBPACK_IMPORTED_MODULE_3__.CONNECTION_STATE_CHANGE,
                data: {
                    provider: this,
                    connectionState,
                },
                message: `Connection state is ${connectionState}`,
            });
            this.connectionState = connectionState;
            // Trigger START_RECONNECT when the connection is disrupted
            if (connectionState === _types_PubSub_mjs__WEBPACK_IMPORTED_MODULE_9__.ConnectionState.ConnectionDisrupted) {
                this.reconnectionMonitor.record(_utils_ReconnectionMonitor_mjs__WEBPACK_IMPORTED_MODULE_5__.ReconnectEvent.START_RECONNECT);
            }
            // Trigger HALT_RECONNECT to halt reconnection attempts when the state is anything other than
            // ConnectionDisrupted or Connecting
            if ([
                _types_PubSub_mjs__WEBPACK_IMPORTED_MODULE_9__.ConnectionState.Connected,
                _types_PubSub_mjs__WEBPACK_IMPORTED_MODULE_9__.ConnectionState.ConnectedPendingDisconnect,
                _types_PubSub_mjs__WEBPACK_IMPORTED_MODULE_9__.ConnectionState.ConnectedPendingKeepAlive,
                _types_PubSub_mjs__WEBPACK_IMPORTED_MODULE_9__.ConnectionState.ConnectedPendingNetwork,
                _types_PubSub_mjs__WEBPACK_IMPORTED_MODULE_9__.ConnectionState.ConnectionDisruptedPendingNetwork,
                _types_PubSub_mjs__WEBPACK_IMPORTED_MODULE_9__.ConnectionState.Disconnected,
            ].includes(connectionState)) {
                this.reconnectionMonitor.record(_utils_ReconnectionMonitor_mjs__WEBPACK_IMPORTED_MODULE_5__.ReconnectEvent.HALT_RECONNECT);
            }
        });
    }
    async _startSubscriptionWithAWSAppSyncRealTime({ options, observer, subscriptionId, customUserAgentDetails, }) {
        const { query, variables } = options;
        const { additionalCustomHeaders, libraryConfigHeaders } = await (0,_appsyncUrl_mjs__WEBPACK_IMPORTED_MODULE_10__.additionalHeadersFromOptions)(options);
        this.subscriptionObserverMap.set(subscriptionId, {
            observer,
            query: query ?? '',
            variables: variables ?? {},
            subscriptionState: _constants_mjs__WEBPACK_IMPORTED_MODULE_3__.SUBSCRIPTION_STATUS.PENDING,
            startAckTimeoutId: undefined,
        });
        const serializedSubscriptionMessage = await this._prepareSubscriptionPayload({
            options,
            subscriptionId,
            customUserAgentDetails,
            additionalCustomHeaders,
            libraryConfigHeaders,
        });
        try {
            await this._connectWebSocket(options);
        }
        catch (err) {
            this._logStartSubscriptionError(subscriptionId, observer, err);
            return;
        }
        // Potential race condition can occur when unsubscribe is called during _initializeWebSocketConnection.
        // E.g.unsubscribe gets invoked prior to finishing WebSocket handshake or START_ACK.
        // Both subscriptionFailedCallback and subscriptionReadyCallback are used to synchronized this.
        const { subscriptionFailedCallback, subscriptionReadyCallback } = this.subscriptionObserverMap.get(subscriptionId) ?? {};
        // This must be done before sending the message in order to be listening immediately
        this.subscriptionObserverMap.set(subscriptionId, {
            observer,
            subscriptionState: _constants_mjs__WEBPACK_IMPORTED_MODULE_3__.SUBSCRIPTION_STATUS.PENDING,
            query: query ?? '',
            variables: variables ?? {},
            subscriptionReadyCallback,
            subscriptionFailedCallback,
            startAckTimeoutId: setTimeout(() => {
                this._timeoutStartSubscriptionAck(subscriptionId);
            }, _constants_mjs__WEBPACK_IMPORTED_MODULE_3__.START_ACK_TIMEOUT),
        });
        if (this.awsRealTimeSocket) {
            this.awsRealTimeSocket.send(serializedSubscriptionMessage);
        }
    }
    // Log logic for start subscription failures
    _logStartSubscriptionError(subscriptionId, observer, err) {
        this.logger.debug({ err });
        const message = String(err.message ?? '');
        // Resolving to give the state observer time to propogate the update
        this.connectionStateMonitor.record(_utils_ConnectionStateMonitor_mjs__WEBPACK_IMPORTED_MODULE_4__.CONNECTION_CHANGE.CLOSED);
        // Capture the error only when the network didn't cause disruption
        if (this.connectionState !== _types_PubSub_mjs__WEBPACK_IMPORTED_MODULE_9__.ConnectionState.ConnectionDisruptedPendingNetwork) {
            // When the error is non-retriable, error out the observable
            if ((0,_aws_amplify_core_internals_utils__WEBPACK_IMPORTED_MODULE_11__.isNonRetryableError)(err)) {
                observer.error({
                    errors: [
                        {
                            ...new graphql__WEBPACK_IMPORTED_MODULE_0__.GraphQLError(`${_types_PubSub_mjs__WEBPACK_IMPORTED_MODULE_9__.CONTROL_MSG.CONNECTION_FAILED}: ${message}`),
                        },
                    ],
                });
            }
            else {
                this.logger.debug(`${_types_PubSub_mjs__WEBPACK_IMPORTED_MODULE_9__.CONTROL_MSG.CONNECTION_FAILED}: ${message}`);
            }
            const { subscriptionFailedCallback } = this.subscriptionObserverMap.get(subscriptionId) || {};
            // Notify concurrent unsubscription
            if (typeof subscriptionFailedCallback === 'function') {
                subscriptionFailedCallback();
            }
        }
    }
    // Waiting that subscription has been connected before trying to unsubscribe
    async _waitForSubscriptionToBeConnected(subscriptionId) {
        const subscriptionObserver = this.subscriptionObserverMap.get(subscriptionId);
        if (subscriptionObserver) {
            const { subscriptionState } = subscriptionObserver;
            // This in case unsubscribe is invoked before sending start subscription message
            if (subscriptionState === _constants_mjs__WEBPACK_IMPORTED_MODULE_3__.SUBSCRIPTION_STATUS.PENDING) {
                return new Promise((resolve, reject) => {
                    const { observer, subscriptionState: observedSubscriptionState, variables, query, } = subscriptionObserver;
                    this.subscriptionObserverMap.set(subscriptionId, {
                        observer,
                        subscriptionState: observedSubscriptionState,
                        variables,
                        query,
                        subscriptionReadyCallback: resolve,
                        subscriptionFailedCallback: reject,
                    });
                });
            }
        }
    }
    _sendUnsubscriptionMessage(subscriptionId) {
        try {
            if (this.awsRealTimeSocket &&
                this.awsRealTimeSocket.readyState === WebSocket.OPEN &&
                this.socketStatus === _constants_mjs__WEBPACK_IMPORTED_MODULE_3__.SOCKET_STATUS.READY) {
                // Preparing unsubscribe message to stop receiving messages for that subscription
                const unsubscribeMessage = this._unsubscribeMessage(subscriptionId);
                const stringToAWSRealTime = JSON.stringify(unsubscribeMessage);
                this.awsRealTimeSocket.send(stringToAWSRealTime);
            }
        }
        catch (err) {
            // If GQL_STOP is not sent because of disconnection issue, then there is nothing the client can do
            this.logger.debug({ err });
        }
    }
    _removeSubscriptionObserver(subscriptionId) {
        this.subscriptionObserverMap.delete(subscriptionId);
        // Verifying 1000ms after removing subscription in case there are new subscription unmount/mount
        setTimeout(this._closeSocketIfRequired.bind(this), 1000);
    }
    _closeSocketIfRequired() {
        if (this.subscriptionObserverMap.size > 0) {
            // Active subscriptions on the WebSocket
            return;
        }
        if (!this.awsRealTimeSocket) {
            this.socketStatus = _constants_mjs__WEBPACK_IMPORTED_MODULE_3__.SOCKET_STATUS.CLOSED;
            return;
        }
        this.connectionStateMonitor.record(_utils_ConnectionStateMonitor_mjs__WEBPACK_IMPORTED_MODULE_4__.CONNECTION_CHANGE.CLOSING_CONNECTION);
        if (this.awsRealTimeSocket.bufferedAmount > 0) {
            // Still data on the WebSocket
            setTimeout(this._closeSocketIfRequired.bind(this), 1000);
        }
        else {
            this.logger.debug('closing WebSocket...');
            if (this.keepAliveTimeoutId) {
                clearTimeout(this.keepAliveTimeoutId);
            }
            if (this.keepAliveAlertTimeoutId) {
                clearTimeout(this.keepAliveAlertTimeoutId);
            }
            const tempSocket = this.awsRealTimeSocket;
            // Cleaning callbacks to avoid race condition, socket still exists
            tempSocket.onclose = null;
            tempSocket.onerror = null;
            tempSocket.close(1000);
            this.awsRealTimeSocket = undefined;
            this.socketStatus = _constants_mjs__WEBPACK_IMPORTED_MODULE_3__.SOCKET_STATUS.CLOSED;
            this.connectionStateMonitor.record(_utils_ConnectionStateMonitor_mjs__WEBPACK_IMPORTED_MODULE_4__.CONNECTION_CHANGE.CLOSED);
        }
    }
    _handleIncomingSubscriptionMessage(message) {
        if (typeof message.data !== 'string') {
            return;
        }
        const [isData, data] = this._handleSubscriptionData(message);
        if (isData)
            return;
        const { type, id, payload } = data;
        const { observer = null, query = '', variables = {}, startAckTimeoutId, subscriptionReadyCallback, subscriptionFailedCallback, } = this.subscriptionObserverMap.get(id) || {};
        if (type === _constants_mjs__WEBPACK_IMPORTED_MODULE_3__.MESSAGE_TYPES.GQL_START_ACK ||
            type === _constants_mjs__WEBPACK_IMPORTED_MODULE_3__.MESSAGE_TYPES.EVENT_SUBSCRIBE_ACK) {
            this.logger.debug(`subscription ready for ${JSON.stringify({ query, variables })}`);
            if (typeof subscriptionReadyCallback === 'function') {
                subscriptionReadyCallback();
            }
            if (startAckTimeoutId)
                clearTimeout(startAckTimeoutId);
            dispatchApiEvent({
                event: _types_PubSub_mjs__WEBPACK_IMPORTED_MODULE_9__.CONTROL_MSG.SUBSCRIPTION_ACK,
                data: { query, variables },
                message: 'Connection established for subscription',
            });
            const subscriptionState = _constants_mjs__WEBPACK_IMPORTED_MODULE_3__.SUBSCRIPTION_STATUS.CONNECTED;
            if (observer) {
                this.subscriptionObserverMap.set(id, {
                    observer,
                    query,
                    variables,
                    startAckTimeoutId: undefined,
                    subscriptionState,
                    subscriptionReadyCallback,
                    subscriptionFailedCallback,
                });
            }
            this.connectionStateMonitor.record(_utils_ConnectionStateMonitor_mjs__WEBPACK_IMPORTED_MODULE_4__.CONNECTION_CHANGE.CONNECTION_ESTABLISHED);
            return;
        }
        if (type === _constants_mjs__WEBPACK_IMPORTED_MODULE_3__.MESSAGE_TYPES.GQL_CONNECTION_KEEP_ALIVE) {
            if (this.keepAliveTimeoutId)
                clearTimeout(this.keepAliveTimeoutId);
            if (this.keepAliveAlertTimeoutId)
                clearTimeout(this.keepAliveAlertTimeoutId);
            this.keepAliveTimeoutId = setTimeout(() => {
                this._errorDisconnect(_types_PubSub_mjs__WEBPACK_IMPORTED_MODULE_9__.CONTROL_MSG.TIMEOUT_DISCONNECT);
            }, this.keepAliveTimeout);
            this.keepAliveAlertTimeoutId = setTimeout(() => {
                this.connectionStateMonitor.record(_utils_ConnectionStateMonitor_mjs__WEBPACK_IMPORTED_MODULE_4__.CONNECTION_CHANGE.KEEP_ALIVE_MISSED);
            }, _constants_mjs__WEBPACK_IMPORTED_MODULE_3__.DEFAULT_KEEP_ALIVE_ALERT_TIMEOUT);
            this.connectionStateMonitor.record(_utils_ConnectionStateMonitor_mjs__WEBPACK_IMPORTED_MODULE_4__.CONNECTION_CHANGE.KEEP_ALIVE);
            return;
        }
        if (type === _constants_mjs__WEBPACK_IMPORTED_MODULE_3__.MESSAGE_TYPES.GQL_ERROR) {
            const subscriptionState = _constants_mjs__WEBPACK_IMPORTED_MODULE_3__.SUBSCRIPTION_STATUS.FAILED;
            if (observer) {
                this.subscriptionObserverMap.set(id, {
                    observer,
                    query,
                    variables,
                    startAckTimeoutId,
                    subscriptionReadyCallback,
                    subscriptionFailedCallback,
                    subscriptionState,
                });
                this.logger.debug(`${_types_PubSub_mjs__WEBPACK_IMPORTED_MODULE_9__.CONTROL_MSG.CONNECTION_FAILED}: ${JSON.stringify(payload ?? data)}`);
                observer.error({
                    errors: [
                        {
                            ...new graphql__WEBPACK_IMPORTED_MODULE_0__.GraphQLError(`${_types_PubSub_mjs__WEBPACK_IMPORTED_MODULE_9__.CONTROL_MSG.CONNECTION_FAILED}: ${JSON.stringify(payload ?? data)}`),
                        },
                    ],
                });
                if (startAckTimeoutId)
                    clearTimeout(startAckTimeoutId);
                if (typeof subscriptionFailedCallback === 'function') {
                    subscriptionFailedCallback();
                }
            }
        }
    }
    _errorDisconnect(msg) {
        this.logger.debug(`Disconnect error: ${msg}`);
        if (this.awsRealTimeSocket) {
            this.connectionStateMonitor.record(_utils_ConnectionStateMonitor_mjs__WEBPACK_IMPORTED_MODULE_4__.CONNECTION_CHANGE.CLOSED);
            this.awsRealTimeSocket.close();
        }
        this.socketStatus = _constants_mjs__WEBPACK_IMPORTED_MODULE_3__.SOCKET_STATUS.CLOSED;
    }
    _timeoutStartSubscriptionAck(subscriptionId) {
        const subscriptionObserver = this.subscriptionObserverMap.get(subscriptionId);
        if (subscriptionObserver) {
            const { observer, query, variables } = subscriptionObserver;
            if (!observer) {
                return;
            }
            this.subscriptionObserverMap.set(subscriptionId, {
                observer,
                query,
                variables,
                subscriptionState: _constants_mjs__WEBPACK_IMPORTED_MODULE_3__.SUBSCRIPTION_STATUS.FAILED,
            });
            this.connectionStateMonitor.record(_utils_ConnectionStateMonitor_mjs__WEBPACK_IMPORTED_MODULE_4__.CONNECTION_CHANGE.CLOSED);
            this.logger.debug('timeoutStartSubscription', JSON.stringify({ query, variables }));
        }
    }
    _initializeWebSocketConnection({ appSyncGraphqlEndpoint, authenticationType, apiKey, region, additionalCustomHeaders, }) {
        if (this.socketStatus === _constants_mjs__WEBPACK_IMPORTED_MODULE_3__.SOCKET_STATUS.READY) {
            return;
        }
        // TODO(Eslint): refactor to now use async function as the promise executor
        // eslint-disable-next-line no-async-promise-executor
        return new Promise(async (resolve, reject) => {
            this.promiseArray.push({ res: resolve, rej: reject });
            if (this.socketStatus === _constants_mjs__WEBPACK_IMPORTED_MODULE_3__.SOCKET_STATUS.CLOSED) {
                try {
                    this.socketStatus = _constants_mjs__WEBPACK_IMPORTED_MODULE_3__.SOCKET_STATUS.CONNECTING;
                    // Empty payload on connect
                    const payloadString = '{}';
                    const authHeader = await (0,_authHeaders_mjs__WEBPACK_IMPORTED_MODULE_12__.awsRealTimeHeaderBasedAuth)({
                        authenticationType,
                        payload: payloadString,
                        canonicalUri: this.wsConnectUri,
                        apiKey,
                        appSyncGraphqlEndpoint,
                        region,
                        additionalCustomHeaders,
                    });
                    const headerString = authHeader ? JSON.stringify(authHeader) : '';
                    // base64url-encoded string
                    const encodedHeader = _aws_amplify_core_internals_utils__WEBPACK_IMPORTED_MODULE_13__.base64Encoder.convert(headerString, {
                        urlSafe: true,
                        skipPadding: true,
                    });
                    const authTokenSubprotocol = `header-${encodedHeader}`;
                    const queryParams = (0,_appsyncUrl_mjs__WEBPACK_IMPORTED_MODULE_10__.queryParamsFromCustomHeaders)(additionalCustomHeaders);
                    const awsRealTimeUrl = (0,_appsyncUrl_mjs__WEBPACK_IMPORTED_MODULE_10__.realtimeUrlWithQueryString)(appSyncGraphqlEndpoint, queryParams);
                    await this._establishRetryableConnection(awsRealTimeUrl, authTokenSubprotocol);
                    this.promiseArray.forEach(({ res }) => {
                        this.logger.debug('Notifying connection successful');
                        res();
                    });
                    this.socketStatus = _constants_mjs__WEBPACK_IMPORTED_MODULE_3__.SOCKET_STATUS.READY;
                    this.promiseArray = [];
                }
                catch (err) {
                    this.logger.debug('Connection exited with', err);
                    this.promiseArray.forEach(({ rej }) => {
                        rej(err);
                    });
                    this.promiseArray = [];
                    if (this.awsRealTimeSocket &&
                        this.awsRealTimeSocket.readyState === WebSocket.OPEN) {
                        this.awsRealTimeSocket.close(3001);
                    }
                    this.awsRealTimeSocket = undefined;
                    this.socketStatus = _constants_mjs__WEBPACK_IMPORTED_MODULE_3__.SOCKET_STATUS.CLOSED;
                }
            }
        });
    }
    async _establishRetryableConnection(awsRealTimeUrl, subprotocol) {
        this.logger.debug(`Establishing retryable connection`);
        await (0,_aws_amplify_core_internals_utils__WEBPACK_IMPORTED_MODULE_14__.jitteredExponentialRetry)(this._establishConnection.bind(this), [awsRealTimeUrl, subprotocol], _constants_mjs__WEBPACK_IMPORTED_MODULE_3__.MAX_DELAY_MS);
    }
    async _openConnection(awsRealTimeUrl, subprotocol) {
        return new Promise((resolve, reject) => {
            const newSocket = this._getNewWebSocket(awsRealTimeUrl, [
                this.wsProtocolName,
                subprotocol,
            ]);
            newSocket.onerror = () => {
                this.logger.debug(`WebSocket connection error`);
            };
            newSocket.onclose = () => {
                reject(new Error('Connection handshake error'));
            };
            newSocket.onopen = () => {
                this.awsRealTimeSocket = newSocket;
                resolve();
            };
        });
    }
    _getNewWebSocket(url, protocol) {
        return new WebSocket(url, protocol);
    }
    async _initiateHandshake() {
        return new Promise((resolve, reject) => {
            if (!this.awsRealTimeSocket) {
                reject(new Error('awsRealTimeSocket undefined'));
                return;
            }
            let ackOk = false;
            this.awsRealTimeSocket.onerror = error => {
                this.logger.debug(`WebSocket error ${JSON.stringify(error)}`);
            };
            this.awsRealTimeSocket.onclose = event => {
                this.logger.debug(`WebSocket closed ${event.reason}`);
                reject(new Error(JSON.stringify(event)));
            };
            this.awsRealTimeSocket.onmessage = (message) => {
                if (typeof message.data !== 'string') {
                    return;
                }
                this.logger.debug(`subscription message from AWS AppSyncRealTime: ${message.data} `);
                const data = JSON.parse(message.data);
                const { type } = data;
                const connectionTimeoutMs = this._extractConnectionTimeout(data);
                if (type === _constants_mjs__WEBPACK_IMPORTED_MODULE_3__.MESSAGE_TYPES.GQL_CONNECTION_ACK) {
                    ackOk = true;
                    this._registerWebsocketHandlers(connectionTimeoutMs);
                    resolve('Connected to AWS AppSyncRealTime');
                    return;
                }
                if (type === _constants_mjs__WEBPACK_IMPORTED_MODULE_3__.MESSAGE_TYPES.GQL_CONNECTION_ERROR) {
                    const { errorType, errorCode } = this._extractErrorCodeAndType(data);
                    // TODO(Eslint): refactor to reject an Error object instead of a plain object
                    // eslint-disable-next-line prefer-promise-reject-errors
                    reject({ errorType, errorCode });
                }
            };
            const gqlInit = {
                type: _constants_mjs__WEBPACK_IMPORTED_MODULE_3__.MESSAGE_TYPES.GQL_CONNECTION_INIT,
            };
            this.awsRealTimeSocket.send(JSON.stringify(gqlInit));
            const checkAckOk = (targetAckOk) => {
                if (!targetAckOk) {
                    this.connectionStateMonitor.record(_utils_ConnectionStateMonitor_mjs__WEBPACK_IMPORTED_MODULE_4__.CONNECTION_CHANGE.CONNECTION_FAILED);
                    reject(new Error(`Connection timeout: ack from AWSAppSyncRealTime was not received after ${_constants_mjs__WEBPACK_IMPORTED_MODULE_3__.CONNECTION_INIT_TIMEOUT} ms`));
                }
            };
            setTimeout(() => {
                checkAckOk(ackOk);
            }, _constants_mjs__WEBPACK_IMPORTED_MODULE_3__.CONNECTION_INIT_TIMEOUT);
        });
    }
    _registerWebsocketHandlers(connectionTimeoutMs) {
        if (!this.awsRealTimeSocket) {
            return;
        }
        this.keepAliveTimeout = connectionTimeoutMs;
        this.awsRealTimeSocket.onmessage =
            this._handleIncomingSubscriptionMessage.bind(this);
        this.awsRealTimeSocket.onerror = err => {
            this.logger.debug(err);
            this._errorDisconnect(_types_PubSub_mjs__WEBPACK_IMPORTED_MODULE_9__.CONTROL_MSG.CONNECTION_CLOSED);
        };
        this.awsRealTimeSocket.onclose = event => {
            this.logger.debug(`WebSocket closed ${event.reason}`);
            this._errorDisconnect(_types_PubSub_mjs__WEBPACK_IMPORTED_MODULE_9__.CONTROL_MSG.CONNECTION_CLOSED);
        };
    }
}


//# sourceMappingURL=index.mjs.map


/***/ }),

/***/ "./dist/esm/Providers/constants.mjs":
/*!******************************************!*\
  !*** ./dist/esm/Providers/constants.mjs ***!
  \******************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AMPLIFY_SYMBOL: () => (/* reexport safe */ _aws_amplify_core_internals_utils__WEBPACK_IMPORTED_MODULE_0__.AMPLIFY_SYMBOL),
/* harmony export */   AWS_APPSYNC_REALTIME_HEADERS: () => (/* binding */ AWS_APPSYNC_REALTIME_HEADERS),
/* harmony export */   CONNECTION_INIT_TIMEOUT: () => (/* binding */ CONNECTION_INIT_TIMEOUT),
/* harmony export */   CONNECTION_STATE_CHANGE: () => (/* binding */ CONNECTION_STATE_CHANGE),
/* harmony export */   DEFAULT_KEEP_ALIVE_ALERT_TIMEOUT: () => (/* binding */ DEFAULT_KEEP_ALIVE_ALERT_TIMEOUT),
/* harmony export */   DEFAULT_KEEP_ALIVE_TIMEOUT: () => (/* binding */ DEFAULT_KEEP_ALIVE_TIMEOUT),
/* harmony export */   MAX_DELAY_MS: () => (/* binding */ MAX_DELAY_MS),
/* harmony export */   MESSAGE_TYPES: () => (/* binding */ MESSAGE_TYPES),
/* harmony export */   NON_RETRYABLE_CODES: () => (/* binding */ NON_RETRYABLE_CODES),
/* harmony export */   NON_RETRYABLE_ERROR_TYPES: () => (/* binding */ NON_RETRYABLE_ERROR_TYPES),
/* harmony export */   RECONNECT_DELAY: () => (/* binding */ RECONNECT_DELAY),
/* harmony export */   RECONNECT_INTERVAL: () => (/* binding */ RECONNECT_INTERVAL),
/* harmony export */   SOCKET_STATUS: () => (/* binding */ SOCKET_STATUS),
/* harmony export */   START_ACK_TIMEOUT: () => (/* binding */ START_ACK_TIMEOUT),
/* harmony export */   SUBSCRIPTION_STATUS: () => (/* binding */ SUBSCRIPTION_STATUS)
/* harmony export */ });
/* harmony import */ var _aws_amplify_core_internals_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @aws-amplify/core/internals/utils */ "../core/dist/esm/Hub/index.mjs");


// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
const MAX_DELAY_MS = 5000;
const NON_RETRYABLE_CODES = [400, 401, 403];
const NON_RETRYABLE_ERROR_TYPES = [
    'BadRequestException',
    'UnauthorizedException',
];
const CONNECTION_STATE_CHANGE = 'ConnectionStateChange';
var MESSAGE_TYPES;
(function (MESSAGE_TYPES) {
    /**
     * Client -> Server message.
     * This message type is the first message after handshake and this will initialize AWS AppSync RealTime communication
     */
    MESSAGE_TYPES["GQL_CONNECTION_INIT"] = "connection_init";
    /**
     * Server -> Client message
     * This message type is in case there is an issue with AWS AppSync RealTime when establishing connection
     */
    MESSAGE_TYPES["GQL_CONNECTION_ERROR"] = "connection_error";
    /**
     * Server -> Client message.
     * This message type is for the ack response from AWS AppSync RealTime for GQL_CONNECTION_INIT message
     */
    MESSAGE_TYPES["GQL_CONNECTION_ACK"] = "connection_ack";
    /**
     * Client -> Server message.
     * This message type is for register subscriptions with AWS AppSync RealTime
     */
    MESSAGE_TYPES["GQL_START"] = "start";
    /**
     * Server -> Client message.
     * This message type is for the ack response from AWS AppSync RealTime for GQL_START message
     */
    MESSAGE_TYPES["GQL_START_ACK"] = "start_ack";
    /**
     * Server -> Client message.
     * This message type is for subscription message from AWS AppSync RealTime or Events
     */
    MESSAGE_TYPES["DATA"] = "data";
    /**
     * Server -> Client message.
     * This message type helps the client to know is still receiving messages from AWS AppSync RealTime
     */
    MESSAGE_TYPES["GQL_CONNECTION_KEEP_ALIVE"] = "ka";
    /**
     * Client -> Server message.
     * This message type is for unregister subscriptions with AWS AppSync RealTime
     */
    MESSAGE_TYPES["GQL_STOP"] = "stop";
    /**
     * Server -> Client message.
     * This message type is for the ack response from AWS AppSync RealTime for GQL_STOP message
     */
    MESSAGE_TYPES["GQL_COMPLETE"] = "complete";
    /**
     * Server -> Client message.
     * This message type is for sending error messages from AWS AppSync RealTime to the client
     */
    MESSAGE_TYPES["GQL_ERROR"] = "error";
    /**
     * Client -> Server message.
     * This message type is for registering subscriptions with Events
     */
    MESSAGE_TYPES["EVENT_SUBSCRIBE"] = "subscribe";
    /**
     * Client -> Server message.
     * This message type is for publishing a message with Events
     */
    MESSAGE_TYPES["EVENT_PUBLISH"] = "publish";
    /**
     * Server -> Client message.
     * Server acknowledges successful subscription
     */
    MESSAGE_TYPES["EVENT_SUBSCRIBE_ACK"] = "subscribe_success";
    /**
     * Server -> Client message.
     * Server acknowledges successful publish
     */
    MESSAGE_TYPES["EVENT_PUBLISH_ACK"] = "publish_success";
    /**
     * Client -> Server message.
     * This message type is for unregister subscriptions with AWS AppSync RealTime
     */
    MESSAGE_TYPES["EVENT_STOP"] = "unsubscribe";
    /**
     * Server -> Client message.
     * This is the ack response from AWS AppSync Events to EVENT_STOP message
     */
    MESSAGE_TYPES["EVENT_COMPLETE"] = "unsubscribe_success";
})(MESSAGE_TYPES || (MESSAGE_TYPES = {}));
var SUBSCRIPTION_STATUS;
(function (SUBSCRIPTION_STATUS) {
    SUBSCRIPTION_STATUS[SUBSCRIPTION_STATUS["PENDING"] = 0] = "PENDING";
    SUBSCRIPTION_STATUS[SUBSCRIPTION_STATUS["CONNECTED"] = 1] = "CONNECTED";
    SUBSCRIPTION_STATUS[SUBSCRIPTION_STATUS["FAILED"] = 2] = "FAILED";
})(SUBSCRIPTION_STATUS || (SUBSCRIPTION_STATUS = {}));
var SOCKET_STATUS;
(function (SOCKET_STATUS) {
    SOCKET_STATUS[SOCKET_STATUS["CLOSED"] = 0] = "CLOSED";
    SOCKET_STATUS[SOCKET_STATUS["READY"] = 1] = "READY";
    SOCKET_STATUS[SOCKET_STATUS["CONNECTING"] = 2] = "CONNECTING";
})(SOCKET_STATUS || (SOCKET_STATUS = {}));
const AWS_APPSYNC_REALTIME_HEADERS = {
    accept: 'application/json, text/javascript',
    'content-encoding': 'amz-1.0',
    'content-type': 'application/json; charset=UTF-8',
};
/**
 * Time in milleseconds to wait for GQL_CONNECTION_INIT message
 */
const CONNECTION_INIT_TIMEOUT = 15000;
/**
 * Time in milleseconds to wait for GQL_START_ACK message
 */
const START_ACK_TIMEOUT = 15000;
/**
 * Default Time in milleseconds to wait for GQL_CONNECTION_KEEP_ALIVE message
 */
const DEFAULT_KEEP_ALIVE_TIMEOUT = 5 * 60 * 1000;
/**
 * Default Time in milleseconds to alert for missed GQL_CONNECTION_KEEP_ALIVE message
 */
const DEFAULT_KEEP_ALIVE_ALERT_TIMEOUT = 65 * 1000;
/**
 * Default delay time in milleseconds between when reconnect is triggered vs when it is attempted
 */
const RECONNECT_DELAY = 5 * 1000;
/**
 * Default interval time in milleseconds between when reconnect is re-attempted
 */
const RECONNECT_INTERVAL = 60 * 1000;


//# sourceMappingURL=constants.mjs.map


/***/ }),

/***/ "./dist/esm/internals/InternalGraphQLAPI.mjs":
/*!***************************************************!*\
  !*** ./dist/esm/internals/InternalGraphQLAPI.mjs ***!
  \***************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   InternalGraphQLAPI: () => (/* binding */ InternalGraphQLAPI),
/* harmony export */   InternalGraphQLAPIClass: () => (/* binding */ InternalGraphQLAPIClass)
/* harmony export */ });
/* harmony import */ var graphql__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! graphql */ "graphql");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! rxjs */ "../../node_modules/rxjs/dist/esm5/internal/operators/catchError.js");
/* harmony import */ var _aws_amplify_core_internals_utils__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @aws-amplify/core/internals/utils */ "../core/dist/esm/utils/amplifyUrl/index.mjs");
/* harmony import */ var _aws_amplify_core_internals_utils__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @aws-amplify/core/internals/utils */ "../core/dist/esm/Platform/index.mjs");
/* harmony import */ var _aws_amplify_api_rest__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @aws-amplify/api-rest */ "../api-rest/dist/esm/index.mjs");
/* harmony import */ var _aws_amplify_api_rest_internals__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @aws-amplify/api-rest/internals */ "../api-rest/dist/esm/internals/index.mjs");
/* harmony import */ var _Providers_AWSAppSyncRealTimeProvider_index_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Providers/AWSAppSyncRealTimeProvider/index.mjs */ "./dist/esm/Providers/AWSAppSyncRealTimeProvider/index.mjs");
/* harmony import */ var _utils_resolveConfig_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utils/resolveConfig.mjs */ "./dist/esm/utils/resolveConfig.mjs");
/* harmony import */ var _utils_resolveLibraryOptions_mjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../utils/resolveLibraryOptions.mjs */ "./dist/esm/utils/resolveLibraryOptions.mjs");
/* harmony import */ var _utils_errors_repackageAuthError_mjs__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../utils/errors/repackageAuthError.mjs */ "./dist/esm/utils/errors/repackageAuthError.mjs");
/* harmony import */ var _utils_errors_constants_mjs__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../utils/errors/constants.mjs */ "./dist/esm/utils/errors/constants.mjs");
/* harmony import */ var _utils_errors_GraphQLApiError_mjs__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../utils/errors/GraphQLApiError.mjs */ "./dist/esm/utils/errors/GraphQLApiError.mjs");
/* harmony import */ var _utils_errors_createGraphQLResultWithError_mjs__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../utils/errors/createGraphQLResultWithError.mjs */ "./dist/esm/utils/errors/createGraphQLResultWithError.mjs");
/* harmony import */ var _utils_runtimeTypeGuards_isGraphQLResponseWithErrors_mjs__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./utils/runtimeTypeGuards/isGraphQLResponseWithErrors.mjs */ "./dist/esm/internals/utils/runtimeTypeGuards/isGraphQLResponseWithErrors.mjs");
/* harmony import */ var _graphqlAuth_mjs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./graphqlAuth.mjs */ "./dist/esm/internals/graphqlAuth.mjs");
















// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
const USER_AGENT_HEADER = 'x-amz-user-agent';
const isAmplifyInstance = (amplify) => {
    return typeof amplify !== 'function';
};
/**
 * Export Cloud Logic APIs
 */
class InternalGraphQLAPIClass {
    constructor() {
        /**
         * @private
         */
        this.appSyncRealTime = new _Providers_AWSAppSyncRealTimeProvider_index_mjs__WEBPACK_IMPORTED_MODULE_3__.AWSAppSyncRealTimeProvider();
        this._api = {
            post: _aws_amplify_api_rest_internals__WEBPACK_IMPORTED_MODULE_2__.post,
            cancelREST: _aws_amplify_api_rest_internals__WEBPACK_IMPORTED_MODULE_2__.cancel,
            isCancelErrorREST: _aws_amplify_api_rest__WEBPACK_IMPORTED_MODULE_1__.isCancelError,
            updateRequestToBeCancellable: _aws_amplify_api_rest_internals__WEBPACK_IMPORTED_MODULE_2__.updateRequestToBeCancellable,
        };
    }
    getModuleName() {
        return 'InternalGraphQLAPI';
    }
    /**
     * to get the operation type
     * @param operation
     */
    getGraphqlOperationType(operation) {
        const doc = (0,graphql__WEBPACK_IMPORTED_MODULE_0__.parse)(operation);
        const definitions = doc.definitions;
        const [{ operation: operationType }] = definitions;
        return operationType;
    }
    /**
     * Executes a GraphQL operation
     *
     * @param options - GraphQL Options
     * @param [additionalHeaders] - headers to merge in after any `libraryConfigHeaders` set in the config
     * @returns An Observable if the query is a subscription query, else a promise of the graphql result.
     */
    graphql(amplify, { query: paramQuery, variables = {}, authMode, authToken }, additionalHeaders, customUserAgentDetails) {
        const query = typeof paramQuery === 'string'
            ? (0,graphql__WEBPACK_IMPORTED_MODULE_0__.parse)(paramQuery)
            : (0,graphql__WEBPACK_IMPORTED_MODULE_0__.parse)((0,graphql__WEBPACK_IMPORTED_MODULE_0__.print)(paramQuery));
        const [operationDef = {}] = query.definitions.filter(def => def.kind === 'OperationDefinition');
        const { operation: operationType } = operationDef;
        const headers = additionalHeaders || {};
        switch (operationType) {
            case 'query':
            case 'mutation': {
                const abortController = new AbortController();
                let responsePromise;
                if (isAmplifyInstance(amplify)) {
                    responsePromise = this._graphql(amplify, { query, variables, authMode }, headers, abortController, customUserAgentDetails, authToken);
                }
                else {
                    // NOTE: this wrapper function must be await-able so the Amplify server context manager can
                    // destroy the context only after it completes
                    const wrapper = async (amplifyInstance) => {
                        const result = await this._graphql(amplifyInstance, { query, variables, authMode }, headers, abortController, customUserAgentDetails, authToken);
                        return result;
                    };
                    responsePromise = amplify(wrapper);
                }
                this._api.updateRequestToBeCancellable(responsePromise, abortController);
                return responsePromise;
            }
            case 'subscription':
                return this._graphqlSubscribe(amplify, { query, variables, authMode }, headers, customUserAgentDetails, authToken);
            default:
                throw new Error(`invalid operation type: ${operationType}`);
        }
    }
    async _graphql(amplify, { query, variables, authMode: explicitAuthMode }, additionalHeaders = {}, abortController, customUserAgentDetails, authToken) {
        const { apiKey, region, endpoint: appSyncGraphqlEndpoint, customEndpoint, customEndpointRegion, defaultAuthMode, } = (0,_utils_resolveConfig_mjs__WEBPACK_IMPORTED_MODULE_4__.resolveConfig)(amplify);
        const initialAuthMode = explicitAuthMode || defaultAuthMode || 'iam';
        // identityPool is an alias for iam. TODO: remove 'iam' in v7
        const authMode = initialAuthMode === 'identityPool' ? 'iam' : initialAuthMode;
        /**
         * Retrieve library options from Amplify configuration.
         * `customHeaders` here are from the Amplify configuration options,
         * and are for non-AppSync endpoints only. These are *not* the same as
         * `additionalHeaders`, which are custom headers that are either 1)
         * included when configuring the API client or 2) passed along with
         * individual requests.
         */
        const { headers: customHeaders, withCredentials } = (0,_utils_resolveLibraryOptions_mjs__WEBPACK_IMPORTED_MODULE_5__.resolveLibraryOptions)(amplify);
        /**
         * Client or request-specific custom headers that may or may not be
         * returned by a function:
         */
        let additionalCustomHeaders;
        if (typeof additionalHeaders === 'function') {
            const requestOptions = {
                method: 'POST',
                url: new _aws_amplify_core_internals_utils__WEBPACK_IMPORTED_MODULE_6__.AmplifyUrl(customEndpoint || appSyncGraphqlEndpoint || '').toString(),
                queryString: (0,graphql__WEBPACK_IMPORTED_MODULE_0__.print)(query),
            };
            additionalCustomHeaders = await additionalHeaders(requestOptions);
        }
        else {
            additionalCustomHeaders = additionalHeaders;
        }
        // if an authorization header is set, have the explicit authToken take precedence
        if (authToken) {
            additionalCustomHeaders = {
                ...additionalCustomHeaders,
                Authorization: authToken,
            };
        }
        const authHeaders = await (0,_graphqlAuth_mjs__WEBPACK_IMPORTED_MODULE_7__.headerBasedAuth)(amplify, authMode, apiKey, additionalCustomHeaders);
        const headers = {
            ...(!customEndpoint && authHeaders),
            /**
             * Custom endpoint headers.
             * If there is both a custom endpoint and custom region present, we get the headers.
             * If there is a custom endpoint but no region, we return an empty object.
             * If neither are present, we return an empty object.
             */
            ...((customEndpoint && (customEndpointRegion ? authHeaders : {})) || {}),
            // Custom headers included in Amplify configuration options:
            ...(customHeaders &&
                (await customHeaders({
                    query: (0,graphql__WEBPACK_IMPORTED_MODULE_0__.print)(query),
                    variables,
                }))),
            // Custom headers from individual requests or API client configuration:
            ...additionalCustomHeaders,
            // User agent headers:
            ...(!customEndpoint && {
                [USER_AGENT_HEADER]: (0,_aws_amplify_core_internals_utils__WEBPACK_IMPORTED_MODULE_8__.getAmplifyUserAgent)(customUserAgentDetails),
            }),
        };
        const body = {
            query: (0,graphql__WEBPACK_IMPORTED_MODULE_0__.print)(query),
            variables: variables || null,
        };
        let signingServiceInfo;
        /**
         * We do not send the signing service info to the REST API under the
         * following conditions (i.e. it will not sign the request):
         *   - there is a custom endpoint but no region
         *   - the auth mode is `none`, or `apiKey`
         *   - the auth mode is a type other than the types listed below
         */
        if ((customEndpoint && !customEndpointRegion) ||
            (authMode !== 'oidc' &&
                authMode !== 'userPool' &&
                authMode !== 'iam' &&
                authMode !== 'lambda')) {
            signingServiceInfo = undefined;
        }
        else {
            signingServiceInfo = {
                service: !customEndpointRegion ? 'appsync' : 'execute-api',
                region: !customEndpointRegion ? region : customEndpointRegion,
            };
        }
        const endpoint = customEndpoint || appSyncGraphqlEndpoint;
        if (!endpoint) {
            throw (0,_utils_errors_createGraphQLResultWithError_mjs__WEBPACK_IMPORTED_MODULE_9__.createGraphQLResultWithError)(new _utils_errors_GraphQLApiError_mjs__WEBPACK_IMPORTED_MODULE_10__.GraphQLApiError(_utils_errors_constants_mjs__WEBPACK_IMPORTED_MODULE_11__.NO_ENDPOINT));
        }
        let response;
        try {
            // 	// // See the inline doc of the REST `post()` API for possible errors to be thrown.
            // 	// // As these errors are catastrophic they should be caught and handled by GraphQL
            // 	// // API consumers.
            const { body: responseBody } = await this._api.post(amplify, {
                url: new _aws_amplify_core_internals_utils__WEBPACK_IMPORTED_MODULE_6__.AmplifyUrl(endpoint),
                options: {
                    headers,
                    body,
                    signingServiceInfo,
                    withCredentials,
                },
                abortController,
            });
            response = await responseBody.json();
        }
        catch (error) {
            if (this.isCancelError(error)) {
                throw error;
            }
            response = (0,_utils_errors_createGraphQLResultWithError_mjs__WEBPACK_IMPORTED_MODULE_9__.createGraphQLResultWithError)(error);
        }
        if ((0,_utils_runtimeTypeGuards_isGraphQLResponseWithErrors_mjs__WEBPACK_IMPORTED_MODULE_12__.isGraphQLResponseWithErrors)(response)) {
            throw (0,_utils_errors_repackageAuthError_mjs__WEBPACK_IMPORTED_MODULE_13__.repackageUnauthorizedError)(response);
        }
        return response;
    }
    /**
     * Checks to see if an error thrown is from an api request cancellation
     * @param {any} error - Any error
     * @return {boolean} - A boolean indicating if the error was from an api request cancellation
     */
    isCancelError(error) {
        return this._api.isCancelErrorREST(error);
    }
    /**
     * Cancels an inflight request. Only applicable for graphql queries and mutations
     * @param {any} request - request to cancel
     * @returns - A boolean indicating if the request was cancelled
     */
    cancel(request, message) {
        return this._api.cancelREST(request, message);
    }
    _graphqlSubscribe(amplify, { query, variables, authMode: explicitAuthMode }, additionalHeaders = {}, customUserAgentDetails, authToken) {
        const config = (0,_utils_resolveConfig_mjs__WEBPACK_IMPORTED_MODULE_4__.resolveConfig)(amplify);
        const initialAuthMode = explicitAuthMode || config?.defaultAuthMode || 'iam';
        // identityPool is an alias for iam. TODO: remove 'iam' in v7
        const authMode = initialAuthMode === 'identityPool' ? 'iam' : initialAuthMode;
        /**
         * Retrieve library options from Amplify configuration.
         * `libraryConfigHeaders` are from the Amplify configuration options,
         * and will not be overwritten by other custom headers. These are *not*
         * the same as `additionalHeaders`, which are custom headers that are
         * either 1)included when configuring the API client or 2) passed along
         * with individual requests.
         */
        const { headers: libraryConfigHeaders } = (0,_utils_resolveLibraryOptions_mjs__WEBPACK_IMPORTED_MODULE_5__.resolveLibraryOptions)(amplify);
        return this.appSyncRealTime
            .subscribe({
            query: (0,graphql__WEBPACK_IMPORTED_MODULE_0__.print)(query),
            variables,
            appSyncGraphqlEndpoint: config?.endpoint,
            region: config?.region,
            authenticationType: authMode,
            apiKey: config?.apiKey,
            additionalHeaders,
            authToken,
            libraryConfigHeaders,
        }, customUserAgentDetails)
            .pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_14__.catchError)(e => {
            if (e.errors) {
                throw (0,_utils_errors_repackageAuthError_mjs__WEBPACK_IMPORTED_MODULE_13__.repackageUnauthorizedError)(e);
            }
            throw e;
        }));
    }
}
const InternalGraphQLAPI = new InternalGraphQLAPIClass();


//# sourceMappingURL=InternalGraphQLAPI.mjs.map


/***/ }),

/***/ "./dist/esm/internals/events/appsyncRequest.mjs":
/*!******************************************************!*\
  !*** ./dist/esm/internals/events/appsyncRequest.mjs ***!
  \******************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   appsyncRequest: () => (/* binding */ appsyncRequest)
/* harmony export */ });
/* harmony import */ var _aws_amplify_core_internals_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @aws-amplify/core/internals/utils */ "../core/dist/esm/utils/amplifyUrl/index.mjs");
/* harmony import */ var _aws_amplify_core_internals_utils__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @aws-amplify/core/internals/utils */ "../core/dist/esm/Platform/index.mjs");
/* harmony import */ var _aws_amplify_api_rest_internals__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @aws-amplify/api-rest/internals */ "../api-rest/dist/esm/internals/index.mjs");
/* harmony import */ var _utils_resolveLibraryOptions_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../utils/resolveLibraryOptions.mjs */ "./dist/esm/utils/resolveLibraryOptions.mjs");
/* harmony import */ var _utils_errors_repackageAuthError_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../utils/errors/repackageAuthError.mjs */ "./dist/esm/utils/errors/repackageAuthError.mjs");
/* harmony import */ var _graphqlAuth_mjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../graphqlAuth.mjs */ "./dist/esm/internals/graphqlAuth.mjs");
/* harmony import */ var _utils_runtimeTypeGuards_isGraphQLResponseWithErrors_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/runtimeTypeGuards/isGraphQLResponseWithErrors.mjs */ "./dist/esm/internals/utils/runtimeTypeGuards/isGraphQLResponseWithErrors.mjs");








const USER_AGENT_HEADER = 'x-amz-user-agent';
// This is effectively a copy of InternalGraphQLAPI.ts._graphql(...)
// Our existing unit tests are tightly coupled to the implementation, so i was unable to refactor
// and extend _graphql() without having to change a bunch of tests as well... which in turn reduces confidence
// that this feature will _not affect_ GQL behavior.
async function appsyncRequest(amplify, options, additionalHeaders = {}, abortController, customUserAgentDetails) {
    const { region, appSyncGraphqlEndpoint: endpoint, authenticationType: authMode, query, variables, } = options;
    if (!endpoint) {
        throw new Error('No endpoint');
    }
    const { withCredentials } = (0,_utils_resolveLibraryOptions_mjs__WEBPACK_IMPORTED_MODULE_1__.resolveLibraryOptions)(amplify);
    const headers = await requestHeaders(amplify, options, additionalHeaders, customUserAgentDetails);
    const body = {
        channel: query,
        events: variables,
    };
    const signingServiceInfo = ['apiKey', 'none'].includes(authMode)
        ? undefined
        : {
            service: 'appsync',
            region,
        };
    const { body: responseBody } = await (0,_aws_amplify_api_rest_internals__WEBPACK_IMPORTED_MODULE_0__.post)(amplify, {
        url: new _aws_amplify_core_internals_utils__WEBPACK_IMPORTED_MODULE_2__.AmplifyUrl(endpoint),
        options: {
            headers,
            body,
            signingServiceInfo,
            withCredentials,
        },
        abortController,
    });
    const response = await responseBody.json();
    if ((0,_utils_runtimeTypeGuards_isGraphQLResponseWithErrors_mjs__WEBPACK_IMPORTED_MODULE_3__.isGraphQLResponseWithErrors)(response)) {
        throw (0,_utils_errors_repackageAuthError_mjs__WEBPACK_IMPORTED_MODULE_4__.repackageUnauthorizedError)(response);
    }
    return response;
}
/**
 * Computes all the necessary HTTP headers for the request based on:
 * 1. Operation-level header options
 * 2. Amplify.configure custom headers
 * 3. AuthZ headers for explicit auth mode specified for operation ?? default auth mode in config
 *
 * @returns HTTP request headers key/value
 */
async function requestHeaders(amplify, options, additionalHeaders, customUserAgentDetails) {
    const { apiKey, appSyncGraphqlEndpoint: endpoint, authenticationType: authMode, query, variables, authToken, } = options;
    const { headers: customHeadersFn } = (0,_utils_resolveLibraryOptions_mjs__WEBPACK_IMPORTED_MODULE_1__.resolveLibraryOptions)(amplify);
    let additionalCustomHeaders;
    if (typeof additionalHeaders === 'function') {
        const requestOptions = {
            method: 'POST',
            url: new _aws_amplify_core_internals_utils__WEBPACK_IMPORTED_MODULE_2__.AmplifyUrl(endpoint).toString(),
            queryString: query,
        };
        additionalCustomHeaders = await additionalHeaders(requestOptions);
    }
    else {
        additionalCustomHeaders = additionalHeaders;
    }
    // if an authorization header is set, have the operation-level authToken take precedence
    if (authToken) {
        additionalCustomHeaders = {
            ...additionalCustomHeaders,
            Authorization: authToken,
        };
    }
    const authHeaders = await (0,_graphqlAuth_mjs__WEBPACK_IMPORTED_MODULE_5__.headerBasedAuth)(amplify, authMode, apiKey, additionalCustomHeaders);
    const customHeaders = customHeadersFn &&
        (await customHeadersFn({
            query,
            variables: variables,
        }));
    const headers = {
        ...authHeaders,
        // Custom headers included in Amplify configuration options:
        ...customHeaders,
        // Custom headers from individual requests or API client configuration:
        ...additionalCustomHeaders,
        // User agent headers:
        [USER_AGENT_HEADER]: (0,_aws_amplify_core_internals_utils__WEBPACK_IMPORTED_MODULE_6__.getAmplifyUserAgent)(customUserAgentDetails),
    };
    return headers;
}


//# sourceMappingURL=appsyncRequest.mjs.map


/***/ }),

/***/ "./dist/esm/internals/events/index.mjs":
/*!*********************************************!*\
  !*** ./dist/esm/internals/events/index.mjs ***!
  \*********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   closeAll: () => (/* binding */ closeAll),
/* harmony export */   connect: () => (/* binding */ connect),
/* harmony export */   post: () => (/* binding */ post)
/* harmony export */ });
/* harmony import */ var _aws_amplify_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @aws-amplify/core */ "@aws-amplify/core");
/* harmony import */ var _Providers_AWSAppSyncEventsProvider_index_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../Providers/AWSAppSyncEventsProvider/index.mjs */ "./dist/esm/Providers/AWSAppSyncEventsProvider/index.mjs");
/* harmony import */ var _appsyncRequest_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./appsyncRequest.mjs */ "./dist/esm/internals/events/appsyncRequest.mjs");
/* harmony import */ var _utils_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils.mjs */ "./dist/esm/internals/events/utils.mjs");





// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
/**
 * @experimental API may change in future versions
 *
 * Establish a WebSocket connection to an Events channel
 *
 * @example
 * const channel = await events.connect("default/channel")
 *
 * channel.subscribe({
 *   next: (data) => { console.log(data) },
 *   error: (err) => { console.error(err) },
 * })
 *
 * @example // authMode override
 * const channel = await events.connect("default/channel", { authMode: "userPool" })
 *
 * @param channel - channel path; `<namespace>/<channel>`
 * @param options - request overrides: `authMode`, `authToken`
 *
 */
async function connect(channel, options) {
    const providerOptions = (0,_utils_mjs__WEBPACK_IMPORTED_MODULE_1__.configure)();
    providerOptions.authenticationType = (0,_utils_mjs__WEBPACK_IMPORTED_MODULE_1__.normalizeAuth)(options?.authMode, providerOptions.authenticationType);
    await _Providers_AWSAppSyncEventsProvider_index_mjs__WEBPACK_IMPORTED_MODULE_2__.AppSyncEventProvider.connect(providerOptions);
    let _subscription;
    const sub = (observer, subOptions) => {
        const subscribeOptions = { ...providerOptions, query: channel };
        subscribeOptions.authenticationType = (0,_utils_mjs__WEBPACK_IMPORTED_MODULE_1__.normalizeAuth)(subOptions?.authMode, subscribeOptions.authenticationType);
        _subscription = _Providers_AWSAppSyncEventsProvider_index_mjs__WEBPACK_IMPORTED_MODULE_2__.AppSyncEventProvider
            .subscribe(subscribeOptions)
            .subscribe(observer);
        return _subscription;
    };
    const close = () => {
        _subscription && _subscription.unsubscribe();
    };
    return {
        subscribe: sub,
        close,
        // publish: pub,
    };
}
/**
 * @experimental API may change in future versions
 *
 * Publish events to a channel via HTTP request
 *
 * @example
 * await events.post("default/channel", { some: "event" })
 *
 * @example // event batching
 * await events.post("default/channel", [{ some: "event" }, { some: "event2" }])
 *
 * @example // authMode override
 * await events.post("default/channel", { some: "event" }, { authMode: "userPool" })
 *
 * @param channel - channel path; `<namespace>/<channel>`
 * @param event - JSON-serializable value or an array of values
 * @param options - request overrides: `authMode`, `authToken`
 *
 * @returns void on success
 * @throws on error
 */
async function post(channel, event, options) {
    const providerOptions = (0,_utils_mjs__WEBPACK_IMPORTED_MODULE_1__.configure)();
    providerOptions.authenticationType = (0,_utils_mjs__WEBPACK_IMPORTED_MODULE_1__.normalizeAuth)(options?.authMode, providerOptions.authenticationType);
    // trailing slash required in publish
    const normalizedChannelName = channel[0] === '/' ? channel : `/${channel}`;
    const publishOptions = {
        ...providerOptions,
        query: normalizedChannelName,
        variables: (0,_utils_mjs__WEBPACK_IMPORTED_MODULE_1__.serializeEvents)(event),
        authToken: options?.authToken,
    };
    const abortController = new AbortController();
    const res = await (0,_appsyncRequest_mjs__WEBPACK_IMPORTED_MODULE_3__.appsyncRequest)(_aws_amplify_core__WEBPACK_IMPORTED_MODULE_0__.Amplify, publishOptions, {}, abortController);
    if (res.failed?.length > 0) {
        return res.failed;
    }
}
/**
 * @experimental API may change in future versions
 *
 * Close WebSocket connection, disconnect listeners and reconnect observers
 *
 * @example
 * await events.closeAll()
 *
 * @returns void on success
 * @throws on error
 */
async function closeAll() {
    await _Providers_AWSAppSyncEventsProvider_index_mjs__WEBPACK_IMPORTED_MODULE_2__.AppSyncEventProvider.close();
}


//# sourceMappingURL=index.mjs.map


/***/ }),

/***/ "./dist/esm/internals/events/utils.mjs":
/*!*********************************************!*\
  !*** ./dist/esm/internals/events/utils.mjs ***!
  \*********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   configure: () => (/* binding */ configure),
/* harmony export */   normalizeAuth: () => (/* binding */ normalizeAuth),
/* harmony export */   serializeEvents: () => (/* binding */ serializeEvents)
/* harmony export */ });
/* harmony import */ var _aws_amplify_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @aws-amplify/core */ "@aws-amplify/core");


// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
const normalizeAuth = (explicitAuthMode, defaultAuthMode) => {
    if (!explicitAuthMode) {
        return defaultAuthMode;
    }
    if (explicitAuthMode === 'identityPool') {
        return 'iam';
    }
    return explicitAuthMode;
};
const configure = () => {
    const config = _aws_amplify_core__WEBPACK_IMPORTED_MODULE_0__.Amplify.getConfig();
    const eventsConfig = config.API?.Events;
    if (!eventsConfig) {
        throw new Error('Amplify configuration is missing. Have you called Amplify.configure()?');
    }
    const configAuthMode = normalizeAuth(eventsConfig.defaultAuthMode, 'apiKey');
    const options = {
        appSyncGraphqlEndpoint: eventsConfig.endpoint,
        region: eventsConfig.region,
        authenticationType: configAuthMode,
        apiKey: eventsConfig.apiKey,
    };
    return options;
};
/**
 * Event API expects and array of JSON strings
 *
 * @param events - JSON-serializable value or an array of values
 * @returns array of JSON strings
 */
const serializeEvents = (events) => {
    if (Array.isArray(events)) {
        return events.map((ev, idx) => {
            const eventJson = JSON.stringify(ev);
            if (eventJson === undefined) {
                throw new Error(`Event must be a valid JSON value. Received ${ev} at index ${idx}`);
            }
            return eventJson;
        });
    }
    const eventJson = JSON.stringify(events);
    if (eventJson === undefined) {
        throw new Error(`Event must be a valid JSON value. Received ${events}`);
    }
    return [eventJson];
};


//# sourceMappingURL=utils.mjs.map


/***/ }),

/***/ "./dist/esm/internals/graphqlAuth.mjs":
/*!********************************************!*\
  !*** ./dist/esm/internals/graphqlAuth.mjs ***!
  \********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   headerBasedAuth: () => (/* binding */ headerBasedAuth)
/* harmony export */ });
/* harmony import */ var _utils_errors_GraphQLApiError_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/errors/GraphQLApiError.mjs */ "./dist/esm/utils/errors/GraphQLApiError.mjs");
/* harmony import */ var graphql__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! graphql */ "graphql");
/* harmony import */ var _utils_errors_constants_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/errors/constants.mjs */ "./dist/esm/utils/errors/constants.mjs");





// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
async function headerBasedAuth(amplify, authMode, apiKey, additionalHeaders = {}) {
    let headers = {};
    switch (authMode) {
        case 'apiKey':
            if (!apiKey) {
                throw new _utils_errors_GraphQLApiError_mjs__WEBPACK_IMPORTED_MODULE_1__.GraphQLApiError(_utils_errors_constants_mjs__WEBPACK_IMPORTED_MODULE_2__.NO_API_KEY);
            }
            headers = {
                'X-Api-Key': apiKey,
            };
            break;
        case 'iam': {
            const session = await amplify.Auth.fetchAuthSession();
            if (session.credentials === undefined) {
                throw new _utils_errors_GraphQLApiError_mjs__WEBPACK_IMPORTED_MODULE_1__.GraphQLApiError(_utils_errors_constants_mjs__WEBPACK_IMPORTED_MODULE_2__.NO_VALID_CREDENTIALS);
            }
            break;
        }
        case 'oidc':
        case 'userPool': {
            let token;
            try {
                token = (await amplify.Auth.fetchAuthSession()).tokens?.accessToken.toString();
            }
            catch (e) {
                // fetchAuthSession failed
                throw new _utils_errors_GraphQLApiError_mjs__WEBPACK_IMPORTED_MODULE_1__.GraphQLApiError({
                    ..._utils_errors_constants_mjs__WEBPACK_IMPORTED_MODULE_2__.NO_SIGNED_IN_USER,
                    underlyingError: e,
                });
            }
            // `fetchAuthSession()` succeeded but didn't return `tokens`.
            // This may happen when unauthenticated access is enabled and there is
            // no user signed in.
            if (!token) {
                throw new _utils_errors_GraphQLApiError_mjs__WEBPACK_IMPORTED_MODULE_1__.GraphQLApiError(_utils_errors_constants_mjs__WEBPACK_IMPORTED_MODULE_2__.NO_VALID_AUTH_TOKEN);
            }
            headers = {
                Authorization: token,
            };
            break;
        }
        case 'lambda':
            if (typeof additionalHeaders === 'object' &&
                !additionalHeaders.Authorization) {
                throw new _utils_errors_GraphQLApiError_mjs__WEBPACK_IMPORTED_MODULE_1__.GraphQLApiError(_utils_errors_constants_mjs__WEBPACK_IMPORTED_MODULE_2__.NO_AUTH_TOKEN_HEADER);
            }
            headers = {
                Authorization: additionalHeaders.Authorization,
            };
            break;
    }
    return headers;
}


//# sourceMappingURL=graphqlAuth.mjs.map


/***/ }),

/***/ "./dist/esm/internals/utils/runtimeTypeGuards/isGraphQLResponseWithErrors.mjs":
/*!************************************************************************************!*\
  !*** ./dist/esm/internals/utils/runtimeTypeGuards/isGraphQLResponseWithErrors.mjs ***!
  \************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   isGraphQLResponseWithErrors: () => (/* binding */ isGraphQLResponseWithErrors)
/* harmony export */ });
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
function isGraphQLResponseWithErrors(response) {
    if (!response) {
        return false;
    }
    const r = response;
    return Array.isArray(r.errors) && r.errors.length > 0;
}


//# sourceMappingURL=isGraphQLResponseWithErrors.mjs.map


/***/ }),

/***/ "./dist/esm/types/PubSub.mjs":
/*!***********************************!*\
  !*** ./dist/esm/types/PubSub.mjs ***!
  \***********************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CONTROL_MSG: () => (/* binding */ CONTROL_MSG),
/* harmony export */   ConnectionState: () => (/* binding */ ConnectionState)
/* harmony export */ });
var CONTROL_MSG;
(function (CONTROL_MSG) {
    CONTROL_MSG["CONNECTION_CLOSED"] = "Connection closed";
    CONTROL_MSG["CONNECTION_FAILED"] = "Connection failed";
    CONTROL_MSG["REALTIME_SUBSCRIPTION_INIT_ERROR"] = "AppSync Realtime subscription init error";
    CONTROL_MSG["SUBSCRIPTION_ACK"] = "Subscription ack";
    CONTROL_MSG["TIMEOUT_DISCONNECT"] = "Timeout disconnect";
})(CONTROL_MSG || (CONTROL_MSG = {}));
/** @enum {string} */
var ConnectionState;
(function (ConnectionState) {
    /*
     * The connection is alive and healthy
     */
    ConnectionState["Connected"] = "Connected";
    /*
     * The connection is alive, but the connection is offline
     */
    ConnectionState["ConnectedPendingNetwork"] = "ConnectedPendingNetwork";
    /*
     * The connection has been disconnected while in use
     */
    ConnectionState["ConnectionDisrupted"] = "ConnectionDisrupted";
    /*
     * The connection has been disconnected and the network is offline
     */
    ConnectionState["ConnectionDisruptedPendingNetwork"] = "ConnectionDisruptedPendingNetwork";
    /*
     * The connection is in the process of connecting
     */
    ConnectionState["Connecting"] = "Connecting";
    /*
     * The connection is not in use and is being disconnected
     */
    ConnectionState["ConnectedPendingDisconnect"] = "ConnectedPendingDisconnect";
    /*
     * The connection is not in use and has been disconnected
     */
    ConnectionState["Disconnected"] = "Disconnected";
    /*
     * The connection is alive, but a keep alive message has been missed
     */
    ConnectionState["ConnectedPendingKeepAlive"] = "ConnectedPendingKeepAlive";
})(ConnectionState || (ConnectionState = {}));


//# sourceMappingURL=PubSub.mjs.map


/***/ }),

/***/ "./dist/esm/types/index.mjs":
/*!**********************************!*\
  !*** ./dist/esm/types/index.mjs ***!
  \**********************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CONTROL_MSG: () => (/* reexport safe */ _PubSub_mjs__WEBPACK_IMPORTED_MODULE_0__.CONTROL_MSG),
/* harmony export */   ConnectionState: () => (/* reexport safe */ _PubSub_mjs__WEBPACK_IMPORTED_MODULE_0__.ConnectionState),
/* harmony export */   GraphQLAuthError: () => (/* binding */ GraphQLAuthError),
/* harmony export */   __amplify: () => (/* binding */ __amplify),
/* harmony export */   __authMode: () => (/* binding */ __authMode),
/* harmony export */   __authToken: () => (/* binding */ __authToken),
/* harmony export */   __headers: () => (/* binding */ __headers),
/* harmony export */   getInternals: () => (/* binding */ getInternals)
/* harmony export */ });
/* harmony import */ var _PubSub_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./PubSub.mjs */ "./dist/esm/types/PubSub.mjs");


var GraphQLAuthError;
(function (GraphQLAuthError) {
    GraphQLAuthError["NO_API_KEY"] = "No api-key configured";
    GraphQLAuthError["NO_CURRENT_USER"] = "No current user";
    GraphQLAuthError["NO_CREDENTIALS"] = "No credentials";
    GraphQLAuthError["NO_FEDERATED_JWT"] = "No federated jwt";
    GraphQLAuthError["NO_AUTH_TOKEN"] = "No auth token specified";
})(GraphQLAuthError || (GraphQLAuthError = {}));
const __amplify = Symbol('amplify');
const __authMode = Symbol('authMode');
const __authToken = Symbol('authToken');
const __headers = Symbol('headers');
function getInternals(client) {
    const c = client;
    return {
        amplify: c[__amplify],
        authMode: c[__authMode],
        authToken: c[__authToken],
        headers: c[__headers],
    };
}


//# sourceMappingURL=index.mjs.map


/***/ }),

/***/ "./dist/esm/utils/ConnectionStateMonitor.mjs":
/*!***************************************************!*\
  !*** ./dist/esm/utils/ConnectionStateMonitor.mjs ***!
  \***************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CONNECTION_CHANGE: () => (/* binding */ CONNECTION_CHANGE),
/* harmony export */   ConnectionStateMonitor: () => (/* binding */ ConnectionStateMonitor)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ "../../node_modules/rxjs/dist/esm5/internal/Observable.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "../../node_modules/rxjs/dist/esm5/internal/operators/map.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ "../../node_modules/rxjs/dist/esm5/internal/operators/filter.js");
/* harmony import */ var _types_PubSub_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../types/PubSub.mjs */ "./dist/esm/types/PubSub.mjs");
/* harmony import */ var _ReachabilityMonitor_index_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ReachabilityMonitor/index.mjs */ "./dist/esm/utils/ReachabilityMonitor/index.mjs");




// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
const CONNECTION_CHANGE = {
    KEEP_ALIVE_MISSED: { keepAliveState: 'unhealthy' },
    KEEP_ALIVE: { keepAliveState: 'healthy' },
    CONNECTION_ESTABLISHED: { connectionState: 'connected' },
    CONNECTION_FAILED: {
        intendedConnectionState: 'disconnected',
        connectionState: 'disconnected',
    },
    CLOSING_CONNECTION: { intendedConnectionState: 'disconnected' },
    OPENING_CONNECTION: {
        intendedConnectionState: 'connected',
        connectionState: 'connecting',
    },
    CLOSED: { connectionState: 'disconnected' },
    ONLINE: { networkState: 'connected' },
    OFFLINE: { networkState: 'disconnected' },
};
class ConnectionStateMonitor {
    constructor() {
        this._networkMonitoringSubscription = undefined;
        this._linkedConnectionState = {
            networkState: 'connected',
            connectionState: 'disconnected',
            intendedConnectionState: 'disconnected',
            keepAliveState: 'healthy',
        };
        // Attempt to update the state with the current actual network state
        this._initialNetworkStateSubscription = (0,_ReachabilityMonitor_index_mjs__WEBPACK_IMPORTED_MODULE_0__.ReachabilityMonitor)().subscribe(({ online }) => {
            this.record(online ? CONNECTION_CHANGE.ONLINE : CONNECTION_CHANGE.OFFLINE);
            this._initialNetworkStateSubscription?.unsubscribe();
        });
        this._linkedConnectionStateObservable =
            new rxjs__WEBPACK_IMPORTED_MODULE_1__.Observable(connectionStateObserver => {
                connectionStateObserver.next(this._linkedConnectionState);
                this._linkedConnectionStateObserver = connectionStateObserver;
            });
    }
    /**
     * Turn network state monitoring on if it isn't on already
     */
    enableNetworkMonitoring() {
        // If no initial network state was discovered, stop trying
        this._initialNetworkStateSubscription?.unsubscribe();
        // Maintain the network state based on the reachability monitor
        if (this._networkMonitoringSubscription === undefined) {
            this._networkMonitoringSubscription = (0,_ReachabilityMonitor_index_mjs__WEBPACK_IMPORTED_MODULE_0__.ReachabilityMonitor)().subscribe(({ online }) => {
                this.record(online ? CONNECTION_CHANGE.ONLINE : CONNECTION_CHANGE.OFFLINE);
            });
        }
    }
    /**
     * Turn network state monitoring off if it isn't off already
     */
    disableNetworkMonitoring() {
        this._networkMonitoringSubscription?.unsubscribe();
        this._networkMonitoringSubscription = undefined;
    }
    /**
     * Get the observable that allows us to monitor the connection state
     *
     * @returns {Observable<ConnectionState>} - The observable that emits ConnectionState updates
     */
    get connectionStateObservable() {
        let previous;
        // The linked state aggregates state changes to any of the network, connection,
        // intendedConnection and keepAliveHealth. Some states will change these independent
        // states without changing the overall connection state.
        // After translating from linked states to ConnectionState, then remove any duplicates
        return this._linkedConnectionStateObservable
            .pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.map)(value => {
            return this.connectionStatesTranslator(value);
        }))
            .pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_3__.filter)(current => {
            const toInclude = current !== previous;
            previous = current;
            return toInclude;
        }));
    }
    /*
     * Updates local connection state and emits the full state to the observer.
     */
    record(statusUpdates) {
        // Maintain the network monitor
        if (statusUpdates.intendedConnectionState === 'connected') {
            this.enableNetworkMonitoring();
        }
        else if (statusUpdates.intendedConnectionState === 'disconnected') {
            this.disableNetworkMonitoring();
        }
        // Maintain the socket state
        const newSocketStatus = {
            ...this._linkedConnectionState,
            ...statusUpdates,
        };
        this._linkedConnectionState = { ...newSocketStatus };
        this._linkedConnectionStateObserver?.next(this._linkedConnectionState);
    }
    /*
     * Translate the ConnectionState structure into a specific ConnectionState string literal union
     */
    connectionStatesTranslator({ connectionState, networkState, intendedConnectionState, keepAliveState, }) {
        if (connectionState === 'connected' && networkState === 'disconnected')
            return _types_PubSub_mjs__WEBPACK_IMPORTED_MODULE_4__.ConnectionState.ConnectedPendingNetwork;
        if (connectionState === 'connected' &&
            intendedConnectionState === 'disconnected')
            return _types_PubSub_mjs__WEBPACK_IMPORTED_MODULE_4__.ConnectionState.ConnectedPendingDisconnect;
        if (connectionState === 'disconnected' &&
            intendedConnectionState === 'connected' &&
            networkState === 'disconnected')
            return _types_PubSub_mjs__WEBPACK_IMPORTED_MODULE_4__.ConnectionState.ConnectionDisruptedPendingNetwork;
        if (connectionState === 'disconnected' &&
            intendedConnectionState === 'connected')
            return _types_PubSub_mjs__WEBPACK_IMPORTED_MODULE_4__.ConnectionState.ConnectionDisrupted;
        if (connectionState === 'connected' && keepAliveState === 'unhealthy')
            return _types_PubSub_mjs__WEBPACK_IMPORTED_MODULE_4__.ConnectionState.ConnectedPendingKeepAlive;
        // All remaining states directly correspond to the connection state
        if (connectionState === 'connecting')
            return _types_PubSub_mjs__WEBPACK_IMPORTED_MODULE_4__.ConnectionState.Connecting;
        if (connectionState === 'disconnected')
            return _types_PubSub_mjs__WEBPACK_IMPORTED_MODULE_4__.ConnectionState.Disconnected;
        return _types_PubSub_mjs__WEBPACK_IMPORTED_MODULE_4__.ConnectionState.Connected;
    }
}


//# sourceMappingURL=ConnectionStateMonitor.mjs.map


/***/ }),

/***/ "./dist/esm/utils/ReachabilityMonitor/index.mjs":
/*!******************************************************!*\
  !*** ./dist/esm/utils/ReachabilityMonitor/index.mjs ***!
  \******************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ReachabilityMonitor: () => (/* binding */ ReachabilityMonitor)
/* harmony export */ });
/* harmony import */ var _aws_amplify_core_internals_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @aws-amplify/core/internals/utils */ "../core/dist/esm/Reachability/Reachability.mjs");


// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
const ReachabilityMonitor = () => new _aws_amplify_core_internals_utils__WEBPACK_IMPORTED_MODULE_0__.Reachability().networkMonitor();


//# sourceMappingURL=index.mjs.map


/***/ }),

/***/ "./dist/esm/utils/ReconnectionMonitor.mjs":
/*!************************************************!*\
  !*** ./dist/esm/utils/ReconnectionMonitor.mjs ***!
  \************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ReconnectEvent: () => (/* binding */ ReconnectEvent),
/* harmony export */   ReconnectionMonitor: () => (/* binding */ ReconnectionMonitor)
/* harmony export */ });
/* harmony import */ var _Providers_constants_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Providers/constants.mjs */ "./dist/esm/Providers/constants.mjs");


var ReconnectEvent;
(function (ReconnectEvent) {
    ReconnectEvent["START_RECONNECT"] = "START_RECONNECT";
    ReconnectEvent["HALT_RECONNECT"] = "HALT_RECONNECT";
})(ReconnectEvent || (ReconnectEvent = {}));
/**
 * Captures the reconnect event logic used to determine when to reconnect to PubSub providers.
 *   Reconnect attempts are delayed by 5 seconds to let the interface settle.
 *   Attempting to reconnect only once creates unrecoverable states when the network state isn't
 *   supported by the browser, so this keeps retrying every minute until halted.
 */
class ReconnectionMonitor {
    constructor() {
        this.reconnectObservers = [];
    }
    /**
     * Add reconnect observer to the list of observers to alert on reconnect
     */
    addObserver(reconnectObserver) {
        this.reconnectObservers.push(reconnectObserver);
    }
    /**
     * Given a reconnect event, start the appropriate behavior
     */
    record(event) {
        if (event === ReconnectEvent.START_RECONNECT) {
            // If the reconnection hasn't been started
            if (this.reconnectSetTimeoutId === undefined &&
                this.reconnectIntervalId === undefined) {
                this.reconnectSetTimeoutId = setTimeout(() => {
                    // Reconnect now
                    this._triggerReconnect();
                    // Retry reconnect every periodically until it works
                    this.reconnectIntervalId = setInterval(() => {
                        this._triggerReconnect();
                    }, _Providers_constants_mjs__WEBPACK_IMPORTED_MODULE_0__.RECONNECT_INTERVAL);
                }, _Providers_constants_mjs__WEBPACK_IMPORTED_MODULE_0__.RECONNECT_DELAY);
            }
        }
        if (event === ReconnectEvent.HALT_RECONNECT) {
            if (this.reconnectIntervalId) {
                clearInterval(this.reconnectIntervalId);
                this.reconnectIntervalId = undefined;
            }
            if (this.reconnectSetTimeoutId) {
                clearTimeout(this.reconnectSetTimeoutId);
                this.reconnectSetTimeoutId = undefined;
            }
        }
    }
    /**
     * Complete all reconnect observers
     */
    close() {
        this.reconnectObservers.forEach(reconnectObserver => {
            reconnectObserver.complete?.();
        });
    }
    _triggerReconnect() {
        this.reconnectObservers.forEach(reconnectObserver => {
            reconnectObserver.next?.();
        });
    }
}


//# sourceMappingURL=ReconnectionMonitor.mjs.map


/***/ }),

/***/ "./dist/esm/utils/errors/GraphQLApiError.mjs":
/*!***************************************************!*\
  !*** ./dist/esm/utils/errors/GraphQLApiError.mjs ***!
  \***************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   GraphQLApiError: () => (/* binding */ GraphQLApiError)
/* harmony export */ });
/* harmony import */ var _aws_amplify_core_internals_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @aws-amplify/core/internals/utils */ "../core/dist/esm/errors/AmplifyError.mjs");


// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
/**
 * @internal
 */
class GraphQLApiError extends _aws_amplify_core_internals_utils__WEBPACK_IMPORTED_MODULE_0__.AmplifyError {
    constructor(params) {
        super(params);
        // Hack for making the custom error class work when transpiled to es5
        // TODO: Delete the following 2 lines after we change the build target to >= es2015
        this.constructor = GraphQLApiError;
        Object.setPrototypeOf(this, GraphQLApiError.prototype);
    }
}


//# sourceMappingURL=GraphQLApiError.mjs.map


/***/ }),

/***/ "./dist/esm/utils/errors/assertValidationError.mjs":
/*!*********************************************************!*\
  !*** ./dist/esm/utils/errors/assertValidationError.mjs ***!
  \*********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   assertValidationError: () => (/* binding */ assertValidationError)
/* harmony export */ });
/* harmony import */ var _GraphQLApiError_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./GraphQLApiError.mjs */ "./dist/esm/utils/errors/GraphQLApiError.mjs");
/* harmony import */ var _validation_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./validation.mjs */ "./dist/esm/utils/errors/validation.mjs");



// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
/**
 * @internal
 */
function assertValidationError(assertion, name) {
    const { message, recoverySuggestion } = _validation_mjs__WEBPACK_IMPORTED_MODULE_0__.validationErrorMap[name];
    if (!assertion) {
        throw new _GraphQLApiError_mjs__WEBPACK_IMPORTED_MODULE_1__.GraphQLApiError({ name, message, recoverySuggestion });
    }
}


//# sourceMappingURL=assertValidationError.mjs.map


/***/ }),

/***/ "./dist/esm/utils/errors/constants.mjs":
/*!*********************************************!*\
  !*** ./dist/esm/utils/errors/constants.mjs ***!
  \*********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   NO_API_KEY: () => (/* binding */ NO_API_KEY),
/* harmony export */   NO_AUTH_TOKEN_HEADER: () => (/* binding */ NO_AUTH_TOKEN_HEADER),
/* harmony export */   NO_ENDPOINT: () => (/* binding */ NO_ENDPOINT),
/* harmony export */   NO_SIGNED_IN_USER: () => (/* binding */ NO_SIGNED_IN_USER),
/* harmony export */   NO_VALID_AUTH_TOKEN: () => (/* binding */ NO_VALID_AUTH_TOKEN),
/* harmony export */   NO_VALID_CREDENTIALS: () => (/* binding */ NO_VALID_CREDENTIALS)
/* harmony export */ });
/* harmony import */ var _types_index_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../types/index.mjs */ "./dist/esm/types/index.mjs");


// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
const NO_API_KEY = {
    name: 'NoApiKey',
    // ideal: No API key configured.
    message: _types_index_mjs__WEBPACK_IMPORTED_MODULE_0__.GraphQLAuthError.NO_API_KEY,
    recoverySuggestion: 'The API request was made with `authMode: "apiKey"` but no API Key was passed into `Amplify.configure()`. Review if your API key is passed into the `Amplify.configure()` function.',
};
const NO_VALID_CREDENTIALS = {
    name: 'NoCredentials',
    // ideal: No auth credentials available.
    message: _types_index_mjs__WEBPACK_IMPORTED_MODULE_0__.GraphQLAuthError.NO_CREDENTIALS,
    recoverySuggestion: `The API request was made with \`authMode: "iam"\` but no authentication credentials are available.

If you intended to make a request using an authenticated role, review if your user is signed in before making the request.

If you intend to make a request using an unauthenticated role or also known as "guest access", verify if "Auth.Cognito.allowGuestAccess" is set to "true" in the \`Amplify.configure()\` function.`,
};
const NO_VALID_AUTH_TOKEN = {
    name: 'NoValidAuthTokens',
    // ideal: No valid JWT auth token provided to make the API request..
    message: _types_index_mjs__WEBPACK_IMPORTED_MODULE_0__.GraphQLAuthError.NO_FEDERATED_JWT,
    recoverySuggestion: 'If you intended to make an authenticated API request, review if the current user is signed in.',
};
const NO_SIGNED_IN_USER = {
    name: 'NoSignedUser',
    // ideal: Couldn't retrieve authentication credentials to make the API request.
    message: _types_index_mjs__WEBPACK_IMPORTED_MODULE_0__.GraphQLAuthError.NO_CURRENT_USER,
    recoverySuggestion: 'Review the underlying exception field for more details. If you intended to make an authenticated API request, review if the current user is signed in.',
};
const NO_AUTH_TOKEN_HEADER = {
    name: 'NoAuthorizationHeader',
    // ideal: Authorization header not specified.
    message: _types_index_mjs__WEBPACK_IMPORTED_MODULE_0__.GraphQLAuthError.NO_AUTH_TOKEN,
    recoverySuggestion: 'The API request was made with `authMode: "lambda"` but no `authToken` is set. Review if a valid authToken is passed into the request options or in the `Amplify.configure()` function.',
};
const NO_ENDPOINT = {
    name: 'NoEndpoint',
    message: 'No GraphQL endpoint configured in `Amplify.configure()`.',
    recoverySuggestion: 'Review if the GraphQL API endpoint is set in the `Amplify.configure()` function.',
};


//# sourceMappingURL=constants.mjs.map


/***/ }),

/***/ "./dist/esm/utils/errors/createGraphQLResultWithError.mjs":
/*!****************************************************************!*\
  !*** ./dist/esm/utils/errors/createGraphQLResultWithError.mjs ***!
  \****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createGraphQLResultWithError: () => (/* binding */ createGraphQLResultWithError)
/* harmony export */ });
/* harmony import */ var graphql__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! graphql */ "graphql");


// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
const createGraphQLResultWithError = (error) => {
    return {
        data: {},
        errors: [new graphql__WEBPACK_IMPORTED_MODULE_0__.GraphQLError(error.message, null, null, null, null, error)],
    };
};


//# sourceMappingURL=createGraphQLResultWithError.mjs.map


/***/ }),

/***/ "./dist/esm/utils/errors/repackageAuthError.mjs":
/*!******************************************************!*\
  !*** ./dist/esm/utils/errors/repackageAuthError.mjs ***!
  \******************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   repackageUnauthorizedError: () => (/* binding */ repackageUnauthorizedError)
/* harmony export */ });
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
/**
 * Checks to see if the given response or subscription message contains an
 * Unauthorized error. If it does, it changes the error message to include instructions
 * for the app developer.
 */
function repackageUnauthorizedError(content) {
    if (content.errors && Array.isArray(content.errors)) {
        content.errors.forEach(e => {
            if (isUnauthorizedError(e)) {
                e.message = 'Unauthorized';
                e.recoverySuggestion =
                    `If you're calling an Amplify-generated API, make sure ` +
                        `to set the "authMode" in generateClient({ authMode: '...' }) to the backend authorization ` +
                        `rule's auth provider ('apiKey', 'userPool', 'iam', 'oidc', 'lambda')`;
            }
        });
    }
    return content;
}
function isUnauthorizedError(error) {
    // Error pattern corresponding to appsync calls
    if (error?.originalError?.name?.startsWith('UnauthorizedException')) {
        return true;
    }
    // Error pattern corresponding to appsync subscriptions
    if (error.message?.startsWith('Connection failed:') &&
        error.message?.includes('Permission denied')) {
        return true;
    }
    return false;
}


//# sourceMappingURL=repackageAuthError.mjs.map


/***/ }),

/***/ "./dist/esm/utils/errors/validation.mjs":
/*!**********************************************!*\
  !*** ./dist/esm/utils/errors/validation.mjs ***!
  \**********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   APIValidationErrorCode: () => (/* binding */ APIValidationErrorCode),
/* harmony export */   validationErrorMap: () => (/* binding */ validationErrorMap)
/* harmony export */ });
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
var APIValidationErrorCode;
(function (APIValidationErrorCode) {
    APIValidationErrorCode["NoAuthSession"] = "NoAuthSession";
    APIValidationErrorCode["NoRegion"] = "NoRegion";
    APIValidationErrorCode["NoCustomEndpoint"] = "NoCustomEndpoint";
})(APIValidationErrorCode || (APIValidationErrorCode = {}));
const validationErrorMap = {
    [APIValidationErrorCode.NoAuthSession]: {
        message: 'Auth session should not be empty.',
    },
    // TODO: re-enable when working in all test environments:
    // [APIValidationErrorCode.NoEndpoint]: {
    // 	message: 'Missing endpoint',
    // },
    [APIValidationErrorCode.NoRegion]: {
        message: 'Missing region.',
    },
    [APIValidationErrorCode.NoCustomEndpoint]: {
        message: 'Custom endpoint region is present without custom endpoint.',
    },
};


//# sourceMappingURL=validation.mjs.map


/***/ }),

/***/ "./dist/esm/utils/resolveConfig.mjs":
/*!******************************************!*\
  !*** ./dist/esm/utils/resolveConfig.mjs ***!
  \******************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   resolveConfig: () => (/* binding */ resolveConfig)
/* harmony export */ });
/* harmony import */ var _aws_amplify_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @aws-amplify/core */ "@aws-amplify/core");
/* harmony import */ var _errors_assertValidationError_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./errors/assertValidationError.mjs */ "./dist/esm/utils/errors/assertValidationError.mjs");
/* harmony import */ var _errors_validation_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./errors/validation.mjs */ "./dist/esm/utils/errors/validation.mjs");
/* harmony import */ var graphql__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! graphql */ "graphql");






// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
const logger = new _aws_amplify_core__WEBPACK_IMPORTED_MODULE_0__.ConsoleLogger('GraphQLAPI resolveConfig');
/**
 * @internal
 */
const resolveConfig = (amplify) => {
    const config = amplify.getConfig();
    if (!config.API?.GraphQL) {
        logger.warn('The API configuration is missing. This is likely due to Amplify.configure() not being called prior to generateClient().');
    }
    const { apiKey, customEndpoint, customEndpointRegion, defaultAuthMode, endpoint, region, } = config.API?.GraphQL ?? {};
    // TODO: re-enable when working in all test environments:
    // assertValidationError(!!endpoint, APIValidationErrorCode.NoEndpoint);
    (0,_errors_assertValidationError_mjs__WEBPACK_IMPORTED_MODULE_2__.assertValidationError)(!(!customEndpoint && customEndpointRegion), _errors_validation_mjs__WEBPACK_IMPORTED_MODULE_3__.APIValidationErrorCode.NoCustomEndpoint);
    return {
        apiKey,
        customEndpoint,
        customEndpointRegion,
        defaultAuthMode,
        endpoint,
        region,
    };
};


//# sourceMappingURL=resolveConfig.mjs.map


/***/ }),

/***/ "./dist/esm/utils/resolveLibraryOptions.mjs":
/*!**************************************************!*\
  !*** ./dist/esm/utils/resolveLibraryOptions.mjs ***!
  \**************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   resolveLibraryOptions: () => (/* binding */ resolveLibraryOptions)
/* harmony export */ });
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
/**
 * @internal
 */
const resolveLibraryOptions = (amplify) => {
    const headers = amplify.libraryOptions?.API?.GraphQL?.headers;
    const withCredentials = amplify.libraryOptions?.API?.GraphQL?.withCredentials;
    return { headers, withCredentials };
};


//# sourceMappingURL=resolveLibraryOptions.mjs.map


/***/ }),

/***/ "../api-rest/dist/esm/apis/common/handler.mjs":
/*!****************************************************!*\
  !*** ../api-rest/dist/esm/apis/common/handler.mjs ***!
  \****************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   transferHandler: () => (/* binding */ transferHandler)
/* harmony export */ });
/* harmony import */ var _aws_amplify_core_internals_aws_client_utils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @aws-amplify/core/internals/aws-client-utils */ "../core/dist/esm/clients/middleware/retry/defaultRetryDecider.mjs");
/* harmony import */ var _aws_amplify_core_internals_aws_client_utils__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @aws-amplify/core/internals/aws-client-utils */ "../core/dist/esm/clients/middleware/retry/jitteredBackoff.mjs");
/* harmony import */ var _aws_amplify_core_internals_aws_client_utils__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @aws-amplify/core/internals/aws-client-utils */ "../core/dist/esm/clients/handlers/authenticated.mjs");
/* harmony import */ var _aws_amplify_core_internals_aws_client_utils__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @aws-amplify/core/internals/aws-client-utils */ "../core/dist/esm/clients/handlers/unauthenticated.mjs");
/* harmony import */ var _errors_validation_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../errors/validation.mjs */ "../api-rest/dist/esm/errors/validation.mjs");
/* harmony import */ var _utils_serviceError_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../utils/serviceError.mjs */ "../api-rest/dist/esm/utils/serviceError.mjs");
/* harmony import */ var _utils_logger_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../utils/logger.mjs */ "../api-rest/dist/esm/utils/logger.mjs");
/* harmony import */ var _utils_parseSigningInfo_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../utils/parseSigningInfo.mjs */ "../api-rest/dist/esm/utils/parseSigningInfo.mjs");
/* harmony import */ var _utils_resolveHeaders_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../utils/resolveHeaders.mjs */ "../api-rest/dist/esm/utils/resolveHeaders.mjs");








/**
 * Make REST API call with best-effort IAM auth.
 * @param amplify Amplify instance to to resolve credentials and tokens. Should use different instance in client-side
 *   and SSR
 * @param options Options accepted from public API options when calling the handlers.
 * @param signingServiceInfo Internal-only options enable IAM auth as well as to to overwrite the IAM signing service
 *   and region. If specified, and NONE of API Key header or Auth header is present, IAM auth will be used.
 * @param iamAuthApplicable Callback function that is used to determine if IAM Auth should be used or not.
 *
 * @internal
 */
const transferHandler = async (amplify, options, iamAuthApplicable, signingServiceInfo) => {
    const { url, method, headers, body, withCredentials, abortSignal } = options;
    const resolvedBody = body
        ? body instanceof FormData
            ? body
            : JSON.stringify(body ?? '')
        : undefined;
    const resolvedHeaders = (0,_utils_resolveHeaders_mjs__WEBPACK_IMPORTED_MODULE_4__.resolveHeaders)(headers, body);
    const request = {
        url,
        headers: resolvedHeaders,
        method,
        body: resolvedBody,
    };
    const baseOptions = {
        retryDecider: (0,_aws_amplify_core_internals_aws_client_utils__WEBPACK_IMPORTED_MODULE_5__.getRetryDecider)(_utils_serviceError_mjs__WEBPACK_IMPORTED_MODULE_1__.parseRestApiServiceError),
        computeDelay: _aws_amplify_core_internals_aws_client_utils__WEBPACK_IMPORTED_MODULE_6__.jitteredBackoff,
        withCrossDomainCredentials: withCredentials,
        abortSignal,
    };
    const isIamAuthApplicable = iamAuthApplicable(request, signingServiceInfo);
    let response;
    const credentials = await resolveCredentials(amplify);
    if (isIamAuthApplicable && credentials) {
        const signingInfoFromUrl = (0,_utils_parseSigningInfo_mjs__WEBPACK_IMPORTED_MODULE_3__.parseSigningInfo)(url);
        const signingService = signingServiceInfo?.service ?? signingInfoFromUrl.service;
        const signingRegion = signingServiceInfo?.region ?? signingInfoFromUrl.region;
        response = await (0,_aws_amplify_core_internals_aws_client_utils__WEBPACK_IMPORTED_MODULE_7__.authenticatedHandler)(request, {
            ...baseOptions,
            credentials,
            region: signingRegion,
            service: signingService,
        });
    }
    else {
        response = await (0,_aws_amplify_core_internals_aws_client_utils__WEBPACK_IMPORTED_MODULE_8__.unauthenticatedHandler)(request, {
            ...baseOptions,
        });
    }
    // Clean-up un-modeled properties from response.
    return {
        statusCode: response.statusCode,
        headers: response.headers,
        body: response.body,
    };
};
const resolveCredentials = async (amplify) => {
    try {
        const { credentials } = await amplify.Auth.fetchAuthSession();
        if (credentials) {
            return credentials;
        }
    }
    catch (e) {
        _utils_logger_mjs__WEBPACK_IMPORTED_MODULE_2__.logger.debug('No credentials available, the request will be unsigned.');
    }
    return null;
};


//# sourceMappingURL=handler.mjs.map


/***/ }),

/***/ "../api-rest/dist/esm/apis/common/internalPost.mjs":
/*!*********************************************************!*\
  !*** ../api-rest/dist/esm/apis/common/internalPost.mjs ***!
  \*********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   cancel: () => (/* binding */ cancel),
/* harmony export */   post: () => (/* binding */ post),
/* harmony export */   updateRequestToBeCancellable: () => (/* binding */ updateRequestToBeCancellable)
/* harmony export */ });
/* harmony import */ var _utils_createCancellableOperation_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utils/createCancellableOperation.mjs */ "../api-rest/dist/esm/utils/createCancellableOperation.mjs");
/* harmony import */ var _errors_validation_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../errors/validation.mjs */ "../api-rest/dist/esm/errors/validation.mjs");
/* harmony import */ var _utils_logger_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../utils/logger.mjs */ "../api-rest/dist/esm/utils/logger.mjs");
/* harmony import */ var _utils_isIamAuthApplicable_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../utils/isIamAuthApplicable.mjs */ "../api-rest/dist/esm/utils/isIamAuthApplicable.mjs");
/* harmony import */ var _handler_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./handler.mjs */ "../api-rest/dist/esm/apis/common/handler.mjs");








// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
/**
 * This weak map provides functionality to cancel a request given the promise containing the `post` request.
 *
 * 1. For every GraphQL POST request, an abort controller is created and supplied to the request.
 * 2. The promise fulfilled by GraphGL POST request is then mapped to that abort controller.
 * 3. The promise is returned to the external caller.
 * 4. The caller can either wait for the promise to fulfill or call `cancel(promise)` to cancel the request.
 * 5. If `cancel(promise)` is called, then the corresponding abort controller is retrieved from the map below.
 * 6. GraphQL POST request will be rejected with the error message provided during cancel.
 * 7. Caller can check if the error is because of cancelling by calling `isCancelError(error)`.
 */
const cancelTokenMap = new WeakMap();
/**
 * @internal
 *
 * REST POST handler to send GraphQL request to given endpoint. By default, it will use IAM to authorize
 * the request. In some auth modes, the IAM auth has to be disabled. Here's how to set up the request auth correctly:
 * * If auth mode is 'iam', you MUST NOT set 'authorization' header and 'x-api-key' header, since it would disable IAM
 *   auth. You MUST also set 'input.options.signingServiceInfo' option.
 *   * The including 'input.options.signingServiceInfo.service' and 'input.options.signingServiceInfo.region' are
 *     optional. If omitted, the signing service and region will be inferred from url.
 * * If auth mode is 'none', you MUST NOT set 'options.signingServiceInfo' option.
 * * If auth mode is 'apiKey', you MUST set 'x-api-key' custom header.
 * * If auth mode is 'oidc' or 'lambda' or 'userPool', you MUST set 'authorization' header.
 *
 * To make the internal post cancellable, you must also call `updateRequestToBeCancellable()` with the promise from
 * internal post call and the abort controller supplied to the internal post call.
 *
 * @param amplify the AmplifyClassV6 instance - it may be the singleton used on Web, or an instance created within
 * a context created by `runWithAmplifyServerContext`
 * @param postInput an object of {@link InternalPostInput}
 * @param postInput.url The URL that the POST request sends to
 * @param postInput.options Options of the POST request
 * @param postInput.abortController The abort controller used to cancel the POST request
 * @returns a {@link RestApiResponse}
 *
 * @throws an {@link AmplifyError} with `Network Error` as the `message` when the external resource is unreachable due to one
 * of the following reasons:
 *   1. no network connection
 *   2. CORS error
 * @throws a {@link CanceledError} when the ongoing POST request get cancelled
 */
const post = (amplify, { url, options, abortController }) => {
    const controller = abortController ?? new AbortController();
    const responsePromise = (0,_utils_createCancellableOperation_mjs__WEBPACK_IMPORTED_MODULE_0__.createCancellableOperation)(async () => {
        const response = (0,_handler_mjs__WEBPACK_IMPORTED_MODULE_4__.transferHandler)(amplify, {
            url,
            method: 'POST',
            ...options,
            abortSignal: controller.signal,
        }, _utils_isIamAuthApplicable_mjs__WEBPACK_IMPORTED_MODULE_3__.isIamAuthApplicableForGraphQL, options?.signingServiceInfo);
        return response;
    }, controller);
    const responseWithCleanUp = responsePromise.finally(() => {
        cancelTokenMap.delete(responseWithCleanUp);
    });
    return responseWithCleanUp;
};
/**
 * Cancels a request given the promise returned by `post`.
 * If the request is already completed, this function does nothing.
 * It MUST be used after `updateRequestToBeCancellable` is called.
 */
const cancel = (promise, message) => {
    const controller = cancelTokenMap.get(promise);
    if (controller) {
        controller.abort(message);
        if (message && controller.signal.reason !== message) {
            // In runtimes where `AbortSignal.reason` is not supported, we track the reason ourselves.
            // @ts-expect-error reason is read-only property.
            controller.signal.reason = message;
        }
        return true;
    }
    return false;
};
/**
 * MUST be used to make a promise including internal `post` API call cancellable.
 */
const updateRequestToBeCancellable = (promise, controller) => {
    cancelTokenMap.set(promise, controller);
};


//# sourceMappingURL=internalPost.mjs.map


/***/ }),

/***/ "../api-rest/dist/esm/apis/common/publicApis.mjs":
/*!*******************************************************!*\
  !*** ../api-rest/dist/esm/apis/common/publicApis.mjs ***!
  \*******************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   del: () => (/* binding */ del),
/* harmony export */   get: () => (/* binding */ get),
/* harmony export */   head: () => (/* binding */ head),
/* harmony export */   patch: () => (/* binding */ patch),
/* harmony export */   post: () => (/* binding */ post),
/* harmony export */   put: () => (/* binding */ put)
/* harmony export */ });
/* harmony import */ var _utils_createCancellableOperation_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utils/createCancellableOperation.mjs */ "../api-rest/dist/esm/utils/createCancellableOperation.mjs");
/* harmony import */ var _utils_parseSigningInfo_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../utils/parseSigningInfo.mjs */ "../api-rest/dist/esm/utils/parseSigningInfo.mjs");
/* harmony import */ var _errors_validation_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../errors/validation.mjs */ "../api-rest/dist/esm/errors/validation.mjs");
/* harmony import */ var _utils_resolveApiUrl_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../utils/resolveApiUrl.mjs */ "../api-rest/dist/esm/utils/resolveApiUrl.mjs");
/* harmony import */ var _utils_logger_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../utils/logger.mjs */ "../api-rest/dist/esm/utils/logger.mjs");
/* harmony import */ var _utils_isIamAuthApplicable_mjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../utils/isIamAuthApplicable.mjs */ "../api-rest/dist/esm/utils/isIamAuthApplicable.mjs");
/* harmony import */ var _handler_mjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./handler.mjs */ "../api-rest/dist/esm/apis/common/handler.mjs");










// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
const publicHandler = (amplify, options, method) => (0,_utils_createCancellableOperation_mjs__WEBPACK_IMPORTED_MODULE_0__.createCancellableOperation)(async (abortSignal) => {
    const { apiName, options: apiOptions = {}, path: apiPath } = options;
    const url = (0,_utils_resolveApiUrl_mjs__WEBPACK_IMPORTED_MODULE_3__.resolveApiUrl)(amplify, apiName, apiPath, apiOptions?.queryParams);
    const libraryConfigHeaders = await amplify.libraryOptions?.API?.REST?.headers?.({
        apiName,
    });
    const { headers: invocationHeaders = {} } = apiOptions;
    const headers = {
        // custom headers from invocation options should precede library options
        ...libraryConfigHeaders,
        ...invocationHeaders,
    };
    const signingServiceInfo = (0,_utils_parseSigningInfo_mjs__WEBPACK_IMPORTED_MODULE_1__.parseSigningInfo)(url, {
        amplify,
        apiName,
    });
    _utils_logger_mjs__WEBPACK_IMPORTED_MODULE_4__.logger.debug(method, url, headers, `IAM signing options: ${JSON.stringify(signingServiceInfo)}`);
    return (0,_handler_mjs__WEBPACK_IMPORTED_MODULE_6__.transferHandler)(amplify, {
        ...apiOptions,
        url,
        method,
        headers,
        abortSignal,
    }, _utils_isIamAuthApplicable_mjs__WEBPACK_IMPORTED_MODULE_5__.isIamAuthApplicableForRest, signingServiceInfo);
});
const get = (amplify, input) => publicHandler(amplify, input, 'GET');
const post = (amplify, input) => publicHandler(amplify, input, 'POST');
const put = (amplify, input) => publicHandler(amplify, input, 'PUT');
const del = (amplify, input) => publicHandler(amplify, input, 'DELETE');
const head = (amplify, input) => publicHandler(amplify, input, 'HEAD');
const patch = (amplify, input) => publicHandler(amplify, input, 'PATCH');


//# sourceMappingURL=publicApis.mjs.map


/***/ }),

/***/ "../api-rest/dist/esm/apis/index.mjs":
/*!*******************************************!*\
  !*** ../api-rest/dist/esm/apis/index.mjs ***!
  \*******************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   del: () => (/* binding */ del),
/* harmony export */   get: () => (/* binding */ get),
/* harmony export */   head: () => (/* binding */ head),
/* harmony export */   patch: () => (/* binding */ patch),
/* harmony export */   post: () => (/* binding */ post),
/* harmony export */   put: () => (/* binding */ put)
/* harmony export */ });
/* harmony import */ var _aws_amplify_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @aws-amplify/core */ "@aws-amplify/core");
/* harmony import */ var _common_publicApis_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./common/publicApis.mjs */ "../api-rest/dist/esm/apis/common/publicApis.mjs");



// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
/**
 * GET HTTP request
 * @param {GetInput} input - Input for GET operation
 * @returns {GetOperation} Operation for GET request
 * @throws - {@link RestApiError}
 * @example
 * Send a GET request
 * ```js
 * import { get, isCancelError } from '@aws-amplify/api';
 *
 * const { body } = await get({
 *   apiName,
 *   path,
 *   options: {
 *     headers, // Optional, A map of custom header key/values
 *     body, // Optional, JSON object or FormData
 *     queryParams, // Optional, A map of query strings
 *   }
 * }).response;
 * const data = await body.json();
 * ```
 * @example
 * Cancel a GET request
 *
 * ```js
 * import { get, isCancelError } from '@aws-amplify/api';
 *
 * const { response, cancel } = get({apiName, path, options});
 * cancel(message);
 * try {
 *   await response;
 * } catch (e) {
 *   if (isCancelError(e)) {
 *    // handle request cancellation
 *   }
 *   //...
 * }
 * ```
 */
const get = (input) => (0,_common_publicApis_mjs__WEBPACK_IMPORTED_MODULE_1__.get)(_aws_amplify_core__WEBPACK_IMPORTED_MODULE_0__.Amplify, input);
/**
 * POST HTTP request
 * @param {PostInput} input - Input for POST operation
 * @returns {PostOperation} Operation for POST request
 * @throws - {@link RestApiError}
 * @example
 * Send a POST request
 * ```js
 * import { post, isCancelError } from '@aws-amplify/api';
 *
 * const { body } = await post({
 *   apiName,
 *   path,
 *   options: {
 *     headers, // Optional, A map of custom header key/values
 *     body, // Optional, JSON object or FormData
 *     queryParams, // Optional, A map of query strings
 *   }
 * }).response;
 * const data = await body.json();
 * ```
 * @example
 * Cancel a POST request
 *
 * ```js
 * import { post, isCancelError } from '@aws-amplify/api';
 *
 * const { response, cancel } = post({apiName, path, options});
 * cancel(message);
 * try {
 *   await response;
 * } catch (e) {
 *   if (isCancelError(e)) {
 *    // handle request cancellation
 *   }
 *   //...
 * }
 * ```
 */
const post = (input) => (0,_common_publicApis_mjs__WEBPACK_IMPORTED_MODULE_1__.post)(_aws_amplify_core__WEBPACK_IMPORTED_MODULE_0__.Amplify, input);
/**
 * PUT HTTP request
 * @param {PutInput} input - Input for PUT operation
 * @returns {PutOperation} Operation for PUT request
 * @throws - {@link RestApiError}
 * @example
 * Send a PUT request
 * ```js
 * import { put, isCancelError } from '@aws-amplify/api';
 *
 * const { body } = await put({
 *   apiName,
 *   path,
 *   options: {
 *     headers, // Optional, A map of custom header key/values
 *     body, // Optional, JSON object or FormData
 *     queryParams, // Optional, A map of query strings
 *   }
 * }).response;
 * const data = await body.json();
 * ```
 * @example
 * Cancel a PUT request
 * ```js
 * import { put, isCancelError } from '@aws-amplify/api';
 *
 * const { response, cancel } = put({apiName, path, options});
 * cancel(message);
 * try {
 *  await response;
 * } catch (e) {
 *   if (isCancelError(e)) {
 *     // handle request cancellation
 *   }
 * //...
 * }
 * ```
 */
const put = (input) => (0,_common_publicApis_mjs__WEBPACK_IMPORTED_MODULE_1__.put)(_aws_amplify_core__WEBPACK_IMPORTED_MODULE_0__.Amplify, input);
/**
 * DELETE HTTP request
 * @param {DeleteInput} input - Input for DELETE operation
 * @returns {DeleteOperation} Operation for DELETE request
 * @throws - {@link RestApiError}
 * @example
 * Send a DELETE request
 * ```js
 * import { del } from '@aws-amplify/api';
 *
 * const { statusCode } = await del({
 *   apiName,
 *   path,
 *   options: {
 *     headers, // Optional, A map of custom header key/values
 *     queryParams, // Optional, A map of query strings
 *   }
 * }).response;
 * ```
 */
const del = (input) => (0,_common_publicApis_mjs__WEBPACK_IMPORTED_MODULE_1__.del)(_aws_amplify_core__WEBPACK_IMPORTED_MODULE_0__.Amplify, input);
/**
 * HEAD HTTP request
 * @param {HeadInput} input - Input for HEAD operation
 * @returns {HeadOperation} Operation for HEAD request
 * @throws - {@link RestApiError}
 * @example
 * Send a HEAD request
 * ```js
 * import { head, isCancelError } from '@aws-amplify/api';
 *
 * const { headers, statusCode } = await head({
 *   apiName,
 *   path,
 *   options: {
 *     headers, // Optional, A map of custom header key/values
 *     queryParams, // Optional, A map of query strings
 *   }
 * }),response;
 * ```
 *
 */
const head = (input) => (0,_common_publicApis_mjs__WEBPACK_IMPORTED_MODULE_1__.head)(_aws_amplify_core__WEBPACK_IMPORTED_MODULE_0__.Amplify, input);
/**
 * PATCH HTTP request
 * @param {PatchInput} input - Input for PATCH operation
 * @returns {PatchOperation} Operation for PATCH request
 * @throws - {@link RestApiError}
 * @example
 * Send a PATCH request
 * ```js
 * import { patch } from '@aws-amplify/api';
 *
 * const { body } = await patch({
 *   apiName,
 *   path,
 *   options: {
 *     headers, // Optional, A map of custom header key/values
 *     body, // Optional, JSON object or FormData
 *     queryParams, // Optional, A map of query strings
 *   }
 * }).response;
 * const data = await body.json();
 * ```
 *
 * @example
 * Cancel a PATCH request
 * ```js
 * import { patch, isCancelError } from '@aws-amplify/api';
 *
 * const { response, cancel } = patch({apiName, path, options});
 * cancel(message);
 * try {
 *  await response;
 * } catch (e) {
 *  if (isCancelError(e)) {
 *   // handle request cancellation
 *  }
 * //...
 * }
 * ```
 */
const patch = (input) => (0,_common_publicApis_mjs__WEBPACK_IMPORTED_MODULE_1__.patch)(_aws_amplify_core__WEBPACK_IMPORTED_MODULE_0__.Amplify, input);


//# sourceMappingURL=index.mjs.map


/***/ }),

/***/ "../api-rest/dist/esm/errors/CanceledError.mjs":
/*!*****************************************************!*\
  !*** ../api-rest/dist/esm/errors/CanceledError.mjs ***!
  \*****************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CanceledError: () => (/* binding */ CanceledError),
/* harmony export */   isCancelError: () => (/* binding */ isCancelError)
/* harmony export */ });
/* harmony import */ var _RestApiError_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./RestApiError.mjs */ "../api-rest/dist/esm/errors/RestApiError.mjs");


// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
/**
 * Internal-only class for CanceledError.
 *
 * @internal
 */
class CanceledError extends _RestApiError_mjs__WEBPACK_IMPORTED_MODULE_0__.RestApiError {
    constructor(params = {}) {
        super({
            name: 'CanceledError',
            message: 'Request is canceled by user',
            ...params,
        });
        // TODO: Delete the following 2 lines after we change the build target to >= es2015
        this.constructor = CanceledError;
        Object.setPrototypeOf(this, CanceledError.prototype);
    }
}
/**
 * Check if an error is caused by user calling `cancel()` in REST API.
 *
 * @note This function works **ONLY** for errors thrown by REST API. For GraphQL APIs, use `client.isCancelError(error)`
 *   instead. `client` is generated from  `generateClient()` API from `aws-amplify/api`.
 *
 * @param {unknown} error The unknown exception to be checked.
 * @returns - A boolean indicating if the error was from an upload cancellation
 */
const isCancelError = (error) => !!error && error instanceof CanceledError;


//# sourceMappingURL=CanceledError.mjs.map


/***/ }),

/***/ "../api-rest/dist/esm/errors/RestApiError.mjs":
/*!****************************************************!*\
  !*** ../api-rest/dist/esm/errors/RestApiError.mjs ***!
  \****************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   RestApiError: () => (/* binding */ RestApiError)
/* harmony export */ });
/* harmony import */ var _aws_amplify_core_internals_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @aws-amplify/core/internals/utils */ "../core/dist/esm/errors/APIError.mjs");


// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
class RestApiError extends _aws_amplify_core_internals_utils__WEBPACK_IMPORTED_MODULE_0__.ApiError {
    constructor(params) {
        super(params);
        // TODO: Delete the following 2 lines after we change the build target to >= es2015
        this.constructor = RestApiError;
        Object.setPrototypeOf(this, RestApiError.prototype);
    }
}


//# sourceMappingURL=RestApiError.mjs.map


/***/ }),

/***/ "../api-rest/dist/esm/errors/assertValidatonError.mjs":
/*!************************************************************!*\
  !*** ../api-rest/dist/esm/errors/assertValidatonError.mjs ***!
  \************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   assertValidationError: () => (/* binding */ assertValidationError)
/* harmony export */ });
/* harmony import */ var _RestApiError_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./RestApiError.mjs */ "../api-rest/dist/esm/errors/RestApiError.mjs");
/* harmony import */ var _validation_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./validation.mjs */ "../api-rest/dist/esm/errors/validation.mjs");



// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
/**
 * @internal
 */
function assertValidationError(assertion, name) {
    const { message, recoverySuggestion } = _validation_mjs__WEBPACK_IMPORTED_MODULE_1__.validationErrorMap[name];
    if (!assertion) {
        throw new _RestApiError_mjs__WEBPACK_IMPORTED_MODULE_0__.RestApiError({ name, message, recoverySuggestion });
    }
}


//# sourceMappingURL=assertValidatonError.mjs.map


/***/ }),

/***/ "../api-rest/dist/esm/errors/validation.mjs":
/*!**************************************************!*\
  !*** ../api-rest/dist/esm/errors/validation.mjs ***!
  \**************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   RestApiValidationErrorCode: () => (/* binding */ RestApiValidationErrorCode),
/* harmony export */   validationErrorMap: () => (/* binding */ validationErrorMap)
/* harmony export */ });
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
var RestApiValidationErrorCode;
(function (RestApiValidationErrorCode) {
    RestApiValidationErrorCode["InvalidApiName"] = "InvalidApiName";
})(RestApiValidationErrorCode || (RestApiValidationErrorCode = {}));
const validationErrorMap = {
    [RestApiValidationErrorCode.InvalidApiName]: {
        message: 'API name is invalid.',
        recoverySuggestion: 'Check if the API name matches the one in your configuration or `aws-exports.js`',
    },
};


//# sourceMappingURL=validation.mjs.map


/***/ }),

/***/ "../api-rest/dist/esm/index.mjs":
/*!**************************************!*\
  !*** ../api-rest/dist/esm/index.mjs ***!
  \**************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   del: () => (/* reexport safe */ _apis_index_mjs__WEBPACK_IMPORTED_MODULE_1__.del),
/* harmony export */   get: () => (/* reexport safe */ _apis_index_mjs__WEBPACK_IMPORTED_MODULE_1__.get),
/* harmony export */   head: () => (/* reexport safe */ _apis_index_mjs__WEBPACK_IMPORTED_MODULE_1__.head),
/* harmony export */   isCancelError: () => (/* reexport safe */ _errors_CanceledError_mjs__WEBPACK_IMPORTED_MODULE_0__.isCancelError),
/* harmony export */   patch: () => (/* reexport safe */ _apis_index_mjs__WEBPACK_IMPORTED_MODULE_1__.patch),
/* harmony export */   post: () => (/* reexport safe */ _apis_index_mjs__WEBPACK_IMPORTED_MODULE_1__.post),
/* harmony export */   put: () => (/* reexport safe */ _apis_index_mjs__WEBPACK_IMPORTED_MODULE_1__.put)
/* harmony export */ });
/* harmony import */ var _errors_CanceledError_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./errors/CanceledError.mjs */ "../api-rest/dist/esm/errors/CanceledError.mjs");
/* harmony import */ var _apis_index_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./apis/index.mjs */ "../api-rest/dist/esm/apis/index.mjs");


//# sourceMappingURL=index.mjs.map


/***/ }),

/***/ "../api-rest/dist/esm/internals/index.mjs":
/*!************************************************!*\
  !*** ../api-rest/dist/esm/internals/index.mjs ***!
  \************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   cancel: () => (/* reexport safe */ _apis_common_internalPost_mjs__WEBPACK_IMPORTED_MODULE_0__.cancel),
/* harmony export */   post: () => (/* reexport safe */ _apis_common_internalPost_mjs__WEBPACK_IMPORTED_MODULE_0__.post),
/* harmony export */   updateRequestToBeCancellable: () => (/* reexport safe */ _apis_common_internalPost_mjs__WEBPACK_IMPORTED_MODULE_0__.updateRequestToBeCancellable)
/* harmony export */ });
/* harmony import */ var _apis_common_internalPost_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../apis/common/internalPost.mjs */ "../api-rest/dist/esm/apis/common/internalPost.mjs");

//# sourceMappingURL=index.mjs.map


/***/ }),

/***/ "../api-rest/dist/esm/utils/constants.mjs":
/*!************************************************!*\
  !*** ../api-rest/dist/esm/utils/constants.mjs ***!
  \************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   APIG_HOSTNAME_PATTERN: () => (/* binding */ APIG_HOSTNAME_PATTERN),
/* harmony export */   DEFAULT_APPSYNC_API_SERVICE: () => (/* binding */ DEFAULT_APPSYNC_API_SERVICE),
/* harmony export */   DEFAULT_IAM_SIGNING_REGION: () => (/* binding */ DEFAULT_IAM_SIGNING_REGION),
/* harmony export */   DEFAULT_REST_IAM_SIGNING_SERVICE: () => (/* binding */ DEFAULT_REST_IAM_SIGNING_SERVICE)
/* harmony export */ });
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
const DEFAULT_REST_IAM_SIGNING_SERVICE = 'execute-api';
const DEFAULT_APPSYNC_API_SERVICE = 'appsync-api';
const DEFAULT_IAM_SIGNING_REGION = 'us-east-1';
/**
 * The REST endpoints generated by API Gateway
 * @see {@link https://docs.aws.amazon.com/general/latest/gr/apigateway.html#apigateway_region_data_plane}
 */
const APIG_HOSTNAME_PATTERN = /^.+\.([a-z0-9-]+)\.([a-z0-9-]+)\.amazonaws\.com/;


//# sourceMappingURL=constants.mjs.map


/***/ }),

/***/ "../api-rest/dist/esm/utils/createCancellableOperation.mjs":
/*!*****************************************************************!*\
  !*** ../api-rest/dist/esm/utils/createCancellableOperation.mjs ***!
  \*****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createCancellableOperation: () => (/* binding */ createCancellableOperation)
/* harmony export */ });
/* harmony import */ var _errors_CanceledError_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../errors/CanceledError.mjs */ "../api-rest/dist/esm/errors/CanceledError.mjs");
/* harmony import */ var _errors_validation_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../errors/validation.mjs */ "../api-rest/dist/esm/errors/validation.mjs");
/* harmony import */ var _serviceError_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./serviceError.mjs */ "../api-rest/dist/esm/utils/serviceError.mjs");
/* harmony import */ var _logger_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./logger.mjs */ "../api-rest/dist/esm/utils/logger.mjs");






// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
/**
 * @internal
 */
function createCancellableOperation(handler, abortController) {
    const isInternalPost = (targetHandler) => !!abortController;
    // For creating a cancellable operation for public REST APIs, we need to create an AbortController
    // internally. Whereas for internal POST APIs, we need to accept in the AbortController from the
    // callers.
    const publicApisAbortController = new AbortController();
    const publicApisAbortSignal = publicApisAbortController.signal;
    const internalPostAbortSignal = abortController?.signal;
    let abortReason;
    const job = async () => {
        try {
            const response = await (isInternalPost(handler)
                ? handler()
                : handler(publicApisAbortSignal));
            if (response.statusCode >= 300) {
                throw await (0,_serviceError_mjs__WEBPACK_IMPORTED_MODULE_2__.parseRestApiServiceError)(response);
            }
            return response;
        }
        catch (error) {
            const abortSignal = internalPostAbortSignal ?? publicApisAbortSignal;
            const message = abortReason ?? abortSignal.reason;
            if (error.name === 'AbortError' || abortSignal?.aborted === true) {
                const canceledError = new _errors_CanceledError_mjs__WEBPACK_IMPORTED_MODULE_0__.CanceledError({
                    ...(message && { message }),
                    underlyingError: error,
                    recoverySuggestion: 'The API request was explicitly canceled. If this is not intended, validate if you called the `cancel()` function on the API request erroneously.',
                });
                _logger_mjs__WEBPACK_IMPORTED_MODULE_3__.logger.debug(error);
                throw canceledError;
            }
            _logger_mjs__WEBPACK_IMPORTED_MODULE_3__.logger.debug(error);
            throw error;
        }
    };
    if (isInternalPost()) {
        return job();
    }
    else {
        const cancel = (abortMessage) => {
            if (publicApisAbortSignal.aborted === true) {
                return;
            }
            publicApisAbortController.abort(abortMessage);
            // If abort reason is not supported, set a scoped reasons instead. The reason property inside an
            // AbortSignal is a readonly property and trying to set it would throw an error.
            if (abortMessage && publicApisAbortSignal.reason !== abortMessage) {
                abortReason = abortMessage;
            }
        };
        return { response: job(), cancel };
    }
}


//# sourceMappingURL=createCancellableOperation.mjs.map


/***/ }),

/***/ "../api-rest/dist/esm/utils/isIamAuthApplicable.mjs":
/*!**********************************************************!*\
  !*** ../api-rest/dist/esm/utils/isIamAuthApplicable.mjs ***!
  \**********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   isIamAuthApplicableForGraphQL: () => (/* binding */ isIamAuthApplicableForGraphQL),
/* harmony export */   isIamAuthApplicableForRest: () => (/* binding */ isIamAuthApplicableForRest)
/* harmony export */ });
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
/**
 * Determines if IAM authentication should be applied for a GraphQL request.
 *
 * This function checks the `headers` of the HTTP request to determine if IAM authentication
 * is applicable. IAM authentication is considered applicable if there is no `authorization`
 * header, no `x-api-key` header, and `signingServiceInfo` is provided.
 *
 * @param request - The HTTP request object containing headers.
 * @param signingServiceInfo - Optional signing service information,
 * including service and region.
 * @returns A boolean `true` if IAM authentication should be applied.
 *
 * @internal
 */
const isIamAuthApplicableForGraphQL = ({ headers }, signingServiceInfo) => !headers.authorization && !headers['x-api-key'] && !!signingServiceInfo;
/**
 * Determines if IAM authentication should be applied for a REST request.
 *
 * This function checks the `headers` of the HTTP request to determine if IAM authentication
 * is applicable. IAM authentication is considered applicable if there is no `authorization`
 * header and `signingServiceInfo` is provided.
 *
 * @param request - The HTTP request object containing headers.
 * @param signingServiceInfo - Optional signing service information,
 * including service and region.
 * @returns A boolean `true` if IAM authentication should be applied.
 *
 * @internal
 */
const isIamAuthApplicableForRest = ({ headers }, signingServiceInfo) => !headers.authorization && !!signingServiceInfo;


//# sourceMappingURL=isIamAuthApplicable.mjs.map


/***/ }),

/***/ "../api-rest/dist/esm/utils/logger.mjs":
/*!*********************************************!*\
  !*** ../api-rest/dist/esm/utils/logger.mjs ***!
  \*********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   logger: () => (/* binding */ logger)
/* harmony export */ });
/* harmony import */ var _aws_amplify_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @aws-amplify/core */ "@aws-amplify/core");


// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
const logger = new _aws_amplify_core__WEBPACK_IMPORTED_MODULE_0__.ConsoleLogger('RestApis');


//# sourceMappingURL=logger.mjs.map


/***/ }),

/***/ "../api-rest/dist/esm/utils/parseSigningInfo.mjs":
/*!*******************************************************!*\
  !*** ../api-rest/dist/esm/utils/parseSigningInfo.mjs ***!
  \*******************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   parseSigningInfo: () => (/* binding */ parseSigningInfo)
/* harmony export */ });
/* harmony import */ var _constants_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants.mjs */ "../api-rest/dist/esm/utils/constants.mjs");


// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
/**
 * Infer the signing service and region from the given URL, and for REST API only, from the Amplify configuration.
 * It supports raw API Gateway endpoint and AppSync endpoint.
 *
 * @internal
 */
const parseSigningInfo = (url, restApiOptions) => {
    const { service: signingService = _constants_mjs__WEBPACK_IMPORTED_MODULE_0__.DEFAULT_REST_IAM_SIGNING_SERVICE, region: signingRegion = _constants_mjs__WEBPACK_IMPORTED_MODULE_0__.DEFAULT_IAM_SIGNING_REGION, } = restApiOptions?.amplify.getConfig()?.API?.REST?.[restApiOptions?.apiName] ??
        {};
    const { hostname } = url;
    const [, service, region] = _constants_mjs__WEBPACK_IMPORTED_MODULE_0__.APIG_HOSTNAME_PATTERN.exec(hostname) ?? [];
    if (service === _constants_mjs__WEBPACK_IMPORTED_MODULE_0__.DEFAULT_REST_IAM_SIGNING_SERVICE) {
        // The configured endpoint is an API Gateway endpoint
        // @see: https://docs.aws.amazon.com/apigateway/latest/developerguide/how-to-call-api.html
        return {
            service,
            region: region ?? signingRegion,
        };
    }
    else if (service === 'appsync-api') {
        // AppSync endpoint is internally supported because GraphQL operation will send request using POST handler.
        // example: https://xxxx.appsync-api.us-east-1.amazonaws.com/graphql
        return {
            service: 'appsync',
            region: region ?? signingRegion,
        };
    }
    else {
        return {
            service: signingService,
            region: signingRegion,
        };
    }
};


//# sourceMappingURL=parseSigningInfo.mjs.map


/***/ }),

/***/ "../api-rest/dist/esm/utils/resolveApiUrl.mjs":
/*!****************************************************!*\
  !*** ../api-rest/dist/esm/utils/resolveApiUrl.mjs ***!
  \****************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   resolveApiUrl: () => (/* binding */ resolveApiUrl)
/* harmony export */ });
/* harmony import */ var _aws_amplify_core_internals_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @aws-amplify/core/internals/utils */ "../core/dist/esm/utils/amplifyUrl/index.mjs");
/* harmony import */ var _errors_RestApiError_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../errors/RestApiError.mjs */ "../api-rest/dist/esm/errors/RestApiError.mjs");
/* harmony import */ var _errors_assertValidatonError_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../errors/assertValidatonError.mjs */ "../api-rest/dist/esm/errors/assertValidatonError.mjs");
/* harmony import */ var _errors_validation_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../errors/validation.mjs */ "../api-rest/dist/esm/errors/validation.mjs");





// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
/**
 * Resolve the REST API request URL by:
 * 1. Loading the REST API endpoint from the Amplify configuration with corresponding API name.
 * 2. Appending the path to the endpoint.
 * 3. Merge the query parameters from path and the queryParameter argument which is taken from the public REST API
 *   options.
 * 4. Validating the resulting URL string.
 *
 * @internal
 */
const resolveApiUrl = (amplify, apiName, path, queryParams) => {
    const urlStr = amplify.getConfig()?.API?.REST?.[apiName]?.endpoint;
    (0,_errors_assertValidatonError_mjs__WEBPACK_IMPORTED_MODULE_1__.assertValidationError)(!!urlStr, _errors_validation_mjs__WEBPACK_IMPORTED_MODULE_2__.RestApiValidationErrorCode.InvalidApiName);
    try {
        const url = new _aws_amplify_core_internals_utils__WEBPACK_IMPORTED_MODULE_3__.AmplifyUrl(urlStr + path);
        if (queryParams) {
            const mergedQueryParams = new _aws_amplify_core_internals_utils__WEBPACK_IMPORTED_MODULE_3__.AmplifyUrlSearchParams(url.searchParams);
            Object.entries(queryParams).forEach(([key, value]) => {
                mergedQueryParams.set(key, value);
            });
            url.search = new _aws_amplify_core_internals_utils__WEBPACK_IMPORTED_MODULE_3__.AmplifyUrlSearchParams(mergedQueryParams).toString();
        }
        return url;
    }
    catch (error) {
        throw new _errors_RestApiError_mjs__WEBPACK_IMPORTED_MODULE_0__.RestApiError({
            name: _errors_validation_mjs__WEBPACK_IMPORTED_MODULE_2__.RestApiValidationErrorCode.InvalidApiName,
            ..._errors_validation_mjs__WEBPACK_IMPORTED_MODULE_2__.validationErrorMap[_errors_validation_mjs__WEBPACK_IMPORTED_MODULE_2__.RestApiValidationErrorCode.InvalidApiName],
            recoverySuggestion: `Please make sure the REST endpoint URL is a valid URL string. Got ${urlStr}`,
        });
    }
};


//# sourceMappingURL=resolveApiUrl.mjs.map


/***/ }),

/***/ "../api-rest/dist/esm/utils/resolveHeaders.mjs":
/*!*****************************************************!*\
  !*** ../api-rest/dist/esm/utils/resolveHeaders.mjs ***!
  \*****************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   resolveHeaders: () => (/* binding */ resolveHeaders)
/* harmony export */ });
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
const resolveHeaders = (headers, body) => {
    const normalizedHeaders = {};
    for (const key in headers) {
        normalizedHeaders[key.toLowerCase()] = headers[key];
    }
    if (body) {
        normalizedHeaders['content-type'] = 'application/json; charset=UTF-8';
        if (body instanceof FormData) {
            /**
             * If body is a FormData we should not allow setting content-type.
             * It's because runtime HTTP handlers(xhr, fetch, undici, node-fetch,
             * etc.) will modify the content-type value when setting multipart
             * boundary.
             */
            delete normalizedHeaders['content-type'];
        }
    }
    return normalizedHeaders;
};


//# sourceMappingURL=resolveHeaders.mjs.map


/***/ }),

/***/ "../api-rest/dist/esm/utils/serviceError.mjs":
/*!***************************************************!*\
  !*** ../api-rest/dist/esm/utils/serviceError.mjs ***!
  \***************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   parseRestApiServiceError: () => (/* binding */ parseRestApiServiceError)
/* harmony export */ });
/* harmony import */ var _aws_amplify_core_internals_aws_client_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @aws-amplify/core/internals/aws-client-utils */ "../core/dist/esm/clients/serde/json.mjs");
/* harmony import */ var _errors_RestApiError_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../errors/RestApiError.mjs */ "../api-rest/dist/esm/errors/RestApiError.mjs");
/* harmony import */ var _errors_validation_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../errors/validation.mjs */ "../api-rest/dist/esm/errors/validation.mjs");




/**
 * Parses both AWS and non-AWS error responses coming from the users' backend code.
 * * AWS errors generated by the AWS services(e.g. API Gateway, Bedrock). They can be Signature errors,
 *   ClockSkew errors, etc. These responses will be parsed to errors with proper name and message from the AWS
 *   services.
 * * non-AWS errors thrown by the user code. They can contain any headers or body. Users need to access the
 *   error.response to get the headers and body and parse them accordingly. The JS error name and message will
 *   be `UnknownError` and `Unknown error` respectively.
 */
const parseRestApiServiceError = async (response) => {
    if (!response) {
        // Response is not considered an error.
        return;
    }
    const parsedAwsError = await (0,_aws_amplify_core_internals_aws_client_utils__WEBPACK_IMPORTED_MODULE_2__.parseJsonError)(stubErrorResponse(response));
    if (!parsedAwsError) ;
    else {
        const bodyText = await response.body?.text();
        return buildRestApiError(parsedAwsError, {
            statusCode: response.statusCode,
            headers: response.headers,
            body: bodyText,
        });
    }
};
/**
 * The response object needs to be stub here because the parseAwsJsonError assumes the response body to be valid JSON.
 * Although this is true for AWS services, it is not true for responses from user's code. Once the response body is
 * unwrapped as JSON(and fail), it cannot be read as text again. Therefore, we need to stub the response body here to
 * make sure we can read the error response body as a JSON, and may fall back to read as text if it is not a valid JSON.
 */
const stubErrorResponse = (response) => {
    let bodyTextPromise;
    const bodyProxy = new Proxy(response.body, {
        get(target, prop, receiver) {
            if (prop === 'json') {
                // For potential AWS errors, error parser will try to parse the body as JSON first.
                return async () => {
                    if (!bodyTextPromise) {
                        bodyTextPromise = target.text();
                    }
                    try {
                        return JSON.parse(await bodyTextPromise);
                    }
                    catch (error) {
                        // If response body is not a valid JSON, we stub it to be an empty object and eventually parsed
                        // as an unknown error
                        return {};
                    }
                };
            }
            else if (prop === 'text') {
                // For non-AWS errors, users can access the body as a string as a fallback.
                return async () => {
                    if (!bodyTextPromise) {
                        bodyTextPromise = target.text();
                    }
                    return bodyTextPromise;
                };
            }
            else {
                return Reflect.get(target, prop, receiver);
            }
        },
    });
    const responseProxy = new Proxy(response, {
        get(target, prop, receiver) {
            if (prop === 'body') {
                return bodyProxy;
            }
            else {
                return Reflect.get(target, prop, receiver);
            }
        },
    });
    return responseProxy;
};
/**
 * Utility to create a new RestApiError from a service error.
 */
const buildRestApiError = (error, response) => {
    const restApiError = new _errors_RestApiError_mjs__WEBPACK_IMPORTED_MODULE_0__.RestApiError({
        name: error?.name,
        message: error.message,
        underlyingError: error,
        response,
    });
    // $metadata is only required for backwards compatibility.
    return Object.assign(restApiError, { $metadata: error.$metadata });
};


//# sourceMappingURL=serviceError.mjs.map


/***/ }),

/***/ "../core/dist/esm/Hub/index.mjs":
/*!**************************************!*\
  !*** ../core/dist/esm/Hub/index.mjs ***!
  \**************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AMPLIFY_SYMBOL: () => (/* binding */ AMPLIFY_SYMBOL),
/* harmony export */   Hub: () => (/* binding */ Hub),
/* harmony export */   HubClass: () => (/* binding */ HubClass),
/* harmony export */   HubInternal: () => (/* binding */ HubInternal)
/* harmony export */ });
/* harmony import */ var _Logger_ConsoleLogger_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Logger/ConsoleLogger.mjs */ "../core/dist/esm/Logger/ConsoleLogger.mjs");
/* harmony import */ var _constants_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../constants.mjs */ "../core/dist/esm/constants.mjs");
/* harmony import */ var _errors_AmplifyError_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../errors/AmplifyError.mjs */ "../core/dist/esm/errors/AmplifyError.mjs");






// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
const AMPLIFY_SYMBOL = (typeof Symbol !== 'undefined'
    ? Symbol('amplify_default')
    : '@@amplify_default');
const logger = new _Logger_ConsoleLogger_mjs__WEBPACK_IMPORTED_MODULE_0__.ConsoleLogger('Hub');
class HubClass {
    constructor(name) {
        this.listeners = new Map();
        this.protectedChannels = [
            'core',
            'auth',
            'api',
            'analytics',
            'interactions',
            'pubsub',
            'storage',
            'ui',
            'xr',
        ];
        this.name = name;
    }
    /**
     * Used internally to remove a Hub listener.
     *
     * @remarks
     * This private method is for internal use only. Instead of calling Hub.remove, call the result of Hub.listen.
     */
    _remove(channel, listener) {
        const holder = this.listeners.get(channel);
        if (!holder) {
            logger.warn(`No listeners for ${channel}`);
            return;
        }
        this.listeners.set(channel, [
            ...holder.filter(({ callback }) => callback !== listener),
        ]);
    }
    dispatch(channel, payload, source, ampSymbol) {
        if (typeof channel === 'string' &&
            this.protectedChannels.indexOf(channel) > -1) {
            const hasAccess = ampSymbol === AMPLIFY_SYMBOL;
            if (!hasAccess) {
                logger.warn(`WARNING: ${channel} is protected and dispatching on it can have unintended consequences`);
            }
        }
        const capsule = {
            channel,
            payload: { ...payload },
            source,
            patternInfo: [],
        };
        try {
            this._toListeners(capsule);
        }
        catch (e) {
            logger.error(e);
        }
    }
    listen(channel, callback, listenerName = 'noname') {
        let cb;
        if (typeof callback !== 'function') {
            throw new _errors_AmplifyError_mjs__WEBPACK_IMPORTED_MODULE_1__.AmplifyError({
                name: _constants_mjs__WEBPACK_IMPORTED_MODULE_2__.NO_HUBCALLBACK_PROVIDED_EXCEPTION,
                message: 'No callback supplied to Hub',
            });
        }
        else {
            // Needs to be casted as a more generic type
            cb = callback;
        }
        let holder = this.listeners.get(channel);
        if (!holder) {
            holder = [];
            this.listeners.set(channel, holder);
        }
        holder.push({
            name: listenerName,
            callback: cb,
        });
        return () => {
            this._remove(channel, cb);
        };
    }
    _toListeners(capsule) {
        const { channel, payload } = capsule;
        const holder = this.listeners.get(channel);
        if (holder) {
            holder.forEach(listener => {
                logger.debug(`Dispatching to ${channel} with `, payload);
                try {
                    listener.callback(capsule);
                }
                catch (e) {
                    logger.error(e);
                }
            });
        }
    }
}
/* We export a __default__ instance of HubClass to use it as a
pseudo Singleton for the main messaging bus, however you can still create
your own instance of HubClass() for a separate "private bus" of events. */
const Hub = new HubClass('__default__');
/**
 * @internal
 *
 * Internal hub used for core Amplify functionality. Not intended for use outside of Amplify.
 *
 */
const HubInternal = new HubClass('internal-hub');


//# sourceMappingURL=index.mjs.map


/***/ }),

/***/ "../core/dist/esm/Logger/ConsoleLogger.mjs":
/*!*************************************************!*\
  !*** ../core/dist/esm/Logger/ConsoleLogger.mjs ***!
  \*************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ConsoleLogger: () => (/* binding */ ConsoleLogger)
/* harmony export */ });
/* harmony import */ var _constants_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../constants.mjs */ "../core/dist/esm/constants.mjs");
/* harmony import */ var _types_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./types.mjs */ "../core/dist/esm/Logger/types.mjs");



// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
const LOG_LEVELS = {
    VERBOSE: 1,
    DEBUG: 2,
    INFO: 3,
    WARN: 4,
    ERROR: 5,
    NONE: 6,
};
/**
 * Write logs
 * @class Logger
 */
class ConsoleLogger {
    /**
     * @constructor
     * @param {string} name - Name of the logger
     */
    constructor(name, level = _types_mjs__WEBPACK_IMPORTED_MODULE_0__.LogType.WARN) {
        this.name = name;
        this.level = level;
        this._pluggables = [];
    }
    _padding(n) {
        return n < 10 ? '0' + n : '' + n;
    }
    _ts() {
        const dt = new Date();
        return ([this._padding(dt.getMinutes()), this._padding(dt.getSeconds())].join(':') +
            '.' +
            dt.getMilliseconds());
    }
    configure(config) {
        if (!config)
            return this._config;
        this._config = config;
        return this._config;
    }
    /**
     * Write log
     * @method
     * @memeberof Logger
     * @param {LogType|string} type - log type, default INFO
     * @param {string|object} msg - Logging message or object
     */
    _log(type, ...msg) {
        let loggerLevelName = this.level;
        if (ConsoleLogger.LOG_LEVEL) {
            loggerLevelName = ConsoleLogger.LOG_LEVEL;
        }
        if (typeof window !== 'undefined' && window.LOG_LEVEL) {
            loggerLevelName = window.LOG_LEVEL;
        }
        const loggerLevel = LOG_LEVELS[loggerLevelName];
        const typeLevel = LOG_LEVELS[type];
        if (!(typeLevel >= loggerLevel)) {
            // Do nothing if type is not greater than or equal to logger level (handle undefined)
            return;
        }
        let log = console.log.bind(console);
        if (type === _types_mjs__WEBPACK_IMPORTED_MODULE_0__.LogType.ERROR && console.error) {
            log = console.error.bind(console);
        }
        if (type === _types_mjs__WEBPACK_IMPORTED_MODULE_0__.LogType.WARN && console.warn) {
            log = console.warn.bind(console);
        }
        if (ConsoleLogger.BIND_ALL_LOG_LEVELS) {
            if (type === _types_mjs__WEBPACK_IMPORTED_MODULE_0__.LogType.INFO && console.info) {
                log = console.info.bind(console);
            }
            if (type === _types_mjs__WEBPACK_IMPORTED_MODULE_0__.LogType.DEBUG && console.debug) {
                log = console.debug.bind(console);
            }
        }
        const prefix = `[${type}] ${this._ts()} ${this.name}`;
        let message = '';
        if (msg.length === 1 && typeof msg[0] === 'string') {
            message = `${prefix} - ${msg[0]}`;
            log(message);
        }
        else if (msg.length === 1) {
            message = `${prefix} ${msg[0]}`;
            log(prefix, msg[0]);
        }
        else if (typeof msg[0] === 'string') {
            let obj = msg.slice(1);
            if (obj.length === 1) {
                obj = obj[0];
            }
            message = `${prefix} - ${msg[0]} ${obj}`;
            log(`${prefix} - ${msg[0]}`, obj);
        }
        else {
            message = `${prefix} ${msg}`;
            log(prefix, msg);
        }
        for (const plugin of this._pluggables) {
            const logEvent = { message, timestamp: Date.now() };
            plugin.pushLogs([logEvent]);
        }
    }
    /**
     * Write General log. Default to INFO
     * @method
     * @memeberof Logger
     * @param {string|object} msg - Logging message or object
     */
    log(...msg) {
        this._log(_types_mjs__WEBPACK_IMPORTED_MODULE_0__.LogType.INFO, ...msg);
    }
    /**
     * Write INFO log
     * @method
     * @memeberof Logger
     * @param {string|object} msg - Logging message or object
     */
    info(...msg) {
        this._log(_types_mjs__WEBPACK_IMPORTED_MODULE_0__.LogType.INFO, ...msg);
    }
    /**
     * Write WARN log
     * @method
     * @memeberof Logger
     * @param {string|object} msg - Logging message or object
     */
    warn(...msg) {
        this._log(_types_mjs__WEBPACK_IMPORTED_MODULE_0__.LogType.WARN, ...msg);
    }
    /**
     * Write ERROR log
     * @method
     * @memeberof Logger
     * @param {string|object} msg - Logging message or object
     */
    error(...msg) {
        this._log(_types_mjs__WEBPACK_IMPORTED_MODULE_0__.LogType.ERROR, ...msg);
    }
    /**
     * Write DEBUG log
     * @method
     * @memeberof Logger
     * @param {string|object} msg - Logging message or object
     */
    debug(...msg) {
        this._log(_types_mjs__WEBPACK_IMPORTED_MODULE_0__.LogType.DEBUG, ...msg);
    }
    /**
     * Write VERBOSE log
     * @method
     * @memeberof Logger
     * @param {string|object} msg - Logging message or object
     */
    verbose(...msg) {
        this._log(_types_mjs__WEBPACK_IMPORTED_MODULE_0__.LogType.VERBOSE, ...msg);
    }
    addPluggable(pluggable) {
        if (pluggable && pluggable.getCategoryName() === _constants_mjs__WEBPACK_IMPORTED_MODULE_1__.AWS_CLOUDWATCH_CATEGORY) {
            this._pluggables.push(pluggable);
            pluggable.configure(this._config);
        }
    }
    listPluggables() {
        return this._pluggables;
    }
}
ConsoleLogger.LOG_LEVEL = null;
ConsoleLogger.BIND_ALL_LOG_LEVELS = false;


//# sourceMappingURL=ConsoleLogger.mjs.map


/***/ }),

/***/ "../core/dist/esm/Logger/types.mjs":
/*!*****************************************!*\
  !*** ../core/dist/esm/Logger/types.mjs ***!
  \*****************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   LogType: () => (/* binding */ LogType)
/* harmony export */ });
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
var LogType;
(function (LogType) {
    LogType["DEBUG"] = "DEBUG";
    LogType["ERROR"] = "ERROR";
    LogType["INFO"] = "INFO";
    LogType["WARN"] = "WARN";
    LogType["VERBOSE"] = "VERBOSE";
    LogType["NONE"] = "NONE";
})(LogType || (LogType = {}));


//# sourceMappingURL=types.mjs.map


/***/ }),

/***/ "../core/dist/esm/Platform/customUserAgent.mjs":
/*!*****************************************************!*\
  !*** ../core/dist/esm/Platform/customUserAgent.mjs ***!
  \*****************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getCustomUserAgent: () => (/* binding */ getCustomUserAgent),
/* harmony export */   setCustomUserAgent: () => (/* binding */ setCustomUserAgent)
/* harmony export */ });
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
// Maintains custom user-agent state set by external consumers.
const customUserAgentState = {};
/**
 * Sets custom user agent state which will be appended to applicable requests. Returns a function that can be used to
 * clean up any custom state set with this API.
 *
 * @note
 * This API operates globally. Calling this API multiple times will result in the most recently set values for a
 * particular API being used.
 *
 * @note
 * This utility IS NOT compatible with SSR.
 *
 * @param input - SetCustomUserAgentInput that defines custom state to apply to the specified APIs.
 */
const setCustomUserAgent = (input) => {
    // Save custom user-agent state & increment reference counter
    // TODO Remove `any` when we upgrade to TypeScript 5.2, see: https://github.com/microsoft/TypeScript/issues/44373
    customUserAgentState[input.category] = input.apis.reduce((acc, api) => ({
        ...acc,
        [api]: {
            refCount: acc[api]?.refCount ? acc[api].refCount + 1 : 1,
            additionalDetails: input.additionalDetails,
        },
    }), customUserAgentState[input.category] ?? {});
    // Callback that cleans up state for APIs recorded by this call
    let cleanUpCallbackCalled = false;
    const cleanUpCallback = () => {
        // Only allow the cleanup callback to be called once
        if (cleanUpCallbackCalled) {
            return;
        }
        cleanUpCallbackCalled = true;
        input.apis.forEach(api => {
            const apiRefCount = customUserAgentState[input.category][api].refCount;
            if (apiRefCount > 1) {
                customUserAgentState[input.category][api].refCount = apiRefCount - 1;
            }
            else {
                delete customUserAgentState[input.category][api];
                // Clean up category if no more APIs set
                if (!Object.keys(customUserAgentState[input.category]).length) {
                    delete customUserAgentState[input.category];
                }
            }
        });
    };
    return cleanUpCallback;
};
const getCustomUserAgent = (category, api) => customUserAgentState[category]?.[api]?.additionalDetails;


//# sourceMappingURL=customUserAgent.mjs.map


/***/ }),

/***/ "../core/dist/esm/Platform/detectFramework.mjs":
/*!*****************************************************!*\
  !*** ../core/dist/esm/Platform/detectFramework.mjs ***!
  \*****************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   clearCache: () => (/* binding */ clearCache),
/* harmony export */   detectFramework: () => (/* binding */ detectFramework),
/* harmony export */   frameworkChangeObservers: () => (/* binding */ frameworkChangeObservers),
/* harmony export */   observeFrameworkChanges: () => (/* binding */ observeFrameworkChanges)
/* harmony export */ });
/* harmony import */ var _types_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./types.mjs */ "../core/dist/esm/Platform/types.mjs");
/* harmony import */ var _detection_index_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./detection/index.mjs */ "../core/dist/esm/Platform/detection/index.mjs");



// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
// We want to cache detection since the framework won't change
let frameworkCache;
const frameworkChangeObservers = [];
// Setup the detection reset tracking / timeout delays
let resetTriggered = false;
const SSR_RESET_TIMEOUT = 10; // ms
const WEB_RESET_TIMEOUT = 10; // ms
const PRIME_FRAMEWORK_DELAY = 1000; // ms
const detectFramework = () => {
    if (!frameworkCache) {
        frameworkCache = (0,_detection_index_mjs__WEBPACK_IMPORTED_MODULE_0__.detect)();
        if (resetTriggered) {
            // The final run of detectFramework:
            // Starting from this point, the `frameworkCache` becomes "final".
            // So we don't need to notify the observers again so the observer
            // can be removed after the final notice.
            while (frameworkChangeObservers.length) {
                frameworkChangeObservers.pop()?.();
            }
        }
        else {
            // The first run of detectFramework:
            // Every time we update the cache, call each observer function
            frameworkChangeObservers.forEach(fcn => {
                fcn();
            });
        }
        // Retry once for either Unknown type after a delay (explained below)
        resetTimeout(_types_mjs__WEBPACK_IMPORTED_MODULE_1__.Framework.ServerSideUnknown, SSR_RESET_TIMEOUT);
        resetTimeout(_types_mjs__WEBPACK_IMPORTED_MODULE_1__.Framework.WebUnknown, WEB_RESET_TIMEOUT);
    }
    return frameworkCache;
};
/**
 * @internal Setup observer callback that will be called everytime the framework changes
 */
const observeFrameworkChanges = (fcn) => {
    // When the `frameworkCache` won't be updated again, we ignore all incoming
    // observers.
    if (resetTriggered) {
        return;
    }
    frameworkChangeObservers.push(fcn);
};
function clearCache() {
    frameworkCache = undefined;
}
// For a framework type and a delay amount, setup the event to re-detect
//   During the runtime boot, it is possible that framework detection will
//   be triggered before the framework has made modifications to the
//   global/window/etc needed for detection. When no framework is detected
//   we will reset and try again to ensure we don't use a cached
//   non-framework detection result for all requests.
function resetTimeout(framework, delay) {
    if (frameworkCache === framework && !resetTriggered) {
        setTimeout(() => {
            clearCache();
            resetTriggered = true;
            setTimeout(detectFramework, PRIME_FRAMEWORK_DELAY);
        }, delay);
    }
}


//# sourceMappingURL=detectFramework.mjs.map


/***/ }),

/***/ "../core/dist/esm/Platform/detection/Angular.mjs":
/*!*******************************************************!*\
  !*** ../core/dist/esm/Platform/detection/Angular.mjs ***!
  \*******************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   angularSSRDetect: () => (/* binding */ angularSSRDetect),
/* harmony export */   angularWebDetect: () => (/* binding */ angularWebDetect)
/* harmony export */ });
/* harmony import */ var _helpers_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./helpers.mjs */ "../core/dist/esm/Platform/detection/helpers.mjs");


// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
// Tested with @angular/core 16.0.0
function angularWebDetect() {
    const angularVersionSetInDocument = Boolean((0,_helpers_mjs__WEBPACK_IMPORTED_MODULE_0__.documentExists)() && document.querySelector('[ng-version]'));
    const angularContentSetInWindow = Boolean((0,_helpers_mjs__WEBPACK_IMPORTED_MODULE_0__.windowExists)() && typeof window.ng !== 'undefined');
    return angularVersionSetInDocument || angularContentSetInWindow;
}
function angularSSRDetect() {
    return (((0,_helpers_mjs__WEBPACK_IMPORTED_MODULE_0__.processExists)() &&
        typeof process.env === 'object' &&
        process.env.npm_lifecycle_script?.startsWith('ng ')) ||
        false);
}


//# sourceMappingURL=Angular.mjs.map


/***/ }),

/***/ "../core/dist/esm/Platform/detection/Expo.mjs":
/*!****************************************************!*\
  !*** ../core/dist/esm/Platform/detection/Expo.mjs ***!
  \****************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   expoDetect: () => (/* binding */ expoDetect)
/* harmony export */ });
/* harmony import */ var _helpers_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./helpers.mjs */ "../core/dist/esm/Platform/detection/helpers.mjs");


// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
// Tested with expo 48 / react-native 0.71.3
function expoDetect() {
    return (0,_helpers_mjs__WEBPACK_IMPORTED_MODULE_0__.globalExists)() && typeof global.expo !== 'undefined';
}


//# sourceMappingURL=Expo.mjs.map


/***/ }),

/***/ "../core/dist/esm/Platform/detection/Next.mjs":
/*!****************************************************!*\
  !*** ../core/dist/esm/Platform/detection/Next.mjs ***!
  \****************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   nextSSRDetect: () => (/* binding */ nextSSRDetect),
/* harmony export */   nextWebDetect: () => (/* binding */ nextWebDetect)
/* harmony export */ });
/* harmony import */ var _helpers_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./helpers.mjs */ "../core/dist/esm/Platform/detection/helpers.mjs");


// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
// Tested with next 13.4 / react 18.2
function nextWebDetect() {
    return ((0,_helpers_mjs__WEBPACK_IMPORTED_MODULE_0__.windowExists)() &&
        window.next &&
        typeof window.next === 'object');
}
function nextSSRDetect() {
    return ((0,_helpers_mjs__WEBPACK_IMPORTED_MODULE_0__.globalExists)() &&
        ((0,_helpers_mjs__WEBPACK_IMPORTED_MODULE_0__.keyPrefixMatch)(global, '__next') || (0,_helpers_mjs__WEBPACK_IMPORTED_MODULE_0__.keyPrefixMatch)(global, '__NEXT')));
}


//# sourceMappingURL=Next.mjs.map


/***/ }),

/***/ "../core/dist/esm/Platform/detection/Nuxt.mjs":
/*!****************************************************!*\
  !*** ../core/dist/esm/Platform/detection/Nuxt.mjs ***!
  \****************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   nuxtSSRDetect: () => (/* binding */ nuxtSSRDetect),
/* harmony export */   nuxtWebDetect: () => (/* binding */ nuxtWebDetect)
/* harmony export */ });
/* harmony import */ var _helpers_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./helpers.mjs */ "../core/dist/esm/Platform/detection/helpers.mjs");


// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
// Tested with nuxt 2.15 / vue 2.7
function nuxtWebDetect() {
    return ((0,_helpers_mjs__WEBPACK_IMPORTED_MODULE_0__.windowExists)() &&
        (window.__NUXT__ !== undefined ||
            window.$nuxt !== undefined));
}
function nuxtSSRDetect() {
    return ((0,_helpers_mjs__WEBPACK_IMPORTED_MODULE_0__.globalExists)() && typeof global.__NUXT_PATHS__ !== 'undefined');
}


//# sourceMappingURL=Nuxt.mjs.map


/***/ }),

/***/ "../core/dist/esm/Platform/detection/React.mjs":
/*!*****************************************************!*\
  !*** ../core/dist/esm/Platform/detection/React.mjs ***!
  \*****************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   reactSSRDetect: () => (/* binding */ reactSSRDetect),
/* harmony export */   reactWebDetect: () => (/* binding */ reactWebDetect)
/* harmony export */ });
/* harmony import */ var _helpers_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./helpers.mjs */ "../core/dist/esm/Platform/detection/helpers.mjs");


// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
// Tested with react 18.2 - built using Vite
function reactWebDetect() {
    const elementKeyPrefixedWithReact = (key) => {
        return key.startsWith('_react') || key.startsWith('__react');
    };
    const elementIsReactEnabled = (element) => {
        return Object.keys(element).find(elementKeyPrefixedWithReact);
    };
    const allElementsWithId = () => Array.from(document.querySelectorAll('[id]'));
    return (0,_helpers_mjs__WEBPACK_IMPORTED_MODULE_0__.documentExists)() && allElementsWithId().some(elementIsReactEnabled);
}
function reactSSRDetect() {
    return ((0,_helpers_mjs__WEBPACK_IMPORTED_MODULE_0__.processExists)() &&
        typeof process.env !== 'undefined' &&
        !!Object.keys(process.env).find(key => key.includes('react')));
}
// use the some


//# sourceMappingURL=React.mjs.map


/***/ }),

/***/ "../core/dist/esm/Platform/detection/ReactNative.mjs":
/*!***********************************************************!*\
  !*** ../core/dist/esm/Platform/detection/ReactNative.mjs ***!
  \***********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   reactNativeDetect: () => (/* binding */ reactNativeDetect)
/* harmony export */ });
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
// Tested with react-native 0.17.7
function reactNativeDetect() {
    return (typeof navigator !== 'undefined' &&
        typeof navigator.product !== 'undefined' &&
        navigator.product === 'ReactNative');
}


//# sourceMappingURL=ReactNative.mjs.map


/***/ }),

/***/ "../core/dist/esm/Platform/detection/Svelte.mjs":
/*!******************************************************!*\
  !*** ../core/dist/esm/Platform/detection/Svelte.mjs ***!
  \******************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   svelteSSRDetect: () => (/* binding */ svelteSSRDetect),
/* harmony export */   svelteWebDetect: () => (/* binding */ svelteWebDetect)
/* harmony export */ });
/* harmony import */ var _helpers_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./helpers.mjs */ "../core/dist/esm/Platform/detection/helpers.mjs");


// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
// Tested with svelte 3.59
function svelteWebDetect() {
    return (0,_helpers_mjs__WEBPACK_IMPORTED_MODULE_0__.windowExists)() && (0,_helpers_mjs__WEBPACK_IMPORTED_MODULE_0__.keyPrefixMatch)(window, '__SVELTE');
}
function svelteSSRDetect() {
    return ((0,_helpers_mjs__WEBPACK_IMPORTED_MODULE_0__.processExists)() &&
        typeof process.env !== 'undefined' &&
        !!Object.keys(process.env).find(key => key.includes('svelte')));
}


//# sourceMappingURL=Svelte.mjs.map


/***/ }),

/***/ "../core/dist/esm/Platform/detection/Vue.mjs":
/*!***************************************************!*\
  !*** ../core/dist/esm/Platform/detection/Vue.mjs ***!
  \***************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   vueSSRDetect: () => (/* binding */ vueSSRDetect),
/* harmony export */   vueWebDetect: () => (/* binding */ vueWebDetect)
/* harmony export */ });
/* harmony import */ var _helpers_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./helpers.mjs */ "../core/dist/esm/Platform/detection/helpers.mjs");


// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
// Tested with vue 3.3.2
function vueWebDetect() {
    return (0,_helpers_mjs__WEBPACK_IMPORTED_MODULE_0__.windowExists)() && (0,_helpers_mjs__WEBPACK_IMPORTED_MODULE_0__.keyPrefixMatch)(window, '__VUE');
}
function vueSSRDetect() {
    return (0,_helpers_mjs__WEBPACK_IMPORTED_MODULE_0__.globalExists)() && (0,_helpers_mjs__WEBPACK_IMPORTED_MODULE_0__.keyPrefixMatch)(global, '__VUE');
}


//# sourceMappingURL=Vue.mjs.map


/***/ }),

/***/ "../core/dist/esm/Platform/detection/Web.mjs":
/*!***************************************************!*\
  !*** ../core/dist/esm/Platform/detection/Web.mjs ***!
  \***************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   webDetect: () => (/* binding */ webDetect)
/* harmony export */ });
/* harmony import */ var _helpers_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./helpers.mjs */ "../core/dist/esm/Platform/detection/helpers.mjs");


// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
function webDetect() {
    return (0,_helpers_mjs__WEBPACK_IMPORTED_MODULE_0__.windowExists)();
}


//# sourceMappingURL=Web.mjs.map


/***/ }),

/***/ "../core/dist/esm/Platform/detection/helpers.mjs":
/*!*******************************************************!*\
  !*** ../core/dist/esm/Platform/detection/helpers.mjs ***!
  \*******************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   documentExists: () => (/* binding */ documentExists),
/* harmony export */   globalExists: () => (/* binding */ globalExists),
/* harmony export */   globalThisExists: () => (/* binding */ globalThisExists),
/* harmony export */   keyPrefixMatch: () => (/* binding */ keyPrefixMatch),
/* harmony export */   processExists: () => (/* binding */ processExists),
/* harmony export */   windowExists: () => (/* binding */ windowExists)
/* harmony export */ });
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
const globalExists = () => {
    return typeof global !== 'undefined';
};
const globalThisExists = () => {
    return typeof globalThis !== 'undefined';
};
const windowExists = () => {
    return typeof window !== 'undefined';
};
const documentExists = () => {
    return typeof document !== 'undefined';
};
const processExists = () => {
    return typeof process !== 'undefined';
};
const keyPrefixMatch = (object, prefix) => {
    return !!Object.keys(object).find(key => key.startsWith(prefix));
};


//# sourceMappingURL=helpers.mjs.map


/***/ }),

/***/ "../core/dist/esm/Platform/detection/index.mjs":
/*!*****************************************************!*\
  !*** ../core/dist/esm/Platform/detection/index.mjs ***!
  \*****************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   detect: () => (/* binding */ detect)
/* harmony export */ });
/* harmony import */ var _types_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../types.mjs */ "../core/dist/esm/Platform/types.mjs");
/* harmony import */ var _React_mjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./React.mjs */ "../core/dist/esm/Platform/detection/React.mjs");
/* harmony import */ var _Vue_mjs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./Vue.mjs */ "../core/dist/esm/Platform/detection/Vue.mjs");
/* harmony import */ var _Svelte_mjs__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./Svelte.mjs */ "../core/dist/esm/Platform/detection/Svelte.mjs");
/* harmony import */ var _Next_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Next.mjs */ "../core/dist/esm/Platform/detection/Next.mjs");
/* harmony import */ var _Nuxt_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Nuxt.mjs */ "../core/dist/esm/Platform/detection/Nuxt.mjs");
/* harmony import */ var _Angular_mjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Angular.mjs */ "../core/dist/esm/Platform/detection/Angular.mjs");
/* harmony import */ var _ReactNative_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ReactNative.mjs */ "../core/dist/esm/Platform/detection/ReactNative.mjs");
/* harmony import */ var _Expo_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Expo.mjs */ "../core/dist/esm/Platform/detection/Expo.mjs");
/* harmony import */ var _Web_mjs__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./Web.mjs */ "../core/dist/esm/Platform/detection/Web.mjs");











// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
// These are in the order of detection where when both are detectable, the early Framework will be reported
const detectionMap = [
    // First, detect mobile
    { platform: _types_mjs__WEBPACK_IMPORTED_MODULE_0__.Framework.Expo, detectionMethod: _Expo_mjs__WEBPACK_IMPORTED_MODULE_1__.expoDetect },
    { platform: _types_mjs__WEBPACK_IMPORTED_MODULE_0__.Framework.ReactNative, detectionMethod: _ReactNative_mjs__WEBPACK_IMPORTED_MODULE_2__.reactNativeDetect },
    // Next, detect web frameworks
    { platform: _types_mjs__WEBPACK_IMPORTED_MODULE_0__.Framework.NextJs, detectionMethod: _Next_mjs__WEBPACK_IMPORTED_MODULE_3__.nextWebDetect },
    { platform: _types_mjs__WEBPACK_IMPORTED_MODULE_0__.Framework.Nuxt, detectionMethod: _Nuxt_mjs__WEBPACK_IMPORTED_MODULE_4__.nuxtWebDetect },
    { platform: _types_mjs__WEBPACK_IMPORTED_MODULE_0__.Framework.Angular, detectionMethod: _Angular_mjs__WEBPACK_IMPORTED_MODULE_5__.angularWebDetect },
    { platform: _types_mjs__WEBPACK_IMPORTED_MODULE_0__.Framework.React, detectionMethod: _React_mjs__WEBPACK_IMPORTED_MODULE_6__.reactWebDetect },
    { platform: _types_mjs__WEBPACK_IMPORTED_MODULE_0__.Framework.VueJs, detectionMethod: _Vue_mjs__WEBPACK_IMPORTED_MODULE_7__.vueWebDetect },
    { platform: _types_mjs__WEBPACK_IMPORTED_MODULE_0__.Framework.Svelte, detectionMethod: _Svelte_mjs__WEBPACK_IMPORTED_MODULE_8__.svelteWebDetect },
    { platform: _types_mjs__WEBPACK_IMPORTED_MODULE_0__.Framework.WebUnknown, detectionMethod: _Web_mjs__WEBPACK_IMPORTED_MODULE_9__.webDetect },
    // Last, detect ssr frameworks
    { platform: _types_mjs__WEBPACK_IMPORTED_MODULE_0__.Framework.NextJsSSR, detectionMethod: _Next_mjs__WEBPACK_IMPORTED_MODULE_3__.nextSSRDetect },
    { platform: _types_mjs__WEBPACK_IMPORTED_MODULE_0__.Framework.NuxtSSR, detectionMethod: _Nuxt_mjs__WEBPACK_IMPORTED_MODULE_4__.nuxtSSRDetect },
    { platform: _types_mjs__WEBPACK_IMPORTED_MODULE_0__.Framework.ReactSSR, detectionMethod: _React_mjs__WEBPACK_IMPORTED_MODULE_6__.reactSSRDetect },
    { platform: _types_mjs__WEBPACK_IMPORTED_MODULE_0__.Framework.VueJsSSR, detectionMethod: _Vue_mjs__WEBPACK_IMPORTED_MODULE_7__.vueSSRDetect },
    { platform: _types_mjs__WEBPACK_IMPORTED_MODULE_0__.Framework.AngularSSR, detectionMethod: _Angular_mjs__WEBPACK_IMPORTED_MODULE_5__.angularSSRDetect },
    { platform: _types_mjs__WEBPACK_IMPORTED_MODULE_0__.Framework.SvelteSSR, detectionMethod: _Svelte_mjs__WEBPACK_IMPORTED_MODULE_8__.svelteSSRDetect },
];
function detect() {
    return (detectionMap.find(detectionEntry => detectionEntry.detectionMethod())
        ?.platform || _types_mjs__WEBPACK_IMPORTED_MODULE_0__.Framework.ServerSideUnknown);
}


//# sourceMappingURL=index.mjs.map


/***/ }),

/***/ "../core/dist/esm/Platform/index.mjs":
/*!*******************************************!*\
  !*** ../core/dist/esm/Platform/index.mjs ***!
  \*******************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Platform: () => (/* binding */ Platform),
/* harmony export */   getAmplifyUserAgent: () => (/* binding */ getAmplifyUserAgent),
/* harmony export */   getAmplifyUserAgentObject: () => (/* binding */ getAmplifyUserAgentObject),
/* harmony export */   sanitizeAmplifyVersion: () => (/* binding */ sanitizeAmplifyVersion)
/* harmony export */ });
/* harmony import */ var _types_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./types.mjs */ "../core/dist/esm/Platform/types.mjs");
/* harmony import */ var _version_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./version.mjs */ "../core/dist/esm/Platform/version.mjs");
/* harmony import */ var _detectFramework_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./detectFramework.mjs */ "../core/dist/esm/Platform/detectFramework.mjs");
/* harmony import */ var _customUserAgent_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./customUserAgent.mjs */ "../core/dist/esm/Platform/customUserAgent.mjs");





// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
const BASE_USER_AGENT = `aws-amplify`;
/** Sanitize Amplify version string be removing special character + and character post the special character  */
const sanitizeAmplifyVersion = (amplifyVersion) => amplifyVersion.replace(/\+.*/, '');
class PlatformBuilder {
    constructor() {
        this.userAgent = `${BASE_USER_AGENT}/${sanitizeAmplifyVersion(_version_mjs__WEBPACK_IMPORTED_MODULE_0__.version)}`;
    }
    get framework() {
        return (0,_detectFramework_mjs__WEBPACK_IMPORTED_MODULE_1__.detectFramework)();
    }
    get isReactNative() {
        return (this.framework === _types_mjs__WEBPACK_IMPORTED_MODULE_2__.Framework.ReactNative ||
            this.framework === _types_mjs__WEBPACK_IMPORTED_MODULE_2__.Framework.Expo);
    }
    observeFrameworkChanges(fcn) {
        (0,_detectFramework_mjs__WEBPACK_IMPORTED_MODULE_1__.observeFrameworkChanges)(fcn);
    }
}
const Platform = new PlatformBuilder();
const getAmplifyUserAgentObject = ({ category, action, } = {}) => {
    const userAgent = [
        [BASE_USER_AGENT, sanitizeAmplifyVersion(_version_mjs__WEBPACK_IMPORTED_MODULE_0__.version)],
    ];
    if (category) {
        userAgent.push([category, action]);
    }
    userAgent.push(['framework', (0,_detectFramework_mjs__WEBPACK_IMPORTED_MODULE_1__.detectFramework)()]);
    if (category && action) {
        const customState = (0,_customUserAgent_mjs__WEBPACK_IMPORTED_MODULE_3__.getCustomUserAgent)(category, action);
        if (customState) {
            customState.forEach(state => {
                userAgent.push(state);
            });
        }
    }
    return userAgent;
};
const getAmplifyUserAgent = (customUserAgentDetails) => {
    const userAgent = getAmplifyUserAgentObject(customUserAgentDetails);
    const userAgentString = userAgent
        .map(([agentKey, agentValue]) => agentKey && agentValue ? `${agentKey}/${agentValue}` : agentKey)
        .join(' ');
    return userAgentString;
};


//# sourceMappingURL=index.mjs.map


/***/ }),

/***/ "../core/dist/esm/Platform/types.mjs":
/*!*******************************************!*\
  !*** ../core/dist/esm/Platform/types.mjs ***!
  \*******************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AiAction: () => (/* binding */ AiAction),
/* harmony export */   AnalyticsAction: () => (/* binding */ AnalyticsAction),
/* harmony export */   ApiAction: () => (/* binding */ ApiAction),
/* harmony export */   AuthAction: () => (/* binding */ AuthAction),
/* harmony export */   Category: () => (/* binding */ Category),
/* harmony export */   DataStoreAction: () => (/* binding */ DataStoreAction),
/* harmony export */   Framework: () => (/* binding */ Framework),
/* harmony export */   GeoAction: () => (/* binding */ GeoAction),
/* harmony export */   InAppMessagingAction: () => (/* binding */ InAppMessagingAction),
/* harmony export */   InteractionsAction: () => (/* binding */ InteractionsAction),
/* harmony export */   PredictionsAction: () => (/* binding */ PredictionsAction),
/* harmony export */   PubSubAction: () => (/* binding */ PubSubAction),
/* harmony export */   PushNotificationAction: () => (/* binding */ PushNotificationAction),
/* harmony export */   StorageAction: () => (/* binding */ StorageAction)
/* harmony export */ });
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
var Framework;
(function (Framework) {
    // < 100 - Web frameworks
    Framework["WebUnknown"] = "0";
    Framework["React"] = "1";
    Framework["NextJs"] = "2";
    Framework["Angular"] = "3";
    Framework["VueJs"] = "4";
    Framework["Nuxt"] = "5";
    Framework["Svelte"] = "6";
    // 100s - Server side frameworks
    Framework["ServerSideUnknown"] = "100";
    Framework["ReactSSR"] = "101";
    Framework["NextJsSSR"] = "102";
    Framework["AngularSSR"] = "103";
    Framework["VueJsSSR"] = "104";
    Framework["NuxtSSR"] = "105";
    Framework["SvelteSSR"] = "106";
    // 200s - Mobile framework
    Framework["ReactNative"] = "201";
    Framework["Expo"] = "202";
})(Framework || (Framework = {}));
var Category;
(function (Category) {
    Category["AI"] = "ai";
    Category["API"] = "api";
    Category["Auth"] = "auth";
    Category["Analytics"] = "analytics";
    Category["DataStore"] = "datastore";
    Category["Geo"] = "geo";
    Category["InAppMessaging"] = "inappmessaging";
    Category["Interactions"] = "interactions";
    Category["Predictions"] = "predictions";
    Category["PubSub"] = "pubsub";
    Category["PushNotification"] = "pushnotification";
    Category["Storage"] = "storage";
})(Category || (Category = {}));
var AiAction;
(function (AiAction) {
    AiAction["CreateConversation"] = "1";
    AiAction["GetConversation"] = "2";
    AiAction["ListConversations"] = "3";
    AiAction["DeleteConversation"] = "4";
    AiAction["SendMessage"] = "5";
    AiAction["ListMessages"] = "6";
    AiAction["OnMessage"] = "7";
    AiAction["Generation"] = "8";
    AiAction["UpdateConversation"] = "9";
})(AiAction || (AiAction = {}));
var AnalyticsAction;
(function (AnalyticsAction) {
    AnalyticsAction["Record"] = "1";
    AnalyticsAction["IdentifyUser"] = "2";
})(AnalyticsAction || (AnalyticsAction = {}));
var ApiAction;
(function (ApiAction) {
    ApiAction["GraphQl"] = "1";
    ApiAction["Get"] = "2";
    ApiAction["Post"] = "3";
    ApiAction["Put"] = "4";
    ApiAction["Patch"] = "5";
    ApiAction["Del"] = "6";
    ApiAction["Head"] = "7";
})(ApiAction || (ApiAction = {}));
var AuthAction;
(function (AuthAction) {
    AuthAction["SignUp"] = "1";
    AuthAction["ConfirmSignUp"] = "2";
    AuthAction["ResendSignUpCode"] = "3";
    AuthAction["SignIn"] = "4";
    AuthAction["FetchMFAPreference"] = "6";
    AuthAction["UpdateMFAPreference"] = "7";
    AuthAction["SetUpTOTP"] = "10";
    AuthAction["VerifyTOTPSetup"] = "11";
    AuthAction["ConfirmSignIn"] = "12";
    AuthAction["DeleteUserAttributes"] = "15";
    AuthAction["DeleteUser"] = "16";
    AuthAction["UpdateUserAttributes"] = "17";
    AuthAction["FetchUserAttributes"] = "18";
    AuthAction["ConfirmUserAttribute"] = "22";
    AuthAction["SignOut"] = "26";
    AuthAction["UpdatePassword"] = "27";
    AuthAction["ResetPassword"] = "28";
    AuthAction["ConfirmResetPassword"] = "29";
    AuthAction["FederatedSignIn"] = "30";
    AuthAction["RememberDevice"] = "32";
    AuthAction["ForgetDevice"] = "33";
    AuthAction["FetchDevices"] = "34";
    AuthAction["SendUserAttributeVerificationCode"] = "35";
    AuthAction["SignInWithRedirect"] = "36";
    AuthAction["StartWebAuthnRegistration"] = "37";
    AuthAction["CompleteWebAuthnRegistration"] = "38";
    AuthAction["ListWebAuthnCredentials"] = "39";
    AuthAction["DeleteWebAuthnCredential"] = "40";
})(AuthAction || (AuthAction = {}));
var DataStoreAction;
(function (DataStoreAction) {
    DataStoreAction["Subscribe"] = "1";
    DataStoreAction["GraphQl"] = "2";
})(DataStoreAction || (DataStoreAction = {}));
var GeoAction;
(function (GeoAction) {
    GeoAction["SearchByText"] = "0";
    GeoAction["SearchByCoordinates"] = "1";
    GeoAction["SearchForSuggestions"] = "2";
    GeoAction["SearchByPlaceId"] = "3";
    GeoAction["SaveGeofences"] = "4";
    GeoAction["GetGeofence"] = "5";
    GeoAction["ListGeofences"] = "6";
    GeoAction["DeleteGeofences"] = "7";
})(GeoAction || (GeoAction = {}));
var InAppMessagingAction;
(function (InAppMessagingAction) {
    InAppMessagingAction["SyncMessages"] = "1";
    InAppMessagingAction["IdentifyUser"] = "2";
    InAppMessagingAction["NotifyMessageInteraction"] = "3";
})(InAppMessagingAction || (InAppMessagingAction = {}));
var InteractionsAction;
(function (InteractionsAction) {
    InteractionsAction["None"] = "0";
})(InteractionsAction || (InteractionsAction = {}));
var PredictionsAction;
(function (PredictionsAction) {
    PredictionsAction["Convert"] = "1";
    PredictionsAction["Identify"] = "2";
    PredictionsAction["Interpret"] = "3";
})(PredictionsAction || (PredictionsAction = {}));
var PubSubAction;
(function (PubSubAction) {
    PubSubAction["Subscribe"] = "1";
})(PubSubAction || (PubSubAction = {}));
var PushNotificationAction;
(function (PushNotificationAction) {
    PushNotificationAction["InitializePushNotifications"] = "1";
    PushNotificationAction["IdentifyUser"] = "2";
})(PushNotificationAction || (PushNotificationAction = {}));
var StorageAction;
(function (StorageAction) {
    StorageAction["UploadData"] = "1";
    StorageAction["DownloadData"] = "2";
    StorageAction["List"] = "3";
    StorageAction["Copy"] = "4";
    StorageAction["Remove"] = "5";
    StorageAction["GetProperties"] = "6";
    StorageAction["GetUrl"] = "7";
    StorageAction["GetDataAccess"] = "8";
    StorageAction["ListCallerAccessGrants"] = "9";
})(StorageAction || (StorageAction = {}));


//# sourceMappingURL=types.mjs.map


/***/ }),

/***/ "../core/dist/esm/Platform/version.mjs":
/*!*********************************************!*\
  !*** ../core/dist/esm/Platform/version.mjs ***!
  \*********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   version: () => (/* binding */ version)
/* harmony export */ });
// generated by genversion
const version = '6.10.2';


//# sourceMappingURL=version.mjs.map


/***/ }),

/***/ "../core/dist/esm/Reachability/Reachability.mjs":
/*!******************************************************!*\
  !*** ../core/dist/esm/Reachability/Reachability.mjs ***!
  \******************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Reachability: () => (/* binding */ Reachability)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ "../../node_modules/rxjs/dist/esm5/internal/observable/from.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "../../node_modules/rxjs/dist/esm5/internal/Observable.js");
/* harmony import */ var _utils_isWebWorker_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/isWebWorker.mjs */ "../core/dist/esm/utils/isWebWorker.mjs");





// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
class Reachability {
    networkMonitor(_) {
        const globalObj = (0,_utils_isWebWorker_mjs__WEBPACK_IMPORTED_MODULE_0__.isWebWorker)()
            ? self
            : typeof window !== 'undefined' && window;
        if (!globalObj) {
            return (0,rxjs__WEBPACK_IMPORTED_MODULE_1__.from)([{ online: true }]);
        }
        return new rxjs__WEBPACK_IMPORTED_MODULE_2__.Observable(observer => {
            observer.next({ online: globalObj.navigator.onLine });
            const notifyOnline = () => {
                observer.next({ online: true });
            };
            const notifyOffline = () => {
                observer.next({ online: false });
            };
            globalObj.addEventListener('online', notifyOnline);
            globalObj.addEventListener('offline', notifyOffline);
            Reachability._observers.push(observer);
            return () => {
                globalObj.removeEventListener('online', notifyOnline);
                globalObj.removeEventListener('offline', notifyOffline);
                Reachability._observers = Reachability._observers.filter(_observer => _observer !== observer);
            };
        });
    }
    // expose observers to simulate offline mode for integration testing
    static _observerOverride(status) {
        for (const observer of this._observers) {
            if (observer.closed) {
                this._observers = this._observers.filter(_observer => _observer !== observer);
                continue;
            }
            observer?.next && observer.next(status);
        }
    }
}
Reachability._observers = [];


//# sourceMappingURL=Reachability.mjs.map


/***/ }),

/***/ "../core/dist/esm/clients/handlers/authenticated.mjs":
/*!***********************************************************!*\
  !*** ../core/dist/esm/clients/handlers/authenticated.mjs ***!
  \***********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   authenticatedHandler: () => (/* binding */ authenticatedHandler)
/* harmony export */ });
/* harmony import */ var _middleware_retry_middleware_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../middleware/retry/middleware.mjs */ "../core/dist/esm/clients/middleware/retry/middleware.mjs");
/* harmony import */ var _middleware_signing_middleware_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../middleware/signing/middleware.mjs */ "../core/dist/esm/clients/middleware/signing/middleware.mjs");
/* harmony import */ var _middleware_userAgent_middleware_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../middleware/userAgent/middleware.mjs */ "../core/dist/esm/clients/middleware/userAgent/middleware.mjs");
/* harmony import */ var _internal_composeTransferHandler_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../internal/composeTransferHandler.mjs */ "../core/dist/esm/clients/internal/composeTransferHandler.mjs");
/* harmony import */ var _fetch_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./fetch.mjs */ "../core/dist/esm/clients/handlers/fetch.mjs");









// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
const authenticatedHandler = (0,_internal_composeTransferHandler_mjs__WEBPACK_IMPORTED_MODULE_0__.composeTransferHandler)(_fetch_mjs__WEBPACK_IMPORTED_MODULE_1__.fetchTransferHandler, [
    _middleware_userAgent_middleware_mjs__WEBPACK_IMPORTED_MODULE_2__.userAgentMiddlewareFactory,
    _middleware_retry_middleware_mjs__WEBPACK_IMPORTED_MODULE_3__.retryMiddlewareFactory,
    _middleware_signing_middleware_mjs__WEBPACK_IMPORTED_MODULE_4__.signingMiddlewareFactory,
]);


//# sourceMappingURL=authenticated.mjs.map


/***/ }),

/***/ "../core/dist/esm/clients/handlers/fetch.mjs":
/*!***************************************************!*\
  !*** ../core/dist/esm/clients/handlers/fetch.mjs ***!
  \***************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   fetchTransferHandler: () => (/* binding */ fetchTransferHandler)
/* harmony export */ });
/* harmony import */ var _errors_AmplifyError_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../errors/AmplifyError.mjs */ "../core/dist/esm/errors/AmplifyError.mjs");
/* harmony import */ var _types_errors_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../types/errors.mjs */ "../core/dist/esm/types/errors.mjs");
/* harmony import */ var _utils_memoization_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/memoization.mjs */ "../core/dist/esm/clients/utils/memoization.mjs");





// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
const shouldSendBody = (method) => !['HEAD', 'GET', 'DELETE'].includes(method.toUpperCase());
// TODO[AllanZhengYP]: we need to provide isCanceledError utility
const fetchTransferHandler = async ({ url, method, headers, body }, { abortSignal, cache, withCrossDomainCredentials }) => {
    let resp;
    try {
        resp = await fetch(url, {
            method,
            headers,
            body: shouldSendBody(method) ? body : undefined,
            signal: abortSignal,
            cache,
            credentials: withCrossDomainCredentials ? 'include' : 'same-origin',
        });
    }
    catch (e) {
        if (e instanceof TypeError) {
            throw new _errors_AmplifyError_mjs__WEBPACK_IMPORTED_MODULE_0__.AmplifyError({
                name: _types_errors_mjs__WEBPACK_IMPORTED_MODULE_1__.AmplifyErrorCode.NetworkError,
                message: 'A network error has occurred.',
                underlyingError: e,
            });
        }
        throw e;
    }
    const responseHeaders = {};
    resp.headers?.forEach((value, key) => {
        responseHeaders[key.toLowerCase()] = value;
    });
    const httpResponse = {
        statusCode: resp.status,
        headers: responseHeaders,
        body: null,
    };
    // resp.body is a ReadableStream according to Fetch API spec, but React Native
    // does not implement it.
    const bodyWithMixin = Object.assign(resp.body ?? {}, {
        text: (0,_utils_memoization_mjs__WEBPACK_IMPORTED_MODULE_2__.withMemoization)(() => resp.text()),
        blob: (0,_utils_memoization_mjs__WEBPACK_IMPORTED_MODULE_2__.withMemoization)(() => resp.blob()),
        json: (0,_utils_memoization_mjs__WEBPACK_IMPORTED_MODULE_2__.withMemoization)(() => resp.json()),
    });
    return {
        ...httpResponse,
        body: bodyWithMixin,
    };
};


//# sourceMappingURL=fetch.mjs.map


/***/ }),

/***/ "../core/dist/esm/clients/handlers/unauthenticated.mjs":
/*!*************************************************************!*\
  !*** ../core/dist/esm/clients/handlers/unauthenticated.mjs ***!
  \*************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   unauthenticatedHandler: () => (/* binding */ unauthenticatedHandler)
/* harmony export */ });
/* harmony import */ var _middleware_retry_middleware_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../middleware/retry/middleware.mjs */ "../core/dist/esm/clients/middleware/retry/middleware.mjs");
/* harmony import */ var _middleware_userAgent_middleware_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../middleware/userAgent/middleware.mjs */ "../core/dist/esm/clients/middleware/userAgent/middleware.mjs");
/* harmony import */ var _internal_composeTransferHandler_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../internal/composeTransferHandler.mjs */ "../core/dist/esm/clients/internal/composeTransferHandler.mjs");
/* harmony import */ var _fetch_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./fetch.mjs */ "../core/dist/esm/clients/handlers/fetch.mjs");








// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
const unauthenticatedHandler = (0,_internal_composeTransferHandler_mjs__WEBPACK_IMPORTED_MODULE_0__.composeTransferHandler)(_fetch_mjs__WEBPACK_IMPORTED_MODULE_1__.fetchTransferHandler, [_middleware_userAgent_middleware_mjs__WEBPACK_IMPORTED_MODULE_2__.userAgentMiddlewareFactory, _middleware_retry_middleware_mjs__WEBPACK_IMPORTED_MODULE_3__.retryMiddlewareFactory]);


//# sourceMappingURL=unauthenticated.mjs.map


/***/ }),

/***/ "../core/dist/esm/clients/internal/composeTransferHandler.mjs":
/*!********************************************************************!*\
  !*** ../core/dist/esm/clients/internal/composeTransferHandler.mjs ***!
  \********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   composeTransferHandler: () => (/* binding */ composeTransferHandler)
/* harmony export */ });
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
/**
 * Compose a transfer handler with a core transfer handler and a list of middleware.
 * @param coreHandler Core transfer handler
 * @param middleware	List of middleware
 * @returns A transfer handler whose option type is the union of the core
 * 	transfer handler's option type and the middleware's option type.
 * @internal
 */
const composeTransferHandler = (coreHandler, middleware) => (request, options) => {
    const context = {};
    let composedHandler = (composeHandlerRequest) => coreHandler(composeHandlerRequest, options);
    for (let i = middleware.length - 1; i >= 0; i--) {
        const m = middleware[i];
        const resolvedMiddleware = m(options);
        composedHandler = resolvedMiddleware(composedHandler, context);
    }
    return composedHandler(request);
};


//# sourceMappingURL=composeTransferHandler.mjs.map


/***/ }),

/***/ "../core/dist/esm/clients/middleware/retry/defaultRetryDecider.mjs":
/*!*************************************************************************!*\
  !*** ../core/dist/esm/clients/middleware/retry/defaultRetryDecider.mjs ***!
  \*************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getRetryDecider: () => (/* binding */ getRetryDecider)
/* harmony export */ });
/* harmony import */ var _types_errors_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../types/errors.mjs */ "../core/dist/esm/types/errors.mjs");
/* harmony import */ var _isClockSkewError_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./isClockSkewError.mjs */ "../core/dist/esm/clients/middleware/retry/isClockSkewError.mjs");



// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
/**
 * Get retry decider function
 * @param errorParser Function to load JavaScript error from HTTP response
 */
const getRetryDecider = (errorParser) => async (response, error) => {
    const parsedError = error ??
        (await errorParser(response)) ??
        undefined;
    const errorCode = parsedError?.code || parsedError?.name;
    const statusCode = response?.statusCode;
    const isRetryable = isConnectionError(error) ||
        isThrottlingError(statusCode, errorCode) ||
        (0,_isClockSkewError_mjs__WEBPACK_IMPORTED_MODULE_0__.isClockSkewError)(errorCode) ||
        isServerSideError(statusCode, errorCode);
    return {
        retryable: isRetryable,
    };
};
// reference: https://github.com/aws/aws-sdk-js-v3/blob/ab0e7be36e7e7f8a0c04834357aaad643c7912c3/packages/service-error-classification/src/constants.ts#L22-L37
const THROTTLING_ERROR_CODES = [
    'BandwidthLimitExceeded',
    'EC2ThrottledException',
    'LimitExceededException',
    'PriorRequestNotComplete',
    'ProvisionedThroughputExceededException',
    'RequestLimitExceeded',
    'RequestThrottled',
    'RequestThrottledException',
    'SlowDown',
    'ThrottledException',
    'Throttling',
    'ThrottlingException',
    'TooManyRequestsException',
];
const TIMEOUT_ERROR_CODES = [
    'TimeoutError',
    'RequestTimeout',
    'RequestTimeoutException',
];
const isThrottlingError = (statusCode, errorCode) => statusCode === 429 ||
    (!!errorCode && THROTTLING_ERROR_CODES.includes(errorCode));
const isConnectionError = (error) => [
    _types_errors_mjs__WEBPACK_IMPORTED_MODULE_1__.AmplifyErrorCode.NetworkError,
    // TODO(vNext): unify the error code `ERR_NETWORK` used by the Storage XHR handler
    'ERR_NETWORK',
].includes(error?.name);
const isServerSideError = (statusCode, errorCode) => (!!statusCode && [500, 502, 503, 504].includes(statusCode)) ||
    (!!errorCode && TIMEOUT_ERROR_CODES.includes(errorCode));


//# sourceMappingURL=defaultRetryDecider.mjs.map


/***/ }),

/***/ "../core/dist/esm/clients/middleware/retry/isClockSkewError.mjs":
/*!**********************************************************************!*\
  !*** ../core/dist/esm/clients/middleware/retry/isClockSkewError.mjs ***!
  \**********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   isClockSkewError: () => (/* binding */ isClockSkewError)
/* harmony export */ });
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
// via https://github.com/aws/aws-sdk-js-v3/blob/ab0e7be36e7e7f8a0c04834357aaad643c7912c3/packages/service-error-classification/src/constants.ts#L8
const CLOCK_SKEW_ERROR_CODES = [
    'AuthFailure',
    'InvalidSignatureException',
    'RequestExpired',
    'RequestInTheFuture',
    'RequestTimeTooSkewed',
    'SignatureDoesNotMatch',
    'BadRequestException', // API Gateway
];
/**
 * Given an error code, returns true if it is related to a clock skew error.
 *
 * @param errorCode String representation of some error.
 * @returns True if given error is present in `CLOCK_SKEW_ERROR_CODES`, false otherwise.
 *
 * @internal
 */
const isClockSkewError = (errorCode) => !!errorCode && CLOCK_SKEW_ERROR_CODES.includes(errorCode);


//# sourceMappingURL=isClockSkewError.mjs.map


/***/ }),

/***/ "../core/dist/esm/clients/middleware/retry/jitteredBackoff.mjs":
/*!*********************************************************************!*\
  !*** ../core/dist/esm/clients/middleware/retry/jitteredBackoff.mjs ***!
  \*********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   jitteredBackoff: () => (/* binding */ jitteredBackoff)
/* harmony export */ });
/* harmony import */ var _utils_retry_jitteredBackoff_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../utils/retry/jitteredBackoff.mjs */ "../core/dist/esm/utils/retry/jitteredBackoff.mjs");




// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
// TODO: [v6] The separate retry utility is used by Data packages now and will replaced by retry middleware.
const DEFAULT_MAX_DELAY_MS = 5 * 60 * 1000;
const jitteredBackoff = attempt => {
    const delayFunction = (0,_utils_retry_jitteredBackoff_mjs__WEBPACK_IMPORTED_MODULE_0__.jitteredBackoff)(DEFAULT_MAX_DELAY_MS);
    const delay = delayFunction(attempt);
    // The delayFunction returns false when the delay is greater than the max delay(5 mins).
    // In this case, the retry middleware will delay 5 mins instead, as a ceiling of the delay.
    return delay === false ? DEFAULT_MAX_DELAY_MS : delay;
};


//# sourceMappingURL=jitteredBackoff.mjs.map


/***/ }),

/***/ "../core/dist/esm/clients/middleware/retry/middleware.mjs":
/*!****************************************************************!*\
  !*** ../core/dist/esm/clients/middleware/retry/middleware.mjs ***!
  \****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   retryMiddlewareFactory: () => (/* binding */ retryMiddlewareFactory)
/* harmony export */ });
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
const DEFAULT_RETRY_ATTEMPTS = 3;
/**
 * Retry middleware
 */
const retryMiddlewareFactory = ({ maxAttempts = DEFAULT_RETRY_ATTEMPTS, retryDecider, computeDelay, abortSignal, }) => {
    if (maxAttempts < 1) {
        throw new Error('maxAttempts must be greater than 0');
    }
    return (next, context) => async function retryMiddleware(request) {
        let error;
        let attemptsCount = context.attemptsCount ?? 0;
        let response;
        // When retry is not needed or max attempts is reached, either error or response will be set. This function handles either cases.
        const handleTerminalErrorOrResponse = () => {
            if (response) {
                addOrIncrementMetadataAttempts(response, attemptsCount);
                return response;
            }
            else {
                addOrIncrementMetadataAttempts(error, attemptsCount);
                throw error;
            }
        };
        while (!abortSignal?.aborted && attemptsCount < maxAttempts) {
            try {
                response = await next(request);
                error = undefined;
            }
            catch (e) {
                error = e;
                response = undefined;
            }
            // context.attemptsCount may be updated after calling next handler which may retry the request by itself.
            attemptsCount =
                (context.attemptsCount ?? 0) > attemptsCount
                    ? (context.attemptsCount ?? 0)
                    : attemptsCount + 1;
            context.attemptsCount = attemptsCount;
            const { isCredentialsExpiredError, retryable } = await retryDecider(response, error, context);
            if (retryable) {
                // Setting isCredentialsInvalid flag to notify signing middleware to forceRefresh credentials provider.
                context.isCredentialsExpired = !!isCredentialsExpiredError;
                if (!abortSignal?.aborted && attemptsCount < maxAttempts) {
                    // prevent sleep for last attempt or cancelled request;
                    const delay = computeDelay(attemptsCount);
                    await cancellableSleep(delay, abortSignal);
                }
                continue;
            }
            else {
                return handleTerminalErrorOrResponse();
            }
        }
        if (abortSignal?.aborted) {
            throw new Error('Request aborted.');
        }
        else {
            return handleTerminalErrorOrResponse();
        }
    };
};
const cancellableSleep = (timeoutMs, abortSignal) => {
    if (abortSignal?.aborted) {
        return Promise.resolve();
    }
    let timeoutId;
    let sleepPromiseResolveFn;
    const sleepPromise = new Promise(resolve => {
        sleepPromiseResolveFn = resolve;
        timeoutId = setTimeout(resolve, timeoutMs);
    });
    abortSignal?.addEventListener('abort', function cancelSleep(_) {
        clearTimeout(timeoutId);
        abortSignal?.removeEventListener('abort', cancelSleep);
        sleepPromiseResolveFn();
    });
    return sleepPromise;
};
const addOrIncrementMetadataAttempts = (nextHandlerOutput, attempts) => {
    if (Object.prototype.toString.call(nextHandlerOutput) !== '[object Object]') {
        return;
    }
    nextHandlerOutput.$metadata = {
        ...(nextHandlerOutput.$metadata ?? {}),
        attempts,
    };
};


//# sourceMappingURL=middleware.mjs.map


/***/ }),

/***/ "../core/dist/esm/clients/middleware/signing/middleware.mjs":
/*!******************************************************************!*\
  !*** ../core/dist/esm/clients/middleware/signing/middleware.mjs ***!
  \******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   signingMiddlewareFactory: () => (/* binding */ signingMiddlewareFactory)
/* harmony export */ });
/* harmony import */ var _signer_signatureV4_signRequest_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./signer/signatureV4/signRequest.mjs */ "../core/dist/esm/clients/middleware/signing/signer/signatureV4/signRequest.mjs");
/* harmony import */ var _aws_crypto_sha256_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @aws-crypto/sha256-js */ "../../node_modules/@aws-crypto/sha256-js/build/module/index.js");
/* harmony import */ var _smithy_util_hex_encoding__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @smithy/util-hex-encoding */ "../core/node_modules/@smithy/util-hex-encoding/dist-es/index.js");
/* harmony import */ var _utils_getSkewCorrectedDate_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils/getSkewCorrectedDate.mjs */ "../core/dist/esm/clients/middleware/signing/utils/getSkewCorrectedDate.mjs");
/* harmony import */ var _utils_getUpdatedSystemClockOffset_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./utils/getUpdatedSystemClockOffset.mjs */ "../core/dist/esm/clients/middleware/signing/utils/getUpdatedSystemClockOffset.mjs");






// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
/**
 * Middleware that SigV4 signs request with AWS credentials, and correct system clock offset.
 * This middleware is expected to be placed after retry middleware.
 */
const signingMiddlewareFactory = ({ credentials, region, service, uriEscapePath = true, }) => {
    let currentSystemClockOffset;
    return (next, context) => async function signingMiddleware(request) {
        currentSystemClockOffset = currentSystemClockOffset ?? 0;
        const signRequestOptions = {
            credentials: typeof credentials === 'function'
                ? await credentials({
                    forceRefresh: !!context?.isCredentialsExpired,
                })
                : credentials,
            signingDate: (0,_utils_getSkewCorrectedDate_mjs__WEBPACK_IMPORTED_MODULE_2__.getSkewCorrectedDate)(currentSystemClockOffset),
            signingRegion: region,
            signingService: service,
            uriEscapePath,
        };
        const signedRequest = await (0,_signer_signatureV4_signRequest_mjs__WEBPACK_IMPORTED_MODULE_3__.signRequest)(request, signRequestOptions);
        const response = await next(signedRequest);
        // Update system clock offset if response contains date header, regardless of the status code.
        // non-2xx response will still be returned from next handler instead of thrown, because it's
        // only thrown by the retry middleware.
        const dateString = getDateHeader(response);
        if (dateString) {
            currentSystemClockOffset = (0,_utils_getUpdatedSystemClockOffset_mjs__WEBPACK_IMPORTED_MODULE_4__.getUpdatedSystemClockOffset)(Date.parse(dateString), currentSystemClockOffset);
        }
        return response;
    };
};
const getDateHeader = ({ headers } = {}) => headers?.date ?? headers?.Date ?? headers?.['x-amz-date'];


//# sourceMappingURL=middleware.mjs.map


/***/ }),

/***/ "../core/dist/esm/clients/middleware/signing/signer/signatureV4/constants.mjs":
/*!************************************************************************************!*\
  !*** ../core/dist/esm/clients/middleware/signing/signer/signatureV4/constants.mjs ***!
  \************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ALGORITHM_QUERY_PARAM: () => (/* binding */ ALGORITHM_QUERY_PARAM),
/* harmony export */   AMZ_DATE_HEADER: () => (/* binding */ AMZ_DATE_HEADER),
/* harmony export */   AMZ_DATE_QUERY_PARAM: () => (/* binding */ AMZ_DATE_QUERY_PARAM),
/* harmony export */   AUTH_HEADER: () => (/* binding */ AUTH_HEADER),
/* harmony export */   CREDENTIAL_QUERY_PARAM: () => (/* binding */ CREDENTIAL_QUERY_PARAM),
/* harmony export */   EMPTY_HASH: () => (/* binding */ EMPTY_HASH),
/* harmony export */   EXPIRES_QUERY_PARAM: () => (/* binding */ EXPIRES_QUERY_PARAM),
/* harmony export */   HOST_HEADER: () => (/* binding */ HOST_HEADER),
/* harmony export */   KEY_TYPE_IDENTIFIER: () => (/* binding */ KEY_TYPE_IDENTIFIER),
/* harmony export */   REGION_SET_PARAM: () => (/* binding */ REGION_SET_PARAM),
/* harmony export */   SHA256_ALGORITHM_IDENTIFIER: () => (/* binding */ SHA256_ALGORITHM_IDENTIFIER),
/* harmony export */   SIGNATURE_IDENTIFIER: () => (/* binding */ SIGNATURE_IDENTIFIER),
/* harmony export */   SIGNATURE_QUERY_PARAM: () => (/* binding */ SIGNATURE_QUERY_PARAM),
/* harmony export */   SIGNED_HEADERS_QUERY_PARAM: () => (/* binding */ SIGNED_HEADERS_QUERY_PARAM),
/* harmony export */   TOKEN_HEADER: () => (/* binding */ TOKEN_HEADER),
/* harmony export */   TOKEN_QUERY_PARAM: () => (/* binding */ TOKEN_QUERY_PARAM),
/* harmony export */   UNSIGNED_PAYLOAD: () => (/* binding */ UNSIGNED_PAYLOAD)
/* harmony export */ });
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
// query params
const ALGORITHM_QUERY_PARAM = 'X-Amz-Algorithm';
const AMZ_DATE_QUERY_PARAM = 'X-Amz-Date';
const CREDENTIAL_QUERY_PARAM = 'X-Amz-Credential';
const EXPIRES_QUERY_PARAM = 'X-Amz-Expires';
const REGION_SET_PARAM = 'X-Amz-Region-Set';
const SIGNATURE_QUERY_PARAM = 'X-Amz-Signature';
const SIGNED_HEADERS_QUERY_PARAM = 'X-Amz-SignedHeaders';
const TOKEN_QUERY_PARAM = 'X-Amz-Security-Token';
// headers
const AUTH_HEADER = 'authorization';
const HOST_HEADER = 'host';
const AMZ_DATE_HEADER = AMZ_DATE_QUERY_PARAM.toLowerCase();
const TOKEN_HEADER = TOKEN_QUERY_PARAM.toLowerCase();
// identifiers
const KEY_TYPE_IDENTIFIER = 'aws4_request';
const SHA256_ALGORITHM_IDENTIFIER = 'AWS4-HMAC-SHA256';
const SIGNATURE_IDENTIFIER = 'AWS4';
// preset values
const EMPTY_HASH = 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855';
const UNSIGNED_PAYLOAD = 'UNSIGNED-PAYLOAD';


//# sourceMappingURL=constants.mjs.map


/***/ }),

/***/ "../core/dist/esm/clients/middleware/signing/signer/signatureV4/signRequest.mjs":
/*!**************************************************************************************!*\
  !*** ../core/dist/esm/clients/middleware/signing/signer/signatureV4/signRequest.mjs ***!
  \**************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   signRequest: () => (/* binding */ signRequest)
/* harmony export */ });
/* harmony import */ var _utils_getSignedHeaders_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utils/getSignedHeaders.mjs */ "../core/dist/esm/clients/middleware/signing/signer/signatureV4/utils/getSignedHeaders.mjs");
/* harmony import */ var _utils_getSigningValues_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils/getSigningValues.mjs */ "../core/dist/esm/clients/middleware/signing/signer/signatureV4/utils/getSigningValues.mjs");
/* harmony import */ var _constants_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./constants.mjs */ "../core/dist/esm/clients/middleware/signing/signer/signatureV4/constants.mjs");
/* harmony import */ var _utils_getSignature_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils/getSignature.mjs */ "../core/dist/esm/clients/middleware/signing/signer/signatureV4/utils/getSignature.mjs");





// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
/**
 * Given a `HttpRequest`, returns a Signature Version 4 signed `HttpRequest`.
 *
 * @param request `HttpRequest` to be signed.
 * @param signRequestOptions `SignRequestOptions` object containing values used to construct the signature.
 * @returns A `HttpRequest` with authentication headers which can grant temporary access to AWS resources.
 */
const signRequest = (request, options) => {
    const signingValues = (0,_utils_getSigningValues_mjs__WEBPACK_IMPORTED_MODULE_0__.getSigningValues)(options);
    const { accessKeyId, credentialScope, longDate, sessionToken } = signingValues;
    // create the request to sign
    const headers = { ...request.headers };
    headers[_constants_mjs__WEBPACK_IMPORTED_MODULE_1__.HOST_HEADER] = request.url.host;
    headers[_constants_mjs__WEBPACK_IMPORTED_MODULE_1__.AMZ_DATE_HEADER] = longDate;
    if (sessionToken) {
        headers[_constants_mjs__WEBPACK_IMPORTED_MODULE_1__.TOKEN_HEADER] = sessionToken;
    }
    const requestToSign = { ...request, headers };
    // calculate and add the signature to the request
    const signature = (0,_utils_getSignature_mjs__WEBPACK_IMPORTED_MODULE_2__.getSignature)(requestToSign, signingValues);
    const credentialEntry = `Credential=${accessKeyId}/${credentialScope}`;
    const signedHeadersEntry = `SignedHeaders=${(0,_utils_getSignedHeaders_mjs__WEBPACK_IMPORTED_MODULE_3__.getSignedHeaders)(headers)}`;
    const signatureEntry = `Signature=${signature}`;
    headers[_constants_mjs__WEBPACK_IMPORTED_MODULE_1__.AUTH_HEADER] =
        `${_constants_mjs__WEBPACK_IMPORTED_MODULE_1__.SHA256_ALGORITHM_IDENTIFIER} ${credentialEntry}, ${signedHeadersEntry}, ${signatureEntry}`;
    return requestToSign;
};


//# sourceMappingURL=signRequest.mjs.map


/***/ }),

/***/ "../core/dist/esm/clients/middleware/signing/signer/signatureV4/utils/dataHashHelpers.mjs":
/*!************************************************************************************************!*\
  !*** ../core/dist/esm/clients/middleware/signing/signer/signatureV4/utils/dataHashHelpers.mjs ***!
  \************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getHashedData: () => (/* binding */ getHashedData),
/* harmony export */   getHashedDataAsHex: () => (/* binding */ getHashedDataAsHex)
/* harmony export */ });
/* harmony import */ var _aws_crypto_sha256_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @aws-crypto/sha256-js */ "../../node_modules/@aws-crypto/sha256-js/build/module/index.js");
/* harmony import */ var _smithy_util_hex_encoding__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @smithy/util-hex-encoding */ "../core/node_modules/@smithy/util-hex-encoding/dist-es/index.js");



// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
// TODO: V6 update to different crypto dependency?
/**
 * Returns the hashed data a `Uint8Array`.
 *
 * @param key `SourceData` to be used as hashing key.
 * @param data Hashable `SourceData`.
 * @returns `Uint8Array` created from the data as input to a hash function.
 */
const getHashedData = (key, data) => {
    const sha256 = new _aws_crypto_sha256_js__WEBPACK_IMPORTED_MODULE_0__.Sha256(key ?? undefined);
    sha256.update(data);
    // TODO: V6 flip to async digest
    const hashedData = sha256.digestSync();
    return hashedData;
};
/**
 * Returns the hashed data as a hex string.
 *
 * @param key `SourceData` to be used as hashing key.
 * @param data Hashable `SourceData`.
 * @returns String using lowercase hexadecimal characters created from the data as input to a hash function.
 *
 * @internal
 */
const getHashedDataAsHex = (key, data) => {
    const hashedData = getHashedData(key, data);
    return (0,_smithy_util_hex_encoding__WEBPACK_IMPORTED_MODULE_1__.toHex)(hashedData);
};


//# sourceMappingURL=dataHashHelpers.mjs.map


/***/ }),

/***/ "../core/dist/esm/clients/middleware/signing/signer/signatureV4/utils/getCanonicalHeaders.mjs":
/*!****************************************************************************************************!*\
  !*** ../core/dist/esm/clients/middleware/signing/signer/signatureV4/utils/getCanonicalHeaders.mjs ***!
  \****************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getCanonicalHeaders: () => (/* binding */ getCanonicalHeaders)
/* harmony export */ });
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
/**
 * Returns canonical headers.
 *
 * @param headers Headers from the request.
 * @returns Request headers that will be signed, and their values, separated by newline characters. Header names must
 * use lowercase characters, must appear in alphabetical order, and must be followed by a colon (:). For the values,
 * trim any leading or trailing spaces, convert sequential spaces to a single space, and separate the values
 * for a multi-value header using commas.
 *
 * @internal
 */
const getCanonicalHeaders = (headers) => Object.entries(headers)
    .map(([key, value]) => ({
    key: key.toLowerCase(),
    value: value?.trim().replace(/\s+/g, ' ') ?? '',
}))
    .sort((a, b) => (a.key < b.key ? -1 : 1))
    .map(entry => `${entry.key}:${entry.value}\n`)
    .join('');


//# sourceMappingURL=getCanonicalHeaders.mjs.map


/***/ }),

/***/ "../core/dist/esm/clients/middleware/signing/signer/signatureV4/utils/getCanonicalQueryString.mjs":
/*!********************************************************************************************************!*\
  !*** ../core/dist/esm/clients/middleware/signing/signer/signatureV4/utils/getCanonicalQueryString.mjs ***!
  \********************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getCanonicalQueryString: () => (/* binding */ getCanonicalQueryString)
/* harmony export */ });
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
/**
 * Returns a canonical query string.
 *
 * @param searchParams `searchParams` from the request url.
 * @returns URL-encoded query string parameters, separated by ampersands (&). Percent-encode reserved characters,
 * including the space character. Encode names and values separately. If there are empty parameters, append the equals
 * sign to the parameter name before encoding. After encoding, sort the parameters alphabetically by key name. If there
 * is no query string, use an empty string ("").
 *
 * @internal
 */
const getCanonicalQueryString = (searchParams) => Array.from(searchParams)
    .sort(([keyA, valA], [keyB, valB]) => {
    if (keyA === keyB) {
        return valA < valB ? -1 : 1;
    }
    return keyA < keyB ? -1 : 1;
})
    .map(([key, val]) => `${escapeUri(key)}=${escapeUri(val)}`)
    .join('&');
const escapeUri = (uri) => encodeURIComponent(uri).replace(/[!'()*]/g, hexEncode);
const hexEncode = (c) => `%${c.charCodeAt(0).toString(16).toUpperCase()}`;


//# sourceMappingURL=getCanonicalQueryString.mjs.map


/***/ }),

/***/ "../core/dist/esm/clients/middleware/signing/signer/signatureV4/utils/getCanonicalRequest.mjs":
/*!****************************************************************************************************!*\
  !*** ../core/dist/esm/clients/middleware/signing/signer/signatureV4/utils/getCanonicalRequest.mjs ***!
  \****************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getCanonicalRequest: () => (/* binding */ getCanonicalRequest)
/* harmony export */ });
/* harmony import */ var _getCanonicalHeaders_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./getCanonicalHeaders.mjs */ "../core/dist/esm/clients/middleware/signing/signer/signatureV4/utils/getCanonicalHeaders.mjs");
/* harmony import */ var _getCanonicalQueryString_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./getCanonicalQueryString.mjs */ "../core/dist/esm/clients/middleware/signing/signer/signatureV4/utils/getCanonicalQueryString.mjs");
/* harmony import */ var _getCanonicalUri_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getCanonicalUri.mjs */ "../core/dist/esm/clients/middleware/signing/signer/signatureV4/utils/getCanonicalUri.mjs");
/* harmony import */ var _getHashedPayload_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./getHashedPayload.mjs */ "../core/dist/esm/clients/middleware/signing/signer/signatureV4/utils/getHashedPayload.mjs");
/* harmony import */ var _getSignedHeaders_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./getSignedHeaders.mjs */ "../core/dist/esm/clients/middleware/signing/signer/signatureV4/utils/getSignedHeaders.mjs");






// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
/**
 * Returns a canonical request.
 *
 * @param request `HttpRequest` from which to create the canonical request from.
 * @param uriEscapePath Whether to uri encode the path as part of canonical uri. It's used for S3 only where the
 *   pathname is already uri encoded, and the signing process is not expected to uri encode it again. Defaults to true.
 * @returns String created by by concatenating the following strings, separated by newline characters:
 * - HTTPMethod
 * - CanonicalUri
 * - CanonicalQueryString
 * - CanonicalHeaders
 * - SignedHeaders
 * - HashedPayload
 *
 * @internal
 */
const getCanonicalRequest = ({ body, headers, method, url }, uriEscapePath = true) => [
    method,
    (0,_getCanonicalUri_mjs__WEBPACK_IMPORTED_MODULE_0__.getCanonicalUri)(url.pathname, uriEscapePath),
    (0,_getCanonicalQueryString_mjs__WEBPACK_IMPORTED_MODULE_1__.getCanonicalQueryString)(url.searchParams),
    (0,_getCanonicalHeaders_mjs__WEBPACK_IMPORTED_MODULE_2__.getCanonicalHeaders)(headers),
    (0,_getSignedHeaders_mjs__WEBPACK_IMPORTED_MODULE_3__.getSignedHeaders)(headers),
    (0,_getHashedPayload_mjs__WEBPACK_IMPORTED_MODULE_4__.getHashedPayload)(body),
].join('\n');


//# sourceMappingURL=getCanonicalRequest.mjs.map


/***/ }),

/***/ "../core/dist/esm/clients/middleware/signing/signer/signatureV4/utils/getCanonicalUri.mjs":
/*!************************************************************************************************!*\
  !*** ../core/dist/esm/clients/middleware/signing/signer/signatureV4/utils/getCanonicalUri.mjs ***!
  \************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getCanonicalUri: () => (/* binding */ getCanonicalUri)
/* harmony export */ });
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
/**
 * Returns a canonical uri.
 *
 * @param pathname `pathname` from request url.
 * @param uriEscapePath Whether to uri encode the path as part of canonical uri. It's used for S3 only where the
 *   pathname is already uri encoded, and the signing process is not expected to uri encode it again. Defaults to true.
 * @returns URI-encoded version of the absolute path component URL (everything between the host and the question mark
 * character (?) that starts the query string parameters). If the absolute path is empty, a forward slash character (/).
 *
 * @internal
 */
const getCanonicalUri = (pathname, uriEscapePath = true) => pathname
    ? uriEscapePath
        ? encodeURIComponent(pathname).replace(/%2F/g, '/')
        : pathname
    : '/';


//# sourceMappingURL=getCanonicalUri.mjs.map


/***/ }),

/***/ "../core/dist/esm/clients/middleware/signing/signer/signatureV4/utils/getCredentialScope.mjs":
/*!***************************************************************************************************!*\
  !*** ../core/dist/esm/clients/middleware/signing/signer/signatureV4/utils/getCredentialScope.mjs ***!
  \***************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getCredentialScope: () => (/* binding */ getCredentialScope)
/* harmony export */ });
/* harmony import */ var _constants_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../constants.mjs */ "../core/dist/esm/clients/middleware/signing/signer/signatureV4/constants.mjs");


// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
/**
 * Returns the credential scope which restricts the resulting signature to the specified region and service.
 *
 * @param date Current date in the format 'YYYYMMDD'.
 * @param region AWS region in which the service resides.
 * @param service Service to which the signed request is being sent.
 *
 * @returns  A string representing the credential scope with format 'YYYYMMDD/region/service/aws4_request'.
 *
 * @internal
 */
const getCredentialScope = (date, region, service) => `${date}/${region}/${service}/${_constants_mjs__WEBPACK_IMPORTED_MODULE_0__.KEY_TYPE_IDENTIFIER}`;


//# sourceMappingURL=getCredentialScope.mjs.map


/***/ }),

/***/ "../core/dist/esm/clients/middleware/signing/signer/signatureV4/utils/getFormattedDates.mjs":
/*!**************************************************************************************************!*\
  !*** ../core/dist/esm/clients/middleware/signing/signer/signatureV4/utils/getFormattedDates.mjs ***!
  \**************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getFormattedDates: () => (/* binding */ getFormattedDates)
/* harmony export */ });
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
/**
 * Returns expected date strings to be used in signing.
 *
 * @param date JavaScript `Date` object.
 * @returns `FormattedDates` object containing the following:
 * - longDate: A date string in 'YYYYMMDDThhmmssZ' format
 * - shortDate: A date string in 'YYYYMMDD' format
 *
 * @internal
 */
const getFormattedDates = (date) => {
    const longDate = date.toISOString().replace(/[:-]|\.\d{3}/g, '');
    return {
        longDate,
        shortDate: longDate.slice(0, 8),
    };
};


//# sourceMappingURL=getFormattedDates.mjs.map


/***/ }),

/***/ "../core/dist/esm/clients/middleware/signing/signer/signatureV4/utils/getHashedPayload.mjs":
/*!*************************************************************************************************!*\
  !*** ../core/dist/esm/clients/middleware/signing/signer/signatureV4/utils/getHashedPayload.mjs ***!
  \*************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getHashedPayload: () => (/* binding */ getHashedPayload)
/* harmony export */ });
/* harmony import */ var _constants_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../constants.mjs */ "../core/dist/esm/clients/middleware/signing/signer/signatureV4/constants.mjs");
/* harmony import */ var _dataHashHelpers_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dataHashHelpers.mjs */ "../core/dist/esm/clients/middleware/signing/signer/signatureV4/utils/dataHashHelpers.mjs");



// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
/**
 * Returns the hashed payload.
 *
 * @param body `body` (payload) from the request.
 * @returns String created using the payload in the body of the HTTP request as input to a hash function. This string
 * uses lowercase hexadecimal characters. If the payload is empty, return precalculated result of an empty hash.
 *
 * @internal
 */
const getHashedPayload = (body) => {
    // return precalculated empty hash if body is undefined or null
    if (body == null) {
        return _constants_mjs__WEBPACK_IMPORTED_MODULE_0__.EMPTY_HASH;
    }
    if (isSourceData(body)) {
        const hashedData = (0,_dataHashHelpers_mjs__WEBPACK_IMPORTED_MODULE_1__.getHashedDataAsHex)(null, body);
        return hashedData;
    }
    // Defined body is not signable. Return unsigned payload which may or may not be accepted by the service.
    return _constants_mjs__WEBPACK_IMPORTED_MODULE_0__.UNSIGNED_PAYLOAD;
};
const isSourceData = (body) => typeof body === 'string' || ArrayBuffer.isView(body) || isArrayBuffer(body);
const isArrayBuffer = (arg) => (typeof ArrayBuffer === 'function' && arg instanceof ArrayBuffer) ||
    Object.prototype.toString.call(arg) === '[object ArrayBuffer]';


//# sourceMappingURL=getHashedPayload.mjs.map


/***/ }),

/***/ "../core/dist/esm/clients/middleware/signing/signer/signatureV4/utils/getSignature.mjs":
/*!*********************************************************************************************!*\
  !*** ../core/dist/esm/clients/middleware/signing/signer/signatureV4/utils/getSignature.mjs ***!
  \*********************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getSignature: () => (/* binding */ getSignature)
/* harmony export */ });
/* harmony import */ var _dataHashHelpers_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dataHashHelpers.mjs */ "../core/dist/esm/clients/middleware/signing/signer/signatureV4/utils/dataHashHelpers.mjs");
/* harmony import */ var _getCanonicalRequest_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getCanonicalRequest.mjs */ "../core/dist/esm/clients/middleware/signing/signer/signatureV4/utils/getCanonicalRequest.mjs");
/* harmony import */ var _getSigningKey_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./getSigningKey.mjs */ "../core/dist/esm/clients/middleware/signing/signer/signatureV4/utils/getSigningKey.mjs");
/* harmony import */ var _getStringToSign_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./getStringToSign.mjs */ "../core/dist/esm/clients/middleware/signing/signer/signatureV4/utils/getStringToSign.mjs");





// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
/**
 * Calculates and returns an AWS API Signature.
 * https://docs.aws.amazon.com/IAM/latest/UserGuide/create-signed-request.html
 *
 * @param request `HttpRequest` to be signed.
 * @param signRequestOptions `SignRequestOptions` object containing values used to construct the signature.
 * @returns AWS API Signature to sign a request or url with.
 *
 * @internal
 */
const getSignature = (request, { credentialScope, longDate, secretAccessKey, shortDate, signingRegion, signingService, uriEscapePath, }) => {
    // step 1: create a canonical request
    const canonicalRequest = (0,_getCanonicalRequest_mjs__WEBPACK_IMPORTED_MODULE_0__.getCanonicalRequest)(request, uriEscapePath);
    // step 2: create a hash of the canonical request
    const hashedRequest = (0,_dataHashHelpers_mjs__WEBPACK_IMPORTED_MODULE_1__.getHashedDataAsHex)(null, canonicalRequest);
    // step 3: create a string to sign
    const stringToSign = (0,_getStringToSign_mjs__WEBPACK_IMPORTED_MODULE_2__.getStringToSign)(longDate, credentialScope, hashedRequest);
    // step 4: calculate the signature
    const signature = (0,_dataHashHelpers_mjs__WEBPACK_IMPORTED_MODULE_1__.getHashedDataAsHex)((0,_getSigningKey_mjs__WEBPACK_IMPORTED_MODULE_3__.getSigningKey)(secretAccessKey, shortDate, signingRegion, signingService), stringToSign);
    return signature;
};


//# sourceMappingURL=getSignature.mjs.map


/***/ }),

/***/ "../core/dist/esm/clients/middleware/signing/signer/signatureV4/utils/getSignedHeaders.mjs":
/*!*************************************************************************************************!*\
  !*** ../core/dist/esm/clients/middleware/signing/signer/signatureV4/utils/getSignedHeaders.mjs ***!
  \*************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getSignedHeaders: () => (/* binding */ getSignedHeaders)
/* harmony export */ });
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
/**
 * Returns signed headers.
 *
 * @param headers `headers` from the request.
 * @returns List of headers included in canonical headers, separated by semicolons (;). This indicates which headers
 * are part of the signing process. Header names must use lowercase characters and must appear in alphabetical order.
 *
 * @internal
 */
const getSignedHeaders = (headers) => Object.keys(headers)
    .map(key => key.toLowerCase())
    .sort()
    .join(';');


//# sourceMappingURL=getSignedHeaders.mjs.map


/***/ }),

/***/ "../core/dist/esm/clients/middleware/signing/signer/signatureV4/utils/getSigningKey.mjs":
/*!**********************************************************************************************!*\
  !*** ../core/dist/esm/clients/middleware/signing/signer/signatureV4/utils/getSigningKey.mjs ***!
  \**********************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getSigningKey: () => (/* binding */ getSigningKey)
/* harmony export */ });
/* harmony import */ var _constants_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../constants.mjs */ "../core/dist/esm/clients/middleware/signing/signer/signatureV4/constants.mjs");
/* harmony import */ var _dataHashHelpers_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dataHashHelpers.mjs */ "../core/dist/esm/clients/middleware/signing/signer/signatureV4/utils/dataHashHelpers.mjs");



// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
/**
 * Returns a signing key to be used for signing requests.
 *
 * @param secretAccessKey AWS secret access key from credentials.
 * @param date Current date in the format 'YYYYMMDD'.
 * @param region AWS region in which the service resides.
 * @param service Service to which the signed request is being sent.
 *
 * @returns `Uint8Array` calculated from its composite parts.
 *
 * @internal
 */
const getSigningKey = (secretAccessKey, date, region, service) => {
    const key = `${_constants_mjs__WEBPACK_IMPORTED_MODULE_0__.SIGNATURE_IDENTIFIER}${secretAccessKey}`;
    const dateKey = (0,_dataHashHelpers_mjs__WEBPACK_IMPORTED_MODULE_1__.getHashedData)(key, date);
    const regionKey = (0,_dataHashHelpers_mjs__WEBPACK_IMPORTED_MODULE_1__.getHashedData)(dateKey, region);
    const serviceKey = (0,_dataHashHelpers_mjs__WEBPACK_IMPORTED_MODULE_1__.getHashedData)(regionKey, service);
    const signingKey = (0,_dataHashHelpers_mjs__WEBPACK_IMPORTED_MODULE_1__.getHashedData)(serviceKey, _constants_mjs__WEBPACK_IMPORTED_MODULE_0__.KEY_TYPE_IDENTIFIER);
    return signingKey;
};


//# sourceMappingURL=getSigningKey.mjs.map


/***/ }),

/***/ "../core/dist/esm/clients/middleware/signing/signer/signatureV4/utils/getSigningValues.mjs":
/*!*************************************************************************************************!*\
  !*** ../core/dist/esm/clients/middleware/signing/signer/signatureV4/utils/getSigningValues.mjs ***!
  \*************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getSigningValues: () => (/* binding */ getSigningValues)
/* harmony export */ });
/* harmony import */ var _getCredentialScope_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./getCredentialScope.mjs */ "../core/dist/esm/clients/middleware/signing/signer/signatureV4/utils/getCredentialScope.mjs");
/* harmony import */ var _getFormattedDates_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getFormattedDates.mjs */ "../core/dist/esm/clients/middleware/signing/signer/signatureV4/utils/getFormattedDates.mjs");



// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
/**
 * Extracts common values used for signing both requests and urls.
 *
 * @param options `SignRequestOptions` object containing values used to construct the signature.
 * @returns Common `SigningValues` used for signing.
 *
 * @internal
 */
const getSigningValues = ({ credentials, signingDate = new Date(), signingRegion, signingService, uriEscapePath = true, }) => {
    // get properties from credentials
    const { accessKeyId, secretAccessKey, sessionToken } = credentials;
    // get formatted dates for signing
    const { longDate, shortDate } = (0,_getFormattedDates_mjs__WEBPACK_IMPORTED_MODULE_0__.getFormattedDates)(signingDate);
    // copy header and set signing properties
    const credentialScope = (0,_getCredentialScope_mjs__WEBPACK_IMPORTED_MODULE_1__.getCredentialScope)(shortDate, signingRegion, signingService);
    return {
        accessKeyId,
        credentialScope,
        longDate,
        secretAccessKey,
        sessionToken,
        shortDate,
        signingRegion,
        signingService,
        uriEscapePath,
    };
};


//# sourceMappingURL=getSigningValues.mjs.map


/***/ }),

/***/ "../core/dist/esm/clients/middleware/signing/signer/signatureV4/utils/getStringToSign.mjs":
/*!************************************************************************************************!*\
  !*** ../core/dist/esm/clients/middleware/signing/signer/signatureV4/utils/getStringToSign.mjs ***!
  \************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getStringToSign: () => (/* binding */ getStringToSign)
/* harmony export */ });
/* harmony import */ var _constants_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../constants.mjs */ "../core/dist/esm/clients/middleware/signing/signer/signatureV4/constants.mjs");


// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
/**
 * Returns a string to be signed.
 *
 * @param date Current date in the format 'YYYYMMDDThhmmssZ'.
 * @param credentialScope String representing the credential scope with format 'YYYYMMDD/region/service/aws4_request'.
 * @param hashedRequest Hashed canonical request.
 *
 * @returns A string created by by concatenating the following strings, separated by newline characters:
 * - Algorithm
 * - RequestDateTime
 * - CredentialScope
 * - HashedCanonicalRequest
 *
 * @internal
 */
const getStringToSign = (date, credentialScope, hashedRequest) => [_constants_mjs__WEBPACK_IMPORTED_MODULE_0__.SHA256_ALGORITHM_IDENTIFIER, date, credentialScope, hashedRequest].join('\n');


//# sourceMappingURL=getStringToSign.mjs.map


/***/ }),

/***/ "../core/dist/esm/clients/middleware/signing/utils/getSkewCorrectedDate.mjs":
/*!**********************************************************************************!*\
  !*** ../core/dist/esm/clients/middleware/signing/utils/getSkewCorrectedDate.mjs ***!
  \**********************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getSkewCorrectedDate: () => (/* binding */ getSkewCorrectedDate)
/* harmony export */ });
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
/**
 * Returns a `Date` that is corrected for clock skew.
 *
 * @param systemClockOffset The offset of the system clock in milliseconds.
 *
 * @returns `Date` representing the current time adjusted by the system clock offset.
 *
 * @internal
 */
const getSkewCorrectedDate = (systemClockOffset) => new Date(Date.now() + systemClockOffset);


//# sourceMappingURL=getSkewCorrectedDate.mjs.map


/***/ }),

/***/ "../core/dist/esm/clients/middleware/signing/utils/getUpdatedSystemClockOffset.mjs":
/*!*****************************************************************************************!*\
  !*** ../core/dist/esm/clients/middleware/signing/utils/getUpdatedSystemClockOffset.mjs ***!
  \*****************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getUpdatedSystemClockOffset: () => (/* binding */ getUpdatedSystemClockOffset)
/* harmony export */ });
/* harmony import */ var _isClockSkewed_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./isClockSkewed.mjs */ "../core/dist/esm/clients/middleware/signing/utils/isClockSkewed.mjs");


// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
/**
 * Returns the difference between clock time and the current system time if clock is skewed.
 *
 * @param clockTimeInMilliseconds Clock time in milliseconds.
 * @param currentSystemClockOffset Current system clock offset in milliseconds.
 *
 * @internal
 */
const getUpdatedSystemClockOffset = (clockTimeInMilliseconds, currentSystemClockOffset) => {
    if ((0,_isClockSkewed_mjs__WEBPACK_IMPORTED_MODULE_0__.isClockSkewed)(clockTimeInMilliseconds, currentSystemClockOffset)) {
        return clockTimeInMilliseconds - Date.now();
    }
    return currentSystemClockOffset;
};


//# sourceMappingURL=getUpdatedSystemClockOffset.mjs.map


/***/ }),

/***/ "../core/dist/esm/clients/middleware/signing/utils/isClockSkewed.mjs":
/*!***************************************************************************!*\
  !*** ../core/dist/esm/clients/middleware/signing/utils/isClockSkewed.mjs ***!
  \***************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   isClockSkewed: () => (/* binding */ isClockSkewed)
/* harmony export */ });
/* harmony import */ var _getSkewCorrectedDate_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getSkewCorrectedDate.mjs */ "../core/dist/esm/clients/middleware/signing/utils/getSkewCorrectedDate.mjs");


// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
// 5 mins in milliseconds. Ref: https://github.com/aws/aws-sdk-js-v3/blob/6c0f44fab30a1bb2134af47362a31332abc3666b/packages/middleware-signing/src/utils/isClockSkewed.ts#L10
const SKEW_WINDOW = 5 * 60 * 1000;
/**
 * Checks if the provided date is within the skew window of 5 minutes.
 *
 * @param clockTimeInMilliseconds Time to check for skew in milliseconds.
 * @param clockOffsetInMilliseconds Offset to check clock against in milliseconds.
 *
 * @returns True if skewed. False otherwise.
 *
 * @internal
 */
const isClockSkewed = (clockTimeInMilliseconds, clockOffsetInMilliseconds) => Math.abs((0,_getSkewCorrectedDate_mjs__WEBPACK_IMPORTED_MODULE_0__.getSkewCorrectedDate)(clockOffsetInMilliseconds).getTime() -
    clockTimeInMilliseconds) >= SKEW_WINDOW;


//# sourceMappingURL=isClockSkewed.mjs.map


/***/ }),

/***/ "../core/dist/esm/clients/middleware/userAgent/middleware.mjs":
/*!********************************************************************!*\
  !*** ../core/dist/esm/clients/middleware/userAgent/middleware.mjs ***!
  \********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   userAgentMiddlewareFactory: () => (/* binding */ userAgentMiddlewareFactory)
/* harmony export */ });
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
/**
 * Middleware injects user agent string to specified header(default to 'x-amz-user-agent'),
 * if the header is not set already.
 *
 * TODO: incorporate new user agent design
 */
const userAgentMiddlewareFactory = ({ userAgentHeader = 'x-amz-user-agent', userAgentValue = '', }) => next => {
    return async function userAgentMiddleware(request) {
        if (userAgentValue.trim().length === 0) {
            const result = await next(request);
            return result;
        }
        else {
            const headerName = userAgentHeader.toLowerCase();
            request.headers[headerName] = request.headers[headerName]
                ? `${request.headers[headerName]} ${userAgentValue}`
                : userAgentValue;
            const response = await next(request);
            return response;
        }
    };
};


//# sourceMappingURL=middleware.mjs.map


/***/ }),

/***/ "../core/dist/esm/clients/serde/json.mjs":
/*!***********************************************!*\
  !*** ../core/dist/esm/clients/serde/json.mjs ***!
  \***********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   parseJsonBody: () => (/* binding */ parseJsonBody),
/* harmony export */   parseJsonError: () => (/* binding */ parseJsonError)
/* harmony export */ });
/* harmony import */ var _responseInfo_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./responseInfo.mjs */ "../core/dist/esm/clients/serde/responseInfo.mjs");


// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
/**
 * Utility functions for serializing and deserializing of JSON protocol in general(including: REST-JSON, JSON-RPC, etc.)
 */
/**
 * Error parser for AWS JSON protocol.
 */
const parseJsonError = async (response) => {
    if (!response || response.statusCode < 300) {
        return;
    }
    const body = await parseJsonBody(response);
    const sanitizeErrorCode = (rawValue) => {
        const [cleanValue] = rawValue.toString().split(/[,:]+/);
        if (cleanValue.includes('#')) {
            return cleanValue.split('#')[1];
        }
        return cleanValue;
    };
    const code = sanitizeErrorCode(response.headers['x-amzn-errortype'] ??
        body.code ??
        body.__type ??
        'UnknownError');
    const message = body.message ?? body.Message ?? 'Unknown error';
    const error = new Error(message);
    return Object.assign(error, {
        name: code,
        $metadata: (0,_responseInfo_mjs__WEBPACK_IMPORTED_MODULE_0__.parseMetadata)(response),
    });
};
/**
 * Parse JSON response body to JavaScript object.
 */
const parseJsonBody = async (response) => {
    if (!response.body) {
        throw new Error('Missing response payload');
    }
    const output = await response.body.json();
    return Object.assign(output, {
        $metadata: (0,_responseInfo_mjs__WEBPACK_IMPORTED_MODULE_0__.parseMetadata)(response),
    });
};


//# sourceMappingURL=json.mjs.map


/***/ }),

/***/ "../core/dist/esm/clients/serde/responseInfo.mjs":
/*!*******************************************************!*\
  !*** ../core/dist/esm/clients/serde/responseInfo.mjs ***!
  \*******************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   parseMetadata: () => (/* binding */ parseMetadata)
/* harmony export */ });
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
const parseMetadata = (response) => {
    const { headers, statusCode } = response;
    return {
        ...(isMetadataBearer(response) ? response.$metadata : {}),
        httpStatusCode: statusCode,
        requestId: headers['x-amzn-requestid'] ??
            headers['x-amzn-request-id'] ??
            headers['x-amz-request-id'],
        extendedRequestId: headers['x-amz-id-2'],
        cfId: headers['x-amz-cf-id'],
    };
};
const isMetadataBearer = (response) => typeof response?.$metadata === 'object';


//# sourceMappingURL=responseInfo.mjs.map


/***/ }),

/***/ "../core/dist/esm/clients/utils/memoization.mjs":
/*!******************************************************!*\
  !*** ../core/dist/esm/clients/utils/memoization.mjs ***!
  \******************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   withMemoization: () => (/* binding */ withMemoization)
/* harmony export */ });
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
/**
 * Cache the payload of a response body. It allows multiple calls to the body,
 * for example, when reading the body in both retry decider and error deserializer.
 * Caching body is allowed here because we call the body accessor(blob(), json(),
 * etc.) when body is small or streaming implementation is not available(RN).
 *
 * @internal
 */
const withMemoization = (payloadAccessor) => {
    let cached;
    return () => {
        if (!cached) {
            // Explicitly not awaiting. Intermediate await would add overhead and
            // introduce a possible race in the event that this wrapper is called
            // again before the first `payloadAccessor` call resolves.
            cached = payloadAccessor();
        }
        return cached;
    };
};


//# sourceMappingURL=memoization.mjs.map


/***/ }),

/***/ "../core/dist/esm/constants.mjs":
/*!**************************************!*\
  !*** ../core/dist/esm/constants.mjs ***!
  \**************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AWS_CLOUDWATCH_CATEGORY: () => (/* binding */ AWS_CLOUDWATCH_CATEGORY),
/* harmony export */   NO_HUBCALLBACK_PROVIDED_EXCEPTION: () => (/* binding */ NO_HUBCALLBACK_PROVIDED_EXCEPTION),
/* harmony export */   USER_AGENT_HEADER: () => (/* binding */ USER_AGENT_HEADER)
/* harmony export */ });
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
// Logging constants
const AWS_CLOUDWATCH_CATEGORY = 'Logging';
const USER_AGENT_HEADER = 'x-amz-user-agent';
// Error exception code constants
const NO_HUBCALLBACK_PROVIDED_EXCEPTION = 'NoHubcallbackProvidedException';


//# sourceMappingURL=constants.mjs.map


/***/ }),

/***/ "../core/dist/esm/errors/APIError.mjs":
/*!********************************************!*\
  !*** ../core/dist/esm/errors/APIError.mjs ***!
  \********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ApiError: () => (/* binding */ ApiError)
/* harmony export */ });
/* harmony import */ var _AmplifyError_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AmplifyError.mjs */ "../core/dist/esm/errors/AmplifyError.mjs");


// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
/**
 * Error class for errors that associated with unsuccessful HTTP responses.
 * It's throw by API category REST API handlers and GraphQL query handlers for now.
 */
class ApiError extends _AmplifyError_mjs__WEBPACK_IMPORTED_MODULE_0__.AmplifyError {
    /**
     * The unwrapped HTTP response causing the given API error.
     */
    get response() {
        return this._response
            ? replicateApiErrorResponse(this._response)
            : undefined;
    }
    constructor(params) {
        super(params);
        // TODO: Delete the following 2 lines after we change the build target to >= es2015
        this.constructor = ApiError;
        Object.setPrototypeOf(this, ApiError.prototype);
        if (params.response) {
            this._response = params.response;
        }
    }
}
const replicateApiErrorResponse = (response) => ({
    ...response,
    headers: { ...response.headers },
});


//# sourceMappingURL=APIError.mjs.map


/***/ }),

/***/ "../core/dist/esm/errors/AmplifyError.mjs":
/*!************************************************!*\
  !*** ../core/dist/esm/errors/AmplifyError.mjs ***!
  \************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AmplifyError: () => (/* binding */ AmplifyError)
/* harmony export */ });
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
class AmplifyError extends Error {
    /**
     *  Constructs an AmplifyError.
     *
     * @param message text that describes the main problem.
     * @param underlyingError the underlying cause of the error.
     * @param recoverySuggestion suggestion to recover from the error.
     *
     */
    constructor({ message, name, recoverySuggestion, underlyingError, }) {
        super(message);
        this.name = name;
        this.underlyingError = underlyingError;
        this.recoverySuggestion = recoverySuggestion;
        // Hack for making the custom error class work when transpiled to es5
        // TODO: Delete the following 2 lines after we change the build target to >= es2015
        this.constructor = AmplifyError;
        Object.setPrototypeOf(this, AmplifyError.prototype);
    }
}


//# sourceMappingURL=AmplifyError.mjs.map


/***/ }),

/***/ "../core/dist/esm/types/errors.mjs":
/*!*****************************************!*\
  !*** ../core/dist/esm/types/errors.mjs ***!
  \*****************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AmplifyErrorCode: () => (/* binding */ AmplifyErrorCode)
/* harmony export */ });
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
var AmplifyErrorCode;
(function (AmplifyErrorCode) {
    AmplifyErrorCode["NoEndpointId"] = "NoEndpointId";
    AmplifyErrorCode["PlatformNotSupported"] = "PlatformNotSupported";
    AmplifyErrorCode["Unknown"] = "Unknown";
    AmplifyErrorCode["NetworkError"] = "NetworkError";
})(AmplifyErrorCode || (AmplifyErrorCode = {}));


//# sourceMappingURL=errors.mjs.map


/***/ }),

/***/ "../core/dist/esm/utils/amplifyUrl/index.mjs":
/*!***************************************************!*\
  !*** ../core/dist/esm/utils/amplifyUrl/index.mjs ***!
  \***************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AmplifyUrl: () => (/* binding */ AmplifyUrl),
/* harmony export */   AmplifyUrlSearchParams: () => (/* binding */ AmplifyUrlSearchParams)
/* harmony export */ });
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
const AmplifyUrl = URL;
const AmplifyUrlSearchParams = URLSearchParams;


//# sourceMappingURL=index.mjs.map


/***/ }),

/***/ "../core/dist/esm/utils/amplifyUuid/index.mjs":
/*!****************************************************!*\
  !*** ../core/dist/esm/utils/amplifyUuid/index.mjs ***!
  \****************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   amplifyUuid: () => (/* binding */ amplifyUuid)
/* harmony export */ });
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! uuid */ "../../node_modules/uuid/dist/esm-browser/v4.js");


// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
const amplifyUuid = uuid__WEBPACK_IMPORTED_MODULE_0__["default"];


//# sourceMappingURL=index.mjs.map


/***/ }),

/***/ "../core/dist/esm/utils/convert/base64/base64Encoder.mjs":
/*!***************************************************************!*\
  !*** ../core/dist/esm/utils/convert/base64/base64Encoder.mjs ***!
  \***************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   base64Encoder: () => (/* binding */ base64Encoder)
/* harmony export */ });
/* harmony import */ var _globalHelpers_index_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../globalHelpers/index.mjs */ "../core/dist/esm/utils/globalHelpers/index.mjs");
/* harmony import */ var _bytesToString_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./bytesToString.mjs */ "../core/dist/esm/utils/convert/base64/bytesToString.mjs");



// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
const base64Encoder = {
    /**
     * Convert input to base64-encoded string
     * @param input - string to convert to base64
     * @param options - encoding options that can optionally produce a base64url string
     * @returns base64-encoded string
     */
    convert(input, options = {
        urlSafe: false,
        skipPadding: false,
    }) {
        const inputStr = typeof input === 'string' ? input : (0,_bytesToString_mjs__WEBPACK_IMPORTED_MODULE_0__.bytesToString)(input);
        let encodedStr = (0,_globalHelpers_index_mjs__WEBPACK_IMPORTED_MODULE_1__.getBtoa)()(inputStr);
        // urlSafe char replacement and skipPadding options conform to the base64url spec
        // https://datatracker.ietf.org/doc/html/rfc4648#section-5
        if (options.urlSafe) {
            encodedStr = encodedStr.replace(/\+/g, '-').replace(/\//g, '_');
        }
        if (options.skipPadding) {
            encodedStr = encodedStr.replace(/=/g, '');
        }
        return encodedStr;
    },
};


//# sourceMappingURL=base64Encoder.mjs.map


/***/ }),

/***/ "../core/dist/esm/utils/convert/base64/bytesToString.mjs":
/*!***************************************************************!*\
  !*** ../core/dist/esm/utils/convert/base64/bytesToString.mjs ***!
  \***************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   bytesToString: () => (/* binding */ bytesToString)
/* harmony export */ });
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
function bytesToString(input) {
    return Array.from(input, byte => String.fromCodePoint(byte)).join('');
}


//# sourceMappingURL=bytesToString.mjs.map


/***/ }),

/***/ "../core/dist/esm/utils/globalHelpers/index.mjs":
/*!******************************************************!*\
  !*** ../core/dist/esm/utils/globalHelpers/index.mjs ***!
  \******************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getAtob: () => (/* binding */ getAtob),
/* harmony export */   getBtoa: () => (/* binding */ getBtoa),
/* harmony export */   getCrypto: () => (/* binding */ getCrypto)
/* harmony export */ });
/* harmony import */ var _errors_AmplifyError_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../errors/AmplifyError.mjs */ "../core/dist/esm/errors/AmplifyError.mjs");




// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
const getCrypto = () => {
    if (typeof window === 'object' && typeof window.crypto === 'object') {
        return window.crypto;
    }
    // Next.js global polyfill
    if (typeof crypto === 'object') {
        return crypto;
    }
    throw new _errors_AmplifyError_mjs__WEBPACK_IMPORTED_MODULE_0__.AmplifyError({
        name: 'MissingPolyfill',
        message: 'Cannot resolve the `crypto` function from the environment.',
    });
};
const getBtoa = () => {
    // browser
    if (typeof window !== 'undefined' && typeof window.btoa === 'function') {
        return window.btoa;
    }
    // Next.js global polyfill
    if (typeof btoa === 'function') {
        return btoa;
    }
    throw new _errors_AmplifyError_mjs__WEBPACK_IMPORTED_MODULE_0__.AmplifyError({
        name: 'Base64EncoderError',
        message: 'Cannot resolve the `btoa` function from the environment.',
    });
};
const getAtob = () => {
    // browser
    if (typeof window !== 'undefined' && typeof window.atob === 'function') {
        return window.atob;
    }
    // Next.js global polyfill
    if (typeof atob === 'function') {
        return atob;
    }
    throw new _errors_AmplifyError_mjs__WEBPACK_IMPORTED_MODULE_0__.AmplifyError({
        name: 'Base64EncoderError',
        message: 'Cannot resolve the `atob` function from the environment.',
    });
};


//# sourceMappingURL=index.mjs.map


/***/ }),

/***/ "../core/dist/esm/utils/isWebWorker.mjs":
/*!**********************************************!*\
  !*** ../core/dist/esm/utils/isWebWorker.mjs ***!
  \**********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   isWebWorker: () => (/* binding */ isWebWorker)
/* harmony export */ });
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
const isWebWorker = () => {
    if (typeof self === 'undefined') {
        return false;
    }
    const selfContext = self;
    return (typeof selfContext.WorkerGlobalScope !== 'undefined' &&
        self instanceof selfContext.WorkerGlobalScope);
};


//# sourceMappingURL=isWebWorker.mjs.map


/***/ }),

/***/ "../core/dist/esm/utils/retry/NonRetryableError.mjs":
/*!**********************************************************!*\
  !*** ../core/dist/esm/utils/retry/NonRetryableError.mjs ***!
  \**********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   NonRetryableError: () => (/* binding */ NonRetryableError)
/* harmony export */ });
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
class NonRetryableError extends Error {
    constructor() {
        super(...arguments);
        this.nonRetryable = true;
    }
}


//# sourceMappingURL=NonRetryableError.mjs.map


/***/ }),

/***/ "../core/dist/esm/utils/retry/constants.mjs":
/*!**************************************************!*\
  !*** ../core/dist/esm/utils/retry/constants.mjs ***!
  \**************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MAX_DELAY_MS: () => (/* binding */ MAX_DELAY_MS)
/* harmony export */ });
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
const MAX_DELAY_MS = 5 * 60 * 1000;


//# sourceMappingURL=constants.mjs.map


/***/ }),

/***/ "../core/dist/esm/utils/retry/isNonRetryableError.mjs":
/*!************************************************************!*\
  !*** ../core/dist/esm/utils/retry/isNonRetryableError.mjs ***!
  \************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   isNonRetryableError: () => (/* binding */ isNonRetryableError)
/* harmony export */ });
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
const isNonRetryableError = (obj) => {
    const key = 'nonRetryable';
    return obj && obj[key];
};


//# sourceMappingURL=isNonRetryableError.mjs.map


/***/ }),

/***/ "../core/dist/esm/utils/retry/jitteredBackoff.mjs":
/*!********************************************************!*\
  !*** ../core/dist/esm/utils/retry/jitteredBackoff.mjs ***!
  \********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   jitteredBackoff: () => (/* binding */ jitteredBackoff)
/* harmony export */ });
/* harmony import */ var _constants_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants.mjs */ "../core/dist/esm/utils/retry/constants.mjs");


// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
/**
 * @private
 * Internal use of Amplify only
 */
function jitteredBackoff(maxDelayMs = _constants_mjs__WEBPACK_IMPORTED_MODULE_0__.MAX_DELAY_MS) {
    const BASE_TIME_MS = 100;
    const JITTER_FACTOR = 100;
    return attempt => {
        const delay = 2 ** attempt * BASE_TIME_MS + JITTER_FACTOR * Math.random();
        return delay > maxDelayMs ? false : delay;
    };
}


//# sourceMappingURL=jitteredBackoff.mjs.map


/***/ }),

/***/ "../core/dist/esm/utils/retry/jitteredExponentialRetry.mjs":
/*!*****************************************************************!*\
  !*** ../core/dist/esm/utils/retry/jitteredExponentialRetry.mjs ***!
  \*****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   jitteredExponentialRetry: () => (/* binding */ jitteredExponentialRetry)
/* harmony export */ });
/* harmony import */ var _constants_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants.mjs */ "../core/dist/esm/utils/retry/constants.mjs");
/* harmony import */ var _jitteredBackoff_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./jitteredBackoff.mjs */ "../core/dist/esm/utils/retry/jitteredBackoff.mjs");
/* harmony import */ var _retry_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./retry.mjs */ "../core/dist/esm/utils/retry/retry.mjs");




// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
/**
 * @private
 * Internal use of Amplify only
 */
const jitteredExponentialRetry = (functionToRetry, args, maxDelayMs = _constants_mjs__WEBPACK_IMPORTED_MODULE_0__.MAX_DELAY_MS, onTerminate) => (0,_retry_mjs__WEBPACK_IMPORTED_MODULE_1__.retry)(functionToRetry, args, (0,_jitteredBackoff_mjs__WEBPACK_IMPORTED_MODULE_2__.jitteredBackoff)(maxDelayMs), onTerminate);


//# sourceMappingURL=jitteredExponentialRetry.mjs.map


/***/ }),

/***/ "../core/dist/esm/utils/retry/retry.mjs":
/*!**********************************************!*\
  !*** ../core/dist/esm/utils/retry/retry.mjs ***!
  \**********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   retry: () => (/* binding */ retry)
/* harmony export */ });
/* harmony import */ var _Logger_ConsoleLogger_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../Logger/ConsoleLogger.mjs */ "../core/dist/esm/Logger/ConsoleLogger.mjs");
/* harmony import */ var _isNonRetryableError_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./isNonRetryableError.mjs */ "../core/dist/esm/utils/retry/isNonRetryableError.mjs");



// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
const logger = new _Logger_ConsoleLogger_mjs__WEBPACK_IMPORTED_MODULE_0__.ConsoleLogger('retryUtil');
/**
 * @private
 * Internal use of Amplify only
 */
async function retry(functionToRetry, args, delayFn, onTerminate) {
    if (typeof functionToRetry !== 'function') {
        throw Error('functionToRetry must be a function');
    }
    // TODO(eslint): remove this linter suppression with refactoring.
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve, reject) => {
        let attempt = 0;
        let terminated = false;
        let timeout;
        let wakeUp = () => {
            // no-op
        }; // will be replaced with a resolver()
        // used after the loop if terminated while waiting for a timer.
        let lastError;
        onTerminate &&
            onTerminate.then(() => {
                // signal not to try anymore.
                terminated = true;
                // stop sleeping if we're sleeping.
                clearTimeout(timeout);
                wakeUp();
            });
        // TODO(eslint): remove this linter suppression with refactoring.
        // eslint-disable-next-line no-unmodified-loop-condition
        while (!terminated) {
            attempt++;
            logger.debug(`${functionToRetry.name} attempt #${attempt} with this vars: ${JSON.stringify(args)}`);
            try {
                resolve(await functionToRetry(...args));
                return;
            }
            catch (err) {
                lastError = err;
                logger.debug(`error on ${functionToRetry.name}`, err);
                if ((0,_isNonRetryableError_mjs__WEBPACK_IMPORTED_MODULE_1__.isNonRetryableError)(err)) {
                    logger.debug(`${functionToRetry.name} non retryable error`, err);
                    reject(err);
                    return;
                }
                const retryIn = delayFn(attempt, args, err);
                logger.debug(`${functionToRetry.name} retrying in ${retryIn} ms`);
                // we check `terminated` again here because it could have flipped
                // in the time it took `functionToRetry` to return.
                if (retryIn === false || terminated) {
                    reject(err);
                    return;
                }
                else {
                    await new Promise(_resolve => {
                        wakeUp = _resolve; // export wakeUp for onTerminate handling
                        timeout = setTimeout(wakeUp, retryIn);
                    });
                }
            }
        }
        // reached if terminated while waiting for a timer.
        reject(lastError);
    });
}


//# sourceMappingURL=retry.mjs.map


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!****************************!*\
  !*** ./dist/esm/index.mjs ***!
  \****************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CONNECTION_STATE_CHANGE: () => (/* reexport safe */ _Providers_constants_mjs__WEBPACK_IMPORTED_MODULE_3__.CONNECTION_STATE_CHANGE),
/* harmony export */   CONTROL_MSG: () => (/* reexport safe */ _types_PubSub_mjs__WEBPACK_IMPORTED_MODULE_4__.CONTROL_MSG),
/* harmony export */   ConnectionState: () => (/* reexport safe */ _types_PubSub_mjs__WEBPACK_IMPORTED_MODULE_4__.ConnectionState),
/* harmony export */   GraphQLAPI: () => (/* reexport safe */ _GraphQLAPI_mjs__WEBPACK_IMPORTED_MODULE_1__.GraphQLAPI),
/* harmony export */   GraphQLAPIClass: () => (/* reexport safe */ _GraphQLAPI_mjs__WEBPACK_IMPORTED_MODULE_1__.GraphQLAPIClass),
/* harmony export */   GraphQLAuthError: () => (/* reexport safe */ _types_index_mjs__WEBPACK_IMPORTED_MODULE_2__.GraphQLAuthError),
/* harmony export */   __amplify: () => (/* reexport safe */ _types_index_mjs__WEBPACK_IMPORTED_MODULE_2__.__amplify),
/* harmony export */   __authMode: () => (/* reexport safe */ _types_index_mjs__WEBPACK_IMPORTED_MODULE_2__.__authMode),
/* harmony export */   __authToken: () => (/* reexport safe */ _types_index_mjs__WEBPACK_IMPORTED_MODULE_2__.__authToken),
/* harmony export */   __headers: () => (/* reexport safe */ _types_index_mjs__WEBPACK_IMPORTED_MODULE_2__.__headers),
/* harmony export */   events: () => (/* reexport module object */ _internals_events_index_mjs__WEBPACK_IMPORTED_MODULE_0__),
/* harmony export */   getInternals: () => (/* reexport safe */ _types_index_mjs__WEBPACK_IMPORTED_MODULE_2__.getInternals),
/* harmony export */   graphqlOperation: () => (/* reexport safe */ _GraphQLAPI_mjs__WEBPACK_IMPORTED_MODULE_1__.graphqlOperation)
/* harmony export */ });
/* harmony import */ var _internals_events_index_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internals/events/index.mjs */ "./dist/esm/internals/events/index.mjs");
/* harmony import */ var _GraphQLAPI_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./GraphQLAPI.mjs */ "./dist/esm/GraphQLAPI.mjs");
/* harmony import */ var _types_index_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./types/index.mjs */ "./dist/esm/types/index.mjs");
/* harmony import */ var _Providers_constants_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Providers/constants.mjs */ "./dist/esm/Providers/constants.mjs");
/* harmony import */ var _types_PubSub_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./types/PubSub.mjs */ "./dist/esm/types/PubSub.mjs");






//# sourceMappingURL=index.mjs.map

})();

/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=aws-amplify-api-graphql.js.map