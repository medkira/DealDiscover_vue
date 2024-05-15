import type { GetUsersRepository } from "@/domain/repository/user/GetUsersInterface";
import type { RemoteDataSource } from "../data_source/remote_data_source";
import type { AxiosResponse } from "axios";
import { Either } from "@/domain/either/Either";
import { ErrorHandler, type Failure } from "../network/error_handler";
import type { DeleteUserRepository } from "@/domain/repository/user/DeletUserInterface";
import type { UpdateUserInformationByIdRespository } from "@/domain/repository/user/UpdateUserInformationByIdInterface";
import type { LoadUserByIdRepository } from "@/domain/repository/user/LoadUserByIdInterface";



export class UserRepository implements
    GetUsersRepository, DeleteUserRepository, LoadUserByIdRepository, UpdateUserInformationByIdRespository {
    constructor(
        public readonly remoteDataSource: RemoteDataSource
    ) { }
    async loadUser(): Promise<LoadUserByIdRepository.Response> {
        try {
            // mapping happens here

            const response: AxiosResponse = await this.remoteDataSource.getUser();

            return Either.right(response.data);

        } catch (error) {
            const errorHandler = new ErrorHandler(error);
            const failure: Failure = errorHandler.failure;


            return Either.left(failure);
        }
    }
    async updateUser(userData: UpdateUserInformationByIdRespository.Request): Promise<UpdateUserInformationByIdRespository.Response> {
        try {
            // mapping happens here
            const formData = new FormData();
            userData.profileImage && formData.append('profileImage', userData.profileImage as any);
            userData.username && formData.append('username', userData.username);
            userData.email && formData.append('email', userData.email);
            userData.salary && formData.append('salary', userData.salary);
            userData.phoneNumber && formData.append('phoneNumber', userData.phoneNumber);
            userData.name && formData.append('name', userData.name);
            userData.socialStatus && formData.append('socialStatus', userData.socialStatus);
            userData.jobTitle && formData.append('jobTitle', userData.jobTitle);
            userData.firstName && formData.append('firstName', userData.firstName);
            userData.lastName && formData.append('lastName', userData.lastName);
            userData.country && formData.append('country', userData.country);
            userData.address && formData.append('address', userData.address);





            const response: AxiosResponse = await this.remoteDataSource.updateUser(formData);

            return Either.right(response.data);
        } catch (error) {

            const errorHandler = new ErrorHandler(error);
            const failure: Failure = errorHandler.failure;


            return Either.left(failure);

        }
    }



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









