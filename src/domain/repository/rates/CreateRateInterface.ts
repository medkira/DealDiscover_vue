import type { Failure } from "@/data/network/error_handler";
import type { Either } from "@/domain/either/Either";
import type { RateProps } from "@/domain/entities/Rates";


export interface CreateRateRepository {
    createRate(rateData: CreateRateRepository.Request): Promise<CreateRateRepository.Response>;
}

export namespace CreateRateRepository {
    export type Request = Omit<RateProps, "id" | "createdAt" | "updateAt" | "totalComments" | "topCount" | "user_id" | "user_name">;
    export type Response = Either<Failure, { rateId: string }>;
}