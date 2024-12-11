(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("aws_amplify_core"));
	else if(typeof define === 'function' && define.amd)
		define("aws_amplify_analytics", ["aws_amplify_core"], factory);
	else if(typeof exports === 'object')
		exports["aws_amplify_analytics"] = factory(require("aws_amplify_core"));
	else
		root["aws_amplify_analytics"] = factory(root["aws_amplify_core"]);
})(this, (__WEBPACK_EXTERNAL_MODULE__aws_amplify_core__) => {
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

/***/ "./dist/esm/apis/disable.mjs":
/*!***********************************!*\
  !*** ./dist/esm/apis/disable.mjs ***!
  \***********************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   disable: () => (/* binding */ disable)
/* harmony export */ });
/* harmony import */ var _aws_amplify_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @aws-amplify/core */ "@aws-amplify/core");
/* harmony import */ var _utils_statusHelpers_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/statusHelpers.mjs */ "./dist/esm/utils/statusHelpers.mjs");









// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
/**
 * Disables the Analytics category.
 *
 * @note
 * When Analytics is disabled events will not be buffered or transmitted to your selected service. Any auto-tracking
 * behavior that you have configured via `configureAutoTrack` will not have any effect while Analytics is disabled.
 */
const disable = _utils_statusHelpers_mjs__WEBPACK_IMPORTED_MODULE_1__.disableAnalytics;


//# sourceMappingURL=disable.mjs.map


/***/ }),

/***/ "./dist/esm/apis/enable.mjs":
/*!**********************************!*\
  !*** ./dist/esm/apis/enable.mjs ***!
  \**********************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   enable: () => (/* binding */ enable)
/* harmony export */ });
/* harmony import */ var _aws_amplify_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @aws-amplify/core */ "@aws-amplify/core");
/* harmony import */ var _utils_statusHelpers_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/statusHelpers.mjs */ "./dist/esm/utils/statusHelpers.mjs");









// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
/**
 * Enables the Analytics category to permit the transmission of events.
 *
 * @note
 * Analytics is enabled by default. You do not need to call this API unless you have disabled Analytics.
 */
const enable = _utils_statusHelpers_mjs__WEBPACK_IMPORTED_MODULE_1__.enableAnalytics;


//# sourceMappingURL=enable.mjs.map


/***/ }),

/***/ "./dist/esm/errors/AnalyticsError.mjs":
/*!********************************************!*\
  !*** ./dist/esm/errors/AnalyticsError.mjs ***!
  \********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AnalyticsError: () => (/* binding */ AnalyticsError)
/* harmony export */ });
/* harmony import */ var _aws_amplify_core_internals_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @aws-amplify/core/internals/utils */ "../core/dist/esm/errors/AmplifyError.mjs");


// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
/**
 * @internal
 */
class AnalyticsError extends _aws_amplify_core_internals_utils__WEBPACK_IMPORTED_MODULE_0__.AmplifyError {
    constructor(params) {
        super(params);
        // Hack for making the custom error class work when transpiled to es5
        // TODO: Delete the following 2 lines after we change the build target to >= es2015
        this.constructor = AnalyticsError;
        Object.setPrototypeOf(this, AnalyticsError.prototype);
    }
}


//# sourceMappingURL=AnalyticsError.mjs.map


/***/ }),

/***/ "./dist/esm/errors/assertValidationError.mjs":
/*!***************************************************!*\
  !*** ./dist/esm/errors/assertValidationError.mjs ***!
  \***************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   assertValidationError: () => (/* binding */ assertValidationError)
/* harmony export */ });
/* harmony import */ var _AnalyticsError_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./AnalyticsError.mjs */ "./dist/esm/errors/AnalyticsError.mjs");
/* harmony import */ var _validation_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./validation.mjs */ "./dist/esm/errors/validation.mjs");



// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
/**
 * @internal
 */
function assertValidationError(assertion, name, message) {
    const { message: defaultMessage, recoverySuggestion } = _validation_mjs__WEBPACK_IMPORTED_MODULE_0__.validationErrorMap[name];
    if (!assertion) {
        throw new _AnalyticsError_mjs__WEBPACK_IMPORTED_MODULE_1__.AnalyticsError({
            name,
            message: message ?? defaultMessage,
            recoverySuggestion,
        });
    }
}


//# sourceMappingURL=assertValidationError.mjs.map


/***/ }),

/***/ "./dist/esm/errors/validation.mjs":
/*!****************************************!*\
  !*** ./dist/esm/errors/validation.mjs ***!
  \****************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AnalyticsValidationErrorCode: () => (/* binding */ AnalyticsValidationErrorCode),
/* harmony export */   validationErrorMap: () => (/* binding */ validationErrorMap)
/* harmony export */ });
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
var AnalyticsValidationErrorCode;
(function (AnalyticsValidationErrorCode) {
    AnalyticsValidationErrorCode["NoAppId"] = "NoAppId";
    AnalyticsValidationErrorCode["NoCredentials"] = "NoCredentials";
    AnalyticsValidationErrorCode["NoEventName"] = "NoEventName";
    AnalyticsValidationErrorCode["NoRegion"] = "NoRegion";
    AnalyticsValidationErrorCode["InvalidTracker"] = "InvalidTracker";
    AnalyticsValidationErrorCode["UnsupportedPlatform"] = "UnsupportedPlatform";
    AnalyticsValidationErrorCode["NoTrackingId"] = "NoTrackingId";
    AnalyticsValidationErrorCode["InvalidFlushSize"] = "InvalidFlushSize";
})(AnalyticsValidationErrorCode || (AnalyticsValidationErrorCode = {}));
const validationErrorMap = {
    [AnalyticsValidationErrorCode.NoAppId]: {
        message: 'Missing application id.',
    },
    [AnalyticsValidationErrorCode.NoCredentials]: {
        message: 'Credentials should not be empty.',
    },
    [AnalyticsValidationErrorCode.NoEventName]: {
        message: 'Events must specify a name.',
    },
    [AnalyticsValidationErrorCode.NoRegion]: {
        message: 'Missing region.',
    },
    [AnalyticsValidationErrorCode.InvalidTracker]: {
        message: 'Invalid tracker type specified.',
    },
    [AnalyticsValidationErrorCode.UnsupportedPlatform]: {
        message: 'Only session tracking is supported on React Native.',
    },
    [AnalyticsValidationErrorCode.InvalidFlushSize]: {
        message: 'Invalid FlushSize, it should be smaller than BufferSize',
    },
    [AnalyticsValidationErrorCode.NoTrackingId]: {
        message: 'A trackingId is required to use Amazon Personalize',
    },
};


//# sourceMappingURL=validation.mjs.map


/***/ }),

/***/ "./dist/esm/providers/pinpoint/apis/configureAutoTrack.mjs":
/*!*****************************************************************!*\
  !*** ./dist/esm/providers/pinpoint/apis/configureAutoTrack.mjs ***!
  \*****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   configureAutoTrack: () => (/* binding */ configureAutoTrack)
/* harmony export */ });
/* harmony import */ var _aws_amplify_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @aws-amplify/core */ "@aws-amplify/core");
/* harmony import */ var _utils_trackerHelpers_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../utils/trackerHelpers.mjs */ "./dist/esm/utils/trackerHelpers.mjs");
/* harmony import */ var _utils_trackerConfigHelpers_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../utils/trackerConfigHelpers.mjs */ "./dist/esm/utils/trackerConfigHelpers.mjs");
/* harmony import */ var _record_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./record.mjs */ "./dist/esm/providers/pinpoint/apis/record.mjs");








// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
// Configured Tracker instances for Pinpoint
const configuredTrackers = {};
// Callback that will emit an appropriate event to Pinpoint when required by the Tracker
const emitTrackingEvent = (eventName, attributes) => {
    (0,_record_mjs__WEBPACK_IMPORTED_MODULE_1__.record)({
        name: eventName,
        attributes,
    });
};
/**
 * Configures automatic event tracking for Pinpoint. This API will automatically transmit an analytic event when
 * configured events are detected within your application. This can include: DOM element events (via the `event`
 * tracker), session events (via the `session` tracker), and page view events (via the `pageView` tracker).
 *
 * @remark Only session tracking is currently supported on React Native.
 *
 * @param {ConfigureAutoTrackInput} params The input object to configure auto track behavior.
 *
 * @throws service: {@link UpdateEndpointException} - Thrown when the underlying Pinpoint service returns an error.
 * @throws validation: {@link AnalyticsValidationErrorCode} - Thrown when the provided parameters or library
 *  configuration is incorrect.
 */
const configureAutoTrack = (input) => {
    (0,_utils_trackerConfigHelpers_mjs__WEBPACK_IMPORTED_MODULE_2__.validateTrackerConfiguration)(input);
    // Initialize or update this provider's trackers
    (0,_utils_trackerHelpers_mjs__WEBPACK_IMPORTED_MODULE_3__.updateProviderTrackers)(input, emitTrackingEvent, configuredTrackers);
};


//# sourceMappingURL=configureAutoTrack.mjs.map


/***/ }),

/***/ "./dist/esm/providers/pinpoint/apis/flushEvents.mjs":
/*!**********************************************************!*\
  !*** ./dist/esm/providers/pinpoint/apis/flushEvents.mjs ***!
  \**********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   flushEvents: () => (/* binding */ flushEvents)
/* harmony export */ });
/* harmony import */ var _aws_amplify_core_internals_providers_pinpoint__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @aws-amplify/core/internals/providers/pinpoint */ "../core/dist/esm/providers/pinpoint/apis/flushEvents.mjs");
/* harmony import */ var _aws_amplify_core_internals_utils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @aws-amplify/core/internals/utils */ "../core/dist/esm/Platform/types.mjs");
/* harmony import */ var _aws_amplify_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @aws-amplify/core */ "@aws-amplify/core");
/* harmony import */ var _utils_resolveConfig_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/resolveConfig.mjs */ "./dist/esm/providers/pinpoint/utils/resolveConfig.mjs");
/* harmony import */ var _utils_resolveCredentials_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/resolveCredentials.mjs */ "./dist/esm/providers/pinpoint/utils/resolveCredentials.mjs");
/* harmony import */ var _utils_userAgent_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../utils/userAgent.mjs */ "./dist/esm/utils/userAgent.mjs");












// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
const logger = new _aws_amplify_core__WEBPACK_IMPORTED_MODULE_0__.ConsoleLogger('Analytics');
/**
 * Flushes all buffered Pinpoint events to the service.
 *
 * @note
 * This API will make a best-effort attempt to flush events from the buffer. Events recorded immediately after invoking
 * this API may not be included in the flush.
 */
const flushEvents = () => {
    const { appId, region, bufferSize, flushSize, flushInterval, resendLimit } = (0,_utils_resolveConfig_mjs__WEBPACK_IMPORTED_MODULE_1__.resolveConfig)();
    (0,_utils_resolveCredentials_mjs__WEBPACK_IMPORTED_MODULE_2__.resolveCredentials)()
        .then(({ credentials, identityId }) => {
        (0,_aws_amplify_core_internals_providers_pinpoint__WEBPACK_IMPORTED_MODULE_3__.flushEvents)({
            appId,
            region,
            credentials,
            identityId,
            bufferSize,
            flushSize,
            flushInterval,
            resendLimit,
            userAgentValue: (0,_utils_userAgent_mjs__WEBPACK_IMPORTED_MODULE_4__.getAnalyticsUserAgentString)(_aws_amplify_core_internals_utils__WEBPACK_IMPORTED_MODULE_5__.AnalyticsAction.Record),
        });
    })
        .catch(e => {
        logger.warn('Failed to flush events', e);
    });
};


//# sourceMappingURL=flushEvents.mjs.map


/***/ }),

/***/ "./dist/esm/providers/pinpoint/apis/identifyUser.mjs":
/*!***********************************************************!*\
  !*** ./dist/esm/providers/pinpoint/apis/identifyUser.mjs ***!
  \***********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   identifyUser: () => (/* binding */ identifyUser)
/* harmony export */ });
/* harmony import */ var _aws_amplify_core_internals_utils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @aws-amplify/core/internals/utils */ "../core/dist/esm/Platform/types.mjs");
/* harmony import */ var _aws_amplify_core_internals_providers_pinpoint__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @aws-amplify/core/internals/providers/pinpoint */ "../core/dist/esm/providers/pinpoint/apis/updateEndpoint.mjs");
/* harmony import */ var _aws_amplify_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @aws-amplify/core */ "@aws-amplify/core");
/* harmony import */ var _utils_userAgent_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../utils/userAgent.mjs */ "./dist/esm/utils/userAgent.mjs");
/* harmony import */ var _utils_resolveConfig_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/resolveConfig.mjs */ "./dist/esm/providers/pinpoint/utils/resolveConfig.mjs");
/* harmony import */ var _utils_resolveCredentials_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/resolveCredentials.mjs */ "./dist/esm/providers/pinpoint/utils/resolveCredentials.mjs");












// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
/**
 * Sends information about a user to Pinpoint. Sending user information allows you to associate a user to their user
 * profile and activities or actions in your application. Activity can be tracked across devices & platforms by using
 * the same `userId`.
 *
 * @param {IdentifyUserInput} params The input object used to construct requests sent to Pinpoint's UpdateEndpoint
 *  API.
 *
 * @throws service: {@link UpdateEndpointException} - Thrown when the underlying Pinpoint service returns an error.
 * @throws validation: {@link AnalyticsValidationErrorCode} - Thrown when the provided parameters or library
 *  configuration is incorrect.
 *
 * @returns A promise that will resolve when the operation is complete.
 *
 * @example
 * ```ts
 * // Identify a user with Pinpoint
 * await identifyUser({
 *     userId,
 *     userProfile: {
 *         email: 'userEmail@example.com'
 *         customProperties: {
 *             phoneNumber: ['555-555-5555'],
 *         },
 *     }
 * });
 * ```
 *
 * @example
 * ```ts
 * // Identify a user with Pinpoint with some additional demographics
 * await identifyUser({
 *     userId,
 *     userProfile: {
 *         email: 'userEmail@example.com'
 *         customProperties: {
 *             phoneNumber: ['555-555-5555'],
 *         },
 *         demographic: {
 *             platform: 'ios',
 *             timezone: 'America/Los_Angeles'
 *         }
 *     }
 * });
 */
const identifyUser = async ({ userId, userProfile, options, }) => {
    const { credentials, identityId } = await (0,_utils_resolveCredentials_mjs__WEBPACK_IMPORTED_MODULE_1__.resolveCredentials)();
    const { appId, region } = (0,_utils_resolveConfig_mjs__WEBPACK_IMPORTED_MODULE_2__.resolveConfig)();
    const { userAttributes } = options ?? {};
    await (0,_aws_amplify_core_internals_providers_pinpoint__WEBPACK_IMPORTED_MODULE_3__.updateEndpoint)({
        appId,
        category: 'Analytics',
        credentials,
        identityId,
        region,
        userAttributes,
        userId,
        userProfile,
        userAgentValue: (0,_utils_userAgent_mjs__WEBPACK_IMPORTED_MODULE_4__.getAnalyticsUserAgentString)(_aws_amplify_core_internals_utils__WEBPACK_IMPORTED_MODULE_5__.AnalyticsAction.IdentifyUser),
    });
};


//# sourceMappingURL=identifyUser.mjs.map


/***/ }),

/***/ "./dist/esm/providers/pinpoint/apis/record.mjs":
/*!*****************************************************!*\
  !*** ./dist/esm/providers/pinpoint/apis/record.mjs ***!
  \*****************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   record: () => (/* binding */ record)
/* harmony export */ });
/* harmony import */ var _aws_amplify_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @aws-amplify/core */ "@aws-amplify/core");
/* harmony import */ var _aws_amplify_core_internals_utils__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @aws-amplify/core/internals/utils */ "../core/dist/esm/Hub/index.mjs");
/* harmony import */ var _aws_amplify_core_internals_utils__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @aws-amplify/core/internals/utils */ "../core/dist/esm/Platform/types.mjs");
/* harmony import */ var _aws_amplify_core_internals_providers_pinpoint__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @aws-amplify/core/internals/providers/pinpoint */ "../core/dist/esm/providers/pinpoint/apis/record.mjs");
/* harmony import */ var _errors_assertValidationError_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../errors/assertValidationError.mjs */ "./dist/esm/errors/assertValidationError.mjs");
/* harmony import */ var _errors_validation_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../errors/validation.mjs */ "./dist/esm/errors/validation.mjs");
/* harmony import */ var _utils_statusHelpers_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../utils/statusHelpers.mjs */ "./dist/esm/utils/statusHelpers.mjs");
/* harmony import */ var _utils_userAgent_mjs__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../utils/userAgent.mjs */ "./dist/esm/utils/userAgent.mjs");
/* harmony import */ var _utils_resolveConfig_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/resolveConfig.mjs */ "./dist/esm/providers/pinpoint/utils/resolveConfig.mjs");
/* harmony import */ var _utils_resolveCredentials_mjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../utils/resolveCredentials.mjs */ "./dist/esm/providers/pinpoint/utils/resolveCredentials.mjs");














// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
const logger = new _aws_amplify_core__WEBPACK_IMPORTED_MODULE_0__.ConsoleLogger('Analytics');
/**
 * Records an Analytic event to Pinpoint. Events will be buffered and periodically sent to Pinpoint.
 *
 * @param params The input object used to construct the request.
 *
 * @throws validation: {@link AnalyticsValidationErrorCode} - Thrown when the provided parameters or library
 *  configuration is incorrect.
 *
 * @example
 * ```ts
 * // Send an event to Pinpoint
 * record({ name: eventName })
 * ```
 *
 * @example
 * ```ts
 * // Send an event to Pinpoint with metrics & custom attributes
 * record({
 *     name: eventName,
 *     attributes: {
 *         'my-attribute': attributeValue
 *     },
 *     metrics: {
 *         'my-metric': metricValue
 *     }
 * })
 * ```
 */
const record = (input) => {
    const { appId, region, bufferSize, flushSize, flushInterval, resendLimit } = (0,_utils_resolveConfig_mjs__WEBPACK_IMPORTED_MODULE_1__.resolveConfig)();
    if (!(0,_utils_statusHelpers_mjs__WEBPACK_IMPORTED_MODULE_2__.isAnalyticsEnabled)()) {
        logger.debug('Analytics is disabled, event will not be recorded.');
        return;
    }
    (0,_errors_assertValidationError_mjs__WEBPACK_IMPORTED_MODULE_3__.assertValidationError)(!!input.name, _errors_validation_mjs__WEBPACK_IMPORTED_MODULE_4__.AnalyticsValidationErrorCode.NoEventName);
    (0,_utils_resolveCredentials_mjs__WEBPACK_IMPORTED_MODULE_5__.resolveCredentials)()
        .then(({ credentials, identityId }) => {
        _aws_amplify_core__WEBPACK_IMPORTED_MODULE_0__.Hub.dispatch('analytics', { event: 'record', data: input, message: 'Recording Analytics event' }, 'Analytics', _aws_amplify_core_internals_utils__WEBPACK_IMPORTED_MODULE_6__.AMPLIFY_SYMBOL);
        (0,_aws_amplify_core_internals_providers_pinpoint__WEBPACK_IMPORTED_MODULE_7__.record)({
            appId,
            category: 'Analytics',
            credentials,
            event: input,
            identityId,
            region,
            userAgentValue: (0,_utils_userAgent_mjs__WEBPACK_IMPORTED_MODULE_8__.getAnalyticsUserAgentString)(_aws_amplify_core_internals_utils__WEBPACK_IMPORTED_MODULE_9__.AnalyticsAction.Record),
            bufferSize,
            flushSize,
            flushInterval,
            resendLimit,
        });
    })
        .catch(e => {
        // An error occured while fetching credentials or persisting the event to the buffer
        logger.warn('Failed to record event.', e);
    });
};


//# sourceMappingURL=record.mjs.map


/***/ }),

/***/ "./dist/esm/providers/pinpoint/utils/resolveConfig.mjs":
/*!*************************************************************!*\
  !*** ./dist/esm/providers/pinpoint/utils/resolveConfig.mjs ***!
  \*************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   resolveConfig: () => (/* binding */ resolveConfig)
/* harmony export */ });
/* harmony import */ var _aws_amplify_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @aws-amplify/core */ "@aws-amplify/core");
/* harmony import */ var _errors_assertValidationError_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../errors/assertValidationError.mjs */ "./dist/esm/errors/assertValidationError.mjs");
/* harmony import */ var _errors_validation_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../errors/validation.mjs */ "./dist/esm/errors/validation.mjs");





// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
/**
 * @internal
 */
const resolveConfig = () => {
    const { appId, region, bufferSize, flushSize, flushInterval, resendLimit } = _aws_amplify_core__WEBPACK_IMPORTED_MODULE_0__.Amplify.getConfig().Analytics?.Pinpoint ?? {};
    (0,_errors_assertValidationError_mjs__WEBPACK_IMPORTED_MODULE_1__.assertValidationError)(!!appId, _errors_validation_mjs__WEBPACK_IMPORTED_MODULE_2__.AnalyticsValidationErrorCode.NoAppId);
    (0,_errors_assertValidationError_mjs__WEBPACK_IMPORTED_MODULE_1__.assertValidationError)(!!region, _errors_validation_mjs__WEBPACK_IMPORTED_MODULE_2__.AnalyticsValidationErrorCode.NoRegion);
    return { appId, region, bufferSize, flushSize, flushInterval, resendLimit };
};


//# sourceMappingURL=resolveConfig.mjs.map


/***/ }),

/***/ "./dist/esm/providers/pinpoint/utils/resolveCredentials.mjs":
/*!******************************************************************!*\
  !*** ./dist/esm/providers/pinpoint/utils/resolveCredentials.mjs ***!
  \******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   resolveCredentials: () => (/* binding */ resolveCredentials)
/* harmony export */ });
/* harmony import */ var _aws_amplify_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @aws-amplify/core */ "@aws-amplify/core");
/* harmony import */ var _errors_assertValidationError_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../errors/assertValidationError.mjs */ "./dist/esm/errors/assertValidationError.mjs");
/* harmony import */ var _errors_validation_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../errors/validation.mjs */ "./dist/esm/errors/validation.mjs");





// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
/**
 * @internal
 */
const resolveCredentials = async () => {
    const { credentials, identityId } = await (0,_aws_amplify_core__WEBPACK_IMPORTED_MODULE_0__.fetchAuthSession)();
    (0,_errors_assertValidationError_mjs__WEBPACK_IMPORTED_MODULE_1__.assertValidationError)(!!credentials, _errors_validation_mjs__WEBPACK_IMPORTED_MODULE_2__.AnalyticsValidationErrorCode.NoCredentials);
    return { credentials, identityId };
};


//# sourceMappingURL=resolveCredentials.mjs.map


/***/ }),

/***/ "./dist/esm/trackers/EventTracker.mjs":
/*!********************************************!*\
  !*** ./dist/esm/trackers/EventTracker.mjs ***!
  \********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   EventTracker: () => (/* binding */ EventTracker)
/* harmony export */ });
/* harmony import */ var _aws_amplify_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @aws-amplify/core */ "@aws-amplify/core");
/* harmony import */ var _aws_amplify_core_internals_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @aws-amplify/core/internals/utils */ "../core/dist/esm/utils/isBrowser.mjs");



// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
const DEFAULT_EVENTS = ['click'];
const DEFAULT_SELECTOR_PREFIX = 'data-amplify-analytics-';
const DEFAULT_EVENT_NAME = 'event'; // Default event name as sent to the analytics provider
const logger = new _aws_amplify_core__WEBPACK_IMPORTED_MODULE_0__.ConsoleLogger('EventTracker');
class EventTracker {
    constructor(eventRecorder, options) {
        this.options = {};
        this.trackerActive = false;
        this.eventRecorder = eventRecorder;
        this.handleDocEvent = this.handleDocEvent.bind(this);
        this.configure(eventRecorder, options);
    }
    configure(eventRecorder, options) {
        this.eventRecorder = eventRecorder;
        // Clean up any existing listeners
        this.cleanup();
        // Apply defaults
        this.options = {
            attributes: options?.attributes ?? undefined,
            events: options?.events ?? DEFAULT_EVENTS,
            selectorPrefix: options?.selectorPrefix ?? DEFAULT_SELECTOR_PREFIX,
        };
        // Register event listeners
        if ((0,_aws_amplify_core_internals_utils__WEBPACK_IMPORTED_MODULE_1__.isBrowser)()) {
            this.options.events?.forEach(targetEvent => {
                document.addEventListener(targetEvent, this.handleDocEvent, {
                    capture: true,
                });
            });
            this.trackerActive = true;
        }
    }
    cleanup() {
        // No-op if document listener is not active
        if (!this.trackerActive) {
            return;
        }
        // Clean up event listeners
        this.options.events?.forEach(targetEvent => {
            document.removeEventListener(targetEvent, this.handleDocEvent, {
                capture: true,
            });
        });
    }
    handleDocEvent(event) {
        /**
         * Example DOM element:
         *
         * ```
         * <button
         *   data-amplify-analytics-on="click"
         *   data-amplify-analytics-name="click"
         *   data-amplify-analytics-attrs="attr1:attr1_value,attr2:attr2_value"
         * />
         * ```
         */
        const triggerSelector = `[${this.options.selectorPrefix}on]`;
        const attrSelector = `${this.options.selectorPrefix}attrs`;
        const eventNameSelector = `${this.options.selectorPrefix}name`;
        const eventSource = event.target;
        // Validate that the triggering event type is being tracked
        if (!this.options.events?.includes(event.type)) {
            return;
        }
        if (eventSource instanceof HTMLElement) {
            const target = eventSource.closest(triggerSelector);
            if (target) {
                // Parse event name from the element
                const eventName = target.getAttribute(eventNameSelector) || DEFAULT_EVENT_NAME;
                // Parse attributes from the element
                const elementAttributes = {};
                const rawElementAttributes = target.getAttribute(attrSelector);
                rawElementAttributes?.split(/\s*,\s*/).forEach(attr => {
                    const tmp = attr.trim().split(/\s*:\s*/);
                    elementAttributes[tmp[0]] = tmp[1];
                });
                // Assemble final list of attributes
                const attributes = Object.assign({
                    type: event.type,
                    target: `${target.localName} with id ${target.id}`,
                }, this.options.attributes, elementAttributes);
                logger.debug('Recording automatically tracked DOM event', {
                    eventName,
                    attributes,
                });
                this.eventRecorder(eventName, attributes);
            }
        }
    }
}


//# sourceMappingURL=EventTracker.mjs.map


/***/ }),

/***/ "./dist/esm/trackers/PageViewTracker.mjs":
/*!***********************************************!*\
  !*** ./dist/esm/trackers/PageViewTracker.mjs ***!
  \***********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PageViewTracker: () => (/* binding */ PageViewTracker)
/* harmony export */ });
/* harmony import */ var _aws_amplify_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @aws-amplify/core */ "@aws-amplify/core");
/* harmony import */ var _aws_amplify_core_internals_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @aws-amplify/core/internals/utils */ "../core/dist/esm/utils/isBrowser.mjs");



// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
const logger = new _aws_amplify_core__WEBPACK_IMPORTED_MODULE_0__.ConsoleLogger('PageViewTracker');
const DEFAULT_EVENT_NAME = 'pageView';
const DEFAULT_APP_TYPE = 'singlePage';
const DEFAULT_URL_PROVIDER = () => {
    return window.location.origin + window.location.pathname;
};
const PREV_URL_STORAGE_KEY = 'aws-amplify-analytics-prevUrl';
class PageViewTracker {
    constructor(eventRecorder, options) {
        this.options = {};
        this.trackerActive = true;
        this.eventRecorder = eventRecorder;
        this.spaTrackingActive = false;
        this.handleLocationChange = this.handleLocationChange.bind(this);
        this.configure(eventRecorder, options);
    }
    configure(eventRecorder, options) {
        this.eventRecorder = eventRecorder;
        // Clean up any existing listeners
        this.cleanup();
        // Apply defaults
        this.options = {
            appType: options?.appType ?? DEFAULT_APP_TYPE,
            attributes: options?.attributes ?? undefined,
            eventName: this.options?.eventName ?? DEFAULT_EVENT_NAME,
            urlProvider: this.options?.urlProvider ?? DEFAULT_URL_PROVIDER,
        };
        // Configure SPA or MPA page view tracking
        if ((0,_aws_amplify_core_internals_utils__WEBPACK_IMPORTED_MODULE_1__.isBrowser)()) {
            if (this.options.appType === 'singlePage') {
                this.setupSPATracking();
            }
            else {
                this.setupMPATracking();
            }
            this.trackerActive = true;
        }
    }
    cleanup() {
        // No-op if document listener is not active
        if (!this.trackerActive) {
            return;
        }
        // Clean up SPA page view listeners
        if (this.spaTrackingActive) {
            window.history.pushState = this.originalPushState;
            window.history.replaceState = this.originalReplaceState;
            this.pushStateProxy?.revoke();
            this.replaceStateProxy?.revoke();
            window.removeEventListener('popstate', this.handleLocationChange);
            this.spaTrackingActive = false;
        }
    }
    setupSPATracking() {
        if (!this.spaTrackingActive) {
            // Configure proxies on History APIs
            this.pushStateProxy = Proxy.revocable(window.history.pushState, {
                apply: (target, thisArg, args) => {
                    target.apply(thisArg, args);
                    this.handleLocationChange();
                },
            });
            this.replaceStateProxy = Proxy.revocable(window.history.replaceState, {
                apply: (target, thisArg, args) => {
                    target.apply(thisArg, args);
                    this.handleLocationChange();
                },
            });
            this.originalPushState = window.history.pushState;
            this.originalReplaceState = window.history.replaceState;
            window.history.pushState = this.pushStateProxy.proxy;
            window.history.replaceState = this.replaceStateProxy.proxy;
            window.addEventListener('popstate', this.handleLocationChange);
            sessionStorage.removeItem(PREV_URL_STORAGE_KEY);
            this.spaTrackingActive = true;
        }
    }
    setupMPATracking() {
        this.handleLocationChange();
    }
    handleLocationChange() {
        const currentUrl = this.options.urlProvider();
        const eventName = this.options.eventName || DEFAULT_EVENT_NAME;
        if (this.urlHasChanged()) {
            sessionStorage.setItem(PREV_URL_STORAGE_KEY, currentUrl);
            // Assemble attribute list
            const attributes = Object.assign({
                url: currentUrl,
            }, this.options.attributes);
            logger.debug('Recording automatically tracked page view event', {
                eventName,
                attributes,
            });
            this.eventRecorder(eventName, attributes);
        }
    }
    urlHasChanged() {
        const prevUrl = sessionStorage.getItem(PREV_URL_STORAGE_KEY);
        const currUrl = this.options.urlProvider();
        return currUrl !== prevUrl;
    }
}


//# sourceMappingURL=PageViewTracker.mjs.map


/***/ }),

/***/ "./dist/esm/trackers/SessionTracker.mjs":
/*!**********************************************!*\
  !*** ./dist/esm/trackers/SessionTracker.mjs ***!
  \**********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SessionTracker: () => (/* binding */ SessionTracker)
/* harmony export */ });
/* harmony import */ var _aws_amplify_core_internals_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @aws-amplify/core/internals/utils */ "../core/dist/esm/utils/sessionListener/index.mjs");
/* harmony import */ var _aws_amplify_core_internals_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @aws-amplify/core/internals/utils */ "../core/dist/esm/utils/sessionListener/constants.mjs");
/* harmony import */ var _aws_amplify_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @aws-amplify/core */ "@aws-amplify/core");



// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
const logger = new _aws_amplify_core__WEBPACK_IMPORTED_MODULE_0__.ConsoleLogger('SessionTracker');
class SessionTracker {
    constructor(eventRecorder, options) {
        this.options = {};
        this.eventRecorder = eventRecorder;
        this.sessionTrackingActive = false;
        this.initialEventSent = false;
        this.handleStateChange = this.handleStateChange.bind(this);
        this.configure(eventRecorder, options);
    }
    configure(eventRecorder, options) {
        this.eventRecorder = eventRecorder;
        // Clean up any existing listeners
        this.cleanup();
        // Apply defaults
        this.options = {
            attributes: options?.attributes ?? {},
        };
        // Setup state listeners
        if (!this.sessionTrackingActive) {
            _aws_amplify_core_internals_utils__WEBPACK_IMPORTED_MODULE_1__.sessionListener.addStateChangeListener(this.handleStateChange, !this.initialEventSent);
            this.sessionTrackingActive = true;
        }
    }
    cleanup() {
        if (this.sessionTrackingActive) {
            _aws_amplify_core_internals_utils__WEBPACK_IMPORTED_MODULE_1__.sessionListener.removeStateChangeListener(this.handleStateChange);
        }
        this.sessionTrackingActive = false;
    }
    handleStateChange(state) {
        if (state === 'started') {
            this.sessionStarted();
        }
        else {
            this.sessionStopped();
        }
    }
    sessionStarted() {
        const attributes = this.options.attributes ?? {};
        logger.debug('Recording automatically tracked page view event', {
            SESSION_START_EVENT: _aws_amplify_core_internals_utils__WEBPACK_IMPORTED_MODULE_2__.SESSION_START_EVENT,
            attributes,
        });
        this.eventRecorder(_aws_amplify_core_internals_utils__WEBPACK_IMPORTED_MODULE_2__.SESSION_START_EVENT, attributes);
        // NOTE: The initial event will not be re-sent on re-configuration (e.g. to add additional custom attributes)
        if (!this.initialEventSent) {
            this.initialEventSent = true;
        }
    }
    sessionStopped() {
        const attributes = this.options.attributes ?? {};
        logger.debug('Recording automatically tracked page view event', {
            SESSION_STOP_EVENT: _aws_amplify_core_internals_utils__WEBPACK_IMPORTED_MODULE_2__.SESSION_STOP_EVENT,
            attributes,
        });
        this.eventRecorder(_aws_amplify_core_internals_utils__WEBPACK_IMPORTED_MODULE_2__.SESSION_STOP_EVENT, attributes);
    }
}


//# sourceMappingURL=SessionTracker.mjs.map


/***/ }),

/***/ "./dist/esm/utils/statusHelpers.mjs":
/*!******************************************!*\
  !*** ./dist/esm/utils/statusHelpers.mjs ***!
  \******************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   disableAnalytics: () => (/* binding */ disableAnalytics),
/* harmony export */   enableAnalytics: () => (/* binding */ enableAnalytics),
/* harmony export */   isAnalyticsEnabled: () => (/* binding */ isAnalyticsEnabled)
/* harmony export */ });
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
let analyticsEnabled = true;
const enableAnalytics = () => {
    analyticsEnabled = true;
};
const disableAnalytics = () => {
    analyticsEnabled = false;
};
/**
 * Returns the current status of the Analytics category.
 */
const isAnalyticsEnabled = () => analyticsEnabled;


//# sourceMappingURL=statusHelpers.mjs.map


/***/ }),

/***/ "./dist/esm/utils/trackerConfigHelpers.mjs":
/*!*************************************************!*\
  !*** ./dist/esm/utils/trackerConfigHelpers.mjs ***!
  \*************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   validateTrackerConfiguration: () => (/* binding */ validateTrackerConfiguration)
/* harmony export */ });
/* harmony import */ var _errors_assertValidationError_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../errors/assertValidationError.mjs */ "./dist/esm/errors/assertValidationError.mjs");
/* harmony import */ var _errors_validation_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../errors/validation.mjs */ "./dist/esm/errors/validation.mjs");




// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
/**
 * Validates tracker configuration.
 */
const validateTrackerConfiguration = (input) => {
    (0,_errors_assertValidationError_mjs__WEBPACK_IMPORTED_MODULE_0__.assertValidationError)(input.type === 'event' ||
        input.type === 'pageView' ||
        input.type === 'session', _errors_validation_mjs__WEBPACK_IMPORTED_MODULE_1__.AnalyticsValidationErrorCode.InvalidTracker);
};


//# sourceMappingURL=trackerConfigHelpers.mjs.map


/***/ }),

/***/ "./dist/esm/utils/trackerHelpers.mjs":
/*!*******************************************!*\
  !*** ./dist/esm/utils/trackerHelpers.mjs ***!
  \*******************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   updateProviderTrackers: () => (/* binding */ updateProviderTrackers)
/* harmony export */ });
/* harmony import */ var _trackers_EventTracker_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../trackers/EventTracker.mjs */ "./dist/esm/trackers/EventTracker.mjs");
/* harmony import */ var _trackers_PageViewTracker_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../trackers/PageViewTracker.mjs */ "./dist/esm/trackers/PageViewTracker.mjs");
/* harmony import */ var _trackers_SessionTracker_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../trackers/SessionTracker.mjs */ "./dist/esm/trackers/SessionTracker.mjs");




// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
/**
 * Updates a provider's trackers as appropriate for the provided auto-track configuration.
 *
 * @remark
 * This utility will mutate the provider's configured trackers via `providerTrackers`.
 */
const updateProviderTrackers = (input, providerEventRecorder, providerTrackers) => {
    let trackerInstance;
    const trackerType = input.type;
    const currentTracker = providerTrackers[trackerType];
    // Check if the tracker was disabled & should be cleaned up
    if (!input.enable) {
        if (currentTracker) {
            currentTracker.cleanup();
            delete providerTrackers[trackerType];
        }
        return;
    }
    // Re-configure the existing tracker, or create & configure an instance if it doesn't exist yet
    if (currentTracker) {
        currentTracker.configure(providerEventRecorder, input.options);
        return;
    }
    // Create a new tracker instance for the type
    if (trackerType === 'event') {
        trackerInstance = new _trackers_EventTracker_mjs__WEBPACK_IMPORTED_MODULE_0__.EventTracker(providerEventRecorder, input.options);
    }
    else if (trackerType === 'pageView') {
        trackerInstance = new _trackers_PageViewTracker_mjs__WEBPACK_IMPORTED_MODULE_1__.PageViewTracker(providerEventRecorder, input.options);
    }
    else if (trackerType === 'session') {
        trackerInstance = new _trackers_SessionTracker_mjs__WEBPACK_IMPORTED_MODULE_2__.SessionTracker(providerEventRecorder, input.options);
    }
    if (trackerInstance) {
        providerTrackers[trackerType] = trackerInstance;
    }
};


//# sourceMappingURL=trackerHelpers.mjs.map


/***/ }),

/***/ "./dist/esm/utils/userAgent.mjs":
/*!**************************************!*\
  !*** ./dist/esm/utils/userAgent.mjs ***!
  \**************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getAnalyticsUserAgent: () => (/* binding */ getAnalyticsUserAgent),
/* harmony export */   getAnalyticsUserAgentString: () => (/* binding */ getAnalyticsUserAgentString)
/* harmony export */ });
/* harmony import */ var _aws_amplify_core_internals_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @aws-amplify/core/internals/utils */ "../core/dist/esm/Platform/index.mjs");
/* harmony import */ var _aws_amplify_core_internals_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @aws-amplify/core/internals/utils */ "../core/dist/esm/Platform/types.mjs");


// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
function getAnalyticsUserAgent(action) {
    return (0,_aws_amplify_core_internals_utils__WEBPACK_IMPORTED_MODULE_0__.getAmplifyUserAgentObject)({
        category: _aws_amplify_core_internals_utils__WEBPACK_IMPORTED_MODULE_1__.Category.Analytics,
        action,
    });
}
function getAnalyticsUserAgentString(action) {
    return (0,_aws_amplify_core_internals_utils__WEBPACK_IMPORTED_MODULE_0__.getAmplifyUserAgent)({
        category: _aws_amplify_core_internals_utils__WEBPACK_IMPORTED_MODULE_1__.Category.Analytics,
        action,
    });
}


//# sourceMappingURL=userAgent.mjs.map


/***/ }),

/***/ "../core/dist/esm/Cache/StorageCache.mjs":
/*!***********************************************!*\
  !*** ../core/dist/esm/Cache/StorageCache.mjs ***!
  \***********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   StorageCache: () => (/* binding */ StorageCache)
/* harmony export */ });
/* harmony import */ var _Logger_ConsoleLogger_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Logger/ConsoleLogger.mjs */ "../core/dist/esm/Logger/ConsoleLogger.mjs");
/* harmony import */ var _storage_KeyValueStorage_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../storage/KeyValueStorage.mjs */ "../core/dist/esm/storage/KeyValueStorage.mjs");
/* harmony import */ var _storage_utils_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../storage/utils.mjs */ "../core/dist/esm/storage/utils.mjs");
/* harmony import */ var _constants_mjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./constants.mjs */ "../core/dist/esm/Cache/constants.mjs");
/* harmony import */ var _StorageCacheCommon_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./StorageCacheCommon.mjs */ "../core/dist/esm/Cache/StorageCacheCommon.mjs");
/* harmony import */ var _utils_cacheHelpers_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./utils/cacheHelpers.mjs */ "../core/dist/esm/Cache/utils/cacheHelpers.mjs");








// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
const logger = new _Logger_ConsoleLogger_mjs__WEBPACK_IMPORTED_MODULE_0__.ConsoleLogger('StorageCache');
/**
 * Customized storage based on the SessionStorage or LocalStorage with LRU implemented
 */
class StorageCache extends _StorageCacheCommon_mjs__WEBPACK_IMPORTED_MODULE_1__.StorageCacheCommon {
    /**
     * initialize the cache
     * @param config - the configuration of the cache
     */
    constructor(config) {
        const storage = (0,_storage_utils_mjs__WEBPACK_IMPORTED_MODULE_2__.getLocalStorageWithFallback)();
        super({ config, keyValueStorage: new _storage_KeyValueStorage_mjs__WEBPACK_IMPORTED_MODULE_3__.KeyValueStorage(storage) });
        this.storage = storage;
        this.getItem = this.getItem.bind(this);
        this.setItem = this.setItem.bind(this);
        this.removeItem = this.removeItem.bind(this);
    }
    async getAllCacheKeys(options) {
        const { omitSizeKey } = options ?? {};
        const keys = [];
        for (let i = 0; i < this.storage.length; i++) {
            const key = this.storage.key(i);
            if (omitSizeKey && key === (0,_utils_cacheHelpers_mjs__WEBPACK_IMPORTED_MODULE_4__.getCurrentSizeKey)(this.config.keyPrefix)) {
                continue;
            }
            if (key?.startsWith(this.config.keyPrefix)) {
                keys.push(key.substring(this.config.keyPrefix.length));
            }
        }
        return keys;
    }
    /**
     * Return a new instance of cache with customized configuration.
     * @param {Object} config - the customized configuration
     * @return {Object} - the new instance of Cache
     */
    createInstance(config) {
        if (!config.keyPrefix || config.keyPrefix === _constants_mjs__WEBPACK_IMPORTED_MODULE_5__.defaultConfig.keyPrefix) {
            logger.error('invalid keyPrefix, setting keyPrefix with timeStamp');
            config.keyPrefix = _utils_cacheHelpers_mjs__WEBPACK_IMPORTED_MODULE_4__.getCurrentTime.toString();
        }
        return new StorageCache(config);
    }
}


//# sourceMappingURL=StorageCache.mjs.map


/***/ }),

/***/ "../core/dist/esm/Cache/StorageCacheCommon.mjs":
/*!*****************************************************!*\
  !*** ../core/dist/esm/Cache/StorageCacheCommon.mjs ***!
  \*****************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   StorageCacheCommon: () => (/* binding */ StorageCacheCommon)
/* harmony export */ });
/* harmony import */ var _Logger_ConsoleLogger_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Logger/ConsoleLogger.mjs */ "../core/dist/esm/Logger/ConsoleLogger.mjs");
/* harmony import */ var _constants_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./constants.mjs */ "../core/dist/esm/Cache/constants.mjs");
/* harmony import */ var _utils_cacheHelpers_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils/cacheHelpers.mjs */ "../core/dist/esm/Cache/utils/cacheHelpers.mjs");
/* harmony import */ var _utils_errorHelpers_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utils/errorHelpers.mjs */ "../core/dist/esm/Cache/utils/errorHelpers.mjs");





// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
const logger = new _Logger_ConsoleLogger_mjs__WEBPACK_IMPORTED_MODULE_0__.ConsoleLogger('StorageCache');
/**
 * Initialization of the cache
 *
 */
class StorageCacheCommon {
    /**
     * Initialize the cache
     *
     * @param config - Custom configuration for this instance.
     */
    constructor({ config, keyValueStorage, }) {
        this.config = {
            ..._constants_mjs__WEBPACK_IMPORTED_MODULE_1__.defaultConfig,
            ...config,
        };
        this.keyValueStorage = keyValueStorage;
        this.sanitizeConfig();
    }
    getModuleName() {
        return 'Cache';
    }
    /**
     * Set custom configuration for the cache instance.
     *
     * @param config - customized configuration (without keyPrefix, which can't be changed)
     *
     * @return - the current configuration
     */
    configure(config) {
        if (config) {
            if (config.keyPrefix) {
                logger.warn('keyPrefix can not be re-configured on an existing Cache instance.');
            }
            this.config = {
                ...this.config,
                ...config,
            };
        }
        this.sanitizeConfig();
        return this.config;
    }
    /**
     * return the current size of the cache
     * @return {Promise}
     */
    async getCurrentCacheSize() {
        let size = await this.getStorage().getItem((0,_utils_cacheHelpers_mjs__WEBPACK_IMPORTED_MODULE_2__.getCurrentSizeKey)(this.config.keyPrefix));
        if (!size) {
            await this.getStorage().setItem((0,_utils_cacheHelpers_mjs__WEBPACK_IMPORTED_MODULE_2__.getCurrentSizeKey)(this.config.keyPrefix), '0');
            size = '0';
        }
        return Number(size);
    }
    /**
     * Set item into cache. You can put number, string, boolean or object.
     * The cache will first check whether has the same key.
     * If it has, it will delete the old item and then put the new item in
     * The cache will pop out items if it is full
     * You can specify the cache item options. The cache will abort and output a warning:
     * If the key is invalid
     * If the size of the item exceeds itemMaxSize.
     * If the value is undefined
     * If incorrect cache item configuration
     * If error happened with browser storage
     *
     * @param {String} key - the key of the item
     * @param {Object} value - the value of the item
     * @param {Object} [options] - optional, the specified meta-data
     *
     * @return {Promise}
     */
    async setItem(key, value, options) {
        logger.debug(`Set item: key is ${key}, value is ${value} with options: ${options}`);
        if (!key || key === _constants_mjs__WEBPACK_IMPORTED_MODULE_1__.currentSizeKey) {
            logger.warn(`Invalid key: should not be empty or reserved key: '${_constants_mjs__WEBPACK_IMPORTED_MODULE_1__.currentSizeKey}'`);
            return;
        }
        if (typeof value === 'undefined') {
            logger.warn(`The value of item should not be undefined!`);
            return;
        }
        const cacheItemOptions = {
            priority: options?.priority !== undefined
                ? options.priority
                : this.config.defaultPriority,
            expires: options?.expires !== undefined
                ? options.expires
                : this.config.defaultTTL + (0,_utils_cacheHelpers_mjs__WEBPACK_IMPORTED_MODULE_2__.getCurrentTime)(),
        };
        if (cacheItemOptions.priority < 1 || cacheItemOptions.priority > 5) {
            logger.warn(`Invalid parameter: priority due to out or range. It should be within 1 and 5.`);
            return;
        }
        const prefixedKey = `${this.config.keyPrefix}${key}`;
        const item = this.fillCacheItem(prefixedKey, value, cacheItemOptions);
        // check whether this item is too big;
        if (item.byteSize > this.config.itemMaxSize) {
            logger.warn(`Item with key: ${key} you are trying to put into is too big!`);
            return;
        }
        try {
            // first look into the storage, if it exists, delete it.
            const val = await this.getStorage().getItem(prefixedKey);
            if (val) {
                await this.removeCacheItem(prefixedKey, JSON.parse(val).byteSize);
            }
            // check whether the cache is full
            if (await this.isCacheFull(item.byteSize)) {
                const validKeys = await this.clearInvalidAndGetRemainingKeys();
                if (await this.isCacheFull(item.byteSize)) {
                    const sizeToPop = await this.sizeToPop(item.byteSize);
                    await this.popOutItems(validKeys, sizeToPop);
                }
            }
            // put item in the cache
            return this.setCacheItem(prefixedKey, item);
        }
        catch (e) {
            logger.warn(`setItem failed! ${e}`);
        }
    }
    /**
     * Get item from cache. It will return null if item doesn’t exist or it has been expired.
     * If you specified callback function in the options,
     * then the function will be executed if no such item in the cache
     * and finally put the return value into cache.
     * Please make sure the callback function will return the value you want to put into the cache.
     * The cache will abort output a warning:
     * If the key is invalid
     * If error happened with AsyncStorage
     *
     * @param {String} key - the key of the item
     * @param {Object} [options] - the options of callback function
     *
     * @return {Promise} - return a promise resolves to be the value of the item
     */
    async getItem(key, options) {
        logger.debug(`Get item: key is ${key} with options ${options}`);
        let cached;
        if (!key || key === _constants_mjs__WEBPACK_IMPORTED_MODULE_1__.currentSizeKey) {
            logger.warn(`Invalid key: should not be empty or reserved key: '${_constants_mjs__WEBPACK_IMPORTED_MODULE_1__.currentSizeKey}'`);
            return null;
        }
        const prefixedKey = `${this.config.keyPrefix}${key}`;
        try {
            cached = await this.getStorage().getItem(prefixedKey);
            if (cached != null) {
                if (await this.isExpired(prefixedKey)) {
                    // if expired, remove that item and return null
                    await this.removeCacheItem(prefixedKey, JSON.parse(cached).byteSize);
                }
                else {
                    // if not expired, update its visitedTime and return the value
                    const item = await this.updateVisitedTime(JSON.parse(cached), prefixedKey);
                    return item.data;
                }
            }
            if (options?.callback) {
                const val = options.callback();
                if (val !== null) {
                    await this.setItem(key, val, options);
                }
                return val;
            }
            return null;
        }
        catch (e) {
            logger.warn(`getItem failed! ${e}`);
            return null;
        }
    }
    /**
     * remove item from the cache
     * The cache will abort output a warning:
     * If error happened with AsyncStorage
     * @param {String} key - the key of the item
     * @return {Promise}
     */
    async removeItem(key) {
        logger.debug(`Remove item: key is ${key}`);
        if (!key || key === _constants_mjs__WEBPACK_IMPORTED_MODULE_1__.currentSizeKey) {
            logger.warn(`Invalid key: should not be empty or reserved key: '${_constants_mjs__WEBPACK_IMPORTED_MODULE_1__.currentSizeKey}'`);
            return;
        }
        const prefixedKey = `${this.config.keyPrefix}${key}`;
        try {
            const val = await this.getStorage().getItem(prefixedKey);
            if (val) {
                await this.removeCacheItem(prefixedKey, JSON.parse(val).byteSize);
            }
        }
        catch (e) {
            logger.warn(`removeItem failed! ${e}`);
        }
    }
    /**
     * Return all the keys owned by this cache.
     * Will return an empty array if error occurred.
     *
     * @return {Promise}
     */
    async getAllKeys() {
        try {
            return await this.getAllCacheKeys();
        }
        catch (e) {
            logger.warn(`getAllkeys failed! ${e}`);
            return [];
        }
    }
    getStorage() {
        return this.keyValueStorage;
    }
    /**
     * check whether item is expired
     *
     * @param key - the key of the item
     *
     * @return true if the item is expired.
     */
    async isExpired(key) {
        const text = await this.getStorage().getItem(key);
        (0,_utils_errorHelpers_mjs__WEBPACK_IMPORTED_MODULE_3__.assert)(text !== null, _utils_errorHelpers_mjs__WEBPACK_IMPORTED_MODULE_3__.CacheErrorCode.NoCacheItem, `Key: ${key}`);
        const item = JSON.parse(text);
        if ((0,_utils_cacheHelpers_mjs__WEBPACK_IMPORTED_MODULE_2__.getCurrentTime)() >= item.expires) {
            return true;
        }
        return false;
    }
    /**
     * delete item from cache
     *
     * @param prefixedKey - the key of the item
     * @param size - optional, the byte size of the item
     */
    async removeCacheItem(prefixedKey, size) {
        const item = await this.getStorage().getItem(prefixedKey);
        (0,_utils_errorHelpers_mjs__WEBPACK_IMPORTED_MODULE_3__.assert)(item !== null, _utils_errorHelpers_mjs__WEBPACK_IMPORTED_MODULE_3__.CacheErrorCode.NoCacheItem, `Key: ${prefixedKey}`);
        const itemSize = size ?? JSON.parse(item).byteSize;
        // first try to update the current size of the cache
        await this.decreaseCurrentSizeInBytes(itemSize);
        // try to remove the item from cache
        try {
            await this.getStorage().removeItem(prefixedKey);
        }
        catch (removeItemError) {
            // if some error happened, we need to rollback the current size
            await this.increaseCurrentSizeInBytes(itemSize);
            logger.error(`Failed to remove item: ${removeItemError}`);
        }
    }
    /**
     * produce a JSON object with meta-data and data value
     * @param value - the value of the item
     * @param options - optional, the specified meta-data
     *
     * @return - the item which has the meta-data and the value
     */
    fillCacheItem(key, value, options) {
        const item = {
            key,
            data: value,
            timestamp: (0,_utils_cacheHelpers_mjs__WEBPACK_IMPORTED_MODULE_2__.getCurrentTime)(),
            visitedTime: (0,_utils_cacheHelpers_mjs__WEBPACK_IMPORTED_MODULE_2__.getCurrentTime)(),
            priority: options.priority ?? 0,
            expires: options.expires ?? 0,
            type: typeof value,
            byteSize: 0,
        };
        // calculate byte size
        item.byteSize = (0,_utils_cacheHelpers_mjs__WEBPACK_IMPORTED_MODULE_2__.getByteLength)(JSON.stringify(item));
        // re-calculate using cache item with updated byteSize property
        item.byteSize = (0,_utils_cacheHelpers_mjs__WEBPACK_IMPORTED_MODULE_2__.getByteLength)(JSON.stringify(item));
        return item;
    }
    sanitizeConfig() {
        if (this.config.itemMaxSize > this.config.capacityInBytes) {
            logger.error('Invalid parameter: itemMaxSize. It should be smaller than capacityInBytes. Setting back to default.');
            this.config.itemMaxSize = _constants_mjs__WEBPACK_IMPORTED_MODULE_1__.defaultConfig.itemMaxSize;
        }
        if (this.config.defaultPriority > 5 || this.config.defaultPriority < 1) {
            logger.error('Invalid parameter: defaultPriority. It should be between 1 and 5. Setting back to default.');
            this.config.defaultPriority = _constants_mjs__WEBPACK_IMPORTED_MODULE_1__.defaultConfig.defaultPriority;
        }
        if (Number(this.config.warningThreshold) > 1 ||
            Number(this.config.warningThreshold) < 0) {
            logger.error('Invalid parameter: warningThreshold. It should be between 0 and 1. Setting back to default.');
            this.config.warningThreshold = _constants_mjs__WEBPACK_IMPORTED_MODULE_1__.defaultConfig.warningThreshold;
        }
        // Set 5MB limit
        const cacheLimit = 5 * 1024 * 1024;
        if (this.config.capacityInBytes > cacheLimit) {
            logger.error('Cache Capacity should be less than 5MB. Setting back to default. Setting back to default.');
            this.config.capacityInBytes = _constants_mjs__WEBPACK_IMPORTED_MODULE_1__.defaultConfig.capacityInBytes;
        }
    }
    /**
     * increase current size of the cache
     *
     * @param amount - the amount of the cache szie which need to be increased
     */
    async increaseCurrentSizeInBytes(amount) {
        const size = await this.getCurrentCacheSize();
        await this.getStorage().setItem((0,_utils_cacheHelpers_mjs__WEBPACK_IMPORTED_MODULE_2__.getCurrentSizeKey)(this.config.keyPrefix), (size + amount).toString());
    }
    /**
     * decrease current size of the cache
     *
     * @param amount - the amount of the cache size which needs to be decreased
     */
    async decreaseCurrentSizeInBytes(amount) {
        const size = await this.getCurrentCacheSize();
        await this.getStorage().setItem((0,_utils_cacheHelpers_mjs__WEBPACK_IMPORTED_MODULE_2__.getCurrentSizeKey)(this.config.keyPrefix), (size - amount).toString());
    }
    /**
     * update the visited time if item has been visited
     *
     * @param item - the item which need to be updated
     * @param prefixedKey - the key of the item
     *
     * @return the updated item
     */
    async updateVisitedTime(item, prefixedKey) {
        item.visitedTime = (0,_utils_cacheHelpers_mjs__WEBPACK_IMPORTED_MODULE_2__.getCurrentTime)();
        await this.getStorage().setItem(prefixedKey, JSON.stringify(item));
        return item;
    }
    /**
     * put item into cache
     *
     * @param prefixedKey - the key of the item
     * @param itemData - the value of the item
     * @param itemSizeInBytes - the byte size of the item
     */
    async setCacheItem(prefixedKey, item) {
        // first try to update the current size of the cache.
        await this.increaseCurrentSizeInBytes(item.byteSize);
        // try to add the item into cache
        try {
            await this.getStorage().setItem(prefixedKey, JSON.stringify(item));
        }
        catch (setItemErr) {
            // if some error happened, we need to rollback the current size
            await this.decreaseCurrentSizeInBytes(item.byteSize);
            logger.error(`Failed to set item ${setItemErr}`);
        }
    }
    /**
     * total space needed when poping out items
     *
     * @param itemSize
     *
     * @return total space needed
     */
    async sizeToPop(itemSize) {
        const cur = await this.getCurrentCacheSize();
        const spaceItemNeed = cur + itemSize - this.config.capacityInBytes;
        const cacheThresholdSpace = (1 - this.config.warningThreshold) * this.config.capacityInBytes;
        return spaceItemNeed > cacheThresholdSpace
            ? spaceItemNeed
            : cacheThresholdSpace;
    }
    /**
     * see whether cache is full
     *
     * @param itemSize
     *
     * @return true if cache is full
     */
    async isCacheFull(itemSize) {
        const cur = await this.getCurrentCacheSize();
        return itemSize + cur > this.config.capacityInBytes;
    }
    /**
     * get all the items we have, sort them by their priority,
     * if priority is same, sort them by their last visited time
     * pop out items from the low priority (5 is the lowest)
     * @private
     * @param keys - all the keys in this cache
     * @param sizeToPop - the total size of the items which needed to be poped out
     */
    async popOutItems(keys, sizeToPop) {
        const items = [];
        let remainedSize = sizeToPop;
        for (const key of keys) {
            const val = await this.getStorage().getItem(key);
            if (val != null) {
                const item = JSON.parse(val);
                items.push(item);
            }
        }
        // first compare priority
        // then compare visited time
        items.sort((a, b) => {
            if (a.priority > b.priority) {
                return -1;
            }
            else if (a.priority < b.priority) {
                return 1;
            }
            else {
                if (a.visitedTime < b.visitedTime) {
                    return -1;
                }
                else
                    return 1;
            }
        });
        for (const item of items) {
            // pop out items until we have enough room for new item
            await this.removeCacheItem(item.key, item.byteSize);
            remainedSize -= item.byteSize;
            if (remainedSize <= 0) {
                return;
            }
        }
    }
    /**
     * Scan the storage and combine the following operations for efficiency
     *   1. Clear out all expired keys owned by this cache, not including the size key.
     *   2. Return the remaining keys.
     *
     * @return The remaining valid keys
     */
    async clearInvalidAndGetRemainingKeys() {
        const remainingKeys = [];
        const keys = await this.getAllCacheKeys({
            omitSizeKey: true,
        });
        for (const key of keys) {
            if (await this.isExpired(key)) {
                await this.removeCacheItem(key);
            }
            else {
                remainingKeys.push(key);
            }
        }
        return remainingKeys;
    }
    /**
     * clear the entire cache
     * The cache will abort and output a warning if error occurs
     * @return {Promise}
     */
    async clear() {
        logger.debug(`Clear Cache`);
        try {
            const keys = await this.getAllKeys();
            for (const key of keys) {
                const prefixedKey = `${this.config.keyPrefix}${key}`;
                await this.getStorage().removeItem(prefixedKey);
            }
        }
        catch (e) {
            logger.warn(`clear failed! ${e}`);
        }
    }
}


//# sourceMappingURL=StorageCacheCommon.mjs.map


/***/ }),

/***/ "../core/dist/esm/Cache/constants.mjs":
/*!********************************************!*\
  !*** ../core/dist/esm/Cache/constants.mjs ***!
  \********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   currentSizeKey: () => (/* binding */ currentSizeKey),
/* harmony export */   defaultConfig: () => (/* binding */ defaultConfig)
/* harmony export */ });
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
/**
 * Default cache config
 */
const defaultConfig = {
    keyPrefix: 'aws-amplify-cache',
    capacityInBytes: 1048576,
    itemMaxSize: 210000,
    defaultTTL: 259200000,
    defaultPriority: 5,
    warningThreshold: 0.8,
};
const currentSizeKey = 'CurSize';


//# sourceMappingURL=constants.mjs.map


/***/ }),

/***/ "../core/dist/esm/Cache/index.mjs":
/*!****************************************!*\
  !*** ../core/dist/esm/Cache/index.mjs ***!
  \****************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Cache: () => (/* binding */ Cache)
/* harmony export */ });
/* harmony import */ var _StorageCache_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./StorageCache.mjs */ "../core/dist/esm/Cache/StorageCache.mjs");


// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
const Cache = new _StorageCache_mjs__WEBPACK_IMPORTED_MODULE_0__.StorageCache();


//# sourceMappingURL=index.mjs.map


/***/ }),

/***/ "../core/dist/esm/Cache/utils/cacheHelpers.mjs":
/*!*****************************************************!*\
  !*** ../core/dist/esm/Cache/utils/cacheHelpers.mjs ***!
  \*****************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getByteLength: () => (/* binding */ getByteLength),
/* harmony export */   getCurrentSizeKey: () => (/* binding */ getCurrentSizeKey),
/* harmony export */   getCurrentTime: () => (/* binding */ getCurrentTime),
/* harmony export */   isInteger: () => (/* binding */ isInteger)
/* harmony export */ });
/* harmony import */ var _constants_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../constants.mjs */ "../core/dist/esm/Cache/constants.mjs");


// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
/**
 * return the byte size of the string
 * @param str
 */
function getByteLength(str) {
    let ret = 0;
    ret = str.length;
    for (let i = str.length; i >= 0; i -= 1) {
        const charCode = str.charCodeAt(i);
        if (charCode > 0x7f && charCode <= 0x7ff) {
            ret += 1;
        }
        else if (charCode > 0x7ff && charCode <= 0xffff) {
            ret += 2;
        }
        // trail surrogate
        if (charCode >= 0xdc00 && charCode <= 0xdfff) {
            i -= 1;
        }
    }
    return ret;
}
/**
 * get current time
 */
function getCurrentTime() {
    const currentTime = new Date();
    return currentTime.getTime();
}
/**
 * check if passed value is an integer
 */
function isInteger(value) {
    if (Number.isInteger) {
        return Number.isInteger(value);
    }
    return (typeof value === 'number' && isFinite(value) && Math.floor(value) === value);
}
const getCurrentSizeKey = (keyPrefix) => `${keyPrefix}${_constants_mjs__WEBPACK_IMPORTED_MODULE_0__.currentSizeKey}`;


//# sourceMappingURL=cacheHelpers.mjs.map


/***/ }),

/***/ "../core/dist/esm/Cache/utils/errorHelpers.mjs":
/*!*****************************************************!*\
  !*** ../core/dist/esm/Cache/utils/errorHelpers.mjs ***!
  \*****************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CacheErrorCode: () => (/* binding */ CacheErrorCode),
/* harmony export */   assert: () => (/* binding */ assert)
/* harmony export */ });
/* harmony import */ var _errors_createAssertionFunction_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../errors/createAssertionFunction.mjs */ "../core/dist/esm/errors/createAssertionFunction.mjs");




// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
var CacheErrorCode;
(function (CacheErrorCode) {
    CacheErrorCode["NoCacheItem"] = "NoCacheItem";
    CacheErrorCode["NullNextNode"] = "NullNextNode";
    CacheErrorCode["NullPreviousNode"] = "NullPreviousNode";
})(CacheErrorCode || (CacheErrorCode = {}));
const cacheErrorMap = {
    [CacheErrorCode.NoCacheItem]: {
        message: 'Item not found in the cache storage.',
    },
    [CacheErrorCode.NullNextNode]: {
        message: 'Next node is null.',
    },
    [CacheErrorCode.NullPreviousNode]: {
        message: 'Previous node is null.',
    },
};
const assert = (0,_errors_createAssertionFunction_mjs__WEBPACK_IMPORTED_MODULE_0__.createAssertionFunction)(cacheErrorMap);


//# sourceMappingURL=errorHelpers.mjs.map


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

/***/ "../core/dist/esm/awsClients/pinpoint/base.mjs":
/*!*****************************************************!*\
  !*** ../core/dist/esm/awsClients/pinpoint/base.mjs ***!
  \*****************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   defaultConfig: () => (/* binding */ defaultConfig),
/* harmony export */   getSharedHeaders: () => (/* binding */ getSharedHeaders)
/* harmony export */ });
/* harmony import */ var _clients_endpoints_getDnsSuffix_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../clients/endpoints/getDnsSuffix.mjs */ "../core/dist/esm/clients/endpoints/getDnsSuffix.mjs");
/* harmony import */ var _clients_middleware_retry_jitteredBackoff_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../clients/middleware/retry/jitteredBackoff.mjs */ "../core/dist/esm/clients/middleware/retry/jitteredBackoff.mjs");
/* harmony import */ var _clients_middleware_retry_defaultRetryDecider_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../clients/middleware/retry/defaultRetryDecider.mjs */ "../core/dist/esm/clients/middleware/retry/defaultRetryDecider.mjs");
/* harmony import */ var _clients_serde_json_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../clients/serde/json.mjs */ "../core/dist/esm/clients/serde/json.mjs");
/* harmony import */ var _Platform_index_mjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../Platform/index.mjs */ "../core/dist/esm/Platform/index.mjs");
/* harmony import */ var _utils_amplifyUrl_index_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utils/amplifyUrl/index.mjs */ "../core/dist/esm/utils/amplifyUrl/index.mjs");







// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
/**
 * The service name used to sign requests if the API requires authentication.
 */
const SERVICE_NAME = 'mobiletargeting';
/**
 * The endpoint resolver function that returns the endpoint URL for a given region.
 */
const endpointResolver = ({ region }) => ({
    url: new _utils_amplifyUrl_index_mjs__WEBPACK_IMPORTED_MODULE_0__.AmplifyUrl(`https://pinpoint.${region}.${(0,_clients_endpoints_getDnsSuffix_mjs__WEBPACK_IMPORTED_MODULE_1__.getDnsSuffix)(region)}`),
});
/**
 * @internal
 */
const defaultConfig = {
    service: SERVICE_NAME,
    endpointResolver,
    retryDecider: (0,_clients_middleware_retry_defaultRetryDecider_mjs__WEBPACK_IMPORTED_MODULE_2__.getRetryDecider)(_clients_serde_json_mjs__WEBPACK_IMPORTED_MODULE_3__.parseJsonError),
    computeDelay: _clients_middleware_retry_jitteredBackoff_mjs__WEBPACK_IMPORTED_MODULE_4__.jitteredBackoff,
    userAgentValue: (0,_Platform_index_mjs__WEBPACK_IMPORTED_MODULE_5__.getAmplifyUserAgent)(),
};
/**
 * @internal
 */
const getSharedHeaders = () => ({
    'content-type': 'application/json',
});


//# sourceMappingURL=base.mjs.map


/***/ }),

/***/ "../core/dist/esm/awsClients/pinpoint/errorHelpers.mjs":
/*!*************************************************************!*\
  !*** ../core/dist/esm/awsClients/pinpoint/errorHelpers.mjs ***!
  \*************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PinpointValidationErrorCode: () => (/* binding */ PinpointValidationErrorCode),
/* harmony export */   assert: () => (/* binding */ assert)
/* harmony export */ });
/* harmony import */ var _errors_createAssertionFunction_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../errors/createAssertionFunction.mjs */ "../core/dist/esm/errors/createAssertionFunction.mjs");




// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
var PinpointValidationErrorCode;
(function (PinpointValidationErrorCode) {
    PinpointValidationErrorCode["NoAppId"] = "NoAppId";
})(PinpointValidationErrorCode || (PinpointValidationErrorCode = {}));
const pinpointValidationErrorMap = {
    [PinpointValidationErrorCode.NoAppId]: {
        message: 'Missing application id.',
    },
};
const assert = (0,_errors_createAssertionFunction_mjs__WEBPACK_IMPORTED_MODULE_0__.createAssertionFunction)(pinpointValidationErrorMap);


//# sourceMappingURL=errorHelpers.mjs.map


/***/ }),

/***/ "../core/dist/esm/awsClients/pinpoint/putEvents.mjs":
/*!**********************************************************!*\
  !*** ../core/dist/esm/awsClients/pinpoint/putEvents.mjs ***!
  \**********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   putEvents: () => (/* binding */ putEvents)
/* harmony export */ });
/* harmony import */ var _clients_handlers_authenticated_mjs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../clients/handlers/authenticated.mjs */ "../core/dist/esm/clients/handlers/authenticated.mjs");
/* harmony import */ var _clients_internal_composeServiceApi_mjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../clients/internal/composeServiceApi.mjs */ "../core/dist/esm/clients/internal/composeServiceApi.mjs");
/* harmony import */ var _clients_middleware_signing_utils_extendedEncodeURIComponent_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../clients/middleware/signing/utils/extendedEncodeURIComponent.mjs */ "../core/dist/esm/clients/middleware/signing/utils/extendedEncodeURIComponent.mjs");
/* harmony import */ var _clients_serde_responseInfo_mjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../clients/serde/responseInfo.mjs */ "../core/dist/esm/clients/serde/responseInfo.mjs");
/* harmony import */ var _clients_serde_json_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../clients/serde/json.mjs */ "../core/dist/esm/clients/serde/json.mjs");
/* harmony import */ var _utils_amplifyUrl_index_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../utils/amplifyUrl/index.mjs */ "../core/dist/esm/utils/amplifyUrl/index.mjs");
/* harmony import */ var _base_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./base.mjs */ "../core/dist/esm/awsClients/pinpoint/base.mjs");
/* harmony import */ var _errorHelpers_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./errorHelpers.mjs */ "../core/dist/esm/awsClients/pinpoint/errorHelpers.mjs");









// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
const putEventsSerializer = ({ ApplicationId, EventsRequest }, endpoint) => {
    (0,_errorHelpers_mjs__WEBPACK_IMPORTED_MODULE_0__.assert)(!!ApplicationId, _errorHelpers_mjs__WEBPACK_IMPORTED_MODULE_0__.PinpointValidationErrorCode.NoAppId);
    const headers = (0,_base_mjs__WEBPACK_IMPORTED_MODULE_1__.getSharedHeaders)();
    const url = new _utils_amplifyUrl_index_mjs__WEBPACK_IMPORTED_MODULE_2__.AmplifyUrl(endpoint.url);
    url.pathname = `v1/apps/${(0,_clients_middleware_signing_utils_extendedEncodeURIComponent_mjs__WEBPACK_IMPORTED_MODULE_3__.extendedEncodeURIComponent)(ApplicationId)}/events`;
    const body = JSON.stringify(EventsRequest ?? {});
    return { method: 'POST', headers, url, body };
};
const putEventsDeserializer = async (response) => {
    if (response.statusCode >= 300) {
        const error = await (0,_clients_serde_json_mjs__WEBPACK_IMPORTED_MODULE_4__.parseJsonError)(response);
        throw error;
    }
    else {
        const { Results } = await (0,_clients_serde_json_mjs__WEBPACK_IMPORTED_MODULE_4__.parseJsonBody)(response);
        return {
            EventsResponse: { Results },
            $metadata: (0,_clients_serde_responseInfo_mjs__WEBPACK_IMPORTED_MODULE_5__.parseMetadata)(response),
        };
    }
};
/**
 * @internal
 */
const putEvents = (0,_clients_internal_composeServiceApi_mjs__WEBPACK_IMPORTED_MODULE_6__.composeServiceApi)(_clients_handlers_authenticated_mjs__WEBPACK_IMPORTED_MODULE_7__.authenticatedHandler, putEventsSerializer, putEventsDeserializer, _base_mjs__WEBPACK_IMPORTED_MODULE_1__.defaultConfig);


//# sourceMappingURL=putEvents.mjs.map


/***/ }),

/***/ "../core/dist/esm/awsClients/pinpoint/updateEndpoint.mjs":
/*!***************************************************************!*\
  !*** ../core/dist/esm/awsClients/pinpoint/updateEndpoint.mjs ***!
  \***************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   updateEndpoint: () => (/* binding */ updateEndpoint)
/* harmony export */ });
/* harmony import */ var _clients_handlers_authenticated_mjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../clients/handlers/authenticated.mjs */ "../core/dist/esm/clients/handlers/authenticated.mjs");
/* harmony import */ var _clients_internal_composeServiceApi_mjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../clients/internal/composeServiceApi.mjs */ "../core/dist/esm/clients/internal/composeServiceApi.mjs");
/* harmony import */ var _clients_middleware_signing_utils_extendedEncodeURIComponent_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../clients/middleware/signing/utils/extendedEncodeURIComponent.mjs */ "../core/dist/esm/clients/middleware/signing/utils/extendedEncodeURIComponent.mjs");
/* harmony import */ var _clients_serde_responseInfo_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../clients/serde/responseInfo.mjs */ "../core/dist/esm/clients/serde/responseInfo.mjs");
/* harmony import */ var _clients_serde_json_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../clients/serde/json.mjs */ "../core/dist/esm/clients/serde/json.mjs");
/* harmony import */ var _utils_amplifyUrl_index_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../utils/amplifyUrl/index.mjs */ "../core/dist/esm/utils/amplifyUrl/index.mjs");
/* harmony import */ var _base_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base.mjs */ "../core/dist/esm/awsClients/pinpoint/base.mjs");








// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
const updateEndpointSerializer = ({ ApplicationId = '', EndpointId = '', EndpointRequest }, endpoint) => {
    const headers = (0,_base_mjs__WEBPACK_IMPORTED_MODULE_0__.getSharedHeaders)();
    const url = new _utils_amplifyUrl_index_mjs__WEBPACK_IMPORTED_MODULE_1__.AmplifyUrl(endpoint.url);
    url.pathname = `v1/apps/${(0,_clients_middleware_signing_utils_extendedEncodeURIComponent_mjs__WEBPACK_IMPORTED_MODULE_2__.extendedEncodeURIComponent)(ApplicationId)}/endpoints/${(0,_clients_middleware_signing_utils_extendedEncodeURIComponent_mjs__WEBPACK_IMPORTED_MODULE_2__.extendedEncodeURIComponent)(EndpointId)}`;
    const body = JSON.stringify(EndpointRequest);
    return { method: 'PUT', headers, url, body };
};
const updateEndpointDeserializer = async (response) => {
    if (response.statusCode >= 300) {
        const error = await (0,_clients_serde_json_mjs__WEBPACK_IMPORTED_MODULE_3__.parseJsonError)(response);
        throw error;
    }
    else {
        const { Message, RequestID } = await (0,_clients_serde_json_mjs__WEBPACK_IMPORTED_MODULE_3__.parseJsonBody)(response);
        return {
            MessageBody: {
                Message,
                RequestID,
            },
            $metadata: (0,_clients_serde_responseInfo_mjs__WEBPACK_IMPORTED_MODULE_4__.parseMetadata)(response),
        };
    }
};
/**
 * @internal
 */
const updateEndpoint = (0,_clients_internal_composeServiceApi_mjs__WEBPACK_IMPORTED_MODULE_5__.composeServiceApi)(_clients_handlers_authenticated_mjs__WEBPACK_IMPORTED_MODULE_6__.authenticatedHandler, updateEndpointSerializer, updateEndpointDeserializer, _base_mjs__WEBPACK_IMPORTED_MODULE_0__.defaultConfig);


//# sourceMappingURL=updateEndpoint.mjs.map


/***/ }),

/***/ "../core/dist/esm/clients/endpoints/getDnsSuffix.mjs":
/*!***********************************************************!*\
  !*** ../core/dist/esm/clients/endpoints/getDnsSuffix.mjs ***!
  \***********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getDnsSuffix: () => (/* binding */ getDnsSuffix)
/* harmony export */ });
/* harmony import */ var _partitions_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./partitions.mjs */ "../core/dist/esm/clients/endpoints/partitions.mjs");


// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
/**
 * Get the AWS Services endpoint URL's DNS suffix for a given region. A typical AWS regional service endpoint URL will
 * follow this pattern: {endpointPrefix}.{region}.{dnsSuffix}. For example, the endpoint URL for Cognito Identity in
 * us-east-1 will be cognito-identity.us-east-1.amazonaws.com. Here the DnsSuffix is `amazonaws.com`.
 *
 * @param region
 * @returns The DNS suffix
 *
 * @internal
 */
const getDnsSuffix = (region) => {
    const { partitions } = _partitions_mjs__WEBPACK_IMPORTED_MODULE_0__.partitionsInfo;
    for (const { regions, outputs, regionRegex } of partitions) {
        const regex = new RegExp(regionRegex);
        if (regions.includes(region) || regex.test(region)) {
            return outputs.dnsSuffix;
        }
    }
    return _partitions_mjs__WEBPACK_IMPORTED_MODULE_0__.defaultPartition.outputs.dnsSuffix;
};


//# sourceMappingURL=getDnsSuffix.mjs.map


/***/ }),

/***/ "../core/dist/esm/clients/endpoints/partitions.mjs":
/*!*********************************************************!*\
  !*** ../core/dist/esm/clients/endpoints/partitions.mjs ***!
  \*********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   defaultPartition: () => (/* binding */ defaultPartition),
/* harmony export */   partitionsInfo: () => (/* binding */ partitionsInfo)
/* harmony export */ });
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
/**
 * Default partition for AWS services. This is used when the region is not provided or the region is not recognized.
 *
 * @internal
 */
const defaultPartition = {
    id: 'aws',
    outputs: {
        dnsSuffix: 'amazonaws.com',
    },
    regionRegex: '^(us|eu|ap|sa|ca|me|af)\\-\\w+\\-\\d+$',
    regions: ['aws-global'],
};
/**
 * This data is adapted from the partition file from AWS SDK shared utilities but remove some contents for bundle size
 * concern. Information removed are `dualStackDnsSuffix`, `supportDualStack`, `supportFIPS`, restricted partitions, and
 * list of regions for each partition other than global regions.
 *
 * * Ref: https://docs.aws.amazon.com/general/latest/gr/rande.html#regional-endpoints
 * * Ref: https://github.com/aws/aws-sdk-js-v3/blob/0201baef03c2379f1f6f7150b9d401d4b230d488/packages/util-endpoints/src/lib/aws/partitions.json#L1
 *
 * @internal
 */
const partitionsInfo = {
    partitions: [
        defaultPartition,
        {
            id: 'aws-cn',
            outputs: {
                dnsSuffix: 'amazonaws.com.cn',
            },
            regionRegex: '^cn\\-\\w+\\-\\d+$',
            regions: ['aws-cn-global'],
        },
    ],
};


//# sourceMappingURL=partitions.mjs.map


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

/***/ "../core/dist/esm/clients/internal/composeServiceApi.mjs":
/*!***************************************************************!*\
  !*** ../core/dist/esm/clients/internal/composeServiceApi.mjs ***!
  \***************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   composeServiceApi: () => (/* binding */ composeServiceApi)
/* harmony export */ });
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
/**
 * Compose a service API handler that accepts input as defined shape and responds conforming to defined output shape.
 * A service API handler is composed with:
 * * A transfer handler
 * * A serializer function
 * * A deserializer function
 * * A default config object
 *
 * The returned service API handler, when called, will trigger the following workflow:
 * 1. When calling the service API handler function, the default config object is merged into the input config
 * object to assign the default values of some omitted configs, resulting to a resolved config object.
 * 2. The `endpointResolver` function from the default config object will be invoked with the resolved config object and
 * API input object resulting to an endpoint instance.
 * 3. The serializer function is invoked with API input object and the endpoint instance resulting to an HTTP request
 * instance.
 * 4. The HTTP request instance and the resolved config object is passed to the transfer handler function.
 * 5. The transfer handler function resolves to an HTTP response instance(can be either successful or failed status code).
 * 6. The deserializer function is invoked with the HTTP response instance resulting to the API output object, and
 * return to the caller.
 *
 *
 * @param transferHandler Async function for dispatching HTTP requests and returning HTTP response.
 * @param serializer  Async function for converting object in defined input shape into HTTP request targeting a given
 * 	endpoint.
 * @param deserializer Async function for converting HTTP response into output object in defined output shape, or error
 * 	shape.
 * @param defaultConfig  object containing default options to be consumed by transfer handler, serializer and
 *  deserializer.
 * @returns a async service API handler function that accepts a config object and input object in defined shape, returns
 * 	an output object in defined shape. It may also throw error instance in defined shape in deserializer. The config
 *  object type is composed with options type of transferHandler, endpointResolver function as well as endpointResolver
 *  function's input options type, region string. The config object property will be marked as optional if it's also
 * 	defined in defaultConfig.
 *
 * @internal
 */
const composeServiceApi = (transferHandler, serializer, deserializer, defaultConfig) => {
    return async (config, input) => {
        const resolvedConfig = {
            ...defaultConfig,
            ...config,
        };
        // We need to allow different endpoints based on both given config(other than region) and input.
        // However for most of non-S3 services, region is the only input for endpoint resolver.
        const endpoint = await resolvedConfig.endpointResolver(resolvedConfig, input);
        // Unlike AWS SDK clients, a serializer should NOT populate the `host` or `content-length` headers.
        // Both of these headers are prohibited per Spec(https://developer.mozilla.org/en-US/docs/Glossary/Forbidden_header_name).
        // They will be populated automatically by browser, or node-fetch polyfill.
        const request = await serializer(input, endpoint);
        const response = await transferHandler(request, {
            ...resolvedConfig,
        });
        return deserializer(response);
    };
};


//# sourceMappingURL=composeServiceApi.mjs.map


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

/***/ "../core/dist/esm/clients/middleware/signing/utils/extendedEncodeURIComponent.mjs":
/*!****************************************************************************************!*\
  !*** ../core/dist/esm/clients/middleware/signing/utils/extendedEncodeURIComponent.mjs ***!
  \****************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   extendedEncodeURIComponent: () => (/* binding */ extendedEncodeURIComponent)
/* harmony export */ });
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
/**
 * Wraps encodeURIComponent to encode additional characters to fully adhere to RFC 3986.
 * @see https://github.com/aws/aws-sdk-js-v3/blob/86b432c464150069678b25ff88d57c2ca26e75a2/packages/smithy-client/src/extended-encode-uri-component.ts#L7
 *
 * @param uri URI string to encode
 * @returns RFC 3986 encoded string
 *
 * @internal
 */
const extendedEncodeURIComponent = (uri) => {
    // Match characters normally not encoded by `encodeURIComponent`
    const extendedCharacters = /[!'()*]/g;
    return encodeURIComponent(uri).replace(extendedCharacters, hexEncode);
};
const hexEncode = (c) => `%${c.charCodeAt(0).toString(16).toUpperCase()}`;


//# sourceMappingURL=extendedEncodeURIComponent.mjs.map


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

/***/ "../core/dist/esm/errors/PlatformNotSupportedError.mjs":
/*!*************************************************************!*\
  !*** ../core/dist/esm/errors/PlatformNotSupportedError.mjs ***!
  \*************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PlatformNotSupportedError: () => (/* binding */ PlatformNotSupportedError)
/* harmony export */ });
/* harmony import */ var _types_errors_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../types/errors.mjs */ "../core/dist/esm/types/errors.mjs");
/* harmony import */ var _AmplifyError_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AmplifyError.mjs */ "../core/dist/esm/errors/AmplifyError.mjs");



// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
class PlatformNotSupportedError extends _AmplifyError_mjs__WEBPACK_IMPORTED_MODULE_0__.AmplifyError {
    constructor() {
        super({
            name: _types_errors_mjs__WEBPACK_IMPORTED_MODULE_1__.AmplifyErrorCode.PlatformNotSupported,
            message: 'Function not supported on current platform',
        });
    }
}


//# sourceMappingURL=PlatformNotSupportedError.mjs.map


/***/ }),

/***/ "../core/dist/esm/errors/createAssertionFunction.mjs":
/*!***********************************************************!*\
  !*** ../core/dist/esm/errors/createAssertionFunction.mjs ***!
  \***********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createAssertionFunction: () => (/* binding */ createAssertionFunction)
/* harmony export */ });
/* harmony import */ var _AmplifyError_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AmplifyError.mjs */ "../core/dist/esm/errors/AmplifyError.mjs");


// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
const createAssertionFunction = (errorMap, AssertionError = _AmplifyError_mjs__WEBPACK_IMPORTED_MODULE_0__.AmplifyError) => (assertion, name, additionalContext) => {
    const { message, recoverySuggestion } = errorMap[name];
    if (!assertion) {
        throw new AssertionError({
            name,
            message: additionalContext
                ? `${message} ${additionalContext}`
                : message,
            recoverySuggestion,
        });
    }
};


//# sourceMappingURL=createAssertionFunction.mjs.map


/***/ }),

/***/ "../core/dist/esm/errors/errorHelpers.mjs":
/*!************************************************!*\
  !*** ../core/dist/esm/errors/errorHelpers.mjs ***!
  \************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   assert: () => (/* binding */ assert)
/* harmony export */ });
/* harmony import */ var _types_errors_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../types/errors.mjs */ "../core/dist/esm/types/errors.mjs");
/* harmony import */ var _createAssertionFunction_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./createAssertionFunction.mjs */ "../core/dist/esm/errors/createAssertionFunction.mjs");



// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
const amplifyErrorMap = {
    [_types_errors_mjs__WEBPACK_IMPORTED_MODULE_0__.AmplifyErrorCode.NoEndpointId]: {
        message: 'Endpoint ID was not found and was unable to be created.',
    },
    [_types_errors_mjs__WEBPACK_IMPORTED_MODULE_0__.AmplifyErrorCode.PlatformNotSupported]: {
        message: 'Function not supported on current platform.',
    },
    [_types_errors_mjs__WEBPACK_IMPORTED_MODULE_0__.AmplifyErrorCode.Unknown]: {
        message: 'An unknown error occurred.',
    },
    [_types_errors_mjs__WEBPACK_IMPORTED_MODULE_0__.AmplifyErrorCode.NetworkError]: {
        message: 'A network error has occurred.',
    },
};
const assert = (0,_createAssertionFunction_mjs__WEBPACK_IMPORTED_MODULE_1__.createAssertionFunction)(amplifyErrorMap);


//# sourceMappingURL=errorHelpers.mjs.map


/***/ }),

/***/ "../core/dist/esm/providers/pinpoint/apis/flushEvents.mjs":
/*!****************************************************************!*\
  !*** ../core/dist/esm/providers/pinpoint/apis/flushEvents.mjs ***!
  \****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   flushEvents: () => (/* binding */ flushEvents)
/* harmony export */ });
/* harmony import */ var _utils_getEventBuffer_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/getEventBuffer.mjs */ "../core/dist/esm/providers/pinpoint/utils/getEventBuffer.mjs");
/* harmony import */ var _utils_constants_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/constants.mjs */ "../core/dist/esm/providers/pinpoint/utils/constants.mjs");



// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
const flushEvents = ({ appId, region, credentials, bufferSize, flushInterval, flushSize, resendLimit, identityId, userAgentValue, }) => {
    (0,_utils_getEventBuffer_mjs__WEBPACK_IMPORTED_MODULE_0__.getEventBuffer)({
        appId,
        region,
        credentials,
        bufferSize: bufferSize ?? _utils_constants_mjs__WEBPACK_IMPORTED_MODULE_1__.BUFFER_SIZE,
        flushInterval: flushInterval ?? _utils_constants_mjs__WEBPACK_IMPORTED_MODULE_1__.FLUSH_INTERVAL,
        flushSize: flushSize ?? _utils_constants_mjs__WEBPACK_IMPORTED_MODULE_1__.FLUSH_SIZE,
        resendLimit: resendLimit ?? _utils_constants_mjs__WEBPACK_IMPORTED_MODULE_1__.RESEND_LIMIT,
        identityId,
        userAgentValue,
    }).flushAll();
};


//# sourceMappingURL=flushEvents.mjs.map


/***/ }),

/***/ "../core/dist/esm/providers/pinpoint/apis/record.mjs":
/*!***********************************************************!*\
  !*** ../core/dist/esm/providers/pinpoint/apis/record.mjs ***!
  \***********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   record: () => (/* binding */ record)
/* harmony export */ });
/* harmony import */ var _utils_amplifyUuid_index_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../utils/amplifyUuid/index.mjs */ "../core/dist/esm/utils/amplifyUuid/index.mjs");
/* harmony import */ var _Cache_index_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../Cache/index.mjs */ "../core/dist/esm/Cache/index.mjs");
/* harmony import */ var _utils_resolveEndpointId_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utils/resolveEndpointId.mjs */ "../core/dist/esm/providers/pinpoint/utils/resolveEndpointId.mjs");
/* harmony import */ var _utils_constants_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/constants.mjs */ "../core/dist/esm/providers/pinpoint/utils/constants.mjs");
/* harmony import */ var _utils_getEventBuffer_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/getEventBuffer.mjs */ "../core/dist/esm/providers/pinpoint/utils/getEventBuffer.mjs");
/* harmony import */ var _utils_sessionListener_constants_mjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../utils/sessionListener/constants.mjs */ "../core/dist/esm/utils/sessionListener/constants.mjs");








// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
let session;
/**
 * @internal
 */
const record = async ({ appId, category, channelType, credentials, event, identityId, region, userAgentValue, bufferSize, flushInterval, flushSize, resendLimit, }) => {
    let eventSession = session;
    const currentTime = new Date();
    const timestampISOString = currentTime.toISOString();
    const eventId = (0,_utils_amplifyUuid_index_mjs__WEBPACK_IMPORTED_MODULE_1__.amplifyUuid)();
    // Prepare event buffer if required
    const buffer = (0,_utils_getEventBuffer_mjs__WEBPACK_IMPORTED_MODULE_2__.getEventBuffer)({
        appId,
        region,
        credentials,
        bufferSize: bufferSize ?? _utils_constants_mjs__WEBPACK_IMPORTED_MODULE_3__.BUFFER_SIZE,
        flushInterval: flushInterval ?? _utils_constants_mjs__WEBPACK_IMPORTED_MODULE_3__.FLUSH_INTERVAL,
        flushSize: flushSize ?? _utils_constants_mjs__WEBPACK_IMPORTED_MODULE_3__.FLUSH_SIZE,
        resendLimit: resendLimit ?? _utils_constants_mjs__WEBPACK_IMPORTED_MODULE_3__.RESEND_LIMIT,
        identityId,
        userAgentValue,
    });
    const endpointId = await (0,_utils_resolveEndpointId_mjs__WEBPACK_IMPORTED_MODULE_4__.resolveEndpointId)({
        appId,
        category,
        channelType,
        credentials,
        identityId,
        region,
        userAgentValue,
    });
    // Generate session if required
    if (!eventSession || event.name === _utils_sessionListener_constants_mjs__WEBPACK_IMPORTED_MODULE_5__.SESSION_START_EVENT) {
        const sessionId = (0,_utils_amplifyUuid_index_mjs__WEBPACK_IMPORTED_MODULE_1__.amplifyUuid)();
        session = {
            Id: sessionId,
            StartTimestamp: timestampISOString,
        };
        eventSession = session;
    }
    // Terminate session when required
    if (session && event.name === _utils_sessionListener_constants_mjs__WEBPACK_IMPORTED_MODULE_5__.SESSION_STOP_EVENT) {
        eventSession = {
            ...session,
            StopTimestamp: timestampISOString,
            Duration: currentTime.getTime() - new Date(session.StartTimestamp).getTime(),
        };
        session = undefined;
    }
    // Push event to buffer
    buffer.push({
        eventId,
        endpointId,
        event,
        session: eventSession,
        timestamp: timestampISOString,
        resendLimit: resendLimit ?? _utils_constants_mjs__WEBPACK_IMPORTED_MODULE_3__.RESEND_LIMIT,
    });
};


//# sourceMappingURL=record.mjs.map


/***/ }),

/***/ "../core/dist/esm/providers/pinpoint/apis/updateEndpoint.mjs":
/*!*******************************************************************!*\
  !*** ../core/dist/esm/providers/pinpoint/apis/updateEndpoint.mjs ***!
  \*******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   updateEndpoint: () => (/* binding */ updateEndpoint)
/* harmony export */ });
/* harmony import */ var _utils_getClientInfo_getClientInfo_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../utils/getClientInfo/getClientInfo.mjs */ "../core/dist/esm/utils/getClientInfo/getClientInfo.mjs");
/* harmony import */ var _aws_crypto_sha256_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @aws-crypto/sha256-js */ "../../node_modules/@aws-crypto/sha256-js/build/module/index.js");
/* harmony import */ var _smithy_util_hex_encoding__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @smithy/util-hex-encoding */ "../core/node_modules/@smithy/util-hex-encoding/dist-es/index.js");
/* harmony import */ var _awsClients_pinpoint_updateEndpoint_mjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../awsClients/pinpoint/updateEndpoint.mjs */ "../core/dist/esm/awsClients/pinpoint/updateEndpoint.mjs");
/* harmony import */ var _utils_amplifyUuid_index_mjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../utils/amplifyUuid/index.mjs */ "../core/dist/esm/utils/amplifyUuid/index.mjs");
/* harmony import */ var _utils_cacheEndpointId_mjs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../utils/cacheEndpointId.mjs */ "../core/dist/esm/providers/pinpoint/utils/cacheEndpointId.mjs");
/* harmony import */ var _utils_createEndpointId_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/createEndpointId.mjs */ "../core/dist/esm/providers/pinpoint/utils/createEndpointId.mjs");
/* harmony import */ var _utils_getEndpointId_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/getEndpointId.mjs */ "../core/dist/esm/providers/pinpoint/utils/getEndpointId.mjs");














// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
/**
 * @internal
 */
const updateEndpoint = async ({ address, appId, category, channelType, credentials, identityId, optOut, region, userAttributes, userId, userProfile, userAgentValue, }) => {
    const endpointId = await (0,_utils_getEndpointId_mjs__WEBPACK_IMPORTED_MODULE_2__.getEndpointId)(appId, category);
    // only generate a new endpoint id if one was not found in cache
    const createdEndpointId = !endpointId
        ? (0,_utils_createEndpointId_mjs__WEBPACK_IMPORTED_MODULE_3__.createEndpointId)(appId, category)
        : undefined;
    const { customProperties, demographic, email, location, metrics, name, plan, } = userProfile ?? {};
    // only automatically populate the endpoint with client info and identity id upon endpoint creation to
    // avoid overwriting the endpoint with these values every time the endpoint is updated
    const demographicsFromClientInfo = {};
    const resolvedUserId = createdEndpointId ? (userId ?? identityId) : userId;
    if (createdEndpointId) {
        const clientInfo = (0,_utils_getClientInfo_getClientInfo_mjs__WEBPACK_IMPORTED_MODULE_4__.getClientInfo)();
        demographicsFromClientInfo.appVersion = clientInfo.appVersion;
        demographicsFromClientInfo.make = clientInfo.make;
        demographicsFromClientInfo.model = clientInfo.model;
        demographicsFromClientInfo.modelVersion = clientInfo.version;
        demographicsFromClientInfo.platform = clientInfo.platform;
    }
    const mergedDemographic = {
        ...demographicsFromClientInfo,
        ...demographic,
    };
    const attributes = {
        ...(email && { email: [email] }),
        ...(name && { name: [name] }),
        ...(plan && { plan: [plan] }),
        ...customProperties,
    };
    const shouldAddDemographics = createdEndpointId || demographic;
    const shouldAddAttributes = email || customProperties || name || plan;
    const shouldAddUser = resolvedUserId || userAttributes;
    const input = {
        ApplicationId: appId,
        EndpointId: endpointId ?? createdEndpointId,
        EndpointRequest: {
            RequestId: (0,_utils_amplifyUuid_index_mjs__WEBPACK_IMPORTED_MODULE_5__.amplifyUuid)(),
            EffectiveDate: new Date().toISOString(),
            ChannelType: channelType,
            Address: address,
            ...(shouldAddAttributes && { Attributes: attributes }),
            ...(shouldAddDemographics && {
                Demographic: {
                    AppVersion: mergedDemographic.appVersion,
                    Locale: mergedDemographic.locale,
                    Make: mergedDemographic.make,
                    Model: mergedDemographic.model,
                    ModelVersion: mergedDemographic.modelVersion,
                    Platform: mergedDemographic.platform,
                    PlatformVersion: mergedDemographic.platformVersion,
                    Timezone: mergedDemographic.timezone,
                },
            }),
            ...(location && {
                Location: {
                    City: location.city,
                    Country: location.country,
                    Latitude: location.latitude,
                    Longitude: location.longitude,
                    PostalCode: location.postalCode,
                    Region: location.region,
                },
            }),
            Metrics: metrics,
            OptOut: optOut,
            ...(shouldAddUser && {
                User: {
                    UserId: resolvedUserId,
                    UserAttributes: userAttributes,
                },
            }),
        },
    };
    try {
        await (0,_awsClients_pinpoint_updateEndpoint_mjs__WEBPACK_IMPORTED_MODULE_6__.updateEndpoint)({ credentials, region, userAgentValue }, input);
        // if we had to create an endpoint id, we need to now cache it
        if (createdEndpointId) {
            await (0,_utils_cacheEndpointId_mjs__WEBPACK_IMPORTED_MODULE_7__.cacheEndpointId)(appId, category, createdEndpointId);
        }
    }
    finally {
        // at this point, we completely reset the behavior so even if the update was unsuccessful
        // we can just start over with a newly created endpoint id
        if (createdEndpointId) {
            (0,_utils_createEndpointId_mjs__WEBPACK_IMPORTED_MODULE_3__.clearCreatedEndpointId)(appId, category);
        }
    }
};


//# sourceMappingURL=updateEndpoint.mjs.map


/***/ }),

/***/ "../core/dist/esm/providers/pinpoint/utils/PinpointEventBuffer.mjs":
/*!*************************************************************************!*\
  !*** ../core/dist/esm/providers/pinpoint/utils/PinpointEventBuffer.mjs ***!
  \*************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PinpointEventBuffer: () => (/* binding */ PinpointEventBuffer)
/* harmony export */ });
/* harmony import */ var _Logger_ConsoleLogger_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../Logger/ConsoleLogger.mjs */ "../core/dist/esm/Logger/ConsoleLogger.mjs");
/* harmony import */ var _aws_crypto_sha256_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @aws-crypto/sha256-js */ "../../node_modules/@aws-crypto/sha256-js/build/module/index.js");
/* harmony import */ var _smithy_util_hex_encoding__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @smithy/util-hex-encoding */ "../core/node_modules/@smithy/util-hex-encoding/dist-es/index.js");
/* harmony import */ var _awsClients_pinpoint_putEvents_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../awsClients/pinpoint/putEvents.mjs */ "../core/dist/esm/awsClients/pinpoint/putEvents.mjs");
/* harmony import */ var _isAppInForeground_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./isAppInForeground.mjs */ "../core/dist/esm/providers/pinpoint/utils/isAppInForeground.mjs");











// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
const logger = new _Logger_ConsoleLogger_mjs__WEBPACK_IMPORTED_MODULE_2__.ConsoleLogger('PinpointEventBuffer');
const RETRYABLE_CODES = [429, 500];
const ACCEPTED_CODES = [202];
class PinpointEventBuffer {
    constructor(config) {
        this._interval = undefined;
        this._pause = false;
        this._flush = false;
        this._buffer = [];
        this._config = config;
        this._sendBatch = this._sendBatch.bind(this);
        this._startLoop();
    }
    push(event) {
        if (this._buffer.length >= this._config.bufferSize) {
            logger.debug('Exceeded Pinpoint event buffer limits, event dropped.', {
                eventId: event.eventId,
            });
            return;
        }
        this._buffer.push({ [event.eventId]: event });
    }
    pause() {
        this._pause = true;
    }
    resume() {
        this._pause = false;
    }
    flush() {
        this._flush = true;
    }
    identityHasChanged(identityId) {
        return this._config.identityId !== identityId;
    }
    flushAll() {
        this._putEvents(this._buffer.splice(0, this._buffer.length));
    }
    _startLoop() {
        if (this._interval) {
            clearInterval(this._interval);
        }
        const { flushInterval } = this._config;
        this._interval = setInterval(this._sendBatch, flushInterval);
    }
    _sendBatch() {
        const bufferLength = this._buffer.length;
        if (this._flush && !bufferLength && this._interval) {
            clearInterval(this._interval);
        }
        if (this._pause || !bufferLength || !(0,_isAppInForeground_mjs__WEBPACK_IMPORTED_MODULE_3__.isAppInForeground)()) {
            return;
        }
        const { flushSize } = this._config;
        const batchSize = Math.min(flushSize, bufferLength);
        const bufferSubset = this._buffer.splice(0, batchSize);
        this._putEvents(bufferSubset);
    }
    async _putEvents(buffer) {
        const eventMap = this._bufferToMap(buffer);
        const batchEventParams = this._generateBatchEventParams(eventMap);
        try {
            const { credentials, region, userAgentValue } = this._config;
            const data = await (0,_awsClients_pinpoint_putEvents_mjs__WEBPACK_IMPORTED_MODULE_4__.putEvents)({
                credentials,
                region,
                userAgentValue,
            }, batchEventParams);
            this._processPutEventsSuccessResponse(data, eventMap);
        }
        catch (err) {
            this._handlePutEventsFailure(err, eventMap);
        }
    }
    _generateBatchEventParams(eventMap) {
        const batchItem = {};
        Object.values(eventMap).forEach(item => {
            const { event, timestamp, endpointId, eventId, session } = item;
            const { name, attributes, metrics } = event;
            batchItem[endpointId] = {
                Endpoint: {
                    ...batchItem[endpointId]?.Endpoint,
                },
                Events: {
                    ...batchItem[endpointId]?.Events,
                    [eventId]: {
                        EventType: name,
                        Timestamp: new Date(timestamp).toISOString(),
                        Attributes: attributes,
                        Metrics: metrics,
                        Session: session,
                    },
                },
            };
        });
        return {
            ApplicationId: this._config.appId,
            EventsRequest: {
                BatchItem: batchItem,
            },
        };
    }
    _handlePutEventsFailure(err, eventMap) {
        logger.debug('putEvents call to Pinpoint failed.', err);
        const statusCode = err.$metadata && err.$metadata.httpStatusCode;
        if (RETRYABLE_CODES.includes(statusCode)) {
            const retryableEvents = Object.values(eventMap);
            this._retry(retryableEvents);
        }
    }
    _processPutEventsSuccessResponse(data, eventMap) {
        const { Results = {} } = data.EventsResponse ?? {};
        const retryableEvents = [];
        Object.entries(Results).forEach(([_, endpointValues]) => {
            const responses = endpointValues.EventsItemResponse ?? {};
            Object.entries(responses).forEach(([eventId, eventValues]) => {
                const eventObject = eventMap[eventId];
                if (!eventObject) {
                    return;
                }
                const { StatusCode, Message } = eventValues ?? {};
                if (StatusCode && ACCEPTED_CODES.includes(StatusCode)) {
                    return;
                }
                if (StatusCode && RETRYABLE_CODES.includes(StatusCode)) {
                    retryableEvents.push(eventObject);
                    return;
                }
                const { name } = eventObject.event;
                logger.warn('Pinpoint event failed to send.', {
                    eventId,
                    name,
                    message: Message,
                });
            });
        });
        if (retryableEvents.length) {
            this._retry(retryableEvents);
        }
    }
    _retry(retryableEvents) {
        // retryable events that haven't reached the resendLimit
        const eligibleEvents = [];
        retryableEvents.forEach((bufferedEvent) => {
            const { eventId } = bufferedEvent;
            const { name } = bufferedEvent.event;
            if (bufferedEvent.resendLimit-- > 0) {
                logger.debug('Resending event.', {
                    eventId,
                    name,
                    remainingAttempts: bufferedEvent.resendLimit,
                });
                eligibleEvents.push({ [eventId]: bufferedEvent });
                return;
            }
            logger.debug('No retry attempts remaining for event.', {
                eventId,
                name,
            });
        });
        // add the events to the front of the buffer
        this._buffer.unshift(...eligibleEvents);
    }
    _bufferToMap(buffer) {
        return buffer.reduce((acc, curVal) => {
            const [[key, value]] = Object.entries(curVal);
            acc[key] = value;
            return acc;
        }, {});
    }
}


//# sourceMappingURL=PinpointEventBuffer.mjs.map


/***/ }),

/***/ "../core/dist/esm/providers/pinpoint/utils/cacheEndpointId.mjs":
/*!*********************************************************************!*\
  !*** ../core/dist/esm/providers/pinpoint/utils/cacheEndpointId.mjs ***!
  \*********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   cacheEndpointId: () => (/* binding */ cacheEndpointId)
/* harmony export */ });
/* harmony import */ var _Cache_index_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../Cache/index.mjs */ "../core/dist/esm/Cache/index.mjs");
/* harmony import */ var _getCacheKey_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./getCacheKey.mjs */ "../core/dist/esm/providers/pinpoint/utils/getCacheKey.mjs");



// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
/**
 * Writes an endpoint id to a long-lived cache.
 *
 * @internal
 */
const cacheEndpointId = async (appId, category, endpointId) => {
    const cacheKey = (0,_getCacheKey_mjs__WEBPACK_IMPORTED_MODULE_1__.getCacheKey)(appId, category);
    // Set a longer TTL to avoid endpoint id being deleted after the default TTL (3 days)
    // Also set its priority to the highest to reduce its chance of being deleted when cache is full
    const ttl = 1000 * 60 * 60 * 24 * 365 * 100; // 100 years
    const expiration = new Date().getTime() + ttl;
    return _Cache_index_mjs__WEBPACK_IMPORTED_MODULE_0__.Cache.setItem(cacheKey, endpointId, {
        expires: expiration,
        priority: 1,
    });
};


//# sourceMappingURL=cacheEndpointId.mjs.map


/***/ }),

/***/ "../core/dist/esm/providers/pinpoint/utils/constants.mjs":
/*!***************************************************************!*\
  !*** ../core/dist/esm/providers/pinpoint/utils/constants.mjs ***!
  \***************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BUFFER_SIZE: () => (/* binding */ BUFFER_SIZE),
/* harmony export */   FLUSH_INTERVAL: () => (/* binding */ FLUSH_INTERVAL),
/* harmony export */   FLUSH_SIZE: () => (/* binding */ FLUSH_SIZE),
/* harmony export */   RESEND_LIMIT: () => (/* binding */ RESEND_LIMIT)
/* harmony export */ });
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
// Default buffer constants
const BUFFER_SIZE = 1000;
const FLUSH_SIZE = 100;
const FLUSH_INTERVAL = 5 * 1000; // 5s
const RESEND_LIMIT = 5;


//# sourceMappingURL=constants.mjs.map


/***/ }),

/***/ "../core/dist/esm/providers/pinpoint/utils/createEndpointId.mjs":
/*!**********************************************************************!*\
  !*** ../core/dist/esm/providers/pinpoint/utils/createEndpointId.mjs ***!
  \**********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   clearCreatedEndpointId: () => (/* binding */ clearCreatedEndpointId),
/* harmony export */   createEndpointId: () => (/* binding */ createEndpointId)
/* harmony export */ });
/* harmony import */ var _utils_amplifyUuid_index_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../utils/amplifyUuid/index.mjs */ "../core/dist/esm/utils/amplifyUuid/index.mjs");
/* harmony import */ var _getCacheKey_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getCacheKey.mjs */ "../core/dist/esm/providers/pinpoint/utils/getCacheKey.mjs");



// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
const createdEndpointIds = {};
/**
 * Creates an endpoint id and guarantees multiple creations for a category returns the same uuid.
 *
 * @internal
 */
const createEndpointId = (appId, category) => {
    const cacheKey = (0,_getCacheKey_mjs__WEBPACK_IMPORTED_MODULE_0__.getCacheKey)(appId, category);
    if (!createdEndpointIds[cacheKey]) {
        createdEndpointIds[cacheKey] = (0,_utils_amplifyUuid_index_mjs__WEBPACK_IMPORTED_MODULE_1__.amplifyUuid)();
    }
    return createdEndpointIds[cacheKey];
};
/**
 * Clears a created endpoint id for a category.
 *
 * @internal
 */
const clearCreatedEndpointId = (appId, category) => {
    const cacheKey = (0,_getCacheKey_mjs__WEBPACK_IMPORTED_MODULE_0__.getCacheKey)(appId, category);
    delete createdEndpointIds[cacheKey];
};


//# sourceMappingURL=createEndpointId.mjs.map


/***/ }),

/***/ "../core/dist/esm/providers/pinpoint/utils/getCacheKey.mjs":
/*!*****************************************************************!*\
  !*** ../core/dist/esm/providers/pinpoint/utils/getCacheKey.mjs ***!
  \*****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getCacheKey: () => (/* binding */ getCacheKey)
/* harmony export */ });
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
const PROVIDER_NAME = 'pinpoint';
/**
 * Returns a unique cache key for a particular category/appId combination.
 *
 * @internal
 */
const getCacheKey = (appId, category) => `${category}:${PROVIDER_NAME}:${appId}`;


//# sourceMappingURL=getCacheKey.mjs.map


/***/ }),

/***/ "../core/dist/esm/providers/pinpoint/utils/getEndpointId.mjs":
/*!*******************************************************************!*\
  !*** ../core/dist/esm/providers/pinpoint/utils/getEndpointId.mjs ***!
  \*******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getEndpointId: () => (/* binding */ getEndpointId)
/* harmony export */ });
/* harmony import */ var _Cache_index_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../Cache/index.mjs */ "../core/dist/esm/Cache/index.mjs");
/* harmony import */ var _getCacheKey_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./getCacheKey.mjs */ "../core/dist/esm/providers/pinpoint/utils/getCacheKey.mjs");



// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
/**
 * Returns an endpoint id from cache or `undefined` if not found.
 *
 * @internal
 */
const getEndpointId = async (appId, category) => {
    const cacheKey = (0,_getCacheKey_mjs__WEBPACK_IMPORTED_MODULE_1__.getCacheKey)(appId, category);
    const cachedEndpointId = await _Cache_index_mjs__WEBPACK_IMPORTED_MODULE_0__.Cache.getItem(cacheKey);
    return cachedEndpointId ?? undefined;
};


//# sourceMappingURL=getEndpointId.mjs.map


/***/ }),

/***/ "../core/dist/esm/providers/pinpoint/utils/getEventBuffer.mjs":
/*!********************************************************************!*\
  !*** ../core/dist/esm/providers/pinpoint/utils/getEventBuffer.mjs ***!
  \********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getEventBuffer: () => (/* binding */ getEventBuffer)
/* harmony export */ });
/* harmony import */ var _PinpointEventBuffer_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./PinpointEventBuffer.mjs */ "../core/dist/esm/providers/pinpoint/utils/PinpointEventBuffer.mjs");


// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
// Map of buffers by region -> appId
const eventBufferMap = {};
/**
 * Returns a PinpointEventBuffer instance for the specified region & app ID, creating one if it does not yet exist.
 *
 * @internal
 */
const getEventBuffer = ({ appId, region, credentials, bufferSize, flushInterval, flushSize, resendLimit, identityId, userAgentValue, }) => {
    if (eventBufferMap[region]?.[appId]) {
        const buffer = eventBufferMap[region][appId];
        /*
        If the identity has changed flush out the buffer and create a new instance. The old instance will be garbage
        collected.
        */
        if (buffer.identityHasChanged(identityId)) {
            buffer.flush();
        }
        else {
            return buffer;
        }
    }
    const buffer = new _PinpointEventBuffer_mjs__WEBPACK_IMPORTED_MODULE_0__.PinpointEventBuffer({
        appId,
        bufferSize,
        credentials,
        flushInterval,
        flushSize,
        identityId,
        region,
        resendLimit,
        userAgentValue,
    });
    if (!eventBufferMap[region]) {
        eventBufferMap[region] = {};
    }
    eventBufferMap[region][appId] = buffer;
    return buffer;
};


//# sourceMappingURL=getEventBuffer.mjs.map


/***/ }),

/***/ "../core/dist/esm/providers/pinpoint/utils/isAppInForeground.mjs":
/*!***********************************************************************!*\
  !*** ../core/dist/esm/providers/pinpoint/utils/isAppInForeground.mjs ***!
  \***********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   isAppInForeground: () => (/* binding */ isAppInForeground)
/* harmony export */ });
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
const isAppInForeground = () => true;


//# sourceMappingURL=isAppInForeground.mjs.map


/***/ }),

/***/ "../core/dist/esm/providers/pinpoint/utils/resolveEndpointId.mjs":
/*!***********************************************************************!*\
  !*** ../core/dist/esm/providers/pinpoint/utils/resolveEndpointId.mjs ***!
  \***********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   resolveEndpointId: () => (/* binding */ resolveEndpointId)
/* harmony export */ });
/* harmony import */ var _types_errors_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../types/errors.mjs */ "../core/dist/esm/types/errors.mjs");
/* harmony import */ var _errors_errorHelpers_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../errors/errorHelpers.mjs */ "../core/dist/esm/errors/errorHelpers.mjs");
/* harmony import */ var _apis_updateEndpoint_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../apis/updateEndpoint.mjs */ "../core/dist/esm/providers/pinpoint/apis/updateEndpoint.mjs");
/* harmony import */ var _getEndpointId_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getEndpointId.mjs */ "../core/dist/esm/providers/pinpoint/utils/getEndpointId.mjs");





// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
/**
 * Resolves an endpoint id from cache or prepare via updateEndpoint if one does not already exist,
 * which will generate and cache an endpoint id between calls.
 *
 * @internal
 */
const resolveEndpointId = async ({ address, appId, category, channelType, credentials, identityId, region, userAgentValue, }) => {
    let endpointId = await (0,_getEndpointId_mjs__WEBPACK_IMPORTED_MODULE_0__.getEndpointId)(appId, category);
    if (!endpointId) {
        await (0,_apis_updateEndpoint_mjs__WEBPACK_IMPORTED_MODULE_1__.updateEndpoint)({
            address,
            appId,
            category,
            channelType,
            credentials,
            identityId,
            region,
            userAgentValue,
        });
        endpointId = await (0,_getEndpointId_mjs__WEBPACK_IMPORTED_MODULE_0__.getEndpointId)(appId, category);
    }
    (0,_errors_errorHelpers_mjs__WEBPACK_IMPORTED_MODULE_2__.assert)(!!endpointId, _types_errors_mjs__WEBPACK_IMPORTED_MODULE_3__.AmplifyErrorCode.NoEndpointId);
    return endpointId;
};


//# sourceMappingURL=resolveEndpointId.mjs.map


/***/ }),

/***/ "../core/dist/esm/storage/InMemoryStorage.mjs":
/*!****************************************************!*\
  !*** ../core/dist/esm/storage/InMemoryStorage.mjs ***!
  \****************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   InMemoryStorage: () => (/* binding */ InMemoryStorage)
/* harmony export */ });
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
/**
 * @internal
 */
class InMemoryStorage {
    constructor() {
        this.storage = new Map();
    }
    get length() {
        return this.storage.size;
    }
    key(index) {
        if (index > this.length - 1) {
            return null;
        }
        return Array.from(this.storage.keys())[index];
    }
    setItem(key, value) {
        this.storage.set(key, value);
    }
    getItem(key) {
        return this.storage.get(key) ?? null;
    }
    removeItem(key) {
        this.storage.delete(key);
    }
    clear() {
        this.storage.clear();
    }
}


//# sourceMappingURL=InMemoryStorage.mjs.map


/***/ }),

/***/ "../core/dist/esm/storage/KeyValueStorage.mjs":
/*!****************************************************!*\
  !*** ../core/dist/esm/storage/KeyValueStorage.mjs ***!
  \****************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   KeyValueStorage: () => (/* binding */ KeyValueStorage)
/* harmony export */ });
/* harmony import */ var _errors_PlatformNotSupportedError_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../errors/PlatformNotSupportedError.mjs */ "../core/dist/esm/errors/PlatformNotSupportedError.mjs");



// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
/**
 * @internal
 */
class KeyValueStorage {
    constructor(storage) {
        this.storage = storage;
    }
    /**
     * This is used to set a specific item in storage
     * @param {string} key - the key for the item
     * @param {object} value - the value
     * @returns {string} value that was set
     */
    async setItem(key, value) {
        if (!this.storage)
            throw new _errors_PlatformNotSupportedError_mjs__WEBPACK_IMPORTED_MODULE_0__.PlatformNotSupportedError();
        this.storage.setItem(key, value);
    }
    /**
     * This is used to get a specific key from storage
     * @param {string} key - the key for the item
     * This is used to clear the storage
     * @returns {string} the data item
     */
    async getItem(key) {
        if (!this.storage)
            throw new _errors_PlatformNotSupportedError_mjs__WEBPACK_IMPORTED_MODULE_0__.PlatformNotSupportedError();
        return this.storage.getItem(key);
    }
    /**
     * This is used to remove an item from storage
     * @param {string} key - the key being set
     * @returns {string} value - value that was deleted
     */
    async removeItem(key) {
        if (!this.storage)
            throw new _errors_PlatformNotSupportedError_mjs__WEBPACK_IMPORTED_MODULE_0__.PlatformNotSupportedError();
        this.storage.removeItem(key);
    }
    /**
     * This is used to clear the storage
     * @returns {string} nothing
     */
    async clear() {
        if (!this.storage)
            throw new _errors_PlatformNotSupportedError_mjs__WEBPACK_IMPORTED_MODULE_0__.PlatformNotSupportedError();
        this.storage.clear();
    }
}


//# sourceMappingURL=KeyValueStorage.mjs.map


/***/ }),

/***/ "../core/dist/esm/storage/utils.mjs":
/*!******************************************!*\
  !*** ../core/dist/esm/storage/utils.mjs ***!
  \******************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getLocalStorageWithFallback: () => (/* binding */ getLocalStorageWithFallback),
/* harmony export */   getSessionStorageWithFallback: () => (/* binding */ getSessionStorageWithFallback)
/* harmony export */ });
/* harmony import */ var _Logger_ConsoleLogger_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Logger/ConsoleLogger.mjs */ "../core/dist/esm/Logger/ConsoleLogger.mjs");
/* harmony import */ var _InMemoryStorage_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./InMemoryStorage.mjs */ "../core/dist/esm/storage/InMemoryStorage.mjs");



// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
/**
 * @internal
 * @returns Either a reference to window.localStorage or an in-memory storage as fallback
 */
const logger = new _Logger_ConsoleLogger_mjs__WEBPACK_IMPORTED_MODULE_0__.ConsoleLogger('CoreStorageUtils');
const getLocalStorageWithFallback = () => {
    try {
        // Attempt to use localStorage directly
        if (typeof window !== 'undefined' && window.localStorage) {
            return window.localStorage;
        }
    }
    catch (e) {
        // Handle any errors related to localStorage access
        logger.info('localStorage not found. InMemoryStorage is used as a fallback.');
    }
    // Return in-memory storage as a fallback if localStorage is not accessible
    return new _InMemoryStorage_mjs__WEBPACK_IMPORTED_MODULE_1__.InMemoryStorage();
};
/**
 * @internal
 * @returns Either a reference to window.sessionStorage or an in-memory storage as fallback
 */
const getSessionStorageWithFallback = () => {
    try {
        // Attempt to use sessionStorage directly
        if (typeof window !== 'undefined' && window.sessionStorage) {
            // Verify we can actually use it by testing access
            window.sessionStorage.getItem('test');
            return window.sessionStorage;
        }
        throw new Error('sessionStorage is not defined');
    }
    catch (e) {
        // Handle any errors related to sessionStorage access
        logger.info('sessionStorage not found. InMemoryStorage is used as a fallback.');
        return new _InMemoryStorage_mjs__WEBPACK_IMPORTED_MODULE_1__.InMemoryStorage();
    }
};


//# sourceMappingURL=utils.mjs.map


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

/***/ "../core/dist/esm/utils/getClientInfo/getClientInfo.mjs":
/*!**************************************************************!*\
  !*** ../core/dist/esm/utils/getClientInfo/getClientInfo.mjs ***!
  \**************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getClientInfo: () => (/* binding */ getClientInfo)
/* harmony export */ });
/* harmony import */ var _Logger_ConsoleLogger_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../Logger/ConsoleLogger.mjs */ "../core/dist/esm/Logger/ConsoleLogger.mjs");


// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
const logger = new _Logger_ConsoleLogger_mjs__WEBPACK_IMPORTED_MODULE_0__.ConsoleLogger('getClientInfo');
function getClientInfo() {
    if (typeof window === 'undefined') {
        return {};
    }
    return browserClientInfo();
}
function browserClientInfo() {
    if (typeof window === 'undefined') {
        logger.warn('No window object available to get browser client info');
        return {};
    }
    const nav = window.navigator;
    if (!nav) {
        logger.warn('No navigator object available to get browser client info');
        return {};
    }
    const { platform, product, vendor, userAgent, language } = nav;
    const type = getBrowserType(userAgent);
    const timezone = browserTimezone();
    return {
        platform,
        make: product || vendor,
        model: type.type,
        version: type.version,
        appVersion: [type.type, type.version].join('/'),
        language,
        timezone,
    };
}
function browserTimezone() {
    const tzMatch = /\(([A-Za-z\s].*)\)/.exec(new Date().toString());
    return tzMatch ? tzMatch[1] || '' : '';
}
function getBrowserType(userAgent) {
    // The latest user agents for Opera: https://www.whatismybrowser.com/guides/the-latest-user-agent/opera
    const operaMatch = /.+(Opera[\s[A-Z]*|OPR[\sA-Z]*)\/([0-9.]+).*/i.exec(userAgent);
    if (operaMatch) {
        return { type: operaMatch[1], version: operaMatch[2] };
    }
    // The latest user agents for Edge: https://www.whatismybrowser.com/guides/the-latest-user-agent/edge
    const ieMatch = /.+(Trident|Edge|Edg|EdgA|EdgiOS)\/([0-9.]+).*/i.exec(userAgent);
    if (ieMatch) {
        return { type: ieMatch[1], version: ieMatch[2] };
    }
    // The latest user agents for web browsers on Firefox and Chrome
    // https://www.whatismybrowser.com/guides/the-latest-user-agent/firefox
    // https://www.whatismybrowser.com/guides/the-latest-user-agent/chrome
    const cfMatch = /.+(Chrome|CriOS|Firefox|FxiOS)\/([0-9.]+).*/i.exec(userAgent);
    if (cfMatch) {
        return { type: cfMatch[1], version: cfMatch[2] };
    }
    // The latest user agents for Safari: https://www.whatismybrowser.com/guides/the-latest-user-agent/safari
    const sMatch = /.+(Safari)\/([0-9.]+).*/i.exec(userAgent);
    if (sMatch) {
        return { type: sMatch[1], version: sMatch[2] };
    }
    const awkMatch = /.+(AppleWebKit)\/([0-9.]+).*/i.exec(userAgent);
    if (awkMatch) {
        return { type: awkMatch[1], version: awkMatch[2] };
    }
    const anyMatch = /.*([A-Z]+)\/([0-9.]+).*/i.exec(userAgent);
    if (anyMatch) {
        return { type: anyMatch[1], version: anyMatch[2] };
    }
    return { type: '', version: '' };
}


//# sourceMappingURL=getClientInfo.mjs.map


/***/ }),

/***/ "../core/dist/esm/utils/isBrowser.mjs":
/*!********************************************!*\
  !*** ../core/dist/esm/utils/isBrowser.mjs ***!
  \********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   isBrowser: () => (/* binding */ isBrowser)
/* harmony export */ });
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
const isBrowser = () => typeof window !== 'undefined' && typeof window.document !== 'undefined';


//# sourceMappingURL=isBrowser.mjs.map


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


/***/ }),

/***/ "../core/dist/esm/utils/sessionListener/SessionListener.mjs":
/*!******************************************************************!*\
  !*** ../core/dist/esm/utils/sessionListener/SessionListener.mjs ***!
  \******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SessionListener: () => (/* binding */ SessionListener)
/* harmony export */ });
/* harmony import */ var _isBrowser_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../isBrowser.mjs */ "../core/dist/esm/utils/isBrowser.mjs");


// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
const stateChangeListeners = new Set();
class SessionListener {
    constructor() {
        this.listenerActive = false;
        this.handleVisibilityChange = this.handleVisibilityChange.bind(this);
        // Setup state listeners
        if ((0,_isBrowser_mjs__WEBPACK_IMPORTED_MODULE_0__.isBrowser)()) {
            document.addEventListener('visibilitychange', this.handleVisibilityChange, false);
            this.listenerActive = true;
        }
    }
    addStateChangeListener(listener, notifyOnAdd = false) {
        // No-op if document listener is not active
        if (!this.listenerActive) {
            return;
        }
        stateChangeListeners.add(listener);
        // Notify new handlers of the current status on add
        if (notifyOnAdd) {
            listener(this.getSessionState());
        }
    }
    removeStateChangeListener(handler) {
        // No-op if document listener is not active
        if (!this.listenerActive) {
            return;
        }
        stateChangeListeners.delete(handler);
    }
    handleVisibilityChange() {
        this.notifyHandlers();
    }
    notifyHandlers() {
        const sessionState = this.getSessionState();
        stateChangeListeners.forEach(listener => {
            listener(sessionState);
        });
    }
    getSessionState() {
        if ((0,_isBrowser_mjs__WEBPACK_IMPORTED_MODULE_0__.isBrowser)() && document.visibilityState !== 'hidden') {
            return 'started';
        }
        // If, for any reason, document is undefined the session will never start
        return 'ended';
    }
}


//# sourceMappingURL=SessionListener.mjs.map


/***/ }),

/***/ "../core/dist/esm/utils/sessionListener/constants.mjs":
/*!************************************************************!*\
  !*** ../core/dist/esm/utils/sessionListener/constants.mjs ***!
  \************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SESSION_START_EVENT: () => (/* binding */ SESSION_START_EVENT),
/* harmony export */   SESSION_STOP_EVENT: () => (/* binding */ SESSION_STOP_EVENT)
/* harmony export */ });
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
// Standard session start & stop event names
const SESSION_START_EVENT = '_session.start';
const SESSION_STOP_EVENT = '_session.stop';


//# sourceMappingURL=constants.mjs.map


/***/ }),

/***/ "../core/dist/esm/utils/sessionListener/index.mjs":
/*!********************************************************!*\
  !*** ../core/dist/esm/utils/sessionListener/index.mjs ***!
  \********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SESSION_START_EVENT: () => (/* reexport safe */ _constants_mjs__WEBPACK_IMPORTED_MODULE_0__.SESSION_START_EVENT),
/* harmony export */   SESSION_STOP_EVENT: () => (/* reexport safe */ _constants_mjs__WEBPACK_IMPORTED_MODULE_0__.SESSION_STOP_EVENT),
/* harmony export */   sessionListener: () => (/* binding */ sessionListener)
/* harmony export */ });
/* harmony import */ var _SessionListener_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./SessionListener.mjs */ "../core/dist/esm/utils/sessionListener/SessionListener.mjs");
/* harmony import */ var _constants_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants.mjs */ "../core/dist/esm/utils/sessionListener/constants.mjs");



// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
const sessionListener = new _SessionListener_mjs__WEBPACK_IMPORTED_MODULE_1__.SessionListener();


//# sourceMappingURL=index.mjs.map


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
/* harmony export */   AnalyticsError: () => (/* reexport safe */ _errors_AnalyticsError_mjs__WEBPACK_IMPORTED_MODULE_6__.AnalyticsError),
/* harmony export */   configureAutoTrack: () => (/* reexport safe */ _providers_pinpoint_apis_configureAutoTrack_mjs__WEBPACK_IMPORTED_MODULE_2__.configureAutoTrack),
/* harmony export */   disable: () => (/* reexport safe */ _apis_disable_mjs__WEBPACK_IMPORTED_MODULE_5__.disable),
/* harmony export */   enable: () => (/* reexport safe */ _apis_enable_mjs__WEBPACK_IMPORTED_MODULE_4__.enable),
/* harmony export */   flushEvents: () => (/* reexport safe */ _providers_pinpoint_apis_flushEvents_mjs__WEBPACK_IMPORTED_MODULE_3__.flushEvents),
/* harmony export */   identifyUser: () => (/* reexport safe */ _providers_pinpoint_apis_identifyUser_mjs__WEBPACK_IMPORTED_MODULE_1__.identifyUser),
/* harmony export */   record: () => (/* reexport safe */ _providers_pinpoint_apis_record_mjs__WEBPACK_IMPORTED_MODULE_0__.record)
/* harmony export */ });
/* harmony import */ var _providers_pinpoint_apis_record_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./providers/pinpoint/apis/record.mjs */ "./dist/esm/providers/pinpoint/apis/record.mjs");
/* harmony import */ var _providers_pinpoint_apis_identifyUser_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./providers/pinpoint/apis/identifyUser.mjs */ "./dist/esm/providers/pinpoint/apis/identifyUser.mjs");
/* harmony import */ var _providers_pinpoint_apis_configureAutoTrack_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./providers/pinpoint/apis/configureAutoTrack.mjs */ "./dist/esm/providers/pinpoint/apis/configureAutoTrack.mjs");
/* harmony import */ var _providers_pinpoint_apis_flushEvents_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./providers/pinpoint/apis/flushEvents.mjs */ "./dist/esm/providers/pinpoint/apis/flushEvents.mjs");
/* harmony import */ var _apis_enable_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./apis/enable.mjs */ "./dist/esm/apis/enable.mjs");
/* harmony import */ var _apis_disable_mjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./apis/disable.mjs */ "./dist/esm/apis/disable.mjs");
/* harmony import */ var _errors_AnalyticsError_mjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./errors/AnalyticsError.mjs */ "./dist/esm/errors/AnalyticsError.mjs");








//# sourceMappingURL=index.mjs.map

})();

/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=aws-amplify-analytics.js.map