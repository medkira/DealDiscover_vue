import type { Failure } from "@/data/network/error_handler";
import type { Either } from "@/domain/either/Either";

export interface DeleteUserRepository {
    deleteUser(
        userId: DeleteUserRepository.Request
    ): Promise<DeleteUserRepository.Response>;
}

export namespace DeleteUserRepository {
    export type Request = string;
    export type Response = Either<Failure, void>;
}
