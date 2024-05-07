import type { Failure } from "@/data/network/error_handler";
import type { Either } from "@/domain/either/Either";

export interface DeletePlaceInterface {
    deleteplace(
        placeId: DeletePlaceInterface.Request
    ): Promise<DeletePlaceInterface.Response>;
}

export namespace DeletePlaceInterface {
    export type Request = string;
    export type Response = Either<Failure, void>;
}
