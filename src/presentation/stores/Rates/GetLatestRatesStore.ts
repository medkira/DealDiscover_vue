import { defineStore } from 'pinia'
import { rateRepository } from '@/app/factory/di';
import type { Rate } from '@/domain/entities/Rates';
import { toRaw } from 'vue';

export const GetLatestsRatesStore = defineStore('GetLatestsRatesStore', {
    state: () => ({
        GetLatestRatesFailure: "",
        GetLatestRatesLoading: false,
        GetLatestRatesSuccess: [] as Rate[],

    }),
    getters: {

        getReviews: (state) => toRaw(state.GetLatestRatesSuccess),

        isCreatedRateSuccess: (state) => state.GetLatestRatesSuccess !== null,


        getFailureMessage: (state) => state.GetLatestRatesFailure,
        getSuccessMessage: (state) => state.GetLatestRatesSuccess ? "created post successfuly!" : "",
        GetLatestRatesStatusMessage(state): string | null {
            if (state.GetLatestRatesSuccess) {
                return 'Rate loaded successful!';
            } else if (state.GetLatestRatesLoading) {
                return 'loading...';
            } else if (state.GetLatestRatesFailure) {
                return `Rates Loading failed: ${state.GetLatestRatesFailure}`;
            } else {
                return null;
            }
        },
    },
    actions: {
        reset() { // Call this when you're done using the store
            this.$reset();
        },

        async GetLatestRates(data: { page?: number, rated_id: string }) {
            this.GetLatestRatesLoading = true;
            const failureOrSucess = await rateRepository.getLatestRates(data);
            failureOrSucess.fold(
                error => {
                    // ? left -> failure
                    // # failure state
                    // console.log(error.statusMessage);
                    this.GetLatestRatesFailure = error.statusMessage;
                    this.GetLatestRatesLoading = false;
                },
                (response) => {
                    // ? right -> data (success)
                    // # success state
                    this.GetLatestRatesSuccess = response.data;


                    // this just in developement
                    // setTimeout(() => {

                    this.GetLatestRatesLoading = false;
                    // }, 2500)
                    // this.reset();
                }
            )

        }
    }
});




