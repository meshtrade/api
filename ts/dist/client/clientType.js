/* eslint-disable */
// @ts-nocheck
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clientTypeToString = clientTypeToString;
const clientType_pb_1 = require("./clientType_pb");
// Define explicit mappings between ClientType enums and their corresponding string representations
const clientTypeToStringMapping = {
    [clientType_pb_1.ClientType.UNDEFINED_COMPANY_CLIENT_TYPE]: 'Undefined',
    [clientType_pb_1.ClientType.ISSUER_COMPANY_CLIENT_TYPE]: 'Issuer',
    [clientType_pb_1.ClientType.INVESTOR_COMPANY_CLIENT_TYPE]: 'Investor',
    [clientType_pb_1.ClientType.MANAGING_COMPANY_CLIENT_TYPE]: 'Managing Company',
};
// Define a custom error for unsupported ClientType
class UnsupportedClientTypeError extends Error {
    constructor(clientType) {
        const message = `Unsupported ClientType: ${clientType}`;
        super(message);
        this.clientType = clientType;
    }
}
/**
 * Converts a ClientType enum to its string representation.
 * @param {ClientType} clientType - The ClientType to convert.
 * @returns {string} The corresponding string representation of the ClientType.
 */
function clientTypeToString(clientType) {
    if (clientType in clientTypeToStringMapping) {
        return clientTypeToStringMapping[clientType];
    }
    else {
        throw new UnsupportedClientTypeError(clientType);
    }
}
