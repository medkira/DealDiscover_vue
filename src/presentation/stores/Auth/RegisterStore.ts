import { defineStore } from 'pinia'
import { authRepository } from '@/app/factory/di';
import AppCookie from '@/app/storage/app_cookie';
import router from '@/presentation/router';
// import { useUserStore } from './user'

export const RegisterStore = defineStore('RegisterStore', {

    state: () => ({
        registerFailure: "",
        registerLoading: false,
        registerSuccess: { token: "" }
    }),
    getters: {

        isLoggedIn: (state) => state.registerSuccess.token !== "",
        // isLoading: (state) => state.loginLoading,
        // isLoading: (state) => {
        //     return state.loginLoading = state.loginFailure || !!state.logingSuccess.token;
        // },

        getFailureMessage: (state) => state.registerFailure,

        loginStatusMessage(state): string | null {
            if (state.registerLoading) {
                return 'Registering in...';
            } else if (state.registerSuccess.token) {
                return 'Register successful!';
            } else if (state.registerFailure) {
                return `Register failed: ${state.registerFailure}`;
            } else {
                return null;
            }
        },
    },
    actions: {
        reset() { // Call this when you're done using the store
            this.$reset();
        },

        async register(data: { username: string, email: string, password: string, role: string }) {
            this.registerLoading = true;
            const failureOrSucess = await authRepository.SignUpUser(data);
            failureOrSucess.fold(
                error => {
                    // ? left -> failure
                    // # failure state
                    // console.log(error.statusMessage);
                    this.registerFailure = error.statusMessage;
                    this.registerLoading = false;
                },
                (response) => {
                    // ? right -> data (success)
                    // # success state
                    this.registerSuccess.token = response.authenticationToken;

                    const cookieAdapter = new AppCookie();
                    cookieAdapter.setTokenCookie(this.registerSuccess.token);
                    // console.log("success: ", this.logingSuccess.token);
                    this.registerLoading = false;
                    router.push({ name: 'place', replace: true, params: { id: "placesId" } });
                    this.reset()

                }
            )

        }
    }
});



