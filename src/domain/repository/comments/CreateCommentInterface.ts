import type { Failure } from "@/data/network/error_handler";
import type { Either } from "@/domain/either/Either";
import type { CommentProps } from "@/domain/entities/Comment";

export interface CreateCommentRepository {
    createComment(commentData: CreateCommentRepository.Request): Promise<CreateCommentRepository.Response>;
}

export namespace CreateCommentRepository {
    export type Request = Omit<CommentProps, 'id' | 'updatedAt' | 'createdAt' | 'likes' | 'userId' | 'username'>
    export type Response = Either<Failure, { commentId: string }>;
}