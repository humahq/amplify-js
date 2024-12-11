(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("aws_amplify_core"));
	else if(typeof define === 'function' && define.amd)
		define("aws_amplify_pubsub", ["aws_amplify_core"], factory);
	else if(typeof exports === 'object')
		exports["aws_amplify_pubsub"] = factory(require("aws_amplify_core"));
	else
		root["aws_amplify_pubsub"] = factory(root["aws_amplify_core"]);
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

/***/ "./dist/esm/vendor/paho-mqtt.js":
/*!**************************************!*\
  !*** ./dist/esm/vendor/paho-mqtt.js ***!
  \**************************************/
/***/ (function(module, exports, __webpack_require__) {

/* module decorator */ module = __webpack_require__.nmd(module);
var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;function _typeof(o) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
    return typeof o;
  } : function (o) {
    return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
  }, _typeof(o);
}
/*******************************************************************************
 * Copyright (c) 2013 IBM Corp.
 *
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * and Eclipse Distribution License v1.0 which accompany this distribution.
 *
 * The Eclipse Public License is available at
 *    http://www.eclipse.org/legal/epl-v10.html
 * and the Eclipse Distribution License is available at
 *   http://www.eclipse.org/org/documents/edl-v10.php.
 *
 * Contributors:
 *    Andrew Banks - initial API and implementation and initial documentation
 *******************************************************************************/

// Only expose a single object name in the global namespace.
// Everything must go through this module. Global Paho module
// only has a single public function, client, which returns
// a Paho client object given connection details.

/**
 * Send and receive messages using web browsers.
 * <p>
 * This programming interface lets a JavaScript client application use the MQTT V3.1 or
 * V3.1.1 protocol to connect to an MQTT-supporting messaging server.
 *
 * The function supported includes:
 * <ol>
 * <li>Connecting to and disconnecting from a server. The server is identified by its host name and port number.
 * <li>Specifying options that relate to the communications link with the server,
 * for example the frequency of keep-alive heartbeats, and whether SSL/TLS is required.
 * <li>Subscribing to and receiving messages from MQTT Topics.
 * <li>Publishing messages to MQTT Topics.
 * </ol>
 * <p>
 * The API consists of two main objects:
 * <dl>
 * <dt><b>{@link Paho.Client}</b></dt>
 * <dd>This contains methods that provide the functionality of the API,
 * including provision of callbacks that notify the application when a message
 * arrives from or is delivered to the messaging server,
 * or when the status of its connection to the messaging server changes.</dd>
 * <dt><b>{@link Paho.Message}</b></dt>
 * <dd>This encapsulates the payload of the message along with various attributes
 * associated with its delivery, in particular the destination to which it has
 * been (or is about to be) sent.</dd>
 * </dl>
 * <p>
 * The programming interface validates parameters passed to it, and will throw
 * an Error containing an error message intended for developer use, if it detects
 * an error with any parameter.
 * <p>
 * Example:
 *
 * <code><pre>
var client = new Paho.MQTT.Client(location.hostname, Number(location.port), "clientId");
client.onConnectionLost = onConnectionLost;
client.onMessageArrived = onMessageArrived;
client.connect({onSuccess:onConnect});

function onConnect() {
  // Once a connection has been made, make a subscription and send a message.
  console.log("onConnect");
  client.subscribe("/World");
  var message = new Paho.MQTT.Message("Hello");
  message.destinationName = "/World";
  client.send(message);
};
function onConnectionLost(responseObject) {
  if (responseObject.errorCode !== 0)
	console.log("onConnectionLost:"+responseObject.errorMessage);
};
function onMessageArrived(message) {
  console.log("onMessageArrived:"+message.payloadString);
  client.disconnect();
};
 * </pre></code>
 * @namespace Paho
 */

/* jshint shadow:true */
(function ExportLibrary(root, factory) {
  if (( false ? 0 : _typeof(exports)) === 'object' && ( false ? 0 : _typeof(module)) === 'object') {
    module.exports = factory();
  } else if (true) {
    !(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
		__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
		(__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) :
		__WEBPACK_AMD_DEFINE_FACTORY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else {}
})(this, function LibraryFactory() {
  var PahoMQTT = function (global) {
    // Private variables below, these are only visible inside the function closure
    // which is used to define the module.
    var version = '@VERSION@-@BUILDLEVEL@';

    // 2023-01-05: AWS Amplify change to incorporate upstream pull request:
    // https://github.com/eclipse/paho.mqtt.javascript/pull/247

    /**
     * @private
     */
    var localStorage = function () {
      try {
        // When third-party cookies are disabled accessing localStorage will cause an error
        if (global.localStorage) return global.localStorage;
      } catch (e) {
        var data = {};
        return {
          setItem: function setItem(key, item) {
            data[key] = item;
          },
          getItem: function getItem(key) {
            return data[key];
          },
          removeItem: function removeItem(key) {
            delete data[key];
          }
        };
      }
    }();

    // End of AWS Amplify change

    /**
     * Unique message type identifiers, with associated
     * associated integer values.
     * @private
     */
    var MESSAGE_TYPE = {
      CONNECT: 1,
      CONNACK: 2,
      PUBLISH: 3,
      PUBACK: 4,
      PUBREC: 5,
      PUBREL: 6,
      PUBCOMP: 7,
      SUBSCRIBE: 8,
      SUBACK: 9,
      UNSUBSCRIBE: 10,
      UNSUBACK: 11,
      PINGREQ: 12,
      PINGRESP: 13,
      DISCONNECT: 14
    };

    // Collection of utility methods used to simplify module code
    // and promote the DRY pattern.

    /**
     * Validate an object's parameter names to ensure they
     * match a list of expected variables name for this option
     * type. Used to ensure option object passed into the API don't
     * contain erroneous parameters.
     * @param {Object} obj - User options object
     * @param {Object} keys - valid keys and types that may exist in obj.
     * @throws {Error} Invalid option parameter found.
     * @private
     */
    var validate = function validate(obj, keys) {
      for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
          if (keys.hasOwnProperty(key)) {
            if (_typeof(obj[key]) !== keys[key]) throw new Error(format(ERROR.INVALID_TYPE, [_typeof(obj[key]), key]));
          } else {
            var errorStr = 'Unknown property, ' + key + '. Valid properties are:';
            for (var validKey in keys) if (keys.hasOwnProperty(validKey)) errorStr = errorStr + ' ' + validKey;
            throw new Error(errorStr);
          }
        }
      }
    };

    /**
     * Return a new function which runs the user function bound
     * to a fixed scope.
     * @param {function} User function
     * @param {object} Function scope
     * @return {function} User function bound to another scope
     * @private
     */
    var scope = function scope(f, _scope) {
      return function () {
        return f.apply(_scope, arguments);
      };
    };

    /**
     * Unique message type identifiers, with associated
     * associated integer values.
     * @private
     */
    var ERROR = {
      OK: {
        code: 0,
        text: 'AMQJSC0000I OK.'
      },
      CONNECT_TIMEOUT: {
        code: 1,
        text: 'AMQJSC0001E Connect timed out.'
      },
      SUBSCRIBE_TIMEOUT: {
        code: 2,
        text: 'AMQJS0002E Subscribe timed out.'
      },
      UNSUBSCRIBE_TIMEOUT: {
        code: 3,
        text: 'AMQJS0003E Unsubscribe timed out.'
      },
      PING_TIMEOUT: {
        code: 4,
        text: 'AMQJS0004E Ping timed out.'
      },
      INTERNAL_ERROR: {
        code: 5,
        text: 'AMQJS0005E Internal error. Error Message: {0}, Stack trace: {1}'
      },
      CONNACK_RETURNCODE: {
        code: 6,
        text: 'AMQJS0006E Bad Connack return code:{0} {1}.'
      },
      SOCKET_ERROR: {
        code: 7,
        text: 'AMQJS0007E Socket error:{0}.'
      },
      SOCKET_CLOSE: {
        code: 8,
        text: 'AMQJS0008I Socket closed.'
      },
      MALFORMED_UTF: {
        code: 9,
        text: 'AMQJS0009E Malformed UTF data:{0} {1} {2}.'
      },
      UNSUPPORTED: {
        code: 10,
        text: 'AMQJS0010E {0} is not supported by this browser.'
      },
      INVALID_STATE: {
        code: 11,
        text: 'AMQJS0011E Invalid state {0}.'
      },
      INVALID_TYPE: {
        code: 12,
        text: 'AMQJS0012E Invalid type {0} for {1}.'
      },
      INVALID_ARGUMENT: {
        code: 13,
        text: 'AMQJS0013E Invalid argument {0} for {1}.'
      },
      UNSUPPORTED_OPERATION: {
        code: 14,
        text: 'AMQJS0014E Unsupported operation.'
      },
      INVALID_STORED_DATA: {
        code: 15,
        text: 'AMQJS0015E Invalid data in local storage key={0} value={1}.'
      },
      INVALID_MQTT_MESSAGE_TYPE: {
        code: 16,
        text: 'AMQJS0016E Invalid MQTT message type {0}.'
      },
      MALFORMED_UNICODE: {
        code: 17,
        text: 'AMQJS0017E Malformed Unicode string:{0} {1}.'
      },
      BUFFER_FULL: {
        code: 18,
        text: 'AMQJS0018E Message buffer is full, maximum buffer size: {0}.'
      }
    };

    /** CONNACK RC Meaning. */
    var CONNACK_RC = {
      0: 'Connection Accepted',
      1: 'Connection Refused: unacceptable protocol version',
      2: 'Connection Refused: identifier rejected',
      3: 'Connection Refused: server unavailable',
      4: 'Connection Refused: bad user name or password',
      5: 'Connection Refused: not authorized'
    };

    /**
     * Format an error message text.
     * @private
     * @param {error} ERROR value above.
     * @param {substitutions} [array] substituted into the text.
     * @return the text with the substitutions made.
     */
    var format = function format(error, substitutions) {
      var text = error.text;
      if (substitutions) {
        var field, start;
        for (var i = 0; i < substitutions.length; i++) {
          field = '{' + i + '}';
          start = text.indexOf(field);
          if (start > 0) {
            var part1 = text.substring(0, start);
            var part2 = text.substring(start + field.length);
            text = part1 + substitutions[i] + part2;
          }
        }
      }
      return text;
    };

    //MQTT protocol and version          6    M    Q    I    s    d    p    3
    var MqttProtoIdentifierv3 = [0x00, 0x06, 0x4d, 0x51, 0x49, 0x73, 0x64, 0x70, 0x03];
    //MQTT proto/version for 311         4    M    Q    T    T    4
    var MqttProtoIdentifierv4 = [0x00, 0x04, 0x4d, 0x51, 0x54, 0x54, 0x04];

    /**
     * Construct an MQTT wire protocol message.
     * @param type MQTT packet type.
     * @param options optional wire message attributes.
     *
     * Optional properties
     *
     * messageIdentifier: message ID in the range [0..65535]
     * payloadMessage:	Application Message - PUBLISH only
     * connectStrings:	array of 0 or more Strings to be put into the CONNECT payload
     * topics:			array of strings (SUBSCRIBE, UNSUBSCRIBE)
     * requestQoS:		array of QoS values [0..2]
     *
     * "Flag" properties
     * cleanSession:	true if present / false if absent (CONNECT)
     * willMessage:  	true if present / false if absent (CONNECT)
     * isRetained:		true if present / false if absent (CONNECT)
     * userName:		true if present / false if absent (CONNECT)
     * password:		true if present / false if absent (CONNECT)
     * keepAliveInterval:	integer [0..65535]  (CONNECT)
     *
     * @private
     * @ignore
     */
    var WireMessage = function WireMessage(type, options) {
      this.type = type;
      for (var name in options) {
        if (options.hasOwnProperty(name)) {
          this[name] = options[name];
        }
      }
    };
    WireMessage.prototype.encode = function () {
      // Compute the first byte of the fixed header
      var first = (this.type & 0x0f) << 4;

      /*
       * Now calculate the length of the variable header + payload by adding up the lengths
       * of all the component parts
       */

      var remLength = 0;
      var topicStrLength = [];
      var destinationNameLength = 0;
      var willMessagePayloadBytes;

      // if the message contains a messageIdentifier then we need two bytes for that
      if (this.messageIdentifier !== undefined) remLength += 2;
      switch (this.type) {
        // If this a Connect then we need to include 12 bytes for its header
        case MESSAGE_TYPE.CONNECT:
          switch (this.mqttVersion) {
            case 3:
              remLength += MqttProtoIdentifierv3.length + 3;
              break;
            case 4:
              remLength += MqttProtoIdentifierv4.length + 3;
              break;
          }
          remLength += UTF8Length(this.clientId) + 2;
          if (this.willMessage !== undefined) {
            remLength += UTF8Length(this.willMessage.destinationName) + 2;
            // Will message is always a string, sent as UTF-8 characters with a preceding length.
            willMessagePayloadBytes = this.willMessage.payloadBytes;
            if (!(willMessagePayloadBytes instanceof Uint8Array)) willMessagePayloadBytes = new Uint8Array(payloadBytes);
            remLength += willMessagePayloadBytes.byteLength + 2;
          }
          if (this.userName !== undefined) remLength += UTF8Length(this.userName) + 2;
          if (this.password !== undefined) remLength += UTF8Length(this.password) + 2;
          break;

        // Subscribe, Unsubscribe can both contain topic strings
        case MESSAGE_TYPE.SUBSCRIBE:
          first |= 0x02; // Qos = 1;
          for (var i = 0; i < this.topics.length; i++) {
            topicStrLength[i] = UTF8Length(this.topics[i]);
            remLength += topicStrLength[i] + 2;
          }
          remLength += this.requestedQos.length; // 1 byte for each topic's Qos
          // QoS on Subscribe only
          break;
        case MESSAGE_TYPE.UNSUBSCRIBE:
          first |= 0x02; // Qos = 1;
          for (var i = 0; i < this.topics.length; i++) {
            topicStrLength[i] = UTF8Length(this.topics[i]);
            remLength += topicStrLength[i] + 2;
          }
          break;
        case MESSAGE_TYPE.PUBREL:
          first |= 0x02; // Qos = 1;
          break;
        case MESSAGE_TYPE.PUBLISH:
          if (this.payloadMessage.duplicate) first |= 0x08;
          first = first |= this.payloadMessage.qos << 1;
          if (this.payloadMessage.retained) first |= 0x01;
          destinationNameLength = UTF8Length(this.payloadMessage.destinationName);
          remLength += destinationNameLength + 2;
          var payloadBytes = this.payloadMessage.payloadBytes;
          remLength += payloadBytes.byteLength;
          if (payloadBytes instanceof ArrayBuffer) payloadBytes = new Uint8Array(payloadBytes);else if (!(payloadBytes instanceof Uint8Array)) payloadBytes = new Uint8Array(payloadBytes.buffer);
          break;
        case MESSAGE_TYPE.DISCONNECT:
          break;
        default:
          break;
      }

      // Now we can allocate a buffer for the message

      var mbi = encodeMBI(remLength); // Convert the length to MQTT MBI format
      var pos = mbi.length + 1; // Offset of start of variable header
      var buffer = new ArrayBuffer(remLength + pos);
      var byteStream = new Uint8Array(buffer); // view it as a sequence of bytes

      //Write the fixed header into the buffer
      byteStream[0] = first;
      byteStream.set(mbi, 1);

      // If this is a PUBLISH then the variable header starts with a topic
      if (this.type == MESSAGE_TYPE.PUBLISH) pos = writeString(this.payloadMessage.destinationName, destinationNameLength, byteStream, pos);
      // If this is a CONNECT then the variable header contains the protocol name/version, flags and keepalive time
      else if (this.type == MESSAGE_TYPE.CONNECT) {
        switch (this.mqttVersion) {
          case 3:
            byteStream.set(MqttProtoIdentifierv3, pos);
            pos += MqttProtoIdentifierv3.length;
            break;
          case 4:
            byteStream.set(MqttProtoIdentifierv4, pos);
            pos += MqttProtoIdentifierv4.length;
            break;
        }
        var connectFlags = 0;
        if (this.cleanSession) connectFlags = 0x02;
        if (this.willMessage !== undefined) {
          connectFlags |= 0x04;
          connectFlags |= this.willMessage.qos << 3;
          if (this.willMessage.retained) {
            connectFlags |= 0x20;
          }
        }
        if (this.userName !== undefined) connectFlags |= 0x80;
        if (this.password !== undefined) connectFlags |= 0x40;
        byteStream[pos++] = connectFlags;
        pos = writeUint16(this.keepAliveInterval, byteStream, pos);
      }

      // Output the messageIdentifier - if there is one
      if (this.messageIdentifier !== undefined) pos = writeUint16(this.messageIdentifier, byteStream, pos);
      switch (this.type) {
        case MESSAGE_TYPE.CONNECT:
          pos = writeString(this.clientId, UTF8Length(this.clientId), byteStream, pos);
          if (this.willMessage !== undefined) {
            pos = writeString(this.willMessage.destinationName, UTF8Length(this.willMessage.destinationName), byteStream, pos);
            pos = writeUint16(willMessagePayloadBytes.byteLength, byteStream, pos);
            byteStream.set(willMessagePayloadBytes, pos);
            pos += willMessagePayloadBytes.byteLength;
          }
          if (this.userName !== undefined) pos = writeString(this.userName, UTF8Length(this.userName), byteStream, pos);
          if (this.password !== undefined) pos = writeString(this.password, UTF8Length(this.password), byteStream, pos);
          break;
        case MESSAGE_TYPE.PUBLISH:
          // PUBLISH has a text or binary payload, if text do not add a 2 byte length field, just the UTF characters.
          byteStream.set(payloadBytes, pos);
          break;

        //    	    case MESSAGE_TYPE.PUBREC:
        //    	    case MESSAGE_TYPE.PUBREL:
        //    	    case MESSAGE_TYPE.PUBCOMP:
        //    	    	break;

        case MESSAGE_TYPE.SUBSCRIBE:
          // SUBSCRIBE has a list of topic strings and request QoS
          for (var i = 0; i < this.topics.length; i++) {
            pos = writeString(this.topics[i], topicStrLength[i], byteStream, pos);
            byteStream[pos++] = this.requestedQos[i];
          }
          break;
        case MESSAGE_TYPE.UNSUBSCRIBE:
          // UNSUBSCRIBE has a list of topic strings
          for (var i = 0; i < this.topics.length; i++) pos = writeString(this.topics[i], topicStrLength[i], byteStream, pos);
          break;
        default:
        // Do nothing.
      }
      return buffer;
    };
    function decodeMessage(input, pos) {
      var startingPos = pos;
      var first = input[pos];
      var type = first >> 4;
      var messageInfo = first &= 0x0f;
      pos += 1;

      // Decode the remaining length (MBI format)

      var digit;
      var remLength = 0;
      var multiplier = 1;
      do {
        if (pos == input.length) {
          return [null, startingPos];
        }
        digit = input[pos++];
        remLength += (digit & 0x7f) * multiplier;
        multiplier *= 128;
      } while ((digit & 0x80) !== 0);
      var endPos = pos + remLength;
      if (endPos > input.length) {
        return [null, startingPos];
      }
      var wireMessage = new WireMessage(type);
      switch (type) {
        case MESSAGE_TYPE.CONNACK:
          var connectAcknowledgeFlags = input[pos++];
          if (connectAcknowledgeFlags & 0x01) wireMessage.sessionPresent = true;
          wireMessage.returnCode = input[pos++];
          break;
        case MESSAGE_TYPE.PUBLISH:
          var qos = messageInfo >> 1 & 0x03;
          var len = readUint16(input, pos);
          pos += 2;
          var topicName = parseUTF8(input, pos, len);
          pos += len;
          // If QoS 1 or 2 there will be a messageIdentifier
          if (qos > 0) {
            wireMessage.messageIdentifier = readUint16(input, pos);
            pos += 2;
          }
          var message = new Message(input.subarray(pos, endPos));
          if ((messageInfo & 0x01) == 0x01) message.retained = true;
          if ((messageInfo & 0x08) == 0x08) message.duplicate = true;
          message.qos = qos;
          message.destinationName = topicName;
          wireMessage.payloadMessage = message;
          break;
        case MESSAGE_TYPE.PUBACK:
        case MESSAGE_TYPE.PUBREC:
        case MESSAGE_TYPE.PUBREL:
        case MESSAGE_TYPE.PUBCOMP:
        case MESSAGE_TYPE.UNSUBACK:
          wireMessage.messageIdentifier = readUint16(input, pos);
          break;
        case MESSAGE_TYPE.SUBACK:
          wireMessage.messageIdentifier = readUint16(input, pos);
          pos += 2;
          wireMessage.returnCode = input.subarray(pos, endPos);
          break;
        default:
          break;
      }
      return [wireMessage, endPos];
    }
    function writeUint16(input, buffer, offset) {
      buffer[offset++] = input >> 8; //MSB
      buffer[offset++] = input % 256; //LSB
      return offset;
    }
    function writeString(input, utf8Length, buffer, offset) {
      offset = writeUint16(utf8Length, buffer, offset);
      stringToUTF8(input, buffer, offset);
      return offset + utf8Length;
    }
    function readUint16(buffer, offset) {
      return 256 * buffer[offset] + buffer[offset + 1];
    }

    /**
     * Encodes an MQTT Multi-Byte Integer
     * @private
     */
    function encodeMBI(number) {
      var output = new Array(1);
      var numBytes = 0;
      do {
        var digit = number % 128;
        number = number >> 7;
        if (number > 0) {
          digit |= 0x80;
        }
        output[numBytes++] = digit;
      } while (number > 0 && numBytes < 4);
      return output;
    }

    /**
     * Takes a String and calculates its length in bytes when encoded in UTF8.
     * @private
     */
    function UTF8Length(input) {
      var output = 0;
      for (var i = 0; i < input.length; i++) {
        var charCode = input.charCodeAt(i);
        if (charCode > 0x7ff) {
          // Surrogate pair means its a 4 byte character
          if (0xd800 <= charCode && charCode <= 0xdbff) {
            i++;
            output++;
          }
          output += 3;
        } else if (charCode > 0x7f) output += 2;else output++;
      }
      return output;
    }

    /**
     * Takes a String and writes it into an array as UTF8 encoded bytes.
     * @private
     */
    function stringToUTF8(input, output, start) {
      var pos = start;
      for (var i = 0; i < input.length; i++) {
        var charCode = input.charCodeAt(i);

        // Check for a surrogate pair.
        if (0xd800 <= charCode && charCode <= 0xdbff) {
          var lowCharCode = input.charCodeAt(++i);
          if (isNaN(lowCharCode)) {
            throw new Error(format(ERROR.MALFORMED_UNICODE, [charCode, lowCharCode]));
          }
          charCode = (charCode - 0xd800 << 10) + (lowCharCode - 0xdc00) + 0x10000;
        }
        if (charCode <= 0x7f) {
          output[pos++] = charCode;
        } else if (charCode <= 0x7ff) {
          output[pos++] = charCode >> 6 & 0x1f | 0xc0;
          output[pos++] = charCode & 0x3f | 0x80;
        } else if (charCode <= 0xffff) {
          output[pos++] = charCode >> 12 & 0x0f | 0xe0;
          output[pos++] = charCode >> 6 & 0x3f | 0x80;
          output[pos++] = charCode & 0x3f | 0x80;
        } else {
          output[pos++] = charCode >> 18 & 0x07 | 0xf0;
          output[pos++] = charCode >> 12 & 0x3f | 0x80;
          output[pos++] = charCode >> 6 & 0x3f | 0x80;
          output[pos++] = charCode & 0x3f | 0x80;
        }
      }
      return output;
    }
    function parseUTF8(input, offset, length) {
      var output = '';
      var utf16;
      var pos = offset;
      while (pos < offset + length) {
        var byte1 = input[pos++];
        if (byte1 < 128) utf16 = byte1;else {
          var byte2 = input[pos++] - 128;
          if (byte2 < 0) throw new Error(format(ERROR.MALFORMED_UTF, [byte1.toString(16), byte2.toString(16), '']));
          if (byte1 < 0xe0)
            // 2 byte character
            utf16 = 64 * (byte1 - 0xc0) + byte2;else {
            var byte3 = input[pos++] - 128;
            if (byte3 < 0) throw new Error(format(ERROR.MALFORMED_UTF, [byte1.toString(16), byte2.toString(16), byte3.toString(16)]));
            if (byte1 < 0xf0)
              // 3 byte character
              utf16 = 4096 * (byte1 - 0xe0) + 64 * byte2 + byte3;else {
              var byte4 = input[pos++] - 128;
              if (byte4 < 0) throw new Error(format(ERROR.MALFORMED_UTF, [byte1.toString(16), byte2.toString(16), byte3.toString(16), byte4.toString(16)]));
              if (byte1 < 0xf8)
                // 4 byte character
                utf16 = 262144 * (byte1 - 0xf0) + 4096 * byte2 + 64 * byte3 + byte4;
                // longer encodings are not supported
              else throw new Error(format(ERROR.MALFORMED_UTF, [byte1.toString(16), byte2.toString(16), byte3.toString(16), byte4.toString(16)]));
            }
          }
        }
        if (utf16 > 0xffff) {
          // 4 byte character - express as a surrogate pair
          utf16 -= 0x10000;
          output += String.fromCharCode(0xd800 + (utf16 >> 10)); // lead character
          utf16 = 0xdc00 + (utf16 & 0x3ff); // trail character
        }
        output += String.fromCharCode(utf16);
      }
      return output;
    }

    /**
     * Repeat keepalive requests, monitor responses.
     * @ignore
     */
    var Pinger = function Pinger(client, keepAliveInterval) {
      this._client = client;
      this._keepAliveInterval = keepAliveInterval * 1000;
      this.isReset = false;
      var pingReq = new WireMessage(MESSAGE_TYPE.PINGREQ).encode();
      var doTimeout = function doTimeout(pinger) {
        return function () {
          return doPing.apply(pinger);
        };
      };

      /** @ignore */
      var doPing = function doPing() {
        if (!this.isReset) {
          this._client._trace('Pinger.doPing', 'Timed out');
          this._client._disconnected(ERROR.PING_TIMEOUT.code, format(ERROR.PING_TIMEOUT));
        } else {
          this.isReset = false;
          this._client._trace('Pinger.doPing', 'send PINGREQ');
          this._client.socket.send(pingReq);
          this.timeout = setTimeout(doTimeout(this), this._keepAliveInterval);
        }
      };
      this.reset = function () {
        this.isReset = true;
        clearTimeout(this.timeout);
        if (this._keepAliveInterval > 0) this.timeout = setTimeout(doTimeout(this), this._keepAliveInterval);
      };
      this.cancel = function () {
        clearTimeout(this.timeout);
      };
    };

    /**
     * Monitor request completion.
     * @ignore
     */
    var Timeout = function Timeout(client, timeoutSeconds, action, args) {
      if (!timeoutSeconds) timeoutSeconds = 30;
      var doTimeout = function doTimeout(action, client, args) {
        return function () {
          return action.apply(client, args);
        };
      };
      this.timeout = setTimeout(doTimeout(action, client, args), timeoutSeconds * 1000);
      this.cancel = function () {
        clearTimeout(this.timeout);
      };
    };

    /**
     * Internal implementation of the Websockets MQTT V3.1 client.
     *
     * @name Paho.ClientImpl @constructor
     * @param {String} host the DNS nameof the webSocket host.
     * @param {Number} port the port number for that host.
     * @param {String} clientId the MQ client identifier.
     */
    var ClientImpl = function ClientImpl(uri, host, port, path, clientId) {
      // Check dependencies are satisfied in this browser.
      if (!('WebSocket' in global && global.WebSocket !== null)) {
        throw new Error(format(ERROR.UNSUPPORTED, ['WebSocket']));
      }
      if (!('ArrayBuffer' in global && global.ArrayBuffer !== null)) {
        throw new Error(format(ERROR.UNSUPPORTED, ['ArrayBuffer']));
      }
      this._trace('Paho.Client', uri, host, port, path, clientId);
      this.host = host;
      this.port = port;
      this.path = path;
      this.uri = uri;
      this.clientId = clientId;
      this._wsuri = null;

      // Local storagekeys are qualified with the following string.
      // The conditional inclusion of path in the key is for backward
      // compatibility to when the path was not configurable and assumed to
      // be /mqtt
      this._localKey = host + ':' + port + (path != '/mqtt' ? ':' + path : '') + ':' + clientId + ':';

      // Create private instance-only message queue
      // Internal queue of messages to be sent, in sending order.
      this._msg_queue = [];
      this._buffered_msg_queue = [];

      // Messages we have sent and are expecting a response for, indexed by their respective message ids.
      this._sentMessages = {};

      // Messages we have received and acknowleged and are expecting a confirm message for
      // indexed by their respective message ids.
      this._receivedMessages = {};

      // Internal list of callbacks to be executed when messages
      // have been successfully sent over web socket, e.g. disconnect
      // when it doesn't have to wait for ACK, just message is dispatched.
      this._notify_msg_sent = {};

      // Unique identifier for SEND messages, incrementing
      // counter as messages are sent.
      this._message_identifier = 1;

      // Used to determine the transmission sequence of stored sent messages.
      this._sequence = 0;

      // Load the local state, if any, from the saved version, only restore state relevant to this client.
      for (var key in localStorage) if (key.indexOf('Sent:' + this._localKey) === 0 || key.indexOf('Received:' + this._localKey) === 0) this.restore(key);
    };

    // Messaging Client public instance members.
    ClientImpl.prototype.host = null;
    ClientImpl.prototype.port = null;
    ClientImpl.prototype.path = null;
    ClientImpl.prototype.uri = null;
    ClientImpl.prototype.clientId = null;

    // Messaging Client private instance members.
    ClientImpl.prototype.socket = null;
    /* true once we have received an acknowledgement to a CONNECT packet. */
    ClientImpl.prototype.connected = false;
    /* The largest message identifier allowed, may not be larger than 2**16 but
     * if set smaller reduces the maximum number of outbound messages allowed.
     */
    ClientImpl.prototype.maxMessageIdentifier = 65536;
    ClientImpl.prototype.connectOptions = null;
    ClientImpl.prototype.hostIndex = null;
    ClientImpl.prototype.onConnected = null;
    ClientImpl.prototype.onConnectionLost = null;
    ClientImpl.prototype.onMessageDelivered = null;
    ClientImpl.prototype.onMessageArrived = null;
    ClientImpl.prototype.traceFunction = null;
    ClientImpl.prototype._msg_queue = null;
    ClientImpl.prototype._buffered_msg_queue = null;
    ClientImpl.prototype._connectTimeout = null;
    /* The sendPinger monitors how long we allow before we send data to prove to the server that we are alive. */
    ClientImpl.prototype.sendPinger = null;
    /* The receivePinger monitors how long we allow before we require evidence that the server is alive. */
    ClientImpl.prototype.receivePinger = null;
    ClientImpl.prototype._reconnectInterval = 1; // Reconnect Delay, starts at 1 second
    ClientImpl.prototype._reconnecting = false;
    ClientImpl.prototype._reconnectTimeout = null;
    ClientImpl.prototype.disconnectedPublishing = false;
    ClientImpl.prototype.disconnectedBufferSize = 5000;
    ClientImpl.prototype.receiveBuffer = null;
    ClientImpl.prototype._traceBuffer = null;
    ClientImpl.prototype._MAX_TRACE_ENTRIES = 100;
    ClientImpl.prototype.connect = function (connectOptions) {
      var connectOptionsMasked = this._traceMask(connectOptions, 'password');
      this._trace('Client.connect', connectOptionsMasked, this.socket, this.connected);
      if (this.connected) throw new Error(format(ERROR.INVALID_STATE, ['already connected']));
      if (this.socket) throw new Error(format(ERROR.INVALID_STATE, ['already connected']));
      if (this._reconnecting) {
        // connect() function is called while reconnect is in progress.
        // Terminate the auto reconnect process to use new connect options.
        this._reconnectTimeout.cancel();
        this._reconnectTimeout = null;
        this._reconnecting = false;
      }
      this.connectOptions = connectOptions;
      this._reconnectInterval = 1;
      this._reconnecting = false;
      if (connectOptions.uris) {
        this.hostIndex = 0;
        this._doConnect(connectOptions.uris[0]);
      } else {
        this._doConnect(this.uri);
      }
    };
    ClientImpl.prototype.subscribe = function (filter, subscribeOptions) {
      this._trace('Client.subscribe', filter, subscribeOptions);
      if (!this.connected) throw new Error(format(ERROR.INVALID_STATE, ['not connected']));
      var wireMessage = new WireMessage(MESSAGE_TYPE.SUBSCRIBE);
      wireMessage.topics = filter.constructor === Array ? filter : [filter];
      if (subscribeOptions.qos === undefined) subscribeOptions.qos = 0;
      wireMessage.requestedQos = [];
      for (var i = 0; i < wireMessage.topics.length; i++) wireMessage.requestedQos[i] = subscribeOptions.qos;
      if (subscribeOptions.onSuccess) {
        wireMessage.onSuccess = function (grantedQos) {
          subscribeOptions.onSuccess({
            invocationContext: subscribeOptions.invocationContext,
            grantedQos: grantedQos
          });
        };
      }
      if (subscribeOptions.onFailure) {
        wireMessage.onFailure = function (errorCode) {
          subscribeOptions.onFailure({
            invocationContext: subscribeOptions.invocationContext,
            errorCode: errorCode,
            errorMessage: format(errorCode)
          });
        };
      }
      if (subscribeOptions.timeout) {
        wireMessage.timeOut = new Timeout(this, subscribeOptions.timeout, subscribeOptions.onFailure, [{
          invocationContext: subscribeOptions.invocationContext,
          errorCode: ERROR.SUBSCRIBE_TIMEOUT.code,
          errorMessage: format(ERROR.SUBSCRIBE_TIMEOUT)
        }]);
      }

      // All subscriptions return a SUBACK.
      this._requires_ack(wireMessage);
      this._schedule_message(wireMessage);
    };

    /** @ignore */
    ClientImpl.prototype.unsubscribe = function (filter, unsubscribeOptions) {
      this._trace('Client.unsubscribe', filter, unsubscribeOptions);
      if (!this.connected) throw new Error(format(ERROR.INVALID_STATE, ['not connected']));
      var wireMessage = new WireMessage(MESSAGE_TYPE.UNSUBSCRIBE);
      wireMessage.topics = filter.constructor === Array ? filter : [filter];
      if (unsubscribeOptions.onSuccess) {
        wireMessage.callback = function () {
          unsubscribeOptions.onSuccess({
            invocationContext: unsubscribeOptions.invocationContext
          });
        };
      }
      if (unsubscribeOptions.timeout) {
        wireMessage.timeOut = new Timeout(this, unsubscribeOptions.timeout, unsubscribeOptions.onFailure, [{
          invocationContext: unsubscribeOptions.invocationContext,
          errorCode: ERROR.UNSUBSCRIBE_TIMEOUT.code,
          errorMessage: format(ERROR.UNSUBSCRIBE_TIMEOUT)
        }]);
      }

      // All unsubscribes return a SUBACK.
      this._requires_ack(wireMessage);
      this._schedule_message(wireMessage);
    };
    ClientImpl.prototype.send = function (message) {
      this._trace('Client.send', message);
      var wireMessage = new WireMessage(MESSAGE_TYPE.PUBLISH);
      wireMessage.payloadMessage = message;
      if (this.connected) {
        // Mark qos 1 & 2 message as "ACK required"
        // For qos 0 message, invoke onMessageDelivered callback if there is one.
        // Then schedule the message.
        if (message.qos > 0) {
          this._requires_ack(wireMessage);
        } else if (this.onMessageDelivered) {
          this._notify_msg_sent[wireMessage] = this.onMessageDelivered(wireMessage.payloadMessage);
        }
        this._schedule_message(wireMessage);
      } else {
        // Currently disconnected, will not schedule this message
        // Check if reconnecting is in progress and disconnected publish is enabled.
        if (this._reconnecting && this.disconnectedPublishing) {
          // Check the limit which include the "required ACK" messages
          var messageCount = Object.keys(this._sentMessages).length + this._buffered_msg_queue.length;
          if (messageCount > this.disconnectedBufferSize) {
            throw new Error(format(ERROR.BUFFER_FULL, [this.disconnectedBufferSize]));
          } else {
            if (message.qos > 0) {
              // Mark this message as "ACK required"
              this._requires_ack(wireMessage);
            } else {
              wireMessage.sequence = ++this._sequence;
              // Add messages in fifo order to array, by adding to start
              this._buffered_msg_queue.unshift(wireMessage);
            }
          }
        } else {
          throw new Error(format(ERROR.INVALID_STATE, ['not connected']));
        }
      }
    };
    ClientImpl.prototype.disconnect = function () {
      this._trace('Client.disconnect');
      if (this._reconnecting) {
        // disconnect() function is called while reconnect is in progress.
        // Terminate the auto reconnect process.
        this._reconnectTimeout.cancel();
        this._reconnectTimeout = null;
        this._reconnecting = false;
      }
      if (!this.socket) throw new Error(format(ERROR.INVALID_STATE, ['not connecting or connected']));
      var wireMessage = new WireMessage(MESSAGE_TYPE.DISCONNECT);

      // Run the disconnected call back as soon as the message has been sent,
      // in case of a failure later on in the disconnect processing.
      // as a consequence, the _disconected call back may be run several times.
      this._notify_msg_sent[wireMessage] = scope(this._disconnected, this);
      this._schedule_message(wireMessage);
    };
    ClientImpl.prototype.getTraceLog = function () {
      if (this._traceBuffer !== null) {
        this._trace('Client.getTraceLog', new Date());
        this._trace('Client.getTraceLog in flight messages', this._sentMessages.length);
        for (var key in this._sentMessages) this._trace('_sentMessages ', key, this._sentMessages[key]);
        for (var key in this._receivedMessages) this._trace('_receivedMessages ', key, this._receivedMessages[key]);
        return this._traceBuffer;
      }
    };
    ClientImpl.prototype.startTrace = function () {
      if (this._traceBuffer === null) {
        this._traceBuffer = [];
      }
      this._trace('Client.startTrace', new Date(), version);
    };
    ClientImpl.prototype.stopTrace = function () {
      delete this._traceBuffer;
    };
    ClientImpl.prototype._doConnect = function (wsurl) {
      // When the socket is open, this client will send the CONNECT WireMessage using the saved parameters.
      if (this.connectOptions.useSSL) {
        var uriParts = wsurl.split(':');
        uriParts[0] = 'wss';
        wsurl = uriParts.join(':');
      }
      this._wsuri = wsurl;
      this.connected = false;
      if (this.connectOptions.mqttVersion < 4) {
        this.socket = new WebSocket(wsurl, ['mqttv3.1']);
      } else {
        this.socket = new WebSocket(wsurl, ['mqtt']);
      }
      this.socket.binaryType = 'arraybuffer';
      this.socket.onopen = scope(this._on_socket_open, this);
      this.socket.onmessage = scope(this._on_socket_message, this);
      this.socket.onerror = scope(this._on_socket_error, this);
      this.socket.onclose = scope(this._on_socket_close, this);
      this.sendPinger = new Pinger(this, this.connectOptions.keepAliveInterval);
      this.receivePinger = new Pinger(this, this.connectOptions.keepAliveInterval);
      if (this._connectTimeout) {
        this._connectTimeout.cancel();
        this._connectTimeout = null;
      }
      this._connectTimeout = new Timeout(this, this.connectOptions.timeout, this._disconnected, [ERROR.CONNECT_TIMEOUT.code, format(ERROR.CONNECT_TIMEOUT)]);
    };

    // Schedule a new message to be sent over the WebSockets
    // connection. CONNECT messages cause WebSocket connection
    // to be started. All other messages are queued internally
    // until this has happened. When WS connection starts, process
    // all outstanding messages.
    ClientImpl.prototype._schedule_message = function (message) {
      // Add messages in fifo order to array, by adding to start
      this._msg_queue.unshift(message);
      // Process outstanding messages in the queue if we have an  open socket, and have received CONNACK.
      if (this.connected) {
        this._process_queue();
      }
    };
    ClientImpl.prototype.store = function (prefix, wireMessage) {
      var storedMessage = {
        type: wireMessage.type,
        messageIdentifier: wireMessage.messageIdentifier,
        version: 1
      };
      switch (wireMessage.type) {
        case MESSAGE_TYPE.PUBLISH:
          if (wireMessage.pubRecReceived) storedMessage.pubRecReceived = true;

          // Convert the payload to a hex string.
          storedMessage.payloadMessage = {};
          var hex = '';
          var messageBytes = wireMessage.payloadMessage.payloadBytes;
          for (var i = 0; i < messageBytes.length; i++) {
            if (messageBytes[i] <= 0xf) hex = hex + '0' + messageBytes[i].toString(16);else hex = hex + messageBytes[i].toString(16);
          }
          storedMessage.payloadMessage.payloadHex = hex;
          storedMessage.payloadMessage.qos = wireMessage.payloadMessage.qos;
          storedMessage.payloadMessage.destinationName = wireMessage.payloadMessage.destinationName;
          if (wireMessage.payloadMessage.duplicate) storedMessage.payloadMessage.duplicate = true;
          if (wireMessage.payloadMessage.retained) storedMessage.payloadMessage.retained = true;

          // Add a sequence number to sent messages.
          if (prefix.indexOf('Sent:') === 0) {
            if (wireMessage.sequence === undefined) wireMessage.sequence = ++this._sequence;
            storedMessage.sequence = wireMessage.sequence;
          }
          break;
        default:
          throw Error(format(ERROR.INVALID_STORED_DATA, [prefix + this._localKey + wireMessage.messageIdentifier, storedMessage]));
      }
      localStorage.setItem(prefix + this._localKey + wireMessage.messageIdentifier, JSON.stringify(storedMessage));
    };
    ClientImpl.prototype.restore = function (key) {
      var value = localStorage.getItem(key);
      var storedMessage = JSON.parse(value);
      var wireMessage = new WireMessage(storedMessage.type, storedMessage);
      switch (storedMessage.type) {
        case MESSAGE_TYPE.PUBLISH:
          // Replace the payload message with a Message object.
          var hex = storedMessage.payloadMessage.payloadHex;
          var buffer = new ArrayBuffer(hex.length / 2);
          var byteStream = new Uint8Array(buffer);
          var i = 0;
          while (hex.length >= 2) {
            var x = parseInt(hex.substring(0, 2), 16);
            hex = hex.substring(2, hex.length);
            byteStream[i++] = x;
          }
          var payloadMessage = new Message(byteStream);
          payloadMessage.qos = storedMessage.payloadMessage.qos;
          payloadMessage.destinationName = storedMessage.payloadMessage.destinationName;
          if (storedMessage.payloadMessage.duplicate) payloadMessage.duplicate = true;
          if (storedMessage.payloadMessage.retained) payloadMessage.retained = true;
          wireMessage.payloadMessage = payloadMessage;
          break;
        default:
          throw Error(format(ERROR.INVALID_STORED_DATA, [key, value]));
      }
      if (key.indexOf('Sent:' + this._localKey) === 0) {
        wireMessage.payloadMessage.duplicate = true;
        this._sentMessages[wireMessage.messageIdentifier] = wireMessage;
      } else if (key.indexOf('Received:' + this._localKey) === 0) {
        this._receivedMessages[wireMessage.messageIdentifier] = wireMessage;
      }
    };
    ClientImpl.prototype._process_queue = function () {
      var message = null;

      // Send all queued messages down socket connection
      while (message = this._msg_queue.pop()) {
        this._socket_send(message);
        // Notify listeners that message was successfully sent
        if (this._notify_msg_sent[message]) {
          this._notify_msg_sent[message]();
          delete this._notify_msg_sent[message];
        }
      }
    };

    /**
     * Expect an ACK response for this message. Add message to the set of in progress
     * messages and set an unused identifier in this message.
     * @ignore
     */
    ClientImpl.prototype._requires_ack = function (wireMessage) {
      var messageCount = Object.keys(this._sentMessages).length;
      if (messageCount > this.maxMessageIdentifier) throw Error('Too many messages:' + messageCount);
      while (this._sentMessages[this._message_identifier] !== undefined) {
        this._message_identifier++;
      }
      wireMessage.messageIdentifier = this._message_identifier;
      this._sentMessages[wireMessage.messageIdentifier] = wireMessage;
      if (wireMessage.type === MESSAGE_TYPE.PUBLISH) {
        this.store('Sent:', wireMessage);
      }
      if (this._message_identifier === this.maxMessageIdentifier) {
        this._message_identifier = 1;
      }
    };

    /**
     * Called when the underlying websocket has been opened.
     * @ignore
     */
    ClientImpl.prototype._on_socket_open = function () {
      // Create the CONNECT message object.
      var wireMessage = new WireMessage(MESSAGE_TYPE.CONNECT, this.connectOptions);
      wireMessage.clientId = this.clientId;
      this._socket_send(wireMessage);
    };

    /**
     * Called when the underlying websocket has received a complete packet.
     * @ignore
     */
    ClientImpl.prototype._on_socket_message = function (event) {
      this._trace('Client._on_socket_message', event.data);
      var messages = this._deframeMessages(event.data);
      for (var i = 0; i < messages.length; i += 1) {
        this._handleMessage(messages[i]);
      }
    };
    ClientImpl.prototype._deframeMessages = function (data) {
      var byteArray = new Uint8Array(data);
      var messages = [];
      if (this.receiveBuffer) {
        var newData = new Uint8Array(this.receiveBuffer.length + byteArray.length);
        newData.set(this.receiveBuffer);
        newData.set(byteArray, this.receiveBuffer.length);
        byteArray = newData;
        delete this.receiveBuffer;
      }
      try {
        var offset = 0;
        while (offset < byteArray.length) {
          var result = decodeMessage(byteArray, offset);
          var wireMessage = result[0];
          offset = result[1];
          if (wireMessage !== null) {
            messages.push(wireMessage);
          } else {
            break;
          }
        }
        if (offset < byteArray.length) {
          this.receiveBuffer = byteArray.subarray(offset);
        }
      } catch (error) {
        var errorStack = error.hasOwnProperty('stack') == 'undefined' ? error.stack.toString() : 'No Error Stack Available';
        this._disconnected(ERROR.INTERNAL_ERROR.code, format(ERROR.INTERNAL_ERROR, [error.message, errorStack]));
        return;
      }
      return messages;
    };
    ClientImpl.prototype._handleMessage = function (wireMessage) {
      this._trace('Client._handleMessage', wireMessage);
      try {
        switch (wireMessage.type) {
          case MESSAGE_TYPE.CONNACK:
            this._connectTimeout.cancel();
            if (this._reconnectTimeout) this._reconnectTimeout.cancel();

            // If we have started using clean session then clear up the local state.
            if (this.connectOptions.cleanSession) {
              for (var key in this._sentMessages) {
                var sentMessage = this._sentMessages[key];
                localStorage.removeItem('Sent:' + this._localKey + sentMessage.messageIdentifier);
              }
              this._sentMessages = {};
              for (var key in this._receivedMessages) {
                var receivedMessage = this._receivedMessages[key];
                localStorage.removeItem('Received:' + this._localKey + receivedMessage.messageIdentifier);
              }
              this._receivedMessages = {};
            }
            // Client connected and ready for business.
            if (wireMessage.returnCode === 0) {
              this.connected = true;
              // Jump to the end of the list of uris and stop looking for a good host.

              if (this.connectOptions.uris) this.hostIndex = this.connectOptions.uris.length;
            } else {
              this._disconnected(ERROR.CONNACK_RETURNCODE.code, format(ERROR.CONNACK_RETURNCODE, [wireMessage.returnCode, CONNACK_RC[wireMessage.returnCode]]));
              break;
            }

            // Resend messages.
            var sequencedMessages = [];
            for (var msgId in this._sentMessages) {
              if (this._sentMessages.hasOwnProperty(msgId)) sequencedMessages.push(this._sentMessages[msgId]);
            }

            // Also schedule qos 0 buffered messages if any
            if (this._buffered_msg_queue.length > 0) {
              var msg = null;
              while (msg = this._buffered_msg_queue.pop()) {
                sequencedMessages.push(msg);
                if (this.onMessageDelivered) this._notify_msg_sent[msg] = this.onMessageDelivered(msg.payloadMessage);
              }
            }

            // Sort sentMessages into the original sent order.
            var sequencedMessages = sequencedMessages.sort(function (a, b) {
              return a.sequence - b.sequence;
            });
            for (var i = 0, len = sequencedMessages.length; i < len; i++) {
              var sentMessage = sequencedMessages[i];
              if (sentMessage.type == MESSAGE_TYPE.PUBLISH && sentMessage.pubRecReceived) {
                var pubRelMessage = new WireMessage(MESSAGE_TYPE.PUBREL, {
                  messageIdentifier: sentMessage.messageIdentifier
                });
                this._schedule_message(pubRelMessage);
              } else {
                this._schedule_message(sentMessage);
              }
            }

            // Execute the connectOptions.onSuccess callback if there is one.
            // Will also now return if this connection was the result of an automatic
            // reconnect and which URI was successfully connected to.
            if (this.connectOptions.onSuccess) {
              this.connectOptions.onSuccess({
                invocationContext: this.connectOptions.invocationContext
              });
            }
            var reconnected = false;
            if (this._reconnecting) {
              reconnected = true;
              this._reconnectInterval = 1;
              this._reconnecting = false;
            }

            // Execute the onConnected callback if there is one.
            this._connected(reconnected, this._wsuri);

            // Process all queued messages now that the connection is established.
            this._process_queue();
            break;
          case MESSAGE_TYPE.PUBLISH:
            this._receivePublish(wireMessage);
            break;
          case MESSAGE_TYPE.PUBACK:
            var sentMessage = this._sentMessages[wireMessage.messageIdentifier];
            // If this is a re flow of a PUBACK after we have restarted receivedMessage will not exist.
            if (sentMessage) {
              delete this._sentMessages[wireMessage.messageIdentifier];
              localStorage.removeItem('Sent:' + this._localKey + wireMessage.messageIdentifier);
              if (this.onMessageDelivered) this.onMessageDelivered(sentMessage.payloadMessage);
            }
            break;
          case MESSAGE_TYPE.PUBREC:
            var sentMessage = this._sentMessages[wireMessage.messageIdentifier];
            // If this is a re flow of a PUBREC after we have restarted receivedMessage will not exist.
            if (sentMessage) {
              sentMessage.pubRecReceived = true;
              var pubRelMessage = new WireMessage(MESSAGE_TYPE.PUBREL, {
                messageIdentifier: wireMessage.messageIdentifier
              });
              this.store('Sent:', sentMessage);
              this._schedule_message(pubRelMessage);
            }
            break;
          case MESSAGE_TYPE.PUBREL:
            var receivedMessage = this._receivedMessages[wireMessage.messageIdentifier];
            localStorage.removeItem('Received:' + this._localKey + wireMessage.messageIdentifier);
            // If this is a re flow of a PUBREL after we have restarted receivedMessage will not exist.
            if (receivedMessage) {
              this._receiveMessage(receivedMessage);
              delete this._receivedMessages[wireMessage.messageIdentifier];
            }
            // Always flow PubComp, we may have previously flowed PubComp but the server lost it and restarted.
            var pubCompMessage = new WireMessage(MESSAGE_TYPE.PUBCOMP, {
              messageIdentifier: wireMessage.messageIdentifier
            });
            this._schedule_message(pubCompMessage);
            break;
          case MESSAGE_TYPE.PUBCOMP:
            var sentMessage = this._sentMessages[wireMessage.messageIdentifier];
            delete this._sentMessages[wireMessage.messageIdentifier];
            localStorage.removeItem('Sent:' + this._localKey + wireMessage.messageIdentifier);
            if (this.onMessageDelivered) this.onMessageDelivered(sentMessage.payloadMessage);
            break;
          case MESSAGE_TYPE.SUBACK:
            var sentMessage = this._sentMessages[wireMessage.messageIdentifier];
            if (sentMessage) {
              if (sentMessage.timeOut) sentMessage.timeOut.cancel();
              // This will need to be fixed when we add multiple topic support
              if (wireMessage.returnCode[0] === 0x80) {
                if (sentMessage.onFailure) {
                  sentMessage.onFailure(wireMessage.returnCode);
                }
              } else if (sentMessage.onSuccess) {
                sentMessage.onSuccess(wireMessage.returnCode);
              }
              delete this._sentMessages[wireMessage.messageIdentifier];
            }
            break;
          case MESSAGE_TYPE.UNSUBACK:
            var sentMessage = this._sentMessages[wireMessage.messageIdentifier];
            if (sentMessage) {
              if (sentMessage.timeOut) sentMessage.timeOut.cancel();
              if (sentMessage.callback) {
                sentMessage.callback();
              }
              delete this._sentMessages[wireMessage.messageIdentifier];
            }
            break;
          case MESSAGE_TYPE.PINGRESP:
            /* The sendPinger or receivePinger may have sent a ping, the receivePinger has already been reset. */
            this.sendPinger.reset();
            break;
          case MESSAGE_TYPE.DISCONNECT:
            // Clients do not expect to receive disconnect packets.
            this._disconnected(ERROR.INVALID_MQTT_MESSAGE_TYPE.code, format(ERROR.INVALID_MQTT_MESSAGE_TYPE, [wireMessage.type]));
            break;
          default:
            this._disconnected(ERROR.INVALID_MQTT_MESSAGE_TYPE.code, format(ERROR.INVALID_MQTT_MESSAGE_TYPE, [wireMessage.type]));
        }
      } catch (error) {
        var errorStack = error.hasOwnProperty('stack') == 'undefined' ? error.stack.toString() : 'No Error Stack Available';
        this._disconnected(ERROR.INTERNAL_ERROR.code, format(ERROR.INTERNAL_ERROR, [error.message, errorStack]));
        return;
      }
    };

    /** @ignore */
    ClientImpl.prototype._on_socket_error = function (error) {
      if (!this._reconnecting) {
        this._disconnected(ERROR.SOCKET_ERROR.code, format(ERROR.SOCKET_ERROR, [error.data]));
      }
    };

    /** @ignore */
    ClientImpl.prototype._on_socket_close = function () {
      if (!this._reconnecting) {
        this._disconnected(ERROR.SOCKET_CLOSE.code, format(ERROR.SOCKET_CLOSE));
      }
    };

    /** @ignore */
    ClientImpl.prototype._socket_send = function (wireMessage) {
      if (wireMessage.type == 1) {
        var wireMessageMasked = this._traceMask(wireMessage, 'password');
        this._trace('Client._socket_send', wireMessageMasked);
      } else this._trace('Client._socket_send', wireMessage);
      this.socket.send(wireMessage.encode());
      /* We have proved to the server we are alive. */
      this.sendPinger.reset();
    };

    /** @ignore */
    ClientImpl.prototype._receivePublish = function (wireMessage) {
      switch (wireMessage.payloadMessage.qos) {
        case 'undefined':
        case 0:
          this._receiveMessage(wireMessage);
          break;
        case 1:
          var pubAckMessage = new WireMessage(MESSAGE_TYPE.PUBACK, {
            messageIdentifier: wireMessage.messageIdentifier
          });
          this._schedule_message(pubAckMessage);
          this._receiveMessage(wireMessage);
          break;
        case 2:
          this._receivedMessages[wireMessage.messageIdentifier] = wireMessage;
          this.store('Received:', wireMessage);
          var pubRecMessage = new WireMessage(MESSAGE_TYPE.PUBREC, {
            messageIdentifier: wireMessage.messageIdentifier
          });
          this._schedule_message(pubRecMessage);
          break;
        default:
          throw Error('Invaild qos=' + wireMessage.payloadMessage.qos);
      }
    };

    /** @ignore */
    ClientImpl.prototype._receiveMessage = function (wireMessage) {
      if (this.onMessageArrived) {
        this.onMessageArrived(wireMessage.payloadMessage);
      }
    };

    /**
     * Client has connected.
     * @param {reconnect} [boolean] indicate if this was a result of reconnect operation.
     * @param {uri} [string] fully qualified WebSocket URI of the server.
     */
    ClientImpl.prototype._connected = function (reconnect, uri) {
      // Execute the onConnected callback if there is one.
      if (this.onConnected) this.onConnected(reconnect, uri);
    };

    /**
     * Attempts to reconnect the client to the server.
     * For each reconnect attempt, will double the reconnect interval
     * up to 128 seconds.
     */
    ClientImpl.prototype._reconnect = function () {
      this._trace('Client._reconnect');
      if (!this.connected) {
        this._reconnecting = true;
        this.sendPinger.cancel();
        this.receivePinger.cancel();
        if (this._reconnectInterval < 128) this._reconnectInterval = this._reconnectInterval * 2;
        if (this.connectOptions.uris) {
          this.hostIndex = 0;
          this._doConnect(this.connectOptions.uris[0]);
        } else {
          this._doConnect(this.uri);
        }
      }
    };

    /**
     * Client has disconnected either at its own request or because the server
     * or network disconnected it. Remove all non-durable state.
     * @param {errorCode} [number] the error number.
     * @param {errorText} [string] the error text.
     * @ignore
     */
    ClientImpl.prototype._disconnected = function (errorCode, errorText) {
      this._trace('Client._disconnected', errorCode, errorText);
      if (errorCode !== undefined && this._reconnecting) {
        //Continue automatic reconnect process
        this._reconnectTimeout = new Timeout(this, this._reconnectInterval, this._reconnect);
        return;
      }
      this.sendPinger.cancel();
      this.receivePinger.cancel();
      if (this._connectTimeout) {
        this._connectTimeout.cancel();
        this._connectTimeout = null;
      }

      // Clear message buffers.
      this._msg_queue = [];
      this._buffered_msg_queue = [];
      this._notify_msg_sent = {};
      if (this.socket) {
        // Cancel all socket callbacks so that they cannot be driven again by this socket.
        this.socket.onopen = null;
        this.socket.onmessage = null;
        this.socket.onerror = null;
        this.socket.onclose = null;
        if (this.socket.readyState === 1) this.socket.close();
        delete this.socket;
      }
      if (this.connectOptions.uris && this.hostIndex < this.connectOptions.uris.length - 1) {
        // Try the next host.
        this.hostIndex++;
        this._doConnect(this.connectOptions.uris[this.hostIndex]);
      } else {
        if (errorCode === undefined) {
          errorCode = ERROR.OK.code;
          errorText = format(ERROR.OK);
        }

        // Run any application callbacks last as they may attempt to reconnect and hence create a new socket.
        if (this.connected) {
          this.connected = false;
          // Execute the connectionLostCallback if there is one, and we were connected.
          if (this.onConnectionLost) {
            this.onConnectionLost({
              errorCode: errorCode,
              errorMessage: errorText,
              reconnect: this.connectOptions.reconnect,
              uri: this._wsuri
            });
          }
          if (errorCode !== ERROR.OK.code && this.connectOptions.reconnect) {
            // Start automatic reconnect process for the very first time since last successful connect.
            this._reconnectInterval = 1;
            this._reconnect();
            return;
          }
        } else {
          // Otherwise we never had a connection, so indicate that the connect has failed.
          if (this.connectOptions.mqttVersion === 4 && this.connectOptions.mqttVersionExplicit === false) {
            this._trace('Failed to connect V4, dropping back to V3');
            this.connectOptions.mqttVersion = 3;
            if (this.connectOptions.uris) {
              this.hostIndex = 0;
              this._doConnect(this.connectOptions.uris[0]);
            } else {
              this._doConnect(this.uri);
            }
          } else if (this.connectOptions.onFailure) {
            this.connectOptions.onFailure({
              invocationContext: this.connectOptions.invocationContext,
              errorCode: errorCode,
              errorMessage: errorText
            });
          }
        }
      }
    };

    /** @ignore */
    ClientImpl.prototype._trace = function () {
      // Pass trace message back to client's callback function
      if (this.traceFunction) {
        var args = Array.prototype.slice.call(arguments);
        for (var i in args) {
          if (typeof args[i] !== 'undefined') args.splice(i, 1, JSON.stringify(args[i]));
        }
        var record = args.join('');
        this.traceFunction({
          severity: 'Debug',
          message: record
        });
      }

      //buffer style trace
      if (this._traceBuffer !== null) {
        for (var i = 0, max = arguments.length; i < max; i++) {
          if (this._traceBuffer.length == this._MAX_TRACE_ENTRIES) {
            this._traceBuffer.shift();
          }
          if (i === 0) this._traceBuffer.push(arguments[i]);else if (typeof arguments[i] === 'undefined') this._traceBuffer.push(arguments[i]);else this._traceBuffer.push('  ' + JSON.stringify(arguments[i]));
        }
      }
    };

    /** @ignore */
    ClientImpl.prototype._traceMask = function (traceObject, masked) {
      var traceObjectMasked = {};
      for (var attr in traceObject) {
        if (traceObject.hasOwnProperty(attr)) {
          if (attr == masked) traceObjectMasked[attr] = '******';else traceObjectMasked[attr] = traceObject[attr];
        }
      }
      return traceObjectMasked;
    };

    // ------------------------------------------------------------------------
    // Public Programming interface.
    // ------------------------------------------------------------------------

    /**
     * The JavaScript application communicates to the server using a {@link Paho.Client} object.
     * <p>
     * Most applications will create just one Client object and then call its connect() method,
     * however applications can create more than one Client object if they wish.
     * In this case the combination of host, port and clientId attributes must be different for each Client object.
     * <p>
     * The send, subscribe and unsubscribe methods are implemented as asynchronous JavaScript methods
     * (even though the underlying protocol exchange might be synchronous in nature).
     * This means they signal their completion by calling back to the application,
     * via Success or Failure callback functions provided by the application on the method in question.
     * Such callbacks are called at most once per method invocation and do not persist beyond the lifetime
     * of the script that made the invocation.
     * <p>
     * In contrast there are some callback functions, most notably <i>onMessageArrived</i>,
     * that are defined on the {@link Paho.Client} object.
     * These may get called multiple times, and aren't directly related to specific method invocations made by the client.
     *
     * @name Paho.Client
     *
     * @constructor
     *
     * @param {string} host - the address of the messaging server, as a fully qualified WebSocket URI, as a DNS name or dotted decimal IP address.
     * @param {number} port - the port number to connect to - only required if host is not a URI
     * @param {string} path - the path on the host to connect to - only used if host is not a URI. Default: '/mqtt'.
     * @param {string} clientId - the Messaging client identifier, between 1 and 23 characters in length.
     *
     * @property {string} host - <i>read only</i> the server's DNS hostname or dotted decimal IP address.
     * @property {number} port - <i>read only</i> the server's port.
     * @property {string} path - <i>read only</i> the server's path.
     * @property {string} clientId - <i>read only</i> used when connecting to the server.
     * @property {function} onConnectionLost - called when a connection has been lost.
     *                            after a connect() method has succeeded.
     *                            Establish the call back used when a connection has been lost. The connection may be
     *                            lost because the client initiates a disconnect or because the server or network
     *                            cause the client to be disconnected. The disconnect call back may be called without
     *                            the connectionComplete call back being invoked if, for example the client fails to
     *                            connect.
     *                            A single response object parameter is passed to the onConnectionLost callback containing the following fields:
     *                            <ol>
     *                            <li>errorCode
     *                            <li>errorMessage
     *                            </ol>
     * @property {function} onMessageDelivered - called when a message has been delivered.
     *                            All processing that this Client will ever do has been completed. So, for example,
     *                            in the case of a Qos=2 message sent by this client, the PubComp flow has been received from the server
     *                            and the message has been removed from persistent storage before this callback is invoked.
     *                            Parameters passed to the onMessageDelivered callback are:
     *                            <ol>
     *                            <li>{@link Paho.Message} that was delivered.
     *                            </ol>
     * @property {function} onMessageArrived - called when a message has arrived in this Paho.client.
     *                            Parameters passed to the onMessageArrived callback are:
     *                            <ol>
     *                            <li>{@link Paho.Message} that has arrived.
     *                            </ol>
     * @property {function} onConnected - called when a connection is successfully made to the server.
     *                                  after a connect() method.
     *                                  Parameters passed to the onConnected callback are:
     *                                  <ol>
     *                                  <li>reconnect (boolean) - If true, the connection was the result of a reconnect.</li>
     *                                  <li>URI (string) - The URI used to connect to the server.</li>
     *                                  </ol>
     * @property {boolean} disconnectedPublishing - if set, will enable disconnected publishing in
     *                                            in the event that the connection to the server is lost.
     * @property {number} disconnectedBufferSize - Used to set the maximum number of messages that the disconnected
     *                                             buffer will hold before rejecting new messages. Default size: 5000 messages
     * @property {function} trace - called whenever trace is called. TODO
     */
    var Client = function Client(host, port, path, clientId) {
      var uri;
      if (typeof host !== 'string') throw new Error(format(ERROR.INVALID_TYPE, [_typeof(host), 'host']));
      if (arguments.length == 2) {
        // host: must be full ws:// uri
        // port: clientId
        clientId = port;
        uri = host;
        var match = uri.match(/^(wss?):\/\/((\[(.+)\])|([^\/]+?))(:(\d+))?(\/.*)$/);
        if (match) {
          host = match[4] || match[2];
          port = parseInt(match[7]);
          path = match[8];
        } else {
          throw new Error(format(ERROR.INVALID_ARGUMENT, [host, 'host']));
        }
      } else {
        if (arguments.length == 3) {
          clientId = path;
          path = '/mqtt';
        }
        if (typeof port !== 'number' || port < 0) throw new Error(format(ERROR.INVALID_TYPE, [_typeof(port), 'port']));
        if (typeof path !== 'string') throw new Error(format(ERROR.INVALID_TYPE, [_typeof(path), 'path']));
        var ipv6AddSBracket = host.indexOf(':') !== -1 && host.slice(0, 1) !== '[' && host.slice(-1) !== ']';
        uri = 'ws://' + (ipv6AddSBracket ? '[' + host + ']' : host) + ':' + port + path;
      }
      var clientIdLength = 0;
      for (var i = 0; i < clientId.length; i++) {
        var charCode = clientId.charCodeAt(i);
        if (0xd800 <= charCode && charCode <= 0xdbff) {
          i++; // Surrogate pair.
        }
        clientIdLength++;
      }
      if (typeof clientId !== 'string' || clientIdLength > 65535) throw new Error(format(ERROR.INVALID_ARGUMENT, [clientId, 'clientId']));
      var client = new ClientImpl(uri, host, port, path, clientId);

      //Public Properties
      Object.defineProperties(this, {
        host: {
          get: function get() {
            return host;
          },
          set: function set() {
            throw new Error(format(ERROR.UNSUPPORTED_OPERATION));
          }
        },
        port: {
          get: function get() {
            return port;
          },
          set: function set() {
            throw new Error(format(ERROR.UNSUPPORTED_OPERATION));
          }
        },
        path: {
          get: function get() {
            return path;
          },
          set: function set() {
            throw new Error(format(ERROR.UNSUPPORTED_OPERATION));
          }
        },
        uri: {
          get: function get() {
            return uri;
          },
          set: function set() {
            throw new Error(format(ERROR.UNSUPPORTED_OPERATION));
          }
        },
        clientId: {
          get: function get() {
            return client.clientId;
          },
          set: function set() {
            throw new Error(format(ERROR.UNSUPPORTED_OPERATION));
          }
        },
        onConnected: {
          get: function get() {
            return client.onConnected;
          },
          set: function set(newOnConnected) {
            if (typeof newOnConnected === 'function') client.onConnected = newOnConnected;else throw new Error(format(ERROR.INVALID_TYPE, [_typeof(newOnConnected), 'onConnected']));
          }
        },
        disconnectedPublishing: {
          get: function get() {
            return client.disconnectedPublishing;
          },
          set: function set(newDisconnectedPublishing) {
            client.disconnectedPublishing = newDisconnectedPublishing;
          }
        },
        disconnectedBufferSize: {
          get: function get() {
            return client.disconnectedBufferSize;
          },
          set: function set(newDisconnectedBufferSize) {
            client.disconnectedBufferSize = newDisconnectedBufferSize;
          }
        },
        onConnectionLost: {
          get: function get() {
            return client.onConnectionLost;
          },
          set: function set(newOnConnectionLost) {
            if (typeof newOnConnectionLost === 'function') client.onConnectionLost = newOnConnectionLost;else throw new Error(format(ERROR.INVALID_TYPE, [_typeof(newOnConnectionLost), 'onConnectionLost']));
          }
        },
        onMessageDelivered: {
          get: function get() {
            return client.onMessageDelivered;
          },
          set: function set(newOnMessageDelivered) {
            if (typeof newOnMessageDelivered === 'function') client.onMessageDelivered = newOnMessageDelivered;else throw new Error(format(ERROR.INVALID_TYPE, [_typeof(newOnMessageDelivered), 'onMessageDelivered']));
          }
        },
        onMessageArrived: {
          get: function get() {
            return client.onMessageArrived;
          },
          set: function set(newOnMessageArrived) {
            if (typeof newOnMessageArrived === 'function') client.onMessageArrived = newOnMessageArrived;else throw new Error(format(ERROR.INVALID_TYPE, [_typeof(newOnMessageArrived), 'onMessageArrived']));
          }
        },
        trace: {
          get: function get() {
            return client.traceFunction;
          },
          set: function set(trace) {
            if (typeof trace === 'function') {
              client.traceFunction = trace;
            } else {
              throw new Error(format(ERROR.INVALID_TYPE, [_typeof(trace), 'onTrace']));
            }
          }
        }
      });

      /**
       * Connect this Messaging client to its server.
       *
       * @name Paho.Client#connect
       * @function
       * @param {object} connectOptions - Attributes used with the connection.
       * @param {number} connectOptions.timeout - If the connect has not succeeded within this
       *                    number of seconds, it is deemed to have failed.
       *                    The default is 30 seconds.
       * @param {string} connectOptions.userName - Authentication username for this connection.
       * @param {string} connectOptions.password - Authentication password for this connection.
       * @param {Paho.Message} connectOptions.willMessage - sent by the server when the client
       *                    disconnects abnormally.
       * @param {number} connectOptions.keepAliveInterval - the server disconnects this client if
       *                    there is no activity for this number of seconds.
       *                    The default value of 60 seconds is assumed if not set.
       * @param {boolean} connectOptions.cleanSession - if true(default) the client and server
       *                    persistent state is deleted on successful connect.
       * @param {boolean} connectOptions.useSSL - if present and true, use an SSL Websocket connection.
       * @param {object} connectOptions.invocationContext - passed to the onSuccess callback or onFailure callback.
       * @param {function} connectOptions.onSuccess - called when the connect acknowledgement
       *                    has been received from the server.
       * A single response object parameter is passed to the onSuccess callback containing the following fields:
       * <ol>
       * <li>invocationContext as passed in to the onSuccess method in the connectOptions.
       * </ol>
       * @param {function} connectOptions.onFailure - called when the connect request has failed or timed out.
       * A single response object parameter is passed to the onFailure callback containing the following fields:
       * <ol>
       * <li>invocationContext as passed in to the onFailure method in the connectOptions.
       * <li>errorCode a number indicating the nature of the error.
       * <li>errorMessage text describing the error.
       * </ol>
       * @param {array} connectOptions.hosts - If present this contains either a set of hostnames or fully qualified
       * WebSocket URIs (ws://iot.eclipse.org:80/ws), that are tried in order in place
       * of the host and port paramater on the construtor. The hosts are tried one at at time in order until
       * one of then succeeds.
       * @param {array} connectOptions.ports - If present the set of ports matching the hosts. If hosts contains URIs, this property
       * is not used.
       * @param {boolean} connectOptions.reconnect - Sets whether the client will automatically attempt to reconnect
       * to the server if the connection is lost.
       *<ul>
       *<li>If set to false, the client will not attempt to automatically reconnect to the server in the event that the
       * connection is lost.</li>
       *<li>If set to true, in the event that the connection is lost, the client will attempt to reconnect to the server.
       * It will initially wait 1 second before it attempts to reconnect, for every failed reconnect attempt, the delay
       * will double until it is at 2 minutes at which point the delay will stay at 2 minutes.</li>
       *</ul>
       * @param {number} connectOptions.mqttVersion - The version of MQTT to use to connect to the MQTT Broker.
       *<ul>
       *<li>3 - MQTT V3.1</li>
       *<li>4 - MQTT V3.1.1</li>
       *</ul>
       * @param {boolean} connectOptions.mqttVersionExplicit - If set to true, will force the connection to use the
       * selected MQTT Version or will fail to connect.
       * @param {array} connectOptions.uris - If present, should contain a list of fully qualified WebSocket uris
       * (e.g. ws://iot.eclipse.org:80/ws), that are tried in order in place of the host and port parameter of the construtor.
       * The uris are tried one at a time in order until one of them succeeds. Do not use this in conjunction with hosts as
       * the hosts array will be converted to uris and will overwrite this property.
       * @throws {InvalidState} If the client is not in disconnected state. The client must have received connectionLost
       * or disconnected before calling connect for a second or subsequent time.
       */
      this.connect = function (connectOptions) {
        connectOptions = connectOptions || {};
        validate(connectOptions, {
          timeout: 'number',
          userName: 'string',
          password: 'string',
          willMessage: 'object',
          keepAliveInterval: 'number',
          cleanSession: 'boolean',
          useSSL: 'boolean',
          invocationContext: 'object',
          onSuccess: 'function',
          onFailure: 'function',
          hosts: 'object',
          ports: 'object',
          reconnect: 'boolean',
          mqttVersion: 'number',
          mqttVersionExplicit: 'boolean',
          uris: 'object'
        });

        // If no keep alive interval is set, assume 60 seconds.
        if (connectOptions.keepAliveInterval === undefined) connectOptions.keepAliveInterval = 60;
        if (connectOptions.mqttVersion > 4 || connectOptions.mqttVersion < 3) {
          throw new Error(format(ERROR.INVALID_ARGUMENT, [connectOptions.mqttVersion, 'connectOptions.mqttVersion']));
        }
        if (connectOptions.mqttVersion === undefined) {
          connectOptions.mqttVersionExplicit = false;
          connectOptions.mqttVersion = 4;
        } else {
          connectOptions.mqttVersionExplicit = true;
        }

        //Check that if password is set, so is username
        if (connectOptions.password !== undefined && connectOptions.userName === undefined) throw new Error(format(ERROR.INVALID_ARGUMENT, [connectOptions.password, 'connectOptions.password']));
        if (connectOptions.willMessage) {
          if (!(connectOptions.willMessage instanceof Message)) throw new Error(format(ERROR.INVALID_TYPE, [connectOptions.willMessage, 'connectOptions.willMessage']));
          // The will message must have a payload that can be represented as a string.
          // Cause the willMessage to throw an exception if this is not the case.
          connectOptions.willMessage.stringPayload = null;
          if (typeof connectOptions.willMessage.destinationName === 'undefined') throw new Error(format(ERROR.INVALID_TYPE, [_typeof(connectOptions.willMessage.destinationName), 'connectOptions.willMessage.destinationName']));
        }
        if (typeof connectOptions.cleanSession === 'undefined') connectOptions.cleanSession = true;
        if (connectOptions.hosts) {
          if (!(connectOptions.hosts instanceof Array)) throw new Error(format(ERROR.INVALID_ARGUMENT, [connectOptions.hosts, 'connectOptions.hosts']));
          if (connectOptions.hosts.length < 1) throw new Error(format(ERROR.INVALID_ARGUMENT, [connectOptions.hosts, 'connectOptions.hosts']));
          var usingURIs = false;
          for (var i = 0; i < connectOptions.hosts.length; i++) {
            if (typeof connectOptions.hosts[i] !== 'string') throw new Error(format(ERROR.INVALID_TYPE, [_typeof(connectOptions.hosts[i]), 'connectOptions.hosts[' + i + ']']));
            if (/^(wss?):\/\/((\[(.+)\])|([^\/]+?))(:(\d+))?(\/.*)$/.test(connectOptions.hosts[i])) {
              if (i === 0) {
                usingURIs = true;
              } else if (!usingURIs) {
                throw new Error(format(ERROR.INVALID_ARGUMENT, [connectOptions.hosts[i], 'connectOptions.hosts[' + i + ']']));
              }
            } else if (usingURIs) {
              throw new Error(format(ERROR.INVALID_ARGUMENT, [connectOptions.hosts[i], 'connectOptions.hosts[' + i + ']']));
            }
          }
          if (!usingURIs) {
            if (!connectOptions.ports) throw new Error(format(ERROR.INVALID_ARGUMENT, [connectOptions.ports, 'connectOptions.ports']));
            if (!(connectOptions.ports instanceof Array)) throw new Error(format(ERROR.INVALID_ARGUMENT, [connectOptions.ports, 'connectOptions.ports']));
            if (connectOptions.hosts.length !== connectOptions.ports.length) throw new Error(format(ERROR.INVALID_ARGUMENT, [connectOptions.ports, 'connectOptions.ports']));
            connectOptions.uris = [];
            for (var i = 0; i < connectOptions.hosts.length; i++) {
              if (typeof connectOptions.ports[i] !== 'number' || connectOptions.ports[i] < 0) throw new Error(format(ERROR.INVALID_TYPE, [_typeof(connectOptions.ports[i]), 'connectOptions.ports[' + i + ']']));
              var host = connectOptions.hosts[i];
              var port = connectOptions.ports[i];
              var ipv6 = host.indexOf(':') !== -1;
              uri = 'ws://' + (ipv6 ? '[' + host + ']' : host) + ':' + port + path;
              connectOptions.uris.push(uri);
            }
          } else {
            connectOptions.uris = connectOptions.hosts;
          }
        }
        client.connect(connectOptions);
      };

      /**
       * Subscribe for messages, request receipt of a copy of messages sent to the destinations described by the filter.
       *
       * @name Paho.Client#subscribe
       * @function
       * @param {string} filter describing the destinations to receive messages from.
       * <br>
       * @param {object} subscribeOptions - used to control the subscription
       *
       * @param {number} subscribeOptions.qos - the maximum qos of any publications sent
       *                                  as a result of making this subscription.
       * @param {object} subscribeOptions.invocationContext - passed to the onSuccess callback
       *                                  or onFailure callback.
       * @param {function} subscribeOptions.onSuccess - called when the subscribe acknowledgement
       *                                  has been received from the server.
       *                                  A single response object parameter is passed to the onSuccess callback containing the following fields:
       *                                  <ol>
       *                                  <li>invocationContext if set in the subscribeOptions.
       *                                  </ol>
       * @param {function} subscribeOptions.onFailure - called when the subscribe request has failed or timed out.
       *                                  A single response object parameter is passed to the onFailure callback containing the following fields:
       *                                  <ol>
       *                                  <li>invocationContext - if set in the subscribeOptions.
       *                                  <li>errorCode - a number indicating the nature of the error.
       *                                  <li>errorMessage - text describing the error.
       *                                  </ol>
       * @param {number} subscribeOptions.timeout - which, if present, determines the number of
       *                                  seconds after which the onFailure calback is called.
       *                                  The presence of a timeout does not prevent the onSuccess
       *                                  callback from being called when the subscribe completes.
       * @throws {InvalidState} if the client is not in connected state.
       */
      this.subscribe = function (filter, subscribeOptions) {
        if (typeof filter !== 'string' && filter.constructor !== Array) throw new Error('Invalid argument:' + filter);
        subscribeOptions = subscribeOptions || {};
        validate(subscribeOptions, {
          qos: 'number',
          invocationContext: 'object',
          onSuccess: 'function',
          onFailure: 'function',
          timeout: 'number'
        });
        if (subscribeOptions.timeout && !subscribeOptions.onFailure) throw new Error('subscribeOptions.timeout specified with no onFailure callback.');
        if (typeof subscribeOptions.qos !== 'undefined' && !(subscribeOptions.qos === 0 || subscribeOptions.qos === 1 || subscribeOptions.qos === 2)) throw new Error(format(ERROR.INVALID_ARGUMENT, [subscribeOptions.qos, 'subscribeOptions.qos']));
        client.subscribe(filter, subscribeOptions);
      };

      /**
      * Unsubscribe for messages, stop receiving messages sent to destinations described by the filter.
      *
      * @name Paho.Client#unsubscribe
      * @function
      * @param {string} filter - describing the destinations to receive messages from.
      * @param {object} unsubscribeOptions - used to control the subscription
      * @param {object} unsubscribeOptions.invocationContext - passed to the onSuccess callback
      								  or onFailure callback.
      * @param {function} unsubscribeOptions.onSuccess - called when the unsubscribe acknowledgement has been received from the server.
      *                                    A single response object parameter is passed to the
      *                                    onSuccess callback containing the following fields:
      *                                    <ol>
      *                                    <li>invocationContext - if set in the unsubscribeOptions.
      *                                    </ol>
      * @param {function} unsubscribeOptions.onFailure called when the unsubscribe request has failed or timed out.
      *                                    A single response object parameter is passed to the onFailure callback containing the following fields:
      *                                    <ol>
      *                                    <li>invocationContext - if set in the unsubscribeOptions.
      *                                    <li>errorCode - a number indicating the nature of the error.
      *                                    <li>errorMessage - text describing the error.
      *                                    </ol>
      * @param {number} unsubscribeOptions.timeout - which, if present, determines the number of seconds
      *                                    after which the onFailure callback is called. The presence of
      *                                    a timeout does not prevent the onSuccess callback from being
      *                                    called when the unsubscribe completes
      * @throws {InvalidState} if the client is not in connected state.
      */
      this.unsubscribe = function (filter, unsubscribeOptions) {
        if (typeof filter !== 'string' && filter.constructor !== Array) throw new Error('Invalid argument:' + filter);
        unsubscribeOptions = unsubscribeOptions || {};
        validate(unsubscribeOptions, {
          invocationContext: 'object',
          onSuccess: 'function',
          onFailure: 'function',
          timeout: 'number'
        });
        if (unsubscribeOptions.timeout && !unsubscribeOptions.onFailure) throw new Error('unsubscribeOptions.timeout specified with no onFailure callback.');
        client.unsubscribe(filter, unsubscribeOptions);
      };

      /**
       * Send a message to the consumers of the destination in the Message.
       *
       * @name Paho.Client#send
       * @function
       * @param {string|Paho.Message} topic - <b>mandatory</b> The name of the destination to which the message is to be sent.
       * 					   - If it is the only parameter, used as Paho.Message object.
       * @param {String|ArrayBuffer} payload - The message data to be sent.
       * @param {number} qos The Quality of Service used to deliver the message.
       * 		<dl>
       * 			<dt>0 Best effort (default).
       *     			<dt>1 At least once.
       *     			<dt>2 Exactly once.
       * 		</dl>
       * @param {Boolean} retained If true, the message is to be retained by the server and delivered
       *                     to both current and future subscriptions.
       *                     If false the server only delivers the message to current subscribers, this is the default for new Messages.
       *                     A received message has the retained boolean set to true if the message was published
       *                     with the retained boolean set to true
       *                     and the subscrption was made after the message has been published.
       * @throws {InvalidState} if the client is not connected.
       */
      this.send = function (topic, payload, qos, retained) {
        var message;
        if (arguments.length === 0) {
          throw new Error('Invalid argument.' + 'length');
        } else if (arguments.length == 1) {
          if (!(topic instanceof Message) && typeof topic !== 'string') throw new Error('Invalid argument:' + _typeof(topic));
          message = topic;
          if (typeof message.destinationName === 'undefined') throw new Error(format(ERROR.INVALID_ARGUMENT, [message.destinationName, 'Message.destinationName']));
          client.send(message);
        } else {
          //parameter checking in Message object
          message = new Message(payload);
          message.destinationName = topic;
          if (arguments.length >= 3) message.qos = qos;
          if (arguments.length >= 4) message.retained = retained;
          client.send(message);
        }
      };

      /**
       * Publish a message to the consumers of the destination in the Message.
       * Synonym for Paho.Mqtt.Client#send
       *
       * @name Paho.Client#publish
       * @function
       * @param {string|Paho.Message} topic - <b>mandatory</b> The name of the topic to which the message is to be published.
       * 					   - If it is the only parameter, used as Paho.Message object.
       * @param {String|ArrayBuffer} payload - The message data to be published.
       * @param {number} qos The Quality of Service used to deliver the message.
       * 		<dl>
       * 			<dt>0 Best effort (default).
       *     			<dt>1 At least once.
       *     			<dt>2 Exactly once.
       * 		</dl>
       * @param {Boolean} retained If true, the message is to be retained by the server and delivered
       *                     to both current and future subscriptions.
       *                     If false the server only delivers the message to current subscribers, this is the default for new Messages.
       *                     A received message has the retained boolean set to true if the message was published
       *                     with the retained boolean set to true
       *                     and the subscrption was made after the message has been published.
       * @throws {InvalidState} if the client is not connected.
       */
      this.publish = function (topic, payload, qos, retained) {
        var message;
        if (arguments.length === 0) {
          throw new Error('Invalid argument.' + 'length');
        } else if (arguments.length == 1) {
          if (!(topic instanceof Message) && typeof topic !== 'string') throw new Error('Invalid argument:' + _typeof(topic));
          message = topic;
          if (typeof message.destinationName === 'undefined') throw new Error(format(ERROR.INVALID_ARGUMENT, [message.destinationName, 'Message.destinationName']));
          client.send(message);
        } else {
          //parameter checking in Message object
          message = new Message(payload);
          message.destinationName = topic;
          if (arguments.length >= 3) message.qos = qos;
          if (arguments.length >= 4) message.retained = retained;
          client.send(message);
        }
      };

      /**
       * Normal disconnect of this Messaging client from its server.
       *
       * @name Paho.Client#disconnect
       * @function
       * @throws {InvalidState} if the client is already disconnected.
       */
      this.disconnect = function () {
        client.disconnect();
      };

      /**
       * Get the contents of the trace log.
       *
       * @name Paho.Client#getTraceLog
       * @function
       * @return {Object[]} tracebuffer containing the time ordered trace records.
       */
      this.getTraceLog = function () {
        return client.getTraceLog();
      };

      /**
       * Start tracing.
       *
       * @name Paho.Client#startTrace
       * @function
       */
      this.startTrace = function () {
        client.startTrace();
      };

      /**
       * Stop tracing.
       *
       * @name Paho.Client#stopTrace
       * @function
       */
      this.stopTrace = function () {
        client.stopTrace();
      };
      this.isConnected = function () {
        return client.connected;
      };
    };

    /**
     * An application message, sent or received.
     * <p>
     * All attributes may be null, which implies the default values.
     *
     * @name Paho.Message
     * @constructor
     * @param {String|ArrayBuffer} payload The message data to be sent.
     * <p>
     * @property {string} payloadString <i>read only</i> The payload as a string if the payload consists of valid UTF-8 characters.
     * @property {ArrayBuffer} payloadBytes <i>read only</i> The payload as an ArrayBuffer.
     * <p>
     * @property {string} destinationName <b>mandatory</b> The name of the destination to which the message is to be sent
     *                    (for messages about to be sent) or the name of the destination from which the message has been received.
     *                    (for messages received by the onMessage function).
     * <p>
     * @property {number} qos The Quality of Service used to deliver the message.
     * <dl>
     *     <dt>0 Best effort (default).
     *     <dt>1 At least once.
     *     <dt>2 Exactly once.
     * </dl>
     * <p>
     * @property {Boolean} retained If true, the message is to be retained by the server and delivered
     *                     to both current and future subscriptions.
     *                     If false the server only delivers the message to current subscribers, this is the default for new Messages.
     *                     A received message has the retained boolean set to true if the message was published
     *                     with the retained boolean set to true
     *                     and the subscrption was made after the message has been published.
     * <p>
     * @property {Boolean} duplicate <i>read only</i> If true, this message might be a duplicate of one which has already been received.
     *                     This is only set on messages received from the server.
     *
     */
    var Message = function Message(newPayload) {
      var payload;
      if (typeof newPayload === 'string' || newPayload instanceof ArrayBuffer || ArrayBuffer.isView(newPayload) && !(newPayload instanceof DataView)) {
        payload = newPayload;
      } else {
        throw format(ERROR.INVALID_ARGUMENT, [newPayload, 'newPayload']);
      }
      var destinationName;
      var qos = 0;
      var retained = false;
      var duplicate = false;
      Object.defineProperties(this, {
        payloadString: {
          enumerable: true,
          get: function get() {
            if (typeof payload === 'string') return payload;else return parseUTF8(payload, 0, payload.length);
          }
        },
        payloadBytes: {
          enumerable: true,
          get: function get() {
            if (typeof payload === 'string') {
              var buffer = new ArrayBuffer(UTF8Length(payload));
              var byteStream = new Uint8Array(buffer);
              stringToUTF8(payload, byteStream, 0);
              return byteStream;
            } else {
              return payload;
            }
          }
        },
        destinationName: {
          enumerable: true,
          get: function get() {
            return destinationName;
          },
          set: function set(newDestinationName) {
            if (typeof newDestinationName === 'string') destinationName = newDestinationName;else throw new Error(format(ERROR.INVALID_ARGUMENT, [newDestinationName, 'newDestinationName']));
          }
        },
        qos: {
          enumerable: true,
          get: function get() {
            return qos;
          },
          set: function set(newQos) {
            if (newQos === 0 || newQos === 1 || newQos === 2) qos = newQos;else throw new Error('Invalid argument:' + newQos);
          }
        },
        retained: {
          enumerable: true,
          get: function get() {
            return retained;
          },
          set: function set(newRetained) {
            if (typeof newRetained === 'boolean') retained = newRetained;else throw new Error(format(ERROR.INVALID_ARGUMENT, [newRetained, 'newRetained']));
          }
        },
        topic: {
          enumerable: true,
          get: function get() {
            return destinationName;
          },
          set: function set(newTopic) {
            destinationName = newTopic;
          }
        },
        duplicate: {
          enumerable: true,
          get: function get() {
            return duplicate;
          },
          set: function set(newDuplicate) {
            duplicate = newDuplicate;
          }
        }
      });
    };

    // Module contents.
    return {
      Client: Client,
      Message: Message
    };
    // eslint-disable-next-line no-nested-ternary
  }(typeof __webpack_require__.g !== 'undefined' ? __webpack_require__.g : typeof self !== 'undefined' ? self : typeof window !== 'undefined' ? window : {});
  return PahoMQTT;
});

/***/ }),

/***/ "../../node_modules/rxjs/dist/esm5/internal/NotificationFactories.js":
/*!***************************************************************************!*\
  !*** ../../node_modules/rxjs/dist/esm5/internal/NotificationFactories.js ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
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

/***/ "../../node_modules/rxjs/dist/esm5/internal/operators/filter.js":
/*!**********************************************************************!*\
  !*** ../../node_modules/rxjs/dist/esm5/internal/operators/filter.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
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

/***/ "../core/dist/esm/Hub/index.mjs":
/*!**************************************!*\
  !*** ../core/dist/esm/Hub/index.mjs ***!
  \**************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
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

"use strict";
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

"use strict";
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

/***/ "../core/dist/esm/Reachability/Reachability.mjs":
/*!******************************************************!*\
  !*** ../core/dist/esm/Reachability/Reachability.mjs ***!
  \******************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
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

/***/ "../core/dist/esm/Signer/DateUtils.mjs":
/*!*********************************************!*\
  !*** ../core/dist/esm/Signer/DateUtils.mjs ***!
  \*********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DateUtils: () => (/* binding */ DateUtils)
/* harmony export */ });
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
/**
 * Date & time utility functions to abstract the `aws-sdk` away from users.
 * (v2 => v3 modularization is a breaking change)
 *
 * @see https://github.com/aws/aws-sdk-js/blob/6edf586dcc1de7fe8fbfbbd9a0d2b1847921e6e1/lib/util.js#L262
 */
const FIVE_MINUTES_IN_MS = 1000 * 60 * 5;
/**
 * This utility is intended to be deprecated and replaced by `signRequest` and `presignUrl` functions from
 * `clients/middleware/signing/signer/signatureV4`.
 *
 * TODO: refactor the logics here into `signRequest` and `presignUrl` functions and remove this class.
 *
 * @internal
 * @deprecated
 */
const DateUtils = {
    /**
     * Milliseconds to offset the date to compensate for clock skew between device & services
     */
    clockOffset: 0,
    getDateWithClockOffset() {
        if (DateUtils.clockOffset) {
            return new Date(new Date().getTime() + DateUtils.clockOffset);
        }
        else {
            return new Date();
        }
    },
    /**
     * @returns {number} Clock offset in milliseconds
     */
    getClockOffset() {
        return DateUtils.clockOffset;
    },
    getHeaderStringFromDate(date = DateUtils.getDateWithClockOffset()) {
        return date.toISOString().replace(/[:-]|\.\d{3}/g, '');
    },
    getDateFromHeaderString(header) {
        const [, year, month, day, hour, minute, second] = header.match(/^(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})(\d{2}).+/);
        return new Date(Date.UTC(Number(year), Number(month) - 1, Number(day), Number(hour), Number(minute), Number(second)));
    },
    isClockSkewed(serverDate) {
        // API gateway permits client calls that are off by no more than ±5 minutes
        return (Math.abs(serverDate.getTime() - DateUtils.getDateWithClockOffset().getTime()) >= FIVE_MINUTES_IN_MS);
    },
    isClockSkewError(error) {
        if (!error.response || !error.response.headers) {
            return false;
        }
        const { headers } = error.response;
        return Boolean(['BadRequestException', 'InvalidSignatureException'].includes(headers['x-amzn-errortype']) &&
            (headers.date || headers.Date));
    },
    /**
     * @param {number} offset Clock offset in milliseconds
     */
    setClockOffset(offset) {
        DateUtils.clockOffset = offset;
    },
};


//# sourceMappingURL=DateUtils.mjs.map


/***/ }),

/***/ "../core/dist/esm/Signer/Signer.mjs":
/*!******************************************!*\
  !*** ../core/dist/esm/Signer/Signer.mjs ***!
  \******************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Signer: () => (/* binding */ Signer)
/* harmony export */ });
/* harmony import */ var _clients_middleware_signing_signer_signatureV4_signRequest_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../clients/middleware/signing/signer/signatureV4/signRequest.mjs */ "../core/dist/esm/clients/middleware/signing/signer/signatureV4/signRequest.mjs");
/* harmony import */ var _clients_middleware_signing_signer_signatureV4_presignUrl_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../clients/middleware/signing/signer/signatureV4/presignUrl.mjs */ "../core/dist/esm/clients/middleware/signing/signer/signatureV4/presignUrl.mjs");
/* harmony import */ var _clients_middleware_signing_signer_signatureV4_constants_mjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../clients/middleware/signing/signer/signatureV4/constants.mjs */ "../core/dist/esm/clients/middleware/signing/signer/signatureV4/constants.mjs");
/* harmony import */ var _aws_crypto_sha256_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @aws-crypto/sha256-js */ "../../node_modules/@aws-crypto/sha256-js/build/module/index.js");
/* harmony import */ var _smithy_util_hex_encoding__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @smithy/util-hex-encoding */ "../core/node_modules/@smithy/util-hex-encoding/dist-es/index.js");
/* harmony import */ var _utils_amplifyUrl_index_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/amplifyUrl/index.mjs */ "../core/dist/esm/utils/amplifyUrl/index.mjs");
/* harmony import */ var _DateUtils_mjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./DateUtils.mjs */ "../core/dist/esm/Signer/DateUtils.mjs");








// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
const IOT_SERVICE_NAME = 'iotdevicegateway';
// Best practice regex to parse the service and region from an AWS endpoint
const AWS_ENDPOINT_REGEX = /([^.]+)\.(?:([^.]*)\.)?amazonaws\.com(.cn)?$/;
/**
 * This class is intended to be deprecated and replaced by `signRequest` and `presignUrl` functions from
 * `clients/middleware/signing/signer/signatureV4`.
 *
 * TODO: refactor the logics here into `signRequest` and `presignUrl` functions and remove this class.
 *
 * @internal
 * @deprecated
 */
class Signer {
    /**
    * Sign a HTTP request, add 'Authorization' header to request param
    * @method sign
    * @memberof Signer
    * @static
    *
    * @param {object} request - HTTP request object
    <pre>
    request: {
        method: GET | POST | PUT ...
        url: ...,
        headers: {
            header1: ...
        },
        data: data
    }
    </pre>
    * @param {object} access_info - AWS access credential info
    <pre>
    access_info: {
        access_key: ...,
        secret_key: ...,
        session_token: ...
    }
    </pre>
    * @param {object} [service_info] - AWS service type and region, optional,
    *                                  if not provided then parse out from url
    <pre>
    service_info: {
        service: ...,
        region: ...
    }
    </pre>
    *
    * @returns {object} Signed HTTP request
    */
    static sign(request, accessInfo, serviceInfo) {
        request.headers = request.headers || {};
        if (request.body && !request.data) {
            throw new Error('The attribute "body" was found on the request object. Please use the attribute "data" instead.');
        }
        const requestToSign = {
            ...request,
            body: request.data,
            url: new _utils_amplifyUrl_index_mjs__WEBPACK_IMPORTED_MODULE_2__.AmplifyUrl(request.url),
        };
        const options = getOptions(requestToSign, accessInfo, serviceInfo);
        const signedRequest = (0,_clients_middleware_signing_signer_signatureV4_signRequest_mjs__WEBPACK_IMPORTED_MODULE_3__.signRequest)(requestToSign, options);
        // Prior to using `signRequest`, Signer accepted urls as strings and outputted urls as string. Coerce the property
        // back to a string so as not to disrupt consumers of Signer.
        signedRequest.url = signedRequest.url.toString();
        // HTTP headers should be case insensitive but, to maintain parity with the previous Signer implementation and
        // limit the impact of this implementation swap, replace lowercased headers with title cased ones.
        signedRequest.headers.Authorization = signedRequest.headers.authorization;
        signedRequest.headers['X-Amz-Security-Token'] =
            signedRequest.headers['x-amz-security-token'];
        delete signedRequest.headers.authorization;
        delete signedRequest.headers['x-amz-security-token'];
        return signedRequest;
    }
    static signUrl(urlOrRequest, accessInfo, serviceInfo, expiration) {
        const urlToSign = typeof urlOrRequest === 'object' ? urlOrRequest.url : urlOrRequest;
        const method = typeof urlOrRequest === 'object' ? urlOrRequest.method : 'GET';
        const body = typeof urlOrRequest === 'object' ? urlOrRequest.body : undefined;
        const presignable = {
            body,
            method,
            url: new _utils_amplifyUrl_index_mjs__WEBPACK_IMPORTED_MODULE_2__.AmplifyUrl(urlToSign),
        };
        const options = getOptions(presignable, accessInfo, serviceInfo, expiration);
        const signedUrl = (0,_clients_middleware_signing_signer_signatureV4_presignUrl_mjs__WEBPACK_IMPORTED_MODULE_4__.presignUrl)(presignable, options);
        if (accessInfo.session_token &&
            !sessionTokenRequiredInSigning(options.signingService)) {
            signedUrl.searchParams.append(_clients_middleware_signing_signer_signatureV4_constants_mjs__WEBPACK_IMPORTED_MODULE_5__.TOKEN_QUERY_PARAM, accessInfo.session_token);
        }
        return signedUrl.toString();
    }
}
const getOptions = (request, accessInfo, serviceInfo, expiration) => {
    const { access_key, secret_key, session_token } = accessInfo ?? {};
    const { region: urlRegion, service: urlService } = parseServiceInfo(request.url);
    const { region = urlRegion, service = urlService } = serviceInfo ?? {};
    const credentials = {
        accessKeyId: access_key,
        secretAccessKey: secret_key,
        ...(sessionTokenRequiredInSigning(service)
            ? { sessionToken: session_token }
            : {}),
    };
    return {
        credentials,
        signingDate: _DateUtils_mjs__WEBPACK_IMPORTED_MODULE_6__.DateUtils.getDateWithClockOffset(),
        signingRegion: region,
        signingService: service,
        ...(expiration && { expiration }),
    };
};
const parseServiceInfo = (url) => {
    const { host } = url;
    const matched = host.match(AWS_ENDPOINT_REGEX) ?? [];
    let parsed = matched.slice(1, 3);
    if (parsed[1] === 'es') {
        // Elastic Search
        parsed = parsed.reverse();
    }
    return {
        service: parsed[0],
        region: parsed[1],
    };
};
// IoT service does not allow the session token in the canonical request
// https://docs.aws.amazon.com/general/latest/gr/sigv4-add-signature-to-request.html
const sessionTokenRequiredInSigning = (service) => service !== IOT_SERVICE_NAME;


//# sourceMappingURL=Signer.mjs.map


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

/***/ "../core/dist/esm/constants.mjs":
/*!**************************************!*\
  !*** ../core/dist/esm/constants.mjs ***!
  \**************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
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

/***/ "../core/dist/esm/utils/amplifyUuid/index.mjs":
/*!****************************************************!*\
  !*** ../core/dist/esm/utils/amplifyUuid/index.mjs ***!
  \****************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
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

/***/ "../core/dist/esm/utils/isWebWorker.mjs":
/*!**********************************************!*\
  !*** ../core/dist/esm/utils/isWebWorker.mjs ***!
  \**********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
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

/***/ "./dist/esm/Providers/AWSIot.mjs":
/*!***************************************!*\
  !*** ./dist/esm/Providers/AWSIot.mjs ***!
  \***************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AWSIoT: () => (/* binding */ AWSIoT)
/* harmony export */ });
/* harmony import */ var _aws_amplify_core_internals_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @aws-amplify/core/internals/utils */ "../core/dist/esm/Signer/Signer.mjs");
/* harmony import */ var _aws_amplify_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @aws-amplify/core */ "@aws-amplify/core");
/* harmony import */ var _MqttOverWS_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./MqttOverWS.mjs */ "./dist/esm/Providers/MqttOverWS.mjs");




// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
const SERVICE_NAME = 'iotdevicegateway';
class AWSIoT extends _MqttOverWS_mjs__WEBPACK_IMPORTED_MODULE_1__.MqttOverWS {
    constructor(options = {}) {
        super(options);
    }
    get region() {
        return this.options?.region;
    }
    get endpoint() {
        return (async () => {
            const { endpoint } = this.options;
            const serviceInfo = {
                service: SERVICE_NAME,
                region: this.region,
            };
            const session = await (0,_aws_amplify_core__WEBPACK_IMPORTED_MODULE_0__.fetchAuthSession)();
            if (!session.credentials) {
                throw new Error('No auth session credentials');
            }
            const { accessKeyId: access_key, secretAccessKey: secret_key, sessionToken: session_token, } = session.credentials;
            const result = _aws_amplify_core_internals_utils__WEBPACK_IMPORTED_MODULE_2__.Signer.signUrl(endpoint, { access_key, secret_key, session_token }, serviceInfo);
            return result;
        })();
    }
}


//# sourceMappingURL=AWSIot.mjs.map


/***/ }),

/***/ "./dist/esm/Providers/MqttOverWS.mjs":
/*!*******************************************!*\
  !*** ./dist/esm/Providers/MqttOverWS.mjs ***!
  \*******************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MqttOverWS: () => (/* binding */ MqttOverWS),
/* harmony export */   mqttTopicMatch: () => (/* binding */ mqttTopicMatch)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! rxjs */ "../../node_modules/rxjs/dist/esm5/internal/Observable.js");
/* harmony import */ var _aws_amplify_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @aws-amplify/core */ "@aws-amplify/core");
/* harmony import */ var _aws_amplify_core_internals_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @aws-amplify/core/internals/utils */ "../core/dist/esm/Hub/index.mjs");
/* harmony import */ var _aws_amplify_core_internals_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @aws-amplify/core/internals/utils */ "../core/dist/esm/utils/amplifyUuid/index.mjs");
/* harmony import */ var _types_PubSub_mjs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../types/PubSub.mjs */ "./dist/esm/types/PubSub.mjs");
/* harmony import */ var _vendor_paho_mqtt_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../vendor/paho-mqtt.js */ "./dist/esm/vendor/paho-mqtt.js");
/* harmony import */ var _utils_ConnectionStateMonitor_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utils/ConnectionStateMonitor.mjs */ "./dist/esm/utils/ConnectionStateMonitor.mjs");
/* harmony import */ var _utils_ReconnectionMonitor_mjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../utils/ReconnectionMonitor.mjs */ "./dist/esm/utils/ReconnectionMonitor.mjs");
/* harmony import */ var _PubSub_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./PubSub.mjs */ "./dist/esm/Providers/PubSub.mjs");
/* harmony import */ var _constants_mjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./constants.mjs */ "./dist/esm/Providers/constants.mjs");










// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
const logger = new _aws_amplify_core__WEBPACK_IMPORTED_MODULE_0__.ConsoleLogger('MqttOverWS');
function mqttTopicMatch(filter, topic) {
    const filterArray = filter.split('/');
    const { length } = filterArray;
    const topicArray = topic.split('/');
    for (let i = 0; i < length; ++i) {
        const left = filterArray[i];
        const right = topicArray[i];
        if (left === '#')
            return topicArray.length >= length;
        if (left !== '+' && left !== right)
            return false;
    }
    return length === topicArray.length;
}
class ClientsQueue {
    constructor() {
        this.promises = new Map();
    }
    async get(clientId, clientFactory) {
        const cachedPromise = this.promises.get(clientId);
        if (cachedPromise)
            return cachedPromise;
        if (clientFactory) {
            const newPromise = clientFactory(clientId);
            this.promises.set(clientId, newPromise);
            newPromise.catch(() => this.promises.delete(clientId));
            return newPromise;
        }
        return undefined;
    }
    get allClients() {
        return Array.from(this.promises.keys());
    }
    remove(clientId) {
        this.promises.delete(clientId);
    }
}
const dispatchPubSubEvent = (payload) => {
    _aws_amplify_core__WEBPACK_IMPORTED_MODULE_0__.Hub.dispatch('pubsub', payload, 'PubSub', _aws_amplify_core_internals_utils__WEBPACK_IMPORTED_MODULE_1__.AMPLIFY_SYMBOL);
};
const topicSymbol = typeof Symbol !== 'undefined' ? Symbol('topic') : '@@topic';
class MqttOverWS extends _PubSub_mjs__WEBPACK_IMPORTED_MODULE_2__.AbstractPubSub {
    constructor(options = {}) {
        super({ ...options, clientId: options.clientId || (0,_aws_amplify_core_internals_utils__WEBPACK_IMPORTED_MODULE_3__.amplifyUuid)() });
        this._clientsQueue = new ClientsQueue();
        this.connectionStateMonitor = new _utils_ConnectionStateMonitor_mjs__WEBPACK_IMPORTED_MODULE_4__.ConnectionStateMonitor();
        this.reconnectionMonitor = new _utils_ReconnectionMonitor_mjs__WEBPACK_IMPORTED_MODULE_5__.ReconnectionMonitor();
        this._topicObservers = new Map();
        this._clientIdObservers = new Map();
        // Monitor the connection health state and pass changes along to Hub
        this.connectionStateMonitor.connectionStateObservable.subscribe(connectionStateChange => {
            dispatchPubSubEvent({
                event: _constants_mjs__WEBPACK_IMPORTED_MODULE_6__.CONNECTION_STATE_CHANGE,
                data: {
                    provider: this,
                    connectionState: connectionStateChange,
                },
                message: `Connection state is ${connectionStateChange}`,
            });
            this.connectionState = connectionStateChange;
            // Trigger reconnection when the connection is disrupted
            if (connectionStateChange === _types_PubSub_mjs__WEBPACK_IMPORTED_MODULE_7__.ConnectionState.ConnectionDisrupted) {
                this.reconnectionMonitor.record(_utils_ReconnectionMonitor_mjs__WEBPACK_IMPORTED_MODULE_5__.ReconnectEvent.START_RECONNECT);
            }
            else if (connectionStateChange !== _types_PubSub_mjs__WEBPACK_IMPORTED_MODULE_7__.ConnectionState.Connecting) {
                // Trigger connected to halt reconnection attempts
                this.reconnectionMonitor.record(_utils_ReconnectionMonitor_mjs__WEBPACK_IMPORTED_MODULE_5__.ReconnectEvent.HALT_RECONNECT);
            }
        });
    }
    get clientId() {
        return this.options.clientId;
    }
    get endpoint() {
        return Promise.resolve(this.options.endpoint);
    }
    get clientsQueue() {
        return this._clientsQueue;
    }
    get isSSLEnabled() {
        return !this.options
            .aws_appsync_dangerously_connect_to_http_endpoint_for_testing;
    }
    onDisconnect({ clientId, errorCode, ...args }) {
        if (errorCode !== 0) {
            logger.warn(clientId, JSON.stringify({ errorCode, ...args }, null, 2));
            if (!clientId) {
                return;
            }
            const clientIdObservers = this._clientIdObservers.get(clientId);
            if (!clientIdObservers) {
                return;
            }
            this.disconnect(clientId);
        }
    }
    async newClient({ url, clientId }) {
        logger.debug('Creating new MQTT client', clientId);
        this.connectionStateMonitor.record(_utils_ConnectionStateMonitor_mjs__WEBPACK_IMPORTED_MODULE_4__.CONNECTION_CHANGE.OPENING_CONNECTION);
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore this module is expected to not have declaration file
        const client = new _vendor_paho_mqtt_js__WEBPACK_IMPORTED_MODULE_8__.Client(url, clientId);
        client.onMessageArrived = ({ destinationName: topic, payloadString: msg, }) => {
            this._onMessage(topic, msg);
        };
        client.onConnectionLost = ({ errorCode, ...args }) => {
            this.onDisconnect({ clientId, errorCode, ...args });
            this.connectionStateMonitor.record(_utils_ConnectionStateMonitor_mjs__WEBPACK_IMPORTED_MODULE_4__.CONNECTION_CHANGE.CLOSED);
        };
        const connected = await new Promise((resolve, _reject) => {
            client.connect({
                useSSL: this.isSSLEnabled,
                mqttVersion: 3,
                onSuccess: () => {
                    resolve(true);
                },
                onFailure: () => {
                    if (clientId)
                        this._clientsQueue.remove(clientId);
                    this.connectionStateMonitor.record(_utils_ConnectionStateMonitor_mjs__WEBPACK_IMPORTED_MODULE_4__.CONNECTION_CHANGE.CLOSED);
                    resolve(false);
                },
            });
        });
        if (connected) {
            this.connectionStateMonitor.record(_utils_ConnectionStateMonitor_mjs__WEBPACK_IMPORTED_MODULE_4__.CONNECTION_CHANGE.CONNECTION_ESTABLISHED);
        }
        return client;
    }
    async connect(clientId, options = {}) {
        return this.clientsQueue.get(clientId, async (inputClientId) => {
            const client = await this.newClient({
                ...options,
                clientId: inputClientId,
            });
            if (client) {
                // Once connected, subscribe to all topics registered observers
                this._topicObservers.forEach((_value, key) => {
                    client.subscribe(key);
                });
            }
            return client;
        });
    }
    async disconnect(clientId) {
        const client = await this.clientsQueue.get(clientId);
        if (client && client.isConnected()) {
            client.disconnect();
        }
        this.clientsQueue.remove(clientId);
        this.connectionStateMonitor.record(_utils_ConnectionStateMonitor_mjs__WEBPACK_IMPORTED_MODULE_4__.CONNECTION_CHANGE.CLOSED);
    }
    async publish({ topics, message }) {
        const targetTopics = [].concat(topics);
        const msg = JSON.stringify(message);
        const client = await this.clientsQueue.get(this.clientId);
        if (client) {
            logger.debug('Publishing to topic(s)', targetTopics.join(','), message);
            targetTopics.forEach(topic => {
                client.send(topic, msg);
            });
        }
        else {
            logger.debug('Publishing to topic(s) failed', targetTopics.join(','), message);
        }
    }
    _onMessage(topic, msg) {
        try {
            const matchedTopicObservers = [];
            this._topicObservers.forEach((observerForTopic, observerTopic) => {
                if (mqttTopicMatch(observerTopic, topic)) {
                    matchedTopicObservers.push(observerForTopic);
                }
            });
            const parsedMessage = JSON.parse(msg);
            if (typeof parsedMessage === 'object') {
                parsedMessage[topicSymbol] = topic;
            }
            matchedTopicObservers.forEach(observersForTopic => {
                observersForTopic.forEach(observer => {
                    observer.next(parsedMessage);
                });
            });
        }
        catch (error) {
            logger.warn('Error handling message', error, msg);
        }
    }
    subscribe({ topics, options = {}, }) {
        const targetTopics = [].concat(topics);
        logger.debug('Subscribing to topic(s)', targetTopics.join(','));
        let reconnectSubscription;
        return new rxjs__WEBPACK_IMPORTED_MODULE_9__.Observable(observer => {
            targetTopics.forEach(topic => {
                // this._topicObservers is used to notify the observers according to the topic received on the message
                let observersForTopic = this._topicObservers.get(topic);
                if (!observersForTopic) {
                    observersForTopic = new Set();
                    this._topicObservers.set(topic, observersForTopic);
                }
                observersForTopic.add(observer);
            });
            const { clientId = this.clientId } = options;
            // this._clientIdObservers is used to close observers when client gets disconnected
            let observersForClientId = this._clientIdObservers.get(clientId);
            if (!observersForClientId) {
                observersForClientId = new Set();
            }
            if (observersForClientId) {
                observersForClientId.add(observer);
                this._clientIdObservers.set(clientId, observersForClientId);
            }
            (async () => {
                const getClient = async () => {
                    try {
                        const { url = await this.endpoint } = options;
                        const client = await this.connect(clientId, { url });
                        if (client !== undefined) {
                            targetTopics.forEach(topic => {
                                client.subscribe(topic);
                            });
                        }
                    }
                    catch (e) {
                        logger.debug('Error forming connection', e);
                    }
                };
                // Establish the initial connection
                await getClient();
                // Add an observable to the reconnection list to manage reconnection for this subscription
                reconnectSubscription = new rxjs__WEBPACK_IMPORTED_MODULE_9__.Observable(reconnectSubscriptionObserver => {
                    this.reconnectionMonitor.addObserver(reconnectSubscriptionObserver);
                }).subscribe(() => {
                    getClient();
                });
            })();
            return async () => {
                const client = await this.clientsQueue.get(clientId);
                reconnectSubscription?.unsubscribe();
                if (client) {
                    this._clientIdObservers.get(clientId)?.delete(observer);
                    // No more observers per client => client not needed anymore
                    if (this._clientIdObservers.get(clientId)?.size === 0) {
                        this.disconnect(clientId);
                        this.connectionStateMonitor.record(_utils_ConnectionStateMonitor_mjs__WEBPACK_IMPORTED_MODULE_4__.CONNECTION_CHANGE.CLOSING_CONNECTION);
                        this._clientIdObservers.delete(clientId);
                    }
                    targetTopics.forEach(topic => {
                        const observersForTopic = this._topicObservers.get(topic) ||
                            new Set();
                        observersForTopic.delete(observer);
                        // if no observers exists for the topic, topic should be removed
                        if (observersForTopic.size === 0) {
                            this._topicObservers.delete(topic);
                            if (client.isConnected()) {
                                client.unsubscribe(topic);
                            }
                        }
                    });
                }
                return null;
            };
        });
    }
}


//# sourceMappingURL=MqttOverWS.mjs.map


/***/ }),

/***/ "./dist/esm/Providers/PubSub.mjs":
/*!***************************************!*\
  !*** ./dist/esm/Providers/PubSub.mjs ***!
  \***************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AbstractPubSub: () => (/* binding */ AbstractPubSub)
/* harmony export */ });
/* harmony import */ var _aws_amplify_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @aws-amplify/core */ "@aws-amplify/core");


const logger = new _aws_amplify_core__WEBPACK_IMPORTED_MODULE_0__.ConsoleLogger('AbstractPubSubProvider');
class AbstractPubSub {
    constructor(options) {
        this._config = options;
    }
    configure(config) {
        this._config = { ...config, ...this._config };
        logger.debug(`configure`, this._config);
        return this.options;
    }
    get options() {
        return { ...this._config };
    }
}


//# sourceMappingURL=PubSub.mjs.map


/***/ }),

/***/ "./dist/esm/Providers/constants.mjs":
/*!******************************************!*\
  !*** ./dist/esm/Providers/constants.mjs ***!
  \******************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
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
     * This message type is for subscription message from AWS AppSync RealTime
     */
    MESSAGE_TYPES["GQL_DATA"] = "data";
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

/***/ "./dist/esm/types/PubSub.mjs":
/*!***********************************!*\
  !*** ./dist/esm/types/PubSub.mjs ***!
  \***********************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
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

/***/ "./dist/esm/utils/ConnectionStateMonitor.mjs":
/*!***************************************************!*\
  !*** ./dist/esm/utils/ConnectionStateMonitor.mjs ***!
  \***************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
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

"use strict";
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

"use strict";
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
 *   Reconnnect attempts are delayed by 5 seconds to let the interface settle.
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
/******/ 			id: moduleId,
/******/ 			loaded: false,
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
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
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
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
/******/ 	/* webpack/runtime/node module decorator */
/******/ 	(() => {
/******/ 		__webpack_require__.nmd = (module) => {
/******/ 			module.paths = [];
/******/ 			if (!module.children) module.children = [];
/******/ 			return module;
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
/* harmony export */   CONNECTION_STATE_CHANGE: () => (/* reexport safe */ _Providers_constants_mjs__WEBPACK_IMPORTED_MODULE_0__.CONNECTION_STATE_CHANGE),
/* harmony export */   CONTROL_MSG: () => (/* reexport safe */ _types_PubSub_mjs__WEBPACK_IMPORTED_MODULE_1__.CONTROL_MSG),
/* harmony export */   ConnectionState: () => (/* reexport safe */ _types_PubSub_mjs__WEBPACK_IMPORTED_MODULE_1__.ConnectionState),
/* harmony export */   PubSub: () => (/* reexport safe */ _Providers_AWSIot_mjs__WEBPACK_IMPORTED_MODULE_2__.AWSIoT),
/* harmony export */   mqttTopicMatch: () => (/* reexport safe */ _Providers_MqttOverWS_mjs__WEBPACK_IMPORTED_MODULE_3__.mqttTopicMatch)
/* harmony export */ });
/* harmony import */ var _Providers_constants_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Providers/constants.mjs */ "./dist/esm/Providers/constants.mjs");
/* harmony import */ var _types_PubSub_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./types/PubSub.mjs */ "./dist/esm/types/PubSub.mjs");
/* harmony import */ var _Providers_AWSIot_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Providers/AWSIot.mjs */ "./dist/esm/Providers/AWSIot.mjs");
/* harmony import */ var _Providers_MqttOverWS_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Providers/MqttOverWS.mjs */ "./dist/esm/Providers/MqttOverWS.mjs");





//# sourceMappingURL=index.mjs.map

})();

/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=aws-amplify-pubsub.js.map