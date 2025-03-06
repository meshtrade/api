import { UnaryInterceptor } from "grpc-web";
export type ServiceConstructorArgs = [
  hostname: string,
  credentials?:
    | {
        [index: string]: string;
      }
    | null
    | undefined,
  options?: {
    withCredentials: boolean;
    unaryInterceptors: UnaryInterceptor<unknown, unknown>[];
  },
];
