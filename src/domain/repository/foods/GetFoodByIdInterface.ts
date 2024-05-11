import type { Failure } from "@/data/network/error_handler";
import type { Either } from "@/domain/either/Either";
import type { Food } from "@/domain/entities/Food";

export interface GetFoodByIdRepository {
    getFoodById(placeId: GetFoodByIdRepository.Request): Promise<GetFoodByIdRepository.Response>;
}

export namespace GetFoodByIdRepository {
    export type Request = string;
    export type Response = Either<Failure, Food>
}
