import type { RemoteDataSource } from "../data_source/remote_data_source";
import type { AxiosResponse } from "axios";
import { Either } from "@/domain/either/Either";
import { ErrorHandler, type Failure } from "../network/error_handler";
import type { GetLatestRatesRepository } from "@/domain/repository/rates/GetLatestRatesInterface";
import type { CreateRateRepository } from "@/domain/repository/rates/CreateRateInterface";



export class RateRepository implements CreateRateRepository, GetLatestRatesRepository {
    constructor(
        public readonly remoteDataSource: RemoteDataSource
    ) { }
    async getLatestRates(params: GetLatestRatesRepository.Request): Promise<GetLatestRatesRepository.Response> {
        try {
            // mapping happens here

            const response: AxiosResponse = await this.remoteDataSource.getLatestRates(params);

            return Either.right(response.data);

        } catch (error) {
            const errorHandler = new ErrorHandler(error);
            const failure: Failure = errorHandler.failure;


            return Either.left(failure);
        }
    }



    async createRate(postData: CreateRateRepository.Request): Promise<CreateRateRepository.Response> {

        try {



            const response: AxiosResponse = await this.remoteDataSource.createRate(postData);

            return Either.right(response.data);
        } catch (error) {

            const errorHandler = new ErrorHandler(error);
            const failure: Failure = errorHandler.failure;


            return Either.left(failure);
            // }

        }
    }
}
