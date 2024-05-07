import type { CreateImageContributionRepository } from "@/domain/repository/imageContribution/CreateImageContributionInterface";
import type { RemoteDataSource } from "../data_source/remote_data_source";
import type { AxiosResponse } from "axios";
import { Either } from "@/domain/either/Either";
import { ErrorHandler, type Failure } from "../network/error_handler";
import type { GetLatestImageContributionRepository } from "@/domain/repository/imageContribution/GetLatestImageContributionInterface";
import type { RefuseImageContributionByIdRepostiory } from "@/domain/repository/imageContribution/RefuseImageContributionByIdInterface";
import type { ValidateImageContributionByIdIRepository } from "@/domain/repository/imageContribution/ValidateImageContributionByIdInterface";

export class ImageContributionReposiory implements CreateImageContributionRepository,
    GetLatestImageContributionRepository, ValidateImageContributionByIdIRepository, RefuseImageContributionByIdRepostiory {
    constructor(
        public readonly remoteDataSource: RemoteDataSource
    ) { }

    async refuseImageContribution(imageContributionId: string): Promise<RefuseImageContributionByIdRepostiory.Response> {
        try {
            // mapping happens here

            const response: AxiosResponse = await this.remoteDataSource.refuseImageContribution(imageContributionId);

            return Either.right(response.data);

        } catch (error) {
            const errorHandler = new ErrorHandler(error);
            const failure: Failure = errorHandler.failure;


            return Either.left(failure);
        }
    }

    async acceptImageContribution(imageContributionId: string): Promise<ValidateImageContributionByIdIRepository.Response> {
        try {
            // mapping happens here

            const response: AxiosResponse = await this.remoteDataSource.acceptImageContributions(imageContributionId);

            return Either.right(response.data);

        } catch (error) {
            const errorHandler = new ErrorHandler(error);
            const failure: Failure = errorHandler.failure;


            return Either.left(failure);
        }
    }
    async getLatetstImageContributions(params: GetLatestImageContributionRepository.Request): Promise<GetLatestImageContributionRepository.Response> {


        try {
            // mapping happens here
            const response: AxiosResponse = await this.remoteDataSource.getImageContributions(params);

            return Either.right(response.data);

        } catch (error) {
            const errorHandler = new ErrorHandler(error);
            const failure: Failure = errorHandler.failure;


            return Either.left(failure);
        }

    }

    async createImageContribution(imageContributionData: CreateImageContributionRepository.Request): Promise<CreateImageContributionRepository.Response> {
        try {
            // mapping happens here 
            const formData = new FormData();
            imageContributionData.postImage && formData.append('postImage', imageContributionData.postImage as any);
            imageContributionData.place_id && formData.append('place_id', imageContributionData.place_id);

            // bcs of the mapping need to change the request type in interface of the reposiotry
            const response: AxiosResponse = await this.remoteDataSource.createImageContribution(formData as any);

            return Either.right(response.data);
        } catch (error) {

            const errorHandler = new ErrorHandler(error);
            const failure: Failure = errorHandler.failure;


            return Either.left(failure);


        }
    }
}