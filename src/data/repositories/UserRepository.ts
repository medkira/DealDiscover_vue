import type { GetUsersRepository } from "@/domain/repository/user/GetUsersInterface";
import type { RemoteDataSource } from "../data_source/remote_data_source";
import type { AxiosResponse } from "axios";
import { Either } from "@/domain/either/Either";
import { ErrorHandler, type Failure } from "../network/error_handler";
import type { DeleteUserRepository } from "@/domain/repository/user/DeletUserInterface";



export class UserRepository implements
    GetUsersRepository, DeleteUserRepository {
    constructor(
        public readonly remoteDataSource: RemoteDataSource
    ) { }

    async deleteUser(userId: string): Promise<DeleteUserRepository.Response> {
        try {
            // mapping happens here

            const response: AxiosResponse = await this.remoteDataSource.deleteUser(userId);

            return Either.right(response.data);

        } catch (error) {
            const errorHandler = new ErrorHandler(error);
            const failure: Failure = errorHandler.failure;


            return Either.left(failure);
        }
    }
    async getUsers(params: GetUsersRepository.Request): Promise<GetUsersRepository.Response> {
        try {
            // mapping happens here
            const response: AxiosResponse = await this.remoteDataSource.getUers(params);

            return Either.right(response.data);

        } catch (error) {
            const errorHandler = new ErrorHandler(error);
            const failure: Failure = errorHandler.failure;


            return Either.left(failure);
        }
    }






}









