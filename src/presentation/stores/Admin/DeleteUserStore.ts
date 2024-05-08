import { userRepository } from '@/app/factory/di';
import { defineStore } from 'pinia'


export const DeleteUserStore = defineStore('DeleteUserStore', {
    state: () => ({
        DeleteUserByIdFailure: "",
        DeleteUserByIdLoading: false,
        DeleteUserByIdSuccess: false
    }),
    getters: {

        // isLoaded: (state) => toRaw(state.DeleteUserByIdSuccess) !== null,

        getFailureMessage: (state) => state.DeleteUserByIdFailure,
        getSuccessMessage: (state) => state.DeleteUserByIdSuccess ? "created post successfuly!" : "",
        DeleteUserByIdStatusMessage(state): string | null {
            if (state.DeleteUserByIdSuccess) {
                return ' successful!';
            } else if (state.DeleteUserByIdLoading) {
                return 'loading...';
            } else if (state.DeleteUserByIdFailure) {
                return `Loading failed: ${state.DeleteUserByIdFailure}`;
            } else {
                return null;
            }
        },
    },
    actions: {
        reset() { // Call this when you're done using the store
            this.$reset();
        },

        async DeleteUserById(userId: string) {
            this.DeleteUserByIdLoading = true;
            const failureOrSucess = await userRepository.deleteUser(userId);
            failureOrSucess.fold(
                error => {
                    // ? left -> failure
                    // # failure state
                    // console.log(error.statusMessage);
                    this.DeleteUserByIdFailure = error.statusMessage;
                    this.DeleteUserByIdLoading = false;
                },
                (place) => {
                    // ? right -> data (success)
                    // # success state


                    // this just in developement
                    setTimeout(() => {
                        this.DeleteUserByIdSuccess = true;

                        this.DeleteUserByIdLoading = false;
                    }, 2500)
                    // this.reset();
                }
            )

        }
    }
});




