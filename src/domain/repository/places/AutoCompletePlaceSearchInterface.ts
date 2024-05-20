import type { Failure } from "@/data/network/error_handler";
import type { Either } from "@/domain/either/Either";
import type { Place } from "@/domain/entities/Place";

export interface AutoCompletePlaceSearchRepository {
    autoCompletePlaceSearch(params: AutoCompletePlaceSearchRepository.Request): Promise<AutoCompletePlaceSearchRepository.Response>;
}

export namespace AutoCompletePlaceSearchRepository {
    export type Request = { query: string };
    export type Response = Either<Failure, Place[]>
}