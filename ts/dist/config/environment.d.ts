/* eslint-disable */
// @ts-nocheck
import { Environment } from "./environment_pb";
export declare const allEnvironments: Environment[];
/**
 * Converts a Environment enum instance to a custom string representation.
 * @param {Environment} Environment - The Environment to convert.
 * @returns {string} The custom string representation of the Environment.
 */
export declare function environmentToString(Environment: Environment): string;
/**
 * Converts a custom string representation to a Environment enum instance.
 * @param {string} EnvironmentStr - The custom string representation of the Environment.
 * @returns {Environment} The corresponding Environment enum instance.
 */
export declare function stringToEnvironment(EnvironmentStr: string): Environment;
/**
 * Retrieve and parse, from the Node.js Environment variable ENVIRONMENT, the current Environment.
 *
 * This is typically used to determine the application's runtime environment,
 * such as "Development", Sstaging", or "production", based on the `ENVIRONMENT` variable.
 *
 * @returns {Environment} The typed environment value.
 * @throws {Error} If `ENVIRONMENT` is not set or cannot be parsed.
 */
export declare function getEnvironment(): Environment;
