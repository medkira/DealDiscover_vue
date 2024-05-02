import type { Failure } from "@/data/network/error_handler";
import type { Either } from "@/domain/either/Either";
import type { Place } from "@/domain/entities/Place";

export interface GetPlaceByIdRepository {
    getPlaceById(placeId: GetPlaceByIdRepository.Request): Promise<GetPlaceByIdRepository.Response>;
}

export namespace GetPlaceByIdRepository {
    export type Request = string;
    export type Response = Either<Failure, Place>
}
