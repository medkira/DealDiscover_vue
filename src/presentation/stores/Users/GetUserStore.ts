import { defineStore } from 'pinia'
import { userRepository } from '@/app/factory/di';
import { toRaw } from 'vue';
import type { NormalUser } from '@/domain/entities/NormalUser';

export const GetUserStore = defineStore('GetUserStore', {
    state: () => ({
        GetUserFailure: "",
        GetUserLoading: false,
        GetUserSuccess: {} as NormalUser
    }),
    getters: {
        placeData: (state) => toRaw(state.GetUserSuccess),

        // isLoaded: (state) => toRaw(state.GetUserSuccess) !== null,

        getFailureMessage: (state) => state.GetUserFailure,
        getSuccessMessage: (state) => state.GetUserSuccess ? "created post successfuly!" : "",
        GetUserStatusMessage(state): string | null {
            if (state.GetUserSuccess) {
                return 'User loaded successful!';
            } else if (state.GetUserLoading) {
                return 'loading...';
            } else if (state.GetUserFailure) {
                return `User Loading failed: ${state.GetUserFailure}`;
            } else {
                return null;
            }
        },
    },
    actions: {
        reset() { // Call this when you're done using the store
            this.$reset();
        },

        async GetUser() {
            this.GetUserLoading = true;
            const failureOrSucess = await userRepository.loadUser();
            failureOrSucess.fold(
                error => {
                    // ? left -> failure
                    // # failure state
                    // console.log(error.statusMessage);
                    this.GetUserFailure = error.statusMessage;
                    this.GetUserLoading = false;
                },
                (user) => {
                    // ? right -> data (success)
                    // # success state
                    this.GetUserSuccess = user as NormalUser;

                    // this just in developement
                    // setTimeout(() => {

                    this.GetUserLoading = false;
                    // }, 2500)
                    // this.reset();
                }
            )

        }
    }
});




