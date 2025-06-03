/* eslint-disable */
// @ts-nocheck
import type { GenEnum, GenFile } from "@bufbuild/protobuf/codegenv2";
/**
 * Describes the file config/environment.proto.
 */
export declare const file_config_environment: GenFile;
/**
 *
 * The active environment in which an application is running.
 *
 * @generated from enum api.config.Environment
 */
export declare enum Environment {
    /**
     * @generated from enum value: UNDEFINED_ENVIRONMENT = 0;
     */
    UNDEFINED_ENVIRONMENT = 0,
    /**
     * @generated from enum value: LOCAL_ENVIRONMENT = 1;
     */
    LOCAL_ENVIRONMENT = 1,
    /**
     * @generated from enum value: DEVELOPMENT_ENVIRONMENT = 2;
     */
    DEVELOPMENT_ENVIRONMENT = 2,
    /**
     * @generated from enum value: TESTING_ENVIRONMENT = 3;
     */
    TESTING_ENVIRONMENT = 3,
    /**
     * @generated from enum value: STAGING_ENVIRONMENT = 4;
     */
    STAGING_ENVIRONMENT = 4,
    /**
     * @generated from enum value: PRODUCTION_ENVIRONMENT = 5;
     */
    PRODUCTION_ENVIRONMENT = 5
}
/**
 * Describes the enum api.config.Environment.
 */
export declare const EnvironmentSchema: GenEnum<Environment>;
