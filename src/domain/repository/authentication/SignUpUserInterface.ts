import type { Failure } from "@/data/network/error_handler";
import type { Either } from "@/domain/either/Either";


export interface SignUserRepository {
    SignUpUser(userData: SignUserRepository.Request): Promise<SignUserRepository.Response>
}


export namespace SignUserRepository {
    export type Request = { username: string, email: string, password: string, role: string };
    export type Response = Either<Failure, { authenticationToken: string }>;
}