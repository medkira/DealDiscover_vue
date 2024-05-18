import type { Failure } from "@/data/network/error_handler";
import type { Either } from "@/domain/either/Either";
import type { Comment } from "@/domain/entities/Comment";

export interface GetLatestCommentsRepository {
    getLatestCommets(params: GetLatestCommentsRepository.Request): Promise<GetLatestCommentsRepository.Response>;
}

export namespace GetLatestCommentsRepository {
    export type Request = { page?: number, postId: string };
    export type Response = Either<Failure, { data: Comment[], page: number, total: number, totalPages: number }>;
}