
import type { Either } from "@/domain/either/Either";
import type { Failure } from "@/data/network/error_handler";
import type { Food, foodTypes } from "@/domain/entities/Food";

export interface GetLatesFoodsRepository {
    getFoods(params: GetLatesFoodsRepository.Request): Promise<GetLatesFoodsRepository.Response>;
}

export namespace GetLatesFoodsRepository {
    export type Request = { page?: number, type?: foodTypes, price?: number, place_id?: string };
    export type Response = Either<Failure, { data: Food[], page: number, total: number, totalPages: number }>;
}