import type { Failure } from "@/data/network/error_handler";
import type { Either } from "@/domain/either/Either";

export interface SignUpOwnerInterface {
    SignUpOwner(userData: SignUpOwnerInterface.Request): Promise<SignUpOwnerInterface.Response>
}


export namespace SignUpOwnerInterface {
    export type Request = { email: string, password: string, role: string };
    export type Response = Either<Failure, { authenticationToken: string }>;
}