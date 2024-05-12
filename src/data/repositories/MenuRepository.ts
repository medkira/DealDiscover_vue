import type { CreateMenuRepository } from "@/domain/repository/menu/CreateMenuInterface";
import type { RemoteDataSourceImpl } from "../data_source/remote_data_source";
import type { AxiosResponse } from "axios";
import { Either } from "@/domain/either/Either";
import { ErrorHandler, type Failure } from "../network/error_handler";

export class MenuRepository implements
    CreateMenuRepository {

    constructor(
        public readonly remoteDataSource: RemoteDataSourceImpl

    ) { }


    async createMenu(menuData: CreateMenuRepository.Request): Promise<CreateMenuRepository.Response> {

        try {
            const formData = new FormData();

            menuData.menuImage && formData.append('menuImage', menuData.menuImage);
            menuData.place_id && formData.append('place_id', menuData.place_id);

            const response: AxiosResponse = await this.remoteDataSource.createMenu(formData);
            return Either.right(response.data);

        } catch (error) {
            const errorHandler = new ErrorHandler(error);
            const failure: Failure = errorHandler.failure;

            return Either.left(failure);
        }


    }

}