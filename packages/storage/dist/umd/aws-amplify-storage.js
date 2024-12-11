(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("aws_amplify_core"));
	else if(typeof define === 'function' && define.amd)
		define("aws_amplify_storage", ["aws_amplify_core"], factory);
	else if(typeof exports === 'object')
		exports["aws_amplify_storage"] = factory(require("aws_amplify_core"));
	else
		root["aws_amplify_storage"] = factory(root["aws_amplify_core"]);
})(this, (__WEBPACK_EXTERNAL_MODULE__aws_amplify_core__) => {
return /******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "../../node_modules/@aws-crypto/sha256-js/build/module/RawSha256.js":
/*!**************************************************************************!*\
  !*** ../../node_modules/@aws-crypto/sha256-js/build/module/RawSha256.js ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
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

/***/ "../../node_modules/@smithy/md5-js/dist-es/constants.js":
/*!**************************************************************!*\
  !*** ../../node_modules/@smithy/md5-js/dist-es/constants.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BLOCK_SIZE: () => (/* binding */ BLOCK_SIZE),
/* harmony export */   DIGEST_LENGTH: () => (/* binding */ DIGEST_LENGTH),
/* harmony export */   INIT: () => (/* binding */ INIT)
/* harmony export */ });
const BLOCK_SIZE = 64;
const DIGEST_LENGTH = 16;
const INIT = [0x67452301, 0xefcdab89, 0x98badcfe, 0x10325476];


/***/ }),

/***/ "../../node_modules/@smithy/md5-js/dist-es/index.js":
/*!**********************************************************!*\
  !*** ../../node_modules/@smithy/md5-js/dist-es/index.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Md5: () => (/* binding */ Md5)
/* harmony export */ });
/* harmony import */ var _smithy_util_utf8__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @smithy/util-utf8 */ "../../node_modules/@smithy/md5-js/node_modules/@smithy/util-utf8/dist-es/index.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./constants */ "../../node_modules/@smithy/md5-js/dist-es/constants.js");


class Md5 {
    constructor() {
        this.reset();
    }
    update(sourceData) {
        if (isEmptyData(sourceData)) {
            return;
        }
        else if (this.finished) {
            throw new Error("Attempted to update an already finished hash.");
        }
        const data = convertToBuffer(sourceData);
        let position = 0;
        let { byteLength } = data;
        this.bytesHashed += byteLength;
        while (byteLength > 0) {
            this.buffer.setUint8(this.bufferLength++, data[position++]);
            byteLength--;
            if (this.bufferLength === _constants__WEBPACK_IMPORTED_MODULE_1__.BLOCK_SIZE) {
                this.hashBuffer();
                this.bufferLength = 0;
            }
        }
    }
    async digest() {
        if (!this.finished) {
            const { buffer, bufferLength: undecoratedLength, bytesHashed } = this;
            const bitsHashed = bytesHashed * 8;
            buffer.setUint8(this.bufferLength++, 0b10000000);
            if (undecoratedLength % _constants__WEBPACK_IMPORTED_MODULE_1__.BLOCK_SIZE >= _constants__WEBPACK_IMPORTED_MODULE_1__.BLOCK_SIZE - 8) {
                for (let i = this.bufferLength; i < _constants__WEBPACK_IMPORTED_MODULE_1__.BLOCK_SIZE; i++) {
                    buffer.setUint8(i, 0);
                }
                this.hashBuffer();
                this.bufferLength = 0;
            }
            for (let i = this.bufferLength; i < _constants__WEBPACK_IMPORTED_MODULE_1__.BLOCK_SIZE - 8; i++) {
                buffer.setUint8(i, 0);
            }
            buffer.setUint32(_constants__WEBPACK_IMPORTED_MODULE_1__.BLOCK_SIZE - 8, bitsHashed >>> 0, true);
            buffer.setUint32(_constants__WEBPACK_IMPORTED_MODULE_1__.BLOCK_SIZE - 4, Math.floor(bitsHashed / 0x100000000), true);
            this.hashBuffer();
            this.finished = true;
        }
        const out = new DataView(new ArrayBuffer(_constants__WEBPACK_IMPORTED_MODULE_1__.DIGEST_LENGTH));
        for (let i = 0; i < 4; i++) {
            out.setUint32(i * 4, this.state[i], true);
        }
        return new Uint8Array(out.buffer, out.byteOffset, out.byteLength);
    }
    hashBuffer() {
        const { buffer, state } = this;
        let a = state[0], b = state[1], c = state[2], d = state[3];
        a = ff(a, b, c, d, buffer.getUint32(0, true), 7, 0xd76aa478);
        d = ff(d, a, b, c, buffer.getUint32(4, true), 12, 0xe8c7b756);
        c = ff(c, d, a, b, buffer.getUint32(8, true), 17, 0x242070db);
        b = ff(b, c, d, a, buffer.getUint32(12, true), 22, 0xc1bdceee);
        a = ff(a, b, c, d, buffer.getUint32(16, true), 7, 0xf57c0faf);
        d = ff(d, a, b, c, buffer.getUint32(20, true), 12, 0x4787c62a);
        c = ff(c, d, a, b, buffer.getUint32(24, true), 17, 0xa8304613);
        b = ff(b, c, d, a, buffer.getUint32(28, true), 22, 0xfd469501);
        a = ff(a, b, c, d, buffer.getUint32(32, true), 7, 0x698098d8);
        d = ff(d, a, b, c, buffer.getUint32(36, true), 12, 0x8b44f7af);
        c = ff(c, d, a, b, buffer.getUint32(40, true), 17, 0xffff5bb1);
        b = ff(b, c, d, a, buffer.getUint32(44, true), 22, 0x895cd7be);
        a = ff(a, b, c, d, buffer.getUint32(48, true), 7, 0x6b901122);
        d = ff(d, a, b, c, buffer.getUint32(52, true), 12, 0xfd987193);
        c = ff(c, d, a, b, buffer.getUint32(56, true), 17, 0xa679438e);
        b = ff(b, c, d, a, buffer.getUint32(60, true), 22, 0x49b40821);
        a = gg(a, b, c, d, buffer.getUint32(4, true), 5, 0xf61e2562);
        d = gg(d, a, b, c, buffer.getUint32(24, true), 9, 0xc040b340);
        c = gg(c, d, a, b, buffer.getUint32(44, true), 14, 0x265e5a51);
        b = gg(b, c, d, a, buffer.getUint32(0, true), 20, 0xe9b6c7aa);
        a = gg(a, b, c, d, buffer.getUint32(20, true), 5, 0xd62f105d);
        d = gg(d, a, b, c, buffer.getUint32(40, true), 9, 0x02441453);
        c = gg(c, d, a, b, buffer.getUint32(60, true), 14, 0xd8a1e681);
        b = gg(b, c, d, a, buffer.getUint32(16, true), 20, 0xe7d3fbc8);
        a = gg(a, b, c, d, buffer.getUint32(36, true), 5, 0x21e1cde6);
        d = gg(d, a, b, c, buffer.getUint32(56, true), 9, 0xc33707d6);
        c = gg(c, d, a, b, buffer.getUint32(12, true), 14, 0xf4d50d87);
        b = gg(b, c, d, a, buffer.getUint32(32, true), 20, 0x455a14ed);
        a = gg(a, b, c, d, buffer.getUint32(52, true), 5, 0xa9e3e905);
        d = gg(d, a, b, c, buffer.getUint32(8, true), 9, 0xfcefa3f8);
        c = gg(c, d, a, b, buffer.getUint32(28, true), 14, 0x676f02d9);
        b = gg(b, c, d, a, buffer.getUint32(48, true), 20, 0x8d2a4c8a);
        a = hh(a, b, c, d, buffer.getUint32(20, true), 4, 0xfffa3942);
        d = hh(d, a, b, c, buffer.getUint32(32, true), 11, 0x8771f681);
        c = hh(c, d, a, b, buffer.getUint32(44, true), 16, 0x6d9d6122);
        b = hh(b, c, d, a, buffer.getUint32(56, true), 23, 0xfde5380c);
        a = hh(a, b, c, d, buffer.getUint32(4, true), 4, 0xa4beea44);
        d = hh(d, a, b, c, buffer.getUint32(16, true), 11, 0x4bdecfa9);
        c = hh(c, d, a, b, buffer.getUint32(28, true), 16, 0xf6bb4b60);
        b = hh(b, c, d, a, buffer.getUint32(40, true), 23, 0xbebfbc70);
        a = hh(a, b, c, d, buffer.getUint32(52, true), 4, 0x289b7ec6);
        d = hh(d, a, b, c, buffer.getUint32(0, true), 11, 0xeaa127fa);
        c = hh(c, d, a, b, buffer.getUint32(12, true), 16, 0xd4ef3085);
        b = hh(b, c, d, a, buffer.getUint32(24, true), 23, 0x04881d05);
        a = hh(a, b, c, d, buffer.getUint32(36, true), 4, 0xd9d4d039);
        d = hh(d, a, b, c, buffer.getUint32(48, true), 11, 0xe6db99e5);
        c = hh(c, d, a, b, buffer.getUint32(60, true), 16, 0x1fa27cf8);
        b = hh(b, c, d, a, buffer.getUint32(8, true), 23, 0xc4ac5665);
        a = ii(a, b, c, d, buffer.getUint32(0, true), 6, 0xf4292244);
        d = ii(d, a, b, c, buffer.getUint32(28, true), 10, 0x432aff97);
        c = ii(c, d, a, b, buffer.getUint32(56, true), 15, 0xab9423a7);
        b = ii(b, c, d, a, buffer.getUint32(20, true), 21, 0xfc93a039);
        a = ii(a, b, c, d, buffer.getUint32(48, true), 6, 0x655b59c3);
        d = ii(d, a, b, c, buffer.getUint32(12, true), 10, 0x8f0ccc92);
        c = ii(c, d, a, b, buffer.getUint32(40, true), 15, 0xffeff47d);
        b = ii(b, c, d, a, buffer.getUint32(4, true), 21, 0x85845dd1);
        a = ii(a, b, c, d, buffer.getUint32(32, true), 6, 0x6fa87e4f);
        d = ii(d, a, b, c, buffer.getUint32(60, true), 10, 0xfe2ce6e0);
        c = ii(c, d, a, b, buffer.getUint32(24, true), 15, 0xa3014314);
        b = ii(b, c, d, a, buffer.getUint32(52, true), 21, 0x4e0811a1);
        a = ii(a, b, c, d, buffer.getUint32(16, true), 6, 0xf7537e82);
        d = ii(d, a, b, c, buffer.getUint32(44, true), 10, 0xbd3af235);
        c = ii(c, d, a, b, buffer.getUint32(8, true), 15, 0x2ad7d2bb);
        b = ii(b, c, d, a, buffer.getUint32(36, true), 21, 0xeb86d391);
        state[0] = (a + state[0]) & 0xffffffff;
        state[1] = (b + state[1]) & 0xffffffff;
        state[2] = (c + state[2]) & 0xffffffff;
        state[3] = (d + state[3]) & 0xffffffff;
    }
    reset() {
        this.state = Uint32Array.from(_constants__WEBPACK_IMPORTED_MODULE_1__.INIT);
        this.buffer = new DataView(new ArrayBuffer(_constants__WEBPACK_IMPORTED_MODULE_1__.BLOCK_SIZE));
        this.bufferLength = 0;
        this.bytesHashed = 0;
        this.finished = false;
    }
}
function cmn(q, a, b, x, s, t) {
    a = (((a + q) & 0xffffffff) + ((x + t) & 0xffffffff)) & 0xffffffff;
    return (((a << s) | (a >>> (32 - s))) + b) & 0xffffffff;
}
function ff(a, b, c, d, x, s, t) {
    return cmn((b & c) | (~b & d), a, b, x, s, t);
}
function gg(a, b, c, d, x, s, t) {
    return cmn((b & d) | (c & ~d), a, b, x, s, t);
}
function hh(a, b, c, d, x, s, t) {
    return cmn(b ^ c ^ d, a, b, x, s, t);
}
function ii(a, b, c, d, x, s, t) {
    return cmn(c ^ (b | ~d), a, b, x, s, t);
}
function isEmptyData(data) {
    if (typeof data === "string") {
        return data.length === 0;
    }
    return data.byteLength === 0;
}
function convertToBuffer(data) {
    if (typeof data === "string") {
        return (0,_smithy_util_utf8__WEBPACK_IMPORTED_MODULE_0__.fromUtf8)(data);
    }
    if (ArrayBuffer.isView(data)) {
        return new Uint8Array(data.buffer, data.byteOffset, data.byteLength / Uint8Array.BYTES_PER_ELEMENT);
    }
    return new Uint8Array(data);
}


/***/ }),

/***/ "../../node_modules/@smithy/md5-js/node_modules/@smithy/util-utf8/dist-es/fromUtf8.browser.js":
/*!****************************************************************************************************!*\
  !*** ../../node_modules/@smithy/md5-js/node_modules/@smithy/util-utf8/dist-es/fromUtf8.browser.js ***!
  \****************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   fromUtf8: () => (/* binding */ fromUtf8)
/* harmony export */ });
const fromUtf8 = (input) => new TextEncoder().encode(input);


/***/ }),

/***/ "../../node_modules/@smithy/md5-js/node_modules/@smithy/util-utf8/dist-es/index.js":
/*!*****************************************************************************************!*\
  !*** ../../node_modules/@smithy/md5-js/node_modules/@smithy/util-utf8/dist-es/index.js ***!
  \*****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   fromUtf8: () => (/* reexport safe */ _fromUtf8__WEBPACK_IMPORTED_MODULE_0__.fromUtf8),
/* harmony export */   toUint8Array: () => (/* reexport safe */ _toUint8Array__WEBPACK_IMPORTED_MODULE_1__.toUint8Array),
/* harmony export */   toUtf8: () => (/* reexport safe */ _toUtf8__WEBPACK_IMPORTED_MODULE_2__.toUtf8)
/* harmony export */ });
/* harmony import */ var _fromUtf8__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./fromUtf8 */ "../../node_modules/@smithy/md5-js/node_modules/@smithy/util-utf8/dist-es/fromUtf8.browser.js");
/* harmony import */ var _toUint8Array__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./toUint8Array */ "../../node_modules/@smithy/md5-js/node_modules/@smithy/util-utf8/dist-es/toUint8Array.js");
/* harmony import */ var _toUtf8__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./toUtf8 */ "../../node_modules/@smithy/md5-js/node_modules/@smithy/util-utf8/dist-es/toUtf8.browser.js");





/***/ }),

/***/ "../../node_modules/@smithy/md5-js/node_modules/@smithy/util-utf8/dist-es/toUint8Array.js":
/*!************************************************************************************************!*\
  !*** ../../node_modules/@smithy/md5-js/node_modules/@smithy/util-utf8/dist-es/toUint8Array.js ***!
  \************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   toUint8Array: () => (/* binding */ toUint8Array)
/* harmony export */ });
/* harmony import */ var _fromUtf8__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./fromUtf8 */ "../../node_modules/@smithy/md5-js/node_modules/@smithy/util-utf8/dist-es/fromUtf8.browser.js");

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

/***/ "../../node_modules/@smithy/md5-js/node_modules/@smithy/util-utf8/dist-es/toUtf8.browser.js":
/*!**************************************************************************************************!*\
  !*** ../../node_modules/@smithy/md5-js/node_modules/@smithy/util-utf8/dist-es/toUtf8.browser.js ***!
  \**************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
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

/***/ "../../node_modules/crc-32/crc32.js":
/*!******************************************!*\
  !*** ../../node_modules/crc-32/crc32.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, exports) => {

/*! crc32.js (C) 2014-present SheetJS -- http://sheetjs.com */
/* vim: set ts=2: */
/*exported CRC32 */
var CRC32;
(function (factory) {
	/*jshint ignore:start */
	/*eslint-disable */
	if(typeof DO_NOT_EXPORT_CRC === 'undefined') {
		if(true) {
			factory(exports);
		} else {}
	} else {
		factory(CRC32 = {});
	}
	/*eslint-enable */
	/*jshint ignore:end */
}(function(CRC32) {
CRC32.version = '1.2.2';
/*global Int32Array */
function signed_crc_table() {
	var c = 0, table = new Array(256);

	for(var n =0; n != 256; ++n){
		c = n;
		c = ((c&1) ? (-306674912 ^ (c >>> 1)) : (c >>> 1));
		c = ((c&1) ? (-306674912 ^ (c >>> 1)) : (c >>> 1));
		c = ((c&1) ? (-306674912 ^ (c >>> 1)) : (c >>> 1));
		c = ((c&1) ? (-306674912 ^ (c >>> 1)) : (c >>> 1));
		c = ((c&1) ? (-306674912 ^ (c >>> 1)) : (c >>> 1));
		c = ((c&1) ? (-306674912 ^ (c >>> 1)) : (c >>> 1));
		c = ((c&1) ? (-306674912 ^ (c >>> 1)) : (c >>> 1));
		c = ((c&1) ? (-306674912 ^ (c >>> 1)) : (c >>> 1));
		table[n] = c;
	}

	return typeof Int32Array !== 'undefined' ? new Int32Array(table) : table;
}

var T0 = signed_crc_table();
function slice_by_16_tables(T) {
	var c = 0, v = 0, n = 0, table = typeof Int32Array !== 'undefined' ? new Int32Array(4096) : new Array(4096) ;

	for(n = 0; n != 256; ++n) table[n] = T[n];
	for(n = 0; n != 256; ++n) {
		v = T[n];
		for(c = 256 + n; c < 4096; c += 256) v = table[c] = (v >>> 8) ^ T[v & 0xFF];
	}
	var out = [];
	for(n = 1; n != 16; ++n) out[n - 1] = typeof Int32Array !== 'undefined' ? table.subarray(n * 256, n * 256 + 256) : table.slice(n * 256, n * 256 + 256);
	return out;
}
var TT = slice_by_16_tables(T0);
var T1 = TT[0],  T2 = TT[1],  T3 = TT[2],  T4 = TT[3],  T5 = TT[4];
var T6 = TT[5],  T7 = TT[6],  T8 = TT[7],  T9 = TT[8],  Ta = TT[9];
var Tb = TT[10], Tc = TT[11], Td = TT[12], Te = TT[13], Tf = TT[14];
function crc32_bstr(bstr, seed) {
	var C = seed ^ -1;
	for(var i = 0, L = bstr.length; i < L;) C = (C>>>8) ^ T0[(C^bstr.charCodeAt(i++))&0xFF];
	return ~C;
}

function crc32_buf(B, seed) {
	var C = seed ^ -1, L = B.length - 15, i = 0;
	for(; i < L;) C =
		Tf[B[i++] ^ (C & 255)] ^
		Te[B[i++] ^ ((C >> 8) & 255)] ^
		Td[B[i++] ^ ((C >> 16) & 255)] ^
		Tc[B[i++] ^ (C >>> 24)] ^
		Tb[B[i++]] ^ Ta[B[i++]] ^ T9[B[i++]] ^ T8[B[i++]] ^
		T7[B[i++]] ^ T6[B[i++]] ^ T5[B[i++]] ^ T4[B[i++]] ^
		T3[B[i++]] ^ T2[B[i++]] ^ T1[B[i++]] ^ T0[B[i++]];
	L += 15;
	while(i < L) C = (C>>>8) ^ T0[(C^B[i++])&0xFF];
	return ~C;
}

function crc32_str(str, seed) {
	var C = seed ^ -1;
	for(var i = 0, L = str.length, c = 0, d = 0; i < L;) {
		c = str.charCodeAt(i++);
		if(c < 0x80) {
			C = (C>>>8) ^ T0[(C^c)&0xFF];
		} else if(c < 0x800) {
			C = (C>>>8) ^ T0[(C ^ (192|((c>>6)&31)))&0xFF];
			C = (C>>>8) ^ T0[(C ^ (128|(c&63)))&0xFF];
		} else if(c >= 0xD800 && c < 0xE000) {
			c = (c&1023)+64; d = str.charCodeAt(i++)&1023;
			C = (C>>>8) ^ T0[(C ^ (240|((c>>8)&7)))&0xFF];
			C = (C>>>8) ^ T0[(C ^ (128|((c>>2)&63)))&0xFF];
			C = (C>>>8) ^ T0[(C ^ (128|((d>>6)&15)|((c&3)<<4)))&0xFF];
			C = (C>>>8) ^ T0[(C ^ (128|(d&63)))&0xFF];
		} else {
			C = (C>>>8) ^ T0[(C ^ (224|((c>>12)&15)))&0xFF];
			C = (C>>>8) ^ T0[(C ^ (128|((c>>6)&63)))&0xFF];
			C = (C>>>8) ^ T0[(C ^ (128|(c&63)))&0xFF];
		}
	}
	return ~C;
}
CRC32.table = T0;
// $FlowIgnore
CRC32.bstr = crc32_bstr;
// $FlowIgnore
CRC32.buf = crc32_buf;
// $FlowIgnore
CRC32.str = crc32_str;
}));


/***/ }),

/***/ "../core/node_modules/@smithy/util-hex-encoding/dist-es/index.js":
/*!***********************************************************************!*\
  !*** ../core/node_modules/@smithy/util-hex-encoding/dist-es/index.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
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

"use strict";
module.exports = __WEBPACK_EXTERNAL_MODULE__aws_amplify_core__;

/***/ }),

/***/ "?89c0":
/*!************************!*\
  !*** buffer (ignored) ***!
  \************************/
/***/ (() => {

/* (ignored) */

/***/ }),

/***/ "?b879":
/*!*********************************!*\
  !*** fast-xml-parser (ignored) ***!
  \*********************************/
/***/ (() => {

/* (ignored) */

/***/ }),

/***/ "?14f1":
/*!************************!*\
  !*** buffer (ignored) ***!
  \************************/
/***/ (() => {

/* (ignored) */

/***/ }),

/***/ "?64b9":
/*!*********************************!*\
  !*** fast-xml-parser (ignored) ***!
  \*********************************/
/***/ (() => {

/* (ignored) */

/***/ }),

/***/ "?d7cd":
/*!************************!*\
  !*** buffer (ignored) ***!
  \************************/
/***/ (() => {

/* (ignored) */

/***/ }),

/***/ "?f8cc":
/*!*********************************!*\
  !*** fast-xml-parser (ignored) ***!
  \*********************************/
/***/ (() => {

/* (ignored) */

/***/ }),

/***/ "?46b7":
/*!************************!*\
  !*** buffer (ignored) ***!
  \************************/
/***/ (() => {

/* (ignored) */

/***/ }),

/***/ "?2abf":
/*!*********************************!*\
  !*** fast-xml-parser (ignored) ***!
  \*********************************/
/***/ (() => {

/* (ignored) */

/***/ }),

/***/ "?dcad":
/*!************************!*\
  !*** buffer (ignored) ***!
  \************************/
/***/ (() => {

/* (ignored) */

/***/ }),

/***/ "?0f8e":
/*!************************!*\
  !*** buffer (ignored) ***!
  \************************/
/***/ (() => {

/* (ignored) */

/***/ }),

/***/ "?9a72":
/*!*********************************!*\
  !*** fast-xml-parser (ignored) ***!
  \*********************************/
/***/ (() => {

/* (ignored) */

/***/ }),

/***/ "../../node_modules/tslib/tslib.es6.mjs":
/*!**********************************************!*\
  !*** ../../node_modules/tslib/tslib.es6.mjs ***!
  \**********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
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

/***/ "../core/dist/esm/Platform/customUserAgent.mjs":
/*!*****************************************************!*\
  !*** ../core/dist/esm/Platform/customUserAgent.mjs ***!
  \*****************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   version: () => (/* binding */ version)
/* harmony export */ });
// generated by genversion
const version = '6.10.2';


//# sourceMappingURL=version.mjs.map


/***/ }),

/***/ "../core/dist/esm/clients/endpoints/getDnsSuffix.mjs":
/*!***********************************************************!*\
  !*** ../core/dist/esm/clients/endpoints/getDnsSuffix.mjs ***!
  \***********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
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

"use strict";
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

/***/ "../core/dist/esm/clients/internal/composeServiceApi.mjs":
/*!***************************************************************!*\
  !*** ../core/dist/esm/clients/internal/composeServiceApi.mjs ***!
  \***************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
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

/***/ "../core/dist/esm/clients/middleware/signing/signer/signatureV4/presignUrl.mjs":
/*!*************************************************************************************!*\
  !*** ../core/dist/esm/clients/middleware/signing/signer/signatureV4/presignUrl.mjs ***!
  \*************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   presignUrl: () => (/* binding */ presignUrl)
/* harmony export */ });
/* harmony import */ var _utils_amplifyUrl_index_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../../utils/amplifyUrl/index.mjs */ "../core/dist/esm/utils/amplifyUrl/index.mjs");
/* harmony import */ var _constants_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./constants.mjs */ "../core/dist/esm/clients/middleware/signing/signer/signatureV4/constants.mjs");
/* harmony import */ var _utils_getSigningValues_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils/getSigningValues.mjs */ "../core/dist/esm/clients/middleware/signing/signer/signatureV4/utils/getSigningValues.mjs");
/* harmony import */ var _utils_getSignature_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utils/getSignature.mjs */ "../core/dist/esm/clients/middleware/signing/signer/signatureV4/utils/getSignature.mjs");





// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
/**
 * Given a `Presignable` object, returns a Signature Version 4 presigned `URL` object.
 *
 * @param presignable `Presignable` object containing at least a url to be presigned with authentication query params.
 * @param presignUrlOptions `PresignUrlOptions` object containing values used to construct the signature.
 * @returns A `URL` with authentication query params which can grant temporary access to AWS resources.
 */
const presignUrl = ({ body, method = 'GET', url }, { expiration, ...options }) => {
    const signingValues = (0,_utils_getSigningValues_mjs__WEBPACK_IMPORTED_MODULE_0__.getSigningValues)(options);
    const { accessKeyId, credentialScope, longDate, sessionToken } = signingValues;
    // create the request to sign
    const presignedUrl = new _utils_amplifyUrl_index_mjs__WEBPACK_IMPORTED_MODULE_1__.AmplifyUrl(url);
    Object.entries({
        [_constants_mjs__WEBPACK_IMPORTED_MODULE_2__.ALGORITHM_QUERY_PARAM]: _constants_mjs__WEBPACK_IMPORTED_MODULE_2__.SHA256_ALGORITHM_IDENTIFIER,
        [_constants_mjs__WEBPACK_IMPORTED_MODULE_2__.CREDENTIAL_QUERY_PARAM]: `${accessKeyId}/${credentialScope}`,
        [_constants_mjs__WEBPACK_IMPORTED_MODULE_2__.AMZ_DATE_QUERY_PARAM]: longDate,
        [_constants_mjs__WEBPACK_IMPORTED_MODULE_2__.SIGNED_HEADERS_QUERY_PARAM]: _constants_mjs__WEBPACK_IMPORTED_MODULE_2__.HOST_HEADER,
        ...(expiration && { [_constants_mjs__WEBPACK_IMPORTED_MODULE_2__.EXPIRES_QUERY_PARAM]: expiration.toString() }),
        ...(sessionToken && { [_constants_mjs__WEBPACK_IMPORTED_MODULE_2__.TOKEN_QUERY_PARAM]: sessionToken }),
    }).forEach(([key, value]) => {
        presignedUrl.searchParams.append(key, value);
    });
    const requestToSign = {
        body,
        headers: { [_constants_mjs__WEBPACK_IMPORTED_MODULE_2__.HOST_HEADER]: url.host },
        method,
        url: presignedUrl,
    };
    // calculate and add the signature to the url
    const signature = (0,_utils_getSignature_mjs__WEBPACK_IMPORTED_MODULE_3__.getSignature)(requestToSign, signingValues);
    presignedUrl.searchParams.append(_constants_mjs__WEBPACK_IMPORTED_MODULE_2__.SIGNATURE_QUERY_PARAM, signature);
    return presignedUrl;
};


//# sourceMappingURL=presignUrl.mjs.map


/***/ }),

/***/ "../core/dist/esm/clients/middleware/signing/signer/signatureV4/signRequest.mjs":
/*!**************************************************************************************!*\
  !*** ../core/dist/esm/clients/middleware/signing/signer/signatureV4/signRequest.mjs ***!
  \**************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
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

/***/ "../core/dist/esm/clients/serde/responseInfo.mjs":
/*!*******************************************************!*\
  !*** ../core/dist/esm/clients/serde/responseInfo.mjs ***!
  \*******************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
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

"use strict";
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

/***/ "../core/dist/esm/errors/AmplifyError.mjs":
/*!************************************************!*\
  !*** ../core/dist/esm/errors/AmplifyError.mjs ***!
  \************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
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

/***/ "./dist/esm/errors/CanceledError.mjs":
/*!*******************************************!*\
  !*** ./dist/esm/errors/CanceledError.mjs ***!
  \*******************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CanceledError: () => (/* binding */ CanceledError),
/* harmony export */   isCancelError: () => (/* binding */ isCancelError)
/* harmony export */ });
/* harmony import */ var _StorageError_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./StorageError.mjs */ "./dist/esm/errors/StorageError.mjs");


// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
/**
 * Internal-only class for CanceledError thrown by XHR handler or multipart upload when cancellation is invoked
 * without overwriting behavior.
 *
 * @internal
 */
class CanceledError extends _StorageError_mjs__WEBPACK_IMPORTED_MODULE_0__.StorageError {
    constructor(params = {}) {
        super({
            name: 'CanceledError',
            message: 'Upload is canceled by user',
            ...params,
        });
        // TODO: Delete the following 2 lines after we change the build target to >= es2015
        this.constructor = CanceledError;
        Object.setPrototypeOf(this, CanceledError.prototype);
    }
}
/**
 * Check if an error is caused by user calling `cancel()` on a upload/download task. If an overwriting error is
 * supplied to `task.cancel(errorOverwrite)`, this function will return `false`.
 * @param {unknown} error The unknown exception to be checked.
 * @returns - A boolean indicating if the error was from an upload cancellation
 */
const isCancelError = (error) => !!error && error instanceof CanceledError;


//# sourceMappingURL=CanceledError.mjs.map


/***/ }),

/***/ "./dist/esm/errors/IntegrityError.mjs":
/*!********************************************!*\
  !*** ./dist/esm/errors/IntegrityError.mjs ***!
  \********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   IntegrityError: () => (/* binding */ IntegrityError)
/* harmony export */ });
/* harmony import */ var _aws_amplify_core_internals_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @aws-amplify/core/internals/utils */ "../core/dist/esm/types/errors.mjs");
/* harmony import */ var _StorageError_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./StorageError.mjs */ "./dist/esm/errors/StorageError.mjs");



// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
class IntegrityError extends _StorageError_mjs__WEBPACK_IMPORTED_MODULE_0__.StorageError {
    constructor(params = {
        name: _aws_amplify_core_internals_utils__WEBPACK_IMPORTED_MODULE_1__.AmplifyErrorCode.Unknown,
        message: 'An unknown error has occurred.',
        recoverySuggestion: 'This may be a bug. Please reach out to library authors.',
    }) {
        super(params);
        // TODO: Delete the following 2 lines after we change the build target to >= es2015
        this.constructor = IntegrityError;
        Object.setPrototypeOf(this, IntegrityError.prototype);
    }
}


//# sourceMappingURL=IntegrityError.mjs.map


/***/ }),

/***/ "./dist/esm/errors/StorageError.mjs":
/*!******************************************!*\
  !*** ./dist/esm/errors/StorageError.mjs ***!
  \******************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   StorageError: () => (/* binding */ StorageError)
/* harmony export */ });
/* harmony import */ var _aws_amplify_core_internals_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @aws-amplify/core/internals/utils */ "../core/dist/esm/errors/AmplifyError.mjs");


// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
class StorageError extends _aws_amplify_core_internals_utils__WEBPACK_IMPORTED_MODULE_0__.AmplifyError {
    constructor(params) {
        super(params);
        // TODO: Delete the following 2 lines after we change the build target to >= es2015
        this.constructor = StorageError;
        Object.setPrototypeOf(this, StorageError.prototype);
    }
}


//# sourceMappingURL=StorageError.mjs.map


/***/ }),

/***/ "./dist/esm/errors/constants.mjs":
/*!***************************************!*\
  !*** ./dist/esm/errors/constants.mjs ***!
  \***************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   INVALID_STORAGE_INPUT: () => (/* binding */ INVALID_STORAGE_INPUT)
/* harmony export */ });
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
const INVALID_STORAGE_INPUT = 'InvalidStorageInput';


//# sourceMappingURL=constants.mjs.map


/***/ }),

/***/ "./dist/esm/errors/types/validation.mjs":
/*!**********************************************!*\
  !*** ./dist/esm/errors/types/validation.mjs ***!
  \**********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   StorageValidationErrorCode: () => (/* binding */ StorageValidationErrorCode),
/* harmony export */   validationErrorMap: () => (/* binding */ validationErrorMap)
/* harmony export */ });
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
var StorageValidationErrorCode;
(function (StorageValidationErrorCode) {
    StorageValidationErrorCode["NoCredentials"] = "NoCredentials";
    StorageValidationErrorCode["NoIdentityId"] = "NoIdentityId";
    StorageValidationErrorCode["NoKey"] = "NoKey";
    StorageValidationErrorCode["NoSourceKey"] = "NoSourceKey";
    StorageValidationErrorCode["NoDestinationKey"] = "NoDestinationKey";
    StorageValidationErrorCode["NoSourcePath"] = "NoSourcePath";
    StorageValidationErrorCode["NoDestinationPath"] = "NoDestinationPath";
    StorageValidationErrorCode["NoBucket"] = "NoBucket";
    StorageValidationErrorCode["NoRegion"] = "NoRegion";
    StorageValidationErrorCode["InvalidStorageBucket"] = "InvalidStorageBucket";
    StorageValidationErrorCode["InvalidCopyOperationStorageBucket"] = "InvalidCopyOperationStorageBucket";
    StorageValidationErrorCode["InvalidStorageOperationPrefixInput"] = "InvalidStorageOperationPrefixInput";
    StorageValidationErrorCode["InvalidStorageOperationInput"] = "InvalidStorageOperationInput";
    StorageValidationErrorCode["InvalidAWSAccountID"] = "InvalidAWSAccountID";
    StorageValidationErrorCode["InvalidStoragePathInput"] = "InvalidStoragePathInput";
    StorageValidationErrorCode["InvalidUploadSource"] = "InvalidUploadSource";
    StorageValidationErrorCode["ObjectIsTooLarge"] = "ObjectIsTooLarge";
    StorageValidationErrorCode["UrlExpirationMaxLimitExceed"] = "UrlExpirationMaxLimitExceed";
    StorageValidationErrorCode["InvalidLocationCredentialsCacheSize"] = "InvalidLocationCredentialsCacheSize";
    StorageValidationErrorCode["LocationCredentialsStoreDestroyed"] = "LocationCredentialsStoreDestroyed";
    StorageValidationErrorCode["InvalidS3Uri"] = "InvalidS3Uri";
    StorageValidationErrorCode["InvalidCustomEndpoint"] = "InvalidCustomEndpoint";
    StorageValidationErrorCode["ForcePathStyleEndpointNotSupported"] = "ForcePathStyleEndpointNotSupported";
    StorageValidationErrorCode["DnsIncompatibleBucketName"] = "DnsIncompatibleBucketName";
})(StorageValidationErrorCode || (StorageValidationErrorCode = {}));
const validationErrorMap = {
    [StorageValidationErrorCode.NoCredentials]: {
        message: 'Credentials should not be empty.',
    },
    [StorageValidationErrorCode.NoIdentityId]: {
        message: 'Missing identity ID when accessing objects in protected or private access level.',
    },
    [StorageValidationErrorCode.NoKey]: {
        message: 'Missing key in api call.',
    },
    [StorageValidationErrorCode.NoSourceKey]: {
        message: 'Missing source key in copy api call.',
    },
    [StorageValidationErrorCode.NoDestinationKey]: {
        message: 'Missing destination key in copy api call.',
    },
    [StorageValidationErrorCode.NoSourcePath]: {
        message: 'Missing source path in copy api call.',
    },
    [StorageValidationErrorCode.NoDestinationPath]: {
        message: 'Missing destination path in copy api call.',
    },
    [StorageValidationErrorCode.NoBucket]: {
        message: 'Missing bucket name while accessing object.',
    },
    [StorageValidationErrorCode.NoRegion]: {
        message: 'Missing region while accessing object.',
    },
    [StorageValidationErrorCode.UrlExpirationMaxLimitExceed]: {
        message: 'Url Expiration can not be greater than 7 Days.',
    },
    [StorageValidationErrorCode.ObjectIsTooLarge]: {
        message: 'Object size cannot not be greater than 5TB.',
    },
    [StorageValidationErrorCode.InvalidUploadSource]: {
        message: 'Upload source type can only be a `Blob`, `File`, `ArrayBuffer`, or `string`.',
    },
    [StorageValidationErrorCode.InvalidStorageOperationInput]: {
        message: 'Path or key parameter must be specified in the input. Both can not be specified at the same time.',
    },
    [StorageValidationErrorCode.InvalidAWSAccountID]: {
        message: 'Invalid AWS account ID was provided.',
    },
    [StorageValidationErrorCode.InvalidStorageOperationPrefixInput]: {
        message: 'Both path and prefix can not be specified at the same time.',
    },
    [StorageValidationErrorCode.InvalidStoragePathInput]: {
        message: 'Input `path` does not allow a leading slash (/).',
    },
    [StorageValidationErrorCode.InvalidLocationCredentialsCacheSize]: {
        message: 'locationCredentialsCacheSize must be a positive integer.',
    },
    [StorageValidationErrorCode.LocationCredentialsStoreDestroyed]: {
        message: `Location-specific credentials store has been destroyed.`,
    },
    [StorageValidationErrorCode.InvalidS3Uri]: {
        message: 'Invalid S3 URI.',
    },
    [StorageValidationErrorCode.InvalidStorageBucket]: {
        message: 'Unable to lookup bucket from provided name in Amplify configuration.',
    },
    [StorageValidationErrorCode.InvalidCopyOperationStorageBucket]: {
        message: 'Missing bucket option in either source or destination.',
    },
    [StorageValidationErrorCode.InvalidCustomEndpoint]: {
        message: 'Invalid S3 custom endpoint.',
    },
    [StorageValidationErrorCode.ForcePathStyleEndpointNotSupported]: {
        message: 'Path style URLs are not supported with S3 Transfer Acceleration.',
    },
    [StorageValidationErrorCode.DnsIncompatibleBucketName]: {
        message: `The bucket name isn't DNS compatible.`,
    },
};


//# sourceMappingURL=validation.mjs.map


/***/ }),

/***/ "./dist/esm/errors/utils/assertValidationError.mjs":
/*!*********************************************************!*\
  !*** ./dist/esm/errors/utils/assertValidationError.mjs ***!
  \*********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   assertValidationError: () => (/* binding */ assertValidationError)
/* harmony export */ });
/* harmony import */ var _types_validation_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../types/validation.mjs */ "./dist/esm/errors/types/validation.mjs");
/* harmony import */ var _StorageError_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../StorageError.mjs */ "./dist/esm/errors/StorageError.mjs");



// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
function assertValidationError(assertion, name) {
    const { message, recoverySuggestion } = _types_validation_mjs__WEBPACK_IMPORTED_MODULE_0__.validationErrorMap[name];
    if (!assertion) {
        throw new _StorageError_mjs__WEBPACK_IMPORTED_MODULE_1__.StorageError({ name, message, recoverySuggestion });
    }
}


//# sourceMappingURL=assertValidationError.mjs.map


/***/ }),

/***/ "./dist/esm/providers/s3/apis/copy.mjs":
/*!*********************************************!*\
  !*** ./dist/esm/providers/s3/apis/copy.mjs ***!
  \*********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   copy: () => (/* binding */ copy)
/* harmony export */ });
/* harmony import */ var _aws_amplify_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @aws-amplify/core */ "@aws-amplify/core");
/* harmony import */ var _internal_copy_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/copy.mjs */ "./dist/esm/providers/s3/apis/internal/copy.mjs");



// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
function copy(input) {
    return (0,_internal_copy_mjs__WEBPACK_IMPORTED_MODULE_1__.copy)(_aws_amplify_core__WEBPACK_IMPORTED_MODULE_0__.Amplify, input);
}


//# sourceMappingURL=copy.mjs.map


/***/ }),

/***/ "./dist/esm/providers/s3/apis/downloadData.mjs":
/*!*****************************************************!*\
  !*** ./dist/esm/providers/s3/apis/downloadData.mjs ***!
  \*****************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   downloadData: () => (/* binding */ downloadData)
/* harmony export */ });
/* harmony import */ var _internal_downloadData_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/downloadData.mjs */ "./dist/esm/providers/s3/apis/internal/downloadData.mjs");


// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
function downloadData(input) {
    return (0,_internal_downloadData_mjs__WEBPACK_IMPORTED_MODULE_0__.downloadData)(input);
}


//# sourceMappingURL=downloadData.mjs.map


/***/ }),

/***/ "./dist/esm/providers/s3/apis/getProperties.mjs":
/*!******************************************************!*\
  !*** ./dist/esm/providers/s3/apis/getProperties.mjs ***!
  \******************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getProperties: () => (/* binding */ getProperties)
/* harmony export */ });
/* harmony import */ var _aws_amplify_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @aws-amplify/core */ "@aws-amplify/core");
/* harmony import */ var _internal_getProperties_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/getProperties.mjs */ "./dist/esm/providers/s3/apis/internal/getProperties.mjs");



// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
function getProperties(input) {
    return (0,_internal_getProperties_mjs__WEBPACK_IMPORTED_MODULE_1__.getProperties)(_aws_amplify_core__WEBPACK_IMPORTED_MODULE_0__.Amplify, input);
}


//# sourceMappingURL=getProperties.mjs.map


/***/ }),

/***/ "./dist/esm/providers/s3/apis/getUrl.mjs":
/*!***********************************************!*\
  !*** ./dist/esm/providers/s3/apis/getUrl.mjs ***!
  \***********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getUrl: () => (/* binding */ getUrl)
/* harmony export */ });
/* harmony import */ var _aws_amplify_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @aws-amplify/core */ "@aws-amplify/core");
/* harmony import */ var _internal_getUrl_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/getUrl.mjs */ "./dist/esm/providers/s3/apis/internal/getUrl.mjs");



// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
function getUrl(input) {
    return (0,_internal_getUrl_mjs__WEBPACK_IMPORTED_MODULE_1__.getUrl)(_aws_amplify_core__WEBPACK_IMPORTED_MODULE_0__.Amplify, input);
}


//# sourceMappingURL=getUrl.mjs.map


/***/ }),

/***/ "./dist/esm/providers/s3/apis/internal/copy.mjs":
/*!******************************************************!*\
  !*** ./dist/esm/providers/s3/apis/internal/copy.mjs ***!
  \******************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   copy: () => (/* binding */ copy),
/* harmony export */   copyWithKey: () => (/* binding */ copyWithKey)
/* harmony export */ });
/* harmony import */ var _aws_amplify_core_internals_utils__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @aws-amplify/core/internals/utils */ "../core/dist/esm/Platform/types.mjs");
/* harmony import */ var _smithy_md5_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @smithy/md5-js */ "../../node_modules/@smithy/md5-js/dist-es/index.js");
/* harmony import */ var fast_xml_parser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! fast-xml-parser */ "?f8cc");
/* harmony import */ var buffer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! buffer */ "?d7cd");
/* harmony import */ var _utils_resolveS3ConfigAndInput_mjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../utils/resolveS3ConfigAndInput.mjs */ "./dist/esm/providers/s3/utils/resolveS3ConfigAndInput.mjs");
/* harmony import */ var _errors_utils_assertValidationError_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../errors/utils/assertValidationError.mjs */ "./dist/esm/errors/utils/assertValidationError.mjs");
/* harmony import */ var _errors_types_validation_mjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../errors/types/validation.mjs */ "./dist/esm/errors/types/validation.mjs");
/* harmony import */ var _utils_logger_mjs__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../../utils/logger.mjs */ "./dist/esm/utils/logger.mjs");
/* harmony import */ var _utils_validateBucketOwnerID_mjs__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../utils/validateBucketOwnerID.mjs */ "./dist/esm/providers/s3/utils/validateBucketOwnerID.mjs");
/* harmony import */ var _utils_validateStorageOperationInput_mjs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../utils/validateStorageOperationInput.mjs */ "./dist/esm/providers/s3/utils/validateStorageOperationInput.mjs");
/* harmony import */ var _utils_isInputWithPath_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../utils/isInputWithPath.mjs */ "./dist/esm/providers/s3/utils/isInputWithPath.mjs");
/* harmony import */ var _utils_client_s3data_copyObject_mjs__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../utils/client/s3data/copyObject.mjs */ "./dist/esm/providers/s3/utils/client/s3data/copyObject.mjs");
/* harmony import */ var _utils_userAgent_mjs__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../utils/userAgent.mjs */ "./dist/esm/providers/s3/utils/userAgent.mjs");




























// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
const isCopyInputWithPath = (input) => (0,_utils_isInputWithPath_mjs__WEBPACK_IMPORTED_MODULE_3__.isInputWithPath)(input.source);
const storageBucketAssertion = (sourceBucket, destBucket) => {
    /**  For multi-bucket, both source and destination bucket needs to be passed in
     *   or both can be undefined and we fallback to singleton's default value
     */
    (0,_errors_utils_assertValidationError_mjs__WEBPACK_IMPORTED_MODULE_4__.assertValidationError)(
    // Both src & dest bucket option is present is acceptable
    (sourceBucket !== undefined && destBucket !== undefined) ||
        // or both are undefined is also acceptable
        (!destBucket && !sourceBucket), _errors_types_validation_mjs__WEBPACK_IMPORTED_MODULE_5__.StorageValidationErrorCode.InvalidCopyOperationStorageBucket);
};
const copy = async (amplify, input) => {
    return isCopyInputWithPath(input)
        ? copyWithPath(amplify, input)
        : copyWithKey(amplify, input);
};
const copyWithPath = async (amplify, input) => {
    const { source, destination } = input;
    storageBucketAssertion(source.bucket, destination.bucket);
    const { bucket: sourceBucket } = await (0,_utils_resolveS3ConfigAndInput_mjs__WEBPACK_IMPORTED_MODULE_6__.resolveS3ConfigAndInput)(amplify, {
        path: input.source.path,
        options: {
            locationCredentialsProvider: input.options?.locationCredentialsProvider,
            ...input.source,
        },
    });
    // The bucket, region, credentials of s3 client are resolved from destination.
    // Whereas the source bucket and path are a input parameter of S3 copy operation.
    const { s3Config, bucket: destBucket, identityId, } = await (0,_utils_resolveS3ConfigAndInput_mjs__WEBPACK_IMPORTED_MODULE_6__.resolveS3ConfigAndInput)(amplify, {
        path: input.destination.path,
        options: {
            locationCredentialsProvider: input.options?.locationCredentialsProvider,
            customEndpoint: input.options?.customEndpoint,
            ...input.destination,
        },
    }); // resolveS3ConfigAndInput does not make extra API calls or storage access if called repeatedly.
    (0,_errors_utils_assertValidationError_mjs__WEBPACK_IMPORTED_MODULE_4__.assertValidationError)(!!source.path, _errors_types_validation_mjs__WEBPACK_IMPORTED_MODULE_5__.StorageValidationErrorCode.NoSourcePath);
    (0,_errors_utils_assertValidationError_mjs__WEBPACK_IMPORTED_MODULE_4__.assertValidationError)(!!destination.path, _errors_types_validation_mjs__WEBPACK_IMPORTED_MODULE_5__.StorageValidationErrorCode.NoDestinationPath);
    const { objectKey: sourcePath } = (0,_utils_validateStorageOperationInput_mjs__WEBPACK_IMPORTED_MODULE_7__.validateStorageOperationInput)(source, identityId);
    const { objectKey: destinationPath } = (0,_utils_validateStorageOperationInput_mjs__WEBPACK_IMPORTED_MODULE_7__.validateStorageOperationInput)(destination, identityId);
    (0,_utils_validateBucketOwnerID_mjs__WEBPACK_IMPORTED_MODULE_8__.validateBucketOwnerID)(source.expectedBucketOwner);
    (0,_utils_validateBucketOwnerID_mjs__WEBPACK_IMPORTED_MODULE_8__.validateBucketOwnerID)(destination.expectedBucketOwner);
    const finalCopySource = `${sourceBucket}/${sourcePath}`;
    const finalCopyDestination = destinationPath;
    _utils_logger_mjs__WEBPACK_IMPORTED_MODULE_9__.logger.debug(`copying "${finalCopySource}" to "${finalCopyDestination}".`);
    await serviceCopy({
        source: finalCopySource,
        destination: finalCopyDestination,
        bucket: destBucket,
        s3Config,
        notModifiedSince: input.source.notModifiedSince,
        eTag: input.source.eTag,
        expectedSourceBucketOwner: input.source?.expectedBucketOwner,
        expectedBucketOwner: input.destination?.expectedBucketOwner,
    });
    return { path: finalCopyDestination };
};
/** @deprecated Use {@link copyWithPath} instead. */
const copyWithKey = async (amplify, input) => {
    const { source, destination } = input;
    storageBucketAssertion(source.bucket, destination.bucket);
    (0,_errors_utils_assertValidationError_mjs__WEBPACK_IMPORTED_MODULE_4__.assertValidationError)(!!source.key, _errors_types_validation_mjs__WEBPACK_IMPORTED_MODULE_5__.StorageValidationErrorCode.NoSourceKey);
    (0,_errors_utils_assertValidationError_mjs__WEBPACK_IMPORTED_MODULE_4__.assertValidationError)(!!destination.key, _errors_types_validation_mjs__WEBPACK_IMPORTED_MODULE_5__.StorageValidationErrorCode.NoDestinationKey);
    (0,_utils_validateBucketOwnerID_mjs__WEBPACK_IMPORTED_MODULE_8__.validateBucketOwnerID)(source.expectedBucketOwner);
    (0,_utils_validateBucketOwnerID_mjs__WEBPACK_IMPORTED_MODULE_8__.validateBucketOwnerID)(destination.expectedBucketOwner);
    const { bucket: sourceBucket, keyPrefix: sourceKeyPrefix } = await (0,_utils_resolveS3ConfigAndInput_mjs__WEBPACK_IMPORTED_MODULE_6__.resolveS3ConfigAndInput)(amplify, {
        ...input,
        options: {
            // @ts-expect-error: 'options' does not exist on type 'CopyInput'. In case of JS users set the location
            // credentials provider option, resolveS3ConfigAndInput will throw validation error.
            locationCredentialsProvider: input.options?.locationCredentialsProvider,
            ...input.source,
        },
    });
    // The bucket, region, credentials of s3 client are resolved from destination.
    // Whereas the source bucket and path are a input parameter of S3 copy operation.
    const { s3Config, bucket: destBucket, keyPrefix: destinationKeyPrefix, } = await (0,_utils_resolveS3ConfigAndInput_mjs__WEBPACK_IMPORTED_MODULE_6__.resolveS3ConfigAndInput)(amplify, {
        ...input,
        options: {
            // @ts-expect-error: 'options' does not exist on type 'CopyInput'. In case of JS users set the location
            // credentials provider option, resolveS3ConfigAndInput will throw validation error.
            locationCredentialsProvider: input.options?.locationCredentialsProvider,
            ...input.destination,
        },
    }); // resolveS3ConfigAndInput does not make extra API calls or storage access if called repeatedly.
    // TODO(ashwinkumar6) V6-logger: warn `You may copy files from another user if the source level is "protected", currently it's ${srcLevel}`
    const finalCopySource = `${sourceBucket}/${sourceKeyPrefix}${source.key}`;
    const finalCopyDestination = `${destinationKeyPrefix}${destination.key}`;
    _utils_logger_mjs__WEBPACK_IMPORTED_MODULE_9__.logger.debug(`copying "${finalCopySource}" to "${finalCopyDestination}".`);
    await serviceCopy({
        source: finalCopySource,
        destination: finalCopyDestination,
        bucket: destBucket,
        s3Config,
        notModifiedSince: input.source.notModifiedSince,
        eTag: input.source.eTag,
        expectedSourceBucketOwner: input.source?.expectedBucketOwner,
        expectedBucketOwner: input.destination?.expectedBucketOwner,
    });
    return {
        key: destination.key,
    };
};
const serviceCopy = async ({ source, destination, bucket, s3Config, notModifiedSince, eTag, expectedSourceBucketOwner, expectedBucketOwner, }) => {
    await (0,_utils_client_s3data_copyObject_mjs__WEBPACK_IMPORTED_MODULE_10__.copyObject)({
        ...s3Config,
        userAgentValue: (0,_utils_userAgent_mjs__WEBPACK_IMPORTED_MODULE_11__.getStorageUserAgentValue)(_aws_amplify_core_internals_utils__WEBPACK_IMPORTED_MODULE_12__.StorageAction.Copy),
    }, {
        Bucket: bucket,
        CopySource: source,
        Key: destination,
        MetadataDirective: 'COPY',
        CopySourceIfMatch: eTag,
        CopySourceIfUnmodifiedSince: notModifiedSince,
        ExpectedSourceBucketOwner: expectedSourceBucketOwner,
        ExpectedBucketOwner: expectedBucketOwner,
    });
};


//# sourceMappingURL=copy.mjs.map


/***/ }),

/***/ "./dist/esm/providers/s3/apis/internal/downloadData.mjs":
/*!**************************************************************!*\
  !*** ./dist/esm/providers/s3/apis/internal/downloadData.mjs ***!
  \**************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   downloadData: () => (/* binding */ downloadData)
/* harmony export */ });
/* harmony import */ var _aws_amplify_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @aws-amplify/core */ "@aws-amplify/core");
/* harmony import */ var _aws_amplify_core_internals_utils__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @aws-amplify/core/internals/utils */ "../core/dist/esm/Platform/types.mjs");
/* harmony import */ var _utils_resolveS3ConfigAndInput_mjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../utils/resolveS3ConfigAndInput.mjs */ "./dist/esm/providers/s3/utils/resolveS3ConfigAndInput.mjs");
/* harmony import */ var _smithy_md5_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @smithy/md5-js */ "../../node_modules/@smithy/md5-js/dist-es/index.js");
/* harmony import */ var fast_xml_parser__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! fast-xml-parser */ "?f8cc");
/* harmony import */ var buffer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! buffer */ "?d7cd");
/* harmony import */ var _utils_transferTask_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../utils/transferTask.mjs */ "./dist/esm/providers/s3/utils/transferTask.mjs");
/* harmony import */ var _utils_validateBucketOwnerID_mjs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../utils/validateBucketOwnerID.mjs */ "./dist/esm/providers/s3/utils/validateBucketOwnerID.mjs");
/* harmony import */ var _utils_validateStorageOperationInput_mjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../utils/validateStorageOperationInput.mjs */ "./dist/esm/providers/s3/utils/validateStorageOperationInput.mjs");
/* harmony import */ var _utils_constants_mjs__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../utils/constants.mjs */ "./dist/esm/providers/s3/utils/constants.mjs");
/* harmony import */ var _utils_client_s3data_getObject_mjs__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../utils/client/s3data/getObject.mjs */ "./dist/esm/providers/s3/utils/client/s3data/getObject.mjs");
/* harmony import */ var _utils_userAgent_mjs__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../utils/userAgent.mjs */ "./dist/esm/providers/s3/utils/userAgent.mjs");
/* harmony import */ var _utils_logger_mjs__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../../utils/logger.mjs */ "./dist/esm/utils/logger.mjs");





























// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
const downloadData = (input) => {
    const abortController = new AbortController();
    const downloadTask = (0,_utils_transferTask_mjs__WEBPACK_IMPORTED_MODULE_4__.createDownloadTask)({
        job: downloadDataJob(input, abortController.signal),
        onCancel: (message) => {
            abortController.abort(message);
        },
    });
    return downloadTask;
};
const downloadDataJob = (downloadDataInput, abortSignal) => async () => {
    const { options: downloadDataOptions } = downloadDataInput;
    const { bucket, keyPrefix, s3Config, identityId } = await (0,_utils_resolveS3ConfigAndInput_mjs__WEBPACK_IMPORTED_MODULE_5__.resolveS3ConfigAndInput)(_aws_amplify_core__WEBPACK_IMPORTED_MODULE_0__.Amplify, downloadDataInput);
    const { inputType, objectKey } = (0,_utils_validateStorageOperationInput_mjs__WEBPACK_IMPORTED_MODULE_6__.validateStorageOperationInput)(downloadDataInput, identityId);
    (0,_utils_validateBucketOwnerID_mjs__WEBPACK_IMPORTED_MODULE_7__.validateBucketOwnerID)(downloadDataOptions?.expectedBucketOwner);
    const finalKey = inputType === _utils_constants_mjs__WEBPACK_IMPORTED_MODULE_8__.STORAGE_INPUT_KEY ? keyPrefix + objectKey : objectKey;
    _utils_logger_mjs__WEBPACK_IMPORTED_MODULE_9__.logger.debug(`download ${objectKey} from ${finalKey}.`);
    const { Body: body, LastModified: lastModified, ContentLength: size, ETag: eTag, Metadata: metadata, VersionId: versionId, ContentType: contentType, } = await (0,_utils_client_s3data_getObject_mjs__WEBPACK_IMPORTED_MODULE_10__.getObject)({
        ...s3Config,
        abortSignal,
        onDownloadProgress: downloadDataOptions?.onProgress,
        userAgentValue: (0,_utils_userAgent_mjs__WEBPACK_IMPORTED_MODULE_11__.getStorageUserAgentValue)(_aws_amplify_core_internals_utils__WEBPACK_IMPORTED_MODULE_12__.StorageAction.DownloadData),
    }, {
        Bucket: bucket,
        Key: finalKey,
        ...(downloadDataOptions?.bytesRange && {
            Range: `bytes=${downloadDataOptions.bytesRange.start}-${downloadDataOptions.bytesRange.end}`,
        }),
        ExpectedBucketOwner: downloadDataOptions?.expectedBucketOwner,
    });
    const result = {
        body,
        lastModified,
        size,
        contentType,
        eTag,
        metadata,
        versionId,
    };
    return inputType === _utils_constants_mjs__WEBPACK_IMPORTED_MODULE_8__.STORAGE_INPUT_KEY
        ? { key: objectKey, ...result }
        : { path: objectKey, ...result };
};


//# sourceMappingURL=downloadData.mjs.map


/***/ }),

/***/ "./dist/esm/providers/s3/apis/internal/getProperties.mjs":
/*!***************************************************************!*\
  !*** ./dist/esm/providers/s3/apis/internal/getProperties.mjs ***!
  \***************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getProperties: () => (/* binding */ getProperties)
/* harmony export */ });
/* harmony import */ var _aws_amplify_core_internals_utils__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @aws-amplify/core/internals/utils */ "../core/dist/esm/Platform/types.mjs");
/* harmony import */ var _smithy_md5_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @smithy/md5-js */ "../../node_modules/@smithy/md5-js/dist-es/index.js");
/* harmony import */ var fast_xml_parser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! fast-xml-parser */ "?f8cc");
/* harmony import */ var buffer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! buffer */ "?d7cd");
/* harmony import */ var _utils_resolveS3ConfigAndInput_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../utils/resolveS3ConfigAndInput.mjs */ "./dist/esm/providers/s3/utils/resolveS3ConfigAndInput.mjs");
/* harmony import */ var _utils_logger_mjs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../../utils/logger.mjs */ "./dist/esm/utils/logger.mjs");
/* harmony import */ var _utils_validateBucketOwnerID_mjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../utils/validateBucketOwnerID.mjs */ "./dist/esm/providers/s3/utils/validateBucketOwnerID.mjs");
/* harmony import */ var _utils_validateStorageOperationInput_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../utils/validateStorageOperationInput.mjs */ "./dist/esm/providers/s3/utils/validateStorageOperationInput.mjs");
/* harmony import */ var _utils_constants_mjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../utils/constants.mjs */ "./dist/esm/providers/s3/utils/constants.mjs");
/* harmony import */ var _utils_client_s3data_headObject_mjs__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../utils/client/s3data/headObject.mjs */ "./dist/esm/providers/s3/utils/client/s3data/headObject.mjs");
/* harmony import */ var _utils_userAgent_mjs__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../utils/userAgent.mjs */ "./dist/esm/providers/s3/utils/userAgent.mjs");



























// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
const getProperties = async (amplify, input, action) => {
    const { s3Config, bucket, keyPrefix, identityId } = await (0,_utils_resolveS3ConfigAndInput_mjs__WEBPACK_IMPORTED_MODULE_3__.resolveS3ConfigAndInput)(amplify, input);
    const { inputType, objectKey } = (0,_utils_validateStorageOperationInput_mjs__WEBPACK_IMPORTED_MODULE_4__.validateStorageOperationInput)(input, identityId);
    (0,_utils_validateBucketOwnerID_mjs__WEBPACK_IMPORTED_MODULE_5__.validateBucketOwnerID)(input.options?.expectedBucketOwner);
    const finalKey = inputType === _utils_constants_mjs__WEBPACK_IMPORTED_MODULE_6__.STORAGE_INPUT_KEY ? keyPrefix + objectKey : objectKey;
    _utils_logger_mjs__WEBPACK_IMPORTED_MODULE_7__.logger.debug(`get properties of ${objectKey} from ${finalKey}`);
    const response = await (0,_utils_client_s3data_headObject_mjs__WEBPACK_IMPORTED_MODULE_8__.headObject)({
        ...s3Config,
        userAgentValue: (0,_utils_userAgent_mjs__WEBPACK_IMPORTED_MODULE_9__.getStorageUserAgentValue)(action ?? _aws_amplify_core_internals_utils__WEBPACK_IMPORTED_MODULE_10__.StorageAction.GetProperties),
    }, {
        Bucket: bucket,
        Key: finalKey,
        ExpectedBucketOwner: input.options?.expectedBucketOwner,
    });
    const result = {
        contentType: response.ContentType,
        size: response.ContentLength,
        eTag: response.ETag,
        lastModified: response.LastModified,
        metadata: response.Metadata,
        versionId: response.VersionId,
    };
    return inputType === _utils_constants_mjs__WEBPACK_IMPORTED_MODULE_6__.STORAGE_INPUT_KEY
        ? { key: objectKey, ...result }
        : { path: objectKey, ...result };
};


//# sourceMappingURL=getProperties.mjs.map


/***/ }),

/***/ "./dist/esm/providers/s3/apis/internal/getUrl.mjs":
/*!********************************************************!*\
  !*** ./dist/esm/providers/s3/apis/internal/getUrl.mjs ***!
  \********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getUrl: () => (/* binding */ getUrl)
/* harmony export */ });
/* harmony import */ var _aws_amplify_core_internals_utils__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @aws-amplify/core/internals/utils */ "../core/dist/esm/Platform/types.mjs");
/* harmony import */ var _errors_types_validation_mjs__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../../errors/types/validation.mjs */ "./dist/esm/errors/types/validation.mjs");
/* harmony import */ var _utils_client_s3data_getObject_mjs__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../utils/client/s3data/getObject.mjs */ "./dist/esm/providers/s3/utils/client/s3data/getObject.mjs");
/* harmony import */ var _smithy_md5_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @smithy/md5-js */ "../../node_modules/@smithy/md5-js/dist-es/index.js");
/* harmony import */ var fast_xml_parser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! fast-xml-parser */ "?f8cc");
/* harmony import */ var buffer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! buffer */ "?d7cd");
/* harmony import */ var _utils_resolveS3ConfigAndInput_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../utils/resolveS3ConfigAndInput.mjs */ "./dist/esm/providers/s3/utils/resolveS3ConfigAndInput.mjs");
/* harmony import */ var _errors_utils_assertValidationError_mjs__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../../errors/utils/assertValidationError.mjs */ "./dist/esm/errors/utils/assertValidationError.mjs");
/* harmony import */ var _utils_validateBucketOwnerID_mjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../utils/validateBucketOwnerID.mjs */ "./dist/esm/providers/s3/utils/validateBucketOwnerID.mjs");
/* harmony import */ var _utils_validateStorageOperationInput_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../utils/validateStorageOperationInput.mjs */ "./dist/esm/providers/s3/utils/validateStorageOperationInput.mjs");
/* harmony import */ var _utils_constants_mjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../utils/constants.mjs */ "./dist/esm/providers/s3/utils/constants.mjs");
/* harmony import */ var _utils_constructContentDisposition_mjs__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../utils/constructContentDisposition.mjs */ "./dist/esm/providers/s3/utils/constructContentDisposition.mjs");
/* harmony import */ var _getProperties_mjs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./getProperties.mjs */ "./dist/esm/providers/s3/apis/internal/getProperties.mjs");





























// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
const getUrl = async (amplify, input) => {
    const { options: getUrlOptions } = input;
    const { s3Config, keyPrefix, bucket, identityId } = await (0,_utils_resolveS3ConfigAndInput_mjs__WEBPACK_IMPORTED_MODULE_3__.resolveS3ConfigAndInput)(amplify, input);
    const { inputType, objectKey } = (0,_utils_validateStorageOperationInput_mjs__WEBPACK_IMPORTED_MODULE_4__.validateStorageOperationInput)(input, identityId);
    (0,_utils_validateBucketOwnerID_mjs__WEBPACK_IMPORTED_MODULE_5__.validateBucketOwnerID)(getUrlOptions?.expectedBucketOwner);
    const finalKey = inputType === _utils_constants_mjs__WEBPACK_IMPORTED_MODULE_6__.STORAGE_INPUT_KEY ? keyPrefix + objectKey : objectKey;
    if (getUrlOptions?.validateObjectExistence) {
        await (0,_getProperties_mjs__WEBPACK_IMPORTED_MODULE_7__.getProperties)(amplify, input, _aws_amplify_core_internals_utils__WEBPACK_IMPORTED_MODULE_8__.StorageAction.GetUrl);
    }
    let urlExpirationInSec = getUrlOptions?.expiresIn ?? _utils_constants_mjs__WEBPACK_IMPORTED_MODULE_6__.DEFAULT_PRESIGN_EXPIRATION;
    const resolvedCredential = typeof s3Config.credentials === 'function'
        ? await s3Config.credentials()
        : s3Config.credentials;
    const awsCredExpiration = resolvedCredential.expiration;
    if (awsCredExpiration) {
        const awsCredExpirationInSec = Math.floor((awsCredExpiration.getTime() - Date.now()) / 1000);
        urlExpirationInSec = Math.min(awsCredExpirationInSec, urlExpirationInSec);
    }
    const maxUrlExpirationInSec = _utils_constants_mjs__WEBPACK_IMPORTED_MODULE_6__.MAX_URL_EXPIRATION / 1000;
    (0,_errors_utils_assertValidationError_mjs__WEBPACK_IMPORTED_MODULE_9__.assertValidationError)(urlExpirationInSec <= maxUrlExpirationInSec, _errors_types_validation_mjs__WEBPACK_IMPORTED_MODULE_10__.StorageValidationErrorCode.UrlExpirationMaxLimitExceed);
    // expiresAt is the minimum of credential expiration and url expiration
    return {
        url: await (0,_utils_client_s3data_getObject_mjs__WEBPACK_IMPORTED_MODULE_11__.getPresignedGetObjectUrl)({
            ...s3Config,
            credentials: resolvedCredential,
            expiration: urlExpirationInSec,
        }, {
            Bucket: bucket,
            Key: finalKey,
            ...(getUrlOptions?.contentDisposition && {
                ResponseContentDisposition: (0,_utils_constructContentDisposition_mjs__WEBPACK_IMPORTED_MODULE_12__.constructContentDisposition)(getUrlOptions.contentDisposition),
            }),
            ...(getUrlOptions?.contentType && {
                ResponseContentType: getUrlOptions.contentType,
            }),
            ExpectedBucketOwner: getUrlOptions?.expectedBucketOwner,
        }),
        expiresAt: new Date(Date.now() + urlExpirationInSec * 1000),
    };
};


//# sourceMappingURL=getUrl.mjs.map


/***/ }),

/***/ "./dist/esm/providers/s3/apis/internal/list.mjs":
/*!******************************************************!*\
  !*** ./dist/esm/providers/s3/apis/internal/list.mjs ***!
  \******************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   list: () => (/* binding */ list)
/* harmony export */ });
/* harmony import */ var _aws_amplify_core_internals_utils__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @aws-amplify/core/internals/utils */ "../core/dist/esm/Platform/types.mjs");
/* harmony import */ var _smithy_md5_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @smithy/md5-js */ "../../node_modules/@smithy/md5-js/dist-es/index.js");
/* harmony import */ var fast_xml_parser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! fast-xml-parser */ "?f8cc");
/* harmony import */ var buffer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! buffer */ "?d7cd");
/* harmony import */ var _utils_resolveS3ConfigAndInput_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../utils/resolveS3ConfigAndInput.mjs */ "./dist/esm/providers/s3/utils/resolveS3ConfigAndInput.mjs");
/* harmony import */ var _utils_logger_mjs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../../utils/logger.mjs */ "./dist/esm/utils/logger.mjs");
/* harmony import */ var _utils_validateBucketOwnerID_mjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../utils/validateBucketOwnerID.mjs */ "./dist/esm/providers/s3/utils/validateBucketOwnerID.mjs");
/* harmony import */ var _utils_constants_mjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../utils/constants.mjs */ "./dist/esm/providers/s3/utils/constants.mjs");
/* harmony import */ var _utils_validateStorageOperationInputWithPrefix_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../utils/validateStorageOperationInputWithPrefix.mjs */ "./dist/esm/providers/s3/utils/validateStorageOperationInputWithPrefix.mjs");
/* harmony import */ var _utils_urlDecoder_mjs__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../utils/urlDecoder.mjs */ "./dist/esm/providers/s3/utils/urlDecoder.mjs");
/* harmony import */ var _utils_client_s3data_listObjectsV2_mjs__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../utils/client/s3data/listObjectsV2.mjs */ "./dist/esm/providers/s3/utils/client/s3data/listObjectsV2.mjs");
/* harmony import */ var _utils_userAgent_mjs__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../utils/userAgent.mjs */ "./dist/esm/providers/s3/utils/userAgent.mjs");
/* harmony import */ var _errors_IntegrityError_mjs__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../../errors/IntegrityError.mjs */ "./dist/esm/errors/IntegrityError.mjs");





























// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
const MAX_PAGE_SIZE = 1000;
const list = async (amplify, input) => {
    const { options = {} } = input;
    const { s3Config, bucket, keyPrefix: generatedPrefix, identityId, } = await (0,_utils_resolveS3ConfigAndInput_mjs__WEBPACK_IMPORTED_MODULE_3__.resolveS3ConfigAndInput)(amplify, input);
    const { inputType, objectKey } = (0,_utils_validateStorageOperationInputWithPrefix_mjs__WEBPACK_IMPORTED_MODULE_4__.validateStorageOperationInputWithPrefix)(input, identityId);
    (0,_utils_validateBucketOwnerID_mjs__WEBPACK_IMPORTED_MODULE_5__.validateBucketOwnerID)(options.expectedBucketOwner);
    const isInputWithPrefix = inputType === _utils_constants_mjs__WEBPACK_IMPORTED_MODULE_6__.STORAGE_INPUT_PREFIX;
    // @ts-expect-error pageSize and nextToken should not coexist with listAll
    if (options?.listAll && (options?.pageSize || options?.nextToken)) {
        const anyOptions = options;
        _utils_logger_mjs__WEBPACK_IMPORTED_MODULE_7__.logger.debug(`listAll is set to true, ignoring ${anyOptions?.pageSize ? `pageSize: ${anyOptions?.pageSize}` : ''} ${anyOptions?.nextToken ? `nextToken: ${anyOptions?.nextToken}` : ''}.`);
    }
    const listParams = {
        Bucket: bucket,
        Prefix: isInputWithPrefix ? `${generatedPrefix}${objectKey}` : objectKey,
        MaxKeys: options?.listAll ? undefined : options?.pageSize,
        ContinuationToken: options?.listAll ? undefined : options?.nextToken,
        Delimiter: getDelimiter(options),
        ExpectedBucketOwner: options?.expectedBucketOwner,
        EncodingType: 'url',
    };
    _utils_logger_mjs__WEBPACK_IMPORTED_MODULE_7__.logger.debug(`listing items from "${listParams.Prefix}"`);
    const listInputArgs = {
        s3Config,
        listParams,
    };
    if (options.listAll) {
        if (isInputWithPrefix) {
            return _listAllWithPrefix({
                ...listInputArgs,
                generatedPrefix,
            });
        }
        else {
            return _listAllWithPath(listInputArgs);
        }
    }
    else {
        if (isInputWithPrefix) {
            return _listWithPrefix({ ...listInputArgs, generatedPrefix });
        }
        else {
            return _listWithPath(listInputArgs);
        }
    }
};
/** @deprecated Use {@link _listAllWithPath} instead. */
const _listAllWithPrefix = async ({ s3Config, listParams, generatedPrefix, }) => {
    const listResult = [];
    let continuationToken = listParams.ContinuationToken;
    do {
        const { items: pageResults, nextToken: pageNextToken } = await _listWithPrefix({
            generatedPrefix,
            s3Config,
            listParams: {
                ...listParams,
                ContinuationToken: continuationToken,
                MaxKeys: MAX_PAGE_SIZE,
            },
        });
        listResult.push(...pageResults);
        continuationToken = pageNextToken;
    } while (continuationToken);
    return {
        items: listResult,
    };
};
/** @deprecated Use {@link _listWithPath} instead. */
const _listWithPrefix = async ({ s3Config, listParams, generatedPrefix, }) => {
    const listParamsClone = { ...listParams };
    if (!listParamsClone.MaxKeys || listParamsClone.MaxKeys > MAX_PAGE_SIZE) {
        _utils_logger_mjs__WEBPACK_IMPORTED_MODULE_7__.logger.debug(`defaulting pageSize to ${MAX_PAGE_SIZE}.`);
        listParamsClone.MaxKeys = MAX_PAGE_SIZE;
    }
    const response = await (0,_utils_client_s3data_listObjectsV2_mjs__WEBPACK_IMPORTED_MODULE_8__.listObjectsV2)({
        ...s3Config,
        userAgentValue: (0,_utils_userAgent_mjs__WEBPACK_IMPORTED_MODULE_9__.getStorageUserAgentValue)(_aws_amplify_core_internals_utils__WEBPACK_IMPORTED_MODULE_10__.StorageAction.List),
    }, listParamsClone);
    const listOutput = decodeEncodedElements(response);
    validateEchoedElements(listParamsClone, listOutput);
    if (!listOutput?.Contents) {
        return {
            items: [],
        };
    }
    return {
        items: listOutput.Contents.map(item => ({
            key: generatedPrefix
                ? item.Key.substring(generatedPrefix.length)
                : item.Key,
            eTag: item.ETag,
            lastModified: item.LastModified,
            size: item.Size,
        })),
        nextToken: listOutput.NextContinuationToken,
    };
};
const _listAllWithPath = async ({ s3Config, listParams, }) => {
    const listResult = [];
    const excludedSubpaths = [];
    let continuationToken = listParams.ContinuationToken;
    do {
        const { items: pageResults, excludedSubpaths: pageExcludedSubpaths, nextToken: pageNextToken, } = await _listWithPath({
            s3Config,
            listParams: {
                ...listParams,
                ContinuationToken: continuationToken,
                MaxKeys: MAX_PAGE_SIZE,
            },
        });
        listResult.push(...pageResults);
        excludedSubpaths.push(...(pageExcludedSubpaths ?? []));
        continuationToken = pageNextToken;
    } while (continuationToken);
    return {
        items: listResult,
        excludedSubpaths,
    };
};
const _listWithPath = async ({ s3Config, listParams, }) => {
    const listParamsClone = { ...listParams };
    if (!listParamsClone.MaxKeys || listParamsClone.MaxKeys > MAX_PAGE_SIZE) {
        _utils_logger_mjs__WEBPACK_IMPORTED_MODULE_7__.logger.debug(`defaulting pageSize to ${MAX_PAGE_SIZE}.`);
        listParamsClone.MaxKeys = MAX_PAGE_SIZE;
    }
    const response = await (0,_utils_client_s3data_listObjectsV2_mjs__WEBPACK_IMPORTED_MODULE_8__.listObjectsV2)({
        ...s3Config,
        userAgentValue: (0,_utils_userAgent_mjs__WEBPACK_IMPORTED_MODULE_9__.getStorageUserAgentValue)(_aws_amplify_core_internals_utils__WEBPACK_IMPORTED_MODULE_10__.StorageAction.List),
    }, listParamsClone);
    const listOutput = decodeEncodedElements(response);
    validateEchoedElements(listParamsClone, listOutput);
    const { Contents: contents, NextContinuationToken: nextContinuationToken, CommonPrefixes: commonPrefixes, } = listOutput;
    const excludedSubpaths = commonPrefixes && mapCommonPrefixesToExcludedSubpaths(commonPrefixes);
    if (!contents) {
        return {
            items: [],
            nextToken: nextContinuationToken,
            excludedSubpaths,
        };
    }
    return {
        items: contents.map(item => ({
            path: item.Key,
            eTag: item.ETag,
            lastModified: item.LastModified,
            size: item.Size,
        })),
        nextToken: nextContinuationToken,
        excludedSubpaths,
    };
};
const mapCommonPrefixesToExcludedSubpaths = (commonPrefixes) => {
    return commonPrefixes.reduce((mappedSubpaths, { Prefix }) => {
        if (Prefix) {
            mappedSubpaths.push(Prefix);
        }
        return mappedSubpaths;
    }, []);
};
const getDelimiter = (options) => {
    if (options?.subpathStrategy?.strategy === 'exclude') {
        return options?.subpathStrategy?.delimiter ?? _utils_constants_mjs__WEBPACK_IMPORTED_MODULE_6__.DEFAULT_DELIMITER;
    }
};
const validateEchoedElements = (listInput, listOutput) => {
    const validEchoedParameters = listInput.Bucket === listOutput.Name &&
        listInput.Delimiter === listOutput.Delimiter &&
        listInput.MaxKeys === listOutput.MaxKeys &&
        listInput.Prefix === listOutput.Prefix &&
        listInput.ContinuationToken === listOutput.ContinuationToken;
    if (!validEchoedParameters) {
        throw new _errors_IntegrityError_mjs__WEBPACK_IMPORTED_MODULE_11__.IntegrityError();
    }
};
/**
 * Decodes URL-encoded elements in the S3 `ListObjectsV2Output` response when `EncodingType` is `'url'`.
 * Applies to values for 'Delimiter', 'Prefix', 'StartAfter' and 'Key' in the response.
 */
const decodeEncodedElements = (listOutput) => {
    if (listOutput.EncodingType !== 'url') {
        return listOutput;
    }
    const decodedListOutput = { ...listOutput };
    // Decode top-level properties
    ['Delimiter', 'Prefix', 'StartAfter'].forEach(prop => {
        const value = listOutput[prop];
        if (typeof value === 'string') {
            decodedListOutput[prop] = (0,_utils_urlDecoder_mjs__WEBPACK_IMPORTED_MODULE_12__.urlDecode)(value);
        }
    });
    // Decode 'Key' in each item of 'Contents', if it exists
    if (listOutput.Contents) {
        decodedListOutput.Contents = listOutput.Contents.map(content => ({
            ...content,
            Key: content.Key ? (0,_utils_urlDecoder_mjs__WEBPACK_IMPORTED_MODULE_12__.urlDecode)(content.Key) : content.Key,
        }));
    }
    // Decode 'Prefix' in each item of 'CommonPrefixes', if it exists
    if (listOutput.CommonPrefixes) {
        decodedListOutput.CommonPrefixes = listOutput.CommonPrefixes.map(content => ({
            ...content,
            Prefix: content.Prefix ? (0,_utils_urlDecoder_mjs__WEBPACK_IMPORTED_MODULE_12__.urlDecode)(content.Prefix) : content.Prefix,
        }));
    }
    return decodedListOutput;
};


//# sourceMappingURL=list.mjs.map


/***/ }),

/***/ "./dist/esm/providers/s3/apis/internal/remove.mjs":
/*!********************************************************!*\
  !*** ./dist/esm/providers/s3/apis/internal/remove.mjs ***!
  \********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   remove: () => (/* binding */ remove)
/* harmony export */ });
/* harmony import */ var _aws_amplify_core_internals_utils__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @aws-amplify/core/internals/utils */ "../core/dist/esm/Platform/types.mjs");
/* harmony import */ var _smithy_md5_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @smithy/md5-js */ "../../node_modules/@smithy/md5-js/dist-es/index.js");
/* harmony import */ var fast_xml_parser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! fast-xml-parser */ "?f8cc");
/* harmony import */ var buffer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! buffer */ "?d7cd");
/* harmony import */ var _utils_resolveS3ConfigAndInput_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../utils/resolveS3ConfigAndInput.mjs */ "./dist/esm/providers/s3/utils/resolveS3ConfigAndInput.mjs");
/* harmony import */ var _utils_logger_mjs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../../utils/logger.mjs */ "./dist/esm/utils/logger.mjs");
/* harmony import */ var _utils_validateBucketOwnerID_mjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../utils/validateBucketOwnerID.mjs */ "./dist/esm/providers/s3/utils/validateBucketOwnerID.mjs");
/* harmony import */ var _utils_validateStorageOperationInput_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../utils/validateStorageOperationInput.mjs */ "./dist/esm/providers/s3/utils/validateStorageOperationInput.mjs");
/* harmony import */ var _utils_constants_mjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../utils/constants.mjs */ "./dist/esm/providers/s3/utils/constants.mjs");
/* harmony import */ var _utils_client_s3data_deleteObject_mjs__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../utils/client/s3data/deleteObject.mjs */ "./dist/esm/providers/s3/utils/client/s3data/deleteObject.mjs");
/* harmony import */ var _utils_userAgent_mjs__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../utils/userAgent.mjs */ "./dist/esm/providers/s3/utils/userAgent.mjs");



























// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
const remove = async (amplify, input) => {
    const { s3Config, keyPrefix, bucket, identityId } = await (0,_utils_resolveS3ConfigAndInput_mjs__WEBPACK_IMPORTED_MODULE_3__.resolveS3ConfigAndInput)(amplify, input);
    const { inputType, objectKey } = (0,_utils_validateStorageOperationInput_mjs__WEBPACK_IMPORTED_MODULE_4__.validateStorageOperationInput)(input, identityId);
    (0,_utils_validateBucketOwnerID_mjs__WEBPACK_IMPORTED_MODULE_5__.validateBucketOwnerID)(input.options?.expectedBucketOwner);
    let finalKey;
    if (inputType === _utils_constants_mjs__WEBPACK_IMPORTED_MODULE_6__.STORAGE_INPUT_KEY) {
        finalKey = `${keyPrefix}${objectKey}`;
        _utils_logger_mjs__WEBPACK_IMPORTED_MODULE_7__.logger.debug(`remove "${objectKey}" from "${finalKey}".`);
    }
    else {
        finalKey = objectKey;
        _utils_logger_mjs__WEBPACK_IMPORTED_MODULE_7__.logger.debug(`removing object in path "${finalKey}"`);
    }
    await (0,_utils_client_s3data_deleteObject_mjs__WEBPACK_IMPORTED_MODULE_8__.deleteObject)({
        ...s3Config,
        userAgentValue: (0,_utils_userAgent_mjs__WEBPACK_IMPORTED_MODULE_9__.getStorageUserAgentValue)(_aws_amplify_core_internals_utils__WEBPACK_IMPORTED_MODULE_10__.StorageAction.Remove),
    }, {
        Bucket: bucket,
        Key: finalKey,
        ExpectedBucketOwner: input.options?.expectedBucketOwner,
    });
    return inputType === _utils_constants_mjs__WEBPACK_IMPORTED_MODULE_6__.STORAGE_INPUT_KEY
        ? {
            key: objectKey,
        }
        : {
            path: objectKey,
        };
};


//# sourceMappingURL=remove.mjs.map


/***/ }),

/***/ "./dist/esm/providers/s3/apis/internal/uploadData/byteLength.mjs":
/*!***********************************************************************!*\
  !*** ./dist/esm/providers/s3/apis/internal/uploadData/byteLength.mjs ***!
  \***********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   byteLength: () => (/* binding */ byteLength)
/* harmony export */ });
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
/**
 * Calculate the total size of the data to be uploaded. The total size is not required for multipart upload, as it's
 * only used in progress report.
 */
const byteLength = (input) => {
    if (input === null || input === undefined)
        return 0;
    if (typeof input === 'string') {
        const blob = new Blob([input]);
        return blob.size;
    }
    else if (typeof input.byteLength === 'number') {
        // handles Uint8Array, ArrayBuffer, Buffer, and ArrayBufferView
        return input.byteLength;
    }
    else if (typeof input.size === 'number') {
        // handles browser File object
        return input.size;
    }
    return undefined;
};


//# sourceMappingURL=byteLength.mjs.map


/***/ }),

/***/ "./dist/esm/providers/s3/apis/internal/uploadData/index.mjs":
/*!******************************************************************!*\
  !*** ./dist/esm/providers/s3/apis/internal/uploadData/index.mjs ***!
  \******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   uploadData: () => (/* binding */ uploadData)
/* harmony export */ });
/* harmony import */ var _smithy_md5_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @smithy/md5-js */ "../../node_modules/@smithy/md5-js/dist-es/index.js");
/* harmony import */ var fast_xml_parser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! fast-xml-parser */ "?64b9");
/* harmony import */ var buffer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! buffer */ "?14f1");
/* harmony import */ var _errors_utils_assertValidationError_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../../errors/utils/assertValidationError.mjs */ "./dist/esm/errors/utils/assertValidationError.mjs");
/* harmony import */ var _errors_types_validation_mjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../../errors/types/validation.mjs */ "./dist/esm/errors/types/validation.mjs");
/* harmony import */ var _utils_constants_mjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../utils/constants.mjs */ "./dist/esm/providers/s3/utils/constants.mjs");
/* harmony import */ var _utils_transferTask_mjs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../utils/transferTask.mjs */ "./dist/esm/providers/s3/utils/transferTask.mjs");
/* harmony import */ var _byteLength_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./byteLength.mjs */ "./dist/esm/providers/s3/apis/internal/uploadData/byteLength.mjs");
/* harmony import */ var _putObjectJob_mjs__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./putObjectJob.mjs */ "./dist/esm/providers/s3/apis/internal/uploadData/putObjectJob.mjs");
/* harmony import */ var _multipart_uploadHandlers_mjs__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./multipart/uploadHandlers.mjs */ "./dist/esm/providers/s3/apis/internal/uploadData/multipart/uploadHandlers.mjs");















// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
const uploadData = (input) => {
    const { data } = input;
    const dataByteLength = (0,_byteLength_mjs__WEBPACK_IMPORTED_MODULE_3__.byteLength)(data);
    // Using InvalidUploadSource error code because the input data must NOT be any
    // of permitted Blob, string, ArrayBuffer(View) if byteLength could not be determined.
    (0,_errors_utils_assertValidationError_mjs__WEBPACK_IMPORTED_MODULE_4__.assertValidationError)(dataByteLength !== undefined, _errors_types_validation_mjs__WEBPACK_IMPORTED_MODULE_5__.StorageValidationErrorCode.InvalidUploadSource);
    (0,_errors_utils_assertValidationError_mjs__WEBPACK_IMPORTED_MODULE_4__.assertValidationError)(dataByteLength <= _utils_constants_mjs__WEBPACK_IMPORTED_MODULE_6__.MAX_OBJECT_SIZE, _errors_types_validation_mjs__WEBPACK_IMPORTED_MODULE_5__.StorageValidationErrorCode.ObjectIsTooLarge);
    if (dataByteLength <= _utils_constants_mjs__WEBPACK_IMPORTED_MODULE_6__.DEFAULT_PART_SIZE) {
        // Single part upload
        const abortController = new AbortController();
        return (0,_utils_transferTask_mjs__WEBPACK_IMPORTED_MODULE_7__.createUploadTask)({
            isMultipartUpload: false,
            job: (0,_putObjectJob_mjs__WEBPACK_IMPORTED_MODULE_8__.putObjectJob)(input, abortController.signal, dataByteLength),
            onCancel: (message) => {
                abortController.abort(message);
            },
        });
    }
    else {
        // Multipart upload
        const { multipartUploadJob, onPause, onResume, onCancel } = (0,_multipart_uploadHandlers_mjs__WEBPACK_IMPORTED_MODULE_9__.getMultipartUploadHandlers)(input, dataByteLength);
        return (0,_utils_transferTask_mjs__WEBPACK_IMPORTED_MODULE_7__.createUploadTask)({
            isMultipartUpload: true,
            job: multipartUploadJob,
            onCancel: (message) => {
                onCancel(message);
            },
            onPause,
            onResume,
        });
    }
};


//# sourceMappingURL=index.mjs.map


/***/ }),

/***/ "./dist/esm/providers/s3/apis/internal/uploadData/multipart/calculatePartSize.mjs":
/*!****************************************************************************************!*\
  !*** ./dist/esm/providers/s3/apis/internal/uploadData/multipart/calculatePartSize.mjs ***!
  \****************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   calculatePartSize: () => (/* binding */ calculatePartSize)
/* harmony export */ });
/* harmony import */ var _utils_constants_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../utils/constants.mjs */ "./dist/esm/providers/s3/utils/constants.mjs");


// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
const calculatePartSize = (totalSize) => {
    if (!totalSize) {
        return _utils_constants_mjs__WEBPACK_IMPORTED_MODULE_0__.DEFAULT_PART_SIZE;
    }
    let partSize = _utils_constants_mjs__WEBPACK_IMPORTED_MODULE_0__.DEFAULT_PART_SIZE;
    let partsCount = Math.ceil(totalSize / partSize);
    while (partsCount > _utils_constants_mjs__WEBPACK_IMPORTED_MODULE_0__.MAX_PARTS_COUNT) {
        partSize *= 2;
        partsCount = Math.ceil(totalSize / partSize);
    }
    return partSize;
};


//# sourceMappingURL=calculatePartSize.mjs.map


/***/ }),

/***/ "./dist/esm/providers/s3/apis/internal/uploadData/multipart/getDataChunker.mjs":
/*!*************************************************************************************!*\
  !*** ./dist/esm/providers/s3/apis/internal/uploadData/multipart/getDataChunker.mjs ***!
  \*************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getDataChunker: () => (/* binding */ getDataChunker)
/* harmony export */ });
/* harmony import */ var _errors_types_validation_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../../errors/types/validation.mjs */ "./dist/esm/errors/types/validation.mjs");
/* harmony import */ var _errors_StorageError_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../../../errors/StorageError.mjs */ "./dist/esm/errors/StorageError.mjs");
/* harmony import */ var _calculatePartSize_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./calculatePartSize.mjs */ "./dist/esm/providers/s3/apis/internal/uploadData/multipart/calculatePartSize.mjs");




// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
const getDataChunker = (data, totalSize) => {
    const partSize = (0,_calculatePartSize_mjs__WEBPACK_IMPORTED_MODULE_0__.calculatePartSize)(totalSize);
    if (data instanceof Blob) {
        return helper(data, 0, data.size, partSize);
    }
    else if (ArrayBuffer.isView(data)) {
        return helper(data.buffer, data.byteOffset, data.byteLength, partSize);
    }
    else if (data instanceof ArrayBuffer) {
        return helper(data, 0, data.byteLength, partSize);
    }
    else if (typeof data === 'string') {
        const blob = new Blob([data]);
        return getDataChunker(blob, blob.size);
    }
    else {
        throw new _errors_StorageError_mjs__WEBPACK_IMPORTED_MODULE_1__.StorageError({
            name: _errors_types_validation_mjs__WEBPACK_IMPORTED_MODULE_2__.StorageValidationErrorCode.InvalidUploadSource,
            ..._errors_types_validation_mjs__WEBPACK_IMPORTED_MODULE_2__.validationErrorMap[_errors_types_validation_mjs__WEBPACK_IMPORTED_MODULE_2__.StorageValidationErrorCode.InvalidUploadSource],
        });
    }
};
const helper = function* (buffer, byteOffset, byteLength, partSize) {
    let partNumber = 1;
    let startByte = byteOffset;
    let endByte = byteOffset + Math.min(partSize, byteLength);
    while (endByte < byteLength + byteOffset) {
        yield {
            partNumber,
            data: buffer.slice(startByte, endByte),
            size: partSize,
        };
        partNumber += 1;
        startByte = endByte;
        endByte = startByte + partSize;
    }
    yield {
        partNumber,
        data: buffer.slice(startByte, byteLength + byteOffset),
        size: byteLength + byteOffset - startByte,
    };
};


//# sourceMappingURL=getDataChunker.mjs.map


/***/ }),

/***/ "./dist/esm/providers/s3/apis/internal/uploadData/multipart/initialUpload.mjs":
/*!************************************************************************************!*\
  !*** ./dist/esm/providers/s3/apis/internal/uploadData/multipart/initialUpload.mjs ***!
  \************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   loadOrCreateMultipartUpload: () => (/* binding */ loadOrCreateMultipartUpload)
/* harmony export */ });
/* harmony import */ var _utils_client_s3data_createMultipartUpload_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../utils/client/s3data/createMultipartUpload.mjs */ "./dist/esm/providers/s3/utils/client/s3data/createMultipartUpload.mjs");
/* harmony import */ var _utils_logger_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../../../utils/logger.mjs */ "./dist/esm/utils/logger.mjs");
/* harmony import */ var _utils_constructContentDisposition_mjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../utils/constructContentDisposition.mjs */ "./dist/esm/providers/s3/utils/constructContentDisposition.mjs");
/* harmony import */ var _utils_constants_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../utils/constants.mjs */ "./dist/esm/providers/s3/utils/constants.mjs");
/* harmony import */ var _utils_getCombinedCrc32_native_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../utils/getCombinedCrc32.native.mjs */ "./dist/esm/providers/s3/utils/getCombinedCrc32.native.mjs");
/* harmony import */ var _uploadCache_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./uploadCache.mjs */ "./dist/esm/providers/s3/apis/internal/uploadData/multipart/uploadCache.mjs");




















// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
/**
 * Load the in-progress multipart upload from local storage or async storage(RN) if it exists, or create a new multipart
 * upload.
 *
 * @internal
 */
const loadOrCreateMultipartUpload = async ({ s3Config, data, size, contentType, bucket, accessLevel, keyPrefix, key, contentDisposition, contentEncoding, metadata, abortSignal, checksumAlgorithm, optionsHash, resumableUploadsCache, expectedBucketOwner, }) => {
    const finalKey = keyPrefix !== undefined ? keyPrefix + key : key;
    let cachedUpload;
    if (!resumableUploadsCache) {
        _utils_logger_mjs__WEBPACK_IMPORTED_MODULE_0__.logger.debug('uploaded cache instance cannot be determined, skipping cache.');
        cachedUpload = undefined;
    }
    else {
        const uploadCacheKey = (0,_uploadCache_mjs__WEBPACK_IMPORTED_MODULE_1__.getUploadsCacheKey)({
            size,
            contentType,
            file: data instanceof File ? data : undefined,
            bucket,
            accessLevel,
            key,
            optionsHash,
        });
        const cachedUploadParts = await (0,_uploadCache_mjs__WEBPACK_IMPORTED_MODULE_1__.findCachedUploadParts)({
            s3Config,
            cacheKey: uploadCacheKey,
            bucket,
            finalKey,
            resumableUploadsCache,
        });
        cachedUpload = cachedUploadParts
            ? { ...cachedUploadParts, uploadCacheKey }
            : undefined;
    }
    if (cachedUpload) {
        return {
            uploadId: cachedUpload.uploadId,
            cachedParts: cachedUpload.parts,
            finalCrc32: cachedUpload.finalCrc32,
        };
    }
    else {
        const finalCrc32 = checksumAlgorithm === _utils_constants_mjs__WEBPACK_IMPORTED_MODULE_2__.CHECKSUM_ALGORITHM_CRC32
            ? await (0,_utils_getCombinedCrc32_native_mjs__WEBPACK_IMPORTED_MODULE_3__.getCombinedCrc32)(data, size)
            : undefined;
        const { UploadId } = await (0,_utils_client_s3data_createMultipartUpload_mjs__WEBPACK_IMPORTED_MODULE_4__.createMultipartUpload)({
            ...s3Config,
            abortSignal,
        }, {
            Bucket: bucket,
            Key: finalKey,
            ContentType: contentType,
            ContentDisposition: (0,_utils_constructContentDisposition_mjs__WEBPACK_IMPORTED_MODULE_5__.constructContentDisposition)(contentDisposition),
            ContentEncoding: contentEncoding,
            Metadata: metadata,
            ChecksumAlgorithm: finalCrc32 ? 'CRC32' : undefined,
            ExpectedBucketOwner: expectedBucketOwner,
        });
        if (resumableUploadsCache) {
            const uploadCacheKey = (0,_uploadCache_mjs__WEBPACK_IMPORTED_MODULE_1__.getUploadsCacheKey)({
                size,
                contentType,
                file: data instanceof File ? data : undefined,
                bucket,
                accessLevel,
                key,
                optionsHash,
            });
            await (0,_uploadCache_mjs__WEBPACK_IMPORTED_MODULE_1__.cacheMultipartUpload)(resumableUploadsCache, uploadCacheKey, {
                uploadId: UploadId,
                bucket,
                key,
                finalCrc32,
                fileName: data instanceof File ? data.name : '',
            });
        }
        return {
            uploadId: UploadId,
            cachedParts: [],
            finalCrc32,
        };
    }
};


//# sourceMappingURL=initialUpload.mjs.map


/***/ }),

/***/ "./dist/esm/providers/s3/apis/internal/uploadData/multipart/progressTracker.mjs":
/*!**************************************************************************************!*\
  !*** ./dist/esm/providers/s3/apis/internal/uploadData/multipart/progressTracker.mjs ***!
  \**************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getConcurrentUploadsProgressTracker: () => (/* binding */ getConcurrentUploadsProgressTracker)
/* harmony export */ });
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
/**
 * Track the progress from multiple concurrent uploads, and invoke the onProgress callback.
 *
 * @internal
 */
const getConcurrentUploadsProgressTracker = ({ size, onProgress, }) => {
    const transferredBytesPerListener = [];
    const getTransferredBytes = () => transferredBytesPerListener.reduce((acc, transferredBytes) => acc + transferredBytes, 0);
    return {
        getOnProgressListener: () => {
            transferredBytesPerListener.push(0);
            const listenerIndex = transferredBytesPerListener.length - 1;
            return (event) => {
                const { transferredBytes } = event;
                transferredBytesPerListener[listenerIndex] = transferredBytes;
                onProgress?.({
                    transferredBytes: getTransferredBytes(),
                    totalBytes: size,
                });
            };
        },
    };
};


//# sourceMappingURL=progressTracker.mjs.map


/***/ }),

/***/ "./dist/esm/providers/s3/apis/internal/uploadData/multipart/uploadCache.mjs":
/*!**********************************************************************************!*\
  !*** ./dist/esm/providers/s3/apis/internal/uploadData/multipart/uploadCache.mjs ***!
  \**********************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   cacheMultipartUpload: () => (/* binding */ cacheMultipartUpload),
/* harmony export */   findCachedUploadParts: () => (/* binding */ findCachedUploadParts),
/* harmony export */   getUploadsCacheKey: () => (/* binding */ getUploadsCacheKey),
/* harmony export */   removeCachedUpload: () => (/* binding */ removeCachedUpload)
/* harmony export */ });
/* harmony import */ var _utils_constants_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../utils/constants.mjs */ "./dist/esm/providers/s3/utils/constants.mjs");
/* harmony import */ var _utils_client_s3data_listParts_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../utils/client/s3data/listParts.mjs */ "./dist/esm/providers/s3/utils/client/s3data/listParts.mjs");
/* harmony import */ var _utils_logger_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../../utils/logger.mjs */ "./dist/esm/utils/logger.mjs");

















// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
const ONE_HOUR = 1000 * 60 * 60;
/**
 * Find the cached multipart upload id and get the parts that have been uploaded
 * with ListParts API. If the cached upload is expired(1 hour), return null.
 */
const findCachedUploadParts = async ({ resumableUploadsCache, cacheKey, s3Config, bucket, finalKey, }) => {
    const cachedUploads = await listCachedUploadTasks(resumableUploadsCache);
    if (!cachedUploads[cacheKey] ||
        cachedUploads[cacheKey].lastTouched < Date.now() - ONE_HOUR // Uploads are cached for 1 hour
    ) {
        return null;
    }
    const cachedUpload = cachedUploads[cacheKey];
    cachedUpload.lastTouched = Date.now();
    await resumableUploadsCache.setItem(_utils_constants_mjs__WEBPACK_IMPORTED_MODULE_0__.UPLOADS_STORAGE_KEY, JSON.stringify(cachedUploads));
    try {
        const { Parts = [] } = await (0,_utils_client_s3data_listParts_mjs__WEBPACK_IMPORTED_MODULE_1__.listParts)(s3Config, {
            Bucket: bucket,
            Key: finalKey,
            UploadId: cachedUpload.uploadId,
        });
        return {
            parts: Parts,
            uploadId: cachedUpload.uploadId,
            finalCrc32: cachedUpload.finalCrc32,
        };
    }
    catch (e) {
        _utils_logger_mjs__WEBPACK_IMPORTED_MODULE_2__.logger.debug('failed to list cached parts, removing cached upload.');
        await removeCachedUpload(resumableUploadsCache, cacheKey);
        return null;
    }
};
const listCachedUploadTasks = async (resumableUploadsCache) => {
    try {
        return JSON.parse((await resumableUploadsCache.getItem(_utils_constants_mjs__WEBPACK_IMPORTED_MODULE_0__.UPLOADS_STORAGE_KEY)) ?? '{}');
    }
    catch (e) {
        _utils_logger_mjs__WEBPACK_IMPORTED_MODULE_2__.logger.debug('failed to parse cached uploads record.');
        return {};
    }
};
/**
 * Get the cache key of a multipart upload. Data source cached by different: size, content type, bucket, access level,
 * key. If the data source is a File instance, the upload is additionally indexed by file name and last modified time.
 * So the library always created a new multipart upload if the file is modified.
 */
const getUploadsCacheKey = ({ file, size, contentType, bucket, accessLevel, key, optionsHash, }) => {
    let levelStr;
    const resolvedContentType = contentType ?? file?.type ?? 'application/octet-stream';
    // If no access level is defined, we're using custom gen2 access rules
    if (accessLevel === undefined) {
        levelStr = 'custom';
    }
    else {
        levelStr = accessLevel === 'guest' ? 'public' : accessLevel;
    }
    const baseId = `${optionsHash}_${size}_${resolvedContentType}_${bucket}_${levelStr}_${key}`;
    if (file) {
        return `${file.name}_${file.lastModified}_${baseId}`;
    }
    else {
        return baseId;
    }
};
const cacheMultipartUpload = async (resumableUploadsCache, cacheKey, fileMetadata) => {
    const cachedUploads = await listCachedUploadTasks(resumableUploadsCache);
    cachedUploads[cacheKey] = {
        ...fileMetadata,
        lastTouched: Date.now(),
    };
    await resumableUploadsCache.setItem(_utils_constants_mjs__WEBPACK_IMPORTED_MODULE_0__.UPLOADS_STORAGE_KEY, JSON.stringify(cachedUploads));
};
const removeCachedUpload = async (resumableUploadsCache, cacheKey) => {
    const cachedUploads = await listCachedUploadTasks(resumableUploadsCache);
    delete cachedUploads[cacheKey];
    await resumableUploadsCache.setItem(_utils_constants_mjs__WEBPACK_IMPORTED_MODULE_0__.UPLOADS_STORAGE_KEY, JSON.stringify(cachedUploads));
};


//# sourceMappingURL=uploadCache.mjs.map


/***/ }),

/***/ "./dist/esm/providers/s3/apis/internal/uploadData/multipart/uploadHandlers.mjs":
/*!*************************************************************************************!*\
  !*** ./dist/esm/providers/s3/apis/internal/uploadData/multipart/uploadHandlers.mjs ***!
  \*************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getMultipartUploadHandlers: () => (/* binding */ getMultipartUploadHandlers)
/* harmony export */ });
/* harmony import */ var _aws_amplify_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @aws-amplify/core */ "@aws-amplify/core");
/* harmony import */ var _aws_amplify_core_internals_utils__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @aws-amplify/core/internals/utils */ "../core/dist/esm/Platform/types.mjs");
/* harmony import */ var _smithy_md5_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @smithy/md5-js */ "../../node_modules/@smithy/md5-js/dist-es/index.js");
/* harmony import */ var fast_xml_parser__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! fast-xml-parser */ "?b879");
/* harmony import */ var buffer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! buffer */ "?89c0");
/* harmony import */ var _errors_StorageError_mjs__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../../../../../../errors/StorageError.mjs */ "./dist/esm/errors/StorageError.mjs");
/* harmony import */ var _utils_resolveS3ConfigAndInput_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../utils/resolveS3ConfigAndInput.mjs */ "./dist/esm/providers/s3/utils/resolveS3ConfigAndInput.mjs");
/* harmony import */ var _errors_CanceledError_mjs__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ../../../../../../errors/CanceledError.mjs */ "./dist/esm/errors/CanceledError.mjs");
/* harmony import */ var _utils_logger_mjs__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ../../../../../../utils/logger.mjs */ "./dist/esm/utils/logger.mjs");
/* harmony import */ var _utils_validateStorageOperationInput_mjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../utils/validateStorageOperationInput.mjs */ "./dist/esm/providers/s3/utils/validateStorageOperationInput.mjs");
/* harmony import */ var _utils_constants_mjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../../utils/constants.mjs */ "./dist/esm/providers/s3/utils/constants.mjs");
/* harmony import */ var _utils_client_s3data_completeMultipartUpload_mjs__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../../../utils/client/s3data/completeMultipartUpload.mjs */ "./dist/esm/providers/s3/utils/client/s3data/completeMultipartUpload.mjs");
/* harmony import */ var _utils_client_s3data_abortMultipartUpload_mjs__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ../../../../utils/client/s3data/abortMultipartUpload.mjs */ "./dist/esm/providers/s3/utils/client/s3data/abortMultipartUpload.mjs");
/* harmony import */ var _utils_client_s3data_headObject_mjs__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../../../../utils/client/s3data/headObject.mjs */ "./dist/esm/providers/s3/utils/client/s3data/headObject.mjs");
/* harmony import */ var _utils_userAgent_mjs__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../../../utils/userAgent.mjs */ "./dist/esm/providers/s3/utils/userAgent.mjs");
/* harmony import */ var _utils_crc32_mjs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../../utils/crc32.mjs */ "./dist/esm/providers/s3/utils/crc32.mjs");
/* harmony import */ var _errors_IntegrityError_mjs__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ../../../../../../errors/IntegrityError.mjs */ "./dist/esm/errors/IntegrityError.mjs");
/* harmony import */ var _uploadPartExecutor_mjs__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./uploadPartExecutor.mjs */ "./dist/esm/providers/s3/apis/internal/uploadData/multipart/uploadPartExecutor.mjs");
/* harmony import */ var _uploadCache_mjs__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./uploadCache.mjs */ "./dist/esm/providers/s3/apis/internal/uploadData/multipart/uploadCache.mjs");
/* harmony import */ var _progressTracker_mjs__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./progressTracker.mjs */ "./dist/esm/providers/s3/apis/internal/uploadData/multipart/progressTracker.mjs");
/* harmony import */ var _initialUpload_mjs__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./initialUpload.mjs */ "./dist/esm/providers/s3/apis/internal/uploadData/multipart/initialUpload.mjs");
/* harmony import */ var _getDataChunker_mjs__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./getDataChunker.mjs */ "./dist/esm/providers/s3/apis/internal/uploadData/multipart/getDataChunker.mjs");
/* harmony import */ var _calculatePartSize_mjs__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./calculatePartSize.mjs */ "./dist/esm/providers/s3/apis/internal/uploadData/multipart/calculatePartSize.mjs");





































// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
/**
 * Create closure hiding the multipart upload implementation details and expose the upload job and control functions(
 * onPause, onResume, onCancel).
 *
 * @internal
 */
const getMultipartUploadHandlers = (uploadDataInput, size) => {
    let resolveCallback;
    let rejectCallback;
    let inProgressUpload;
    let resolvedS3Config;
    let abortController;
    let resolvedAccessLevel;
    let resolvedBucket;
    let resolvedKeyPrefix;
    let resolvedIdentityId;
    let uploadCacheKey;
    let finalKey;
    let expectedBucketOwner;
    // Special flag that differentiates HTTP requests abort error caused by pause() from ones caused by cancel().
    // The former one should NOT cause the upload job to throw, but cancels any pending HTTP requests.
    // This should be replaced by a special abort reason. However,the support of this API is lagged behind.
    let isAbortSignalFromPause = false;
    const { resumableUploadsCache } = uploadDataInput.options ?? {};
    const startUpload = async () => {
        const { options: uploadDataOptions, data } = uploadDataInput;
        const resolvedS3Options = await (0,_utils_resolveS3ConfigAndInput_mjs__WEBPACK_IMPORTED_MODULE_4__.resolveS3ConfigAndInput)(_aws_amplify_core__WEBPACK_IMPORTED_MODULE_0__.Amplify, uploadDataInput);
        abortController = new AbortController();
        isAbortSignalFromPause = false;
        resolvedS3Config = resolvedS3Options.s3Config;
        resolvedBucket = resolvedS3Options.bucket;
        resolvedIdentityId = resolvedS3Options.identityId;
        expectedBucketOwner = uploadDataOptions?.expectedBucketOwner;
        const { inputType, objectKey } = (0,_utils_validateStorageOperationInput_mjs__WEBPACK_IMPORTED_MODULE_5__.validateStorageOperationInput)(uploadDataInput, resolvedIdentityId);
        const { contentDisposition, contentEncoding, contentType = 'application/octet-stream', metadata, preventOverwrite, onProgress, } = uploadDataOptions ?? {};
        finalKey = objectKey;
        // Resolve "key" specific options
        if (inputType === _utils_constants_mjs__WEBPACK_IMPORTED_MODULE_6__.STORAGE_INPUT_KEY) {
            const accessLevel = uploadDataOptions
                ?.accessLevel;
            resolvedKeyPrefix = resolvedS3Options.keyPrefix;
            finalKey = resolvedKeyPrefix + objectKey;
            resolvedAccessLevel = resolveAccessLevel(accessLevel);
        }
        const optionsHash = (await (0,_utils_crc32_mjs__WEBPACK_IMPORTED_MODULE_7__.calculateContentCRC32)(JSON.stringify(uploadDataOptions))).checksum;
        if (!inProgressUpload) {
            const { uploadId, cachedParts, finalCrc32 } = await (0,_initialUpload_mjs__WEBPACK_IMPORTED_MODULE_8__.loadOrCreateMultipartUpload)({
                s3Config: resolvedS3Config,
                accessLevel: resolvedAccessLevel,
                bucket: resolvedBucket,
                keyPrefix: resolvedKeyPrefix,
                key: objectKey,
                contentType,
                contentDisposition,
                contentEncoding,
                metadata,
                data,
                size,
                abortSignal: abortController.signal,
                checksumAlgorithm: uploadDataOptions?.checksumAlgorithm,
                optionsHash,
                resumableUploadsCache,
                expectedBucketOwner,
            });
            inProgressUpload = {
                uploadId,
                completedParts: cachedParts,
                finalCrc32,
            };
        }
        uploadCacheKey = size
            ? (0,_uploadCache_mjs__WEBPACK_IMPORTED_MODULE_9__.getUploadsCacheKey)({
                file: data instanceof File ? data : undefined,
                accessLevel: resolvedAccessLevel,
                contentType: uploadDataOptions?.contentType,
                bucket: resolvedBucket,
                size,
                key: objectKey,
                optionsHash,
            })
            : undefined;
        const dataChunker = (0,_getDataChunker_mjs__WEBPACK_IMPORTED_MODULE_10__.getDataChunker)(data, size);
        const completedPartNumberSet = new Set(inProgressUpload.completedParts.map(({ PartNumber }) => PartNumber));
        const onPartUploadCompletion = (partNumber, eTag, crc32) => {
            inProgressUpload?.completedParts.push({
                PartNumber: partNumber,
                ETag: eTag,
                // TODO: crc32 can always be added once RN also has an implementation
                ...(crc32 ? { ChecksumCRC32: crc32 } : {}),
            });
        };
        const concurrentUploadsProgressTracker = (0,_progressTracker_mjs__WEBPACK_IMPORTED_MODULE_11__.getConcurrentUploadsProgressTracker)({
            size,
            onProgress,
        });
        const concurrentUploadPartExecutors = [];
        for (let index = 0; index < _utils_constants_mjs__WEBPACK_IMPORTED_MODULE_6__.DEFAULT_QUEUE_SIZE; index++) {
            concurrentUploadPartExecutors.push((0,_uploadPartExecutor_mjs__WEBPACK_IMPORTED_MODULE_12__.uploadPartExecutor)({
                dataChunkerGenerator: dataChunker,
                completedPartNumberSet,
                s3Config: resolvedS3Config,
                abortSignal: abortController.signal,
                bucket: resolvedBucket,
                finalKey,
                uploadId: inProgressUpload.uploadId,
                onPartUploadCompletion,
                onProgress: concurrentUploadsProgressTracker.getOnProgressListener(),
                isObjectLockEnabled: resolvedS3Options.isObjectLockEnabled,
                useCRC32Checksum: Boolean(inProgressUpload.finalCrc32),
                expectedBucketOwner,
            }));
        }
        await Promise.all(concurrentUploadPartExecutors);
        validateCompletedParts(inProgressUpload.completedParts, size);
        const { ETag: eTag } = await (0,_utils_client_s3data_completeMultipartUpload_mjs__WEBPACK_IMPORTED_MODULE_13__.completeMultipartUpload)({
            ...resolvedS3Config,
            abortSignal: abortController.signal,
            userAgentValue: (0,_utils_userAgent_mjs__WEBPACK_IMPORTED_MODULE_14__.getStorageUserAgentValue)(_aws_amplify_core_internals_utils__WEBPACK_IMPORTED_MODULE_15__.StorageAction.UploadData),
        }, {
            Bucket: resolvedBucket,
            Key: finalKey,
            UploadId: inProgressUpload.uploadId,
            ChecksumCRC32: inProgressUpload.finalCrc32,
            IfNoneMatch: preventOverwrite ? '*' : undefined,
            MultipartUpload: {
                Parts: sortUploadParts(inProgressUpload.completedParts),
            },
            ExpectedBucketOwner: expectedBucketOwner,
        });
        if (size) {
            const { ContentLength: uploadedObjectSize } = await (0,_utils_client_s3data_headObject_mjs__WEBPACK_IMPORTED_MODULE_16__.headObject)(resolvedS3Config, {
                Bucket: resolvedBucket,
                Key: finalKey,
                ExpectedBucketOwner: expectedBucketOwner,
            });
            if (uploadedObjectSize && uploadedObjectSize !== size) {
                throw new _errors_StorageError_mjs__WEBPACK_IMPORTED_MODULE_17__.StorageError({
                    name: 'Error',
                    message: `Upload failed. Expected object size ${size}, but got ${uploadedObjectSize}.`,
                });
            }
        }
        if (resumableUploadsCache && uploadCacheKey) {
            await (0,_uploadCache_mjs__WEBPACK_IMPORTED_MODULE_9__.removeCachedUpload)(resumableUploadsCache, uploadCacheKey);
        }
        const result = {
            eTag,
            contentType,
            metadata,
        };
        return inputType === _utils_constants_mjs__WEBPACK_IMPORTED_MODULE_6__.STORAGE_INPUT_KEY
            ? { key: objectKey, ...result }
            : { path: objectKey, ...result };
    };
    const startUploadWithResumability = () => startUpload()
        .then(resolveCallback)
        .catch(error => {
        const abortSignal = abortController?.signal;
        if (abortSignal?.aborted && isAbortSignalFromPause) {
            _utils_logger_mjs__WEBPACK_IMPORTED_MODULE_18__.logger.debug('upload paused.');
        }
        else {
            // Uncaught errors should be exposed to the users.
            rejectCallback(error);
        }
    });
    const multipartUploadJob = () => new Promise((resolve, reject) => {
        resolveCallback = resolve;
        rejectCallback = reject;
        startUploadWithResumability();
    });
    const onPause = () => {
        isAbortSignalFromPause = true;
        abortController?.abort();
    };
    const onResume = () => {
        startUploadWithResumability();
    };
    const onCancel = (message) => {
        // 1. abort in-flight API requests
        abortController?.abort(message);
        const cancelUpload = async () => {
            // 2. clear upload cache.
            if (uploadCacheKey && resumableUploadsCache) {
                await (0,_uploadCache_mjs__WEBPACK_IMPORTED_MODULE_9__.removeCachedUpload)(resumableUploadsCache, uploadCacheKey);
            }
            // 3. clear multipart upload on server side.
            await (0,_utils_client_s3data_abortMultipartUpload_mjs__WEBPACK_IMPORTED_MODULE_19__.abortMultipartUpload)(resolvedS3Config, {
                Bucket: resolvedBucket,
                Key: finalKey,
                UploadId: inProgressUpload?.uploadId,
                ExpectedBucketOwner: expectedBucketOwner,
            });
        };
        cancelUpload().catch(e => {
            _utils_logger_mjs__WEBPACK_IMPORTED_MODULE_18__.logger.debug('error when cancelling upload task.', e);
        });
        rejectCallback(
        // Internal error that should not be exposed to the users. They should use isCancelError() to check if
        // the error is caused by cancel().
        new _errors_CanceledError_mjs__WEBPACK_IMPORTED_MODULE_20__.CanceledError(message ? { message } : undefined));
    };
    return {
        multipartUploadJob,
        onPause,
        onResume,
        onCancel,
    };
};
const resolveAccessLevel = (accessLevel) => accessLevel ??
    _aws_amplify_core__WEBPACK_IMPORTED_MODULE_0__.Amplify.libraryOptions.Storage?.S3?.defaultAccessLevel ??
    _utils_constants_mjs__WEBPACK_IMPORTED_MODULE_6__.DEFAULT_ACCESS_LEVEL;
const validateCompletedParts = (completedParts, size) => {
    const partsExpected = Math.ceil(size / (0,_calculatePartSize_mjs__WEBPACK_IMPORTED_MODULE_21__.calculatePartSize)(size));
    const validPartCount = completedParts.length === partsExpected;
    const sorted = sortUploadParts(completedParts);
    const validPartNumbers = sorted.every((part, index) => part.PartNumber === index + 1);
    if (!validPartCount || !validPartNumbers) {
        throw new _errors_IntegrityError_mjs__WEBPACK_IMPORTED_MODULE_22__.IntegrityError();
    }
};
const sortUploadParts = (parts) => {
    return [...parts].sort((partA, partB) => partA.PartNumber - partB.PartNumber);
};


//# sourceMappingURL=uploadHandlers.mjs.map


/***/ }),

/***/ "./dist/esm/providers/s3/apis/internal/uploadData/multipart/uploadPartExecutor.mjs":
/*!*****************************************************************************************!*\
  !*** ./dist/esm/providers/s3/apis/internal/uploadData/multipart/uploadPartExecutor.mjs ***!
  \*****************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   uploadPartExecutor: () => (/* binding */ uploadPartExecutor)
/* harmony export */ });
/* harmony import */ var _utils_client_s3data_uploadPart_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../utils/client/s3data/uploadPart.mjs */ "./dist/esm/providers/s3/utils/client/s3data/uploadPart.mjs");
/* harmony import */ var _utils_logger_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../../../utils/logger.mjs */ "./dist/esm/utils/logger.mjs");
/* harmony import */ var _utils_crc32_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../utils/crc32.mjs */ "./dist/esm/providers/s3/utils/crc32.mjs");
/* harmony import */ var _utils_md5_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../utils/md5.mjs */ "./dist/esm/providers/s3/utils/md5.mjs");


















// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
const uploadPartExecutor = async ({ dataChunkerGenerator, completedPartNumberSet, s3Config, abortSignal, bucket, finalKey, uploadId, onPartUploadCompletion, onProgress, isObjectLockEnabled, useCRC32Checksum, expectedBucketOwner, }) => {
    let transferredBytes = 0;
    for (const { data, partNumber, size } of dataChunkerGenerator) {
        if (abortSignal.aborted) {
            _utils_logger_mjs__WEBPACK_IMPORTED_MODULE_0__.logger.debug('upload executor aborted.');
            break;
        }
        if (completedPartNumberSet.has(partNumber)) {
            _utils_logger_mjs__WEBPACK_IMPORTED_MODULE_0__.logger.debug(`part ${partNumber} already uploaded.`);
            transferredBytes += size;
            onProgress?.({
                transferredBytes,
            });
        }
        else {
            // handle cancel error
            let checksumCRC32;
            if (useCRC32Checksum) {
                checksumCRC32 = await (0,_utils_crc32_mjs__WEBPACK_IMPORTED_MODULE_1__.calculateContentCRC32)(data);
            }
            const contentMD5 = 
            // check if checksum exists. ex: should not exist in react native
            !checksumCRC32 && isObjectLockEnabled
                ? await (0,_utils_md5_mjs__WEBPACK_IMPORTED_MODULE_2__.calculateContentMd5)(data)
                : undefined;
            const { ETag: eTag } = await (0,_utils_client_s3data_uploadPart_mjs__WEBPACK_IMPORTED_MODULE_3__.uploadPart)({
                ...s3Config,
                abortSignal,
                onUploadProgress: (event) => {
                    const { transferredBytes: currentPartTransferredBytes } = event;
                    onProgress?.({
                        transferredBytes: transferredBytes + currentPartTransferredBytes,
                    });
                },
            }, {
                Bucket: bucket,
                Key: finalKey,
                UploadId: uploadId,
                Body: data,
                PartNumber: partNumber,
                ChecksumCRC32: checksumCRC32?.checksum,
                ContentMD5: contentMD5,
                ExpectedBucketOwner: expectedBucketOwner,
            });
            transferredBytes += size;
            // eTag will always be set even the S3 model interface marks it as optional.
            onPartUploadCompletion(partNumber, eTag, checksumCRC32?.checksum);
        }
    }
};


//# sourceMappingURL=uploadPartExecutor.mjs.map


/***/ }),

/***/ "./dist/esm/providers/s3/apis/internal/uploadData/putObjectJob.mjs":
/*!*************************************************************************!*\
  !*** ./dist/esm/providers/s3/apis/internal/uploadData/putObjectJob.mjs ***!
  \*************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   putObjectJob: () => (/* binding */ putObjectJob)
/* harmony export */ });
/* harmony import */ var _aws_amplify_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @aws-amplify/core */ "@aws-amplify/core");
/* harmony import */ var _aws_amplify_core_internals_utils__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @aws-amplify/core/internals/utils */ "../core/dist/esm/Platform/types.mjs");
/* harmony import */ var _utils_md5_mjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../utils/md5.mjs */ "./dist/esm/providers/s3/utils/md5.mjs");
/* harmony import */ var _utils_resolveS3ConfigAndInput_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../utils/resolveS3ConfigAndInput.mjs */ "./dist/esm/providers/s3/utils/resolveS3ConfigAndInput.mjs");
/* harmony import */ var _utils_validateBucketOwnerID_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../utils/validateBucketOwnerID.mjs */ "./dist/esm/providers/s3/utils/validateBucketOwnerID.mjs");
/* harmony import */ var _utils_validateStorageOperationInput_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../utils/validateStorageOperationInput.mjs */ "./dist/esm/providers/s3/utils/validateStorageOperationInput.mjs");
/* harmony import */ var _utils_constants_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../utils/constants.mjs */ "./dist/esm/providers/s3/utils/constants.mjs");
/* harmony import */ var _utils_client_s3data_putObject_mjs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../utils/client/s3data/putObject.mjs */ "./dist/esm/providers/s3/utils/client/s3data/putObject.mjs");
/* harmony import */ var _utils_userAgent_mjs__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../utils/userAgent.mjs */ "./dist/esm/providers/s3/utils/userAgent.mjs");
/* harmony import */ var _utils_crc32_mjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../utils/crc32.mjs */ "./dist/esm/providers/s3/utils/crc32.mjs");
/* harmony import */ var _utils_constructContentDisposition_mjs__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../utils/constructContentDisposition.mjs */ "./dist/esm/providers/s3/utils/constructContentDisposition.mjs");

























// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
/**
 * Get a function the returns a promise to call putObject API to S3.
 *
 * @internal
 */
const putObjectJob = (uploadDataInput, abortSignal, totalLength) => async () => {
    const { options: uploadDataOptions, data } = uploadDataInput;
    const { bucket, keyPrefix, s3Config, isObjectLockEnabled, identityId } = await (0,_utils_resolveS3ConfigAndInput_mjs__WEBPACK_IMPORTED_MODULE_1__.resolveS3ConfigAndInput)(_aws_amplify_core__WEBPACK_IMPORTED_MODULE_0__.Amplify, uploadDataInput);
    const { inputType, objectKey } = (0,_utils_validateStorageOperationInput_mjs__WEBPACK_IMPORTED_MODULE_2__.validateStorageOperationInput)(uploadDataInput, identityId);
    (0,_utils_validateBucketOwnerID_mjs__WEBPACK_IMPORTED_MODULE_3__.validateBucketOwnerID)(uploadDataOptions?.expectedBucketOwner);
    const finalKey = inputType === _utils_constants_mjs__WEBPACK_IMPORTED_MODULE_4__.STORAGE_INPUT_KEY ? keyPrefix + objectKey : objectKey;
    const { contentDisposition, contentEncoding, contentType = 'application/octet-stream', preventOverwrite, metadata, checksumAlgorithm, onProgress, expectedBucketOwner, } = uploadDataOptions ?? {};
    const checksumCRC32 = checksumAlgorithm === _utils_constants_mjs__WEBPACK_IMPORTED_MODULE_4__.CHECKSUM_ALGORITHM_CRC32
        ? await (0,_utils_crc32_mjs__WEBPACK_IMPORTED_MODULE_5__.calculateContentCRC32)(data)
        : undefined;
    const contentMD5 = 
    // check if checksum exists. ex: should not exist in react native
    !checksumCRC32 && isObjectLockEnabled
        ? await (0,_utils_md5_mjs__WEBPACK_IMPORTED_MODULE_6__.calculateContentMd5)(data)
        : undefined;
    const { ETag: eTag, VersionId: versionId } = await (0,_utils_client_s3data_putObject_mjs__WEBPACK_IMPORTED_MODULE_7__.putObject)({
        ...s3Config,
        abortSignal,
        onUploadProgress: onProgress,
        userAgentValue: (0,_utils_userAgent_mjs__WEBPACK_IMPORTED_MODULE_8__.getStorageUserAgentValue)(_aws_amplify_core_internals_utils__WEBPACK_IMPORTED_MODULE_9__.StorageAction.UploadData),
    }, {
        Bucket: bucket,
        Key: finalKey,
        Body: data,
        ContentType: contentType,
        ContentDisposition: (0,_utils_constructContentDisposition_mjs__WEBPACK_IMPORTED_MODULE_10__.constructContentDisposition)(contentDisposition),
        ContentEncoding: contentEncoding,
        Metadata: metadata,
        ContentMD5: contentMD5,
        ChecksumCRC32: checksumCRC32?.checksum,
        ExpectedBucketOwner: expectedBucketOwner,
        IfNoneMatch: preventOverwrite ? '*' : undefined,
    });
    const result = {
        eTag,
        versionId,
        contentType,
        metadata,
        size: totalLength,
    };
    return inputType === _utils_constants_mjs__WEBPACK_IMPORTED_MODULE_4__.STORAGE_INPUT_KEY
        ? { key: objectKey, ...result }
        : { path: objectKey, ...result };
};


//# sourceMappingURL=putObjectJob.mjs.map


/***/ }),

/***/ "./dist/esm/providers/s3/apis/list.mjs":
/*!*********************************************!*\
  !*** ./dist/esm/providers/s3/apis/list.mjs ***!
  \*********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   list: () => (/* binding */ list)
/* harmony export */ });
/* harmony import */ var _aws_amplify_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @aws-amplify/core */ "@aws-amplify/core");
/* harmony import */ var _internal_list_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/list.mjs */ "./dist/esm/providers/s3/apis/internal/list.mjs");



// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
function list(input) {
    return (0,_internal_list_mjs__WEBPACK_IMPORTED_MODULE_1__.list)(_aws_amplify_core__WEBPACK_IMPORTED_MODULE_0__.Amplify, input ?? {});
}


//# sourceMappingURL=list.mjs.map


/***/ }),

/***/ "./dist/esm/providers/s3/apis/remove.mjs":
/*!***********************************************!*\
  !*** ./dist/esm/providers/s3/apis/remove.mjs ***!
  \***********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   remove: () => (/* binding */ remove)
/* harmony export */ });
/* harmony import */ var _aws_amplify_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @aws-amplify/core */ "@aws-amplify/core");
/* harmony import */ var _internal_remove_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/remove.mjs */ "./dist/esm/providers/s3/apis/internal/remove.mjs");



// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
function remove(input) {
    return (0,_internal_remove_mjs__WEBPACK_IMPORTED_MODULE_1__.remove)(_aws_amplify_core__WEBPACK_IMPORTED_MODULE_0__.Amplify, input);
}


//# sourceMappingURL=remove.mjs.map


/***/ }),

/***/ "./dist/esm/providers/s3/apis/uploadData.mjs":
/*!***************************************************!*\
  !*** ./dist/esm/providers/s3/apis/uploadData.mjs ***!
  \***************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   uploadData: () => (/* binding */ uploadData)
/* harmony export */ });
/* harmony import */ var _aws_amplify_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @aws-amplify/core */ "@aws-amplify/core");
/* harmony import */ var _internal_uploadData_index_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/uploadData/index.mjs */ "./dist/esm/providers/s3/apis/internal/uploadData/index.mjs");



// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
function uploadData(input) {
    return (0,_internal_uploadData_index_mjs__WEBPACK_IMPORTED_MODULE_1__.uploadData)({
        ...input,
        options: {
            ...input?.options,
            // This option enables caching in-progress multipart uploads.
            // It's ONLY needed for client-side API.
            resumableUploadsCache: _aws_amplify_core__WEBPACK_IMPORTED_MODULE_0__.defaultStorage,
        },
    });
}


//# sourceMappingURL=uploadData.mjs.map


/***/ }),

/***/ "./dist/esm/providers/s3/utils/client/runtime/base64/index.browser.mjs":
/*!*****************************************************************************!*\
  !*** ./dist/esm/providers/s3/utils/client/runtime/base64/index.browser.mjs ***!
  \*****************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   toBase64: () => (/* binding */ toBase64)
/* harmony export */ });
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
function bytesToBase64(bytes) {
    const base64Str = Array.from(bytes, x => String.fromCodePoint(x)).join('');
    return btoa(base64Str);
}
function toBase64(input) {
    if (typeof input === 'string') {
        return bytesToBase64(new TextEncoder().encode(input));
    }
    return bytesToBase64(new Uint8Array(input.buffer, input.byteOffset, input.byteLength));
}


//# sourceMappingURL=index.browser.mjs.map


/***/ }),

/***/ "./dist/esm/providers/s3/utils/client/runtime/constants.mjs":
/*!******************************************************************!*\
  !*** ./dist/esm/providers/s3/utils/client/runtime/constants.mjs ***!
  \******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ABORT_ERROR_CODE: () => (/* binding */ ABORT_ERROR_CODE),
/* harmony export */   ABORT_ERROR_MESSAGE: () => (/* binding */ ABORT_ERROR_MESSAGE),
/* harmony export */   CANCELED_ERROR_CODE: () => (/* binding */ CANCELED_ERROR_CODE),
/* harmony export */   CANCELED_ERROR_MESSAGE: () => (/* binding */ CANCELED_ERROR_MESSAGE),
/* harmony export */   CONTENT_SHA256_HEADER: () => (/* binding */ CONTENT_SHA256_HEADER),
/* harmony export */   NETWORK_ERROR_CODE: () => (/* binding */ NETWORK_ERROR_CODE),
/* harmony export */   NETWORK_ERROR_MESSAGE: () => (/* binding */ NETWORK_ERROR_MESSAGE),
/* harmony export */   SEND_DOWNLOAD_PROGRESS_EVENT: () => (/* binding */ SEND_DOWNLOAD_PROGRESS_EVENT),
/* harmony export */   SEND_UPLOAD_PROGRESS_EVENT: () => (/* binding */ SEND_UPLOAD_PROGRESS_EVENT)
/* harmony export */ });
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
const SEND_UPLOAD_PROGRESS_EVENT = 'sendUploadProgress';
const SEND_DOWNLOAD_PROGRESS_EVENT = 'sendDownloadProgress';
const NETWORK_ERROR_MESSAGE = 'Network Error';
const NETWORK_ERROR_CODE = 'ERR_NETWORK';
const ABORT_ERROR_MESSAGE = 'Request aborted';
const ABORT_ERROR_CODE = 'ERR_ABORTED';
const CANCELED_ERROR_MESSAGE = 'canceled';
const CANCELED_ERROR_CODE = 'ERR_CANCELED';
const CONTENT_SHA256_HEADER = 'x-amz-content-sha256';


//# sourceMappingURL=constants.mjs.map


/***/ }),

/***/ "./dist/esm/providers/s3/utils/client/runtime/contentSha256middleware.mjs":
/*!********************************************************************************!*\
  !*** ./dist/esm/providers/s3/utils/client/runtime/contentSha256middleware.mjs ***!
  \********************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   contentSha256MiddlewareFactory: () => (/* binding */ contentSha256MiddlewareFactory)
/* harmony export */ });
/* harmony import */ var _aws_amplify_core_internals_aws_client_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @aws-amplify/core/internals/aws-client-utils */ "../core/dist/esm/clients/middleware/signing/signer/signatureV4/utils/getHashedPayload.mjs");
/* harmony import */ var _constants_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants.mjs */ "./dist/esm/providers/s3/utils/client/runtime/constants.mjs");



// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
/**
 * A middleware that adds the x-amz-content-sha256 header to the request if it is not already present.
 * It's required for S3 requests in browsers where the request body is sent in 1 chunk.
 * @see https://docs.aws.amazon.com/AmazonS3/latest/API/sig-v4-header-based-auth.html
 *
 * @internal
 */
const contentSha256MiddlewareFactory = () => (next) => async function contentSha256Middleware(request) {
    if (request.headers[_constants_mjs__WEBPACK_IMPORTED_MODULE_0__.CONTENT_SHA256_HEADER]) {
        return next(request);
    }
    else {
        const hash = await (0,_aws_amplify_core_internals_aws_client_utils__WEBPACK_IMPORTED_MODULE_1__.getHashedPayload)(request.body);
        request.headers[_constants_mjs__WEBPACK_IMPORTED_MODULE_0__.CONTENT_SHA256_HEADER] = hash;
        return next(request);
    }
};


//# sourceMappingURL=contentSha256middleware.mjs.map


/***/ }),

/***/ "./dist/esm/providers/s3/utils/client/runtime/s3TransferHandler/xhr.mjs":
/*!******************************************************************************!*\
  !*** ./dist/esm/providers/s3/utils/client/runtime/s3TransferHandler/xhr.mjs ***!
  \******************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   s3TransferHandler: () => (/* binding */ s3TransferHandler)
/* harmony export */ });
/* harmony import */ var _aws_amplify_core_internals_aws_client_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @aws-amplify/core/internals/aws-client-utils */ "../core/dist/esm/clients/middleware/userAgent/middleware.mjs");
/* harmony import */ var _aws_amplify_core_internals_aws_client_utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @aws-amplify/core/internals/aws-client-utils */ "../core/dist/esm/clients/middleware/retry/middleware.mjs");
/* harmony import */ var _aws_amplify_core_internals_aws_client_utils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @aws-amplify/core/internals/aws-client-utils */ "../core/dist/esm/clients/middleware/signing/middleware.mjs");
/* harmony import */ var _aws_amplify_core_internals_aws_client_utils_composers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @aws-amplify/core/internals/aws-client-utils/composers */ "../core/dist/esm/clients/internal/composeTransferHandler.mjs");
/* harmony import */ var _contentSha256middleware_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../contentSha256middleware.mjs */ "./dist/esm/providers/s3/utils/client/runtime/contentSha256middleware.mjs");
/* harmony import */ var _xhrTransferHandler_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../xhrTransferHandler.mjs */ "./dist/esm/providers/s3/utils/client/runtime/xhrTransferHandler.mjs");





// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
/**
 * S3 transfer handler for browser and React Native based on XHR. On top of basic transfer handler, it also supports
 * x-amz-content-sha256 header, and request&response process tracking.
 *
 * @internal
 */
const s3TransferHandler = (0,_aws_amplify_core_internals_aws_client_utils_composers__WEBPACK_IMPORTED_MODULE_0__.composeTransferHandler)(_xhrTransferHandler_mjs__WEBPACK_IMPORTED_MODULE_1__.xhrTransferHandler, [
    _contentSha256middleware_mjs__WEBPACK_IMPORTED_MODULE_2__.contentSha256MiddlewareFactory,
    _aws_amplify_core_internals_aws_client_utils__WEBPACK_IMPORTED_MODULE_3__.userAgentMiddlewareFactory,
    _aws_amplify_core_internals_aws_client_utils__WEBPACK_IMPORTED_MODULE_4__.retryMiddlewareFactory,
    _aws_amplify_core_internals_aws_client_utils__WEBPACK_IMPORTED_MODULE_5__.signingMiddlewareFactory,
]);


//# sourceMappingURL=xhr.mjs.map


/***/ }),

/***/ "./dist/esm/providers/s3/utils/client/runtime/xhrTransferHandler.mjs":
/*!***************************************************************************!*\
  !*** ./dist/esm/providers/s3/utils/client/runtime/xhrTransferHandler.mjs ***!
  \***************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   xhrTransferHandler: () => (/* binding */ xhrTransferHandler)
/* harmony export */ });
/* harmony import */ var _aws_amplify_core_internals_aws_client_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @aws-amplify/core/internals/aws-client-utils */ "../core/dist/esm/clients/utils/memoization.mjs");
/* harmony import */ var _aws_amplify_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @aws-amplify/core */ "@aws-amplify/core");
/* harmony import */ var _errors_CanceledError_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../../errors/CanceledError.mjs */ "./dist/esm/errors/CanceledError.mjs");
/* harmony import */ var _errors_StorageError_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../../errors/StorageError.mjs */ "./dist/esm/errors/StorageError.mjs");
/* harmony import */ var _constants_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./constants.mjs */ "./dist/esm/providers/s3/utils/client/runtime/constants.mjs");






// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
const logger = new _aws_amplify_core__WEBPACK_IMPORTED_MODULE_0__.ConsoleLogger('xhr-http-handler');
/**
 * Base transfer handler implementation using XMLHttpRequest to support upload and download progress events.
 *
 * @param request - The request object.
 * @param options - The request options.
 * @returns A promise that will be resolved with the response object.
 *
 * @internal
 */
const xhrTransferHandler = (request, options) => {
    const { url, method, headers, body } = request;
    const { onDownloadProgress, onUploadProgress, responseType, abortSignal } = options;
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        xhr.open(method.toUpperCase(), url.toString());
        Object.entries(headers)
            .filter(([header]) => !FORBIDDEN_HEADERS.includes(header))
            .forEach(([header, value]) => {
            xhr.setRequestHeader(header, value);
        });
        xhr.responseType = responseType;
        if (onDownloadProgress) {
            xhr.addEventListener('progress', event => {
                onDownloadProgress(convertToTransferProgressEvent(event));
                logger.debug(event);
            });
        }
        if (onUploadProgress) {
            xhr.upload.addEventListener('progress', event => {
                onUploadProgress(convertToTransferProgressEvent(event));
                logger.debug(event);
            });
        }
        xhr.addEventListener('error', () => {
            const networkError = new _errors_StorageError_mjs__WEBPACK_IMPORTED_MODULE_1__.StorageError({
                message: _constants_mjs__WEBPACK_IMPORTED_MODULE_2__.NETWORK_ERROR_MESSAGE,
                name: _constants_mjs__WEBPACK_IMPORTED_MODULE_2__.NETWORK_ERROR_CODE,
            });
            logger.error(_constants_mjs__WEBPACK_IMPORTED_MODULE_2__.NETWORK_ERROR_MESSAGE);
            reject(networkError);
            xhr = null; // clean up request
        });
        // Handle browser request cancellation (as opposed to a manual cancellation)
        xhr.addEventListener('abort', () => {
            // The abort event can be triggered after the error or load event. So we need to check if the xhr is null.
            // When request is aborted by AbortSignal, the promise is rejected in the abortSignal's 'abort' event listener.
            if (!xhr || abortSignal?.aborted)
                return;
            // Handle abort request caused by browser instead of AbortController
            // see: https://github.com/axios/axios/issues/537
            const error = buildHandlerError(_constants_mjs__WEBPACK_IMPORTED_MODULE_2__.ABORT_ERROR_MESSAGE, _constants_mjs__WEBPACK_IMPORTED_MODULE_2__.ABORT_ERROR_CODE);
            logger.error(_constants_mjs__WEBPACK_IMPORTED_MODULE_2__.ABORT_ERROR_MESSAGE);
            reject(error);
            xhr = null; // clean up request
        });
        // Skip handling timeout error since we don't have a timeout
        xhr.addEventListener('readystatechange', () => {
            if (!xhr || xhr.readyState !== xhr.DONE) {
                return;
            }
            const onloadend = () => {
                // The load event is triggered after the error/abort/load event. So we need to check if the xhr is null.
                if (!xhr)
                    return;
                const responseHeaders = convertResponseHeaders(xhr.getAllResponseHeaders());
                const { responseType: loadEndResponseType } = xhr;
                const responseBlob = xhr.response;
                const responseText = loadEndResponseType === 'text' ? xhr.responseText : '';
                const bodyMixIn = {
                    blob: () => Promise.resolve(responseBlob),
                    text: (0,_aws_amplify_core_internals_aws_client_utils__WEBPACK_IMPORTED_MODULE_3__.withMemoization)(() => loadEndResponseType === 'blob'
                        ? readBlobAsText(responseBlob)
                        : Promise.resolve(responseText)),
                    json: () => Promise.reject(
                    // S3 does not support JSON response. So fail-fast here with nicer error message.
                    new Error('Parsing response to JSON is not implemented. Please use response.text() instead.')),
                };
                const response = {
                    statusCode: xhr.status,
                    headers: responseHeaders,
                    // The xhr.responseType is only set to 'blob' for streaming binary S3 object data. The streaming data is
                    // exposed via public interface of Storage.get(). So we need to return the response as a Blob object for
                    // backward compatibility. In other cases, the response payload is only used internally, we return it is
                    // {@link ResponseBodyMixin}
                    body: (xhr.responseType === 'blob'
                        ? Object.assign(responseBlob, bodyMixIn)
                        : bodyMixIn),
                };
                resolve(response);
                xhr = null; // clean up request
            };
            // readystate handler is calling before onerror or ontimeout handlers,
            // so we should call onloadend on the next 'tick'
            // @see https://github.com/axios/axios/blob/9588fcdec8aca45c3ba2f7968988a5d03f23168c/lib/adapters/xhr.js#L98-L99
            setTimeout(onloadend);
        });
        if (abortSignal) {
            const onCanceled = () => {
                // The abort event is triggered after the error or load event. So we need to check if the xhr is null.
                if (!xhr) {
                    return;
                }
                const canceledError = new _errors_CanceledError_mjs__WEBPACK_IMPORTED_MODULE_4__.CanceledError({
                    name: _constants_mjs__WEBPACK_IMPORTED_MODULE_2__.CANCELED_ERROR_CODE,
                    message: _constants_mjs__WEBPACK_IMPORTED_MODULE_2__.CANCELED_ERROR_MESSAGE,
                });
                reject(canceledError);
                xhr.abort();
                xhr = null;
            };
            abortSignal.aborted
                ? onCanceled()
                : abortSignal.addEventListener('abort', onCanceled);
        }
        if (typeof ReadableStream === 'function' &&
            body instanceof ReadableStream) {
            // This does not matter as previous implementation uses Axios which does not support ReadableStream anyway.
            throw new Error('ReadableStream request payload is not supported.');
        }
        xhr.send(body ?? null);
    });
};
const convertToTransferProgressEvent = (event) => ({
    transferredBytes: event.loaded,
    totalBytes: event.lengthComputable ? event.total : undefined,
});
const buildHandlerError = (message, name) => {
    const error = new Error(message);
    error.name = name;
    return error;
};
/**
 * Convert xhr.getAllResponseHeaders() string to a Record<string, string>. Note that modern browser already returns
 * header names in lowercase.
 * @param xhrHeaders - string of headers returned from xhr.getAllResponseHeaders()
 */
const convertResponseHeaders = (xhrHeaders) => {
    if (!xhrHeaders) {
        return {};
    }
    return xhrHeaders
        .split('\r\n')
        .reduce((headerMap, line) => {
        const parts = line.split(': ');
        const header = parts.shift();
        const value = parts.join(': ');
        headerMap[header.toLowerCase()] = value;
        return headerMap;
    }, {});
};
const readBlobAsText = (blob) => {
    const reader = new FileReader();
    return new Promise((resolve, reject) => {
        reader.onloadend = () => {
            if (reader.readyState !== FileReader.DONE) {
                return;
            }
            resolve(reader.result);
        };
        reader.onerror = () => {
            reject(reader.error);
        };
        reader.readAsText(blob);
    });
};
// To add more forbidden headers as found set by S3. Intentionally NOT list all of them here to save bundle size.
// https://developer.mozilla.org/en-US/docs/Glossary/Forbidden_header_name
const FORBIDDEN_HEADERS = ['host'];


//# sourceMappingURL=xhrTransferHandler.mjs.map


/***/ }),

/***/ "./dist/esm/providers/s3/utils/client/runtime/xmlParser/dom.mjs":
/*!**********************************************************************!*\
  !*** ./dist/esm/providers/s3/utils/client/runtime/xmlParser/dom.mjs ***!
  \**********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   parser: () => (/* binding */ parser)
/* harmony export */ });
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
/**
 * Drop-in replacement for fast-xml-parser's XmlParser class used in the AWS SDK S3 client XML deserializer. This
 * implementation is not tested against the full xml conformance test suite. It is only tested against the XML responses
 * from S3. This implementation requires the `DOMParser` class in the runtime.
 */
const parser = {
    parse: (xmlStr) => {
        const domParser = new DOMParser();
        const xml = domParser.parseFromString(xmlStr, 'text/xml');
        const parsedObj = parseXmlNode(xml);
        const rootKey = Object.keys(parsedObj)[0];
        return parsedObj[rootKey];
    },
};
const parseXmlNode = (node) => {
    if (isDocumentNode(node)) {
        return {
            [node.documentElement.nodeName]: parseXmlNode(node.documentElement),
        };
    }
    if (node.nodeType === Node.TEXT_NODE) {
        return node.nodeValue?.trim();
    }
    if (isElementNode(node)) {
        // Node like <Location>foo</Location> will be converted to { Location: 'foo' }
        // instead of { Location: { '#text': 'foo' } }.
        if (isTextOnlyElementNode(node)) {
            return node.childNodes[0].nodeValue;
        }
        const nodeValue = {};
        // convert attributes
        for (const attr of node.attributes) {
            if (!isNamespaceAttributeName(attr.nodeName)) {
                nodeValue[attr.nodeName] = attr.nodeValue;
            }
        }
        // convert child nodes
        if (node.children.length > 0) {
            for (const child of node.children) {
                const childValue = parseXmlNode(child);
                if (childValue === undefined) {
                    continue;
                }
                const childName = child.nodeName;
                if (nodeValue[childName] === undefined) {
                    nodeValue[childName] = childValue;
                }
                else if (Array.isArray(nodeValue[childName])) {
                    nodeValue[childName].push(childValue);
                }
                else {
                    nodeValue[childName] = [nodeValue[childName], childValue];
                }
            }
        }
        // Return empty element node as empty string instead of `{}`, which is the default behavior of fast-xml-parser.
        return Object.keys(nodeValue).length === 0 ? '' : nodeValue;
    }
};
const isElementNode = (node) => node.nodeType === Node.ELEMENT_NODE;
const isDocumentNode = (node) => node.nodeType === Node.DOCUMENT_NODE;
const isTextOnlyElementNode = (node) => hasOnlyNamespaceAttributes(node) &&
    node.children.length === 0 &&
    node.firstChild?.nodeType === Node.TEXT_NODE;
const hasOnlyNamespaceAttributes = (node) => {
    for (const attr of node.attributes) {
        if (!isNamespaceAttributeName(attr.nodeName)) {
            return false;
        }
    }
    return true;
};
const isNamespaceAttributeName = (name) => name === 'xmlns' || name.startsWith('xmlns:');


//# sourceMappingURL=dom.mjs.map


/***/ }),

/***/ "./dist/esm/providers/s3/utils/client/s3data/abortMultipartUpload.mjs":
/*!****************************************************************************!*\
  !*** ./dist/esm/providers/s3/utils/client/s3data/abortMultipartUpload.mjs ***!
  \****************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   abortMultipartUpload: () => (/* binding */ abortMultipartUpload)
/* harmony export */ });
/* harmony import */ var _aws_amplify_core_internals_aws_client_utils__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @aws-amplify/core/internals/aws-client-utils */ "../core/dist/esm/clients/serde/responseInfo.mjs");
/* harmony import */ var _aws_amplify_core_internals_aws_client_utils_composers__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @aws-amplify/core/internals/aws-client-utils/composers */ "../core/dist/esm/clients/internal/composeServiceApi.mjs");
/* harmony import */ var _aws_amplify_core_internals_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @aws-amplify/core/internals/utils */ "../core/dist/esm/utils/amplifyUrl/index.mjs");
/* harmony import */ var _runtime_s3TransferHandler_fetch_mjs__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../runtime/s3TransferHandler/fetch.mjs */ "./dist/esm/providers/s3/utils/client/runtime/s3TransferHandler/xhr.mjs");
/* harmony import */ var fast_xml_parser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! fast-xml-parser */ "?2abf");
/* harmony import */ var buffer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! buffer */ "?46b7");
/* harmony import */ var _utils_deserializeHelpers_mjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../utils/deserializeHelpers.mjs */ "./dist/esm/providers/s3/utils/client/utils/deserializeHelpers.mjs");
/* harmony import */ var _utils_serializeHelpers_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/serializeHelpers.mjs */ "./dist/esm/providers/s3/utils/client/utils/serializeHelpers.mjs");
/* harmony import */ var _validateObjectUrl_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../validateObjectUrl.mjs */ "./dist/esm/providers/s3/utils/validateObjectUrl.mjs");
/* harmony import */ var _base_mjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./base.mjs */ "./dist/esm/providers/s3/utils/client/s3data/base.mjs");












// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
const abortMultipartUploadSerializer = (input, endpoint) => {
    const url = new _aws_amplify_core_internals_utils__WEBPACK_IMPORTED_MODULE_2__.AmplifyUrl(endpoint.url.toString());
    (0,_utils_serializeHelpers_mjs__WEBPACK_IMPORTED_MODULE_3__.validateS3RequiredParameter)(!!input.Key, 'Key');
    url.pathname = (0,_utils_serializeHelpers_mjs__WEBPACK_IMPORTED_MODULE_3__.serializePathnameObjectKey)(url, input.Key);
    (0,_utils_serializeHelpers_mjs__WEBPACK_IMPORTED_MODULE_3__.validateS3RequiredParameter)(!!input.UploadId, 'UploadId');
    url.search = new _aws_amplify_core_internals_utils__WEBPACK_IMPORTED_MODULE_2__.AmplifyUrlSearchParams({
        uploadId: input.UploadId,
    }).toString();
    (0,_validateObjectUrl_mjs__WEBPACK_IMPORTED_MODULE_4__.validateObjectUrl)({
        bucketName: input.Bucket,
        key: input.Key,
        objectURL: url,
    });
    const headers = {
        ...(0,_utils_serializeHelpers_mjs__WEBPACK_IMPORTED_MODULE_3__.assignStringVariables)({
            'x-amz-expected-bucket-owner': input.ExpectedBucketOwner,
        }),
    };
    return {
        method: 'DELETE',
        headers,
        url,
    };
};
const abortMultipartUploadDeserializer = async (response) => {
    if (response.statusCode >= 300) {
        const error = (await (0,_base_mjs__WEBPACK_IMPORTED_MODULE_5__.parseXmlError)(response));
        throw (0,_utils_deserializeHelpers_mjs__WEBPACK_IMPORTED_MODULE_6__.buildStorageServiceError)(error, response.statusCode);
    }
    else {
        return {
            $metadata: (0,_aws_amplify_core_internals_aws_client_utils__WEBPACK_IMPORTED_MODULE_7__.parseMetadata)(response),
        };
    }
};
const abortMultipartUpload = (0,_aws_amplify_core_internals_aws_client_utils_composers__WEBPACK_IMPORTED_MODULE_8__.composeServiceApi)(_runtime_s3TransferHandler_fetch_mjs__WEBPACK_IMPORTED_MODULE_9__.s3TransferHandler, abortMultipartUploadSerializer, abortMultipartUploadDeserializer, { ..._base_mjs__WEBPACK_IMPORTED_MODULE_5__.defaultConfig, responseType: 'text' });


//# sourceMappingURL=abortMultipartUpload.mjs.map


/***/ }),

/***/ "./dist/esm/providers/s3/utils/client/s3data/base.mjs":
/*!************************************************************!*\
  !*** ./dist/esm/providers/s3/utils/client/s3data/base.mjs ***!
  \************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SERVICE_NAME: () => (/* binding */ SERVICE_NAME),
/* harmony export */   defaultConfig: () => (/* binding */ defaultConfig),
/* harmony export */   isDnsCompatibleBucketName: () => (/* binding */ isDnsCompatibleBucketName),
/* harmony export */   parseXmlError: () => (/* binding */ parseXmlError),
/* harmony export */   retryDecider: () => (/* binding */ retryDecider)
/* harmony export */ });
/* harmony import */ var _aws_amplify_core_internals_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @aws-amplify/core/internals/utils */ "../core/dist/esm/utils/amplifyUrl/index.mjs");
/* harmony import */ var _aws_amplify_core_internals_utils__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @aws-amplify/core/internals/utils */ "../core/dist/esm/Platform/index.mjs");
/* harmony import */ var _aws_amplify_core_internals_aws_client_utils__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @aws-amplify/core/internals/aws-client-utils */ "../core/dist/esm/clients/endpoints/getDnsSuffix.mjs");
/* harmony import */ var _aws_amplify_core_internals_aws_client_utils__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @aws-amplify/core/internals/aws-client-utils */ "../core/dist/esm/clients/middleware/retry/jitteredBackoff.mjs");
/* harmony import */ var _utils_parsePayload_mjs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../utils/parsePayload.mjs */ "./dist/esm/providers/s3/utils/client/utils/parsePayload.mjs");
/* harmony import */ var fast_xml_parser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! fast-xml-parser */ "?2abf");
/* harmony import */ var buffer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! buffer */ "?46b7");
/* harmony import */ var _utils_createRetryDecider_mjs__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../utils/createRetryDecider.mjs */ "./dist/esm/providers/s3/utils/client/utils/createRetryDecider.mjs");
/* harmony import */ var _constants_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../constants.mjs */ "./dist/esm/providers/s3/utils/constants.mjs");
/* harmony import */ var _errors_utils_assertValidationError_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../../errors/utils/assertValidationError.mjs */ "./dist/esm/errors/utils/assertValidationError.mjs");
/* harmony import */ var _errors_types_validation_mjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../../errors/types/validation.mjs */ "./dist/esm/errors/types/validation.mjs");












// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
const DOMAIN_PATTERN = /^[a-z0-9][a-z0-9.-]{1,61}[a-z0-9]$/;
const IP_ADDRESS_PATTERN = /(\d+\.){3}\d+/;
const DOTS_PATTERN = /\.\./;
/**
 * The service name used to sign requests if the API requires authentication.
 */
const SERVICE_NAME = 's3';
/**
 * The endpoint resolver function that returns the endpoint URL for a given region, and input parameters.
 */
const endpointResolver = (options, apiInput) => {
    const { region, useAccelerateEndpoint, customEndpoint, forcePathStyle } = options;
    let endpoint;
    // 1. get base endpoint
    if (customEndpoint) {
        if (customEndpoint === _constants_mjs__WEBPACK_IMPORTED_MODULE_2__.LOCAL_TESTING_S3_ENDPOINT) {
            endpoint = new _aws_amplify_core_internals_utils__WEBPACK_IMPORTED_MODULE_3__.AmplifyUrl(customEndpoint);
        }
        (0,_errors_utils_assertValidationError_mjs__WEBPACK_IMPORTED_MODULE_4__.assertValidationError)(!customEndpoint.includes('://'), _errors_types_validation_mjs__WEBPACK_IMPORTED_MODULE_5__.StorageValidationErrorCode.InvalidCustomEndpoint);
        endpoint = new _aws_amplify_core_internals_utils__WEBPACK_IMPORTED_MODULE_3__.AmplifyUrl(`http://${customEndpoint}`);
    }
    else if (useAccelerateEndpoint) {
        // this ErrorCode isn't expose yet since forcePathStyle param isn't publicly exposed
        (0,_errors_utils_assertValidationError_mjs__WEBPACK_IMPORTED_MODULE_4__.assertValidationError)(!forcePathStyle, _errors_types_validation_mjs__WEBPACK_IMPORTED_MODULE_5__.StorageValidationErrorCode.ForcePathStyleEndpointNotSupported);
        endpoint = new _aws_amplify_core_internals_utils__WEBPACK_IMPORTED_MODULE_3__.AmplifyUrl(`https://s3-accelerate.${(0,_aws_amplify_core_internals_aws_client_utils__WEBPACK_IMPORTED_MODULE_6__.getDnsSuffix)(region)}`);
    }
    else {
        endpoint = new _aws_amplify_core_internals_utils__WEBPACK_IMPORTED_MODULE_3__.AmplifyUrl(`https://s3.${region}.${(0,_aws_amplify_core_internals_aws_client_utils__WEBPACK_IMPORTED_MODULE_6__.getDnsSuffix)(region)}`);
    }
    // 2. inject bucket name
    if (apiInput?.Bucket) {
        (0,_errors_utils_assertValidationError_mjs__WEBPACK_IMPORTED_MODULE_4__.assertValidationError)(isDnsCompatibleBucketName(apiInput.Bucket), _errors_types_validation_mjs__WEBPACK_IMPORTED_MODULE_5__.StorageValidationErrorCode.DnsIncompatibleBucketName);
        if (forcePathStyle || apiInput.Bucket.includes('.')) {
            endpoint.pathname = `/${apiInput.Bucket}`;
        }
        else {
            endpoint.host = `${apiInput.Bucket}.${endpoint.host}`;
        }
    }
    return { url: endpoint };
};
/**
 * Determines whether a given string is DNS compliant per the rules outlined by
 * S3. Length, capitaization, and leading dot restrictions are enforced by the
 * DOMAIN_PATTERN regular expression.
 * @internal
 *
 * @see https://github.com/aws/aws-sdk-js-v3/blob/f2da6182298d4d6b02e84fb723492c07c27469a8/packages/middleware-bucket-endpoint/src/bucketHostnameUtils.ts#L39-L48
 * @see https://docs.aws.amazon.com/AmazonS3/latest/dev/BucketRestrictions.html
 */
const isDnsCompatibleBucketName = (bucketName) => DOMAIN_PATTERN.test(bucketName) &&
    !IP_ADDRESS_PATTERN.test(bucketName) &&
    !DOTS_PATTERN.test(bucketName);
/**
 * Error parser for the XML payload of S3 data plane error response. The error's
 * `Code` and `Message` locates directly at the XML root element.
 *
 * @example
 * ```
 * <?xml version="1.0" encoding="UTF-8"?>
 * 	<Error>
 * 		<Code>NoSuchKey</Code>
 * 		<Message>The resource you requested does not exist</Message>
 * 		<Resource>/mybucket/myfoto.jpg</Resource>
 * 		<RequestId>4442587FB7D0A2F9</RequestId>
 * 	</Error>
 * 	```
 *
 * @internal
 */
const parseXmlError = (0,_utils_parsePayload_mjs__WEBPACK_IMPORTED_MODULE_7__.createXmlErrorParser)({ noErrorWrapping: true });
/**
 * @internal
 */
const retryDecider = (0,_utils_createRetryDecider_mjs__WEBPACK_IMPORTED_MODULE_8__.createRetryDecider)(parseXmlError);
/**
 * @internal
 */
const defaultConfig = {
    service: SERVICE_NAME,
    endpointResolver,
    retryDecider,
    computeDelay: _aws_amplify_core_internals_aws_client_utils__WEBPACK_IMPORTED_MODULE_9__.jitteredBackoff,
    userAgentValue: (0,_aws_amplify_core_internals_utils__WEBPACK_IMPORTED_MODULE_10__.getAmplifyUserAgent)(),
    useAccelerateEndpoint: false,
    uriEscapePath: false, // Required by S3. See https://github.com/aws/aws-sdk-js-v3/blob/9ba012dfa3a3429aa2db0f90b3b0b3a7a31f9bc3/packages/signature-v4/src/SignatureV4.ts#L76-L83
};


//# sourceMappingURL=base.mjs.map


/***/ }),

/***/ "./dist/esm/providers/s3/utils/client/s3data/completeMultipartUpload.mjs":
/*!*******************************************************************************!*\
  !*** ./dist/esm/providers/s3/utils/client/s3data/completeMultipartUpload.mjs ***!
  \*******************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   completeMultipartUpload: () => (/* binding */ completeMultipartUpload)
/* harmony export */ });
/* harmony import */ var _aws_amplify_core_internals_aws_client_utils__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @aws-amplify/core/internals/aws-client-utils */ "../core/dist/esm/clients/serde/responseInfo.mjs");
/* harmony import */ var _aws_amplify_core_internals_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @aws-amplify/core/internals/utils */ "../core/dist/esm/utils/amplifyUrl/index.mjs");
/* harmony import */ var _aws_amplify_core_internals_aws_client_utils_composers__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @aws-amplify/core/internals/aws-client-utils/composers */ "../core/dist/esm/clients/internal/composeServiceApi.mjs");
/* harmony import */ var _utils_parsePayload_mjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../utils/parsePayload.mjs */ "./dist/esm/providers/s3/utils/client/utils/parsePayload.mjs");
/* harmony import */ var _runtime_s3TransferHandler_fetch_mjs__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../runtime/s3TransferHandler/fetch.mjs */ "./dist/esm/providers/s3/utils/client/runtime/s3TransferHandler/xhr.mjs");
/* harmony import */ var fast_xml_parser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! fast-xml-parser */ "?2abf");
/* harmony import */ var buffer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! buffer */ "?46b7");
/* harmony import */ var _utils_deserializeHelpers_mjs__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../utils/deserializeHelpers.mjs */ "./dist/esm/providers/s3/utils/client/utils/deserializeHelpers.mjs");
/* harmony import */ var _utils_serializeHelpers_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/serializeHelpers.mjs */ "./dist/esm/providers/s3/utils/client/utils/serializeHelpers.mjs");
/* harmony import */ var _validateObjectUrl_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../validateObjectUrl.mjs */ "./dist/esm/providers/s3/utils/validateObjectUrl.mjs");
/* harmony import */ var _validateMultipartUploadXML_mjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../validateMultipartUploadXML.mjs */ "./dist/esm/providers/s3/utils/validateMultipartUploadXML.mjs");
/* harmony import */ var _base_mjs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./base.mjs */ "./dist/esm/providers/s3/utils/client/s3data/base.mjs");














// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
const INVALID_PARAMETER_ERROR_MSG = 'Invalid parameter for ComplteMultipartUpload API';
const completeMultipartUploadSerializer = async (input, endpoint) => {
    const headers = {
        'content-type': 'application/xml',
        ...(0,_utils_serializeHelpers_mjs__WEBPACK_IMPORTED_MODULE_2__.assignStringVariables)({
            'x-amz-checksum-crc32': input.ChecksumCRC32,
            'x-amz-expected-bucket-owner': input.ExpectedBucketOwner,
            'If-None-Match': input.IfNoneMatch,
        }),
    };
    const url = new _aws_amplify_core_internals_utils__WEBPACK_IMPORTED_MODULE_3__.AmplifyUrl(endpoint.url.toString());
    (0,_utils_serializeHelpers_mjs__WEBPACK_IMPORTED_MODULE_2__.validateS3RequiredParameter)(!!input.Key, 'Key');
    url.pathname = (0,_utils_serializeHelpers_mjs__WEBPACK_IMPORTED_MODULE_2__.serializePathnameObjectKey)(url, input.Key);
    (0,_utils_serializeHelpers_mjs__WEBPACK_IMPORTED_MODULE_2__.validateS3RequiredParameter)(!!input.UploadId, 'UploadId');
    url.search = new _aws_amplify_core_internals_utils__WEBPACK_IMPORTED_MODULE_3__.AmplifyUrlSearchParams({
        uploadId: input.UploadId,
    }).toString();
    (0,_utils_serializeHelpers_mjs__WEBPACK_IMPORTED_MODULE_2__.validateS3RequiredParameter)(!!input.MultipartUpload, 'MultipartUpload');
    (0,_validateObjectUrl_mjs__WEBPACK_IMPORTED_MODULE_4__.validateObjectUrl)({
        bucketName: input.Bucket,
        key: input.Key,
        objectURL: url,
    });
    const xml = serializeCompletedMultipartUpload(input.MultipartUpload);
    (0,_validateMultipartUploadXML_mjs__WEBPACK_IMPORTED_MODULE_5__.validateMultipartUploadXML)(input.MultipartUpload, xml);
    return {
        method: 'POST',
        headers,
        url,
        body: '<?xml version="1.0" encoding="UTF-8"?>' + xml,
    };
};
const serializeCompletedMultipartUpload = (input) => {
    if (!input.Parts?.length) {
        throw new Error(`${INVALID_PARAMETER_ERROR_MSG}: ${input}`);
    }
    return `<CompleteMultipartUpload xmlns="http://s3.amazonaws.com/doc/2006-03-01/">${input.Parts.map(serializeCompletedPartList).join('')}</CompleteMultipartUpload>`;
};
const serializeCompletedPartList = (input) => {
    if (!input.ETag || input.PartNumber == null) {
        throw new Error(`${INVALID_PARAMETER_ERROR_MSG}: ${input}`);
    }
    const eTag = `<ETag>${input.ETag}</ETag>`;
    const partNumber = `<PartNumber>${input.PartNumber}</PartNumber>`;
    const checksumCRC32 = input.ChecksumCRC32
        ? `<ChecksumCRC32>${input.ChecksumCRC32}</ChecksumCRC32>`
        : '';
    return `<Part>${eTag}${partNumber}${checksumCRC32}</Part>`;
};
/**
 * Parse CompleteMultipartUpload API response payload, which may be empty or error indicating internal
 * server error, even when the status code is 200.
 *
 * Ref: https://docs.aws.amazon.com/AmazonS3/latest/API/API_CompleteMultipartUpload.html#API_CompleteMultipartUpload_Example_4
 */
const parseXmlBodyOrThrow = async (response) => {
    const parsed = await (0,_utils_parsePayload_mjs__WEBPACK_IMPORTED_MODULE_6__.parseXmlBody)(response); // Handles empty body case
    if (parsed.Code !== undefined && parsed.Message !== undefined) {
        const error = (await (0,_base_mjs__WEBPACK_IMPORTED_MODULE_7__.parseXmlError)({
            ...response,
            statusCode: 500, // To workaround the >=300 status code check common to other APIs.
        }));
        throw (0,_utils_deserializeHelpers_mjs__WEBPACK_IMPORTED_MODULE_8__.buildStorageServiceError)(error, response.statusCode);
    }
    return parsed;
};
const completeMultipartUploadDeserializer = async (response) => {
    if (response.statusCode >= 300) {
        const error = (await (0,_base_mjs__WEBPACK_IMPORTED_MODULE_7__.parseXmlError)(response));
        throw (0,_utils_deserializeHelpers_mjs__WEBPACK_IMPORTED_MODULE_8__.buildStorageServiceError)(error, response.statusCode);
    }
    else {
        const parsed = await parseXmlBodyOrThrow(response);
        const contents = (0,_utils_deserializeHelpers_mjs__WEBPACK_IMPORTED_MODULE_8__.map)(parsed, {
            ETag: 'ETag',
            Key: 'Key',
            Location: 'Location',
        });
        return {
            $metadata: (0,_aws_amplify_core_internals_aws_client_utils__WEBPACK_IMPORTED_MODULE_9__.parseMetadata)(response),
            ...contents,
        };
    }
};
// CompleteMultiPartUpload API returns 200 status code with empty body or error message.
// This indicates internal server error after the response has been sent to the client.
// Ref: https://docs.aws.amazon.com/AmazonS3/latest/API/API_CompleteMultipartUpload.html#API_CompleteMultipartUpload_Example_4
const retryWhenErrorWith200StatusCode = async (response, error, middlewareContext) => {
    if (!response) {
        return { retryable: false };
    }
    if (response.statusCode === 200) {
        if (!response.body) {
            return { retryable: true };
        }
        const parsed = await (0,_utils_parsePayload_mjs__WEBPACK_IMPORTED_MODULE_6__.parseXmlBody)(response);
        if (parsed.Code !== undefined && parsed.Message !== undefined) {
            return { retryable: true };
        }
        return { retryable: false };
    }
    return (0,_base_mjs__WEBPACK_IMPORTED_MODULE_7__.retryDecider)(response, error, middlewareContext);
};
const completeMultipartUpload = (0,_aws_amplify_core_internals_aws_client_utils_composers__WEBPACK_IMPORTED_MODULE_10__.composeServiceApi)(_runtime_s3TransferHandler_fetch_mjs__WEBPACK_IMPORTED_MODULE_11__.s3TransferHandler, completeMultipartUploadSerializer, completeMultipartUploadDeserializer, {
    ..._base_mjs__WEBPACK_IMPORTED_MODULE_7__.defaultConfig,
    responseType: 'text',
    retryDecider: retryWhenErrorWith200StatusCode,
});


//# sourceMappingURL=completeMultipartUpload.mjs.map


/***/ }),

/***/ "./dist/esm/providers/s3/utils/client/s3data/copyObject.mjs":
/*!******************************************************************!*\
  !*** ./dist/esm/providers/s3/utils/client/s3data/copyObject.mjs ***!
  \******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   copyObject: () => (/* binding */ copyObject),
/* harmony export */   validateCopyObjectHeaders: () => (/* binding */ validateCopyObjectHeaders)
/* harmony export */ });
/* harmony import */ var _aws_amplify_core_internals_aws_client_utils__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @aws-amplify/core/internals/aws-client-utils */ "../core/dist/esm/clients/serde/responseInfo.mjs");
/* harmony import */ var _aws_amplify_core_internals_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @aws-amplify/core/internals/utils */ "../core/dist/esm/utils/amplifyUrl/index.mjs");
/* harmony import */ var _aws_amplify_core_internals_aws_client_utils_composers__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @aws-amplify/core/internals/aws-client-utils/composers */ "../core/dist/esm/clients/internal/composeServiceApi.mjs");
/* harmony import */ var _utils_parsePayload_mjs__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../utils/parsePayload.mjs */ "./dist/esm/providers/s3/utils/client/utils/parsePayload.mjs");
/* harmony import */ var _runtime_s3TransferHandler_fetch_mjs__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../runtime/s3TransferHandler/fetch.mjs */ "./dist/esm/providers/s3/utils/client/runtime/s3TransferHandler/xhr.mjs");
/* harmony import */ var fast_xml_parser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! fast-xml-parser */ "?2abf");
/* harmony import */ var buffer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! buffer */ "?46b7");
/* harmony import */ var _utils_deserializeHelpers_mjs__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../utils/deserializeHelpers.mjs */ "./dist/esm/providers/s3/utils/client/utils/deserializeHelpers.mjs");
/* harmony import */ var _utils_serializeHelpers_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/serializeHelpers.mjs */ "./dist/esm/providers/s3/utils/client/utils/serializeHelpers.mjs");
/* harmony import */ var _utils_integrityHelpers_mjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../utils/integrityHelpers.mjs */ "./dist/esm/providers/s3/utils/client/utils/integrityHelpers.mjs");
/* harmony import */ var _errors_IntegrityError_mjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../../../errors/IntegrityError.mjs */ "./dist/esm/errors/IntegrityError.mjs");
/* harmony import */ var _validateObjectUrl_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../validateObjectUrl.mjs */ "./dist/esm/providers/s3/utils/validateObjectUrl.mjs");
/* harmony import */ var _base_mjs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./base.mjs */ "./dist/esm/providers/s3/utils/client/s3data/base.mjs");















// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
const copyObjectSerializer = async (input, endpoint) => {
    const headers = {
        ...(await (0,_utils_serializeHelpers_mjs__WEBPACK_IMPORTED_MODULE_2__.serializeObjectConfigsToHeaders)(input)),
        ...(0,_utils_serializeHelpers_mjs__WEBPACK_IMPORTED_MODULE_2__.assignStringVariables)({
            'x-amz-copy-source': input.CopySource,
            'x-amz-metadata-directive': input.MetadataDirective,
            'x-amz-copy-source-if-match': input.CopySourceIfMatch,
            'x-amz-copy-source-if-unmodified-since': input.CopySourceIfUnmodifiedSince?.toUTCString(),
            'x-amz-source-expected-bucket-owner': input.ExpectedSourceBucketOwner,
            'x-amz-expected-bucket-owner': input.ExpectedBucketOwner,
        }),
    };
    validateCopyObjectHeaders(input, headers);
    const url = new _aws_amplify_core_internals_utils__WEBPACK_IMPORTED_MODULE_3__.AmplifyUrl(endpoint.url.toString());
    (0,_utils_serializeHelpers_mjs__WEBPACK_IMPORTED_MODULE_2__.validateS3RequiredParameter)(!!input.Key, 'Key');
    url.pathname = (0,_utils_serializeHelpers_mjs__WEBPACK_IMPORTED_MODULE_2__.serializePathnameObjectKey)(url, input.Key);
    (0,_validateObjectUrl_mjs__WEBPACK_IMPORTED_MODULE_4__.validateObjectUrl)({
        bucketName: input.Bucket,
        key: input.Key,
        objectURL: url,
    });
    return {
        method: 'PUT',
        headers,
        url,
    };
};
const validateCopyObjectHeaders = (input, headers) => {
    const validations = [
        headers['x-amz-copy-source'] === input.CopySource,
        (0,_utils_integrityHelpers_mjs__WEBPACK_IMPORTED_MODULE_5__.bothNilOrEqual)(input.MetadataDirective, headers['x-amz-metadata-directive']),
        (0,_utils_integrityHelpers_mjs__WEBPACK_IMPORTED_MODULE_5__.bothNilOrEqual)(input.CopySourceIfMatch, headers['x-amz-copy-source-if-match']),
        (0,_utils_integrityHelpers_mjs__WEBPACK_IMPORTED_MODULE_5__.bothNilOrEqual)(input.CopySourceIfUnmodifiedSince?.toUTCString(), headers['x-amz-copy-source-if-unmodified-since']),
    ];
    if (validations.some(validation => !validation)) {
        throw new _errors_IntegrityError_mjs__WEBPACK_IMPORTED_MODULE_6__.IntegrityError();
    }
};
const copyObjectDeserializer = async (response) => {
    if (response.statusCode >= 300) {
        const error = (await (0,_base_mjs__WEBPACK_IMPORTED_MODULE_7__.parseXmlError)(response));
        throw (0,_utils_deserializeHelpers_mjs__WEBPACK_IMPORTED_MODULE_8__.buildStorageServiceError)(error, response.statusCode);
    }
    else {
        await (0,_utils_parsePayload_mjs__WEBPACK_IMPORTED_MODULE_9__.parseXmlBody)(response);
        return {
            $metadata: (0,_aws_amplify_core_internals_aws_client_utils__WEBPACK_IMPORTED_MODULE_10__.parseMetadata)(response),
        };
    }
};
const copyObject = (0,_aws_amplify_core_internals_aws_client_utils_composers__WEBPACK_IMPORTED_MODULE_11__.composeServiceApi)(_runtime_s3TransferHandler_fetch_mjs__WEBPACK_IMPORTED_MODULE_12__.s3TransferHandler, copyObjectSerializer, copyObjectDeserializer, { ..._base_mjs__WEBPACK_IMPORTED_MODULE_7__.defaultConfig, responseType: 'text' });


//# sourceMappingURL=copyObject.mjs.map


/***/ }),

/***/ "./dist/esm/providers/s3/utils/client/s3data/createMultipartUpload.mjs":
/*!*****************************************************************************!*\
  !*** ./dist/esm/providers/s3/utils/client/s3data/createMultipartUpload.mjs ***!
  \*****************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createMultipartUpload: () => (/* binding */ createMultipartUpload)
/* harmony export */ });
/* harmony import */ var _aws_amplify_core_internals_aws_client_utils__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @aws-amplify/core/internals/aws-client-utils */ "../core/dist/esm/clients/serde/responseInfo.mjs");
/* harmony import */ var _aws_amplify_core_internals_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @aws-amplify/core/internals/utils */ "../core/dist/esm/utils/amplifyUrl/index.mjs");
/* harmony import */ var _aws_amplify_core_internals_aws_client_utils_composers__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @aws-amplify/core/internals/aws-client-utils/composers */ "../core/dist/esm/clients/internal/composeServiceApi.mjs");
/* harmony import */ var _utils_parsePayload_mjs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../utils/parsePayload.mjs */ "./dist/esm/providers/s3/utils/client/utils/parsePayload.mjs");
/* harmony import */ var _runtime_s3TransferHandler_fetch_mjs__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../runtime/s3TransferHandler/fetch.mjs */ "./dist/esm/providers/s3/utils/client/runtime/s3TransferHandler/xhr.mjs");
/* harmony import */ var fast_xml_parser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! fast-xml-parser */ "?2abf");
/* harmony import */ var buffer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! buffer */ "?46b7");
/* harmony import */ var _utils_deserializeHelpers_mjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../utils/deserializeHelpers.mjs */ "./dist/esm/providers/s3/utils/client/utils/deserializeHelpers.mjs");
/* harmony import */ var _utils_serializeHelpers_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/serializeHelpers.mjs */ "./dist/esm/providers/s3/utils/client/utils/serializeHelpers.mjs");
/* harmony import */ var _validateObjectUrl_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../validateObjectUrl.mjs */ "./dist/esm/providers/s3/utils/validateObjectUrl.mjs");
/* harmony import */ var _base_mjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./base.mjs */ "./dist/esm/providers/s3/utils/client/s3data/base.mjs");













// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
const createMultipartUploadSerializer = async (input, endpoint) => {
    const headers = {
        ...(await (0,_utils_serializeHelpers_mjs__WEBPACK_IMPORTED_MODULE_2__.serializeObjectConfigsToHeaders)(input)),
        ...(0,_utils_serializeHelpers_mjs__WEBPACK_IMPORTED_MODULE_2__.assignStringVariables)({
            'x-amz-checksum-algorithm': input.ChecksumAlgorithm,
            'x-amz-expected-bucket-owner': input.ExpectedBucketOwner,
        }),
    };
    const url = new _aws_amplify_core_internals_utils__WEBPACK_IMPORTED_MODULE_3__.AmplifyUrl(endpoint.url.toString());
    (0,_utils_serializeHelpers_mjs__WEBPACK_IMPORTED_MODULE_2__.validateS3RequiredParameter)(!!input.Key, 'Key');
    url.pathname = (0,_utils_serializeHelpers_mjs__WEBPACK_IMPORTED_MODULE_2__.serializePathnameObjectKey)(url, input.Key);
    url.search = 'uploads';
    (0,_validateObjectUrl_mjs__WEBPACK_IMPORTED_MODULE_4__.validateObjectUrl)({
        bucketName: input.Bucket,
        key: input.Key,
        objectURL: url,
    });
    return {
        method: 'POST',
        headers,
        url,
    };
};
const createMultipartUploadDeserializer = async (response) => {
    if (response.statusCode >= 300) {
        const error = (await (0,_base_mjs__WEBPACK_IMPORTED_MODULE_5__.parseXmlError)(response));
        throw (0,_utils_deserializeHelpers_mjs__WEBPACK_IMPORTED_MODULE_6__.buildStorageServiceError)(error, response.statusCode);
    }
    else {
        const parsed = await (0,_utils_parsePayload_mjs__WEBPACK_IMPORTED_MODULE_7__.parseXmlBody)(response);
        const contents = (0,_utils_deserializeHelpers_mjs__WEBPACK_IMPORTED_MODULE_6__.map)(parsed, {
            UploadId: 'UploadId',
        });
        return {
            $metadata: (0,_aws_amplify_core_internals_aws_client_utils__WEBPACK_IMPORTED_MODULE_8__.parseMetadata)(response),
            ...contents,
        };
    }
};
const createMultipartUpload = (0,_aws_amplify_core_internals_aws_client_utils_composers__WEBPACK_IMPORTED_MODULE_9__.composeServiceApi)(_runtime_s3TransferHandler_fetch_mjs__WEBPACK_IMPORTED_MODULE_10__.s3TransferHandler, createMultipartUploadSerializer, createMultipartUploadDeserializer, { ..._base_mjs__WEBPACK_IMPORTED_MODULE_5__.defaultConfig, responseType: 'text' });


//# sourceMappingURL=createMultipartUpload.mjs.map


/***/ }),

/***/ "./dist/esm/providers/s3/utils/client/s3data/deleteObject.mjs":
/*!********************************************************************!*\
  !*** ./dist/esm/providers/s3/utils/client/s3data/deleteObject.mjs ***!
  \********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   deleteObject: () => (/* binding */ deleteObject)
/* harmony export */ });
/* harmony import */ var _aws_amplify_core_internals_aws_client_utils__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @aws-amplify/core/internals/aws-client-utils */ "../core/dist/esm/clients/serde/responseInfo.mjs");
/* harmony import */ var _aws_amplify_core_internals_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @aws-amplify/core/internals/utils */ "../core/dist/esm/utils/amplifyUrl/index.mjs");
/* harmony import */ var _aws_amplify_core_internals_aws_client_utils_composers__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @aws-amplify/core/internals/aws-client-utils/composers */ "../core/dist/esm/clients/internal/composeServiceApi.mjs");
/* harmony import */ var _runtime_s3TransferHandler_fetch_mjs__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../runtime/s3TransferHandler/fetch.mjs */ "./dist/esm/providers/s3/utils/client/runtime/s3TransferHandler/xhr.mjs");
/* harmony import */ var fast_xml_parser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! fast-xml-parser */ "?2abf");
/* harmony import */ var buffer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! buffer */ "?46b7");
/* harmony import */ var _utils_deserializeHelpers_mjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../utils/deserializeHelpers.mjs */ "./dist/esm/providers/s3/utils/client/utils/deserializeHelpers.mjs");
/* harmony import */ var _utils_serializeHelpers_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/serializeHelpers.mjs */ "./dist/esm/providers/s3/utils/client/utils/serializeHelpers.mjs");
/* harmony import */ var _validateObjectUrl_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../validateObjectUrl.mjs */ "./dist/esm/providers/s3/utils/validateObjectUrl.mjs");
/* harmony import */ var _base_mjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./base.mjs */ "./dist/esm/providers/s3/utils/client/s3data/base.mjs");












// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
const deleteObjectSerializer = (input, endpoint) => {
    const url = new _aws_amplify_core_internals_utils__WEBPACK_IMPORTED_MODULE_2__.AmplifyUrl(endpoint.url.toString());
    (0,_utils_serializeHelpers_mjs__WEBPACK_IMPORTED_MODULE_3__.validateS3RequiredParameter)(!!input.Key, 'Key');
    url.pathname = (0,_utils_serializeHelpers_mjs__WEBPACK_IMPORTED_MODULE_3__.serializePathnameObjectKey)(url, input.Key);
    (0,_validateObjectUrl_mjs__WEBPACK_IMPORTED_MODULE_4__.validateObjectUrl)({
        bucketName: input.Bucket,
        key: input.Key,
        objectURL: url,
    });
    const headers = (0,_utils_serializeHelpers_mjs__WEBPACK_IMPORTED_MODULE_3__.assignStringVariables)({
        'x-amz-expected-bucket-owner': input.ExpectedBucketOwner,
    });
    return {
        method: 'DELETE',
        headers,
        url,
    };
};
const deleteObjectDeserializer = async (response) => {
    if (response.statusCode >= 300) {
        // error is always set when statusCode >= 300
        const error = (await (0,_base_mjs__WEBPACK_IMPORTED_MODULE_5__.parseXmlError)(response));
        throw (0,_utils_deserializeHelpers_mjs__WEBPACK_IMPORTED_MODULE_6__.buildStorageServiceError)(error, response.statusCode);
    }
    else {
        const content = (0,_utils_deserializeHelpers_mjs__WEBPACK_IMPORTED_MODULE_6__.map)(response.headers, {
            DeleteMarker: ['x-amz-delete-marker', _utils_deserializeHelpers_mjs__WEBPACK_IMPORTED_MODULE_6__.deserializeBoolean],
            VersionId: 'x-amz-version-id',
            RequestCharged: 'x-amz-request-charged',
        });
        return {
            ...content,
            $metadata: (0,_aws_amplify_core_internals_aws_client_utils__WEBPACK_IMPORTED_MODULE_7__.parseMetadata)(response),
        };
    }
};
const deleteObject = (0,_aws_amplify_core_internals_aws_client_utils_composers__WEBPACK_IMPORTED_MODULE_8__.composeServiceApi)(_runtime_s3TransferHandler_fetch_mjs__WEBPACK_IMPORTED_MODULE_9__.s3TransferHandler, deleteObjectSerializer, deleteObjectDeserializer, { ..._base_mjs__WEBPACK_IMPORTED_MODULE_5__.defaultConfig, responseType: 'text' });


//# sourceMappingURL=deleteObject.mjs.map


/***/ }),

/***/ "./dist/esm/providers/s3/utils/client/s3data/getObject.mjs":
/*!*****************************************************************!*\
  !*** ./dist/esm/providers/s3/utils/client/s3data/getObject.mjs ***!
  \*****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getObject: () => (/* binding */ getObject),
/* harmony export */   getPresignedGetObjectUrl: () => (/* binding */ getPresignedGetObjectUrl)
/* harmony export */ });
/* harmony import */ var _aws_amplify_core_internals_aws_client_utils__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @aws-amplify/core/internals/aws-client-utils */ "../core/dist/esm/clients/serde/responseInfo.mjs");
/* harmony import */ var _aws_amplify_core_internals_aws_client_utils__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @aws-amplify/core/internals/aws-client-utils */ "../core/dist/esm/clients/middleware/signing/signer/signatureV4/constants.mjs");
/* harmony import */ var _aws_amplify_core_internals_aws_client_utils__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @aws-amplify/core/internals/aws-client-utils */ "../core/dist/esm/clients/middleware/signing/signer/signatureV4/presignUrl.mjs");
/* harmony import */ var _aws_amplify_core_internals_aws_client_utils_composers__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @aws-amplify/core/internals/aws-client-utils/composers */ "../core/dist/esm/clients/internal/composeServiceApi.mjs");
/* harmony import */ var _aws_amplify_core_internals_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @aws-amplify/core/internals/utils */ "../core/dist/esm/utils/amplifyUrl/index.mjs");
/* harmony import */ var _runtime_constants_mjs__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../runtime/constants.mjs */ "./dist/esm/providers/s3/utils/client/runtime/constants.mjs");
/* harmony import */ var _runtime_s3TransferHandler_fetch_mjs__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../runtime/s3TransferHandler/fetch.mjs */ "./dist/esm/providers/s3/utils/client/runtime/s3TransferHandler/xhr.mjs");
/* harmony import */ var fast_xml_parser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! fast-xml-parser */ "?2abf");
/* harmony import */ var buffer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! buffer */ "?46b7");
/* harmony import */ var _utils_deserializeHelpers_mjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../utils/deserializeHelpers.mjs */ "./dist/esm/providers/s3/utils/client/utils/deserializeHelpers.mjs");
/* harmony import */ var _utils_serializeHelpers_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/serializeHelpers.mjs */ "./dist/esm/providers/s3/utils/client/utils/serializeHelpers.mjs");
/* harmony import */ var _validateObjectUrl_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../validateObjectUrl.mjs */ "./dist/esm/providers/s3/utils/validateObjectUrl.mjs");
/* harmony import */ var _base_mjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./base.mjs */ "./dist/esm/providers/s3/utils/client/s3data/base.mjs");













// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
const USER_AGENT_HEADER = 'x-amz-user-agent';
const getObjectSerializer = async (input, endpoint) => {
    const url = new _aws_amplify_core_internals_utils__WEBPACK_IMPORTED_MODULE_2__.AmplifyUrl(endpoint.url.toString());
    (0,_utils_serializeHelpers_mjs__WEBPACK_IMPORTED_MODULE_3__.validateS3RequiredParameter)(!!input.Key, 'Key');
    url.pathname = (0,_utils_serializeHelpers_mjs__WEBPACK_IMPORTED_MODULE_3__.serializePathnameObjectKey)(url, input.Key);
    (0,_validateObjectUrl_mjs__WEBPACK_IMPORTED_MODULE_4__.validateObjectUrl)({
        bucketName: input.Bucket,
        key: input.Key,
        objectURL: url,
    });
    return {
        method: 'GET',
        headers: {
            ...(input.Range && { Range: input.Range }),
            ...(0,_utils_serializeHelpers_mjs__WEBPACK_IMPORTED_MODULE_3__.assignStringVariables)({
                'x-amz-expected-bucket-owner': input.ExpectedBucketOwner,
            }),
        },
        url,
    };
};
const getObjectDeserializer = async (response) => {
    if (response.statusCode >= 300) {
        const error = (await (0,_base_mjs__WEBPACK_IMPORTED_MODULE_5__.parseXmlError)(response));
        throw (0,_utils_deserializeHelpers_mjs__WEBPACK_IMPORTED_MODULE_6__.buildStorageServiceError)(error, response.statusCode);
    }
    else {
        return {
            ...(0,_utils_deserializeHelpers_mjs__WEBPACK_IMPORTED_MODULE_6__.map)(response.headers, {
                DeleteMarker: ['x-amz-delete-marker', _utils_deserializeHelpers_mjs__WEBPACK_IMPORTED_MODULE_6__.deserializeBoolean],
                AcceptRanges: 'accept-ranges',
                Expiration: 'x-amz-expiration',
                Restore: 'x-amz-restore',
                LastModified: ['last-modified', _utils_deserializeHelpers_mjs__WEBPACK_IMPORTED_MODULE_6__.deserializeTimestamp],
                ContentLength: ['content-length', _utils_deserializeHelpers_mjs__WEBPACK_IMPORTED_MODULE_6__.deserializeNumber],
                ETag: 'etag',
                ChecksumCRC32: 'x-amz-checksum-crc32',
                ChecksumCRC32C: 'x-amz-checksum-crc32c',
                ChecksumSHA1: 'x-amz-checksum-sha1',
                ChecksumSHA256: 'x-amz-checksum-sha256',
                MissingMeta: ['x-amz-missing-meta', _utils_deserializeHelpers_mjs__WEBPACK_IMPORTED_MODULE_6__.deserializeNumber],
                VersionId: 'x-amz-version-id',
                CacheControl: 'cache-control',
                ContentDisposition: 'content-disposition',
                ContentEncoding: 'content-encoding',
                ContentLanguage: 'content-language',
                ContentRange: 'content-range',
                ContentType: 'content-type',
                Expires: ['expires', _utils_deserializeHelpers_mjs__WEBPACK_IMPORTED_MODULE_6__.deserializeTimestamp],
                WebsiteRedirectLocation: 'x-amz-website-redirect-location',
                ServerSideEncryption: 'x-amz-server-side-encryption',
                SSECustomerAlgorithm: 'x-amz-server-side-encryption-customer-algorithm',
                SSECustomerKeyMD5: 'x-amz-server-side-encryption-customer-key-md5',
                SSEKMSKeyId: 'x-amz-server-side-encryption-aws-kms-key-id',
                BucketKeyEnabled: [
                    'x-amz-server-side-encryption-bucket-key-enabled',
                    _utils_deserializeHelpers_mjs__WEBPACK_IMPORTED_MODULE_6__.deserializeBoolean,
                ],
                StorageClass: 'x-amz-storage-class',
                RequestCharged: 'x-amz-request-charged',
                ReplicationStatus: 'x-amz-replication-status',
                PartsCount: ['x-amz-mp-parts-count', _utils_deserializeHelpers_mjs__WEBPACK_IMPORTED_MODULE_6__.deserializeNumber],
                TagCount: ['x-amz-tagging-count', _utils_deserializeHelpers_mjs__WEBPACK_IMPORTED_MODULE_6__.deserializeNumber],
                ObjectLockMode: 'x-amz-object-lock-mode',
                ObjectLockRetainUntilDate: [
                    'x-amz-object-lock-retain-until-date',
                    _utils_deserializeHelpers_mjs__WEBPACK_IMPORTED_MODULE_6__.deserializeTimestamp,
                ],
                ObjectLockLegalHoldStatus: 'x-amz-object-lock-legal-hold',
            }),
            Metadata: (0,_utils_deserializeHelpers_mjs__WEBPACK_IMPORTED_MODULE_6__.deserializeMetadata)(response.headers),
            $metadata: (0,_aws_amplify_core_internals_aws_client_utils__WEBPACK_IMPORTED_MODULE_7__.parseMetadata)(response),
            // @ts-expect-error The body is a CompatibleHttpResponse type because the lower-level handler is XHR instead of
            // fetch, which represents payload in Blob instread of ReadableStream.
            Body: response.body,
        };
    }
};
const getObject = (0,_aws_amplify_core_internals_aws_client_utils_composers__WEBPACK_IMPORTED_MODULE_8__.composeServiceApi)(_runtime_s3TransferHandler_fetch_mjs__WEBPACK_IMPORTED_MODULE_9__.s3TransferHandler, getObjectSerializer, getObjectDeserializer, { ..._base_mjs__WEBPACK_IMPORTED_MODULE_5__.defaultConfig, responseType: 'blob' });
/**
 * Get a presigned URL for the `getObject` API.
 *
 * @internal
 */
const getPresignedGetObjectUrl = async (config, input) => {
    const endpoint = _base_mjs__WEBPACK_IMPORTED_MODULE_5__.defaultConfig.endpointResolver(config, input);
    const { url, headers, method } = await getObjectSerializer(input, endpoint);
    // TODO: set content sha256 query parameter with value of UNSIGNED-PAYLOAD instead of empty hash.
    // It requires changes in presignUrl. Without this change, the generated url still works,
    // but not the same as other tools like AWS SDK and CLI.
    url.searchParams.append(_runtime_constants_mjs__WEBPACK_IMPORTED_MODULE_10__.CONTENT_SHA256_HEADER, _aws_amplify_core_internals_aws_client_utils__WEBPACK_IMPORTED_MODULE_11__.EMPTY_HASH);
    if (config.userAgentValue) {
        url.searchParams.append(config.userAgentHeader ?? USER_AGENT_HEADER, config.userAgentValue);
    }
    if (input.ResponseContentType) {
        url.searchParams.append('response-content-type', input.ResponseContentType);
    }
    if (input.ResponseContentDisposition) {
        url.searchParams.append('response-content-disposition', input.ResponseContentDisposition);
    }
    for (const [headerName, value] of Object.entries(headers).sort(([key1], [key2]) => key1.localeCompare(key2))) {
        url.searchParams.append(headerName, value);
    }
    return (0,_aws_amplify_core_internals_aws_client_utils__WEBPACK_IMPORTED_MODULE_12__.presignUrl)({ method, url, body: undefined }, {
        signingService: _base_mjs__WEBPACK_IMPORTED_MODULE_5__.defaultConfig.service,
        signingRegion: config.region,
        ..._base_mjs__WEBPACK_IMPORTED_MODULE_5__.defaultConfig,
        ...config,
    });
};


//# sourceMappingURL=getObject.mjs.map


/***/ }),

/***/ "./dist/esm/providers/s3/utils/client/s3data/headObject.mjs":
/*!******************************************************************!*\
  !*** ./dist/esm/providers/s3/utils/client/s3data/headObject.mjs ***!
  \******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   headObject: () => (/* binding */ headObject)
/* harmony export */ });
/* harmony import */ var _aws_amplify_core_internals_aws_client_utils__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @aws-amplify/core/internals/aws-client-utils */ "../core/dist/esm/clients/serde/responseInfo.mjs");
/* harmony import */ var _aws_amplify_core_internals_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @aws-amplify/core/internals/utils */ "../core/dist/esm/utils/amplifyUrl/index.mjs");
/* harmony import */ var _aws_amplify_core_internals_aws_client_utils_composers__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @aws-amplify/core/internals/aws-client-utils/composers */ "../core/dist/esm/clients/internal/composeServiceApi.mjs");
/* harmony import */ var _runtime_s3TransferHandler_fetch_mjs__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../runtime/s3TransferHandler/fetch.mjs */ "./dist/esm/providers/s3/utils/client/runtime/s3TransferHandler/xhr.mjs");
/* harmony import */ var fast_xml_parser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! fast-xml-parser */ "?2abf");
/* harmony import */ var buffer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! buffer */ "?46b7");
/* harmony import */ var _utils_deserializeHelpers_mjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../utils/deserializeHelpers.mjs */ "./dist/esm/providers/s3/utils/client/utils/deserializeHelpers.mjs");
/* harmony import */ var _utils_serializeHelpers_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/serializeHelpers.mjs */ "./dist/esm/providers/s3/utils/client/utils/serializeHelpers.mjs");
/* harmony import */ var _validateObjectUrl_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../validateObjectUrl.mjs */ "./dist/esm/providers/s3/utils/validateObjectUrl.mjs");
/* harmony import */ var _base_mjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./base.mjs */ "./dist/esm/providers/s3/utils/client/s3data/base.mjs");












// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
const headObjectSerializer = async (input, endpoint) => {
    const url = new _aws_amplify_core_internals_utils__WEBPACK_IMPORTED_MODULE_2__.AmplifyUrl(endpoint.url.toString());
    (0,_utils_serializeHelpers_mjs__WEBPACK_IMPORTED_MODULE_3__.validateS3RequiredParameter)(!!input.Key, 'Key');
    url.pathname = (0,_utils_serializeHelpers_mjs__WEBPACK_IMPORTED_MODULE_3__.serializePathnameObjectKey)(url, input.Key);
    (0,_validateObjectUrl_mjs__WEBPACK_IMPORTED_MODULE_4__.validateObjectUrl)({
        bucketName: input.Bucket,
        key: input.Key,
        objectURL: url,
    });
    const headers = (0,_utils_serializeHelpers_mjs__WEBPACK_IMPORTED_MODULE_3__.assignStringVariables)({
        'x-amz-expected-bucket-owner': input.ExpectedBucketOwner,
    });
    return {
        method: 'HEAD',
        headers,
        url,
    };
};
const headObjectDeserializer = async (response) => {
    if (response.statusCode >= 300) {
        // error is always set when statusCode >= 300
        const error = (await (0,_base_mjs__WEBPACK_IMPORTED_MODULE_5__.parseXmlError)(response));
        throw (0,_utils_deserializeHelpers_mjs__WEBPACK_IMPORTED_MODULE_6__.buildStorageServiceError)(error, response.statusCode);
    }
    else {
        const contents = {
            ...(0,_utils_deserializeHelpers_mjs__WEBPACK_IMPORTED_MODULE_6__.map)(response.headers, {
                ContentLength: ['content-length', _utils_deserializeHelpers_mjs__WEBPACK_IMPORTED_MODULE_6__.deserializeNumber],
                ContentType: 'content-type',
                ETag: 'etag',
                LastModified: ['last-modified', _utils_deserializeHelpers_mjs__WEBPACK_IMPORTED_MODULE_6__.deserializeTimestamp],
                VersionId: 'x-amz-version-id',
            }),
            Metadata: (0,_utils_deserializeHelpers_mjs__WEBPACK_IMPORTED_MODULE_6__.deserializeMetadata)(response.headers),
        };
        return {
            $metadata: (0,_aws_amplify_core_internals_aws_client_utils__WEBPACK_IMPORTED_MODULE_7__.parseMetadata)(response),
            ...contents,
        };
    }
};
const headObject = (0,_aws_amplify_core_internals_aws_client_utils_composers__WEBPACK_IMPORTED_MODULE_8__.composeServiceApi)(_runtime_s3TransferHandler_fetch_mjs__WEBPACK_IMPORTED_MODULE_9__.s3TransferHandler, headObjectSerializer, headObjectDeserializer, { ..._base_mjs__WEBPACK_IMPORTED_MODULE_5__.defaultConfig, responseType: 'text' });


//# sourceMappingURL=headObject.mjs.map


/***/ }),

/***/ "./dist/esm/providers/s3/utils/client/s3data/listObjectsV2.mjs":
/*!*********************************************************************!*\
  !*** ./dist/esm/providers/s3/utils/client/s3data/listObjectsV2.mjs ***!
  \*********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   listObjectsV2: () => (/* binding */ listObjectsV2)
/* harmony export */ });
/* harmony import */ var _aws_amplify_core_internals_aws_client_utils__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @aws-amplify/core/internals/aws-client-utils */ "../core/dist/esm/clients/serde/responseInfo.mjs");
/* harmony import */ var _aws_amplify_core_internals_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @aws-amplify/core/internals/utils */ "../core/dist/esm/utils/amplifyUrl/index.mjs");
/* harmony import */ var _aws_amplify_core_internals_aws_client_utils_composers__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @aws-amplify/core/internals/aws-client-utils/composers */ "../core/dist/esm/clients/internal/composeServiceApi.mjs");
/* harmony import */ var _utils_parsePayload_mjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../utils/parsePayload.mjs */ "./dist/esm/providers/s3/utils/client/utils/parsePayload.mjs");
/* harmony import */ var _runtime_s3TransferHandler_fetch_mjs__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../runtime/s3TransferHandler/fetch.mjs */ "./dist/esm/providers/s3/utils/client/runtime/s3TransferHandler/xhr.mjs");
/* harmony import */ var fast_xml_parser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! fast-xml-parser */ "?2abf");
/* harmony import */ var buffer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! buffer */ "?46b7");
/* harmony import */ var _utils_deserializeHelpers_mjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../utils/deserializeHelpers.mjs */ "./dist/esm/providers/s3/utils/client/utils/deserializeHelpers.mjs");
/* harmony import */ var _utils_serializeHelpers_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/serializeHelpers.mjs */ "./dist/esm/providers/s3/utils/client/utils/serializeHelpers.mjs");
/* harmony import */ var _errors_IntegrityError_mjs__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../../../errors/IntegrityError.mjs */ "./dist/esm/errors/IntegrityError.mjs");
/* harmony import */ var _base_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./base.mjs */ "./dist/esm/providers/s3/utils/client/s3data/base.mjs");













// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
const listObjectsV2Serializer = (input, endpoint) => {
    const headers = (0,_utils_serializeHelpers_mjs__WEBPACK_IMPORTED_MODULE_2__.assignStringVariables)({
        'x-amz-request-payer': input.RequestPayer,
        'x-amz-expected-bucket-owner': input.ExpectedBucketOwner,
    });
    const query = (0,_utils_serializeHelpers_mjs__WEBPACK_IMPORTED_MODULE_2__.assignStringVariables)({
        'list-type': '2',
        'continuation-token': input.ContinuationToken,
        delimiter: input.Delimiter,
        'encoding-type': input.EncodingType,
        'fetch-owner': input.FetchOwner,
        'max-keys': input.MaxKeys,
        prefix: input.Prefix,
        'start-after': input.StartAfter,
    });
    const url = new _aws_amplify_core_internals_utils__WEBPACK_IMPORTED_MODULE_3__.AmplifyUrl(endpoint.url.toString());
    url.search = new _aws_amplify_core_internals_utils__WEBPACK_IMPORTED_MODULE_3__.AmplifyUrlSearchParams(query).toString();
    return {
        method: 'GET',
        headers,
        url,
    };
};
const listObjectsV2Deserializer = async (response) => {
    if (response.statusCode >= 300) {
        // error is always set when statusCode >= 300
        const error = (await (0,_base_mjs__WEBPACK_IMPORTED_MODULE_4__.parseXmlError)(response));
        throw (0,_utils_deserializeHelpers_mjs__WEBPACK_IMPORTED_MODULE_5__.buildStorageServiceError)(error, response.statusCode);
    }
    else {
        const parsed = await (0,_utils_parsePayload_mjs__WEBPACK_IMPORTED_MODULE_6__.parseXmlBody)(response);
        const contents = (0,_utils_deserializeHelpers_mjs__WEBPACK_IMPORTED_MODULE_5__.map)(parsed, {
            CommonPrefixes: [
                'CommonPrefixes',
                value => (0,_utils_deserializeHelpers_mjs__WEBPACK_IMPORTED_MODULE_5__.emptyArrayGuard)(value, deserializeCommonPrefixList),
            ],
            Contents: [
                'Contents',
                value => (0,_utils_deserializeHelpers_mjs__WEBPACK_IMPORTED_MODULE_5__.emptyArrayGuard)(value, deserializeObjectList),
            ],
            ContinuationToken: 'ContinuationToken',
            Delimiter: 'Delimiter',
            EncodingType: 'EncodingType',
            IsTruncated: ['IsTruncated', _utils_deserializeHelpers_mjs__WEBPACK_IMPORTED_MODULE_5__.deserializeBoolean],
            KeyCount: ['KeyCount', _utils_deserializeHelpers_mjs__WEBPACK_IMPORTED_MODULE_5__.deserializeNumber],
            MaxKeys: ['MaxKeys', _utils_deserializeHelpers_mjs__WEBPACK_IMPORTED_MODULE_5__.deserializeNumber],
            Name: 'Name',
            NextContinuationToken: 'NextContinuationToken',
            Prefix: 'Prefix',
            StartAfter: 'StartAfter',
        });
        const output = {
            $metadata: (0,_aws_amplify_core_internals_aws_client_utils__WEBPACK_IMPORTED_MODULE_7__.parseMetadata)(response),
            ...contents,
        };
        validateCorroboratingElements(output);
        return output;
    }
};
const deserializeCommonPrefixList = (output) => output.map(deserializeCommonPrefix);
const deserializeCommonPrefix = (output) => (0,_utils_deserializeHelpers_mjs__WEBPACK_IMPORTED_MODULE_5__.map)(output, {
    Prefix: 'Prefix',
});
const deserializeObjectList = (output) => output.map(deserializeObject);
const deserializeObject = (output) => (0,_utils_deserializeHelpers_mjs__WEBPACK_IMPORTED_MODULE_5__.map)(output, {
    Key: 'Key',
    LastModified: ['LastModified', _utils_deserializeHelpers_mjs__WEBPACK_IMPORTED_MODULE_5__.deserializeTimestamp],
    ETag: 'ETag',
    ChecksumAlgorithm: [
        'ChecksumAlgorithm',
        value => (0,_utils_deserializeHelpers_mjs__WEBPACK_IMPORTED_MODULE_5__.emptyArrayGuard)(value, deserializeChecksumAlgorithmList),
    ],
    Size: ['Size', _utils_deserializeHelpers_mjs__WEBPACK_IMPORTED_MODULE_5__.deserializeNumber],
    StorageClass: 'StorageClass',
    Owner: ['Owner', deserializeOwner],
});
const deserializeChecksumAlgorithmList = (output) => output.map(entry => String(entry));
const deserializeOwner = (output) => (0,_utils_deserializeHelpers_mjs__WEBPACK_IMPORTED_MODULE_5__.map)(output, { DisplayName: 'DisplayName', ID: 'ID' });
const validateCorroboratingElements = (response) => {
    const { IsTruncated, KeyCount, Contents = [], CommonPrefixes = [], NextContinuationToken, } = response;
    const validTruncation = (IsTruncated && !!NextContinuationToken) ||
        (!IsTruncated && !NextContinuationToken);
    const validNumberOfKeysReturned = KeyCount === Contents.length + CommonPrefixes.length;
    if (!validTruncation || !validNumberOfKeysReturned) {
        throw new _errors_IntegrityError_mjs__WEBPACK_IMPORTED_MODULE_8__.IntegrityError();
    }
};
const listObjectsV2 = (0,_aws_amplify_core_internals_aws_client_utils_composers__WEBPACK_IMPORTED_MODULE_9__.composeServiceApi)(_runtime_s3TransferHandler_fetch_mjs__WEBPACK_IMPORTED_MODULE_10__.s3TransferHandler, listObjectsV2Serializer, listObjectsV2Deserializer, { ..._base_mjs__WEBPACK_IMPORTED_MODULE_4__.defaultConfig, responseType: 'text' });


//# sourceMappingURL=listObjectsV2.mjs.map


/***/ }),

/***/ "./dist/esm/providers/s3/utils/client/s3data/listParts.mjs":
/*!*****************************************************************!*\
  !*** ./dist/esm/providers/s3/utils/client/s3data/listParts.mjs ***!
  \*****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   listParts: () => (/* binding */ listParts)
/* harmony export */ });
/* harmony import */ var _aws_amplify_core_internals_aws_client_utils__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @aws-amplify/core/internals/aws-client-utils */ "../core/dist/esm/clients/serde/responseInfo.mjs");
/* harmony import */ var _aws_amplify_core_internals_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @aws-amplify/core/internals/utils */ "../core/dist/esm/utils/amplifyUrl/index.mjs");
/* harmony import */ var _aws_amplify_core_internals_aws_client_utils_composers__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @aws-amplify/core/internals/aws-client-utils/composers */ "../core/dist/esm/clients/internal/composeServiceApi.mjs");
/* harmony import */ var _utils_parsePayload_mjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../utils/parsePayload.mjs */ "./dist/esm/providers/s3/utils/client/utils/parsePayload.mjs");
/* harmony import */ var _runtime_s3TransferHandler_fetch_mjs__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../runtime/s3TransferHandler/fetch.mjs */ "./dist/esm/providers/s3/utils/client/runtime/s3TransferHandler/xhr.mjs");
/* harmony import */ var fast_xml_parser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! fast-xml-parser */ "?2abf");
/* harmony import */ var buffer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! buffer */ "?46b7");
/* harmony import */ var _utils_deserializeHelpers_mjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../utils/deserializeHelpers.mjs */ "./dist/esm/providers/s3/utils/client/utils/deserializeHelpers.mjs");
/* harmony import */ var _utils_serializeHelpers_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/serializeHelpers.mjs */ "./dist/esm/providers/s3/utils/client/utils/serializeHelpers.mjs");
/* harmony import */ var _base_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./base.mjs */ "./dist/esm/providers/s3/utils/client/s3data/base.mjs");












// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
const listPartsSerializer = async (input, endpoint) => {
    const headers = {};
    const url = new _aws_amplify_core_internals_utils__WEBPACK_IMPORTED_MODULE_2__.AmplifyUrl(endpoint.url.toString());
    (0,_utils_serializeHelpers_mjs__WEBPACK_IMPORTED_MODULE_3__.validateS3RequiredParameter)(!!input.Key, 'Key');
    url.pathname = (0,_utils_serializeHelpers_mjs__WEBPACK_IMPORTED_MODULE_3__.serializePathnameObjectKey)(url, input.Key);
    (0,_utils_serializeHelpers_mjs__WEBPACK_IMPORTED_MODULE_3__.validateS3RequiredParameter)(!!input.UploadId, 'UploadId');
    url.search = new _aws_amplify_core_internals_utils__WEBPACK_IMPORTED_MODULE_2__.AmplifyUrlSearchParams({
        uploadId: input.UploadId,
    }).toString();
    return {
        method: 'GET',
        headers,
        url,
    };
};
const listPartsDeserializer = async (response) => {
    if (response.statusCode >= 300) {
        const error = (await (0,_base_mjs__WEBPACK_IMPORTED_MODULE_4__.parseXmlError)(response));
        throw (0,_utils_deserializeHelpers_mjs__WEBPACK_IMPORTED_MODULE_5__.buildStorageServiceError)(error, response.statusCode);
    }
    else {
        const parsed = await (0,_utils_parsePayload_mjs__WEBPACK_IMPORTED_MODULE_6__.parseXmlBody)(response);
        const contents = (0,_utils_deserializeHelpers_mjs__WEBPACK_IMPORTED_MODULE_5__.map)(parsed, {
            UploadId: 'UploadId',
            Parts: [
                'Part',
                value => (0,_utils_deserializeHelpers_mjs__WEBPACK_IMPORTED_MODULE_5__.emptyArrayGuard)(value, _utils_deserializeHelpers_mjs__WEBPACK_IMPORTED_MODULE_5__.deserializeCompletedPartList),
            ],
        });
        return {
            $metadata: (0,_aws_amplify_core_internals_aws_client_utils__WEBPACK_IMPORTED_MODULE_7__.parseMetadata)(response),
            ...contents,
        };
    }
};
const listParts = (0,_aws_amplify_core_internals_aws_client_utils_composers__WEBPACK_IMPORTED_MODULE_8__.composeServiceApi)(_runtime_s3TransferHandler_fetch_mjs__WEBPACK_IMPORTED_MODULE_9__.s3TransferHandler, listPartsSerializer, listPartsDeserializer, { ..._base_mjs__WEBPACK_IMPORTED_MODULE_4__.defaultConfig, responseType: 'text' });


//# sourceMappingURL=listParts.mjs.map


/***/ }),

/***/ "./dist/esm/providers/s3/utils/client/s3data/putObject.mjs":
/*!*****************************************************************!*\
  !*** ./dist/esm/providers/s3/utils/client/s3data/putObject.mjs ***!
  \*****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   putObject: () => (/* binding */ putObject)
/* harmony export */ });
/* harmony import */ var _aws_amplify_core_internals_aws_client_utils__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @aws-amplify/core/internals/aws-client-utils */ "../core/dist/esm/clients/serde/responseInfo.mjs");
/* harmony import */ var _aws_amplify_core_internals_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @aws-amplify/core/internals/utils */ "../core/dist/esm/utils/amplifyUrl/index.mjs");
/* harmony import */ var _aws_amplify_core_internals_aws_client_utils_composers__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @aws-amplify/core/internals/aws-client-utils/composers */ "../core/dist/esm/clients/internal/composeServiceApi.mjs");
/* harmony import */ var _runtime_s3TransferHandler_fetch_mjs__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../runtime/s3TransferHandler/fetch.mjs */ "./dist/esm/providers/s3/utils/client/runtime/s3TransferHandler/xhr.mjs");
/* harmony import */ var fast_xml_parser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! fast-xml-parser */ "?2abf");
/* harmony import */ var buffer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! buffer */ "?46b7");
/* harmony import */ var _utils_deserializeHelpers_mjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../utils/deserializeHelpers.mjs */ "./dist/esm/providers/s3/utils/client/utils/deserializeHelpers.mjs");
/* harmony import */ var _utils_serializeHelpers_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/serializeHelpers.mjs */ "./dist/esm/providers/s3/utils/client/utils/serializeHelpers.mjs");
/* harmony import */ var _validateObjectUrl_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../validateObjectUrl.mjs */ "./dist/esm/providers/s3/utils/validateObjectUrl.mjs");
/* harmony import */ var _base_mjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./base.mjs */ "./dist/esm/providers/s3/utils/client/s3data/base.mjs");












// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
const putObjectSerializer = async (input, endpoint) => {
    const headers = {
        ...(await (0,_utils_serializeHelpers_mjs__WEBPACK_IMPORTED_MODULE_2__.serializeObjectConfigsToHeaders)({
            ...input,
            ContentType: input.ContentType ?? 'application/octet-stream',
        })),
        ...(0,_utils_serializeHelpers_mjs__WEBPACK_IMPORTED_MODULE_2__.assignStringVariables)({
            'content-md5': input.ContentMD5,
            'x-amz-checksum-crc32': input.ChecksumCRC32,
            'x-amz-expected-bucket-owner': input.ExpectedBucketOwner,
            'If-None-Match': input.IfNoneMatch,
        }),
    };
    const url = new _aws_amplify_core_internals_utils__WEBPACK_IMPORTED_MODULE_3__.AmplifyUrl(endpoint.url.toString());
    (0,_utils_serializeHelpers_mjs__WEBPACK_IMPORTED_MODULE_2__.validateS3RequiredParameter)(!!input.Key, 'Key');
    url.pathname = (0,_utils_serializeHelpers_mjs__WEBPACK_IMPORTED_MODULE_2__.serializePathnameObjectKey)(url, input.Key);
    (0,_validateObjectUrl_mjs__WEBPACK_IMPORTED_MODULE_4__.validateObjectUrl)({
        bucketName: input.Bucket,
        key: input.Key,
        objectURL: url,
    });
    return {
        method: 'PUT',
        headers,
        url,
        body: input.Body,
    };
};
const putObjectDeserializer = async (response) => {
    if (response.statusCode >= 300) {
        const error = (await (0,_base_mjs__WEBPACK_IMPORTED_MODULE_5__.parseXmlError)(response));
        throw (0,_utils_deserializeHelpers_mjs__WEBPACK_IMPORTED_MODULE_6__.buildStorageServiceError)(error, response.statusCode);
    }
    else {
        return {
            ...(0,_utils_deserializeHelpers_mjs__WEBPACK_IMPORTED_MODULE_6__.map)(response.headers, {
                ETag: 'etag',
                VersionId: 'x-amz-version-id',
            }),
            $metadata: (0,_aws_amplify_core_internals_aws_client_utils__WEBPACK_IMPORTED_MODULE_7__.parseMetadata)(response),
        };
    }
};
const putObject = (0,_aws_amplify_core_internals_aws_client_utils_composers__WEBPACK_IMPORTED_MODULE_8__.composeServiceApi)(_runtime_s3TransferHandler_fetch_mjs__WEBPACK_IMPORTED_MODULE_9__.s3TransferHandler, putObjectSerializer, putObjectDeserializer, { ..._base_mjs__WEBPACK_IMPORTED_MODULE_5__.defaultConfig, responseType: 'text' });


//# sourceMappingURL=putObject.mjs.map


/***/ }),

/***/ "./dist/esm/providers/s3/utils/client/s3data/uploadPart.mjs":
/*!******************************************************************!*\
  !*** ./dist/esm/providers/s3/utils/client/s3data/uploadPart.mjs ***!
  \******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   uploadPart: () => (/* binding */ uploadPart)
/* harmony export */ });
/* harmony import */ var _aws_amplify_core_internals_aws_client_utils__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @aws-amplify/core/internals/aws-client-utils */ "../core/dist/esm/clients/serde/responseInfo.mjs");
/* harmony import */ var _aws_amplify_core_internals_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @aws-amplify/core/internals/utils */ "../core/dist/esm/utils/amplifyUrl/index.mjs");
/* harmony import */ var _aws_amplify_core_internals_aws_client_utils_composers__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @aws-amplify/core/internals/aws-client-utils/composers */ "../core/dist/esm/clients/internal/composeServiceApi.mjs");
/* harmony import */ var _runtime_s3TransferHandler_fetch_mjs__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../runtime/s3TransferHandler/fetch.mjs */ "./dist/esm/providers/s3/utils/client/runtime/s3TransferHandler/xhr.mjs");
/* harmony import */ var fast_xml_parser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! fast-xml-parser */ "?2abf");
/* harmony import */ var buffer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! buffer */ "?46b7");
/* harmony import */ var _utils_deserializeHelpers_mjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../utils/deserializeHelpers.mjs */ "./dist/esm/providers/s3/utils/client/utils/deserializeHelpers.mjs");
/* harmony import */ var _utils_serializeHelpers_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/serializeHelpers.mjs */ "./dist/esm/providers/s3/utils/client/utils/serializeHelpers.mjs");
/* harmony import */ var _validateObjectUrl_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../validateObjectUrl.mjs */ "./dist/esm/providers/s3/utils/validateObjectUrl.mjs");
/* harmony import */ var _base_mjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./base.mjs */ "./dist/esm/providers/s3/utils/client/s3data/base.mjs");












// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
const uploadPartSerializer = async (input, endpoint) => {
    const headers = {
        ...(0,_utils_serializeHelpers_mjs__WEBPACK_IMPORTED_MODULE_2__.assignStringVariables)({
            'x-amz-checksum-crc32': input.ChecksumCRC32,
            'content-md5': input.ContentMD5,
            'x-amz-expected-bucket-owner': input.ExpectedBucketOwner,
        }),
        'content-type': 'application/octet-stream',
    };
    const url = new _aws_amplify_core_internals_utils__WEBPACK_IMPORTED_MODULE_3__.AmplifyUrl(endpoint.url.toString());
    (0,_utils_serializeHelpers_mjs__WEBPACK_IMPORTED_MODULE_2__.validateS3RequiredParameter)(!!input.Key, 'Key');
    url.pathname = (0,_utils_serializeHelpers_mjs__WEBPACK_IMPORTED_MODULE_2__.serializePathnameObjectKey)(url, input.Key);
    (0,_utils_serializeHelpers_mjs__WEBPACK_IMPORTED_MODULE_2__.validateS3RequiredParameter)(!!input.PartNumber, 'PartNumber');
    (0,_utils_serializeHelpers_mjs__WEBPACK_IMPORTED_MODULE_2__.validateS3RequiredParameter)(!!input.UploadId, 'UploadId');
    url.search = new _aws_amplify_core_internals_utils__WEBPACK_IMPORTED_MODULE_3__.AmplifyUrlSearchParams({
        partNumber: input.PartNumber + '',
        uploadId: input.UploadId,
    }).toString();
    (0,_validateObjectUrl_mjs__WEBPACK_IMPORTED_MODULE_4__.validateObjectUrl)({
        bucketName: input.Bucket,
        key: input.Key,
        objectURL: url,
    });
    return {
        method: 'PUT',
        headers,
        url,
        body: input.Body,
    };
};
const uploadPartDeserializer = async (response) => {
    if (response.statusCode >= 300) {
        const error = (await (0,_base_mjs__WEBPACK_IMPORTED_MODULE_5__.parseXmlError)(response));
        throw (0,_utils_deserializeHelpers_mjs__WEBPACK_IMPORTED_MODULE_6__.buildStorageServiceError)(error, response.statusCode);
    }
    else {
        return {
            ...(0,_utils_deserializeHelpers_mjs__WEBPACK_IMPORTED_MODULE_6__.map)(response.headers, {
                ETag: 'etag',
            }),
            $metadata: (0,_aws_amplify_core_internals_aws_client_utils__WEBPACK_IMPORTED_MODULE_7__.parseMetadata)(response),
        };
    }
};
const uploadPart = (0,_aws_amplify_core_internals_aws_client_utils_composers__WEBPACK_IMPORTED_MODULE_8__.composeServiceApi)(_runtime_s3TransferHandler_fetch_mjs__WEBPACK_IMPORTED_MODULE_9__.s3TransferHandler, uploadPartSerializer, uploadPartDeserializer, { ..._base_mjs__WEBPACK_IMPORTED_MODULE_5__.defaultConfig, responseType: 'text' });


//# sourceMappingURL=uploadPart.mjs.map


/***/ }),

/***/ "./dist/esm/providers/s3/utils/client/utils/createRetryDecider.mjs":
/*!*************************************************************************!*\
  !*** ./dist/esm/providers/s3/utils/client/utils/createRetryDecider.mjs ***!
  \*************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createRetryDecider: () => (/* binding */ createRetryDecider)
/* harmony export */ });
/* harmony import */ var _aws_amplify_core_internals_aws_client_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @aws-amplify/core/internals/aws-client-utils */ "../core/dist/esm/clients/middleware/retry/defaultRetryDecider.mjs");


// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
/**
 * Factory of a {@link RetryDecider} function.
 *
 * @param errorParser function to parse HTTP response wth XML payload to JS
 * 	Error instance.
 * @returns A structure indicating if the response is retryable; And if it is a
 * 	CredentialsExpiredError
 */
const createRetryDecider = (errorParser) => async (response, error, middlewareContext) => {
    const defaultRetryDecider = (0,_aws_amplify_core_internals_aws_client_utils__WEBPACK_IMPORTED_MODULE_0__.getRetryDecider)(errorParser);
    const defaultRetryDecision = await defaultRetryDecider(response, error);
    if (!response) {
        return { retryable: defaultRetryDecision.retryable };
    }
    const parsedError = await errorParser(response);
    const errorCode = parsedError?.name;
    const errorMessage = parsedError?.message;
    const isCredentialsExpired = isCredentialsExpiredError(errorCode, errorMessage);
    return {
        retryable: defaultRetryDecision.retryable ||
            // If we know the previous retry attempt sets isCredentialsExpired in the
            // middleware context, we don't want to retry anymore.
            !!(isCredentialsExpired && !middlewareContext?.isCredentialsExpired),
        isCredentialsExpiredError: isCredentialsExpired,
    };
};
// Ref: https://github.com/aws/aws-sdk-js/blob/54829e341181b41573c419bd870dd0e0f8f10632/lib/event_listeners.js#L522-L541
const INVALID_TOKEN_ERROR_CODES = [
    'RequestExpired',
    'ExpiredTokenException',
    'ExpiredToken',
];
/**
 * Given an error code, returns true if it is related to invalid credentials.
 *
 * @param errorCode String representation of some error.
 * @returns True if given error indicates the credentials used to authorize request
 * are invalid.
 */
const isCredentialsExpiredError = (errorCode, errorMessage) => {
    const isExpiredTokenError = !!errorCode && INVALID_TOKEN_ERROR_CODES.includes(errorCode);
    // Ref: https://github.com/aws/aws-sdk-js/blob/54829e341181b41573c419bd870dd0e0f8f10632/lib/event_listeners.js#L536-L539
    const isExpiredSignatureError = !!errorCode &&
        !!errorMessage &&
        errorCode.includes('Signature') &&
        errorMessage.includes('expired');
    return isExpiredTokenError || isExpiredSignatureError;
};


//# sourceMappingURL=createRetryDecider.mjs.map


/***/ }),

/***/ "./dist/esm/providers/s3/utils/client/utils/deserializeHelpers.mjs":
/*!*************************************************************************!*\
  !*** ./dist/esm/providers/s3/utils/client/utils/deserializeHelpers.mjs ***!
  \*************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   buildStorageServiceError: () => (/* binding */ buildStorageServiceError),
/* harmony export */   createStringEnumDeserializer: () => (/* binding */ createStringEnumDeserializer),
/* harmony export */   deserializeBoolean: () => (/* binding */ deserializeBoolean),
/* harmony export */   deserializeCompletedPartList: () => (/* binding */ deserializeCompletedPartList),
/* harmony export */   deserializeMetadata: () => (/* binding */ deserializeMetadata),
/* harmony export */   deserializeNumber: () => (/* binding */ deserializeNumber),
/* harmony export */   deserializeTimestamp: () => (/* binding */ deserializeTimestamp),
/* harmony export */   emptyArrayGuard: () => (/* binding */ emptyArrayGuard),
/* harmony export */   map: () => (/* binding */ map)
/* harmony export */ });
/* harmony import */ var _errors_StorageError_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../../errors/StorageError.mjs */ "./dist/esm/errors/StorageError.mjs");


// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
/**
 * Maps an object to a new object using the provided instructions.
 * The instructions are a map of the returning mapped object's property names to a single instruction of how to map the
 * value from the original object to the new object. There are two types of instructions:
 *
 * 1. A string representing the property name of the original object to map to the new object. The value mapped from
 * the original object will be the same as the value in the new object, and it can ONLY be string.
 *
 * 2. An array of two elements. The first element is the property name of the original object to map to the new object.
 * The second element is a function that takes the value from the original object and returns the value to be mapped to
 * the new object. The function can return any type.
 *
 * Example:
 * ```typescript
 * const input = {
 *   Foo: 'foo',
 *   BarList: [{value: 'bar1'}, {value: 'bar2'}]
 * }
 * const output = map(input, {
 *   someFoo: 'Foo',
 *   bar: ['BarList', (barList) => barList.map(bar => bar.value)]
 *   baz: 'Baz' // Baz does not exist in input, so it will not be in the output.
 * });
 * // output = { someFoo: 'foo', bar: ['bar1', 'bar2'] }
 * ```
 *
 * @param obj The object containing the data to compose mapped object.
 * @param instructions The instructions mapping the object values to the new object.
 * @returns A new object with the mapped values.
 *
 * @internal
 */
const map = (obj, instructions) => {
    const result = {};
    for (const [key, instruction] of Object.entries(instructions)) {
        const [accessor, deserializer] = Array.isArray(instruction)
            ? instruction
            : [instruction];
        if (Object.prototype.hasOwnProperty.call(obj, accessor)) {
            result[key] = deserializer
                ? deserializer(obj[accessor])
                : String(obj[accessor]);
        }
    }
    return result;
};
/**
 * Deserializes a string to a number. Returns undefined if input is undefined.
 *
 * @internal
 */
const deserializeNumber = (value) => value ? Number(value) : undefined;
/**
 * Deserializes a string to a boolean. Returns undefined if input is undefined. Returns true if input is 'true',
 * otherwise false.
 *
 * @internal
 */
const deserializeBoolean = (value) => {
    return value ? value === 'true' : undefined;
};
/**
 * Deserializes a string to a Date. Returns undefined if input is undefined.
 * It supports epoch timestamp; rfc3339(cannot have a UTC, fractional precision supported); rfc7231(section 7.1.1.1)
 *
 * @see https://www.epoch101.com/
 * @see https://datatracker.ietf.org/doc/html/rfc3339.html#section-5.6
 * @see https://datatracker.ietf.org/doc/html/rfc7231.html#section-7.1.1.1
 *
 * @note For bundle size consideration, we use Date constructor to parse the timestamp string. There might be slight
 * difference among browsers.
 *
 * @internal
 */
const deserializeTimestamp = (value) => {
    return value ? new Date(value) : undefined;
};
/**
 * Create a function deserializing a string to an enum value. If the string is not a valid enum value, it throws a
 * StorageError.
 *
 * @example
 * ```typescript
 * const deserializeStringEnum = createStringEnumDeserializer(['a', 'b', 'c'] as const, 'FieldName');
 * const deserializedArray = ['a', 'b', 'c'].map(deserializeStringEnum);
 * // deserializedArray = ['a', 'b', 'c']
 *
 * const invalidValue = deserializeStringEnum('d');
 * // Throws InvalidFieldName: Invalid FieldName: d
 * ```
 *
 * @internal
 */
const createStringEnumDeserializer = (enumValues, fieldName) => {
    const deserializeStringEnum = (value) => {
        const parsedEnumValue = value
            ? enumValues.find(enumValue => enumValue === value)
            : undefined;
        if (!parsedEnumValue) {
            throw new _errors_StorageError_mjs__WEBPACK_IMPORTED_MODULE_0__.StorageError({
                name: `Invalid${fieldName}`,
                message: `Invalid ${fieldName}: ${value}`,
                recoverySuggestion: 'This is likely to be a bug. Please reach out to library authors.',
            });
        }
        return parsedEnumValue;
    };
    return deserializeStringEnum;
};
/**
 * Function that makes sure the deserializer receives non-empty array.
 *
 * @internal
 */
const emptyArrayGuard = (value, deserializer) => {
    if (value === '') {
        return [];
    }
    const valueArray = (Array.isArray(value) ? value : [value]).filter(e => e != null);
    return deserializer(valueArray);
};
/**
 * @internal
 */
const deserializeMetadata = (headers) => {
    const objectMetadataHeaderPrefix = 'x-amz-meta-';
    const deserialized = Object.keys(headers)
        .filter(header => header.startsWith(objectMetadataHeaderPrefix))
        .reduce((acc, header) => {
        acc[header.replace(objectMetadataHeaderPrefix, '')] = headers[header];
        return acc;
    }, {});
    return Object.keys(deserialized).length > 0 ? deserialized : undefined;
};
/**
 * Internal-only method to create a new StorageError from a service error.
 *
 * @internal
 */
const buildStorageServiceError = (error, statusCode) => {
    const storageError = new _errors_StorageError_mjs__WEBPACK_IMPORTED_MODULE_0__.StorageError({
        name: error.name,
        message: error.message,
    });
    if (statusCode === 404) {
        storageError.recoverySuggestion =
            'Please add the object with this key to the bucket as the key is not found.';
    }
    return storageError;
};
/**
 * Internal-only method used for deserializing the parts of a multipart upload.
 *
 * @internal
 */
const deserializeCompletedPartList = (input) => input.map(item => map(item, {
    PartNumber: ['PartNumber', deserializeNumber],
    ETag: 'ETag',
    ChecksumCRC32: 'ChecksumCRC32',
}));


//# sourceMappingURL=deserializeHelpers.mjs.map


/***/ }),

/***/ "./dist/esm/providers/s3/utils/client/utils/integrityHelpers.mjs":
/*!***********************************************************************!*\
  !*** ./dist/esm/providers/s3/utils/client/utils/integrityHelpers.mjs ***!
  \***********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   bothNilOrEqual: () => (/* binding */ bothNilOrEqual),
/* harmony export */   isEqual: () => (/* binding */ isEqual),
/* harmony export */   isNil: () => (/* binding */ isNil),
/* harmony export */   isObject: () => (/* binding */ isObject)
/* harmony export */ });
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
const isNil = (value) => {
    return value === undefined || value === null;
};
const bothNilOrEqual = (original, output) => {
    return (isNil(original) && isNil(output)) || original === output;
};
/**
 * This function is used to determine if a value is an object.
 * It excludes arrays and null values.
 *
 * @param value
 * @returns
 */
const isObject = (value) => {
    return value != null && typeof value === 'object' && !Array.isArray(value);
};
/**
 * This function is used to compare two objects and determine if they are equal.
 * It handles nested objects and arrays as well.
 * Array order is not taken into account.
 *
 * @param object
 * @param other
 * @returns
 */
const isEqual = (object, other) => {
    if (Array.isArray(object) && !Array.isArray(other)) {
        return false;
    }
    if (!Array.isArray(object) && Array.isArray(other)) {
        return false;
    }
    if (Array.isArray(object) && Array.isArray(other)) {
        return (object.length === other.length &&
            object.every((val, ix) => isEqual(val, other[ix])));
    }
    if (!isObject(object) || !isObject(other)) {
        return object === other;
    }
    const objectKeys = Object.keys(object);
    const otherKeys = Object.keys(other);
    if (objectKeys.length !== otherKeys.length) {
        return false;
    }
    return objectKeys.every(key => {
        return (otherKeys.includes(key) &&
            isEqual(object[key], other[key]));
    });
};


//# sourceMappingURL=integrityHelpers.mjs.map


/***/ }),

/***/ "./dist/esm/providers/s3/utils/client/utils/parsePayload.mjs":
/*!*******************************************************************!*\
  !*** ./dist/esm/providers/s3/utils/client/utils/parsePayload.mjs ***!
  \*******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createXmlErrorParser: () => (/* binding */ createXmlErrorParser),
/* harmony export */   parseXmlBody: () => (/* binding */ parseXmlBody)
/* harmony export */ });
/* harmony import */ var _aws_amplify_core_internals_aws_client_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @aws-amplify/core/internals/aws-client-utils */ "../core/dist/esm/clients/serde/responseInfo.mjs");
/* harmony import */ var _runtime_xmlParser_pureJs_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../runtime/xmlParser/pureJs.mjs */ "./dist/esm/providers/s3/utils/client/runtime/xmlParser/dom.mjs");
/* harmony import */ var buffer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! buffer */ "?dcad");






// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
/**
 * Factory creating a parser that parses the JS Error object from the XML
 * response payload.
 *
 * @param input Input object
 * @param input.noErrorWrapping Whether the error code and message are located
 *   directly in the root XML element, or in a nested `<Error>` element.
 *   See: https://smithy.io/2.0/aws/protocols/aws-restxml-protocol.html#restxml-errors
 *
 *   Default to false.
 *
 * @internal
 */
const createXmlErrorParser = ({ noErrorWrapping = false, } = {}) => async (response) => {
    if (!response || response.statusCode < 300) {
        return;
    }
    const { statusCode } = response;
    const body = await parseXmlBody(response);
    const errorLocation = noErrorWrapping ? body : body.Error;
    const code = errorLocation?.Code
        ? errorLocation.Code
        : statusCode === 404
            ? 'NotFound'
            : statusCode.toString();
    const message = errorLocation?.message ?? errorLocation?.Message ?? code;
    const error = new Error(message);
    return Object.assign(error, {
        name: code,
        $metadata: (0,_aws_amplify_core_internals_aws_client_utils__WEBPACK_IMPORTED_MODULE_1__.parseMetadata)(response),
    });
};
const parseXmlBody = async (response) => {
    if (!response.body) {
        // S3 can return 200 without a body indicating failure.
        throw new Error('S3 aborted request.');
    }
    const data = await response.body.text();
    if (data?.length > 0) {
        try {
            return _runtime_xmlParser_pureJs_mjs__WEBPACK_IMPORTED_MODULE_2__.parser.parse(data);
        }
        catch (error) {
            throw new Error(`Failed to parse XML response: ${error}`);
        }
    }
    return {};
};


//# sourceMappingURL=parsePayload.mjs.map


/***/ }),

/***/ "./dist/esm/providers/s3/utils/client/utils/serializeHelpers.mjs":
/*!***********************************************************************!*\
  !*** ./dist/esm/providers/s3/utils/client/utils/serializeHelpers.mjs ***!
  \***********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   assignStringVariables: () => (/* binding */ assignStringVariables),
/* harmony export */   serializeObjectConfigsToHeaders: () => (/* binding */ serializeObjectConfigsToHeaders),
/* harmony export */   serializePathnameObjectKey: () => (/* binding */ serializePathnameObjectKey),
/* harmony export */   validateS3RequiredParameter: () => (/* binding */ validateS3RequiredParameter)
/* harmony export */ });
/* harmony import */ var _aws_amplify_core_internals_aws_client_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @aws-amplify/core/internals/aws-client-utils */ "../core/dist/esm/clients/middleware/signing/utils/extendedEncodeURIComponent.mjs");
/* harmony import */ var _aws_amplify_core_internals_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @aws-amplify/core/internals/utils */ "../core/dist/esm/types/errors.mjs");
/* harmony import */ var _errors_StorageError_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../../errors/StorageError.mjs */ "./dist/esm/errors/StorageError.mjs");




// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
/**
 * @internal
 */
const assignStringVariables = (values) => {
    const queryParams = {};
    for (const [key, value] of Object.entries(values)) {
        if (value != null) {
            queryParams[key] = value.toString();
        }
    }
    return queryParams;
};
/**
 * Serailize the parameters for configuring the S3 object. Currently used by
 * `putObject` and `createMultipartUpload` API.
 *
 * @internal
 */
const serializeObjectConfigsToHeaders = async (input) => ({
    ...assignStringVariables({
        'x-amz-acl': input.ACL,
        'cache-control': input.CacheControl,
        'content-disposition': input.ContentDisposition,
        'content-language': input.ContentLanguage,
        'content-encoding': input.ContentEncoding,
        'content-type': input.ContentType,
        expires: input.Expires?.toUTCString(),
        'x-amz-tagging': input.Tagging,
        ...serializeMetadata(input.Metadata),
    }),
});
const serializeMetadata = (metadata = {}) => Object.keys(metadata).reduce((acc, suffix) => {
    acc[`x-amz-meta-${suffix.toLowerCase()}`] = metadata[suffix];
    return acc;
}, {});
/**
 * Serialize the object key to a URL pathname.
 * @see https://github.com/aws/aws-sdk-js-v3/blob/7ed7101dcc4e81038b6c7f581162b959e6b33a04/clients/client-s3/src/protocols/Aws_restXml.ts#L1108
 *
 * @internal
 */
const serializePathnameObjectKey = (url, key) => {
    return (url.pathname.replace(/\/$/, '') +
        `/${key.split('/').map(_aws_amplify_core_internals_aws_client_utils__WEBPACK_IMPORTED_MODULE_0__.extendedEncodeURIComponent).join('/')}`);
};
function validateS3RequiredParameter(assertion, paramName) {
    if (!assertion) {
        throw new _errors_StorageError_mjs__WEBPACK_IMPORTED_MODULE_1__.StorageError({
            name: _aws_amplify_core_internals_utils__WEBPACK_IMPORTED_MODULE_2__.AmplifyErrorCode.Unknown,
            message: 'An unknown error has occurred.',
            underlyingError: new TypeError(`Expected a non-null value for S3 parameter ${paramName}`),
            recoverySuggestion: 'This is likely to be a bug. Please reach out to library authors.',
        });
    }
}


//# sourceMappingURL=serializeHelpers.mjs.map


/***/ }),

/***/ "./dist/esm/providers/s3/utils/constants.mjs":
/*!***************************************************!*\
  !*** ./dist/esm/providers/s3/utils/constants.mjs ***!
  \***************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CHECKSUM_ALGORITHM_CRC32: () => (/* binding */ CHECKSUM_ALGORITHM_CRC32),
/* harmony export */   DEFAULT_ACCESS_LEVEL: () => (/* binding */ DEFAULT_ACCESS_LEVEL),
/* harmony export */   DEFAULT_DELIMITER: () => (/* binding */ DEFAULT_DELIMITER),
/* harmony export */   DEFAULT_PART_SIZE: () => (/* binding */ DEFAULT_PART_SIZE),
/* harmony export */   DEFAULT_PRESIGN_EXPIRATION: () => (/* binding */ DEFAULT_PRESIGN_EXPIRATION),
/* harmony export */   DEFAULT_QUEUE_SIZE: () => (/* binding */ DEFAULT_QUEUE_SIZE),
/* harmony export */   LOCAL_TESTING_S3_ENDPOINT: () => (/* binding */ LOCAL_TESTING_S3_ENDPOINT),
/* harmony export */   MAX_OBJECT_SIZE: () => (/* binding */ MAX_OBJECT_SIZE),
/* harmony export */   MAX_PARTS_COUNT: () => (/* binding */ MAX_PARTS_COUNT),
/* harmony export */   MAX_URL_EXPIRATION: () => (/* binding */ MAX_URL_EXPIRATION),
/* harmony export */   STORAGE_INPUT_KEY: () => (/* binding */ STORAGE_INPUT_KEY),
/* harmony export */   STORAGE_INPUT_PATH: () => (/* binding */ STORAGE_INPUT_PATH),
/* harmony export */   STORAGE_INPUT_PREFIX: () => (/* binding */ STORAGE_INPUT_PREFIX),
/* harmony export */   UPLOADS_STORAGE_KEY: () => (/* binding */ UPLOADS_STORAGE_KEY)
/* harmony export */ });
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
const LOCAL_TESTING_S3_ENDPOINT = 'localhost:4566';
const DEFAULT_ACCESS_LEVEL = 'guest';
const DEFAULT_PRESIGN_EXPIRATION = 900;
const MAX_URL_EXPIRATION = 7 * 24 * 60 * 60 * 1000;
const MiB = 1024 * 1024;
const GiB = 1024 * MiB;
const TiB = 1024 * GiB;
/**
 * Default part size in MB that is used to determine if an upload task is single part or multi part.
 */
const DEFAULT_PART_SIZE = 5 * MiB;
const MAX_OBJECT_SIZE = 5 * TiB;
const MAX_PARTS_COUNT = 10000;
const DEFAULT_QUEUE_SIZE = 4;
const UPLOADS_STORAGE_KEY = '__uploadInProgress';
const STORAGE_INPUT_PREFIX = 'prefix';
const STORAGE_INPUT_KEY = 'key';
const STORAGE_INPUT_PATH = 'path';
const DEFAULT_DELIMITER = '/';
const CHECKSUM_ALGORITHM_CRC32 = 'crc-32';


//# sourceMappingURL=constants.mjs.map


/***/ }),

/***/ "./dist/esm/providers/s3/utils/constructContentDisposition.mjs":
/*!*********************************************************************!*\
  !*** ./dist/esm/providers/s3/utils/constructContentDisposition.mjs ***!
  \*********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   constructContentDisposition: () => (/* binding */ constructContentDisposition)
/* harmony export */ });
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
const constructContentDisposition = (contentDisposition) => {
    if (!contentDisposition)
        return undefined;
    if (typeof contentDisposition === 'string')
        return contentDisposition;
    const { type, filename } = contentDisposition;
    return filename !== undefined ? `${type}; filename="${filename}"` : type;
};


//# sourceMappingURL=constructContentDisposition.mjs.map


/***/ }),

/***/ "./dist/esm/providers/s3/utils/crc32.mjs":
/*!***********************************************!*\
  !*** ./dist/esm/providers/s3/utils/crc32.mjs ***!
  \***********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   calculateContentCRC32: () => (/* binding */ calculateContentCRC32)
/* harmony export */ });
/* harmony import */ var crc_32__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! crc-32 */ "../../node_modules/crc-32/crc32.js");
/* harmony import */ var _hexUtils_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./hexUtils.mjs */ "./dist/esm/providers/s3/utils/hexUtils.mjs");
/* harmony import */ var _readFile_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./readFile.mjs */ "./dist/esm/providers/s3/utils/readFile.mjs");




// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
const CHUNK_SIZE = 1024 * 1024; // 1MB chunks
const calculateContentCRC32 = async (content, seed = 0) => {
    let internalSeed = seed;
    if (content instanceof ArrayBuffer || ArrayBuffer.isView(content)) {
        let uint8Array;
        if (content instanceof ArrayBuffer) {
            uint8Array = new Uint8Array(content);
        }
        else {
            uint8Array = new Uint8Array(content.buffer, content.byteOffset, content.byteLength);
        }
        let offset = 0;
        while (offset < uint8Array.length) {
            const end = Math.min(offset + CHUNK_SIZE, uint8Array.length);
            const chunk = uint8Array.slice(offset, end);
            internalSeed = crc_32__WEBPACK_IMPORTED_MODULE_0__.buf(chunk, internalSeed) >>> 0;
            offset = end;
        }
    }
    else {
        let blob;
        if (content instanceof Blob) {
            blob = content;
        }
        else {
            blob = new Blob([content]);
        }
        let offset = 0;
        while (offset < blob.size) {
            const end = Math.min(offset + CHUNK_SIZE, blob.size);
            const chunk = blob.slice(offset, end);
            const arrayBuffer = await (0,_readFile_mjs__WEBPACK_IMPORTED_MODULE_1__.readFile)(chunk);
            const uint8Array = new Uint8Array(arrayBuffer);
            internalSeed = crc_32__WEBPACK_IMPORTED_MODULE_0__.buf(uint8Array, internalSeed) >>> 0;
            offset = end;
        }
    }
    const hex = internalSeed.toString(16).padStart(8, '0');
    return {
        checksumArrayBuffer: (0,_hexUtils_mjs__WEBPACK_IMPORTED_MODULE_2__.hexToArrayBuffer)(hex),
        checksum: (0,_hexUtils_mjs__WEBPACK_IMPORTED_MODULE_2__.hexToBase64)(hex),
        seed: internalSeed,
    };
};


//# sourceMappingURL=crc32.mjs.map


/***/ }),

/***/ "./dist/esm/providers/s3/utils/getCombinedCrc32.native.mjs":
/*!*****************************************************************!*\
  !*** ./dist/esm/providers/s3/utils/getCombinedCrc32.native.mjs ***!
  \*****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getCombinedCrc32: () => (/* binding */ getCombinedCrc32)
/* harmony export */ });
/* harmony import */ var _apis_internal_uploadData_multipart_getDataChunker_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../apis/internal/uploadData/multipart/getDataChunker.mjs */ "./dist/esm/providers/s3/apis/internal/uploadData/multipart/getDataChunker.mjs");
/* harmony import */ var _crc32_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./crc32.mjs */ "./dist/esm/providers/s3/utils/crc32.mjs");



// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
/**
 * Calculates a combined CRC32 checksum for the given data.
 *
 * This function chunks the input data, calculates CRC32 for each chunk,
 * and then combines these checksums into a single value.
 *
 * @async
 * @param {StorageUploadDataPayload} data - The data to calculate the checksum for.
 * @param {number | undefined} size - The size of each chunk. If undefined, a default chunk size will be used.
 * @returns {Promise<string>} A promise that resolves to a string containing the combined CRC32 checksum
 *                            and the number of chunks, separated by a hyphen.
 */
const getCombinedCrc32 = async (data, size) => {
    const crc32List = [];
    const dataChunker = (0,_apis_internal_uploadData_multipart_getDataChunker_mjs__WEBPACK_IMPORTED_MODULE_0__.getDataChunker)(data, size);
    let totalLength = 0;
    for (const { data: checkData } of dataChunker) {
        const checksum = new Uint8Array((await (0,_crc32_mjs__WEBPACK_IMPORTED_MODULE_1__.calculateContentCRC32)(checkData)).checksumArrayBuffer);
        totalLength += checksum.length;
        crc32List.push(checksum);
    }
    // Combine all Uint8Arrays into a single Uint8Array
    const combinedArray = new Uint8Array(totalLength);
    let offset = 0;
    for (const crc32Hash of crc32List) {
        combinedArray.set(crc32Hash, offset);
        offset += crc32Hash.length;
    }
    return `${(await (0,_crc32_mjs__WEBPACK_IMPORTED_MODULE_1__.calculateContentCRC32)(combinedArray.buffer)).checksum}-${crc32List.length}`;
};


//# sourceMappingURL=getCombinedCrc32.native.mjs.map


/***/ }),

/***/ "./dist/esm/providers/s3/utils/hexUtils.mjs":
/*!**************************************************!*\
  !*** ./dist/esm/providers/s3/utils/hexUtils.mjs ***!
  \**************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   hexToArrayBuffer: () => (/* binding */ hexToArrayBuffer),
/* harmony export */   hexToBase64: () => (/* binding */ hexToBase64),
/* harmony export */   hexToUint8Array: () => (/* binding */ hexToUint8Array)
/* harmony export */ });
/* harmony import */ var fast_xml_parser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! fast-xml-parser */ "?9a72");
/* harmony import */ var _client_runtime_base64_index_native_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./client/runtime/base64/index.native.mjs */ "./dist/esm/providers/s3/utils/client/runtime/base64/index.browser.mjs");





// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
const hexToUint8Array = (hexString) => new Uint8Array((hexString.match(/\w{2}/g) ?? []).map(h => parseInt(h, 16)));
const hexToArrayBuffer = (hexString) => hexToUint8Array(hexString).buffer;
const hexToBase64 = (hexString) => (0,_client_runtime_base64_index_native_mjs__WEBPACK_IMPORTED_MODULE_1__.toBase64)(hexToUint8Array(hexString));


//# sourceMappingURL=hexUtils.mjs.map


/***/ }),

/***/ "./dist/esm/providers/s3/utils/isInputWithPath.mjs":
/*!*********************************************************!*\
  !*** ./dist/esm/providers/s3/utils/isInputWithPath.mjs ***!
  \*********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   isInputWithPath: () => (/* binding */ isInputWithPath)
/* harmony export */ });
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
const isInputWithPath = (input) => {
    return input.path !== undefined;
};


//# sourceMappingURL=isInputWithPath.mjs.map


/***/ }),

/***/ "./dist/esm/providers/s3/utils/md5.mjs":
/*!*********************************************!*\
  !*** ./dist/esm/providers/s3/utils/md5.mjs ***!
  \*********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   calculateContentMd5: () => (/* binding */ calculateContentMd5)
/* harmony export */ });
/* harmony import */ var _smithy_md5_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @smithy/md5-js */ "../../node_modules/@smithy/md5-js/dist-es/index.js");
/* harmony import */ var fast_xml_parser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! fast-xml-parser */ "?9a72");
/* harmony import */ var _client_runtime_base64_index_native_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./client/runtime/base64/index.native.mjs */ "./dist/esm/providers/s3/utils/client/runtime/base64/index.browser.mjs");
/* harmony import */ var _readFile_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./readFile.mjs */ "./dist/esm/providers/s3/utils/readFile.mjs");









// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
const calculateContentMd5 = async (content) => {
    const hasher = new _smithy_md5_js__WEBPACK_IMPORTED_MODULE_0__.Md5();
    const buffer = content instanceof Blob ? await (0,_readFile_mjs__WEBPACK_IMPORTED_MODULE_2__.readFile)(content) : content;
    hasher.update(buffer);
    const digest = await hasher.digest();
    return (0,_client_runtime_base64_index_native_mjs__WEBPACK_IMPORTED_MODULE_3__.toBase64)(digest);
};


//# sourceMappingURL=md5.mjs.map


/***/ }),

/***/ "./dist/esm/providers/s3/utils/readFile.mjs":
/*!**************************************************!*\
  !*** ./dist/esm/providers/s3/utils/readFile.mjs ***!
  \**************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   readFile: () => (/* binding */ readFile)
/* harmony export */ });
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
const readFile = (file) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
        resolve(reader.result);
    };
    reader.onabort = () => {
        reject(new Error('Read aborted'));
    };
    reader.onerror = () => {
        reject(reader.error);
    };
    reader.readAsArrayBuffer(file);
});


//# sourceMappingURL=readFile.mjs.map


/***/ }),

/***/ "./dist/esm/providers/s3/utils/resolveIdentityId.mjs":
/*!***********************************************************!*\
  !*** ./dist/esm/providers/s3/utils/resolveIdentityId.mjs ***!
  \***********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   resolveIdentityId: () => (/* binding */ resolveIdentityId)
/* harmony export */ });
/* harmony import */ var _errors_types_validation_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../errors/types/validation.mjs */ "./dist/esm/errors/types/validation.mjs");
/* harmony import */ var _errors_utils_assertValidationError_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../errors/utils/assertValidationError.mjs */ "./dist/esm/errors/utils/assertValidationError.mjs");



// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
const resolveIdentityId = (identityId) => {
    (0,_errors_utils_assertValidationError_mjs__WEBPACK_IMPORTED_MODULE_0__.assertValidationError)(!!identityId, _errors_types_validation_mjs__WEBPACK_IMPORTED_MODULE_1__.StorageValidationErrorCode.NoIdentityId);
    return identityId;
};


//# sourceMappingURL=resolveIdentityId.mjs.map


/***/ }),

/***/ "./dist/esm/providers/s3/utils/resolveS3ConfigAndInput.mjs":
/*!*****************************************************************!*\
  !*** ./dist/esm/providers/s3/utils/resolveS3ConfigAndInput.mjs ***!
  \*****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   resolveS3ConfigAndInput: () => (/* binding */ resolveS3ConfigAndInput)
/* harmony export */ });
/* harmony import */ var _errors_utils_assertValidationError_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../errors/utils/assertValidationError.mjs */ "./dist/esm/errors/utils/assertValidationError.mjs");
/* harmony import */ var _errors_types_validation_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../errors/types/validation.mjs */ "./dist/esm/errors/types/validation.mjs");
/* harmony import */ var _utils_resolvePrefix_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../utils/resolvePrefix.mjs */ "./dist/esm/utils/resolvePrefix.mjs");
/* harmony import */ var _errors_StorageError_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../errors/StorageError.mjs */ "./dist/esm/errors/StorageError.mjs");
/* harmony import */ var _errors_constants_mjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../errors/constants.mjs */ "./dist/esm/errors/constants.mjs");
/* harmony import */ var _constants_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./constants.mjs */ "./dist/esm/providers/s3/utils/constants.mjs");







// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
/**
 * resolve the common input options for S3 API handlers from Amplify configuration and library options.
 *
 * @param {AmplifyClassV6} amplify The Amplify instance.
 * @param {S3ApiOptions} apiOptions The input options for S3 provider.
 * @returns {Promise<ResolvedS3ConfigAndInput>} The resolved common input options for S3 API handlers.
 * @throws A `StorageError` with `error.name` from `StorageValidationErrorCode` indicating invalid
 *   configurations or Amplify library options.
 *
 * @internal
 */
const resolveS3ConfigAndInput = async (amplify, apiInput) => {
    const { options: apiOptions } = apiInput ?? {};
    /**
     * IdentityId is always cached in memory so we can safely make calls here. It
     * should be stable even for unauthenticated users, regardless of credentials.
     */
    const { identityId } = await amplify.Auth.fetchAuthSession();
    /**
     * A credentials provider function instead of a static credentials object is
     * used because the long-running tasks like multipart upload may span over the
     * credentials expiry. Auth.fetchAuthSession() automatically refreshes the
     * credentials if they are expired.
     *
     * The optional forceRefresh option is set when the S3 service returns expired
     * tokens error in the previous API call attempt.
     */
    const credentialsProvider = async (options) => {
        if (isLocationCredentialsProvider(apiOptions)) {
            assertStorageInput(apiInput);
        }
        // TODO: forceRefresh option of fetchAuthSession would refresh both tokens and
        // AWS credentials. So we do not support forceRefreshing from the Auth until
        // we support refreshing only the credentials.
        const { credentials } = isLocationCredentialsProvider(apiOptions)
            ? await apiOptions.locationCredentialsProvider(options)
            : await amplify.Auth.fetchAuthSession();
        (0,_errors_utils_assertValidationError_mjs__WEBPACK_IMPORTED_MODULE_0__.assertValidationError)(!!credentials, _errors_types_validation_mjs__WEBPACK_IMPORTED_MODULE_1__.StorageValidationErrorCode.NoCredentials);
        return credentials;
    };
    const { bucket: defaultBucket, region: defaultRegion, dangerouslyConnectToHttpEndpointForTesting, buckets, } = amplify.getConfig()?.Storage?.S3 ?? {};
    const { bucket = defaultBucket, region = defaultRegion } = (apiOptions?.bucket && resolveBucketConfig(apiOptions, buckets)) || {};
    (0,_errors_utils_assertValidationError_mjs__WEBPACK_IMPORTED_MODULE_0__.assertValidationError)(!!bucket, _errors_types_validation_mjs__WEBPACK_IMPORTED_MODULE_1__.StorageValidationErrorCode.NoBucket);
    (0,_errors_utils_assertValidationError_mjs__WEBPACK_IMPORTED_MODULE_0__.assertValidationError)(!!region, _errors_types_validation_mjs__WEBPACK_IMPORTED_MODULE_1__.StorageValidationErrorCode.NoRegion);
    const { defaultAccessLevel, prefixResolver = _utils_resolvePrefix_mjs__WEBPACK_IMPORTED_MODULE_2__.resolvePrefix, isObjectLockEnabled, } = amplify.libraryOptions?.Storage?.S3 ?? {};
    const accessLevel = apiOptions?.accessLevel ?? defaultAccessLevel ?? _constants_mjs__WEBPACK_IMPORTED_MODULE_3__.DEFAULT_ACCESS_LEVEL;
    const targetIdentityId = accessLevel === 'protected'
        ? (apiOptions?.targetIdentityId ?? identityId)
        : identityId;
    const keyPrefix = await prefixResolver({ accessLevel, targetIdentityId });
    return {
        s3Config: {
            credentials: credentialsProvider,
            region,
            useAccelerateEndpoint: apiOptions?.useAccelerateEndpoint,
            ...(apiOptions?.customEndpoint
                ? { customEndpoint: apiOptions.customEndpoint }
                : {}),
            ...(dangerouslyConnectToHttpEndpointForTesting
                ? {
                    customEndpoint: _constants_mjs__WEBPACK_IMPORTED_MODULE_3__.LOCAL_TESTING_S3_ENDPOINT,
                    forcePathStyle: true,
                }
                : {}),
        },
        bucket,
        keyPrefix,
        identityId,
        isObjectLockEnabled,
    };
};
const isLocationCredentialsProvider = (options) => {
    return !!options?.locationCredentialsProvider;
};
const isInputWithCallbackPath = (input) => {
    return ((input?.path &&
        typeof input.path === 'function') ||
        (input?.destination?.path &&
            typeof input.destination?.path === 'function') ||
        (input?.source?.path &&
            typeof input.source?.path === 'function'));
};
const isDeprecatedInput = (input) => {
    return (isInputWithKey(input) ||
        isInputWithPrefix(input) ||
        isInputWithCopySourceOrDestination(input));
};
const assertStorageInput = (input) => {
    if (isDeprecatedInput(input) || isInputWithCallbackPath(input)) {
        throw new _errors_StorageError_mjs__WEBPACK_IMPORTED_MODULE_4__.StorageError({
            name: _errors_constants_mjs__WEBPACK_IMPORTED_MODULE_5__.INVALID_STORAGE_INPUT,
            message: 'The input needs to have a path as a string value.',
            recoverySuggestion: 'Please provide a valid path as a string value for the input.',
        });
    }
};
const isInputWithKey = (input) => {
    return !!(typeof input.key === 'string');
};
const isInputWithPrefix = (input) => {
    return !!(typeof input.prefix === 'string');
};
const isInputWithCopySourceOrDestination = (input) => {
    return !!(typeof input.source?.key === 'string' ||
        typeof input.destination?.key === 'string');
};
const resolveBucketConfig = (apiOptions, buckets) => {
    if (typeof apiOptions.bucket === 'string') {
        const bucketConfig = buckets?.[apiOptions.bucket];
        (0,_errors_utils_assertValidationError_mjs__WEBPACK_IMPORTED_MODULE_0__.assertValidationError)(!!bucketConfig, _errors_types_validation_mjs__WEBPACK_IMPORTED_MODULE_1__.StorageValidationErrorCode.InvalidStorageBucket);
        return { bucket: bucketConfig.bucketName, region: bucketConfig.region };
    }
    if (typeof apiOptions.bucket === 'object') {
        return {
            bucket: apiOptions.bucket.bucketName,
            region: apiOptions.bucket.region,
        };
    }
};


//# sourceMappingURL=resolveS3ConfigAndInput.mjs.map


/***/ }),

/***/ "./dist/esm/providers/s3/utils/transferTask.mjs":
/*!******************************************************!*\
  !*** ./dist/esm/providers/s3/utils/transferTask.mjs ***!
  \******************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createDownloadTask: () => (/* binding */ createDownloadTask),
/* harmony export */   createUploadTask: () => (/* binding */ createUploadTask)
/* harmony export */ });
/* harmony import */ var _errors_CanceledError_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../errors/CanceledError.mjs */ "./dist/esm/errors/CanceledError.mjs");
/* harmony import */ var _utils_logger_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../utils/logger.mjs */ "./dist/esm/utils/logger.mjs");





// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
const createCancellableTask = ({ job, onCancel, }) => {
    const state = 'IN_PROGRESS';
    let canceledErrorMessage;
    const cancelableTask = {
        cancel: (message) => {
            const { state: taskState } = cancelableTask;
            if (taskState === 'CANCELED' ||
                taskState === 'ERROR' ||
                taskState === 'SUCCESS') {
                _utils_logger_mjs__WEBPACK_IMPORTED_MODULE_0__.logger.debug(`This task cannot be canceled. State: ${taskState}`);
                return;
            }
            cancelableTask.state = 'CANCELED';
            canceledErrorMessage = message;
            onCancel(canceledErrorMessage);
        },
        state,
    };
    const wrappedJobPromise = (async () => {
        try {
            const result = await job();
            cancelableTask.state = 'SUCCESS';
            return result;
        }
        catch (e) {
            if ((0,_errors_CanceledError_mjs__WEBPACK_IMPORTED_MODULE_1__.isCancelError)(e)) {
                cancelableTask.state = 'CANCELED';
                e.message = canceledErrorMessage ?? e.message;
            }
            cancelableTask.state = 'ERROR';
            throw e;
        }
    })();
    return Object.assign(cancelableTask, {
        result: wrappedJobPromise,
    });
};
const createDownloadTask = createCancellableTask;
const createUploadTask = ({ job, onCancel, onResume, onPause, isMultipartUpload, }) => {
    const cancellableTask = createCancellableTask({
        job,
        onCancel,
    });
    const uploadTask = Object.assign(cancellableTask, {
        pause: () => {
            const { state } = uploadTask;
            if (!isMultipartUpload || state !== 'IN_PROGRESS') {
                _utils_logger_mjs__WEBPACK_IMPORTED_MODULE_0__.logger.debug(`This task cannot be paused. State: ${state}`);
                return;
            }
            // TODO(eslint): remove this linter suppression.
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            uploadTask.state = 'PAUSED';
            onPause?.();
        },
        resume: () => {
            const { state } = uploadTask;
            if (!isMultipartUpload || state !== 'PAUSED') {
                _utils_logger_mjs__WEBPACK_IMPORTED_MODULE_0__.logger.debug(`This task cannot be resumed. State: ${state}`);
                return;
            }
            // TODO(eslint): remove this linter suppression.
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            uploadTask.state = 'IN_PROGRESS';
            onResume?.();
        },
    });
    return uploadTask;
};


//# sourceMappingURL=transferTask.mjs.map


/***/ }),

/***/ "./dist/esm/providers/s3/utils/urlDecoder.mjs":
/*!****************************************************!*\
  !*** ./dist/esm/providers/s3/utils/urlDecoder.mjs ***!
  \****************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   urlDecode: () => (/* binding */ urlDecode)
/* harmony export */ });
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
/**
 * Decodes a URL-encoded string by replacing '+' characters with spaces and applying `decodeURIComponent`.
 * Reference:
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/decodeURIComponent#decoding_query_parameters_from_a_url
 * @param {string} value - The URL-encoded string to decode.
 * @returns {string} The decoded string.
 */
const urlDecode = (value) => {
    return decodeURIComponent(value.replace(/\+/g, ' '));
};


//# sourceMappingURL=urlDecoder.mjs.map


/***/ }),

/***/ "./dist/esm/providers/s3/utils/userAgent.mjs":
/*!***************************************************!*\
  !*** ./dist/esm/providers/s3/utils/userAgent.mjs ***!
  \***************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getStorageUserAgentValue: () => (/* binding */ getStorageUserAgentValue)
/* harmony export */ });
/* harmony import */ var _aws_amplify_core_internals_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @aws-amplify/core/internals/utils */ "../core/dist/esm/Platform/index.mjs");
/* harmony import */ var _aws_amplify_core_internals_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @aws-amplify/core/internals/utils */ "../core/dist/esm/Platform/types.mjs");


// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
function getStorageUserAgentValue(action) {
    return (0,_aws_amplify_core_internals_utils__WEBPACK_IMPORTED_MODULE_0__.getAmplifyUserAgent)({
        category: _aws_amplify_core_internals_utils__WEBPACK_IMPORTED_MODULE_1__.Category.Storage,
        action,
    });
}


//# sourceMappingURL=userAgent.mjs.map


/***/ }),

/***/ "./dist/esm/providers/s3/utils/validateBucketOwnerID.mjs":
/*!***************************************************************!*\
  !*** ./dist/esm/providers/s3/utils/validateBucketOwnerID.mjs ***!
  \***************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   validateBucketOwnerID: () => (/* binding */ validateBucketOwnerID)
/* harmony export */ });
/* harmony import */ var _errors_types_validation_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../errors/types/validation.mjs */ "./dist/esm/errors/types/validation.mjs");
/* harmony import */ var _errors_utils_assertValidationError_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../errors/utils/assertValidationError.mjs */ "./dist/esm/errors/utils/assertValidationError.mjs");



// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
const VALID_AWS_ACCOUNT_ID_PATTERN = /^\d{12}/;
const validateBucketOwnerID = (accountID) => {
    if (accountID === undefined) {
        return;
    }
    (0,_errors_utils_assertValidationError_mjs__WEBPACK_IMPORTED_MODULE_0__.assertValidationError)(VALID_AWS_ACCOUNT_ID_PATTERN.test(accountID), _errors_types_validation_mjs__WEBPACK_IMPORTED_MODULE_1__.StorageValidationErrorCode.InvalidAWSAccountID);
};


//# sourceMappingURL=validateBucketOwnerID.mjs.map


/***/ }),

/***/ "./dist/esm/providers/s3/utils/validateMultipartUploadXML.mjs":
/*!********************************************************************!*\
  !*** ./dist/esm/providers/s3/utils/validateMultipartUploadXML.mjs ***!
  \********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   validateMultipartUploadXML: () => (/* binding */ validateMultipartUploadXML)
/* harmony export */ });
/* harmony import */ var _errors_IntegrityError_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../errors/IntegrityError.mjs */ "./dist/esm/errors/IntegrityError.mjs");
/* harmony import */ var _client_runtime_xmlParser_pureJs_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./client/runtime/xmlParser/pureJs.mjs */ "./dist/esm/providers/s3/utils/client/runtime/xmlParser/dom.mjs");
/* harmony import */ var buffer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! buffer */ "?0f8e");
/* harmony import */ var _client_utils_deserializeHelpers_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./client/utils/deserializeHelpers.mjs */ "./dist/esm/providers/s3/utils/client/utils/deserializeHelpers.mjs");
/* harmony import */ var _client_utils_integrityHelpers_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./client/utils/integrityHelpers.mjs */ "./dist/esm/providers/s3/utils/client/utils/integrityHelpers.mjs");










// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
function validateMultipartUploadXML(input, xml) {
    if (!input.Parts) {
        throw new _errors_IntegrityError_mjs__WEBPACK_IMPORTED_MODULE_1__.IntegrityError();
    }
    const parsedXML = _client_runtime_xmlParser_pureJs_mjs__WEBPACK_IMPORTED_MODULE_2__.parser.parse(xml);
    const mappedCompletedMultipartUpload = (0,_client_utils_deserializeHelpers_mjs__WEBPACK_IMPORTED_MODULE_3__.map)(parsedXML, {
        Parts: [
            'Part',
            value => (0,_client_utils_deserializeHelpers_mjs__WEBPACK_IMPORTED_MODULE_3__.emptyArrayGuard)(value, _client_utils_deserializeHelpers_mjs__WEBPACK_IMPORTED_MODULE_3__.deserializeCompletedPartList),
        ],
    });
    if (!(0,_client_utils_integrityHelpers_mjs__WEBPACK_IMPORTED_MODULE_4__.isEqual)(input, mappedCompletedMultipartUpload)) {
        throw new _errors_IntegrityError_mjs__WEBPACK_IMPORTED_MODULE_1__.IntegrityError();
    }
}


//# sourceMappingURL=validateMultipartUploadXML.mjs.map


/***/ }),

/***/ "./dist/esm/providers/s3/utils/validateObjectUrl.mjs":
/*!***********************************************************!*\
  !*** ./dist/esm/providers/s3/utils/validateObjectUrl.mjs ***!
  \***********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   validateObjectUrl: () => (/* binding */ validateObjectUrl)
/* harmony export */ });
/* harmony import */ var _aws_amplify_core_internals_aws_client_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @aws-amplify/core/internals/aws-client-utils */ "../core/dist/esm/clients/middleware/signing/utils/extendedEncodeURIComponent.mjs");
/* harmony import */ var _errors_IntegrityError_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../errors/IntegrityError.mjs */ "./dist/esm/errors/IntegrityError.mjs");



// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
function validateObjectUrl({ bucketName, key, objectURL, }) {
    if (!bucketName || !key || !objectURL) {
        throw new _errors_IntegrityError_mjs__WEBPACK_IMPORTED_MODULE_0__.IntegrityError();
    }
    const bucketWithDots = bucketName.includes('.');
    const encodedBucketName = (0,_aws_amplify_core_internals_aws_client_utils__WEBPACK_IMPORTED_MODULE_1__.extendedEncodeURIComponent)(bucketName);
    const encodedKey = key.split('/').map(_aws_amplify_core_internals_aws_client_utils__WEBPACK_IMPORTED_MODULE_1__.extendedEncodeURIComponent).join('/');
    const isPathStyleUrl = objectURL.pathname === `/${encodedBucketName}/${encodedKey}`;
    const isSubdomainUrl = objectURL.hostname.startsWith(`${encodedBucketName}.`) &&
        objectURL.pathname === `/${encodedKey}`;
    if (!(isPathStyleUrl || (!bucketWithDots && isSubdomainUrl))) {
        throw new _errors_IntegrityError_mjs__WEBPACK_IMPORTED_MODULE_0__.IntegrityError();
    }
}


//# sourceMappingURL=validateObjectUrl.mjs.map


/***/ }),

/***/ "./dist/esm/providers/s3/utils/validateStorageOperationInput.mjs":
/*!***********************************************************************!*\
  !*** ./dist/esm/providers/s3/utils/validateStorageOperationInput.mjs ***!
  \***********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   validateStorageOperationInput: () => (/* binding */ validateStorageOperationInput)
/* harmony export */ });
/* harmony import */ var _errors_utils_assertValidationError_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../errors/utils/assertValidationError.mjs */ "./dist/esm/errors/utils/assertValidationError.mjs");
/* harmony import */ var _errors_types_validation_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../errors/types/validation.mjs */ "./dist/esm/errors/types/validation.mjs");
/* harmony import */ var _isInputWithPath_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./isInputWithPath.mjs */ "./dist/esm/providers/s3/utils/isInputWithPath.mjs");
/* harmony import */ var _constants_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./constants.mjs */ "./dist/esm/providers/s3/utils/constants.mjs");
/* harmony import */ var _resolveIdentityId_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./resolveIdentityId.mjs */ "./dist/esm/providers/s3/utils/resolveIdentityId.mjs");






// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
const validateStorageOperationInput = (input, identityId) => {
    (0,_errors_utils_assertValidationError_mjs__WEBPACK_IMPORTED_MODULE_0__.assertValidationError)(
    // Key present without a path
    (!!input.key && !input.path) ||
        // Path present without a key
        (!input.key && !!input.path), _errors_types_validation_mjs__WEBPACK_IMPORTED_MODULE_1__.StorageValidationErrorCode.InvalidStorageOperationInput);
    if ((0,_isInputWithPath_mjs__WEBPACK_IMPORTED_MODULE_2__.isInputWithPath)(input)) {
        const { path } = input;
        const objectKey = typeof path === 'string'
            ? path
            : path({ identityId: (0,_resolveIdentityId_mjs__WEBPACK_IMPORTED_MODULE_3__.resolveIdentityId)(identityId) });
        (0,_errors_utils_assertValidationError_mjs__WEBPACK_IMPORTED_MODULE_0__.assertValidationError)(!objectKey.startsWith('/'), _errors_types_validation_mjs__WEBPACK_IMPORTED_MODULE_1__.StorageValidationErrorCode.InvalidStoragePathInput);
        return {
            inputType: _constants_mjs__WEBPACK_IMPORTED_MODULE_4__.STORAGE_INPUT_PATH,
            objectKey,
        };
    }
    else {
        return { inputType: _constants_mjs__WEBPACK_IMPORTED_MODULE_4__.STORAGE_INPUT_KEY, objectKey: input.key };
    }
};


//# sourceMappingURL=validateStorageOperationInput.mjs.map


/***/ }),

/***/ "./dist/esm/providers/s3/utils/validateStorageOperationInputWithPrefix.mjs":
/*!*********************************************************************************!*\
  !*** ./dist/esm/providers/s3/utils/validateStorageOperationInputWithPrefix.mjs ***!
  \*********************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   validateStorageOperationInputWithPrefix: () => (/* binding */ validateStorageOperationInputWithPrefix)
/* harmony export */ });
/* harmony import */ var _errors_utils_assertValidationError_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../errors/utils/assertValidationError.mjs */ "./dist/esm/errors/utils/assertValidationError.mjs");
/* harmony import */ var _errors_types_validation_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../errors/types/validation.mjs */ "./dist/esm/errors/types/validation.mjs");
/* harmony import */ var _constants_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./constants.mjs */ "./dist/esm/providers/s3/utils/constants.mjs");
/* harmony import */ var _resolveIdentityId_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./resolveIdentityId.mjs */ "./dist/esm/providers/s3/utils/resolveIdentityId.mjs");





// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
// Local assertion function with StorageOperationInputWithPrefixPath as Input
const _isInputWithPath = (input) => {
    return input.path !== undefined;
};
const validateStorageOperationInputWithPrefix = (input, identityId) => {
    // Validate prefix & path not present at the same time
    (0,_errors_utils_assertValidationError_mjs__WEBPACK_IMPORTED_MODULE_0__.assertValidationError)(!(input.prefix && input.path), _errors_types_validation_mjs__WEBPACK_IMPORTED_MODULE_1__.StorageValidationErrorCode.InvalidStorageOperationPrefixInput);
    if (_isInputWithPath(input)) {
        const { path } = input;
        const objectKey = typeof path === 'string'
            ? path
            : path({ identityId: (0,_resolveIdentityId_mjs__WEBPACK_IMPORTED_MODULE_2__.resolveIdentityId)(identityId) });
        // Assert on no leading slash in the path parameter
        (0,_errors_utils_assertValidationError_mjs__WEBPACK_IMPORTED_MODULE_0__.assertValidationError)(!objectKey.startsWith('/'), _errors_types_validation_mjs__WEBPACK_IMPORTED_MODULE_1__.StorageValidationErrorCode.InvalidStoragePathInput);
        return {
            inputType: _constants_mjs__WEBPACK_IMPORTED_MODULE_3__.STORAGE_INPUT_PATH,
            objectKey,
        };
    }
    else {
        return { inputType: _constants_mjs__WEBPACK_IMPORTED_MODULE_3__.STORAGE_INPUT_PREFIX, objectKey: input.prefix ?? '' };
    }
};


//# sourceMappingURL=validateStorageOperationInputWithPrefix.mjs.map


/***/ }),

/***/ "./dist/esm/utils/logger.mjs":
/*!***********************************!*\
  !*** ./dist/esm/utils/logger.mjs ***!
  \***********************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   logger: () => (/* binding */ logger)
/* harmony export */ });
/* harmony import */ var _aws_amplify_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @aws-amplify/core */ "@aws-amplify/core");


// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
const logger = new _aws_amplify_core__WEBPACK_IMPORTED_MODULE_0__.ConsoleLogger('Storage');


//# sourceMappingURL=logger.mjs.map


/***/ }),

/***/ "./dist/esm/utils/resolvePrefix.mjs":
/*!******************************************!*\
  !*** ./dist/esm/utils/resolvePrefix.mjs ***!
  \******************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   resolvePrefix: () => (/* binding */ resolvePrefix)
/* harmony export */ });
/* harmony import */ var _errors_utils_assertValidationError_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../errors/utils/assertValidationError.mjs */ "./dist/esm/errors/utils/assertValidationError.mjs");
/* harmony import */ var _errors_types_validation_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../errors/types/validation.mjs */ "./dist/esm/errors/types/validation.mjs");



// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
const resolvePrefix = ({ accessLevel, targetIdentityId, }) => {
    if (accessLevel === 'private') {
        (0,_errors_utils_assertValidationError_mjs__WEBPACK_IMPORTED_MODULE_0__.assertValidationError)(!!targetIdentityId, _errors_types_validation_mjs__WEBPACK_IMPORTED_MODULE_1__.StorageValidationErrorCode.NoIdentityId);
        return `private/${targetIdentityId}/`;
    }
    else if (accessLevel === 'protected') {
        (0,_errors_utils_assertValidationError_mjs__WEBPACK_IMPORTED_MODULE_0__.assertValidationError)(!!targetIdentityId, _errors_types_validation_mjs__WEBPACK_IMPORTED_MODULE_1__.StorageValidationErrorCode.NoIdentityId);
        return `protected/${targetIdentityId}/`;
    }
    else {
        return 'public/';
    }
};


//# sourceMappingURL=resolvePrefix.mjs.map


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
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!****************************!*\
  !*** ./dist/esm/index.mjs ***!
  \****************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DEFAULT_PART_SIZE: () => (/* reexport safe */ _providers_s3_utils_constants_mjs__WEBPACK_IMPORTED_MODULE_7__.DEFAULT_PART_SIZE),
/* harmony export */   StorageError: () => (/* reexport safe */ _errors_StorageError_mjs__WEBPACK_IMPORTED_MODULE_9__.StorageError),
/* harmony export */   copy: () => (/* reexport safe */ _providers_s3_apis_copy_mjs__WEBPACK_IMPORTED_MODULE_5__.copy),
/* harmony export */   downloadData: () => (/* reexport safe */ _providers_s3_apis_downloadData_mjs__WEBPACK_IMPORTED_MODULE_1__.downloadData),
/* harmony export */   getProperties: () => (/* reexport safe */ _providers_s3_apis_getProperties_mjs__WEBPACK_IMPORTED_MODULE_4__.getProperties),
/* harmony export */   getUrl: () => (/* reexport safe */ _providers_s3_apis_getUrl_mjs__WEBPACK_IMPORTED_MODULE_6__.getUrl),
/* harmony export */   isCancelError: () => (/* reexport safe */ _errors_CanceledError_mjs__WEBPACK_IMPORTED_MODULE_8__.isCancelError),
/* harmony export */   list: () => (/* reexport safe */ _providers_s3_apis_list_mjs__WEBPACK_IMPORTED_MODULE_3__.list),
/* harmony export */   remove: () => (/* reexport safe */ _providers_s3_apis_remove_mjs__WEBPACK_IMPORTED_MODULE_2__.remove),
/* harmony export */   uploadData: () => (/* reexport safe */ _providers_s3_apis_uploadData_mjs__WEBPACK_IMPORTED_MODULE_0__.uploadData)
/* harmony export */ });
/* harmony import */ var _providers_s3_apis_uploadData_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./providers/s3/apis/uploadData.mjs */ "./dist/esm/providers/s3/apis/uploadData.mjs");
/* harmony import */ var _providers_s3_apis_downloadData_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./providers/s3/apis/downloadData.mjs */ "./dist/esm/providers/s3/apis/downloadData.mjs");
/* harmony import */ var _providers_s3_apis_remove_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./providers/s3/apis/remove.mjs */ "./dist/esm/providers/s3/apis/remove.mjs");
/* harmony import */ var _providers_s3_apis_list_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./providers/s3/apis/list.mjs */ "./dist/esm/providers/s3/apis/list.mjs");
/* harmony import */ var _providers_s3_apis_getProperties_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./providers/s3/apis/getProperties.mjs */ "./dist/esm/providers/s3/apis/getProperties.mjs");
/* harmony import */ var _providers_s3_apis_copy_mjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./providers/s3/apis/copy.mjs */ "./dist/esm/providers/s3/apis/copy.mjs");
/* harmony import */ var _providers_s3_apis_getUrl_mjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./providers/s3/apis/getUrl.mjs */ "./dist/esm/providers/s3/apis/getUrl.mjs");
/* harmony import */ var _providers_s3_utils_constants_mjs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./providers/s3/utils/constants.mjs */ "./dist/esm/providers/s3/utils/constants.mjs");
/* harmony import */ var _errors_CanceledError_mjs__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./errors/CanceledError.mjs */ "./dist/esm/errors/CanceledError.mjs");
/* harmony import */ var _errors_StorageError_mjs__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./errors/StorageError.mjs */ "./dist/esm/errors/StorageError.mjs");










//# sourceMappingURL=index.mjs.map

})();

/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=aws-amplify-storage.js.map