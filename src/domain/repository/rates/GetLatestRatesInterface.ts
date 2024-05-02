import type { Failure } from "@/data/network/error_handler";
import type { Either } from "@/domain/either/Either";
import type { Rate } from "@/domain/entities/Rates";

export interface GetLatestRatesRepository {
    getLatestRates(params: GetLatestRatesRepository.Request): Promise<GetLatestRatesRepository.Response>;
}

export namespace GetLatestRatesRepository {
    export type Request = { page?: number, rated_id?: string };
    export type Response = Either<Failure, { data: Rate[], page: number, total: number, totalPages: number }>;

}