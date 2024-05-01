import type { AxiosResponse } from "axios";
import type { AppServiceClient } from "../network/app_api";
import type { LoginRepository } from "@/domain/repository/authentication/SignInInterface";
import type { SignUserRepository } from "@/domain/repository/authentication/SignUpUserInterface";
import type { CreatePostRepository } from "@/domain/repository/post/CreatePostInterface";
import type { GetLatestPostsRepository } from "@/domain/repository/post/GetLatestPostsInterface";
import type { GetLatesPlacesRepository } from "@/domain/repository/places/GetlatestPlacesInterface";

export class RemoteDataSourceImpl implements RemoteDataSource {

    constructor(
        private readonly _appServiceClient: AppServiceClient
    ) { }


    /***** Auth  *****/

    async login(loginRequest: LoginRepository.Request): Promise<AxiosResponse<{ authenticationToken: string }>> {
        return await this._appServiceClient.login({ email: loginRequest.email, password: loginRequest.password });
    }

    async register(registerRequest: SignUserRepository.Request): Promise<AxiosResponse<SignUserRepository.Response>> {
        return await this._appServiceClient.registeUser({ username: registerRequest.username, email: registerRequest.email, password: registerRequest.password, role: registerRequest.role })
    }


    // async forgotPassword(forgotPasswordRequest: ForgotPasswordRequest): Promise<ForgotPasswordResponse> {
    //     return await this._appServiceClient.forgotPassword(forgotPasswordRequest.email);
    // }

    // async register(registerRequest: RegisterRequest): Promise<AuthenticationResponse> {
    //     return await this._appServiceClient.register(
    //         registerRequest.email,
    //         registerRequest.password,
    //         registerRequest.userName,
    //         registerRequest.mobileNumber,
    //         registerRequest.countryMobileCode
    //     );
    // }




    /***** Post  *****/

    // this  CreatePostRepository.Request suppose to be a form data with all the attributes inside of it.
    // we change it for  now to (any)
    async createPost(createPostRequest: any): Promise<AxiosResponse<CreatePostRepository.Response>> {
        return await this._appServiceClient.createPost(createPostRequest);
    }


    async getLatestPosts(getLatesPostsRequest: GetLatestPostsRepository.Request): Promise<AxiosResponse<GetLatestPostsRepository.Response>> {
        return await this._appServiceClient.getLatestPosts(getLatesPostsRequest);
    }


    /***********Place ****************/

    async getLatestPlaces(getLatestPlacesRequest: GetLatesPlacesRepository.Request): Promise<AxiosResponse<GetLatesPlacesRepository.Response, any>> {
        return await this._appServiceClient.getPlacesQuery(getLatestPlacesRequest);
    }


}


export interface RemoteDataSource {
    //* Auth *//
    login(loginRequest: { email: string, password: string }): Promise<AxiosResponse<{ authenticationToken: string }>>;
    register(registerRequest: SignUserRepository.Request): Promise<AxiosResponse<SignUserRepository.Response>>;
    // forgotPassword(forgotPasswordRequest: ForgotPasswordRequest): Promise<ForgotPasswordResponse>;


    //* Post *//
    createPost(createPostRequest: CreatePostRepository.Request): Promise<AxiosResponse<CreatePostRepository.Response>>
    getLatestPosts(getLatesPostsRequest: GetLatestPostsRepository.Request): Promise<AxiosResponse<GetLatestPostsRepository.Response>>;


    //* Place *//
    getLatestPlaces(getLatestPlacesRequest: GetLatesPlacesRepository.Request): Promise<AxiosResponse<GetLatesPlacesRepository.Response>>;

}



