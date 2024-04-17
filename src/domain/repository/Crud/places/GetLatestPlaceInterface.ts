import type { reqQuery } from '@/data/network/app_api'
import type { Failure } from '@/data/network/error_handler'
import type { LatestPlaceResponse } from '@/data/response/place'
import type { Either } from '@/domain/either/Either'

export interface GetLatestPlacesInterface {
  getLatestPlaces(
    params: GetLatestPlacesInterface.Request
  ): Promise<GetLatestPlacesInterface.Response>
}

export namespace GetLatestPlacesInterface {
  export type Request = reqQuery
  export type Response = Either<Failure, LatestPlaceResponse>
}
