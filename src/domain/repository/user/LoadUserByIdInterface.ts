import type { Failure } from "@/data/network/error_handler";
import type { Either } from "@/domain/either/Either";
import type { NormalUser } from "@/domain/entities/NormalUser";
import type { Owner } from "@/domain/entities/Owner";

export interface LoadUserByIdRepository {
    loadUser(
        id: LoadUserByIdRepository.Request
    ): Promise<LoadUserByIdRepository.Response>
}

export namespace LoadUserByIdRepository {
    export type Request = string;
    export type Response = Either<Failure, Owner | NormalUser>;
}