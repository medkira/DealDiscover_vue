import type { Failure } from "@/data/network/error_handler";
import type { Either } from "@/domain/either/Either";
import type { ImageContribution } from "@/domain/entities/ImageContribution";

export interface GetLatestImageContributionRepository {
    getLatetstImageContributions(params: GetLatestImageContributionRepository.Request): Promise<GetLatestImageContributionRepository.Response>;
}

export namespace GetLatestImageContributionRepository {
    export type Request = { page?: number, paginationLimit?: number };
    export type Response = Either<Failure, { data: ImageContribution[], page: number, total: number, totalPages: number }>;
}