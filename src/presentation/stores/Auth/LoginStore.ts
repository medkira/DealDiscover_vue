import { NetworkConstants } from '@/app/constants';
import AxiosFactory from '@/data/network/axios_factory';
import { Either } from '@/domain/either/Either';
import { ErrorHandler, type Failure } from '@/data/network/error_handler';
import type { AxiosError, AxiosResponse } from 'axios';
import { defineStore, acceptHMRUpdate } from 'pinia'
import { authRepository } from '@/app/factory/di';
import AppCookie from '@/app/storage/app_cookie';
import router from '@/presentation/router';
// import { useUserStore } from './user'

export const LoginStore = defineStore('LoginStore', {

    state: () => ({
        loginFailure: "",
        loginLoading: false,
        logingSuccess: { token: "" }
    }),
    getters: {
        isLoggedIn: (state) => state.logingSuccess.token !== "",
        // isLoading: (state) => state.loginLoading,
        // isLoading: (state) => {
        //     return state.loginLoading = state.loginFailure || !!state.logingSuccess.token;
        // },

        getFailureMessage: (state) => state.loginFailure,

        loginStatusMessage(state): string | null {
            if (state.loginLoading) {
                return 'Logging in...';
            } else if (state.logingSuccess.token) {
                return 'Login successful!';
            } else if (state.loginFailure) {
                return `Login failed: ${state.loginFailure}`;
            } else {
                return null;
            }
        },
    },
    actions: {
        async login(data: { email: string, password: string }) {
            this.loginLoading = true;
            const failureOrSucess = await authRepository.login(data);
            failureOrSucess.fold(
                error => {
                    // ? left -> failure
                    // # failure state
                    // console.log(error.statusMessage);
                    this.loginFailure = error.statusMessage;
                    this.loginLoading = false;
                },
                (response) => {
                    // ? right -> data (success)
                    // # success state
                    this.logingSuccess.token = response.authenticationToken;

                    const cookieAdapter = new AppCookie();
                    cookieAdapter.setTokenCookie(this.logingSuccess.token);
                    // console.log("success: ", this.logingSuccess.token);
                    this.loginLoading = false;
                    router.push({ name: 'place', replace: true, params: { id: "placesId" } });
                }
            )

        }
    }
});






// response type need to be decalred in domain 
// let response: AxiosResponse;

// api declaration part layer: data/ network

// const axiosFactory = new AxiosFactory();
// const axiosInstance = axiosFactory.axiosInstance

// const loginRepoInstance = new LoginRepository(axiosInstance);

// Repository class for handling API calls(by calling the remote data source)
// export class LoginRepository {
//     constructor(private readonly axiosInstance: any) { } // Inject axiosInstance

//     async login(data: LoginRepository.Request): Promise<LoginRepository.Response> {
//         // console.log(data)
//         try {
//             const response: AxiosResponse = await this.axiosInstance.post(`${NetworkConstants.BASE_API}/login`, data);
//             // console.log("response status: ", response.status);
//             // if (response.status === 200) {

//             // console.log("either right: ", Either.right(response.data))
//             return Either.right(response.data);
//             // }
//         } catch (error: any) {

//             const errorHandler = new ErrorHandler(error);
//             const failure: Failure = errorHandler.failure;

//             // if (error.response.status == 401) {

//             // console.log("either left: ", Either.left(error.response.data))
//             console.log("test error: ", error.code)
//             // console.log("test error_handler failure: ", failure)

//             return Either.left(failure);
//             // }

//         }

//     }
// }

// export namespace LoginRepository {
//     export type Request = { email: string, password: string };
//     export type Response = Either<Failure, { authenticationToken: string }>
// }




// usin the instence in remote data spurce 
// remote data source => repositry => usecase

// remote data source is the part that will
// call the the axios instance and decalre all the posibel
// REST end poit http req.

// try {

//     response = await axiosInstance.post(
//         `${NetworkConstants.BASE_API}/login`, data);

//     if (response.status == 200) {

//         // ? success
//         // ? return either right
//         // ? return data
//         console.log("either right: ", Either.right(response.data))
//     } else {

//         // ? failure -- business error
//         // ? return either left
//         console.log("raw response ", response.data)
//         console.log("either left: ", Either.left(response.data))

//     }

// } catch (error) {

// }


// if ('authenticationToken' in response.data) {
//     this.token = response.data.authenticationToken;
// }
// console.log('TOKEN AS STATE ', this.token);