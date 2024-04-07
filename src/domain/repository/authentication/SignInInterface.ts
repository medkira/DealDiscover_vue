import type { Either } from "@/domain/either/Either";
import type { Failure } from "@/data/network/error_handler";



export interface LoginRepository {
    login(credentials: LoginRepository.Request): Promise<LoginRepository.Response>;
}

export namespace LoginRepository {
    export type Request = { email: string, password: string };
    export type Response = Either<Failure, { authenticationToken: string }>;
}

