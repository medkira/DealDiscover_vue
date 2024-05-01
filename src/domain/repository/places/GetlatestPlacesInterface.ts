
import type { Either } from "@/domain/either/Either";
import type { Failure } from "@/data/network/error_handler";
import type { Post } from "@/domain/entities/Post";
import type { Place, placeTypes } from "@/domain/entities/Place";

export interface GetLatesPlacesRepository {
    getPlaces(params: GetLatesPlacesRepository.Request): Promise<GetLatesPlacesRepository.Response>;
}

export namespace GetLatesPlacesRepository {
    export type Request = { page?: number, type?: placeTypes, location?: string };
    export type Response = Either<Failure, { data: Place[], page: number, total: number, totalPages: number }>;
}