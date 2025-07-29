import { DescFile, DescService, DescMethod } from "@bufbuild/protobuf";
import {
  createEcmaScriptPlugin,
  ImportSymbol,
  runNodeJs,
  type Schema,
} from "@bufbuild/protoplugin";

const plugin = createEcmaScriptPlugin({
  name: "protoc-gen-meshts",
  version: "v1",
  generateTs(schema: Schema) {
    // Loop through all Protobuf files in the schema to look for service definitions
    for (const file of schema.files) {
      if (file.services.length > 0) {
        // Generate a TypeScript gRPC-web client for each file with services
        generateGrpcWebClient(schema, file);
      }
    }
  },
});

// Reads the schema from stdin, runs the plugin, and writes the generated files to stdout.
runNodeJs(plugin);

function generateGrpcWebClient(schema: Schema, file: DescFile) {
  // Generate file and add preamble
  const f = schema.generateFile(file.name + "_grpc_web_client_meshts.ts");
  f.preamble(file);

  // Generate imports
  f.print(`import { LoggingInterceptor } from "../../../common/grpc_web";`);
  
  // Import the generated gRPC-web service client
  for (const service of file.services) {
    const serviceClientName = `${service.name}PromiseClient`;
    f.print(`import { ${serviceClientName} } from "./service_grpc_web_pb";`);
  }
  
  // Import request/response types
  const requestResponseTypes = new Set<string>();
  for (const service of file.services) {
    for (const method of service.methods) {
      requestResponseTypes.add(method.input.name);
      requestResponseTypes.add(method.output.name);
    }
  }
  
  if (requestResponseTypes.size > 0) {
    f.print(`import {`);
    const sortedTypes = Array.from(requestResponseTypes).sort();
    for (let i = 0; i < sortedTypes.length; i++) {
      f.print(`  ${sortedTypes[i]}${i < sortedTypes.length - 1 ? ',' : ''}`);
    }
    f.print(`} from "./service_pb";`);
  }
  
  // Import any additional message types (e.g., APIUser from api_user_pb)
  const additionalMessageImports = new Set<string>();
  for (const service of file.services) {
    for (const method of service.methods) {
      // Check if response type is defined in another file
      if (method.output.file !== file) {
        additionalMessageImports.add(method.output.name);
      }
    }
  }
  
  if (additionalMessageImports.size > 0) {
    const sortedAdditionalTypes = Array.from(additionalMessageImports).sort();
    for (const typeName of sortedAdditionalTypes) {
      // Generate import based on the file naming pattern
      // Convert "APIUser" -> "api_user_pb"
      const importPath = `./${convertToSnakeCase(typeName)}_pb`;
      f.print(`import { ${typeName} } from "${importPath}";`);
    }
  }
  
  f.print(`import { UnaryInterceptor } from "grpc-web";`);
  f.print(`import { ConfigOpts, getConfigFromOpts } from "../../../common/config";`);
  f.print(`import { GroupHeaderInterceptor } from "../../../common/groupHeaderInterceptor";`);
  f.print("");
  
  // Generate client class for each service
  for (const service of file.services) {
    generateServiceClient(f, service, file);
  }
}

function generateServiceClient(f: any, service: DescService, file: DescFile) {
  const serviceName = service.name;
  const clientClassName = `${serviceName}GrpcWebClientV1`;
  const serviceClientName = `${serviceName}PromiseClient`;
  
  // Extract resource name from the service (e.g., ApiUser from ApiUserService)
  const resourceName = serviceName.replace(/Service$/, '');
  
  // Generate class JSDoc
  f.print("/**");
  f.print(` * Client for interacting with the ${file.proto.package} ${toReadableResourceName(resourceName)} v1 API resource service.`);
  f.print(" */");
  
  // Generate class declaration
  f.print(`export class ${clientClassName} {`);
  f.print(`  private _service: ${serviceClientName};`);
  f.print(`  private readonly _config: ReturnType<typeof getConfigFromOpts>;`);
  f.print(`  private readonly _interceptors: UnaryInterceptor<any, any>[];`);
  f.print("");
  
  // Generate constructor
  f.print("  /**");
  f.print(`   * Constructs an instance of ${clientClassName}.`);
  f.print("   * @param {ConfigOpts} [config] - Optional configuration for the client.");
  f.print("   * @param {UnaryInterceptor<any, any>[]} [interceptors] - For internal use by `withGroup`.");
  f.print("   */");
  f.print("  constructor(config?: ConfigOpts, interceptors?: UnaryInterceptor<any, any>[]) {");
  f.print("    this._config = getConfigFromOpts(config);");
  f.print("    this._interceptors = interceptors || [new LoggingInterceptor()];");
  f.print("");
  f.print("    // Construct the underlying gRPC-web service client");
  f.print(`    this._service = new ${serviceClientName}(`);
  f.print("      this._config.apiServerURL,");
  f.print("      null,");
  f.print("      {");
  f.print("        withCredentials: true,");
  f.print("        unaryInterceptors: this._interceptors,");
  f.print("      }");
  f.print("    );");
  f.print("  }");
  f.print("");
  
  // Generate withGroup method
  f.print("  /**");
  f.print("   * Returns a new client instance configured to send the specified group");
  f.print("   * resource name in the request headers for subsequent API calls.");
  f.print("   * ");
  f.print("   * @param {string} group - The operating group context to inject into the request");
  f.print("   *                         in the format `groups/{ulid}` where {ulid} is a 26-character ULID.");
  f.print("   *                         Example: 'groups/01ARZ3NDEKTSV4YWVF8F5BH32'");
  f.print(`   * @returns {${clientClassName}} A new, configured instance of the client.`);
  f.print("   * @throws {Error} If the group format is invalid (validation occurs in GroupHeaderInterceptor)");
  f.print("   */");
  f.print(`  withGroup(group: string): ${clientClassName} {`);
  f.print("    // Check if a GroupHeaderInterceptor already exists.");
  f.print("    const hasGroupInterceptor = this._interceptors.some(");
  f.print("      (interceptor) => interceptor instanceof GroupHeaderInterceptor");
  f.print("    );");
  f.print("");
  f.print("    if (hasGroupInterceptor) {");
  f.print("      throw new Error(");
  f.print('        "Attempted to set group context twice. A group has already been set for this client instance."');
  f.print("      );");
  f.print("    }");
  f.print("");
  f.print("    // Create a new interceptor for the group context");
  f.print("    const groupInterceptor = new GroupHeaderInterceptor(group);");
  f.print("");
  f.print("    // Return a new client instance with the existing interceptors plus the new one");
  f.print(`    return new ${clientClassName}(`);
  f.print("      this._config,");
  f.print("      [");
  f.print("        ...this._interceptors,");
  f.print("        groupInterceptor,");
  f.print("      ],");
  f.print("    );");
  f.print("  }");
  f.print("");
  
  // Generate method wrappers for each service method
  for (const method of service.methods) {
    generateServiceMethod(f, method, service, resourceName);
  }
  
  f.print("}");
}

function generateServiceMethod(f: any, method: DescMethod, service: DescService, resourceName: string) {
  const methodName = camelCase(method.name);
  const requestType = method.input.name;
  const responseType = method.output.name;
  
  // Generate method JSDoc
  f.print("  /**");
  f.print(`   * ${getMethodDescription(method.name, resourceName)}`);
  f.print(`   * @param {${requestType}} request - The request object for ${method.name.toLowerCase()}.`);
  f.print(`   * @returns {Promise<${responseType}>} A promise that resolves with the ${getMethodReturnDescription(method.name, resourceName)}.`);
  f.print("   */");
  
  // Generate method signature and implementation
  f.print(`  ${methodName}(request: ${requestType}): Promise<${responseType}> {`);
  f.print(`    return this._service.${methodName}(request);`);
  f.print("  }");
  f.print("");
}

function camelCase(str: string): string {
  return str.charAt(0).toLowerCase() + str.slice(1);
}

function getMethodDescription(methodName: string, resourceName: string): string {
  const method = methodName.toLowerCase();
  const resource = toReadableResourceName(resourceName);
  
  if (method.startsWith('get')) {
    return `Retrieves ${getArticle(resource)} ${resource}.`;
  } else if (method.startsWith('create')) {
    return `Creates a new ${resource}.`;
  } else if (method.startsWith('update')) {
    return `Updates an existing ${resource}.`;
  } else if (method.startsWith('delete')) {
    return `Deletes ${getArticle(resource)} ${resource}.`;
  } else if (method.startsWith('list')) {
    return `Retrieves a list of ${resource}s.`;
  } else if (method.startsWith('search')) {
    return `Searches for ${resource}s.`;
  } else if (method.startsWith('activate')) {
    return `Activates ${getArticle(resource)} ${resource}.`;
  } else if (method.startsWith('deactivate')) {
    return `Deactivates ${getArticle(resource)} ${resource}.`;
  } else {
    return `Performs ${method} operation on ${resource}.`;
  }
}

function getMethodReturnDescription(methodName: string, resourceName: string): string {
  const method = methodName.toLowerCase();
  const resource = toReadableResourceName(resourceName);
  
  if (method.startsWith('list')) {
    return `list of ${resource}s`;
  } else if (method.startsWith('search')) {
    return 'search results';
  } else {
    return resource;
  }
}

function toReadableResourceName(resourceName: string): string {
  // Convert PascalCase to readable format, e.g., "ApiUser" -> "API user"
  return resourceName
    .replace(/([A-Z])([a-z])/g, '$1$2')  // Add space before capital followed by lowercase
    .replace(/([a-z])([A-Z])/g, '$1 $2') // Add space between lowercase and capital
    .toLowerCase();
}

function getArticle(word: string): string {
  // Return appropriate article (a/an) based on first letter
  const firstLetter = word.charAt(0).toLowerCase();
  return ['a', 'e', 'i', 'o', 'u'].includes(firstLetter) ? 'an' : 'a';
}

function convertToSnakeCase(str: string): string {
  // Convert PascalCase to snake_case: "APIUser" -> "api_user"
  return str
    .replace(/([A-Z]+)([A-Z][a-z])/g, '$1_$2')  // Handle sequences like "API" -> "API_"
    .replace(/([a-z\d])([A-Z])/g, '$1_$2')      // Handle transitions like "aB" -> "a_B"
    .toLowerCase();
}
