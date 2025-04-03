/* eslint-disable */
// @ts-nocheck
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tokenToString = exports.tokenToFilter = exports.tokenIsUndefined = exports.tokensAreEqual = exports.criteriaFromToken = void 0;
const search_1 = require("../search");
const network_pb_1 = require("./network_pb");
function criteriaFromToken(token) {
    var _a, _b, _c;
    return [
        (0, search_1.newTextExactCriterion)("token.code", (_a = token === null || token === void 0 ? void 0 : token.getCode()) !== null && _a !== void 0 ? _a : ""),
        (0, search_1.newTextExactCriterion)("token.issuer", (_b = token === null || token === void 0 ? void 0 : token.getIssuer()) !== null && _b !== void 0 ? _b : ""),
        (0, search_1.newUint32ExactCriterion)("token.network", (_c = token === null || token === void 0 ? void 0 : token.getNetwork()) !== null && _c !== void 0 ? _c : network_pb_1.Network.UNDEFINED_NETWORK),
    ];
}
exports.criteriaFromToken = criteriaFromToken;
function tokensAreEqual(t, t2) {
    var _a, _b, _c, _d, _e, _f;
    return (((_a = t === null || t === void 0 ? void 0 : t.getCode()) !== null && _a !== void 0 ? _a : "") === ((_b = t2 === null || t2 === void 0 ? void 0 : t2.getCode()) !== null && _b !== void 0 ? _b : "") &&
        ((_c = t === null || t === void 0 ? void 0 : t.getIssuer()) !== null && _c !== void 0 ? _c : "") === ((_d = t2 === null || t2 === void 0 ? void 0 : t2.getIssuer()) !== null && _d !== void 0 ? _d : "") &&
        ((_e = t === null || t === void 0 ? void 0 : t.getNetwork()) !== null && _e !== void 0 ? _e : network_pb_1.Network.UNDEFINED_NETWORK) ===
            ((_f = t2 === null || t2 === void 0 ? void 0 : t2.getNetwork()) !== null && _f !== void 0 ? _f : network_pb_1.Network.UNDEFINED_NETWORK));
}
exports.tokensAreEqual = tokensAreEqual;
function tokenIsUndefined(t) {
    if (!t) {
        return true;
    }
    return ((t.getCode() === "-" || t.getCode() === "") &&
        (t.getIssuer() === "-" || t.getIssuer() === "") &&
        (t.getNetwork() === network_pb_1.Network.NULL_NETWORK ||
            t.getNetwork() === network_pb_1.Network.UNDEFINED_NETWORK));
}
exports.tokenIsUndefined = tokenIsUndefined;
function tokenToFilter(t) {
    var _a, _b, _c;
    return [
        (0, search_1.newTextExactCriterion)("token.code", (_a = t === null || t === void 0 ? void 0 : t.getCode()) !== null && _a !== void 0 ? _a : ""),
        (0, search_1.newTextExactCriterion)("token.issuer", (_b = t === null || t === void 0 ? void 0 : t.getIssuer()) !== null && _b !== void 0 ? _b : ""),
        (0, search_1.newUint32ExactCriterion)("token.network", (_c = t === null || t === void 0 ? void 0 : t.getNetwork()) !== null && _c !== void 0 ? _c : network_pb_1.Network.UNDEFINED_NETWORK),
    ];
}
exports.tokenToFilter = tokenToFilter;
function tokenToString(t) {
    var _a, _b, _c;
    return `${(_a = t === null || t === void 0 ? void 0 : t.getCode()) !== null && _a !== void 0 ? _a : "-"} by ${(_b = t === null || t === void 0 ? void 0 : t.getIssuer()) !== null && _b !== void 0 ? _b : "-"} on ${(_c = t === null || t === void 0 ? void 0 : t.getNetwork()) !== null && _c !== void 0 ? _c : network_pb_1.Network.UNDEFINED_NETWORK}`;
}
exports.tokenToString = tokenToString;
