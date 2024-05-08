import type { Failure } from "@/data/network/error_handler";
import type { Either } from "@/domain/either/Either";
import type { Place, PlaceProps } from "@/domain/entities/Place";

export interface UpdatePlaceRepository {
    updatePlace(
        updatePlaceRequest: UpdatePlaceRepository.Request
    ): Promise<UpdatePlaceRepository.Response>;
}

export namespace UpdatePlaceRepository {
    export type placeDataType = Omit<PlaceProps, "id" | "user_id">;
    export type Request = {
        placeId: string;
        placeData: any;
    };

    export type Response = Either<Failure, Place>;

}
