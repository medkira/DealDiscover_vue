import { defineStore } from 'pinia'
import { foodRepository } from '@/app/factory/di';
import type { Food, foodTypes } from '@/domain/entities/Food';

export const GetLatestsFoodsStore = defineStore('GetLatestsFoodsStore', {
    state: () => ({
        GetLatestFoodsFailure: "",
        GetLatestFoodsLoading: false,
        GetLatestFoodsSuccess: [] as Food[],
    }),
    getters: {
        isCreatedFoodSuccess: (state) => state.GetLatestFoodsSuccess !== null,


        getFailureMessage: (state) => state.GetLatestFoodsFailure,
        getSuccessMessage: (state) => state.GetLatestFoodsSuccess ? "created post successfuly!" : "",
        GetLatestFoodsStatusMessage(state): string | null {
            if (state.GetLatestFoodsSuccess) {
                return 'Food loaded successful!';
            } else if (state.GetLatestFoodsLoading) {
                return 'loading...';
            } else if (state.GetLatestFoodsFailure) {
                return `Foods Loading failed: ${state.GetLatestFoodsFailure}`;
            } else {
                return null;
            }
        },
    },
    actions: {
        reset() { // Call this when you're done using the store
            this.$reset();
        },

        async GetLatestFoods(data: { page?: number, type?: foodTypes, price?: number, place_id?: string }) {
            this.GetLatestFoodsLoading = true;
            // console.log(data.place_id)
            const failureOrSucess = await foodRepository.getFoods(data);
            failureOrSucess.fold(
                error => {
                    // ? left -> failure
                    // # failure state
                    // console.log(error.statusMessage);
                    this.GetLatestFoodsFailure = error.statusMessage;
                    this.GetLatestFoodsLoading = false;
                },
                (response) => {
                    // ? right -> data (success)
                    // # success state
                    this.GetLatestFoodsSuccess = response.data;

                    // this just in developement
                    // setTimeout(() => {

                    this.GetLatestFoodsLoading = false;
                    // }, 2500)
                    // this.reset();
                }
            )

        }
    }
});




