import { foodRepository } from '@/app/factory/di';
import { defineStore } from 'pinia'


export const DeleteFoodStore = defineStore('DeleteFoodStore', {
    state: () => ({
        DeleteFoodByIdFailure: "",
        DeleteFoodByIdLoading: false,
        DeleteFoodByIdSuccess: false
    }),
    getters: {

        // isLoaded: (state) => toRaw(state.DeleteFoodByIdSuccess) !== null,

        getFailureMessage: (state) => state.DeleteFoodByIdFailure,
        getSuccessMessage: (state) => state.DeleteFoodByIdSuccess ? " successfuly!" : "",
        DeleteFoodByIdStatusMessage(state): string | null {
            if (state.DeleteFoodByIdSuccess) {
                return ' successful!';
            } else if (state.DeleteFoodByIdLoading) {
                return 'loading...';
            } else if (state.DeleteFoodByIdFailure) {
                return `Loading failed: ${state.DeleteFoodByIdFailure}`;
            } else {
                return null;
            }
        },
    },
    actions: {
        reset() { // Call this when you're done using the store
            this.$reset();
        },

        async DeleteFoodById(foodId: string) {
            this.DeleteFoodByIdLoading = true;
            const failureOrSucess = await foodRepository.deletefood(foodId);
            failureOrSucess.fold(
                error => {
                    // ? left -> failure
                    // # failure state
                    // console.log(error.statusMessage);
                    this.DeleteFoodByIdFailure = error.statusMessage;
                    this.DeleteFoodByIdLoading = false;
                },
                (data) => {
                    // ? right -> data (success)
                    // # success state


                    // this just in developement
                    setTimeout(() => {
                        this.DeleteFoodByIdSuccess = true;

                        this.DeleteFoodByIdLoading = false;
                    }, 2500)
                    // this.reset();
                }
            )

        }
    }
});




