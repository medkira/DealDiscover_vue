import type { CreatePostRepository } from "@/domain/repository/post/CreatePostInterface";
import type { RemoteDataSource } from "../data_source/remote_data_source";
import type { AxiosResponse } from "axios";
import { Either } from "@/domain/either/Either";
import { ErrorHandler, type Failure } from "../network/error_handler";
import type { GetLatestPostsRepository } from "@/domain/repository/post/GetLatestPostsInterface";



export class PostRepository implements CreatePostRepository, GetLatestPostsRepository {
    constructor(
        public readonly remoteDataSource: RemoteDataSource
    ) { }

    async getPosts(params: GetLatestPostsRepository.Request): Promise<GetLatestPostsRepository.Response> {
        try {
            // mapping happens here

            const response: AxiosResponse = await this.remoteDataSource.getLatestPosts(params);

            return Either.right(response.data);

        } catch (error) {
            const errorHandler = new ErrorHandler(error);
            const failure: Failure = errorHandler.failure;


            return Either.left(failure);
        }
    }

    async createPost(postData: CreatePostRepository.Request): Promise<CreatePostRepository.Response> {

        try {
            // mapping happens here
            const formData = new FormData();
            postData.postImage && formData.append('postImage', postData.postImage);
            postData.rate && formData.append('rate', postData.rate);
            formData.append('content', postData.content);
            // formData.append('rate', rate.value);
            formData.append('post_type', postData.post_type);


            const response: AxiosResponse = await this.remoteDataSource.createPost(formData);

            return Either.right(response.data);
        } catch (error) {

            const errorHandler = new ErrorHandler(error);
            const failure: Failure = errorHandler.failure;


            return Either.left(failure);
            // }

        }
    }
}
