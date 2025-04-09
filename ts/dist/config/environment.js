/* eslint-disable */
// @ts-nocheck
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.allEnvironments = void 0;
exports.environmentToString = environmentToString;
exports.stringToEnvironment = stringToEnvironment;
exports.getEnvironment = getEnvironment;
const environment_pb_1 = require("./environment_pb");
// Get all Environments as enum values
exports.allEnvironments = Object.values(environment_pb_1.Environment).filter((value) => typeof value === "number");
// Define explicit mappings between Environment enums and custom string representations
const environmentToStringMapping = {
    [environment_pb_1.Environment.UNDEFINED_ENVIRONMENT]: "-",
    [environment_pb_1.Environment.LOCAL_ENVIRONMENT]: "Local",
    [environment_pb_1.Environment.DEVELOPMENT_ENVIRONMENT]: "Development",
    [environment_pb_1.Environment.TESTING_ENVIRONMENT]: "Testing",
    [environment_pb_1.Environment.STAGING_ENVIRONMENT]: "Staging",
    [environment_pb_1.Environment.PRODUCTION_ENVIRONMENT]: "Production",
};
// Reverse mapping from string to Environment enum
const stringToEnvironmentMapping = {};
for (const [key, value] of Object.entries(environmentToStringMapping)) {
    stringToEnvironmentMapping[value] = Number(key);
}
class UnsupportedEnvironmentError extends Error {
    constructor(Environment) {
        const message = `Unsupported Environment: ${Environment}`;
        super(message);
        this.Environment = Environment;
    }
}
/**
 * Converts a Environment enum instance to a custom string representation.
 * @param {Environment} Environment - The Environment to convert.
 * @returns {string} The custom string representation of the Environment.
 */
function environmentToString(Environment) {
    if (Environment in environmentToStringMapping) {
        return environmentToStringMapping[Environment];
    }
    else {
        throw new UnsupportedEnvironmentError(Environment);
    }
}
class UnsupportedEnvironmentStringError extends Error {
    constructor(EnvironmentStr) {
        const message = `Unsupported Environment string: ${EnvironmentStr}`;
        super(message);
        this.EnvironmentStr = EnvironmentStr;
    }
}
/**
 * Converts a custom string representation to a Environment enum instance.
 * @param {string} EnvironmentStr - The custom string representation of the Environment.
 * @returns {Environment} The corresponding Environment enum instance.
 */
function stringToEnvironment(EnvironmentStr) {
    if (EnvironmentStr in stringToEnvironmentMapping) {
        return stringToEnvironmentMapping[EnvironmentStr];
    }
    else {
        throw new UnsupportedEnvironmentStringError(EnvironmentStr);
    }
}
/**
 * Retrieve and parse, from the Node.js Environment variable ENVIRONMENT, the current Environment.
 *
 * This is typically used to determine the application's runtime environment,
 * such as "Development", Sstaging", or "production", based on the `ENVIRONMENT` variable.
 *
 * @returns {Environment} The typed environment value.
 * @throws {Error} If `ENVIRONMENT` is not set or cannot be parsed.
 */
function getEnvironment() {
    const environment = process.env.ENVIRONMENT;
    if (!environment) {
        throw new Error("ENVIRONMENT is not set.");
    }
    return stringToEnvironment(environment);
}
