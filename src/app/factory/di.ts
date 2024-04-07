import { RemoteDataSourceImpl } from "@/data/data_source/remote_data_source";
import { AppServiceClient } from "@/data/network/app_api";
import AxiosFactory from "@/data/network/axios_factory";
import { AuthRepository } from "@/data/repositories/AuthRepository";



const axiosFactory = new AxiosFactory();
const axiosInstance = axiosFactory.getAxiosInstance();

export const appServiceClientInstance = new AppServiceClient(axiosInstance);
const remoteDataSourceInstance = new RemoteDataSourceImpl(appServiceClientInstance);


export const authRepository = new AuthRepository(remoteDataSourceInstance);

