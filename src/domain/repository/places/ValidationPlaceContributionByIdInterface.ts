export interface ValidationPlaceContributionByIdInterface {
    validatePlace(placeId: ValidationPlaceContributionByIdInterface.Request): Promise<ValidationPlaceContributionByIdInterface.Response>;
}

export namespace ValidationPlaceContributionByIdInterface {
    export type Request = string;
    export type Response = Either<Failure, void>;
}
