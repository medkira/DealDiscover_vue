import type { postType } from "@/domain/entities/Post";
import type { SignUserRepository } from "@/domain/repository/authentication/SignUpUserInterface";
import type { GetLatestPostsRepository } from "@/domain/repository/post/GetLatestPostsInterface";
import type { AxiosInstance, AxiosResponse } from "axios";
import type { GetLatesPlacesRepository } from "@/domain/repository/places/GetlatestPlacesInterface"
import type { CreateRateRepository } from "@/domain/repository/rates/CreateRateInterface";
import type { GetLatestRatesRepository } from "@/domain/repository/rates/GetLatestRatesInterface";
import type { GetPlaceByIdRepository } from "@/domain/repository/places/GetPlaceByIdInterface";
import type { CreatePlaceRepository } from "@/domain/repository/places/CreatePlaceInterface";
import type { GetLatestImageContributionRepository } from "@/domain/repository/imageContribution/GetLatestImageContributionInterface";
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

    async getPlaceById(id: GetPlaceByIdRepository.Request) {
        return await this.http.get(`place/${id}`);
    }

    async createPlace(createPlaceRequest: CreatePlaceRepository.Request): Promise<AxiosResponse<any>> {

        return await this.http.post('/place', createPlaceRequest);
    }

    // async acceptPlaceById

    // ? R A T E S

    async createRate(createRateRequest: CreateRateRepository.Request) {
        return await this.http.post('rates', createRateRequest)
    }

    async getRatesQuery(reqQuery: GetLatestRatesRepository.Request) {
        return await this.http.get('/rates/page', {
            params: {
                page: reqQuery.page,
                rated_id: reqQuery.rated_id
            }
        })

    }

    // ? Favourites

    async addPlaceFavourites(req: { placeId: string }) {
        return await this.http.patch('place/favorites/add', req)
    }


    async removePlaceFavourites(req: { placeId: string }) {
        return await this.http.patch('place/favorites/remove', req)
    }

    async getFavouritePlaces() {
        return await this.http.get('place/favorites/get');

    }

    // ? I M A G E C O N T R I B U T I O N 

    async createImageContribution(Request: { place_id: string, postImage: File }): Promise<AxiosResponse<any>> {
        return await this.http.post('/imageContribution', Request);
    }

    async getImageContributions(reqQuery: GetLatestImageContributionRepository.Request) {
        // const res = await this.http.get('/imageContribution/page', {
        //     params: {
        //         page: reqQuery.page,

        //     }
        // });
        // console.log(res);
        return await this.http.get('/imageContribution/page', {
            params: {
                page: reqQuery.page,

            }
        });

    }

    async acceptImageContribution(id: string): Promise<AxiosResponse<any>> {
        return await this.http.post(`/imageContribution/validate/${id}`, Request);
    }

    async refuseImageContribution(id: string): Promise<AxiosResponse<any>> {
        return await this.http.delete(`/imageContribution/refuse/${id}`);
    }

}

