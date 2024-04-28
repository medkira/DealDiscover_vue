import axios from 'axios';
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosRequestHeaders } from 'axios';
import { NetworkConstants } from '@/app/constants'
import AppCookie from '@/app/storage/app_cookie';

export interface InternalAxiosRequestConfig<D = any> extends AxiosRequestConfig<D> {
    headers: AxiosRequestHeaders;
}

export default class AxiosFactory {
    private readonly axiosInstance: AxiosInstance;


    getAxiosInstance(): AxiosInstance {
        return this.axiosInstance;
    }

    constructor() {

        this.axiosInstance = axios.create({

            baseURL: NetworkConstants.BASE_URL,
            timeout: 50000,
        });
        axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
        // we can add any interceptors either for req or res after 
        // the axiosInstace creation 
        // how: with and class called AxiosInterceptor(axiosInstance) 
        this.axiosInstance.interceptors.request.use(
            (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
                // Add any request headers or other configurations here
                const cookieAdapter = new AppCookie();
                const token = cookieAdapter.getTokenCookie();
                if (token) {
                    config.headers['Authorization'] = `${token}`;
                    // config.headers['Authorization'] = `Bearer ${token}`;

                }
                return config;
            }
            // (error) => {
            //     // Handle any request errors here
            //     return Promise.reject(error);
            // }
        );

    }

}



// this.axiosInstance.interceptors.response.use(
//     (response: AxiosResponse) => {
//         return response;
//     },
// (error) => {
//     if (error.response) {
// const errorHandler = new ErrorHandler(error);
// const failure: any = errorHandler.failure;
// console.log(error.code);

//         // console.log("error from axios Interceptor: ", failure)

//         // The request was made and the server responded with a status code
//         // that falls out of the range of 2xx
//     } else if (error.request) {
//         // const errorHandler = new ErrorHandler(error);
//         // const failure: any = errorHandler.failure;
//         // console.log("HI", failure)
//         // The request was made but no response was received
//     } else {
//         // Something happened in setting up the request that triggered an Error
//     }
//     return Promise.reject(error);

// }
// );