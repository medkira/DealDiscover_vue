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
import type { GetUsersRepository } from "@/domain/repository/user/GetUsersInterface";
import type { UpdatePlaceRepository } from "@/domain/repository/places/UpdatePlaceInterface";
import type { GetLatesFoodsRepository } from "@/domain/repository/foods/GetlatestFoodsInterface";
import type { CreateFoodRepository } from "@/domain/repository/foods/CreateFoodInterface";
import type { GetFoodByIdRepository } from "@/domain/repository/foods/GetFoodByIdInterface";
import type { UpdateFoodRepository } from "@/domain/repository/foods/UpdateFoodInterface";
import type { CreateMenuRepository } from "@/domain/repository/menu/CreateMenuInterface";
import type { UpdateUserInformationByIdRespository } from "@/domain/repository/user/UpdateUserInformationByIdInterface";
import type { CreateCommentRepository } from "@/domain/repository/comments/CreateCommentInterface";
import type { GetLatestCommentsRepository } from "@/domain/repository/comments/GetLatestCommentsInterface";
import type { AutoCompletePlaceSearchRepository } from "@/domain/repository/places/AutoCompletePlaceSearchInterface";
export class AppServiceClient {
    constructor(
        private readonly http: AxiosInstance
    ) { }
    // ? Verify Email
    async verifyEmail(verifyReq: { email: string }): Promise<AxiosResponse<any>> {
        return await this.http.post('/verifyEmail', verifyReq);
    }

    //? Rest password
    async resetPassword(loginRequest: { email: string }): Promise<AxiosResponse<any>> {
        return await this.http.post(`/resetPassword`, loginRequest);
    }

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

    // ? C O M M E N T
    async getLatestComments(reqQuery: GetLatestCommentsRepository.Request) {
        return await this.http.get(`/comments/page`, {
            params: {
                page: reqQuery.page,
                postId: reqQuery.postId
            }
        });
    }
    async createComment(createPostRequest: CreateCommentRepository.Request): Promise<AxiosResponse<any>> {

        return await this.http.post('/comments', createPostRequest);
    }

    // ? P L A C E S

    async getPlacesQuery(reqQuery: GetLatesPlacesRepository.Request) {
        return await this.http.get('/place/page', {
            params: {
                is_verified: reqQuery.is_verified,
                page: reqQuery.page,
                type: reqQuery.type,
                location: reqQuery.location,
                user_id: reqQuery.user_id,
            }
        })
    }

    async getPlaceById(id: GetPlaceByIdRepository.Request) {
        return await this.http.get(`place/${id}`);
    }

    async createPlace(createPlaceRequest: CreatePlaceRepository.Request): Promise<AxiosResponse<any>> {

        return await this.http.post('/place', createPlaceRequest);
    }

    async acceptPlaceById(placeId: string): Promise<AxiosResponse<any>> {
        return await this.http.post(`/place/validate/${placeId}`)
    }

    async refusePlaceById(placeId: string): Promise<AxiosResponse<any>> {

        return await this.http.delete(`/place/refuse/${placeId}`)
    }

    async updaPlcaById(updatePlaceRequest: UpdatePlaceRepository.Request) {
        const { placeData, placeId } = updatePlaceRequest
        return await this.http.patch(`/place/${placeId}`, placeData);
    }

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

    // ? U S E R S

    async getUsersQuery(reqQuery: GetUsersRepository.Request) {
        return await this.http.get('/user/page', {
            params: {
                isEmailVerified: reqQuery.isEmailVerified,
                page: reqQuery.page,
                role: reqQuery.role,
            }
        })
    }

    async deletUser(userId: string): Promise<AxiosResponse<any>> {
        return await this.http.delete(`/user/${userId}`)
    }

    async getUser(): Promise<AxiosResponse<any>> {
        return await this.http.get('/user')
    }

    async updateUser(updateData: UpdateUserInformationByIdRespository.Request): Promise<AxiosResponse<UpdateUserInformationByIdRespository.Response>> {
        return await this.http.patch('/user', updateData)
    }

    // ? F O O D S


    async getFoodsQuery(reqQuery: GetLatesFoodsRepository.Request) {
        return await this.http.get('/food/page', {
            params: {
                page: reqQuery.page,
                type: reqQuery.type,
                price: reqQuery.price,
                place_id: reqQuery.place_id
            }
        })
    }


    async getFoodById(id: GetFoodByIdRepository.Request) {
        return await this.http.get(`food/${id}`);
    }

    async createFood(createFoodRequest: CreateFoodRepository.Request): Promise<AxiosResponse<any>> {

        return await this.http.post('/food', createFoodRequest);
    }


    async deletFoodById(foodId: string): Promise<AxiosResponse<any>> {

        return await this.http.delete(`/food/${foodId}`)
    }

    async updaFoodById(updateFoodRequest: UpdateFoodRepository.Request) {
        const { foodData, foodId } = updateFoodRequest
        return await this.http.patch(`/food/${foodId}`, foodData);
    }

    // ? M E N U

    async createMenu(createMenuRequest: CreateMenuRepository.Request) {
        return await this.http.post('/menu', createMenuRequest);
    }

    // ? P L A C E  S E A R C H autocomplete

    async autoCompletePlaceSearch(queryRequest: AutoCompletePlaceSearchRepository.Request) {
        // console.log("from app api ", q)
        return await this.http.get('/place/search/autocomplete', {
            params: {
                query: queryRequest.query,
            }
        })
    }

}

