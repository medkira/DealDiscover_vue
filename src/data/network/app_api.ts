import { NetworkConstants } from "@/app/constants";
import type { SignUserRepository } from "@/domain/repository/authentication/SignUpUserInterface";
import type { AxiosInstance, AxiosResponse } from "axios";

export class AppServiceClient {
    constructor(
        private readonly http: AxiosInstance
    ) { }


    //  ? Auth 
    async login(loginRequest: { email: string, password: string }): Promise<AxiosResponse<{ authenticationToken: string }>> {
        return await this.http.post(`${NetworkConstants.BASE_API}/login`, loginRequest);
    }

    async registeUser(registerRequest: { username: string, email: string, password: string, role: string }): Promise<AxiosResponse<SignUserRepository.Response>> {
        return await this.http.post(`${NetworkConstants.BASE_API}/register`, registerRequest);
    }

    // async registerOwner(registerRequest: { email: string, password: string, role: string }): Promise<AxiosResponse<{ authenticationToken: string }>> {
    //     return await this.http.post(`${NetworkConstants.BASE_API}/register`, registerRequest);
    // }


    // ? Post
    async getLatestPost(reqQuery: { page?: string, type?: string, location?: string }) {
        return await this.http.get(`${NetworkConstants.BASE_API}/place/page`, {
            params: {
                page: reqQuery.page,
                type: reqQuery.type,
                location: reqQuery.location,
            }
        });
    }
}

