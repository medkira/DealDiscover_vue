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
import type { CreateImageContributionRepository } from "@/domain/repository/imageContribution/CreateImageContributionInterface";
import type { CreatePlaceRepository } from "@/domain/repository/places/CreatePlaceInterface";
import type { GetLatestImageContributionRepository } from "@/domain/repository/imageContribution/GetLatestImageContributionInterface";
import type { ValidateImageContributionByIdIRepository } from "@/domain/repository/imageContribution/ValidateImageContributionByIdInterface";
import type { RefuseImageContributionByIdRepostiory } from "@/domain/repository/imageContribution/RefuseImageContributionByIdInterface";
import type { DeletePlaceRepository } from "@/domain/repository/places/DeletePlaceInterface";
import type { ValidationPlaceContributionByIdRepository } from "@/domain/repository/places/ValidationPlaceContributionByIdInterface";
import type { GetUsersRepository } from "@/domain/repository/user/GetUsersInterface";
import type { DeleteUserRepository } from "@/domain/repository/user/DeletUserInterface";
import type { UpdatePlaceRepository } from "@/domain/repository/places/UpdatePlaceInterface";
import type { GetLatesFoodsRepository } from "@/domain/repository/foods/GetlatestFoodsInterface";
import type { DeleteFoodRepository } from "@/domain/repository/foods/DeleteFoodInterface";
import type { CreateFoodRepository } from "@/domain/repository/foods/CreateFoodInterface";
import type { UpdateFoodRepository } from "@/domain/repository/foods/UpdateFoodInterface";
import type { GetFoodByIdRepository } from "@/domain/repository/foods/GetFoodByIdInterface";
import type { CreateMenuRepository } from "@/domain/repository/menu/CreateMenuInterface";
import type { UpdateUserInformationByIdRespository } from "@/domain/repository/user/UpdateUserInformationByIdInterface";
import type { LoadUserByIdRepository } from "@/domain/repository/user/LoadUserByIdInterface";
import type { CreateCommentRepository } from "@/domain/repository/comments/CreateCommentInterface";
import type { GetLatestCommentsRepository } from "@/domain/repository/comments/GetLatestCommentsInterface";
import type { AutoCompletePlaceSearchRepository } from "@/domain/repository/places/AutoCompletePlaceSearchInterface";

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


    //****** Comment ******************//
    async createComment(createCommentRequest: CreateCommentRepository.Request): Promise<AxiosResponse<CreateCommentRepository.Response, any>> {
        return await this._appServiceClient.createComment(createCommentRequest);
    }
    async getLatestComments(getLatesCommentsRequest: GetLatestCommentsRepository.Request): Promise<AxiosResponse<GetLatestCommentsRepository.Response, any>> {
        return await this._appServiceClient.getLatestComments(getLatesCommentsRequest);
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

    async createPlace(createPlaceRequest: any): Promise<AxiosResponse<CreatePlaceRepository.Response, any>> {
        return await this._appServiceClient.createPlace(createPlaceRequest);
    }



    async acceptPlace(id: string): Promise<AxiosResponse<ValidationPlaceContributionByIdRepository.Response, any>> {
        return await this._appServiceClient.acceptPlaceById(id);
    }

    async deletePlace(id: string): Promise<AxiosResponse<DeletePlaceRepository.Response, any>> {
        return await this._appServiceClient.refusePlaceById(id);
    }


    async updatePlace(updatePlaceRequest: UpdatePlaceRepository.Request): Promise<AxiosResponse<UpdatePlaceRepository.Response, any>> {
        return await this._appServiceClient.updaPlcaById(updatePlaceRequest)
    }

    // * place search autocomplete //*

    async autoCompletePlaceSearch(queryRequest: AutoCompletePlaceSearchRepository.Request): Promise<AxiosResponse<AutoCompletePlaceSearchRepository.Response>> {
        return await this._appServiceClient.autoCompletePlaceSearch(queryRequest);
    }
    //* Foods 
    async getLatestFoods(getLatestFoodsRequest: GetLatesFoodsRepository.Request): Promise<AxiosResponse<GetLatesFoodsRepository.Response, any>> {
        return await this._appServiceClient.getFoodsQuery(getLatestFoodsRequest);
    }

    async createFood(createFoodRequest: any): Promise<AxiosResponse<CreateFoodRepository.Response, any>> {
        return await this._appServiceClient.createFood(createFoodRequest);
    }

    async deleteFood(id: string): Promise<AxiosResponse<DeleteFoodRepository.Response, any>> {
        return await this._appServiceClient.deletFoodById(id);
    }


    async updateFood(updateFoodRequest: UpdateFoodRepository.Request): Promise<AxiosResponse<UpdateFoodRepository.Response, any>> {
        return await this._appServiceClient.updaFoodById(updateFoodRequest)
    }

    async getFoodById(id: string): Promise<AxiosResponse<GetFoodByIdRepository.Response>> {
        return await this._appServiceClient.getFoodById(id);
    }


    //******* Menu ******//
    async createMenu(createMenuRequest: CreateMenuRepository.Request): Promise<AxiosResponse<CreateMenuRepository.Response>> {
        return await this._appServiceClient.createMenu(createMenuRequest);
    }


    //**** Rate  *****/

    async createRate(createRateRequest: CreateRateRepository.Request): Promise<AxiosResponse<CreateRateRepository.Response>> {
        // console.log("from remote daat source: ", createRateRequest)

        return await this._appServiceClient.createRate(createRateRequest);
    }


    async getLatestRates(getLatesRatesRequest: GetLatestRatesRepository.Request): Promise<AxiosResponse<GetLatestRatesRepository.Response>> {
        return await this._appServiceClient.getRatesQuery(getLatesRatesRequest);
    }

    //* Image Contribution *//
    // .Request suppose to be a form data with all the attributes inside of it.
    // we change it for  now to (any)
    async createImageContribution(imageContributionRequest: any): Promise<AxiosResponse<CreateImageContributionRepository.Response>> {
        return await this._appServiceClient.createImageContribution(imageContributionRequest)
    }
    async getImageContributions(reqQuery: GetLatestImageContributionRepository.Request): Promise<AxiosResponse<GetLatestImageContributionRepository.Response, any>> {
        return await this._appServiceClient.getImageContributions(reqQuery);
    }

    async refuseImageContribution(id: string): Promise<AxiosResponse<RefuseImageContributionByIdRepostiory.Response>> {
        return await this._appServiceClient.refuseImageContribution(id);
    }
    async acceptImageContributions(id: string): Promise<AxiosResponse<ValidateImageContributionByIdIRepository.Response>> {
        return await this._appServiceClient.acceptImageContribution(id);
    }


    //* USERS *//

    async getUers(getUserRequest: GetUsersRepository.Request) {
        return await this._appServiceClient.getUsersQuery(getUserRequest);
    }

    async deleteUser(id: string): Promise<AxiosResponse<DeleteUserRepository.Response, any>> {
        return await this._appServiceClient.deletUser(id);
    }

    async updateUser(reqData: UpdateUserInformationByIdRespository.Request): Promise<AxiosResponse<UpdateUserInformationByIdRespository.Response, any>> {
        return await this._appServiceClient.updateUser(reqData);
    }
    async getUser(): Promise<AxiosResponse<LoadUserByIdRepository.Response, any>> {
        return await this._appServiceClient.getUser();
    }


}


export interface RemoteDataSource {
    //* Auth *//
    login(loginRequest: { email: string, password: string }): Promise<AxiosResponse<{ authenticationToken: string }>>;
    register(registerRequest: SignUserRepository.Request): Promise<AxiosResponse<SignUserRepository.Response>>;
    // forgotPassword(forgotPasswordRequest: ForgotPasswordRequest): Promise<ForgotPasswordResponse>;


    //* Post *//
    createPost(createPostRequest: CreatePostRepository.Request): Promise<AxiosResponse<CreatePostRepository.Response>>;
    getLatestPosts(getLatesPostsRequest: GetLatestPostsRepository.Request): Promise<AxiosResponse<GetLatestPostsRepository.Response>>;

    //* comment *//
    createComment(createCommentRequest: CreateCommentRepository.Request): Promise<AxiosResponse<CreateCommentRepository.Response>>;
    getLatestComments(getLatesCommentsRequest: GetLatestCommentsRepository.Request): Promise<AxiosResponse<GetLatestCommentsRepository.Response>>;

    //* Place *//
    getLatestPlaces(getLatestPlacesRequest: GetLatesPlacesRepository.Request): Promise<AxiosResponse<GetLatesPlacesRepository.Response>>;
    getPlaceById(id: GetPlaceByIdRepository.Request): Promise<AxiosResponse<GetLatesPlacesRepository.Response>>;
    createPlace(createPlaceRequest: CreatePlaceRepository.Request): Promise<AxiosResponse<CreatePlaceRepository.Response>>;
    deletePlace(id: DeletePlaceRepository.Request): Promise<AxiosResponse<DeletePlaceRepository.Response>>;
    acceptPlace(id: ValidationPlaceContributionByIdRepository.Request): Promise<AxiosResponse<ValidationPlaceContributionByIdRepository.Response>>;
    updatePlace(updatePlaceRequest: UpdatePlaceRepository.Request): Promise<AxiosResponse<UpdatePlaceRepository.Response>>;


    //* Food */ 
    getLatestFoods(getLatestFoodsRequest: GetLatesFoodsRepository.Request): Promise<AxiosResponse<GetLatesFoodsRepository.Response>>;


    // * Rate *//
    createRate(createRateRequest: CreateRateRepository.Request): Promise<AxiosResponse<CreateRateRepository.Response>>
    getLatestRates(getLatesRatesRequest: GetLatestRatesRepository.Request): Promise<AxiosResponse<GetLatestRatesRepository.Response>>;


    // * Favourites  * //
    getFavouritePlaces(): Promise<AxiosResponse<GetFavouritePlacesRepository.Response>>;


    // * Image Contribution */
    createImageContribution(imageContributionRequest: CreateImageContributionRepository.Request): Promise<AxiosResponse<CreateImageContributionRepository.Response>>;
    getImageContributions(reqQuery: GetLatestImageContributionRepository.Request): Promise<AxiosResponse<GetLatestImageContributionRepository.Response>>;
    acceptImageContributions(req: ValidateImageContributionByIdIRepository.Request): Promise<AxiosResponse<ValidateImageContributionByIdIRepository.Response>>;
    refuseImageContribution(req: string): Promise<AxiosResponse<any>>;

    // * Users * //
    getUers(getUserRequest: GetUsersRepository.Request): Promise<AxiosResponse<GetUsersRepository.Response>>;
    deleteUser(id: DeleteUserRepository.Request): Promise<AxiosResponse<DeleteUserRepository.Response>>;
    updateUser(reqData: UpdateUserInformationByIdRespository.Request): Promise<AxiosResponse<UpdateUserInformationByIdRespository.Response>>;
    getUser(): Promise<AxiosResponse<LoadUserByIdRepository.Response>>

    // * Menu *//
    createMenu(createMenuRequest: CreateMenuRepository.Request): Promise<AxiosResponse<CreateMenuRepository.Response>>

    // * P L A C E  S E A R C H autocomplete *//
    autoCompletePlaceSearch(queryRequest: AutoCompletePlaceSearchRepository.Request): Promise<AxiosResponse<AutoCompletePlaceSearchRepository.Response>>;

}



