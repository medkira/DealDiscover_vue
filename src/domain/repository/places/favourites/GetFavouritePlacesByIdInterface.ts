import type { Failure } from "@/data/network/error_handler";
import type { Either } from "@/domain/either/Either";
import type { NormalUser } from "@/domain/entities/NormalUser";
import type { Place } from "@/domain/entities/Place";

export interface GetFavouritePlacesRepository {
    getFavouritePlaces(): Promise<GetFavouritePlacesRepository.Response>
}

export namespace GetFavouritePlacesRepository {
    export type Response = Either<Failure, NormalUser>
}