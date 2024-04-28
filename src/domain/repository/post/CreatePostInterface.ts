import type { Failure } from "@/data/network/error_handler";
import type { Either } from "@/domain/either/Either";
import type { Post } from "@/domain/entities/Post";

export interface CreatePostRepository {
    createPost(
        postData: CreatePostRepository.Request
    ): Promise<CreatePostRepository.Response>;
}

export namespace CreatePostRepository {
    // export type Request = Pick<Post, "content" | "post_type" | "postImage">;
    export type Request = any;

    export type Response = Either<Failure, { postId: string }>;
}
