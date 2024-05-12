import { foodRepository } from '@/app/factory/di';
import type { foodTypes } from '@/domain/entities/Food';
import { defineStore } from 'pinia'

export const CreateFoodStore = defineStore('CreateFoodStore', {
    state: () => ({
        CreateFoodFailure: "",
        CreateFoodLoading: false,
        CreateFoodgSuccess: { FoodId: "" },
    }),
    getters: {
        isCreatedFoodSuccess: (state) => state.CreateFoodgSuccess.FoodId !== "",


        getFailureMessage: (state) => state.CreateFoodFailure,
        getSuccessMessage: (state) => state.CreateFoodgSuccess ? "created Food successfuly!" : "",
        CreateFoodStatusMessage(state): string | null {
            if (state.CreateFoodgSuccess.FoodId) {
                return 'Created Food successfuly!';
            } else if (state.CreateFoodLoading) {
                return 'loading...';
            } else if (state.CreateFoodFailure) {
                return `Create Food failed: ${state.CreateFoodFailure}`;
            } else {
                return null;
            }
        },
    },
    actions: {
        reset() { // Call this when you're done using the store
            this.$reset();
        },

        async CreateFood(data: {
            place_id: string,
            name: string,
            price: number,
            food_type?: foodTypes,
            menu_id?: string,
        }) {
            this.CreateFoodLoading = true;
            const failureOrSucess = await foodRepository.createFood(data);
            failureOrSucess.fold(
                error => {
                    // ? left -> failure
                    // # failure state
                    // console.log(error.statusMessage);
                    this.CreateFoodFailure = error.statusMessage;
                    this.CreateFoodLoading = false;
                },
                (response) => {
                    // ? right -> data (success)
                    // # success state
                    this.CreateFoodgSuccess.FoodId = response.foodId;


                    // this just in developement
                    // setTimeout(() => {

                    this.CreateFoodLoading = false;
                    // }, 2500);
                    // this.reset();
                }
            )

        }
    }
});




