import type { AxiosResponse } from "axios";
import type { AppServiceClient } from "../network/app_api";
import type { LoginRepository } from "@/domain/repository/authentication/SignInInterface";
import type { SignUserRepository } from "@/domain/repository/authentication/SignUpUserInterface";

export class RemoteDataSourceImpl implements RemoteDataSource {

    constructor(
        private readonly _appServiceClient: AppServiceClient
    ) { }

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
}


export interface RemoteDataSource {
    login(loginRequest: { email: string, password: string }): Promise<AxiosResponse<{ authenticationToken: string }>>;
    register(registerRequest: SignUserRepository.Request): Promise<AxiosResponse<SignUserRepository.Response>>;
    // forgotPassword(forgotPasswordRequest: ForgotPasswordRequest): Promise<ForgotPasswordResponse>;
}



