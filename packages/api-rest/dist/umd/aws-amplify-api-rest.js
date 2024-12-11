(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("aws_amplify_core"));
	else if(typeof define === 'function' && define.amd)
		define("aws_amplify_api-rest", ["aws_amplify_core"], factory);
	else if(typeof exports === 'object')
		exports["aws_amplify_api-rest"] = factory(require("aws_amplify_core"));
	else
		root["aws_amplify_api-rest"] = factory(root["aws_amplify_core"]);
})(self, (__WEBPACK_EXTERNAL_MODULE__aws_amplify_core__) => {
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

/***/ "./dist/esm/apis/common/handler.mjs":
/*!******************************************!*\
  !*** ./dist/esm/apis/common/handler.mjs ***!
  \******************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   transferHandler: () => (/* binding */ transferHandler)
/* harmony export */ });
/* harmony import */ var _aws_amplify_core_internals_aws_client_utils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @aws-amplify/core/internals/aws-client-utils */ "../core/dist/esm/clients/middleware/retry/defaultRetryDecider.mjs");
/* harmony import */ var _aws_amplify_core_internals_aws_client_utils__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @aws-amplify/core/internals/aws-client-utils */ "../core/dist/esm/clients/middleware/retry/jitteredBackoff.mjs");
/* harmony import */ var _aws_amplify_core_internals_aws_client_utils__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @aws-amplify/core/internals/aws-client-utils */ "../core/dist/esm/clients/handlers/authenticated.mjs");
/* harmony import */ var _aws_amplify_core_internals_aws_client_utils__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @aws-amplify/core/internals/aws-client-utils */ "../core/dist/esm/clients/handlers/unauthenticated.mjs");
/* harmony import */ var _errors_validation_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../errors/validation.mjs */ "./dist/esm/errors/validation.mjs");
/* harmony import */ var _utils_serviceError_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../utils/serviceError.mjs */ "./dist/esm/utils/serviceError.mjs");
/* harmony import */ var _utils_logger_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../utils/logger.mjs */ "./dist/esm/utils/logger.mjs");
/* harmony import */ var _utils_parseSigningInfo_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../utils/parseSigningInfo.mjs */ "./dist/esm/utils/parseSigningInfo.mjs");
/* harmony import */ var _utils_resolveHeaders_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../utils/resolveHeaders.mjs */ "./dist/esm/utils/resolveHeaders.mjs");








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

/***/ "./dist/esm/apis/common/publicApis.mjs":
/*!*********************************************!*\
  !*** ./dist/esm/apis/common/publicApis.mjs ***!
  \*********************************************/
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
/* harmony import */ var _utils_createCancellableOperation_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utils/createCancellableOperation.mjs */ "./dist/esm/utils/createCancellableOperation.mjs");
/* harmony import */ var _utils_parseSigningInfo_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../utils/parseSigningInfo.mjs */ "./dist/esm/utils/parseSigningInfo.mjs");
/* harmony import */ var _errors_validation_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../errors/validation.mjs */ "./dist/esm/errors/validation.mjs");
/* harmony import */ var _utils_resolveApiUrl_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../utils/resolveApiUrl.mjs */ "./dist/esm/utils/resolveApiUrl.mjs");
/* harmony import */ var _utils_logger_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../utils/logger.mjs */ "./dist/esm/utils/logger.mjs");
/* harmony import */ var _utils_isIamAuthApplicable_mjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../utils/isIamAuthApplicable.mjs */ "./dist/esm/utils/isIamAuthApplicable.mjs");
/* harmony import */ var _handler_mjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./handler.mjs */ "./dist/esm/apis/common/handler.mjs");










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

/***/ "./dist/esm/apis/index.mjs":
/*!*********************************!*\
  !*** ./dist/esm/apis/index.mjs ***!
  \*********************************/
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
/* harmony import */ var _common_publicApis_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./common/publicApis.mjs */ "./dist/esm/apis/common/publicApis.mjs");



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

/***/ "./dist/esm/errors/CanceledError.mjs":
/*!*******************************************!*\
  !*** ./dist/esm/errors/CanceledError.mjs ***!
  \*******************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CanceledError: () => (/* binding */ CanceledError),
/* harmony export */   isCancelError: () => (/* binding */ isCancelError)
/* harmony export */ });
/* harmony import */ var _RestApiError_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./RestApiError.mjs */ "./dist/esm/errors/RestApiError.mjs");


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

/***/ "./dist/esm/errors/RestApiError.mjs":
/*!******************************************!*\
  !*** ./dist/esm/errors/RestApiError.mjs ***!
  \******************************************/
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

/***/ "./dist/esm/errors/assertValidatonError.mjs":
/*!**************************************************!*\
  !*** ./dist/esm/errors/assertValidatonError.mjs ***!
  \**************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   assertValidationError: () => (/* binding */ assertValidationError)
/* harmony export */ });
/* harmony import */ var _RestApiError_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./RestApiError.mjs */ "./dist/esm/errors/RestApiError.mjs");
/* harmony import */ var _validation_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./validation.mjs */ "./dist/esm/errors/validation.mjs");



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

/***/ "./dist/esm/errors/validation.mjs":
/*!****************************************!*\
  !*** ./dist/esm/errors/validation.mjs ***!
  \****************************************/
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

/***/ "./dist/esm/utils/constants.mjs":
/*!**************************************!*\
  !*** ./dist/esm/utils/constants.mjs ***!
  \**************************************/
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

/***/ "./dist/esm/utils/createCancellableOperation.mjs":
/*!*******************************************************!*\
  !*** ./dist/esm/utils/createCancellableOperation.mjs ***!
  \*******************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createCancellableOperation: () => (/* binding */ createCancellableOperation)
/* harmony export */ });
/* harmony import */ var _errors_CanceledError_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../errors/CanceledError.mjs */ "./dist/esm/errors/CanceledError.mjs");
/* harmony import */ var _errors_validation_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../errors/validation.mjs */ "./dist/esm/errors/validation.mjs");
/* harmony import */ var _serviceError_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./serviceError.mjs */ "./dist/esm/utils/serviceError.mjs");
/* harmony import */ var _logger_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./logger.mjs */ "./dist/esm/utils/logger.mjs");






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

/***/ "./dist/esm/utils/isIamAuthApplicable.mjs":
/*!************************************************!*\
  !*** ./dist/esm/utils/isIamAuthApplicable.mjs ***!
  \************************************************/
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

/***/ "./dist/esm/utils/logger.mjs":
/*!***********************************!*\
  !*** ./dist/esm/utils/logger.mjs ***!
  \***********************************/
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

/***/ "./dist/esm/utils/parseSigningInfo.mjs":
/*!*********************************************!*\
  !*** ./dist/esm/utils/parseSigningInfo.mjs ***!
  \*********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   parseSigningInfo: () => (/* binding */ parseSigningInfo)
/* harmony export */ });
/* harmony import */ var _constants_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants.mjs */ "./dist/esm/utils/constants.mjs");


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

/***/ "./dist/esm/utils/resolveApiUrl.mjs":
/*!******************************************!*\
  !*** ./dist/esm/utils/resolveApiUrl.mjs ***!
  \******************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   resolveApiUrl: () => (/* binding */ resolveApiUrl)
/* harmony export */ });
/* harmony import */ var _aws_amplify_core_internals_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @aws-amplify/core/internals/utils */ "../core/dist/esm/utils/amplifyUrl/index.mjs");
/* harmony import */ var _errors_RestApiError_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../errors/RestApiError.mjs */ "./dist/esm/errors/RestApiError.mjs");
/* harmony import */ var _errors_assertValidatonError_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../errors/assertValidatonError.mjs */ "./dist/esm/errors/assertValidatonError.mjs");
/* harmony import */ var _errors_validation_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../errors/validation.mjs */ "./dist/esm/errors/validation.mjs");





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

/***/ "./dist/esm/utils/resolveHeaders.mjs":
/*!*******************************************!*\
  !*** ./dist/esm/utils/resolveHeaders.mjs ***!
  \*******************************************/
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

/***/ "./dist/esm/utils/serviceError.mjs":
/*!*****************************************!*\
  !*** ./dist/esm/utils/serviceError.mjs ***!
  \*****************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   parseRestApiServiceError: () => (/* binding */ parseRestApiServiceError)
/* harmony export */ });
/* harmony import */ var _aws_amplify_core_internals_aws_client_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @aws-amplify/core/internals/aws-client-utils */ "../core/dist/esm/clients/serde/json.mjs");
/* harmony import */ var _errors_RestApiError_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../errors/RestApiError.mjs */ "./dist/esm/errors/RestApiError.mjs");
/* harmony import */ var _errors_validation_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../errors/validation.mjs */ "./dist/esm/errors/validation.mjs");




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
/* harmony export */   del: () => (/* reexport safe */ _apis_index_mjs__WEBPACK_IMPORTED_MODULE_1__.del),
/* harmony export */   get: () => (/* reexport safe */ _apis_index_mjs__WEBPACK_IMPORTED_MODULE_1__.get),
/* harmony export */   head: () => (/* reexport safe */ _apis_index_mjs__WEBPACK_IMPORTED_MODULE_1__.head),
/* harmony export */   isCancelError: () => (/* reexport safe */ _errors_CanceledError_mjs__WEBPACK_IMPORTED_MODULE_0__.isCancelError),
/* harmony export */   patch: () => (/* reexport safe */ _apis_index_mjs__WEBPACK_IMPORTED_MODULE_1__.patch),
/* harmony export */   post: () => (/* reexport safe */ _apis_index_mjs__WEBPACK_IMPORTED_MODULE_1__.post),
/* harmony export */   put: () => (/* reexport safe */ _apis_index_mjs__WEBPACK_IMPORTED_MODULE_1__.put)
/* harmony export */ });
/* harmony import */ var _errors_CanceledError_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./errors/CanceledError.mjs */ "./dist/esm/errors/CanceledError.mjs");
/* harmony import */ var _apis_index_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./apis/index.mjs */ "./dist/esm/apis/index.mjs");


//# sourceMappingURL=index.mjs.map

})();

/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=aws-amplify-api-rest.js.map