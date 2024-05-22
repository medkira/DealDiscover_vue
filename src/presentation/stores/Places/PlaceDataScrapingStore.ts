import { placeRepository } from '@/app/factory/di';
import type { Place } from '@/domain/entities/Place';
import { defineStore } from 'pinia'

export const PlaceDataScrapingStore = defineStore('PlaceDataScrapingStore', {
    state: () => ({
        PlaceDataScrapingFailure: "",
        PlaceDataScrapingLoading: false,
        PlaceDataScrapingSuccess: [] as Place[],
    }),
    getters: {
        isCreatedPlaceSuccess: (state) => state.PlaceDataScrapingSuccess.length !== 0,


        getFailureMessage: (state) => state.PlaceDataScrapingFailure,
        getSuccessMessage: (state) => state.PlaceDataScrapingSuccess ? "Scraped data successfull!" : "",
        PlaceDataScrapingStatusMessage(state): string | null {
            if (state.PlaceDataScrapingSuccess) {
                return 'Scraped data successfully';
            } else if (state.PlaceDataScrapingLoading) {
                return 'loading...';
            } else if (state.PlaceDataScrapingFailure) {
                return `Create Place failed: ${state.PlaceDataScrapingFailure}`;
            } else {
                return null;
            }
        },
    },
    actions: {
        reset() { // Call this when you're done using the store
            this.$reset();
        },

        async PlaceDataScraping(data: {
            url?: string, placeType?: string
        }) {
            this.PlaceDataScrapingLoading = true;
            const failureOrSucess = await placeRepository.dataScrape(data);
            failureOrSucess.fold(
                error => {
                    // ? left -> failure
                    // # failure state
                    // console.log(error.statusMessage);
                    this.PlaceDataScrapingFailure = error.statusMessage;
                    this.PlaceDataScrapingLoading = false;
                },
                (response) => {
                    // ? right -> data (success)
                    // # success state
                    this.PlaceDataScrapingSuccess = response;


                    // this just in developement
                    // setTimeout(() => {

                    this.PlaceDataScrapingLoading = false;
                    // }, 2500);
                    // this.reset();
                }
            )

        }
    }
});




