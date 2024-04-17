
import type { Post } from "@/data/response/Post";
import type { Either } from '@/domain/either/Either'
import type { Failure } from "@/data/network/error_handler";




export interface GetTopPostsInterface {
    getTopPosts(params: GetTopPostsInterface.Request): Promise<GetTopPostsInterface.Response>;
}

export namespace GetTopPostsInterface {
    export type Request = {sortBy: string, limit: number };
    export type Response = Either<Failure, { data: Post[] }>

}
