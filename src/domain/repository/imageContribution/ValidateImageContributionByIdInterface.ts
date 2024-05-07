import type { Failure } from "@/data/network/error_handler";
import type { Either } from "@/domain/either/Either";

export interface ValidateImageContributionByIdIRepository {
    acceptImageContribution(imageContributionId: ValidateImageContributionByIdIRepository.Request): Promise<ValidateImageContributionByIdIRepository.Response>;
}

export namespace ValidateImageContributionByIdIRepository {
    export type Request = string;
    export type Response = Either<Failure, void>;
}
