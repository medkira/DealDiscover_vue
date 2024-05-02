import { defineStore } from 'pinia'
import type { rated_name } from '@/domain/entities/Rates';
import { rateRepository } from '@/app/factory/di';
import { GetLatestsRatesStore } from './GetLatestRatesStore';

export const CreateRateStore = defineStore('CreateRateStore', {
    state: () => ({
        CreateRateFailure: "",
        CreateRateLoading: false,
        CreateRategSuccess: { rateId: "" },
    }),
    getters: {
        isCreatedRateSuccess: (state) => state.CreateRategSuccess.rateId !== "",


        getFailureMessage: (state) => state.CreateRateFailure,
        getSuccessMessage: (state) => state.CreateRategSuccess ? "created post successfuly!" : "",
        CreateRateStatusMessage(state): string | null {
            if (state.CreateRategSuccess.rateId) {
                return 'Create post successful!';
            } else if (state.CreateRateLoading) {
                return 'loading...';
            } else if (state.CreateRateFailure) {
                return `Create post failed: ${state.CreateRateFailure}`;
            } else {
                return null;
            }
        },
    },
    actions: {
        reset() { // Call this when you're done using the store
            this.$reset();
        },

        async CreateRate(data: {
            rate: number, rated_id: string, rated_name: rated_name, review: string,
        }) {
            this.CreateRateLoading = true;
            const failureOrSucess = await rateRepository.createRate(data);
            failureOrSucess.fold(
                error => {
                    // ? left -> failure
                    // # failure state
                    // console.log(error.statusMessage);
                    this.CreateRateFailure = error.statusMessage;
                    this.CreateRateLoading = false;
                },
                async (response) => {
                    const { rated_id } = data
                    // ? right -> data (success)
                    // # success state
                    this.CreateRategSuccess.rateId = response.rateId;


                    // this just in developement
                    setTimeout(() => {

                        this.CreateRateLoading = false;


                    }, 2500);


                    // *** fetch data to update the state in communView
                    const getLatestsRatesStore = GetLatestsRatesStore()
                    await getLatestsRatesStore.GetLatestRates({ page: 1, rated_id });
                    // this.reset();
                }
            )

        }
    }
});




