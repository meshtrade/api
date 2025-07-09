import { LoggingInterceptor } from "../../../common/grpc_web";
import { GroupServicePromiseClient } from "./service_grpc_web_pb";
import {
  GetGroupRequest,
  ListGroupsRequest,
  ListGroupsResponse,
  SearchGroupsRequest,
  SearchGroupsResponse,
} from "./service_pb";
import { Group } from "./group_pb";
import { ConfigOpts, getConfigFromOpts } from "../../../common/config";

/**
 * Client for interacting with the iam group v1 API resource service.
 */
export class GroupGrpcWebClientV1 {
  private _service: GroupServicePromiseClient;

  /**
   * Constructs an instance of GroupGrpcWebClientV1.
   * @param {ConfigOpts} [config] - Optional configuration for the client.
   */
  constructor(config?: ConfigOpts) {
    // process config
    const _config = getConfigFromOpts(config);

    // construct service
    this._service = new GroupServicePromiseClient(_config.apiServerURL, null, {
      withCredentials: true,
      unaryInterceptors: [new LoggingInterceptor()],
    });
  }

  /**
   * Retrieves a group.
   * @param {GetGroupRequest} request - The request object for getting a group.
   * @returns {Promise<Group>} A promise that resolves with the group.
   */
  getGroup(request: GetGroupRequest): Promise<Group> {
    return this._service.getGroup(request);
  }

  /**
   * Retrieves a list of groups.
   * @param {ListGroupsRequest} request - The request object for listing groups.
   * @returns {Promise<ListGroupsResponse>} A promise that resolves with the list of groups.
   */
  listGroups(request: ListGroupsRequest): Promise<ListGroupsResponse> {
    return this._service.listGroups(request);
  }

  /**
   * Searches for groups.
   * @param {SearchGroupsRequest} request - The request object for searching groups.
   * @returns {Promise<SearchGroupsResponse>} A promise that resolves with the search results.
   */
  searchGroups(request: SearchGroupsRequest): Promise<SearchGroupsResponse> {
    return this._service.searchGroups(request);
  }
}
