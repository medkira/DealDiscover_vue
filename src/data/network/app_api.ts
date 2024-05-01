import type { postType } from "@/domain/entities/Post";
import type { SignUserRepository } from "@/domain/repository/authentication/SignUpUserInterface";
import type { GetLatestPostsRepository } from "@/domain/repository/post/GetLatestPostsInterface";
import type { AxiosInstance, AxiosResponse } from "axios";
import type { GetLatesPlacesRepository } from "@/domain/repository/places/GetlatestPlacesInterface"
export class AppServiceClient {
    constructor(
        private readonly http: AxiosInstance
    ) { }


    //  ? Auth 
    async login(loginRequest: { email: string, password: string }): Promise<AxiosResponse<{ authenticationToken: string }>> {
        return await this.http.post(`/login`, loginRequest);
    }

    async registeUser(registerRequest: { username: string, email: string, password: string, role: string }): Promise<AxiosResponse<SignUserRepository.Response>> {
        return await this.http.post(`/register`, registerRequest);
    }

    // async registerOwner(registerRequest: { email: string, password: string, role: string }): Promise<AxiosResponse<{ authenticationToken: string }>> {
    //     return await this.http.post(`/register`, registerRequest);
    // }


    // ? P O S T
    async getLatestPosts(reqQuery: GetLatestPostsRepository.Request) {
        return await this.http.get(`/post/page`, {
            params: {
                page: reqQuery.page,
                type: reqQuery.type,
                title: reqQuery.title,
            }
        });
    }

    async createPost(createPostRequest: { post_type: string, content: string, postImage: File }): Promise<AxiosResponse<any>> {
        // console.log("hiiii")
        // console.log("from app api ", createPostRequest.postImage)
        // console.log("From app api", this.http.post('/posts', createPostRequest));
        return await this.http.post('/posts', createPostRequest);
    }

    // ? P L A C E S

    async getPlacesQuery(reqQuery: GetLatesPlacesRepository.Request) {
        return await this.http.get('/place/page', {
            params: {
                page: reqQuery.page,
                type: reqQuery.type,
                location: reqQuery.location
            }
        })

    }

}

