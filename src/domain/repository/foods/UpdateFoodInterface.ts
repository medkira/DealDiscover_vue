import type { Failure } from "@/data/network/error_handler";
import type { Either } from "@/domain/either/Either";
import type { Food, FoodProps } from "@/domain/entities/Food";

export interface UpdateFoodRepository {
    updateFood(
        updateFoodRequest: UpdateFoodRepository.Request
    ): Promise<UpdateFoodRepository.Response>;
}

export namespace UpdateFoodRepository {
    export type foodDataType = Omit<FoodProps, "id" | "user_id">;
    export type Request = {
        foodId: string;
        foodData: any;
    };

    export type Response = Either<Failure, Food>;

}
