import type { AxiosResponse } from "axios";
import type { AppServiceClient, reqQuery } from "../network/app_api";
import type { LoginRepository } from "@/domain/repository/authentication/SignInInterface";
import type { LatestPlaceResponse } from "../response/place";
import type { Post } from "../response/Post";
export class RemoteDataSourceImpl implements RemoteDataSource {

    constructor(
        private readonly _appServiceClient: AppServiceClient
    ) { }
    async getLatestPlace(params: reqQuery): Promise<AxiosResponse<LatestPlaceResponse>> {
        return await this._appServiceClient.getLatestPlace({location: params.location, page: params.page,type: params.type});
    }
    
    async getTopPosts(params: {sortBy: string, limit: number }): Promise<AxiosResponse<Post[]>> {
        return await this._appServiceClient.getTopPosts({sortBy: params.sortBy, limit: params.limit});
    }
    async login(loginRequest: LoginRepository.Request): Promise<AxiosResponse<{ authenticationToken: string }>> {
        return await this._appServiceClient.login({ email: loginRequest.email, password: loginRequest.password });
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

}


export interface RemoteDataSource {
    login(loginRequest: { email: string, password: string }): Promise<AxiosResponse<{ authenticationToken: string }>>;
    // register(registerRequest: RegisterRequest): Promise<AuthenticationResponse>;
    // forgotPassword(forgotPasswordRequest: ForgotPasswordRequest): Promise<ForgotPasswordResponse>;
    getLatestPlace(params: reqQuery): Promise<AxiosResponse<LatestPlaceResponse>>
    getTopPosts(params: {sortBy: string, limit: number }): Promise<AxiosResponse<Post[]>>

}



