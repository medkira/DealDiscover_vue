import { defineStore } from 'pinia'
import { authRepository, cookieAdapter } from '@/app/factory/di';
import router from '@/presentation/router';
import { AuthenticationStore } from './AuthenticationStore';
import { UserRole } from '@/domain/entities/User';

export const LoginStore = defineStore('LoginStore', {
    state: () => ({
        loginFailure: "",
        loginLoading: false,
        logingSuccess: { token: "" },
    }),
    getters: {
        isLoggedIn: (state) => state.logingSuccess.token !== "",


        getFailureMessage: (state) => state.loginFailure,
        getSuccessMessage: (state) => state.logingSuccess ? "Login successful!" : "",
        loginStatusMessage(state): string | null {
            if (state.logingSuccess.token) {
                return 'Login successful!';
            } else if (state.loginLoading) {
                return 'Logging in...';
            } else if (state.loginFailure) {
                return `Login failed: ${state.loginFailure}`;
            } else {
                return null;
            }
        },
    },
    actions: {
        reset() { // Call this when you're done using the store
            this.$reset();
        },

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
                    // ! this just in developement
                    // ? right -> data (success)
                    // # success state
                    this.logingSuccess.token = response.authenticationToken;



                    const authenticationStore = AuthenticationStore();
                    authenticationStore.setToken(response.authenticationToken);

                    authenticationStore.isAdmin();
                    authenticationStore.isOwner();

                    this.loginLoading = false;
                    const role = cookieAdapter.getRoleFromToken();
                    console.log('From Store', role)
                    if (role === UserRole.NORMAL) {
                        router.push({ name: 'home', replace: true, params: { id: "placesId" } });
                    } else if (role === UserRole.OWNER) {
                        router.push({ path: 'owner/placesManagement', replace: true })
                    } else if (role === UserRole.ADMIN) {
                        router.push({ name: 'admin', replace: true })
                    }
                    // this.reset();

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