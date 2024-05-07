import type { Failure } from "@/data/network/error_handler";
import type { Either } from "@/domain/either/Either";

export interface RefuseImageContributionByIdRepostiory {
    refuseImageContribution(imageContributionId: RefuseImageContributionByIdRepostiory.Request): Promise<RefuseImageContributionByIdRepostiory.Response>;
}

export namespace RefuseImageContributionByIdRepostiory {
    export type Request = string;
    export type Response = Either<Failure, void>;
}
