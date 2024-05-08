import type { Failure } from "@/data/network/error_handler";
import type { Either } from "@/domain/either/Either";
import type { NormalUser } from "@/domain/entities/NormalUser";
import type { UserRole } from "@/domain/entities/User";


export interface GetUsersRepository {
    getUsers(params: GetUsersRepository.Request): Promise<GetUsersRepository.Response>
}

export namespace GetUsersRepository {
    export type Request = { page?: number, role?: UserRole, isEmailVerified?: boolean };
    export type Response = Either<Failure, { data: NormalUser[], page: number, total: number, totalPages: number }>;
}