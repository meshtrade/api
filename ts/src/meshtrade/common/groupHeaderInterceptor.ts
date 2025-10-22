import { isValidGroupResourceName } from "./validation";
import { Interceptor } from "@connectrpc/connect";

type GroupInterceptorType = Interceptor & { __group: string };

export const GroupHeaderInterceptorConnect: (
  group: string
) => GroupInterceptorType = (group) => {
  if (!isValidGroupResourceName(group)) {
    throw new Error(
      `Invalid group format: "${group}". Group must be in the format "groups/{ulid}" ` +
        `where {ulid} is a 26-character ULID (e.g., "groups/01ARZ3NDEKTSV4YWVF8F5BH32").`
    );
  }

  const interceptor: GroupInterceptorType = (next) => async (request) => {
    request.header.append("x-group", group);
    return await next(request);
  };
  interceptor.__group = group;

  return interceptor;
};
