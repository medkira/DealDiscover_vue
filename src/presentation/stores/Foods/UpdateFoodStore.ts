import { foodRepository, placeRepository } from '@/app/factory/di';
import type { foodTypes } from '@/domain/entities/Food';
import { defineStore } from 'pinia'

export const UpdateFoodStore = defineStore('UpdateFoodStore', {
    state: () => ({
        UpdateFoodFailure: "",
        UpdateFoodLoading: false,
        UpdateFoodgSuccess: { FoodId: "" },
    }),
    getters: {
        isUpdatedFoodSuccess: (state) => state.UpdateFoodgSuccess.FoodId !== "",


        getFailureMessage: (state) => state.UpdateFoodFailure,
        getSuccessMessage: (state) => state.UpdateFoodgSuccess ? "created Food successfuly!" : "",
        UpdateFoodStatusMessage(state): string | null {
            if (state.UpdateFoodgSuccess.FoodId) {
                return 'Update Food successful!';
            } else if (state.UpdateFoodLoading) {
                return 'loading...';
            } else if (state.UpdateFoodFailure) {
                return `Update Food failed: ${state.UpdateFoodFailure}`;
            } else {
                return null;
            }
        },
    },
    actions: {
        reset() { // Call this when you're done using the store
            this.$reset();
        },

        async UpdateFood(data: {
            place_id?: string,
            name: string,
            price: number,
            food_type?: foodTypes,
            menu_id?: string,
            FoodId: string
        }) {
            this.UpdateFoodLoading = true;
            const failureOrSucess = await foodRepository.updateFood({ foodData: data, foodId: data.FoodId });
            failureOrSucess.fold(
                error => {
                    // ? left -> failure
                    // # failure state
                    // console.log(error.statusMessage);
                    this.UpdateFoodFailure = error.statusMessage;
                    this.UpdateFoodLoading = false;
                },
                (response) => {
                    // ? right -> data (success)
                    // # success state
                    this.UpdateFoodgSuccess.FoodId = response.id;


                    // this just in developement
                    setTimeout(() => {

                        this.UpdateFoodLoading = false;
                    }, 2500);
                    // this.reset();
                }
            )

        }
    }
});




