import { RemoteDataSourceImpl } from "@/data/data_source/remote_data_source";
import { AppServiceClient } from "@/data/network/app_api";
import AxiosFactory from "@/data/network/axios_factory";
import { AuthRepository } from "@/data/repositories/AuthRepository";
import { PlaceRepository } from "@/data/repositories/PlaceRepository";
import { PostRepository } from "@/data/repositories/PostRepository";

const axiosFactory = new AxiosFactory();
const axiosInstance = axiosFactory.getAxiosInstance();

export const appServiceClientInstance = new AppServiceClient(axiosInstance);
const remoteDataSourceInstance = new RemoteDataSourceImpl(appServiceClientInstance);


export const authRepository = new AuthRepository(remoteDataSourceInstance);
export const placeRepository = new PlaceRepository(remoteDataSourceInstance)
export const postRepository = new PostRepository(remoteDataSourceInstance)
