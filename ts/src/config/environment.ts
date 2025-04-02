import { Environment } from "./environment_pb";

// Get all Environments as enum values
export const allEnvironments: Environment[] = Object.values(Environment).filter(
    (value) => typeof value === "number",
) as Environment[];

// Define explicit mappings between Environment enums and custom string representations
const environmentToStringMapping: {
    [key in Environment]: string;
} = {
    [Environment.UNDEFINED_ENVIRONMENT]: "-",
    [Environment.LOCAL_ENVIRONMENT]: "Local",
    [Environment.DEVELOPMENT_ENVIRONMENT]: "Development",
    [Environment.TESTING_ENVIRONMENT]: "Testing",
    [Environment.STAGING_ENVIRONMENT]: "Staging",
    [Environment.PRODUCTION_ENVIRONMENT]: "Production",
};

// Reverse mapping from string to Environment enum
const stringToEnvironmentMapping: Record<string, Environment> = {};
for (const [key, value] of Object.entries(environmentToStringMapping)) {
    stringToEnvironmentMapping[value] = Number(key);
}

class UnsupportedEnvironmentError extends Error {
    Environment: Environment;

    constructor(Environment: Environment) {
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
export function environmentToString(Environment: Environment): string {
    if (Environment in environmentToStringMapping) {
        return environmentToStringMapping[Environment];
    } else {
        throw new UnsupportedEnvironmentError(Environment);
    }
}

class UnsupportedEnvironmentStringError extends Error {
    EnvironmentStr: string;

    constructor(EnvironmentStr: string) {
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
export function stringToEnvironment(EnvironmentStr: string): Environment {
    if (EnvironmentStr in stringToEnvironmentMapping) {
        return stringToEnvironmentMapping[EnvironmentStr];
    } else {
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
export function getEnvironment(): Environment {
    const environment = process.env.ENVIRONMENT;

    if (!environment) {
        throw new Error("ENVIRONMENT is not set.");
    }

    return stringToEnvironment(environment);
}