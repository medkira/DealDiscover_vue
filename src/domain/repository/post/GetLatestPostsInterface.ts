import type { Failure } from "@/data/network/error_handler";
import type { Either } from "@/domain/either/Either";
import type { Post, postType } from "@/domain/entities/Post";



export interface GetLatestPostsRepository {
    getPosts(params: GetLatestPostsRepository.Request): Promise<GetLatestPostsRepository.Response>;
}

export namespace GetLatestPostsRepository {
    export type Request = { page?: number, type?: postType, title?: string };
    export type Response = Either<Failure, { data: Post[], page: number, total: number, totalPages: number }>;
}