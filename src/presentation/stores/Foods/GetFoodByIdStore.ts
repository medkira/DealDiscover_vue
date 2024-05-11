import { defineStore } from 'pinia'
import { Food } from '@/domain/entities/Food';
import { foodRepository } from '@/app/factory/di';
import { toRaw } from 'vue';

export const GetFoodByIdStore = defineStore('GetFoodByIdStore', {
    state: () => ({
        GetFoodByIdFailure: "",
        GetFoodByIdLoading: false,
        GetFoodByIdSuccess: {} as Food
    }),
    getters: {
        placeData: (state) => toRaw(state.GetFoodByIdSuccess),

        // isLoaded: (state) => toRaw(state.GetFoodByIdSuccess) !== null,

        getFailureMessage: (state) => state.GetFoodByIdFailure,
        getSuccessMessage: (state) => state.GetFoodByIdSuccess ? "created post successfuly!" : "",
        GetFoodByIdStatusMessage(state): string | null {
            if (state.GetFoodByIdSuccess) {
                return 'Food loaded successful!';
            } else if (state.GetFoodByIdLoading) {
                return 'loading...';
            } else if (state.GetFoodByIdFailure) {
                return `Food Loading failed: ${state.GetFoodByIdFailure}`;
            } else {
                return null;
            }
        },
    },
    actions: {
        reset() { // Call this when you're done using the store
            this.$reset();
        },

        async GetFoodById(data: string) {
            this.GetFoodByIdLoading = true;
            const failureOrSucess = await foodRepository.getFoodById(data);
            failureOrSucess.fold(
                error => {
                    // ? left -> failure
                    // # failure state
                    // console.log(error.statusMessage);
                    this.GetFoodByIdFailure = error.statusMessage;
                    this.GetFoodByIdLoading = false;
                },
                (food) => {
                    // ? right -> data (success)
                    // # success state
                    this.GetFoodByIdSuccess = food;


                    // this just in developement
                    setTimeout(() => {

                        this.GetFoodByIdLoading = false;
                    }, 2500)
                    // this.reset();
                }
            )

        }
    }
});




