import type { Failure } from "@/data/network/error_handler";
import type { Either } from "@/domain/either/Either";

export interface ValidationPlaceContributionByIdRepository {
    validatePlace(placeId: ValidationPlaceContributionByIdRepository.Request): Promise<ValidationPlaceContributionByIdRepository.Response>;
}

export namespace ValidationPlaceContributionByIdRepository {
    export type Request = string;
    export type Response = Either<Failure, void>;
}
