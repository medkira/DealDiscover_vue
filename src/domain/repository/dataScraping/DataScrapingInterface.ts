import type { Failure } from "@/data/network/error_handler";
import type { Either } from "@/domain/either/Either";
import type { Place } from "@/domain/entities/Place"


export interface DataScrapingByUrlRepository {
    dataScrape(parmas: DataScrapingByUrlRepository.Request): Promise<DataScrapingByUrlRepository.Response>
}

export namespace DataScrapingByUrlRepository {
    export type Request = { url?: string, placeType?: string }
    export type Response = Either<Failure, Place[]>;
}