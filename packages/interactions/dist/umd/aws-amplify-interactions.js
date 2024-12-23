(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("aws_amplify_core"));
	else if(typeof define === 'function' && define.amd)
		define("aws_amplify_interactions", ["aws_amplify_core"], factory);
	else if(typeof exports === 'object')
		exports["aws_amplify_interactions"] = factory(require("aws_amplify_core"));
	else
		root["aws_amplify_interactions"] = factory(root["aws_amplify_core"]);
})(this, (__WEBPACK_EXTERNAL_MODULE__aws_amplify_core__) => {
return /******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "../../node_modules/@aws-crypto/crc32/build/module/aws_crc32.js":
/*!**********************************************************************!*\
  !*** ../../node_modules/@aws-crypto/crc32/build/module/aws_crc32.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AwsCrc32: () => (/* binding */ AwsCrc32)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.mjs");
/* harmony import */ var _aws_crypto_util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @aws-crypto/util */ "../../node_modules/@aws-crypto/util/build/module/index.js");
/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./index */ "../../node_modules/@aws-crypto/crc32/build/module/index.js");
// Copyright Amazon.com Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0



var AwsCrc32 = /** @class */ (function () {
    function AwsCrc32() {
        this.crc32 = new _index__WEBPACK_IMPORTED_MODULE_1__.Crc32();
    }
    AwsCrc32.prototype.update = function (toHash) {
        if ((0,_aws_crypto_util__WEBPACK_IMPORTED_MODULE_0__.isEmptyData)(toHash))
            return;
        this.crc32.update((0,_aws_crypto_util__WEBPACK_IMPORTED_MODULE_0__.convertToBuffer)(toHash));
    };
    AwsCrc32.prototype.digest = function () {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__awaiter)(this, void 0, void 0, function () {
            return (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__generator)(this, function (_a) {
                return [2 /*return*/, (0,_aws_crypto_util__WEBPACK_IMPORTED_MODULE_0__.numToUint8)(this.crc32.digest())];
            });
        });
    };
    AwsCrc32.prototype.reset = function () {
        this.crc32 = new _index__WEBPACK_IMPORTED_MODULE_1__.Crc32();
    };
    return AwsCrc32;
}());

//# sourceMappingURL=aws_crc32.js.map

/***/ }),

/***/ "../../node_modules/@aws-crypto/crc32/build/module/index.js":
/*!******************************************************************!*\
  !*** ../../node_modules/@aws-crypto/crc32/build/module/index.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AwsCrc32: () => (/* reexport safe */ _aws_crc32__WEBPACK_IMPORTED_MODULE_2__.AwsCrc32),
/* harmony export */   Crc32: () => (/* binding */ Crc32),
/* harmony export */   crc32: () => (/* binding */ crc32)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.mjs");
/* harmony import */ var _aws_crypto_util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @aws-crypto/util */ "../../node_modules/@aws-crypto/util/build/module/index.js");
/* harmony import */ var _aws_crc32__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./aws_crc32 */ "../../node_modules/@aws-crypto/crc32/build/module/aws_crc32.js");


function crc32(data) {
    return new Crc32().update(data).digest();
}
var Crc32 = /** @class */ (function () {
    function Crc32() {
        this.checksum = 0xffffffff;
    }
    Crc32.prototype.update = function (data) {
        var e_1, _a;
        try {
            for (var data_1 = (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__values)(data), data_1_1 = data_1.next(); !data_1_1.done; data_1_1 = data_1.next()) {
                var byte = data_1_1.value;
                this.checksum =
                    (this.checksum >>> 8) ^ lookupTable[(this.checksum ^ byte) & 0xff];
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (data_1_1 && !data_1_1.done && (_a = data_1.return)) _a.call(data_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return this;
    };
    Crc32.prototype.digest = function () {
        return (this.checksum ^ 0xffffffff) >>> 0;
    };
    return Crc32;
}());

// prettier-ignore
var a_lookUpTable = [
    0x00000000, 0x77073096, 0xEE0E612C, 0x990951BA,
    0x076DC419, 0x706AF48F, 0xE963A535, 0x9E6495A3,
    0x0EDB8832, 0x79DCB8A4, 0xE0D5E91E, 0x97D2D988,
    0x09B64C2B, 0x7EB17CBD, 0xE7B82D07, 0x90BF1D91,
    0x1DB71064, 0x6AB020F2, 0xF3B97148, 0x84BE41DE,
    0x1ADAD47D, 0x6DDDE4EB, 0xF4D4B551, 0x83D385C7,
    0x136C9856, 0x646BA8C0, 0xFD62F97A, 0x8A65C9EC,
    0x14015C4F, 0x63066CD9, 0xFA0F3D63, 0x8D080DF5,
    0x3B6E20C8, 0x4C69105E, 0xD56041E4, 0xA2677172,
    0x3C03E4D1, 0x4B04D447, 0xD20D85FD, 0xA50AB56B,
    0x35B5A8FA, 0x42B2986C, 0xDBBBC9D6, 0xACBCF940,
    0x32D86CE3, 0x45DF5C75, 0xDCD60DCF, 0xABD13D59,
    0x26D930AC, 0x51DE003A, 0xC8D75180, 0xBFD06116,
    0x21B4F4B5, 0x56B3C423, 0xCFBA9599, 0xB8BDA50F,
    0x2802B89E, 0x5F058808, 0xC60CD9B2, 0xB10BE924,
    0x2F6F7C87, 0x58684C11, 0xC1611DAB, 0xB6662D3D,
    0x76DC4190, 0x01DB7106, 0x98D220BC, 0xEFD5102A,
    0x71B18589, 0x06B6B51F, 0x9FBFE4A5, 0xE8B8D433,
    0x7807C9A2, 0x0F00F934, 0x9609A88E, 0xE10E9818,
    0x7F6A0DBB, 0x086D3D2D, 0x91646C97, 0xE6635C01,
    0x6B6B51F4, 0x1C6C6162, 0x856530D8, 0xF262004E,
    0x6C0695ED, 0x1B01A57B, 0x8208F4C1, 0xF50FC457,
    0x65B0D9C6, 0x12B7E950, 0x8BBEB8EA, 0xFCB9887C,
    0x62DD1DDF, 0x15DA2D49, 0x8CD37CF3, 0xFBD44C65,
    0x4DB26158, 0x3AB551CE, 0xA3BC0074, 0xD4BB30E2,
    0x4ADFA541, 0x3DD895D7, 0xA4D1C46D, 0xD3D6F4FB,
    0x4369E96A, 0x346ED9FC, 0xAD678846, 0xDA60B8D0,
    0x44042D73, 0x33031DE5, 0xAA0A4C5F, 0xDD0D7CC9,
    0x5005713C, 0x270241AA, 0xBE0B1010, 0xC90C2086,
    0x5768B525, 0x206F85B3, 0xB966D409, 0xCE61E49F,
    0x5EDEF90E, 0x29D9C998, 0xB0D09822, 0xC7D7A8B4,
    0x59B33D17, 0x2EB40D81, 0xB7BD5C3B, 0xC0BA6CAD,
    0xEDB88320, 0x9ABFB3B6, 0x03B6E20C, 0x74B1D29A,
    0xEAD54739, 0x9DD277AF, 0x04DB2615, 0x73DC1683,
    0xE3630B12, 0x94643B84, 0x0D6D6A3E, 0x7A6A5AA8,
    0xE40ECF0B, 0x9309FF9D, 0x0A00AE27, 0x7D079EB1,
    0xF00F9344, 0x8708A3D2, 0x1E01F268, 0x6906C2FE,
    0xF762575D, 0x806567CB, 0x196C3671, 0x6E6B06E7,
    0xFED41B76, 0x89D32BE0, 0x10DA7A5A, 0x67DD4ACC,
    0xF9B9DF6F, 0x8EBEEFF9, 0x17B7BE43, 0x60B08ED5,
    0xD6D6A3E8, 0xA1D1937E, 0x38D8C2C4, 0x4FDFF252,
    0xD1BB67F1, 0xA6BC5767, 0x3FB506DD, 0x48B2364B,
    0xD80D2BDA, 0xAF0A1B4C, 0x36034AF6, 0x41047A60,
    0xDF60EFC3, 0xA867DF55, 0x316E8EEF, 0x4669BE79,
    0xCB61B38C, 0xBC66831A, 0x256FD2A0, 0x5268E236,
    0xCC0C7795, 0xBB0B4703, 0x220216B9, 0x5505262F,
    0xC5BA3BBE, 0xB2BD0B28, 0x2BB45A92, 0x5CB36A04,
    0xC2D7FFA7, 0xB5D0CF31, 0x2CD99E8B, 0x5BDEAE1D,
    0x9B64C2B0, 0xEC63F226, 0x756AA39C, 0x026D930A,
    0x9C0906A9, 0xEB0E363F, 0x72076785, 0x05005713,
    0x95BF4A82, 0xE2B87A14, 0x7BB12BAE, 0x0CB61B38,
    0x92D28E9B, 0xE5D5BE0D, 0x7CDCEFB7, 0x0BDBDF21,
    0x86D3D2D4, 0xF1D4E242, 0x68DDB3F8, 0x1FDA836E,
    0x81BE16CD, 0xF6B9265B, 0x6FB077E1, 0x18B74777,
    0x88085AE6, 0xFF0F6A70, 0x66063BCA, 0x11010B5C,
    0x8F659EFF, 0xF862AE69, 0x616BFFD3, 0x166CCF45,
    0xA00AE278, 0xD70DD2EE, 0x4E048354, 0x3903B3C2,
    0xA7672661, 0xD06016F7, 0x4969474D, 0x3E6E77DB,
    0xAED16A4A, 0xD9D65ADC, 0x40DF0B66, 0x37D83BF0,
    0xA9BCAE53, 0xDEBB9EC5, 0x47B2CF7F, 0x30B5FFE9,
    0xBDBDF21C, 0xCABAC28A, 0x53B39330, 0x24B4A3A6,
    0xBAD03605, 0xCDD70693, 0x54DE5729, 0x23D967BF,
    0xB3667A2E, 0xC4614AB8, 0x5D681B02, 0x2A6F2B94,
    0xB40BBE37, 0xC30C8EA1, 0x5A05DF1B, 0x2D02EF8D,
];
var lookupTable = (0,_aws_crypto_util__WEBPACK_IMPORTED_MODULE_0__.uint32ArrayFrom)(a_lookUpTable);

//# sourceMappingURL=index.js.map

/***/ }),

/***/ "../../node_modules/@aws-crypto/sha256-browser/build/module/constants.js":
/*!*******************************************************************************!*\
  !*** ../../node_modules/@aws-crypto/sha256-browser/build/module/constants.js ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   EMPTY_DATA_SHA_256: () => (/* binding */ EMPTY_DATA_SHA_256),
/* harmony export */   SHA_256_HASH: () => (/* binding */ SHA_256_HASH),
/* harmony export */   SHA_256_HMAC_ALGO: () => (/* binding */ SHA_256_HMAC_ALGO)
/* harmony export */ });
var SHA_256_HASH = { name: "SHA-256" };
var SHA_256_HMAC_ALGO = {
    name: "HMAC",
    hash: SHA_256_HASH
};
var EMPTY_DATA_SHA_256 = new Uint8Array([
    227,
    176,
    196,
    66,
    152,
    252,
    28,
    20,
    154,
    251,
    244,
    200,
    153,
    111,
    185,
    36,
    39,
    174,
    65,
    228,
    100,
    155,
    147,
    76,
    164,
    149,
    153,
    27,
    120,
    82,
    184,
    85
]);
//# sourceMappingURL=constants.js.map

/***/ }),

/***/ "../../node_modules/@aws-crypto/sha256-browser/build/module/crossPlatformSha256.js":
/*!*****************************************************************************************!*\
  !*** ../../node_modules/@aws-crypto/sha256-browser/build/module/crossPlatformSha256.js ***!
  \*****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Sha256: () => (/* binding */ Sha256)
/* harmony export */ });
/* harmony import */ var _webCryptoSha256__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./webCryptoSha256 */ "../../node_modules/@aws-crypto/sha256-browser/build/module/webCryptoSha256.js");
/* harmony import */ var _aws_crypto_sha256_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @aws-crypto/sha256-js */ "../../node_modules/@aws-crypto/sha256-js/build/module/index.js");
/* harmony import */ var _aws_crypto_supports_web_crypto__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @aws-crypto/supports-web-crypto */ "../../node_modules/@aws-crypto/supports-web-crypto/build/module/index.js");
/* harmony import */ var _aws_sdk_util_locate_window__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @aws-sdk/util-locate-window */ "../../node_modules/@aws-sdk/util-locate-window/dist-es/index.js");
/* harmony import */ var _aws_crypto_util__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @aws-crypto/util */ "../../node_modules/@aws-crypto/util/build/module/index.js");





var Sha256 = /** @class */ (function () {
    function Sha256(secret) {
        if ((0,_aws_crypto_supports_web_crypto__WEBPACK_IMPORTED_MODULE_2__.supportsWebCrypto)((0,_aws_sdk_util_locate_window__WEBPACK_IMPORTED_MODULE_3__.locateWindow)())) {
            this.hash = new _webCryptoSha256__WEBPACK_IMPORTED_MODULE_0__.Sha256(secret);
        }
        else {
            this.hash = new _aws_crypto_sha256_js__WEBPACK_IMPORTED_MODULE_1__.Sha256(secret);
        }
    }
    Sha256.prototype.update = function (data, encoding) {
        this.hash.update((0,_aws_crypto_util__WEBPACK_IMPORTED_MODULE_4__.convertToBuffer)(data));
    };
    Sha256.prototype.digest = function () {
        return this.hash.digest();
    };
    Sha256.prototype.reset = function () {
        this.hash.reset();
    };
    return Sha256;
}());

//# sourceMappingURL=crossPlatformSha256.js.map

/***/ }),

/***/ "../../node_modules/@aws-crypto/sha256-browser/build/module/index.js":
/*!***************************************************************************!*\
  !*** ../../node_modules/@aws-crypto/sha256-browser/build/module/index.js ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Sha256: () => (/* reexport safe */ _crossPlatformSha256__WEBPACK_IMPORTED_MODULE_0__.Sha256),
/* harmony export */   WebCryptoSha256: () => (/* reexport safe */ _webCryptoSha256__WEBPACK_IMPORTED_MODULE_1__.Sha256)
/* harmony export */ });
/* harmony import */ var _crossPlatformSha256__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./crossPlatformSha256 */ "../../node_modules/@aws-crypto/sha256-browser/build/module/crossPlatformSha256.js");
/* harmony import */ var _webCryptoSha256__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./webCryptoSha256 */ "../../node_modules/@aws-crypto/sha256-browser/build/module/webCryptoSha256.js");


//# sourceMappingURL=index.js.map

/***/ }),

/***/ "../../node_modules/@aws-crypto/sha256-browser/build/module/webCryptoSha256.js":
/*!*************************************************************************************!*\
  !*** ../../node_modules/@aws-crypto/sha256-browser/build/module/webCryptoSha256.js ***!
  \*************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Sha256: () => (/* binding */ Sha256)
/* harmony export */ });
/* harmony import */ var _aws_crypto_util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @aws-crypto/util */ "../../node_modules/@aws-crypto/util/build/module/index.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./constants */ "../../node_modules/@aws-crypto/sha256-browser/build/module/constants.js");
/* harmony import */ var _aws_sdk_util_locate_window__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @aws-sdk/util-locate-window */ "../../node_modules/@aws-sdk/util-locate-window/dist-es/index.js");



var Sha256 = /** @class */ (function () {
    function Sha256(secret) {
        this.toHash = new Uint8Array(0);
        this.secret = secret;
        this.reset();
    }
    Sha256.prototype.update = function (data) {
        if ((0,_aws_crypto_util__WEBPACK_IMPORTED_MODULE_0__.isEmptyData)(data)) {
            return;
        }
        var update = (0,_aws_crypto_util__WEBPACK_IMPORTED_MODULE_0__.convertToBuffer)(data);
        var typedArray = new Uint8Array(this.toHash.byteLength + update.byteLength);
        typedArray.set(this.toHash, 0);
        typedArray.set(update, this.toHash.byteLength);
        this.toHash = typedArray;
    };
    Sha256.prototype.digest = function () {
        var _this = this;
        if (this.key) {
            return this.key.then(function (key) {
                return (0,_aws_sdk_util_locate_window__WEBPACK_IMPORTED_MODULE_2__.locateWindow)()
                    .crypto.subtle.sign(_constants__WEBPACK_IMPORTED_MODULE_1__.SHA_256_HMAC_ALGO, key, _this.toHash)
                    .then(function (data) { return new Uint8Array(data); });
            });
        }
        if ((0,_aws_crypto_util__WEBPACK_IMPORTED_MODULE_0__.isEmptyData)(this.toHash)) {
            return Promise.resolve(_constants__WEBPACK_IMPORTED_MODULE_1__.EMPTY_DATA_SHA_256);
        }
        return Promise.resolve()
            .then(function () {
            return (0,_aws_sdk_util_locate_window__WEBPACK_IMPORTED_MODULE_2__.locateWindow)().crypto.subtle.digest(_constants__WEBPACK_IMPORTED_MODULE_1__.SHA_256_HASH, _this.toHash);
        })
            .then(function (data) { return Promise.resolve(new Uint8Array(data)); });
    };
    Sha256.prototype.reset = function () {
        var _this = this;
        this.toHash = new Uint8Array(0);
        if (this.secret && this.secret !== void 0) {
            this.key = new Promise(function (resolve, reject) {
                (0,_aws_sdk_util_locate_window__WEBPACK_IMPORTED_MODULE_2__.locateWindow)()
                    .crypto.subtle.importKey("raw", (0,_aws_crypto_util__WEBPACK_IMPORTED_MODULE_0__.convertToBuffer)(_this.secret), _constants__WEBPACK_IMPORTED_MODULE_1__.SHA_256_HMAC_ALGO, false, ["sign"])
                    .then(resolve, reject);
            });
            this.key.catch(function () { });
        }
    };
    return Sha256;
}());

//# sourceMappingURL=webCryptoSha256.js.map

/***/ }),

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

/***/ "../../node_modules/@aws-crypto/supports-web-crypto/build/module/index.js":
/*!********************************************************************************!*\
  !*** ../../node_modules/@aws-crypto/supports-web-crypto/build/module/index.js ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   supportsSecureRandom: () => (/* reexport safe */ _supportsWebCrypto__WEBPACK_IMPORTED_MODULE_0__.supportsSecureRandom),
/* harmony export */   supportsSubtleCrypto: () => (/* reexport safe */ _supportsWebCrypto__WEBPACK_IMPORTED_MODULE_0__.supportsSubtleCrypto),
/* harmony export */   supportsWebCrypto: () => (/* reexport safe */ _supportsWebCrypto__WEBPACK_IMPORTED_MODULE_0__.supportsWebCrypto),
/* harmony export */   supportsZeroByteGCM: () => (/* reexport safe */ _supportsWebCrypto__WEBPACK_IMPORTED_MODULE_0__.supportsZeroByteGCM)
/* harmony export */ });
/* harmony import */ var _supportsWebCrypto__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./supportsWebCrypto */ "../../node_modules/@aws-crypto/supports-web-crypto/build/module/supportsWebCrypto.js");

//# sourceMappingURL=index.js.map

/***/ }),

/***/ "../../node_modules/@aws-crypto/supports-web-crypto/build/module/supportsWebCrypto.js":
/*!********************************************************************************************!*\
  !*** ../../node_modules/@aws-crypto/supports-web-crypto/build/module/supportsWebCrypto.js ***!
  \********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   supportsSecureRandom: () => (/* binding */ supportsSecureRandom),
/* harmony export */   supportsSubtleCrypto: () => (/* binding */ supportsSubtleCrypto),
/* harmony export */   supportsWebCrypto: () => (/* binding */ supportsWebCrypto),
/* harmony export */   supportsZeroByteGCM: () => (/* binding */ supportsZeroByteGCM)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.mjs");

var subtleCryptoMethods = [
    "decrypt",
    "digest",
    "encrypt",
    "exportKey",
    "generateKey",
    "importKey",
    "sign",
    "verify"
];
function supportsWebCrypto(window) {
    if (supportsSecureRandom(window) &&
        typeof window.crypto.subtle === "object") {
        var subtle = window.crypto.subtle;
        return supportsSubtleCrypto(subtle);
    }
    return false;
}
function supportsSecureRandom(window) {
    if (typeof window === "object" && typeof window.crypto === "object") {
        var getRandomValues = window.crypto.getRandomValues;
        return typeof getRandomValues === "function";
    }
    return false;
}
function supportsSubtleCrypto(subtle) {
    return (subtle &&
        subtleCryptoMethods.every(function (methodName) { return typeof subtle[methodName] === "function"; }));
}
function supportsZeroByteGCM(subtle) {
    return (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__awaiter)(this, void 0, void 0, function () {
        var key, zeroByteAuthTag, _a;
        return (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__generator)(this, function (_b) {
            switch (_b.label) {
                case 0:
                    if (!supportsSubtleCrypto(subtle))
                        return [2 /*return*/, false];
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, subtle.generateKey({ name: "AES-GCM", length: 128 }, false, ["encrypt"])];
                case 2:
                    key = _b.sent();
                    return [4 /*yield*/, subtle.encrypt({
                            name: "AES-GCM",
                            iv: new Uint8Array(Array(12)),
                            additionalData: new Uint8Array(Array(16)),
                            tagLength: 128
                        }, key, new Uint8Array(0))];
                case 3:
                    zeroByteAuthTag = _b.sent();
                    return [2 /*return*/, zeroByteAuthTag.byteLength === 16];
                case 4:
                    _a = _b.sent();
                    return [2 /*return*/, false];
                case 5: return [2 /*return*/];
            }
        });
    });
}
//# sourceMappingURL=supportsWebCrypto.js.map

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

/***/ "../../node_modules/@aws-sdk/client-lex-runtime-v2/dist-es/LexRuntimeV2Client.js":
/*!***************************************************************************************!*\
  !*** ../../node_modules/@aws-sdk/client-lex-runtime-v2/dist-es/LexRuntimeV2Client.js ***!
  \***************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   LexRuntimeV2Client: () => (/* binding */ LexRuntimeV2Client),
/* harmony export */   __Client: () => (/* reexport safe */ _smithy_smithy_client__WEBPACK_IMPORTED_MODULE_11__.Client)
/* harmony export */ });
/* harmony import */ var _aws_sdk_middleware_eventstream__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @aws-sdk/middleware-eventstream */ "../../node_modules/@aws-sdk/middleware-eventstream/dist-es/index.js");
/* harmony import */ var _aws_sdk_middleware_host_header__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @aws-sdk/middleware-host-header */ "../../node_modules/@aws-sdk/middleware-host-header/dist-es/index.js");
/* harmony import */ var _aws_sdk_middleware_logger__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @aws-sdk/middleware-logger */ "../../node_modules/@aws-sdk/middleware-logger/dist-es/index.js");
/* harmony import */ var _aws_sdk_middleware_recursion_detection__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @aws-sdk/middleware-recursion-detection */ "../../node_modules/@aws-sdk/middleware-recursion-detection/dist-es/index.js");
/* harmony import */ var _aws_sdk_middleware_signing__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @aws-sdk/middleware-signing */ "../../node_modules/@aws-sdk/middleware-signing/dist-es/index.js");
/* harmony import */ var _aws_sdk_middleware_user_agent__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @aws-sdk/middleware-user-agent */ "../../node_modules/@aws-sdk/middleware-user-agent/dist-es/index.js");
/* harmony import */ var _smithy_config_resolver__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @smithy/config-resolver */ "../../node_modules/@smithy/config-resolver/dist-es/index.js");
/* harmony import */ var _smithy_eventstream_serde_config_resolver__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @smithy/eventstream-serde-config-resolver */ "../../node_modules/@smithy/eventstream-serde-config-resolver/dist-es/index.js");
/* harmony import */ var _smithy_middleware_content_length__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @smithy/middleware-content-length */ "../../node_modules/@smithy/middleware-content-length/dist-es/index.js");
/* harmony import */ var _smithy_middleware_endpoint__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @smithy/middleware-endpoint */ "../../node_modules/@smithy/middleware-endpoint/dist-es/index.js");
/* harmony import */ var _smithy_middleware_retry__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @smithy/middleware-retry */ "../../node_modules/@smithy/middleware-retry/dist-es/index.js");
/* harmony import */ var _smithy_smithy_client__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @smithy/smithy-client */ "../../node_modules/@smithy/smithy-client/dist-es/index.js");
/* harmony import */ var _endpoint_EndpointParameters__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./endpoint/EndpointParameters */ "../../node_modules/@aws-sdk/client-lex-runtime-v2/dist-es/endpoint/EndpointParameters.js");
/* harmony import */ var _runtimeConfig__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./runtimeConfig */ "../../node_modules/@aws-sdk/client-lex-runtime-v2/dist-es/runtimeConfig.browser.js");
/* harmony import */ var _runtimeExtensions__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./runtimeExtensions */ "../../node_modules/@aws-sdk/client-lex-runtime-v2/dist-es/runtimeExtensions.js");
















class LexRuntimeV2Client extends _smithy_smithy_client__WEBPACK_IMPORTED_MODULE_11__.Client {
    constructor(...[configuration]) {
        const _config_0 = (0,_runtimeConfig__WEBPACK_IMPORTED_MODULE_12__.getRuntimeConfig)(configuration || {});
        const _config_1 = (0,_endpoint_EndpointParameters__WEBPACK_IMPORTED_MODULE_13__.resolveClientEndpointParameters)(_config_0);
        const _config_2 = (0,_smithy_config_resolver__WEBPACK_IMPORTED_MODULE_6__.resolveRegionConfig)(_config_1);
        const _config_3 = (0,_smithy_middleware_endpoint__WEBPACK_IMPORTED_MODULE_9__.resolveEndpointConfig)(_config_2);
        const _config_4 = (0,_aws_sdk_middleware_host_header__WEBPACK_IMPORTED_MODULE_1__.resolveHostHeaderConfig)(_config_3);
        const _config_5 = (0,_aws_sdk_middleware_signing__WEBPACK_IMPORTED_MODULE_4__.resolveAwsAuthConfig)(_config_4);
        const _config_6 = (0,_aws_sdk_middleware_eventstream__WEBPACK_IMPORTED_MODULE_0__.resolveEventStreamConfig)(_config_5);
        const _config_7 = (0,_aws_sdk_middleware_user_agent__WEBPACK_IMPORTED_MODULE_5__.resolveUserAgentConfig)(_config_6);
        const _config_8 = (0,_smithy_middleware_retry__WEBPACK_IMPORTED_MODULE_10__.resolveRetryConfig)(_config_7);
        const _config_9 = (0,_smithy_eventstream_serde_config_resolver__WEBPACK_IMPORTED_MODULE_7__.resolveEventStreamSerdeConfig)(_config_8);
        const _config_10 = (0,_runtimeExtensions__WEBPACK_IMPORTED_MODULE_14__.resolveRuntimeExtensions)(_config_9, configuration?.extensions || []);
        super(_config_10);
        this.config = _config_10;
        this.middlewareStack.use((0,_aws_sdk_middleware_host_header__WEBPACK_IMPORTED_MODULE_1__.getHostHeaderPlugin)(this.config));
        this.middlewareStack.use((0,_aws_sdk_middleware_logger__WEBPACK_IMPORTED_MODULE_2__.getLoggerPlugin)(this.config));
        this.middlewareStack.use((0,_aws_sdk_middleware_recursion_detection__WEBPACK_IMPORTED_MODULE_3__.getRecursionDetectionPlugin)(this.config));
        this.middlewareStack.use((0,_aws_sdk_middleware_signing__WEBPACK_IMPORTED_MODULE_4__.getAwsAuthPlugin)(this.config));
        this.middlewareStack.use((0,_aws_sdk_middleware_user_agent__WEBPACK_IMPORTED_MODULE_5__.getUserAgentPlugin)(this.config));
        this.middlewareStack.use((0,_smithy_middleware_retry__WEBPACK_IMPORTED_MODULE_10__.getRetryPlugin)(this.config));
        this.middlewareStack.use((0,_smithy_middleware_content_length__WEBPACK_IMPORTED_MODULE_8__.getContentLengthPlugin)(this.config));
    }
    destroy() {
        super.destroy();
    }
}


/***/ }),

/***/ "../../node_modules/@aws-sdk/client-lex-runtime-v2/dist-es/commands/RecognizeTextCommand.js":
/*!**************************************************************************************************!*\
  !*** ../../node_modules/@aws-sdk/client-lex-runtime-v2/dist-es/commands/RecognizeTextCommand.js ***!
  \**************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   $Command: () => (/* reexport safe */ _smithy_smithy_client__WEBPACK_IMPORTED_MODULE_2__.Command),
/* harmony export */   RecognizeTextCommand: () => (/* binding */ RecognizeTextCommand)
/* harmony export */ });
/* harmony import */ var _smithy_middleware_endpoint__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @smithy/middleware-endpoint */ "../../node_modules/@smithy/middleware-endpoint/dist-es/index.js");
/* harmony import */ var _smithy_middleware_serde__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @smithy/middleware-serde */ "../../node_modules/@smithy/middleware-serde/dist-es/index.js");
/* harmony import */ var _smithy_smithy_client__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @smithy/smithy-client */ "../../node_modules/@smithy/smithy-client/dist-es/index.js");
/* harmony import */ var _endpoint_EndpointParameters__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../endpoint/EndpointParameters */ "../../node_modules/@aws-sdk/client-lex-runtime-v2/dist-es/endpoint/EndpointParameters.js");
/* harmony import */ var _models_models_0__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../models/models_0 */ "../../node_modules/@aws-sdk/client-lex-runtime-v2/dist-es/models/models_0.js");
/* harmony import */ var _protocols_Aws_restJson1__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../protocols/Aws_restJson1 */ "../../node_modules/@aws-sdk/client-lex-runtime-v2/dist-es/protocols/Aws_restJson1.js");







class RecognizeTextCommand extends _smithy_smithy_client__WEBPACK_IMPORTED_MODULE_2__.Command
    .classBuilder()
    .ep({
    ..._endpoint_EndpointParameters__WEBPACK_IMPORTED_MODULE_3__.commonParams,
})
    .m(function (Command, cs, config, o) {
    return [
        (0,_smithy_middleware_serde__WEBPACK_IMPORTED_MODULE_1__.getSerdePlugin)(config, this.serialize, this.deserialize),
        (0,_smithy_middleware_endpoint__WEBPACK_IMPORTED_MODULE_0__.getEndpointPlugin)(config, Command.getEndpointParameterInstructions()),
    ];
})
    .s("AWSDeepSenseRunTimeServiceApi2_0", "RecognizeText", {})
    .n("LexRuntimeV2Client", "RecognizeTextCommand")
    .f(_models_models_0__WEBPACK_IMPORTED_MODULE_4__.RecognizeTextRequestFilterSensitiveLog, _models_models_0__WEBPACK_IMPORTED_MODULE_4__.RecognizeTextResponseFilterSensitiveLog)
    .ser(_protocols_Aws_restJson1__WEBPACK_IMPORTED_MODULE_5__.se_RecognizeTextCommand)
    .de(_protocols_Aws_restJson1__WEBPACK_IMPORTED_MODULE_5__.de_RecognizeTextCommand)
    .build() {
}


/***/ }),

/***/ "../../node_modules/@aws-sdk/client-lex-runtime-v2/dist-es/commands/RecognizeUtteranceCommand.js":
/*!*******************************************************************************************************!*\
  !*** ../../node_modules/@aws-sdk/client-lex-runtime-v2/dist-es/commands/RecognizeUtteranceCommand.js ***!
  \*******************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   $Command: () => (/* reexport safe */ _smithy_smithy_client__WEBPACK_IMPORTED_MODULE_2__.Command),
/* harmony export */   RecognizeUtteranceCommand: () => (/* binding */ RecognizeUtteranceCommand)
/* harmony export */ });
/* harmony import */ var _smithy_middleware_endpoint__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @smithy/middleware-endpoint */ "../../node_modules/@smithy/middleware-endpoint/dist-es/index.js");
/* harmony import */ var _smithy_middleware_serde__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @smithy/middleware-serde */ "../../node_modules/@smithy/middleware-serde/dist-es/index.js");
/* harmony import */ var _smithy_smithy_client__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @smithy/smithy-client */ "../../node_modules/@smithy/smithy-client/dist-es/index.js");
/* harmony import */ var _endpoint_EndpointParameters__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../endpoint/EndpointParameters */ "../../node_modules/@aws-sdk/client-lex-runtime-v2/dist-es/endpoint/EndpointParameters.js");
/* harmony import */ var _models_models_0__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../models/models_0 */ "../../node_modules/@aws-sdk/client-lex-runtime-v2/dist-es/models/models_0.js");
/* harmony import */ var _protocols_Aws_restJson1__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../protocols/Aws_restJson1 */ "../../node_modules/@aws-sdk/client-lex-runtime-v2/dist-es/protocols/Aws_restJson1.js");







class RecognizeUtteranceCommand extends _smithy_smithy_client__WEBPACK_IMPORTED_MODULE_2__.Command
    .classBuilder()
    .ep({
    ..._endpoint_EndpointParameters__WEBPACK_IMPORTED_MODULE_3__.commonParams,
})
    .m(function (Command, cs, config, o) {
    return [
        (0,_smithy_middleware_serde__WEBPACK_IMPORTED_MODULE_1__.getSerdePlugin)(config, this.serialize, this.deserialize),
        (0,_smithy_middleware_endpoint__WEBPACK_IMPORTED_MODULE_0__.getEndpointPlugin)(config, Command.getEndpointParameterInstructions()),
    ];
})
    .s("AWSDeepSenseRunTimeServiceApi2_0", "RecognizeUtterance", {})
    .n("LexRuntimeV2Client", "RecognizeUtteranceCommand")
    .f(_models_models_0__WEBPACK_IMPORTED_MODULE_4__.RecognizeUtteranceRequestFilterSensitiveLog, _models_models_0__WEBPACK_IMPORTED_MODULE_4__.RecognizeUtteranceResponseFilterSensitiveLog)
    .ser(_protocols_Aws_restJson1__WEBPACK_IMPORTED_MODULE_5__.se_RecognizeUtteranceCommand)
    .de(_protocols_Aws_restJson1__WEBPACK_IMPORTED_MODULE_5__.de_RecognizeUtteranceCommand)
    .build() {
}


/***/ }),

/***/ "../../node_modules/@aws-sdk/client-lex-runtime-v2/dist-es/endpoint/EndpointParameters.js":
/*!************************************************************************************************!*\
  !*** ../../node_modules/@aws-sdk/client-lex-runtime-v2/dist-es/endpoint/EndpointParameters.js ***!
  \************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   commonParams: () => (/* binding */ commonParams),
/* harmony export */   resolveClientEndpointParameters: () => (/* binding */ resolveClientEndpointParameters)
/* harmony export */ });
const resolveClientEndpointParameters = (options) => {
    return {
        ...options,
        useDualstackEndpoint: options.useDualstackEndpoint ?? false,
        useFipsEndpoint: options.useFipsEndpoint ?? false,
        defaultSigningName: "lex",
    };
};
const commonParams = {
    UseFIPS: { type: "builtInParams", name: "useFipsEndpoint" },
    Endpoint: { type: "builtInParams", name: "endpoint" },
    Region: { type: "builtInParams", name: "region" },
    UseDualStack: { type: "builtInParams", name: "useDualstackEndpoint" },
};


/***/ }),

/***/ "../../node_modules/@aws-sdk/client-lex-runtime-v2/dist-es/endpoint/endpointResolver.js":
/*!**********************************************************************************************!*\
  !*** ../../node_modules/@aws-sdk/client-lex-runtime-v2/dist-es/endpoint/endpointResolver.js ***!
  \**********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   defaultEndpointResolver: () => (/* binding */ defaultEndpointResolver)
/* harmony export */ });
/* harmony import */ var _aws_sdk_util_endpoints__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @aws-sdk/util-endpoints */ "../../node_modules/@aws-sdk/util-endpoints/dist-es/index.js");
/* harmony import */ var _smithy_util_endpoints__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @smithy/util-endpoints */ "../../node_modules/@smithy/util-endpoints/dist-es/index.js");
/* harmony import */ var _ruleset__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ruleset */ "../../node_modules/@aws-sdk/client-lex-runtime-v2/dist-es/endpoint/ruleset.js");



const defaultEndpointResolver = (endpointParams, context = {}) => {
    return (0,_smithy_util_endpoints__WEBPACK_IMPORTED_MODULE_1__.resolveEndpoint)(_ruleset__WEBPACK_IMPORTED_MODULE_2__.ruleSet, {
        endpointParams: endpointParams,
        logger: context.logger,
    });
};
_smithy_util_endpoints__WEBPACK_IMPORTED_MODULE_1__.customEndpointFunctions.aws = _aws_sdk_util_endpoints__WEBPACK_IMPORTED_MODULE_0__.awsEndpointFunctions;


/***/ }),

/***/ "../../node_modules/@aws-sdk/client-lex-runtime-v2/dist-es/endpoint/ruleset.js":
/*!*************************************************************************************!*\
  !*** ../../node_modules/@aws-sdk/client-lex-runtime-v2/dist-es/endpoint/ruleset.js ***!
  \*************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ruleSet: () => (/* binding */ ruleSet)
/* harmony export */ });
const s = "required", t = "fn", u = "argv", v = "ref";
const a = true, b = "isSet", c = "booleanEquals", d = "error", e = "endpoint", f = "tree", g = "PartitionResult", h = { [s]: false, "type": "String" }, i = { [s]: true, "default": false, "type": "Boolean" }, j = { [v]: "Endpoint" }, k = { [t]: c, [u]: [{ [v]: "UseFIPS" }, true] }, l = { [t]: c, [u]: [{ [v]: "UseDualStack" }, true] }, m = {}, n = { [t]: "getAttr", [u]: [{ [v]: g }, "supportsFIPS"] }, o = { [t]: c, [u]: [true, { [t]: "getAttr", [u]: [{ [v]: g }, "supportsDualStack"] }] }, p = [k], q = [l], r = [{ [v]: "Region" }];
const _data = { version: "1.0", parameters: { Region: h, UseDualStack: i, UseFIPS: i, Endpoint: h }, rules: [{ conditions: [{ [t]: b, [u]: [j] }], rules: [{ conditions: p, error: "Invalid Configuration: FIPS and custom endpoint are not supported", type: d }, { conditions: q, error: "Invalid Configuration: Dualstack and custom endpoint are not supported", type: d }, { endpoint: { url: j, properties: m, headers: m }, type: e }], type: f }, { conditions: [{ [t]: b, [u]: r }], rules: [{ conditions: [{ [t]: "aws.partition", [u]: r, assign: g }], rules: [{ conditions: [k, l], rules: [{ conditions: [{ [t]: c, [u]: [a, n] }, o], rules: [{ endpoint: { url: "https://runtime-v2-lex-fips.{Region}.{PartitionResult#dualStackDnsSuffix}", properties: m, headers: m }, type: e }], type: f }, { error: "FIPS and DualStack are enabled, but this partition does not support one or both", type: d }], type: f }, { conditions: p, rules: [{ conditions: [{ [t]: c, [u]: [n, a] }], rules: [{ endpoint: { url: "https://runtime-v2-lex-fips.{Region}.{PartitionResult#dnsSuffix}", properties: m, headers: m }, type: e }], type: f }, { error: "FIPS is enabled but this partition does not support FIPS", type: d }], type: f }, { conditions: q, rules: [{ conditions: [o], rules: [{ endpoint: { url: "https://runtime-v2-lex.{Region}.{PartitionResult#dualStackDnsSuffix}", properties: m, headers: m }, type: e }], type: f }, { error: "DualStack is enabled but this partition does not support DualStack", type: d }], type: f }, { endpoint: { url: "https://runtime-v2-lex.{Region}.{PartitionResult#dnsSuffix}", properties: m, headers: m }, type: e }], type: f }], type: f }, { error: "Invalid Configuration: Missing Region", type: d }] };
const ruleSet = _data;


/***/ }),

/***/ "../../node_modules/@aws-sdk/client-lex-runtime-v2/dist-es/models/LexRuntimeV2ServiceException.js":
/*!********************************************************************************************************!*\
  !*** ../../node_modules/@aws-sdk/client-lex-runtime-v2/dist-es/models/LexRuntimeV2ServiceException.js ***!
  \********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   LexRuntimeV2ServiceException: () => (/* binding */ LexRuntimeV2ServiceException),
/* harmony export */   __ServiceException: () => (/* reexport safe */ _smithy_smithy_client__WEBPACK_IMPORTED_MODULE_0__.ServiceException)
/* harmony export */ });
/* harmony import */ var _smithy_smithy_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @smithy/smithy-client */ "../../node_modules/@smithy/smithy-client/dist-es/index.js");


class LexRuntimeV2ServiceException extends _smithy_smithy_client__WEBPACK_IMPORTED_MODULE_0__.ServiceException {
    constructor(options) {
        super(options);
        Object.setPrototypeOf(this, LexRuntimeV2ServiceException.prototype);
    }
}


/***/ }),

/***/ "../../node_modules/@aws-sdk/client-lex-runtime-v2/dist-es/models/models_0.js":
/*!************************************************************************************!*\
  !*** ../../node_modules/@aws-sdk/client-lex-runtime-v2/dist-es/models/models_0.js ***!
  \************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AccessDeniedException: () => (/* binding */ AccessDeniedException),
/* harmony export */   ActiveContextFilterSensitiveLog: () => (/* binding */ ActiveContextFilterSensitiveLog),
/* harmony export */   BadGatewayException: () => (/* binding */ BadGatewayException),
/* harmony export */   ConfigurationEventFilterSensitiveLog: () => (/* binding */ ConfigurationEventFilterSensitiveLog),
/* harmony export */   ConfirmationState: () => (/* binding */ ConfirmationState),
/* harmony export */   ConflictException: () => (/* binding */ ConflictException),
/* harmony export */   ConversationMode: () => (/* binding */ ConversationMode),
/* harmony export */   DTMFInputEventFilterSensitiveLog: () => (/* binding */ DTMFInputEventFilterSensitiveLog),
/* harmony export */   DependencyFailedException: () => (/* binding */ DependencyFailedException),
/* harmony export */   DialogActionType: () => (/* binding */ DialogActionType),
/* harmony export */   GetSessionResponseFilterSensitiveLog: () => (/* binding */ GetSessionResponseFilterSensitiveLog),
/* harmony export */   InputMode: () => (/* binding */ InputMode),
/* harmony export */   IntentResultEventFilterSensitiveLog: () => (/* binding */ IntentResultEventFilterSensitiveLog),
/* harmony export */   IntentState: () => (/* binding */ IntentState),
/* harmony export */   InternalServerException: () => (/* binding */ InternalServerException),
/* harmony export */   InterpretationSource: () => (/* binding */ InterpretationSource),
/* harmony export */   MessageContentType: () => (/* binding */ MessageContentType),
/* harmony export */   MessageFilterSensitiveLog: () => (/* binding */ MessageFilterSensitiveLog),
/* harmony export */   PlaybackInterruptionReason: () => (/* binding */ PlaybackInterruptionReason),
/* harmony export */   PutSessionRequestFilterSensitiveLog: () => (/* binding */ PutSessionRequestFilterSensitiveLog),
/* harmony export */   PutSessionResponseFilterSensitiveLog: () => (/* binding */ PutSessionResponseFilterSensitiveLog),
/* harmony export */   RecognizeTextRequestFilterSensitiveLog: () => (/* binding */ RecognizeTextRequestFilterSensitiveLog),
/* harmony export */   RecognizeTextResponseFilterSensitiveLog: () => (/* binding */ RecognizeTextResponseFilterSensitiveLog),
/* harmony export */   RecognizeUtteranceRequestFilterSensitiveLog: () => (/* binding */ RecognizeUtteranceRequestFilterSensitiveLog),
/* harmony export */   RecognizeUtteranceResponseFilterSensitiveLog: () => (/* binding */ RecognizeUtteranceResponseFilterSensitiveLog),
/* harmony export */   ResourceNotFoundException: () => (/* binding */ ResourceNotFoundException),
/* harmony export */   SentimentType: () => (/* binding */ SentimentType),
/* harmony export */   SessionStateFilterSensitiveLog: () => (/* binding */ SessionStateFilterSensitiveLog),
/* harmony export */   Shape: () => (/* binding */ Shape),
/* harmony export */   StartConversationRequestEventStream: () => (/* binding */ StartConversationRequestEventStream),
/* harmony export */   StartConversationRequestEventStreamFilterSensitiveLog: () => (/* binding */ StartConversationRequestEventStreamFilterSensitiveLog),
/* harmony export */   StartConversationRequestFilterSensitiveLog: () => (/* binding */ StartConversationRequestFilterSensitiveLog),
/* harmony export */   StartConversationResponseEventStream: () => (/* binding */ StartConversationResponseEventStream),
/* harmony export */   StartConversationResponseEventStreamFilterSensitiveLog: () => (/* binding */ StartConversationResponseEventStreamFilterSensitiveLog),
/* harmony export */   StartConversationResponseFilterSensitiveLog: () => (/* binding */ StartConversationResponseFilterSensitiveLog),
/* harmony export */   StyleType: () => (/* binding */ StyleType),
/* harmony export */   TextInputEventFilterSensitiveLog: () => (/* binding */ TextInputEventFilterSensitiveLog),
/* harmony export */   TextResponseEventFilterSensitiveLog: () => (/* binding */ TextResponseEventFilterSensitiveLog),
/* harmony export */   ThrottlingException: () => (/* binding */ ThrottlingException),
/* harmony export */   ValidationException: () => (/* binding */ ValidationException)
/* harmony export */ });
/* harmony import */ var _smithy_smithy_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @smithy/smithy-client */ "../../node_modules/@smithy/smithy-client/dist-es/index.js");
/* harmony import */ var _LexRuntimeV2ServiceException__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./LexRuntimeV2ServiceException */ "../../node_modules/@aws-sdk/client-lex-runtime-v2/dist-es/models/LexRuntimeV2ServiceException.js");


class AccessDeniedException extends _LexRuntimeV2ServiceException__WEBPACK_IMPORTED_MODULE_1__.LexRuntimeV2ServiceException {
    constructor(opts) {
        super({
            name: "AccessDeniedException",
            $fault: "client",
            ...opts,
        });
        this.name = "AccessDeniedException";
        this.$fault = "client";
        Object.setPrototypeOf(this, AccessDeniedException.prototype);
    }
}
class ConflictException extends _LexRuntimeV2ServiceException__WEBPACK_IMPORTED_MODULE_1__.LexRuntimeV2ServiceException {
    constructor(opts) {
        super({
            name: "ConflictException",
            $fault: "client",
            ...opts,
        });
        this.name = "ConflictException";
        this.$fault = "client";
        Object.setPrototypeOf(this, ConflictException.prototype);
    }
}
class InternalServerException extends _LexRuntimeV2ServiceException__WEBPACK_IMPORTED_MODULE_1__.LexRuntimeV2ServiceException {
    constructor(opts) {
        super({
            name: "InternalServerException",
            $fault: "server",
            ...opts,
        });
        this.name = "InternalServerException";
        this.$fault = "server";
        Object.setPrototypeOf(this, InternalServerException.prototype);
    }
}
class ResourceNotFoundException extends _LexRuntimeV2ServiceException__WEBPACK_IMPORTED_MODULE_1__.LexRuntimeV2ServiceException {
    constructor(opts) {
        super({
            name: "ResourceNotFoundException",
            $fault: "client",
            ...opts,
        });
        this.name = "ResourceNotFoundException";
        this.$fault = "client";
        Object.setPrototypeOf(this, ResourceNotFoundException.prototype);
    }
}
class ThrottlingException extends _LexRuntimeV2ServiceException__WEBPACK_IMPORTED_MODULE_1__.LexRuntimeV2ServiceException {
    constructor(opts) {
        super({
            name: "ThrottlingException",
            $fault: "client",
            ...opts,
        });
        this.name = "ThrottlingException";
        this.$fault = "client";
        Object.setPrototypeOf(this, ThrottlingException.prototype);
    }
}
class ValidationException extends _LexRuntimeV2ServiceException__WEBPACK_IMPORTED_MODULE_1__.LexRuntimeV2ServiceException {
    constructor(opts) {
        super({
            name: "ValidationException",
            $fault: "client",
            ...opts,
        });
        this.name = "ValidationException";
        this.$fault = "client";
        Object.setPrototypeOf(this, ValidationException.prototype);
    }
}
const ConfirmationState = {
    CONFIRMED: "Confirmed",
    DENIED: "Denied",
    NONE: "None",
};
const Shape = {
    COMPOSITE: "Composite",
    LIST: "List",
    SCALAR: "Scalar",
};
const IntentState = {
    FAILED: "Failed",
    FULFILLED: "Fulfilled",
    FULFILLMENT_IN_PROGRESS: "FulfillmentInProgress",
    IN_PROGRESS: "InProgress",
    READY_FOR_FULFILLMENT: "ReadyForFulfillment",
    WAITING: "Waiting",
};
const InterpretationSource = {
    BEDROCK: "Bedrock",
    LEX: "Lex",
};
const SentimentType = {
    MIXED: "MIXED",
    NEGATIVE: "NEGATIVE",
    NEUTRAL: "NEUTRAL",
    POSITIVE: "POSITIVE",
};
const MessageContentType = {
    CUSTOM_PAYLOAD: "CustomPayload",
    IMAGE_RESPONSE_CARD: "ImageResponseCard",
    PLAIN_TEXT: "PlainText",
    SSML: "SSML",
};
const StyleType = {
    DEFAULT: "Default",
    SPELL_BY_LETTER: "SpellByLetter",
    SPELL_BY_WORD: "SpellByWord",
};
const DialogActionType = {
    CLOSE: "Close",
    CONFIRM_INTENT: "ConfirmIntent",
    DELEGATE: "Delegate",
    ELICIT_INTENT: "ElicitIntent",
    ELICIT_SLOT: "ElicitSlot",
    NONE: "None",
};
class BadGatewayException extends _LexRuntimeV2ServiceException__WEBPACK_IMPORTED_MODULE_1__.LexRuntimeV2ServiceException {
    constructor(opts) {
        super({
            name: "BadGatewayException",
            $fault: "server",
            ...opts,
        });
        this.name = "BadGatewayException";
        this.$fault = "server";
        Object.setPrototypeOf(this, BadGatewayException.prototype);
    }
}
class DependencyFailedException extends _LexRuntimeV2ServiceException__WEBPACK_IMPORTED_MODULE_1__.LexRuntimeV2ServiceException {
    constructor(opts) {
        super({
            name: "DependencyFailedException",
            $fault: "client",
            ...opts,
        });
        this.name = "DependencyFailedException";
        this.$fault = "client";
        Object.setPrototypeOf(this, DependencyFailedException.prototype);
    }
}
const ConversationMode = {
    AUDIO: "AUDIO",
    TEXT: "TEXT",
};
const InputMode = {
    DTMF: "DTMF",
    SPEECH: "Speech",
    TEXT: "Text",
};
const PlaybackInterruptionReason = {
    DTMF_START_DETECTED: "DTMF_START_DETECTED",
    TEXT_DETECTED: "TEXT_DETECTED",
    VOICE_START_DETECTED: "VOICE_START_DETECTED",
};
var StartConversationRequestEventStream;
(function (StartConversationRequestEventStream) {
    StartConversationRequestEventStream.visit = (value, visitor) => {
        if (value.ConfigurationEvent !== undefined)
            return visitor.ConfigurationEvent(value.ConfigurationEvent);
        if (value.AudioInputEvent !== undefined)
            return visitor.AudioInputEvent(value.AudioInputEvent);
        if (value.DTMFInputEvent !== undefined)
            return visitor.DTMFInputEvent(value.DTMFInputEvent);
        if (value.TextInputEvent !== undefined)
            return visitor.TextInputEvent(value.TextInputEvent);
        if (value.PlaybackCompletionEvent !== undefined)
            return visitor.PlaybackCompletionEvent(value.PlaybackCompletionEvent);
        if (value.DisconnectionEvent !== undefined)
            return visitor.DisconnectionEvent(value.DisconnectionEvent);
        return visitor._(value.$unknown[0], value.$unknown[1]);
    };
})(StartConversationRequestEventStream || (StartConversationRequestEventStream = {}));
var StartConversationResponseEventStream;
(function (StartConversationResponseEventStream) {
    StartConversationResponseEventStream.visit = (value, visitor) => {
        if (value.PlaybackInterruptionEvent !== undefined)
            return visitor.PlaybackInterruptionEvent(value.PlaybackInterruptionEvent);
        if (value.TranscriptEvent !== undefined)
            return visitor.TranscriptEvent(value.TranscriptEvent);
        if (value.IntentResultEvent !== undefined)
            return visitor.IntentResultEvent(value.IntentResultEvent);
        if (value.TextResponseEvent !== undefined)
            return visitor.TextResponseEvent(value.TextResponseEvent);
        if (value.AudioResponseEvent !== undefined)
            return visitor.AudioResponseEvent(value.AudioResponseEvent);
        if (value.HeartbeatEvent !== undefined)
            return visitor.HeartbeatEvent(value.HeartbeatEvent);
        if (value.AccessDeniedException !== undefined)
            return visitor.AccessDeniedException(value.AccessDeniedException);
        if (value.ResourceNotFoundException !== undefined)
            return visitor.ResourceNotFoundException(value.ResourceNotFoundException);
        if (value.ValidationException !== undefined)
            return visitor.ValidationException(value.ValidationException);
        if (value.ThrottlingException !== undefined)
            return visitor.ThrottlingException(value.ThrottlingException);
        if (value.InternalServerException !== undefined)
            return visitor.InternalServerException(value.InternalServerException);
        if (value.ConflictException !== undefined)
            return visitor.ConflictException(value.ConflictException);
        if (value.DependencyFailedException !== undefined)
            return visitor.DependencyFailedException(value.DependencyFailedException);
        if (value.BadGatewayException !== undefined)
            return visitor.BadGatewayException(value.BadGatewayException);
        return visitor._(value.$unknown[0], value.$unknown[1]);
    };
})(StartConversationResponseEventStream || (StartConversationResponseEventStream = {}));
const ActiveContextFilterSensitiveLog = (obj) => ({
    ...obj,
    ...(obj.contextAttributes && { contextAttributes: _smithy_smithy_client__WEBPACK_IMPORTED_MODULE_0__.SENSITIVE_STRING }),
});
const MessageFilterSensitiveLog = (obj) => ({
    ...obj,
    ...(obj.content && { content: _smithy_smithy_client__WEBPACK_IMPORTED_MODULE_0__.SENSITIVE_STRING }),
});
const PutSessionResponseFilterSensitiveLog = (obj) => ({
    ...obj,
});
const RecognizeUtteranceRequestFilterSensitiveLog = (obj) => ({
    ...obj,
    ...(obj.sessionState && { sessionState: _smithy_smithy_client__WEBPACK_IMPORTED_MODULE_0__.SENSITIVE_STRING }),
    ...(obj.requestAttributes && { requestAttributes: _smithy_smithy_client__WEBPACK_IMPORTED_MODULE_0__.SENSITIVE_STRING }),
});
const RecognizeUtteranceResponseFilterSensitiveLog = (obj) => ({
    ...obj,
});
const DTMFInputEventFilterSensitiveLog = (obj) => ({
    ...obj,
    ...(obj.inputCharacter && { inputCharacter: _smithy_smithy_client__WEBPACK_IMPORTED_MODULE_0__.SENSITIVE_STRING }),
});
const TextInputEventFilterSensitiveLog = (obj) => ({
    ...obj,
    ...(obj.text && { text: _smithy_smithy_client__WEBPACK_IMPORTED_MODULE_0__.SENSITIVE_STRING }),
});
const TextResponseEventFilterSensitiveLog = (obj) => ({
    ...obj,
    ...(obj.messages && { messages: obj.messages.map((item) => MessageFilterSensitiveLog(item)) }),
});
const SessionStateFilterSensitiveLog = (obj) => ({
    ...obj,
    ...(obj.activeContexts && {
        activeContexts: obj.activeContexts.map((item) => ActiveContextFilterSensitiveLog(item)),
    }),
});
const ConfigurationEventFilterSensitiveLog = (obj) => ({
    ...obj,
    ...(obj.welcomeMessages && { welcomeMessages: obj.welcomeMessages.map((item) => MessageFilterSensitiveLog(item)) }),
});
const PutSessionRequestFilterSensitiveLog = (obj) => ({
    ...obj,
    ...(obj.messages && { messages: obj.messages.map((item) => MessageFilterSensitiveLog(item)) }),
});
const RecognizeTextRequestFilterSensitiveLog = (obj) => ({
    ...obj,
    ...(obj.text && { text: _smithy_smithy_client__WEBPACK_IMPORTED_MODULE_0__.SENSITIVE_STRING }),
});
const StartConversationRequestEventStreamFilterSensitiveLog = (obj) => {
    if (obj.ConfigurationEvent !== undefined)
        return { ConfigurationEvent: ConfigurationEventFilterSensitiveLog(obj.ConfigurationEvent) };
    if (obj.AudioInputEvent !== undefined)
        return { AudioInputEvent: obj.AudioInputEvent };
    if (obj.DTMFInputEvent !== undefined)
        return { DTMFInputEvent: DTMFInputEventFilterSensitiveLog(obj.DTMFInputEvent) };
    if (obj.TextInputEvent !== undefined)
        return { TextInputEvent: TextInputEventFilterSensitiveLog(obj.TextInputEvent) };
    if (obj.PlaybackCompletionEvent !== undefined)
        return { PlaybackCompletionEvent: obj.PlaybackCompletionEvent };
    if (obj.DisconnectionEvent !== undefined)
        return { DisconnectionEvent: obj.DisconnectionEvent };
    if (obj.$unknown !== undefined)
        return { [obj.$unknown[0]]: "UNKNOWN" };
};
const StartConversationRequestFilterSensitiveLog = (obj) => ({
    ...obj,
    ...(obj.requestEventStream && { requestEventStream: "STREAMING_CONTENT" }),
});
const GetSessionResponseFilterSensitiveLog = (obj) => ({
    ...obj,
    ...(obj.messages && { messages: obj.messages.map((item) => MessageFilterSensitiveLog(item)) }),
});
const IntentResultEventFilterSensitiveLog = (obj) => ({
    ...obj,
});
const RecognizeTextResponseFilterSensitiveLog = (obj) => ({
    ...obj,
    ...(obj.messages && { messages: obj.messages.map((item) => MessageFilterSensitiveLog(item)) }),
});
const StartConversationResponseEventStreamFilterSensitiveLog = (obj) => {
    if (obj.PlaybackInterruptionEvent !== undefined)
        return { PlaybackInterruptionEvent: obj.PlaybackInterruptionEvent };
    if (obj.TranscriptEvent !== undefined)
        return { TranscriptEvent: obj.TranscriptEvent };
    if (obj.IntentResultEvent !== undefined)
        return { IntentResultEvent: IntentResultEventFilterSensitiveLog(obj.IntentResultEvent) };
    if (obj.TextResponseEvent !== undefined)
        return { TextResponseEvent: TextResponseEventFilterSensitiveLog(obj.TextResponseEvent) };
    if (obj.AudioResponseEvent !== undefined)
        return { AudioResponseEvent: obj.AudioResponseEvent };
    if (obj.HeartbeatEvent !== undefined)
        return { HeartbeatEvent: obj.HeartbeatEvent };
    if (obj.AccessDeniedException !== undefined)
        return { AccessDeniedException: obj.AccessDeniedException };
    if (obj.ResourceNotFoundException !== undefined)
        return { ResourceNotFoundException: obj.ResourceNotFoundException };
    if (obj.ValidationException !== undefined)
        return { ValidationException: obj.ValidationException };
    if (obj.ThrottlingException !== undefined)
        return { ThrottlingException: obj.ThrottlingException };
    if (obj.InternalServerException !== undefined)
        return { InternalServerException: obj.InternalServerException };
    if (obj.ConflictException !== undefined)
        return { ConflictException: obj.ConflictException };
    if (obj.DependencyFailedException !== undefined)
        return { DependencyFailedException: obj.DependencyFailedException };
    if (obj.BadGatewayException !== undefined)
        return { BadGatewayException: obj.BadGatewayException };
    if (obj.$unknown !== undefined)
        return { [obj.$unknown[0]]: "UNKNOWN" };
};
const StartConversationResponseFilterSensitiveLog = (obj) => ({
    ...obj,
    ...(obj.responseEventStream && { responseEventStream: "STREAMING_CONTENT" }),
});


/***/ }),

/***/ "../../node_modules/@aws-sdk/client-lex-runtime-v2/dist-es/protocols/Aws_restJson1.js":
/*!********************************************************************************************!*\
  !*** ../../node_modules/@aws-sdk/client-lex-runtime-v2/dist-es/protocols/Aws_restJson1.js ***!
  \********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   de_DeleteSessionCommand: () => (/* binding */ de_DeleteSessionCommand),
/* harmony export */   de_GetSessionCommand: () => (/* binding */ de_GetSessionCommand),
/* harmony export */   de_PutSessionCommand: () => (/* binding */ de_PutSessionCommand),
/* harmony export */   de_RecognizeTextCommand: () => (/* binding */ de_RecognizeTextCommand),
/* harmony export */   de_RecognizeUtteranceCommand: () => (/* binding */ de_RecognizeUtteranceCommand),
/* harmony export */   de_StartConversationCommand: () => (/* binding */ de_StartConversationCommand),
/* harmony export */   se_DeleteSessionCommand: () => (/* binding */ se_DeleteSessionCommand),
/* harmony export */   se_GetSessionCommand: () => (/* binding */ se_GetSessionCommand),
/* harmony export */   se_PutSessionCommand: () => (/* binding */ se_PutSessionCommand),
/* harmony export */   se_RecognizeTextCommand: () => (/* binding */ se_RecognizeTextCommand),
/* harmony export */   se_RecognizeUtteranceCommand: () => (/* binding */ se_RecognizeUtteranceCommand),
/* harmony export */   se_StartConversationCommand: () => (/* binding */ se_StartConversationCommand)
/* harmony export */ });
/* harmony import */ var _aws_sdk_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @aws-sdk/core */ "../../node_modules/@aws-sdk/core/dist-es/submodules/protocols/json/parseJsonBody.js");
/* harmony import */ var _smithy_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @smithy/core */ "../../node_modules/@smithy/core/dist-es/index.js");
/* harmony import */ var _smithy_smithy_client__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @smithy/smithy-client */ "../../node_modules/@smithy/smithy-client/dist-es/index.js");
/* harmony import */ var _models_LexRuntimeV2ServiceException__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../models/LexRuntimeV2ServiceException */ "../../node_modules/@aws-sdk/client-lex-runtime-v2/dist-es/models/LexRuntimeV2ServiceException.js");
/* harmony import */ var _models_models_0__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../models/models_0 */ "../../node_modules/@aws-sdk/client-lex-runtime-v2/dist-es/models/models_0.js");





const se_DeleteSessionCommand = async (input, context) => {
    const b = (0,_smithy_core__WEBPACK_IMPORTED_MODULE_0__.requestBuilder)(input, context);
    const headers = {};
    b.bp("/bots/{botId}/botAliases/{botAliasId}/botLocales/{localeId}/sessions/{sessionId}");
    b.p("botId", () => input.botId, "{botId}", false);
    b.p("botAliasId", () => input.botAliasId, "{botAliasId}", false);
    b.p("localeId", () => input.localeId, "{localeId}", false);
    b.p("sessionId", () => input.sessionId, "{sessionId}", false);
    let body;
    b.m("DELETE").h(headers).b(body);
    return b.build();
};
const se_GetSessionCommand = async (input, context) => {
    const b = (0,_smithy_core__WEBPACK_IMPORTED_MODULE_0__.requestBuilder)(input, context);
    const headers = {};
    b.bp("/bots/{botId}/botAliases/{botAliasId}/botLocales/{localeId}/sessions/{sessionId}");
    b.p("botId", () => input.botId, "{botId}", false);
    b.p("botAliasId", () => input.botAliasId, "{botAliasId}", false);
    b.p("localeId", () => input.localeId, "{localeId}", false);
    b.p("sessionId", () => input.sessionId, "{sessionId}", false);
    let body;
    b.m("GET").h(headers).b(body);
    return b.build();
};
const se_PutSessionCommand = async (input, context) => {
    const b = (0,_smithy_core__WEBPACK_IMPORTED_MODULE_0__.requestBuilder)(input, context);
    const headers = (0,_smithy_smithy_client__WEBPACK_IMPORTED_MODULE_1__.map)({}, isSerializableHeaderValue, {
        "content-type": "application/json",
        [_r]: input[_rCT],
    });
    b.bp("/bots/{botId}/botAliases/{botAliasId}/botLocales/{localeId}/sessions/{sessionId}");
    b.p("botId", () => input.botId, "{botId}", false);
    b.p("botAliasId", () => input.botAliasId, "{botAliasId}", false);
    b.p("localeId", () => input.localeId, "{localeId}", false);
    b.p("sessionId", () => input.sessionId, "{sessionId}", false);
    let body;
    body = JSON.stringify((0,_smithy_smithy_client__WEBPACK_IMPORTED_MODULE_1__.take)(input, {
        messages: (_) => (0,_smithy_smithy_client__WEBPACK_IMPORTED_MODULE_1__._json)(_),
        requestAttributes: (_) => (0,_smithy_smithy_client__WEBPACK_IMPORTED_MODULE_1__._json)(_),
        sessionState: (_) => se_SessionState(_, context),
    }));
    b.m("POST").h(headers).b(body);
    return b.build();
};
const se_RecognizeTextCommand = async (input, context) => {
    const b = (0,_smithy_core__WEBPACK_IMPORTED_MODULE_0__.requestBuilder)(input, context);
    const headers = {
        "content-type": "application/json",
    };
    b.bp("/bots/{botId}/botAliases/{botAliasId}/botLocales/{localeId}/sessions/{sessionId}/text");
    b.p("botId", () => input.botId, "{botId}", false);
    b.p("botAliasId", () => input.botAliasId, "{botAliasId}", false);
    b.p("localeId", () => input.localeId, "{localeId}", false);
    b.p("sessionId", () => input.sessionId, "{sessionId}", false);
    let body;
    body = JSON.stringify((0,_smithy_smithy_client__WEBPACK_IMPORTED_MODULE_1__.take)(input, {
        requestAttributes: (_) => (0,_smithy_smithy_client__WEBPACK_IMPORTED_MODULE_1__._json)(_),
        sessionState: (_) => se_SessionState(_, context),
        text: [],
    }));
    b.m("POST").h(headers).b(body);
    return b.build();
};
const se_RecognizeUtteranceCommand = async (input, context) => {
    const b = (0,_smithy_core__WEBPACK_IMPORTED_MODULE_0__.requestBuilder)(input, context);
    const headers = (0,_smithy_smithy_client__WEBPACK_IMPORTED_MODULE_1__.map)({}, isSerializableHeaderValue, {
        "x-amz-content-sha256": "UNSIGNED-PAYLOAD",
        [_ct]: input[_rCTe] || "application/octet-stream",
        [_xalss]: input[_sS],
        [_xalra]: input[_rA],
        [_rct]: input[_rCT],
    });
    b.bp("/bots/{botId}/botAliases/{botAliasId}/botLocales/{localeId}/sessions/{sessionId}/utterance");
    b.p("botId", () => input.botId, "{botId}", false);
    b.p("botAliasId", () => input.botAliasId, "{botAliasId}", false);
    b.p("localeId", () => input.localeId, "{localeId}", false);
    b.p("sessionId", () => input.sessionId, "{sessionId}", false);
    let body;
    if (input.inputStream !== undefined) {
        body = input.inputStream;
    }
    b.m("POST").h(headers).b(body);
    return b.build();
};
const se_StartConversationCommand = async (input, context) => {
    const b = (0,_smithy_core__WEBPACK_IMPORTED_MODULE_0__.requestBuilder)(input, context);
    const headers = (0,_smithy_smithy_client__WEBPACK_IMPORTED_MODULE_1__.map)({}, isSerializableHeaderValue, {
        "content-type": "application/json",
        [_xalcm]: input[_cM],
    });
    b.bp("/bots/{botId}/botAliases/{botAliasId}/botLocales/{localeId}/sessions/{sessionId}/conversation");
    b.p("botId", () => input.botId, "{botId}", false);
    b.p("botAliasId", () => input.botAliasId, "{botAliasId}", false);
    b.p("localeId", () => input.localeId, "{localeId}", false);
    b.p("sessionId", () => input.sessionId, "{sessionId}", false);
    let body;
    if (input.requestEventStream !== undefined) {
        body = se_StartConversationRequestEventStream(input.requestEventStream, context);
    }
    b.m("POST").h(headers).b(body);
    return b.build();
};
const de_DeleteSessionCommand = async (output, context) => {
    if (output.statusCode !== 200 && output.statusCode >= 300) {
        return de_CommandError(output, context);
    }
    const contents = (0,_smithy_smithy_client__WEBPACK_IMPORTED_MODULE_1__.map)({
        $metadata: deserializeMetadata(output),
    });
    const data = (0,_smithy_smithy_client__WEBPACK_IMPORTED_MODULE_1__.expectNonNull)((0,_smithy_smithy_client__WEBPACK_IMPORTED_MODULE_1__.expectObject)(await (0,_aws_sdk_core__WEBPACK_IMPORTED_MODULE_2__.parseJsonBody)(output.body, context)), "body");
    const doc = (0,_smithy_smithy_client__WEBPACK_IMPORTED_MODULE_1__.take)(data, {
        botAliasId: _smithy_smithy_client__WEBPACK_IMPORTED_MODULE_1__.expectString,
        botId: _smithy_smithy_client__WEBPACK_IMPORTED_MODULE_1__.expectString,
        localeId: _smithy_smithy_client__WEBPACK_IMPORTED_MODULE_1__.expectString,
        sessionId: _smithy_smithy_client__WEBPACK_IMPORTED_MODULE_1__.expectString,
    });
    Object.assign(contents, doc);
    return contents;
};
const de_GetSessionCommand = async (output, context) => {
    if (output.statusCode !== 200 && output.statusCode >= 300) {
        return de_CommandError(output, context);
    }
    const contents = (0,_smithy_smithy_client__WEBPACK_IMPORTED_MODULE_1__.map)({
        $metadata: deserializeMetadata(output),
    });
    const data = (0,_smithy_smithy_client__WEBPACK_IMPORTED_MODULE_1__.expectNonNull)((0,_smithy_smithy_client__WEBPACK_IMPORTED_MODULE_1__.expectObject)(await (0,_aws_sdk_core__WEBPACK_IMPORTED_MODULE_2__.parseJsonBody)(output.body, context)), "body");
    const doc = (0,_smithy_smithy_client__WEBPACK_IMPORTED_MODULE_1__.take)(data, {
        interpretations: (_) => de_Interpretations(_, context),
        messages: _smithy_smithy_client__WEBPACK_IMPORTED_MODULE_1__._json,
        sessionId: _smithy_smithy_client__WEBPACK_IMPORTED_MODULE_1__.expectString,
        sessionState: (_) => de_SessionState(_, context),
    });
    Object.assign(contents, doc);
    return contents;
};
const de_PutSessionCommand = async (output, context) => {
    if (output.statusCode !== 200 && output.statusCode >= 300) {
        return de_CommandError(output, context);
    }
    const contents = (0,_smithy_smithy_client__WEBPACK_IMPORTED_MODULE_1__.map)({
        $metadata: deserializeMetadata(output),
        [_cT]: [, output.headers[_ct]],
        [_m]: [, output.headers[_xalm]],
        [_sS]: [, output.headers[_xalss]],
        [_rA]: [, output.headers[_xalra]],
        [_sI]: [, output.headers[_xalsi]],
    });
    const data = output.body;
    context.sdkStreamMixin(data);
    contents.audioStream = data;
    return contents;
};
const de_RecognizeTextCommand = async (output, context) => {
    if (output.statusCode !== 200 && output.statusCode >= 300) {
        return de_CommandError(output, context);
    }
    const contents = (0,_smithy_smithy_client__WEBPACK_IMPORTED_MODULE_1__.map)({
        $metadata: deserializeMetadata(output),
    });
    const data = (0,_smithy_smithy_client__WEBPACK_IMPORTED_MODULE_1__.expectNonNull)((0,_smithy_smithy_client__WEBPACK_IMPORTED_MODULE_1__.expectObject)(await (0,_aws_sdk_core__WEBPACK_IMPORTED_MODULE_2__.parseJsonBody)(output.body, context)), "body");
    const doc = (0,_smithy_smithy_client__WEBPACK_IMPORTED_MODULE_1__.take)(data, {
        interpretations: (_) => de_Interpretations(_, context),
        messages: _smithy_smithy_client__WEBPACK_IMPORTED_MODULE_1__._json,
        recognizedBotMember: _smithy_smithy_client__WEBPACK_IMPORTED_MODULE_1__._json,
        requestAttributes: _smithy_smithy_client__WEBPACK_IMPORTED_MODULE_1__._json,
        sessionId: _smithy_smithy_client__WEBPACK_IMPORTED_MODULE_1__.expectString,
        sessionState: (_) => de_SessionState(_, context),
    });
    Object.assign(contents, doc);
    return contents;
};
const de_RecognizeUtteranceCommand = async (output, context) => {
    if (output.statusCode !== 200 && output.statusCode >= 300) {
        return de_CommandError(output, context);
    }
    const contents = (0,_smithy_smithy_client__WEBPACK_IMPORTED_MODULE_1__.map)({
        $metadata: deserializeMetadata(output),
        [_iM]: [, output.headers[_xalim]],
        [_cT]: [, output.headers[_ct]],
        [_m]: [, output.headers[_xalm]],
        [_i]: [, output.headers[_xali]],
        [_sS]: [, output.headers[_xalss]],
        [_rA]: [, output.headers[_xalra]],
        [_sI]: [, output.headers[_xalsi]],
        [_iT]: [, output.headers[_xalit]],
        [_rBM]: [, output.headers[_xalrbm]],
    });
    const data = output.body;
    context.sdkStreamMixin(data);
    contents.audioStream = data;
    return contents;
};
const de_StartConversationCommand = async (output, context) => {
    if (output.statusCode !== 200 && output.statusCode >= 300) {
        return de_CommandError(output, context);
    }
    const contents = (0,_smithy_smithy_client__WEBPACK_IMPORTED_MODULE_1__.map)({
        $metadata: deserializeMetadata(output),
    });
    const data = output.body;
    contents.responseEventStream = de_StartConversationResponseEventStream(data, context);
    return contents;
};
const de_CommandError = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await (0,_aws_sdk_core__WEBPACK_IMPORTED_MODULE_2__.parseJsonErrorBody)(output.body, context),
    };
    const errorCode = (0,_aws_sdk_core__WEBPACK_IMPORTED_MODULE_2__.loadRestJsonErrorCode)(output, parsedOutput.body);
    switch (errorCode) {
        case "AccessDeniedException":
        case "com.amazonaws.lexruntimev2#AccessDeniedException":
            throw await de_AccessDeniedExceptionRes(parsedOutput, context);
        case "ConflictException":
        case "com.amazonaws.lexruntimev2#ConflictException":
            throw await de_ConflictExceptionRes(parsedOutput, context);
        case "InternalServerException":
        case "com.amazonaws.lexruntimev2#InternalServerException":
            throw await de_InternalServerExceptionRes(parsedOutput, context);
        case "ResourceNotFoundException":
        case "com.amazonaws.lexruntimev2#ResourceNotFoundException":
            throw await de_ResourceNotFoundExceptionRes(parsedOutput, context);
        case "ThrottlingException":
        case "com.amazonaws.lexruntimev2#ThrottlingException":
            throw await de_ThrottlingExceptionRes(parsedOutput, context);
        case "ValidationException":
        case "com.amazonaws.lexruntimev2#ValidationException":
            throw await de_ValidationExceptionRes(parsedOutput, context);
        case "BadGatewayException":
        case "com.amazonaws.lexruntimev2#BadGatewayException":
            throw await de_BadGatewayExceptionRes(parsedOutput, context);
        case "DependencyFailedException":
        case "com.amazonaws.lexruntimev2#DependencyFailedException":
            throw await de_DependencyFailedExceptionRes(parsedOutput, context);
        default:
            const parsedBody = parsedOutput.body;
            return throwDefaultError({
                output,
                parsedBody,
                errorCode,
            });
    }
};
const throwDefaultError = (0,_smithy_smithy_client__WEBPACK_IMPORTED_MODULE_1__.withBaseException)(_models_LexRuntimeV2ServiceException__WEBPACK_IMPORTED_MODULE_3__.LexRuntimeV2ServiceException);
const de_AccessDeniedExceptionRes = async (parsedOutput, context) => {
    const contents = (0,_smithy_smithy_client__WEBPACK_IMPORTED_MODULE_1__.map)({});
    const data = parsedOutput.body;
    const doc = (0,_smithy_smithy_client__WEBPACK_IMPORTED_MODULE_1__.take)(data, {
        message: _smithy_smithy_client__WEBPACK_IMPORTED_MODULE_1__.expectString,
    });
    Object.assign(contents, doc);
    const exception = new _models_models_0__WEBPACK_IMPORTED_MODULE_4__.AccessDeniedException({
        $metadata: deserializeMetadata(parsedOutput),
        ...contents,
    });
    return (0,_smithy_smithy_client__WEBPACK_IMPORTED_MODULE_1__.decorateServiceException)(exception, parsedOutput.body);
};
const de_BadGatewayExceptionRes = async (parsedOutput, context) => {
    const contents = (0,_smithy_smithy_client__WEBPACK_IMPORTED_MODULE_1__.map)({});
    const data = parsedOutput.body;
    const doc = (0,_smithy_smithy_client__WEBPACK_IMPORTED_MODULE_1__.take)(data, {
        message: _smithy_smithy_client__WEBPACK_IMPORTED_MODULE_1__.expectString,
    });
    Object.assign(contents, doc);
    const exception = new _models_models_0__WEBPACK_IMPORTED_MODULE_4__.BadGatewayException({
        $metadata: deserializeMetadata(parsedOutput),
        ...contents,
    });
    return (0,_smithy_smithy_client__WEBPACK_IMPORTED_MODULE_1__.decorateServiceException)(exception, parsedOutput.body);
};
const de_ConflictExceptionRes = async (parsedOutput, context) => {
    const contents = (0,_smithy_smithy_client__WEBPACK_IMPORTED_MODULE_1__.map)({});
    const data = parsedOutput.body;
    const doc = (0,_smithy_smithy_client__WEBPACK_IMPORTED_MODULE_1__.take)(data, {
        message: _smithy_smithy_client__WEBPACK_IMPORTED_MODULE_1__.expectString,
    });
    Object.assign(contents, doc);
    const exception = new _models_models_0__WEBPACK_IMPORTED_MODULE_4__.ConflictException({
        $metadata: deserializeMetadata(parsedOutput),
        ...contents,
    });
    return (0,_smithy_smithy_client__WEBPACK_IMPORTED_MODULE_1__.decorateServiceException)(exception, parsedOutput.body);
};
const de_DependencyFailedExceptionRes = async (parsedOutput, context) => {
    const contents = (0,_smithy_smithy_client__WEBPACK_IMPORTED_MODULE_1__.map)({});
    const data = parsedOutput.body;
    const doc = (0,_smithy_smithy_client__WEBPACK_IMPORTED_MODULE_1__.take)(data, {
        message: _smithy_smithy_client__WEBPACK_IMPORTED_MODULE_1__.expectString,
    });
    Object.assign(contents, doc);
    const exception = new _models_models_0__WEBPACK_IMPORTED_MODULE_4__.DependencyFailedException({
        $metadata: deserializeMetadata(parsedOutput),
        ...contents,
    });
    return (0,_smithy_smithy_client__WEBPACK_IMPORTED_MODULE_1__.decorateServiceException)(exception, parsedOutput.body);
};
const de_InternalServerExceptionRes = async (parsedOutput, context) => {
    const contents = (0,_smithy_smithy_client__WEBPACK_IMPORTED_MODULE_1__.map)({});
    const data = parsedOutput.body;
    const doc = (0,_smithy_smithy_client__WEBPACK_IMPORTED_MODULE_1__.take)(data, {
        message: _smithy_smithy_client__WEBPACK_IMPORTED_MODULE_1__.expectString,
    });
    Object.assign(contents, doc);
    const exception = new _models_models_0__WEBPACK_IMPORTED_MODULE_4__.InternalServerException({
        $metadata: deserializeMetadata(parsedOutput),
        ...contents,
    });
    return (0,_smithy_smithy_client__WEBPACK_IMPORTED_MODULE_1__.decorateServiceException)(exception, parsedOutput.body);
};
const de_ResourceNotFoundExceptionRes = async (parsedOutput, context) => {
    const contents = (0,_smithy_smithy_client__WEBPACK_IMPORTED_MODULE_1__.map)({});
    const data = parsedOutput.body;
    const doc = (0,_smithy_smithy_client__WEBPACK_IMPORTED_MODULE_1__.take)(data, {
        message: _smithy_smithy_client__WEBPACK_IMPORTED_MODULE_1__.expectString,
    });
    Object.assign(contents, doc);
    const exception = new _models_models_0__WEBPACK_IMPORTED_MODULE_4__.ResourceNotFoundException({
        $metadata: deserializeMetadata(parsedOutput),
        ...contents,
    });
    return (0,_smithy_smithy_client__WEBPACK_IMPORTED_MODULE_1__.decorateServiceException)(exception, parsedOutput.body);
};
const de_ThrottlingExceptionRes = async (parsedOutput, context) => {
    const contents = (0,_smithy_smithy_client__WEBPACK_IMPORTED_MODULE_1__.map)({});
    const data = parsedOutput.body;
    const doc = (0,_smithy_smithy_client__WEBPACK_IMPORTED_MODULE_1__.take)(data, {
        message: _smithy_smithy_client__WEBPACK_IMPORTED_MODULE_1__.expectString,
    });
    Object.assign(contents, doc);
    const exception = new _models_models_0__WEBPACK_IMPORTED_MODULE_4__.ThrottlingException({
        $metadata: deserializeMetadata(parsedOutput),
        ...contents,
    });
    return (0,_smithy_smithy_client__WEBPACK_IMPORTED_MODULE_1__.decorateServiceException)(exception, parsedOutput.body);
};
const de_ValidationExceptionRes = async (parsedOutput, context) => {
    const contents = (0,_smithy_smithy_client__WEBPACK_IMPORTED_MODULE_1__.map)({});
    const data = parsedOutput.body;
    const doc = (0,_smithy_smithy_client__WEBPACK_IMPORTED_MODULE_1__.take)(data, {
        message: _smithy_smithy_client__WEBPACK_IMPORTED_MODULE_1__.expectString,
    });
    Object.assign(contents, doc);
    const exception = new _models_models_0__WEBPACK_IMPORTED_MODULE_4__.ValidationException({
        $metadata: deserializeMetadata(parsedOutput),
        ...contents,
    });
    return (0,_smithy_smithy_client__WEBPACK_IMPORTED_MODULE_1__.decorateServiceException)(exception, parsedOutput.body);
};
const se_StartConversationRequestEventStream = (input, context) => {
    const eventMarshallingVisitor = (event) => _models_models_0__WEBPACK_IMPORTED_MODULE_4__.StartConversationRequestEventStream.visit(event, {
        ConfigurationEvent: (value) => se_ConfigurationEvent_event(value, context),
        AudioInputEvent: (value) => se_AudioInputEvent_event(value, context),
        DTMFInputEvent: (value) => se_DTMFInputEvent_event(value, context),
        TextInputEvent: (value) => se_TextInputEvent_event(value, context),
        PlaybackCompletionEvent: (value) => se_PlaybackCompletionEvent_event(value, context),
        DisconnectionEvent: (value) => se_DisconnectionEvent_event(value, context),
        _: (value) => value,
    });
    return context.eventStreamMarshaller.serialize(input, eventMarshallingVisitor);
};
const se_AudioInputEvent_event = (input, context) => {
    const headers = {
        ":event-type": { type: "string", value: "AudioInputEvent" },
        ":message-type": { type: "string", value: "event" },
        ":content-type": { type: "string", value: "application/json" },
    };
    let body = new Uint8Array();
    body = se_AudioInputEvent(input, context);
    body = context.utf8Decoder(JSON.stringify(body));
    return { headers, body };
};
const se_ConfigurationEvent_event = (input, context) => {
    const headers = {
        ":event-type": { type: "string", value: "ConfigurationEvent" },
        ":message-type": { type: "string", value: "event" },
        ":content-type": { type: "string", value: "application/json" },
    };
    let body = new Uint8Array();
    body = se_ConfigurationEvent(input, context);
    body = context.utf8Decoder(JSON.stringify(body));
    return { headers, body };
};
const se_DisconnectionEvent_event = (input, context) => {
    const headers = {
        ":event-type": { type: "string", value: "DisconnectionEvent" },
        ":message-type": { type: "string", value: "event" },
        ":content-type": { type: "string", value: "application/json" },
    };
    let body = new Uint8Array();
    body = (0,_smithy_smithy_client__WEBPACK_IMPORTED_MODULE_1__._json)(input);
    body = context.utf8Decoder(JSON.stringify(body));
    return { headers, body };
};
const se_DTMFInputEvent_event = (input, context) => {
    const headers = {
        ":event-type": { type: "string", value: "DTMFInputEvent" },
        ":message-type": { type: "string", value: "event" },
        ":content-type": { type: "string", value: "application/json" },
    };
    let body = new Uint8Array();
    body = (0,_smithy_smithy_client__WEBPACK_IMPORTED_MODULE_1__._json)(input);
    body = context.utf8Decoder(JSON.stringify(body));
    return { headers, body };
};
const se_PlaybackCompletionEvent_event = (input, context) => {
    const headers = {
        ":event-type": { type: "string", value: "PlaybackCompletionEvent" },
        ":message-type": { type: "string", value: "event" },
        ":content-type": { type: "string", value: "application/json" },
    };
    let body = new Uint8Array();
    body = (0,_smithy_smithy_client__WEBPACK_IMPORTED_MODULE_1__._json)(input);
    body = context.utf8Decoder(JSON.stringify(body));
    return { headers, body };
};
const se_TextInputEvent_event = (input, context) => {
    const headers = {
        ":event-type": { type: "string", value: "TextInputEvent" },
        ":message-type": { type: "string", value: "event" },
        ":content-type": { type: "string", value: "application/json" },
    };
    let body = new Uint8Array();
    body = (0,_smithy_smithy_client__WEBPACK_IMPORTED_MODULE_1__._json)(input);
    body = context.utf8Decoder(JSON.stringify(body));
    return { headers, body };
};
const de_StartConversationResponseEventStream = (output, context) => {
    return context.eventStreamMarshaller.deserialize(output, async (event) => {
        if (event["PlaybackInterruptionEvent"] != null) {
            return {
                PlaybackInterruptionEvent: await de_PlaybackInterruptionEvent_event(event["PlaybackInterruptionEvent"], context),
            };
        }
        if (event["TranscriptEvent"] != null) {
            return {
                TranscriptEvent: await de_TranscriptEvent_event(event["TranscriptEvent"], context),
            };
        }
        if (event["IntentResultEvent"] != null) {
            return {
                IntentResultEvent: await de_IntentResultEvent_event(event["IntentResultEvent"], context),
            };
        }
        if (event["TextResponseEvent"] != null) {
            return {
                TextResponseEvent: await de_TextResponseEvent_event(event["TextResponseEvent"], context),
            };
        }
        if (event["AudioResponseEvent"] != null) {
            return {
                AudioResponseEvent: await de_AudioResponseEvent_event(event["AudioResponseEvent"], context),
            };
        }
        if (event["HeartbeatEvent"] != null) {
            return {
                HeartbeatEvent: await de_HeartbeatEvent_event(event["HeartbeatEvent"], context),
            };
        }
        if (event["AccessDeniedException"] != null) {
            return {
                AccessDeniedException: await de_AccessDeniedException_event(event["AccessDeniedException"], context),
            };
        }
        if (event["ResourceNotFoundException"] != null) {
            return {
                ResourceNotFoundException: await de_ResourceNotFoundException_event(event["ResourceNotFoundException"], context),
            };
        }
        if (event["ValidationException"] != null) {
            return {
                ValidationException: await de_ValidationException_event(event["ValidationException"], context),
            };
        }
        if (event["ThrottlingException"] != null) {
            return {
                ThrottlingException: await de_ThrottlingException_event(event["ThrottlingException"], context),
            };
        }
        if (event["InternalServerException"] != null) {
            return {
                InternalServerException: await de_InternalServerException_event(event["InternalServerException"], context),
            };
        }
        if (event["ConflictException"] != null) {
            return {
                ConflictException: await de_ConflictException_event(event["ConflictException"], context),
            };
        }
        if (event["DependencyFailedException"] != null) {
            return {
                DependencyFailedException: await de_DependencyFailedException_event(event["DependencyFailedException"], context),
            };
        }
        if (event["BadGatewayException"] != null) {
            return {
                BadGatewayException: await de_BadGatewayException_event(event["BadGatewayException"], context),
            };
        }
        return { $unknown: output };
    });
};
const de_AccessDeniedException_event = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await (0,_aws_sdk_core__WEBPACK_IMPORTED_MODULE_2__.parseJsonBody)(output.body, context),
    };
    return de_AccessDeniedExceptionRes(parsedOutput, context);
};
const de_AudioResponseEvent_event = async (output, context) => {
    const contents = {};
    const data = await (0,_aws_sdk_core__WEBPACK_IMPORTED_MODULE_2__.parseJsonBody)(output.body, context);
    Object.assign(contents, de_AudioResponseEvent(data, context));
    return contents;
};
const de_BadGatewayException_event = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await (0,_aws_sdk_core__WEBPACK_IMPORTED_MODULE_2__.parseJsonBody)(output.body, context),
    };
    return de_BadGatewayExceptionRes(parsedOutput, context);
};
const de_ConflictException_event = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await (0,_aws_sdk_core__WEBPACK_IMPORTED_MODULE_2__.parseJsonBody)(output.body, context),
    };
    return de_ConflictExceptionRes(parsedOutput, context);
};
const de_DependencyFailedException_event = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await (0,_aws_sdk_core__WEBPACK_IMPORTED_MODULE_2__.parseJsonBody)(output.body, context),
    };
    return de_DependencyFailedExceptionRes(parsedOutput, context);
};
const de_HeartbeatEvent_event = async (output, context) => {
    const contents = {};
    const data = await (0,_aws_sdk_core__WEBPACK_IMPORTED_MODULE_2__.parseJsonBody)(output.body, context);
    Object.assign(contents, (0,_smithy_smithy_client__WEBPACK_IMPORTED_MODULE_1__._json)(data));
    return contents;
};
const de_IntentResultEvent_event = async (output, context) => {
    const contents = {};
    const data = await (0,_aws_sdk_core__WEBPACK_IMPORTED_MODULE_2__.parseJsonBody)(output.body, context);
    Object.assign(contents, de_IntentResultEvent(data, context));
    return contents;
};
const de_InternalServerException_event = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await (0,_aws_sdk_core__WEBPACK_IMPORTED_MODULE_2__.parseJsonBody)(output.body, context),
    };
    return de_InternalServerExceptionRes(parsedOutput, context);
};
const de_PlaybackInterruptionEvent_event = async (output, context) => {
    const contents = {};
    const data = await (0,_aws_sdk_core__WEBPACK_IMPORTED_MODULE_2__.parseJsonBody)(output.body, context);
    Object.assign(contents, (0,_smithy_smithy_client__WEBPACK_IMPORTED_MODULE_1__._json)(data));
    return contents;
};
const de_ResourceNotFoundException_event = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await (0,_aws_sdk_core__WEBPACK_IMPORTED_MODULE_2__.parseJsonBody)(output.body, context),
    };
    return de_ResourceNotFoundExceptionRes(parsedOutput, context);
};
const de_TextResponseEvent_event = async (output, context) => {
    const contents = {};
    const data = await (0,_aws_sdk_core__WEBPACK_IMPORTED_MODULE_2__.parseJsonBody)(output.body, context);
    Object.assign(contents, (0,_smithy_smithy_client__WEBPACK_IMPORTED_MODULE_1__._json)(data));
    return contents;
};
const de_ThrottlingException_event = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await (0,_aws_sdk_core__WEBPACK_IMPORTED_MODULE_2__.parseJsonBody)(output.body, context),
    };
    return de_ThrottlingExceptionRes(parsedOutput, context);
};
const de_TranscriptEvent_event = async (output, context) => {
    const contents = {};
    const data = await (0,_aws_sdk_core__WEBPACK_IMPORTED_MODULE_2__.parseJsonBody)(output.body, context);
    Object.assign(contents, (0,_smithy_smithy_client__WEBPACK_IMPORTED_MODULE_1__._json)(data));
    return contents;
};
const de_ValidationException_event = async (output, context) => {
    const parsedOutput = {
        ...output,
        body: await (0,_aws_sdk_core__WEBPACK_IMPORTED_MODULE_2__.parseJsonBody)(output.body, context),
    };
    return de_ValidationExceptionRes(parsedOutput, context);
};
const se_AudioInputEvent = (input, context) => {
    return (0,_smithy_smithy_client__WEBPACK_IMPORTED_MODULE_1__.take)(input, {
        audioChunk: context.base64Encoder,
        clientTimestampMillis: [],
        contentType: [],
        eventId: [],
    });
};
const se_ConfigurationEvent = (input, context) => {
    return (0,_smithy_smithy_client__WEBPACK_IMPORTED_MODULE_1__.take)(input, {
        clientTimestampMillis: [],
        disablePlayback: [],
        eventId: [],
        requestAttributes: _smithy_smithy_client__WEBPACK_IMPORTED_MODULE_1__._json,
        responseContentType: [],
        sessionState: (_) => se_SessionState(_, context),
        welcomeMessages: _smithy_smithy_client__WEBPACK_IMPORTED_MODULE_1__._json,
    });
};
const se_DialogAction = (input, context) => {
    return (0,_smithy_smithy_client__WEBPACK_IMPORTED_MODULE_1__.take)(input, {
        slotElicitationStyle: [],
        slotToElicit: [],
        subSlotToElicit: (_) => se_ElicitSubSlot(_, context),
        type: [],
    });
};
const se_ElicitSubSlot = (input, context) => {
    return (0,_smithy_smithy_client__WEBPACK_IMPORTED_MODULE_1__.take)(input, {
        name: [],
        subSlotToElicit: (_) => se_ElicitSubSlot(_, context),
    });
};
const se_Intent = (input, context) => {
    return (0,_smithy_smithy_client__WEBPACK_IMPORTED_MODULE_1__.take)(input, {
        confirmationState: [],
        name: [],
        slots: (_) => se_Slots(_, context),
        state: [],
    });
};
const se_RuntimeHintDetails = (input, context) => {
    return (0,_smithy_smithy_client__WEBPACK_IMPORTED_MODULE_1__.take)(input, {
        runtimeHintValues: _smithy_smithy_client__WEBPACK_IMPORTED_MODULE_1__._json,
        subSlotHints: (_) => se_SlotHintsSlotMap(_, context),
    });
};
const se_RuntimeHints = (input, context) => {
    return (0,_smithy_smithy_client__WEBPACK_IMPORTED_MODULE_1__.take)(input, {
        slotHints: (_) => se_SlotHintsIntentMap(_, context),
    });
};
const se_SessionState = (input, context) => {
    return (0,_smithy_smithy_client__WEBPACK_IMPORTED_MODULE_1__.take)(input, {
        activeContexts: _smithy_smithy_client__WEBPACK_IMPORTED_MODULE_1__._json,
        dialogAction: (_) => se_DialogAction(_, context),
        intent: (_) => se_Intent(_, context),
        originatingRequestId: [],
        runtimeHints: (_) => se_RuntimeHints(_, context),
        sessionAttributes: _smithy_smithy_client__WEBPACK_IMPORTED_MODULE_1__._json,
    });
};
const se_Slot = (input, context) => {
    return (0,_smithy_smithy_client__WEBPACK_IMPORTED_MODULE_1__.take)(input, {
        shape: [],
        subSlots: (_) => se_Slots(_, context),
        value: _smithy_smithy_client__WEBPACK_IMPORTED_MODULE_1__._json,
        values: (_) => se_Values(_, context),
    });
};
const se_SlotHintsIntentMap = (input, context) => {
    return Object.entries(input).reduce((acc, [key, value]) => {
        if (value === null) {
            return acc;
        }
        acc[key] = se_SlotHintsSlotMap(value, context);
        return acc;
    }, {});
};
const se_SlotHintsSlotMap = (input, context) => {
    return Object.entries(input).reduce((acc, [key, value]) => {
        if (value === null) {
            return acc;
        }
        acc[key] = se_RuntimeHintDetails(value, context);
        return acc;
    }, {});
};
const se_Slots = (input, context) => {
    return Object.entries(input).reduce((acc, [key, value]) => {
        if (value === null) {
            return acc;
        }
        acc[key] = se_Slot(value, context);
        return acc;
    }, {});
};
const se_Values = (input, context) => {
    return input
        .filter((e) => e != null)
        .map((entry) => {
        return se_Slot(entry, context);
    });
};
const de_AudioResponseEvent = (output, context) => {
    return (0,_smithy_smithy_client__WEBPACK_IMPORTED_MODULE_1__.take)(output, {
        audioChunk: context.base64Decoder,
        contentType: _smithy_smithy_client__WEBPACK_IMPORTED_MODULE_1__.expectString,
        eventId: _smithy_smithy_client__WEBPACK_IMPORTED_MODULE_1__.expectString,
    });
};
const de_ConfidenceScore = (output, context) => {
    return (0,_smithy_smithy_client__WEBPACK_IMPORTED_MODULE_1__.take)(output, {
        score: _smithy_smithy_client__WEBPACK_IMPORTED_MODULE_1__.limitedParseDouble,
    });
};
const de_DialogAction = (output, context) => {
    return (0,_smithy_smithy_client__WEBPACK_IMPORTED_MODULE_1__.take)(output, {
        slotElicitationStyle: _smithy_smithy_client__WEBPACK_IMPORTED_MODULE_1__.expectString,
        slotToElicit: _smithy_smithy_client__WEBPACK_IMPORTED_MODULE_1__.expectString,
        subSlotToElicit: (_) => de_ElicitSubSlot(_, context),
        type: _smithy_smithy_client__WEBPACK_IMPORTED_MODULE_1__.expectString,
    });
};
const de_ElicitSubSlot = (output, context) => {
    return (0,_smithy_smithy_client__WEBPACK_IMPORTED_MODULE_1__.take)(output, {
        name: _smithy_smithy_client__WEBPACK_IMPORTED_MODULE_1__.expectString,
        subSlotToElicit: (_) => de_ElicitSubSlot(_, context),
    });
};
const de_Intent = (output, context) => {
    return (0,_smithy_smithy_client__WEBPACK_IMPORTED_MODULE_1__.take)(output, {
        confirmationState: _smithy_smithy_client__WEBPACK_IMPORTED_MODULE_1__.expectString,
        name: _smithy_smithy_client__WEBPACK_IMPORTED_MODULE_1__.expectString,
        slots: (_) => de_Slots(_, context),
        state: _smithy_smithy_client__WEBPACK_IMPORTED_MODULE_1__.expectString,
    });
};
const de_IntentResultEvent = (output, context) => {
    return (0,_smithy_smithy_client__WEBPACK_IMPORTED_MODULE_1__.take)(output, {
        eventId: _smithy_smithy_client__WEBPACK_IMPORTED_MODULE_1__.expectString,
        inputMode: _smithy_smithy_client__WEBPACK_IMPORTED_MODULE_1__.expectString,
        interpretations: (_) => de_Interpretations(_, context),
        recognizedBotMember: _smithy_smithy_client__WEBPACK_IMPORTED_MODULE_1__._json,
        requestAttributes: _smithy_smithy_client__WEBPACK_IMPORTED_MODULE_1__._json,
        sessionId: _smithy_smithy_client__WEBPACK_IMPORTED_MODULE_1__.expectString,
        sessionState: (_) => de_SessionState(_, context),
    });
};
const de_Interpretation = (output, context) => {
    return (0,_smithy_smithy_client__WEBPACK_IMPORTED_MODULE_1__.take)(output, {
        intent: (_) => de_Intent(_, context),
        interpretationSource: _smithy_smithy_client__WEBPACK_IMPORTED_MODULE_1__.expectString,
        nluConfidence: (_) => de_ConfidenceScore(_, context),
        sentimentResponse: (_) => de_SentimentResponse(_, context),
    });
};
const de_Interpretations = (output, context) => {
    const retVal = (output || [])
        .filter((e) => e != null)
        .map((entry) => {
        return de_Interpretation(entry, context);
    });
    return retVal;
};
const de_RuntimeHintDetails = (output, context) => {
    return (0,_smithy_smithy_client__WEBPACK_IMPORTED_MODULE_1__.take)(output, {
        runtimeHintValues: _smithy_smithy_client__WEBPACK_IMPORTED_MODULE_1__._json,
        subSlotHints: (_) => de_SlotHintsSlotMap(_, context),
    });
};
const de_RuntimeHints = (output, context) => {
    return (0,_smithy_smithy_client__WEBPACK_IMPORTED_MODULE_1__.take)(output, {
        slotHints: (_) => de_SlotHintsIntentMap(_, context),
    });
};
const de_SentimentResponse = (output, context) => {
    return (0,_smithy_smithy_client__WEBPACK_IMPORTED_MODULE_1__.take)(output, {
        sentiment: _smithy_smithy_client__WEBPACK_IMPORTED_MODULE_1__.expectString,
        sentimentScore: (_) => de_SentimentScore(_, context),
    });
};
const de_SentimentScore = (output, context) => {
    return (0,_smithy_smithy_client__WEBPACK_IMPORTED_MODULE_1__.take)(output, {
        mixed: _smithy_smithy_client__WEBPACK_IMPORTED_MODULE_1__.limitedParseDouble,
        negative: _smithy_smithy_client__WEBPACK_IMPORTED_MODULE_1__.limitedParseDouble,
        neutral: _smithy_smithy_client__WEBPACK_IMPORTED_MODULE_1__.limitedParseDouble,
        positive: _smithy_smithy_client__WEBPACK_IMPORTED_MODULE_1__.limitedParseDouble,
    });
};
const de_SessionState = (output, context) => {
    return (0,_smithy_smithy_client__WEBPACK_IMPORTED_MODULE_1__.take)(output, {
        activeContexts: _smithy_smithy_client__WEBPACK_IMPORTED_MODULE_1__._json,
        dialogAction: (_) => de_DialogAction(_, context),
        intent: (_) => de_Intent(_, context),
        originatingRequestId: _smithy_smithy_client__WEBPACK_IMPORTED_MODULE_1__.expectString,
        runtimeHints: (_) => de_RuntimeHints(_, context),
        sessionAttributes: _smithy_smithy_client__WEBPACK_IMPORTED_MODULE_1__._json,
    });
};
const de_Slot = (output, context) => {
    return (0,_smithy_smithy_client__WEBPACK_IMPORTED_MODULE_1__.take)(output, {
        shape: _smithy_smithy_client__WEBPACK_IMPORTED_MODULE_1__.expectString,
        subSlots: (_) => de_Slots(_, context),
        value: _smithy_smithy_client__WEBPACK_IMPORTED_MODULE_1__._json,
        values: (_) => de_Values(_, context),
    });
};
const de_SlotHintsIntentMap = (output, context) => {
    return Object.entries(output).reduce((acc, [key, value]) => {
        if (value === null) {
            return acc;
        }
        acc[key] = de_SlotHintsSlotMap(value, context);
        return acc;
    }, {});
};
const de_SlotHintsSlotMap = (output, context) => {
    return Object.entries(output).reduce((acc, [key, value]) => {
        if (value === null) {
            return acc;
        }
        acc[key] = de_RuntimeHintDetails(value, context);
        return acc;
    }, {});
};
const de_Slots = (output, context) => {
    return Object.entries(output).reduce((acc, [key, value]) => {
        if (value === null) {
            return acc;
        }
        acc[key] = de_Slot(value, context);
        return acc;
    }, {});
};
const de_Values = (output, context) => {
    const retVal = (output || [])
        .filter((e) => e != null)
        .map((entry) => {
        return de_Slot(entry, context);
    });
    return retVal;
};
const deserializeMetadata = (output) => ({
    httpStatusCode: output.statusCode,
    requestId: output.headers["x-amzn-requestid"] ?? output.headers["x-amzn-request-id"] ?? output.headers["x-amz-request-id"],
    extendedRequestId: output.headers["x-amz-id-2"],
    cfId: output.headers["x-amz-cf-id"],
});
const collectBodyString = (streamBody, context) => (0,_smithy_smithy_client__WEBPACK_IMPORTED_MODULE_1__.collectBody)(streamBody, context).then((body) => context.utf8Encoder(body));
const isSerializableHeaderValue = (value) => value !== undefined &&
    value !== null &&
    value !== "" &&
    (!Object.getOwnPropertyNames(value).includes("length") || value.length != 0) &&
    (!Object.getOwnPropertyNames(value).includes("size") || value.size != 0);
const _cM = "conversationMode";
const _cT = "contentType";
const _ct = "content-type";
const _i = "interpretations";
const _iM = "inputMode";
const _iT = "inputTranscript";
const _m = "messages";
const _r = "responsecontenttype";
const _rA = "requestAttributes";
const _rBM = "recognizedBotMember";
const _rCT = "responseContentType";
const _rCTe = "requestContentType";
const _rct = "response-content-type";
const _sI = "sessionId";
const _sS = "sessionState";
const _xalcm = "x-amz-lex-conversation-mode";
const _xali = "x-amz-lex-interpretations";
const _xalim = "x-amz-lex-input-mode";
const _xalit = "x-amz-lex-input-transcript";
const _xalm = "x-amz-lex-messages";
const _xalra = "x-amz-lex-request-attributes";
const _xalrbm = "x-amz-lex-recognized-bot-member";
const _xalsi = "x-amz-lex-session-id";
const _xalss = "x-amz-lex-session-state";


/***/ }),

/***/ "../../node_modules/@aws-sdk/client-lex-runtime-v2/dist-es/runtimeConfig.browser.js":
/*!******************************************************************************************!*\
  !*** ../../node_modules/@aws-sdk/client-lex-runtime-v2/dist-es/runtimeConfig.browser.js ***!
  \******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getRuntimeConfig: () => (/* binding */ getRuntimeConfig)
/* harmony export */ });
/* harmony import */ var _package_json__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../package.json */ "../../node_modules/@aws-sdk/client-lex-runtime-v2/package.json");
/* harmony import */ var _aws_crypto_sha256_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @aws-crypto/sha256-browser */ "../../node_modules/@aws-crypto/sha256-browser/build/module/index.js");
/* harmony import */ var _aws_sdk_util_user_agent_browser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @aws-sdk/util-user-agent-browser */ "../../node_modules/@aws-sdk/util-user-agent-browser/dist-es/index.js");
/* harmony import */ var _smithy_config_resolver__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @smithy/config-resolver */ "../../node_modules/@smithy/config-resolver/dist-es/index.js");
/* harmony import */ var _smithy_eventstream_serde_browser__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @smithy/eventstream-serde-browser */ "../../node_modules/@smithy/eventstream-serde-browser/dist-es/index.js");
/* harmony import */ var _smithy_fetch_http_handler__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @smithy/fetch-http-handler */ "../../node_modules/@smithy/fetch-http-handler/dist-es/index.js");
/* harmony import */ var _smithy_invalid_dependency__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @smithy/invalid-dependency */ "../../node_modules/@smithy/invalid-dependency/dist-es/index.js");
/* harmony import */ var _smithy_util_body_length_browser__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @smithy/util-body-length-browser */ "../../node_modules/@smithy/util-body-length-browser/dist-es/index.js");
/* harmony import */ var _smithy_util_retry__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @smithy/util-retry */ "../../node_modules/@smithy/util-retry/dist-es/index.js");
/* harmony import */ var _runtimeConfig_shared__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./runtimeConfig.shared */ "../../node_modules/@aws-sdk/client-lex-runtime-v2/dist-es/runtimeConfig.shared.js");
/* harmony import */ var _smithy_smithy_client__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @smithy/smithy-client */ "../../node_modules/@smithy/smithy-client/dist-es/index.js");
/* harmony import */ var _smithy_util_defaults_mode_browser__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @smithy/util-defaults-mode-browser */ "../../node_modules/@smithy/util-defaults-mode-browser/dist-es/index.js");












const getRuntimeConfig = (config) => {
    const defaultsMode = (0,_smithy_util_defaults_mode_browser__WEBPACK_IMPORTED_MODULE_9__.resolveDefaultsModeConfig)(config);
    const defaultConfigProvider = () => defaultsMode().then(_smithy_smithy_client__WEBPACK_IMPORTED_MODULE_8__.loadConfigsForDefaultMode);
    const clientSharedValues = (0,_runtimeConfig_shared__WEBPACK_IMPORTED_MODULE_10__.getRuntimeConfig)(config);
    return {
        ...clientSharedValues,
        ...config,
        runtime: "browser",
        defaultsMode,
        bodyLengthChecker: config?.bodyLengthChecker ?? _smithy_util_body_length_browser__WEBPACK_IMPORTED_MODULE_6__.calculateBodyLength,
        credentialDefaultProvider: config?.credentialDefaultProvider ?? ((_) => () => Promise.reject(new Error("Credential is missing"))),
        defaultUserAgentProvider: config?.defaultUserAgentProvider ??
            (0,_aws_sdk_util_user_agent_browser__WEBPACK_IMPORTED_MODULE_1__.defaultUserAgent)({ serviceId: clientSharedValues.serviceId, clientVersion: _package_json__WEBPACK_IMPORTED_MODULE_11__.version }),
        eventStreamPayloadHandlerProvider: config?.eventStreamPayloadHandlerProvider ??
            (() => ({ handle: (0,_smithy_invalid_dependency__WEBPACK_IMPORTED_MODULE_5__.invalidFunction)("event stream request is not supported in browser.") })),
        eventStreamSerdeProvider: config?.eventStreamSerdeProvider ?? _smithy_eventstream_serde_browser__WEBPACK_IMPORTED_MODULE_3__.eventStreamSerdeProvider,
        maxAttempts: config?.maxAttempts ?? _smithy_util_retry__WEBPACK_IMPORTED_MODULE_7__.DEFAULT_MAX_ATTEMPTS,
        region: config?.region ?? (0,_smithy_invalid_dependency__WEBPACK_IMPORTED_MODULE_5__.invalidProvider)("Region is missing"),
        requestHandler: _smithy_fetch_http_handler__WEBPACK_IMPORTED_MODULE_4__.FetchHttpHandler.create(config?.requestHandler ?? defaultConfigProvider),
        retryMode: config?.retryMode ?? (async () => (await defaultConfigProvider()).retryMode || _smithy_util_retry__WEBPACK_IMPORTED_MODULE_7__.DEFAULT_RETRY_MODE),
        sha256: config?.sha256 ?? _aws_crypto_sha256_browser__WEBPACK_IMPORTED_MODULE_0__.Sha256,
        streamCollector: config?.streamCollector ?? _smithy_fetch_http_handler__WEBPACK_IMPORTED_MODULE_4__.streamCollector,
        useDualstackEndpoint: config?.useDualstackEndpoint ?? (() => Promise.resolve(_smithy_config_resolver__WEBPACK_IMPORTED_MODULE_2__.DEFAULT_USE_DUALSTACK_ENDPOINT)),
        useFipsEndpoint: config?.useFipsEndpoint ?? (() => Promise.resolve(_smithy_config_resolver__WEBPACK_IMPORTED_MODULE_2__.DEFAULT_USE_FIPS_ENDPOINT)),
    };
};


/***/ }),

/***/ "../../node_modules/@aws-sdk/client-lex-runtime-v2/dist-es/runtimeConfig.shared.js":
/*!*****************************************************************************************!*\
  !*** ../../node_modules/@aws-sdk/client-lex-runtime-v2/dist-es/runtimeConfig.shared.js ***!
  \*****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getRuntimeConfig: () => (/* binding */ getRuntimeConfig)
/* harmony export */ });
/* harmony import */ var _smithy_smithy_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @smithy/smithy-client */ "../../node_modules/@smithy/smithy-client/dist-es/index.js");
/* harmony import */ var _smithy_url_parser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @smithy/url-parser */ "../../node_modules/@smithy/url-parser/dist-es/index.js");
/* harmony import */ var _smithy_util_base64__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @smithy/util-base64 */ "../../node_modules/@smithy/util-base64/dist-es/index.js");
/* harmony import */ var _smithy_util_stream__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @smithy/util-stream */ "../../node_modules/@smithy/util-stream/dist-es/index.js");
/* harmony import */ var _smithy_util_utf8__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @smithy/util-utf8 */ "../../node_modules/@smithy/util-utf8/dist-es/index.js");
/* harmony import */ var _endpoint_endpointResolver__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./endpoint/endpointResolver */ "../../node_modules/@aws-sdk/client-lex-runtime-v2/dist-es/endpoint/endpointResolver.js");






const getRuntimeConfig = (config) => {
    return {
        apiVersion: "2020-08-07",
        base64Decoder: config?.base64Decoder ?? _smithy_util_base64__WEBPACK_IMPORTED_MODULE_2__.fromBase64,
        base64Encoder: config?.base64Encoder ?? _smithy_util_base64__WEBPACK_IMPORTED_MODULE_2__.toBase64,
        disableHostPrefix: config?.disableHostPrefix ?? false,
        endpointProvider: config?.endpointProvider ?? _endpoint_endpointResolver__WEBPACK_IMPORTED_MODULE_5__.defaultEndpointResolver,
        extensions: config?.extensions ?? [],
        logger: config?.logger ?? new _smithy_smithy_client__WEBPACK_IMPORTED_MODULE_0__.NoOpLogger(),
        sdkStreamMixin: config?.sdkStreamMixin ?? _smithy_util_stream__WEBPACK_IMPORTED_MODULE_3__.sdkStreamMixin,
        serviceId: config?.serviceId ?? "Lex Runtime V2",
        urlParser: config?.urlParser ?? _smithy_url_parser__WEBPACK_IMPORTED_MODULE_1__.parseUrl,
        utf8Decoder: config?.utf8Decoder ?? _smithy_util_utf8__WEBPACK_IMPORTED_MODULE_4__.fromUtf8,
        utf8Encoder: config?.utf8Encoder ?? _smithy_util_utf8__WEBPACK_IMPORTED_MODULE_4__.toUtf8,
    };
};


/***/ }),

/***/ "../../node_modules/@aws-sdk/client-lex-runtime-v2/dist-es/runtimeExtensions.js":
/*!**************************************************************************************!*\
  !*** ../../node_modules/@aws-sdk/client-lex-runtime-v2/dist-es/runtimeExtensions.js ***!
  \**************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   resolveRuntimeExtensions: () => (/* binding */ resolveRuntimeExtensions)
/* harmony export */ });
/* harmony import */ var _aws_sdk_region_config_resolver__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @aws-sdk/region-config-resolver */ "../../node_modules/@aws-sdk/region-config-resolver/dist-es/index.js");
/* harmony import */ var _smithy_protocol_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @smithy/protocol-http */ "../../node_modules/@smithy/protocol-http/dist-es/index.js");
/* harmony import */ var _smithy_smithy_client__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @smithy/smithy-client */ "../../node_modules/@smithy/smithy-client/dist-es/index.js");



const asPartial = (t) => t;
const resolveRuntimeExtensions = (runtimeConfig, extensions) => {
    const extensionConfiguration = {
        ...asPartial((0,_aws_sdk_region_config_resolver__WEBPACK_IMPORTED_MODULE_0__.getAwsRegionExtensionConfiguration)(runtimeConfig)),
        ...asPartial((0,_smithy_smithy_client__WEBPACK_IMPORTED_MODULE_2__.getDefaultExtensionConfiguration)(runtimeConfig)),
        ...asPartial((0,_smithy_protocol_http__WEBPACK_IMPORTED_MODULE_1__.getHttpHandlerExtensionConfiguration)(runtimeConfig)),
    };
    extensions.forEach((extension) => extension.configure(extensionConfiguration));
    return {
        ...runtimeConfig,
        ...(0,_aws_sdk_region_config_resolver__WEBPACK_IMPORTED_MODULE_0__.resolveAwsRegionExtensionConfiguration)(extensionConfiguration),
        ...(0,_smithy_smithy_client__WEBPACK_IMPORTED_MODULE_2__.resolveDefaultRuntimeConfig)(extensionConfiguration),
        ...(0,_smithy_protocol_http__WEBPACK_IMPORTED_MODULE_1__.resolveHttpHandlerRuntimeConfig)(extensionConfiguration),
    };
};


/***/ }),

/***/ "../../node_modules/@aws-sdk/core/dist-es/submodules/protocols/common.js":
/*!*******************************************************************************!*\
  !*** ../../node_modules/@aws-sdk/core/dist-es/submodules/protocols/common.js ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   collectBodyString: () => (/* binding */ collectBodyString)
/* harmony export */ });
/* harmony import */ var _smithy_smithy_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @smithy/smithy-client */ "../../node_modules/@smithy/smithy-client/dist-es/index.js");

const collectBodyString = (streamBody, context) => (0,_smithy_smithy_client__WEBPACK_IMPORTED_MODULE_0__.collectBody)(streamBody, context).then((body) => context.utf8Encoder(body));


/***/ }),

/***/ "../../node_modules/@aws-sdk/core/dist-es/submodules/protocols/json/parseJsonBody.js":
/*!*******************************************************************************************!*\
  !*** ../../node_modules/@aws-sdk/core/dist-es/submodules/protocols/json/parseJsonBody.js ***!
  \*******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   loadRestJsonErrorCode: () => (/* binding */ loadRestJsonErrorCode),
/* harmony export */   parseJsonBody: () => (/* binding */ parseJsonBody),
/* harmony export */   parseJsonErrorBody: () => (/* binding */ parseJsonErrorBody)
/* harmony export */ });
/* harmony import */ var _common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common */ "../../node_modules/@aws-sdk/core/dist-es/submodules/protocols/common.js");

const parseJsonBody = (streamBody, context) => (0,_common__WEBPACK_IMPORTED_MODULE_0__.collectBodyString)(streamBody, context).then((encoded) => {
    if (encoded.length) {
        try {
            return JSON.parse(encoded);
        }
        catch (e) {
            if (e?.name === "SyntaxError") {
                Object.defineProperty(e, "$responseBodyText", {
                    value: encoded,
                });
            }
            throw e;
        }
    }
    return {};
});
const parseJsonErrorBody = async (errorBody, context) => {
    const value = await parseJsonBody(errorBody, context);
    value.message = value.message ?? value.Message;
    return value;
};
const loadRestJsonErrorCode = (output, data) => {
    const findKey = (object, key) => Object.keys(object).find((k) => k.toLowerCase() === key.toLowerCase());
    const sanitizeErrorCode = (rawValue) => {
        let cleanValue = rawValue;
        if (typeof cleanValue === "number") {
            cleanValue = cleanValue.toString();
        }
        if (cleanValue.indexOf(",") >= 0) {
            cleanValue = cleanValue.split(",")[0];
        }
        if (cleanValue.indexOf(":") >= 0) {
            cleanValue = cleanValue.split(":")[0];
        }
        if (cleanValue.indexOf("#") >= 0) {
            cleanValue = cleanValue.split("#")[1];
        }
        return cleanValue;
    };
    const headerKey = findKey(output.headers, "x-amzn-errortype");
    if (headerKey !== undefined) {
        return sanitizeErrorCode(output.headers[headerKey]);
    }
    if (data.code !== undefined) {
        return sanitizeErrorCode(data.code);
    }
    if (data["__type"] !== undefined) {
        return sanitizeErrorCode(data["__type"]);
    }
};


/***/ }),

/***/ "../../node_modules/@aws-sdk/middleware-eventstream/dist-es/eventStreamConfiguration.js":
/*!**********************************************************************************************!*\
  !*** ../../node_modules/@aws-sdk/middleware-eventstream/dist-es/eventStreamConfiguration.js ***!
  \**********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   resolveEventStreamConfig: () => (/* binding */ resolveEventStreamConfig)
/* harmony export */ });
function resolveEventStreamConfig(input) {
    const eventSigner = input.signer;
    const messageSigner = input.signer;
    const eventStreamPayloadHandler = input.eventStreamPayloadHandlerProvider({
        ...input,
        messageSigner,
    });
    return {
        ...input,
        eventSigner,
        eventStreamPayloadHandler,
    };
}


/***/ }),

/***/ "../../node_modules/@aws-sdk/middleware-eventstream/dist-es/eventStreamHandlingMiddleware.js":
/*!***************************************************************************************************!*\
  !*** ../../node_modules/@aws-sdk/middleware-eventstream/dist-es/eventStreamHandlingMiddleware.js ***!
  \***************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   eventStreamHandlingMiddleware: () => (/* binding */ eventStreamHandlingMiddleware),
/* harmony export */   eventStreamHandlingMiddlewareOptions: () => (/* binding */ eventStreamHandlingMiddlewareOptions)
/* harmony export */ });
/* harmony import */ var _smithy_protocol_http__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @smithy/protocol-http */ "../../node_modules/@smithy/protocol-http/dist-es/index.js");

const eventStreamHandlingMiddleware = (options) => (next, context) => async (args) => {
    const { request } = args;
    if (!_smithy_protocol_http__WEBPACK_IMPORTED_MODULE_0__.HttpRequest.isInstance(request))
        return next(args);
    return options.eventStreamPayloadHandler.handle(next, args, context);
};
const eventStreamHandlingMiddlewareOptions = {
    tags: ["EVENT_STREAM", "SIGNATURE", "HANDLE"],
    name: "eventStreamHandlingMiddleware",
    relation: "after",
    toMiddleware: "awsAuthMiddleware",
    override: true,
};


/***/ }),

/***/ "../../node_modules/@aws-sdk/middleware-eventstream/dist-es/eventStreamHeaderMiddleware.js":
/*!*************************************************************************************************!*\
  !*** ../../node_modules/@aws-sdk/middleware-eventstream/dist-es/eventStreamHeaderMiddleware.js ***!
  \*************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   eventStreamHeaderMiddleware: () => (/* binding */ eventStreamHeaderMiddleware),
/* harmony export */   eventStreamHeaderMiddlewareOptions: () => (/* binding */ eventStreamHeaderMiddlewareOptions)
/* harmony export */ });
/* harmony import */ var _smithy_protocol_http__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @smithy/protocol-http */ "../../node_modules/@smithy/protocol-http/dist-es/index.js");

const eventStreamHeaderMiddleware = (next) => async (args) => {
    const { request } = args;
    if (!_smithy_protocol_http__WEBPACK_IMPORTED_MODULE_0__.HttpRequest.isInstance(request))
        return next(args);
    request.headers = {
        ...request.headers,
        "content-type": "application/vnd.amazon.eventstream",
        "x-amz-content-sha256": "STREAMING-AWS4-HMAC-SHA256-EVENTS",
    };
    return next({
        ...args,
        request,
    });
};
const eventStreamHeaderMiddlewareOptions = {
    step: "build",
    tags: ["EVENT_STREAM", "HEADER", "CONTENT_TYPE", "CONTENT_SHA256"],
    name: "eventStreamHeaderMiddleware",
    override: true,
};


/***/ }),

/***/ "../../node_modules/@aws-sdk/middleware-eventstream/dist-es/getEventStreamPlugin.js":
/*!******************************************************************************************!*\
  !*** ../../node_modules/@aws-sdk/middleware-eventstream/dist-es/getEventStreamPlugin.js ***!
  \******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getEventStreamPlugin: () => (/* binding */ getEventStreamPlugin)
/* harmony export */ });
/* harmony import */ var _eventStreamHandlingMiddleware__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./eventStreamHandlingMiddleware */ "../../node_modules/@aws-sdk/middleware-eventstream/dist-es/eventStreamHandlingMiddleware.js");
/* harmony import */ var _eventStreamHeaderMiddleware__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./eventStreamHeaderMiddleware */ "../../node_modules/@aws-sdk/middleware-eventstream/dist-es/eventStreamHeaderMiddleware.js");


const getEventStreamPlugin = (options) => ({
    applyToStack: (clientStack) => {
        clientStack.addRelativeTo((0,_eventStreamHandlingMiddleware__WEBPACK_IMPORTED_MODULE_0__.eventStreamHandlingMiddleware)(options), _eventStreamHandlingMiddleware__WEBPACK_IMPORTED_MODULE_0__.eventStreamHandlingMiddlewareOptions);
        clientStack.add(_eventStreamHeaderMiddleware__WEBPACK_IMPORTED_MODULE_1__.eventStreamHeaderMiddleware, _eventStreamHeaderMiddleware__WEBPACK_IMPORTED_MODULE_1__.eventStreamHeaderMiddlewareOptions);
    },
});


/***/ }),

/***/ "../../node_modules/@aws-sdk/middleware-eventstream/dist-es/index.js":
/*!***************************************************************************!*\
  !*** ../../node_modules/@aws-sdk/middleware-eventstream/dist-es/index.js ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   eventStreamHandlingMiddleware: () => (/* reexport safe */ _eventStreamHandlingMiddleware__WEBPACK_IMPORTED_MODULE_1__.eventStreamHandlingMiddleware),
/* harmony export */   eventStreamHandlingMiddlewareOptions: () => (/* reexport safe */ _eventStreamHandlingMiddleware__WEBPACK_IMPORTED_MODULE_1__.eventStreamHandlingMiddlewareOptions),
/* harmony export */   eventStreamHeaderMiddleware: () => (/* reexport safe */ _eventStreamHeaderMiddleware__WEBPACK_IMPORTED_MODULE_2__.eventStreamHeaderMiddleware),
/* harmony export */   eventStreamHeaderMiddlewareOptions: () => (/* reexport safe */ _eventStreamHeaderMiddleware__WEBPACK_IMPORTED_MODULE_2__.eventStreamHeaderMiddlewareOptions),
/* harmony export */   getEventStreamPlugin: () => (/* reexport safe */ _getEventStreamPlugin__WEBPACK_IMPORTED_MODULE_3__.getEventStreamPlugin),
/* harmony export */   resolveEventStreamConfig: () => (/* reexport safe */ _eventStreamConfiguration__WEBPACK_IMPORTED_MODULE_0__.resolveEventStreamConfig)
/* harmony export */ });
/* harmony import */ var _eventStreamConfiguration__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./eventStreamConfiguration */ "../../node_modules/@aws-sdk/middleware-eventstream/dist-es/eventStreamConfiguration.js");
/* harmony import */ var _eventStreamHandlingMiddleware__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./eventStreamHandlingMiddleware */ "../../node_modules/@aws-sdk/middleware-eventstream/dist-es/eventStreamHandlingMiddleware.js");
/* harmony import */ var _eventStreamHeaderMiddleware__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./eventStreamHeaderMiddleware */ "../../node_modules/@aws-sdk/middleware-eventstream/dist-es/eventStreamHeaderMiddleware.js");
/* harmony import */ var _getEventStreamPlugin__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./getEventStreamPlugin */ "../../node_modules/@aws-sdk/middleware-eventstream/dist-es/getEventStreamPlugin.js");






/***/ }),

/***/ "../../node_modules/@aws-sdk/middleware-host-header/dist-es/index.js":
/*!***************************************************************************!*\
  !*** ../../node_modules/@aws-sdk/middleware-host-header/dist-es/index.js ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getHostHeaderPlugin: () => (/* binding */ getHostHeaderPlugin),
/* harmony export */   hostHeaderMiddleware: () => (/* binding */ hostHeaderMiddleware),
/* harmony export */   hostHeaderMiddlewareOptions: () => (/* binding */ hostHeaderMiddlewareOptions),
/* harmony export */   resolveHostHeaderConfig: () => (/* binding */ resolveHostHeaderConfig)
/* harmony export */ });
/* harmony import */ var _smithy_protocol_http__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @smithy/protocol-http */ "../../node_modules/@smithy/protocol-http/dist-es/index.js");

function resolveHostHeaderConfig(input) {
    return input;
}
const hostHeaderMiddleware = (options) => (next) => async (args) => {
    if (!_smithy_protocol_http__WEBPACK_IMPORTED_MODULE_0__.HttpRequest.isInstance(args.request))
        return next(args);
    const { request } = args;
    const { handlerProtocol = "" } = options.requestHandler.metadata || {};
    if (handlerProtocol.indexOf("h2") >= 0 && !request.headers[":authority"]) {
        delete request.headers["host"];
        request.headers[":authority"] = request.hostname + (request.port ? ":" + request.port : "");
    }
    else if (!request.headers["host"]) {
        let host = request.hostname;
        if (request.port != null)
            host += `:${request.port}`;
        request.headers["host"] = host;
    }
    return next(args);
};
const hostHeaderMiddlewareOptions = {
    name: "hostHeaderMiddleware",
    step: "build",
    priority: "low",
    tags: ["HOST"],
    override: true,
};
const getHostHeaderPlugin = (options) => ({
    applyToStack: (clientStack) => {
        clientStack.add(hostHeaderMiddleware(options), hostHeaderMiddlewareOptions);
    },
});


/***/ }),

/***/ "../../node_modules/@aws-sdk/middleware-logger/dist-es/index.js":
/*!**********************************************************************!*\
  !*** ../../node_modules/@aws-sdk/middleware-logger/dist-es/index.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getLoggerPlugin: () => (/* reexport safe */ _loggerMiddleware__WEBPACK_IMPORTED_MODULE_0__.getLoggerPlugin),
/* harmony export */   loggerMiddleware: () => (/* reexport safe */ _loggerMiddleware__WEBPACK_IMPORTED_MODULE_0__.loggerMiddleware),
/* harmony export */   loggerMiddlewareOptions: () => (/* reexport safe */ _loggerMiddleware__WEBPACK_IMPORTED_MODULE_0__.loggerMiddlewareOptions)
/* harmony export */ });
/* harmony import */ var _loggerMiddleware__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./loggerMiddleware */ "../../node_modules/@aws-sdk/middleware-logger/dist-es/loggerMiddleware.js");



/***/ }),

/***/ "../../node_modules/@aws-sdk/middleware-logger/dist-es/loggerMiddleware.js":
/*!*********************************************************************************!*\
  !*** ../../node_modules/@aws-sdk/middleware-logger/dist-es/loggerMiddleware.js ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getLoggerPlugin: () => (/* binding */ getLoggerPlugin),
/* harmony export */   loggerMiddleware: () => (/* binding */ loggerMiddleware),
/* harmony export */   loggerMiddlewareOptions: () => (/* binding */ loggerMiddlewareOptions)
/* harmony export */ });
const loggerMiddleware = () => (next, context) => async (args) => {
    try {
        const response = await next(args);
        const { clientName, commandName, logger, dynamoDbDocumentClientOptions = {} } = context;
        const { overrideInputFilterSensitiveLog, overrideOutputFilterSensitiveLog } = dynamoDbDocumentClientOptions;
        const inputFilterSensitiveLog = overrideInputFilterSensitiveLog ?? context.inputFilterSensitiveLog;
        const outputFilterSensitiveLog = overrideOutputFilterSensitiveLog ?? context.outputFilterSensitiveLog;
        const { $metadata, ...outputWithoutMetadata } = response.output;
        logger?.info?.({
            clientName,
            commandName,
            input: inputFilterSensitiveLog(args.input),
            output: outputFilterSensitiveLog(outputWithoutMetadata),
            metadata: $metadata,
        });
        return response;
    }
    catch (error) {
        const { clientName, commandName, logger, dynamoDbDocumentClientOptions = {} } = context;
        const { overrideInputFilterSensitiveLog } = dynamoDbDocumentClientOptions;
        const inputFilterSensitiveLog = overrideInputFilterSensitiveLog ?? context.inputFilterSensitiveLog;
        logger?.error?.({
            clientName,
            commandName,
            input: inputFilterSensitiveLog(args.input),
            error,
            metadata: error.$metadata,
        });
        throw error;
    }
};
const loggerMiddlewareOptions = {
    name: "loggerMiddleware",
    tags: ["LOGGER"],
    step: "initialize",
    override: true,
};
const getLoggerPlugin = (options) => ({
    applyToStack: (clientStack) => {
        clientStack.add(loggerMiddleware(), loggerMiddlewareOptions);
    },
});


/***/ }),

/***/ "../../node_modules/@aws-sdk/middleware-recursion-detection/dist-es/index.js":
/*!***********************************************************************************!*\
  !*** ../../node_modules/@aws-sdk/middleware-recursion-detection/dist-es/index.js ***!
  \***********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   addRecursionDetectionMiddlewareOptions: () => (/* binding */ addRecursionDetectionMiddlewareOptions),
/* harmony export */   getRecursionDetectionPlugin: () => (/* binding */ getRecursionDetectionPlugin),
/* harmony export */   recursionDetectionMiddleware: () => (/* binding */ recursionDetectionMiddleware)
/* harmony export */ });
/* harmony import */ var _smithy_protocol_http__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @smithy/protocol-http */ "../../node_modules/@smithy/protocol-http/dist-es/index.js");

const TRACE_ID_HEADER_NAME = "X-Amzn-Trace-Id";
const ENV_LAMBDA_FUNCTION_NAME = "AWS_LAMBDA_FUNCTION_NAME";
const ENV_TRACE_ID = "_X_AMZN_TRACE_ID";
const recursionDetectionMiddleware = (options) => (next) => async (args) => {
    const { request } = args;
    if (!_smithy_protocol_http__WEBPACK_IMPORTED_MODULE_0__.HttpRequest.isInstance(request) ||
        options.runtime !== "node" ||
        request.headers.hasOwnProperty(TRACE_ID_HEADER_NAME)) {
        return next(args);
    }
    const functionName = process.env[ENV_LAMBDA_FUNCTION_NAME];
    const traceId = process.env[ENV_TRACE_ID];
    const nonEmptyString = (str) => typeof str === "string" && str.length > 0;
    if (nonEmptyString(functionName) && nonEmptyString(traceId)) {
        request.headers[TRACE_ID_HEADER_NAME] = traceId;
    }
    return next({
        ...args,
        request,
    });
};
const addRecursionDetectionMiddlewareOptions = {
    step: "build",
    tags: ["RECURSION_DETECTION"],
    name: "recursionDetectionMiddleware",
    override: true,
    priority: "low",
};
const getRecursionDetectionPlugin = (options) => ({
    applyToStack: (clientStack) => {
        clientStack.add(recursionDetectionMiddleware(options), addRecursionDetectionMiddlewareOptions);
    },
});


/***/ }),

/***/ "../../node_modules/@aws-sdk/middleware-signing/dist-es/awsAuthConfiguration.js":
/*!**************************************************************************************!*\
  !*** ../../node_modules/@aws-sdk/middleware-signing/dist-es/awsAuthConfiguration.js ***!
  \**************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   resolveAwsAuthConfig: () => (/* binding */ resolveAwsAuthConfig),
/* harmony export */   resolveSigV4AuthConfig: () => (/* binding */ resolveSigV4AuthConfig)
/* harmony export */ });
/* harmony import */ var _smithy_property_provider__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @smithy/property-provider */ "../../node_modules/@smithy/property-provider/dist-es/index.js");
/* harmony import */ var _smithy_signature_v4__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @smithy/signature-v4 */ "../../node_modules/@smithy/signature-v4/dist-es/index.js");
/* harmony import */ var _smithy_util_middleware__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @smithy/util-middleware */ "../../node_modules/@smithy/util-middleware/dist-es/index.js");



const CREDENTIAL_EXPIRE_WINDOW = 300000;
const resolveAwsAuthConfig = (input) => {
    const normalizedCreds = input.credentials
        ? normalizeCredentialProvider(input.credentials)
        : input.credentialDefaultProvider(Object.assign({}, input, {
            parentClientConfig: input,
        }));
    const { signingEscapePath = true, systemClockOffset = input.systemClockOffset || 0, sha256 } = input;
    let signer;
    if (input.signer) {
        signer = (0,_smithy_util_middleware__WEBPACK_IMPORTED_MODULE_2__.normalizeProvider)(input.signer);
    }
    else if (input.regionInfoProvider) {
        signer = () => (0,_smithy_util_middleware__WEBPACK_IMPORTED_MODULE_2__.normalizeProvider)(input.region)()
            .then(async (region) => [
            (await input.regionInfoProvider(region, {
                useFipsEndpoint: await input.useFipsEndpoint(),
                useDualstackEndpoint: await input.useDualstackEndpoint(),
            })) || {},
            region,
        ])
            .then(([regionInfo, region]) => {
            const { signingRegion, signingService } = regionInfo;
            input.signingRegion = input.signingRegion || signingRegion || region;
            input.signingName = input.signingName || signingService || input.serviceId;
            const params = {
                ...input,
                credentials: normalizedCreds,
                region: input.signingRegion,
                service: input.signingName,
                sha256,
                uriEscapePath: signingEscapePath,
            };
            const SignerCtor = input.signerConstructor || _smithy_signature_v4__WEBPACK_IMPORTED_MODULE_1__.SignatureV4;
            return new SignerCtor(params);
        });
    }
    else {
        signer = async (authScheme) => {
            authScheme = Object.assign({}, {
                name: "sigv4",
                signingName: input.signingName || input.defaultSigningName,
                signingRegion: await (0,_smithy_util_middleware__WEBPACK_IMPORTED_MODULE_2__.normalizeProvider)(input.region)(),
                properties: {},
            }, authScheme);
            const isSigv4a = authScheme?.name === "sigv4a";
            const signingRegion = authScheme.signingRegion;
            const signingService = authScheme.signingName;
            let regionForSigner;
            if (isSigv4a) {
                regionForSigner = input.signingRegion || signingRegion;
            }
            else {
                input.signingRegion = input.signingRegion || signingRegion;
                regionForSigner = input.signingRegion;
            }
            input.signingName = input.signingName || signingService || input.serviceId;
            const params = {
                ...input,
                credentials: normalizedCreds,
                region: regionForSigner,
                service: input.signingName,
                sha256,
                uriEscapePath: signingEscapePath,
            };
            const SignerCtor = input.signerConstructor || _smithy_signature_v4__WEBPACK_IMPORTED_MODULE_1__.SignatureV4;
            return new SignerCtor(params);
        };
    }
    return {
        ...input,
        systemClockOffset,
        signingEscapePath,
        credentials: normalizedCreds,
        signer,
    };
};
const resolveSigV4AuthConfig = (input) => {
    const normalizedCreds = input.credentials
        ? normalizeCredentialProvider(input.credentials)
        : input.credentialDefaultProvider(Object.assign({}, input, {
            parentClientConfig: input,
        }));
    const { signingEscapePath = true, systemClockOffset = input.systemClockOffset || 0, sha256 } = input;
    let signer;
    if (input.signer) {
        signer = (0,_smithy_util_middleware__WEBPACK_IMPORTED_MODULE_2__.normalizeProvider)(input.signer);
    }
    else {
        signer = (0,_smithy_util_middleware__WEBPACK_IMPORTED_MODULE_2__.normalizeProvider)(new _smithy_signature_v4__WEBPACK_IMPORTED_MODULE_1__.SignatureV4({
            credentials: normalizedCreds,
            region: input.region,
            service: input.signingName,
            sha256,
            uriEscapePath: signingEscapePath,
        }));
    }
    return {
        ...input,
        systemClockOffset,
        signingEscapePath,
        credentials: normalizedCreds,
        signer,
    };
};
const normalizeCredentialProvider = (credentials) => {
    if (typeof credentials === "function") {
        return (0,_smithy_property_provider__WEBPACK_IMPORTED_MODULE_0__.memoize)(credentials, (credentials) => credentials.expiration !== undefined &&
            credentials.expiration.getTime() - Date.now() < CREDENTIAL_EXPIRE_WINDOW, (credentials) => credentials.expiration !== undefined);
    }
    return (0,_smithy_util_middleware__WEBPACK_IMPORTED_MODULE_2__.normalizeProvider)(credentials);
};


/***/ }),

/***/ "../../node_modules/@aws-sdk/middleware-signing/dist-es/awsAuthMiddleware.js":
/*!***********************************************************************************!*\
  !*** ../../node_modules/@aws-sdk/middleware-signing/dist-es/awsAuthMiddleware.js ***!
  \***********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   awsAuthMiddleware: () => (/* binding */ awsAuthMiddleware),
/* harmony export */   awsAuthMiddlewareOptions: () => (/* binding */ awsAuthMiddlewareOptions),
/* harmony export */   getAwsAuthPlugin: () => (/* binding */ getAwsAuthPlugin),
/* harmony export */   getSigV4AuthPlugin: () => (/* binding */ getSigV4AuthPlugin)
/* harmony export */ });
/* harmony import */ var _smithy_protocol_http__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @smithy/protocol-http */ "../../node_modules/@smithy/protocol-http/dist-es/index.js");
/* harmony import */ var _utils_getSkewCorrectedDate__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils/getSkewCorrectedDate */ "../../node_modules/@aws-sdk/middleware-signing/dist-es/utils/getSkewCorrectedDate.js");
/* harmony import */ var _utils_getUpdatedSystemClockOffset__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils/getUpdatedSystemClockOffset */ "../../node_modules/@aws-sdk/middleware-signing/dist-es/utils/getUpdatedSystemClockOffset.js");



const awsAuthMiddleware = (options) => (next, context) => async function (args) {
    if (!_smithy_protocol_http__WEBPACK_IMPORTED_MODULE_0__.HttpRequest.isInstance(args.request))
        return next(args);
    let authScheme;
    let signer;
    const firstAuthScheme = context.endpointV2?.properties?.authSchemes?.[0];
    const secondAuthScheme = context.endpointV2?.properties?.authSchemes?.[1];
    const firstAuthSchemeIsSigv4a = firstAuthScheme?.name === "sigv4a";
    if (firstAuthSchemeIsSigv4a && secondAuthScheme) {
        signer = await options.signer((authScheme = firstAuthScheme));
        const uncheckedSigner = signer;
        const sigv4aAvailable = (() => {
            if (typeof uncheckedSigner?.getSigv4aSigner === "function") {
                if (uncheckedSigner?.signerOptions?.runtime !== "node") {
                    return false;
                }
                try {
                    uncheckedSigner.getSigv4aSigner();
                    return true;
                }
                catch (e) { }
            }
            return false;
        })();
        if (!sigv4aAvailable) {
            signer = await options.signer((authScheme = secondAuthScheme));
        }
    }
    else {
        signer = await options.signer((authScheme = firstAuthScheme));
    }
    let signedRequest;
    const multiRegionOverride = authScheme?.name === "sigv4a" ? authScheme?.signingRegionSet?.join(",") : undefined;
    const signingOptions = {
        signingDate: (0,_utils_getSkewCorrectedDate__WEBPACK_IMPORTED_MODULE_1__.getSkewCorrectedDate)(options.systemClockOffset),
        signingRegion: multiRegionOverride || context["signing_region"],
        signingService: context["signing_service"],
    };
    if (context.s3ExpressIdentity) {
        const sigV4MultiRegion = signer;
        signedRequest = await sigV4MultiRegion.signWithCredentials(args.request, context.s3ExpressIdentity, signingOptions);
        if (signedRequest.headers["X-Amz-Security-Token"] || signedRequest.headers["x-amz-security-token"]) {
            throw new Error("X-Amz-Security-Token must not be set for s3-express requests.");
        }
    }
    else {
        signedRequest = await signer.sign(args.request, signingOptions);
    }
    const output = await next({
        ...args,
        request: signedRequest,
    }).catch((error) => {
        const serverTime = error.ServerTime ?? getDateHeader(error.$response);
        if (serverTime) {
            options.systemClockOffset = (0,_utils_getUpdatedSystemClockOffset__WEBPACK_IMPORTED_MODULE_2__.getUpdatedSystemClockOffset)(serverTime, options.systemClockOffset);
        }
        throw error;
    });
    const dateHeader = getDateHeader(output.response);
    if (dateHeader) {
        options.systemClockOffset = (0,_utils_getUpdatedSystemClockOffset__WEBPACK_IMPORTED_MODULE_2__.getUpdatedSystemClockOffset)(dateHeader, options.systemClockOffset);
    }
    return output;
};
const getDateHeader = (response) => _smithy_protocol_http__WEBPACK_IMPORTED_MODULE_0__.HttpResponse.isInstance(response) ? response.headers?.date ?? response.headers?.Date : undefined;
const awsAuthMiddlewareOptions = {
    name: "awsAuthMiddleware",
    tags: ["SIGNATURE", "AWSAUTH"],
    relation: "after",
    toMiddleware: "retryMiddleware",
    override: true,
};
const getAwsAuthPlugin = (options) => ({
    applyToStack: (clientStack) => {
        clientStack.addRelativeTo(awsAuthMiddleware(options), awsAuthMiddlewareOptions);
    },
});
const getSigV4AuthPlugin = getAwsAuthPlugin;


/***/ }),

/***/ "../../node_modules/@aws-sdk/middleware-signing/dist-es/index.js":
/*!***********************************************************************!*\
  !*** ../../node_modules/@aws-sdk/middleware-signing/dist-es/index.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   awsAuthMiddleware: () => (/* reexport safe */ _awsAuthMiddleware__WEBPACK_IMPORTED_MODULE_1__.awsAuthMiddleware),
/* harmony export */   awsAuthMiddlewareOptions: () => (/* reexport safe */ _awsAuthMiddleware__WEBPACK_IMPORTED_MODULE_1__.awsAuthMiddlewareOptions),
/* harmony export */   getAwsAuthPlugin: () => (/* reexport safe */ _awsAuthMiddleware__WEBPACK_IMPORTED_MODULE_1__.getAwsAuthPlugin),
/* harmony export */   getSigV4AuthPlugin: () => (/* reexport safe */ _awsAuthMiddleware__WEBPACK_IMPORTED_MODULE_1__.getSigV4AuthPlugin),
/* harmony export */   resolveAwsAuthConfig: () => (/* reexport safe */ _awsAuthConfiguration__WEBPACK_IMPORTED_MODULE_0__.resolveAwsAuthConfig),
/* harmony export */   resolveSigV4AuthConfig: () => (/* reexport safe */ _awsAuthConfiguration__WEBPACK_IMPORTED_MODULE_0__.resolveSigV4AuthConfig)
/* harmony export */ });
/* harmony import */ var _awsAuthConfiguration__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./awsAuthConfiguration */ "../../node_modules/@aws-sdk/middleware-signing/dist-es/awsAuthConfiguration.js");
/* harmony import */ var _awsAuthMiddleware__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./awsAuthMiddleware */ "../../node_modules/@aws-sdk/middleware-signing/dist-es/awsAuthMiddleware.js");




/***/ }),

/***/ "../../node_modules/@aws-sdk/middleware-signing/dist-es/utils/getSkewCorrectedDate.js":
/*!********************************************************************************************!*\
  !*** ../../node_modules/@aws-sdk/middleware-signing/dist-es/utils/getSkewCorrectedDate.js ***!
  \********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getSkewCorrectedDate: () => (/* binding */ getSkewCorrectedDate)
/* harmony export */ });
const getSkewCorrectedDate = (systemClockOffset) => new Date(Date.now() + systemClockOffset);


/***/ }),

/***/ "../../node_modules/@aws-sdk/middleware-signing/dist-es/utils/getUpdatedSystemClockOffset.js":
/*!***************************************************************************************************!*\
  !*** ../../node_modules/@aws-sdk/middleware-signing/dist-es/utils/getUpdatedSystemClockOffset.js ***!
  \***************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getUpdatedSystemClockOffset: () => (/* binding */ getUpdatedSystemClockOffset)
/* harmony export */ });
/* harmony import */ var _isClockSkewed__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./isClockSkewed */ "../../node_modules/@aws-sdk/middleware-signing/dist-es/utils/isClockSkewed.js");

const getUpdatedSystemClockOffset = (clockTime, currentSystemClockOffset) => {
    const clockTimeInMs = Date.parse(clockTime);
    if ((0,_isClockSkewed__WEBPACK_IMPORTED_MODULE_0__.isClockSkewed)(clockTimeInMs, currentSystemClockOffset)) {
        return clockTimeInMs - Date.now();
    }
    return currentSystemClockOffset;
};


/***/ }),

/***/ "../../node_modules/@aws-sdk/middleware-signing/dist-es/utils/isClockSkewed.js":
/*!*************************************************************************************!*\
  !*** ../../node_modules/@aws-sdk/middleware-signing/dist-es/utils/isClockSkewed.js ***!
  \*************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   isClockSkewed: () => (/* binding */ isClockSkewed)
/* harmony export */ });
/* harmony import */ var _getSkewCorrectedDate__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getSkewCorrectedDate */ "../../node_modules/@aws-sdk/middleware-signing/dist-es/utils/getSkewCorrectedDate.js");

const isClockSkewed = (clockTime, systemClockOffset) => Math.abs((0,_getSkewCorrectedDate__WEBPACK_IMPORTED_MODULE_0__.getSkewCorrectedDate)(systemClockOffset).getTime() - clockTime) >= 300000;


/***/ }),

/***/ "../../node_modules/@aws-sdk/middleware-user-agent/dist-es/configurations.js":
/*!***********************************************************************************!*\
  !*** ../../node_modules/@aws-sdk/middleware-user-agent/dist-es/configurations.js ***!
  \***********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   resolveUserAgentConfig: () => (/* binding */ resolveUserAgentConfig)
/* harmony export */ });
function resolveUserAgentConfig(input) {
    return {
        ...input,
        customUserAgent: typeof input.customUserAgent === "string" ? [[input.customUserAgent]] : input.customUserAgent,
    };
}


/***/ }),

/***/ "../../node_modules/@aws-sdk/middleware-user-agent/dist-es/constants.js":
/*!******************************************************************************!*\
  !*** ../../node_modules/@aws-sdk/middleware-user-agent/dist-es/constants.js ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SPACE: () => (/* binding */ SPACE),
/* harmony export */   UA_ESCAPE_CHAR: () => (/* binding */ UA_ESCAPE_CHAR),
/* harmony export */   UA_NAME_ESCAPE_REGEX: () => (/* binding */ UA_NAME_ESCAPE_REGEX),
/* harmony export */   UA_NAME_SEPARATOR: () => (/* binding */ UA_NAME_SEPARATOR),
/* harmony export */   UA_VALUE_ESCAPE_REGEX: () => (/* binding */ UA_VALUE_ESCAPE_REGEX),
/* harmony export */   USER_AGENT: () => (/* binding */ USER_AGENT),
/* harmony export */   X_AMZ_USER_AGENT: () => (/* binding */ X_AMZ_USER_AGENT)
/* harmony export */ });
const USER_AGENT = "user-agent";
const X_AMZ_USER_AGENT = "x-amz-user-agent";
const SPACE = " ";
const UA_NAME_SEPARATOR = "/";
const UA_NAME_ESCAPE_REGEX = /[^\!\$\%\&\'\*\+\-\.\^\_\`\|\~\d\w]/g;
const UA_VALUE_ESCAPE_REGEX = /[^\!\$\%\&\'\*\+\-\.\^\_\`\|\~\d\w\#]/g;
const UA_ESCAPE_CHAR = "-";


/***/ }),

/***/ "../../node_modules/@aws-sdk/middleware-user-agent/dist-es/index.js":
/*!**************************************************************************!*\
  !*** ../../node_modules/@aws-sdk/middleware-user-agent/dist-es/index.js ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getUserAgentMiddlewareOptions: () => (/* reexport safe */ _user_agent_middleware__WEBPACK_IMPORTED_MODULE_1__.getUserAgentMiddlewareOptions),
/* harmony export */   getUserAgentPlugin: () => (/* reexport safe */ _user_agent_middleware__WEBPACK_IMPORTED_MODULE_1__.getUserAgentPlugin),
/* harmony export */   resolveUserAgentConfig: () => (/* reexport safe */ _configurations__WEBPACK_IMPORTED_MODULE_0__.resolveUserAgentConfig),
/* harmony export */   userAgentMiddleware: () => (/* reexport safe */ _user_agent_middleware__WEBPACK_IMPORTED_MODULE_1__.userAgentMiddleware)
/* harmony export */ });
/* harmony import */ var _configurations__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./configurations */ "../../node_modules/@aws-sdk/middleware-user-agent/dist-es/configurations.js");
/* harmony import */ var _user_agent_middleware__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./user-agent-middleware */ "../../node_modules/@aws-sdk/middleware-user-agent/dist-es/user-agent-middleware.js");




/***/ }),

/***/ "../../node_modules/@aws-sdk/middleware-user-agent/dist-es/user-agent-middleware.js":
/*!******************************************************************************************!*\
  !*** ../../node_modules/@aws-sdk/middleware-user-agent/dist-es/user-agent-middleware.js ***!
  \******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getUserAgentMiddlewareOptions: () => (/* binding */ getUserAgentMiddlewareOptions),
/* harmony export */   getUserAgentPlugin: () => (/* binding */ getUserAgentPlugin),
/* harmony export */   userAgentMiddleware: () => (/* binding */ userAgentMiddleware)
/* harmony export */ });
/* harmony import */ var _aws_sdk_util_endpoints__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @aws-sdk/util-endpoints */ "../../node_modules/@aws-sdk/util-endpoints/dist-es/index.js");
/* harmony import */ var _smithy_protocol_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @smithy/protocol-http */ "../../node_modules/@smithy/protocol-http/dist-es/index.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./constants */ "../../node_modules/@aws-sdk/middleware-user-agent/dist-es/constants.js");



const userAgentMiddleware = (options) => (next, context) => async (args) => {
    const { request } = args;
    if (!_smithy_protocol_http__WEBPACK_IMPORTED_MODULE_1__.HttpRequest.isInstance(request))
        return next(args);
    const { headers } = request;
    const userAgent = context?.userAgent?.map(escapeUserAgent) || [];
    const defaultUserAgent = (await options.defaultUserAgentProvider()).map(escapeUserAgent);
    const customUserAgent = options?.customUserAgent?.map(escapeUserAgent) || [];
    const prefix = (0,_aws_sdk_util_endpoints__WEBPACK_IMPORTED_MODULE_0__.getUserAgentPrefix)();
    const sdkUserAgentValue = (prefix ? [prefix] : [])
        .concat([...defaultUserAgent, ...userAgent, ...customUserAgent])
        .join(_constants__WEBPACK_IMPORTED_MODULE_2__.SPACE);
    const normalUAValue = [
        ...defaultUserAgent.filter((section) => section.startsWith("aws-sdk-")),
        ...customUserAgent,
    ].join(_constants__WEBPACK_IMPORTED_MODULE_2__.SPACE);
    if (options.runtime !== "browser") {
        if (normalUAValue) {
            headers[_constants__WEBPACK_IMPORTED_MODULE_2__.X_AMZ_USER_AGENT] = headers[_constants__WEBPACK_IMPORTED_MODULE_2__.X_AMZ_USER_AGENT]
                ? `${headers[_constants__WEBPACK_IMPORTED_MODULE_2__.USER_AGENT]} ${normalUAValue}`
                : normalUAValue;
        }
        headers[_constants__WEBPACK_IMPORTED_MODULE_2__.USER_AGENT] = sdkUserAgentValue;
    }
    else {
        headers[_constants__WEBPACK_IMPORTED_MODULE_2__.X_AMZ_USER_AGENT] = sdkUserAgentValue;
    }
    return next({
        ...args,
        request,
    });
};
const escapeUserAgent = (userAgentPair) => {
    const name = userAgentPair[0]
        .split(_constants__WEBPACK_IMPORTED_MODULE_2__.UA_NAME_SEPARATOR)
        .map((part) => part.replace(_constants__WEBPACK_IMPORTED_MODULE_2__.UA_NAME_ESCAPE_REGEX, _constants__WEBPACK_IMPORTED_MODULE_2__.UA_ESCAPE_CHAR))
        .join(_constants__WEBPACK_IMPORTED_MODULE_2__.UA_NAME_SEPARATOR);
    const version = userAgentPair[1]?.replace(_constants__WEBPACK_IMPORTED_MODULE_2__.UA_VALUE_ESCAPE_REGEX, _constants__WEBPACK_IMPORTED_MODULE_2__.UA_ESCAPE_CHAR);
    const prefixSeparatorIndex = name.indexOf(_constants__WEBPACK_IMPORTED_MODULE_2__.UA_NAME_SEPARATOR);
    const prefix = name.substring(0, prefixSeparatorIndex);
    let uaName = name.substring(prefixSeparatorIndex + 1);
    if (prefix === "api") {
        uaName = uaName.toLowerCase();
    }
    return [prefix, uaName, version]
        .filter((item) => item && item.length > 0)
        .reduce((acc, item, index) => {
        switch (index) {
            case 0:
                return item;
            case 1:
                return `${acc}/${item}`;
            default:
                return `${acc}#${item}`;
        }
    }, "");
};
const getUserAgentMiddlewareOptions = {
    name: "getUserAgentMiddleware",
    step: "build",
    priority: "low",
    tags: ["SET_USER_AGENT", "USER_AGENT"],
    override: true,
};
const getUserAgentPlugin = (config) => ({
    applyToStack: (clientStack) => {
        clientStack.add(userAgentMiddleware(config), getUserAgentMiddlewareOptions);
    },
});


/***/ }),

/***/ "../../node_modules/@aws-sdk/region-config-resolver/dist-es/extensions/index.js":
/*!**************************************************************************************!*\
  !*** ../../node_modules/@aws-sdk/region-config-resolver/dist-es/extensions/index.js ***!
  \**************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getAwsRegionExtensionConfiguration: () => (/* binding */ getAwsRegionExtensionConfiguration),
/* harmony export */   resolveAwsRegionExtensionConfiguration: () => (/* binding */ resolveAwsRegionExtensionConfiguration)
/* harmony export */ });
const getAwsRegionExtensionConfiguration = (runtimeConfig) => {
    let runtimeConfigRegion = async () => {
        if (runtimeConfig.region === undefined) {
            throw new Error("Region is missing from runtimeConfig");
        }
        const region = runtimeConfig.region;
        if (typeof region === "string") {
            return region;
        }
        return region();
    };
    return {
        setRegion(region) {
            runtimeConfigRegion = region;
        },
        region() {
            return runtimeConfigRegion;
        },
    };
};
const resolveAwsRegionExtensionConfiguration = (awsRegionExtensionConfiguration) => {
    return {
        region: awsRegionExtensionConfiguration.region(),
    };
};


/***/ }),

/***/ "../../node_modules/@aws-sdk/region-config-resolver/dist-es/index.js":
/*!***************************************************************************!*\
  !*** ../../node_modules/@aws-sdk/region-config-resolver/dist-es/index.js ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   NODE_REGION_CONFIG_FILE_OPTIONS: () => (/* reexport safe */ _regionConfig__WEBPACK_IMPORTED_MODULE_1__.NODE_REGION_CONFIG_FILE_OPTIONS),
/* harmony export */   NODE_REGION_CONFIG_OPTIONS: () => (/* reexport safe */ _regionConfig__WEBPACK_IMPORTED_MODULE_1__.NODE_REGION_CONFIG_OPTIONS),
/* harmony export */   REGION_ENV_NAME: () => (/* reexport safe */ _regionConfig__WEBPACK_IMPORTED_MODULE_1__.REGION_ENV_NAME),
/* harmony export */   REGION_INI_NAME: () => (/* reexport safe */ _regionConfig__WEBPACK_IMPORTED_MODULE_1__.REGION_INI_NAME),
/* harmony export */   getAwsRegionExtensionConfiguration: () => (/* reexport safe */ _extensions__WEBPACK_IMPORTED_MODULE_0__.getAwsRegionExtensionConfiguration),
/* harmony export */   resolveAwsRegionExtensionConfiguration: () => (/* reexport safe */ _extensions__WEBPACK_IMPORTED_MODULE_0__.resolveAwsRegionExtensionConfiguration),
/* harmony export */   resolveRegionConfig: () => (/* reexport safe */ _regionConfig__WEBPACK_IMPORTED_MODULE_1__.resolveRegionConfig)
/* harmony export */ });
/* harmony import */ var _extensions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./extensions */ "../../node_modules/@aws-sdk/region-config-resolver/dist-es/extensions/index.js");
/* harmony import */ var _regionConfig__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./regionConfig */ "../../node_modules/@aws-sdk/region-config-resolver/dist-es/regionConfig/index.js");




/***/ }),

/***/ "../../node_modules/@aws-sdk/region-config-resolver/dist-es/regionConfig/config.js":
/*!*****************************************************************************************!*\
  !*** ../../node_modules/@aws-sdk/region-config-resolver/dist-es/regionConfig/config.js ***!
  \*****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   NODE_REGION_CONFIG_FILE_OPTIONS: () => (/* binding */ NODE_REGION_CONFIG_FILE_OPTIONS),
/* harmony export */   NODE_REGION_CONFIG_OPTIONS: () => (/* binding */ NODE_REGION_CONFIG_OPTIONS),
/* harmony export */   REGION_ENV_NAME: () => (/* binding */ REGION_ENV_NAME),
/* harmony export */   REGION_INI_NAME: () => (/* binding */ REGION_INI_NAME)
/* harmony export */ });
const REGION_ENV_NAME = "AWS_REGION";
const REGION_INI_NAME = "region";
const NODE_REGION_CONFIG_OPTIONS = {
    environmentVariableSelector: (env) => env[REGION_ENV_NAME],
    configFileSelector: (profile) => profile[REGION_INI_NAME],
    default: () => {
        throw new Error("Region is missing");
    },
};
const NODE_REGION_CONFIG_FILE_OPTIONS = {
    preferredFile: "credentials",
};


/***/ }),

/***/ "../../node_modules/@aws-sdk/region-config-resolver/dist-es/regionConfig/getRealRegion.js":
/*!************************************************************************************************!*\
  !*** ../../node_modules/@aws-sdk/region-config-resolver/dist-es/regionConfig/getRealRegion.js ***!
  \************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getRealRegion: () => (/* binding */ getRealRegion)
/* harmony export */ });
/* harmony import */ var _isFipsRegion__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./isFipsRegion */ "../../node_modules/@aws-sdk/region-config-resolver/dist-es/regionConfig/isFipsRegion.js");

const getRealRegion = (region) => (0,_isFipsRegion__WEBPACK_IMPORTED_MODULE_0__.isFipsRegion)(region)
    ? ["fips-aws-global", "aws-fips"].includes(region)
        ? "us-east-1"
        : region.replace(/fips-(dkr-|prod-)?|-fips/, "")
    : region;


/***/ }),

/***/ "../../node_modules/@aws-sdk/region-config-resolver/dist-es/regionConfig/index.js":
/*!****************************************************************************************!*\
  !*** ../../node_modules/@aws-sdk/region-config-resolver/dist-es/regionConfig/index.js ***!
  \****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   NODE_REGION_CONFIG_FILE_OPTIONS: () => (/* reexport safe */ _config__WEBPACK_IMPORTED_MODULE_0__.NODE_REGION_CONFIG_FILE_OPTIONS),
/* harmony export */   NODE_REGION_CONFIG_OPTIONS: () => (/* reexport safe */ _config__WEBPACK_IMPORTED_MODULE_0__.NODE_REGION_CONFIG_OPTIONS),
/* harmony export */   REGION_ENV_NAME: () => (/* reexport safe */ _config__WEBPACK_IMPORTED_MODULE_0__.REGION_ENV_NAME),
/* harmony export */   REGION_INI_NAME: () => (/* reexport safe */ _config__WEBPACK_IMPORTED_MODULE_0__.REGION_INI_NAME),
/* harmony export */   resolveRegionConfig: () => (/* reexport safe */ _resolveRegionConfig__WEBPACK_IMPORTED_MODULE_1__.resolveRegionConfig)
/* harmony export */ });
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./config */ "../../node_modules/@aws-sdk/region-config-resolver/dist-es/regionConfig/config.js");
/* harmony import */ var _resolveRegionConfig__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./resolveRegionConfig */ "../../node_modules/@aws-sdk/region-config-resolver/dist-es/regionConfig/resolveRegionConfig.js");




/***/ }),

/***/ "../../node_modules/@aws-sdk/region-config-resolver/dist-es/regionConfig/isFipsRegion.js":
/*!***********************************************************************************************!*\
  !*** ../../node_modules/@aws-sdk/region-config-resolver/dist-es/regionConfig/isFipsRegion.js ***!
  \***********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   isFipsRegion: () => (/* binding */ isFipsRegion)
/* harmony export */ });
const isFipsRegion = (region) => typeof region === "string" && (region.startsWith("fips-") || region.endsWith("-fips"));


/***/ }),

/***/ "../../node_modules/@aws-sdk/region-config-resolver/dist-es/regionConfig/resolveRegionConfig.js":
/*!******************************************************************************************************!*\
  !*** ../../node_modules/@aws-sdk/region-config-resolver/dist-es/regionConfig/resolveRegionConfig.js ***!
  \******************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   resolveRegionConfig: () => (/* binding */ resolveRegionConfig)
/* harmony export */ });
/* harmony import */ var _getRealRegion__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getRealRegion */ "../../node_modules/@aws-sdk/region-config-resolver/dist-es/regionConfig/getRealRegion.js");
/* harmony import */ var _isFipsRegion__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./isFipsRegion */ "../../node_modules/@aws-sdk/region-config-resolver/dist-es/regionConfig/isFipsRegion.js");


const resolveRegionConfig = (input) => {
    const { region, useFipsEndpoint } = input;
    if (!region) {
        throw new Error("Region is missing");
    }
    return {
        ...input,
        region: async () => {
            if (typeof region === "string") {
                return (0,_getRealRegion__WEBPACK_IMPORTED_MODULE_0__.getRealRegion)(region);
            }
            const providedRegion = await region();
            return (0,_getRealRegion__WEBPACK_IMPORTED_MODULE_0__.getRealRegion)(providedRegion);
        },
        useFipsEndpoint: async () => {
            const providedRegion = typeof region === "string" ? region : await region();
            if ((0,_isFipsRegion__WEBPACK_IMPORTED_MODULE_1__.isFipsRegion)(providedRegion)) {
                return true;
            }
            return typeof useFipsEndpoint !== "function" ? Promise.resolve(!!useFipsEndpoint) : useFipsEndpoint();
        },
    };
};


/***/ }),

/***/ "../../node_modules/@aws-sdk/util-endpoints/dist-es/aws.js":
/*!*****************************************************************!*\
  !*** ../../node_modules/@aws-sdk/util-endpoints/dist-es/aws.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   awsEndpointFunctions: () => (/* binding */ awsEndpointFunctions)
/* harmony export */ });
/* harmony import */ var _smithy_util_endpoints__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @smithy/util-endpoints */ "../../node_modules/@smithy/util-endpoints/dist-es/index.js");
/* harmony import */ var _lib_aws_isVirtualHostableS3Bucket__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./lib/aws/isVirtualHostableS3Bucket */ "../../node_modules/@aws-sdk/util-endpoints/dist-es/lib/aws/isVirtualHostableS3Bucket.js");
/* harmony import */ var _lib_aws_parseArn__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./lib/aws/parseArn */ "../../node_modules/@aws-sdk/util-endpoints/dist-es/lib/aws/parseArn.js");
/* harmony import */ var _lib_aws_partition__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./lib/aws/partition */ "../../node_modules/@aws-sdk/util-endpoints/dist-es/lib/aws/partition.js");




const awsEndpointFunctions = {
    isVirtualHostableS3Bucket: _lib_aws_isVirtualHostableS3Bucket__WEBPACK_IMPORTED_MODULE_1__.isVirtualHostableS3Bucket,
    parseArn: _lib_aws_parseArn__WEBPACK_IMPORTED_MODULE_2__.parseArn,
    partition: _lib_aws_partition__WEBPACK_IMPORTED_MODULE_3__.partition,
};
_smithy_util_endpoints__WEBPACK_IMPORTED_MODULE_0__.customEndpointFunctions.aws = awsEndpointFunctions;


/***/ }),

/***/ "../../node_modules/@aws-sdk/util-endpoints/dist-es/index.js":
/*!*******************************************************************!*\
  !*** ../../node_modules/@aws-sdk/util-endpoints/dist-es/index.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   EndpointError: () => (/* reexport safe */ _types__WEBPACK_IMPORTED_MODULE_4__.EndpointError),
/* harmony export */   awsEndpointFunctions: () => (/* reexport safe */ _aws__WEBPACK_IMPORTED_MODULE_0__.awsEndpointFunctions),
/* harmony export */   getUserAgentPrefix: () => (/* reexport safe */ _lib_aws_partition__WEBPACK_IMPORTED_MODULE_1__.getUserAgentPrefix),
/* harmony export */   isIpAddress: () => (/* reexport safe */ _lib_isIpAddress__WEBPACK_IMPORTED_MODULE_2__.isIpAddress),
/* harmony export */   partition: () => (/* reexport safe */ _lib_aws_partition__WEBPACK_IMPORTED_MODULE_1__.partition),
/* harmony export */   resolveEndpoint: () => (/* reexport safe */ _resolveEndpoint__WEBPACK_IMPORTED_MODULE_3__.resolveEndpoint),
/* harmony export */   setPartitionInfo: () => (/* reexport safe */ _lib_aws_partition__WEBPACK_IMPORTED_MODULE_1__.setPartitionInfo),
/* harmony export */   useDefaultPartitionInfo: () => (/* reexport safe */ _lib_aws_partition__WEBPACK_IMPORTED_MODULE_1__.useDefaultPartitionInfo)
/* harmony export */ });
/* harmony import */ var _aws__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./aws */ "../../node_modules/@aws-sdk/util-endpoints/dist-es/aws.js");
/* harmony import */ var _lib_aws_partition__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./lib/aws/partition */ "../../node_modules/@aws-sdk/util-endpoints/dist-es/lib/aws/partition.js");
/* harmony import */ var _lib_isIpAddress__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./lib/isIpAddress */ "../../node_modules/@aws-sdk/util-endpoints/dist-es/lib/isIpAddress.js");
/* harmony import */ var _resolveEndpoint__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./resolveEndpoint */ "../../node_modules/@aws-sdk/util-endpoints/dist-es/resolveEndpoint.js");
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./types */ "../../node_modules/@aws-sdk/util-endpoints/dist-es/types/index.js");







/***/ }),

/***/ "../../node_modules/@aws-sdk/util-endpoints/dist-es/lib/aws/isVirtualHostableS3Bucket.js":
/*!***********************************************************************************************!*\
  !*** ../../node_modules/@aws-sdk/util-endpoints/dist-es/lib/aws/isVirtualHostableS3Bucket.js ***!
  \***********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   isVirtualHostableS3Bucket: () => (/* binding */ isVirtualHostableS3Bucket)
/* harmony export */ });
/* harmony import */ var _smithy_util_endpoints__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @smithy/util-endpoints */ "../../node_modules/@smithy/util-endpoints/dist-es/index.js");
/* harmony import */ var _isIpAddress__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../isIpAddress */ "../../node_modules/@aws-sdk/util-endpoints/dist-es/lib/isIpAddress.js");


const isVirtualHostableS3Bucket = (value, allowSubDomains = false) => {
    if (allowSubDomains) {
        for (const label of value.split(".")) {
            if (!isVirtualHostableS3Bucket(label)) {
                return false;
            }
        }
        return true;
    }
    if (!(0,_smithy_util_endpoints__WEBPACK_IMPORTED_MODULE_0__.isValidHostLabel)(value)) {
        return false;
    }
    if (value.length < 3 || value.length > 63) {
        return false;
    }
    if (value !== value.toLowerCase()) {
        return false;
    }
    if ((0,_isIpAddress__WEBPACK_IMPORTED_MODULE_1__.isIpAddress)(value)) {
        return false;
    }
    return true;
};


/***/ }),

/***/ "../../node_modules/@aws-sdk/util-endpoints/dist-es/lib/aws/parseArn.js":
/*!******************************************************************************!*\
  !*** ../../node_modules/@aws-sdk/util-endpoints/dist-es/lib/aws/parseArn.js ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   parseArn: () => (/* binding */ parseArn)
/* harmony export */ });
const parseArn = (value) => {
    const segments = value.split(":");
    if (segments.length < 6)
        return null;
    const [arn, partition, service, region, accountId, ...resourceId] = segments;
    if (arn !== "arn" || partition === "" || service === "" || resourceId[0] === "")
        return null;
    return {
        partition,
        service,
        region,
        accountId,
        resourceId: resourceId[0].includes("/") ? resourceId[0].split("/") : resourceId,
    };
};


/***/ }),

/***/ "../../node_modules/@aws-sdk/util-endpoints/dist-es/lib/aws/partition.js":
/*!*******************************************************************************!*\
  !*** ../../node_modules/@aws-sdk/util-endpoints/dist-es/lib/aws/partition.js ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getUserAgentPrefix: () => (/* binding */ getUserAgentPrefix),
/* harmony export */   partition: () => (/* binding */ partition),
/* harmony export */   setPartitionInfo: () => (/* binding */ setPartitionInfo),
/* harmony export */   useDefaultPartitionInfo: () => (/* binding */ useDefaultPartitionInfo)
/* harmony export */ });
/* harmony import */ var _partitions_json__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./partitions.json */ "../../node_modules/@aws-sdk/util-endpoints/dist-es/lib/aws/partitions.json");

let selectedPartitionsInfo = _partitions_json__WEBPACK_IMPORTED_MODULE_0__;
let selectedUserAgentPrefix = "";
const partition = (value) => {
    const { partitions } = selectedPartitionsInfo;
    for (const partition of partitions) {
        const { regions, outputs } = partition;
        for (const [region, regionData] of Object.entries(regions)) {
            if (region === value) {
                return {
                    ...outputs,
                    ...regionData,
                };
            }
        }
    }
    for (const partition of partitions) {
        const { regionRegex, outputs } = partition;
        if (new RegExp(regionRegex).test(value)) {
            return {
                ...outputs,
            };
        }
    }
    const DEFAULT_PARTITION = partitions.find((partition) => partition.id === "aws");
    if (!DEFAULT_PARTITION) {
        throw new Error("Provided region was not found in the partition array or regex," +
            " and default partition with id 'aws' doesn't exist.");
    }
    return {
        ...DEFAULT_PARTITION.outputs,
    };
};
const setPartitionInfo = (partitionsInfo, userAgentPrefix = "") => {
    selectedPartitionsInfo = partitionsInfo;
    selectedUserAgentPrefix = userAgentPrefix;
};
const useDefaultPartitionInfo = () => {
    setPartitionInfo(_partitions_json__WEBPACK_IMPORTED_MODULE_0__, "");
};
const getUserAgentPrefix = () => selectedUserAgentPrefix;


/***/ }),

/***/ "../../node_modules/@aws-sdk/util-endpoints/dist-es/lib/isIpAddress.js":
/*!*****************************************************************************!*\
  !*** ../../node_modules/@aws-sdk/util-endpoints/dist-es/lib/isIpAddress.js ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   isIpAddress: () => (/* reexport safe */ _smithy_util_endpoints__WEBPACK_IMPORTED_MODULE_0__.isIpAddress)
/* harmony export */ });
/* harmony import */ var _smithy_util_endpoints__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @smithy/util-endpoints */ "../../node_modules/@smithy/util-endpoints/dist-es/index.js");



/***/ }),

/***/ "../../node_modules/@aws-sdk/util-endpoints/dist-es/resolveEndpoint.js":
/*!*****************************************************************************!*\
  !*** ../../node_modules/@aws-sdk/util-endpoints/dist-es/resolveEndpoint.js ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   resolveEndpoint: () => (/* reexport safe */ _smithy_util_endpoints__WEBPACK_IMPORTED_MODULE_0__.resolveEndpoint)
/* harmony export */ });
/* harmony import */ var _smithy_util_endpoints__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @smithy/util-endpoints */ "../../node_modules/@smithy/util-endpoints/dist-es/index.js");



/***/ }),

/***/ "../../node_modules/@aws-sdk/util-endpoints/dist-es/types/EndpointError.js":
/*!*********************************************************************************!*\
  !*** ../../node_modules/@aws-sdk/util-endpoints/dist-es/types/EndpointError.js ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   EndpointError: () => (/* reexport safe */ _smithy_util_endpoints__WEBPACK_IMPORTED_MODULE_0__.EndpointError)
/* harmony export */ });
/* harmony import */ var _smithy_util_endpoints__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @smithy/util-endpoints */ "../../node_modules/@smithy/util-endpoints/dist-es/index.js");



/***/ }),

/***/ "../../node_modules/@aws-sdk/util-endpoints/dist-es/types/EndpointRuleObject.js":
/*!**************************************************************************************!*\
  !*** ../../node_modules/@aws-sdk/util-endpoints/dist-es/types/EndpointRuleObject.js ***!
  \**************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "../../node_modules/@aws-sdk/util-endpoints/dist-es/types/ErrorRuleObject.js":
/*!***********************************************************************************!*\
  !*** ../../node_modules/@aws-sdk/util-endpoints/dist-es/types/ErrorRuleObject.js ***!
  \***********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "../../node_modules/@aws-sdk/util-endpoints/dist-es/types/RuleSetObject.js":
/*!*********************************************************************************!*\
  !*** ../../node_modules/@aws-sdk/util-endpoints/dist-es/types/RuleSetObject.js ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "../../node_modules/@aws-sdk/util-endpoints/dist-es/types/TreeRuleObject.js":
/*!**********************************************************************************!*\
  !*** ../../node_modules/@aws-sdk/util-endpoints/dist-es/types/TreeRuleObject.js ***!
  \**********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "../../node_modules/@aws-sdk/util-endpoints/dist-es/types/index.js":
/*!*************************************************************************!*\
  !*** ../../node_modules/@aws-sdk/util-endpoints/dist-es/types/index.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   EndpointError: () => (/* reexport safe */ _EndpointError__WEBPACK_IMPORTED_MODULE_0__.EndpointError)
/* harmony export */ });
/* harmony import */ var _EndpointError__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./EndpointError */ "../../node_modules/@aws-sdk/util-endpoints/dist-es/types/EndpointError.js");
/* harmony import */ var _EndpointRuleObject__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./EndpointRuleObject */ "../../node_modules/@aws-sdk/util-endpoints/dist-es/types/EndpointRuleObject.js");
/* harmony import */ var _ErrorRuleObject__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ErrorRuleObject */ "../../node_modules/@aws-sdk/util-endpoints/dist-es/types/ErrorRuleObject.js");
/* harmony import */ var _RuleSetObject__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./RuleSetObject */ "../../node_modules/@aws-sdk/util-endpoints/dist-es/types/RuleSetObject.js");
/* harmony import */ var _TreeRuleObject__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./TreeRuleObject */ "../../node_modules/@aws-sdk/util-endpoints/dist-es/types/TreeRuleObject.js");
/* harmony import */ var _shared__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./shared */ "../../node_modules/@aws-sdk/util-endpoints/dist-es/types/shared.js");








/***/ }),

/***/ "../../node_modules/@aws-sdk/util-endpoints/dist-es/types/shared.js":
/*!**************************************************************************!*\
  !*** ../../node_modules/@aws-sdk/util-endpoints/dist-es/types/shared.js ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "../../node_modules/@aws-sdk/util-locate-window/dist-es/index.js":
/*!***********************************************************************!*\
  !*** ../../node_modules/@aws-sdk/util-locate-window/dist-es/index.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   locateWindow: () => (/* binding */ locateWindow)
/* harmony export */ });
const fallbackWindow = {};
function locateWindow() {
    if (typeof window !== "undefined") {
        return window;
    }
    else if (typeof self !== "undefined") {
        return self;
    }
    return fallbackWindow;
}


/***/ }),

/***/ "../../node_modules/@aws-sdk/util-user-agent-browser/dist-es/index.js":
/*!****************************************************************************!*\
  !*** ../../node_modules/@aws-sdk/util-user-agent-browser/dist-es/index.js ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   defaultUserAgent: () => (/* binding */ defaultUserAgent)
/* harmony export */ });
/* harmony import */ var bowser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! bowser */ "../../node_modules/bowser/es5.js");
/* harmony import */ var bowser__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(bowser__WEBPACK_IMPORTED_MODULE_0__);

const defaultUserAgent = ({ serviceId, clientVersion }) => async () => {
    const parsedUA = typeof window !== "undefined" && window?.navigator?.userAgent
        ? bowser__WEBPACK_IMPORTED_MODULE_0___default().parse(window.navigator.userAgent)
        : undefined;
    const sections = [
        ["aws-sdk-js", clientVersion],
        ["ua", "2.0"],
        [`os/${parsedUA?.os?.name || "other"}`, parsedUA?.os?.version],
        ["lang/js"],
        ["md/browser", `${parsedUA?.browser?.name ?? "unknown"}_${parsedUA?.browser?.version ?? "unknown"}`],
    ];
    if (serviceId) {
        sections.push([`api/${serviceId}`, clientVersion]);
    }
    return sections;
};


/***/ }),

/***/ "../../node_modules/@smithy/config-resolver/dist-es/endpointsConfig/NodeUseDualstackEndpointConfigOptions.js":
/*!*******************************************************************************************************************!*\
  !*** ../../node_modules/@smithy/config-resolver/dist-es/endpointsConfig/NodeUseDualstackEndpointConfigOptions.js ***!
  \*******************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CONFIG_USE_DUALSTACK_ENDPOINT: () => (/* binding */ CONFIG_USE_DUALSTACK_ENDPOINT),
/* harmony export */   DEFAULT_USE_DUALSTACK_ENDPOINT: () => (/* binding */ DEFAULT_USE_DUALSTACK_ENDPOINT),
/* harmony export */   ENV_USE_DUALSTACK_ENDPOINT: () => (/* binding */ ENV_USE_DUALSTACK_ENDPOINT),
/* harmony export */   NODE_USE_DUALSTACK_ENDPOINT_CONFIG_OPTIONS: () => (/* binding */ NODE_USE_DUALSTACK_ENDPOINT_CONFIG_OPTIONS)
/* harmony export */ });
/* harmony import */ var _smithy_util_config_provider__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @smithy/util-config-provider */ "../../node_modules/@smithy/util-config-provider/dist-es/index.js");

const ENV_USE_DUALSTACK_ENDPOINT = "AWS_USE_DUALSTACK_ENDPOINT";
const CONFIG_USE_DUALSTACK_ENDPOINT = "use_dualstack_endpoint";
const DEFAULT_USE_DUALSTACK_ENDPOINT = false;
const NODE_USE_DUALSTACK_ENDPOINT_CONFIG_OPTIONS = {
    environmentVariableSelector: (env) => (0,_smithy_util_config_provider__WEBPACK_IMPORTED_MODULE_0__.booleanSelector)(env, ENV_USE_DUALSTACK_ENDPOINT, _smithy_util_config_provider__WEBPACK_IMPORTED_MODULE_0__.SelectorType.ENV),
    configFileSelector: (profile) => (0,_smithy_util_config_provider__WEBPACK_IMPORTED_MODULE_0__.booleanSelector)(profile, CONFIG_USE_DUALSTACK_ENDPOINT, _smithy_util_config_provider__WEBPACK_IMPORTED_MODULE_0__.SelectorType.CONFIG),
    default: false,
};


/***/ }),

/***/ "../../node_modules/@smithy/config-resolver/dist-es/endpointsConfig/NodeUseFipsEndpointConfigOptions.js":
/*!**************************************************************************************************************!*\
  !*** ../../node_modules/@smithy/config-resolver/dist-es/endpointsConfig/NodeUseFipsEndpointConfigOptions.js ***!
  \**************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CONFIG_USE_FIPS_ENDPOINT: () => (/* binding */ CONFIG_USE_FIPS_ENDPOINT),
/* harmony export */   DEFAULT_USE_FIPS_ENDPOINT: () => (/* binding */ DEFAULT_USE_FIPS_ENDPOINT),
/* harmony export */   ENV_USE_FIPS_ENDPOINT: () => (/* binding */ ENV_USE_FIPS_ENDPOINT),
/* harmony export */   NODE_USE_FIPS_ENDPOINT_CONFIG_OPTIONS: () => (/* binding */ NODE_USE_FIPS_ENDPOINT_CONFIG_OPTIONS)
/* harmony export */ });
/* harmony import */ var _smithy_util_config_provider__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @smithy/util-config-provider */ "../../node_modules/@smithy/util-config-provider/dist-es/index.js");

const ENV_USE_FIPS_ENDPOINT = "AWS_USE_FIPS_ENDPOINT";
const CONFIG_USE_FIPS_ENDPOINT = "use_fips_endpoint";
const DEFAULT_USE_FIPS_ENDPOINT = false;
const NODE_USE_FIPS_ENDPOINT_CONFIG_OPTIONS = {
    environmentVariableSelector: (env) => (0,_smithy_util_config_provider__WEBPACK_IMPORTED_MODULE_0__.booleanSelector)(env, ENV_USE_FIPS_ENDPOINT, _smithy_util_config_provider__WEBPACK_IMPORTED_MODULE_0__.SelectorType.ENV),
    configFileSelector: (profile) => (0,_smithy_util_config_provider__WEBPACK_IMPORTED_MODULE_0__.booleanSelector)(profile, CONFIG_USE_FIPS_ENDPOINT, _smithy_util_config_provider__WEBPACK_IMPORTED_MODULE_0__.SelectorType.CONFIG),
    default: false,
};


/***/ }),

/***/ "../../node_modules/@smithy/config-resolver/dist-es/endpointsConfig/index.js":
/*!***********************************************************************************!*\
  !*** ../../node_modules/@smithy/config-resolver/dist-es/endpointsConfig/index.js ***!
  \***********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CONFIG_USE_DUALSTACK_ENDPOINT: () => (/* reexport safe */ _NodeUseDualstackEndpointConfigOptions__WEBPACK_IMPORTED_MODULE_0__.CONFIG_USE_DUALSTACK_ENDPOINT),
/* harmony export */   CONFIG_USE_FIPS_ENDPOINT: () => (/* reexport safe */ _NodeUseFipsEndpointConfigOptions__WEBPACK_IMPORTED_MODULE_1__.CONFIG_USE_FIPS_ENDPOINT),
/* harmony export */   DEFAULT_USE_DUALSTACK_ENDPOINT: () => (/* reexport safe */ _NodeUseDualstackEndpointConfigOptions__WEBPACK_IMPORTED_MODULE_0__.DEFAULT_USE_DUALSTACK_ENDPOINT),
/* harmony export */   DEFAULT_USE_FIPS_ENDPOINT: () => (/* reexport safe */ _NodeUseFipsEndpointConfigOptions__WEBPACK_IMPORTED_MODULE_1__.DEFAULT_USE_FIPS_ENDPOINT),
/* harmony export */   ENV_USE_DUALSTACK_ENDPOINT: () => (/* reexport safe */ _NodeUseDualstackEndpointConfigOptions__WEBPACK_IMPORTED_MODULE_0__.ENV_USE_DUALSTACK_ENDPOINT),
/* harmony export */   ENV_USE_FIPS_ENDPOINT: () => (/* reexport safe */ _NodeUseFipsEndpointConfigOptions__WEBPACK_IMPORTED_MODULE_1__.ENV_USE_FIPS_ENDPOINT),
/* harmony export */   NODE_USE_DUALSTACK_ENDPOINT_CONFIG_OPTIONS: () => (/* reexport safe */ _NodeUseDualstackEndpointConfigOptions__WEBPACK_IMPORTED_MODULE_0__.NODE_USE_DUALSTACK_ENDPOINT_CONFIG_OPTIONS),
/* harmony export */   NODE_USE_FIPS_ENDPOINT_CONFIG_OPTIONS: () => (/* reexport safe */ _NodeUseFipsEndpointConfigOptions__WEBPACK_IMPORTED_MODULE_1__.NODE_USE_FIPS_ENDPOINT_CONFIG_OPTIONS),
/* harmony export */   resolveCustomEndpointsConfig: () => (/* reexport safe */ _resolveCustomEndpointsConfig__WEBPACK_IMPORTED_MODULE_2__.resolveCustomEndpointsConfig),
/* harmony export */   resolveEndpointsConfig: () => (/* reexport safe */ _resolveEndpointsConfig__WEBPACK_IMPORTED_MODULE_3__.resolveEndpointsConfig)
/* harmony export */ });
/* harmony import */ var _NodeUseDualstackEndpointConfigOptions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./NodeUseDualstackEndpointConfigOptions */ "../../node_modules/@smithy/config-resolver/dist-es/endpointsConfig/NodeUseDualstackEndpointConfigOptions.js");
/* harmony import */ var _NodeUseFipsEndpointConfigOptions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./NodeUseFipsEndpointConfigOptions */ "../../node_modules/@smithy/config-resolver/dist-es/endpointsConfig/NodeUseFipsEndpointConfigOptions.js");
/* harmony import */ var _resolveCustomEndpointsConfig__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./resolveCustomEndpointsConfig */ "../../node_modules/@smithy/config-resolver/dist-es/endpointsConfig/resolveCustomEndpointsConfig.js");
/* harmony import */ var _resolveEndpointsConfig__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./resolveEndpointsConfig */ "../../node_modules/@smithy/config-resolver/dist-es/endpointsConfig/resolveEndpointsConfig.js");






/***/ }),

/***/ "../../node_modules/@smithy/config-resolver/dist-es/endpointsConfig/resolveCustomEndpointsConfig.js":
/*!**********************************************************************************************************!*\
  !*** ../../node_modules/@smithy/config-resolver/dist-es/endpointsConfig/resolveCustomEndpointsConfig.js ***!
  \**********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   resolveCustomEndpointsConfig: () => (/* binding */ resolveCustomEndpointsConfig)
/* harmony export */ });
/* harmony import */ var _smithy_util_middleware__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @smithy/util-middleware */ "../../node_modules/@smithy/util-middleware/dist-es/index.js");

const resolveCustomEndpointsConfig = (input) => {
    const { endpoint, urlParser } = input;
    return {
        ...input,
        tls: input.tls ?? true,
        endpoint: (0,_smithy_util_middleware__WEBPACK_IMPORTED_MODULE_0__.normalizeProvider)(typeof endpoint === "string" ? urlParser(endpoint) : endpoint),
        isCustomEndpoint: true,
        useDualstackEndpoint: (0,_smithy_util_middleware__WEBPACK_IMPORTED_MODULE_0__.normalizeProvider)(input.useDualstackEndpoint ?? false),
    };
};


/***/ }),

/***/ "../../node_modules/@smithy/config-resolver/dist-es/endpointsConfig/resolveEndpointsConfig.js":
/*!****************************************************************************************************!*\
  !*** ../../node_modules/@smithy/config-resolver/dist-es/endpointsConfig/resolveEndpointsConfig.js ***!
  \****************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   resolveEndpointsConfig: () => (/* binding */ resolveEndpointsConfig)
/* harmony export */ });
/* harmony import */ var _smithy_util_middleware__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @smithy/util-middleware */ "../../node_modules/@smithy/util-middleware/dist-es/index.js");
/* harmony import */ var _utils_getEndpointFromRegion__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils/getEndpointFromRegion */ "../../node_modules/@smithy/config-resolver/dist-es/endpointsConfig/utils/getEndpointFromRegion.js");


const resolveEndpointsConfig = (input) => {
    const useDualstackEndpoint = (0,_smithy_util_middleware__WEBPACK_IMPORTED_MODULE_0__.normalizeProvider)(input.useDualstackEndpoint ?? false);
    const { endpoint, useFipsEndpoint, urlParser } = input;
    return {
        ...input,
        tls: input.tls ?? true,
        endpoint: endpoint
            ? (0,_smithy_util_middleware__WEBPACK_IMPORTED_MODULE_0__.normalizeProvider)(typeof endpoint === "string" ? urlParser(endpoint) : endpoint)
            : () => (0,_utils_getEndpointFromRegion__WEBPACK_IMPORTED_MODULE_1__.getEndpointFromRegion)({ ...input, useDualstackEndpoint, useFipsEndpoint }),
        isCustomEndpoint: !!endpoint,
        useDualstackEndpoint,
    };
};


/***/ }),

/***/ "../../node_modules/@smithy/config-resolver/dist-es/endpointsConfig/utils/getEndpointFromRegion.js":
/*!*********************************************************************************************************!*\
  !*** ../../node_modules/@smithy/config-resolver/dist-es/endpointsConfig/utils/getEndpointFromRegion.js ***!
  \*********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getEndpointFromRegion: () => (/* binding */ getEndpointFromRegion)
/* harmony export */ });
const getEndpointFromRegion = async (input) => {
    const { tls = true } = input;
    const region = await input.region();
    const dnsHostRegex = new RegExp(/^([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9-]{0,61}[a-zA-Z0-9])$/);
    if (!dnsHostRegex.test(region)) {
        throw new Error("Invalid region in client config");
    }
    const useDualstackEndpoint = await input.useDualstackEndpoint();
    const useFipsEndpoint = await input.useFipsEndpoint();
    const { hostname } = (await input.regionInfoProvider(region, { useDualstackEndpoint, useFipsEndpoint })) ?? {};
    if (!hostname) {
        throw new Error("Cannot resolve hostname from client config");
    }
    return input.urlParser(`${tls ? "https:" : "http:"}//${hostname}`);
};


/***/ }),

/***/ "../../node_modules/@smithy/config-resolver/dist-es/index.js":
/*!*******************************************************************!*\
  !*** ../../node_modules/@smithy/config-resolver/dist-es/index.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CONFIG_USE_DUALSTACK_ENDPOINT: () => (/* reexport safe */ _endpointsConfig__WEBPACK_IMPORTED_MODULE_0__.CONFIG_USE_DUALSTACK_ENDPOINT),
/* harmony export */   CONFIG_USE_FIPS_ENDPOINT: () => (/* reexport safe */ _endpointsConfig__WEBPACK_IMPORTED_MODULE_0__.CONFIG_USE_FIPS_ENDPOINT),
/* harmony export */   DEFAULT_USE_DUALSTACK_ENDPOINT: () => (/* reexport safe */ _endpointsConfig__WEBPACK_IMPORTED_MODULE_0__.DEFAULT_USE_DUALSTACK_ENDPOINT),
/* harmony export */   DEFAULT_USE_FIPS_ENDPOINT: () => (/* reexport safe */ _endpointsConfig__WEBPACK_IMPORTED_MODULE_0__.DEFAULT_USE_FIPS_ENDPOINT),
/* harmony export */   ENV_USE_DUALSTACK_ENDPOINT: () => (/* reexport safe */ _endpointsConfig__WEBPACK_IMPORTED_MODULE_0__.ENV_USE_DUALSTACK_ENDPOINT),
/* harmony export */   ENV_USE_FIPS_ENDPOINT: () => (/* reexport safe */ _endpointsConfig__WEBPACK_IMPORTED_MODULE_0__.ENV_USE_FIPS_ENDPOINT),
/* harmony export */   NODE_REGION_CONFIG_FILE_OPTIONS: () => (/* reexport safe */ _regionConfig__WEBPACK_IMPORTED_MODULE_1__.NODE_REGION_CONFIG_FILE_OPTIONS),
/* harmony export */   NODE_REGION_CONFIG_OPTIONS: () => (/* reexport safe */ _regionConfig__WEBPACK_IMPORTED_MODULE_1__.NODE_REGION_CONFIG_OPTIONS),
/* harmony export */   NODE_USE_DUALSTACK_ENDPOINT_CONFIG_OPTIONS: () => (/* reexport safe */ _endpointsConfig__WEBPACK_IMPORTED_MODULE_0__.NODE_USE_DUALSTACK_ENDPOINT_CONFIG_OPTIONS),
/* harmony export */   NODE_USE_FIPS_ENDPOINT_CONFIG_OPTIONS: () => (/* reexport safe */ _endpointsConfig__WEBPACK_IMPORTED_MODULE_0__.NODE_USE_FIPS_ENDPOINT_CONFIG_OPTIONS),
/* harmony export */   REGION_ENV_NAME: () => (/* reexport safe */ _regionConfig__WEBPACK_IMPORTED_MODULE_1__.REGION_ENV_NAME),
/* harmony export */   REGION_INI_NAME: () => (/* reexport safe */ _regionConfig__WEBPACK_IMPORTED_MODULE_1__.REGION_INI_NAME),
/* harmony export */   getRegionInfo: () => (/* reexport safe */ _regionInfo__WEBPACK_IMPORTED_MODULE_2__.getRegionInfo),
/* harmony export */   resolveCustomEndpointsConfig: () => (/* reexport safe */ _endpointsConfig__WEBPACK_IMPORTED_MODULE_0__.resolveCustomEndpointsConfig),
/* harmony export */   resolveEndpointsConfig: () => (/* reexport safe */ _endpointsConfig__WEBPACK_IMPORTED_MODULE_0__.resolveEndpointsConfig),
/* harmony export */   resolveRegionConfig: () => (/* reexport safe */ _regionConfig__WEBPACK_IMPORTED_MODULE_1__.resolveRegionConfig)
/* harmony export */ });
/* harmony import */ var _endpointsConfig__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./endpointsConfig */ "../../node_modules/@smithy/config-resolver/dist-es/endpointsConfig/index.js");
/* harmony import */ var _regionConfig__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./regionConfig */ "../../node_modules/@smithy/config-resolver/dist-es/regionConfig/index.js");
/* harmony import */ var _regionInfo__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./regionInfo */ "../../node_modules/@smithy/config-resolver/dist-es/regionInfo/index.js");





/***/ }),

/***/ "../../node_modules/@smithy/config-resolver/dist-es/regionConfig/config.js":
/*!*********************************************************************************!*\
  !*** ../../node_modules/@smithy/config-resolver/dist-es/regionConfig/config.js ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   NODE_REGION_CONFIG_FILE_OPTIONS: () => (/* binding */ NODE_REGION_CONFIG_FILE_OPTIONS),
/* harmony export */   NODE_REGION_CONFIG_OPTIONS: () => (/* binding */ NODE_REGION_CONFIG_OPTIONS),
/* harmony export */   REGION_ENV_NAME: () => (/* binding */ REGION_ENV_NAME),
/* harmony export */   REGION_INI_NAME: () => (/* binding */ REGION_INI_NAME)
/* harmony export */ });
const REGION_ENV_NAME = "AWS_REGION";
const REGION_INI_NAME = "region";
const NODE_REGION_CONFIG_OPTIONS = {
    environmentVariableSelector: (env) => env[REGION_ENV_NAME],
    configFileSelector: (profile) => profile[REGION_INI_NAME],
    default: () => {
        throw new Error("Region is missing");
    },
};
const NODE_REGION_CONFIG_FILE_OPTIONS = {
    preferredFile: "credentials",
};


/***/ }),

/***/ "../../node_modules/@smithy/config-resolver/dist-es/regionConfig/getRealRegion.js":
/*!****************************************************************************************!*\
  !*** ../../node_modules/@smithy/config-resolver/dist-es/regionConfig/getRealRegion.js ***!
  \****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getRealRegion: () => (/* binding */ getRealRegion)
/* harmony export */ });
/* harmony import */ var _isFipsRegion__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./isFipsRegion */ "../../node_modules/@smithy/config-resolver/dist-es/regionConfig/isFipsRegion.js");

const getRealRegion = (region) => (0,_isFipsRegion__WEBPACK_IMPORTED_MODULE_0__.isFipsRegion)(region)
    ? ["fips-aws-global", "aws-fips"].includes(region)
        ? "us-east-1"
        : region.replace(/fips-(dkr-|prod-)?|-fips/, "")
    : region;


/***/ }),

/***/ "../../node_modules/@smithy/config-resolver/dist-es/regionConfig/index.js":
/*!********************************************************************************!*\
  !*** ../../node_modules/@smithy/config-resolver/dist-es/regionConfig/index.js ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   NODE_REGION_CONFIG_FILE_OPTIONS: () => (/* reexport safe */ _config__WEBPACK_IMPORTED_MODULE_0__.NODE_REGION_CONFIG_FILE_OPTIONS),
/* harmony export */   NODE_REGION_CONFIG_OPTIONS: () => (/* reexport safe */ _config__WEBPACK_IMPORTED_MODULE_0__.NODE_REGION_CONFIG_OPTIONS),
/* harmony export */   REGION_ENV_NAME: () => (/* reexport safe */ _config__WEBPACK_IMPORTED_MODULE_0__.REGION_ENV_NAME),
/* harmony export */   REGION_INI_NAME: () => (/* reexport safe */ _config__WEBPACK_IMPORTED_MODULE_0__.REGION_INI_NAME),
/* harmony export */   resolveRegionConfig: () => (/* reexport safe */ _resolveRegionConfig__WEBPACK_IMPORTED_MODULE_1__.resolveRegionConfig)
/* harmony export */ });
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./config */ "../../node_modules/@smithy/config-resolver/dist-es/regionConfig/config.js");
/* harmony import */ var _resolveRegionConfig__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./resolveRegionConfig */ "../../node_modules/@smithy/config-resolver/dist-es/regionConfig/resolveRegionConfig.js");




/***/ }),

/***/ "../../node_modules/@smithy/config-resolver/dist-es/regionConfig/isFipsRegion.js":
/*!***************************************************************************************!*\
  !*** ../../node_modules/@smithy/config-resolver/dist-es/regionConfig/isFipsRegion.js ***!
  \***************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   isFipsRegion: () => (/* binding */ isFipsRegion)
/* harmony export */ });
const isFipsRegion = (region) => typeof region === "string" && (region.startsWith("fips-") || region.endsWith("-fips"));


/***/ }),

/***/ "../../node_modules/@smithy/config-resolver/dist-es/regionConfig/resolveRegionConfig.js":
/*!**********************************************************************************************!*\
  !*** ../../node_modules/@smithy/config-resolver/dist-es/regionConfig/resolveRegionConfig.js ***!
  \**********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   resolveRegionConfig: () => (/* binding */ resolveRegionConfig)
/* harmony export */ });
/* harmony import */ var _getRealRegion__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getRealRegion */ "../../node_modules/@smithy/config-resolver/dist-es/regionConfig/getRealRegion.js");
/* harmony import */ var _isFipsRegion__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./isFipsRegion */ "../../node_modules/@smithy/config-resolver/dist-es/regionConfig/isFipsRegion.js");


const resolveRegionConfig = (input) => {
    const { region, useFipsEndpoint } = input;
    if (!region) {
        throw new Error("Region is missing");
    }
    return {
        ...input,
        region: async () => {
            if (typeof region === "string") {
                return (0,_getRealRegion__WEBPACK_IMPORTED_MODULE_0__.getRealRegion)(region);
            }
            const providedRegion = await region();
            return (0,_getRealRegion__WEBPACK_IMPORTED_MODULE_0__.getRealRegion)(providedRegion);
        },
        useFipsEndpoint: async () => {
            const providedRegion = typeof region === "string" ? region : await region();
            if ((0,_isFipsRegion__WEBPACK_IMPORTED_MODULE_1__.isFipsRegion)(providedRegion)) {
                return true;
            }
            return typeof useFipsEndpoint !== "function" ? Promise.resolve(!!useFipsEndpoint) : useFipsEndpoint();
        },
    };
};


/***/ }),

/***/ "../../node_modules/@smithy/config-resolver/dist-es/regionInfo/PartitionHash.js":
/*!**************************************************************************************!*\
  !*** ../../node_modules/@smithy/config-resolver/dist-es/regionInfo/PartitionHash.js ***!
  \**************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "../../node_modules/@smithy/config-resolver/dist-es/regionInfo/RegionHash.js":
/*!***********************************************************************************!*\
  !*** ../../node_modules/@smithy/config-resolver/dist-es/regionInfo/RegionHash.js ***!
  \***********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "../../node_modules/@smithy/config-resolver/dist-es/regionInfo/getHostnameFromVariants.js":
/*!************************************************************************************************!*\
  !*** ../../node_modules/@smithy/config-resolver/dist-es/regionInfo/getHostnameFromVariants.js ***!
  \************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getHostnameFromVariants: () => (/* binding */ getHostnameFromVariants)
/* harmony export */ });
const getHostnameFromVariants = (variants = [], { useFipsEndpoint, useDualstackEndpoint }) => variants.find(({ tags }) => useFipsEndpoint === tags.includes("fips") && useDualstackEndpoint === tags.includes("dualstack"))?.hostname;


/***/ }),

/***/ "../../node_modules/@smithy/config-resolver/dist-es/regionInfo/getRegionInfo.js":
/*!**************************************************************************************!*\
  !*** ../../node_modules/@smithy/config-resolver/dist-es/regionInfo/getRegionInfo.js ***!
  \**************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getRegionInfo: () => (/* binding */ getRegionInfo)
/* harmony export */ });
/* harmony import */ var _getHostnameFromVariants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getHostnameFromVariants */ "../../node_modules/@smithy/config-resolver/dist-es/regionInfo/getHostnameFromVariants.js");
/* harmony import */ var _getResolvedHostname__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./getResolvedHostname */ "../../node_modules/@smithy/config-resolver/dist-es/regionInfo/getResolvedHostname.js");
/* harmony import */ var _getResolvedPartition__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./getResolvedPartition */ "../../node_modules/@smithy/config-resolver/dist-es/regionInfo/getResolvedPartition.js");
/* harmony import */ var _getResolvedSigningRegion__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./getResolvedSigningRegion */ "../../node_modules/@smithy/config-resolver/dist-es/regionInfo/getResolvedSigningRegion.js");




const getRegionInfo = (region, { useFipsEndpoint = false, useDualstackEndpoint = false, signingService, regionHash, partitionHash, }) => {
    const partition = (0,_getResolvedPartition__WEBPACK_IMPORTED_MODULE_2__.getResolvedPartition)(region, { partitionHash });
    const resolvedRegion = region in regionHash ? region : partitionHash[partition]?.endpoint ?? region;
    const hostnameOptions = { useFipsEndpoint, useDualstackEndpoint };
    const regionHostname = (0,_getHostnameFromVariants__WEBPACK_IMPORTED_MODULE_0__.getHostnameFromVariants)(regionHash[resolvedRegion]?.variants, hostnameOptions);
    const partitionHostname = (0,_getHostnameFromVariants__WEBPACK_IMPORTED_MODULE_0__.getHostnameFromVariants)(partitionHash[partition]?.variants, hostnameOptions);
    const hostname = (0,_getResolvedHostname__WEBPACK_IMPORTED_MODULE_1__.getResolvedHostname)(resolvedRegion, { regionHostname, partitionHostname });
    if (hostname === undefined) {
        throw new Error(`Endpoint resolution failed for: ${{ resolvedRegion, useFipsEndpoint, useDualstackEndpoint }}`);
    }
    const signingRegion = (0,_getResolvedSigningRegion__WEBPACK_IMPORTED_MODULE_3__.getResolvedSigningRegion)(hostname, {
        signingRegion: regionHash[resolvedRegion]?.signingRegion,
        regionRegex: partitionHash[partition].regionRegex,
        useFipsEndpoint,
    });
    return {
        partition,
        signingService,
        hostname,
        ...(signingRegion && { signingRegion }),
        ...(regionHash[resolvedRegion]?.signingService && {
            signingService: regionHash[resolvedRegion].signingService,
        }),
    };
};


/***/ }),

/***/ "../../node_modules/@smithy/config-resolver/dist-es/regionInfo/getResolvedHostname.js":
/*!********************************************************************************************!*\
  !*** ../../node_modules/@smithy/config-resolver/dist-es/regionInfo/getResolvedHostname.js ***!
  \********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getResolvedHostname: () => (/* binding */ getResolvedHostname)
/* harmony export */ });
const getResolvedHostname = (resolvedRegion, { regionHostname, partitionHostname }) => regionHostname
    ? regionHostname
    : partitionHostname
        ? partitionHostname.replace("{region}", resolvedRegion)
        : undefined;


/***/ }),

/***/ "../../node_modules/@smithy/config-resolver/dist-es/regionInfo/getResolvedPartition.js":
/*!*********************************************************************************************!*\
  !*** ../../node_modules/@smithy/config-resolver/dist-es/regionInfo/getResolvedPartition.js ***!
  \*********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getResolvedPartition: () => (/* binding */ getResolvedPartition)
/* harmony export */ });
const getResolvedPartition = (region, { partitionHash }) => Object.keys(partitionHash || {}).find((key) => partitionHash[key].regions.includes(region)) ?? "aws";


/***/ }),

/***/ "../../node_modules/@smithy/config-resolver/dist-es/regionInfo/getResolvedSigningRegion.js":
/*!*************************************************************************************************!*\
  !*** ../../node_modules/@smithy/config-resolver/dist-es/regionInfo/getResolvedSigningRegion.js ***!
  \*************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getResolvedSigningRegion: () => (/* binding */ getResolvedSigningRegion)
/* harmony export */ });
const getResolvedSigningRegion = (hostname, { signingRegion, regionRegex, useFipsEndpoint }) => {
    if (signingRegion) {
        return signingRegion;
    }
    else if (useFipsEndpoint) {
        const regionRegexJs = regionRegex.replace("\\\\", "\\").replace(/^\^/g, "\\.").replace(/\$$/g, "\\.");
        const regionRegexmatchArray = hostname.match(regionRegexJs);
        if (regionRegexmatchArray) {
            return regionRegexmatchArray[0].slice(1, -1);
        }
    }
};


/***/ }),

/***/ "../../node_modules/@smithy/config-resolver/dist-es/regionInfo/index.js":
/*!******************************************************************************!*\
  !*** ../../node_modules/@smithy/config-resolver/dist-es/regionInfo/index.js ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getRegionInfo: () => (/* reexport safe */ _getRegionInfo__WEBPACK_IMPORTED_MODULE_2__.getRegionInfo)
/* harmony export */ });
/* harmony import */ var _PartitionHash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./PartitionHash */ "../../node_modules/@smithy/config-resolver/dist-es/regionInfo/PartitionHash.js");
/* harmony import */ var _RegionHash__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./RegionHash */ "../../node_modules/@smithy/config-resolver/dist-es/regionInfo/RegionHash.js");
/* harmony import */ var _getRegionInfo__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./getRegionInfo */ "../../node_modules/@smithy/config-resolver/dist-es/regionInfo/getRegionInfo.js");





/***/ }),

/***/ "../../node_modules/@smithy/core/dist-es/getSmithyContext.js":
/*!*******************************************************************!*\
  !*** ../../node_modules/@smithy/core/dist-es/getSmithyContext.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getSmithyContext: () => (/* binding */ getSmithyContext)
/* harmony export */ });
/* harmony import */ var _smithy_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @smithy/types */ "../../node_modules/@smithy/types/dist-es/index.js");

const getSmithyContext = (context) => context[_smithy_types__WEBPACK_IMPORTED_MODULE_0__.SMITHY_CONTEXT_KEY] || (context[_smithy_types__WEBPACK_IMPORTED_MODULE_0__.SMITHY_CONTEXT_KEY] = {});


/***/ }),

/***/ "../../node_modules/@smithy/core/dist-es/index.js":
/*!********************************************************!*\
  !*** ../../node_modules/@smithy/core/dist-es/index.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DefaultIdentityProviderConfig: () => (/* reexport safe */ _util_identity_and_auth__WEBPACK_IMPORTED_MODULE_2__.DefaultIdentityProviderConfig),
/* harmony export */   EXPIRATION_MS: () => (/* reexport safe */ _util_identity_and_auth__WEBPACK_IMPORTED_MODULE_2__.EXPIRATION_MS),
/* harmony export */   HttpApiKeyAuthSigner: () => (/* reexport safe */ _util_identity_and_auth__WEBPACK_IMPORTED_MODULE_2__.HttpApiKeyAuthSigner),
/* harmony export */   HttpBearerAuthSigner: () => (/* reexport safe */ _util_identity_and_auth__WEBPACK_IMPORTED_MODULE_2__.HttpBearerAuthSigner),
/* harmony export */   NoAuthSigner: () => (/* reexport safe */ _util_identity_and_auth__WEBPACK_IMPORTED_MODULE_2__.NoAuthSigner),
/* harmony export */   RequestBuilder: () => (/* reexport safe */ _protocols_requestBuilder__WEBPACK_IMPORTED_MODULE_5__.RequestBuilder),
/* harmony export */   createIsIdentityExpiredFunction: () => (/* reexport safe */ _util_identity_and_auth__WEBPACK_IMPORTED_MODULE_2__.createIsIdentityExpiredFunction),
/* harmony export */   createPaginator: () => (/* reexport safe */ _pagination_createPaginator__WEBPACK_IMPORTED_MODULE_6__.createPaginator),
/* harmony export */   doesIdentityRequireRefresh: () => (/* reexport safe */ _util_identity_and_auth__WEBPACK_IMPORTED_MODULE_2__.doesIdentityRequireRefresh),
/* harmony export */   getHttpAuthSchemeEndpointRuleSetPlugin: () => (/* reexport safe */ _middleware_http_auth_scheme__WEBPACK_IMPORTED_MODULE_0__.getHttpAuthSchemeEndpointRuleSetPlugin),
/* harmony export */   getHttpAuthSchemePlugin: () => (/* reexport safe */ _middleware_http_auth_scheme__WEBPACK_IMPORTED_MODULE_0__.getHttpAuthSchemePlugin),
/* harmony export */   getHttpSigningPlugin: () => (/* reexport safe */ _middleware_http_signing__WEBPACK_IMPORTED_MODULE_1__.getHttpSigningPlugin),
/* harmony export */   getSmithyContext: () => (/* reexport safe */ _getSmithyContext__WEBPACK_IMPORTED_MODULE_3__.getSmithyContext),
/* harmony export */   httpAuthSchemeEndpointRuleSetMiddlewareOptions: () => (/* reexport safe */ _middleware_http_auth_scheme__WEBPACK_IMPORTED_MODULE_0__.httpAuthSchemeEndpointRuleSetMiddlewareOptions),
/* harmony export */   httpAuthSchemeMiddleware: () => (/* reexport safe */ _middleware_http_auth_scheme__WEBPACK_IMPORTED_MODULE_0__.httpAuthSchemeMiddleware),
/* harmony export */   httpAuthSchemeMiddlewareOptions: () => (/* reexport safe */ _middleware_http_auth_scheme__WEBPACK_IMPORTED_MODULE_0__.httpAuthSchemeMiddlewareOptions),
/* harmony export */   httpSigningMiddleware: () => (/* reexport safe */ _middleware_http_signing__WEBPACK_IMPORTED_MODULE_1__.httpSigningMiddleware),
/* harmony export */   httpSigningMiddlewareOptions: () => (/* reexport safe */ _middleware_http_signing__WEBPACK_IMPORTED_MODULE_1__.httpSigningMiddlewareOptions),
/* harmony export */   isIdentityExpired: () => (/* reexport safe */ _util_identity_and_auth__WEBPACK_IMPORTED_MODULE_2__.isIdentityExpired),
/* harmony export */   memoizeIdentityProvider: () => (/* reexport safe */ _util_identity_and_auth__WEBPACK_IMPORTED_MODULE_2__.memoizeIdentityProvider),
/* harmony export */   normalizeProvider: () => (/* reexport safe */ _normalizeProvider__WEBPACK_IMPORTED_MODULE_4__.normalizeProvider),
/* harmony export */   requestBuilder: () => (/* reexport safe */ _protocols_requestBuilder__WEBPACK_IMPORTED_MODULE_5__.requestBuilder)
/* harmony export */ });
/* harmony import */ var _middleware_http_auth_scheme__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./middleware-http-auth-scheme */ "../../node_modules/@smithy/core/dist-es/middleware-http-auth-scheme/index.js");
/* harmony import */ var _middleware_http_signing__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./middleware-http-signing */ "../../node_modules/@smithy/core/dist-es/middleware-http-signing/index.js");
/* harmony import */ var _util_identity_and_auth__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./util-identity-and-auth */ "../../node_modules/@smithy/core/dist-es/util-identity-and-auth/index.js");
/* harmony import */ var _getSmithyContext__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./getSmithyContext */ "../../node_modules/@smithy/core/dist-es/getSmithyContext.js");
/* harmony import */ var _normalizeProvider__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./normalizeProvider */ "../../node_modules/@smithy/core/dist-es/normalizeProvider.js");
/* harmony import */ var _protocols_requestBuilder__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./protocols/requestBuilder */ "../../node_modules/@smithy/core/dist-es/protocols/requestBuilder.js");
/* harmony import */ var _pagination_createPaginator__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./pagination/createPaginator */ "../../node_modules/@smithy/core/dist-es/pagination/createPaginator.js");









/***/ }),

/***/ "../../node_modules/@smithy/core/dist-es/middleware-http-auth-scheme/getHttpAuthSchemeEndpointRuleSetPlugin.js":
/*!*********************************************************************************************************************!*\
  !*** ../../node_modules/@smithy/core/dist-es/middleware-http-auth-scheme/getHttpAuthSchemeEndpointRuleSetPlugin.js ***!
  \*********************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getHttpAuthSchemeEndpointRuleSetPlugin: () => (/* binding */ getHttpAuthSchemeEndpointRuleSetPlugin),
/* harmony export */   httpAuthSchemeEndpointRuleSetMiddlewareOptions: () => (/* binding */ httpAuthSchemeEndpointRuleSetMiddlewareOptions)
/* harmony export */ });
/* harmony import */ var _smithy_middleware_endpoint__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @smithy/middleware-endpoint */ "../../node_modules/@smithy/middleware-endpoint/dist-es/index.js");
/* harmony import */ var _httpAuthSchemeMiddleware__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./httpAuthSchemeMiddleware */ "../../node_modules/@smithy/core/dist-es/middleware-http-auth-scheme/httpAuthSchemeMiddleware.js");


const httpAuthSchemeEndpointRuleSetMiddlewareOptions = {
    step: "serialize",
    tags: ["HTTP_AUTH_SCHEME"],
    name: "httpAuthSchemeMiddleware",
    override: true,
    relation: "before",
    toMiddleware: _smithy_middleware_endpoint__WEBPACK_IMPORTED_MODULE_0__.endpointMiddlewareOptions.name,
};
const getHttpAuthSchemeEndpointRuleSetPlugin = (config, { httpAuthSchemeParametersProvider, identityProviderConfigProvider, }) => ({
    applyToStack: (clientStack) => {
        clientStack.addRelativeTo((0,_httpAuthSchemeMiddleware__WEBPACK_IMPORTED_MODULE_1__.httpAuthSchemeMiddleware)(config, {
            httpAuthSchemeParametersProvider,
            identityProviderConfigProvider,
        }), httpAuthSchemeEndpointRuleSetMiddlewareOptions);
    },
});


/***/ }),

/***/ "../../node_modules/@smithy/core/dist-es/middleware-http-auth-scheme/getHttpAuthSchemePlugin.js":
/*!******************************************************************************************************!*\
  !*** ../../node_modules/@smithy/core/dist-es/middleware-http-auth-scheme/getHttpAuthSchemePlugin.js ***!
  \******************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getHttpAuthSchemePlugin: () => (/* binding */ getHttpAuthSchemePlugin),
/* harmony export */   httpAuthSchemeMiddlewareOptions: () => (/* binding */ httpAuthSchemeMiddlewareOptions)
/* harmony export */ });
/* harmony import */ var _smithy_middleware_serde__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @smithy/middleware-serde */ "../../node_modules/@smithy/middleware-serde/dist-es/index.js");
/* harmony import */ var _httpAuthSchemeMiddleware__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./httpAuthSchemeMiddleware */ "../../node_modules/@smithy/core/dist-es/middleware-http-auth-scheme/httpAuthSchemeMiddleware.js");


const httpAuthSchemeMiddlewareOptions = {
    step: "serialize",
    tags: ["HTTP_AUTH_SCHEME"],
    name: "httpAuthSchemeMiddleware",
    override: true,
    relation: "before",
    toMiddleware: _smithy_middleware_serde__WEBPACK_IMPORTED_MODULE_0__.serializerMiddlewareOption.name,
};
const getHttpAuthSchemePlugin = (config, { httpAuthSchemeParametersProvider, identityProviderConfigProvider, }) => ({
    applyToStack: (clientStack) => {
        clientStack.addRelativeTo((0,_httpAuthSchemeMiddleware__WEBPACK_IMPORTED_MODULE_1__.httpAuthSchemeMiddleware)(config, {
            httpAuthSchemeParametersProvider,
            identityProviderConfigProvider,
        }), httpAuthSchemeMiddlewareOptions);
    },
});


/***/ }),

/***/ "../../node_modules/@smithy/core/dist-es/middleware-http-auth-scheme/httpAuthSchemeMiddleware.js":
/*!*******************************************************************************************************!*\
  !*** ../../node_modules/@smithy/core/dist-es/middleware-http-auth-scheme/httpAuthSchemeMiddleware.js ***!
  \*******************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   httpAuthSchemeMiddleware: () => (/* binding */ httpAuthSchemeMiddleware)
/* harmony export */ });
/* harmony import */ var _smithy_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @smithy/types */ "../../node_modules/@smithy/types/dist-es/index.js");
/* harmony import */ var _smithy_util_middleware__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @smithy/util-middleware */ "../../node_modules/@smithy/util-middleware/dist-es/index.js");


function convertHttpAuthSchemesToMap(httpAuthSchemes) {
    const map = new Map();
    for (const scheme of httpAuthSchemes) {
        map.set(scheme.schemeId, scheme);
    }
    return map;
}
const httpAuthSchemeMiddleware = (config, mwOptions) => (next, context) => async (args) => {
    const options = config.httpAuthSchemeProvider(await mwOptions.httpAuthSchemeParametersProvider(config, context, args.input));
    const authSchemes = convertHttpAuthSchemesToMap(config.httpAuthSchemes);
    const smithyContext = (0,_smithy_util_middleware__WEBPACK_IMPORTED_MODULE_1__.getSmithyContext)(context);
    const failureReasons = [];
    for (const option of options) {
        const scheme = authSchemes.get(option.schemeId);
        if (!scheme) {
            failureReasons.push(`HttpAuthScheme \`${option.schemeId}\` was not enabled for this service.`);
            continue;
        }
        const identityProvider = scheme.identityProvider(await mwOptions.identityProviderConfigProvider(config));
        if (!identityProvider) {
            failureReasons.push(`HttpAuthScheme \`${option.schemeId}\` did not have an IdentityProvider configured.`);
            continue;
        }
        const { identityProperties = {}, signingProperties = {} } = option.propertiesExtractor?.(config, context) || {};
        option.identityProperties = Object.assign(option.identityProperties || {}, identityProperties);
        option.signingProperties = Object.assign(option.signingProperties || {}, signingProperties);
        smithyContext.selectedHttpAuthScheme = {
            httpAuthOption: option,
            identity: await identityProvider(option.identityProperties),
            signer: scheme.signer,
        };
        break;
    }
    if (!smithyContext.selectedHttpAuthScheme) {
        throw new Error(failureReasons.join("\n"));
    }
    return next(args);
};


/***/ }),

/***/ "../../node_modules/@smithy/core/dist-es/middleware-http-auth-scheme/index.js":
/*!************************************************************************************!*\
  !*** ../../node_modules/@smithy/core/dist-es/middleware-http-auth-scheme/index.js ***!
  \************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getHttpAuthSchemeEndpointRuleSetPlugin: () => (/* reexport safe */ _getHttpAuthSchemeEndpointRuleSetPlugin__WEBPACK_IMPORTED_MODULE_1__.getHttpAuthSchemeEndpointRuleSetPlugin),
/* harmony export */   getHttpAuthSchemePlugin: () => (/* reexport safe */ _getHttpAuthSchemePlugin__WEBPACK_IMPORTED_MODULE_2__.getHttpAuthSchemePlugin),
/* harmony export */   httpAuthSchemeEndpointRuleSetMiddlewareOptions: () => (/* reexport safe */ _getHttpAuthSchemeEndpointRuleSetPlugin__WEBPACK_IMPORTED_MODULE_1__.httpAuthSchemeEndpointRuleSetMiddlewareOptions),
/* harmony export */   httpAuthSchemeMiddleware: () => (/* reexport safe */ _httpAuthSchemeMiddleware__WEBPACK_IMPORTED_MODULE_0__.httpAuthSchemeMiddleware),
/* harmony export */   httpAuthSchemeMiddlewareOptions: () => (/* reexport safe */ _getHttpAuthSchemePlugin__WEBPACK_IMPORTED_MODULE_2__.httpAuthSchemeMiddlewareOptions)
/* harmony export */ });
/* harmony import */ var _httpAuthSchemeMiddleware__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./httpAuthSchemeMiddleware */ "../../node_modules/@smithy/core/dist-es/middleware-http-auth-scheme/httpAuthSchemeMiddleware.js");
/* harmony import */ var _getHttpAuthSchemeEndpointRuleSetPlugin__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./getHttpAuthSchemeEndpointRuleSetPlugin */ "../../node_modules/@smithy/core/dist-es/middleware-http-auth-scheme/getHttpAuthSchemeEndpointRuleSetPlugin.js");
/* harmony import */ var _getHttpAuthSchemePlugin__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./getHttpAuthSchemePlugin */ "../../node_modules/@smithy/core/dist-es/middleware-http-auth-scheme/getHttpAuthSchemePlugin.js");





/***/ }),

/***/ "../../node_modules/@smithy/core/dist-es/middleware-http-signing/getHttpSigningMiddleware.js":
/*!***************************************************************************************************!*\
  !*** ../../node_modules/@smithy/core/dist-es/middleware-http-signing/getHttpSigningMiddleware.js ***!
  \***************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getHttpSigningPlugin: () => (/* binding */ getHttpSigningPlugin),
/* harmony export */   httpSigningMiddlewareOptions: () => (/* binding */ httpSigningMiddlewareOptions)
/* harmony export */ });
/* harmony import */ var _smithy_middleware_retry__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @smithy/middleware-retry */ "../../node_modules/@smithy/middleware-retry/dist-es/index.js");
/* harmony import */ var _httpSigningMiddleware__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./httpSigningMiddleware */ "../../node_modules/@smithy/core/dist-es/middleware-http-signing/httpSigningMiddleware.js");


const httpSigningMiddlewareOptions = {
    step: "finalizeRequest",
    tags: ["HTTP_SIGNING"],
    name: "httpSigningMiddleware",
    aliases: ["apiKeyMiddleware", "tokenMiddleware", "awsAuthMiddleware"],
    override: true,
    relation: "after",
    toMiddleware: _smithy_middleware_retry__WEBPACK_IMPORTED_MODULE_0__.retryMiddlewareOptions.name,
};
const getHttpSigningPlugin = (config) => ({
    applyToStack: (clientStack) => {
        clientStack.addRelativeTo((0,_httpSigningMiddleware__WEBPACK_IMPORTED_MODULE_1__.httpSigningMiddleware)(config), httpSigningMiddlewareOptions);
    },
});


/***/ }),

/***/ "../../node_modules/@smithy/core/dist-es/middleware-http-signing/httpSigningMiddleware.js":
/*!************************************************************************************************!*\
  !*** ../../node_modules/@smithy/core/dist-es/middleware-http-signing/httpSigningMiddleware.js ***!
  \************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   httpSigningMiddleware: () => (/* binding */ httpSigningMiddleware)
/* harmony export */ });
/* harmony import */ var _smithy_protocol_http__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @smithy/protocol-http */ "../../node_modules/@smithy/protocol-http/dist-es/index.js");
/* harmony import */ var _smithy_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @smithy/types */ "../../node_modules/@smithy/types/dist-es/index.js");
/* harmony import */ var _smithy_util_middleware__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @smithy/util-middleware */ "../../node_modules/@smithy/util-middleware/dist-es/index.js");



const defaultErrorHandler = (signingProperties) => (error) => {
    throw error;
};
const defaultSuccessHandler = (httpResponse, signingProperties) => { };
const httpSigningMiddleware = (config) => (next, context) => async (args) => {
    if (!_smithy_protocol_http__WEBPACK_IMPORTED_MODULE_0__.HttpRequest.isInstance(args.request)) {
        return next(args);
    }
    const smithyContext = (0,_smithy_util_middleware__WEBPACK_IMPORTED_MODULE_2__.getSmithyContext)(context);
    const scheme = smithyContext.selectedHttpAuthScheme;
    if (!scheme) {
        throw new Error(`No HttpAuthScheme was selected: unable to sign request`);
    }
    const { httpAuthOption: { signingProperties = {} }, identity, signer, } = scheme;
    const output = await next({
        ...args,
        request: await signer.sign(args.request, identity, signingProperties),
    }).catch((signer.errorHandler || defaultErrorHandler)(signingProperties));
    (signer.successHandler || defaultSuccessHandler)(output.response, signingProperties);
    return output;
};


/***/ }),

/***/ "../../node_modules/@smithy/core/dist-es/middleware-http-signing/index.js":
/*!********************************************************************************!*\
  !*** ../../node_modules/@smithy/core/dist-es/middleware-http-signing/index.js ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getHttpSigningPlugin: () => (/* reexport safe */ _getHttpSigningMiddleware__WEBPACK_IMPORTED_MODULE_1__.getHttpSigningPlugin),
/* harmony export */   httpSigningMiddleware: () => (/* reexport safe */ _httpSigningMiddleware__WEBPACK_IMPORTED_MODULE_0__.httpSigningMiddleware),
/* harmony export */   httpSigningMiddlewareOptions: () => (/* reexport safe */ _getHttpSigningMiddleware__WEBPACK_IMPORTED_MODULE_1__.httpSigningMiddlewareOptions)
/* harmony export */ });
/* harmony import */ var _httpSigningMiddleware__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./httpSigningMiddleware */ "../../node_modules/@smithy/core/dist-es/middleware-http-signing/httpSigningMiddleware.js");
/* harmony import */ var _getHttpSigningMiddleware__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./getHttpSigningMiddleware */ "../../node_modules/@smithy/core/dist-es/middleware-http-signing/getHttpSigningMiddleware.js");




/***/ }),

/***/ "../../node_modules/@smithy/core/dist-es/normalizeProvider.js":
/*!********************************************************************!*\
  !*** ../../node_modules/@smithy/core/dist-es/normalizeProvider.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   normalizeProvider: () => (/* binding */ normalizeProvider)
/* harmony export */ });
const normalizeProvider = (input) => {
    if (typeof input === "function")
        return input;
    const promisified = Promise.resolve(input);
    return () => promisified;
};


/***/ }),

/***/ "../../node_modules/@smithy/core/dist-es/pagination/createPaginator.js":
/*!*****************************************************************************!*\
  !*** ../../node_modules/@smithy/core/dist-es/pagination/createPaginator.js ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createPaginator: () => (/* binding */ createPaginator)
/* harmony export */ });
const makePagedClientRequest = async (CommandCtor, client, input, ...args) => {
    return await client.send(new CommandCtor(input), ...args);
};
function createPaginator(ClientCtor, CommandCtor, inputTokenName, outputTokenName, pageSizeTokenName) {
    return async function* paginateOperation(config, input, ...additionalArguments) {
        let token = config.startingToken || undefined;
        let hasNext = true;
        let page;
        while (hasNext) {
            input[inputTokenName] = token;
            if (pageSizeTokenName) {
                input[pageSizeTokenName] = input[pageSizeTokenName] ?? config.pageSize;
            }
            if (config.client instanceof ClientCtor) {
                page = await makePagedClientRequest(CommandCtor, config.client, input, ...additionalArguments);
            }
            else {
                throw new Error(`Invalid client, expected instance of ${ClientCtor.name}`);
            }
            yield page;
            const prevToken = token;
            token = get(page, outputTokenName);
            hasNext = !!(token && (!config.stopOnSameToken || token !== prevToken));
        }
        return undefined;
    };
}
const get = (fromObject, path) => {
    let cursor = fromObject;
    const pathComponents = path.split(".");
    for (const step of pathComponents) {
        if (!cursor || typeof cursor !== "object") {
            return undefined;
        }
        cursor = cursor[step];
    }
    return cursor;
};


/***/ }),

/***/ "../../node_modules/@smithy/core/dist-es/protocols/requestBuilder.js":
/*!***************************************************************************!*\
  !*** ../../node_modules/@smithy/core/dist-es/protocols/requestBuilder.js ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   RequestBuilder: () => (/* binding */ RequestBuilder),
/* harmony export */   requestBuilder: () => (/* binding */ requestBuilder)
/* harmony export */ });
/* harmony import */ var _smithy_protocol_http__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @smithy/protocol-http */ "../../node_modules/@smithy/protocol-http/dist-es/index.js");
/* harmony import */ var _smithy_smithy_client__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @smithy/smithy-client */ "../../node_modules/@smithy/smithy-client/dist-es/index.js");


function requestBuilder(input, context) {
    return new RequestBuilder(input, context);
}
class RequestBuilder {
    constructor(input, context) {
        this.input = input;
        this.context = context;
        this.query = {};
        this.method = "";
        this.headers = {};
        this.path = "";
        this.body = null;
        this.hostname = "";
        this.resolvePathStack = [];
    }
    async build() {
        const { hostname, protocol = "https", port, path: basePath } = await this.context.endpoint();
        this.path = basePath;
        for (const resolvePath of this.resolvePathStack) {
            resolvePath(this.path);
        }
        return new _smithy_protocol_http__WEBPACK_IMPORTED_MODULE_0__.HttpRequest({
            protocol,
            hostname: this.hostname || hostname,
            port,
            method: this.method,
            path: this.path,
            query: this.query,
            body: this.body,
            headers: this.headers,
        });
    }
    hn(hostname) {
        this.hostname = hostname;
        return this;
    }
    bp(uriLabel) {
        this.resolvePathStack.push((basePath) => {
            this.path = `${basePath?.endsWith("/") ? basePath.slice(0, -1) : basePath || ""}` + uriLabel;
        });
        return this;
    }
    p(memberName, labelValueProvider, uriLabel, isGreedyLabel) {
        this.resolvePathStack.push((path) => {
            this.path = (0,_smithy_smithy_client__WEBPACK_IMPORTED_MODULE_1__.resolvedPath)(path, this.input, memberName, labelValueProvider, uriLabel, isGreedyLabel);
        });
        return this;
    }
    h(headers) {
        this.headers = headers;
        return this;
    }
    q(query) {
        this.query = query;
        return this;
    }
    b(body) {
        this.body = body;
        return this;
    }
    m(method) {
        this.method = method;
        return this;
    }
}


/***/ }),

/***/ "../../node_modules/@smithy/core/dist-es/util-identity-and-auth/DefaultIdentityProviderConfig.js":
/*!*******************************************************************************************************!*\
  !*** ../../node_modules/@smithy/core/dist-es/util-identity-and-auth/DefaultIdentityProviderConfig.js ***!
  \*******************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DefaultIdentityProviderConfig: () => (/* binding */ DefaultIdentityProviderConfig)
/* harmony export */ });
class DefaultIdentityProviderConfig {
    constructor(config) {
        this.authSchemes = new Map();
        for (const [key, value] of Object.entries(config)) {
            if (value !== undefined) {
                this.authSchemes.set(key, value);
            }
        }
    }
    getIdentityProvider(schemeId) {
        return this.authSchemes.get(schemeId);
    }
}


/***/ }),

/***/ "../../node_modules/@smithy/core/dist-es/util-identity-and-auth/httpAuthSchemes/httpApiKeyAuth.js":
/*!********************************************************************************************************!*\
  !*** ../../node_modules/@smithy/core/dist-es/util-identity-and-auth/httpAuthSchemes/httpApiKeyAuth.js ***!
  \********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   HttpApiKeyAuthSigner: () => (/* binding */ HttpApiKeyAuthSigner)
/* harmony export */ });
/* harmony import */ var _smithy_protocol_http__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @smithy/protocol-http */ "../../node_modules/@smithy/protocol-http/dist-es/index.js");
/* harmony import */ var _smithy_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @smithy/types */ "../../node_modules/@smithy/types/dist-es/index.js");


class HttpApiKeyAuthSigner {
    async sign(httpRequest, identity, signingProperties) {
        if (!signingProperties) {
            throw new Error("request could not be signed with `apiKey` since the `name` and `in` signer properties are missing");
        }
        if (!signingProperties.name) {
            throw new Error("request could not be signed with `apiKey` since the `name` signer property is missing");
        }
        if (!signingProperties.in) {
            throw new Error("request could not be signed with `apiKey` since the `in` signer property is missing");
        }
        if (!identity.apiKey) {
            throw new Error("request could not be signed with `apiKey` since the `apiKey` is not defined");
        }
        const clonedRequest = _smithy_protocol_http__WEBPACK_IMPORTED_MODULE_0__.HttpRequest.clone(httpRequest);
        if (signingProperties.in === _smithy_types__WEBPACK_IMPORTED_MODULE_1__.HttpApiKeyAuthLocation.QUERY) {
            clonedRequest.query[signingProperties.name] = identity.apiKey;
        }
        else if (signingProperties.in === _smithy_types__WEBPACK_IMPORTED_MODULE_1__.HttpApiKeyAuthLocation.HEADER) {
            clonedRequest.headers[signingProperties.name] = signingProperties.scheme
                ? `${signingProperties.scheme} ${identity.apiKey}`
                : identity.apiKey;
        }
        else {
            throw new Error("request can only be signed with `apiKey` locations `query` or `header`, " +
                "but found: `" +
                signingProperties.in +
                "`");
        }
        return clonedRequest;
    }
}


/***/ }),

/***/ "../../node_modules/@smithy/core/dist-es/util-identity-and-auth/httpAuthSchemes/httpBearerAuth.js":
/*!********************************************************************************************************!*\
  !*** ../../node_modules/@smithy/core/dist-es/util-identity-and-auth/httpAuthSchemes/httpBearerAuth.js ***!
  \********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   HttpBearerAuthSigner: () => (/* binding */ HttpBearerAuthSigner)
/* harmony export */ });
/* harmony import */ var _smithy_protocol_http__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @smithy/protocol-http */ "../../node_modules/@smithy/protocol-http/dist-es/index.js");

class HttpBearerAuthSigner {
    async sign(httpRequest, identity, signingProperties) {
        const clonedRequest = _smithy_protocol_http__WEBPACK_IMPORTED_MODULE_0__.HttpRequest.clone(httpRequest);
        if (!identity.token) {
            throw new Error("request could not be signed with `token` since the `token` is not defined");
        }
        clonedRequest.headers["Authorization"] = `Bearer ${identity.token}`;
        return clonedRequest;
    }
}


/***/ }),

/***/ "../../node_modules/@smithy/core/dist-es/util-identity-and-auth/httpAuthSchemes/index.js":
/*!***********************************************************************************************!*\
  !*** ../../node_modules/@smithy/core/dist-es/util-identity-and-auth/httpAuthSchemes/index.js ***!
  \***********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   HttpApiKeyAuthSigner: () => (/* reexport safe */ _httpApiKeyAuth__WEBPACK_IMPORTED_MODULE_0__.HttpApiKeyAuthSigner),
/* harmony export */   HttpBearerAuthSigner: () => (/* reexport safe */ _httpBearerAuth__WEBPACK_IMPORTED_MODULE_1__.HttpBearerAuthSigner),
/* harmony export */   NoAuthSigner: () => (/* reexport safe */ _noAuth__WEBPACK_IMPORTED_MODULE_2__.NoAuthSigner)
/* harmony export */ });
/* harmony import */ var _httpApiKeyAuth__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./httpApiKeyAuth */ "../../node_modules/@smithy/core/dist-es/util-identity-and-auth/httpAuthSchemes/httpApiKeyAuth.js");
/* harmony import */ var _httpBearerAuth__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./httpBearerAuth */ "../../node_modules/@smithy/core/dist-es/util-identity-and-auth/httpAuthSchemes/httpBearerAuth.js");
/* harmony import */ var _noAuth__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./noAuth */ "../../node_modules/@smithy/core/dist-es/util-identity-and-auth/httpAuthSchemes/noAuth.js");





/***/ }),

/***/ "../../node_modules/@smithy/core/dist-es/util-identity-and-auth/httpAuthSchemes/noAuth.js":
/*!************************************************************************************************!*\
  !*** ../../node_modules/@smithy/core/dist-es/util-identity-and-auth/httpAuthSchemes/noAuth.js ***!
  \************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   NoAuthSigner: () => (/* binding */ NoAuthSigner)
/* harmony export */ });
class NoAuthSigner {
    async sign(httpRequest, identity, signingProperties) {
        return httpRequest;
    }
}


/***/ }),

/***/ "../../node_modules/@smithy/core/dist-es/util-identity-and-auth/index.js":
/*!*******************************************************************************!*\
  !*** ../../node_modules/@smithy/core/dist-es/util-identity-and-auth/index.js ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DefaultIdentityProviderConfig: () => (/* reexport safe */ _DefaultIdentityProviderConfig__WEBPACK_IMPORTED_MODULE_0__.DefaultIdentityProviderConfig),
/* harmony export */   EXPIRATION_MS: () => (/* reexport safe */ _memoizeIdentityProvider__WEBPACK_IMPORTED_MODULE_2__.EXPIRATION_MS),
/* harmony export */   HttpApiKeyAuthSigner: () => (/* reexport safe */ _httpAuthSchemes__WEBPACK_IMPORTED_MODULE_1__.HttpApiKeyAuthSigner),
/* harmony export */   HttpBearerAuthSigner: () => (/* reexport safe */ _httpAuthSchemes__WEBPACK_IMPORTED_MODULE_1__.HttpBearerAuthSigner),
/* harmony export */   NoAuthSigner: () => (/* reexport safe */ _httpAuthSchemes__WEBPACK_IMPORTED_MODULE_1__.NoAuthSigner),
/* harmony export */   createIsIdentityExpiredFunction: () => (/* reexport safe */ _memoizeIdentityProvider__WEBPACK_IMPORTED_MODULE_2__.createIsIdentityExpiredFunction),
/* harmony export */   doesIdentityRequireRefresh: () => (/* reexport safe */ _memoizeIdentityProvider__WEBPACK_IMPORTED_MODULE_2__.doesIdentityRequireRefresh),
/* harmony export */   isIdentityExpired: () => (/* reexport safe */ _memoizeIdentityProvider__WEBPACK_IMPORTED_MODULE_2__.isIdentityExpired),
/* harmony export */   memoizeIdentityProvider: () => (/* reexport safe */ _memoizeIdentityProvider__WEBPACK_IMPORTED_MODULE_2__.memoizeIdentityProvider)
/* harmony export */ });
/* harmony import */ var _DefaultIdentityProviderConfig__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./DefaultIdentityProviderConfig */ "../../node_modules/@smithy/core/dist-es/util-identity-and-auth/DefaultIdentityProviderConfig.js");
/* harmony import */ var _httpAuthSchemes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./httpAuthSchemes */ "../../node_modules/@smithy/core/dist-es/util-identity-and-auth/httpAuthSchemes/index.js");
/* harmony import */ var _memoizeIdentityProvider__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./memoizeIdentityProvider */ "../../node_modules/@smithy/core/dist-es/util-identity-and-auth/memoizeIdentityProvider.js");





/***/ }),

/***/ "../../node_modules/@smithy/core/dist-es/util-identity-and-auth/memoizeIdentityProvider.js":
/*!*************************************************************************************************!*\
  !*** ../../node_modules/@smithy/core/dist-es/util-identity-and-auth/memoizeIdentityProvider.js ***!
  \*************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   EXPIRATION_MS: () => (/* binding */ EXPIRATION_MS),
/* harmony export */   createIsIdentityExpiredFunction: () => (/* binding */ createIsIdentityExpiredFunction),
/* harmony export */   doesIdentityRequireRefresh: () => (/* binding */ doesIdentityRequireRefresh),
/* harmony export */   isIdentityExpired: () => (/* binding */ isIdentityExpired),
/* harmony export */   memoizeIdentityProvider: () => (/* binding */ memoizeIdentityProvider)
/* harmony export */ });
const createIsIdentityExpiredFunction = (expirationMs) => (identity) => doesIdentityRequireRefresh(identity) && identity.expiration.getTime() - Date.now() < expirationMs;
const EXPIRATION_MS = 300000;
const isIdentityExpired = createIsIdentityExpiredFunction(EXPIRATION_MS);
const doesIdentityRequireRefresh = (identity) => identity.expiration !== undefined;
const memoizeIdentityProvider = (provider, isExpired, requiresRefresh) => {
    if (provider === undefined) {
        return undefined;
    }
    const normalizedProvider = typeof provider !== "function" ? async () => Promise.resolve(provider) : provider;
    let resolved;
    let pending;
    let hasResult;
    let isConstant = false;
    const coalesceProvider = async (options) => {
        if (!pending) {
            pending = normalizedProvider(options);
        }
        try {
            resolved = await pending;
            hasResult = true;
            isConstant = false;
        }
        finally {
            pending = undefined;
        }
        return resolved;
    };
    if (isExpired === undefined) {
        return async (options) => {
            if (!hasResult || options?.forceRefresh) {
                resolved = await coalesceProvider(options);
            }
            return resolved;
        };
    }
    return async (options) => {
        if (!hasResult || options?.forceRefresh) {
            resolved = await coalesceProvider(options);
        }
        if (isConstant) {
            return resolved;
        }
        if (!requiresRefresh(resolved)) {
            isConstant = true;
            return resolved;
        }
        if (isExpired(resolved)) {
            await coalesceProvider(options);
            return resolved;
        }
        return resolved;
    };
};


/***/ }),

/***/ "../../node_modules/@smithy/eventstream-codec/dist-es/EventStreamCodec.js":
/*!********************************************************************************!*\
  !*** ../../node_modules/@smithy/eventstream-codec/dist-es/EventStreamCodec.js ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   EventStreamCodec: () => (/* binding */ EventStreamCodec)
/* harmony export */ });
/* harmony import */ var _aws_crypto_crc32__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @aws-crypto/crc32 */ "../../node_modules/@aws-crypto/crc32/build/module/index.js");
/* harmony import */ var _HeaderMarshaller__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./HeaderMarshaller */ "../../node_modules/@smithy/eventstream-codec/dist-es/HeaderMarshaller.js");
/* harmony import */ var _splitMessage__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./splitMessage */ "../../node_modules/@smithy/eventstream-codec/dist-es/splitMessage.js");



class EventStreamCodec {
    constructor(toUtf8, fromUtf8) {
        this.headerMarshaller = new _HeaderMarshaller__WEBPACK_IMPORTED_MODULE_1__.HeaderMarshaller(toUtf8, fromUtf8);
        this.messageBuffer = [];
        this.isEndOfStream = false;
    }
    feed(message) {
        this.messageBuffer.push(this.decode(message));
    }
    endOfStream() {
        this.isEndOfStream = true;
    }
    getMessage() {
        const message = this.messageBuffer.pop();
        const isEndOfStream = this.isEndOfStream;
        return {
            getMessage() {
                return message;
            },
            isEndOfStream() {
                return isEndOfStream;
            },
        };
    }
    getAvailableMessages() {
        const messages = this.messageBuffer;
        this.messageBuffer = [];
        const isEndOfStream = this.isEndOfStream;
        return {
            getMessages() {
                return messages;
            },
            isEndOfStream() {
                return isEndOfStream;
            },
        };
    }
    encode({ headers: rawHeaders, body }) {
        const headers = this.headerMarshaller.format(rawHeaders);
        const length = headers.byteLength + body.byteLength + 16;
        const out = new Uint8Array(length);
        const view = new DataView(out.buffer, out.byteOffset, out.byteLength);
        const checksum = new _aws_crypto_crc32__WEBPACK_IMPORTED_MODULE_0__.Crc32();
        view.setUint32(0, length, false);
        view.setUint32(4, headers.byteLength, false);
        view.setUint32(8, checksum.update(out.subarray(0, 8)).digest(), false);
        out.set(headers, 12);
        out.set(body, headers.byteLength + 12);
        view.setUint32(length - 4, checksum.update(out.subarray(8, length - 4)).digest(), false);
        return out;
    }
    decode(message) {
        const { headers, body } = (0,_splitMessage__WEBPACK_IMPORTED_MODULE_2__.splitMessage)(message);
        return { headers: this.headerMarshaller.parse(headers), body };
    }
    formatHeaders(rawHeaders) {
        return this.headerMarshaller.format(rawHeaders);
    }
}


/***/ }),

/***/ "../../node_modules/@smithy/eventstream-codec/dist-es/HeaderMarshaller.js":
/*!********************************************************************************!*\
  !*** ../../node_modules/@smithy/eventstream-codec/dist-es/HeaderMarshaller.js ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   HeaderMarshaller: () => (/* binding */ HeaderMarshaller)
/* harmony export */ });
/* harmony import */ var _smithy_util_hex_encoding__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @smithy/util-hex-encoding */ "../../node_modules/@smithy/util-hex-encoding/dist-es/index.js");
/* harmony import */ var _Int64__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Int64 */ "../../node_modules/@smithy/eventstream-codec/dist-es/Int64.js");


class HeaderMarshaller {
    constructor(toUtf8, fromUtf8) {
        this.toUtf8 = toUtf8;
        this.fromUtf8 = fromUtf8;
    }
    format(headers) {
        const chunks = [];
        for (const headerName of Object.keys(headers)) {
            const bytes = this.fromUtf8(headerName);
            chunks.push(Uint8Array.from([bytes.byteLength]), bytes, this.formatHeaderValue(headers[headerName]));
        }
        const out = new Uint8Array(chunks.reduce((carry, bytes) => carry + bytes.byteLength, 0));
        let position = 0;
        for (const chunk of chunks) {
            out.set(chunk, position);
            position += chunk.byteLength;
        }
        return out;
    }
    formatHeaderValue(header) {
        switch (header.type) {
            case "boolean":
                return Uint8Array.from([header.value ? 0 : 1]);
            case "byte":
                return Uint8Array.from([2, header.value]);
            case "short":
                const shortView = new DataView(new ArrayBuffer(3));
                shortView.setUint8(0, 3);
                shortView.setInt16(1, header.value, false);
                return new Uint8Array(shortView.buffer);
            case "integer":
                const intView = new DataView(new ArrayBuffer(5));
                intView.setUint8(0, 4);
                intView.setInt32(1, header.value, false);
                return new Uint8Array(intView.buffer);
            case "long":
                const longBytes = new Uint8Array(9);
                longBytes[0] = 5;
                longBytes.set(header.value.bytes, 1);
                return longBytes;
            case "binary":
                const binView = new DataView(new ArrayBuffer(3 + header.value.byteLength));
                binView.setUint8(0, 6);
                binView.setUint16(1, header.value.byteLength, false);
                const binBytes = new Uint8Array(binView.buffer);
                binBytes.set(header.value, 3);
                return binBytes;
            case "string":
                const utf8Bytes = this.fromUtf8(header.value);
                const strView = new DataView(new ArrayBuffer(3 + utf8Bytes.byteLength));
                strView.setUint8(0, 7);
                strView.setUint16(1, utf8Bytes.byteLength, false);
                const strBytes = new Uint8Array(strView.buffer);
                strBytes.set(utf8Bytes, 3);
                return strBytes;
            case "timestamp":
                const tsBytes = new Uint8Array(9);
                tsBytes[0] = 8;
                tsBytes.set(_Int64__WEBPACK_IMPORTED_MODULE_1__.Int64.fromNumber(header.value.valueOf()).bytes, 1);
                return tsBytes;
            case "uuid":
                if (!UUID_PATTERN.test(header.value)) {
                    throw new Error(`Invalid UUID received: ${header.value}`);
                }
                const uuidBytes = new Uint8Array(17);
                uuidBytes[0] = 9;
                uuidBytes.set((0,_smithy_util_hex_encoding__WEBPACK_IMPORTED_MODULE_0__.fromHex)(header.value.replace(/\-/g, "")), 1);
                return uuidBytes;
        }
    }
    parse(headers) {
        const out = {};
        let position = 0;
        while (position < headers.byteLength) {
            const nameLength = headers.getUint8(position++);
            const name = this.toUtf8(new Uint8Array(headers.buffer, headers.byteOffset + position, nameLength));
            position += nameLength;
            switch (headers.getUint8(position++)) {
                case 0:
                    out[name] = {
                        type: BOOLEAN_TAG,
                        value: true,
                    };
                    break;
                case 1:
                    out[name] = {
                        type: BOOLEAN_TAG,
                        value: false,
                    };
                    break;
                case 2:
                    out[name] = {
                        type: BYTE_TAG,
                        value: headers.getInt8(position++),
                    };
                    break;
                case 3:
                    out[name] = {
                        type: SHORT_TAG,
                        value: headers.getInt16(position, false),
                    };
                    position += 2;
                    break;
                case 4:
                    out[name] = {
                        type: INT_TAG,
                        value: headers.getInt32(position, false),
                    };
                    position += 4;
                    break;
                case 5:
                    out[name] = {
                        type: LONG_TAG,
                        value: new _Int64__WEBPACK_IMPORTED_MODULE_1__.Int64(new Uint8Array(headers.buffer, headers.byteOffset + position, 8)),
                    };
                    position += 8;
                    break;
                case 6:
                    const binaryLength = headers.getUint16(position, false);
                    position += 2;
                    out[name] = {
                        type: BINARY_TAG,
                        value: new Uint8Array(headers.buffer, headers.byteOffset + position, binaryLength),
                    };
                    position += binaryLength;
                    break;
                case 7:
                    const stringLength = headers.getUint16(position, false);
                    position += 2;
                    out[name] = {
                        type: STRING_TAG,
                        value: this.toUtf8(new Uint8Array(headers.buffer, headers.byteOffset + position, stringLength)),
                    };
                    position += stringLength;
                    break;
                case 8:
                    out[name] = {
                        type: TIMESTAMP_TAG,
                        value: new Date(new _Int64__WEBPACK_IMPORTED_MODULE_1__.Int64(new Uint8Array(headers.buffer, headers.byteOffset + position, 8)).valueOf()),
                    };
                    position += 8;
                    break;
                case 9:
                    const uuidBytes = new Uint8Array(headers.buffer, headers.byteOffset + position, 16);
                    position += 16;
                    out[name] = {
                        type: UUID_TAG,
                        value: `${(0,_smithy_util_hex_encoding__WEBPACK_IMPORTED_MODULE_0__.toHex)(uuidBytes.subarray(0, 4))}-${(0,_smithy_util_hex_encoding__WEBPACK_IMPORTED_MODULE_0__.toHex)(uuidBytes.subarray(4, 6))}-${(0,_smithy_util_hex_encoding__WEBPACK_IMPORTED_MODULE_0__.toHex)(uuidBytes.subarray(6, 8))}-${(0,_smithy_util_hex_encoding__WEBPACK_IMPORTED_MODULE_0__.toHex)(uuidBytes.subarray(8, 10))}-${(0,_smithy_util_hex_encoding__WEBPACK_IMPORTED_MODULE_0__.toHex)(uuidBytes.subarray(10))}`,
                    };
                    break;
                default:
                    throw new Error(`Unrecognized header type tag`);
            }
        }
        return out;
    }
}
var HEADER_VALUE_TYPE;
(function (HEADER_VALUE_TYPE) {
    HEADER_VALUE_TYPE[HEADER_VALUE_TYPE["boolTrue"] = 0] = "boolTrue";
    HEADER_VALUE_TYPE[HEADER_VALUE_TYPE["boolFalse"] = 1] = "boolFalse";
    HEADER_VALUE_TYPE[HEADER_VALUE_TYPE["byte"] = 2] = "byte";
    HEADER_VALUE_TYPE[HEADER_VALUE_TYPE["short"] = 3] = "short";
    HEADER_VALUE_TYPE[HEADER_VALUE_TYPE["integer"] = 4] = "integer";
    HEADER_VALUE_TYPE[HEADER_VALUE_TYPE["long"] = 5] = "long";
    HEADER_VALUE_TYPE[HEADER_VALUE_TYPE["byteArray"] = 6] = "byteArray";
    HEADER_VALUE_TYPE[HEADER_VALUE_TYPE["string"] = 7] = "string";
    HEADER_VALUE_TYPE[HEADER_VALUE_TYPE["timestamp"] = 8] = "timestamp";
    HEADER_VALUE_TYPE[HEADER_VALUE_TYPE["uuid"] = 9] = "uuid";
})(HEADER_VALUE_TYPE || (HEADER_VALUE_TYPE = {}));
const BOOLEAN_TAG = "boolean";
const BYTE_TAG = "byte";
const SHORT_TAG = "short";
const INT_TAG = "integer";
const LONG_TAG = "long";
const BINARY_TAG = "binary";
const STRING_TAG = "string";
const TIMESTAMP_TAG = "timestamp";
const UUID_TAG = "uuid";
const UUID_PATTERN = /^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/;


/***/ }),

/***/ "../../node_modules/@smithy/eventstream-codec/dist-es/Int64.js":
/*!*********************************************************************!*\
  !*** ../../node_modules/@smithy/eventstream-codec/dist-es/Int64.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Int64: () => (/* binding */ Int64)
/* harmony export */ });
/* harmony import */ var _smithy_util_hex_encoding__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @smithy/util-hex-encoding */ "../../node_modules/@smithy/util-hex-encoding/dist-es/index.js");

class Int64 {
    constructor(bytes) {
        this.bytes = bytes;
        if (bytes.byteLength !== 8) {
            throw new Error("Int64 buffers must be exactly 8 bytes");
        }
    }
    static fromNumber(number) {
        if (number > 9223372036854776000 || number < -9223372036854776000) {
            throw new Error(`${number} is too large (or, if negative, too small) to represent as an Int64`);
        }
        const bytes = new Uint8Array(8);
        for (let i = 7, remaining = Math.abs(Math.round(number)); i > -1 && remaining > 0; i--, remaining /= 256) {
            bytes[i] = remaining;
        }
        if (number < 0) {
            negate(bytes);
        }
        return new Int64(bytes);
    }
    valueOf() {
        const bytes = this.bytes.slice(0);
        const negative = bytes[0] & 0b10000000;
        if (negative) {
            negate(bytes);
        }
        return parseInt((0,_smithy_util_hex_encoding__WEBPACK_IMPORTED_MODULE_0__.toHex)(bytes), 16) * (negative ? -1 : 1);
    }
    toString() {
        return String(this.valueOf());
    }
}
function negate(bytes) {
    for (let i = 0; i < 8; i++) {
        bytes[i] ^= 0xff;
    }
    for (let i = 7; i > -1; i--) {
        bytes[i]++;
        if (bytes[i] !== 0)
            break;
    }
}


/***/ }),

/***/ "../../node_modules/@smithy/eventstream-codec/dist-es/Message.js":
/*!***********************************************************************!*\
  !*** ../../node_modules/@smithy/eventstream-codec/dist-es/Message.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "../../node_modules/@smithy/eventstream-codec/dist-es/MessageDecoderStream.js":
/*!************************************************************************************!*\
  !*** ../../node_modules/@smithy/eventstream-codec/dist-es/MessageDecoderStream.js ***!
  \************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MessageDecoderStream: () => (/* binding */ MessageDecoderStream)
/* harmony export */ });
class MessageDecoderStream {
    constructor(options) {
        this.options = options;
    }
    [Symbol.asyncIterator]() {
        return this.asyncIterator();
    }
    async *asyncIterator() {
        for await (const bytes of this.options.inputStream) {
            const decoded = this.options.decoder.decode(bytes);
            yield decoded;
        }
    }
}


/***/ }),

/***/ "../../node_modules/@smithy/eventstream-codec/dist-es/MessageEncoderStream.js":
/*!************************************************************************************!*\
  !*** ../../node_modules/@smithy/eventstream-codec/dist-es/MessageEncoderStream.js ***!
  \************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MessageEncoderStream: () => (/* binding */ MessageEncoderStream)
/* harmony export */ });
class MessageEncoderStream {
    constructor(options) {
        this.options = options;
    }
    [Symbol.asyncIterator]() {
        return this.asyncIterator();
    }
    async *asyncIterator() {
        for await (const msg of this.options.messageStream) {
            const encoded = this.options.encoder.encode(msg);
            yield encoded;
        }
        if (this.options.includeEndFrame) {
            yield new Uint8Array(0);
        }
    }
}


/***/ }),

/***/ "../../node_modules/@smithy/eventstream-codec/dist-es/SmithyMessageDecoderStream.js":
/*!******************************************************************************************!*\
  !*** ../../node_modules/@smithy/eventstream-codec/dist-es/SmithyMessageDecoderStream.js ***!
  \******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SmithyMessageDecoderStream: () => (/* binding */ SmithyMessageDecoderStream)
/* harmony export */ });
class SmithyMessageDecoderStream {
    constructor(options) {
        this.options = options;
    }
    [Symbol.asyncIterator]() {
        return this.asyncIterator();
    }
    async *asyncIterator() {
        for await (const message of this.options.messageStream) {
            const deserialized = await this.options.deserializer(message);
            if (deserialized === undefined)
                continue;
            yield deserialized;
        }
    }
}


/***/ }),

/***/ "../../node_modules/@smithy/eventstream-codec/dist-es/SmithyMessageEncoderStream.js":
/*!******************************************************************************************!*\
  !*** ../../node_modules/@smithy/eventstream-codec/dist-es/SmithyMessageEncoderStream.js ***!
  \******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SmithyMessageEncoderStream: () => (/* binding */ SmithyMessageEncoderStream)
/* harmony export */ });
class SmithyMessageEncoderStream {
    constructor(options) {
        this.options = options;
    }
    [Symbol.asyncIterator]() {
        return this.asyncIterator();
    }
    async *asyncIterator() {
        for await (const chunk of this.options.inputStream) {
            const payloadBuf = this.options.serializer(chunk);
            yield payloadBuf;
        }
    }
}


/***/ }),

/***/ "../../node_modules/@smithy/eventstream-codec/dist-es/index.js":
/*!*********************************************************************!*\
  !*** ../../node_modules/@smithy/eventstream-codec/dist-es/index.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   EventStreamCodec: () => (/* reexport safe */ _EventStreamCodec__WEBPACK_IMPORTED_MODULE_0__.EventStreamCodec),
/* harmony export */   HeaderMarshaller: () => (/* reexport safe */ _HeaderMarshaller__WEBPACK_IMPORTED_MODULE_1__.HeaderMarshaller),
/* harmony export */   Int64: () => (/* reexport safe */ _Int64__WEBPACK_IMPORTED_MODULE_2__.Int64),
/* harmony export */   MessageDecoderStream: () => (/* reexport safe */ _MessageDecoderStream__WEBPACK_IMPORTED_MODULE_4__.MessageDecoderStream),
/* harmony export */   MessageEncoderStream: () => (/* reexport safe */ _MessageEncoderStream__WEBPACK_IMPORTED_MODULE_5__.MessageEncoderStream),
/* harmony export */   SmithyMessageDecoderStream: () => (/* reexport safe */ _SmithyMessageDecoderStream__WEBPACK_IMPORTED_MODULE_6__.SmithyMessageDecoderStream),
/* harmony export */   SmithyMessageEncoderStream: () => (/* reexport safe */ _SmithyMessageEncoderStream__WEBPACK_IMPORTED_MODULE_7__.SmithyMessageEncoderStream)
/* harmony export */ });
/* harmony import */ var _EventStreamCodec__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./EventStreamCodec */ "../../node_modules/@smithy/eventstream-codec/dist-es/EventStreamCodec.js");
/* harmony import */ var _HeaderMarshaller__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./HeaderMarshaller */ "../../node_modules/@smithy/eventstream-codec/dist-es/HeaderMarshaller.js");
/* harmony import */ var _Int64__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Int64 */ "../../node_modules/@smithy/eventstream-codec/dist-es/Int64.js");
/* harmony import */ var _Message__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Message */ "../../node_modules/@smithy/eventstream-codec/dist-es/Message.js");
/* harmony import */ var _MessageDecoderStream__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./MessageDecoderStream */ "../../node_modules/@smithy/eventstream-codec/dist-es/MessageDecoderStream.js");
/* harmony import */ var _MessageEncoderStream__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./MessageEncoderStream */ "../../node_modules/@smithy/eventstream-codec/dist-es/MessageEncoderStream.js");
/* harmony import */ var _SmithyMessageDecoderStream__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./SmithyMessageDecoderStream */ "../../node_modules/@smithy/eventstream-codec/dist-es/SmithyMessageDecoderStream.js");
/* harmony import */ var _SmithyMessageEncoderStream__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./SmithyMessageEncoderStream */ "../../node_modules/@smithy/eventstream-codec/dist-es/SmithyMessageEncoderStream.js");










/***/ }),

/***/ "../../node_modules/@smithy/eventstream-codec/dist-es/splitMessage.js":
/*!****************************************************************************!*\
  !*** ../../node_modules/@smithy/eventstream-codec/dist-es/splitMessage.js ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   splitMessage: () => (/* binding */ splitMessage)
/* harmony export */ });
/* harmony import */ var _aws_crypto_crc32__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @aws-crypto/crc32 */ "../../node_modules/@aws-crypto/crc32/build/module/index.js");

const PRELUDE_MEMBER_LENGTH = 4;
const PRELUDE_LENGTH = PRELUDE_MEMBER_LENGTH * 2;
const CHECKSUM_LENGTH = 4;
const MINIMUM_MESSAGE_LENGTH = PRELUDE_LENGTH + CHECKSUM_LENGTH * 2;
function splitMessage({ byteLength, byteOffset, buffer }) {
    if (byteLength < MINIMUM_MESSAGE_LENGTH) {
        throw new Error("Provided message too short to accommodate event stream message overhead");
    }
    const view = new DataView(buffer, byteOffset, byteLength);
    const messageLength = view.getUint32(0, false);
    if (byteLength !== messageLength) {
        throw new Error("Reported message length does not match received message length");
    }
    const headerLength = view.getUint32(PRELUDE_MEMBER_LENGTH, false);
    const expectedPreludeChecksum = view.getUint32(PRELUDE_LENGTH, false);
    const expectedMessageChecksum = view.getUint32(byteLength - CHECKSUM_LENGTH, false);
    const checksummer = new _aws_crypto_crc32__WEBPACK_IMPORTED_MODULE_0__.Crc32().update(new Uint8Array(buffer, byteOffset, PRELUDE_LENGTH));
    if (expectedPreludeChecksum !== checksummer.digest()) {
        throw new Error(`The prelude checksum specified in the message (${expectedPreludeChecksum}) does not match the calculated CRC32 checksum (${checksummer.digest()})`);
    }
    checksummer.update(new Uint8Array(buffer, byteOffset + PRELUDE_LENGTH, byteLength - (PRELUDE_LENGTH + CHECKSUM_LENGTH)));
    if (expectedMessageChecksum !== checksummer.digest()) {
        throw new Error(`The message checksum (${checksummer.digest()}) did not match the expected value of ${expectedMessageChecksum}`);
    }
    return {
        headers: new DataView(buffer, byteOffset + PRELUDE_LENGTH + CHECKSUM_LENGTH, headerLength),
        body: new Uint8Array(buffer, byteOffset + PRELUDE_LENGTH + CHECKSUM_LENGTH + headerLength, messageLength - headerLength - (PRELUDE_LENGTH + CHECKSUM_LENGTH + CHECKSUM_LENGTH)),
    };
}


/***/ }),

/***/ "../../node_modules/@smithy/eventstream-serde-browser/dist-es/EventStreamMarshaller.js":
/*!*********************************************************************************************!*\
  !*** ../../node_modules/@smithy/eventstream-serde-browser/dist-es/EventStreamMarshaller.js ***!
  \*********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   EventStreamMarshaller: () => (/* binding */ EventStreamMarshaller)
/* harmony export */ });
/* harmony import */ var _smithy_eventstream_serde_universal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @smithy/eventstream-serde-universal */ "../../node_modules/@smithy/eventstream-serde-universal/dist-es/index.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils */ "../../node_modules/@smithy/eventstream-serde-browser/dist-es/utils.js");


class EventStreamMarshaller {
    constructor({ utf8Encoder, utf8Decoder }) {
        this.universalMarshaller = new _smithy_eventstream_serde_universal__WEBPACK_IMPORTED_MODULE_0__.EventStreamMarshaller({
            utf8Decoder,
            utf8Encoder,
        });
    }
    deserialize(body, deserializer) {
        const bodyIterable = isReadableStream(body) ? (0,_utils__WEBPACK_IMPORTED_MODULE_1__.readableStreamtoIterable)(body) : body;
        return this.universalMarshaller.deserialize(bodyIterable, deserializer);
    }
    serialize(input, serializer) {
        const serialziedIterable = this.universalMarshaller.serialize(input, serializer);
        return typeof ReadableStream === "function" ? (0,_utils__WEBPACK_IMPORTED_MODULE_1__.iterableToReadableStream)(serialziedIterable) : serialziedIterable;
    }
}
const isReadableStream = (body) => typeof ReadableStream === "function" && body instanceof ReadableStream;


/***/ }),

/***/ "../../node_modules/@smithy/eventstream-serde-browser/dist-es/index.js":
/*!*****************************************************************************!*\
  !*** ../../node_modules/@smithy/eventstream-serde-browser/dist-es/index.js ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   EventStreamMarshaller: () => (/* reexport safe */ _EventStreamMarshaller__WEBPACK_IMPORTED_MODULE_0__.EventStreamMarshaller),
/* harmony export */   eventStreamSerdeProvider: () => (/* reexport safe */ _provider__WEBPACK_IMPORTED_MODULE_1__.eventStreamSerdeProvider),
/* harmony export */   iterableToReadableStream: () => (/* reexport safe */ _utils__WEBPACK_IMPORTED_MODULE_2__.iterableToReadableStream),
/* harmony export */   readableStreamtoIterable: () => (/* reexport safe */ _utils__WEBPACK_IMPORTED_MODULE_2__.readableStreamtoIterable)
/* harmony export */ });
/* harmony import */ var _EventStreamMarshaller__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./EventStreamMarshaller */ "../../node_modules/@smithy/eventstream-serde-browser/dist-es/EventStreamMarshaller.js");
/* harmony import */ var _provider__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./provider */ "../../node_modules/@smithy/eventstream-serde-browser/dist-es/provider.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils */ "../../node_modules/@smithy/eventstream-serde-browser/dist-es/utils.js");





/***/ }),

/***/ "../../node_modules/@smithy/eventstream-serde-browser/dist-es/provider.js":
/*!********************************************************************************!*\
  !*** ../../node_modules/@smithy/eventstream-serde-browser/dist-es/provider.js ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   eventStreamSerdeProvider: () => (/* binding */ eventStreamSerdeProvider)
/* harmony export */ });
/* harmony import */ var _EventStreamMarshaller__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./EventStreamMarshaller */ "../../node_modules/@smithy/eventstream-serde-browser/dist-es/EventStreamMarshaller.js");

const eventStreamSerdeProvider = (options) => new _EventStreamMarshaller__WEBPACK_IMPORTED_MODULE_0__.EventStreamMarshaller(options);


/***/ }),

/***/ "../../node_modules/@smithy/eventstream-serde-browser/dist-es/utils.js":
/*!*****************************************************************************!*\
  !*** ../../node_modules/@smithy/eventstream-serde-browser/dist-es/utils.js ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   iterableToReadableStream: () => (/* binding */ iterableToReadableStream),
/* harmony export */   readableStreamtoIterable: () => (/* binding */ readableStreamtoIterable)
/* harmony export */ });
const readableStreamtoIterable = (readableStream) => ({
    [Symbol.asyncIterator]: async function* () {
        const reader = readableStream.getReader();
        try {
            while (true) {
                const { done, value } = await reader.read();
                if (done)
                    return;
                yield value;
            }
        }
        finally {
            reader.releaseLock();
        }
    },
});
const iterableToReadableStream = (asyncIterable) => {
    const iterator = asyncIterable[Symbol.asyncIterator]();
    return new ReadableStream({
        async pull(controller) {
            const { done, value } = await iterator.next();
            if (done) {
                return controller.close();
            }
            controller.enqueue(value);
        },
    });
};


/***/ }),

/***/ "../../node_modules/@smithy/eventstream-serde-config-resolver/dist-es/EventStreamSerdeConfig.js":
/*!******************************************************************************************************!*\
  !*** ../../node_modules/@smithy/eventstream-serde-config-resolver/dist-es/EventStreamSerdeConfig.js ***!
  \******************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   resolveEventStreamSerdeConfig: () => (/* binding */ resolveEventStreamSerdeConfig)
/* harmony export */ });
const resolveEventStreamSerdeConfig = (input) => ({
    ...input,
    eventStreamMarshaller: input.eventStreamSerdeProvider(input),
});


/***/ }),

/***/ "../../node_modules/@smithy/eventstream-serde-config-resolver/dist-es/index.js":
/*!*************************************************************************************!*\
  !*** ../../node_modules/@smithy/eventstream-serde-config-resolver/dist-es/index.js ***!
  \*************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   resolveEventStreamSerdeConfig: () => (/* reexport safe */ _EventStreamSerdeConfig__WEBPACK_IMPORTED_MODULE_0__.resolveEventStreamSerdeConfig)
/* harmony export */ });
/* harmony import */ var _EventStreamSerdeConfig__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./EventStreamSerdeConfig */ "../../node_modules/@smithy/eventstream-serde-config-resolver/dist-es/EventStreamSerdeConfig.js");



/***/ }),

/***/ "../../node_modules/@smithy/eventstream-serde-universal/dist-es/EventStreamMarshaller.js":
/*!***********************************************************************************************!*\
  !*** ../../node_modules/@smithy/eventstream-serde-universal/dist-es/EventStreamMarshaller.js ***!
  \***********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   EventStreamMarshaller: () => (/* binding */ EventStreamMarshaller)
/* harmony export */ });
/* harmony import */ var _smithy_eventstream_codec__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @smithy/eventstream-codec */ "../../node_modules/@smithy/eventstream-codec/dist-es/index.js");
/* harmony import */ var _getChunkedStream__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./getChunkedStream */ "../../node_modules/@smithy/eventstream-serde-universal/dist-es/getChunkedStream.js");
/* harmony import */ var _getUnmarshalledStream__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./getUnmarshalledStream */ "../../node_modules/@smithy/eventstream-serde-universal/dist-es/getUnmarshalledStream.js");



class EventStreamMarshaller {
    constructor({ utf8Encoder, utf8Decoder }) {
        this.eventStreamCodec = new _smithy_eventstream_codec__WEBPACK_IMPORTED_MODULE_0__.EventStreamCodec(utf8Encoder, utf8Decoder);
        this.utfEncoder = utf8Encoder;
    }
    deserialize(body, deserializer) {
        const inputStream = (0,_getChunkedStream__WEBPACK_IMPORTED_MODULE_1__.getChunkedStream)(body);
        return new _smithy_eventstream_codec__WEBPACK_IMPORTED_MODULE_0__.SmithyMessageDecoderStream({
            messageStream: new _smithy_eventstream_codec__WEBPACK_IMPORTED_MODULE_0__.MessageDecoderStream({ inputStream, decoder: this.eventStreamCodec }),
            deserializer: (0,_getUnmarshalledStream__WEBPACK_IMPORTED_MODULE_2__.getMessageUnmarshaller)(deserializer, this.utfEncoder),
        });
    }
    serialize(inputStream, serializer) {
        return new _smithy_eventstream_codec__WEBPACK_IMPORTED_MODULE_0__.MessageEncoderStream({
            messageStream: new _smithy_eventstream_codec__WEBPACK_IMPORTED_MODULE_0__.SmithyMessageEncoderStream({ inputStream, serializer }),
            encoder: this.eventStreamCodec,
            includeEndFrame: true,
        });
    }
}


/***/ }),

/***/ "../../node_modules/@smithy/eventstream-serde-universal/dist-es/getChunkedStream.js":
/*!******************************************************************************************!*\
  !*** ../../node_modules/@smithy/eventstream-serde-universal/dist-es/getChunkedStream.js ***!
  \******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getChunkedStream: () => (/* binding */ getChunkedStream)
/* harmony export */ });
function getChunkedStream(source) {
    let currentMessageTotalLength = 0;
    let currentMessagePendingLength = 0;
    let currentMessage = null;
    let messageLengthBuffer = null;
    const allocateMessage = (size) => {
        if (typeof size !== "number") {
            throw new Error("Attempted to allocate an event message where size was not a number: " + size);
        }
        currentMessageTotalLength = size;
        currentMessagePendingLength = 4;
        currentMessage = new Uint8Array(size);
        const currentMessageView = new DataView(currentMessage.buffer);
        currentMessageView.setUint32(0, size, false);
    };
    const iterator = async function* () {
        const sourceIterator = source[Symbol.asyncIterator]();
        while (true) {
            const { value, done } = await sourceIterator.next();
            if (done) {
                if (!currentMessageTotalLength) {
                    return;
                }
                else if (currentMessageTotalLength === currentMessagePendingLength) {
                    yield currentMessage;
                }
                else {
                    throw new Error("Truncated event message received.");
                }
                return;
            }
            const chunkLength = value.length;
            let currentOffset = 0;
            while (currentOffset < chunkLength) {
                if (!currentMessage) {
                    const bytesRemaining = chunkLength - currentOffset;
                    if (!messageLengthBuffer) {
                        messageLengthBuffer = new Uint8Array(4);
                    }
                    const numBytesForTotal = Math.min(4 - currentMessagePendingLength, bytesRemaining);
                    messageLengthBuffer.set(value.slice(currentOffset, currentOffset + numBytesForTotal), currentMessagePendingLength);
                    currentMessagePendingLength += numBytesForTotal;
                    currentOffset += numBytesForTotal;
                    if (currentMessagePendingLength < 4) {
                        break;
                    }
                    allocateMessage(new DataView(messageLengthBuffer.buffer).getUint32(0, false));
                    messageLengthBuffer = null;
                }
                const numBytesToWrite = Math.min(currentMessageTotalLength - currentMessagePendingLength, chunkLength - currentOffset);
                currentMessage.set(value.slice(currentOffset, currentOffset + numBytesToWrite), currentMessagePendingLength);
                currentMessagePendingLength += numBytesToWrite;
                currentOffset += numBytesToWrite;
                if (currentMessageTotalLength && currentMessageTotalLength === currentMessagePendingLength) {
                    yield currentMessage;
                    currentMessage = null;
                    currentMessageTotalLength = 0;
                    currentMessagePendingLength = 0;
                }
            }
        }
    };
    return {
        [Symbol.asyncIterator]: iterator,
    };
}


/***/ }),

/***/ "../../node_modules/@smithy/eventstream-serde-universal/dist-es/getUnmarshalledStream.js":
/*!***********************************************************************************************!*\
  !*** ../../node_modules/@smithy/eventstream-serde-universal/dist-es/getUnmarshalledStream.js ***!
  \***********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getMessageUnmarshaller: () => (/* binding */ getMessageUnmarshaller),
/* harmony export */   getUnmarshalledStream: () => (/* binding */ getUnmarshalledStream)
/* harmony export */ });
function getUnmarshalledStream(source, options) {
    const messageUnmarshaller = getMessageUnmarshaller(options.deserializer, options.toUtf8);
    return {
        [Symbol.asyncIterator]: async function* () {
            for await (const chunk of source) {
                const message = options.eventStreamCodec.decode(chunk);
                const type = await messageUnmarshaller(message);
                if (type === undefined)
                    continue;
                yield type;
            }
        },
    };
}
function getMessageUnmarshaller(deserializer, toUtf8) {
    return async function (message) {
        const { value: messageType } = message.headers[":message-type"];
        if (messageType === "error") {
            const unmodeledError = new Error(message.headers[":error-message"].value || "UnknownError");
            unmodeledError.name = message.headers[":error-code"].value;
            throw unmodeledError;
        }
        else if (messageType === "exception") {
            const code = message.headers[":exception-type"].value;
            const exception = { [code]: message };
            const deserializedException = await deserializer(exception);
            if (deserializedException.$unknown) {
                const error = new Error(toUtf8(message.body));
                error.name = code;
                throw error;
            }
            throw deserializedException[code];
        }
        else if (messageType === "event") {
            const event = {
                [message.headers[":event-type"].value]: message,
            };
            const deserialized = await deserializer(event);
            if (deserialized.$unknown)
                return;
            return deserialized;
        }
        else {
            throw Error(`Unrecognizable event type: ${message.headers[":event-type"].value}`);
        }
    };
}


/***/ }),

/***/ "../../node_modules/@smithy/eventstream-serde-universal/dist-es/index.js":
/*!*******************************************************************************!*\
  !*** ../../node_modules/@smithy/eventstream-serde-universal/dist-es/index.js ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   EventStreamMarshaller: () => (/* reexport safe */ _EventStreamMarshaller__WEBPACK_IMPORTED_MODULE_0__.EventStreamMarshaller),
/* harmony export */   eventStreamSerdeProvider: () => (/* reexport safe */ _provider__WEBPACK_IMPORTED_MODULE_1__.eventStreamSerdeProvider)
/* harmony export */ });
/* harmony import */ var _EventStreamMarshaller__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./EventStreamMarshaller */ "../../node_modules/@smithy/eventstream-serde-universal/dist-es/EventStreamMarshaller.js");
/* harmony import */ var _provider__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./provider */ "../../node_modules/@smithy/eventstream-serde-universal/dist-es/provider.js");




/***/ }),

/***/ "../../node_modules/@smithy/eventstream-serde-universal/dist-es/provider.js":
/*!**********************************************************************************!*\
  !*** ../../node_modules/@smithy/eventstream-serde-universal/dist-es/provider.js ***!
  \**********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   eventStreamSerdeProvider: () => (/* binding */ eventStreamSerdeProvider)
/* harmony export */ });
/* harmony import */ var _EventStreamMarshaller__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./EventStreamMarshaller */ "../../node_modules/@smithy/eventstream-serde-universal/dist-es/EventStreamMarshaller.js");

const eventStreamSerdeProvider = (options) => new _EventStreamMarshaller__WEBPACK_IMPORTED_MODULE_0__.EventStreamMarshaller(options);


/***/ }),

/***/ "../../node_modules/@smithy/fetch-http-handler/dist-es/fetch-http-handler.js":
/*!***********************************************************************************!*\
  !*** ../../node_modules/@smithy/fetch-http-handler/dist-es/fetch-http-handler.js ***!
  \***********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FetchHttpHandler: () => (/* binding */ FetchHttpHandler),
/* harmony export */   keepAliveSupport: () => (/* binding */ keepAliveSupport)
/* harmony export */ });
/* harmony import */ var _smithy_protocol_http__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @smithy/protocol-http */ "../../node_modules/@smithy/protocol-http/dist-es/index.js");
/* harmony import */ var _smithy_querystring_builder__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @smithy/querystring-builder */ "../../node_modules/@smithy/querystring-builder/dist-es/index.js");
/* harmony import */ var _request_timeout__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./request-timeout */ "../../node_modules/@smithy/fetch-http-handler/dist-es/request-timeout.js");



const keepAliveSupport = {
    supported: undefined,
};
class FetchHttpHandler {
    static create(instanceOrOptions) {
        if (typeof instanceOrOptions?.handle === "function") {
            return instanceOrOptions;
        }
        return new FetchHttpHandler(instanceOrOptions);
    }
    constructor(options) {
        if (typeof options === "function") {
            this.configProvider = options().then((opts) => opts || {});
        }
        else {
            this.config = options ?? {};
            this.configProvider = Promise.resolve(this.config);
        }
        if (keepAliveSupport.supported === undefined) {
            keepAliveSupport.supported = Boolean(typeof Request !== "undefined" && "keepalive" in new Request("https://[::1]"));
        }
    }
    destroy() {
    }
    async handle(request, { abortSignal } = {}) {
        if (!this.config) {
            this.config = await this.configProvider;
        }
        const requestTimeoutInMs = this.config.requestTimeout;
        const keepAlive = this.config.keepAlive === true;
        const credentials = this.config.credentials;
        if (abortSignal?.aborted) {
            const abortError = new Error("Request aborted");
            abortError.name = "AbortError";
            return Promise.reject(abortError);
        }
        let path = request.path;
        const queryString = (0,_smithy_querystring_builder__WEBPACK_IMPORTED_MODULE_1__.buildQueryString)(request.query || {});
        if (queryString) {
            path += `?${queryString}`;
        }
        if (request.fragment) {
            path += `#${request.fragment}`;
        }
        let auth = "";
        if (request.username != null || request.password != null) {
            const username = request.username ?? "";
            const password = request.password ?? "";
            auth = `${username}:${password}@`;
        }
        const { port, method } = request;
        const url = `${request.protocol}//${auth}${request.hostname}${port ? `:${port}` : ""}${path}`;
        const body = method === "GET" || method === "HEAD" ? undefined : request.body;
        const requestOptions = {
            body,
            headers: new Headers(request.headers),
            method: method,
            credentials,
        };
        if (this.config?.cache) {
            requestOptions.cache = this.config.cache;
        }
        if (body) {
            requestOptions.duplex = "half";
        }
        if (typeof AbortController !== "undefined") {
            requestOptions.signal = abortSignal;
        }
        if (keepAliveSupport.supported) {
            requestOptions.keepalive = keepAlive;
        }
        if (typeof this.config.requestInit === "function") {
            Object.assign(requestOptions, this.config.requestInit(request));
        }
        let removeSignalEventListener = () => { };
        const fetchRequest = new Request(url, requestOptions);
        const raceOfPromises = [
            fetch(fetchRequest).then((response) => {
                const fetchHeaders = response.headers;
                const transformedHeaders = {};
                for (const pair of fetchHeaders.entries()) {
                    transformedHeaders[pair[0]] = pair[1];
                }
                const hasReadableStream = response.body != undefined;
                if (!hasReadableStream) {
                    return response.blob().then((body) => ({
                        response: new _smithy_protocol_http__WEBPACK_IMPORTED_MODULE_0__.HttpResponse({
                            headers: transformedHeaders,
                            reason: response.statusText,
                            statusCode: response.status,
                            body,
                        }),
                    }));
                }
                return {
                    response: new _smithy_protocol_http__WEBPACK_IMPORTED_MODULE_0__.HttpResponse({
                        headers: transformedHeaders,
                        reason: response.statusText,
                        statusCode: response.status,
                        body: response.body,
                    }),
                };
            }),
            (0,_request_timeout__WEBPACK_IMPORTED_MODULE_2__.requestTimeout)(requestTimeoutInMs),
        ];
        if (abortSignal) {
            raceOfPromises.push(new Promise((resolve, reject) => {
                const onAbort = () => {
                    const abortError = new Error("Request aborted");
                    abortError.name = "AbortError";
                    reject(abortError);
                };
                if (typeof abortSignal.addEventListener === "function") {
                    const signal = abortSignal;
                    signal.addEventListener("abort", onAbort, { once: true });
                    removeSignalEventListener = () => signal.removeEventListener("abort", onAbort);
                }
                else {
                    abortSignal.onabort = onAbort;
                }
            }));
        }
        return Promise.race(raceOfPromises).finally(removeSignalEventListener);
    }
    updateHttpClientConfig(key, value) {
        this.config = undefined;
        this.configProvider = this.configProvider.then((config) => {
            config[key] = value;
            return config;
        });
    }
    httpHandlerConfigs() {
        return this.config ?? {};
    }
}


/***/ }),

/***/ "../../node_modules/@smithy/fetch-http-handler/dist-es/index.js":
/*!**********************************************************************!*\
  !*** ../../node_modules/@smithy/fetch-http-handler/dist-es/index.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FetchHttpHandler: () => (/* reexport safe */ _fetch_http_handler__WEBPACK_IMPORTED_MODULE_0__.FetchHttpHandler),
/* harmony export */   keepAliveSupport: () => (/* reexport safe */ _fetch_http_handler__WEBPACK_IMPORTED_MODULE_0__.keepAliveSupport),
/* harmony export */   streamCollector: () => (/* reexport safe */ _stream_collector__WEBPACK_IMPORTED_MODULE_1__.streamCollector)
/* harmony export */ });
/* harmony import */ var _fetch_http_handler__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./fetch-http-handler */ "../../node_modules/@smithy/fetch-http-handler/dist-es/fetch-http-handler.js");
/* harmony import */ var _stream_collector__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./stream-collector */ "../../node_modules/@smithy/fetch-http-handler/dist-es/stream-collector.js");




/***/ }),

/***/ "../../node_modules/@smithy/fetch-http-handler/dist-es/request-timeout.js":
/*!********************************************************************************!*\
  !*** ../../node_modules/@smithy/fetch-http-handler/dist-es/request-timeout.js ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   requestTimeout: () => (/* binding */ requestTimeout)
/* harmony export */ });
function requestTimeout(timeoutInMs = 0) {
    return new Promise((resolve, reject) => {
        if (timeoutInMs) {
            setTimeout(() => {
                const timeoutError = new Error(`Request did not complete within ${timeoutInMs} ms`);
                timeoutError.name = "TimeoutError";
                reject(timeoutError);
            }, timeoutInMs);
        }
    });
}


/***/ }),

/***/ "../../node_modules/@smithy/fetch-http-handler/dist-es/stream-collector.js":
/*!*********************************************************************************!*\
  !*** ../../node_modules/@smithy/fetch-http-handler/dist-es/stream-collector.js ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   streamCollector: () => (/* binding */ streamCollector)
/* harmony export */ });
/* harmony import */ var _smithy_util_base64__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @smithy/util-base64 */ "../../node_modules/@smithy/util-base64/dist-es/index.js");

const streamCollector = (stream) => {
    if (typeof Blob === "function" && stream instanceof Blob) {
        return collectBlob(stream);
    }
    return collectStream(stream);
};
async function collectBlob(blob) {
    const base64 = await readToBase64(blob);
    const arrayBuffer = (0,_smithy_util_base64__WEBPACK_IMPORTED_MODULE_0__.fromBase64)(base64);
    return new Uint8Array(arrayBuffer);
}
async function collectStream(stream) {
    const chunks = [];
    const reader = stream.getReader();
    let isDone = false;
    let length = 0;
    while (!isDone) {
        const { done, value } = await reader.read();
        if (value) {
            chunks.push(value);
            length += value.length;
        }
        isDone = done;
    }
    const collected = new Uint8Array(length);
    let offset = 0;
    for (const chunk of chunks) {
        collected.set(chunk, offset);
        offset += chunk.length;
    }
    return collected;
}
function readToBase64(blob) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            if (reader.readyState !== 2) {
                return reject(new Error("Reader aborted too early"));
            }
            const result = (reader.result ?? "");
            const commaIndex = result.indexOf(",");
            const dataOffset = commaIndex > -1 ? commaIndex + 1 : result.length;
            resolve(result.substring(dataOffset));
        };
        reader.onabort = () => reject(new Error("Read aborted"));
        reader.onerror = () => reject(reader.error);
        reader.readAsDataURL(blob);
    });
}


/***/ }),

/***/ "../../node_modules/@smithy/invalid-dependency/dist-es/index.js":
/*!**********************************************************************!*\
  !*** ../../node_modules/@smithy/invalid-dependency/dist-es/index.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   invalidFunction: () => (/* reexport safe */ _invalidFunction__WEBPACK_IMPORTED_MODULE_0__.invalidFunction),
/* harmony export */   invalidProvider: () => (/* reexport safe */ _invalidProvider__WEBPACK_IMPORTED_MODULE_1__.invalidProvider)
/* harmony export */ });
/* harmony import */ var _invalidFunction__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./invalidFunction */ "../../node_modules/@smithy/invalid-dependency/dist-es/invalidFunction.js");
/* harmony import */ var _invalidProvider__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./invalidProvider */ "../../node_modules/@smithy/invalid-dependency/dist-es/invalidProvider.js");




/***/ }),

/***/ "../../node_modules/@smithy/invalid-dependency/dist-es/invalidFunction.js":
/*!********************************************************************************!*\
  !*** ../../node_modules/@smithy/invalid-dependency/dist-es/invalidFunction.js ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   invalidFunction: () => (/* binding */ invalidFunction)
/* harmony export */ });
const invalidFunction = (message) => () => {
    throw new Error(message);
};


/***/ }),

/***/ "../../node_modules/@smithy/invalid-dependency/dist-es/invalidProvider.js":
/*!********************************************************************************!*\
  !*** ../../node_modules/@smithy/invalid-dependency/dist-es/invalidProvider.js ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   invalidProvider: () => (/* binding */ invalidProvider)
/* harmony export */ });
const invalidProvider = (message) => () => Promise.reject(message);


/***/ }),

/***/ "../../node_modules/@smithy/is-array-buffer/dist-es/index.js":
/*!*******************************************************************!*\
  !*** ../../node_modules/@smithy/is-array-buffer/dist-es/index.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   isArrayBuffer: () => (/* binding */ isArrayBuffer)
/* harmony export */ });
const isArrayBuffer = (arg) => (typeof ArrayBuffer === "function" && arg instanceof ArrayBuffer) ||
    Object.prototype.toString.call(arg) === "[object ArrayBuffer]";


/***/ }),

/***/ "../../node_modules/@smithy/middleware-content-length/dist-es/index.js":
/*!*****************************************************************************!*\
  !*** ../../node_modules/@smithy/middleware-content-length/dist-es/index.js ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   contentLengthMiddleware: () => (/* binding */ contentLengthMiddleware),
/* harmony export */   contentLengthMiddlewareOptions: () => (/* binding */ contentLengthMiddlewareOptions),
/* harmony export */   getContentLengthPlugin: () => (/* binding */ getContentLengthPlugin)
/* harmony export */ });
/* harmony import */ var _smithy_protocol_http__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @smithy/protocol-http */ "../../node_modules/@smithy/protocol-http/dist-es/index.js");

const CONTENT_LENGTH_HEADER = "content-length";
function contentLengthMiddleware(bodyLengthChecker) {
    return (next) => async (args) => {
        const request = args.request;
        if (_smithy_protocol_http__WEBPACK_IMPORTED_MODULE_0__.HttpRequest.isInstance(request)) {
            const { body, headers } = request;
            if (body &&
                Object.keys(headers)
                    .map((str) => str.toLowerCase())
                    .indexOf(CONTENT_LENGTH_HEADER) === -1) {
                try {
                    const length = bodyLengthChecker(body);
                    request.headers = {
                        ...request.headers,
                        [CONTENT_LENGTH_HEADER]: String(length),
                    };
                }
                catch (error) {
                }
            }
        }
        return next({
            ...args,
            request,
        });
    };
}
const contentLengthMiddlewareOptions = {
    step: "build",
    tags: ["SET_CONTENT_LENGTH", "CONTENT_LENGTH"],
    name: "contentLengthMiddleware",
    override: true,
};
const getContentLengthPlugin = (options) => ({
    applyToStack: (clientStack) => {
        clientStack.add(contentLengthMiddleware(options.bodyLengthChecker), contentLengthMiddlewareOptions);
    },
});


/***/ }),

/***/ "../../node_modules/@smithy/middleware-endpoint/dist-es/adaptors/createConfigValueProvider.js":
/*!****************************************************************************************************!*\
  !*** ../../node_modules/@smithy/middleware-endpoint/dist-es/adaptors/createConfigValueProvider.js ***!
  \****************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createConfigValueProvider: () => (/* binding */ createConfigValueProvider)
/* harmony export */ });
const createConfigValueProvider = (configKey, canonicalEndpointParamKey, config) => {
    const configProvider = async () => {
        const configValue = config[configKey] ?? config[canonicalEndpointParamKey];
        if (typeof configValue === "function") {
            return configValue();
        }
        return configValue;
    };
    if (configKey === "credentialScope" || canonicalEndpointParamKey === "CredentialScope") {
        return async () => {
            const credentials = typeof config.credentials === "function" ? await config.credentials() : config.credentials;
            const configValue = credentials?.credentialScope ?? credentials?.CredentialScope;
            return configValue;
        };
    }
    if (configKey === "accountId" || canonicalEndpointParamKey === "AccountId") {
        return async () => {
            const credentials = typeof config.credentials === "function" ? await config.credentials() : config.credentials;
            const configValue = credentials?.accountId ?? credentials?.AccountId;
            return configValue;
        };
    }
    if (configKey === "endpoint" || canonicalEndpointParamKey === "endpoint") {
        return async () => {
            const endpoint = await configProvider();
            if (endpoint && typeof endpoint === "object") {
                if ("url" in endpoint) {
                    return endpoint.url.href;
                }
                if ("hostname" in endpoint) {
                    const { protocol, hostname, port, path } = endpoint;
                    return `${protocol}//${hostname}${port ? ":" + port : ""}${path}`;
                }
            }
            return endpoint;
        };
    }
    return configProvider;
};


/***/ }),

/***/ "../../node_modules/@smithy/middleware-endpoint/dist-es/adaptors/getEndpointFromConfig.browser.js":
/*!********************************************************************************************************!*\
  !*** ../../node_modules/@smithy/middleware-endpoint/dist-es/adaptors/getEndpointFromConfig.browser.js ***!
  \********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getEndpointFromConfig: () => (/* binding */ getEndpointFromConfig)
/* harmony export */ });
const getEndpointFromConfig = async (serviceId) => undefined;


/***/ }),

/***/ "../../node_modules/@smithy/middleware-endpoint/dist-es/adaptors/getEndpointFromInstructions.js":
/*!******************************************************************************************************!*\
  !*** ../../node_modules/@smithy/middleware-endpoint/dist-es/adaptors/getEndpointFromInstructions.js ***!
  \******************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getEndpointFromInstructions: () => (/* binding */ getEndpointFromInstructions),
/* harmony export */   resolveParams: () => (/* binding */ resolveParams)
/* harmony export */ });
/* harmony import */ var _service_customizations__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../service-customizations */ "../../node_modules/@smithy/middleware-endpoint/dist-es/service-customizations/index.js");
/* harmony import */ var _createConfigValueProvider__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./createConfigValueProvider */ "../../node_modules/@smithy/middleware-endpoint/dist-es/adaptors/createConfigValueProvider.js");
/* harmony import */ var _getEndpointFromConfig__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./getEndpointFromConfig */ "../../node_modules/@smithy/middleware-endpoint/dist-es/adaptors/getEndpointFromConfig.browser.js");
/* harmony import */ var _toEndpointV1__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./toEndpointV1 */ "../../node_modules/@smithy/middleware-endpoint/dist-es/adaptors/toEndpointV1.js");




const getEndpointFromInstructions = async (commandInput, instructionsSupplier, clientConfig, context) => {
    if (!clientConfig.endpoint) {
        let endpointFromConfig;
        if (clientConfig.serviceConfiguredEndpoint) {
            endpointFromConfig = await clientConfig.serviceConfiguredEndpoint();
        }
        else {
            endpointFromConfig = await (0,_getEndpointFromConfig__WEBPACK_IMPORTED_MODULE_2__.getEndpointFromConfig)(clientConfig.serviceId);
        }
        if (endpointFromConfig) {
            clientConfig.endpoint = () => Promise.resolve((0,_toEndpointV1__WEBPACK_IMPORTED_MODULE_3__.toEndpointV1)(endpointFromConfig));
        }
    }
    const endpointParams = await resolveParams(commandInput, instructionsSupplier, clientConfig);
    if (typeof clientConfig.endpointProvider !== "function") {
        throw new Error("config.endpointProvider is not set.");
    }
    const endpoint = clientConfig.endpointProvider(endpointParams, context);
    return endpoint;
};
const resolveParams = async (commandInput, instructionsSupplier, clientConfig) => {
    const endpointParams = {};
    const instructions = instructionsSupplier?.getEndpointParameterInstructions?.() || {};
    for (const [name, instruction] of Object.entries(instructions)) {
        switch (instruction.type) {
            case "staticContextParams":
                endpointParams[name] = instruction.value;
                break;
            case "contextParams":
                endpointParams[name] = commandInput[instruction.name];
                break;
            case "clientContextParams":
            case "builtInParams":
                endpointParams[name] = await (0,_createConfigValueProvider__WEBPACK_IMPORTED_MODULE_1__.createConfigValueProvider)(instruction.name, name, clientConfig)();
                break;
            default:
                throw new Error("Unrecognized endpoint parameter instruction: " + JSON.stringify(instruction));
        }
    }
    if (Object.keys(instructions).length === 0) {
        Object.assign(endpointParams, clientConfig);
    }
    if (String(clientConfig.serviceId).toLowerCase() === "s3") {
        await (0,_service_customizations__WEBPACK_IMPORTED_MODULE_0__.resolveParamsForS3)(endpointParams);
    }
    return endpointParams;
};


/***/ }),

/***/ "../../node_modules/@smithy/middleware-endpoint/dist-es/adaptors/index.js":
/*!********************************************************************************!*\
  !*** ../../node_modules/@smithy/middleware-endpoint/dist-es/adaptors/index.js ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getEndpointFromInstructions: () => (/* reexport safe */ _getEndpointFromInstructions__WEBPACK_IMPORTED_MODULE_0__.getEndpointFromInstructions),
/* harmony export */   resolveParams: () => (/* reexport safe */ _getEndpointFromInstructions__WEBPACK_IMPORTED_MODULE_0__.resolveParams),
/* harmony export */   toEndpointV1: () => (/* reexport safe */ _toEndpointV1__WEBPACK_IMPORTED_MODULE_1__.toEndpointV1)
/* harmony export */ });
/* harmony import */ var _getEndpointFromInstructions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getEndpointFromInstructions */ "../../node_modules/@smithy/middleware-endpoint/dist-es/adaptors/getEndpointFromInstructions.js");
/* harmony import */ var _toEndpointV1__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./toEndpointV1 */ "../../node_modules/@smithy/middleware-endpoint/dist-es/adaptors/toEndpointV1.js");




/***/ }),

/***/ "../../node_modules/@smithy/middleware-endpoint/dist-es/adaptors/toEndpointV1.js":
/*!***************************************************************************************!*\
  !*** ../../node_modules/@smithy/middleware-endpoint/dist-es/adaptors/toEndpointV1.js ***!
  \***************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   toEndpointV1: () => (/* binding */ toEndpointV1)
/* harmony export */ });
/* harmony import */ var _smithy_url_parser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @smithy/url-parser */ "../../node_modules/@smithy/url-parser/dist-es/index.js");

const toEndpointV1 = (endpoint) => {
    if (typeof endpoint === "object") {
        if ("url" in endpoint) {
            return (0,_smithy_url_parser__WEBPACK_IMPORTED_MODULE_0__.parseUrl)(endpoint.url);
        }
        return endpoint;
    }
    return (0,_smithy_url_parser__WEBPACK_IMPORTED_MODULE_0__.parseUrl)(endpoint);
};


/***/ }),

/***/ "../../node_modules/@smithy/middleware-endpoint/dist-es/endpointMiddleware.js":
/*!************************************************************************************!*\
  !*** ../../node_modules/@smithy/middleware-endpoint/dist-es/endpointMiddleware.js ***!
  \************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   endpointMiddleware: () => (/* binding */ endpointMiddleware)
/* harmony export */ });
/* harmony import */ var _smithy_util_middleware__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @smithy/util-middleware */ "../../node_modules/@smithy/util-middleware/dist-es/index.js");
/* harmony import */ var _adaptors_getEndpointFromInstructions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./adaptors/getEndpointFromInstructions */ "../../node_modules/@smithy/middleware-endpoint/dist-es/adaptors/getEndpointFromInstructions.js");


const endpointMiddleware = ({ config, instructions, }) => {
    return (next, context) => async (args) => {
        const endpoint = await (0,_adaptors_getEndpointFromInstructions__WEBPACK_IMPORTED_MODULE_1__.getEndpointFromInstructions)(args.input, {
            getEndpointParameterInstructions() {
                return instructions;
            },
        }, { ...config }, context);
        context.endpointV2 = endpoint;
        context.authSchemes = endpoint.properties?.authSchemes;
        const authScheme = context.authSchemes?.[0];
        if (authScheme) {
            context["signing_region"] = authScheme.signingRegion;
            context["signing_service"] = authScheme.signingName;
            const smithyContext = (0,_smithy_util_middleware__WEBPACK_IMPORTED_MODULE_0__.getSmithyContext)(context);
            const httpAuthOption = smithyContext?.selectedHttpAuthScheme?.httpAuthOption;
            if (httpAuthOption) {
                httpAuthOption.signingProperties = Object.assign(httpAuthOption.signingProperties || {}, {
                    signing_region: authScheme.signingRegion,
                    signingRegion: authScheme.signingRegion,
                    signing_service: authScheme.signingName,
                    signingName: authScheme.signingName,
                    signingRegionSet: authScheme.signingRegionSet,
                }, authScheme.properties);
            }
        }
        return next({
            ...args,
        });
    };
};


/***/ }),

/***/ "../../node_modules/@smithy/middleware-endpoint/dist-es/getEndpointPlugin.js":
/*!***********************************************************************************!*\
  !*** ../../node_modules/@smithy/middleware-endpoint/dist-es/getEndpointPlugin.js ***!
  \***********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   endpointMiddlewareOptions: () => (/* binding */ endpointMiddlewareOptions),
/* harmony export */   getEndpointPlugin: () => (/* binding */ getEndpointPlugin)
/* harmony export */ });
/* harmony import */ var _smithy_middleware_serde__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @smithy/middleware-serde */ "../../node_modules/@smithy/middleware-serde/dist-es/index.js");
/* harmony import */ var _endpointMiddleware__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./endpointMiddleware */ "../../node_modules/@smithy/middleware-endpoint/dist-es/endpointMiddleware.js");


const endpointMiddlewareOptions = {
    step: "serialize",
    tags: ["ENDPOINT_PARAMETERS", "ENDPOINT_V2", "ENDPOINT"],
    name: "endpointV2Middleware",
    override: true,
    relation: "before",
    toMiddleware: _smithy_middleware_serde__WEBPACK_IMPORTED_MODULE_0__.serializerMiddlewareOption.name,
};
const getEndpointPlugin = (config, instructions) => ({
    applyToStack: (clientStack) => {
        clientStack.addRelativeTo((0,_endpointMiddleware__WEBPACK_IMPORTED_MODULE_1__.endpointMiddleware)({
            config,
            instructions,
        }), endpointMiddlewareOptions);
    },
});


/***/ }),

/***/ "../../node_modules/@smithy/middleware-endpoint/dist-es/index.js":
/*!***********************************************************************!*\
  !*** ../../node_modules/@smithy/middleware-endpoint/dist-es/index.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   endpointMiddleware: () => (/* reexport safe */ _endpointMiddleware__WEBPACK_IMPORTED_MODULE_1__.endpointMiddleware),
/* harmony export */   endpointMiddlewareOptions: () => (/* reexport safe */ _getEndpointPlugin__WEBPACK_IMPORTED_MODULE_2__.endpointMiddlewareOptions),
/* harmony export */   getEndpointFromInstructions: () => (/* reexport safe */ _adaptors__WEBPACK_IMPORTED_MODULE_0__.getEndpointFromInstructions),
/* harmony export */   getEndpointPlugin: () => (/* reexport safe */ _getEndpointPlugin__WEBPACK_IMPORTED_MODULE_2__.getEndpointPlugin),
/* harmony export */   resolveEndpointConfig: () => (/* reexport safe */ _resolveEndpointConfig__WEBPACK_IMPORTED_MODULE_3__.resolveEndpointConfig),
/* harmony export */   resolveParams: () => (/* reexport safe */ _adaptors__WEBPACK_IMPORTED_MODULE_0__.resolveParams),
/* harmony export */   toEndpointV1: () => (/* reexport safe */ _adaptors__WEBPACK_IMPORTED_MODULE_0__.toEndpointV1)
/* harmony export */ });
/* harmony import */ var _adaptors__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./adaptors */ "../../node_modules/@smithy/middleware-endpoint/dist-es/adaptors/index.js");
/* harmony import */ var _endpointMiddleware__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./endpointMiddleware */ "../../node_modules/@smithy/middleware-endpoint/dist-es/endpointMiddleware.js");
/* harmony import */ var _getEndpointPlugin__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./getEndpointPlugin */ "../../node_modules/@smithy/middleware-endpoint/dist-es/getEndpointPlugin.js");
/* harmony import */ var _resolveEndpointConfig__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./resolveEndpointConfig */ "../../node_modules/@smithy/middleware-endpoint/dist-es/resolveEndpointConfig.js");
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./types */ "../../node_modules/@smithy/middleware-endpoint/dist-es/types.js");







/***/ }),

/***/ "../../node_modules/@smithy/middleware-endpoint/dist-es/resolveEndpointConfig.js":
/*!***************************************************************************************!*\
  !*** ../../node_modules/@smithy/middleware-endpoint/dist-es/resolveEndpointConfig.js ***!
  \***************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   resolveEndpointConfig: () => (/* binding */ resolveEndpointConfig)
/* harmony export */ });
/* harmony import */ var _smithy_util_middleware__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @smithy/util-middleware */ "../../node_modules/@smithy/util-middleware/dist-es/index.js");
/* harmony import */ var _adaptors_getEndpointFromConfig__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./adaptors/getEndpointFromConfig */ "../../node_modules/@smithy/middleware-endpoint/dist-es/adaptors/getEndpointFromConfig.browser.js");
/* harmony import */ var _adaptors_toEndpointV1__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./adaptors/toEndpointV1 */ "../../node_modules/@smithy/middleware-endpoint/dist-es/adaptors/toEndpointV1.js");



const resolveEndpointConfig = (input) => {
    const tls = input.tls ?? true;
    const { endpoint } = input;
    const customEndpointProvider = endpoint != null ? async () => (0,_adaptors_toEndpointV1__WEBPACK_IMPORTED_MODULE_2__.toEndpointV1)(await (0,_smithy_util_middleware__WEBPACK_IMPORTED_MODULE_0__.normalizeProvider)(endpoint)()) : undefined;
    const isCustomEndpoint = !!endpoint;
    const resolvedConfig = {
        ...input,
        endpoint: customEndpointProvider,
        tls,
        isCustomEndpoint,
        useDualstackEndpoint: (0,_smithy_util_middleware__WEBPACK_IMPORTED_MODULE_0__.normalizeProvider)(input.useDualstackEndpoint ?? false),
        useFipsEndpoint: (0,_smithy_util_middleware__WEBPACK_IMPORTED_MODULE_0__.normalizeProvider)(input.useFipsEndpoint ?? false),
    };
    let configuredEndpointPromise = undefined;
    resolvedConfig.serviceConfiguredEndpoint = async () => {
        if (input.serviceId && !configuredEndpointPromise) {
            configuredEndpointPromise = (0,_adaptors_getEndpointFromConfig__WEBPACK_IMPORTED_MODULE_1__.getEndpointFromConfig)(input.serviceId);
        }
        return configuredEndpointPromise;
    };
    return resolvedConfig;
};


/***/ }),

/***/ "../../node_modules/@smithy/middleware-endpoint/dist-es/service-customizations/index.js":
/*!**********************************************************************************************!*\
  !*** ../../node_modules/@smithy/middleware-endpoint/dist-es/service-customizations/index.js ***!
  \**********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DOT_PATTERN: () => (/* reexport safe */ _s3__WEBPACK_IMPORTED_MODULE_0__.DOT_PATTERN),
/* harmony export */   S3_HOSTNAME_PATTERN: () => (/* reexport safe */ _s3__WEBPACK_IMPORTED_MODULE_0__.S3_HOSTNAME_PATTERN),
/* harmony export */   isArnBucketName: () => (/* reexport safe */ _s3__WEBPACK_IMPORTED_MODULE_0__.isArnBucketName),
/* harmony export */   isDnsCompatibleBucketName: () => (/* reexport safe */ _s3__WEBPACK_IMPORTED_MODULE_0__.isDnsCompatibleBucketName),
/* harmony export */   resolveParamsForS3: () => (/* reexport safe */ _s3__WEBPACK_IMPORTED_MODULE_0__.resolveParamsForS3)
/* harmony export */ });
/* harmony import */ var _s3__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./s3 */ "../../node_modules/@smithy/middleware-endpoint/dist-es/service-customizations/s3.js");



/***/ }),

/***/ "../../node_modules/@smithy/middleware-endpoint/dist-es/service-customizations/s3.js":
/*!*******************************************************************************************!*\
  !*** ../../node_modules/@smithy/middleware-endpoint/dist-es/service-customizations/s3.js ***!
  \*******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DOT_PATTERN: () => (/* binding */ DOT_PATTERN),
/* harmony export */   S3_HOSTNAME_PATTERN: () => (/* binding */ S3_HOSTNAME_PATTERN),
/* harmony export */   isArnBucketName: () => (/* binding */ isArnBucketName),
/* harmony export */   isDnsCompatibleBucketName: () => (/* binding */ isDnsCompatibleBucketName),
/* harmony export */   resolveParamsForS3: () => (/* binding */ resolveParamsForS3)
/* harmony export */ });
const resolveParamsForS3 = async (endpointParams) => {
    const bucket = endpointParams?.Bucket || "";
    if (typeof endpointParams.Bucket === "string") {
        endpointParams.Bucket = bucket.replace(/#/g, encodeURIComponent("#")).replace(/\?/g, encodeURIComponent("?"));
    }
    if (isArnBucketName(bucket)) {
        if (endpointParams.ForcePathStyle === true) {
            throw new Error("Path-style addressing cannot be used with ARN buckets");
        }
    }
    else if (!isDnsCompatibleBucketName(bucket) ||
        (bucket.indexOf(".") !== -1 && !String(endpointParams.Endpoint).startsWith("http:")) ||
        bucket.toLowerCase() !== bucket ||
        bucket.length < 3) {
        endpointParams.ForcePathStyle = true;
    }
    if (endpointParams.DisableMultiRegionAccessPoints) {
        endpointParams.disableMultiRegionAccessPoints = true;
        endpointParams.DisableMRAP = true;
    }
    return endpointParams;
};
const DOMAIN_PATTERN = /^[a-z0-9][a-z0-9\.\-]{1,61}[a-z0-9]$/;
const IP_ADDRESS_PATTERN = /(\d+\.){3}\d+/;
const DOTS_PATTERN = /\.\./;
const DOT_PATTERN = /\./;
const S3_HOSTNAME_PATTERN = /^(.+\.)?s3(-fips)?(\.dualstack)?[.-]([a-z0-9-]+)\./;
const isDnsCompatibleBucketName = (bucketName) => DOMAIN_PATTERN.test(bucketName) && !IP_ADDRESS_PATTERN.test(bucketName) && !DOTS_PATTERN.test(bucketName);
const isArnBucketName = (bucketName) => {
    const [arn, partition, service, , , bucket] = bucketName.split(":");
    const isArn = arn === "arn" && bucketName.split(":").length >= 6;
    const isValidArn = Boolean(isArn && partition && service && bucket);
    if (isArn && !isValidArn) {
        throw new Error(`Invalid ARN: ${bucketName} was an invalid ARN.`);
    }
    return isValidArn;
};


/***/ }),

/***/ "../../node_modules/@smithy/middleware-endpoint/dist-es/types.js":
/*!***********************************************************************!*\
  !*** ../../node_modules/@smithy/middleware-endpoint/dist-es/types.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "../../node_modules/@smithy/middleware-retry/dist-es/AdaptiveRetryStrategy.js":
/*!************************************************************************************!*\
  !*** ../../node_modules/@smithy/middleware-retry/dist-es/AdaptiveRetryStrategy.js ***!
  \************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AdaptiveRetryStrategy: () => (/* binding */ AdaptiveRetryStrategy)
/* harmony export */ });
/* harmony import */ var _smithy_util_retry__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @smithy/util-retry */ "../../node_modules/@smithy/util-retry/dist-es/index.js");
/* harmony import */ var _StandardRetryStrategy__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./StandardRetryStrategy */ "../../node_modules/@smithy/middleware-retry/dist-es/StandardRetryStrategy.js");


class AdaptiveRetryStrategy extends _StandardRetryStrategy__WEBPACK_IMPORTED_MODULE_1__.StandardRetryStrategy {
    constructor(maxAttemptsProvider, options) {
        const { rateLimiter, ...superOptions } = options ?? {};
        super(maxAttemptsProvider, superOptions);
        this.rateLimiter = rateLimiter ?? new _smithy_util_retry__WEBPACK_IMPORTED_MODULE_0__.DefaultRateLimiter();
        this.mode = _smithy_util_retry__WEBPACK_IMPORTED_MODULE_0__.RETRY_MODES.ADAPTIVE;
    }
    async retry(next, args) {
        return super.retry(next, args, {
            beforeRequest: async () => {
                return this.rateLimiter.getSendToken();
            },
            afterRequest: (response) => {
                this.rateLimiter.updateClientSendingRate(response);
            },
        });
    }
}


/***/ }),

/***/ "../../node_modules/@smithy/middleware-retry/dist-es/StandardRetryStrategy.js":
/*!************************************************************************************!*\
  !*** ../../node_modules/@smithy/middleware-retry/dist-es/StandardRetryStrategy.js ***!
  \************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   StandardRetryStrategy: () => (/* binding */ StandardRetryStrategy)
/* harmony export */ });
/* harmony import */ var _smithy_protocol_http__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @smithy/protocol-http */ "../../node_modules/@smithy/protocol-http/dist-es/index.js");
/* harmony import */ var _smithy_service_error_classification__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @smithy/service-error-classification */ "../../node_modules/@smithy/service-error-classification/dist-es/index.js");
/* harmony import */ var _smithy_util_retry__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @smithy/util-retry */ "../../node_modules/@smithy/util-retry/dist-es/index.js");
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! uuid */ "../../node_modules/uuid/dist/esm-browser/v4.js");
/* harmony import */ var _defaultRetryQuota__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./defaultRetryQuota */ "../../node_modules/@smithy/middleware-retry/dist-es/defaultRetryQuota.js");
/* harmony import */ var _delayDecider__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./delayDecider */ "../../node_modules/@smithy/middleware-retry/dist-es/delayDecider.js");
/* harmony import */ var _retryDecider__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./retryDecider */ "../../node_modules/@smithy/middleware-retry/dist-es/retryDecider.js");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./util */ "../../node_modules/@smithy/middleware-retry/dist-es/util.js");








class StandardRetryStrategy {
    constructor(maxAttemptsProvider, options) {
        this.maxAttemptsProvider = maxAttemptsProvider;
        this.mode = _smithy_util_retry__WEBPACK_IMPORTED_MODULE_2__.RETRY_MODES.STANDARD;
        this.retryDecider = options?.retryDecider ?? _retryDecider__WEBPACK_IMPORTED_MODULE_5__.defaultRetryDecider;
        this.delayDecider = options?.delayDecider ?? _delayDecider__WEBPACK_IMPORTED_MODULE_4__.defaultDelayDecider;
        this.retryQuota = options?.retryQuota ?? (0,_defaultRetryQuota__WEBPACK_IMPORTED_MODULE_3__.getDefaultRetryQuota)(_smithy_util_retry__WEBPACK_IMPORTED_MODULE_2__.INITIAL_RETRY_TOKENS);
    }
    shouldRetry(error, attempts, maxAttempts) {
        return attempts < maxAttempts && this.retryDecider(error) && this.retryQuota.hasRetryTokens(error);
    }
    async getMaxAttempts() {
        let maxAttempts;
        try {
            maxAttempts = await this.maxAttemptsProvider();
        }
        catch (error) {
            maxAttempts = _smithy_util_retry__WEBPACK_IMPORTED_MODULE_2__.DEFAULT_MAX_ATTEMPTS;
        }
        return maxAttempts;
    }
    async retry(next, args, options) {
        let retryTokenAmount;
        let attempts = 0;
        let totalDelay = 0;
        const maxAttempts = await this.getMaxAttempts();
        const { request } = args;
        if (_smithy_protocol_http__WEBPACK_IMPORTED_MODULE_0__.HttpRequest.isInstance(request)) {
            request.headers[_smithy_util_retry__WEBPACK_IMPORTED_MODULE_2__.INVOCATION_ID_HEADER] = (0,uuid__WEBPACK_IMPORTED_MODULE_7__["default"])();
        }
        while (true) {
            try {
                if (_smithy_protocol_http__WEBPACK_IMPORTED_MODULE_0__.HttpRequest.isInstance(request)) {
                    request.headers[_smithy_util_retry__WEBPACK_IMPORTED_MODULE_2__.REQUEST_HEADER] = `attempt=${attempts + 1}; max=${maxAttempts}`;
                }
                if (options?.beforeRequest) {
                    await options.beforeRequest();
                }
                const { response, output } = await next(args);
                if (options?.afterRequest) {
                    options.afterRequest(response);
                }
                this.retryQuota.releaseRetryTokens(retryTokenAmount);
                output.$metadata.attempts = attempts + 1;
                output.$metadata.totalRetryDelay = totalDelay;
                return { response, output };
            }
            catch (e) {
                const err = (0,_util__WEBPACK_IMPORTED_MODULE_6__.asSdkError)(e);
                attempts++;
                if (this.shouldRetry(err, attempts, maxAttempts)) {
                    retryTokenAmount = this.retryQuota.retrieveRetryTokens(err);
                    const delayFromDecider = this.delayDecider((0,_smithy_service_error_classification__WEBPACK_IMPORTED_MODULE_1__.isThrottlingError)(err) ? _smithy_util_retry__WEBPACK_IMPORTED_MODULE_2__.THROTTLING_RETRY_DELAY_BASE : _smithy_util_retry__WEBPACK_IMPORTED_MODULE_2__.DEFAULT_RETRY_DELAY_BASE, attempts);
                    const delayFromResponse = getDelayFromRetryAfterHeader(err.$response);
                    const delay = Math.max(delayFromResponse || 0, delayFromDecider);
                    totalDelay += delay;
                    await new Promise((resolve) => setTimeout(resolve, delay));
                    continue;
                }
                if (!err.$metadata) {
                    err.$metadata = {};
                }
                err.$metadata.attempts = attempts;
                err.$metadata.totalRetryDelay = totalDelay;
                throw err;
            }
        }
    }
}
const getDelayFromRetryAfterHeader = (response) => {
    if (!_smithy_protocol_http__WEBPACK_IMPORTED_MODULE_0__.HttpResponse.isInstance(response))
        return;
    const retryAfterHeaderName = Object.keys(response.headers).find((key) => key.toLowerCase() === "retry-after");
    if (!retryAfterHeaderName)
        return;
    const retryAfter = response.headers[retryAfterHeaderName];
    const retryAfterSeconds = Number(retryAfter);
    if (!Number.isNaN(retryAfterSeconds))
        return retryAfterSeconds * 1000;
    const retryAfterDate = new Date(retryAfter);
    return retryAfterDate.getTime() - Date.now();
};


/***/ }),

/***/ "../../node_modules/@smithy/middleware-retry/dist-es/configurations.js":
/*!*****************************************************************************!*\
  !*** ../../node_modules/@smithy/middleware-retry/dist-es/configurations.js ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CONFIG_MAX_ATTEMPTS: () => (/* binding */ CONFIG_MAX_ATTEMPTS),
/* harmony export */   CONFIG_RETRY_MODE: () => (/* binding */ CONFIG_RETRY_MODE),
/* harmony export */   ENV_MAX_ATTEMPTS: () => (/* binding */ ENV_MAX_ATTEMPTS),
/* harmony export */   ENV_RETRY_MODE: () => (/* binding */ ENV_RETRY_MODE),
/* harmony export */   NODE_MAX_ATTEMPT_CONFIG_OPTIONS: () => (/* binding */ NODE_MAX_ATTEMPT_CONFIG_OPTIONS),
/* harmony export */   NODE_RETRY_MODE_CONFIG_OPTIONS: () => (/* binding */ NODE_RETRY_MODE_CONFIG_OPTIONS),
/* harmony export */   resolveRetryConfig: () => (/* binding */ resolveRetryConfig)
/* harmony export */ });
/* harmony import */ var _smithy_util_middleware__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @smithy/util-middleware */ "../../node_modules/@smithy/util-middleware/dist-es/index.js");
/* harmony import */ var _smithy_util_retry__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @smithy/util-retry */ "../../node_modules/@smithy/util-retry/dist-es/index.js");


const ENV_MAX_ATTEMPTS = "AWS_MAX_ATTEMPTS";
const CONFIG_MAX_ATTEMPTS = "max_attempts";
const NODE_MAX_ATTEMPT_CONFIG_OPTIONS = {
    environmentVariableSelector: (env) => {
        const value = env[ENV_MAX_ATTEMPTS];
        if (!value)
            return undefined;
        const maxAttempt = parseInt(value);
        if (Number.isNaN(maxAttempt)) {
            throw new Error(`Environment variable ${ENV_MAX_ATTEMPTS} mast be a number, got "${value}"`);
        }
        return maxAttempt;
    },
    configFileSelector: (profile) => {
        const value = profile[CONFIG_MAX_ATTEMPTS];
        if (!value)
            return undefined;
        const maxAttempt = parseInt(value);
        if (Number.isNaN(maxAttempt)) {
            throw new Error(`Shared config file entry ${CONFIG_MAX_ATTEMPTS} mast be a number, got "${value}"`);
        }
        return maxAttempt;
    },
    default: _smithy_util_retry__WEBPACK_IMPORTED_MODULE_1__.DEFAULT_MAX_ATTEMPTS,
};
const resolveRetryConfig = (input) => {
    const { retryStrategy } = input;
    const maxAttempts = (0,_smithy_util_middleware__WEBPACK_IMPORTED_MODULE_0__.normalizeProvider)(input.maxAttempts ?? _smithy_util_retry__WEBPACK_IMPORTED_MODULE_1__.DEFAULT_MAX_ATTEMPTS);
    return {
        ...input,
        maxAttempts,
        retryStrategy: async () => {
            if (retryStrategy) {
                return retryStrategy;
            }
            const retryMode = await (0,_smithy_util_middleware__WEBPACK_IMPORTED_MODULE_0__.normalizeProvider)(input.retryMode)();
            if (retryMode === _smithy_util_retry__WEBPACK_IMPORTED_MODULE_1__.RETRY_MODES.ADAPTIVE) {
                return new _smithy_util_retry__WEBPACK_IMPORTED_MODULE_1__.AdaptiveRetryStrategy(maxAttempts);
            }
            return new _smithy_util_retry__WEBPACK_IMPORTED_MODULE_1__.StandardRetryStrategy(maxAttempts);
        },
    };
};
const ENV_RETRY_MODE = "AWS_RETRY_MODE";
const CONFIG_RETRY_MODE = "retry_mode";
const NODE_RETRY_MODE_CONFIG_OPTIONS = {
    environmentVariableSelector: (env) => env[ENV_RETRY_MODE],
    configFileSelector: (profile) => profile[CONFIG_RETRY_MODE],
    default: _smithy_util_retry__WEBPACK_IMPORTED_MODULE_1__.DEFAULT_RETRY_MODE,
};


/***/ }),

/***/ "../../node_modules/@smithy/middleware-retry/dist-es/defaultRetryQuota.js":
/*!********************************************************************************!*\
  !*** ../../node_modules/@smithy/middleware-retry/dist-es/defaultRetryQuota.js ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getDefaultRetryQuota: () => (/* binding */ getDefaultRetryQuota)
/* harmony export */ });
/* harmony import */ var _smithy_util_retry__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @smithy/util-retry */ "../../node_modules/@smithy/util-retry/dist-es/index.js");

const getDefaultRetryQuota = (initialRetryTokens, options) => {
    const MAX_CAPACITY = initialRetryTokens;
    const noRetryIncrement = options?.noRetryIncrement ?? _smithy_util_retry__WEBPACK_IMPORTED_MODULE_0__.NO_RETRY_INCREMENT;
    const retryCost = options?.retryCost ?? _smithy_util_retry__WEBPACK_IMPORTED_MODULE_0__.RETRY_COST;
    const timeoutRetryCost = options?.timeoutRetryCost ?? _smithy_util_retry__WEBPACK_IMPORTED_MODULE_0__.TIMEOUT_RETRY_COST;
    let availableCapacity = initialRetryTokens;
    const getCapacityAmount = (error) => (error.name === "TimeoutError" ? timeoutRetryCost : retryCost);
    const hasRetryTokens = (error) => getCapacityAmount(error) <= availableCapacity;
    const retrieveRetryTokens = (error) => {
        if (!hasRetryTokens(error)) {
            throw new Error("No retry token available");
        }
        const capacityAmount = getCapacityAmount(error);
        availableCapacity -= capacityAmount;
        return capacityAmount;
    };
    const releaseRetryTokens = (capacityReleaseAmount) => {
        availableCapacity += capacityReleaseAmount ?? noRetryIncrement;
        availableCapacity = Math.min(availableCapacity, MAX_CAPACITY);
    };
    return Object.freeze({
        hasRetryTokens,
        retrieveRetryTokens,
        releaseRetryTokens,
    });
};


/***/ }),

/***/ "../../node_modules/@smithy/middleware-retry/dist-es/delayDecider.js":
/*!***************************************************************************!*\
  !*** ../../node_modules/@smithy/middleware-retry/dist-es/delayDecider.js ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   defaultDelayDecider: () => (/* binding */ defaultDelayDecider)
/* harmony export */ });
/* harmony import */ var _smithy_util_retry__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @smithy/util-retry */ "../../node_modules/@smithy/util-retry/dist-es/index.js");

const defaultDelayDecider = (delayBase, attempts) => Math.floor(Math.min(_smithy_util_retry__WEBPACK_IMPORTED_MODULE_0__.MAXIMUM_RETRY_DELAY, Math.random() * 2 ** attempts * delayBase));


/***/ }),

/***/ "../../node_modules/@smithy/middleware-retry/dist-es/index.js":
/*!********************************************************************!*\
  !*** ../../node_modules/@smithy/middleware-retry/dist-es/index.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AdaptiveRetryStrategy: () => (/* reexport safe */ _AdaptiveRetryStrategy__WEBPACK_IMPORTED_MODULE_0__.AdaptiveRetryStrategy),
/* harmony export */   CONFIG_MAX_ATTEMPTS: () => (/* reexport safe */ _configurations__WEBPACK_IMPORTED_MODULE_2__.CONFIG_MAX_ATTEMPTS),
/* harmony export */   CONFIG_RETRY_MODE: () => (/* reexport safe */ _configurations__WEBPACK_IMPORTED_MODULE_2__.CONFIG_RETRY_MODE),
/* harmony export */   ENV_MAX_ATTEMPTS: () => (/* reexport safe */ _configurations__WEBPACK_IMPORTED_MODULE_2__.ENV_MAX_ATTEMPTS),
/* harmony export */   ENV_RETRY_MODE: () => (/* reexport safe */ _configurations__WEBPACK_IMPORTED_MODULE_2__.ENV_RETRY_MODE),
/* harmony export */   NODE_MAX_ATTEMPT_CONFIG_OPTIONS: () => (/* reexport safe */ _configurations__WEBPACK_IMPORTED_MODULE_2__.NODE_MAX_ATTEMPT_CONFIG_OPTIONS),
/* harmony export */   NODE_RETRY_MODE_CONFIG_OPTIONS: () => (/* reexport safe */ _configurations__WEBPACK_IMPORTED_MODULE_2__.NODE_RETRY_MODE_CONFIG_OPTIONS),
/* harmony export */   StandardRetryStrategy: () => (/* reexport safe */ _StandardRetryStrategy__WEBPACK_IMPORTED_MODULE_1__.StandardRetryStrategy),
/* harmony export */   defaultDelayDecider: () => (/* reexport safe */ _delayDecider__WEBPACK_IMPORTED_MODULE_3__.defaultDelayDecider),
/* harmony export */   defaultRetryDecider: () => (/* reexport safe */ _retryDecider__WEBPACK_IMPORTED_MODULE_5__.defaultRetryDecider),
/* harmony export */   getOmitRetryHeadersPlugin: () => (/* reexport safe */ _omitRetryHeadersMiddleware__WEBPACK_IMPORTED_MODULE_4__.getOmitRetryHeadersPlugin),
/* harmony export */   getRetryAfterHint: () => (/* reexport safe */ _retryMiddleware__WEBPACK_IMPORTED_MODULE_6__.getRetryAfterHint),
/* harmony export */   getRetryPlugin: () => (/* reexport safe */ _retryMiddleware__WEBPACK_IMPORTED_MODULE_6__.getRetryPlugin),
/* harmony export */   omitRetryHeadersMiddleware: () => (/* reexport safe */ _omitRetryHeadersMiddleware__WEBPACK_IMPORTED_MODULE_4__.omitRetryHeadersMiddleware),
/* harmony export */   omitRetryHeadersMiddlewareOptions: () => (/* reexport safe */ _omitRetryHeadersMiddleware__WEBPACK_IMPORTED_MODULE_4__.omitRetryHeadersMiddlewareOptions),
/* harmony export */   resolveRetryConfig: () => (/* reexport safe */ _configurations__WEBPACK_IMPORTED_MODULE_2__.resolveRetryConfig),
/* harmony export */   retryMiddleware: () => (/* reexport safe */ _retryMiddleware__WEBPACK_IMPORTED_MODULE_6__.retryMiddleware),
/* harmony export */   retryMiddlewareOptions: () => (/* reexport safe */ _retryMiddleware__WEBPACK_IMPORTED_MODULE_6__.retryMiddlewareOptions)
/* harmony export */ });
/* harmony import */ var _AdaptiveRetryStrategy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AdaptiveRetryStrategy */ "../../node_modules/@smithy/middleware-retry/dist-es/AdaptiveRetryStrategy.js");
/* harmony import */ var _StandardRetryStrategy__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./StandardRetryStrategy */ "../../node_modules/@smithy/middleware-retry/dist-es/StandardRetryStrategy.js");
/* harmony import */ var _configurations__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./configurations */ "../../node_modules/@smithy/middleware-retry/dist-es/configurations.js");
/* harmony import */ var _delayDecider__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./delayDecider */ "../../node_modules/@smithy/middleware-retry/dist-es/delayDecider.js");
/* harmony import */ var _omitRetryHeadersMiddleware__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./omitRetryHeadersMiddleware */ "../../node_modules/@smithy/middleware-retry/dist-es/omitRetryHeadersMiddleware.js");
/* harmony import */ var _retryDecider__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./retryDecider */ "../../node_modules/@smithy/middleware-retry/dist-es/retryDecider.js");
/* harmony import */ var _retryMiddleware__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./retryMiddleware */ "../../node_modules/@smithy/middleware-retry/dist-es/retryMiddleware.js");









/***/ }),

/***/ "../../node_modules/@smithy/middleware-retry/dist-es/isStreamingPayload/isStreamingPayload.browser.js":
/*!************************************************************************************************************!*\
  !*** ../../node_modules/@smithy/middleware-retry/dist-es/isStreamingPayload/isStreamingPayload.browser.js ***!
  \************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   isStreamingPayload: () => (/* binding */ isStreamingPayload)
/* harmony export */ });
const isStreamingPayload = (request) => request?.body instanceof ReadableStream;


/***/ }),

/***/ "../../node_modules/@smithy/middleware-retry/dist-es/omitRetryHeadersMiddleware.js":
/*!*****************************************************************************************!*\
  !*** ../../node_modules/@smithy/middleware-retry/dist-es/omitRetryHeadersMiddleware.js ***!
  \*****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getOmitRetryHeadersPlugin: () => (/* binding */ getOmitRetryHeadersPlugin),
/* harmony export */   omitRetryHeadersMiddleware: () => (/* binding */ omitRetryHeadersMiddleware),
/* harmony export */   omitRetryHeadersMiddlewareOptions: () => (/* binding */ omitRetryHeadersMiddlewareOptions)
/* harmony export */ });
/* harmony import */ var _smithy_protocol_http__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @smithy/protocol-http */ "../../node_modules/@smithy/protocol-http/dist-es/index.js");
/* harmony import */ var _smithy_util_retry__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @smithy/util-retry */ "../../node_modules/@smithy/util-retry/dist-es/index.js");


const omitRetryHeadersMiddleware = () => (next) => async (args) => {
    const { request } = args;
    if (_smithy_protocol_http__WEBPACK_IMPORTED_MODULE_0__.HttpRequest.isInstance(request)) {
        delete request.headers[_smithy_util_retry__WEBPACK_IMPORTED_MODULE_1__.INVOCATION_ID_HEADER];
        delete request.headers[_smithy_util_retry__WEBPACK_IMPORTED_MODULE_1__.REQUEST_HEADER];
    }
    return next(args);
};
const omitRetryHeadersMiddlewareOptions = {
    name: "omitRetryHeadersMiddleware",
    tags: ["RETRY", "HEADERS", "OMIT_RETRY_HEADERS"],
    relation: "before",
    toMiddleware: "awsAuthMiddleware",
    override: true,
};
const getOmitRetryHeadersPlugin = (options) => ({
    applyToStack: (clientStack) => {
        clientStack.addRelativeTo(omitRetryHeadersMiddleware(), omitRetryHeadersMiddlewareOptions);
    },
});


/***/ }),

/***/ "../../node_modules/@smithy/middleware-retry/dist-es/retryDecider.js":
/*!***************************************************************************!*\
  !*** ../../node_modules/@smithy/middleware-retry/dist-es/retryDecider.js ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   defaultRetryDecider: () => (/* binding */ defaultRetryDecider)
/* harmony export */ });
/* harmony import */ var _smithy_service_error_classification__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @smithy/service-error-classification */ "../../node_modules/@smithy/service-error-classification/dist-es/index.js");

const defaultRetryDecider = (error) => {
    if (!error) {
        return false;
    }
    return (0,_smithy_service_error_classification__WEBPACK_IMPORTED_MODULE_0__.isRetryableByTrait)(error) || (0,_smithy_service_error_classification__WEBPACK_IMPORTED_MODULE_0__.isClockSkewError)(error) || (0,_smithy_service_error_classification__WEBPACK_IMPORTED_MODULE_0__.isThrottlingError)(error) || (0,_smithy_service_error_classification__WEBPACK_IMPORTED_MODULE_0__.isTransientError)(error);
};


/***/ }),

/***/ "../../node_modules/@smithy/middleware-retry/dist-es/retryMiddleware.js":
/*!******************************************************************************!*\
  !*** ../../node_modules/@smithy/middleware-retry/dist-es/retryMiddleware.js ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getRetryAfterHint: () => (/* binding */ getRetryAfterHint),
/* harmony export */   getRetryPlugin: () => (/* binding */ getRetryPlugin),
/* harmony export */   retryMiddleware: () => (/* binding */ retryMiddleware),
/* harmony export */   retryMiddlewareOptions: () => (/* binding */ retryMiddlewareOptions)
/* harmony export */ });
/* harmony import */ var _smithy_protocol_http__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @smithy/protocol-http */ "../../node_modules/@smithy/protocol-http/dist-es/index.js");
/* harmony import */ var _smithy_service_error_classification__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @smithy/service-error-classification */ "../../node_modules/@smithy/service-error-classification/dist-es/index.js");
/* harmony import */ var _smithy_smithy_client__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @smithy/smithy-client */ "../../node_modules/@smithy/smithy-client/dist-es/index.js");
/* harmony import */ var _smithy_util_retry__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @smithy/util-retry */ "../../node_modules/@smithy/util-retry/dist-es/index.js");
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! uuid */ "../../node_modules/uuid/dist/esm-browser/v4.js");
/* harmony import */ var _isStreamingPayload_isStreamingPayload__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./isStreamingPayload/isStreamingPayload */ "../../node_modules/@smithy/middleware-retry/dist-es/isStreamingPayload/isStreamingPayload.browser.js");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./util */ "../../node_modules/@smithy/middleware-retry/dist-es/util.js");







const retryMiddleware = (options) => (next, context) => async (args) => {
    let retryStrategy = await options.retryStrategy();
    const maxAttempts = await options.maxAttempts();
    if (isRetryStrategyV2(retryStrategy)) {
        retryStrategy = retryStrategy;
        let retryToken = await retryStrategy.acquireInitialRetryToken(context["partition_id"]);
        let lastError = new Error();
        let attempts = 0;
        let totalRetryDelay = 0;
        const { request } = args;
        const isRequest = _smithy_protocol_http__WEBPACK_IMPORTED_MODULE_0__.HttpRequest.isInstance(request);
        if (isRequest) {
            request.headers[_smithy_util_retry__WEBPACK_IMPORTED_MODULE_3__.INVOCATION_ID_HEADER] = (0,uuid__WEBPACK_IMPORTED_MODULE_6__["default"])();
        }
        while (true) {
            try {
                if (isRequest) {
                    request.headers[_smithy_util_retry__WEBPACK_IMPORTED_MODULE_3__.REQUEST_HEADER] = `attempt=${attempts + 1}; max=${maxAttempts}`;
                }
                const { response, output } = await next(args);
                retryStrategy.recordSuccess(retryToken);
                output.$metadata.attempts = attempts + 1;
                output.$metadata.totalRetryDelay = totalRetryDelay;
                return { response, output };
            }
            catch (e) {
                const retryErrorInfo = getRetryErrorInfo(e);
                lastError = (0,_util__WEBPACK_IMPORTED_MODULE_5__.asSdkError)(e);
                if (isRequest && (0,_isStreamingPayload_isStreamingPayload__WEBPACK_IMPORTED_MODULE_4__.isStreamingPayload)(request)) {
                    (context.logger instanceof _smithy_smithy_client__WEBPACK_IMPORTED_MODULE_2__.NoOpLogger ? console : context.logger)?.warn("An error was encountered in a non-retryable streaming request.");
                    throw lastError;
                }
                try {
                    retryToken = await retryStrategy.refreshRetryTokenForRetry(retryToken, retryErrorInfo);
                }
                catch (refreshError) {
                    if (!lastError.$metadata) {
                        lastError.$metadata = {};
                    }
                    lastError.$metadata.attempts = attempts + 1;
                    lastError.$metadata.totalRetryDelay = totalRetryDelay;
                    throw lastError;
                }
                attempts = retryToken.getRetryCount();
                const delay = retryToken.getRetryDelay();
                totalRetryDelay += delay;
                await new Promise((resolve) => setTimeout(resolve, delay));
            }
        }
    }
    else {
        retryStrategy = retryStrategy;
        if (retryStrategy?.mode)
            context.userAgent = [...(context.userAgent || []), ["cfg/retry-mode", retryStrategy.mode]];
        return retryStrategy.retry(next, args);
    }
};
const isRetryStrategyV2 = (retryStrategy) => typeof retryStrategy.acquireInitialRetryToken !== "undefined" &&
    typeof retryStrategy.refreshRetryTokenForRetry !== "undefined" &&
    typeof retryStrategy.recordSuccess !== "undefined";
const getRetryErrorInfo = (error) => {
    const errorInfo = {
        error,
        errorType: getRetryErrorType(error),
    };
    const retryAfterHint = getRetryAfterHint(error.$response);
    if (retryAfterHint) {
        errorInfo.retryAfterHint = retryAfterHint;
    }
    return errorInfo;
};
const getRetryErrorType = (error) => {
    if ((0,_smithy_service_error_classification__WEBPACK_IMPORTED_MODULE_1__.isThrottlingError)(error))
        return "THROTTLING";
    if ((0,_smithy_service_error_classification__WEBPACK_IMPORTED_MODULE_1__.isTransientError)(error))
        return "TRANSIENT";
    if ((0,_smithy_service_error_classification__WEBPACK_IMPORTED_MODULE_1__.isServerError)(error))
        return "SERVER_ERROR";
    return "CLIENT_ERROR";
};
const retryMiddlewareOptions = {
    name: "retryMiddleware",
    tags: ["RETRY"],
    step: "finalizeRequest",
    priority: "high",
    override: true,
};
const getRetryPlugin = (options) => ({
    applyToStack: (clientStack) => {
        clientStack.add(retryMiddleware(options), retryMiddlewareOptions);
    },
});
const getRetryAfterHint = (response) => {
    if (!_smithy_protocol_http__WEBPACK_IMPORTED_MODULE_0__.HttpResponse.isInstance(response))
        return;
    const retryAfterHeaderName = Object.keys(response.headers).find((key) => key.toLowerCase() === "retry-after");
    if (!retryAfterHeaderName)
        return;
    const retryAfter = response.headers[retryAfterHeaderName];
    const retryAfterSeconds = Number(retryAfter);
    if (!Number.isNaN(retryAfterSeconds))
        return new Date(retryAfterSeconds * 1000);
    const retryAfterDate = new Date(retryAfter);
    return retryAfterDate;
};


/***/ }),

/***/ "../../node_modules/@smithy/middleware-retry/dist-es/util.js":
/*!*******************************************************************!*\
  !*** ../../node_modules/@smithy/middleware-retry/dist-es/util.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   asSdkError: () => (/* binding */ asSdkError)
/* harmony export */ });
const asSdkError = (error) => {
    if (error instanceof Error)
        return error;
    if (error instanceof Object)
        return Object.assign(new Error(), error);
    if (typeof error === "string")
        return new Error(error);
    return new Error(`AWS SDK error wrapper for ${error}`);
};


/***/ }),

/***/ "../../node_modules/@smithy/middleware-serde/dist-es/deserializerMiddleware.js":
/*!*************************************************************************************!*\
  !*** ../../node_modules/@smithy/middleware-serde/dist-es/deserializerMiddleware.js ***!
  \*************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   deserializerMiddleware: () => (/* binding */ deserializerMiddleware)
/* harmony export */ });
const deserializerMiddleware = (options, deserializer) => (next) => async (args) => {
    const { response } = await next(args);
    try {
        const parsed = await deserializer(response, options);
        return {
            response,
            output: parsed,
        };
    }
    catch (error) {
        Object.defineProperty(error, "$response", {
            value: response,
        });
        if (!("$metadata" in error)) {
            const hint = `Deserialization error: to see the raw response, inspect the hidden field {error}.$response on this object.`;
            error.message += "\n  " + hint;
            if (typeof error.$responseBodyText !== "undefined") {
                if (error.$response) {
                    error.$response.body = error.$responseBodyText;
                }
            }
        }
        throw error;
    }
};


/***/ }),

/***/ "../../node_modules/@smithy/middleware-serde/dist-es/index.js":
/*!********************************************************************!*\
  !*** ../../node_modules/@smithy/middleware-serde/dist-es/index.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   deserializerMiddleware: () => (/* reexport safe */ _deserializerMiddleware__WEBPACK_IMPORTED_MODULE_0__.deserializerMiddleware),
/* harmony export */   deserializerMiddlewareOption: () => (/* reexport safe */ _serdePlugin__WEBPACK_IMPORTED_MODULE_1__.deserializerMiddlewareOption),
/* harmony export */   getSerdePlugin: () => (/* reexport safe */ _serdePlugin__WEBPACK_IMPORTED_MODULE_1__.getSerdePlugin),
/* harmony export */   serializerMiddleware: () => (/* reexport safe */ _serializerMiddleware__WEBPACK_IMPORTED_MODULE_2__.serializerMiddleware),
/* harmony export */   serializerMiddlewareOption: () => (/* reexport safe */ _serdePlugin__WEBPACK_IMPORTED_MODULE_1__.serializerMiddlewareOption)
/* harmony export */ });
/* harmony import */ var _deserializerMiddleware__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./deserializerMiddleware */ "../../node_modules/@smithy/middleware-serde/dist-es/deserializerMiddleware.js");
/* harmony import */ var _serdePlugin__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./serdePlugin */ "../../node_modules/@smithy/middleware-serde/dist-es/serdePlugin.js");
/* harmony import */ var _serializerMiddleware__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./serializerMiddleware */ "../../node_modules/@smithy/middleware-serde/dist-es/serializerMiddleware.js");





/***/ }),

/***/ "../../node_modules/@smithy/middleware-serde/dist-es/serdePlugin.js":
/*!**************************************************************************!*\
  !*** ../../node_modules/@smithy/middleware-serde/dist-es/serdePlugin.js ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   deserializerMiddlewareOption: () => (/* binding */ deserializerMiddlewareOption),
/* harmony export */   getSerdePlugin: () => (/* binding */ getSerdePlugin),
/* harmony export */   serializerMiddlewareOption: () => (/* binding */ serializerMiddlewareOption)
/* harmony export */ });
/* harmony import */ var _deserializerMiddleware__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./deserializerMiddleware */ "../../node_modules/@smithy/middleware-serde/dist-es/deserializerMiddleware.js");
/* harmony import */ var _serializerMiddleware__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./serializerMiddleware */ "../../node_modules/@smithy/middleware-serde/dist-es/serializerMiddleware.js");


const deserializerMiddlewareOption = {
    name: "deserializerMiddleware",
    step: "deserialize",
    tags: ["DESERIALIZER"],
    override: true,
};
const serializerMiddlewareOption = {
    name: "serializerMiddleware",
    step: "serialize",
    tags: ["SERIALIZER"],
    override: true,
};
function getSerdePlugin(config, serializer, deserializer) {
    return {
        applyToStack: (commandStack) => {
            commandStack.add((0,_deserializerMiddleware__WEBPACK_IMPORTED_MODULE_0__.deserializerMiddleware)(config, deserializer), deserializerMiddlewareOption);
            commandStack.add((0,_serializerMiddleware__WEBPACK_IMPORTED_MODULE_1__.serializerMiddleware)(config, serializer), serializerMiddlewareOption);
        },
    };
}


/***/ }),

/***/ "../../node_modules/@smithy/middleware-serde/dist-es/serializerMiddleware.js":
/*!***********************************************************************************!*\
  !*** ../../node_modules/@smithy/middleware-serde/dist-es/serializerMiddleware.js ***!
  \***********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   serializerMiddleware: () => (/* binding */ serializerMiddleware)
/* harmony export */ });
const serializerMiddleware = (options, serializer) => (next, context) => async (args) => {
    const endpoint = context.endpointV2?.url && options.urlParser
        ? async () => options.urlParser(context.endpointV2.url)
        : options.endpoint;
    if (!endpoint) {
        throw new Error("No valid endpoint provider available.");
    }
    const request = await serializer(args.input, { ...options, endpoint });
    return next({
        ...args,
        request,
    });
};


/***/ }),

/***/ "../../node_modules/@smithy/middleware-stack/dist-es/MiddlewareStack.js":
/*!******************************************************************************!*\
  !*** ../../node_modules/@smithy/middleware-stack/dist-es/MiddlewareStack.js ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   constructStack: () => (/* binding */ constructStack)
/* harmony export */ });
const getAllAliases = (name, aliases) => {
    const _aliases = [];
    if (name) {
        _aliases.push(name);
    }
    if (aliases) {
        for (const alias of aliases) {
            _aliases.push(alias);
        }
    }
    return _aliases;
};
const getMiddlewareNameWithAliases = (name, aliases) => {
    return `${name || "anonymous"}${aliases && aliases.length > 0 ? ` (a.k.a. ${aliases.join(",")})` : ""}`;
};
const constructStack = () => {
    let absoluteEntries = [];
    let relativeEntries = [];
    let identifyOnResolve = false;
    const entriesNameSet = new Set();
    const sort = (entries) => entries.sort((a, b) => stepWeights[b.step] - stepWeights[a.step] ||
        priorityWeights[b.priority || "normal"] - priorityWeights[a.priority || "normal"]);
    const removeByName = (toRemove) => {
        let isRemoved = false;
        const filterCb = (entry) => {
            const aliases = getAllAliases(entry.name, entry.aliases);
            if (aliases.includes(toRemove)) {
                isRemoved = true;
                for (const alias of aliases) {
                    entriesNameSet.delete(alias);
                }
                return false;
            }
            return true;
        };
        absoluteEntries = absoluteEntries.filter(filterCb);
        relativeEntries = relativeEntries.filter(filterCb);
        return isRemoved;
    };
    const removeByReference = (toRemove) => {
        let isRemoved = false;
        const filterCb = (entry) => {
            if (entry.middleware === toRemove) {
                isRemoved = true;
                for (const alias of getAllAliases(entry.name, entry.aliases)) {
                    entriesNameSet.delete(alias);
                }
                return false;
            }
            return true;
        };
        absoluteEntries = absoluteEntries.filter(filterCb);
        relativeEntries = relativeEntries.filter(filterCb);
        return isRemoved;
    };
    const cloneTo = (toStack) => {
        absoluteEntries.forEach((entry) => {
            toStack.add(entry.middleware, { ...entry });
        });
        relativeEntries.forEach((entry) => {
            toStack.addRelativeTo(entry.middleware, { ...entry });
        });
        toStack.identifyOnResolve?.(stack.identifyOnResolve());
        return toStack;
    };
    const expandRelativeMiddlewareList = (from) => {
        const expandedMiddlewareList = [];
        from.before.forEach((entry) => {
            if (entry.before.length === 0 && entry.after.length === 0) {
                expandedMiddlewareList.push(entry);
            }
            else {
                expandedMiddlewareList.push(...expandRelativeMiddlewareList(entry));
            }
        });
        expandedMiddlewareList.push(from);
        from.after.reverse().forEach((entry) => {
            if (entry.before.length === 0 && entry.after.length === 0) {
                expandedMiddlewareList.push(entry);
            }
            else {
                expandedMiddlewareList.push(...expandRelativeMiddlewareList(entry));
            }
        });
        return expandedMiddlewareList;
    };
    const getMiddlewareList = (debug = false) => {
        const normalizedAbsoluteEntries = [];
        const normalizedRelativeEntries = [];
        const normalizedEntriesNameMap = {};
        absoluteEntries.forEach((entry) => {
            const normalizedEntry = {
                ...entry,
                before: [],
                after: [],
            };
            for (const alias of getAllAliases(normalizedEntry.name, normalizedEntry.aliases)) {
                normalizedEntriesNameMap[alias] = normalizedEntry;
            }
            normalizedAbsoluteEntries.push(normalizedEntry);
        });
        relativeEntries.forEach((entry) => {
            const normalizedEntry = {
                ...entry,
                before: [],
                after: [],
            };
            for (const alias of getAllAliases(normalizedEntry.name, normalizedEntry.aliases)) {
                normalizedEntriesNameMap[alias] = normalizedEntry;
            }
            normalizedRelativeEntries.push(normalizedEntry);
        });
        normalizedRelativeEntries.forEach((entry) => {
            if (entry.toMiddleware) {
                const toMiddleware = normalizedEntriesNameMap[entry.toMiddleware];
                if (toMiddleware === undefined) {
                    if (debug) {
                        return;
                    }
                    throw new Error(`${entry.toMiddleware} is not found when adding ` +
                        `${getMiddlewareNameWithAliases(entry.name, entry.aliases)} ` +
                        `middleware ${entry.relation} ${entry.toMiddleware}`);
                }
                if (entry.relation === "after") {
                    toMiddleware.after.push(entry);
                }
                if (entry.relation === "before") {
                    toMiddleware.before.push(entry);
                }
            }
        });
        const mainChain = sort(normalizedAbsoluteEntries)
            .map(expandRelativeMiddlewareList)
            .reduce((wholeList, expandedMiddlewareList) => {
            wholeList.push(...expandedMiddlewareList);
            return wholeList;
        }, []);
        return mainChain;
    };
    const stack = {
        add: (middleware, options = {}) => {
            const { name, override, aliases: _aliases } = options;
            const entry = {
                step: "initialize",
                priority: "normal",
                middleware,
                ...options,
            };
            const aliases = getAllAliases(name, _aliases);
            if (aliases.length > 0) {
                if (aliases.some((alias) => entriesNameSet.has(alias))) {
                    if (!override)
                        throw new Error(`Duplicate middleware name '${getMiddlewareNameWithAliases(name, _aliases)}'`);
                    for (const alias of aliases) {
                        const toOverrideIndex = absoluteEntries.findIndex((entry) => entry.name === alias || entry.aliases?.some((a) => a === alias));
                        if (toOverrideIndex === -1) {
                            continue;
                        }
                        const toOverride = absoluteEntries[toOverrideIndex];
                        if (toOverride.step !== entry.step || entry.priority !== toOverride.priority) {
                            throw new Error(`"${getMiddlewareNameWithAliases(toOverride.name, toOverride.aliases)}" middleware with ` +
                                `${toOverride.priority} priority in ${toOverride.step} step cannot ` +
                                `be overridden by "${getMiddlewareNameWithAliases(name, _aliases)}" middleware with ` +
                                `${entry.priority} priority in ${entry.step} step.`);
                        }
                        absoluteEntries.splice(toOverrideIndex, 1);
                    }
                }
                for (const alias of aliases) {
                    entriesNameSet.add(alias);
                }
            }
            absoluteEntries.push(entry);
        },
        addRelativeTo: (middleware, options) => {
            const { name, override, aliases: _aliases } = options;
            const entry = {
                middleware,
                ...options,
            };
            const aliases = getAllAliases(name, _aliases);
            if (aliases.length > 0) {
                if (aliases.some((alias) => entriesNameSet.has(alias))) {
                    if (!override)
                        throw new Error(`Duplicate middleware name '${getMiddlewareNameWithAliases(name, _aliases)}'`);
                    for (const alias of aliases) {
                        const toOverrideIndex = relativeEntries.findIndex((entry) => entry.name === alias || entry.aliases?.some((a) => a === alias));
                        if (toOverrideIndex === -1) {
                            continue;
                        }
                        const toOverride = relativeEntries[toOverrideIndex];
                        if (toOverride.toMiddleware !== entry.toMiddleware || toOverride.relation !== entry.relation) {
                            throw new Error(`"${getMiddlewareNameWithAliases(toOverride.name, toOverride.aliases)}" middleware ` +
                                `${toOverride.relation} "${toOverride.toMiddleware}" middleware cannot be overridden ` +
                                `by "${getMiddlewareNameWithAliases(name, _aliases)}" middleware ${entry.relation} ` +
                                `"${entry.toMiddleware}" middleware.`);
                        }
                        relativeEntries.splice(toOverrideIndex, 1);
                    }
                }
                for (const alias of aliases) {
                    entriesNameSet.add(alias);
                }
            }
            relativeEntries.push(entry);
        },
        clone: () => cloneTo(constructStack()),
        use: (plugin) => {
            plugin.applyToStack(stack);
        },
        remove: (toRemove) => {
            if (typeof toRemove === "string")
                return removeByName(toRemove);
            else
                return removeByReference(toRemove);
        },
        removeByTag: (toRemove) => {
            let isRemoved = false;
            const filterCb = (entry) => {
                const { tags, name, aliases: _aliases } = entry;
                if (tags && tags.includes(toRemove)) {
                    const aliases = getAllAliases(name, _aliases);
                    for (const alias of aliases) {
                        entriesNameSet.delete(alias);
                    }
                    isRemoved = true;
                    return false;
                }
                return true;
            };
            absoluteEntries = absoluteEntries.filter(filterCb);
            relativeEntries = relativeEntries.filter(filterCb);
            return isRemoved;
        },
        concat: (from) => {
            const cloned = cloneTo(constructStack());
            cloned.use(from);
            cloned.identifyOnResolve(identifyOnResolve || cloned.identifyOnResolve() || (from.identifyOnResolve?.() ?? false));
            return cloned;
        },
        applyToStack: cloneTo,
        identify: () => {
            return getMiddlewareList(true).map((mw) => {
                const step = mw.step ??
                    mw.relation +
                        " " +
                        mw.toMiddleware;
                return getMiddlewareNameWithAliases(mw.name, mw.aliases) + " - " + step;
            });
        },
        identifyOnResolve(toggle) {
            if (typeof toggle === "boolean")
                identifyOnResolve = toggle;
            return identifyOnResolve;
        },
        resolve: (handler, context) => {
            for (const middleware of getMiddlewareList()
                .map((entry) => entry.middleware)
                .reverse()) {
                handler = middleware(handler, context);
            }
            if (identifyOnResolve) {
                console.log(stack.identify());
            }
            return handler;
        },
    };
    return stack;
};
const stepWeights = {
    initialize: 5,
    serialize: 4,
    build: 3,
    finalizeRequest: 2,
    deserialize: 1,
};
const priorityWeights = {
    high: 3,
    normal: 2,
    low: 1,
};


/***/ }),

/***/ "../../node_modules/@smithy/middleware-stack/dist-es/index.js":
/*!********************************************************************!*\
  !*** ../../node_modules/@smithy/middleware-stack/dist-es/index.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   constructStack: () => (/* reexport safe */ _MiddlewareStack__WEBPACK_IMPORTED_MODULE_0__.constructStack)
/* harmony export */ });
/* harmony import */ var _MiddlewareStack__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./MiddlewareStack */ "../../node_modules/@smithy/middleware-stack/dist-es/MiddlewareStack.js");



/***/ }),

/***/ "../../node_modules/@smithy/property-provider/dist-es/CredentialsProviderError.js":
/*!****************************************************************************************!*\
  !*** ../../node_modules/@smithy/property-provider/dist-es/CredentialsProviderError.js ***!
  \****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CredentialsProviderError: () => (/* binding */ CredentialsProviderError)
/* harmony export */ });
/* harmony import */ var _ProviderError__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ProviderError */ "../../node_modules/@smithy/property-provider/dist-es/ProviderError.js");

class CredentialsProviderError extends _ProviderError__WEBPACK_IMPORTED_MODULE_0__.ProviderError {
    constructor(message, options = true) {
        super(message, options);
        this.name = "CredentialsProviderError";
        Object.setPrototypeOf(this, CredentialsProviderError.prototype);
    }
}


/***/ }),

/***/ "../../node_modules/@smithy/property-provider/dist-es/ProviderError.js":
/*!*****************************************************************************!*\
  !*** ../../node_modules/@smithy/property-provider/dist-es/ProviderError.js ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ProviderError: () => (/* binding */ ProviderError)
/* harmony export */ });
class ProviderError extends Error {
    constructor(message, options = true) {
        let logger;
        let tryNextLink = true;
        if (typeof options === "boolean") {
            logger = undefined;
            tryNextLink = options;
        }
        else if (options != null && typeof options === "object") {
            logger = options.logger;
            tryNextLink = options.tryNextLink ?? true;
        }
        super(message);
        this.name = "ProviderError";
        this.tryNextLink = tryNextLink;
        Object.setPrototypeOf(this, ProviderError.prototype);
        logger?.debug?.(`@smithy/property-provider ${tryNextLink ? "->" : "(!)"} ${message}`);
    }
    static from(error, options = true) {
        return Object.assign(new this(error.message, options), error);
    }
}


/***/ }),

/***/ "../../node_modules/@smithy/property-provider/dist-es/TokenProviderError.js":
/*!**********************************************************************************!*\
  !*** ../../node_modules/@smithy/property-provider/dist-es/TokenProviderError.js ***!
  \**********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TokenProviderError: () => (/* binding */ TokenProviderError)
/* harmony export */ });
/* harmony import */ var _ProviderError__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ProviderError */ "../../node_modules/@smithy/property-provider/dist-es/ProviderError.js");

class TokenProviderError extends _ProviderError__WEBPACK_IMPORTED_MODULE_0__.ProviderError {
    constructor(message, options = true) {
        super(message, options);
        this.name = "TokenProviderError";
        Object.setPrototypeOf(this, TokenProviderError.prototype);
    }
}


/***/ }),

/***/ "../../node_modules/@smithy/property-provider/dist-es/chain.js":
/*!*********************************************************************!*\
  !*** ../../node_modules/@smithy/property-provider/dist-es/chain.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   chain: () => (/* binding */ chain)
/* harmony export */ });
/* harmony import */ var _ProviderError__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ProviderError */ "../../node_modules/@smithy/property-provider/dist-es/ProviderError.js");

const chain = (...providers) => async () => {
    if (providers.length === 0) {
        throw new _ProviderError__WEBPACK_IMPORTED_MODULE_0__.ProviderError("No providers in chain");
    }
    let lastProviderError;
    for (const provider of providers) {
        try {
            const credentials = await provider();
            return credentials;
        }
        catch (err) {
            lastProviderError = err;
            if (err?.tryNextLink) {
                continue;
            }
            throw err;
        }
    }
    throw lastProviderError;
};


/***/ }),

/***/ "../../node_modules/@smithy/property-provider/dist-es/fromStatic.js":
/*!**************************************************************************!*\
  !*** ../../node_modules/@smithy/property-provider/dist-es/fromStatic.js ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   fromStatic: () => (/* binding */ fromStatic)
/* harmony export */ });
const fromStatic = (staticValue) => () => Promise.resolve(staticValue);


/***/ }),

/***/ "../../node_modules/@smithy/property-provider/dist-es/index.js":
/*!*********************************************************************!*\
  !*** ../../node_modules/@smithy/property-provider/dist-es/index.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CredentialsProviderError: () => (/* reexport safe */ _CredentialsProviderError__WEBPACK_IMPORTED_MODULE_0__.CredentialsProviderError),
/* harmony export */   ProviderError: () => (/* reexport safe */ _ProviderError__WEBPACK_IMPORTED_MODULE_1__.ProviderError),
/* harmony export */   TokenProviderError: () => (/* reexport safe */ _TokenProviderError__WEBPACK_IMPORTED_MODULE_2__.TokenProviderError),
/* harmony export */   chain: () => (/* reexport safe */ _chain__WEBPACK_IMPORTED_MODULE_3__.chain),
/* harmony export */   fromStatic: () => (/* reexport safe */ _fromStatic__WEBPACK_IMPORTED_MODULE_4__.fromStatic),
/* harmony export */   memoize: () => (/* reexport safe */ _memoize__WEBPACK_IMPORTED_MODULE_5__.memoize)
/* harmony export */ });
/* harmony import */ var _CredentialsProviderError__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CredentialsProviderError */ "../../node_modules/@smithy/property-provider/dist-es/CredentialsProviderError.js");
/* harmony import */ var _ProviderError__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ProviderError */ "../../node_modules/@smithy/property-provider/dist-es/ProviderError.js");
/* harmony import */ var _TokenProviderError__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./TokenProviderError */ "../../node_modules/@smithy/property-provider/dist-es/TokenProviderError.js");
/* harmony import */ var _chain__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./chain */ "../../node_modules/@smithy/property-provider/dist-es/chain.js");
/* harmony import */ var _fromStatic__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./fromStatic */ "../../node_modules/@smithy/property-provider/dist-es/fromStatic.js");
/* harmony import */ var _memoize__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./memoize */ "../../node_modules/@smithy/property-provider/dist-es/memoize.js");








/***/ }),

/***/ "../../node_modules/@smithy/property-provider/dist-es/memoize.js":
/*!***********************************************************************!*\
  !*** ../../node_modules/@smithy/property-provider/dist-es/memoize.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   memoize: () => (/* binding */ memoize)
/* harmony export */ });
const memoize = (provider, isExpired, requiresRefresh) => {
    let resolved;
    let pending;
    let hasResult;
    let isConstant = false;
    const coalesceProvider = async () => {
        if (!pending) {
            pending = provider();
        }
        try {
            resolved = await pending;
            hasResult = true;
            isConstant = false;
        }
        finally {
            pending = undefined;
        }
        return resolved;
    };
    if (isExpired === undefined) {
        return async (options) => {
            if (!hasResult || options?.forceRefresh) {
                resolved = await coalesceProvider();
            }
            return resolved;
        };
    }
    return async (options) => {
        if (!hasResult || options?.forceRefresh) {
            resolved = await coalesceProvider();
        }
        if (isConstant) {
            return resolved;
        }
        if (requiresRefresh && !requiresRefresh(resolved)) {
            isConstant = true;
            return resolved;
        }
        if (isExpired(resolved)) {
            await coalesceProvider();
            return resolved;
        }
        return resolved;
    };
};


/***/ }),

/***/ "../../node_modules/@smithy/protocol-http/dist-es/Field.js":
/*!*****************************************************************!*\
  !*** ../../node_modules/@smithy/protocol-http/dist-es/Field.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Field: () => (/* binding */ Field)
/* harmony export */ });
/* harmony import */ var _smithy_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @smithy/types */ "../../node_modules/@smithy/types/dist-es/index.js");

class Field {
    constructor({ name, kind = _smithy_types__WEBPACK_IMPORTED_MODULE_0__.FieldPosition.HEADER, values = [] }) {
        this.name = name;
        this.kind = kind;
        this.values = values;
    }
    add(value) {
        this.values.push(value);
    }
    set(values) {
        this.values = values;
    }
    remove(value) {
        this.values = this.values.filter((v) => v !== value);
    }
    toString() {
        return this.values.map((v) => (v.includes(",") || v.includes(" ") ? `"${v}"` : v)).join(", ");
    }
    get() {
        return this.values;
    }
}


/***/ }),

/***/ "../../node_modules/@smithy/protocol-http/dist-es/Fields.js":
/*!******************************************************************!*\
  !*** ../../node_modules/@smithy/protocol-http/dist-es/Fields.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Fields: () => (/* binding */ Fields)
/* harmony export */ });
class Fields {
    constructor({ fields = [], encoding = "utf-8" }) {
        this.entries = {};
        fields.forEach(this.setField.bind(this));
        this.encoding = encoding;
    }
    setField(field) {
        this.entries[field.name.toLowerCase()] = field;
    }
    getField(name) {
        return this.entries[name.toLowerCase()];
    }
    removeField(name) {
        delete this.entries[name.toLowerCase()];
    }
    getByType(kind) {
        return Object.values(this.entries).filter((field) => field.kind === kind);
    }
}


/***/ }),

/***/ "../../node_modules/@smithy/protocol-http/dist-es/extensions/httpExtensionConfiguration.js":
/*!*************************************************************************************************!*\
  !*** ../../node_modules/@smithy/protocol-http/dist-es/extensions/httpExtensionConfiguration.js ***!
  \*************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getHttpHandlerExtensionConfiguration: () => (/* binding */ getHttpHandlerExtensionConfiguration),
/* harmony export */   resolveHttpHandlerRuntimeConfig: () => (/* binding */ resolveHttpHandlerRuntimeConfig)
/* harmony export */ });
const getHttpHandlerExtensionConfiguration = (runtimeConfig) => {
    let httpHandler = runtimeConfig.httpHandler;
    return {
        setHttpHandler(handler) {
            httpHandler = handler;
        },
        httpHandler() {
            return httpHandler;
        },
        updateHttpClientConfig(key, value) {
            httpHandler.updateHttpClientConfig(key, value);
        },
        httpHandlerConfigs() {
            return httpHandler.httpHandlerConfigs();
        },
    };
};
const resolveHttpHandlerRuntimeConfig = (httpHandlerExtensionConfiguration) => {
    return {
        httpHandler: httpHandlerExtensionConfiguration.httpHandler(),
    };
};


/***/ }),

/***/ "../../node_modules/@smithy/protocol-http/dist-es/extensions/index.js":
/*!****************************************************************************!*\
  !*** ../../node_modules/@smithy/protocol-http/dist-es/extensions/index.js ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getHttpHandlerExtensionConfiguration: () => (/* reexport safe */ _httpExtensionConfiguration__WEBPACK_IMPORTED_MODULE_0__.getHttpHandlerExtensionConfiguration),
/* harmony export */   resolveHttpHandlerRuntimeConfig: () => (/* reexport safe */ _httpExtensionConfiguration__WEBPACK_IMPORTED_MODULE_0__.resolveHttpHandlerRuntimeConfig)
/* harmony export */ });
/* harmony import */ var _httpExtensionConfiguration__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./httpExtensionConfiguration */ "../../node_modules/@smithy/protocol-http/dist-es/extensions/httpExtensionConfiguration.js");



/***/ }),

/***/ "../../node_modules/@smithy/protocol-http/dist-es/httpHandler.js":
/*!***********************************************************************!*\
  !*** ../../node_modules/@smithy/protocol-http/dist-es/httpHandler.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "../../node_modules/@smithy/protocol-http/dist-es/httpRequest.js":
/*!***********************************************************************!*\
  !*** ../../node_modules/@smithy/protocol-http/dist-es/httpRequest.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   HttpRequest: () => (/* binding */ HttpRequest)
/* harmony export */ });
class HttpRequest {
    constructor(options) {
        this.method = options.method || "GET";
        this.hostname = options.hostname || "localhost";
        this.port = options.port;
        this.query = options.query || {};
        this.headers = options.headers || {};
        this.body = options.body;
        this.protocol = options.protocol
            ? options.protocol.slice(-1) !== ":"
                ? `${options.protocol}:`
                : options.protocol
            : "https:";
        this.path = options.path ? (options.path.charAt(0) !== "/" ? `/${options.path}` : options.path) : "/";
        this.username = options.username;
        this.password = options.password;
        this.fragment = options.fragment;
    }
    static clone(request) {
        const cloned = new HttpRequest({
            ...request,
            headers: { ...request.headers },
        });
        if (cloned.query) {
            cloned.query = cloneQuery(cloned.query);
        }
        return cloned;
    }
    static isInstance(request) {
        if (!request) {
            return false;
        }
        const req = request;
        return ("method" in req &&
            "protocol" in req &&
            "hostname" in req &&
            "path" in req &&
            typeof req["query"] === "object" &&
            typeof req["headers"] === "object");
    }
    clone() {
        return HttpRequest.clone(this);
    }
}
function cloneQuery(query) {
    return Object.keys(query).reduce((carry, paramName) => {
        const param = query[paramName];
        return {
            ...carry,
            [paramName]: Array.isArray(param) ? [...param] : param,
        };
    }, {});
}


/***/ }),

/***/ "../../node_modules/@smithy/protocol-http/dist-es/httpResponse.js":
/*!************************************************************************!*\
  !*** ../../node_modules/@smithy/protocol-http/dist-es/httpResponse.js ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   HttpResponse: () => (/* binding */ HttpResponse)
/* harmony export */ });
class HttpResponse {
    constructor(options) {
        this.statusCode = options.statusCode;
        this.reason = options.reason;
        this.headers = options.headers || {};
        this.body = options.body;
    }
    static isInstance(response) {
        if (!response)
            return false;
        const resp = response;
        return typeof resp.statusCode === "number" && typeof resp.headers === "object";
    }
}


/***/ }),

/***/ "../../node_modules/@smithy/protocol-http/dist-es/index.js":
/*!*****************************************************************!*\
  !*** ../../node_modules/@smithy/protocol-http/dist-es/index.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Field: () => (/* reexport safe */ _Field__WEBPACK_IMPORTED_MODULE_1__.Field),
/* harmony export */   Fields: () => (/* reexport safe */ _Fields__WEBPACK_IMPORTED_MODULE_2__.Fields),
/* harmony export */   HttpRequest: () => (/* reexport safe */ _httpRequest__WEBPACK_IMPORTED_MODULE_4__.HttpRequest),
/* harmony export */   HttpResponse: () => (/* reexport safe */ _httpResponse__WEBPACK_IMPORTED_MODULE_5__.HttpResponse),
/* harmony export */   getHttpHandlerExtensionConfiguration: () => (/* reexport safe */ _extensions__WEBPACK_IMPORTED_MODULE_0__.getHttpHandlerExtensionConfiguration),
/* harmony export */   isValidHostname: () => (/* reexport safe */ _isValidHostname__WEBPACK_IMPORTED_MODULE_6__.isValidHostname),
/* harmony export */   resolveHttpHandlerRuntimeConfig: () => (/* reexport safe */ _extensions__WEBPACK_IMPORTED_MODULE_0__.resolveHttpHandlerRuntimeConfig)
/* harmony export */ });
/* harmony import */ var _extensions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./extensions */ "../../node_modules/@smithy/protocol-http/dist-es/extensions/index.js");
/* harmony import */ var _Field__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Field */ "../../node_modules/@smithy/protocol-http/dist-es/Field.js");
/* harmony import */ var _Fields__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Fields */ "../../node_modules/@smithy/protocol-http/dist-es/Fields.js");
/* harmony import */ var _httpHandler__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./httpHandler */ "../../node_modules/@smithy/protocol-http/dist-es/httpHandler.js");
/* harmony import */ var _httpRequest__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./httpRequest */ "../../node_modules/@smithy/protocol-http/dist-es/httpRequest.js");
/* harmony import */ var _httpResponse__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./httpResponse */ "../../node_modules/@smithy/protocol-http/dist-es/httpResponse.js");
/* harmony import */ var _isValidHostname__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./isValidHostname */ "../../node_modules/@smithy/protocol-http/dist-es/isValidHostname.js");
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./types */ "../../node_modules/@smithy/protocol-http/dist-es/types.js");










/***/ }),

/***/ "../../node_modules/@smithy/protocol-http/dist-es/isValidHostname.js":
/*!***************************************************************************!*\
  !*** ../../node_modules/@smithy/protocol-http/dist-es/isValidHostname.js ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   isValidHostname: () => (/* binding */ isValidHostname)
/* harmony export */ });
function isValidHostname(hostname) {
    const hostPattern = /^[a-z0-9][a-z0-9\.\-]*[a-z0-9]$/;
    return hostPattern.test(hostname);
}


/***/ }),

/***/ "../../node_modules/@smithy/protocol-http/dist-es/types.js":
/*!*****************************************************************!*\
  !*** ../../node_modules/@smithy/protocol-http/dist-es/types.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "../../node_modules/@smithy/querystring-builder/dist-es/index.js":
/*!***********************************************************************!*\
  !*** ../../node_modules/@smithy/querystring-builder/dist-es/index.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   buildQueryString: () => (/* binding */ buildQueryString)
/* harmony export */ });
/* harmony import */ var _smithy_util_uri_escape__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @smithy/util-uri-escape */ "../../node_modules/@smithy/util-uri-escape/dist-es/index.js");

function buildQueryString(query) {
    const parts = [];
    for (let key of Object.keys(query).sort()) {
        const value = query[key];
        key = (0,_smithy_util_uri_escape__WEBPACK_IMPORTED_MODULE_0__.escapeUri)(key);
        if (Array.isArray(value)) {
            for (let i = 0, iLen = value.length; i < iLen; i++) {
                parts.push(`${key}=${(0,_smithy_util_uri_escape__WEBPACK_IMPORTED_MODULE_0__.escapeUri)(value[i])}`);
            }
        }
        else {
            let qsEntry = key;
            if (value || typeof value === "string") {
                qsEntry += `=${(0,_smithy_util_uri_escape__WEBPACK_IMPORTED_MODULE_0__.escapeUri)(value)}`;
            }
            parts.push(qsEntry);
        }
    }
    return parts.join("&");
}


/***/ }),

/***/ "../../node_modules/@smithy/querystring-parser/dist-es/index.js":
/*!**********************************************************************!*\
  !*** ../../node_modules/@smithy/querystring-parser/dist-es/index.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   parseQueryString: () => (/* binding */ parseQueryString)
/* harmony export */ });
function parseQueryString(querystring) {
    const query = {};
    querystring = querystring.replace(/^\?/, "");
    if (querystring) {
        for (const pair of querystring.split("&")) {
            let [key, value = null] = pair.split("=");
            key = decodeURIComponent(key);
            if (value) {
                value = decodeURIComponent(value);
            }
            if (!(key in query)) {
                query[key] = value;
            }
            else if (Array.isArray(query[key])) {
                query[key].push(value);
            }
            else {
                query[key] = [query[key], value];
            }
        }
    }
    return query;
}


/***/ }),

/***/ "../../node_modules/@smithy/service-error-classification/dist-es/constants.js":
/*!************************************************************************************!*\
  !*** ../../node_modules/@smithy/service-error-classification/dist-es/constants.js ***!
  \************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CLOCK_SKEW_ERROR_CODES: () => (/* binding */ CLOCK_SKEW_ERROR_CODES),
/* harmony export */   NODEJS_TIMEOUT_ERROR_CODES: () => (/* binding */ NODEJS_TIMEOUT_ERROR_CODES),
/* harmony export */   THROTTLING_ERROR_CODES: () => (/* binding */ THROTTLING_ERROR_CODES),
/* harmony export */   TRANSIENT_ERROR_CODES: () => (/* binding */ TRANSIENT_ERROR_CODES),
/* harmony export */   TRANSIENT_ERROR_STATUS_CODES: () => (/* binding */ TRANSIENT_ERROR_STATUS_CODES)
/* harmony export */ });
const CLOCK_SKEW_ERROR_CODES = [
    "AuthFailure",
    "InvalidSignatureException",
    "RequestExpired",
    "RequestInTheFuture",
    "RequestTimeTooSkewed",
    "SignatureDoesNotMatch",
];
const THROTTLING_ERROR_CODES = [
    "BandwidthLimitExceeded",
    "EC2ThrottledException",
    "LimitExceededException",
    "PriorRequestNotComplete",
    "ProvisionedThroughputExceededException",
    "RequestLimitExceeded",
    "RequestThrottled",
    "RequestThrottledException",
    "SlowDown",
    "ThrottledException",
    "Throttling",
    "ThrottlingException",
    "TooManyRequestsException",
    "TransactionInProgressException",
];
const TRANSIENT_ERROR_CODES = ["TimeoutError", "RequestTimeout", "RequestTimeoutException"];
const TRANSIENT_ERROR_STATUS_CODES = [500, 502, 503, 504];
const NODEJS_TIMEOUT_ERROR_CODES = ["ECONNRESET", "ECONNREFUSED", "EPIPE", "ETIMEDOUT"];


/***/ }),

/***/ "../../node_modules/@smithy/service-error-classification/dist-es/index.js":
/*!********************************************************************************!*\
  !*** ../../node_modules/@smithy/service-error-classification/dist-es/index.js ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   isClockSkewCorrectedError: () => (/* binding */ isClockSkewCorrectedError),
/* harmony export */   isClockSkewError: () => (/* binding */ isClockSkewError),
/* harmony export */   isRetryableByTrait: () => (/* binding */ isRetryableByTrait),
/* harmony export */   isServerError: () => (/* binding */ isServerError),
/* harmony export */   isThrottlingError: () => (/* binding */ isThrottlingError),
/* harmony export */   isTransientError: () => (/* binding */ isTransientError)
/* harmony export */ });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants */ "../../node_modules/@smithy/service-error-classification/dist-es/constants.js");

const isRetryableByTrait = (error) => error.$retryable !== undefined;
const isClockSkewError = (error) => _constants__WEBPACK_IMPORTED_MODULE_0__.CLOCK_SKEW_ERROR_CODES.includes(error.name);
const isClockSkewCorrectedError = (error) => error.$metadata?.clockSkewCorrected;
const isThrottlingError = (error) => error.$metadata?.httpStatusCode === 429 ||
    _constants__WEBPACK_IMPORTED_MODULE_0__.THROTTLING_ERROR_CODES.includes(error.name) ||
    error.$retryable?.throttling == true;
const isTransientError = (error) => isClockSkewCorrectedError(error) ||
    _constants__WEBPACK_IMPORTED_MODULE_0__.TRANSIENT_ERROR_CODES.includes(error.name) ||
    _constants__WEBPACK_IMPORTED_MODULE_0__.NODEJS_TIMEOUT_ERROR_CODES.includes(error?.code || "") ||
    _constants__WEBPACK_IMPORTED_MODULE_0__.TRANSIENT_ERROR_STATUS_CODES.includes(error.$metadata?.httpStatusCode || 0);
const isServerError = (error) => {
    if (error.$metadata?.httpStatusCode !== undefined) {
        const statusCode = error.$metadata.httpStatusCode;
        if (500 <= statusCode && statusCode <= 599 && !isTransientError(error)) {
            return true;
        }
        return false;
    }
    return false;
};


/***/ }),

/***/ "../../node_modules/@smithy/signature-v4/dist-es/HeaderFormatter.js":
/*!**************************************************************************!*\
  !*** ../../node_modules/@smithy/signature-v4/dist-es/HeaderFormatter.js ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   HeaderFormatter: () => (/* binding */ HeaderFormatter),
/* harmony export */   Int64: () => (/* binding */ Int64)
/* harmony export */ });
/* harmony import */ var _smithy_util_hex_encoding__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @smithy/util-hex-encoding */ "../../node_modules/@smithy/util-hex-encoding/dist-es/index.js");
/* harmony import */ var _smithy_util_utf8__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @smithy/util-utf8 */ "../../node_modules/@smithy/util-utf8/dist-es/index.js");


class HeaderFormatter {
    format(headers) {
        const chunks = [];
        for (const headerName of Object.keys(headers)) {
            const bytes = (0,_smithy_util_utf8__WEBPACK_IMPORTED_MODULE_1__.fromUtf8)(headerName);
            chunks.push(Uint8Array.from([bytes.byteLength]), bytes, this.formatHeaderValue(headers[headerName]));
        }
        const out = new Uint8Array(chunks.reduce((carry, bytes) => carry + bytes.byteLength, 0));
        let position = 0;
        for (const chunk of chunks) {
            out.set(chunk, position);
            position += chunk.byteLength;
        }
        return out;
    }
    formatHeaderValue(header) {
        switch (header.type) {
            case "boolean":
                return Uint8Array.from([header.value ? 0 : 1]);
            case "byte":
                return Uint8Array.from([2, header.value]);
            case "short":
                const shortView = new DataView(new ArrayBuffer(3));
                shortView.setUint8(0, 3);
                shortView.setInt16(1, header.value, false);
                return new Uint8Array(shortView.buffer);
            case "integer":
                const intView = new DataView(new ArrayBuffer(5));
                intView.setUint8(0, 4);
                intView.setInt32(1, header.value, false);
                return new Uint8Array(intView.buffer);
            case "long":
                const longBytes = new Uint8Array(9);
                longBytes[0] = 5;
                longBytes.set(header.value.bytes, 1);
                return longBytes;
            case "binary":
                const binView = new DataView(new ArrayBuffer(3 + header.value.byteLength));
                binView.setUint8(0, 6);
                binView.setUint16(1, header.value.byteLength, false);
                const binBytes = new Uint8Array(binView.buffer);
                binBytes.set(header.value, 3);
                return binBytes;
            case "string":
                const utf8Bytes = (0,_smithy_util_utf8__WEBPACK_IMPORTED_MODULE_1__.fromUtf8)(header.value);
                const strView = new DataView(new ArrayBuffer(3 + utf8Bytes.byteLength));
                strView.setUint8(0, 7);
                strView.setUint16(1, utf8Bytes.byteLength, false);
                const strBytes = new Uint8Array(strView.buffer);
                strBytes.set(utf8Bytes, 3);
                return strBytes;
            case "timestamp":
                const tsBytes = new Uint8Array(9);
                tsBytes[0] = 8;
                tsBytes.set(Int64.fromNumber(header.value.valueOf()).bytes, 1);
                return tsBytes;
            case "uuid":
                if (!UUID_PATTERN.test(header.value)) {
                    throw new Error(`Invalid UUID received: ${header.value}`);
                }
                const uuidBytes = new Uint8Array(17);
                uuidBytes[0] = 9;
                uuidBytes.set((0,_smithy_util_hex_encoding__WEBPACK_IMPORTED_MODULE_0__.fromHex)(header.value.replace(/\-/g, "")), 1);
                return uuidBytes;
        }
    }
}
var HEADER_VALUE_TYPE;
(function (HEADER_VALUE_TYPE) {
    HEADER_VALUE_TYPE[HEADER_VALUE_TYPE["boolTrue"] = 0] = "boolTrue";
    HEADER_VALUE_TYPE[HEADER_VALUE_TYPE["boolFalse"] = 1] = "boolFalse";
    HEADER_VALUE_TYPE[HEADER_VALUE_TYPE["byte"] = 2] = "byte";
    HEADER_VALUE_TYPE[HEADER_VALUE_TYPE["short"] = 3] = "short";
    HEADER_VALUE_TYPE[HEADER_VALUE_TYPE["integer"] = 4] = "integer";
    HEADER_VALUE_TYPE[HEADER_VALUE_TYPE["long"] = 5] = "long";
    HEADER_VALUE_TYPE[HEADER_VALUE_TYPE["byteArray"] = 6] = "byteArray";
    HEADER_VALUE_TYPE[HEADER_VALUE_TYPE["string"] = 7] = "string";
    HEADER_VALUE_TYPE[HEADER_VALUE_TYPE["timestamp"] = 8] = "timestamp";
    HEADER_VALUE_TYPE[HEADER_VALUE_TYPE["uuid"] = 9] = "uuid";
})(HEADER_VALUE_TYPE || (HEADER_VALUE_TYPE = {}));
const UUID_PATTERN = /^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/;
class Int64 {
    constructor(bytes) {
        this.bytes = bytes;
        if (bytes.byteLength !== 8) {
            throw new Error("Int64 buffers must be exactly 8 bytes");
        }
    }
    static fromNumber(number) {
        if (number > 9223372036854776000 || number < -9223372036854776000) {
            throw new Error(`${number} is too large (or, if negative, too small) to represent as an Int64`);
        }
        const bytes = new Uint8Array(8);
        for (let i = 7, remaining = Math.abs(Math.round(number)); i > -1 && remaining > 0; i--, remaining /= 256) {
            bytes[i] = remaining;
        }
        if (number < 0) {
            negate(bytes);
        }
        return new Int64(bytes);
    }
    valueOf() {
        const bytes = this.bytes.slice(0);
        const negative = bytes[0] & 0b10000000;
        if (negative) {
            negate(bytes);
        }
        return parseInt((0,_smithy_util_hex_encoding__WEBPACK_IMPORTED_MODULE_0__.toHex)(bytes), 16) * (negative ? -1 : 1);
    }
    toString() {
        return String(this.valueOf());
    }
}
function negate(bytes) {
    for (let i = 0; i < 8; i++) {
        bytes[i] ^= 0xff;
    }
    for (let i = 7; i > -1; i--) {
        bytes[i]++;
        if (bytes[i] !== 0)
            break;
    }
}


/***/ }),

/***/ "../../node_modules/@smithy/signature-v4/dist-es/SignatureV4.js":
/*!**********************************************************************!*\
  !*** ../../node_modules/@smithy/signature-v4/dist-es/SignatureV4.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SignatureV4: () => (/* binding */ SignatureV4)
/* harmony export */ });
/* harmony import */ var _smithy_util_hex_encoding__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @smithy/util-hex-encoding */ "../../node_modules/@smithy/util-hex-encoding/dist-es/index.js");
/* harmony import */ var _smithy_util_middleware__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @smithy/util-middleware */ "../../node_modules/@smithy/util-middleware/dist-es/index.js");
/* harmony import */ var _smithy_util_uri_escape__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @smithy/util-uri-escape */ "../../node_modules/@smithy/util-uri-escape/dist-es/index.js");
/* harmony import */ var _smithy_util_utf8__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @smithy/util-utf8 */ "../../node_modules/@smithy/util-utf8/dist-es/index.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./constants */ "../../node_modules/@smithy/signature-v4/dist-es/constants.js");
/* harmony import */ var _credentialDerivation__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./credentialDerivation */ "../../node_modules/@smithy/signature-v4/dist-es/credentialDerivation.js");
/* harmony import */ var _getCanonicalHeaders__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./getCanonicalHeaders */ "../../node_modules/@smithy/signature-v4/dist-es/getCanonicalHeaders.js");
/* harmony import */ var _getCanonicalQuery__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./getCanonicalQuery */ "../../node_modules/@smithy/signature-v4/dist-es/getCanonicalQuery.js");
/* harmony import */ var _getPayloadHash__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./getPayloadHash */ "../../node_modules/@smithy/signature-v4/dist-es/getPayloadHash.js");
/* harmony import */ var _HeaderFormatter__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./HeaderFormatter */ "../../node_modules/@smithy/signature-v4/dist-es/HeaderFormatter.js");
/* harmony import */ var _headerUtil__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./headerUtil */ "../../node_modules/@smithy/signature-v4/dist-es/headerUtil.js");
/* harmony import */ var _moveHeadersToQuery__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./moveHeadersToQuery */ "../../node_modules/@smithy/signature-v4/dist-es/moveHeadersToQuery.js");
/* harmony import */ var _prepareRequest__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./prepareRequest */ "../../node_modules/@smithy/signature-v4/dist-es/prepareRequest.js");
/* harmony import */ var _utilDate__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./utilDate */ "../../node_modules/@smithy/signature-v4/dist-es/utilDate.js");














class SignatureV4 {
    constructor({ applyChecksum, credentials, region, service, sha256, uriEscapePath = true, }) {
        this.headerFormatter = new _HeaderFormatter__WEBPACK_IMPORTED_MODULE_9__.HeaderFormatter();
        this.service = service;
        this.sha256 = sha256;
        this.uriEscapePath = uriEscapePath;
        this.applyChecksum = typeof applyChecksum === "boolean" ? applyChecksum : true;
        this.regionProvider = (0,_smithy_util_middleware__WEBPACK_IMPORTED_MODULE_1__.normalizeProvider)(region);
        this.credentialProvider = (0,_smithy_util_middleware__WEBPACK_IMPORTED_MODULE_1__.normalizeProvider)(credentials);
    }
    async presign(originalRequest, options = {}) {
        const { signingDate = new Date(), expiresIn = 3600, unsignableHeaders, unhoistableHeaders, signableHeaders, hoistableHeaders, signingRegion, signingService, } = options;
        const credentials = await this.credentialProvider();
        this.validateResolvedCredentials(credentials);
        const region = signingRegion ?? (await this.regionProvider());
        const { longDate, shortDate } = formatDate(signingDate);
        if (expiresIn > _constants__WEBPACK_IMPORTED_MODULE_4__.MAX_PRESIGNED_TTL) {
            return Promise.reject("Signature version 4 presigned URLs" + " must have an expiration date less than one week in" + " the future");
        }
        const scope = (0,_credentialDerivation__WEBPACK_IMPORTED_MODULE_5__.createScope)(shortDate, region, signingService ?? this.service);
        const request = (0,_moveHeadersToQuery__WEBPACK_IMPORTED_MODULE_11__.moveHeadersToQuery)((0,_prepareRequest__WEBPACK_IMPORTED_MODULE_12__.prepareRequest)(originalRequest), { unhoistableHeaders, hoistableHeaders });
        if (credentials.sessionToken) {
            request.query[_constants__WEBPACK_IMPORTED_MODULE_4__.TOKEN_QUERY_PARAM] = credentials.sessionToken;
        }
        request.query[_constants__WEBPACK_IMPORTED_MODULE_4__.ALGORITHM_QUERY_PARAM] = _constants__WEBPACK_IMPORTED_MODULE_4__.ALGORITHM_IDENTIFIER;
        request.query[_constants__WEBPACK_IMPORTED_MODULE_4__.CREDENTIAL_QUERY_PARAM] = `${credentials.accessKeyId}/${scope}`;
        request.query[_constants__WEBPACK_IMPORTED_MODULE_4__.AMZ_DATE_QUERY_PARAM] = longDate;
        request.query[_constants__WEBPACK_IMPORTED_MODULE_4__.EXPIRES_QUERY_PARAM] = expiresIn.toString(10);
        const canonicalHeaders = (0,_getCanonicalHeaders__WEBPACK_IMPORTED_MODULE_6__.getCanonicalHeaders)(request, unsignableHeaders, signableHeaders);
        request.query[_constants__WEBPACK_IMPORTED_MODULE_4__.SIGNED_HEADERS_QUERY_PARAM] = getCanonicalHeaderList(canonicalHeaders);
        request.query[_constants__WEBPACK_IMPORTED_MODULE_4__.SIGNATURE_QUERY_PARAM] = await this.getSignature(longDate, scope, this.getSigningKey(credentials, region, shortDate, signingService), this.createCanonicalRequest(request, canonicalHeaders, await (0,_getPayloadHash__WEBPACK_IMPORTED_MODULE_8__.getPayloadHash)(originalRequest, this.sha256)));
        return request;
    }
    async sign(toSign, options) {
        if (typeof toSign === "string") {
            return this.signString(toSign, options);
        }
        else if (toSign.headers && toSign.payload) {
            return this.signEvent(toSign, options);
        }
        else if (toSign.message) {
            return this.signMessage(toSign, options);
        }
        else {
            return this.signRequest(toSign, options);
        }
    }
    async signEvent({ headers, payload }, { signingDate = new Date(), priorSignature, signingRegion, signingService }) {
        const region = signingRegion ?? (await this.regionProvider());
        const { shortDate, longDate } = formatDate(signingDate);
        const scope = (0,_credentialDerivation__WEBPACK_IMPORTED_MODULE_5__.createScope)(shortDate, region, signingService ?? this.service);
        const hashedPayload = await (0,_getPayloadHash__WEBPACK_IMPORTED_MODULE_8__.getPayloadHash)({ headers: {}, body: payload }, this.sha256);
        const hash = new this.sha256();
        hash.update(headers);
        const hashedHeaders = (0,_smithy_util_hex_encoding__WEBPACK_IMPORTED_MODULE_0__.toHex)(await hash.digest());
        const stringToSign = [
            _constants__WEBPACK_IMPORTED_MODULE_4__.EVENT_ALGORITHM_IDENTIFIER,
            longDate,
            scope,
            priorSignature,
            hashedHeaders,
            hashedPayload,
        ].join("\n");
        return this.signString(stringToSign, { signingDate, signingRegion: region, signingService });
    }
    async signMessage(signableMessage, { signingDate = new Date(), signingRegion, signingService }) {
        const promise = this.signEvent({
            headers: this.headerFormatter.format(signableMessage.message.headers),
            payload: signableMessage.message.body,
        }, {
            signingDate,
            signingRegion,
            signingService,
            priorSignature: signableMessage.priorSignature,
        });
        return promise.then((signature) => {
            return { message: signableMessage.message, signature };
        });
    }
    async signString(stringToSign, { signingDate = new Date(), signingRegion, signingService } = {}) {
        const credentials = await this.credentialProvider();
        this.validateResolvedCredentials(credentials);
        const region = signingRegion ?? (await this.regionProvider());
        const { shortDate } = formatDate(signingDate);
        const hash = new this.sha256(await this.getSigningKey(credentials, region, shortDate, signingService));
        hash.update((0,_smithy_util_utf8__WEBPACK_IMPORTED_MODULE_3__.toUint8Array)(stringToSign));
        return (0,_smithy_util_hex_encoding__WEBPACK_IMPORTED_MODULE_0__.toHex)(await hash.digest());
    }
    async signRequest(requestToSign, { signingDate = new Date(), signableHeaders, unsignableHeaders, signingRegion, signingService, } = {}) {
        const credentials = await this.credentialProvider();
        this.validateResolvedCredentials(credentials);
        const region = signingRegion ?? (await this.regionProvider());
        const request = (0,_prepareRequest__WEBPACK_IMPORTED_MODULE_12__.prepareRequest)(requestToSign);
        const { longDate, shortDate } = formatDate(signingDate);
        const scope = (0,_credentialDerivation__WEBPACK_IMPORTED_MODULE_5__.createScope)(shortDate, region, signingService ?? this.service);
        request.headers[_constants__WEBPACK_IMPORTED_MODULE_4__.AMZ_DATE_HEADER] = longDate;
        if (credentials.sessionToken) {
            request.headers[_constants__WEBPACK_IMPORTED_MODULE_4__.TOKEN_HEADER] = credentials.sessionToken;
        }
        const payloadHash = await (0,_getPayloadHash__WEBPACK_IMPORTED_MODULE_8__.getPayloadHash)(request, this.sha256);
        if (!(0,_headerUtil__WEBPACK_IMPORTED_MODULE_10__.hasHeader)(_constants__WEBPACK_IMPORTED_MODULE_4__.SHA256_HEADER, request.headers) && this.applyChecksum) {
            request.headers[_constants__WEBPACK_IMPORTED_MODULE_4__.SHA256_HEADER] = payloadHash;
        }
        const canonicalHeaders = (0,_getCanonicalHeaders__WEBPACK_IMPORTED_MODULE_6__.getCanonicalHeaders)(request, unsignableHeaders, signableHeaders);
        const signature = await this.getSignature(longDate, scope, this.getSigningKey(credentials, region, shortDate, signingService), this.createCanonicalRequest(request, canonicalHeaders, payloadHash));
        request.headers[_constants__WEBPACK_IMPORTED_MODULE_4__.AUTH_HEADER] =
            `${_constants__WEBPACK_IMPORTED_MODULE_4__.ALGORITHM_IDENTIFIER} ` +
                `Credential=${credentials.accessKeyId}/${scope}, ` +
                `SignedHeaders=${getCanonicalHeaderList(canonicalHeaders)}, ` +
                `Signature=${signature}`;
        return request;
    }
    createCanonicalRequest(request, canonicalHeaders, payloadHash) {
        const sortedHeaders = Object.keys(canonicalHeaders).sort();
        return `${request.method}
${this.getCanonicalPath(request)}
${(0,_getCanonicalQuery__WEBPACK_IMPORTED_MODULE_7__.getCanonicalQuery)(request)}
${sortedHeaders.map((name) => `${name}:${canonicalHeaders[name]}`).join("\n")}

${sortedHeaders.join(";")}
${payloadHash}`;
    }
    async createStringToSign(longDate, credentialScope, canonicalRequest) {
        const hash = new this.sha256();
        hash.update((0,_smithy_util_utf8__WEBPACK_IMPORTED_MODULE_3__.toUint8Array)(canonicalRequest));
        const hashedRequest = await hash.digest();
        return `${_constants__WEBPACK_IMPORTED_MODULE_4__.ALGORITHM_IDENTIFIER}
${longDate}
${credentialScope}
${(0,_smithy_util_hex_encoding__WEBPACK_IMPORTED_MODULE_0__.toHex)(hashedRequest)}`;
    }
    getCanonicalPath({ path }) {
        if (this.uriEscapePath) {
            const normalizedPathSegments = [];
            for (const pathSegment of path.split("/")) {
                if (pathSegment?.length === 0)
                    continue;
                if (pathSegment === ".")
                    continue;
                if (pathSegment === "..") {
                    normalizedPathSegments.pop();
                }
                else {
                    normalizedPathSegments.push(pathSegment);
                }
            }
            const normalizedPath = `${path?.startsWith("/") ? "/" : ""}${normalizedPathSegments.join("/")}${normalizedPathSegments.length > 0 && path?.endsWith("/") ? "/" : ""}`;
            const doubleEncoded = (0,_smithy_util_uri_escape__WEBPACK_IMPORTED_MODULE_2__.escapeUri)(normalizedPath);
            return doubleEncoded.replace(/%2F/g, "/");
        }
        return path;
    }
    async getSignature(longDate, credentialScope, keyPromise, canonicalRequest) {
        const stringToSign = await this.createStringToSign(longDate, credentialScope, canonicalRequest);
        const hash = new this.sha256(await keyPromise);
        hash.update((0,_smithy_util_utf8__WEBPACK_IMPORTED_MODULE_3__.toUint8Array)(stringToSign));
        return (0,_smithy_util_hex_encoding__WEBPACK_IMPORTED_MODULE_0__.toHex)(await hash.digest());
    }
    getSigningKey(credentials, region, shortDate, service) {
        return (0,_credentialDerivation__WEBPACK_IMPORTED_MODULE_5__.getSigningKey)(this.sha256, credentials, shortDate, region, service || this.service);
    }
    validateResolvedCredentials(credentials) {
        if (typeof credentials !== "object" ||
            typeof credentials.accessKeyId !== "string" ||
            typeof credentials.secretAccessKey !== "string") {
            throw new Error("Resolved credential object is not valid");
        }
    }
}
const formatDate = (now) => {
    const longDate = (0,_utilDate__WEBPACK_IMPORTED_MODULE_13__.iso8601)(now).replace(/[\-:]/g, "");
    return {
        longDate,
        shortDate: longDate.slice(0, 8),
    };
};
const getCanonicalHeaderList = (headers) => Object.keys(headers).sort().join(";");


/***/ }),

/***/ "../../node_modules/@smithy/signature-v4/dist-es/constants.js":
/*!********************************************************************!*\
  !*** ../../node_modules/@smithy/signature-v4/dist-es/constants.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ALGORITHM_IDENTIFIER: () => (/* binding */ ALGORITHM_IDENTIFIER),
/* harmony export */   ALGORITHM_IDENTIFIER_V4A: () => (/* binding */ ALGORITHM_IDENTIFIER_V4A),
/* harmony export */   ALGORITHM_QUERY_PARAM: () => (/* binding */ ALGORITHM_QUERY_PARAM),
/* harmony export */   ALWAYS_UNSIGNABLE_HEADERS: () => (/* binding */ ALWAYS_UNSIGNABLE_HEADERS),
/* harmony export */   AMZ_DATE_HEADER: () => (/* binding */ AMZ_DATE_HEADER),
/* harmony export */   AMZ_DATE_QUERY_PARAM: () => (/* binding */ AMZ_DATE_QUERY_PARAM),
/* harmony export */   AUTH_HEADER: () => (/* binding */ AUTH_HEADER),
/* harmony export */   CREDENTIAL_QUERY_PARAM: () => (/* binding */ CREDENTIAL_QUERY_PARAM),
/* harmony export */   DATE_HEADER: () => (/* binding */ DATE_HEADER),
/* harmony export */   EVENT_ALGORITHM_IDENTIFIER: () => (/* binding */ EVENT_ALGORITHM_IDENTIFIER),
/* harmony export */   EXPIRES_QUERY_PARAM: () => (/* binding */ EXPIRES_QUERY_PARAM),
/* harmony export */   GENERATED_HEADERS: () => (/* binding */ GENERATED_HEADERS),
/* harmony export */   HOST_HEADER: () => (/* binding */ HOST_HEADER),
/* harmony export */   KEY_TYPE_IDENTIFIER: () => (/* binding */ KEY_TYPE_IDENTIFIER),
/* harmony export */   MAX_CACHE_SIZE: () => (/* binding */ MAX_CACHE_SIZE),
/* harmony export */   MAX_PRESIGNED_TTL: () => (/* binding */ MAX_PRESIGNED_TTL),
/* harmony export */   PROXY_HEADER_PATTERN: () => (/* binding */ PROXY_HEADER_PATTERN),
/* harmony export */   REGION_SET_PARAM: () => (/* binding */ REGION_SET_PARAM),
/* harmony export */   SEC_HEADER_PATTERN: () => (/* binding */ SEC_HEADER_PATTERN),
/* harmony export */   SHA256_HEADER: () => (/* binding */ SHA256_HEADER),
/* harmony export */   SIGNATURE_HEADER: () => (/* binding */ SIGNATURE_HEADER),
/* harmony export */   SIGNATURE_QUERY_PARAM: () => (/* binding */ SIGNATURE_QUERY_PARAM),
/* harmony export */   SIGNED_HEADERS_QUERY_PARAM: () => (/* binding */ SIGNED_HEADERS_QUERY_PARAM),
/* harmony export */   TOKEN_HEADER: () => (/* binding */ TOKEN_HEADER),
/* harmony export */   TOKEN_QUERY_PARAM: () => (/* binding */ TOKEN_QUERY_PARAM),
/* harmony export */   UNSIGNABLE_PATTERNS: () => (/* binding */ UNSIGNABLE_PATTERNS),
/* harmony export */   UNSIGNED_PAYLOAD: () => (/* binding */ UNSIGNED_PAYLOAD)
/* harmony export */ });
const ALGORITHM_QUERY_PARAM = "X-Amz-Algorithm";
const CREDENTIAL_QUERY_PARAM = "X-Amz-Credential";
const AMZ_DATE_QUERY_PARAM = "X-Amz-Date";
const SIGNED_HEADERS_QUERY_PARAM = "X-Amz-SignedHeaders";
const EXPIRES_QUERY_PARAM = "X-Amz-Expires";
const SIGNATURE_QUERY_PARAM = "X-Amz-Signature";
const TOKEN_QUERY_PARAM = "X-Amz-Security-Token";
const REGION_SET_PARAM = "X-Amz-Region-Set";
const AUTH_HEADER = "authorization";
const AMZ_DATE_HEADER = AMZ_DATE_QUERY_PARAM.toLowerCase();
const DATE_HEADER = "date";
const GENERATED_HEADERS = [AUTH_HEADER, AMZ_DATE_HEADER, DATE_HEADER];
const SIGNATURE_HEADER = SIGNATURE_QUERY_PARAM.toLowerCase();
const SHA256_HEADER = "x-amz-content-sha256";
const TOKEN_HEADER = TOKEN_QUERY_PARAM.toLowerCase();
const HOST_HEADER = "host";
const ALWAYS_UNSIGNABLE_HEADERS = {
    authorization: true,
    "cache-control": true,
    connection: true,
    expect: true,
    from: true,
    "keep-alive": true,
    "max-forwards": true,
    pragma: true,
    referer: true,
    te: true,
    trailer: true,
    "transfer-encoding": true,
    upgrade: true,
    "user-agent": true,
    "x-amzn-trace-id": true,
};
const PROXY_HEADER_PATTERN = /^proxy-/;
const SEC_HEADER_PATTERN = /^sec-/;
const UNSIGNABLE_PATTERNS = [/^proxy-/i, /^sec-/i];
const ALGORITHM_IDENTIFIER = "AWS4-HMAC-SHA256";
const ALGORITHM_IDENTIFIER_V4A = "AWS4-ECDSA-P256-SHA256";
const EVENT_ALGORITHM_IDENTIFIER = "AWS4-HMAC-SHA256-PAYLOAD";
const UNSIGNED_PAYLOAD = "UNSIGNED-PAYLOAD";
const MAX_CACHE_SIZE = 50;
const KEY_TYPE_IDENTIFIER = "aws4_request";
const MAX_PRESIGNED_TTL = 60 * 60 * 24 * 7;


/***/ }),

/***/ "../../node_modules/@smithy/signature-v4/dist-es/credentialDerivation.js":
/*!*******************************************************************************!*\
  !*** ../../node_modules/@smithy/signature-v4/dist-es/credentialDerivation.js ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   clearCredentialCache: () => (/* binding */ clearCredentialCache),
/* harmony export */   createScope: () => (/* binding */ createScope),
/* harmony export */   getSigningKey: () => (/* binding */ getSigningKey)
/* harmony export */ });
/* harmony import */ var _smithy_util_hex_encoding__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @smithy/util-hex-encoding */ "../../node_modules/@smithy/util-hex-encoding/dist-es/index.js");
/* harmony import */ var _smithy_util_utf8__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @smithy/util-utf8 */ "../../node_modules/@smithy/util-utf8/dist-es/index.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./constants */ "../../node_modules/@smithy/signature-v4/dist-es/constants.js");



const signingKeyCache = {};
const cacheQueue = [];
const createScope = (shortDate, region, service) => `${shortDate}/${region}/${service}/${_constants__WEBPACK_IMPORTED_MODULE_2__.KEY_TYPE_IDENTIFIER}`;
const getSigningKey = async (sha256Constructor, credentials, shortDate, region, service) => {
    const credsHash = await hmac(sha256Constructor, credentials.secretAccessKey, credentials.accessKeyId);
    const cacheKey = `${shortDate}:${region}:${service}:${(0,_smithy_util_hex_encoding__WEBPACK_IMPORTED_MODULE_0__.toHex)(credsHash)}:${credentials.sessionToken}`;
    if (cacheKey in signingKeyCache) {
        return signingKeyCache[cacheKey];
    }
    cacheQueue.push(cacheKey);
    while (cacheQueue.length > _constants__WEBPACK_IMPORTED_MODULE_2__.MAX_CACHE_SIZE) {
        delete signingKeyCache[cacheQueue.shift()];
    }
    let key = `AWS4${credentials.secretAccessKey}`;
    for (const signable of [shortDate, region, service, _constants__WEBPACK_IMPORTED_MODULE_2__.KEY_TYPE_IDENTIFIER]) {
        key = await hmac(sha256Constructor, key, signable);
    }
    return (signingKeyCache[cacheKey] = key);
};
const clearCredentialCache = () => {
    cacheQueue.length = 0;
    Object.keys(signingKeyCache).forEach((cacheKey) => {
        delete signingKeyCache[cacheKey];
    });
};
const hmac = (ctor, secret, data) => {
    const hash = new ctor(secret);
    hash.update((0,_smithy_util_utf8__WEBPACK_IMPORTED_MODULE_1__.toUint8Array)(data));
    return hash.digest();
};


/***/ }),

/***/ "../../node_modules/@smithy/signature-v4/dist-es/getCanonicalHeaders.js":
/*!******************************************************************************!*\
  !*** ../../node_modules/@smithy/signature-v4/dist-es/getCanonicalHeaders.js ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getCanonicalHeaders: () => (/* binding */ getCanonicalHeaders)
/* harmony export */ });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants */ "../../node_modules/@smithy/signature-v4/dist-es/constants.js");

const getCanonicalHeaders = ({ headers }, unsignableHeaders, signableHeaders) => {
    const canonical = {};
    for (const headerName of Object.keys(headers).sort()) {
        if (headers[headerName] == undefined) {
            continue;
        }
        const canonicalHeaderName = headerName.toLowerCase();
        if (canonicalHeaderName in _constants__WEBPACK_IMPORTED_MODULE_0__.ALWAYS_UNSIGNABLE_HEADERS ||
            unsignableHeaders?.has(canonicalHeaderName) ||
            _constants__WEBPACK_IMPORTED_MODULE_0__.PROXY_HEADER_PATTERN.test(canonicalHeaderName) ||
            _constants__WEBPACK_IMPORTED_MODULE_0__.SEC_HEADER_PATTERN.test(canonicalHeaderName)) {
            if (!signableHeaders || (signableHeaders && !signableHeaders.has(canonicalHeaderName))) {
                continue;
            }
        }
        canonical[canonicalHeaderName] = headers[headerName].trim().replace(/\s+/g, " ");
    }
    return canonical;
};


/***/ }),

/***/ "../../node_modules/@smithy/signature-v4/dist-es/getCanonicalQuery.js":
/*!****************************************************************************!*\
  !*** ../../node_modules/@smithy/signature-v4/dist-es/getCanonicalQuery.js ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getCanonicalQuery: () => (/* binding */ getCanonicalQuery)
/* harmony export */ });
/* harmony import */ var _smithy_util_uri_escape__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @smithy/util-uri-escape */ "../../node_modules/@smithy/util-uri-escape/dist-es/index.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./constants */ "../../node_modules/@smithy/signature-v4/dist-es/constants.js");


const getCanonicalQuery = ({ query = {} }) => {
    const keys = [];
    const serialized = {};
    for (const key of Object.keys(query)) {
        if (key.toLowerCase() === _constants__WEBPACK_IMPORTED_MODULE_1__.SIGNATURE_HEADER) {
            continue;
        }
        const encodedKey = (0,_smithy_util_uri_escape__WEBPACK_IMPORTED_MODULE_0__.escapeUri)(key);
        keys.push(encodedKey);
        const value = query[key];
        if (typeof value === "string") {
            serialized[encodedKey] = `${encodedKey}=${(0,_smithy_util_uri_escape__WEBPACK_IMPORTED_MODULE_0__.escapeUri)(value)}`;
        }
        else if (Array.isArray(value)) {
            serialized[encodedKey] = value
                .slice(0)
                .reduce((encoded, value) => encoded.concat([`${encodedKey}=${(0,_smithy_util_uri_escape__WEBPACK_IMPORTED_MODULE_0__.escapeUri)(value)}`]), [])
                .sort()
                .join("&");
        }
    }
    return keys
        .sort()
        .map((key) => serialized[key])
        .filter((serialized) => serialized)
        .join("&");
};


/***/ }),

/***/ "../../node_modules/@smithy/signature-v4/dist-es/getPayloadHash.js":
/*!*************************************************************************!*\
  !*** ../../node_modules/@smithy/signature-v4/dist-es/getPayloadHash.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getPayloadHash: () => (/* binding */ getPayloadHash)
/* harmony export */ });
/* harmony import */ var _smithy_is_array_buffer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @smithy/is-array-buffer */ "../../node_modules/@smithy/is-array-buffer/dist-es/index.js");
/* harmony import */ var _smithy_util_hex_encoding__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @smithy/util-hex-encoding */ "../../node_modules/@smithy/util-hex-encoding/dist-es/index.js");
/* harmony import */ var _smithy_util_utf8__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @smithy/util-utf8 */ "../../node_modules/@smithy/util-utf8/dist-es/index.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./constants */ "../../node_modules/@smithy/signature-v4/dist-es/constants.js");




const getPayloadHash = async ({ headers, body }, hashConstructor) => {
    for (const headerName of Object.keys(headers)) {
        if (headerName.toLowerCase() === _constants__WEBPACK_IMPORTED_MODULE_3__.SHA256_HEADER) {
            return headers[headerName];
        }
    }
    if (body == undefined) {
        return "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855";
    }
    else if (typeof body === "string" || ArrayBuffer.isView(body) || (0,_smithy_is_array_buffer__WEBPACK_IMPORTED_MODULE_0__.isArrayBuffer)(body)) {
        const hashCtor = new hashConstructor();
        hashCtor.update((0,_smithy_util_utf8__WEBPACK_IMPORTED_MODULE_2__.toUint8Array)(body));
        return (0,_smithy_util_hex_encoding__WEBPACK_IMPORTED_MODULE_1__.toHex)(await hashCtor.digest());
    }
    return _constants__WEBPACK_IMPORTED_MODULE_3__.UNSIGNED_PAYLOAD;
};


/***/ }),

/***/ "../../node_modules/@smithy/signature-v4/dist-es/headerUtil.js":
/*!*********************************************************************!*\
  !*** ../../node_modules/@smithy/signature-v4/dist-es/headerUtil.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   deleteHeader: () => (/* binding */ deleteHeader),
/* harmony export */   getHeaderValue: () => (/* binding */ getHeaderValue),
/* harmony export */   hasHeader: () => (/* binding */ hasHeader)
/* harmony export */ });
const hasHeader = (soughtHeader, headers) => {
    soughtHeader = soughtHeader.toLowerCase();
    for (const headerName of Object.keys(headers)) {
        if (soughtHeader === headerName.toLowerCase()) {
            return true;
        }
    }
    return false;
};
const getHeaderValue = (soughtHeader, headers) => {
    soughtHeader = soughtHeader.toLowerCase();
    for (const headerName of Object.keys(headers)) {
        if (soughtHeader === headerName.toLowerCase()) {
            return headers[headerName];
        }
    }
    return undefined;
};
const deleteHeader = (soughtHeader, headers) => {
    soughtHeader = soughtHeader.toLowerCase();
    for (const headerName of Object.keys(headers)) {
        if (soughtHeader === headerName.toLowerCase()) {
            delete headers[headerName];
        }
    }
};


/***/ }),

/***/ "../../node_modules/@smithy/signature-v4/dist-es/index.js":
/*!****************************************************************!*\
  !*** ../../node_modules/@smithy/signature-v4/dist-es/index.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SignatureV4: () => (/* reexport safe */ _SignatureV4__WEBPACK_IMPORTED_MODULE_0__.SignatureV4),
/* harmony export */   clearCredentialCache: () => (/* reexport safe */ _credentialDerivation__WEBPACK_IMPORTED_MODULE_6__.clearCredentialCache),
/* harmony export */   createScope: () => (/* reexport safe */ _credentialDerivation__WEBPACK_IMPORTED_MODULE_6__.createScope),
/* harmony export */   getCanonicalHeaders: () => (/* reexport safe */ _getCanonicalHeaders__WEBPACK_IMPORTED_MODULE_1__.getCanonicalHeaders),
/* harmony export */   getCanonicalQuery: () => (/* reexport safe */ _getCanonicalQuery__WEBPACK_IMPORTED_MODULE_2__.getCanonicalQuery),
/* harmony export */   getPayloadHash: () => (/* reexport safe */ _getPayloadHash__WEBPACK_IMPORTED_MODULE_3__.getPayloadHash),
/* harmony export */   getSigningKey: () => (/* reexport safe */ _credentialDerivation__WEBPACK_IMPORTED_MODULE_6__.getSigningKey),
/* harmony export */   moveHeadersToQuery: () => (/* reexport safe */ _moveHeadersToQuery__WEBPACK_IMPORTED_MODULE_4__.moveHeadersToQuery),
/* harmony export */   prepareRequest: () => (/* reexport safe */ _prepareRequest__WEBPACK_IMPORTED_MODULE_5__.prepareRequest)
/* harmony export */ });
/* harmony import */ var _SignatureV4__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SignatureV4 */ "../../node_modules/@smithy/signature-v4/dist-es/SignatureV4.js");
/* harmony import */ var _getCanonicalHeaders__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./getCanonicalHeaders */ "../../node_modules/@smithy/signature-v4/dist-es/getCanonicalHeaders.js");
/* harmony import */ var _getCanonicalQuery__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./getCanonicalQuery */ "../../node_modules/@smithy/signature-v4/dist-es/getCanonicalQuery.js");
/* harmony import */ var _getPayloadHash__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./getPayloadHash */ "../../node_modules/@smithy/signature-v4/dist-es/getPayloadHash.js");
/* harmony import */ var _moveHeadersToQuery__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./moveHeadersToQuery */ "../../node_modules/@smithy/signature-v4/dist-es/moveHeadersToQuery.js");
/* harmony import */ var _prepareRequest__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./prepareRequest */ "../../node_modules/@smithy/signature-v4/dist-es/prepareRequest.js");
/* harmony import */ var _credentialDerivation__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./credentialDerivation */ "../../node_modules/@smithy/signature-v4/dist-es/credentialDerivation.js");









/***/ }),

/***/ "../../node_modules/@smithy/signature-v4/dist-es/moveHeadersToQuery.js":
/*!*****************************************************************************!*\
  !*** ../../node_modules/@smithy/signature-v4/dist-es/moveHeadersToQuery.js ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   moveHeadersToQuery: () => (/* binding */ moveHeadersToQuery)
/* harmony export */ });
/* harmony import */ var _smithy_protocol_http__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @smithy/protocol-http */ "../../node_modules/@smithy/protocol-http/dist-es/index.js");

const moveHeadersToQuery = (request, options = {}) => {
    const { headers, query = {} } = _smithy_protocol_http__WEBPACK_IMPORTED_MODULE_0__.HttpRequest.clone(request);
    for (const name of Object.keys(headers)) {
        const lname = name.toLowerCase();
        if ((lname.slice(0, 6) === "x-amz-" && !options.unhoistableHeaders?.has(lname)) ||
            options.hoistableHeaders?.has(lname)) {
            query[name] = headers[name];
            delete headers[name];
        }
    }
    return {
        ...request,
        headers,
        query,
    };
};


/***/ }),

/***/ "../../node_modules/@smithy/signature-v4/dist-es/prepareRequest.js":
/*!*************************************************************************!*\
  !*** ../../node_modules/@smithy/signature-v4/dist-es/prepareRequest.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   prepareRequest: () => (/* binding */ prepareRequest)
/* harmony export */ });
/* harmony import */ var _smithy_protocol_http__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @smithy/protocol-http */ "../../node_modules/@smithy/protocol-http/dist-es/index.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./constants */ "../../node_modules/@smithy/signature-v4/dist-es/constants.js");


const prepareRequest = (request) => {
    request = _smithy_protocol_http__WEBPACK_IMPORTED_MODULE_0__.HttpRequest.clone(request);
    for (const headerName of Object.keys(request.headers)) {
        if (_constants__WEBPACK_IMPORTED_MODULE_1__.GENERATED_HEADERS.indexOf(headerName.toLowerCase()) > -1) {
            delete request.headers[headerName];
        }
    }
    return request;
};


/***/ }),

/***/ "../../node_modules/@smithy/signature-v4/dist-es/utilDate.js":
/*!*******************************************************************!*\
  !*** ../../node_modules/@smithy/signature-v4/dist-es/utilDate.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   iso8601: () => (/* binding */ iso8601),
/* harmony export */   toDate: () => (/* binding */ toDate)
/* harmony export */ });
const iso8601 = (time) => toDate(time)
    .toISOString()
    .replace(/\.\d{3}Z$/, "Z");
const toDate = (time) => {
    if (typeof time === "number") {
        return new Date(time * 1000);
    }
    if (typeof time === "string") {
        if (Number(time)) {
            return new Date(Number(time) * 1000);
        }
        return new Date(time);
    }
    return time;
};


/***/ }),

/***/ "../../node_modules/@smithy/smithy-client/dist-es/NoOpLogger.js":
/*!**********************************************************************!*\
  !*** ../../node_modules/@smithy/smithy-client/dist-es/NoOpLogger.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   NoOpLogger: () => (/* binding */ NoOpLogger)
/* harmony export */ });
class NoOpLogger {
    trace() { }
    debug() { }
    info() { }
    warn() { }
    error() { }
}


/***/ }),

/***/ "../../node_modules/@smithy/smithy-client/dist-es/client.js":
/*!******************************************************************!*\
  !*** ../../node_modules/@smithy/smithy-client/dist-es/client.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Client: () => (/* binding */ Client)
/* harmony export */ });
/* harmony import */ var _smithy_middleware_stack__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @smithy/middleware-stack */ "../../node_modules/@smithy/middleware-stack/dist-es/index.js");

class Client {
    constructor(config) {
        this.config = config;
        this.middlewareStack = (0,_smithy_middleware_stack__WEBPACK_IMPORTED_MODULE_0__.constructStack)();
    }
    send(command, optionsOrCb, cb) {
        const options = typeof optionsOrCb !== "function" ? optionsOrCb : undefined;
        const callback = typeof optionsOrCb === "function" ? optionsOrCb : cb;
        const useHandlerCache = options === undefined && this.config.cacheMiddleware === true;
        let handler;
        if (useHandlerCache) {
            if (!this.handlers) {
                this.handlers = new WeakMap();
            }
            const handlers = this.handlers;
            if (handlers.has(command.constructor)) {
                handler = handlers.get(command.constructor);
            }
            else {
                handler = command.resolveMiddleware(this.middlewareStack, this.config, options);
                handlers.set(command.constructor, handler);
            }
        }
        else {
            delete this.handlers;
            handler = command.resolveMiddleware(this.middlewareStack, this.config, options);
        }
        if (callback) {
            handler(command)
                .then((result) => callback(null, result.output), (err) => callback(err))
                .catch(() => { });
        }
        else {
            return handler(command).then((result) => result.output);
        }
    }
    destroy() {
        this.config?.requestHandler?.destroy?.();
        delete this.handlers;
    }
}


/***/ }),

/***/ "../../node_modules/@smithy/smithy-client/dist-es/collect-stream-body.js":
/*!*******************************************************************************!*\
  !*** ../../node_modules/@smithy/smithy-client/dist-es/collect-stream-body.js ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   collectBody: () => (/* binding */ collectBody)
/* harmony export */ });
/* harmony import */ var _smithy_util_stream__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @smithy/util-stream */ "../../node_modules/@smithy/util-stream/dist-es/index.js");

const collectBody = async (streamBody = new Uint8Array(), context) => {
    if (streamBody instanceof Uint8Array) {
        return _smithy_util_stream__WEBPACK_IMPORTED_MODULE_0__.Uint8ArrayBlobAdapter.mutate(streamBody);
    }
    if (!streamBody) {
        return _smithy_util_stream__WEBPACK_IMPORTED_MODULE_0__.Uint8ArrayBlobAdapter.mutate(new Uint8Array());
    }
    const fromContext = context.streamCollector(streamBody);
    return _smithy_util_stream__WEBPACK_IMPORTED_MODULE_0__.Uint8ArrayBlobAdapter.mutate(await fromContext);
};


/***/ }),

/***/ "../../node_modules/@smithy/smithy-client/dist-es/command.js":
/*!*******************************************************************!*\
  !*** ../../node_modules/@smithy/smithy-client/dist-es/command.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Command: () => (/* binding */ Command)
/* harmony export */ });
/* harmony import */ var _smithy_middleware_stack__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @smithy/middleware-stack */ "../../node_modules/@smithy/middleware-stack/dist-es/index.js");
/* harmony import */ var _smithy_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @smithy/types */ "../../node_modules/@smithy/types/dist-es/index.js");


class Command {
    constructor() {
        this.middlewareStack = (0,_smithy_middleware_stack__WEBPACK_IMPORTED_MODULE_0__.constructStack)();
    }
    static classBuilder() {
        return new ClassBuilder();
    }
    resolveMiddlewareWithContext(clientStack, configuration, options, { middlewareFn, clientName, commandName, inputFilterSensitiveLog, outputFilterSensitiveLog, smithyContext, additionalContext, CommandCtor, }) {
        for (const mw of middlewareFn.bind(this)(CommandCtor, clientStack, configuration, options)) {
            this.middlewareStack.use(mw);
        }
        const stack = clientStack.concat(this.middlewareStack);
        const { logger } = configuration;
        const handlerExecutionContext = {
            logger,
            clientName,
            commandName,
            inputFilterSensitiveLog,
            outputFilterSensitiveLog,
            [_smithy_types__WEBPACK_IMPORTED_MODULE_1__.SMITHY_CONTEXT_KEY]: {
                commandInstance: this,
                ...smithyContext,
            },
            ...additionalContext,
        };
        const { requestHandler } = configuration;
        return stack.resolve((request) => requestHandler.handle(request.request, options || {}), handlerExecutionContext);
    }
}
class ClassBuilder {
    constructor() {
        this._init = () => { };
        this._ep = {};
        this._middlewareFn = () => [];
        this._commandName = "";
        this._clientName = "";
        this._additionalContext = {};
        this._smithyContext = {};
        this._inputFilterSensitiveLog = (_) => _;
        this._outputFilterSensitiveLog = (_) => _;
        this._serializer = null;
        this._deserializer = null;
    }
    init(cb) {
        this._init = cb;
    }
    ep(endpointParameterInstructions) {
        this._ep = endpointParameterInstructions;
        return this;
    }
    m(middlewareSupplier) {
        this._middlewareFn = middlewareSupplier;
        return this;
    }
    s(service, operation, smithyContext = {}) {
        this._smithyContext = {
            service,
            operation,
            ...smithyContext,
        };
        return this;
    }
    c(additionalContext = {}) {
        this._additionalContext = additionalContext;
        return this;
    }
    n(clientName, commandName) {
        this._clientName = clientName;
        this._commandName = commandName;
        return this;
    }
    f(inputFilter = (_) => _, outputFilter = (_) => _) {
        this._inputFilterSensitiveLog = inputFilter;
        this._outputFilterSensitiveLog = outputFilter;
        return this;
    }
    ser(serializer) {
        this._serializer = serializer;
        return this;
    }
    de(deserializer) {
        this._deserializer = deserializer;
        return this;
    }
    build() {
        const closure = this;
        let CommandRef;
        return (CommandRef = class extends Command {
            static getEndpointParameterInstructions() {
                return closure._ep;
            }
            constructor(...[input]) {
                super();
                this.serialize = closure._serializer;
                this.deserialize = closure._deserializer;
                this.input = input ?? {};
                closure._init(this);
            }
            resolveMiddleware(stack, configuration, options) {
                return this.resolveMiddlewareWithContext(stack, configuration, options, {
                    CommandCtor: CommandRef,
                    middlewareFn: closure._middlewareFn,
                    clientName: closure._clientName,
                    commandName: closure._commandName,
                    inputFilterSensitiveLog: closure._inputFilterSensitiveLog,
                    outputFilterSensitiveLog: closure._outputFilterSensitiveLog,
                    smithyContext: closure._smithyContext,
                    additionalContext: closure._additionalContext,
                });
            }
        });
    }
}


/***/ }),

/***/ "../../node_modules/@smithy/smithy-client/dist-es/constants.js":
/*!*********************************************************************!*\
  !*** ../../node_modules/@smithy/smithy-client/dist-es/constants.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SENSITIVE_STRING: () => (/* binding */ SENSITIVE_STRING)
/* harmony export */ });
const SENSITIVE_STRING = "***SensitiveInformation***";


/***/ }),

/***/ "../../node_modules/@smithy/smithy-client/dist-es/create-aggregated-client.js":
/*!************************************************************************************!*\
  !*** ../../node_modules/@smithy/smithy-client/dist-es/create-aggregated-client.js ***!
  \************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createAggregatedClient: () => (/* binding */ createAggregatedClient)
/* harmony export */ });
const createAggregatedClient = (commands, Client) => {
    for (const command of Object.keys(commands)) {
        const CommandCtor = commands[command];
        const methodImpl = async function (args, optionsOrCb, cb) {
            const command = new CommandCtor(args);
            if (typeof optionsOrCb === "function") {
                this.send(command, optionsOrCb);
            }
            else if (typeof cb === "function") {
                if (typeof optionsOrCb !== "object")
                    throw new Error(`Expected http options but got ${typeof optionsOrCb}`);
                this.send(command, optionsOrCb || {}, cb);
            }
            else {
                return this.send(command, optionsOrCb);
            }
        };
        const methodName = (command[0].toLowerCase() + command.slice(1)).replace(/Command$/, "");
        Client.prototype[methodName] = methodImpl;
    }
};


/***/ }),

/***/ "../../node_modules/@smithy/smithy-client/dist-es/date-utils.js":
/*!**********************************************************************!*\
  !*** ../../node_modules/@smithy/smithy-client/dist-es/date-utils.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   dateToUtcString: () => (/* binding */ dateToUtcString),
/* harmony export */   parseEpochTimestamp: () => (/* binding */ parseEpochTimestamp),
/* harmony export */   parseRfc3339DateTime: () => (/* binding */ parseRfc3339DateTime),
/* harmony export */   parseRfc3339DateTimeWithOffset: () => (/* binding */ parseRfc3339DateTimeWithOffset),
/* harmony export */   parseRfc7231DateTime: () => (/* binding */ parseRfc7231DateTime)
/* harmony export */ });
/* harmony import */ var _parse_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./parse-utils */ "../../node_modules/@smithy/smithy-client/dist-es/parse-utils.js");

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
function dateToUtcString(date) {
    const year = date.getUTCFullYear();
    const month = date.getUTCMonth();
    const dayOfWeek = date.getUTCDay();
    const dayOfMonthInt = date.getUTCDate();
    const hoursInt = date.getUTCHours();
    const minutesInt = date.getUTCMinutes();
    const secondsInt = date.getUTCSeconds();
    const dayOfMonthString = dayOfMonthInt < 10 ? `0${dayOfMonthInt}` : `${dayOfMonthInt}`;
    const hoursString = hoursInt < 10 ? `0${hoursInt}` : `${hoursInt}`;
    const minutesString = minutesInt < 10 ? `0${minutesInt}` : `${minutesInt}`;
    const secondsString = secondsInt < 10 ? `0${secondsInt}` : `${secondsInt}`;
    return `${DAYS[dayOfWeek]}, ${dayOfMonthString} ${MONTHS[month]} ${year} ${hoursString}:${minutesString}:${secondsString} GMT`;
}
const RFC3339 = new RegExp(/^(\d{4})-(\d{2})-(\d{2})[tT](\d{2}):(\d{2}):(\d{2})(?:\.(\d+))?[zZ]$/);
const parseRfc3339DateTime = (value) => {
    if (value === null || value === undefined) {
        return undefined;
    }
    if (typeof value !== "string") {
        throw new TypeError("RFC-3339 date-times must be expressed as strings");
    }
    const match = RFC3339.exec(value);
    if (!match) {
        throw new TypeError("Invalid RFC-3339 date-time value");
    }
    const [_, yearStr, monthStr, dayStr, hours, minutes, seconds, fractionalMilliseconds] = match;
    const year = (0,_parse_utils__WEBPACK_IMPORTED_MODULE_0__.strictParseShort)(stripLeadingZeroes(yearStr));
    const month = parseDateValue(monthStr, "month", 1, 12);
    const day = parseDateValue(dayStr, "day", 1, 31);
    return buildDate(year, month, day, { hours, minutes, seconds, fractionalMilliseconds });
};
const RFC3339_WITH_OFFSET = new RegExp(/^(\d{4})-(\d{2})-(\d{2})[tT](\d{2}):(\d{2}):(\d{2})(?:\.(\d+))?(([-+]\d{2}\:\d{2})|[zZ])$/);
const parseRfc3339DateTimeWithOffset = (value) => {
    if (value === null || value === undefined) {
        return undefined;
    }
    if (typeof value !== "string") {
        throw new TypeError("RFC-3339 date-times must be expressed as strings");
    }
    const match = RFC3339_WITH_OFFSET.exec(value);
    if (!match) {
        throw new TypeError("Invalid RFC-3339 date-time value");
    }
    const [_, yearStr, monthStr, dayStr, hours, minutes, seconds, fractionalMilliseconds, offsetStr] = match;
    const year = (0,_parse_utils__WEBPACK_IMPORTED_MODULE_0__.strictParseShort)(stripLeadingZeroes(yearStr));
    const month = parseDateValue(monthStr, "month", 1, 12);
    const day = parseDateValue(dayStr, "day", 1, 31);
    const date = buildDate(year, month, day, { hours, minutes, seconds, fractionalMilliseconds });
    if (offsetStr.toUpperCase() != "Z") {
        date.setTime(date.getTime() - parseOffsetToMilliseconds(offsetStr));
    }
    return date;
};
const IMF_FIXDATE = new RegExp(/^(?:Mon|Tue|Wed|Thu|Fri|Sat|Sun), (\d{2}) (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) (\d{4}) (\d{1,2}):(\d{2}):(\d{2})(?:\.(\d+))? GMT$/);
const RFC_850_DATE = new RegExp(/^(?:Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday), (\d{2})-(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)-(\d{2}) (\d{1,2}):(\d{2}):(\d{2})(?:\.(\d+))? GMT$/);
const ASC_TIME = new RegExp(/^(?:Mon|Tue|Wed|Thu|Fri|Sat|Sun) (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) ( [1-9]|\d{2}) (\d{1,2}):(\d{2}):(\d{2})(?:\.(\d+))? (\d{4})$/);
const parseRfc7231DateTime = (value) => {
    if (value === null || value === undefined) {
        return undefined;
    }
    if (typeof value !== "string") {
        throw new TypeError("RFC-7231 date-times must be expressed as strings");
    }
    let match = IMF_FIXDATE.exec(value);
    if (match) {
        const [_, dayStr, monthStr, yearStr, hours, minutes, seconds, fractionalMilliseconds] = match;
        return buildDate((0,_parse_utils__WEBPACK_IMPORTED_MODULE_0__.strictParseShort)(stripLeadingZeroes(yearStr)), parseMonthByShortName(monthStr), parseDateValue(dayStr, "day", 1, 31), { hours, minutes, seconds, fractionalMilliseconds });
    }
    match = RFC_850_DATE.exec(value);
    if (match) {
        const [_, dayStr, monthStr, yearStr, hours, minutes, seconds, fractionalMilliseconds] = match;
        return adjustRfc850Year(buildDate(parseTwoDigitYear(yearStr), parseMonthByShortName(monthStr), parseDateValue(dayStr, "day", 1, 31), {
            hours,
            minutes,
            seconds,
            fractionalMilliseconds,
        }));
    }
    match = ASC_TIME.exec(value);
    if (match) {
        const [_, monthStr, dayStr, hours, minutes, seconds, fractionalMilliseconds, yearStr] = match;
        return buildDate((0,_parse_utils__WEBPACK_IMPORTED_MODULE_0__.strictParseShort)(stripLeadingZeroes(yearStr)), parseMonthByShortName(monthStr), parseDateValue(dayStr.trimLeft(), "day", 1, 31), { hours, minutes, seconds, fractionalMilliseconds });
    }
    throw new TypeError("Invalid RFC-7231 date-time value");
};
const parseEpochTimestamp = (value) => {
    if (value === null || value === undefined) {
        return undefined;
    }
    let valueAsDouble;
    if (typeof value === "number") {
        valueAsDouble = value;
    }
    else if (typeof value === "string") {
        valueAsDouble = (0,_parse_utils__WEBPACK_IMPORTED_MODULE_0__.strictParseDouble)(value);
    }
    else if (typeof value === "object" && value.tag === 1) {
        valueAsDouble = value.value;
    }
    else {
        throw new TypeError("Epoch timestamps must be expressed as floating point numbers or their string representation");
    }
    if (Number.isNaN(valueAsDouble) || valueAsDouble === Infinity || valueAsDouble === -Infinity) {
        throw new TypeError("Epoch timestamps must be valid, non-Infinite, non-NaN numerics");
    }
    return new Date(Math.round(valueAsDouble * 1000));
};
const buildDate = (year, month, day, time) => {
    const adjustedMonth = month - 1;
    validateDayOfMonth(year, adjustedMonth, day);
    return new Date(Date.UTC(year, adjustedMonth, day, parseDateValue(time.hours, "hour", 0, 23), parseDateValue(time.minutes, "minute", 0, 59), parseDateValue(time.seconds, "seconds", 0, 60), parseMilliseconds(time.fractionalMilliseconds)));
};
const parseTwoDigitYear = (value) => {
    const thisYear = new Date().getUTCFullYear();
    const valueInThisCentury = Math.floor(thisYear / 100) * 100 + (0,_parse_utils__WEBPACK_IMPORTED_MODULE_0__.strictParseShort)(stripLeadingZeroes(value));
    if (valueInThisCentury < thisYear) {
        return valueInThisCentury + 100;
    }
    return valueInThisCentury;
};
const FIFTY_YEARS_IN_MILLIS = 50 * 365 * 24 * 60 * 60 * 1000;
const adjustRfc850Year = (input) => {
    if (input.getTime() - new Date().getTime() > FIFTY_YEARS_IN_MILLIS) {
        return new Date(Date.UTC(input.getUTCFullYear() - 100, input.getUTCMonth(), input.getUTCDate(), input.getUTCHours(), input.getUTCMinutes(), input.getUTCSeconds(), input.getUTCMilliseconds()));
    }
    return input;
};
const parseMonthByShortName = (value) => {
    const monthIdx = MONTHS.indexOf(value);
    if (monthIdx < 0) {
        throw new TypeError(`Invalid month: ${value}`);
    }
    return monthIdx + 1;
};
const DAYS_IN_MONTH = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const validateDayOfMonth = (year, month, day) => {
    let maxDays = DAYS_IN_MONTH[month];
    if (month === 1 && isLeapYear(year)) {
        maxDays = 29;
    }
    if (day > maxDays) {
        throw new TypeError(`Invalid day for ${MONTHS[month]} in ${year}: ${day}`);
    }
};
const isLeapYear = (year) => {
    return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
};
const parseDateValue = (value, type, lower, upper) => {
    const dateVal = (0,_parse_utils__WEBPACK_IMPORTED_MODULE_0__.strictParseByte)(stripLeadingZeroes(value));
    if (dateVal < lower || dateVal > upper) {
        throw new TypeError(`${type} must be between ${lower} and ${upper}, inclusive`);
    }
    return dateVal;
};
const parseMilliseconds = (value) => {
    if (value === null || value === undefined) {
        return 0;
    }
    return (0,_parse_utils__WEBPACK_IMPORTED_MODULE_0__.strictParseFloat32)("0." + value) * 1000;
};
const parseOffsetToMilliseconds = (value) => {
    const directionStr = value[0];
    let direction = 1;
    if (directionStr == "+") {
        direction = 1;
    }
    else if (directionStr == "-") {
        direction = -1;
    }
    else {
        throw new TypeError(`Offset direction, ${directionStr}, must be "+" or "-"`);
    }
    const hour = Number(value.substring(1, 3));
    const minute = Number(value.substring(4, 6));
    return direction * (hour * 60 + minute) * 60 * 1000;
};
const stripLeadingZeroes = (value) => {
    let idx = 0;
    while (idx < value.length - 1 && value.charAt(idx) === "0") {
        idx++;
    }
    if (idx === 0) {
        return value;
    }
    return value.slice(idx);
};


/***/ }),

/***/ "../../node_modules/@smithy/smithy-client/dist-es/default-error-handler.js":
/*!*********************************************************************************!*\
  !*** ../../node_modules/@smithy/smithy-client/dist-es/default-error-handler.js ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   throwDefaultError: () => (/* binding */ throwDefaultError),
/* harmony export */   withBaseException: () => (/* binding */ withBaseException)
/* harmony export */ });
/* harmony import */ var _exceptions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./exceptions */ "../../node_modules/@smithy/smithy-client/dist-es/exceptions.js");

const throwDefaultError = ({ output, parsedBody, exceptionCtor, errorCode }) => {
    const $metadata = deserializeMetadata(output);
    const statusCode = $metadata.httpStatusCode ? $metadata.httpStatusCode + "" : undefined;
    const response = new exceptionCtor({
        name: parsedBody?.code || parsedBody?.Code || errorCode || statusCode || "UnknownError",
        $fault: "client",
        $metadata,
    });
    throw (0,_exceptions__WEBPACK_IMPORTED_MODULE_0__.decorateServiceException)(response, parsedBody);
};
const withBaseException = (ExceptionCtor) => {
    return ({ output, parsedBody, errorCode }) => {
        throwDefaultError({ output, parsedBody, exceptionCtor: ExceptionCtor, errorCode });
    };
};
const deserializeMetadata = (output) => ({
    httpStatusCode: output.statusCode,
    requestId: output.headers["x-amzn-requestid"] ?? output.headers["x-amzn-request-id"] ?? output.headers["x-amz-request-id"],
    extendedRequestId: output.headers["x-amz-id-2"],
    cfId: output.headers["x-amz-cf-id"],
});


/***/ }),

/***/ "../../node_modules/@smithy/smithy-client/dist-es/defaults-mode.js":
/*!*************************************************************************!*\
  !*** ../../node_modules/@smithy/smithy-client/dist-es/defaults-mode.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   loadConfigsForDefaultMode: () => (/* binding */ loadConfigsForDefaultMode)
/* harmony export */ });
const loadConfigsForDefaultMode = (mode) => {
    switch (mode) {
        case "standard":
            return {
                retryMode: "standard",
                connectionTimeout: 3100,
            };
        case "in-region":
            return {
                retryMode: "standard",
                connectionTimeout: 1100,
            };
        case "cross-region":
            return {
                retryMode: "standard",
                connectionTimeout: 3100,
            };
        case "mobile":
            return {
                retryMode: "standard",
                connectionTimeout: 30000,
            };
        default:
            return {};
    }
};


/***/ }),

/***/ "../../node_modules/@smithy/smithy-client/dist-es/emitWarningIfUnsupportedVersion.js":
/*!*******************************************************************************************!*\
  !*** ../../node_modules/@smithy/smithy-client/dist-es/emitWarningIfUnsupportedVersion.js ***!
  \*******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   emitWarningIfUnsupportedVersion: () => (/* binding */ emitWarningIfUnsupportedVersion)
/* harmony export */ });
let warningEmitted = false;
const emitWarningIfUnsupportedVersion = (version) => {
    if (version && !warningEmitted && parseInt(version.substring(1, version.indexOf("."))) < 16) {
        warningEmitted = true;
    }
};


/***/ }),

/***/ "../../node_modules/@smithy/smithy-client/dist-es/exceptions.js":
/*!**********************************************************************!*\
  !*** ../../node_modules/@smithy/smithy-client/dist-es/exceptions.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ServiceException: () => (/* binding */ ServiceException),
/* harmony export */   decorateServiceException: () => (/* binding */ decorateServiceException)
/* harmony export */ });
class ServiceException extends Error {
    constructor(options) {
        super(options.message);
        Object.setPrototypeOf(this, ServiceException.prototype);
        this.name = options.name;
        this.$fault = options.$fault;
        this.$metadata = options.$metadata;
    }
}
const decorateServiceException = (exception, additions = {}) => {
    Object.entries(additions)
        .filter(([, v]) => v !== undefined)
        .forEach(([k, v]) => {
        if (exception[k] == undefined || exception[k] === "") {
            exception[k] = v;
        }
    });
    const message = exception.message || exception.Message || "UnknownError";
    exception.message = message;
    delete exception.Message;
    return exception;
};


/***/ }),

/***/ "../../node_modules/@smithy/smithy-client/dist-es/extended-encode-uri-component.js":
/*!*****************************************************************************************!*\
  !*** ../../node_modules/@smithy/smithy-client/dist-es/extended-encode-uri-component.js ***!
  \*****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   extendedEncodeURIComponent: () => (/* binding */ extendedEncodeURIComponent)
/* harmony export */ });
function extendedEncodeURIComponent(str) {
    return encodeURIComponent(str).replace(/[!'()*]/g, function (c) {
        return "%" + c.charCodeAt(0).toString(16).toUpperCase();
    });
}


/***/ }),

/***/ "../../node_modules/@smithy/smithy-client/dist-es/extensions/checksum.js":
/*!*******************************************************************************!*\
  !*** ../../node_modules/@smithy/smithy-client/dist-es/extensions/checksum.js ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AlgorithmId: () => (/* reexport safe */ _smithy_types__WEBPACK_IMPORTED_MODULE_0__.AlgorithmId),
/* harmony export */   getChecksumConfiguration: () => (/* binding */ getChecksumConfiguration),
/* harmony export */   resolveChecksumRuntimeConfig: () => (/* binding */ resolveChecksumRuntimeConfig)
/* harmony export */ });
/* harmony import */ var _smithy_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @smithy/types */ "../../node_modules/@smithy/types/dist-es/index.js");


const getChecksumConfiguration = (runtimeConfig) => {
    const checksumAlgorithms = [];
    for (const id in _smithy_types__WEBPACK_IMPORTED_MODULE_0__.AlgorithmId) {
        const algorithmId = _smithy_types__WEBPACK_IMPORTED_MODULE_0__.AlgorithmId[id];
        if (runtimeConfig[algorithmId] === undefined) {
            continue;
        }
        checksumAlgorithms.push({
            algorithmId: () => algorithmId,
            checksumConstructor: () => runtimeConfig[algorithmId],
        });
    }
    return {
        _checksumAlgorithms: checksumAlgorithms,
        addChecksumAlgorithm(algo) {
            this._checksumAlgorithms.push(algo);
        },
        checksumAlgorithms() {
            return this._checksumAlgorithms;
        },
    };
};
const resolveChecksumRuntimeConfig = (clientConfig) => {
    const runtimeConfig = {};
    clientConfig.checksumAlgorithms().forEach((checksumAlgorithm) => {
        runtimeConfig[checksumAlgorithm.algorithmId()] = checksumAlgorithm.checksumConstructor();
    });
    return runtimeConfig;
};


/***/ }),

/***/ "../../node_modules/@smithy/smithy-client/dist-es/extensions/defaultExtensionConfiguration.js":
/*!****************************************************************************************************!*\
  !*** ../../node_modules/@smithy/smithy-client/dist-es/extensions/defaultExtensionConfiguration.js ***!
  \****************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getDefaultClientConfiguration: () => (/* binding */ getDefaultClientConfiguration),
/* harmony export */   getDefaultExtensionConfiguration: () => (/* binding */ getDefaultExtensionConfiguration),
/* harmony export */   resolveDefaultRuntimeConfig: () => (/* binding */ resolveDefaultRuntimeConfig)
/* harmony export */ });
/* harmony import */ var _checksum__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./checksum */ "../../node_modules/@smithy/smithy-client/dist-es/extensions/checksum.js");
/* harmony import */ var _retry__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./retry */ "../../node_modules/@smithy/smithy-client/dist-es/extensions/retry.js");


const getDefaultExtensionConfiguration = (runtimeConfig) => {
    return {
        ...(0,_checksum__WEBPACK_IMPORTED_MODULE_0__.getChecksumConfiguration)(runtimeConfig),
        ...(0,_retry__WEBPACK_IMPORTED_MODULE_1__.getRetryConfiguration)(runtimeConfig),
    };
};
const getDefaultClientConfiguration = getDefaultExtensionConfiguration;
const resolveDefaultRuntimeConfig = (config) => {
    return {
        ...(0,_checksum__WEBPACK_IMPORTED_MODULE_0__.resolveChecksumRuntimeConfig)(config),
        ...(0,_retry__WEBPACK_IMPORTED_MODULE_1__.resolveRetryRuntimeConfig)(config),
    };
};


/***/ }),

/***/ "../../node_modules/@smithy/smithy-client/dist-es/extensions/index.js":
/*!****************************************************************************!*\
  !*** ../../node_modules/@smithy/smithy-client/dist-es/extensions/index.js ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getDefaultClientConfiguration: () => (/* reexport safe */ _defaultExtensionConfiguration__WEBPACK_IMPORTED_MODULE_0__.getDefaultClientConfiguration),
/* harmony export */   getDefaultExtensionConfiguration: () => (/* reexport safe */ _defaultExtensionConfiguration__WEBPACK_IMPORTED_MODULE_0__.getDefaultExtensionConfiguration),
/* harmony export */   resolveDefaultRuntimeConfig: () => (/* reexport safe */ _defaultExtensionConfiguration__WEBPACK_IMPORTED_MODULE_0__.resolveDefaultRuntimeConfig)
/* harmony export */ });
/* harmony import */ var _defaultExtensionConfiguration__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./defaultExtensionConfiguration */ "../../node_modules/@smithy/smithy-client/dist-es/extensions/defaultExtensionConfiguration.js");



/***/ }),

/***/ "../../node_modules/@smithy/smithy-client/dist-es/extensions/retry.js":
/*!****************************************************************************!*\
  !*** ../../node_modules/@smithy/smithy-client/dist-es/extensions/retry.js ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getRetryConfiguration: () => (/* binding */ getRetryConfiguration),
/* harmony export */   resolveRetryRuntimeConfig: () => (/* binding */ resolveRetryRuntimeConfig)
/* harmony export */ });
const getRetryConfiguration = (runtimeConfig) => {
    let _retryStrategy = runtimeConfig.retryStrategy;
    return {
        setRetryStrategy(retryStrategy) {
            _retryStrategy = retryStrategy;
        },
        retryStrategy() {
            return _retryStrategy;
        },
    };
};
const resolveRetryRuntimeConfig = (retryStrategyConfiguration) => {
    const runtimeConfig = {};
    runtimeConfig.retryStrategy = retryStrategyConfiguration.retryStrategy();
    return runtimeConfig;
};


/***/ }),

/***/ "../../node_modules/@smithy/smithy-client/dist-es/get-array-if-single-item.js":
/*!************************************************************************************!*\
  !*** ../../node_modules/@smithy/smithy-client/dist-es/get-array-if-single-item.js ***!
  \************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getArrayIfSingleItem: () => (/* binding */ getArrayIfSingleItem)
/* harmony export */ });
const getArrayIfSingleItem = (mayBeArray) => Array.isArray(mayBeArray) ? mayBeArray : [mayBeArray];


/***/ }),

/***/ "../../node_modules/@smithy/smithy-client/dist-es/get-value-from-text-node.js":
/*!************************************************************************************!*\
  !*** ../../node_modules/@smithy/smithy-client/dist-es/get-value-from-text-node.js ***!
  \************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getValueFromTextNode: () => (/* binding */ getValueFromTextNode)
/* harmony export */ });
const getValueFromTextNode = (obj) => {
    const textNodeName = "#text";
    for (const key in obj) {
        if (obj.hasOwnProperty(key) && obj[key][textNodeName] !== undefined) {
            obj[key] = obj[key][textNodeName];
        }
        else if (typeof obj[key] === "object" && obj[key] !== null) {
            obj[key] = getValueFromTextNode(obj[key]);
        }
    }
    return obj;
};


/***/ }),

/***/ "../../node_modules/@smithy/smithy-client/dist-es/index.js":
/*!*****************************************************************!*\
  !*** ../../node_modules/@smithy/smithy-client/dist-es/index.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Client: () => (/* reexport safe */ _client__WEBPACK_IMPORTED_MODULE_0__.Client),
/* harmony export */   Command: () => (/* reexport safe */ _command__WEBPACK_IMPORTED_MODULE_2__.Command),
/* harmony export */   LazyJsonString: () => (/* reexport safe */ _lazy_json__WEBPACK_IMPORTED_MODULE_15__.LazyJsonString),
/* harmony export */   NoOpLogger: () => (/* reexport safe */ _NoOpLogger__WEBPACK_IMPORTED_MODULE_16__.NoOpLogger),
/* harmony export */   SENSITIVE_STRING: () => (/* reexport safe */ _constants__WEBPACK_IMPORTED_MODULE_3__.SENSITIVE_STRING),
/* harmony export */   ServiceException: () => (/* reexport safe */ _exceptions__WEBPACK_IMPORTED_MODULE_9__.ServiceException),
/* harmony export */   StringWrapper: () => (/* reexport safe */ _lazy_json__WEBPACK_IMPORTED_MODULE_15__.StringWrapper),
/* harmony export */   _json: () => (/* reexport safe */ _serde_json__WEBPACK_IMPORTED_MODULE_22__._json),
/* harmony export */   collectBody: () => (/* reexport safe */ _collect_stream_body__WEBPACK_IMPORTED_MODULE_1__.collectBody),
/* harmony export */   convertMap: () => (/* reexport safe */ _object_mapping__WEBPACK_IMPORTED_MODULE_17__.convertMap),
/* harmony export */   createAggregatedClient: () => (/* reexport safe */ _create_aggregated_client__WEBPACK_IMPORTED_MODULE_4__.createAggregatedClient),
/* harmony export */   dateToUtcString: () => (/* reexport safe */ _date_utils__WEBPACK_IMPORTED_MODULE_5__.dateToUtcString),
/* harmony export */   decorateServiceException: () => (/* reexport safe */ _exceptions__WEBPACK_IMPORTED_MODULE_9__.decorateServiceException),
/* harmony export */   emitWarningIfUnsupportedVersion: () => (/* reexport safe */ _emitWarningIfUnsupportedVersion__WEBPACK_IMPORTED_MODULE_8__.emitWarningIfUnsupportedVersion),
/* harmony export */   expectBoolean: () => (/* reexport safe */ _parse_utils__WEBPACK_IMPORTED_MODULE_18__.expectBoolean),
/* harmony export */   expectByte: () => (/* reexport safe */ _parse_utils__WEBPACK_IMPORTED_MODULE_18__.expectByte),
/* harmony export */   expectFloat32: () => (/* reexport safe */ _parse_utils__WEBPACK_IMPORTED_MODULE_18__.expectFloat32),
/* harmony export */   expectInt: () => (/* reexport safe */ _parse_utils__WEBPACK_IMPORTED_MODULE_18__.expectInt),
/* harmony export */   expectInt32: () => (/* reexport safe */ _parse_utils__WEBPACK_IMPORTED_MODULE_18__.expectInt32),
/* harmony export */   expectLong: () => (/* reexport safe */ _parse_utils__WEBPACK_IMPORTED_MODULE_18__.expectLong),
/* harmony export */   expectNonNull: () => (/* reexport safe */ _parse_utils__WEBPACK_IMPORTED_MODULE_18__.expectNonNull),
/* harmony export */   expectNumber: () => (/* reexport safe */ _parse_utils__WEBPACK_IMPORTED_MODULE_18__.expectNumber),
/* harmony export */   expectObject: () => (/* reexport safe */ _parse_utils__WEBPACK_IMPORTED_MODULE_18__.expectObject),
/* harmony export */   expectShort: () => (/* reexport safe */ _parse_utils__WEBPACK_IMPORTED_MODULE_18__.expectShort),
/* harmony export */   expectString: () => (/* reexport safe */ _parse_utils__WEBPACK_IMPORTED_MODULE_18__.expectString),
/* harmony export */   expectUnion: () => (/* reexport safe */ _parse_utils__WEBPACK_IMPORTED_MODULE_18__.expectUnion),
/* harmony export */   extendedEncodeURIComponent: () => (/* reexport safe */ _extended_encode_uri_component__WEBPACK_IMPORTED_MODULE_10__.extendedEncodeURIComponent),
/* harmony export */   getArrayIfSingleItem: () => (/* reexport safe */ _get_array_if_single_item__WEBPACK_IMPORTED_MODULE_12__.getArrayIfSingleItem),
/* harmony export */   getDefaultClientConfiguration: () => (/* reexport safe */ _extensions__WEBPACK_IMPORTED_MODULE_11__.getDefaultClientConfiguration),
/* harmony export */   getDefaultExtensionConfiguration: () => (/* reexport safe */ _extensions__WEBPACK_IMPORTED_MODULE_11__.getDefaultExtensionConfiguration),
/* harmony export */   getValueFromTextNode: () => (/* reexport safe */ _get_value_from_text_node__WEBPACK_IMPORTED_MODULE_13__.getValueFromTextNode),
/* harmony export */   handleFloat: () => (/* reexport safe */ _parse_utils__WEBPACK_IMPORTED_MODULE_18__.handleFloat),
/* harmony export */   isSerializableHeaderValue: () => (/* reexport safe */ _is_serializable_header_value__WEBPACK_IMPORTED_MODULE_14__.isSerializableHeaderValue),
/* harmony export */   limitedParseDouble: () => (/* reexport safe */ _parse_utils__WEBPACK_IMPORTED_MODULE_18__.limitedParseDouble),
/* harmony export */   limitedParseFloat: () => (/* reexport safe */ _parse_utils__WEBPACK_IMPORTED_MODULE_18__.limitedParseFloat),
/* harmony export */   limitedParseFloat32: () => (/* reexport safe */ _parse_utils__WEBPACK_IMPORTED_MODULE_18__.limitedParseFloat32),
/* harmony export */   loadConfigsForDefaultMode: () => (/* reexport safe */ _defaults_mode__WEBPACK_IMPORTED_MODULE_7__.loadConfigsForDefaultMode),
/* harmony export */   logger: () => (/* reexport safe */ _parse_utils__WEBPACK_IMPORTED_MODULE_18__.logger),
/* harmony export */   map: () => (/* reexport safe */ _object_mapping__WEBPACK_IMPORTED_MODULE_17__.map),
/* harmony export */   parseBoolean: () => (/* reexport safe */ _parse_utils__WEBPACK_IMPORTED_MODULE_18__.parseBoolean),
/* harmony export */   parseEpochTimestamp: () => (/* reexport safe */ _date_utils__WEBPACK_IMPORTED_MODULE_5__.parseEpochTimestamp),
/* harmony export */   parseRfc3339DateTime: () => (/* reexport safe */ _date_utils__WEBPACK_IMPORTED_MODULE_5__.parseRfc3339DateTime),
/* harmony export */   parseRfc3339DateTimeWithOffset: () => (/* reexport safe */ _date_utils__WEBPACK_IMPORTED_MODULE_5__.parseRfc3339DateTimeWithOffset),
/* harmony export */   parseRfc7231DateTime: () => (/* reexport safe */ _date_utils__WEBPACK_IMPORTED_MODULE_5__.parseRfc7231DateTime),
/* harmony export */   quoteHeader: () => (/* reexport safe */ _quote_header__WEBPACK_IMPORTED_MODULE_19__.quoteHeader),
/* harmony export */   resolveDefaultRuntimeConfig: () => (/* reexport safe */ _extensions__WEBPACK_IMPORTED_MODULE_11__.resolveDefaultRuntimeConfig),
/* harmony export */   resolvedPath: () => (/* reexport safe */ _resolve_path__WEBPACK_IMPORTED_MODULE_20__.resolvedPath),
/* harmony export */   serializeDateTime: () => (/* reexport safe */ _ser_utils__WEBPACK_IMPORTED_MODULE_21__.serializeDateTime),
/* harmony export */   serializeFloat: () => (/* reexport safe */ _ser_utils__WEBPACK_IMPORTED_MODULE_21__.serializeFloat),
/* harmony export */   splitEvery: () => (/* reexport safe */ _split_every__WEBPACK_IMPORTED_MODULE_23__.splitEvery),
/* harmony export */   splitHeader: () => (/* reexport safe */ _split_header__WEBPACK_IMPORTED_MODULE_24__.splitHeader),
/* harmony export */   strictParseByte: () => (/* reexport safe */ _parse_utils__WEBPACK_IMPORTED_MODULE_18__.strictParseByte),
/* harmony export */   strictParseDouble: () => (/* reexport safe */ _parse_utils__WEBPACK_IMPORTED_MODULE_18__.strictParseDouble),
/* harmony export */   strictParseFloat: () => (/* reexport safe */ _parse_utils__WEBPACK_IMPORTED_MODULE_18__.strictParseFloat),
/* harmony export */   strictParseFloat32: () => (/* reexport safe */ _parse_utils__WEBPACK_IMPORTED_MODULE_18__.strictParseFloat32),
/* harmony export */   strictParseInt: () => (/* reexport safe */ _parse_utils__WEBPACK_IMPORTED_MODULE_18__.strictParseInt),
/* harmony export */   strictParseInt32: () => (/* reexport safe */ _parse_utils__WEBPACK_IMPORTED_MODULE_18__.strictParseInt32),
/* harmony export */   strictParseLong: () => (/* reexport safe */ _parse_utils__WEBPACK_IMPORTED_MODULE_18__.strictParseLong),
/* harmony export */   strictParseShort: () => (/* reexport safe */ _parse_utils__WEBPACK_IMPORTED_MODULE_18__.strictParseShort),
/* harmony export */   take: () => (/* reexport safe */ _object_mapping__WEBPACK_IMPORTED_MODULE_17__.take),
/* harmony export */   throwDefaultError: () => (/* reexport safe */ _default_error_handler__WEBPACK_IMPORTED_MODULE_6__.throwDefaultError),
/* harmony export */   withBaseException: () => (/* reexport safe */ _default_error_handler__WEBPACK_IMPORTED_MODULE_6__.withBaseException)
/* harmony export */ });
/* harmony import */ var _client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./client */ "../../node_modules/@smithy/smithy-client/dist-es/client.js");
/* harmony import */ var _collect_stream_body__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./collect-stream-body */ "../../node_modules/@smithy/smithy-client/dist-es/collect-stream-body.js");
/* harmony import */ var _command__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./command */ "../../node_modules/@smithy/smithy-client/dist-es/command.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./constants */ "../../node_modules/@smithy/smithy-client/dist-es/constants.js");
/* harmony import */ var _create_aggregated_client__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./create-aggregated-client */ "../../node_modules/@smithy/smithy-client/dist-es/create-aggregated-client.js");
/* harmony import */ var _date_utils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./date-utils */ "../../node_modules/@smithy/smithy-client/dist-es/date-utils.js");
/* harmony import */ var _default_error_handler__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./default-error-handler */ "../../node_modules/@smithy/smithy-client/dist-es/default-error-handler.js");
/* harmony import */ var _defaults_mode__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./defaults-mode */ "../../node_modules/@smithy/smithy-client/dist-es/defaults-mode.js");
/* harmony import */ var _emitWarningIfUnsupportedVersion__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./emitWarningIfUnsupportedVersion */ "../../node_modules/@smithy/smithy-client/dist-es/emitWarningIfUnsupportedVersion.js");
/* harmony import */ var _exceptions__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./exceptions */ "../../node_modules/@smithy/smithy-client/dist-es/exceptions.js");
/* harmony import */ var _extended_encode_uri_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./extended-encode-uri-component */ "../../node_modules/@smithy/smithy-client/dist-es/extended-encode-uri-component.js");
/* harmony import */ var _extensions__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./extensions */ "../../node_modules/@smithy/smithy-client/dist-es/extensions/index.js");
/* harmony import */ var _get_array_if_single_item__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./get-array-if-single-item */ "../../node_modules/@smithy/smithy-client/dist-es/get-array-if-single-item.js");
/* harmony import */ var _get_value_from_text_node__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./get-value-from-text-node */ "../../node_modules/@smithy/smithy-client/dist-es/get-value-from-text-node.js");
/* harmony import */ var _is_serializable_header_value__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./is-serializable-header-value */ "../../node_modules/@smithy/smithy-client/dist-es/is-serializable-header-value.js");
/* harmony import */ var _lazy_json__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./lazy-json */ "../../node_modules/@smithy/smithy-client/dist-es/lazy-json.js");
/* harmony import */ var _NoOpLogger__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./NoOpLogger */ "../../node_modules/@smithy/smithy-client/dist-es/NoOpLogger.js");
/* harmony import */ var _object_mapping__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./object-mapping */ "../../node_modules/@smithy/smithy-client/dist-es/object-mapping.js");
/* harmony import */ var _parse_utils__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./parse-utils */ "../../node_modules/@smithy/smithy-client/dist-es/parse-utils.js");
/* harmony import */ var _quote_header__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./quote-header */ "../../node_modules/@smithy/smithy-client/dist-es/quote-header.js");
/* harmony import */ var _resolve_path__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./resolve-path */ "../../node_modules/@smithy/smithy-client/dist-es/resolve-path.js");
/* harmony import */ var _ser_utils__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./ser-utils */ "../../node_modules/@smithy/smithy-client/dist-es/ser-utils.js");
/* harmony import */ var _serde_json__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./serde-json */ "../../node_modules/@smithy/smithy-client/dist-es/serde-json.js");
/* harmony import */ var _split_every__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./split-every */ "../../node_modules/@smithy/smithy-client/dist-es/split-every.js");
/* harmony import */ var _split_header__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ./split-header */ "../../node_modules/@smithy/smithy-client/dist-es/split-header.js");



























/***/ }),

/***/ "../../node_modules/@smithy/smithy-client/dist-es/is-serializable-header-value.js":
/*!****************************************************************************************!*\
  !*** ../../node_modules/@smithy/smithy-client/dist-es/is-serializable-header-value.js ***!
  \****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   isSerializableHeaderValue: () => (/* binding */ isSerializableHeaderValue)
/* harmony export */ });
const isSerializableHeaderValue = (value) => {
    return value != null;
};


/***/ }),

/***/ "../../node_modules/@smithy/smithy-client/dist-es/lazy-json.js":
/*!*********************************************************************!*\
  !*** ../../node_modules/@smithy/smithy-client/dist-es/lazy-json.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   LazyJsonString: () => (/* binding */ LazyJsonString),
/* harmony export */   StringWrapper: () => (/* binding */ StringWrapper)
/* harmony export */ });
const StringWrapper = function () {
    const Class = Object.getPrototypeOf(this).constructor;
    const Constructor = Function.bind.apply(String, [null, ...arguments]);
    const instance = new Constructor();
    Object.setPrototypeOf(instance, Class.prototype);
    return instance;
};
StringWrapper.prototype = Object.create(String.prototype, {
    constructor: {
        value: StringWrapper,
        enumerable: false,
        writable: true,
        configurable: true,
    },
});
Object.setPrototypeOf(StringWrapper, String);
class LazyJsonString extends StringWrapper {
    deserializeJSON() {
        return JSON.parse(super.toString());
    }
    toJSON() {
        return super.toString();
    }
    static fromObject(object) {
        if (object instanceof LazyJsonString) {
            return object;
        }
        else if (object instanceof String || typeof object === "string") {
            return new LazyJsonString(object);
        }
        return new LazyJsonString(JSON.stringify(object));
    }
}


/***/ }),

/***/ "../../node_modules/@smithy/smithy-client/dist-es/object-mapping.js":
/*!**************************************************************************!*\
  !*** ../../node_modules/@smithy/smithy-client/dist-es/object-mapping.js ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   convertMap: () => (/* binding */ convertMap),
/* harmony export */   map: () => (/* binding */ map),
/* harmony export */   take: () => (/* binding */ take)
/* harmony export */ });
function map(arg0, arg1, arg2) {
    let target;
    let filter;
    let instructions;
    if (typeof arg1 === "undefined" && typeof arg2 === "undefined") {
        target = {};
        instructions = arg0;
    }
    else {
        target = arg0;
        if (typeof arg1 === "function") {
            filter = arg1;
            instructions = arg2;
            return mapWithFilter(target, filter, instructions);
        }
        else {
            instructions = arg1;
        }
    }
    for (const key of Object.keys(instructions)) {
        if (!Array.isArray(instructions[key])) {
            target[key] = instructions[key];
            continue;
        }
        applyInstruction(target, null, instructions, key);
    }
    return target;
}
const convertMap = (target) => {
    const output = {};
    for (const [k, v] of Object.entries(target || {})) {
        output[k] = [, v];
    }
    return output;
};
const take = (source, instructions) => {
    const out = {};
    for (const key in instructions) {
        applyInstruction(out, source, instructions, key);
    }
    return out;
};
const mapWithFilter = (target, filter, instructions) => {
    return map(target, Object.entries(instructions).reduce((_instructions, [key, value]) => {
        if (Array.isArray(value)) {
            _instructions[key] = value;
        }
        else {
            if (typeof value === "function") {
                _instructions[key] = [filter, value()];
            }
            else {
                _instructions[key] = [filter, value];
            }
        }
        return _instructions;
    }, {}));
};
const applyInstruction = (target, source, instructions, targetKey) => {
    if (source !== null) {
        let instruction = instructions[targetKey];
        if (typeof instruction === "function") {
            instruction = [, instruction];
        }
        const [filter = nonNullish, valueFn = pass, sourceKey = targetKey] = instruction;
        if ((typeof filter === "function" && filter(source[sourceKey])) || (typeof filter !== "function" && !!filter)) {
            target[targetKey] = valueFn(source[sourceKey]);
        }
        return;
    }
    let [filter, value] = instructions[targetKey];
    if (typeof value === "function") {
        let _value;
        const defaultFilterPassed = filter === undefined && (_value = value()) != null;
        const customFilterPassed = (typeof filter === "function" && !!filter(void 0)) || (typeof filter !== "function" && !!filter);
        if (defaultFilterPassed) {
            target[targetKey] = _value;
        }
        else if (customFilterPassed) {
            target[targetKey] = value();
        }
    }
    else {
        const defaultFilterPassed = filter === undefined && value != null;
        const customFilterPassed = (typeof filter === "function" && !!filter(value)) || (typeof filter !== "function" && !!filter);
        if (defaultFilterPassed || customFilterPassed) {
            target[targetKey] = value;
        }
    }
};
const nonNullish = (_) => _ != null;
const pass = (_) => _;


/***/ }),

/***/ "../../node_modules/@smithy/smithy-client/dist-es/parse-utils.js":
/*!***********************************************************************!*\
  !*** ../../node_modules/@smithy/smithy-client/dist-es/parse-utils.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   expectBoolean: () => (/* binding */ expectBoolean),
/* harmony export */   expectByte: () => (/* binding */ expectByte),
/* harmony export */   expectFloat32: () => (/* binding */ expectFloat32),
/* harmony export */   expectInt: () => (/* binding */ expectInt),
/* harmony export */   expectInt32: () => (/* binding */ expectInt32),
/* harmony export */   expectLong: () => (/* binding */ expectLong),
/* harmony export */   expectNonNull: () => (/* binding */ expectNonNull),
/* harmony export */   expectNumber: () => (/* binding */ expectNumber),
/* harmony export */   expectObject: () => (/* binding */ expectObject),
/* harmony export */   expectShort: () => (/* binding */ expectShort),
/* harmony export */   expectString: () => (/* binding */ expectString),
/* harmony export */   expectUnion: () => (/* binding */ expectUnion),
/* harmony export */   handleFloat: () => (/* binding */ handleFloat),
/* harmony export */   limitedParseDouble: () => (/* binding */ limitedParseDouble),
/* harmony export */   limitedParseFloat: () => (/* binding */ limitedParseFloat),
/* harmony export */   limitedParseFloat32: () => (/* binding */ limitedParseFloat32),
/* harmony export */   logger: () => (/* binding */ logger),
/* harmony export */   parseBoolean: () => (/* binding */ parseBoolean),
/* harmony export */   strictParseByte: () => (/* binding */ strictParseByte),
/* harmony export */   strictParseDouble: () => (/* binding */ strictParseDouble),
/* harmony export */   strictParseFloat: () => (/* binding */ strictParseFloat),
/* harmony export */   strictParseFloat32: () => (/* binding */ strictParseFloat32),
/* harmony export */   strictParseInt: () => (/* binding */ strictParseInt),
/* harmony export */   strictParseInt32: () => (/* binding */ strictParseInt32),
/* harmony export */   strictParseLong: () => (/* binding */ strictParseLong),
/* harmony export */   strictParseShort: () => (/* binding */ strictParseShort)
/* harmony export */ });
const parseBoolean = (value) => {
    switch (value) {
        case "true":
            return true;
        case "false":
            return false;
        default:
            throw new Error(`Unable to parse boolean value "${value}"`);
    }
};
const expectBoolean = (value) => {
    if (value === null || value === undefined) {
        return undefined;
    }
    if (typeof value === "number") {
        if (value === 0 || value === 1) {
            logger.warn(stackTraceWarning(`Expected boolean, got ${typeof value}: ${value}`));
        }
        if (value === 0) {
            return false;
        }
        if (value === 1) {
            return true;
        }
    }
    if (typeof value === "string") {
        const lower = value.toLowerCase();
        if (lower === "false" || lower === "true") {
            logger.warn(stackTraceWarning(`Expected boolean, got ${typeof value}: ${value}`));
        }
        if (lower === "false") {
            return false;
        }
        if (lower === "true") {
            return true;
        }
    }
    if (typeof value === "boolean") {
        return value;
    }
    throw new TypeError(`Expected boolean, got ${typeof value}: ${value}`);
};
const expectNumber = (value) => {
    if (value === null || value === undefined) {
        return undefined;
    }
    if (typeof value === "string") {
        const parsed = parseFloat(value);
        if (!Number.isNaN(parsed)) {
            if (String(parsed) !== String(value)) {
                logger.warn(stackTraceWarning(`Expected number but observed string: ${value}`));
            }
            return parsed;
        }
    }
    if (typeof value === "number") {
        return value;
    }
    throw new TypeError(`Expected number, got ${typeof value}: ${value}`);
};
const MAX_FLOAT = Math.ceil(2 ** 127 * (2 - 2 ** -23));
const expectFloat32 = (value) => {
    const expected = expectNumber(value);
    if (expected !== undefined && !Number.isNaN(expected) && expected !== Infinity && expected !== -Infinity) {
        if (Math.abs(expected) > MAX_FLOAT) {
            throw new TypeError(`Expected 32-bit float, got ${value}`);
        }
    }
    return expected;
};
const expectLong = (value) => {
    if (value === null || value === undefined) {
        return undefined;
    }
    if (Number.isInteger(value) && !Number.isNaN(value)) {
        return value;
    }
    throw new TypeError(`Expected integer, got ${typeof value}: ${value}`);
};
const expectInt = expectLong;
const expectInt32 = (value) => expectSizedInt(value, 32);
const expectShort = (value) => expectSizedInt(value, 16);
const expectByte = (value) => expectSizedInt(value, 8);
const expectSizedInt = (value, size) => {
    const expected = expectLong(value);
    if (expected !== undefined && castInt(expected, size) !== expected) {
        throw new TypeError(`Expected ${size}-bit integer, got ${value}`);
    }
    return expected;
};
const castInt = (value, size) => {
    switch (size) {
        case 32:
            return Int32Array.of(value)[0];
        case 16:
            return Int16Array.of(value)[0];
        case 8:
            return Int8Array.of(value)[0];
    }
};
const expectNonNull = (value, location) => {
    if (value === null || value === undefined) {
        if (location) {
            throw new TypeError(`Expected a non-null value for ${location}`);
        }
        throw new TypeError("Expected a non-null value");
    }
    return value;
};
const expectObject = (value) => {
    if (value === null || value === undefined) {
        return undefined;
    }
    if (typeof value === "object" && !Array.isArray(value)) {
        return value;
    }
    const receivedType = Array.isArray(value) ? "array" : typeof value;
    throw new TypeError(`Expected object, got ${receivedType}: ${value}`);
};
const expectString = (value) => {
    if (value === null || value === undefined) {
        return undefined;
    }
    if (typeof value === "string") {
        return value;
    }
    if (["boolean", "number", "bigint"].includes(typeof value)) {
        logger.warn(stackTraceWarning(`Expected string, got ${typeof value}: ${value}`));
        return String(value);
    }
    throw new TypeError(`Expected string, got ${typeof value}: ${value}`);
};
const expectUnion = (value) => {
    if (value === null || value === undefined) {
        return undefined;
    }
    const asObject = expectObject(value);
    const setKeys = Object.entries(asObject)
        .filter(([, v]) => v != null)
        .map(([k]) => k);
    if (setKeys.length === 0) {
        throw new TypeError(`Unions must have exactly one non-null member. None were found.`);
    }
    if (setKeys.length > 1) {
        throw new TypeError(`Unions must have exactly one non-null member. Keys ${setKeys} were not null.`);
    }
    return asObject;
};
const strictParseDouble = (value) => {
    if (typeof value == "string") {
        return expectNumber(parseNumber(value));
    }
    return expectNumber(value);
};
const strictParseFloat = strictParseDouble;
const strictParseFloat32 = (value) => {
    if (typeof value == "string") {
        return expectFloat32(parseNumber(value));
    }
    return expectFloat32(value);
};
const NUMBER_REGEX = /(-?(?:0|[1-9]\d*)(?:\.\d+)?(?:[eE][+-]?\d+)?)|(-?Infinity)|(NaN)/g;
const parseNumber = (value) => {
    const matches = value.match(NUMBER_REGEX);
    if (matches === null || matches[0].length !== value.length) {
        throw new TypeError(`Expected real number, got implicit NaN`);
    }
    return parseFloat(value);
};
const limitedParseDouble = (value) => {
    if (typeof value == "string") {
        return parseFloatString(value);
    }
    return expectNumber(value);
};
const handleFloat = limitedParseDouble;
const limitedParseFloat = limitedParseDouble;
const limitedParseFloat32 = (value) => {
    if (typeof value == "string") {
        return parseFloatString(value);
    }
    return expectFloat32(value);
};
const parseFloatString = (value) => {
    switch (value) {
        case "NaN":
            return NaN;
        case "Infinity":
            return Infinity;
        case "-Infinity":
            return -Infinity;
        default:
            throw new Error(`Unable to parse float value: ${value}`);
    }
};
const strictParseLong = (value) => {
    if (typeof value === "string") {
        return expectLong(parseNumber(value));
    }
    return expectLong(value);
};
const strictParseInt = strictParseLong;
const strictParseInt32 = (value) => {
    if (typeof value === "string") {
        return expectInt32(parseNumber(value));
    }
    return expectInt32(value);
};
const strictParseShort = (value) => {
    if (typeof value === "string") {
        return expectShort(parseNumber(value));
    }
    return expectShort(value);
};
const strictParseByte = (value) => {
    if (typeof value === "string") {
        return expectByte(parseNumber(value));
    }
    return expectByte(value);
};
const stackTraceWarning = (message) => {
    return String(new TypeError(message).stack || message)
        .split("\n")
        .slice(0, 5)
        .filter((s) => !s.includes("stackTraceWarning"))
        .join("\n");
};
const logger = {
    warn: console.warn,
};


/***/ }),

/***/ "../../node_modules/@smithy/smithy-client/dist-es/quote-header.js":
/*!************************************************************************!*\
  !*** ../../node_modules/@smithy/smithy-client/dist-es/quote-header.js ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   quoteHeader: () => (/* binding */ quoteHeader)
/* harmony export */ });
function quoteHeader(part) {
    if (part.includes(",") || part.includes('"')) {
        part = `"${part.replace(/"/g, '\\"')}"`;
    }
    return part;
}


/***/ }),

/***/ "../../node_modules/@smithy/smithy-client/dist-es/resolve-path.js":
/*!************************************************************************!*\
  !*** ../../node_modules/@smithy/smithy-client/dist-es/resolve-path.js ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   resolvedPath: () => (/* binding */ resolvedPath)
/* harmony export */ });
/* harmony import */ var _extended_encode_uri_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./extended-encode-uri-component */ "../../node_modules/@smithy/smithy-client/dist-es/extended-encode-uri-component.js");

const resolvedPath = (resolvedPath, input, memberName, labelValueProvider, uriLabel, isGreedyLabel) => {
    if (input != null && input[memberName] !== undefined) {
        const labelValue = labelValueProvider();
        if (labelValue.length <= 0) {
            throw new Error("Empty value provided for input HTTP label: " + memberName + ".");
        }
        resolvedPath = resolvedPath.replace(uriLabel, isGreedyLabel
            ? labelValue
                .split("/")
                .map((segment) => (0,_extended_encode_uri_component__WEBPACK_IMPORTED_MODULE_0__.extendedEncodeURIComponent)(segment))
                .join("/")
            : (0,_extended_encode_uri_component__WEBPACK_IMPORTED_MODULE_0__.extendedEncodeURIComponent)(labelValue));
    }
    else {
        throw new Error("No value provided for input HTTP label: " + memberName + ".");
    }
    return resolvedPath;
};


/***/ }),

/***/ "../../node_modules/@smithy/smithy-client/dist-es/ser-utils.js":
/*!*********************************************************************!*\
  !*** ../../node_modules/@smithy/smithy-client/dist-es/ser-utils.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   serializeDateTime: () => (/* binding */ serializeDateTime),
/* harmony export */   serializeFloat: () => (/* binding */ serializeFloat)
/* harmony export */ });
const serializeFloat = (value) => {
    if (value !== value) {
        return "NaN";
    }
    switch (value) {
        case Infinity:
            return "Infinity";
        case -Infinity:
            return "-Infinity";
        default:
            return value;
    }
};
const serializeDateTime = (date) => date.toISOString().replace(".000Z", "Z");


/***/ }),

/***/ "../../node_modules/@smithy/smithy-client/dist-es/serde-json.js":
/*!**********************************************************************!*\
  !*** ../../node_modules/@smithy/smithy-client/dist-es/serde-json.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   _json: () => (/* binding */ _json)
/* harmony export */ });
const _json = (obj) => {
    if (obj == null) {
        return {};
    }
    if (Array.isArray(obj)) {
        return obj.filter((_) => _ != null).map(_json);
    }
    if (typeof obj === "object") {
        const target = {};
        for (const key of Object.keys(obj)) {
            if (obj[key] == null) {
                continue;
            }
            target[key] = _json(obj[key]);
        }
        return target;
    }
    return obj;
};


/***/ }),

/***/ "../../node_modules/@smithy/smithy-client/dist-es/split-every.js":
/*!***********************************************************************!*\
  !*** ../../node_modules/@smithy/smithy-client/dist-es/split-every.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   splitEvery: () => (/* binding */ splitEvery)
/* harmony export */ });
function splitEvery(value, delimiter, numDelimiters) {
    if (numDelimiters <= 0 || !Number.isInteger(numDelimiters)) {
        throw new Error("Invalid number of delimiters (" + numDelimiters + ") for splitEvery.");
    }
    const segments = value.split(delimiter);
    if (numDelimiters === 1) {
        return segments;
    }
    const compoundSegments = [];
    let currentSegment = "";
    for (let i = 0; i < segments.length; i++) {
        if (currentSegment === "") {
            currentSegment = segments[i];
        }
        else {
            currentSegment += delimiter + segments[i];
        }
        if ((i + 1) % numDelimiters === 0) {
            compoundSegments.push(currentSegment);
            currentSegment = "";
        }
    }
    if (currentSegment !== "") {
        compoundSegments.push(currentSegment);
    }
    return compoundSegments;
}


/***/ }),

/***/ "../../node_modules/@smithy/smithy-client/dist-es/split-header.js":
/*!************************************************************************!*\
  !*** ../../node_modules/@smithy/smithy-client/dist-es/split-header.js ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   splitHeader: () => (/* binding */ splitHeader)
/* harmony export */ });
const splitHeader = (value) => {
    const z = value.length;
    const values = [];
    let withinQuotes = false;
    let prevChar = undefined;
    let anchor = 0;
    for (let i = 0; i < z; ++i) {
        const char = value[i];
        switch (char) {
            case `"`:
                if (prevChar !== "\\") {
                    withinQuotes = !withinQuotes;
                }
                break;
            case ",":
                if (!withinQuotes) {
                    values.push(value.slice(anchor, i));
                    anchor = i + 1;
                }
                break;
            default:
        }
        prevChar = char;
    }
    values.push(value.slice(anchor));
    return values.map((v) => {
        v = v.trim();
        const z = v.length;
        if (z < 2) {
            return v;
        }
        if (v[0] === `"` && v[z - 1] === `"`) {
            v = v.slice(1, z - 1);
        }
        return v.replace(/\\"/g, '"');
    });
};


/***/ }),

/***/ "../../node_modules/@smithy/types/dist-es/abort.js":
/*!*********************************************************!*\
  !*** ../../node_modules/@smithy/types/dist-es/abort.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "../../node_modules/@smithy/types/dist-es/auth/HttpApiKeyAuth.js":
/*!***********************************************************************!*\
  !*** ../../node_modules/@smithy/types/dist-es/auth/HttpApiKeyAuth.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   HttpApiKeyAuthLocation: () => (/* binding */ HttpApiKeyAuthLocation)
/* harmony export */ });
var HttpApiKeyAuthLocation;
(function (HttpApiKeyAuthLocation) {
    HttpApiKeyAuthLocation["HEADER"] = "header";
    HttpApiKeyAuthLocation["QUERY"] = "query";
})(HttpApiKeyAuthLocation || (HttpApiKeyAuthLocation = {}));


/***/ }),

/***/ "../../node_modules/@smithy/types/dist-es/auth/HttpAuthScheme.js":
/*!***********************************************************************!*\
  !*** ../../node_modules/@smithy/types/dist-es/auth/HttpAuthScheme.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "../../node_modules/@smithy/types/dist-es/auth/HttpAuthSchemeProvider.js":
/*!*******************************************************************************!*\
  !*** ../../node_modules/@smithy/types/dist-es/auth/HttpAuthSchemeProvider.js ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "../../node_modules/@smithy/types/dist-es/auth/HttpSigner.js":
/*!*******************************************************************!*\
  !*** ../../node_modules/@smithy/types/dist-es/auth/HttpSigner.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "../../node_modules/@smithy/types/dist-es/auth/IdentityProviderConfig.js":
/*!*******************************************************************************!*\
  !*** ../../node_modules/@smithy/types/dist-es/auth/IdentityProviderConfig.js ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "../../node_modules/@smithy/types/dist-es/auth/auth.js":
/*!*************************************************************!*\
  !*** ../../node_modules/@smithy/types/dist-es/auth/auth.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   HttpAuthLocation: () => (/* binding */ HttpAuthLocation)
/* harmony export */ });
var HttpAuthLocation;
(function (HttpAuthLocation) {
    HttpAuthLocation["HEADER"] = "header";
    HttpAuthLocation["QUERY"] = "query";
})(HttpAuthLocation || (HttpAuthLocation = {}));


/***/ }),

/***/ "../../node_modules/@smithy/types/dist-es/auth/index.js":
/*!**************************************************************!*\
  !*** ../../node_modules/@smithy/types/dist-es/auth/index.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   HttpApiKeyAuthLocation: () => (/* reexport safe */ _HttpApiKeyAuth__WEBPACK_IMPORTED_MODULE_1__.HttpApiKeyAuthLocation),
/* harmony export */   HttpAuthLocation: () => (/* reexport safe */ _auth__WEBPACK_IMPORTED_MODULE_0__.HttpAuthLocation)
/* harmony export */ });
/* harmony import */ var _auth__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./auth */ "../../node_modules/@smithy/types/dist-es/auth/auth.js");
/* harmony import */ var _HttpApiKeyAuth__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./HttpApiKeyAuth */ "../../node_modules/@smithy/types/dist-es/auth/HttpApiKeyAuth.js");
/* harmony import */ var _HttpAuthScheme__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./HttpAuthScheme */ "../../node_modules/@smithy/types/dist-es/auth/HttpAuthScheme.js");
/* harmony import */ var _HttpAuthSchemeProvider__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./HttpAuthSchemeProvider */ "../../node_modules/@smithy/types/dist-es/auth/HttpAuthSchemeProvider.js");
/* harmony import */ var _HttpSigner__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./HttpSigner */ "../../node_modules/@smithy/types/dist-es/auth/HttpSigner.js");
/* harmony import */ var _IdentityProviderConfig__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./IdentityProviderConfig */ "../../node_modules/@smithy/types/dist-es/auth/IdentityProviderConfig.js");








/***/ }),

/***/ "../../node_modules/@smithy/types/dist-es/blob/blob-payload-input-types.js":
/*!*********************************************************************************!*\
  !*** ../../node_modules/@smithy/types/dist-es/blob/blob-payload-input-types.js ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "../../node_modules/@smithy/types/dist-es/checksum.js":
/*!************************************************************!*\
  !*** ../../node_modules/@smithy/types/dist-es/checksum.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "../../node_modules/@smithy/types/dist-es/client.js":
/*!**********************************************************!*\
  !*** ../../node_modules/@smithy/types/dist-es/client.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "../../node_modules/@smithy/types/dist-es/command.js":
/*!***********************************************************!*\
  !*** ../../node_modules/@smithy/types/dist-es/command.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "../../node_modules/@smithy/types/dist-es/connection/config.js":
/*!*********************************************************************!*\
  !*** ../../node_modules/@smithy/types/dist-es/connection/config.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "../../node_modules/@smithy/types/dist-es/connection/index.js":
/*!********************************************************************!*\
  !*** ../../node_modules/@smithy/types/dist-es/connection/index.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./config */ "../../node_modules/@smithy/types/dist-es/connection/config.js");
/* harmony import */ var _manager__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./manager */ "../../node_modules/@smithy/types/dist-es/connection/manager.js");
/* harmony import */ var _pool__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./pool */ "../../node_modules/@smithy/types/dist-es/connection/pool.js");





/***/ }),

/***/ "../../node_modules/@smithy/types/dist-es/connection/manager.js":
/*!**********************************************************************!*\
  !*** ../../node_modules/@smithy/types/dist-es/connection/manager.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "../../node_modules/@smithy/types/dist-es/connection/pool.js":
/*!*******************************************************************!*\
  !*** ../../node_modules/@smithy/types/dist-es/connection/pool.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "../../node_modules/@smithy/types/dist-es/crypto.js":
/*!**********************************************************!*\
  !*** ../../node_modules/@smithy/types/dist-es/crypto.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "../../node_modules/@smithy/types/dist-es/encode.js":
/*!**********************************************************!*\
  !*** ../../node_modules/@smithy/types/dist-es/encode.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "../../node_modules/@smithy/types/dist-es/endpoint.js":
/*!************************************************************!*\
  !*** ../../node_modules/@smithy/types/dist-es/endpoint.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   EndpointURLScheme: () => (/* binding */ EndpointURLScheme)
/* harmony export */ });
var EndpointURLScheme;
(function (EndpointURLScheme) {
    EndpointURLScheme["HTTP"] = "http";
    EndpointURLScheme["HTTPS"] = "https";
})(EndpointURLScheme || (EndpointURLScheme = {}));


/***/ }),

/***/ "../../node_modules/@smithy/types/dist-es/endpoints/EndpointRuleObject.js":
/*!********************************************************************************!*\
  !*** ../../node_modules/@smithy/types/dist-es/endpoints/EndpointRuleObject.js ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "../../node_modules/@smithy/types/dist-es/endpoints/ErrorRuleObject.js":
/*!*****************************************************************************!*\
  !*** ../../node_modules/@smithy/types/dist-es/endpoints/ErrorRuleObject.js ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "../../node_modules/@smithy/types/dist-es/endpoints/RuleSetObject.js":
/*!***************************************************************************!*\
  !*** ../../node_modules/@smithy/types/dist-es/endpoints/RuleSetObject.js ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "../../node_modules/@smithy/types/dist-es/endpoints/TreeRuleObject.js":
/*!****************************************************************************!*\
  !*** ../../node_modules/@smithy/types/dist-es/endpoints/TreeRuleObject.js ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "../../node_modules/@smithy/types/dist-es/endpoints/index.js":
/*!*******************************************************************!*\
  !*** ../../node_modules/@smithy/types/dist-es/endpoints/index.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _EndpointRuleObject__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./EndpointRuleObject */ "../../node_modules/@smithy/types/dist-es/endpoints/EndpointRuleObject.js");
/* harmony import */ var _ErrorRuleObject__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ErrorRuleObject */ "../../node_modules/@smithy/types/dist-es/endpoints/ErrorRuleObject.js");
/* harmony import */ var _RuleSetObject__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./RuleSetObject */ "../../node_modules/@smithy/types/dist-es/endpoints/RuleSetObject.js");
/* harmony import */ var _shared__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./shared */ "../../node_modules/@smithy/types/dist-es/endpoints/shared.js");
/* harmony import */ var _TreeRuleObject__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./TreeRuleObject */ "../../node_modules/@smithy/types/dist-es/endpoints/TreeRuleObject.js");







/***/ }),

/***/ "../../node_modules/@smithy/types/dist-es/endpoints/shared.js":
/*!********************************************************************!*\
  !*** ../../node_modules/@smithy/types/dist-es/endpoints/shared.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "../../node_modules/@smithy/types/dist-es/eventStream.js":
/*!***************************************************************!*\
  !*** ../../node_modules/@smithy/types/dist-es/eventStream.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "../../node_modules/@smithy/types/dist-es/extensions/checksum.js":
/*!***********************************************************************!*\
  !*** ../../node_modules/@smithy/types/dist-es/extensions/checksum.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AlgorithmId: () => (/* binding */ AlgorithmId),
/* harmony export */   getChecksumConfiguration: () => (/* binding */ getChecksumConfiguration),
/* harmony export */   resolveChecksumRuntimeConfig: () => (/* binding */ resolveChecksumRuntimeConfig)
/* harmony export */ });
var AlgorithmId;
(function (AlgorithmId) {
    AlgorithmId["MD5"] = "md5";
    AlgorithmId["CRC32"] = "crc32";
    AlgorithmId["CRC32C"] = "crc32c";
    AlgorithmId["SHA1"] = "sha1";
    AlgorithmId["SHA256"] = "sha256";
})(AlgorithmId || (AlgorithmId = {}));
const getChecksumConfiguration = (runtimeConfig) => {
    const checksumAlgorithms = [];
    if (runtimeConfig.sha256 !== undefined) {
        checksumAlgorithms.push({
            algorithmId: () => AlgorithmId.SHA256,
            checksumConstructor: () => runtimeConfig.sha256,
        });
    }
    if (runtimeConfig.md5 != undefined) {
        checksumAlgorithms.push({
            algorithmId: () => AlgorithmId.MD5,
            checksumConstructor: () => runtimeConfig.md5,
        });
    }
    return {
        _checksumAlgorithms: checksumAlgorithms,
        addChecksumAlgorithm(algo) {
            this._checksumAlgorithms.push(algo);
        },
        checksumAlgorithms() {
            return this._checksumAlgorithms;
        },
    };
};
const resolveChecksumRuntimeConfig = (clientConfig) => {
    const runtimeConfig = {};
    clientConfig.checksumAlgorithms().forEach((checksumAlgorithm) => {
        runtimeConfig[checksumAlgorithm.algorithmId()] = checksumAlgorithm.checksumConstructor();
    });
    return runtimeConfig;
};


/***/ }),

/***/ "../../node_modules/@smithy/types/dist-es/extensions/defaultClientConfiguration.js":
/*!*****************************************************************************************!*\
  !*** ../../node_modules/@smithy/types/dist-es/extensions/defaultClientConfiguration.js ***!
  \*****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getDefaultClientConfiguration: () => (/* binding */ getDefaultClientConfiguration),
/* harmony export */   resolveDefaultRuntimeConfig: () => (/* binding */ resolveDefaultRuntimeConfig)
/* harmony export */ });
/* harmony import */ var _checksum__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./checksum */ "../../node_modules/@smithy/types/dist-es/extensions/checksum.js");

const getDefaultClientConfiguration = (runtimeConfig) => {
    return {
        ...(0,_checksum__WEBPACK_IMPORTED_MODULE_0__.getChecksumConfiguration)(runtimeConfig),
    };
};
const resolveDefaultRuntimeConfig = (config) => {
    return {
        ...(0,_checksum__WEBPACK_IMPORTED_MODULE_0__.resolveChecksumRuntimeConfig)(config),
    };
};


/***/ }),

/***/ "../../node_modules/@smithy/types/dist-es/extensions/defaultExtensionConfiguration.js":
/*!********************************************************************************************!*\
  !*** ../../node_modules/@smithy/types/dist-es/extensions/defaultExtensionConfiguration.js ***!
  \********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "../../node_modules/@smithy/types/dist-es/extensions/index.js":
/*!********************************************************************!*\
  !*** ../../node_modules/@smithy/types/dist-es/extensions/index.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AlgorithmId: () => (/* reexport safe */ _checksum__WEBPACK_IMPORTED_MODULE_2__.AlgorithmId),
/* harmony export */   getDefaultClientConfiguration: () => (/* reexport safe */ _defaultClientConfiguration__WEBPACK_IMPORTED_MODULE_0__.getDefaultClientConfiguration),
/* harmony export */   resolveDefaultRuntimeConfig: () => (/* reexport safe */ _defaultClientConfiguration__WEBPACK_IMPORTED_MODULE_0__.resolveDefaultRuntimeConfig)
/* harmony export */ });
/* harmony import */ var _defaultClientConfiguration__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./defaultClientConfiguration */ "../../node_modules/@smithy/types/dist-es/extensions/defaultClientConfiguration.js");
/* harmony import */ var _defaultExtensionConfiguration__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./defaultExtensionConfiguration */ "../../node_modules/@smithy/types/dist-es/extensions/defaultExtensionConfiguration.js");
/* harmony import */ var _checksum__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./checksum */ "../../node_modules/@smithy/types/dist-es/extensions/checksum.js");





/***/ }),

/***/ "../../node_modules/@smithy/types/dist-es/http.js":
/*!********************************************************!*\
  !*** ../../node_modules/@smithy/types/dist-es/http.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FieldPosition: () => (/* binding */ FieldPosition)
/* harmony export */ });
var FieldPosition;
(function (FieldPosition) {
    FieldPosition[FieldPosition["HEADER"] = 0] = "HEADER";
    FieldPosition[FieldPosition["TRAILER"] = 1] = "TRAILER";
})(FieldPosition || (FieldPosition = {}));


/***/ }),

/***/ "../../node_modules/@smithy/types/dist-es/http/httpHandlerInitialization.js":
/*!**********************************************************************************!*\
  !*** ../../node_modules/@smithy/types/dist-es/http/httpHandlerInitialization.js ***!
  \**********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "../../node_modules/@smithy/types/dist-es/identity/apiKeyIdentity.js":
/*!***************************************************************************!*\
  !*** ../../node_modules/@smithy/types/dist-es/identity/apiKeyIdentity.js ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "../../node_modules/@smithy/types/dist-es/identity/awsCredentialIdentity.js":
/*!**********************************************************************************!*\
  !*** ../../node_modules/@smithy/types/dist-es/identity/awsCredentialIdentity.js ***!
  \**********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "../../node_modules/@smithy/types/dist-es/identity/identity.js":
/*!*********************************************************************!*\
  !*** ../../node_modules/@smithy/types/dist-es/identity/identity.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "../../node_modules/@smithy/types/dist-es/identity/index.js":
/*!******************************************************************!*\
  !*** ../../node_modules/@smithy/types/dist-es/identity/index.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _apiKeyIdentity__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./apiKeyIdentity */ "../../node_modules/@smithy/types/dist-es/identity/apiKeyIdentity.js");
/* harmony import */ var _awsCredentialIdentity__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./awsCredentialIdentity */ "../../node_modules/@smithy/types/dist-es/identity/awsCredentialIdentity.js");
/* harmony import */ var _identity__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./identity */ "../../node_modules/@smithy/types/dist-es/identity/identity.js");
/* harmony import */ var _tokenIdentity__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./tokenIdentity */ "../../node_modules/@smithy/types/dist-es/identity/tokenIdentity.js");






/***/ }),

/***/ "../../node_modules/@smithy/types/dist-es/identity/tokenIdentity.js":
/*!**************************************************************************!*\
  !*** ../../node_modules/@smithy/types/dist-es/identity/tokenIdentity.js ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "../../node_modules/@smithy/types/dist-es/index.js":
/*!*********************************************************!*\
  !*** ../../node_modules/@smithy/types/dist-es/index.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AlgorithmId: () => (/* reexport safe */ _extensions__WEBPACK_IMPORTED_MODULE_12__.AlgorithmId),
/* harmony export */   EndpointURLScheme: () => (/* reexport safe */ _endpoint__WEBPACK_IMPORTED_MODULE_9__.EndpointURLScheme),
/* harmony export */   FieldPosition: () => (/* reexport safe */ _http__WEBPACK_IMPORTED_MODULE_13__.FieldPosition),
/* harmony export */   HttpApiKeyAuthLocation: () => (/* reexport safe */ _auth__WEBPACK_IMPORTED_MODULE_1__.HttpApiKeyAuthLocation),
/* harmony export */   HttpAuthLocation: () => (/* reexport safe */ _auth__WEBPACK_IMPORTED_MODULE_1__.HttpAuthLocation),
/* harmony export */   IniSectionType: () => (/* reexport safe */ _profile__WEBPACK_IMPORTED_MODULE_19__.IniSectionType),
/* harmony export */   RequestHandlerProtocol: () => (/* reexport safe */ _transfer__WEBPACK_IMPORTED_MODULE_29__.RequestHandlerProtocol),
/* harmony export */   SMITHY_CONTEXT_KEY: () => (/* reexport safe */ _middleware__WEBPACK_IMPORTED_MODULE_17__.SMITHY_CONTEXT_KEY),
/* harmony export */   getDefaultClientConfiguration: () => (/* reexport safe */ _extensions__WEBPACK_IMPORTED_MODULE_12__.getDefaultClientConfiguration),
/* harmony export */   resolveDefaultRuntimeConfig: () => (/* reexport safe */ _extensions__WEBPACK_IMPORTED_MODULE_12__.resolveDefaultRuntimeConfig)
/* harmony export */ });
/* harmony import */ var _abort__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./abort */ "../../node_modules/@smithy/types/dist-es/abort.js");
/* harmony import */ var _auth__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./auth */ "../../node_modules/@smithy/types/dist-es/auth/index.js");
/* harmony import */ var _blob_blob_payload_input_types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./blob/blob-payload-input-types */ "../../node_modules/@smithy/types/dist-es/blob/blob-payload-input-types.js");
/* harmony import */ var _checksum__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./checksum */ "../../node_modules/@smithy/types/dist-es/checksum.js");
/* harmony import */ var _client__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./client */ "../../node_modules/@smithy/types/dist-es/client.js");
/* harmony import */ var _command__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./command */ "../../node_modules/@smithy/types/dist-es/command.js");
/* harmony import */ var _connection__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./connection */ "../../node_modules/@smithy/types/dist-es/connection/index.js");
/* harmony import */ var _crypto__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./crypto */ "../../node_modules/@smithy/types/dist-es/crypto.js");
/* harmony import */ var _encode__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./encode */ "../../node_modules/@smithy/types/dist-es/encode.js");
/* harmony import */ var _endpoint__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./endpoint */ "../../node_modules/@smithy/types/dist-es/endpoint.js");
/* harmony import */ var _endpoints__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./endpoints */ "../../node_modules/@smithy/types/dist-es/endpoints/index.js");
/* harmony import */ var _eventStream__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./eventStream */ "../../node_modules/@smithy/types/dist-es/eventStream.js");
/* harmony import */ var _extensions__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./extensions */ "../../node_modules/@smithy/types/dist-es/extensions/index.js");
/* harmony import */ var _http__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./http */ "../../node_modules/@smithy/types/dist-es/http.js");
/* harmony import */ var _http_httpHandlerInitialization__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./http/httpHandlerInitialization */ "../../node_modules/@smithy/types/dist-es/http/httpHandlerInitialization.js");
/* harmony import */ var _identity__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./identity */ "../../node_modules/@smithy/types/dist-es/identity/index.js");
/* harmony import */ var _logger__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./logger */ "../../node_modules/@smithy/types/dist-es/logger.js");
/* harmony import */ var _middleware__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./middleware */ "../../node_modules/@smithy/types/dist-es/middleware.js");
/* harmony import */ var _pagination__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./pagination */ "../../node_modules/@smithy/types/dist-es/pagination.js");
/* harmony import */ var _profile__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./profile */ "../../node_modules/@smithy/types/dist-es/profile.js");
/* harmony import */ var _response__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./response */ "../../node_modules/@smithy/types/dist-es/response.js");
/* harmony import */ var _retry__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./retry */ "../../node_modules/@smithy/types/dist-es/retry.js");
/* harmony import */ var _serde__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./serde */ "../../node_modules/@smithy/types/dist-es/serde.js");
/* harmony import */ var _shapes__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./shapes */ "../../node_modules/@smithy/types/dist-es/shapes.js");
/* harmony import */ var _signature__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ./signature */ "../../node_modules/@smithy/types/dist-es/signature.js");
/* harmony import */ var _stream__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ./stream */ "../../node_modules/@smithy/types/dist-es/stream.js");
/* harmony import */ var _streaming_payload_streaming_blob_common_types__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ./streaming-payload/streaming-blob-common-types */ "../../node_modules/@smithy/types/dist-es/streaming-payload/streaming-blob-common-types.js");
/* harmony import */ var _streaming_payload_streaming_blob_payload_input_types__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! ./streaming-payload/streaming-blob-payload-input-types */ "../../node_modules/@smithy/types/dist-es/streaming-payload/streaming-blob-payload-input-types.js");
/* harmony import */ var _streaming_payload_streaming_blob_payload_output_types__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! ./streaming-payload/streaming-blob-payload-output-types */ "../../node_modules/@smithy/types/dist-es/streaming-payload/streaming-blob-payload-output-types.js");
/* harmony import */ var _transfer__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! ./transfer */ "../../node_modules/@smithy/types/dist-es/transfer.js");
/* harmony import */ var _transform_client_payload_blob_type_narrow__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! ./transform/client-payload-blob-type-narrow */ "../../node_modules/@smithy/types/dist-es/transform/client-payload-blob-type-narrow.js");
/* harmony import */ var _transform_no_undefined__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(/*! ./transform/no-undefined */ "../../node_modules/@smithy/types/dist-es/transform/no-undefined.js");
/* harmony import */ var _transform_type_transform__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(/*! ./transform/type-transform */ "../../node_modules/@smithy/types/dist-es/transform/type-transform.js");
/* harmony import */ var _uri__WEBPACK_IMPORTED_MODULE_33__ = __webpack_require__(/*! ./uri */ "../../node_modules/@smithy/types/dist-es/uri.js");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_34__ = __webpack_require__(/*! ./util */ "../../node_modules/@smithy/types/dist-es/util.js");
/* harmony import */ var _waiter__WEBPACK_IMPORTED_MODULE_35__ = __webpack_require__(/*! ./waiter */ "../../node_modules/@smithy/types/dist-es/waiter.js");






































/***/ }),

/***/ "../../node_modules/@smithy/types/dist-es/logger.js":
/*!**********************************************************!*\
  !*** ../../node_modules/@smithy/types/dist-es/logger.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "../../node_modules/@smithy/types/dist-es/middleware.js":
/*!**************************************************************!*\
  !*** ../../node_modules/@smithy/types/dist-es/middleware.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SMITHY_CONTEXT_KEY: () => (/* binding */ SMITHY_CONTEXT_KEY)
/* harmony export */ });
const SMITHY_CONTEXT_KEY = "__smithy_context";


/***/ }),

/***/ "../../node_modules/@smithy/types/dist-es/pagination.js":
/*!**************************************************************!*\
  !*** ../../node_modules/@smithy/types/dist-es/pagination.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "../../node_modules/@smithy/types/dist-es/profile.js":
/*!***********************************************************!*\
  !*** ../../node_modules/@smithy/types/dist-es/profile.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   IniSectionType: () => (/* binding */ IniSectionType)
/* harmony export */ });
var IniSectionType;
(function (IniSectionType) {
    IniSectionType["PROFILE"] = "profile";
    IniSectionType["SSO_SESSION"] = "sso-session";
    IniSectionType["SERVICES"] = "services";
})(IniSectionType || (IniSectionType = {}));


/***/ }),

/***/ "../../node_modules/@smithy/types/dist-es/response.js":
/*!************************************************************!*\
  !*** ../../node_modules/@smithy/types/dist-es/response.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "../../node_modules/@smithy/types/dist-es/retry.js":
/*!*********************************************************!*\
  !*** ../../node_modules/@smithy/types/dist-es/retry.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "../../node_modules/@smithy/types/dist-es/serde.js":
/*!*********************************************************!*\
  !*** ../../node_modules/@smithy/types/dist-es/serde.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "../../node_modules/@smithy/types/dist-es/shapes.js":
/*!**********************************************************!*\
  !*** ../../node_modules/@smithy/types/dist-es/shapes.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "../../node_modules/@smithy/types/dist-es/signature.js":
/*!*************************************************************!*\
  !*** ../../node_modules/@smithy/types/dist-es/signature.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "../../node_modules/@smithy/types/dist-es/stream.js":
/*!**********************************************************!*\
  !*** ../../node_modules/@smithy/types/dist-es/stream.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "../../node_modules/@smithy/types/dist-es/streaming-payload/streaming-blob-common-types.js":
/*!*************************************************************************************************!*\
  !*** ../../node_modules/@smithy/types/dist-es/streaming-payload/streaming-blob-common-types.js ***!
  \*************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "../../node_modules/@smithy/types/dist-es/streaming-payload/streaming-blob-payload-input-types.js":
/*!********************************************************************************************************!*\
  !*** ../../node_modules/@smithy/types/dist-es/streaming-payload/streaming-blob-payload-input-types.js ***!
  \********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "../../node_modules/@smithy/types/dist-es/streaming-payload/streaming-blob-payload-output-types.js":
/*!*********************************************************************************************************!*\
  !*** ../../node_modules/@smithy/types/dist-es/streaming-payload/streaming-blob-payload-output-types.js ***!
  \*********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "../../node_modules/@smithy/types/dist-es/transfer.js":
/*!************************************************************!*\
  !*** ../../node_modules/@smithy/types/dist-es/transfer.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   RequestHandlerProtocol: () => (/* binding */ RequestHandlerProtocol)
/* harmony export */ });
var RequestHandlerProtocol;
(function (RequestHandlerProtocol) {
    RequestHandlerProtocol["HTTP_0_9"] = "http/0.9";
    RequestHandlerProtocol["HTTP_1_0"] = "http/1.0";
    RequestHandlerProtocol["TDS_8_0"] = "tds/8.0";
})(RequestHandlerProtocol || (RequestHandlerProtocol = {}));


/***/ }),

/***/ "../../node_modules/@smithy/types/dist-es/transform/client-payload-blob-type-narrow.js":
/*!*********************************************************************************************!*\
  !*** ../../node_modules/@smithy/types/dist-es/transform/client-payload-blob-type-narrow.js ***!
  \*********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "../../node_modules/@smithy/types/dist-es/transform/no-undefined.js":
/*!**************************************************************************!*\
  !*** ../../node_modules/@smithy/types/dist-es/transform/no-undefined.js ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "../../node_modules/@smithy/types/dist-es/transform/type-transform.js":
/*!****************************************************************************!*\
  !*** ../../node_modules/@smithy/types/dist-es/transform/type-transform.js ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "../../node_modules/@smithy/types/dist-es/uri.js":
/*!*******************************************************!*\
  !*** ../../node_modules/@smithy/types/dist-es/uri.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "../../node_modules/@smithy/types/dist-es/util.js":
/*!********************************************************!*\
  !*** ../../node_modules/@smithy/types/dist-es/util.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "../../node_modules/@smithy/types/dist-es/waiter.js":
/*!**********************************************************!*\
  !*** ../../node_modules/@smithy/types/dist-es/waiter.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "../../node_modules/@smithy/url-parser/dist-es/index.js":
/*!**************************************************************!*\
  !*** ../../node_modules/@smithy/url-parser/dist-es/index.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   parseUrl: () => (/* binding */ parseUrl)
/* harmony export */ });
/* harmony import */ var _smithy_querystring_parser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @smithy/querystring-parser */ "../../node_modules/@smithy/querystring-parser/dist-es/index.js");

const parseUrl = (url) => {
    if (typeof url === "string") {
        return parseUrl(new URL(url));
    }
    const { hostname, pathname, port, protocol, search } = url;
    let query;
    if (search) {
        query = (0,_smithy_querystring_parser__WEBPACK_IMPORTED_MODULE_0__.parseQueryString)(search);
    }
    return {
        hostname,
        port: port ? parseInt(port) : undefined,
        protocol,
        path: pathname,
        query,
    };
};


/***/ }),

/***/ "../../node_modules/@smithy/util-base64/dist-es/constants.browser.js":
/*!***************************************************************************!*\
  !*** ../../node_modules/@smithy/util-base64/dist-es/constants.browser.js ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
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

/***/ "../../node_modules/@smithy/util-body-length-browser/dist-es/calculateBodyLength.js":
/*!******************************************************************************************!*\
  !*** ../../node_modules/@smithy/util-body-length-browser/dist-es/calculateBodyLength.js ***!
  \******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   calculateBodyLength: () => (/* binding */ calculateBodyLength)
/* harmony export */ });
const TEXT_ENCODER = typeof TextEncoder == "function" ? new TextEncoder() : null;
const calculateBodyLength = (body) => {
    if (typeof body === "string") {
        if (TEXT_ENCODER) {
            return TEXT_ENCODER.encode(body).byteLength;
        }
        let len = body.length;
        for (let i = len - 1; i >= 0; i--) {
            const code = body.charCodeAt(i);
            if (code > 0x7f && code <= 0x7ff)
                len++;
            else if (code > 0x7ff && code <= 0xffff)
                len += 2;
            if (code >= 0xdc00 && code <= 0xdfff)
                i--;
        }
        return len;
    }
    else if (typeof body.byteLength === "number") {
        return body.byteLength;
    }
    else if (typeof body.size === "number") {
        return body.size;
    }
    throw new Error(`Body Length computation failed for ${body}`);
};


/***/ }),

/***/ "../../node_modules/@smithy/util-body-length-browser/dist-es/index.js":
/*!****************************************************************************!*\
  !*** ../../node_modules/@smithy/util-body-length-browser/dist-es/index.js ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   calculateBodyLength: () => (/* reexport safe */ _calculateBodyLength__WEBPACK_IMPORTED_MODULE_0__.calculateBodyLength)
/* harmony export */ });
/* harmony import */ var _calculateBodyLength__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./calculateBodyLength */ "../../node_modules/@smithy/util-body-length-browser/dist-es/calculateBodyLength.js");



/***/ }),

/***/ "../../node_modules/@smithy/util-config-provider/dist-es/booleanSelector.js":
/*!**********************************************************************************!*\
  !*** ../../node_modules/@smithy/util-config-provider/dist-es/booleanSelector.js ***!
  \**********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   booleanSelector: () => (/* binding */ booleanSelector)
/* harmony export */ });
const booleanSelector = (obj, key, type) => {
    if (!(key in obj))
        return undefined;
    if (obj[key] === "true")
        return true;
    if (obj[key] === "false")
        return false;
    throw new Error(`Cannot load ${type} "${key}". Expected "true" or "false", got ${obj[key]}.`);
};


/***/ }),

/***/ "../../node_modules/@smithy/util-config-provider/dist-es/index.js":
/*!************************************************************************!*\
  !*** ../../node_modules/@smithy/util-config-provider/dist-es/index.js ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SelectorType: () => (/* reexport safe */ _types__WEBPACK_IMPORTED_MODULE_2__.SelectorType),
/* harmony export */   booleanSelector: () => (/* reexport safe */ _booleanSelector__WEBPACK_IMPORTED_MODULE_0__.booleanSelector),
/* harmony export */   numberSelector: () => (/* reexport safe */ _numberSelector__WEBPACK_IMPORTED_MODULE_1__.numberSelector)
/* harmony export */ });
/* harmony import */ var _booleanSelector__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./booleanSelector */ "../../node_modules/@smithy/util-config-provider/dist-es/booleanSelector.js");
/* harmony import */ var _numberSelector__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./numberSelector */ "../../node_modules/@smithy/util-config-provider/dist-es/numberSelector.js");
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./types */ "../../node_modules/@smithy/util-config-provider/dist-es/types.js");





/***/ }),

/***/ "../../node_modules/@smithy/util-config-provider/dist-es/numberSelector.js":
/*!*********************************************************************************!*\
  !*** ../../node_modules/@smithy/util-config-provider/dist-es/numberSelector.js ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   numberSelector: () => (/* binding */ numberSelector)
/* harmony export */ });
const numberSelector = (obj, key, type) => {
    if (!(key in obj))
        return undefined;
    const numberValue = parseInt(obj[key], 10);
    if (Number.isNaN(numberValue)) {
        throw new TypeError(`Cannot load ${type} '${key}'. Expected number, got '${obj[key]}'.`);
    }
    return numberValue;
};


/***/ }),

/***/ "../../node_modules/@smithy/util-config-provider/dist-es/types.js":
/*!************************************************************************!*\
  !*** ../../node_modules/@smithy/util-config-provider/dist-es/types.js ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SelectorType: () => (/* binding */ SelectorType)
/* harmony export */ });
var SelectorType;
(function (SelectorType) {
    SelectorType["ENV"] = "env";
    SelectorType["CONFIG"] = "shared config entry";
})(SelectorType || (SelectorType = {}));


/***/ }),

/***/ "../../node_modules/@smithy/util-defaults-mode-browser/dist-es/constants.js":
/*!**********************************************************************************!*\
  !*** ../../node_modules/@smithy/util-defaults-mode-browser/dist-es/constants.js ***!
  \**********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DEFAULTS_MODE_OPTIONS: () => (/* binding */ DEFAULTS_MODE_OPTIONS)
/* harmony export */ });
const DEFAULTS_MODE_OPTIONS = ["in-region", "cross-region", "mobile", "standard", "legacy"];


/***/ }),

/***/ "../../node_modules/@smithy/util-defaults-mode-browser/dist-es/index.js":
/*!******************************************************************************!*\
  !*** ../../node_modules/@smithy/util-defaults-mode-browser/dist-es/index.js ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   resolveDefaultsModeConfig: () => (/* reexport safe */ _resolveDefaultsModeConfig__WEBPACK_IMPORTED_MODULE_0__.resolveDefaultsModeConfig)
/* harmony export */ });
/* harmony import */ var _resolveDefaultsModeConfig__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./resolveDefaultsModeConfig */ "../../node_modules/@smithy/util-defaults-mode-browser/dist-es/resolveDefaultsModeConfig.js");



/***/ }),

/***/ "../../node_modules/@smithy/util-defaults-mode-browser/dist-es/resolveDefaultsModeConfig.js":
/*!**************************************************************************************************!*\
  !*** ../../node_modules/@smithy/util-defaults-mode-browser/dist-es/resolveDefaultsModeConfig.js ***!
  \**************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   resolveDefaultsModeConfig: () => (/* binding */ resolveDefaultsModeConfig)
/* harmony export */ });
/* harmony import */ var _smithy_property_provider__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @smithy/property-provider */ "../../node_modules/@smithy/property-provider/dist-es/index.js");
/* harmony import */ var bowser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! bowser */ "../../node_modules/bowser/es5.js");
/* harmony import */ var bowser__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(bowser__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./constants */ "../../node_modules/@smithy/util-defaults-mode-browser/dist-es/constants.js");



const resolveDefaultsModeConfig = ({ defaultsMode, } = {}) => (0,_smithy_property_provider__WEBPACK_IMPORTED_MODULE_0__.memoize)(async () => {
    const mode = typeof defaultsMode === "function" ? await defaultsMode() : defaultsMode;
    switch (mode?.toLowerCase()) {
        case "auto":
            return Promise.resolve(isMobileBrowser() ? "mobile" : "standard");
        case "mobile":
        case "in-region":
        case "cross-region":
        case "standard":
        case "legacy":
            return Promise.resolve(mode?.toLocaleLowerCase());
        case undefined:
            return Promise.resolve("legacy");
        default:
            throw new Error(`Invalid parameter for "defaultsMode", expect ${_constants__WEBPACK_IMPORTED_MODULE_2__.DEFAULTS_MODE_OPTIONS.join(", ")}, got ${mode}`);
    }
});
const isMobileBrowser = () => {
    const parsedUA = typeof window !== "undefined" && window?.navigator?.userAgent
        ? bowser__WEBPACK_IMPORTED_MODULE_1___default().parse(window.navigator.userAgent)
        : undefined;
    const platform = parsedUA?.platform?.type;
    return platform === "tablet" || platform === "mobile";
};


/***/ }),

/***/ "../../node_modules/@smithy/util-endpoints/dist-es/cache/EndpointCache.js":
/*!********************************************************************************!*\
  !*** ../../node_modules/@smithy/util-endpoints/dist-es/cache/EndpointCache.js ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   EndpointCache: () => (/* binding */ EndpointCache)
/* harmony export */ });
class EndpointCache {
    constructor({ size, params }) {
        this.data = new Map();
        this.parameters = [];
        this.capacity = size ?? 50;
        if (params) {
            this.parameters = params;
        }
    }
    get(endpointParams, resolver) {
        const key = this.hash(endpointParams);
        if (key === false) {
            return resolver();
        }
        if (!this.data.has(key)) {
            if (this.data.size > this.capacity + 10) {
                const keys = this.data.keys();
                let i = 0;
                while (true) {
                    const { value, done } = keys.next();
                    this.data.delete(value);
                    if (done || ++i > 10) {
                        break;
                    }
                }
            }
            this.data.set(key, resolver());
        }
        return this.data.get(key);
    }
    size() {
        return this.data.size;
    }
    hash(endpointParams) {
        let buffer = "";
        const { parameters } = this;
        if (parameters.length === 0) {
            return false;
        }
        for (const param of parameters) {
            const val = String(endpointParams[param] ?? "");
            if (val.includes("|;")) {
                return false;
            }
            buffer += val + "|;";
        }
        return buffer;
    }
}


/***/ }),

/***/ "../../node_modules/@smithy/util-endpoints/dist-es/debug/debugId.js":
/*!**************************************************************************!*\
  !*** ../../node_modules/@smithy/util-endpoints/dist-es/debug/debugId.js ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   debugId: () => (/* binding */ debugId)
/* harmony export */ });
const debugId = "endpoints";


/***/ }),

/***/ "../../node_modules/@smithy/util-endpoints/dist-es/debug/index.js":
/*!************************************************************************!*\
  !*** ../../node_modules/@smithy/util-endpoints/dist-es/debug/index.js ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   debugId: () => (/* reexport safe */ _debugId__WEBPACK_IMPORTED_MODULE_0__.debugId),
/* harmony export */   toDebugString: () => (/* reexport safe */ _toDebugString__WEBPACK_IMPORTED_MODULE_1__.toDebugString)
/* harmony export */ });
/* harmony import */ var _debugId__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./debugId */ "../../node_modules/@smithy/util-endpoints/dist-es/debug/debugId.js");
/* harmony import */ var _toDebugString__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./toDebugString */ "../../node_modules/@smithy/util-endpoints/dist-es/debug/toDebugString.js");




/***/ }),

/***/ "../../node_modules/@smithy/util-endpoints/dist-es/debug/toDebugString.js":
/*!********************************************************************************!*\
  !*** ../../node_modules/@smithy/util-endpoints/dist-es/debug/toDebugString.js ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   toDebugString: () => (/* binding */ toDebugString)
/* harmony export */ });
function toDebugString(input) {
    if (typeof input !== "object" || input == null) {
        return input;
    }
    if ("ref" in input) {
        return `$${toDebugString(input.ref)}`;
    }
    if ("fn" in input) {
        return `${input.fn}(${(input.argv || []).map(toDebugString).join(", ")})`;
    }
    return JSON.stringify(input, null, 2);
}


/***/ }),

/***/ "../../node_modules/@smithy/util-endpoints/dist-es/index.js":
/*!******************************************************************!*\
  !*** ../../node_modules/@smithy/util-endpoints/dist-es/index.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   EndpointCache: () => (/* reexport safe */ _cache_EndpointCache__WEBPACK_IMPORTED_MODULE_0__.EndpointCache),
/* harmony export */   EndpointError: () => (/* reexport safe */ _types__WEBPACK_IMPORTED_MODULE_5__.EndpointError),
/* harmony export */   customEndpointFunctions: () => (/* reexport safe */ _utils_customEndpointFunctions__WEBPACK_IMPORTED_MODULE_3__.customEndpointFunctions),
/* harmony export */   isIpAddress: () => (/* reexport safe */ _lib_isIpAddress__WEBPACK_IMPORTED_MODULE_1__.isIpAddress),
/* harmony export */   isValidHostLabel: () => (/* reexport safe */ _lib_isValidHostLabel__WEBPACK_IMPORTED_MODULE_2__.isValidHostLabel),
/* harmony export */   resolveEndpoint: () => (/* reexport safe */ _resolveEndpoint__WEBPACK_IMPORTED_MODULE_4__.resolveEndpoint)
/* harmony export */ });
/* harmony import */ var _cache_EndpointCache__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./cache/EndpointCache */ "../../node_modules/@smithy/util-endpoints/dist-es/cache/EndpointCache.js");
/* harmony import */ var _lib_isIpAddress__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./lib/isIpAddress */ "../../node_modules/@smithy/util-endpoints/dist-es/lib/isIpAddress.js");
/* harmony import */ var _lib_isValidHostLabel__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./lib/isValidHostLabel */ "../../node_modules/@smithy/util-endpoints/dist-es/lib/isValidHostLabel.js");
/* harmony import */ var _utils_customEndpointFunctions__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utils/customEndpointFunctions */ "../../node_modules/@smithy/util-endpoints/dist-es/utils/customEndpointFunctions.js");
/* harmony import */ var _resolveEndpoint__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./resolveEndpoint */ "../../node_modules/@smithy/util-endpoints/dist-es/resolveEndpoint.js");
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./types */ "../../node_modules/@smithy/util-endpoints/dist-es/types/index.js");








/***/ }),

/***/ "../../node_modules/@smithy/util-endpoints/dist-es/lib/booleanEquals.js":
/*!******************************************************************************!*\
  !*** ../../node_modules/@smithy/util-endpoints/dist-es/lib/booleanEquals.js ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   booleanEquals: () => (/* binding */ booleanEquals)
/* harmony export */ });
const booleanEquals = (value1, value2) => value1 === value2;


/***/ }),

/***/ "../../node_modules/@smithy/util-endpoints/dist-es/lib/getAttr.js":
/*!************************************************************************!*\
  !*** ../../node_modules/@smithy/util-endpoints/dist-es/lib/getAttr.js ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getAttr: () => (/* binding */ getAttr)
/* harmony export */ });
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../types */ "../../node_modules/@smithy/util-endpoints/dist-es/types/index.js");
/* harmony import */ var _getAttrPathList__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./getAttrPathList */ "../../node_modules/@smithy/util-endpoints/dist-es/lib/getAttrPathList.js");


const getAttr = (value, path) => (0,_getAttrPathList__WEBPACK_IMPORTED_MODULE_1__.getAttrPathList)(path).reduce((acc, index) => {
    if (typeof acc !== "object") {
        throw new _types__WEBPACK_IMPORTED_MODULE_0__.EndpointError(`Index '${index}' in '${path}' not found in '${JSON.stringify(value)}'`);
    }
    else if (Array.isArray(acc)) {
        return acc[parseInt(index)];
    }
    return acc[index];
}, value);


/***/ }),

/***/ "../../node_modules/@smithy/util-endpoints/dist-es/lib/getAttrPathList.js":
/*!********************************************************************************!*\
  !*** ../../node_modules/@smithy/util-endpoints/dist-es/lib/getAttrPathList.js ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getAttrPathList: () => (/* binding */ getAttrPathList)
/* harmony export */ });
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../types */ "../../node_modules/@smithy/util-endpoints/dist-es/types/index.js");

const getAttrPathList = (path) => {
    const parts = path.split(".");
    const pathList = [];
    for (const part of parts) {
        const squareBracketIndex = part.indexOf("[");
        if (squareBracketIndex !== -1) {
            if (part.indexOf("]") !== part.length - 1) {
                throw new _types__WEBPACK_IMPORTED_MODULE_0__.EndpointError(`Path: '${path}' does not end with ']'`);
            }
            const arrayIndex = part.slice(squareBracketIndex + 1, -1);
            if (Number.isNaN(parseInt(arrayIndex))) {
                throw new _types__WEBPACK_IMPORTED_MODULE_0__.EndpointError(`Invalid array index: '${arrayIndex}' in path: '${path}'`);
            }
            if (squareBracketIndex !== 0) {
                pathList.push(part.slice(0, squareBracketIndex));
            }
            pathList.push(arrayIndex);
        }
        else {
            pathList.push(part);
        }
    }
    return pathList;
};


/***/ }),

/***/ "../../node_modules/@smithy/util-endpoints/dist-es/lib/index.js":
/*!**********************************************************************!*\
  !*** ../../node_modules/@smithy/util-endpoints/dist-es/lib/index.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   booleanEquals: () => (/* reexport safe */ _booleanEquals__WEBPACK_IMPORTED_MODULE_0__.booleanEquals),
/* harmony export */   getAttr: () => (/* reexport safe */ _getAttr__WEBPACK_IMPORTED_MODULE_1__.getAttr),
/* harmony export */   isSet: () => (/* reexport safe */ _isSet__WEBPACK_IMPORTED_MODULE_2__.isSet),
/* harmony export */   isValidHostLabel: () => (/* reexport safe */ _isValidHostLabel__WEBPACK_IMPORTED_MODULE_3__.isValidHostLabel),
/* harmony export */   not: () => (/* reexport safe */ _not__WEBPACK_IMPORTED_MODULE_4__.not),
/* harmony export */   parseURL: () => (/* reexport safe */ _parseURL__WEBPACK_IMPORTED_MODULE_5__.parseURL),
/* harmony export */   stringEquals: () => (/* reexport safe */ _stringEquals__WEBPACK_IMPORTED_MODULE_6__.stringEquals),
/* harmony export */   substring: () => (/* reexport safe */ _substring__WEBPACK_IMPORTED_MODULE_7__.substring),
/* harmony export */   uriEncode: () => (/* reexport safe */ _uriEncode__WEBPACK_IMPORTED_MODULE_8__.uriEncode)
/* harmony export */ });
/* harmony import */ var _booleanEquals__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./booleanEquals */ "../../node_modules/@smithy/util-endpoints/dist-es/lib/booleanEquals.js");
/* harmony import */ var _getAttr__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./getAttr */ "../../node_modules/@smithy/util-endpoints/dist-es/lib/getAttr.js");
/* harmony import */ var _isSet__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./isSet */ "../../node_modules/@smithy/util-endpoints/dist-es/lib/isSet.js");
/* harmony import */ var _isValidHostLabel__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./isValidHostLabel */ "../../node_modules/@smithy/util-endpoints/dist-es/lib/isValidHostLabel.js");
/* harmony import */ var _not__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./not */ "../../node_modules/@smithy/util-endpoints/dist-es/lib/not.js");
/* harmony import */ var _parseURL__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./parseURL */ "../../node_modules/@smithy/util-endpoints/dist-es/lib/parseURL.js");
/* harmony import */ var _stringEquals__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./stringEquals */ "../../node_modules/@smithy/util-endpoints/dist-es/lib/stringEquals.js");
/* harmony import */ var _substring__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./substring */ "../../node_modules/@smithy/util-endpoints/dist-es/lib/substring.js");
/* harmony import */ var _uriEncode__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./uriEncode */ "../../node_modules/@smithy/util-endpoints/dist-es/lib/uriEncode.js");











/***/ }),

/***/ "../../node_modules/@smithy/util-endpoints/dist-es/lib/isIpAddress.js":
/*!****************************************************************************!*\
  !*** ../../node_modules/@smithy/util-endpoints/dist-es/lib/isIpAddress.js ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   isIpAddress: () => (/* binding */ isIpAddress)
/* harmony export */ });
const IP_V4_REGEX = new RegExp(`^(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)(?:\\.(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)){3}$`);
const isIpAddress = (value) => IP_V4_REGEX.test(value) || (value.startsWith("[") && value.endsWith("]"));


/***/ }),

/***/ "../../node_modules/@smithy/util-endpoints/dist-es/lib/isSet.js":
/*!**********************************************************************!*\
  !*** ../../node_modules/@smithy/util-endpoints/dist-es/lib/isSet.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   isSet: () => (/* binding */ isSet)
/* harmony export */ });
const isSet = (value) => value != null;


/***/ }),

/***/ "../../node_modules/@smithy/util-endpoints/dist-es/lib/isValidHostLabel.js":
/*!*********************************************************************************!*\
  !*** ../../node_modules/@smithy/util-endpoints/dist-es/lib/isValidHostLabel.js ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   isValidHostLabel: () => (/* binding */ isValidHostLabel)
/* harmony export */ });
const VALID_HOST_LABEL_REGEX = new RegExp(`^(?!.*-$)(?!-)[a-zA-Z0-9-]{1,63}$`);
const isValidHostLabel = (value, allowSubDomains = false) => {
    if (!allowSubDomains) {
        return VALID_HOST_LABEL_REGEX.test(value);
    }
    const labels = value.split(".");
    for (const label of labels) {
        if (!isValidHostLabel(label)) {
            return false;
        }
    }
    return true;
};


/***/ }),

/***/ "../../node_modules/@smithy/util-endpoints/dist-es/lib/not.js":
/*!********************************************************************!*\
  !*** ../../node_modules/@smithy/util-endpoints/dist-es/lib/not.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   not: () => (/* binding */ not)
/* harmony export */ });
const not = (value) => !value;


/***/ }),

/***/ "../../node_modules/@smithy/util-endpoints/dist-es/lib/parseURL.js":
/*!*************************************************************************!*\
  !*** ../../node_modules/@smithy/util-endpoints/dist-es/lib/parseURL.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   parseURL: () => (/* binding */ parseURL)
/* harmony export */ });
/* harmony import */ var _smithy_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @smithy/types */ "../../node_modules/@smithy/types/dist-es/index.js");
/* harmony import */ var _isIpAddress__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./isIpAddress */ "../../node_modules/@smithy/util-endpoints/dist-es/lib/isIpAddress.js");


const DEFAULT_PORTS = {
    [_smithy_types__WEBPACK_IMPORTED_MODULE_0__.EndpointURLScheme.HTTP]: 80,
    [_smithy_types__WEBPACK_IMPORTED_MODULE_0__.EndpointURLScheme.HTTPS]: 443,
};
const parseURL = (value) => {
    const whatwgURL = (() => {
        try {
            if (value instanceof URL) {
                return value;
            }
            if (typeof value === "object" && "hostname" in value) {
                const { hostname, port, protocol = "", path = "", query = {} } = value;
                const url = new URL(`${protocol}//${hostname}${port ? `:${port}` : ""}${path}`);
                url.search = Object.entries(query)
                    .map(([k, v]) => `${k}=${v}`)
                    .join("&");
                return url;
            }
            return new URL(value);
        }
        catch (error) {
            return null;
        }
    })();
    if (!whatwgURL) {
        console.error(`Unable to parse ${JSON.stringify(value)} as a whatwg URL.`);
        return null;
    }
    const urlString = whatwgURL.href;
    const { host, hostname, pathname, protocol, search } = whatwgURL;
    if (search) {
        return null;
    }
    const scheme = protocol.slice(0, -1);
    if (!Object.values(_smithy_types__WEBPACK_IMPORTED_MODULE_0__.EndpointURLScheme).includes(scheme)) {
        return null;
    }
    const isIp = (0,_isIpAddress__WEBPACK_IMPORTED_MODULE_1__.isIpAddress)(hostname);
    const inputContainsDefaultPort = urlString.includes(`${host}:${DEFAULT_PORTS[scheme]}`) ||
        (typeof value === "string" && value.includes(`${host}:${DEFAULT_PORTS[scheme]}`));
    const authority = `${host}${inputContainsDefaultPort ? `:${DEFAULT_PORTS[scheme]}` : ``}`;
    return {
        scheme,
        authority,
        path: pathname,
        normalizedPath: pathname.endsWith("/") ? pathname : `${pathname}/`,
        isIp,
    };
};


/***/ }),

/***/ "../../node_modules/@smithy/util-endpoints/dist-es/lib/stringEquals.js":
/*!*****************************************************************************!*\
  !*** ../../node_modules/@smithy/util-endpoints/dist-es/lib/stringEquals.js ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   stringEquals: () => (/* binding */ stringEquals)
/* harmony export */ });
const stringEquals = (value1, value2) => value1 === value2;


/***/ }),

/***/ "../../node_modules/@smithy/util-endpoints/dist-es/lib/substring.js":
/*!**************************************************************************!*\
  !*** ../../node_modules/@smithy/util-endpoints/dist-es/lib/substring.js ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   substring: () => (/* binding */ substring)
/* harmony export */ });
const substring = (input, start, stop, reverse) => {
    if (start >= stop || input.length < stop) {
        return null;
    }
    if (!reverse) {
        return input.substring(start, stop);
    }
    return input.substring(input.length - stop, input.length - start);
};


/***/ }),

/***/ "../../node_modules/@smithy/util-endpoints/dist-es/lib/uriEncode.js":
/*!**************************************************************************!*\
  !*** ../../node_modules/@smithy/util-endpoints/dist-es/lib/uriEncode.js ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   uriEncode: () => (/* binding */ uriEncode)
/* harmony export */ });
const uriEncode = (value) => encodeURIComponent(value).replace(/[!*'()]/g, (c) => `%${c.charCodeAt(0).toString(16).toUpperCase()}`);


/***/ }),

/***/ "../../node_modules/@smithy/util-endpoints/dist-es/resolveEndpoint.js":
/*!****************************************************************************!*\
  !*** ../../node_modules/@smithy/util-endpoints/dist-es/resolveEndpoint.js ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   resolveEndpoint: () => (/* binding */ resolveEndpoint)
/* harmony export */ });
/* harmony import */ var _debug__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./debug */ "../../node_modules/@smithy/util-endpoints/dist-es/debug/index.js");
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./types */ "../../node_modules/@smithy/util-endpoints/dist-es/types/index.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils */ "../../node_modules/@smithy/util-endpoints/dist-es/utils/index.js");



const resolveEndpoint = (ruleSetObject, options) => {
    const { endpointParams, logger } = options;
    const { parameters, rules } = ruleSetObject;
    options.logger?.debug?.(`${_debug__WEBPACK_IMPORTED_MODULE_0__.debugId} Initial EndpointParams: ${(0,_debug__WEBPACK_IMPORTED_MODULE_0__.toDebugString)(endpointParams)}`);
    const paramsWithDefault = Object.entries(parameters)
        .filter(([, v]) => v.default != null)
        .map(([k, v]) => [k, v.default]);
    if (paramsWithDefault.length > 0) {
        for (const [paramKey, paramDefaultValue] of paramsWithDefault) {
            endpointParams[paramKey] = endpointParams[paramKey] ?? paramDefaultValue;
        }
    }
    const requiredParams = Object.entries(parameters)
        .filter(([, v]) => v.required)
        .map(([k]) => k);
    for (const requiredParam of requiredParams) {
        if (endpointParams[requiredParam] == null) {
            throw new _types__WEBPACK_IMPORTED_MODULE_1__.EndpointError(`Missing required parameter: '${requiredParam}'`);
        }
    }
    const endpoint = (0,_utils__WEBPACK_IMPORTED_MODULE_2__.evaluateRules)(rules, { endpointParams, logger, referenceRecord: {} });
    options.logger?.debug?.(`${_debug__WEBPACK_IMPORTED_MODULE_0__.debugId} Resolved endpoint: ${(0,_debug__WEBPACK_IMPORTED_MODULE_0__.toDebugString)(endpoint)}`);
    return endpoint;
};


/***/ }),

/***/ "../../node_modules/@smithy/util-endpoints/dist-es/types/EndpointError.js":
/*!********************************************************************************!*\
  !*** ../../node_modules/@smithy/util-endpoints/dist-es/types/EndpointError.js ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   EndpointError: () => (/* binding */ EndpointError)
/* harmony export */ });
class EndpointError extends Error {
    constructor(message) {
        super(message);
        this.name = "EndpointError";
    }
}


/***/ }),

/***/ "../../node_modules/@smithy/util-endpoints/dist-es/types/EndpointFunctions.js":
/*!************************************************************************************!*\
  !*** ../../node_modules/@smithy/util-endpoints/dist-es/types/EndpointFunctions.js ***!
  \************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "../../node_modules/@smithy/util-endpoints/dist-es/types/EndpointRuleObject.js":
/*!*************************************************************************************!*\
  !*** ../../node_modules/@smithy/util-endpoints/dist-es/types/EndpointRuleObject.js ***!
  \*************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "../../node_modules/@smithy/util-endpoints/dist-es/types/ErrorRuleObject.js":
/*!**********************************************************************************!*\
  !*** ../../node_modules/@smithy/util-endpoints/dist-es/types/ErrorRuleObject.js ***!
  \**********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "../../node_modules/@smithy/util-endpoints/dist-es/types/RuleSetObject.js":
/*!********************************************************************************!*\
  !*** ../../node_modules/@smithy/util-endpoints/dist-es/types/RuleSetObject.js ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "../../node_modules/@smithy/util-endpoints/dist-es/types/TreeRuleObject.js":
/*!*********************************************************************************!*\
  !*** ../../node_modules/@smithy/util-endpoints/dist-es/types/TreeRuleObject.js ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "../../node_modules/@smithy/util-endpoints/dist-es/types/index.js":
/*!************************************************************************!*\
  !*** ../../node_modules/@smithy/util-endpoints/dist-es/types/index.js ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   EndpointError: () => (/* reexport safe */ _EndpointError__WEBPACK_IMPORTED_MODULE_0__.EndpointError)
/* harmony export */ });
/* harmony import */ var _EndpointError__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./EndpointError */ "../../node_modules/@smithy/util-endpoints/dist-es/types/EndpointError.js");
/* harmony import */ var _EndpointFunctions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./EndpointFunctions */ "../../node_modules/@smithy/util-endpoints/dist-es/types/EndpointFunctions.js");
/* harmony import */ var _EndpointRuleObject__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./EndpointRuleObject */ "../../node_modules/@smithy/util-endpoints/dist-es/types/EndpointRuleObject.js");
/* harmony import */ var _ErrorRuleObject__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ErrorRuleObject */ "../../node_modules/@smithy/util-endpoints/dist-es/types/ErrorRuleObject.js");
/* harmony import */ var _RuleSetObject__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./RuleSetObject */ "../../node_modules/@smithy/util-endpoints/dist-es/types/RuleSetObject.js");
/* harmony import */ var _TreeRuleObject__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./TreeRuleObject */ "../../node_modules/@smithy/util-endpoints/dist-es/types/TreeRuleObject.js");
/* harmony import */ var _shared__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./shared */ "../../node_modules/@smithy/util-endpoints/dist-es/types/shared.js");









/***/ }),

/***/ "../../node_modules/@smithy/util-endpoints/dist-es/types/shared.js":
/*!*************************************************************************!*\
  !*** ../../node_modules/@smithy/util-endpoints/dist-es/types/shared.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "../../node_modules/@smithy/util-endpoints/dist-es/utils/callFunction.js":
/*!*******************************************************************************!*\
  !*** ../../node_modules/@smithy/util-endpoints/dist-es/utils/callFunction.js ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   callFunction: () => (/* binding */ callFunction)
/* harmony export */ });
/* harmony import */ var _customEndpointFunctions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./customEndpointFunctions */ "../../node_modules/@smithy/util-endpoints/dist-es/utils/customEndpointFunctions.js");
/* harmony import */ var _endpointFunctions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./endpointFunctions */ "../../node_modules/@smithy/util-endpoints/dist-es/utils/endpointFunctions.js");
/* harmony import */ var _evaluateExpression__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./evaluateExpression */ "../../node_modules/@smithy/util-endpoints/dist-es/utils/evaluateExpression.js");



const callFunction = ({ fn, argv }, options) => {
    const evaluatedArgs = argv.map((arg) => ["boolean", "number"].includes(typeof arg) ? arg : (0,_evaluateExpression__WEBPACK_IMPORTED_MODULE_2__.evaluateExpression)(arg, "arg", options));
    const fnSegments = fn.split(".");
    if (fnSegments[0] in _customEndpointFunctions__WEBPACK_IMPORTED_MODULE_0__.customEndpointFunctions && fnSegments[1] != null) {
        return _customEndpointFunctions__WEBPACK_IMPORTED_MODULE_0__.customEndpointFunctions[fnSegments[0]][fnSegments[1]](...evaluatedArgs);
    }
    return _endpointFunctions__WEBPACK_IMPORTED_MODULE_1__.endpointFunctions[fn](...evaluatedArgs);
};


/***/ }),

/***/ "../../node_modules/@smithy/util-endpoints/dist-es/utils/customEndpointFunctions.js":
/*!******************************************************************************************!*\
  !*** ../../node_modules/@smithy/util-endpoints/dist-es/utils/customEndpointFunctions.js ***!
  \******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   customEndpointFunctions: () => (/* binding */ customEndpointFunctions)
/* harmony export */ });
const customEndpointFunctions = {};


/***/ }),

/***/ "../../node_modules/@smithy/util-endpoints/dist-es/utils/endpointFunctions.js":
/*!************************************************************************************!*\
  !*** ../../node_modules/@smithy/util-endpoints/dist-es/utils/endpointFunctions.js ***!
  \************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   endpointFunctions: () => (/* binding */ endpointFunctions)
/* harmony export */ });
/* harmony import */ var _lib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../lib */ "../../node_modules/@smithy/util-endpoints/dist-es/lib/index.js");

const endpointFunctions = {
    booleanEquals: _lib__WEBPACK_IMPORTED_MODULE_0__.booleanEquals,
    getAttr: _lib__WEBPACK_IMPORTED_MODULE_0__.getAttr,
    isSet: _lib__WEBPACK_IMPORTED_MODULE_0__.isSet,
    isValidHostLabel: _lib__WEBPACK_IMPORTED_MODULE_0__.isValidHostLabel,
    not: _lib__WEBPACK_IMPORTED_MODULE_0__.not,
    parseURL: _lib__WEBPACK_IMPORTED_MODULE_0__.parseURL,
    stringEquals: _lib__WEBPACK_IMPORTED_MODULE_0__.stringEquals,
    substring: _lib__WEBPACK_IMPORTED_MODULE_0__.substring,
    uriEncode: _lib__WEBPACK_IMPORTED_MODULE_0__.uriEncode,
};


/***/ }),

/***/ "../../node_modules/@smithy/util-endpoints/dist-es/utils/evaluateCondition.js":
/*!************************************************************************************!*\
  !*** ../../node_modules/@smithy/util-endpoints/dist-es/utils/evaluateCondition.js ***!
  \************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   evaluateCondition: () => (/* binding */ evaluateCondition)
/* harmony export */ });
/* harmony import */ var _debug__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../debug */ "../../node_modules/@smithy/util-endpoints/dist-es/debug/index.js");
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../types */ "../../node_modules/@smithy/util-endpoints/dist-es/types/index.js");
/* harmony import */ var _callFunction__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./callFunction */ "../../node_modules/@smithy/util-endpoints/dist-es/utils/callFunction.js");



const evaluateCondition = ({ assign, ...fnArgs }, options) => {
    if (assign && assign in options.referenceRecord) {
        throw new _types__WEBPACK_IMPORTED_MODULE_1__.EndpointError(`'${assign}' is already defined in Reference Record.`);
    }
    const value = (0,_callFunction__WEBPACK_IMPORTED_MODULE_2__.callFunction)(fnArgs, options);
    options.logger?.debug?.(`${_debug__WEBPACK_IMPORTED_MODULE_0__.debugId} evaluateCondition: ${(0,_debug__WEBPACK_IMPORTED_MODULE_0__.toDebugString)(fnArgs)} = ${(0,_debug__WEBPACK_IMPORTED_MODULE_0__.toDebugString)(value)}`);
    return {
        result: value === "" ? true : !!value,
        ...(assign != null && { toAssign: { name: assign, value } }),
    };
};


/***/ }),

/***/ "../../node_modules/@smithy/util-endpoints/dist-es/utils/evaluateConditions.js":
/*!*************************************************************************************!*\
  !*** ../../node_modules/@smithy/util-endpoints/dist-es/utils/evaluateConditions.js ***!
  \*************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   evaluateConditions: () => (/* binding */ evaluateConditions)
/* harmony export */ });
/* harmony import */ var _debug__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../debug */ "../../node_modules/@smithy/util-endpoints/dist-es/debug/index.js");
/* harmony import */ var _evaluateCondition__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./evaluateCondition */ "../../node_modules/@smithy/util-endpoints/dist-es/utils/evaluateCondition.js");


const evaluateConditions = (conditions = [], options) => {
    const conditionsReferenceRecord = {};
    for (const condition of conditions) {
        const { result, toAssign } = (0,_evaluateCondition__WEBPACK_IMPORTED_MODULE_1__.evaluateCondition)(condition, {
            ...options,
            referenceRecord: {
                ...options.referenceRecord,
                ...conditionsReferenceRecord,
            },
        });
        if (!result) {
            return { result };
        }
        if (toAssign) {
            conditionsReferenceRecord[toAssign.name] = toAssign.value;
            options.logger?.debug?.(`${_debug__WEBPACK_IMPORTED_MODULE_0__.debugId} assign: ${toAssign.name} := ${(0,_debug__WEBPACK_IMPORTED_MODULE_0__.toDebugString)(toAssign.value)}`);
        }
    }
    return { result: true, referenceRecord: conditionsReferenceRecord };
};


/***/ }),

/***/ "../../node_modules/@smithy/util-endpoints/dist-es/utils/evaluateEndpointRule.js":
/*!***************************************************************************************!*\
  !*** ../../node_modules/@smithy/util-endpoints/dist-es/utils/evaluateEndpointRule.js ***!
  \***************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   evaluateEndpointRule: () => (/* binding */ evaluateEndpointRule)
/* harmony export */ });
/* harmony import */ var _debug__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../debug */ "../../node_modules/@smithy/util-endpoints/dist-es/debug/index.js");
/* harmony import */ var _evaluateConditions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./evaluateConditions */ "../../node_modules/@smithy/util-endpoints/dist-es/utils/evaluateConditions.js");
/* harmony import */ var _getEndpointHeaders__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./getEndpointHeaders */ "../../node_modules/@smithy/util-endpoints/dist-es/utils/getEndpointHeaders.js");
/* harmony import */ var _getEndpointProperties__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./getEndpointProperties */ "../../node_modules/@smithy/util-endpoints/dist-es/utils/getEndpointProperties.js");
/* harmony import */ var _getEndpointUrl__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./getEndpointUrl */ "../../node_modules/@smithy/util-endpoints/dist-es/utils/getEndpointUrl.js");





const evaluateEndpointRule = (endpointRule, options) => {
    const { conditions, endpoint } = endpointRule;
    const { result, referenceRecord } = (0,_evaluateConditions__WEBPACK_IMPORTED_MODULE_1__.evaluateConditions)(conditions, options);
    if (!result) {
        return;
    }
    const endpointRuleOptions = {
        ...options,
        referenceRecord: { ...options.referenceRecord, ...referenceRecord },
    };
    const { url, properties, headers } = endpoint;
    options.logger?.debug?.(`${_debug__WEBPACK_IMPORTED_MODULE_0__.debugId} Resolving endpoint from template: ${(0,_debug__WEBPACK_IMPORTED_MODULE_0__.toDebugString)(endpoint)}`);
    return {
        ...(headers != undefined && {
            headers: (0,_getEndpointHeaders__WEBPACK_IMPORTED_MODULE_2__.getEndpointHeaders)(headers, endpointRuleOptions),
        }),
        ...(properties != undefined && {
            properties: (0,_getEndpointProperties__WEBPACK_IMPORTED_MODULE_3__.getEndpointProperties)(properties, endpointRuleOptions),
        }),
        url: (0,_getEndpointUrl__WEBPACK_IMPORTED_MODULE_4__.getEndpointUrl)(url, endpointRuleOptions),
    };
};


/***/ }),

/***/ "../../node_modules/@smithy/util-endpoints/dist-es/utils/evaluateErrorRule.js":
/*!************************************************************************************!*\
  !*** ../../node_modules/@smithy/util-endpoints/dist-es/utils/evaluateErrorRule.js ***!
  \************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   evaluateErrorRule: () => (/* binding */ evaluateErrorRule)
/* harmony export */ });
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../types */ "../../node_modules/@smithy/util-endpoints/dist-es/types/index.js");
/* harmony import */ var _evaluateConditions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./evaluateConditions */ "../../node_modules/@smithy/util-endpoints/dist-es/utils/evaluateConditions.js");
/* harmony import */ var _evaluateExpression__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./evaluateExpression */ "../../node_modules/@smithy/util-endpoints/dist-es/utils/evaluateExpression.js");



const evaluateErrorRule = (errorRule, options) => {
    const { conditions, error } = errorRule;
    const { result, referenceRecord } = (0,_evaluateConditions__WEBPACK_IMPORTED_MODULE_1__.evaluateConditions)(conditions, options);
    if (!result) {
        return;
    }
    throw new _types__WEBPACK_IMPORTED_MODULE_0__.EndpointError((0,_evaluateExpression__WEBPACK_IMPORTED_MODULE_2__.evaluateExpression)(error, "Error", {
        ...options,
        referenceRecord: { ...options.referenceRecord, ...referenceRecord },
    }));
};


/***/ }),

/***/ "../../node_modules/@smithy/util-endpoints/dist-es/utils/evaluateExpression.js":
/*!*************************************************************************************!*\
  !*** ../../node_modules/@smithy/util-endpoints/dist-es/utils/evaluateExpression.js ***!
  \*************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   evaluateExpression: () => (/* binding */ evaluateExpression)
/* harmony export */ });
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../types */ "../../node_modules/@smithy/util-endpoints/dist-es/types/index.js");
/* harmony import */ var _callFunction__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./callFunction */ "../../node_modules/@smithy/util-endpoints/dist-es/utils/callFunction.js");
/* harmony import */ var _evaluateTemplate__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./evaluateTemplate */ "../../node_modules/@smithy/util-endpoints/dist-es/utils/evaluateTemplate.js");
/* harmony import */ var _getReferenceValue__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./getReferenceValue */ "../../node_modules/@smithy/util-endpoints/dist-es/utils/getReferenceValue.js");




const evaluateExpression = (obj, keyName, options) => {
    if (typeof obj === "string") {
        return (0,_evaluateTemplate__WEBPACK_IMPORTED_MODULE_2__.evaluateTemplate)(obj, options);
    }
    else if (obj["fn"]) {
        return (0,_callFunction__WEBPACK_IMPORTED_MODULE_1__.callFunction)(obj, options);
    }
    else if (obj["ref"]) {
        return (0,_getReferenceValue__WEBPACK_IMPORTED_MODULE_3__.getReferenceValue)(obj, options);
    }
    throw new _types__WEBPACK_IMPORTED_MODULE_0__.EndpointError(`'${keyName}': ${String(obj)} is not a string, function or reference.`);
};


/***/ }),

/***/ "../../node_modules/@smithy/util-endpoints/dist-es/utils/evaluateRules.js":
/*!********************************************************************************!*\
  !*** ../../node_modules/@smithy/util-endpoints/dist-es/utils/evaluateRules.js ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   evaluateRules: () => (/* binding */ evaluateRules)
/* harmony export */ });
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../types */ "../../node_modules/@smithy/util-endpoints/dist-es/types/index.js");
/* harmony import */ var _evaluateEndpointRule__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./evaluateEndpointRule */ "../../node_modules/@smithy/util-endpoints/dist-es/utils/evaluateEndpointRule.js");
/* harmony import */ var _evaluateErrorRule__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./evaluateErrorRule */ "../../node_modules/@smithy/util-endpoints/dist-es/utils/evaluateErrorRule.js");
/* harmony import */ var _evaluateTreeRule__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./evaluateTreeRule */ "../../node_modules/@smithy/util-endpoints/dist-es/utils/evaluateTreeRule.js");




const evaluateRules = (rules, options) => {
    for (const rule of rules) {
        if (rule.type === "endpoint") {
            const endpointOrUndefined = (0,_evaluateEndpointRule__WEBPACK_IMPORTED_MODULE_1__.evaluateEndpointRule)(rule, options);
            if (endpointOrUndefined) {
                return endpointOrUndefined;
            }
        }
        else if (rule.type === "error") {
            (0,_evaluateErrorRule__WEBPACK_IMPORTED_MODULE_2__.evaluateErrorRule)(rule, options);
        }
        else if (rule.type === "tree") {
            const endpointOrUndefined = (0,_evaluateTreeRule__WEBPACK_IMPORTED_MODULE_3__.evaluateTreeRule)(rule, options);
            if (endpointOrUndefined) {
                return endpointOrUndefined;
            }
        }
        else {
            throw new _types__WEBPACK_IMPORTED_MODULE_0__.EndpointError(`Unknown endpoint rule: ${rule}`);
        }
    }
    throw new _types__WEBPACK_IMPORTED_MODULE_0__.EndpointError(`Rules evaluation failed`);
};


/***/ }),

/***/ "../../node_modules/@smithy/util-endpoints/dist-es/utils/evaluateTemplate.js":
/*!***********************************************************************************!*\
  !*** ../../node_modules/@smithy/util-endpoints/dist-es/utils/evaluateTemplate.js ***!
  \***********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   evaluateTemplate: () => (/* binding */ evaluateTemplate)
/* harmony export */ });
/* harmony import */ var _lib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../lib */ "../../node_modules/@smithy/util-endpoints/dist-es/lib/index.js");

const evaluateTemplate = (template, options) => {
    const evaluatedTemplateArr = [];
    const templateContext = {
        ...options.endpointParams,
        ...options.referenceRecord,
    };
    let currentIndex = 0;
    while (currentIndex < template.length) {
        const openingBraceIndex = template.indexOf("{", currentIndex);
        if (openingBraceIndex === -1) {
            evaluatedTemplateArr.push(template.slice(currentIndex));
            break;
        }
        evaluatedTemplateArr.push(template.slice(currentIndex, openingBraceIndex));
        const closingBraceIndex = template.indexOf("}", openingBraceIndex);
        if (closingBraceIndex === -1) {
            evaluatedTemplateArr.push(template.slice(openingBraceIndex));
            break;
        }
        if (template[openingBraceIndex + 1] === "{" && template[closingBraceIndex + 1] === "}") {
            evaluatedTemplateArr.push(template.slice(openingBraceIndex + 1, closingBraceIndex));
            currentIndex = closingBraceIndex + 2;
        }
        const parameterName = template.substring(openingBraceIndex + 1, closingBraceIndex);
        if (parameterName.includes("#")) {
            const [refName, attrName] = parameterName.split("#");
            evaluatedTemplateArr.push((0,_lib__WEBPACK_IMPORTED_MODULE_0__.getAttr)(templateContext[refName], attrName));
        }
        else {
            evaluatedTemplateArr.push(templateContext[parameterName]);
        }
        currentIndex = closingBraceIndex + 1;
    }
    return evaluatedTemplateArr.join("");
};


/***/ }),

/***/ "../../node_modules/@smithy/util-endpoints/dist-es/utils/evaluateTreeRule.js":
/*!***********************************************************************************!*\
  !*** ../../node_modules/@smithy/util-endpoints/dist-es/utils/evaluateTreeRule.js ***!
  \***********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   evaluateTreeRule: () => (/* binding */ evaluateTreeRule)
/* harmony export */ });
/* harmony import */ var _evaluateConditions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./evaluateConditions */ "../../node_modules/@smithy/util-endpoints/dist-es/utils/evaluateConditions.js");
/* harmony import */ var _evaluateRules__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./evaluateRules */ "../../node_modules/@smithy/util-endpoints/dist-es/utils/evaluateRules.js");


const evaluateTreeRule = (treeRule, options) => {
    const { conditions, rules } = treeRule;
    const { result, referenceRecord } = (0,_evaluateConditions__WEBPACK_IMPORTED_MODULE_0__.evaluateConditions)(conditions, options);
    if (!result) {
        return;
    }
    return (0,_evaluateRules__WEBPACK_IMPORTED_MODULE_1__.evaluateRules)(rules, {
        ...options,
        referenceRecord: { ...options.referenceRecord, ...referenceRecord },
    });
};


/***/ }),

/***/ "../../node_modules/@smithy/util-endpoints/dist-es/utils/getEndpointHeaders.js":
/*!*************************************************************************************!*\
  !*** ../../node_modules/@smithy/util-endpoints/dist-es/utils/getEndpointHeaders.js ***!
  \*************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getEndpointHeaders: () => (/* binding */ getEndpointHeaders)
/* harmony export */ });
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../types */ "../../node_modules/@smithy/util-endpoints/dist-es/types/index.js");
/* harmony import */ var _evaluateExpression__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./evaluateExpression */ "../../node_modules/@smithy/util-endpoints/dist-es/utils/evaluateExpression.js");


const getEndpointHeaders = (headers, options) => Object.entries(headers).reduce((acc, [headerKey, headerVal]) => ({
    ...acc,
    [headerKey]: headerVal.map((headerValEntry) => {
        const processedExpr = (0,_evaluateExpression__WEBPACK_IMPORTED_MODULE_1__.evaluateExpression)(headerValEntry, "Header value entry", options);
        if (typeof processedExpr !== "string") {
            throw new _types__WEBPACK_IMPORTED_MODULE_0__.EndpointError(`Header '${headerKey}' value '${processedExpr}' is not a string`);
        }
        return processedExpr;
    }),
}), {});


/***/ }),

/***/ "../../node_modules/@smithy/util-endpoints/dist-es/utils/getEndpointProperties.js":
/*!****************************************************************************************!*\
  !*** ../../node_modules/@smithy/util-endpoints/dist-es/utils/getEndpointProperties.js ***!
  \****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getEndpointProperties: () => (/* binding */ getEndpointProperties)
/* harmony export */ });
/* harmony import */ var _getEndpointProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getEndpointProperty */ "../../node_modules/@smithy/util-endpoints/dist-es/utils/getEndpointProperty.js");

const getEndpointProperties = (properties, options) => Object.entries(properties).reduce((acc, [propertyKey, propertyVal]) => ({
    ...acc,
    [propertyKey]: (0,_getEndpointProperty__WEBPACK_IMPORTED_MODULE_0__.getEndpointProperty)(propertyVal, options),
}), {});


/***/ }),

/***/ "../../node_modules/@smithy/util-endpoints/dist-es/utils/getEndpointProperty.js":
/*!**************************************************************************************!*\
  !*** ../../node_modules/@smithy/util-endpoints/dist-es/utils/getEndpointProperty.js ***!
  \**************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getEndpointProperty: () => (/* binding */ getEndpointProperty)
/* harmony export */ });
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../types */ "../../node_modules/@smithy/util-endpoints/dist-es/types/index.js");
/* harmony import */ var _evaluateTemplate__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./evaluateTemplate */ "../../node_modules/@smithy/util-endpoints/dist-es/utils/evaluateTemplate.js");
/* harmony import */ var _getEndpointProperties__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./getEndpointProperties */ "../../node_modules/@smithy/util-endpoints/dist-es/utils/getEndpointProperties.js");



const getEndpointProperty = (property, options) => {
    if (Array.isArray(property)) {
        return property.map((propertyEntry) => getEndpointProperty(propertyEntry, options));
    }
    switch (typeof property) {
        case "string":
            return (0,_evaluateTemplate__WEBPACK_IMPORTED_MODULE_1__.evaluateTemplate)(property, options);
        case "object":
            if (property === null) {
                throw new _types__WEBPACK_IMPORTED_MODULE_0__.EndpointError(`Unexpected endpoint property: ${property}`);
            }
            return (0,_getEndpointProperties__WEBPACK_IMPORTED_MODULE_2__.getEndpointProperties)(property, options);
        case "boolean":
            return property;
        default:
            throw new _types__WEBPACK_IMPORTED_MODULE_0__.EndpointError(`Unexpected endpoint property type: ${typeof property}`);
    }
};


/***/ }),

/***/ "../../node_modules/@smithy/util-endpoints/dist-es/utils/getEndpointUrl.js":
/*!*********************************************************************************!*\
  !*** ../../node_modules/@smithy/util-endpoints/dist-es/utils/getEndpointUrl.js ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getEndpointUrl: () => (/* binding */ getEndpointUrl)
/* harmony export */ });
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../types */ "../../node_modules/@smithy/util-endpoints/dist-es/types/index.js");
/* harmony import */ var _evaluateExpression__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./evaluateExpression */ "../../node_modules/@smithy/util-endpoints/dist-es/utils/evaluateExpression.js");


const getEndpointUrl = (endpointUrl, options) => {
    const expression = (0,_evaluateExpression__WEBPACK_IMPORTED_MODULE_1__.evaluateExpression)(endpointUrl, "Endpoint URL", options);
    if (typeof expression === "string") {
        try {
            return new URL(expression);
        }
        catch (error) {
            console.error(`Failed to construct URL with ${expression}`, error);
            throw error;
        }
    }
    throw new _types__WEBPACK_IMPORTED_MODULE_0__.EndpointError(`Endpoint URL must be a string, got ${typeof expression}`);
};


/***/ }),

/***/ "../../node_modules/@smithy/util-endpoints/dist-es/utils/getReferenceValue.js":
/*!************************************************************************************!*\
  !*** ../../node_modules/@smithy/util-endpoints/dist-es/utils/getReferenceValue.js ***!
  \************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getReferenceValue: () => (/* binding */ getReferenceValue)
/* harmony export */ });
const getReferenceValue = ({ ref }, options) => {
    const referenceRecord = {
        ...options.endpointParams,
        ...options.referenceRecord,
    };
    return referenceRecord[ref];
};


/***/ }),

/***/ "../../node_modules/@smithy/util-endpoints/dist-es/utils/index.js":
/*!************************************************************************!*\
  !*** ../../node_modules/@smithy/util-endpoints/dist-es/utils/index.js ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   customEndpointFunctions: () => (/* reexport safe */ _customEndpointFunctions__WEBPACK_IMPORTED_MODULE_0__.customEndpointFunctions),
/* harmony export */   evaluateRules: () => (/* reexport safe */ _evaluateRules__WEBPACK_IMPORTED_MODULE_1__.evaluateRules)
/* harmony export */ });
/* harmony import */ var _customEndpointFunctions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./customEndpointFunctions */ "../../node_modules/@smithy/util-endpoints/dist-es/utils/customEndpointFunctions.js");
/* harmony import */ var _evaluateRules__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./evaluateRules */ "../../node_modules/@smithy/util-endpoints/dist-es/utils/evaluateRules.js");




/***/ }),

/***/ "../../node_modules/@smithy/util-hex-encoding/dist-es/index.js":
/*!*********************************************************************!*\
  !*** ../../node_modules/@smithy/util-hex-encoding/dist-es/index.js ***!
  \*********************************************************************/
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

/***/ "../../node_modules/@smithy/util-middleware/dist-es/getSmithyContext.js":
/*!******************************************************************************!*\
  !*** ../../node_modules/@smithy/util-middleware/dist-es/getSmithyContext.js ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getSmithyContext: () => (/* binding */ getSmithyContext)
/* harmony export */ });
/* harmony import */ var _smithy_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @smithy/types */ "../../node_modules/@smithy/types/dist-es/index.js");

const getSmithyContext = (context) => context[_smithy_types__WEBPACK_IMPORTED_MODULE_0__.SMITHY_CONTEXT_KEY] || (context[_smithy_types__WEBPACK_IMPORTED_MODULE_0__.SMITHY_CONTEXT_KEY] = {});


/***/ }),

/***/ "../../node_modules/@smithy/util-middleware/dist-es/index.js":
/*!*******************************************************************!*\
  !*** ../../node_modules/@smithy/util-middleware/dist-es/index.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getSmithyContext: () => (/* reexport safe */ _getSmithyContext__WEBPACK_IMPORTED_MODULE_0__.getSmithyContext),
/* harmony export */   normalizeProvider: () => (/* reexport safe */ _normalizeProvider__WEBPACK_IMPORTED_MODULE_1__.normalizeProvider)
/* harmony export */ });
/* harmony import */ var _getSmithyContext__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getSmithyContext */ "../../node_modules/@smithy/util-middleware/dist-es/getSmithyContext.js");
/* harmony import */ var _normalizeProvider__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./normalizeProvider */ "../../node_modules/@smithy/util-middleware/dist-es/normalizeProvider.js");




/***/ }),

/***/ "../../node_modules/@smithy/util-middleware/dist-es/normalizeProvider.js":
/*!*******************************************************************************!*\
  !*** ../../node_modules/@smithy/util-middleware/dist-es/normalizeProvider.js ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   normalizeProvider: () => (/* binding */ normalizeProvider)
/* harmony export */ });
const normalizeProvider = (input) => {
    if (typeof input === "function")
        return input;
    const promisified = Promise.resolve(input);
    return () => promisified;
};


/***/ }),

/***/ "../../node_modules/@smithy/util-retry/dist-es/AdaptiveRetryStrategy.js":
/*!******************************************************************************!*\
  !*** ../../node_modules/@smithy/util-retry/dist-es/AdaptiveRetryStrategy.js ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AdaptiveRetryStrategy: () => (/* binding */ AdaptiveRetryStrategy)
/* harmony export */ });
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./config */ "../../node_modules/@smithy/util-retry/dist-es/config.js");
/* harmony import */ var _DefaultRateLimiter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./DefaultRateLimiter */ "../../node_modules/@smithy/util-retry/dist-es/DefaultRateLimiter.js");
/* harmony import */ var _StandardRetryStrategy__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./StandardRetryStrategy */ "../../node_modules/@smithy/util-retry/dist-es/StandardRetryStrategy.js");



class AdaptiveRetryStrategy {
    constructor(maxAttemptsProvider, options) {
        this.maxAttemptsProvider = maxAttemptsProvider;
        this.mode = _config__WEBPACK_IMPORTED_MODULE_0__.RETRY_MODES.ADAPTIVE;
        const { rateLimiter } = options ?? {};
        this.rateLimiter = rateLimiter ?? new _DefaultRateLimiter__WEBPACK_IMPORTED_MODULE_1__.DefaultRateLimiter();
        this.standardRetryStrategy = new _StandardRetryStrategy__WEBPACK_IMPORTED_MODULE_2__.StandardRetryStrategy(maxAttemptsProvider);
    }
    async acquireInitialRetryToken(retryTokenScope) {
        await this.rateLimiter.getSendToken();
        return this.standardRetryStrategy.acquireInitialRetryToken(retryTokenScope);
    }
    async refreshRetryTokenForRetry(tokenToRenew, errorInfo) {
        this.rateLimiter.updateClientSendingRate(errorInfo);
        return this.standardRetryStrategy.refreshRetryTokenForRetry(tokenToRenew, errorInfo);
    }
    recordSuccess(token) {
        this.rateLimiter.updateClientSendingRate({});
        this.standardRetryStrategy.recordSuccess(token);
    }
}


/***/ }),

/***/ "../../node_modules/@smithy/util-retry/dist-es/ConfiguredRetryStrategy.js":
/*!********************************************************************************!*\
  !*** ../../node_modules/@smithy/util-retry/dist-es/ConfiguredRetryStrategy.js ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ConfiguredRetryStrategy: () => (/* binding */ ConfiguredRetryStrategy)
/* harmony export */ });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants */ "../../node_modules/@smithy/util-retry/dist-es/constants.js");
/* harmony import */ var _StandardRetryStrategy__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./StandardRetryStrategy */ "../../node_modules/@smithy/util-retry/dist-es/StandardRetryStrategy.js");


class ConfiguredRetryStrategy extends _StandardRetryStrategy__WEBPACK_IMPORTED_MODULE_1__.StandardRetryStrategy {
    constructor(maxAttempts, computeNextBackoffDelay = _constants__WEBPACK_IMPORTED_MODULE_0__.DEFAULT_RETRY_DELAY_BASE) {
        super(typeof maxAttempts === "function" ? maxAttempts : async () => maxAttempts);
        if (typeof computeNextBackoffDelay === "number") {
            this.computeNextBackoffDelay = () => computeNextBackoffDelay;
        }
        else {
            this.computeNextBackoffDelay = computeNextBackoffDelay;
        }
    }
    async refreshRetryTokenForRetry(tokenToRenew, errorInfo) {
        const token = await super.refreshRetryTokenForRetry(tokenToRenew, errorInfo);
        token.getRetryDelay = () => this.computeNextBackoffDelay(token.getRetryCount());
        return token;
    }
}


/***/ }),

/***/ "../../node_modules/@smithy/util-retry/dist-es/DefaultRateLimiter.js":
/*!***************************************************************************!*\
  !*** ../../node_modules/@smithy/util-retry/dist-es/DefaultRateLimiter.js ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DefaultRateLimiter: () => (/* binding */ DefaultRateLimiter)
/* harmony export */ });
/* harmony import */ var _smithy_service_error_classification__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @smithy/service-error-classification */ "../../node_modules/@smithy/service-error-classification/dist-es/index.js");

class DefaultRateLimiter {
    constructor(options) {
        this.currentCapacity = 0;
        this.enabled = false;
        this.lastMaxRate = 0;
        this.measuredTxRate = 0;
        this.requestCount = 0;
        this.lastTimestamp = 0;
        this.timeWindow = 0;
        this.beta = options?.beta ?? 0.7;
        this.minCapacity = options?.minCapacity ?? 1;
        this.minFillRate = options?.minFillRate ?? 0.5;
        this.scaleConstant = options?.scaleConstant ?? 0.4;
        this.smooth = options?.smooth ?? 0.8;
        const currentTimeInSeconds = this.getCurrentTimeInSeconds();
        this.lastThrottleTime = currentTimeInSeconds;
        this.lastTxRateBucket = Math.floor(this.getCurrentTimeInSeconds());
        this.fillRate = this.minFillRate;
        this.maxCapacity = this.minCapacity;
    }
    getCurrentTimeInSeconds() {
        return Date.now() / 1000;
    }
    async getSendToken() {
        return this.acquireTokenBucket(1);
    }
    async acquireTokenBucket(amount) {
        if (!this.enabled) {
            return;
        }
        this.refillTokenBucket();
        if (amount > this.currentCapacity) {
            const delay = ((amount - this.currentCapacity) / this.fillRate) * 1000;
            await new Promise((resolve) => setTimeout(resolve, delay));
        }
        this.currentCapacity = this.currentCapacity - amount;
    }
    refillTokenBucket() {
        const timestamp = this.getCurrentTimeInSeconds();
        if (!this.lastTimestamp) {
            this.lastTimestamp = timestamp;
            return;
        }
        const fillAmount = (timestamp - this.lastTimestamp) * this.fillRate;
        this.currentCapacity = Math.min(this.maxCapacity, this.currentCapacity + fillAmount);
        this.lastTimestamp = timestamp;
    }
    updateClientSendingRate(response) {
        let calculatedRate;
        this.updateMeasuredRate();
        if ((0,_smithy_service_error_classification__WEBPACK_IMPORTED_MODULE_0__.isThrottlingError)(response)) {
            const rateToUse = !this.enabled ? this.measuredTxRate : Math.min(this.measuredTxRate, this.fillRate);
            this.lastMaxRate = rateToUse;
            this.calculateTimeWindow();
            this.lastThrottleTime = this.getCurrentTimeInSeconds();
            calculatedRate = this.cubicThrottle(rateToUse);
            this.enableTokenBucket();
        }
        else {
            this.calculateTimeWindow();
            calculatedRate = this.cubicSuccess(this.getCurrentTimeInSeconds());
        }
        const newRate = Math.min(calculatedRate, 2 * this.measuredTxRate);
        this.updateTokenBucketRate(newRate);
    }
    calculateTimeWindow() {
        this.timeWindow = this.getPrecise(Math.pow((this.lastMaxRate * (1 - this.beta)) / this.scaleConstant, 1 / 3));
    }
    cubicThrottle(rateToUse) {
        return this.getPrecise(rateToUse * this.beta);
    }
    cubicSuccess(timestamp) {
        return this.getPrecise(this.scaleConstant * Math.pow(timestamp - this.lastThrottleTime - this.timeWindow, 3) + this.lastMaxRate);
    }
    enableTokenBucket() {
        this.enabled = true;
    }
    updateTokenBucketRate(newRate) {
        this.refillTokenBucket();
        this.fillRate = Math.max(newRate, this.minFillRate);
        this.maxCapacity = Math.max(newRate, this.minCapacity);
        this.currentCapacity = Math.min(this.currentCapacity, this.maxCapacity);
    }
    updateMeasuredRate() {
        const t = this.getCurrentTimeInSeconds();
        const timeBucket = Math.floor(t * 2) / 2;
        this.requestCount++;
        if (timeBucket > this.lastTxRateBucket) {
            const currentRate = this.requestCount / (timeBucket - this.lastTxRateBucket);
            this.measuredTxRate = this.getPrecise(currentRate * this.smooth + this.measuredTxRate * (1 - this.smooth));
            this.requestCount = 0;
            this.lastTxRateBucket = timeBucket;
        }
    }
    getPrecise(num) {
        return parseFloat(num.toFixed(8));
    }
}


/***/ }),

/***/ "../../node_modules/@smithy/util-retry/dist-es/StandardRetryStrategy.js":
/*!******************************************************************************!*\
  !*** ../../node_modules/@smithy/util-retry/dist-es/StandardRetryStrategy.js ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   StandardRetryStrategy: () => (/* binding */ StandardRetryStrategy)
/* harmony export */ });
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./config */ "../../node_modules/@smithy/util-retry/dist-es/config.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./constants */ "../../node_modules/@smithy/util-retry/dist-es/constants.js");
/* harmony import */ var _defaultRetryBackoffStrategy__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./defaultRetryBackoffStrategy */ "../../node_modules/@smithy/util-retry/dist-es/defaultRetryBackoffStrategy.js");
/* harmony import */ var _defaultRetryToken__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./defaultRetryToken */ "../../node_modules/@smithy/util-retry/dist-es/defaultRetryToken.js");




class StandardRetryStrategy {
    constructor(maxAttempts) {
        this.maxAttempts = maxAttempts;
        this.mode = _config__WEBPACK_IMPORTED_MODULE_0__.RETRY_MODES.STANDARD;
        this.capacity = _constants__WEBPACK_IMPORTED_MODULE_1__.INITIAL_RETRY_TOKENS;
        this.retryBackoffStrategy = (0,_defaultRetryBackoffStrategy__WEBPACK_IMPORTED_MODULE_2__.getDefaultRetryBackoffStrategy)();
        this.maxAttemptsProvider = typeof maxAttempts === "function" ? maxAttempts : async () => maxAttempts;
    }
    async acquireInitialRetryToken(retryTokenScope) {
        return (0,_defaultRetryToken__WEBPACK_IMPORTED_MODULE_3__.createDefaultRetryToken)({
            retryDelay: _constants__WEBPACK_IMPORTED_MODULE_1__.DEFAULT_RETRY_DELAY_BASE,
            retryCount: 0,
        });
    }
    async refreshRetryTokenForRetry(token, errorInfo) {
        const maxAttempts = await this.getMaxAttempts();
        if (this.shouldRetry(token, errorInfo, maxAttempts)) {
            const errorType = errorInfo.errorType;
            this.retryBackoffStrategy.setDelayBase(errorType === "THROTTLING" ? _constants__WEBPACK_IMPORTED_MODULE_1__.THROTTLING_RETRY_DELAY_BASE : _constants__WEBPACK_IMPORTED_MODULE_1__.DEFAULT_RETRY_DELAY_BASE);
            const delayFromErrorType = this.retryBackoffStrategy.computeNextBackoffDelay(token.getRetryCount());
            const retryDelay = errorInfo.retryAfterHint
                ? Math.max(errorInfo.retryAfterHint.getTime() - Date.now() || 0, delayFromErrorType)
                : delayFromErrorType;
            const capacityCost = this.getCapacityCost(errorType);
            this.capacity -= capacityCost;
            return (0,_defaultRetryToken__WEBPACK_IMPORTED_MODULE_3__.createDefaultRetryToken)({
                retryDelay,
                retryCount: token.getRetryCount() + 1,
                retryCost: capacityCost,
            });
        }
        throw new Error("No retry token available");
    }
    recordSuccess(token) {
        this.capacity = Math.max(_constants__WEBPACK_IMPORTED_MODULE_1__.INITIAL_RETRY_TOKENS, this.capacity + (token.getRetryCost() ?? _constants__WEBPACK_IMPORTED_MODULE_1__.NO_RETRY_INCREMENT));
    }
    getCapacity() {
        return this.capacity;
    }
    async getMaxAttempts() {
        try {
            return await this.maxAttemptsProvider();
        }
        catch (error) {
            console.warn(`Max attempts provider could not resolve. Using default of ${_config__WEBPACK_IMPORTED_MODULE_0__.DEFAULT_MAX_ATTEMPTS}`);
            return _config__WEBPACK_IMPORTED_MODULE_0__.DEFAULT_MAX_ATTEMPTS;
        }
    }
    shouldRetry(tokenToRenew, errorInfo, maxAttempts) {
        const attempts = tokenToRenew.getRetryCount() + 1;
        return (attempts < maxAttempts &&
            this.capacity >= this.getCapacityCost(errorInfo.errorType) &&
            this.isRetryableError(errorInfo.errorType));
    }
    getCapacityCost(errorType) {
        return errorType === "TRANSIENT" ? _constants__WEBPACK_IMPORTED_MODULE_1__.TIMEOUT_RETRY_COST : _constants__WEBPACK_IMPORTED_MODULE_1__.RETRY_COST;
    }
    isRetryableError(errorType) {
        return errorType === "THROTTLING" || errorType === "TRANSIENT";
    }
}


/***/ }),

/***/ "../../node_modules/@smithy/util-retry/dist-es/config.js":
/*!***************************************************************!*\
  !*** ../../node_modules/@smithy/util-retry/dist-es/config.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DEFAULT_MAX_ATTEMPTS: () => (/* binding */ DEFAULT_MAX_ATTEMPTS),
/* harmony export */   DEFAULT_RETRY_MODE: () => (/* binding */ DEFAULT_RETRY_MODE),
/* harmony export */   RETRY_MODES: () => (/* binding */ RETRY_MODES)
/* harmony export */ });
var RETRY_MODES;
(function (RETRY_MODES) {
    RETRY_MODES["STANDARD"] = "standard";
    RETRY_MODES["ADAPTIVE"] = "adaptive";
})(RETRY_MODES || (RETRY_MODES = {}));
const DEFAULT_MAX_ATTEMPTS = 3;
const DEFAULT_RETRY_MODE = RETRY_MODES.STANDARD;


/***/ }),

/***/ "../../node_modules/@smithy/util-retry/dist-es/constants.js":
/*!******************************************************************!*\
  !*** ../../node_modules/@smithy/util-retry/dist-es/constants.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DEFAULT_RETRY_DELAY_BASE: () => (/* binding */ DEFAULT_RETRY_DELAY_BASE),
/* harmony export */   INITIAL_RETRY_TOKENS: () => (/* binding */ INITIAL_RETRY_TOKENS),
/* harmony export */   INVOCATION_ID_HEADER: () => (/* binding */ INVOCATION_ID_HEADER),
/* harmony export */   MAXIMUM_RETRY_DELAY: () => (/* binding */ MAXIMUM_RETRY_DELAY),
/* harmony export */   NO_RETRY_INCREMENT: () => (/* binding */ NO_RETRY_INCREMENT),
/* harmony export */   REQUEST_HEADER: () => (/* binding */ REQUEST_HEADER),
/* harmony export */   RETRY_COST: () => (/* binding */ RETRY_COST),
/* harmony export */   THROTTLING_RETRY_DELAY_BASE: () => (/* binding */ THROTTLING_RETRY_DELAY_BASE),
/* harmony export */   TIMEOUT_RETRY_COST: () => (/* binding */ TIMEOUT_RETRY_COST)
/* harmony export */ });
const DEFAULT_RETRY_DELAY_BASE = 100;
const MAXIMUM_RETRY_DELAY = 20 * 1000;
const THROTTLING_RETRY_DELAY_BASE = 500;
const INITIAL_RETRY_TOKENS = 500;
const RETRY_COST = 5;
const TIMEOUT_RETRY_COST = 10;
const NO_RETRY_INCREMENT = 1;
const INVOCATION_ID_HEADER = "amz-sdk-invocation-id";
const REQUEST_HEADER = "amz-sdk-request";


/***/ }),

/***/ "../../node_modules/@smithy/util-retry/dist-es/defaultRetryBackoffStrategy.js":
/*!************************************************************************************!*\
  !*** ../../node_modules/@smithy/util-retry/dist-es/defaultRetryBackoffStrategy.js ***!
  \************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getDefaultRetryBackoffStrategy: () => (/* binding */ getDefaultRetryBackoffStrategy)
/* harmony export */ });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants */ "../../node_modules/@smithy/util-retry/dist-es/constants.js");

const getDefaultRetryBackoffStrategy = () => {
    let delayBase = _constants__WEBPACK_IMPORTED_MODULE_0__.DEFAULT_RETRY_DELAY_BASE;
    const computeNextBackoffDelay = (attempts) => {
        return Math.floor(Math.min(_constants__WEBPACK_IMPORTED_MODULE_0__.MAXIMUM_RETRY_DELAY, Math.random() * 2 ** attempts * delayBase));
    };
    const setDelayBase = (delay) => {
        delayBase = delay;
    };
    return {
        computeNextBackoffDelay,
        setDelayBase,
    };
};


/***/ }),

/***/ "../../node_modules/@smithy/util-retry/dist-es/defaultRetryToken.js":
/*!**************************************************************************!*\
  !*** ../../node_modules/@smithy/util-retry/dist-es/defaultRetryToken.js ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createDefaultRetryToken: () => (/* binding */ createDefaultRetryToken)
/* harmony export */ });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants */ "../../node_modules/@smithy/util-retry/dist-es/constants.js");

const createDefaultRetryToken = ({ retryDelay, retryCount, retryCost, }) => {
    const getRetryCount = () => retryCount;
    const getRetryDelay = () => Math.min(_constants__WEBPACK_IMPORTED_MODULE_0__.MAXIMUM_RETRY_DELAY, retryDelay);
    const getRetryCost = () => retryCost;
    return {
        getRetryCount,
        getRetryDelay,
        getRetryCost,
    };
};


/***/ }),

/***/ "../../node_modules/@smithy/util-retry/dist-es/index.js":
/*!**************************************************************!*\
  !*** ../../node_modules/@smithy/util-retry/dist-es/index.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AdaptiveRetryStrategy: () => (/* reexport safe */ _AdaptiveRetryStrategy__WEBPACK_IMPORTED_MODULE_0__.AdaptiveRetryStrategy),
/* harmony export */   ConfiguredRetryStrategy: () => (/* reexport safe */ _ConfiguredRetryStrategy__WEBPACK_IMPORTED_MODULE_1__.ConfiguredRetryStrategy),
/* harmony export */   DEFAULT_MAX_ATTEMPTS: () => (/* reexport safe */ _config__WEBPACK_IMPORTED_MODULE_4__.DEFAULT_MAX_ATTEMPTS),
/* harmony export */   DEFAULT_RETRY_DELAY_BASE: () => (/* reexport safe */ _constants__WEBPACK_IMPORTED_MODULE_5__.DEFAULT_RETRY_DELAY_BASE),
/* harmony export */   DEFAULT_RETRY_MODE: () => (/* reexport safe */ _config__WEBPACK_IMPORTED_MODULE_4__.DEFAULT_RETRY_MODE),
/* harmony export */   DefaultRateLimiter: () => (/* reexport safe */ _DefaultRateLimiter__WEBPACK_IMPORTED_MODULE_2__.DefaultRateLimiter),
/* harmony export */   INITIAL_RETRY_TOKENS: () => (/* reexport safe */ _constants__WEBPACK_IMPORTED_MODULE_5__.INITIAL_RETRY_TOKENS),
/* harmony export */   INVOCATION_ID_HEADER: () => (/* reexport safe */ _constants__WEBPACK_IMPORTED_MODULE_5__.INVOCATION_ID_HEADER),
/* harmony export */   MAXIMUM_RETRY_DELAY: () => (/* reexport safe */ _constants__WEBPACK_IMPORTED_MODULE_5__.MAXIMUM_RETRY_DELAY),
/* harmony export */   NO_RETRY_INCREMENT: () => (/* reexport safe */ _constants__WEBPACK_IMPORTED_MODULE_5__.NO_RETRY_INCREMENT),
/* harmony export */   REQUEST_HEADER: () => (/* reexport safe */ _constants__WEBPACK_IMPORTED_MODULE_5__.REQUEST_HEADER),
/* harmony export */   RETRY_COST: () => (/* reexport safe */ _constants__WEBPACK_IMPORTED_MODULE_5__.RETRY_COST),
/* harmony export */   RETRY_MODES: () => (/* reexport safe */ _config__WEBPACK_IMPORTED_MODULE_4__.RETRY_MODES),
/* harmony export */   StandardRetryStrategy: () => (/* reexport safe */ _StandardRetryStrategy__WEBPACK_IMPORTED_MODULE_3__.StandardRetryStrategy),
/* harmony export */   THROTTLING_RETRY_DELAY_BASE: () => (/* reexport safe */ _constants__WEBPACK_IMPORTED_MODULE_5__.THROTTLING_RETRY_DELAY_BASE),
/* harmony export */   TIMEOUT_RETRY_COST: () => (/* reexport safe */ _constants__WEBPACK_IMPORTED_MODULE_5__.TIMEOUT_RETRY_COST)
/* harmony export */ });
/* harmony import */ var _AdaptiveRetryStrategy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AdaptiveRetryStrategy */ "../../node_modules/@smithy/util-retry/dist-es/AdaptiveRetryStrategy.js");
/* harmony import */ var _ConfiguredRetryStrategy__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ConfiguredRetryStrategy */ "../../node_modules/@smithy/util-retry/dist-es/ConfiguredRetryStrategy.js");
/* harmony import */ var _DefaultRateLimiter__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./DefaultRateLimiter */ "../../node_modules/@smithy/util-retry/dist-es/DefaultRateLimiter.js");
/* harmony import */ var _StandardRetryStrategy__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./StandardRetryStrategy */ "../../node_modules/@smithy/util-retry/dist-es/StandardRetryStrategy.js");
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./config */ "../../node_modules/@smithy/util-retry/dist-es/config.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./constants */ "../../node_modules/@smithy/util-retry/dist-es/constants.js");
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./types */ "../../node_modules/@smithy/util-retry/dist-es/types.js");









/***/ }),

/***/ "../../node_modules/@smithy/util-retry/dist-es/types.js":
/*!**************************************************************!*\
  !*** ../../node_modules/@smithy/util-retry/dist-es/types.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "../../node_modules/@smithy/util-stream/dist-es/blob/Uint8ArrayBlobAdapter.js":
/*!************************************************************************************!*\
  !*** ../../node_modules/@smithy/util-stream/dist-es/blob/Uint8ArrayBlobAdapter.js ***!
  \************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Uint8ArrayBlobAdapter: () => (/* binding */ Uint8ArrayBlobAdapter)
/* harmony export */ });
/* harmony import */ var _transforms__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./transforms */ "../../node_modules/@smithy/util-stream/dist-es/blob/transforms.js");

class Uint8ArrayBlobAdapter extends Uint8Array {
    static fromString(source, encoding = "utf-8") {
        switch (typeof source) {
            case "string":
                return (0,_transforms__WEBPACK_IMPORTED_MODULE_0__.transformFromString)(source, encoding);
            default:
                throw new Error(`Unsupported conversion from ${typeof source} to Uint8ArrayBlobAdapter.`);
        }
    }
    static mutate(source) {
        Object.setPrototypeOf(source, Uint8ArrayBlobAdapter.prototype);
        return source;
    }
    transformToString(encoding = "utf-8") {
        return (0,_transforms__WEBPACK_IMPORTED_MODULE_0__.transformToString)(this, encoding);
    }
}


/***/ }),

/***/ "../../node_modules/@smithy/util-stream/dist-es/blob/transforms.js":
/*!*************************************************************************!*\
  !*** ../../node_modules/@smithy/util-stream/dist-es/blob/transforms.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   transformFromString: () => (/* binding */ transformFromString),
/* harmony export */   transformToString: () => (/* binding */ transformToString)
/* harmony export */ });
/* harmony import */ var _smithy_util_base64__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @smithy/util-base64 */ "../../node_modules/@smithy/util-base64/dist-es/index.js");
/* harmony import */ var _smithy_util_utf8__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @smithy/util-utf8 */ "../../node_modules/@smithy/util-utf8/dist-es/index.js");
/* harmony import */ var _Uint8ArrayBlobAdapter__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Uint8ArrayBlobAdapter */ "../../node_modules/@smithy/util-stream/dist-es/blob/Uint8ArrayBlobAdapter.js");



function transformToString(payload, encoding = "utf-8") {
    if (encoding === "base64") {
        return (0,_smithy_util_base64__WEBPACK_IMPORTED_MODULE_0__.toBase64)(payload);
    }
    return (0,_smithy_util_utf8__WEBPACK_IMPORTED_MODULE_1__.toUtf8)(payload);
}
function transformFromString(str, encoding) {
    if (encoding === "base64") {
        return _Uint8ArrayBlobAdapter__WEBPACK_IMPORTED_MODULE_2__.Uint8ArrayBlobAdapter.mutate((0,_smithy_util_base64__WEBPACK_IMPORTED_MODULE_0__.fromBase64)(str));
    }
    return _Uint8ArrayBlobAdapter__WEBPACK_IMPORTED_MODULE_2__.Uint8ArrayBlobAdapter.mutate((0,_smithy_util_utf8__WEBPACK_IMPORTED_MODULE_1__.fromUtf8)(str));
}


/***/ }),

/***/ "../../node_modules/@smithy/util-stream/dist-es/getAwsChunkedEncodingStream.browser.js":
/*!*********************************************************************************************!*\
  !*** ../../node_modules/@smithy/util-stream/dist-es/getAwsChunkedEncodingStream.browser.js ***!
  \*********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getAwsChunkedEncodingStream: () => (/* binding */ getAwsChunkedEncodingStream)
/* harmony export */ });
const getAwsChunkedEncodingStream = (readableStream, options) => {
    const { base64Encoder, bodyLengthChecker, checksumAlgorithmFn, checksumLocationName, streamHasher } = options;
    const checksumRequired = base64Encoder !== undefined &&
        bodyLengthChecker !== undefined &&
        checksumAlgorithmFn !== undefined &&
        checksumLocationName !== undefined &&
        streamHasher !== undefined;
    const digest = checksumRequired ? streamHasher(checksumAlgorithmFn, readableStream) : undefined;
    const reader = readableStream.getReader();
    return new ReadableStream({
        async pull(controller) {
            const { value, done } = await reader.read();
            if (done) {
                controller.enqueue(`0\r\n`);
                if (checksumRequired) {
                    const checksum = base64Encoder(await digest);
                    controller.enqueue(`${checksumLocationName}:${checksum}\r\n`);
                    controller.enqueue(`\r\n`);
                }
                controller.close();
            }
            else {
                controller.enqueue(`${(bodyLengthChecker(value) || 0).toString(16)}\r\n${value}\r\n`);
            }
        },
    });
};


/***/ }),

/***/ "../../node_modules/@smithy/util-stream/dist-es/headStream.browser.js":
/*!****************************************************************************!*\
  !*** ../../node_modules/@smithy/util-stream/dist-es/headStream.browser.js ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   headStream: () => (/* binding */ headStream)
/* harmony export */ });
async function headStream(stream, bytes) {
    let byteLengthCounter = 0;
    const chunks = [];
    const reader = stream.getReader();
    let isDone = false;
    while (!isDone) {
        const { done, value } = await reader.read();
        if (value) {
            chunks.push(value);
            byteLengthCounter += value?.byteLength ?? 0;
        }
        if (byteLengthCounter >= bytes) {
            break;
        }
        isDone = done;
    }
    reader.releaseLock();
    const collected = new Uint8Array(Math.min(bytes, byteLengthCounter));
    let offset = 0;
    for (const chunk of chunks) {
        if (chunk.byteLength > collected.byteLength - offset) {
            collected.set(chunk.subarray(0, collected.byteLength - offset), offset);
            break;
        }
        else {
            collected.set(chunk, offset);
        }
        offset += chunk.length;
    }
    return collected;
}


/***/ }),

/***/ "../../node_modules/@smithy/util-stream/dist-es/index.js":
/*!***************************************************************!*\
  !*** ../../node_modules/@smithy/util-stream/dist-es/index.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Uint8ArrayBlobAdapter: () => (/* reexport safe */ _blob_Uint8ArrayBlobAdapter__WEBPACK_IMPORTED_MODULE_0__.Uint8ArrayBlobAdapter),
/* harmony export */   getAwsChunkedEncodingStream: () => (/* reexport safe */ _getAwsChunkedEncodingStream__WEBPACK_IMPORTED_MODULE_1__.getAwsChunkedEncodingStream),
/* harmony export */   headStream: () => (/* reexport safe */ _headStream__WEBPACK_IMPORTED_MODULE_4__.headStream),
/* harmony export */   isReadableStream: () => (/* reexport safe */ _stream_type_check__WEBPACK_IMPORTED_MODULE_5__.isReadableStream),
/* harmony export */   sdkStreamMixin: () => (/* reexport safe */ _sdk_stream_mixin__WEBPACK_IMPORTED_MODULE_2__.sdkStreamMixin),
/* harmony export */   splitStream: () => (/* reexport safe */ _splitStream__WEBPACK_IMPORTED_MODULE_3__.splitStream)
/* harmony export */ });
/* harmony import */ var _blob_Uint8ArrayBlobAdapter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./blob/Uint8ArrayBlobAdapter */ "../../node_modules/@smithy/util-stream/dist-es/blob/Uint8ArrayBlobAdapter.js");
/* harmony import */ var _getAwsChunkedEncodingStream__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./getAwsChunkedEncodingStream */ "../../node_modules/@smithy/util-stream/dist-es/getAwsChunkedEncodingStream.browser.js");
/* harmony import */ var _sdk_stream_mixin__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./sdk-stream-mixin */ "../../node_modules/@smithy/util-stream/dist-es/sdk-stream-mixin.browser.js");
/* harmony import */ var _splitStream__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./splitStream */ "../../node_modules/@smithy/util-stream/dist-es/splitStream.browser.js");
/* harmony import */ var _headStream__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./headStream */ "../../node_modules/@smithy/util-stream/dist-es/headStream.browser.js");
/* harmony import */ var _stream_type_check__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./stream-type-check */ "../../node_modules/@smithy/util-stream/dist-es/stream-type-check.js");








/***/ }),

/***/ "../../node_modules/@smithy/util-stream/dist-es/sdk-stream-mixin.browser.js":
/*!**********************************************************************************!*\
  !*** ../../node_modules/@smithy/util-stream/dist-es/sdk-stream-mixin.browser.js ***!
  \**********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   sdkStreamMixin: () => (/* binding */ sdkStreamMixin)
/* harmony export */ });
/* harmony import */ var _smithy_fetch_http_handler__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @smithy/fetch-http-handler */ "../../node_modules/@smithy/fetch-http-handler/dist-es/index.js");
/* harmony import */ var _smithy_util_base64__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @smithy/util-base64 */ "../../node_modules/@smithy/util-base64/dist-es/index.js");
/* harmony import */ var _smithy_util_hex_encoding__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @smithy/util-hex-encoding */ "../../node_modules/@smithy/util-hex-encoding/dist-es/index.js");
/* harmony import */ var _smithy_util_utf8__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @smithy/util-utf8 */ "../../node_modules/@smithy/util-utf8/dist-es/index.js");
/* harmony import */ var _stream_type_check__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./stream-type-check */ "../../node_modules/@smithy/util-stream/dist-es/stream-type-check.js");





const ERR_MSG_STREAM_HAS_BEEN_TRANSFORMED = "The stream has already been transformed.";
const sdkStreamMixin = (stream) => {
    if (!isBlobInstance(stream) && !(0,_stream_type_check__WEBPACK_IMPORTED_MODULE_4__.isReadableStream)(stream)) {
        const name = stream?.__proto__?.constructor?.name || stream;
        throw new Error(`Unexpected stream implementation, expect Blob or ReadableStream, got ${name}`);
    }
    let transformed = false;
    const transformToByteArray = async () => {
        if (transformed) {
            throw new Error(ERR_MSG_STREAM_HAS_BEEN_TRANSFORMED);
        }
        transformed = true;
        return await (0,_smithy_fetch_http_handler__WEBPACK_IMPORTED_MODULE_0__.streamCollector)(stream);
    };
    const blobToWebStream = (blob) => {
        if (typeof blob.stream !== "function") {
            throw new Error("Cannot transform payload Blob to web stream. Please make sure the Blob.stream() is polyfilled.\n" +
                "If you are using React Native, this API is not yet supported, see: https://react-native.canny.io/feature-requests/p/fetch-streaming-body");
        }
        return blob.stream();
    };
    return Object.assign(stream, {
        transformToByteArray: transformToByteArray,
        transformToString: async (encoding) => {
            const buf = await transformToByteArray();
            if (encoding === "base64") {
                return (0,_smithy_util_base64__WEBPACK_IMPORTED_MODULE_1__.toBase64)(buf);
            }
            else if (encoding === "hex") {
                return (0,_smithy_util_hex_encoding__WEBPACK_IMPORTED_MODULE_2__.toHex)(buf);
            }
            else if (encoding === undefined || encoding === "utf8" || encoding === "utf-8") {
                return (0,_smithy_util_utf8__WEBPACK_IMPORTED_MODULE_3__.toUtf8)(buf);
            }
            else if (typeof TextDecoder === "function") {
                return new TextDecoder(encoding).decode(buf);
            }
            else {
                throw new Error("TextDecoder is not available, please make sure polyfill is provided.");
            }
        },
        transformToWebStream: () => {
            if (transformed) {
                throw new Error(ERR_MSG_STREAM_HAS_BEEN_TRANSFORMED);
            }
            transformed = true;
            if (isBlobInstance(stream)) {
                return blobToWebStream(stream);
            }
            else if ((0,_stream_type_check__WEBPACK_IMPORTED_MODULE_4__.isReadableStream)(stream)) {
                return stream;
            }
            else {
                throw new Error(`Cannot transform payload to web stream, got ${stream}`);
            }
        },
    });
};
const isBlobInstance = (stream) => typeof Blob === "function" && stream instanceof Blob;


/***/ }),

/***/ "../../node_modules/@smithy/util-stream/dist-es/splitStream.browser.js":
/*!*****************************************************************************!*\
  !*** ../../node_modules/@smithy/util-stream/dist-es/splitStream.browser.js ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   splitStream: () => (/* binding */ splitStream)
/* harmony export */ });
async function splitStream(stream) {
    if (typeof stream.stream === "function") {
        stream = stream.stream();
    }
    const readableStream = stream;
    return readableStream.tee();
}


/***/ }),

/***/ "../../node_modules/@smithy/util-stream/dist-es/stream-type-check.js":
/*!***************************************************************************!*\
  !*** ../../node_modules/@smithy/util-stream/dist-es/stream-type-check.js ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   isReadableStream: () => (/* binding */ isReadableStream)
/* harmony export */ });
const isReadableStream = (stream) => typeof ReadableStream === "function" &&
    (stream?.constructor?.name === ReadableStream.name || stream instanceof ReadableStream);


/***/ }),

/***/ "../../node_modules/@smithy/util-uri-escape/dist-es/escape-uri-path.js":
/*!*****************************************************************************!*\
  !*** ../../node_modules/@smithy/util-uri-escape/dist-es/escape-uri-path.js ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   escapeUriPath: () => (/* binding */ escapeUriPath)
/* harmony export */ });
/* harmony import */ var _escape_uri__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./escape-uri */ "../../node_modules/@smithy/util-uri-escape/dist-es/escape-uri.js");

const escapeUriPath = (uri) => uri.split("/").map(_escape_uri__WEBPACK_IMPORTED_MODULE_0__.escapeUri).join("/");


/***/ }),

/***/ "../../node_modules/@smithy/util-uri-escape/dist-es/escape-uri.js":
/*!************************************************************************!*\
  !*** ../../node_modules/@smithy/util-uri-escape/dist-es/escape-uri.js ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   escapeUri: () => (/* binding */ escapeUri)
/* harmony export */ });
const escapeUri = (uri) => encodeURIComponent(uri).replace(/[!'()*]/g, hexEncode);
const hexEncode = (c) => `%${c.charCodeAt(0).toString(16).toUpperCase()}`;


/***/ }),

/***/ "../../node_modules/@smithy/util-uri-escape/dist-es/index.js":
/*!*******************************************************************!*\
  !*** ../../node_modules/@smithy/util-uri-escape/dist-es/index.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   escapeUri: () => (/* reexport safe */ _escape_uri__WEBPACK_IMPORTED_MODULE_0__.escapeUri),
/* harmony export */   escapeUriPath: () => (/* reexport safe */ _escape_uri_path__WEBPACK_IMPORTED_MODULE_1__.escapeUriPath)
/* harmony export */ });
/* harmony import */ var _escape_uri__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./escape-uri */ "../../node_modules/@smithy/util-uri-escape/dist-es/escape-uri.js");
/* harmony import */ var _escape_uri_path__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./escape-uri-path */ "../../node_modules/@smithy/util-uri-escape/dist-es/escape-uri-path.js");




/***/ }),

/***/ "../../node_modules/@smithy/util-utf8/dist-es/fromUtf8.browser.js":
/*!************************************************************************!*\
  !*** ../../node_modules/@smithy/util-utf8/dist-es/fromUtf8.browser.js ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
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

"use strict";
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

"use strict";
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

/***/ "../../node_modules/bowser/es5.js":
/*!****************************************!*\
  !*** ../../node_modules/bowser/es5.js ***!
  \****************************************/
/***/ (function(module) {

!function(e,t){ true?module.exports=t():0}(this,(function(){return function(e){var t={};function r(n){if(t[n])return t[n].exports;var i=t[n]={i:n,l:!1,exports:{}};return e[n].call(i.exports,i,i.exports,r),i.l=!0,i.exports}return r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)r.d(n,i,function(t){return e[t]}.bind(null,i));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=90)}({17:function(e,t,r){"use strict";t.__esModule=!0,t.default=void 0;var n=r(18),i=function(){function e(){}return e.getFirstMatch=function(e,t){var r=t.match(e);return r&&r.length>0&&r[1]||""},e.getSecondMatch=function(e,t){var r=t.match(e);return r&&r.length>1&&r[2]||""},e.matchAndReturnConst=function(e,t,r){if(e.test(t))return r},e.getWindowsVersionName=function(e){switch(e){case"NT":return"NT";case"XP":return"XP";case"NT 5.0":return"2000";case"NT 5.1":return"XP";case"NT 5.2":return"2003";case"NT 6.0":return"Vista";case"NT 6.1":return"7";case"NT 6.2":return"8";case"NT 6.3":return"8.1";case"NT 10.0":return"10";default:return}},e.getMacOSVersionName=function(e){var t=e.split(".").splice(0,2).map((function(e){return parseInt(e,10)||0}));if(t.push(0),10===t[0])switch(t[1]){case 5:return"Leopard";case 6:return"Snow Leopard";case 7:return"Lion";case 8:return"Mountain Lion";case 9:return"Mavericks";case 10:return"Yosemite";case 11:return"El Capitan";case 12:return"Sierra";case 13:return"High Sierra";case 14:return"Mojave";case 15:return"Catalina";default:return}},e.getAndroidVersionName=function(e){var t=e.split(".").splice(0,2).map((function(e){return parseInt(e,10)||0}));if(t.push(0),!(1===t[0]&&t[1]<5))return 1===t[0]&&t[1]<6?"Cupcake":1===t[0]&&t[1]>=6?"Donut":2===t[0]&&t[1]<2?"Eclair":2===t[0]&&2===t[1]?"Froyo":2===t[0]&&t[1]>2?"Gingerbread":3===t[0]?"Honeycomb":4===t[0]&&t[1]<1?"Ice Cream Sandwich":4===t[0]&&t[1]<4?"Jelly Bean":4===t[0]&&t[1]>=4?"KitKat":5===t[0]?"Lollipop":6===t[0]?"Marshmallow":7===t[0]?"Nougat":8===t[0]?"Oreo":9===t[0]?"Pie":void 0},e.getVersionPrecision=function(e){return e.split(".").length},e.compareVersions=function(t,r,n){void 0===n&&(n=!1);var i=e.getVersionPrecision(t),s=e.getVersionPrecision(r),a=Math.max(i,s),o=0,u=e.map([t,r],(function(t){var r=a-e.getVersionPrecision(t),n=t+new Array(r+1).join(".0");return e.map(n.split("."),(function(e){return new Array(20-e.length).join("0")+e})).reverse()}));for(n&&(o=a-Math.min(i,s)),a-=1;a>=o;){if(u[0][a]>u[1][a])return 1;if(u[0][a]===u[1][a]){if(a===o)return 0;a-=1}else if(u[0][a]<u[1][a])return-1}},e.map=function(e,t){var r,n=[];if(Array.prototype.map)return Array.prototype.map.call(e,t);for(r=0;r<e.length;r+=1)n.push(t(e[r]));return n},e.find=function(e,t){var r,n;if(Array.prototype.find)return Array.prototype.find.call(e,t);for(r=0,n=e.length;r<n;r+=1){var i=e[r];if(t(i,r))return i}},e.assign=function(e){for(var t,r,n=e,i=arguments.length,s=new Array(i>1?i-1:0),a=1;a<i;a++)s[a-1]=arguments[a];if(Object.assign)return Object.assign.apply(Object,[e].concat(s));var o=function(){var e=s[t];"object"==typeof e&&null!==e&&Object.keys(e).forEach((function(t){n[t]=e[t]}))};for(t=0,r=s.length;t<r;t+=1)o();return e},e.getBrowserAlias=function(e){return n.BROWSER_ALIASES_MAP[e]},e.getBrowserTypeByAlias=function(e){return n.BROWSER_MAP[e]||""},e}();t.default=i,e.exports=t.default},18:function(e,t,r){"use strict";t.__esModule=!0,t.ENGINE_MAP=t.OS_MAP=t.PLATFORMS_MAP=t.BROWSER_MAP=t.BROWSER_ALIASES_MAP=void 0;t.BROWSER_ALIASES_MAP={"Amazon Silk":"amazon_silk","Android Browser":"android",Bada:"bada",BlackBerry:"blackberry",Chrome:"chrome",Chromium:"chromium",Electron:"electron",Epiphany:"epiphany",Firefox:"firefox",Focus:"focus",Generic:"generic","Google Search":"google_search",Googlebot:"googlebot","Internet Explorer":"ie","K-Meleon":"k_meleon",Maxthon:"maxthon","Microsoft Edge":"edge","MZ Browser":"mz","NAVER Whale Browser":"naver",Opera:"opera","Opera Coast":"opera_coast",PhantomJS:"phantomjs",Puffin:"puffin",QupZilla:"qupzilla",QQ:"qq",QQLite:"qqlite",Safari:"safari",Sailfish:"sailfish","Samsung Internet for Android":"samsung_internet",SeaMonkey:"seamonkey",Sleipnir:"sleipnir",Swing:"swing",Tizen:"tizen","UC Browser":"uc",Vivaldi:"vivaldi","WebOS Browser":"webos",WeChat:"wechat","Yandex Browser":"yandex",Roku:"roku"};t.BROWSER_MAP={amazon_silk:"Amazon Silk",android:"Android Browser",bada:"Bada",blackberry:"BlackBerry",chrome:"Chrome",chromium:"Chromium",electron:"Electron",epiphany:"Epiphany",firefox:"Firefox",focus:"Focus",generic:"Generic",googlebot:"Googlebot",google_search:"Google Search",ie:"Internet Explorer",k_meleon:"K-Meleon",maxthon:"Maxthon",edge:"Microsoft Edge",mz:"MZ Browser",naver:"NAVER Whale Browser",opera:"Opera",opera_coast:"Opera Coast",phantomjs:"PhantomJS",puffin:"Puffin",qupzilla:"QupZilla",qq:"QQ Browser",qqlite:"QQ Browser Lite",safari:"Safari",sailfish:"Sailfish",samsung_internet:"Samsung Internet for Android",seamonkey:"SeaMonkey",sleipnir:"Sleipnir",swing:"Swing",tizen:"Tizen",uc:"UC Browser",vivaldi:"Vivaldi",webos:"WebOS Browser",wechat:"WeChat",yandex:"Yandex Browser"};t.PLATFORMS_MAP={tablet:"tablet",mobile:"mobile",desktop:"desktop",tv:"tv"};t.OS_MAP={WindowsPhone:"Windows Phone",Windows:"Windows",MacOS:"macOS",iOS:"iOS",Android:"Android",WebOS:"WebOS",BlackBerry:"BlackBerry",Bada:"Bada",Tizen:"Tizen",Linux:"Linux",ChromeOS:"Chrome OS",PlayStation4:"PlayStation 4",Roku:"Roku"};t.ENGINE_MAP={EdgeHTML:"EdgeHTML",Blink:"Blink",Trident:"Trident",Presto:"Presto",Gecko:"Gecko",WebKit:"WebKit"}},90:function(e,t,r){"use strict";t.__esModule=!0,t.default=void 0;var n,i=(n=r(91))&&n.__esModule?n:{default:n},s=r(18);function a(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}var o=function(){function e(){}var t,r,n;return e.getParser=function(e,t){if(void 0===t&&(t=!1),"string"!=typeof e)throw new Error("UserAgent should be a string");return new i.default(e,t)},e.parse=function(e){return new i.default(e).getResult()},t=e,n=[{key:"BROWSER_MAP",get:function(){return s.BROWSER_MAP}},{key:"ENGINE_MAP",get:function(){return s.ENGINE_MAP}},{key:"OS_MAP",get:function(){return s.OS_MAP}},{key:"PLATFORMS_MAP",get:function(){return s.PLATFORMS_MAP}}],(r=null)&&a(t.prototype,r),n&&a(t,n),e}();t.default=o,e.exports=t.default},91:function(e,t,r){"use strict";t.__esModule=!0,t.default=void 0;var n=u(r(92)),i=u(r(93)),s=u(r(94)),a=u(r(95)),o=u(r(17));function u(e){return e&&e.__esModule?e:{default:e}}var d=function(){function e(e,t){if(void 0===t&&(t=!1),null==e||""===e)throw new Error("UserAgent parameter can't be empty");this._ua=e,this.parsedResult={},!0!==t&&this.parse()}var t=e.prototype;return t.getUA=function(){return this._ua},t.test=function(e){return e.test(this._ua)},t.parseBrowser=function(){var e=this;this.parsedResult.browser={};var t=o.default.find(n.default,(function(t){if("function"==typeof t.test)return t.test(e);if(t.test instanceof Array)return t.test.some((function(t){return e.test(t)}));throw new Error("Browser's test function is not valid")}));return t&&(this.parsedResult.browser=t.describe(this.getUA())),this.parsedResult.browser},t.getBrowser=function(){return this.parsedResult.browser?this.parsedResult.browser:this.parseBrowser()},t.getBrowserName=function(e){return e?String(this.getBrowser().name).toLowerCase()||"":this.getBrowser().name||""},t.getBrowserVersion=function(){return this.getBrowser().version},t.getOS=function(){return this.parsedResult.os?this.parsedResult.os:this.parseOS()},t.parseOS=function(){var e=this;this.parsedResult.os={};var t=o.default.find(i.default,(function(t){if("function"==typeof t.test)return t.test(e);if(t.test instanceof Array)return t.test.some((function(t){return e.test(t)}));throw new Error("Browser's test function is not valid")}));return t&&(this.parsedResult.os=t.describe(this.getUA())),this.parsedResult.os},t.getOSName=function(e){var t=this.getOS().name;return e?String(t).toLowerCase()||"":t||""},t.getOSVersion=function(){return this.getOS().version},t.getPlatform=function(){return this.parsedResult.platform?this.parsedResult.platform:this.parsePlatform()},t.getPlatformType=function(e){void 0===e&&(e=!1);var t=this.getPlatform().type;return e?String(t).toLowerCase()||"":t||""},t.parsePlatform=function(){var e=this;this.parsedResult.platform={};var t=o.default.find(s.default,(function(t){if("function"==typeof t.test)return t.test(e);if(t.test instanceof Array)return t.test.some((function(t){return e.test(t)}));throw new Error("Browser's test function is not valid")}));return t&&(this.parsedResult.platform=t.describe(this.getUA())),this.parsedResult.platform},t.getEngine=function(){return this.parsedResult.engine?this.parsedResult.engine:this.parseEngine()},t.getEngineName=function(e){return e?String(this.getEngine().name).toLowerCase()||"":this.getEngine().name||""},t.parseEngine=function(){var e=this;this.parsedResult.engine={};var t=o.default.find(a.default,(function(t){if("function"==typeof t.test)return t.test(e);if(t.test instanceof Array)return t.test.some((function(t){return e.test(t)}));throw new Error("Browser's test function is not valid")}));return t&&(this.parsedResult.engine=t.describe(this.getUA())),this.parsedResult.engine},t.parse=function(){return this.parseBrowser(),this.parseOS(),this.parsePlatform(),this.parseEngine(),this},t.getResult=function(){return o.default.assign({},this.parsedResult)},t.satisfies=function(e){var t=this,r={},n=0,i={},s=0;if(Object.keys(e).forEach((function(t){var a=e[t];"string"==typeof a?(i[t]=a,s+=1):"object"==typeof a&&(r[t]=a,n+=1)})),n>0){var a=Object.keys(r),u=o.default.find(a,(function(e){return t.isOS(e)}));if(u){var d=this.satisfies(r[u]);if(void 0!==d)return d}var c=o.default.find(a,(function(e){return t.isPlatform(e)}));if(c){var f=this.satisfies(r[c]);if(void 0!==f)return f}}if(s>0){var l=Object.keys(i),h=o.default.find(l,(function(e){return t.isBrowser(e,!0)}));if(void 0!==h)return this.compareVersion(i[h])}},t.isBrowser=function(e,t){void 0===t&&(t=!1);var r=this.getBrowserName().toLowerCase(),n=e.toLowerCase(),i=o.default.getBrowserTypeByAlias(n);return t&&i&&(n=i.toLowerCase()),n===r},t.compareVersion=function(e){var t=[0],r=e,n=!1,i=this.getBrowserVersion();if("string"==typeof i)return">"===e[0]||"<"===e[0]?(r=e.substr(1),"="===e[1]?(n=!0,r=e.substr(2)):t=[],">"===e[0]?t.push(1):t.push(-1)):"="===e[0]?r=e.substr(1):"~"===e[0]&&(n=!0,r=e.substr(1)),t.indexOf(o.default.compareVersions(i,r,n))>-1},t.isOS=function(e){return this.getOSName(!0)===String(e).toLowerCase()},t.isPlatform=function(e){return this.getPlatformType(!0)===String(e).toLowerCase()},t.isEngine=function(e){return this.getEngineName(!0)===String(e).toLowerCase()},t.is=function(e,t){return void 0===t&&(t=!1),this.isBrowser(e,t)||this.isOS(e)||this.isPlatform(e)},t.some=function(e){var t=this;return void 0===e&&(e=[]),e.some((function(e){return t.is(e)}))},e}();t.default=d,e.exports=t.default},92:function(e,t,r){"use strict";t.__esModule=!0,t.default=void 0;var n,i=(n=r(17))&&n.__esModule?n:{default:n};var s=/version\/(\d+(\.?_?\d+)+)/i,a=[{test:[/googlebot/i],describe:function(e){var t={name:"Googlebot"},r=i.default.getFirstMatch(/googlebot\/(\d+(\.\d+))/i,e)||i.default.getFirstMatch(s,e);return r&&(t.version=r),t}},{test:[/opera/i],describe:function(e){var t={name:"Opera"},r=i.default.getFirstMatch(s,e)||i.default.getFirstMatch(/(?:opera)[\s/](\d+(\.?_?\d+)+)/i,e);return r&&(t.version=r),t}},{test:[/opr\/|opios/i],describe:function(e){var t={name:"Opera"},r=i.default.getFirstMatch(/(?:opr|opios)[\s/](\S+)/i,e)||i.default.getFirstMatch(s,e);return r&&(t.version=r),t}},{test:[/SamsungBrowser/i],describe:function(e){var t={name:"Samsung Internet for Android"},r=i.default.getFirstMatch(s,e)||i.default.getFirstMatch(/(?:SamsungBrowser)[\s/](\d+(\.?_?\d+)+)/i,e);return r&&(t.version=r),t}},{test:[/Whale/i],describe:function(e){var t={name:"NAVER Whale Browser"},r=i.default.getFirstMatch(s,e)||i.default.getFirstMatch(/(?:whale)[\s/](\d+(?:\.\d+)+)/i,e);return r&&(t.version=r),t}},{test:[/MZBrowser/i],describe:function(e){var t={name:"MZ Browser"},r=i.default.getFirstMatch(/(?:MZBrowser)[\s/](\d+(?:\.\d+)+)/i,e)||i.default.getFirstMatch(s,e);return r&&(t.version=r),t}},{test:[/focus/i],describe:function(e){var t={name:"Focus"},r=i.default.getFirstMatch(/(?:focus)[\s/](\d+(?:\.\d+)+)/i,e)||i.default.getFirstMatch(s,e);return r&&(t.version=r),t}},{test:[/swing/i],describe:function(e){var t={name:"Swing"},r=i.default.getFirstMatch(/(?:swing)[\s/](\d+(?:\.\d+)+)/i,e)||i.default.getFirstMatch(s,e);return r&&(t.version=r),t}},{test:[/coast/i],describe:function(e){var t={name:"Opera Coast"},r=i.default.getFirstMatch(s,e)||i.default.getFirstMatch(/(?:coast)[\s/](\d+(\.?_?\d+)+)/i,e);return r&&(t.version=r),t}},{test:[/opt\/\d+(?:.?_?\d+)+/i],describe:function(e){var t={name:"Opera Touch"},r=i.default.getFirstMatch(/(?:opt)[\s/](\d+(\.?_?\d+)+)/i,e)||i.default.getFirstMatch(s,e);return r&&(t.version=r),t}},{test:[/yabrowser/i],describe:function(e){var t={name:"Yandex Browser"},r=i.default.getFirstMatch(/(?:yabrowser)[\s/](\d+(\.?_?\d+)+)/i,e)||i.default.getFirstMatch(s,e);return r&&(t.version=r),t}},{test:[/ucbrowser/i],describe:function(e){var t={name:"UC Browser"},r=i.default.getFirstMatch(s,e)||i.default.getFirstMatch(/(?:ucbrowser)[\s/](\d+(\.?_?\d+)+)/i,e);return r&&(t.version=r),t}},{test:[/Maxthon|mxios/i],describe:function(e){var t={name:"Maxthon"},r=i.default.getFirstMatch(s,e)||i.default.getFirstMatch(/(?:Maxthon|mxios)[\s/](\d+(\.?_?\d+)+)/i,e);return r&&(t.version=r),t}},{test:[/epiphany/i],describe:function(e){var t={name:"Epiphany"},r=i.default.getFirstMatch(s,e)||i.default.getFirstMatch(/(?:epiphany)[\s/](\d+(\.?_?\d+)+)/i,e);return r&&(t.version=r),t}},{test:[/puffin/i],describe:function(e){var t={name:"Puffin"},r=i.default.getFirstMatch(s,e)||i.default.getFirstMatch(/(?:puffin)[\s/](\d+(\.?_?\d+)+)/i,e);return r&&(t.version=r),t}},{test:[/sleipnir/i],describe:function(e){var t={name:"Sleipnir"},r=i.default.getFirstMatch(s,e)||i.default.getFirstMatch(/(?:sleipnir)[\s/](\d+(\.?_?\d+)+)/i,e);return r&&(t.version=r),t}},{test:[/k-meleon/i],describe:function(e){var t={name:"K-Meleon"},r=i.default.getFirstMatch(s,e)||i.default.getFirstMatch(/(?:k-meleon)[\s/](\d+(\.?_?\d+)+)/i,e);return r&&(t.version=r),t}},{test:[/micromessenger/i],describe:function(e){var t={name:"WeChat"},r=i.default.getFirstMatch(/(?:micromessenger)[\s/](\d+(\.?_?\d+)+)/i,e)||i.default.getFirstMatch(s,e);return r&&(t.version=r),t}},{test:[/qqbrowser/i],describe:function(e){var t={name:/qqbrowserlite/i.test(e)?"QQ Browser Lite":"QQ Browser"},r=i.default.getFirstMatch(/(?:qqbrowserlite|qqbrowser)[/](\d+(\.?_?\d+)+)/i,e)||i.default.getFirstMatch(s,e);return r&&(t.version=r),t}},{test:[/msie|trident/i],describe:function(e){var t={name:"Internet Explorer"},r=i.default.getFirstMatch(/(?:msie |rv:)(\d+(\.?_?\d+)+)/i,e);return r&&(t.version=r),t}},{test:[/\sedg\//i],describe:function(e){var t={name:"Microsoft Edge"},r=i.default.getFirstMatch(/\sedg\/(\d+(\.?_?\d+)+)/i,e);return r&&(t.version=r),t}},{test:[/edg([ea]|ios)/i],describe:function(e){var t={name:"Microsoft Edge"},r=i.default.getSecondMatch(/edg([ea]|ios)\/(\d+(\.?_?\d+)+)/i,e);return r&&(t.version=r),t}},{test:[/vivaldi/i],describe:function(e){var t={name:"Vivaldi"},r=i.default.getFirstMatch(/vivaldi\/(\d+(\.?_?\d+)+)/i,e);return r&&(t.version=r),t}},{test:[/seamonkey/i],describe:function(e){var t={name:"SeaMonkey"},r=i.default.getFirstMatch(/seamonkey\/(\d+(\.?_?\d+)+)/i,e);return r&&(t.version=r),t}},{test:[/sailfish/i],describe:function(e){var t={name:"Sailfish"},r=i.default.getFirstMatch(/sailfish\s?browser\/(\d+(\.\d+)?)/i,e);return r&&(t.version=r),t}},{test:[/silk/i],describe:function(e){var t={name:"Amazon Silk"},r=i.default.getFirstMatch(/silk\/(\d+(\.?_?\d+)+)/i,e);return r&&(t.version=r),t}},{test:[/phantom/i],describe:function(e){var t={name:"PhantomJS"},r=i.default.getFirstMatch(/phantomjs\/(\d+(\.?_?\d+)+)/i,e);return r&&(t.version=r),t}},{test:[/slimerjs/i],describe:function(e){var t={name:"SlimerJS"},r=i.default.getFirstMatch(/slimerjs\/(\d+(\.?_?\d+)+)/i,e);return r&&(t.version=r),t}},{test:[/blackberry|\bbb\d+/i,/rim\stablet/i],describe:function(e){var t={name:"BlackBerry"},r=i.default.getFirstMatch(s,e)||i.default.getFirstMatch(/blackberry[\d]+\/(\d+(\.?_?\d+)+)/i,e);return r&&(t.version=r),t}},{test:[/(web|hpw)[o0]s/i],describe:function(e){var t={name:"WebOS Browser"},r=i.default.getFirstMatch(s,e)||i.default.getFirstMatch(/w(?:eb)?[o0]sbrowser\/(\d+(\.?_?\d+)+)/i,e);return r&&(t.version=r),t}},{test:[/bada/i],describe:function(e){var t={name:"Bada"},r=i.default.getFirstMatch(/dolfin\/(\d+(\.?_?\d+)+)/i,e);return r&&(t.version=r),t}},{test:[/tizen/i],describe:function(e){var t={name:"Tizen"},r=i.default.getFirstMatch(/(?:tizen\s?)?browser\/(\d+(\.?_?\d+)+)/i,e)||i.default.getFirstMatch(s,e);return r&&(t.version=r),t}},{test:[/qupzilla/i],describe:function(e){var t={name:"QupZilla"},r=i.default.getFirstMatch(/(?:qupzilla)[\s/](\d+(\.?_?\d+)+)/i,e)||i.default.getFirstMatch(s,e);return r&&(t.version=r),t}},{test:[/firefox|iceweasel|fxios/i],describe:function(e){var t={name:"Firefox"},r=i.default.getFirstMatch(/(?:firefox|iceweasel|fxios)[\s/](\d+(\.?_?\d+)+)/i,e);return r&&(t.version=r),t}},{test:[/electron/i],describe:function(e){var t={name:"Electron"},r=i.default.getFirstMatch(/(?:electron)\/(\d+(\.?_?\d+)+)/i,e);return r&&(t.version=r),t}},{test:[/MiuiBrowser/i],describe:function(e){var t={name:"Miui"},r=i.default.getFirstMatch(/(?:MiuiBrowser)[\s/](\d+(\.?_?\d+)+)/i,e);return r&&(t.version=r),t}},{test:[/chromium/i],describe:function(e){var t={name:"Chromium"},r=i.default.getFirstMatch(/(?:chromium)[\s/](\d+(\.?_?\d+)+)/i,e)||i.default.getFirstMatch(s,e);return r&&(t.version=r),t}},{test:[/chrome|crios|crmo/i],describe:function(e){var t={name:"Chrome"},r=i.default.getFirstMatch(/(?:chrome|crios|crmo)\/(\d+(\.?_?\d+)+)/i,e);return r&&(t.version=r),t}},{test:[/GSA/i],describe:function(e){var t={name:"Google Search"},r=i.default.getFirstMatch(/(?:GSA)\/(\d+(\.?_?\d+)+)/i,e);return r&&(t.version=r),t}},{test:function(e){var t=!e.test(/like android/i),r=e.test(/android/i);return t&&r},describe:function(e){var t={name:"Android Browser"},r=i.default.getFirstMatch(s,e);return r&&(t.version=r),t}},{test:[/playstation 4/i],describe:function(e){var t={name:"PlayStation 4"},r=i.default.getFirstMatch(s,e);return r&&(t.version=r),t}},{test:[/safari|applewebkit/i],describe:function(e){var t={name:"Safari"},r=i.default.getFirstMatch(s,e);return r&&(t.version=r),t}},{test:[/.*/i],describe:function(e){var t=-1!==e.search("\\(")?/^(.*)\/(.*)[ \t]\((.*)/:/^(.*)\/(.*) /;return{name:i.default.getFirstMatch(t,e),version:i.default.getSecondMatch(t,e)}}}];t.default=a,e.exports=t.default},93:function(e,t,r){"use strict";t.__esModule=!0,t.default=void 0;var n,i=(n=r(17))&&n.__esModule?n:{default:n},s=r(18);var a=[{test:[/Roku\/DVP/],describe:function(e){var t=i.default.getFirstMatch(/Roku\/DVP-(\d+\.\d+)/i,e);return{name:s.OS_MAP.Roku,version:t}}},{test:[/windows phone/i],describe:function(e){var t=i.default.getFirstMatch(/windows phone (?:os)?\s?(\d+(\.\d+)*)/i,e);return{name:s.OS_MAP.WindowsPhone,version:t}}},{test:[/windows /i],describe:function(e){var t=i.default.getFirstMatch(/Windows ((NT|XP)( \d\d?.\d)?)/i,e),r=i.default.getWindowsVersionName(t);return{name:s.OS_MAP.Windows,version:t,versionName:r}}},{test:[/Macintosh(.*?) FxiOS(.*?)\//],describe:function(e){var t={name:s.OS_MAP.iOS},r=i.default.getSecondMatch(/(Version\/)(\d[\d.]+)/,e);return r&&(t.version=r),t}},{test:[/macintosh/i],describe:function(e){var t=i.default.getFirstMatch(/mac os x (\d+(\.?_?\d+)+)/i,e).replace(/[_\s]/g,"."),r=i.default.getMacOSVersionName(t),n={name:s.OS_MAP.MacOS,version:t};return r&&(n.versionName=r),n}},{test:[/(ipod|iphone|ipad)/i],describe:function(e){var t=i.default.getFirstMatch(/os (\d+([_\s]\d+)*) like mac os x/i,e).replace(/[_\s]/g,".");return{name:s.OS_MAP.iOS,version:t}}},{test:function(e){var t=!e.test(/like android/i),r=e.test(/android/i);return t&&r},describe:function(e){var t=i.default.getFirstMatch(/android[\s/-](\d+(\.\d+)*)/i,e),r=i.default.getAndroidVersionName(t),n={name:s.OS_MAP.Android,version:t};return r&&(n.versionName=r),n}},{test:[/(web|hpw)[o0]s/i],describe:function(e){var t=i.default.getFirstMatch(/(?:web|hpw)[o0]s\/(\d+(\.\d+)*)/i,e),r={name:s.OS_MAP.WebOS};return t&&t.length&&(r.version=t),r}},{test:[/blackberry|\bbb\d+/i,/rim\stablet/i],describe:function(e){var t=i.default.getFirstMatch(/rim\stablet\sos\s(\d+(\.\d+)*)/i,e)||i.default.getFirstMatch(/blackberry\d+\/(\d+([_\s]\d+)*)/i,e)||i.default.getFirstMatch(/\bbb(\d+)/i,e);return{name:s.OS_MAP.BlackBerry,version:t}}},{test:[/bada/i],describe:function(e){var t=i.default.getFirstMatch(/bada\/(\d+(\.\d+)*)/i,e);return{name:s.OS_MAP.Bada,version:t}}},{test:[/tizen/i],describe:function(e){var t=i.default.getFirstMatch(/tizen[/\s](\d+(\.\d+)*)/i,e);return{name:s.OS_MAP.Tizen,version:t}}},{test:[/linux/i],describe:function(){return{name:s.OS_MAP.Linux}}},{test:[/CrOS/],describe:function(){return{name:s.OS_MAP.ChromeOS}}},{test:[/PlayStation 4/],describe:function(e){var t=i.default.getFirstMatch(/PlayStation 4[/\s](\d+(\.\d+)*)/i,e);return{name:s.OS_MAP.PlayStation4,version:t}}}];t.default=a,e.exports=t.default},94:function(e,t,r){"use strict";t.__esModule=!0,t.default=void 0;var n,i=(n=r(17))&&n.__esModule?n:{default:n},s=r(18);var a=[{test:[/googlebot/i],describe:function(){return{type:"bot",vendor:"Google"}}},{test:[/huawei/i],describe:function(e){var t=i.default.getFirstMatch(/(can-l01)/i,e)&&"Nova",r={type:s.PLATFORMS_MAP.mobile,vendor:"Huawei"};return t&&(r.model=t),r}},{test:[/nexus\s*(?:7|8|9|10).*/i],describe:function(){return{type:s.PLATFORMS_MAP.tablet,vendor:"Nexus"}}},{test:[/ipad/i],describe:function(){return{type:s.PLATFORMS_MAP.tablet,vendor:"Apple",model:"iPad"}}},{test:[/Macintosh(.*?) FxiOS(.*?)\//],describe:function(){return{type:s.PLATFORMS_MAP.tablet,vendor:"Apple",model:"iPad"}}},{test:[/kftt build/i],describe:function(){return{type:s.PLATFORMS_MAP.tablet,vendor:"Amazon",model:"Kindle Fire HD 7"}}},{test:[/silk/i],describe:function(){return{type:s.PLATFORMS_MAP.tablet,vendor:"Amazon"}}},{test:[/tablet(?! pc)/i],describe:function(){return{type:s.PLATFORMS_MAP.tablet}}},{test:function(e){var t=e.test(/ipod|iphone/i),r=e.test(/like (ipod|iphone)/i);return t&&!r},describe:function(e){var t=i.default.getFirstMatch(/(ipod|iphone)/i,e);return{type:s.PLATFORMS_MAP.mobile,vendor:"Apple",model:t}}},{test:[/nexus\s*[0-6].*/i,/galaxy nexus/i],describe:function(){return{type:s.PLATFORMS_MAP.mobile,vendor:"Nexus"}}},{test:[/[^-]mobi/i],describe:function(){return{type:s.PLATFORMS_MAP.mobile}}},{test:function(e){return"blackberry"===e.getBrowserName(!0)},describe:function(){return{type:s.PLATFORMS_MAP.mobile,vendor:"BlackBerry"}}},{test:function(e){return"bada"===e.getBrowserName(!0)},describe:function(){return{type:s.PLATFORMS_MAP.mobile}}},{test:function(e){return"windows phone"===e.getBrowserName()},describe:function(){return{type:s.PLATFORMS_MAP.mobile,vendor:"Microsoft"}}},{test:function(e){var t=Number(String(e.getOSVersion()).split(".")[0]);return"android"===e.getOSName(!0)&&t>=3},describe:function(){return{type:s.PLATFORMS_MAP.tablet}}},{test:function(e){return"android"===e.getOSName(!0)},describe:function(){return{type:s.PLATFORMS_MAP.mobile}}},{test:function(e){return"macos"===e.getOSName(!0)},describe:function(){return{type:s.PLATFORMS_MAP.desktop,vendor:"Apple"}}},{test:function(e){return"windows"===e.getOSName(!0)},describe:function(){return{type:s.PLATFORMS_MAP.desktop}}},{test:function(e){return"linux"===e.getOSName(!0)},describe:function(){return{type:s.PLATFORMS_MAP.desktop}}},{test:function(e){return"playstation 4"===e.getOSName(!0)},describe:function(){return{type:s.PLATFORMS_MAP.tv}}},{test:function(e){return"roku"===e.getOSName(!0)},describe:function(){return{type:s.PLATFORMS_MAP.tv}}}];t.default=a,e.exports=t.default},95:function(e,t,r){"use strict";t.__esModule=!0,t.default=void 0;var n,i=(n=r(17))&&n.__esModule?n:{default:n},s=r(18);var a=[{test:function(e){return"microsoft edge"===e.getBrowserName(!0)},describe:function(e){if(/\sedg\//i.test(e))return{name:s.ENGINE_MAP.Blink};var t=i.default.getFirstMatch(/edge\/(\d+(\.?_?\d+)+)/i,e);return{name:s.ENGINE_MAP.EdgeHTML,version:t}}},{test:[/trident/i],describe:function(e){var t={name:s.ENGINE_MAP.Trident},r=i.default.getFirstMatch(/trident\/(\d+(\.?_?\d+)+)/i,e);return r&&(t.version=r),t}},{test:function(e){return e.test(/presto/i)},describe:function(e){var t={name:s.ENGINE_MAP.Presto},r=i.default.getFirstMatch(/presto\/(\d+(\.?_?\d+)+)/i,e);return r&&(t.version=r),t}},{test:function(e){var t=e.test(/gecko/i),r=e.test(/like gecko/i);return t&&!r},describe:function(e){var t={name:s.ENGINE_MAP.Gecko},r=i.default.getFirstMatch(/gecko\/(\d+(\.?_?\d+)+)/i,e);return r&&(t.version=r),t}},{test:[/(apple)?webkit\/537\.36/i],describe:function(){return{name:s.ENGINE_MAP.Blink}}},{test:[/(apple)?webkit/i],describe:function(e){var t={name:s.ENGINE_MAP.WebKit},r=i.default.getFirstMatch(/webkit\/(\d+(\.?_?\d+)+)/i,e);return r&&(t.version=r),t}}];t.default=a,e.exports=t.default}})}));

/***/ }),

/***/ "../../node_modules/fflate/esm/browser.js":
/*!************************************************!*\
  !*** ../../node_modules/fflate/esm/browser.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AsyncCompress: () => (/* binding */ AsyncGzip),
/* harmony export */   AsyncDecompress: () => (/* binding */ AsyncDecompress),
/* harmony export */   AsyncDeflate: () => (/* binding */ AsyncDeflate),
/* harmony export */   AsyncGunzip: () => (/* binding */ AsyncGunzip),
/* harmony export */   AsyncGzip: () => (/* binding */ AsyncGzip),
/* harmony export */   AsyncInflate: () => (/* binding */ AsyncInflate),
/* harmony export */   AsyncUnzipInflate: () => (/* binding */ AsyncUnzipInflate),
/* harmony export */   AsyncUnzlib: () => (/* binding */ AsyncUnzlib),
/* harmony export */   AsyncZipDeflate: () => (/* binding */ AsyncZipDeflate),
/* harmony export */   AsyncZlib: () => (/* binding */ AsyncZlib),
/* harmony export */   Compress: () => (/* binding */ Gzip),
/* harmony export */   DecodeUTF8: () => (/* binding */ DecodeUTF8),
/* harmony export */   Decompress: () => (/* binding */ Decompress),
/* harmony export */   Deflate: () => (/* binding */ Deflate),
/* harmony export */   EncodeUTF8: () => (/* binding */ EncodeUTF8),
/* harmony export */   FlateErrorCode: () => (/* binding */ FlateErrorCode),
/* harmony export */   Gunzip: () => (/* binding */ Gunzip),
/* harmony export */   Gzip: () => (/* binding */ Gzip),
/* harmony export */   Inflate: () => (/* binding */ Inflate),
/* harmony export */   Unzip: () => (/* binding */ Unzip),
/* harmony export */   UnzipInflate: () => (/* binding */ UnzipInflate),
/* harmony export */   UnzipPassThrough: () => (/* binding */ UnzipPassThrough),
/* harmony export */   Unzlib: () => (/* binding */ Unzlib),
/* harmony export */   Zip: () => (/* binding */ Zip),
/* harmony export */   ZipDeflate: () => (/* binding */ ZipDeflate),
/* harmony export */   ZipPassThrough: () => (/* binding */ ZipPassThrough),
/* harmony export */   Zlib: () => (/* binding */ Zlib),
/* harmony export */   compress: () => (/* binding */ gzip),
/* harmony export */   compressSync: () => (/* binding */ gzipSync),
/* harmony export */   decompress: () => (/* binding */ decompress),
/* harmony export */   decompressSync: () => (/* binding */ decompressSync),
/* harmony export */   deflate: () => (/* binding */ deflate),
/* harmony export */   deflateSync: () => (/* binding */ deflateSync),
/* harmony export */   gunzip: () => (/* binding */ gunzip),
/* harmony export */   gunzipSync: () => (/* binding */ gunzipSync),
/* harmony export */   gzip: () => (/* binding */ gzip),
/* harmony export */   gzipSync: () => (/* binding */ gzipSync),
/* harmony export */   inflate: () => (/* binding */ inflate),
/* harmony export */   inflateSync: () => (/* binding */ inflateSync),
/* harmony export */   strFromU8: () => (/* binding */ strFromU8),
/* harmony export */   strToU8: () => (/* binding */ strToU8),
/* harmony export */   unzip: () => (/* binding */ unzip),
/* harmony export */   unzipSync: () => (/* binding */ unzipSync),
/* harmony export */   unzlib: () => (/* binding */ unzlib),
/* harmony export */   unzlibSync: () => (/* binding */ unzlibSync),
/* harmony export */   zip: () => (/* binding */ zip),
/* harmony export */   zipSync: () => (/* binding */ zipSync),
/* harmony export */   zlib: () => (/* binding */ zlib),
/* harmony export */   zlibSync: () => (/* binding */ zlibSync)
/* harmony export */ });
// DEFLATE is a complex format; to read this code, you should probably check the RFC first:
// https://tools.ietf.org/html/rfc1951
// You may also wish to take a look at the guide I made about this program:
// https://gist.github.com/101arrowz/253f31eb5abc3d9275ab943003ffecad
// Some of the following code is similar to that of UZIP.js:
// https://github.com/photopea/UZIP.js
// However, the vast majority of the codebase has diverged from UZIP.js to increase performance and reduce bundle size.
// Sometimes 0 will appear where -1 would be more appropriate. This is because using a uint
// is better for memory in most engines (I *think*).
var ch2 = {};
var wk = (function (c, id, msg, transfer, cb) {
    var w = new Worker(ch2[id] || (ch2[id] = URL.createObjectURL(new Blob([
        c + ';addEventListener("error",function(e){e=e.error;postMessage({$e$:[e.message,e.code,e.stack]})})'
    ], { type: 'text/javascript' }))));
    w.onmessage = function (e) {
        var d = e.data, ed = d.$e$;
        if (ed) {
            var err = new Error(ed[0]);
            err['code'] = ed[1];
            err.stack = ed[2];
            cb(err, null);
        }
        else
            cb(null, d);
    };
    w.postMessage(msg, transfer);
    return w;
});

// aliases for shorter compressed code (most minifers don't do this)
var u8 = Uint8Array, u16 = Uint16Array, u32 = Uint32Array;
// fixed length extra bits
var fleb = new u8([0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0, /* unused */ 0, 0, /* impossible */ 0]);
// fixed distance extra bits
// see fleb note
var fdeb = new u8([0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13, /* unused */ 0, 0]);
// code length index map
var clim = new u8([16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15]);
// get base, reverse index map from extra bits
var freb = function (eb, start) {
    var b = new u16(31);
    for (var i = 0; i < 31; ++i) {
        b[i] = start += 1 << eb[i - 1];
    }
    // numbers here are at max 18 bits
    var r = new u32(b[30]);
    for (var i = 1; i < 30; ++i) {
        for (var j = b[i]; j < b[i + 1]; ++j) {
            r[j] = ((j - b[i]) << 5) | i;
        }
    }
    return [b, r];
};
var _a = freb(fleb, 2), fl = _a[0], revfl = _a[1];
// we can ignore the fact that the other numbers are wrong; they never happen anyway
fl[28] = 258, revfl[258] = 28;
var _b = freb(fdeb, 0), fd = _b[0], revfd = _b[1];
// map of value to reverse (assuming 16 bits)
var rev = new u16(32768);
for (var i = 0; i < 32768; ++i) {
    // reverse table algorithm from SO
    var x = ((i & 0xAAAA) >>> 1) | ((i & 0x5555) << 1);
    x = ((x & 0xCCCC) >>> 2) | ((x & 0x3333) << 2);
    x = ((x & 0xF0F0) >>> 4) | ((x & 0x0F0F) << 4);
    rev[i] = (((x & 0xFF00) >>> 8) | ((x & 0x00FF) << 8)) >>> 1;
}
// create huffman tree from u8 "map": index -> code length for code index
// mb (max bits) must be at most 15
// TODO: optimize/split up?
var hMap = (function (cd, mb, r) {
    var s = cd.length;
    // index
    var i = 0;
    // u16 "map": index -> # of codes with bit length = index
    var l = new u16(mb);
    // length of cd must be 288 (total # of codes)
    for (; i < s; ++i) {
        if (cd[i])
            ++l[cd[i] - 1];
    }
    // u16 "map": index -> minimum code for bit length = index
    var le = new u16(mb);
    for (i = 0; i < mb; ++i) {
        le[i] = (le[i - 1] + l[i - 1]) << 1;
    }
    var co;
    if (r) {
        // u16 "map": index -> number of actual bits, symbol for code
        co = new u16(1 << mb);
        // bits to remove for reverser
        var rvb = 15 - mb;
        for (i = 0; i < s; ++i) {
            // ignore 0 lengths
            if (cd[i]) {
                // num encoding both symbol and bits read
                var sv = (i << 4) | cd[i];
                // free bits
                var r_1 = mb - cd[i];
                // start value
                var v = le[cd[i] - 1]++ << r_1;
                // m is end value
                for (var m = v | ((1 << r_1) - 1); v <= m; ++v) {
                    // every 16 bit value starting with the code yields the same result
                    co[rev[v] >>> rvb] = sv;
                }
            }
        }
    }
    else {
        co = new u16(s);
        for (i = 0; i < s; ++i) {
            if (cd[i]) {
                co[i] = rev[le[cd[i] - 1]++] >>> (15 - cd[i]);
            }
        }
    }
    return co;
});
// fixed length tree
var flt = new u8(288);
for (var i = 0; i < 144; ++i)
    flt[i] = 8;
for (var i = 144; i < 256; ++i)
    flt[i] = 9;
for (var i = 256; i < 280; ++i)
    flt[i] = 7;
for (var i = 280; i < 288; ++i)
    flt[i] = 8;
// fixed distance tree
var fdt = new u8(32);
for (var i = 0; i < 32; ++i)
    fdt[i] = 5;
// fixed length map
var flm = /*#__PURE__*/ hMap(flt, 9, 0), flrm = /*#__PURE__*/ hMap(flt, 9, 1);
// fixed distance map
var fdm = /*#__PURE__*/ hMap(fdt, 5, 0), fdrm = /*#__PURE__*/ hMap(fdt, 5, 1);
// find max of array
var max = function (a) {
    var m = a[0];
    for (var i = 1; i < a.length; ++i) {
        if (a[i] > m)
            m = a[i];
    }
    return m;
};
// read d, starting at bit p and mask with m
var bits = function (d, p, m) {
    var o = (p / 8) | 0;
    return ((d[o] | (d[o + 1] << 8)) >> (p & 7)) & m;
};
// read d, starting at bit p continuing for at least 16 bits
var bits16 = function (d, p) {
    var o = (p / 8) | 0;
    return ((d[o] | (d[o + 1] << 8) | (d[o + 2] << 16)) >> (p & 7));
};
// get end of byte
var shft = function (p) { return ((p + 7) / 8) | 0; };
// typed array slice - allows garbage collector to free original reference,
// while being more compatible than .slice
var slc = function (v, s, e) {
    if (s == null || s < 0)
        s = 0;
    if (e == null || e > v.length)
        e = v.length;
    // can't use .constructor in case user-supplied
    var n = new (v.BYTES_PER_ELEMENT == 2 ? u16 : v.BYTES_PER_ELEMENT == 4 ? u32 : u8)(e - s);
    n.set(v.subarray(s, e));
    return n;
};
/**
 * Codes for errors generated within this library
 */
var FlateErrorCode = {
    UnexpectedEOF: 0,
    InvalidBlockType: 1,
    InvalidLengthLiteral: 2,
    InvalidDistance: 3,
    StreamFinished: 4,
    NoStreamHandler: 5,
    InvalidHeader: 6,
    NoCallback: 7,
    InvalidUTF8: 8,
    ExtraFieldTooLong: 9,
    InvalidDate: 10,
    FilenameTooLong: 11,
    StreamFinishing: 12,
    InvalidZipData: 13,
    UnknownCompressionMethod: 14
};
// error codes
var ec = [
    'unexpected EOF',
    'invalid block type',
    'invalid length/literal',
    'invalid distance',
    'stream finished',
    'no stream handler',
    ,
    'no callback',
    'invalid UTF-8 data',
    'extra field too long',
    'date not in range 1980-2099',
    'filename too long',
    'stream finishing',
    'invalid zip data'
    // determined by unknown compression method
];
;
var err = function (ind, msg, nt) {
    var e = new Error(msg || ec[ind]);
    e.code = ind;
    if (Error.captureStackTrace)
        Error.captureStackTrace(e, err);
    if (!nt)
        throw e;
    return e;
};
// expands raw DEFLATE data
var inflt = function (dat, buf, st) {
    // source length
    var sl = dat.length;
    if (!sl || (st && st.f && !st.l))
        return buf || new u8(0);
    // have to estimate size
    var noBuf = !buf || st;
    // no state
    var noSt = !st || st.i;
    if (!st)
        st = {};
    // Assumes roughly 33% compression ratio average
    if (!buf)
        buf = new u8(sl * 3);
    // ensure buffer can fit at least l elements
    var cbuf = function (l) {
        var bl = buf.length;
        // need to increase size to fit
        if (l > bl) {
            // Double or set to necessary, whichever is greater
            var nbuf = new u8(Math.max(bl * 2, l));
            nbuf.set(buf);
            buf = nbuf;
        }
    };
    //  last chunk         bitpos           bytes
    var final = st.f || 0, pos = st.p || 0, bt = st.b || 0, lm = st.l, dm = st.d, lbt = st.m, dbt = st.n;
    // total bits
    var tbts = sl * 8;
    do {
        if (!lm) {
            // BFINAL - this is only 1 when last chunk is next
            final = bits(dat, pos, 1);
            // type: 0 = no compression, 1 = fixed huffman, 2 = dynamic huffman
            var type = bits(dat, pos + 1, 3);
            pos += 3;
            if (!type) {
                // go to end of byte boundary
                var s = shft(pos) + 4, l = dat[s - 4] | (dat[s - 3] << 8), t = s + l;
                if (t > sl) {
                    if (noSt)
                        err(0);
                    break;
                }
                // ensure size
                if (noBuf)
                    cbuf(bt + l);
                // Copy over uncompressed data
                buf.set(dat.subarray(s, t), bt);
                // Get new bitpos, update byte count
                st.b = bt += l, st.p = pos = t * 8, st.f = final;
                continue;
            }
            else if (type == 1)
                lm = flrm, dm = fdrm, lbt = 9, dbt = 5;
            else if (type == 2) {
                //  literal                            lengths
                var hLit = bits(dat, pos, 31) + 257, hcLen = bits(dat, pos + 10, 15) + 4;
                var tl = hLit + bits(dat, pos + 5, 31) + 1;
                pos += 14;
                // length+distance tree
                var ldt = new u8(tl);
                // code length tree
                var clt = new u8(19);
                for (var i = 0; i < hcLen; ++i) {
                    // use index map to get real code
                    clt[clim[i]] = bits(dat, pos + i * 3, 7);
                }
                pos += hcLen * 3;
                // code lengths bits
                var clb = max(clt), clbmsk = (1 << clb) - 1;
                // code lengths map
                var clm = hMap(clt, clb, 1);
                for (var i = 0; i < tl;) {
                    var r = clm[bits(dat, pos, clbmsk)];
                    // bits read
                    pos += r & 15;
                    // symbol
                    var s = r >>> 4;
                    // code length to copy
                    if (s < 16) {
                        ldt[i++] = s;
                    }
                    else {
                        //  copy   count
                        var c = 0, n = 0;
                        if (s == 16)
                            n = 3 + bits(dat, pos, 3), pos += 2, c = ldt[i - 1];
                        else if (s == 17)
                            n = 3 + bits(dat, pos, 7), pos += 3;
                        else if (s == 18)
                            n = 11 + bits(dat, pos, 127), pos += 7;
                        while (n--)
                            ldt[i++] = c;
                    }
                }
                //    length tree                 distance tree
                var lt = ldt.subarray(0, hLit), dt = ldt.subarray(hLit);
                // max length bits
                lbt = max(lt);
                // max dist bits
                dbt = max(dt);
                lm = hMap(lt, lbt, 1);
                dm = hMap(dt, dbt, 1);
            }
            else
                err(1);
            if (pos > tbts) {
                if (noSt)
                    err(0);
                break;
            }
        }
        // Make sure the buffer can hold this + the largest possible addition
        // Maximum chunk size (practically, theoretically infinite) is 2^17;
        if (noBuf)
            cbuf(bt + 131072);
        var lms = (1 << lbt) - 1, dms = (1 << dbt) - 1;
        var lpos = pos;
        for (;; lpos = pos) {
            // bits read, code
            var c = lm[bits16(dat, pos) & lms], sym = c >>> 4;
            pos += c & 15;
            if (pos > tbts) {
                if (noSt)
                    err(0);
                break;
            }
            if (!c)
                err(2);
            if (sym < 256)
                buf[bt++] = sym;
            else if (sym == 256) {
                lpos = pos, lm = null;
                break;
            }
            else {
                var add = sym - 254;
                // no extra bits needed if less
                if (sym > 264) {
                    // index
                    var i = sym - 257, b = fleb[i];
                    add = bits(dat, pos, (1 << b) - 1) + fl[i];
                    pos += b;
                }
                // dist
                var d = dm[bits16(dat, pos) & dms], dsym = d >>> 4;
                if (!d)
                    err(3);
                pos += d & 15;
                var dt = fd[dsym];
                if (dsym > 3) {
                    var b = fdeb[dsym];
                    dt += bits16(dat, pos) & ((1 << b) - 1), pos += b;
                }
                if (pos > tbts) {
                    if (noSt)
                        err(0);
                    break;
                }
                if (noBuf)
                    cbuf(bt + 131072);
                var end = bt + add;
                for (; bt < end; bt += 4) {
                    buf[bt] = buf[bt - dt];
                    buf[bt + 1] = buf[bt + 1 - dt];
                    buf[bt + 2] = buf[bt + 2 - dt];
                    buf[bt + 3] = buf[bt + 3 - dt];
                }
                bt = end;
            }
        }
        st.l = lm, st.p = lpos, st.b = bt, st.f = final;
        if (lm)
            final = 1, st.m = lbt, st.d = dm, st.n = dbt;
    } while (!final);
    return bt == buf.length ? buf : slc(buf, 0, bt);
};
// starting at p, write the minimum number of bits that can hold v to d
var wbits = function (d, p, v) {
    v <<= p & 7;
    var o = (p / 8) | 0;
    d[o] |= v;
    d[o + 1] |= v >>> 8;
};
// starting at p, write the minimum number of bits (>8) that can hold v to d
var wbits16 = function (d, p, v) {
    v <<= p & 7;
    var o = (p / 8) | 0;
    d[o] |= v;
    d[o + 1] |= v >>> 8;
    d[o + 2] |= v >>> 16;
};
// creates code lengths from a frequency table
var hTree = function (d, mb) {
    // Need extra info to make a tree
    var t = [];
    for (var i = 0; i < d.length; ++i) {
        if (d[i])
            t.push({ s: i, f: d[i] });
    }
    var s = t.length;
    var t2 = t.slice();
    if (!s)
        return [et, 0];
    if (s == 1) {
        var v = new u8(t[0].s + 1);
        v[t[0].s] = 1;
        return [v, 1];
    }
    t.sort(function (a, b) { return a.f - b.f; });
    // after i2 reaches last ind, will be stopped
    // freq must be greater than largest possible number of symbols
    t.push({ s: -1, f: 25001 });
    var l = t[0], r = t[1], i0 = 0, i1 = 1, i2 = 2;
    t[0] = { s: -1, f: l.f + r.f, l: l, r: r };
    // efficient algorithm from UZIP.js
    // i0 is lookbehind, i2 is lookahead - after processing two low-freq
    // symbols that combined have high freq, will start processing i2 (high-freq,
    // non-composite) symbols instead
    // see https://reddit.com/r/photopea/comments/ikekht/uzipjs_questions/
    while (i1 != s - 1) {
        l = t[t[i0].f < t[i2].f ? i0++ : i2++];
        r = t[i0 != i1 && t[i0].f < t[i2].f ? i0++ : i2++];
        t[i1++] = { s: -1, f: l.f + r.f, l: l, r: r };
    }
    var maxSym = t2[0].s;
    for (var i = 1; i < s; ++i) {
        if (t2[i].s > maxSym)
            maxSym = t2[i].s;
    }
    // code lengths
    var tr = new u16(maxSym + 1);
    // max bits in tree
    var mbt = ln(t[i1 - 1], tr, 0);
    if (mbt > mb) {
        // more algorithms from UZIP.js
        // TODO: find out how this code works (debt)
        //  ind    debt
        var i = 0, dt = 0;
        //    left            cost
        var lft = mbt - mb, cst = 1 << lft;
        t2.sort(function (a, b) { return tr[b.s] - tr[a.s] || a.f - b.f; });
        for (; i < s; ++i) {
            var i2_1 = t2[i].s;
            if (tr[i2_1] > mb) {
                dt += cst - (1 << (mbt - tr[i2_1]));
                tr[i2_1] = mb;
            }
            else
                break;
        }
        dt >>>= lft;
        while (dt > 0) {
            var i2_2 = t2[i].s;
            if (tr[i2_2] < mb)
                dt -= 1 << (mb - tr[i2_2]++ - 1);
            else
                ++i;
        }
        for (; i >= 0 && dt; --i) {
            var i2_3 = t2[i].s;
            if (tr[i2_3] == mb) {
                --tr[i2_3];
                ++dt;
            }
        }
        mbt = mb;
    }
    return [new u8(tr), mbt];
};
// get the max length and assign length codes
var ln = function (n, l, d) {
    return n.s == -1
        ? Math.max(ln(n.l, l, d + 1), ln(n.r, l, d + 1))
        : (l[n.s] = d);
};
// length codes generation
var lc = function (c) {
    var s = c.length;
    // Note that the semicolon was intentional
    while (s && !c[--s])
        ;
    var cl = new u16(++s);
    //  ind      num         streak
    var cli = 0, cln = c[0], cls = 1;
    var w = function (v) { cl[cli++] = v; };
    for (var i = 1; i <= s; ++i) {
        if (c[i] == cln && i != s)
            ++cls;
        else {
            if (!cln && cls > 2) {
                for (; cls > 138; cls -= 138)
                    w(32754);
                if (cls > 2) {
                    w(cls > 10 ? ((cls - 11) << 5) | 28690 : ((cls - 3) << 5) | 12305);
                    cls = 0;
                }
            }
            else if (cls > 3) {
                w(cln), --cls;
                for (; cls > 6; cls -= 6)
                    w(8304);
                if (cls > 2)
                    w(((cls - 3) << 5) | 8208), cls = 0;
            }
            while (cls--)
                w(cln);
            cls = 1;
            cln = c[i];
        }
    }
    return [cl.subarray(0, cli), s];
};
// calculate the length of output from tree, code lengths
var clen = function (cf, cl) {
    var l = 0;
    for (var i = 0; i < cl.length; ++i)
        l += cf[i] * cl[i];
    return l;
};
// writes a fixed block
// returns the new bit pos
var wfblk = function (out, pos, dat) {
    // no need to write 00 as type: TypedArray defaults to 0
    var s = dat.length;
    var o = shft(pos + 2);
    out[o] = s & 255;
    out[o + 1] = s >>> 8;
    out[o + 2] = out[o] ^ 255;
    out[o + 3] = out[o + 1] ^ 255;
    for (var i = 0; i < s; ++i)
        out[o + i + 4] = dat[i];
    return (o + 4 + s) * 8;
};
// writes a block
var wblk = function (dat, out, final, syms, lf, df, eb, li, bs, bl, p) {
    wbits(out, p++, final);
    ++lf[256];
    var _a = hTree(lf, 15), dlt = _a[0], mlb = _a[1];
    var _b = hTree(df, 15), ddt = _b[0], mdb = _b[1];
    var _c = lc(dlt), lclt = _c[0], nlc = _c[1];
    var _d = lc(ddt), lcdt = _d[0], ndc = _d[1];
    var lcfreq = new u16(19);
    for (var i = 0; i < lclt.length; ++i)
        lcfreq[lclt[i] & 31]++;
    for (var i = 0; i < lcdt.length; ++i)
        lcfreq[lcdt[i] & 31]++;
    var _e = hTree(lcfreq, 7), lct = _e[0], mlcb = _e[1];
    var nlcc = 19;
    for (; nlcc > 4 && !lct[clim[nlcc - 1]]; --nlcc)
        ;
    var flen = (bl + 5) << 3;
    var ftlen = clen(lf, flt) + clen(df, fdt) + eb;
    var dtlen = clen(lf, dlt) + clen(df, ddt) + eb + 14 + 3 * nlcc + clen(lcfreq, lct) + (2 * lcfreq[16] + 3 * lcfreq[17] + 7 * lcfreq[18]);
    if (flen <= ftlen && flen <= dtlen)
        return wfblk(out, p, dat.subarray(bs, bs + bl));
    var lm, ll, dm, dl;
    wbits(out, p, 1 + (dtlen < ftlen)), p += 2;
    if (dtlen < ftlen) {
        lm = hMap(dlt, mlb, 0), ll = dlt, dm = hMap(ddt, mdb, 0), dl = ddt;
        var llm = hMap(lct, mlcb, 0);
        wbits(out, p, nlc - 257);
        wbits(out, p + 5, ndc - 1);
        wbits(out, p + 10, nlcc - 4);
        p += 14;
        for (var i = 0; i < nlcc; ++i)
            wbits(out, p + 3 * i, lct[clim[i]]);
        p += 3 * nlcc;
        var lcts = [lclt, lcdt];
        for (var it = 0; it < 2; ++it) {
            var clct = lcts[it];
            for (var i = 0; i < clct.length; ++i) {
                var len = clct[i] & 31;
                wbits(out, p, llm[len]), p += lct[len];
                if (len > 15)
                    wbits(out, p, (clct[i] >>> 5) & 127), p += clct[i] >>> 12;
            }
        }
    }
    else {
        lm = flm, ll = flt, dm = fdm, dl = fdt;
    }
    for (var i = 0; i < li; ++i) {
        if (syms[i] > 255) {
            var len = (syms[i] >>> 18) & 31;
            wbits16(out, p, lm[len + 257]), p += ll[len + 257];
            if (len > 7)
                wbits(out, p, (syms[i] >>> 23) & 31), p += fleb[len];
            var dst = syms[i] & 31;
            wbits16(out, p, dm[dst]), p += dl[dst];
            if (dst > 3)
                wbits16(out, p, (syms[i] >>> 5) & 8191), p += fdeb[dst];
        }
        else {
            wbits16(out, p, lm[syms[i]]), p += ll[syms[i]];
        }
    }
    wbits16(out, p, lm[256]);
    return p + ll[256];
};
// deflate options (nice << 13) | chain
var deo = /*#__PURE__*/ new u32([65540, 131080, 131088, 131104, 262176, 1048704, 1048832, 2114560, 2117632]);
// empty
var et = /*#__PURE__*/ new u8(0);
// compresses data into a raw DEFLATE buffer
var dflt = function (dat, lvl, plvl, pre, post, lst) {
    var s = dat.length;
    var o = new u8(pre + s + 5 * (1 + Math.ceil(s / 7000)) + post);
    // writing to this writes to the output buffer
    var w = o.subarray(pre, o.length - post);
    var pos = 0;
    if (!lvl || s < 8) {
        for (var i = 0; i <= s; i += 65535) {
            // end
            var e = i + 65535;
            if (e >= s) {
                // write final block
                w[pos >> 3] = lst;
            }
            pos = wfblk(w, pos + 1, dat.subarray(i, e));
        }
    }
    else {
        var opt = deo[lvl - 1];
        var n = opt >>> 13, c = opt & 8191;
        var msk_1 = (1 << plvl) - 1;
        //    prev 2-byte val map    curr 2-byte val map
        var prev = new u16(32768), head = new u16(msk_1 + 1);
        var bs1_1 = Math.ceil(plvl / 3), bs2_1 = 2 * bs1_1;
        var hsh = function (i) { return (dat[i] ^ (dat[i + 1] << bs1_1) ^ (dat[i + 2] << bs2_1)) & msk_1; };
        // 24576 is an arbitrary number of maximum symbols per block
        // 424 buffer for last block
        var syms = new u32(25000);
        // length/literal freq   distance freq
        var lf = new u16(288), df = new u16(32);
        //  l/lcnt  exbits  index  l/lind  waitdx  bitpos
        var lc_1 = 0, eb = 0, i = 0, li = 0, wi = 0, bs = 0;
        for (; i < s; ++i) {
            // hash value
            // deopt when i > s - 3 - at end, deopt acceptable
            var hv = hsh(i);
            // index mod 32768    previous index mod
            var imod = i & 32767, pimod = head[hv];
            prev[imod] = pimod;
            head[hv] = imod;
            // We always should modify head and prev, but only add symbols if
            // this data is not yet processed ("wait" for wait index)
            if (wi <= i) {
                // bytes remaining
                var rem = s - i;
                if ((lc_1 > 7000 || li > 24576) && rem > 423) {
                    pos = wblk(dat, w, 0, syms, lf, df, eb, li, bs, i - bs, pos);
                    li = lc_1 = eb = 0, bs = i;
                    for (var j = 0; j < 286; ++j)
                        lf[j] = 0;
                    for (var j = 0; j < 30; ++j)
                        df[j] = 0;
                }
                //  len    dist   chain
                var l = 2, d = 0, ch_1 = c, dif = (imod - pimod) & 32767;
                if (rem > 2 && hv == hsh(i - dif)) {
                    var maxn = Math.min(n, rem) - 1;
                    var maxd = Math.min(32767, i);
                    // max possible length
                    // not capped at dif because decompressors implement "rolling" index population
                    var ml = Math.min(258, rem);
                    while (dif <= maxd && --ch_1 && imod != pimod) {
                        if (dat[i + l] == dat[i + l - dif]) {
                            var nl = 0;
                            for (; nl < ml && dat[i + nl] == dat[i + nl - dif]; ++nl)
                                ;
                            if (nl > l) {
                                l = nl, d = dif;
                                // break out early when we reach "nice" (we are satisfied enough)
                                if (nl > maxn)
                                    break;
                                // now, find the rarest 2-byte sequence within this
                                // length of literals and search for that instead.
                                // Much faster than just using the start
                                var mmd = Math.min(dif, nl - 2);
                                var md = 0;
                                for (var j = 0; j < mmd; ++j) {
                                    var ti = (i - dif + j + 32768) & 32767;
                                    var pti = prev[ti];
                                    var cd = (ti - pti + 32768) & 32767;
                                    if (cd > md)
                                        md = cd, pimod = ti;
                                }
                            }
                        }
                        // check the previous match
                        imod = pimod, pimod = prev[imod];
                        dif += (imod - pimod + 32768) & 32767;
                    }
                }
                // d will be nonzero only when a match was found
                if (d) {
                    // store both dist and len data in one Uint32
                    // Make sure this is recognized as a len/dist with 28th bit (2^28)
                    syms[li++] = 268435456 | (revfl[l] << 18) | revfd[d];
                    var lin = revfl[l] & 31, din = revfd[d] & 31;
                    eb += fleb[lin] + fdeb[din];
                    ++lf[257 + lin];
                    ++df[din];
                    wi = i + l;
                    ++lc_1;
                }
                else {
                    syms[li++] = dat[i];
                    ++lf[dat[i]];
                }
            }
        }
        pos = wblk(dat, w, lst, syms, lf, df, eb, li, bs, i - bs, pos);
        // this is the easiest way to avoid needing to maintain state
        if (!lst && pos & 7)
            pos = wfblk(w, pos + 1, et);
    }
    return slc(o, 0, pre + shft(pos) + post);
};
// CRC32 table
var crct = /*#__PURE__*/ (function () {
    var t = new Int32Array(256);
    for (var i = 0; i < 256; ++i) {
        var c = i, k = 9;
        while (--k)
            c = ((c & 1) && -306674912) ^ (c >>> 1);
        t[i] = c;
    }
    return t;
})();
// CRC32
var crc = function () {
    var c = -1;
    return {
        p: function (d) {
            // closures have awful performance
            var cr = c;
            for (var i = 0; i < d.length; ++i)
                cr = crct[(cr & 255) ^ d[i]] ^ (cr >>> 8);
            c = cr;
        },
        d: function () { return ~c; }
    };
};
// Alder32
var adler = function () {
    var a = 1, b = 0;
    return {
        p: function (d) {
            // closures have awful performance
            var n = a, m = b;
            var l = d.length | 0;
            for (var i = 0; i != l;) {
                var e = Math.min(i + 2655, l);
                for (; i < e; ++i)
                    m += n += d[i];
                n = (n & 65535) + 15 * (n >> 16), m = (m & 65535) + 15 * (m >> 16);
            }
            a = n, b = m;
        },
        d: function () {
            a %= 65521, b %= 65521;
            return (a & 255) << 24 | (a >>> 8) << 16 | (b & 255) << 8 | (b >>> 8);
        }
    };
};
;
// deflate with opts
var dopt = function (dat, opt, pre, post, st) {
    return dflt(dat, opt.level == null ? 6 : opt.level, opt.mem == null ? Math.ceil(Math.max(8, Math.min(13, Math.log(dat.length))) * 1.5) : (12 + opt.mem), pre, post, !st);
};
// Walmart object spread
var mrg = function (a, b) {
    var o = {};
    for (var k in a)
        o[k] = a[k];
    for (var k in b)
        o[k] = b[k];
    return o;
};
// worker clone
// This is possibly the craziest part of the entire codebase, despite how simple it may seem.
// The only parameter to this function is a closure that returns an array of variables outside of the function scope.
// We're going to try to figure out the variable names used in the closure as strings because that is crucial for workerization.
// We will return an object mapping of true variable name to value (basically, the current scope as a JS object).
// The reason we can't just use the original variable names is minifiers mangling the toplevel scope.
// This took me three weeks to figure out how to do.
var wcln = function (fn, fnStr, td) {
    var dt = fn();
    var st = fn.toString();
    var ks = st.slice(st.indexOf('[') + 1, st.lastIndexOf(']')).replace(/\s+/g, '').split(',');
    for (var i = 0; i < dt.length; ++i) {
        var v = dt[i], k = ks[i];
        if (typeof v == 'function') {
            fnStr += ';' + k + '=';
            var st_1 = v.toString();
            if (v.prototype) {
                // for global objects
                if (st_1.indexOf('[native code]') != -1) {
                    var spInd = st_1.indexOf(' ', 8) + 1;
                    fnStr += st_1.slice(spInd, st_1.indexOf('(', spInd));
                }
                else {
                    fnStr += st_1;
                    for (var t in v.prototype)
                        fnStr += ';' + k + '.prototype.' + t + '=' + v.prototype[t].toString();
                }
            }
            else
                fnStr += st_1;
        }
        else
            td[k] = v;
    }
    return [fnStr, td];
};
var ch = [];
// clone bufs
var cbfs = function (v) {
    var tl = [];
    for (var k in v) {
        if (v[k].buffer) {
            tl.push((v[k] = new v[k].constructor(v[k])).buffer);
        }
    }
    return tl;
};
// use a worker to execute code
var wrkr = function (fns, init, id, cb) {
    var _a;
    if (!ch[id]) {
        var fnStr = '', td_1 = {}, m = fns.length - 1;
        for (var i = 0; i < m; ++i)
            _a = wcln(fns[i], fnStr, td_1), fnStr = _a[0], td_1 = _a[1];
        ch[id] = wcln(fns[m], fnStr, td_1);
    }
    var td = mrg({}, ch[id][1]);
    return wk(ch[id][0] + ';onmessage=function(e){for(var k in e.data)self[k]=e.data[k];onmessage=' + init.toString() + '}', id, td, cbfs(td), cb);
};
// base async inflate fn
var bInflt = function () { return [u8, u16, u32, fleb, fdeb, clim, fl, fd, flrm, fdrm, rev, ec, hMap, max, bits, bits16, shft, slc, err, inflt, inflateSync, pbf, gu8]; };
var bDflt = function () { return [u8, u16, u32, fleb, fdeb, clim, revfl, revfd, flm, flt, fdm, fdt, rev, deo, et, hMap, wbits, wbits16, hTree, ln, lc, clen, wfblk, wblk, shft, slc, dflt, dopt, deflateSync, pbf]; };
// gzip extra
var gze = function () { return [gzh, gzhl, wbytes, crc, crct]; };
// gunzip extra
var guze = function () { return [gzs, gzl]; };
// zlib extra
var zle = function () { return [zlh, wbytes, adler]; };
// unzlib extra
var zule = function () { return [zlv]; };
// post buf
var pbf = function (msg) { return postMessage(msg, [msg.buffer]); };
// get u8
var gu8 = function (o) { return o && o.size && new u8(o.size); };
// async helper
var cbify = function (dat, opts, fns, init, id, cb) {
    var w = wrkr(fns, init, id, function (err, dat) {
        w.terminate();
        cb(err, dat);
    });
    w.postMessage([dat, opts], opts.consume ? [dat.buffer] : []);
    return function () { w.terminate(); };
};
// auto stream
var astrm = function (strm) {
    strm.ondata = function (dat, final) { return postMessage([dat, final], [dat.buffer]); };
    return function (ev) { return strm.push(ev.data[0], ev.data[1]); };
};
// async stream attach
var astrmify = function (fns, strm, opts, init, id) {
    var t;
    var w = wrkr(fns, init, id, function (err, dat) {
        if (err)
            w.terminate(), strm.ondata.call(strm, err);
        else {
            if (dat[1])
                w.terminate();
            strm.ondata.call(strm, err, dat[0], dat[1]);
        }
    });
    w.postMessage(opts);
    strm.push = function (d, f) {
        if (!strm.ondata)
            err(5);
        if (t)
            strm.ondata(err(4, 0, 1), null, !!f);
        w.postMessage([d, t = f], [d.buffer]);
    };
    strm.terminate = function () { w.terminate(); };
};
// read 2 bytes
var b2 = function (d, b) { return d[b] | (d[b + 1] << 8); };
// read 4 bytes
var b4 = function (d, b) { return (d[b] | (d[b + 1] << 8) | (d[b + 2] << 16) | (d[b + 3] << 24)) >>> 0; };
var b8 = function (d, b) { return b4(d, b) + (b4(d, b + 4) * 4294967296); };
// write bytes
var wbytes = function (d, b, v) {
    for (; v; ++b)
        d[b] = v, v >>>= 8;
};
// gzip header
var gzh = function (c, o) {
    var fn = o.filename;
    c[0] = 31, c[1] = 139, c[2] = 8, c[8] = o.level < 2 ? 4 : o.level == 9 ? 2 : 0, c[9] = 3; // assume Unix
    if (o.mtime != 0)
        wbytes(c, 4, Math.floor(new Date(o.mtime || Date.now()) / 1000));
    if (fn) {
        c[3] = 8;
        for (var i = 0; i <= fn.length; ++i)
            c[i + 10] = fn.charCodeAt(i);
    }
};
// gzip footer: -8 to -4 = CRC, -4 to -0 is length
// gzip start
var gzs = function (d) {
    if (d[0] != 31 || d[1] != 139 || d[2] != 8)
        err(6, 'invalid gzip data');
    var flg = d[3];
    var st = 10;
    if (flg & 4)
        st += d[10] | (d[11] << 8) + 2;
    for (var zs = (flg >> 3 & 1) + (flg >> 4 & 1); zs > 0; zs -= !d[st++])
        ;
    return st + (flg & 2);
};
// gzip length
var gzl = function (d) {
    var l = d.length;
    return ((d[l - 4] | d[l - 3] << 8 | d[l - 2] << 16) | (d[l - 1] << 24)) >>> 0;
};
// gzip header length
var gzhl = function (o) { return 10 + ((o.filename && (o.filename.length + 1)) || 0); };
// zlib header
var zlh = function (c, o) {
    var lv = o.level, fl = lv == 0 ? 0 : lv < 6 ? 1 : lv == 9 ? 3 : 2;
    c[0] = 120, c[1] = (fl << 6) | (fl ? (32 - 2 * fl) : 1);
};
// zlib valid
var zlv = function (d) {
    if ((d[0] & 15) != 8 || (d[0] >>> 4) > 7 || ((d[0] << 8 | d[1]) % 31))
        err(6, 'invalid zlib data');
    if (d[1] & 32)
        err(6, 'invalid zlib data: preset dictionaries not supported');
};
function AsyncCmpStrm(opts, cb) {
    if (!cb && typeof opts == 'function')
        cb = opts, opts = {};
    this.ondata = cb;
    return opts;
}
// zlib footer: -4 to -0 is Adler32
/**
 * Streaming DEFLATE compression
 */
var Deflate = /*#__PURE__*/ (function () {
    function Deflate(opts, cb) {
        if (!cb && typeof opts == 'function')
            cb = opts, opts = {};
        this.ondata = cb;
        this.o = opts || {};
    }
    Deflate.prototype.p = function (c, f) {
        this.ondata(dopt(c, this.o, 0, 0, !f), f);
    };
    /**
     * Pushes a chunk to be deflated
     * @param chunk The chunk to push
     * @param final Whether this is the last chunk
     */
    Deflate.prototype.push = function (chunk, final) {
        if (!this.ondata)
            err(5);
        if (this.d)
            err(4);
        this.d = final;
        this.p(chunk, final || false);
    };
    return Deflate;
}());

/**
 * Asynchronous streaming DEFLATE compression
 */
var AsyncDeflate = /*#__PURE__*/ (function () {
    function AsyncDeflate(opts, cb) {
        astrmify([
            bDflt,
            function () { return [astrm, Deflate]; }
        ], this, AsyncCmpStrm.call(this, opts, cb), function (ev) {
            var strm = new Deflate(ev.data);
            onmessage = astrm(strm);
        }, 6);
    }
    return AsyncDeflate;
}());

function deflate(data, opts, cb) {
    if (!cb)
        cb = opts, opts = {};
    if (typeof cb != 'function')
        err(7);
    return cbify(data, opts, [
        bDflt,
    ], function (ev) { return pbf(deflateSync(ev.data[0], ev.data[1])); }, 0, cb);
}
/**
 * Compresses data with DEFLATE without any wrapper
 * @param data The data to compress
 * @param opts The compression options
 * @returns The deflated version of the data
 */
function deflateSync(data, opts) {
    return dopt(data, opts || {}, 0, 0);
}
/**
 * Streaming DEFLATE decompression
 */
var Inflate = /*#__PURE__*/ (function () {
    /**
     * Creates an inflation stream
     * @param cb The callback to call whenever data is inflated
     */
    function Inflate(cb) {
        this.s = {};
        this.p = new u8(0);
        this.ondata = cb;
    }
    Inflate.prototype.e = function (c) {
        if (!this.ondata)
            err(5);
        if (this.d)
            err(4);
        var l = this.p.length;
        var n = new u8(l + c.length);
        n.set(this.p), n.set(c, l), this.p = n;
    };
    Inflate.prototype.c = function (final) {
        this.d = this.s.i = final || false;
        var bts = this.s.b;
        var dt = inflt(this.p, this.o, this.s);
        this.ondata(slc(dt, bts, this.s.b), this.d);
        this.o = slc(dt, this.s.b - 32768), this.s.b = this.o.length;
        this.p = slc(this.p, (this.s.p / 8) | 0), this.s.p &= 7;
    };
    /**
     * Pushes a chunk to be inflated
     * @param chunk The chunk to push
     * @param final Whether this is the final chunk
     */
    Inflate.prototype.push = function (chunk, final) {
        this.e(chunk), this.c(final);
    };
    return Inflate;
}());

/**
 * Asynchronous streaming DEFLATE decompression
 */
var AsyncInflate = /*#__PURE__*/ (function () {
    /**
     * Creates an asynchronous inflation stream
     * @param cb The callback to call whenever data is deflated
     */
    function AsyncInflate(cb) {
        this.ondata = cb;
        astrmify([
            bInflt,
            function () { return [astrm, Inflate]; }
        ], this, 0, function () {
            var strm = new Inflate();
            onmessage = astrm(strm);
        }, 7);
    }
    return AsyncInflate;
}());

function inflate(data, opts, cb) {
    if (!cb)
        cb = opts, opts = {};
    if (typeof cb != 'function')
        err(7);
    return cbify(data, opts, [
        bInflt
    ], function (ev) { return pbf(inflateSync(ev.data[0], gu8(ev.data[1]))); }, 1, cb);
}
/**
 * Expands DEFLATE data with no wrapper
 * @param data The data to decompress
 * @param out Where to write the data. Saves memory if you know the decompressed size and provide an output buffer of that length.
 * @returns The decompressed version of the data
 */
function inflateSync(data, out) {
    return inflt(data, out);
}
// before you yell at me for not just using extends, my reason is that TS inheritance is hard to workerize.
/**
 * Streaming GZIP compression
 */
var Gzip = /*#__PURE__*/ (function () {
    function Gzip(opts, cb) {
        this.c = crc();
        this.l = 0;
        this.v = 1;
        Deflate.call(this, opts, cb);
    }
    /**
     * Pushes a chunk to be GZIPped
     * @param chunk The chunk to push
     * @param final Whether this is the last chunk
     */
    Gzip.prototype.push = function (chunk, final) {
        Deflate.prototype.push.call(this, chunk, final);
    };
    Gzip.prototype.p = function (c, f) {
        this.c.p(c);
        this.l += c.length;
        var raw = dopt(c, this.o, this.v && gzhl(this.o), f && 8, !f);
        if (this.v)
            gzh(raw, this.o), this.v = 0;
        if (f)
            wbytes(raw, raw.length - 8, this.c.d()), wbytes(raw, raw.length - 4, this.l);
        this.ondata(raw, f);
    };
    return Gzip;
}());

/**
 * Asynchronous streaming GZIP compression
 */
var AsyncGzip = /*#__PURE__*/ (function () {
    function AsyncGzip(opts, cb) {
        astrmify([
            bDflt,
            gze,
            function () { return [astrm, Deflate, Gzip]; }
        ], this, AsyncCmpStrm.call(this, opts, cb), function (ev) {
            var strm = new Gzip(ev.data);
            onmessage = astrm(strm);
        }, 8);
    }
    return AsyncGzip;
}());

function gzip(data, opts, cb) {
    if (!cb)
        cb = opts, opts = {};
    if (typeof cb != 'function')
        err(7);
    return cbify(data, opts, [
        bDflt,
        gze,
        function () { return [gzipSync]; }
    ], function (ev) { return pbf(gzipSync(ev.data[0], ev.data[1])); }, 2, cb);
}
/**
 * Compresses data with GZIP
 * @param data The data to compress
 * @param opts The compression options
 * @returns The gzipped version of the data
 */
function gzipSync(data, opts) {
    if (!opts)
        opts = {};
    var c = crc(), l = data.length;
    c.p(data);
    var d = dopt(data, opts, gzhl(opts), 8), s = d.length;
    return gzh(d, opts), wbytes(d, s - 8, c.d()), wbytes(d, s - 4, l), d;
}
/**
 * Streaming GZIP decompression
 */
var Gunzip = /*#__PURE__*/ (function () {
    /**
     * Creates a GUNZIP stream
     * @param cb The callback to call whenever data is inflated
     */
    function Gunzip(cb) {
        this.v = 1;
        Inflate.call(this, cb);
    }
    /**
     * Pushes a chunk to be GUNZIPped
     * @param chunk The chunk to push
     * @param final Whether this is the last chunk
     */
    Gunzip.prototype.push = function (chunk, final) {
        Inflate.prototype.e.call(this, chunk);
        if (this.v) {
            var s = this.p.length > 3 ? gzs(this.p) : 4;
            if (s >= this.p.length && !final)
                return;
            this.p = this.p.subarray(s), this.v = 0;
        }
        if (final) {
            if (this.p.length < 8)
                err(6, 'invalid gzip data');
            this.p = this.p.subarray(0, -8);
        }
        // necessary to prevent TS from using the closure value
        // This allows for workerization to function correctly
        Inflate.prototype.c.call(this, final);
    };
    return Gunzip;
}());

/**
 * Asynchronous streaming GZIP decompression
 */
var AsyncGunzip = /*#__PURE__*/ (function () {
    /**
     * Creates an asynchronous GUNZIP stream
     * @param cb The callback to call whenever data is deflated
     */
    function AsyncGunzip(cb) {
        this.ondata = cb;
        astrmify([
            bInflt,
            guze,
            function () { return [astrm, Inflate, Gunzip]; }
        ], this, 0, function () {
            var strm = new Gunzip();
            onmessage = astrm(strm);
        }, 9);
    }
    return AsyncGunzip;
}());

function gunzip(data, opts, cb) {
    if (!cb)
        cb = opts, opts = {};
    if (typeof cb != 'function')
        err(7);
    return cbify(data, opts, [
        bInflt,
        guze,
        function () { return [gunzipSync]; }
    ], function (ev) { return pbf(gunzipSync(ev.data[0])); }, 3, cb);
}
/**
 * Expands GZIP data
 * @param data The data to decompress
 * @param out Where to write the data. GZIP already encodes the output size, so providing this doesn't save memory.
 * @returns The decompressed version of the data
 */
function gunzipSync(data, out) {
    return inflt(data.subarray(gzs(data), -8), out || new u8(gzl(data)));
}
/**
 * Streaming Zlib compression
 */
var Zlib = /*#__PURE__*/ (function () {
    function Zlib(opts, cb) {
        this.c = adler();
        this.v = 1;
        Deflate.call(this, opts, cb);
    }
    /**
     * Pushes a chunk to be zlibbed
     * @param chunk The chunk to push
     * @param final Whether this is the last chunk
     */
    Zlib.prototype.push = function (chunk, final) {
        Deflate.prototype.push.call(this, chunk, final);
    };
    Zlib.prototype.p = function (c, f) {
        this.c.p(c);
        var raw = dopt(c, this.o, this.v && 2, f && 4, !f);
        if (this.v)
            zlh(raw, this.o), this.v = 0;
        if (f)
            wbytes(raw, raw.length - 4, this.c.d());
        this.ondata(raw, f);
    };
    return Zlib;
}());

/**
 * Asynchronous streaming Zlib compression
 */
var AsyncZlib = /*#__PURE__*/ (function () {
    function AsyncZlib(opts, cb) {
        astrmify([
            bDflt,
            zle,
            function () { return [astrm, Deflate, Zlib]; }
        ], this, AsyncCmpStrm.call(this, opts, cb), function (ev) {
            var strm = new Zlib(ev.data);
            onmessage = astrm(strm);
        }, 10);
    }
    return AsyncZlib;
}());

function zlib(data, opts, cb) {
    if (!cb)
        cb = opts, opts = {};
    if (typeof cb != 'function')
        err(7);
    return cbify(data, opts, [
        bDflt,
        zle,
        function () { return [zlibSync]; }
    ], function (ev) { return pbf(zlibSync(ev.data[0], ev.data[1])); }, 4, cb);
}
/**
 * Compress data with Zlib
 * @param data The data to compress
 * @param opts The compression options
 * @returns The zlib-compressed version of the data
 */
function zlibSync(data, opts) {
    if (!opts)
        opts = {};
    var a = adler();
    a.p(data);
    var d = dopt(data, opts, 2, 4);
    return zlh(d, opts), wbytes(d, d.length - 4, a.d()), d;
}
/**
 * Streaming Zlib decompression
 */
var Unzlib = /*#__PURE__*/ (function () {
    /**
     * Creates a Zlib decompression stream
     * @param cb The callback to call whenever data is inflated
     */
    function Unzlib(cb) {
        this.v = 1;
        Inflate.call(this, cb);
    }
    /**
     * Pushes a chunk to be unzlibbed
     * @param chunk The chunk to push
     * @param final Whether this is the last chunk
     */
    Unzlib.prototype.push = function (chunk, final) {
        Inflate.prototype.e.call(this, chunk);
        if (this.v) {
            if (this.p.length < 2 && !final)
                return;
            this.p = this.p.subarray(2), this.v = 0;
        }
        if (final) {
            if (this.p.length < 4)
                err(6, 'invalid zlib data');
            this.p = this.p.subarray(0, -4);
        }
        // necessary to prevent TS from using the closure value
        // This allows for workerization to function correctly
        Inflate.prototype.c.call(this, final);
    };
    return Unzlib;
}());

/**
 * Asynchronous streaming Zlib decompression
 */
var AsyncUnzlib = /*#__PURE__*/ (function () {
    /**
     * Creates an asynchronous Zlib decompression stream
     * @param cb The callback to call whenever data is deflated
     */
    function AsyncUnzlib(cb) {
        this.ondata = cb;
        astrmify([
            bInflt,
            zule,
            function () { return [astrm, Inflate, Unzlib]; }
        ], this, 0, function () {
            var strm = new Unzlib();
            onmessage = astrm(strm);
        }, 11);
    }
    return AsyncUnzlib;
}());

function unzlib(data, opts, cb) {
    if (!cb)
        cb = opts, opts = {};
    if (typeof cb != 'function')
        err(7);
    return cbify(data, opts, [
        bInflt,
        zule,
        function () { return [unzlibSync]; }
    ], function (ev) { return pbf(unzlibSync(ev.data[0], gu8(ev.data[1]))); }, 5, cb);
}
/**
 * Expands Zlib data
 * @param data The data to decompress
 * @param out Where to write the data. Saves memory if you know the decompressed size and provide an output buffer of that length.
 * @returns The decompressed version of the data
 */
function unzlibSync(data, out) {
    return inflt((zlv(data), data.subarray(2, -4)), out);
}
// Default algorithm for compression (used because having a known output size allows faster decompression)

// Default algorithm for compression (used because having a known output size allows faster decompression)

/**
 * Streaming GZIP, Zlib, or raw DEFLATE decompression
 */
var Decompress = /*#__PURE__*/ (function () {
    /**
     * Creates a decompression stream
     * @param cb The callback to call whenever data is decompressed
     */
    function Decompress(cb) {
        this.G = Gunzip;
        this.I = Inflate;
        this.Z = Unzlib;
        this.ondata = cb;
    }
    /**
     * Pushes a chunk to be decompressed
     * @param chunk The chunk to push
     * @param final Whether this is the last chunk
     */
    Decompress.prototype.push = function (chunk, final) {
        if (!this.ondata)
            err(5);
        if (!this.s) {
            if (this.p && this.p.length) {
                var n = new u8(this.p.length + chunk.length);
                n.set(this.p), n.set(chunk, this.p.length);
            }
            else
                this.p = chunk;
            if (this.p.length > 2) {
                var _this_1 = this;
                var cb = function () { _this_1.ondata.apply(_this_1, arguments); };
                this.s = (this.p[0] == 31 && this.p[1] == 139 && this.p[2] == 8)
                    ? new this.G(cb)
                    : ((this.p[0] & 15) != 8 || (this.p[0] >> 4) > 7 || ((this.p[0] << 8 | this.p[1]) % 31))
                        ? new this.I(cb)
                        : new this.Z(cb);
                this.s.push(this.p, final);
                this.p = null;
            }
        }
        else
            this.s.push(chunk, final);
    };
    return Decompress;
}());

/**
 * Asynchronous streaming GZIP, Zlib, or raw DEFLATE decompression
 */
var AsyncDecompress = /*#__PURE__*/ (function () {
    /**
   * Creates an asynchronous decompression stream
   * @param cb The callback to call whenever data is decompressed
   */
    function AsyncDecompress(cb) {
        this.G = AsyncGunzip;
        this.I = AsyncInflate;
        this.Z = AsyncUnzlib;
        this.ondata = cb;
    }
    /**
     * Pushes a chunk to be decompressed
     * @param chunk The chunk to push
     * @param final Whether this is the last chunk
     */
    AsyncDecompress.prototype.push = function (chunk, final) {
        Decompress.prototype.push.call(this, chunk, final);
    };
    return AsyncDecompress;
}());

function decompress(data, opts, cb) {
    if (!cb)
        cb = opts, opts = {};
    if (typeof cb != 'function')
        err(7);
    return (data[0] == 31 && data[1] == 139 && data[2] == 8)
        ? gunzip(data, opts, cb)
        : ((data[0] & 15) != 8 || (data[0] >> 4) > 7 || ((data[0] << 8 | data[1]) % 31))
            ? inflate(data, opts, cb)
            : unzlib(data, opts, cb);
}
/**
 * Expands compressed GZIP, Zlib, or raw DEFLATE data, automatically detecting the format
 * @param data The data to decompress
 * @param out Where to write the data. Saves memory if you know the decompressed size and provide an output buffer of that length.
 * @returns The decompressed version of the data
 */
function decompressSync(data, out) {
    return (data[0] == 31 && data[1] == 139 && data[2] == 8)
        ? gunzipSync(data, out)
        : ((data[0] & 15) != 8 || (data[0] >> 4) > 7 || ((data[0] << 8 | data[1]) % 31))
            ? inflateSync(data, out)
            : unzlibSync(data, out);
}
// flatten a directory structure
var fltn = function (d, p, t, o) {
    for (var k in d) {
        var val = d[k], n = p + k, op = o;
        if (Array.isArray(val))
            op = mrg(o, val[1]), val = val[0];
        if (val instanceof u8)
            t[n] = [val, op];
        else {
            t[n += '/'] = [new u8(0), op];
            fltn(val, n, t, o);
        }
    }
};
// text encoder
var te = typeof TextEncoder != 'undefined' && /*#__PURE__*/ new TextEncoder();
// text decoder
var td = typeof TextDecoder != 'undefined' && /*#__PURE__*/ new TextDecoder();
// text decoder stream
var tds = 0;
try {
    td.decode(et, { stream: true });
    tds = 1;
}
catch (e) { }
// decode UTF8
var dutf8 = function (d) {
    for (var r = '', i = 0;;) {
        var c = d[i++];
        var eb = (c > 127) + (c > 223) + (c > 239);
        if (i + eb > d.length)
            return [r, slc(d, i - 1)];
        if (!eb)
            r += String.fromCharCode(c);
        else if (eb == 3) {
            c = ((c & 15) << 18 | (d[i++] & 63) << 12 | (d[i++] & 63) << 6 | (d[i++] & 63)) - 65536,
                r += String.fromCharCode(55296 | (c >> 10), 56320 | (c & 1023));
        }
        else if (eb & 1)
            r += String.fromCharCode((c & 31) << 6 | (d[i++] & 63));
        else
            r += String.fromCharCode((c & 15) << 12 | (d[i++] & 63) << 6 | (d[i++] & 63));
    }
};
/**
 * Streaming UTF-8 decoding
 */
var DecodeUTF8 = /*#__PURE__*/ (function () {
    /**
     * Creates a UTF-8 decoding stream
     * @param cb The callback to call whenever data is decoded
     */
    function DecodeUTF8(cb) {
        this.ondata = cb;
        if (tds)
            this.t = new TextDecoder();
        else
            this.p = et;
    }
    /**
     * Pushes a chunk to be decoded from UTF-8 binary
     * @param chunk The chunk to push
     * @param final Whether this is the last chunk
     */
    DecodeUTF8.prototype.push = function (chunk, final) {
        if (!this.ondata)
            err(5);
        final = !!final;
        if (this.t) {
            this.ondata(this.t.decode(chunk, { stream: true }), final);
            if (final) {
                if (this.t.decode().length)
                    err(8);
                this.t = null;
            }
            return;
        }
        if (!this.p)
            err(4);
        var dat = new u8(this.p.length + chunk.length);
        dat.set(this.p);
        dat.set(chunk, this.p.length);
        var _a = dutf8(dat), ch = _a[0], np = _a[1];
        if (final) {
            if (np.length)
                err(8);
            this.p = null;
        }
        else
            this.p = np;
        this.ondata(ch, final);
    };
    return DecodeUTF8;
}());

/**
 * Streaming UTF-8 encoding
 */
var EncodeUTF8 = /*#__PURE__*/ (function () {
    /**
     * Creates a UTF-8 decoding stream
     * @param cb The callback to call whenever data is encoded
     */
    function EncodeUTF8(cb) {
        this.ondata = cb;
    }
    /**
     * Pushes a chunk to be encoded to UTF-8
     * @param chunk The string data to push
     * @param final Whether this is the last chunk
     */
    EncodeUTF8.prototype.push = function (chunk, final) {
        if (!this.ondata)
            err(5);
        if (this.d)
            err(4);
        this.ondata(strToU8(chunk), this.d = final || false);
    };
    return EncodeUTF8;
}());

/**
 * Converts a string into a Uint8Array for use with compression/decompression methods
 * @param str The string to encode
 * @param latin1 Whether or not to interpret the data as Latin-1. This should
 *               not need to be true unless decoding a binary string.
 * @returns The string encoded in UTF-8/Latin-1 binary
 */
function strToU8(str, latin1) {
    if (latin1) {
        var ar_1 = new u8(str.length);
        for (var i = 0; i < str.length; ++i)
            ar_1[i] = str.charCodeAt(i);
        return ar_1;
    }
    if (te)
        return te.encode(str);
    var l = str.length;
    var ar = new u8(str.length + (str.length >> 1));
    var ai = 0;
    var w = function (v) { ar[ai++] = v; };
    for (var i = 0; i < l; ++i) {
        if (ai + 5 > ar.length) {
            var n = new u8(ai + 8 + ((l - i) << 1));
            n.set(ar);
            ar = n;
        }
        var c = str.charCodeAt(i);
        if (c < 128 || latin1)
            w(c);
        else if (c < 2048)
            w(192 | (c >> 6)), w(128 | (c & 63));
        else if (c > 55295 && c < 57344)
            c = 65536 + (c & 1023 << 10) | (str.charCodeAt(++i) & 1023),
                w(240 | (c >> 18)), w(128 | ((c >> 12) & 63)), w(128 | ((c >> 6) & 63)), w(128 | (c & 63));
        else
            w(224 | (c >> 12)), w(128 | ((c >> 6) & 63)), w(128 | (c & 63));
    }
    return slc(ar, 0, ai);
}
/**
 * Converts a Uint8Array to a string
 * @param dat The data to decode to string
 * @param latin1 Whether or not to interpret the data as Latin-1. This should
 *               not need to be true unless encoding to binary string.
 * @returns The original UTF-8/Latin-1 string
 */
function strFromU8(dat, latin1) {
    if (latin1) {
        var r = '';
        for (var i = 0; i < dat.length; i += 16384)
            r += String.fromCharCode.apply(null, dat.subarray(i, i + 16384));
        return r;
    }
    else if (td)
        return td.decode(dat);
    else {
        var _a = dutf8(dat), out = _a[0], ext = _a[1];
        if (ext.length)
            err(8);
        return out;
    }
}
;
// deflate bit flag
var dbf = function (l) { return l == 1 ? 3 : l < 6 ? 2 : l == 9 ? 1 : 0; };
// skip local zip header
var slzh = function (d, b) { return b + 30 + b2(d, b + 26) + b2(d, b + 28); };
// read zip header
var zh = function (d, b, z) {
    var fnl = b2(d, b + 28), fn = strFromU8(d.subarray(b + 46, b + 46 + fnl), !(b2(d, b + 8) & 2048)), es = b + 46 + fnl, bs = b4(d, b + 20);
    var _a = z && bs == 4294967295 ? z64e(d, es) : [bs, b4(d, b + 24), b4(d, b + 42)], sc = _a[0], su = _a[1], off = _a[2];
    return [b2(d, b + 10), sc, su, fn, es + b2(d, b + 30) + b2(d, b + 32), off];
};
// read zip64 extra field
var z64e = function (d, b) {
    for (; b2(d, b) != 1; b += 4 + b2(d, b + 2))
        ;
    return [b8(d, b + 12), b8(d, b + 4), b8(d, b + 20)];
};
// extra field length
var exfl = function (ex) {
    var le = 0;
    if (ex) {
        for (var k in ex) {
            var l = ex[k].length;
            if (l > 65535)
                err(9);
            le += l + 4;
        }
    }
    return le;
};
// write zip header
var wzh = function (d, b, f, fn, u, c, ce, co) {
    var fl = fn.length, ex = f.extra, col = co && co.length;
    var exl = exfl(ex);
    wbytes(d, b, ce != null ? 0x2014B50 : 0x4034B50), b += 4;
    if (ce != null)
        d[b++] = 20, d[b++] = f.os;
    d[b] = 20, b += 2; // spec compliance? what's that?
    d[b++] = (f.flag << 1) | (c == null && 8), d[b++] = u && 8;
    d[b++] = f.compression & 255, d[b++] = f.compression >> 8;
    var dt = new Date(f.mtime == null ? Date.now() : f.mtime), y = dt.getFullYear() - 1980;
    if (y < 0 || y > 119)
        err(10);
    wbytes(d, b, (y << 25) | ((dt.getMonth() + 1) << 21) | (dt.getDate() << 16) | (dt.getHours() << 11) | (dt.getMinutes() << 5) | (dt.getSeconds() >>> 1)), b += 4;
    if (c != null) {
        wbytes(d, b, f.crc);
        wbytes(d, b + 4, c);
        wbytes(d, b + 8, f.size);
    }
    wbytes(d, b + 12, fl);
    wbytes(d, b + 14, exl), b += 16;
    if (ce != null) {
        wbytes(d, b, col);
        wbytes(d, b + 6, f.attrs);
        wbytes(d, b + 10, ce), b += 14;
    }
    d.set(fn, b);
    b += fl;
    if (exl) {
        for (var k in ex) {
            var exf = ex[k], l = exf.length;
            wbytes(d, b, +k);
            wbytes(d, b + 2, l);
            d.set(exf, b + 4), b += 4 + l;
        }
    }
    if (col)
        d.set(co, b), b += col;
    return b;
};
// write zip footer (end of central directory)
var wzf = function (o, b, c, d, e) {
    wbytes(o, b, 0x6054B50); // skip disk
    wbytes(o, b + 8, c);
    wbytes(o, b + 10, c);
    wbytes(o, b + 12, d);
    wbytes(o, b + 16, e);
};
/**
 * A pass-through stream to keep data uncompressed in a ZIP archive.
 */
var ZipPassThrough = /*#__PURE__*/ (function () {
    /**
     * Creates a pass-through stream that can be added to ZIP archives
     * @param filename The filename to associate with this data stream
     */
    function ZipPassThrough(filename) {
        this.filename = filename;
        this.c = crc();
        this.size = 0;
        this.compression = 0;
    }
    /**
     * Processes a chunk and pushes to the output stream. You can override this
     * method in a subclass for custom behavior, but by default this passes
     * the data through. You must call this.ondata(err, chunk, final) at some
     * point in this method.
     * @param chunk The chunk to process
     * @param final Whether this is the last chunk
     */
    ZipPassThrough.prototype.process = function (chunk, final) {
        this.ondata(null, chunk, final);
    };
    /**
     * Pushes a chunk to be added. If you are subclassing this with a custom
     * compression algorithm, note that you must push data from the source
     * file only, pre-compression.
     * @param chunk The chunk to push
     * @param final Whether this is the last chunk
     */
    ZipPassThrough.prototype.push = function (chunk, final) {
        if (!this.ondata)
            err(5);
        this.c.p(chunk);
        this.size += chunk.length;
        if (final)
            this.crc = this.c.d();
        this.process(chunk, final || false);
    };
    return ZipPassThrough;
}());

// I don't extend because TypeScript extension adds 1kB of runtime bloat
/**
 * Streaming DEFLATE compression for ZIP archives. Prefer using AsyncZipDeflate
 * for better performance
 */
var ZipDeflate = /*#__PURE__*/ (function () {
    /**
     * Creates a DEFLATE stream that can be added to ZIP archives
     * @param filename The filename to associate with this data stream
     * @param opts The compression options
     */
    function ZipDeflate(filename, opts) {
        var _this_1 = this;
        if (!opts)
            opts = {};
        ZipPassThrough.call(this, filename);
        this.d = new Deflate(opts, function (dat, final) {
            _this_1.ondata(null, dat, final);
        });
        this.compression = 8;
        this.flag = dbf(opts.level);
    }
    ZipDeflate.prototype.process = function (chunk, final) {
        try {
            this.d.push(chunk, final);
        }
        catch (e) {
            this.ondata(e, null, final);
        }
    };
    /**
     * Pushes a chunk to be deflated
     * @param chunk The chunk to push
     * @param final Whether this is the last chunk
     */
    ZipDeflate.prototype.push = function (chunk, final) {
        ZipPassThrough.prototype.push.call(this, chunk, final);
    };
    return ZipDeflate;
}());

/**
 * Asynchronous streaming DEFLATE compression for ZIP archives
 */
var AsyncZipDeflate = /*#__PURE__*/ (function () {
    /**
     * Creates a DEFLATE stream that can be added to ZIP archives
     * @param filename The filename to associate with this data stream
     * @param opts The compression options
     */
    function AsyncZipDeflate(filename, opts) {
        var _this_1 = this;
        if (!opts)
            opts = {};
        ZipPassThrough.call(this, filename);
        this.d = new AsyncDeflate(opts, function (err, dat, final) {
            _this_1.ondata(err, dat, final);
        });
        this.compression = 8;
        this.flag = dbf(opts.level);
        this.terminate = this.d.terminate;
    }
    AsyncZipDeflate.prototype.process = function (chunk, final) {
        this.d.push(chunk, final);
    };
    /**
     * Pushes a chunk to be deflated
     * @param chunk The chunk to push
     * @param final Whether this is the last chunk
     */
    AsyncZipDeflate.prototype.push = function (chunk, final) {
        ZipPassThrough.prototype.push.call(this, chunk, final);
    };
    return AsyncZipDeflate;
}());

// TODO: Better tree shaking
/**
 * A zippable archive to which files can incrementally be added
 */
var Zip = /*#__PURE__*/ (function () {
    /**
     * Creates an empty ZIP archive to which files can be added
     * @param cb The callback to call whenever data for the generated ZIP archive
     *           is available
     */
    function Zip(cb) {
        this.ondata = cb;
        this.u = [];
        this.d = 1;
    }
    /**
     * Adds a file to the ZIP archive
     * @param file The file stream to add
     */
    Zip.prototype.add = function (file) {
        var _this_1 = this;
        if (!this.ondata)
            err(5);
        // finishing or finished
        if (this.d & 2)
            this.ondata(err(4 + (this.d & 1) * 8, 0, 1), null, false);
        else {
            var f = strToU8(file.filename), fl_1 = f.length;
            var com = file.comment, o = com && strToU8(com);
            var u = fl_1 != file.filename.length || (o && (com.length != o.length));
            var hl_1 = fl_1 + exfl(file.extra) + 30;
            if (fl_1 > 65535)
                this.ondata(err(11, 0, 1), null, false);
            var header = new u8(hl_1);
            wzh(header, 0, file, f, u);
            var chks_1 = [header];
            var pAll_1 = function () {
                for (var _i = 0, chks_2 = chks_1; _i < chks_2.length; _i++) {
                    var chk = chks_2[_i];
                    _this_1.ondata(null, chk, false);
                }
                chks_1 = [];
            };
            var tr_1 = this.d;
            this.d = 0;
            var ind_1 = this.u.length;
            var uf_1 = mrg(file, {
                f: f,
                u: u,
                o: o,
                t: function () {
                    if (file.terminate)
                        file.terminate();
                },
                r: function () {
                    pAll_1();
                    if (tr_1) {
                        var nxt = _this_1.u[ind_1 + 1];
                        if (nxt)
                            nxt.r();
                        else
                            _this_1.d = 1;
                    }
                    tr_1 = 1;
                }
            });
            var cl_1 = 0;
            file.ondata = function (err, dat, final) {
                if (err) {
                    _this_1.ondata(err, dat, final);
                    _this_1.terminate();
                }
                else {
                    cl_1 += dat.length;
                    chks_1.push(dat);
                    if (final) {
                        var dd = new u8(16);
                        wbytes(dd, 0, 0x8074B50);
                        wbytes(dd, 4, file.crc);
                        wbytes(dd, 8, cl_1);
                        wbytes(dd, 12, file.size);
                        chks_1.push(dd);
                        uf_1.c = cl_1, uf_1.b = hl_1 + cl_1 + 16, uf_1.crc = file.crc, uf_1.size = file.size;
                        if (tr_1)
                            uf_1.r();
                        tr_1 = 1;
                    }
                    else if (tr_1)
                        pAll_1();
                }
            };
            this.u.push(uf_1);
        }
    };
    /**
     * Ends the process of adding files and prepares to emit the final chunks.
     * This *must* be called after adding all desired files for the resulting
     * ZIP file to work properly.
     */
    Zip.prototype.end = function () {
        var _this_1 = this;
        if (this.d & 2) {
            this.ondata(err(4 + (this.d & 1) * 8, 0, 1), null, true);
            return;
        }
        if (this.d)
            this.e();
        else
            this.u.push({
                r: function () {
                    if (!(_this_1.d & 1))
                        return;
                    _this_1.u.splice(-1, 1);
                    _this_1.e();
                },
                t: function () { }
            });
        this.d = 3;
    };
    Zip.prototype.e = function () {
        var bt = 0, l = 0, tl = 0;
        for (var _i = 0, _a = this.u; _i < _a.length; _i++) {
            var f = _a[_i];
            tl += 46 + f.f.length + exfl(f.extra) + (f.o ? f.o.length : 0);
        }
        var out = new u8(tl + 22);
        for (var _b = 0, _c = this.u; _b < _c.length; _b++) {
            var f = _c[_b];
            wzh(out, bt, f, f.f, f.u, f.c, l, f.o);
            bt += 46 + f.f.length + exfl(f.extra) + (f.o ? f.o.length : 0), l += f.b;
        }
        wzf(out, bt, this.u.length, tl, l);
        this.ondata(null, out, true);
        this.d = 2;
    };
    /**
     * A method to terminate any internal workers used by the stream. Subsequent
     * calls to add() will fail.
     */
    Zip.prototype.terminate = function () {
        for (var _i = 0, _a = this.u; _i < _a.length; _i++) {
            var f = _a[_i];
            f.t();
        }
        this.d = 2;
    };
    return Zip;
}());

function zip(data, opts, cb) {
    if (!cb)
        cb = opts, opts = {};
    if (typeof cb != 'function')
        err(7);
    var r = {};
    fltn(data, '', r, opts);
    var k = Object.keys(r);
    var lft = k.length, o = 0, tot = 0;
    var slft = lft, files = new Array(lft);
    var term = [];
    var tAll = function () {
        for (var i = 0; i < term.length; ++i)
            term[i]();
    };
    var cbd = function (a, b) {
        mt(function () { cb(a, b); });
    };
    mt(function () { cbd = cb; });
    var cbf = function () {
        var out = new u8(tot + 22), oe = o, cdl = tot - o;
        tot = 0;
        for (var i = 0; i < slft; ++i) {
            var f = files[i];
            try {
                var l = f.c.length;
                wzh(out, tot, f, f.f, f.u, l);
                var badd = 30 + f.f.length + exfl(f.extra);
                var loc = tot + badd;
                out.set(f.c, loc);
                wzh(out, o, f, f.f, f.u, l, tot, f.m), o += 16 + badd + (f.m ? f.m.length : 0), tot = loc + l;
            }
            catch (e) {
                return cbd(e, null);
            }
        }
        wzf(out, o, files.length, cdl, oe);
        cbd(null, out);
    };
    if (!lft)
        cbf();
    var _loop_1 = function (i) {
        var fn = k[i];
        var _a = r[fn], file = _a[0], p = _a[1];
        var c = crc(), size = file.length;
        c.p(file);
        var f = strToU8(fn), s = f.length;
        var com = p.comment, m = com && strToU8(com), ms = m && m.length;
        var exl = exfl(p.extra);
        var compression = p.level == 0 ? 0 : 8;
        var cbl = function (e, d) {
            if (e) {
                tAll();
                cbd(e, null);
            }
            else {
                var l = d.length;
                files[i] = mrg(p, {
                    size: size,
                    crc: c.d(),
                    c: d,
                    f: f,
                    m: m,
                    u: s != fn.length || (m && (com.length != ms)),
                    compression: compression
                });
                o += 30 + s + exl + l;
                tot += 76 + 2 * (s + exl) + (ms || 0) + l;
                if (!--lft)
                    cbf();
            }
        };
        if (s > 65535)
            cbl(err(11, 0, 1), null);
        if (!compression)
            cbl(null, file);
        else if (size < 160000) {
            try {
                cbl(null, deflateSync(file, p));
            }
            catch (e) {
                cbl(e, null);
            }
        }
        else
            term.push(deflate(file, p, cbl));
    };
    // Cannot use lft because it can decrease
    for (var i = 0; i < slft; ++i) {
        _loop_1(i);
    }
    return tAll;
}
/**
 * Synchronously creates a ZIP file. Prefer using `zip` for better performance
 * with more than one file.
 * @param data The directory structure for the ZIP archive
 * @param opts The main options, merged with per-file options
 * @returns The generated ZIP archive
 */
function zipSync(data, opts) {
    if (!opts)
        opts = {};
    var r = {};
    var files = [];
    fltn(data, '', r, opts);
    var o = 0;
    var tot = 0;
    for (var fn in r) {
        var _a = r[fn], file = _a[0], p = _a[1];
        var compression = p.level == 0 ? 0 : 8;
        var f = strToU8(fn), s = f.length;
        var com = p.comment, m = com && strToU8(com), ms = m && m.length;
        var exl = exfl(p.extra);
        if (s > 65535)
            err(11);
        var d = compression ? deflateSync(file, p) : file, l = d.length;
        var c = crc();
        c.p(file);
        files.push(mrg(p, {
            size: file.length,
            crc: c.d(),
            c: d,
            f: f,
            m: m,
            u: s != fn.length || (m && (com.length != ms)),
            o: o,
            compression: compression
        }));
        o += 30 + s + exl + l;
        tot += 76 + 2 * (s + exl) + (ms || 0) + l;
    }
    var out = new u8(tot + 22), oe = o, cdl = tot - o;
    for (var i = 0; i < files.length; ++i) {
        var f = files[i];
        wzh(out, f.o, f, f.f, f.u, f.c.length);
        var badd = 30 + f.f.length + exfl(f.extra);
        out.set(f.c, f.o + badd);
        wzh(out, o, f, f.f, f.u, f.c.length, f.o, f.m), o += 16 + badd + (f.m ? f.m.length : 0);
    }
    wzf(out, o, files.length, cdl, oe);
    return out;
}
/**
 * Streaming pass-through decompression for ZIP archives
 */
var UnzipPassThrough = /*#__PURE__*/ (function () {
    function UnzipPassThrough() {
    }
    UnzipPassThrough.prototype.push = function (data, final) {
        this.ondata(null, data, final);
    };
    UnzipPassThrough.compression = 0;
    return UnzipPassThrough;
}());

/**
 * Streaming DEFLATE decompression for ZIP archives. Prefer AsyncZipInflate for
 * better performance.
 */
var UnzipInflate = /*#__PURE__*/ (function () {
    /**
     * Creates a DEFLATE decompression that can be used in ZIP archives
     */
    function UnzipInflate() {
        var _this_1 = this;
        this.i = new Inflate(function (dat, final) {
            _this_1.ondata(null, dat, final);
        });
    }
    UnzipInflate.prototype.push = function (data, final) {
        try {
            this.i.push(data, final);
        }
        catch (e) {
            this.ondata(e, null, final);
        }
    };
    UnzipInflate.compression = 8;
    return UnzipInflate;
}());

/**
 * Asynchronous streaming DEFLATE decompression for ZIP archives
 */
var AsyncUnzipInflate = /*#__PURE__*/ (function () {
    /**
     * Creates a DEFLATE decompression that can be used in ZIP archives
     */
    function AsyncUnzipInflate(_, sz) {
        var _this_1 = this;
        if (sz < 320000) {
            this.i = new Inflate(function (dat, final) {
                _this_1.ondata(null, dat, final);
            });
        }
        else {
            this.i = new AsyncInflate(function (err, dat, final) {
                _this_1.ondata(err, dat, final);
            });
            this.terminate = this.i.terminate;
        }
    }
    AsyncUnzipInflate.prototype.push = function (data, final) {
        if (this.i.terminate)
            data = slc(data, 0);
        this.i.push(data, final);
    };
    AsyncUnzipInflate.compression = 8;
    return AsyncUnzipInflate;
}());

/**
 * A ZIP archive decompression stream that emits files as they are discovered
 */
var Unzip = /*#__PURE__*/ (function () {
    /**
     * Creates a ZIP decompression stream
     * @param cb The callback to call whenever a file in the ZIP archive is found
     */
    function Unzip(cb) {
        this.onfile = cb;
        this.k = [];
        this.o = {
            0: UnzipPassThrough
        };
        this.p = et;
    }
    /**
     * Pushes a chunk to be unzipped
     * @param chunk The chunk to push
     * @param final Whether this is the last chunk
     */
    Unzip.prototype.push = function (chunk, final) {
        var _this_1 = this;
        if (!this.onfile)
            err(5);
        if (!this.p)
            err(4);
        if (this.c > 0) {
            var len = Math.min(this.c, chunk.length);
            var toAdd = chunk.subarray(0, len);
            this.c -= len;
            if (this.d)
                this.d.push(toAdd, !this.c);
            else
                this.k[0].push(toAdd);
            chunk = chunk.subarray(len);
            if (chunk.length)
                return this.push(chunk, final);
        }
        else {
            var f = 0, i = 0, is = void 0, buf = void 0;
            if (!this.p.length)
                buf = chunk;
            else if (!chunk.length)
                buf = this.p;
            else {
                buf = new u8(this.p.length + chunk.length);
                buf.set(this.p), buf.set(chunk, this.p.length);
            }
            var l = buf.length, oc = this.c, add = oc && this.d;
            var _loop_2 = function () {
                var _a;
                var sig = b4(buf, i);
                if (sig == 0x4034B50) {
                    f = 1, is = i;
                    this_1.d = null;
                    this_1.c = 0;
                    var bf = b2(buf, i + 6), cmp_1 = b2(buf, i + 8), u = bf & 2048, dd = bf & 8, fnl = b2(buf, i + 26), es = b2(buf, i + 28);
                    if (l > i + 30 + fnl + es) {
                        var chks_3 = [];
                        this_1.k.unshift(chks_3);
                        f = 2;
                        var sc_1 = b4(buf, i + 18), su_1 = b4(buf, i + 22);
                        var fn_1 = strFromU8(buf.subarray(i + 30, i += 30 + fnl), !u);
                        if (sc_1 == 4294967295) {
                            _a = dd ? [-2] : z64e(buf, i), sc_1 = _a[0], su_1 = _a[1];
                        }
                        else if (dd)
                            sc_1 = -1;
                        i += es;
                        this_1.c = sc_1;
                        var d_1;
                        var file_1 = {
                            name: fn_1,
                            compression: cmp_1,
                            start: function () {
                                if (!file_1.ondata)
                                    err(5);
                                if (!sc_1)
                                    file_1.ondata(null, et, true);
                                else {
                                    var ctr = _this_1.o[cmp_1];
                                    if (!ctr)
                                        file_1.ondata(err(14, 'unknown compression type ' + cmp_1, 1), null, false);
                                    d_1 = sc_1 < 0 ? new ctr(fn_1) : new ctr(fn_1, sc_1, su_1);
                                    d_1.ondata = function (err, dat, final) { file_1.ondata(err, dat, final); };
                                    for (var _i = 0, chks_4 = chks_3; _i < chks_4.length; _i++) {
                                        var dat = chks_4[_i];
                                        d_1.push(dat, false);
                                    }
                                    if (_this_1.k[0] == chks_3 && _this_1.c)
                                        _this_1.d = d_1;
                                    else
                                        d_1.push(et, true);
                                }
                            },
                            terminate: function () {
                                if (d_1 && d_1.terminate)
                                    d_1.terminate();
                            }
                        };
                        if (sc_1 >= 0)
                            file_1.size = sc_1, file_1.originalSize = su_1;
                        this_1.onfile(file_1);
                    }
                    return "break";
                }
                else if (oc) {
                    if (sig == 0x8074B50) {
                        is = i += 12 + (oc == -2 && 8), f = 3, this_1.c = 0;
                        return "break";
                    }
                    else if (sig == 0x2014B50) {
                        is = i -= 4, f = 3, this_1.c = 0;
                        return "break";
                    }
                }
            };
            var this_1 = this;
            for (; i < l - 4; ++i) {
                var state_1 = _loop_2();
                if (state_1 === "break")
                    break;
            }
            this.p = et;
            if (oc < 0) {
                var dat = f ? buf.subarray(0, is - 12 - (oc == -2 && 8) - (b4(buf, is - 16) == 0x8074B50 && 4)) : buf.subarray(0, i);
                if (add)
                    add.push(dat, !!f);
                else
                    this.k[+(f == 2)].push(dat);
            }
            if (f & 2)
                return this.push(buf.subarray(i), final);
            this.p = buf.subarray(i);
        }
        if (final) {
            if (this.c)
                err(13);
            this.p = null;
        }
    };
    /**
     * Registers a decoder with the stream, allowing for files compressed with
     * the compression type provided to be expanded correctly
     * @param decoder The decoder constructor
     */
    Unzip.prototype.register = function (decoder) {
        this.o[decoder.compression] = decoder;
    };
    return Unzip;
}());

var mt = typeof queueMicrotask == 'function' ? queueMicrotask : typeof setTimeout == 'function' ? setTimeout : function (fn) { fn(); };
function unzip(data, opts, cb) {
    if (!cb)
        cb = opts, opts = {};
    if (typeof cb != 'function')
        err(7);
    var term = [];
    var tAll = function () {
        for (var i = 0; i < term.length; ++i)
            term[i]();
    };
    var files = {};
    var cbd = function (a, b) {
        mt(function () { cb(a, b); });
    };
    mt(function () { cbd = cb; });
    var e = data.length - 22;
    for (; b4(data, e) != 0x6054B50; --e) {
        if (!e || data.length - e > 65558) {
            cbd(err(13, 0, 1), null);
            return tAll;
        }
    }
    ;
    var lft = b2(data, e + 8);
    if (lft) {
        var c = lft;
        var o = b4(data, e + 16);
        var z = o == 4294967295;
        if (z) {
            e = b4(data, e - 12);
            if (b4(data, e) != 0x6064B50) {
                cbd(err(13, 0, 1), null);
                return tAll;
            }
            c = lft = b4(data, e + 32);
            o = b4(data, e + 48);
        }
        var fltr = opts && opts.filter;
        var _loop_3 = function (i) {
            var _a = zh(data, o, z), c_1 = _a[0], sc = _a[1], su = _a[2], fn = _a[3], no = _a[4], off = _a[5], b = slzh(data, off);
            o = no;
            var cbl = function (e, d) {
                if (e) {
                    tAll();
                    cbd(e, null);
                }
                else {
                    if (d)
                        files[fn] = d;
                    if (!--lft)
                        cbd(null, files);
                }
            };
            if (!fltr || fltr({
                name: fn,
                size: sc,
                originalSize: su,
                compression: c_1
            })) {
                if (!c_1)
                    cbl(null, slc(data, b, b + sc));
                else if (c_1 == 8) {
                    var infl = data.subarray(b, b + sc);
                    if (sc < 320000) {
                        try {
                            cbl(null, inflateSync(infl, new u8(su)));
                        }
                        catch (e) {
                            cbl(e, null);
                        }
                    }
                    else
                        term.push(inflate(infl, { size: su }, cbl));
                }
                else
                    cbl(err(14, 'unknown compression type ' + c_1, 1), null);
            }
            else
                cbl(null, null);
        };
        for (var i = 0; i < c; ++i) {
            _loop_3(i);
        }
    }
    else
        cbd(null, {});
    return tAll;
}
/**
 * Synchronously decompresses a ZIP archive. Prefer using `unzip` for better
 * performance with more than one file.
 * @param data The raw compressed ZIP file
 * @param opts The ZIP extraction options
 * @returns The decompressed files
 */
function unzipSync(data, opts) {
    var files = {};
    var e = data.length - 22;
    for (; b4(data, e) != 0x6054B50; --e) {
        if (!e || data.length - e > 65558)
            err(13);
    }
    ;
    var c = b2(data, e + 8);
    if (!c)
        return {};
    var o = b4(data, e + 16);
    var z = o == 4294967295;
    if (z) {
        e = b4(data, e - 12);
        if (b4(data, e) != 0x6064B50)
            err(13);
        c = b4(data, e + 32);
        o = b4(data, e + 48);
    }
    var fltr = opts && opts.filter;
    for (var i = 0; i < c; ++i) {
        var _a = zh(data, o, z), c_2 = _a[0], sc = _a[1], su = _a[2], fn = _a[3], no = _a[4], off = _a[5], b = slzh(data, off);
        o = no;
        if (!fltr || fltr({
            name: fn,
            size: sc,
            originalSize: su,
            compression: c_2
        })) {
            if (!c_2)
                files[fn] = slc(data, b, b + sc);
            else if (c_2 == 8)
                files[fn] = inflateSync(data.subarray(b, b + sc), new u8(su));
            else
                err(14, 'unknown compression type ' + c_2);
        }
    }
    return files;
}


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

/***/ "./dist/esm/errors/InteractionsError.mjs":
/*!***********************************************!*\
  !*** ./dist/esm/errors/InteractionsError.mjs ***!
  \***********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   InteractionsError: () => (/* binding */ InteractionsError)
/* harmony export */ });
/* harmony import */ var _aws_amplify_core_internals_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @aws-amplify/core/internals/utils */ "../core/dist/esm/errors/AmplifyError.mjs");


// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
class InteractionsError extends _aws_amplify_core_internals_utils__WEBPACK_IMPORTED_MODULE_0__.AmplifyError {
    constructor(params) {
        super(params);
        // Hack for making the custom error class work when transpiled to es5
        // TODO: Delete the following 2 lines after we change the build target to >= es2015
        this.constructor = InteractionsError;
        Object.setPrototypeOf(this, InteractionsError.prototype);
    }
}


//# sourceMappingURL=InteractionsError.mjs.map


/***/ }),

/***/ "./dist/esm/errors/assertValidationError.mjs":
/*!***************************************************!*\
  !*** ./dist/esm/errors/assertValidationError.mjs ***!
  \***************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   assertValidationError: () => (/* binding */ assertValidationError)
/* harmony export */ });
/* harmony import */ var _validation_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./validation.mjs */ "./dist/esm/errors/validation.mjs");
/* harmony import */ var _InteractionsError_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./InteractionsError.mjs */ "./dist/esm/errors/InteractionsError.mjs");



// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
function assertValidationError(assertion, name, message) {
    if (!assertion) {
        const { message: defaultMessage, recoverySuggestion } = _validation_mjs__WEBPACK_IMPORTED_MODULE_0__.validationErrorMap[name];
        throw new _InteractionsError_mjs__WEBPACK_IMPORTED_MODULE_1__.InteractionsError({
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

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   InteractionsValidationErrorCode: () => (/* binding */ InteractionsValidationErrorCode),
/* harmony export */   validationErrorMap: () => (/* binding */ validationErrorMap)
/* harmony export */ });
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
var InteractionsValidationErrorCode;
(function (InteractionsValidationErrorCode) {
    InteractionsValidationErrorCode["NoBotConfig"] = "NoBotConfig";
})(InteractionsValidationErrorCode || (InteractionsValidationErrorCode = {}));
const validationErrorMap = {
    [InteractionsValidationErrorCode.NoBotConfig]: {
        message: 'Missing configuration for the bot',
    },
};


//# sourceMappingURL=validation.mjs.map


/***/ }),

/***/ "./dist/esm/lex-v2/AWSLexV2Provider.mjs":
/*!**********************************************!*\
  !*** ./dist/esm/lex-v2/AWSLexV2Provider.mjs ***!
  \**********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   lexProvider: () => (/* binding */ lexProvider)
/* harmony export */ });
/* harmony import */ var _aws_sdk_client_lex_runtime_v2__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @aws-sdk/client-lex-runtime-v2 */ "../../node_modules/@aws-sdk/client-lex-runtime-v2/dist-es/LexRuntimeV2Client.js");
/* harmony import */ var _aws_sdk_client_lex_runtime_v2__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @aws-sdk/client-lex-runtime-v2 */ "../../node_modules/@aws-sdk/client-lex-runtime-v2/dist-es/models/models_0.js");
/* harmony import */ var _aws_sdk_client_lex_runtime_v2__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @aws-sdk/client-lex-runtime-v2 */ "../../node_modules/@aws-sdk/client-lex-runtime-v2/dist-es/commands/RecognizeTextCommand.js");
/* harmony import */ var _aws_sdk_client_lex_runtime_v2__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @aws-sdk/client-lex-runtime-v2 */ "../../node_modules/@aws-sdk/client-lex-runtime-v2/dist-es/commands/RecognizeUtteranceCommand.js");
/* harmony import */ var _aws_amplify_core_internals_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @aws-amplify/core/internals/utils */ "../core/dist/esm/Platform/index.mjs");
/* harmony import */ var _aws_amplify_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @aws-amplify/core */ "@aws-amplify/core");
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! uuid */ "../../node_modules/uuid/dist/esm-browser/v4.js");
/* harmony import */ var _utils_utils_mjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../utils/utils.mjs */ "./dist/esm/utils/utils.mjs");
/* harmony import */ var _utils_commonUtils_mjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../utils/commonUtils.mjs */ "./dist/esm/utils/commonUtils.mjs");







// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
const logger = new _aws_amplify_core__WEBPACK_IMPORTED_MODULE_0__.ConsoleLogger('AWSLexV2Provider');
class AWSLexV2Provider {
    constructor() {
        this._botsCompleteCallback = {};
        this.defaultSessionId = (0,uuid__WEBPACK_IMPORTED_MODULE_1__["default"])();
    }
    /**
     * Send a message to a bot
     * @async
     * @param {AWSLexV2ProviderOption} botConfig - Bot configuration for sending the message
     * @param {string | InteractionsMessage} message - message to send to the bot
     * @return {Promise<InteractionsResponse>} A promise resolves to the response from the bot
     */
    async sendMessage(botConfig, message) {
        // check if credentials are present
        let session;
        try {
            session = await (0,_aws_amplify_core__WEBPACK_IMPORTED_MODULE_0__.fetchAuthSession)();
        }
        catch (error) {
            return Promise.reject(new Error('No credentials'));
        }
        const { region, aliasId, localeId, botId } = botConfig;
        const client = new _aws_sdk_client_lex_runtime_v2__WEBPACK_IMPORTED_MODULE_2__.LexRuntimeV2Client({
            region,
            credentials: session.credentials,
            customUserAgent: (0,_aws_amplify_core_internals_utils__WEBPACK_IMPORTED_MODULE_3__.getAmplifyUserAgentObject)(),
        });
        let response;
        // common base params for all requests
        const reqBaseParams = {
            botAliasId: aliasId,
            botId,
            localeId,
            sessionId: session.identityId ?? this.defaultSessionId,
        };
        if (typeof message === 'string') {
            response = await this._handleRecognizeTextCommand(botConfig, message, reqBaseParams, client);
        }
        else {
            response = await this._handleRecognizeUtteranceCommand(botConfig, message, reqBaseParams, client);
        }
        return response;
    }
    /**
     * Attach a onComplete callback function to a bot.
     * The callback is called once the bot's intent is fulfilled
     * @param {AWSLexV2ProviderOption} botConfig - Bot configuration to attach the onComplete callback
     * @param {InteractionsOnCompleteCallback} callback - called when Intent Fulfilled
     */
    onComplete({ name }, callback) {
        this._botsCompleteCallback[name] = callback;
    }
    /**
     * call onComplete callback for a bot if configured
     */
    _reportBotStatus(data, { name }) {
        const sessionState = data?.sessionState;
        // Check if state is fulfilled to resolve onFullfilment promise
        logger.debug('postContent state', sessionState?.intent?.state);
        const callback = this._botsCompleteCallback[name];
        if (!callback) {
            return;
        }
        switch (sessionState?.intent?.state) {
            case _aws_sdk_client_lex_runtime_v2__WEBPACK_IMPORTED_MODULE_4__.IntentState.READY_FOR_FULFILLMENT:
            case _aws_sdk_client_lex_runtime_v2__WEBPACK_IMPORTED_MODULE_4__.IntentState.FULFILLED:
                callback(undefined, data);
                break;
            case _aws_sdk_client_lex_runtime_v2__WEBPACK_IMPORTED_MODULE_4__.IntentState.FAILED:
                callback(new Error('Bot conversation failed'));
                break;
        }
    }
    /**
     * Format UtteranceCommandOutput's response
     * decompress attributes
     * update audioStream format
     */
    async _formatUtteranceCommandOutput(data) {
        return {
            ...data,
            messages: await (0,_utils_commonUtils_mjs__WEBPACK_IMPORTED_MODULE_5__.unGzipBase64AsJson)(data.messages),
            sessionState: await (0,_utils_commonUtils_mjs__WEBPACK_IMPORTED_MODULE_5__.unGzipBase64AsJson)(data.sessionState),
            interpretations: await (0,_utils_commonUtils_mjs__WEBPACK_IMPORTED_MODULE_5__.unGzipBase64AsJson)(data.interpretations),
            requestAttributes: await (0,_utils_commonUtils_mjs__WEBPACK_IMPORTED_MODULE_5__.unGzipBase64AsJson)(data.requestAttributes),
            inputTranscript: await (0,_utils_commonUtils_mjs__WEBPACK_IMPORTED_MODULE_5__.unGzipBase64AsJson)(data.inputTranscript),
            audioStream: data.audioStream
                ? await (0,_utils_utils_mjs__WEBPACK_IMPORTED_MODULE_6__.convert)(data.audioStream)
                : undefined,
        };
    }
    /**
     * handle client's `RecognizeTextCommand`
     * used for sending simple text message
     */
    async _handleRecognizeTextCommand(botConfig, data, baseParams, client) {
        logger.debug('postText to lex2', data);
        const params = {
            ...baseParams,
            text: data,
        };
        try {
            const recognizeTextCommand = new _aws_sdk_client_lex_runtime_v2__WEBPACK_IMPORTED_MODULE_7__.RecognizeTextCommand(params);
            const resultData = await client.send(recognizeTextCommand);
            this._reportBotStatus(resultData, botConfig);
            return resultData;
        }
        catch (err) {
            return Promise.reject(err);
        }
    }
    /**
     * handle client's `RecognizeUtteranceCommand`
     * used for obj text or obj voice message
     */
    async _handleRecognizeUtteranceCommand(botConfig, data, baseParams, client) {
        const { content, options: { messageType }, } = data;
        logger.debug('postContent to lex2', data);
        let params;
        // prepare params
        if (messageType === 'voice') {
            if (typeof content !== 'object') {
                return Promise.reject(new Error('invalid content type'));
            }
            const inputStream = content instanceof Uint8Array ? content : await (0,_utils_utils_mjs__WEBPACK_IMPORTED_MODULE_6__.convert)(content);
            params = {
                ...baseParams,
                requestContentType: 'audio/x-l16; sample-rate=16000; channel-count=1',
                inputStream,
            };
        }
        else {
            // text input
            if (typeof content !== 'string')
                return Promise.reject(new Error('invalid content type'));
            params = {
                ...baseParams,
                requestContentType: 'text/plain; charset=utf-8',
                inputStream: content,
            };
        }
        // make API call to lex
        try {
            const recognizeUtteranceCommand = new _aws_sdk_client_lex_runtime_v2__WEBPACK_IMPORTED_MODULE_8__.RecognizeUtteranceCommand(params);
            const resultData = await client.send(recognizeUtteranceCommand);
            const response = await this._formatUtteranceCommandOutput(resultData);
            this._reportBotStatus(response, botConfig);
            return response;
        }
        catch (err) {
            return Promise.reject(err);
        }
    }
}
const lexProvider = new AWSLexV2Provider();


//# sourceMappingURL=AWSLexV2Provider.mjs.map


/***/ }),

/***/ "./dist/esm/lex-v2/apis/onComplete.mjs":
/*!*********************************************!*\
  !*** ./dist/esm/lex-v2/apis/onComplete.mjs ***!
  \*********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   onComplete: () => (/* binding */ onComplete)
/* harmony export */ });
/* harmony import */ var _utils_resolveBotConfig_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/resolveBotConfig.mjs */ "./dist/esm/lex-v2/utils/resolveBotConfig.mjs");
/* harmony import */ var _AWSLexV2Provider_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../AWSLexV2Provider.mjs */ "./dist/esm/lex-v2/AWSLexV2Provider.mjs");
/* harmony import */ var _errors_assertValidationError_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../errors/assertValidationError.mjs */ "./dist/esm/errors/assertValidationError.mjs");
/* harmony import */ var _errors_validation_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../errors/validation.mjs */ "./dist/esm/errors/validation.mjs");





// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
const onComplete = (input) => {
    const { botName, callback } = input;
    const botConfig = (0,_utils_resolveBotConfig_mjs__WEBPACK_IMPORTED_MODULE_0__.resolveBotConfig)(botName);
    (0,_errors_assertValidationError_mjs__WEBPACK_IMPORTED_MODULE_1__.assertValidationError)(!!botConfig, _errors_validation_mjs__WEBPACK_IMPORTED_MODULE_2__.InteractionsValidationErrorCode.NoBotConfig, `Bot ${botName} does not exist.`);
    _AWSLexV2Provider_mjs__WEBPACK_IMPORTED_MODULE_3__.lexProvider.onComplete(botConfig, callback);
};


//# sourceMappingURL=onComplete.mjs.map


/***/ }),

/***/ "./dist/esm/lex-v2/apis/send.mjs":
/*!***************************************!*\
  !*** ./dist/esm/lex-v2/apis/send.mjs ***!
  \***************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   send: () => (/* binding */ send)
/* harmony export */ });
/* harmony import */ var _AWSLexV2Provider_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../AWSLexV2Provider.mjs */ "./dist/esm/lex-v2/AWSLexV2Provider.mjs");
/* harmony import */ var _utils_resolveBotConfig_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/resolveBotConfig.mjs */ "./dist/esm/lex-v2/utils/resolveBotConfig.mjs");
/* harmony import */ var _errors_assertValidationError_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../errors/assertValidationError.mjs */ "./dist/esm/errors/assertValidationError.mjs");
/* harmony import */ var _errors_validation_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../errors/validation.mjs */ "./dist/esm/errors/validation.mjs");





// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
const send = async (input) => {
    const { botName, message } = input;
    const botConfig = (0,_utils_resolveBotConfig_mjs__WEBPACK_IMPORTED_MODULE_0__.resolveBotConfig)(botName);
    (0,_errors_assertValidationError_mjs__WEBPACK_IMPORTED_MODULE_1__.assertValidationError)(!!botConfig, _errors_validation_mjs__WEBPACK_IMPORTED_MODULE_2__.InteractionsValidationErrorCode.NoBotConfig, `Bot ${botName} does not exist.`);
    return _AWSLexV2Provider_mjs__WEBPACK_IMPORTED_MODULE_3__.lexProvider.sendMessage(botConfig, message);
};


//# sourceMappingURL=send.mjs.map


/***/ }),

/***/ "./dist/esm/lex-v2/index.mjs":
/*!***********************************!*\
  !*** ./dist/esm/lex-v2/index.mjs ***!
  \***********************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Interactions: () => (/* binding */ Interactions)
/* harmony export */ });
/* harmony import */ var _apis_send_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./apis/send.mjs */ "./dist/esm/lex-v2/apis/send.mjs");
/* harmony import */ var _apis_onComplete_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./apis/onComplete.mjs */ "./dist/esm/lex-v2/apis/onComplete.mjs");



// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
const Interactions = {
    send: _apis_send_mjs__WEBPACK_IMPORTED_MODULE_0__.send,
    onComplete: _apis_onComplete_mjs__WEBPACK_IMPORTED_MODULE_1__.onComplete,
};


//# sourceMappingURL=index.mjs.map


/***/ }),

/***/ "./dist/esm/lex-v2/utils/resolveBotConfig.mjs":
/*!****************************************************!*\
  !*** ./dist/esm/lex-v2/utils/resolveBotConfig.mjs ***!
  \****************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   resolveBotConfig: () => (/* binding */ resolveBotConfig)
/* harmony export */ });
/* harmony import */ var _aws_amplify_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @aws-amplify/core */ "@aws-amplify/core");


// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
const resolveBotConfig = (botName) => {
    const { [botName]: botConfig = undefined } = _aws_amplify_core__WEBPACK_IMPORTED_MODULE_0__.Amplify.getConfig().Interactions?.LexV2 ?? {};
    if (botConfig !== undefined) {
        return { ...botConfig, name: botName };
    }
};


//# sourceMappingURL=resolveBotConfig.mjs.map


/***/ }),

/***/ "./dist/esm/utils/commonUtils.mjs":
/*!****************************************!*\
  !*** ./dist/esm/utils/commonUtils.mjs ***!
  \****************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   unGzipBase64AsJson: () => (/* binding */ unGzipBase64AsJson)
/* harmony export */ });
/* harmony import */ var _utils_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils.mjs */ "./dist/esm/utils/utils.mjs");


// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
const unGzipBase64AsJson = async (gzipBase64) => {
    if (typeof gzipBase64 === 'undefined')
        return undefined;
    try {
        const decodedArrayBuffer = (0,_utils_mjs__WEBPACK_IMPORTED_MODULE_0__.base64ToArrayBuffer)(gzipBase64);
        const objString = await (0,_utils_mjs__WEBPACK_IMPORTED_MODULE_0__.gzipDecompressToString)(decodedArrayBuffer);
        return JSON.parse(objString);
    }
    catch (error) {
        return Promise.reject(new Error('unable to decode and decompress ' + error));
    }
};


//# sourceMappingURL=commonUtils.mjs.map


/***/ }),

/***/ "./dist/esm/utils/utils.mjs":
/*!**********************************!*\
  !*** ./dist/esm/utils/utils.mjs ***!
  \**********************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   base64ToArrayBuffer: () => (/* binding */ base64ToArrayBuffer),
/* harmony export */   convert: () => (/* binding */ convert),
/* harmony export */   gzipDecompressToString: () => (/* binding */ gzipDecompressToString)
/* harmony export */ });
/* harmony import */ var fflate__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! fflate */ "../../node_modules/fflate/esm/browser.js");


// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
const convert = async (stream) => {
    if (stream instanceof Blob || stream instanceof ReadableStream) {
        return new Response(stream)
            .arrayBuffer()
            .then(buffer => new Uint8Array(buffer));
    }
    else {
        return Promise.reject(new Error('Invalid content type'));
    }
};
const base64ToArrayBuffer = (base64) => {
    return Uint8Array.from(window.atob(base64), c => c.charCodeAt(0));
};
const gzipDecompressToString = async (data) => {
    return new Promise((resolve, reject) => {
        (0,fflate__WEBPACK_IMPORTED_MODULE_0__.gunzip)(data, (err, resp) => {
            if (err)
                reject(err);
            else
                resolve((0,fflate__WEBPACK_IMPORTED_MODULE_0__.strFromU8)(resp));
        });
    });
};


//# sourceMappingURL=utils.mjs.map


/***/ }),

/***/ "../../node_modules/@aws-sdk/client-lex-runtime-v2/package.json":
/*!**********************************************************************!*\
  !*** ../../node_modules/@aws-sdk/client-lex-runtime-v2/package.json ***!
  \**********************************************************************/
/***/ ((module) => {

"use strict";
module.exports = /*#__PURE__*/JSON.parse('{"name":"@aws-sdk/client-lex-runtime-v2","description":"AWS SDK for JavaScript Lex Runtime V2 Client for Node.js, Browser and React Native","version":"3.621.0","scripts":{"build":"concurrently \'yarn:build:cjs\' \'yarn:build:es\' \'yarn:build:types\'","build:cjs":"node ../../scripts/compilation/inline client-lex-runtime-v2","build:es":"tsc -p tsconfig.es.json","build:include:deps":"lerna run --scope $npm_package_name --include-dependencies build","build:types":"tsc -p tsconfig.types.json","build:types:downlevel":"downlevel-dts dist-types dist-types/ts3.4","clean":"rimraf ./dist-* && rimraf *.tsbuildinfo","extract:docs":"api-extractor run --local","generate:client":"node ../../scripts/generate-clients/single-service --solo lex-runtime-v2"},"main":"./dist-cjs/index.js","types":"./dist-types/index.d.ts","module":"./dist-es/index.js","sideEffects":false,"dependencies":{"@aws-crypto/sha256-browser":"5.2.0","@aws-crypto/sha256-js":"5.2.0","@aws-sdk/client-sso-oidc":"3.621.0","@aws-sdk/client-sts":"3.621.0","@aws-sdk/core":"3.621.0","@aws-sdk/credential-provider-node":"3.621.0","@aws-sdk/eventstream-handler-node":"3.620.0","@aws-sdk/middleware-eventstream":"3.620.0","@aws-sdk/middleware-host-header":"3.620.0","@aws-sdk/middleware-logger":"3.609.0","@aws-sdk/middleware-recursion-detection":"3.620.0","@aws-sdk/middleware-signing":"3.620.0","@aws-sdk/middleware-user-agent":"3.620.0","@aws-sdk/region-config-resolver":"3.614.0","@aws-sdk/types":"3.609.0","@aws-sdk/util-endpoints":"3.614.0","@aws-sdk/util-user-agent-browser":"3.609.0","@aws-sdk/util-user-agent-node":"3.614.0","@smithy/config-resolver":"^3.0.5","@smithy/core":"^2.3.1","@smithy/eventstream-serde-browser":"^3.0.5","@smithy/eventstream-serde-config-resolver":"^3.0.3","@smithy/eventstream-serde-node":"^3.0.4","@smithy/fetch-http-handler":"^3.2.4","@smithy/hash-node":"^3.0.3","@smithy/invalid-dependency":"^3.0.3","@smithy/middleware-content-length":"^3.0.5","@smithy/middleware-endpoint":"^3.1.0","@smithy/middleware-retry":"^3.0.13","@smithy/middleware-serde":"^3.0.3","@smithy/middleware-stack":"^3.0.3","@smithy/node-config-provider":"^3.1.4","@smithy/node-http-handler":"^3.1.4","@smithy/protocol-http":"^4.1.0","@smithy/smithy-client":"^3.1.11","@smithy/types":"^3.3.0","@smithy/url-parser":"^3.0.3","@smithy/util-base64":"^3.0.0","@smithy/util-body-length-browser":"^3.0.0","@smithy/util-body-length-node":"^3.0.0","@smithy/util-defaults-mode-browser":"^3.0.13","@smithy/util-defaults-mode-node":"^3.0.13","@smithy/util-endpoints":"^2.0.5","@smithy/util-retry":"^3.0.3","@smithy/util-stream":"^3.1.3","@smithy/util-utf8":"^3.0.0","tslib":"^2.6.2"},"devDependencies":{"@tsconfig/node16":"16.1.3","@types/node":"^16.18.96","concurrently":"7.0.0","downlevel-dts":"0.10.1","rimraf":"3.0.2","typescript":"~4.9.5"},"engines":{"node":">=16.0.0"},"typesVersions":{"<4.0":{"dist-types/*":["dist-types/ts3.4/*"]}},"files":["dist-*/**"],"author":{"name":"AWS SDK for JavaScript Team","url":"https://aws.amazon.com/javascript/"},"license":"Apache-2.0","browser":{"./dist-es/runtimeConfig":"./dist-es/runtimeConfig.browser"},"react-native":{"./dist-es/runtimeConfig":"./dist-es/runtimeConfig.native"},"homepage":"https://github.com/aws/aws-sdk-js-v3/tree/main/clients/client-lex-runtime-v2","repository":{"type":"git","url":"https://github.com/aws/aws-sdk-js-v3.git","directory":"clients/client-lex-runtime-v2"}}');

/***/ }),

/***/ "../../node_modules/@aws-sdk/util-endpoints/dist-es/lib/aws/partitions.json":
/*!**********************************************************************************!*\
  !*** ../../node_modules/@aws-sdk/util-endpoints/dist-es/lib/aws/partitions.json ***!
  \**********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = /*#__PURE__*/JSON.parse('{"partitions":[{"id":"aws","outputs":{"dnsSuffix":"amazonaws.com","dualStackDnsSuffix":"api.aws","implicitGlobalRegion":"us-east-1","name":"aws","supportsDualStack":true,"supportsFIPS":true},"regionRegex":"^(us|eu|ap|sa|ca|me|af|il)\\\\-\\\\w+\\\\-\\\\d+$","regions":{"af-south-1":{"description":"Africa (Cape Town)"},"ap-east-1":{"description":"Asia Pacific (Hong Kong)"},"ap-northeast-1":{"description":"Asia Pacific (Tokyo)"},"ap-northeast-2":{"description":"Asia Pacific (Seoul)"},"ap-northeast-3":{"description":"Asia Pacific (Osaka)"},"ap-south-1":{"description":"Asia Pacific (Mumbai)"},"ap-south-2":{"description":"Asia Pacific (Hyderabad)"},"ap-southeast-1":{"description":"Asia Pacific (Singapore)"},"ap-southeast-2":{"description":"Asia Pacific (Sydney)"},"ap-southeast-3":{"description":"Asia Pacific (Jakarta)"},"ap-southeast-4":{"description":"Asia Pacific (Melbourne)"},"aws-global":{"description":"AWS Standard global region"},"ca-central-1":{"description":"Canada (Central)"},"ca-west-1":{"description":"Canada West (Calgary)"},"eu-central-1":{"description":"Europe (Frankfurt)"},"eu-central-2":{"description":"Europe (Zurich)"},"eu-north-1":{"description":"Europe (Stockholm)"},"eu-south-1":{"description":"Europe (Milan)"},"eu-south-2":{"description":"Europe (Spain)"},"eu-west-1":{"description":"Europe (Ireland)"},"eu-west-2":{"description":"Europe (London)"},"eu-west-3":{"description":"Europe (Paris)"},"il-central-1":{"description":"Israel (Tel Aviv)"},"me-central-1":{"description":"Middle East (UAE)"},"me-south-1":{"description":"Middle East (Bahrain)"},"sa-east-1":{"description":"South America (Sao Paulo)"},"us-east-1":{"description":"US East (N. Virginia)"},"us-east-2":{"description":"US East (Ohio)"},"us-west-1":{"description":"US West (N. California)"},"us-west-2":{"description":"US West (Oregon)"}}},{"id":"aws-cn","outputs":{"dnsSuffix":"amazonaws.com.cn","dualStackDnsSuffix":"api.amazonwebservices.com.cn","implicitGlobalRegion":"cn-northwest-1","name":"aws-cn","supportsDualStack":true,"supportsFIPS":true},"regionRegex":"^cn\\\\-\\\\w+\\\\-\\\\d+$","regions":{"aws-cn-global":{"description":"AWS China global region"},"cn-north-1":{"description":"China (Beijing)"},"cn-northwest-1":{"description":"China (Ningxia)"}}},{"id":"aws-us-gov","outputs":{"dnsSuffix":"amazonaws.com","dualStackDnsSuffix":"api.aws","implicitGlobalRegion":"us-gov-west-1","name":"aws-us-gov","supportsDualStack":true,"supportsFIPS":true},"regionRegex":"^us\\\\-gov\\\\-\\\\w+\\\\-\\\\d+$","regions":{"aws-us-gov-global":{"description":"AWS GovCloud (US) global region"},"us-gov-east-1":{"description":"AWS GovCloud (US-East)"},"us-gov-west-1":{"description":"AWS GovCloud (US-West)"}}},{"id":"aws-iso","outputs":{"dnsSuffix":"c2s.ic.gov","dualStackDnsSuffix":"c2s.ic.gov","implicitGlobalRegion":"us-iso-east-1","name":"aws-iso","supportsDualStack":false,"supportsFIPS":true},"regionRegex":"^us\\\\-iso\\\\-\\\\w+\\\\-\\\\d+$","regions":{"aws-iso-global":{"description":"AWS ISO (US) global region"},"us-iso-east-1":{"description":"US ISO East"},"us-iso-west-1":{"description":"US ISO WEST"}}},{"id":"aws-iso-b","outputs":{"dnsSuffix":"sc2s.sgov.gov","dualStackDnsSuffix":"sc2s.sgov.gov","implicitGlobalRegion":"us-isob-east-1","name":"aws-iso-b","supportsDualStack":false,"supportsFIPS":true},"regionRegex":"^us\\\\-isob\\\\-\\\\w+\\\\-\\\\d+$","regions":{"aws-iso-b-global":{"description":"AWS ISOB (US) global region"},"us-isob-east-1":{"description":"US ISOB East (Ohio)"}}},{"id":"aws-iso-e","outputs":{"dnsSuffix":"cloud.adc-e.uk","dualStackDnsSuffix":"cloud.adc-e.uk","implicitGlobalRegion":"eu-isoe-west-1","name":"aws-iso-e","supportsDualStack":false,"supportsFIPS":true},"regionRegex":"^eu\\\\-isoe\\\\-\\\\w+\\\\-\\\\d+$","regions":{"eu-isoe-west-1":{"description":"EU ISOE West"}}},{"id":"aws-iso-f","outputs":{"dnsSuffix":"csp.hci.ic.gov","dualStackDnsSuffix":"csp.hci.ic.gov","implicitGlobalRegion":"us-isof-south-1","name":"aws-iso-f","supportsDualStack":false,"supportsFIPS":true},"regionRegex":"^us\\\\-isof\\\\-\\\\w+\\\\-\\\\d+$","regions":{}}],"version":"1.1"}');

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
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
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
/* harmony export */   Interactions: () => (/* reexport safe */ _lex_v2_index_mjs__WEBPACK_IMPORTED_MODULE_0__.Interactions)
/* harmony export */ });
/* harmony import */ var _lex_v2_index_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lex-v2/index.mjs */ "./dist/esm/lex-v2/index.mjs");

//# sourceMappingURL=index.mjs.map

})();

/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=aws-amplify-interactions.js.map