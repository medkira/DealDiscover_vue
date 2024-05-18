import { RemoteDataSourceImpl } from "@/data/data_source/remote_data_source";
import { AppServiceClient } from "@/data/network/app_api";
import AxiosFactory from "@/data/network/axios_factory";
import { AuthRepository } from "@/data/repositories/AuthRepository";
import AppCookie from "../storage/app_cookie";
import { PostRepository } from "@/data/repositories/PostRepository";
import { PlaceRepository } from "@/data/repositories/PlaceRepository";
import { RateRepository } from "@/data/repositories/RateRepository";
import { ImageContributionReposiory } from "@/data/repositories/ImageContributionReposiory";
import { UserRepository } from "@/data/repositories/UserRepository";
import { FoodRepository } from "@/data/repositories/FoodRepository";
import { MenuRepository } from "@/data/repositories/MenuRepository";
import { CommentRepository } from "@/data/repositories/CommentRepository";



const axiosFactory = new AxiosFactory();
const axiosInstance = axiosFactory.getAxiosInstance();

export const appServiceClientInstance = new AppServiceClient(axiosInstance);
const remoteDataSourceInstance = new RemoteDataSourceImpl(appServiceClientInstance);


export const authRepository = new AuthRepository(remoteDataSourceInstance);
export const postRepository = new PostRepository(remoteDataSourceInstance);
export const placeRepository = new PlaceRepository(remoteDataSourceInstance);
export const rateRepository = new RateRepository(remoteDataSourceInstance);
export const imageContributionRepository = new ImageContributionReposiory(remoteDataSourceInstance);
export const userRepository = new UserRepository(remoteDataSourceInstance);
export const foodRepository = new FoodRepository(remoteDataSourceInstance);
export const menuRepository = new MenuRepository(remoteDataSourceInstance);
export const commentRepository = new CommentRepository(remoteDataSourceInstance);

// cookie factory
export const cookieAdapter = new AppCookie();




// can decalre stores factory here 
// or better if there factory class that return 
// the store i need 
//=> reate the instance of the store only when i call it