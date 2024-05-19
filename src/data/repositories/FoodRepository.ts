import type { RemoteDataSourceImpl } from "../data_source/remote_data_source";
import type { AxiosResponse } from "axios";
import { Either } from "@/domain/either/Either";
import { ErrorHandler, type Failure } from "../network/error_handler";
import type { GetLatesFoodsRepository } from "@/domain/repository/foods/GetlatestFoodsInterface";
import type { UpdateFoodRepository } from "@/domain/repository/foods/UpdateFoodInterface";
import type { DeleteFoodRepository } from "@/domain/repository/foods/DeleteFoodInterface";
import type { CreateFoodRepository } from "@/domain/repository/foods/CreateFoodInterface";
import type { GetFoodByIdRepository } from "@/domain/repository/foods/GetFoodByIdInterface";

export class FoodRepository implements
    GetLatesFoodsRepository,
    UpdateFoodRepository,
    CreateFoodRepository,
    DeleteFoodRepository,
    GetFoodByIdRepository {

    constructor(
        public readonly remoteDataSource: RemoteDataSourceImpl

    ) { }


    async getFoodById(placeId: string): Promise<GetFoodByIdRepository.Response> {
        try {
            // mapping happens here

            const response: AxiosResponse = await this.remoteDataSource.getFoodById(placeId);

            return Either.right(response.data);

        } catch (error) {
            const errorHandler = new ErrorHandler(error);
            const failure: Failure = errorHandler.failure;


            return Either.left(failure);
        }
    }
    async deletefood(foodId: string): Promise<DeleteFoodRepository.Response> {
        try {
            // mapping happens here

            const response: AxiosResponse = await this.remoteDataSource.deleteFood(foodId);

            return Either.right(response.data);

        } catch (error) {
            const errorHandler = new ErrorHandler(error);
            const failure: Failure = errorHandler.failure;


            return Either.left(failure);
        }
    }
    async createFood(foodData: any): Promise<CreateFoodRepository.Response> {
        try {
            // console.log(foodData)
            // mapping happens here
            const formData = new FormData();

            foodData.foodImage && formData.append('foodImage', foodData.description);
            foodData.food_type && formData.append('food_type', foodData.location);
            foodData.name && formData.append('name', foodData.name);
            foodData.price && formData.append('price', foodData.price);
            foodData.place_id && formData.append('place_id', foodData.place_id);



            const response: AxiosResponse = await this.remoteDataSource.createFood(formData);

            return Either.right(response.data);
        } catch (error) {

            const errorHandler = new ErrorHandler(error);
            const failure: Failure = errorHandler.failure;


            return Either.left(failure);
            // }

        }
    }
    async updateFood(updateFoodRequest: UpdateFoodRepository.Request): Promise<UpdateFoodRepository.Response> {
        try {

            const { foodData, foodId } = updateFoodRequest;
            // mapping happens here
            const formData = new FormData();

            foodData.foodImage && formData.append('foodImage', foodData.description);
            foodData.food_type && formData.append('food_type', foodData.location);
            foodData.name && formData.append('name', foodData.name);
            foodData.price && formData.append('price', foodData.placeImage as any);
            foodData.place_id && formData.append('place_id', foodData.type);



            const response: AxiosResponse = await this.remoteDataSource.updateFood({ foodData: foodData, foodId });

            return Either.right(response.data);
        } catch (error) {

            const errorHandler = new ErrorHandler(error);
            const failure: Failure = errorHandler.failure;


            return Either.left(failure);
            // }

        }
    }




    async getFoods(params: GetLatesFoodsRepository.Request): Promise<GetLatesFoodsRepository.Response> {
        try {
            // mapping happens here
            const response: AxiosResponse = await this.remoteDataSource.getLatestFoods(params);

            return Either.right(response.data);

        } catch (error) {
            const errorHandler = new ErrorHandler(error);
            const failure: Failure = errorHandler.failure;


            return Either.left(failure);
        }
    }


}