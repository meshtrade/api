import { Criterion } from "../search/criterion_pb";
import { Token } from "./token_pb";
export declare function criteriaFromToken(token?: Token): Criterion[];
export declare function tokensAreEqual(t?: Token, t2?: Token): boolean;
export declare function tokenIsUndefined(t?: Token): boolean;
export declare function tokenToFilter(t?: Token): Criterion[];
export declare function tokenToString(t?: Token): string;
