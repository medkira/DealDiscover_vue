import type { RemoteDataSource } from "../data_source/remote_data_source";
import type { AxiosResponse } from "axios";
import { Either } from "@/domain/either/Either";
import { ErrorHandler, type Failure } from "../network/error_handler";
import type { GetLatesPlacesRepository } from "@/domain/repository/places/GetlatestPlacesInterface";
import type { GetPlaceByIdRepository } from "@/domain/repository/places/GetPlaceByIdInterface";



export class PlaceRepository implements GetLatesPlacesRepository, GetPlaceByIdRepository {
    constructor(
        public readonly remoteDataSource: RemoteDataSource
    ) { }


    async getPlaces(params: GetLatesPlacesRepository.Request): Promise<GetLatesPlacesRepository.Response> {
        try {
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

    // async createPlace(postData: CreatePlaceRepository.Request): Promise<CreatePlaceRepository.Response> {

    //     try {
    //         // mapping happens here
    //         const formData = new FormData();
    //         postData.postImage && formData.append('postImage', postData.postImage);
    //         formData.append('content', postData.content);
    //         // formData.append('rate', rate.value);
    //         formData.append('post_type', postData.post_type);


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
