import type { Failure } from "@/data/network/error_handler";
import type { Either } from "@/domain/either/Either";
import type { PlaceProps } from "@/domain/entities/Place";


export interface CreatePlaceRepository {
    createPlace(
        placeData: CreatePlaceRepository.Request
    ): Promise<CreatePlaceRepository.Response>;
}

export namespace CreatePlaceRepository {
    export type Request = any;
    // export type Request = Omit<PlaceProps, "id">; // { email: string, password: string };
    export type Response = Either<Failure, { postId: string }>;
}
