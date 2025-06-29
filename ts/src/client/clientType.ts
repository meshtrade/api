import { ClientType } from './clientType_pb';

// Define explicit mappings between ClientType enums and their corresponding string representations
const clientTypeToStringMapping: {
    [key in ClientType]: string;
} = {
    [ClientType.UNDEFINED_COMPANY_CLIENT_TYPE]: 'Undefined',
    [ClientType.ISSUER_COMPANY_CLIENT_TYPE]: 'Issuer',
    [ClientType.INVESTOR_COMPANY_CLIENT_TYPE]: 'Investor',
    [ClientType.MANAGING_COMPANY_CLIENT_TYPE]: 'Managing Company',
};

// Define a custom error for unsupported ClientType
class UnsupportedClientTypeError extends Error {
    clientType: ClientType;

    constructor(clientType: ClientType) {
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
export function clientTypeToString(clientType: ClientType): string {
    if (clientType in clientTypeToStringMapping) {
        return clientTypeToStringMapping[clientType];
    } else {
        throw new UnsupportedClientTypeError(clientType);
    }
}