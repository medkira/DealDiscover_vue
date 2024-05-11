import type { Failure } from "@/data/network/error_handler";
import type { Either } from "@/domain/either/Either";
import type { FoodProps } from "@/domain/entities/Food";


export interface CreateFoodRepository {
    createFood(
        foodData: CreateFoodRepository.Request
    ): Promise<CreateFoodRepository.Response>;
}

export namespace CreateFoodRepository {
    export type Request = any;
    // export type Request = Omit<FoodProps, "id">;;
    export type Response = Either<Failure, { foodId: string }>;
}
