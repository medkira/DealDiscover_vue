import type { RemoteDataSource } from "../data_source/remote_data_source";
import type { AxiosResponse } from "axios";
import { Either } from "@/domain/either/Either";
import { ErrorHandler, type Failure } from "../network/error_handler";
import type { GetLatestCommentsRepository } from "@/domain/repository/comments/GetLatestCommentsInterface";
import type { CreateCommentRepository } from "@/domain/repository/comments/CreateCommentInterface";



export class CommentRepository implements CreateCommentRepository, GetLatestCommentsRepository {
    constructor(
        public readonly remoteDataSource: RemoteDataSource
    ) { }
    async getLatestCommets(params: GetLatestCommentsRepository.Request): Promise<GetLatestCommentsRepository.Response> {
        try {
            // mapping happens here

            const response: AxiosResponse = await this.remoteDataSource.getLatestComments(params);

            return Either.right(response.data);

        } catch (error) {
            const errorHandler = new ErrorHandler(error);
            const failure: Failure = errorHandler.failure;


            return Either.left(failure);
        }
    }


    async createComment(commentData: CreateCommentRepository.Request): Promise<CreateCommentRepository.Response> {

        try {


            const response: AxiosResponse = await this.remoteDataSource.createComment(commentData);

            return Either.right(response.data);
        } catch (error) {

            const errorHandler = new ErrorHandler(error);
            const failure: Failure = errorHandler.failure;


            return Either.left(failure);
            // }

        }
    }
}
