import type { GetTopPostsInterface } from '@/domain/repository/Crud/places/GetTopPostsInterface'
import type { RemoteDataSource } from '../data_source/remote_data_source'
import type { AxiosResponse } from 'axios'
import { Either } from '@/domain/either/Either'
import { ErrorHandler, type Failure } from '../network/error_handler'

export class PostRepository implements GetTopPostsInterface {
  constructor(public readonly remoteDataSource: RemoteDataSource) {}

  async getTopPosts(params: GetTopPostsInterface.Request): Promise<GetTopPostsInterface.Response> {
    try {
      const response: AxiosResponse = await this.remoteDataSource.getTopPosts(params)
      // console.log(response.data.data[0].name)
      console.log("from repository",response)

      return Either.right(response.data)
    } catch (error) {
      const errorHandler = new ErrorHandler(error)
      const failure: Failure = errorHandler.failure

      return Either.left(failure)
    }
  }
}
