import type { GetLatestPlacesInterface } from '@/domain/repository/Crud/places/GetLatestPlaceInterface'
import type { RemoteDataSource } from '../data_source/remote_data_source'
import type { AxiosResponse } from 'axios'
import { Either } from '@/domain/either/Either'
import { ErrorHandler, type Failure } from '../network/error_handler'

export class PlaceRepository implements GetLatestPlacesInterface {
  constructor(public readonly remoteDataSource: RemoteDataSource) {}

  async getLatestPlaces(
    params: GetLatestPlacesInterface.Request
  ): Promise<GetLatestPlacesInterface.Response> {
    try {
      const response: AxiosResponse = await this.remoteDataSource.getLatestPlace(params)
      // console.log(response.data.data[0].name)
      return Either.right(response.data)
    } catch (error) {
      const errorHandler = new ErrorHandler(error)
      const failure: Failure = errorHandler.failure

      return Either.left(failure)
    }
  }
}
