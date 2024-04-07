import { NetworkConstants } from "@/app/constants";
import type { AxiosInstance, AxiosResponse } from "axios";

export class AppServiceClient {
    constructor(
        private readonly http: AxiosInstance
    ) { }


    //  ? Auth 
    async login(loginRequest: { email: string, password: string }): Promise<AxiosResponse<{ authenticationToken: string }>> {
        return await this.http.post(`${NetworkConstants.BASE_API}/login`, loginRequest);
    }

    async authGoogle(): Promise<AxiosResponse<{ authenticationToken: string }>> {
        return await this.http.get(`${NetworkConstants.BASE_API}/google`);
    }


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

