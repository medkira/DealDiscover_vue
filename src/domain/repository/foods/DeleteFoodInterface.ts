import type { Failure } from "@/data/network/error_handler";
import type { Either } from "@/domain/either/Either";

export interface DeleteFoodRepository {
    deletefood(
        foodId: DeleteFoodRepository.Request
    ): Promise<DeleteFoodRepository.Response>;
}

export namespace DeleteFoodRepository {
    export type Request = string;
    export type Response = Either<Failure, void>;
}
