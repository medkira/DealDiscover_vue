import type { RemoteDataSource } from "../data_source/remote_data_source";
import type { AxiosResponse } from "axios";
import { Either } from "@/domain/either/Either";
import { ErrorHandler, type Failure } from "../network/error_handler";
import type { GetLatesPlacesRepository } from "@/domain/repository/places/GetlatestPlacesInterface";
import type { GetPlaceByIdRepository } from "@/domain/repository/places/GetPlaceByIdInterface";
import type { GetFavouritePlacesRepository } from "@/domain/repository/places/favourites/GetFavouritePlacesByIdInterface";
import type { CreatePlaceRepository } from "@/domain/repository/places/CreatePlaceInterface";
import type { DeletePlaceRepository } from "@/domain/repository/places/DeletePlaceInterface";
import type { ValidationPlaceContributionByIdRepository } from "@/domain/repository/places/ValidationPlaceContributionByIdInterface";
import type { UpdatePlaceRepository } from "@/domain/repository/places/UpdatePlaceInterface";
import type { AutoCompletePlaceSearchRepository } from "@/domain/repository/places/AutoCompletePlaceSearchInterface";



export class PlaceRepository implements
    GetLatesPlacesRepository,
    GetPlaceByIdRepository,
    GetFavouritePlacesRepository,
    CreatePlaceRepository,
    DeletePlaceRepository,
    ValidationPlaceContributionByIdRepository,
    UpdatePlaceRepository,
    AutoCompletePlaceSearchRepository {
    constructor(
        public readonly remoteDataSource: RemoteDataSource
    ) { }


    async autoCompletePlaceSearch(params: AutoCompletePlaceSearchRepository.Request): Promise<AutoCompletePlaceSearchRepository.Response> {
        try {
            const response: AxiosResponse = await this.remoteDataSource.autoCompletePlaceSearch({ query: params.query });

            return Either.right(response.data);

        } catch (error) {
            const errorHandler = new ErrorHandler(error);
            const failure: Failure = errorHandler.failure;


            return Either.left(failure);
        }
    }
    async updatePlace(updatePlaceRequest: UpdatePlaceRepository.Request): Promise<UpdatePlaceRepository.Response> {
        try {

            const { placeData, placeId } = updatePlaceRequest;

            // mapping happens here
            const formData = new FormData();

            placeData.description && formData.append('description', placeData.description);
            placeData.location && formData.append('location', placeData.location);
            placeData.name && formData.append('name', placeData.name);
            placeData.placeImage && formData.append('placeImage', placeData.placeImage as any);
            placeData.type && formData.append('type', placeData.type);
            placeData.email && formData.append('email', placeData.email);


            const response: AxiosResponse = await this.remoteDataSource.updatePlace({ placeData: formData, placeId });

            return Either.right(response.data);
        } catch (error) {

            const errorHandler = new ErrorHandler(error);
            const failure: Failure = errorHandler.failure;


            return Either.left(failure);
            // }

        }
    }

    async createPlace(placeData: CreatePlaceRepository.Request): Promise<CreatePlaceRepository.Response> {
        try {
            // console.log(placeData)
            // mapping happens here
            const formData = new FormData();

            placeData.description && formData.append('description', placeData.description);
            placeData.location && formData.append('location', placeData.location);
            placeData.name && formData.append('name', placeData.name);
            placeData.placeImage && formData.append('placeImage', placeData.placeImage as any);
            placeData.type && formData.append('type', placeData.type);



            const response: AxiosResponse = await this.remoteDataSource.createPlace(formData);

            return Either.right(response.data);
        } catch (error) {

            const errorHandler = new ErrorHandler(error);
            const failure: Failure = errorHandler.failure;


            return Either.left(failure);
            // }

        }
    }




    async getFavouritePlaces(): Promise<GetFavouritePlacesRepository.Response> {
        try {
            // mapping happens here
            const response: AxiosResponse = await this.remoteDataSource.getFavouritePlaces();

            return Either.right(response.data);

        } catch (error) {
            const errorHandler = new ErrorHandler(error);
            const failure: Failure = errorHandler.failure;


            return Either.left(failure);
        }
    }



    async getPlaces(params: GetLatesPlacesRepository.Request): Promise<GetLatesPlacesRepository.Response> {
        try {
            // console.log(params)
            // mapping happens here
            const response: AxiosResponse = await this.remoteDataSource.getLatestPlaces(params);

            return Either.right(response.data);

        } catch (error) {
            const errorHandler = new ErrorHandler(error);
            const failure: Failure = errorHandler.failure;


            return Either.left(failure);
        }
    }


    async getPlaceById(placeId: string): Promise<GetPlaceByIdRepository.Response> {
        try {
            // mapping happens here

            const response: AxiosResponse = await this.remoteDataSource.getPlaceById(placeId);

            return Either.right(response.data);

        } catch (error) {
            const errorHandler = new ErrorHandler(error);
            const failure: Failure = errorHandler.failure;


            return Either.left(failure);
        }
    }

    async validatePlace(placeId: string): Promise<ValidationPlaceContributionByIdRepository.Response> {
        try {
            // mapping happens here

            const response: AxiosResponse = await this.remoteDataSource.acceptPlace(placeId);

            return Either.right(response.data);

        } catch (error) {
            const errorHandler = new ErrorHandler(error);
            const failure: Failure = errorHandler.failure;


            return Either.left(failure);
        }
    }
    async deleteplace(placeId: string): Promise<DeletePlaceRepository.Response> {
        try {
            // mapping happens here

            const response: AxiosResponse = await this.remoteDataSource.deletePlace(placeId);

            return Either.right(response.data);

        } catch (error) {
            const errorHandler = new ErrorHandler(error);
            const failure: Failure = errorHandler.failure;


            return Either.left(failure);
        }
    }

















    // async createPlace(placeData: CreatePlaceRepository.Request): Promise<CreatePlaceRepository.Response> {

    //     try {
    //         // mapping happens here
    //         const formData = new FormData();
    //         placeData.postImage && formData.append('postImage', placeData.postImage);
    //         formData.append('content', placeData.content);
    //         // formData.append('rate', rate.value);
    //         formData.append('post_type', placeData.post_type);


    //         const response: AxiosResponse = await this.remoteDataSource.createPlace(formData);

    //         return Either.right(response.data);
    //     } catch (error) {

    //         const errorHandler = new ErrorHandler(error);
    //         const failure: Failure = errorHandler.failure;


    //         return Either.left(failure);
    //         // }

    //     }
    // }
}
