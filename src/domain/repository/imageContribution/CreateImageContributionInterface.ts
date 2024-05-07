import type { Failure } from "@/data/network/error_handler";
import type { Either } from "@/domain/either/Either";
import type { ImageContributionProps } from "@/domain/entities/ImageContribution";


export interface CreateImageContributionRepository {
    createImageContribution(
        imageContributionData: CreateImageContributionRepository.Request
    ): Promise<CreateImageContributionRepository.Response>;
}

export namespace CreateImageContributionRepository {
    // export type Request = Omit<ImageContributionProps, "id" | "createdAt" | "is_verified">;
    export type Request = { place_id: string, postImage: File[] };
    export type Response = Either<Failure, { imageContributionId: string }>;
}
