import { Either } from "@/domain/either/Either";
import type { LoginRepository } from "@/domain/repository/authentication/SignInInterface";
import type { AxiosResponse } from "axios";
import { ErrorHandler, type Failure } from "../network/error_handler";
import type { RemoteDataSource } from "../data_source/remote_data_source";
import type { SignUserRepository } from "@/domain/repository/authentication/SignUpUserInterface";
export class AuthRepository implements LoginRepository, SignUserRepository {
    constructor(
        public readonly remoteDataSource: RemoteDataSource

    ) { }

    async SignUpUser(userData: SignUserRepository.Request): Promise<SignUserRepository.Response> {
        try {
            const response: AxiosResponse = await this.remoteDataSource.register(userData);
            // console.log("response status: ", response.status);
            // if (response.status === 200) {

            // console.log("either right: ", Either.right(response.data))
            return Either.right(response.data);
            // }
        } catch (error) {

            const errorHandler = new ErrorHandler(error);
            const failure: Failure = errorHandler.failure;

            // if (error.response.status == 401) {

            // console.log("either left: ", Either.left(error.response.data))
            // console.log("test error: ", error.code)
            // console.log("test error_handler failure: ", failure)

            return Either.left(failure);
            // }

        }

    }

    async login(data: LoginRepository.Request): Promise<LoginRepository.Response> {
        try {
            const response: AxiosResponse = await this.remoteDataSource.login(data);
            // console.log("response status: ", response.status);
            // if (response.status === 200) {

            // console.log("either right: ", Either.right(response.data))
            return Either.right(response.data);
            // }
        } catch (error) {

            const errorHandler = new ErrorHandler(error);
            const failure: Failure = errorHandler.failure;

            // if (error.response.status == 401) {

            // console.log("either left: ", Either.left(error.response.data))
            // console.log("test error: ", error.code)
            // console.log("test error_handler failure: ", failure)

            return Either.left(failure);
            // }

        }

    }




}

