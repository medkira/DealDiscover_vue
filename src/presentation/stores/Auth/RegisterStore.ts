import { defineStore } from 'pinia'
import { authRepository } from '@/app/factory/di';
import router from '@/presentation/router';
import { AuthenticationStore } from './AuthenticationStore';
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
                    // ! this just in developement
                    // ? right -> data (success)
                    // # success state
                    this.registerSuccess.token = response.authenticationToken;

                    const authenticationStore = AuthenticationStore();
                    authenticationStore.setToken(response.authenticationToken),

                        this.registerLoading = false;
                    router.push({ name: 'home', replace: true, params: { id: "placesId" } });
                }
            )

        }
    }
});



