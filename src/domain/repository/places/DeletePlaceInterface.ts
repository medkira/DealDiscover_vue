import type { Failure } from "@/data/network/error_handler";
import type { Either } from "@/domain/either/Either";

export interface DeletePlaceRepository {
    deleteplace(
        placeId: DeletePlaceRepository.Request
    ): Promise<DeletePlaceRepository.Response>;
}

export namespace DeletePlaceRepository {
    export type Request = string;
    export type Response = Either<Failure, void>;
}
