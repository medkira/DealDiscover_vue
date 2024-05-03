import type { AxiosResponse } from "axios";
import type { AppServiceClient } from "../network/app_api";
import type { LoginRepository } from "@/domain/repository/authentication/SignInInterface";
import type { SignUserRepository } from "@/domain/repository/authentication/SignUpUserInterface";
import type { CreatePostRepository } from "@/domain/repository/post/CreatePostInterface";
import type { GetLatestPostsRepository } from "@/domain/repository/post/GetLatestPostsInterface";
import type { GetLatesPlacesRepository } from "@/domain/repository/places/GetlatestPlacesInterface";
import type { CreateRateRepository } from "@/domain/repository/rates/CreateRateInterface";
import type { GetLatestRatesRepository } from "@/domain/repository/rates/GetLatestRatesInterface";
import type { GetPlaceByIdRepository } from "@/domain/repository/places/GetPlaceByIdInterface";
import type { GetFavouritePlacesRepository } from "@/domain/repository/places/favourites/GetFavouritePlacesByIdInterface";

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




    //***** Post  *****/

    // this  CreatePostRepository.Request suppose to be a form data with all the attributes inside of it.
    // we change it for  now to (any)
    async createPost(createPostRequest: any): Promise<AxiosResponse<CreatePostRepository.Response>> {
        return await this._appServiceClient.createPost(createPostRequest);
    }


    async getLatestPosts(getLatesPostsRequest: GetLatestPostsRepository.Request): Promise<AxiosResponse<GetLatestPostsRepository.Response>> {
        return await this._appServiceClient.getLatestPosts(getLatesPostsRequest);
    }


    //***********Place *****************/

    async getLatestPlaces(getLatestPlacesRequest: GetLatesPlacesRepository.Request): Promise<AxiosResponse<GetLatesPlacesRepository.Response>> {
        return await this._appServiceClient.getPlacesQuery(getLatestPlacesRequest);
    }
    async getPlaceById(id: string): Promise<AxiosResponse<GetLatesPlacesRepository.Response>> {
        return await this._appServiceClient.getPlaceById(id);
    }



    async getFavouritePlaces(): Promise<AxiosResponse<GetFavouritePlacesRepository.Response>> {

        return await this._appServiceClient.getFavouritePlaces();
    }




    //**** Rate  *****/

    async createRate(createRateRequest: CreateRateRepository.Request): Promise<AxiosResponse<CreateRateRepository.Response>> {
        // console.log("from remote daat source: ", createRateRequest)

        return await this._appServiceClient.createRate(createRateRequest);
    }


    async getLatestRates(getLatesRatesRequest: GetLatestRatesRepository.Request): Promise<AxiosResponse<GetLatestRatesRepository.Response>> {
        return await this._appServiceClient.getRatesQuery(getLatesRatesRequest);
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
    getPlaceById(id: GetPlaceByIdRepository.Request): Promise<AxiosResponse<GetLatesPlacesRepository.Response>>;


    // * Rate *//
    createRate(createRateRequest: CreateRateRepository.Request): Promise<AxiosResponse<CreateRateRepository.Response>>
    getLatestRates(getLatesRatesRequest: GetLatestRatesRepository.Request): Promise<AxiosResponse<GetLatestRatesRepository.Response>>;


    // * Favourites  * //
    getFavouritePlaces(): Promise<AxiosResponse<GetFavouritePlacesRepository.Response>>;


}



