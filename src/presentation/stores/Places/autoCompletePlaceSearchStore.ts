import { defineStore } from 'pinia'
import { Place } from '@/domain/entities/Place';
import { placeRepository } from '@/app/factory/di';
import { toRaw } from 'vue';
import type { AutoCompletePlaceSearchRepository } from '@/domain/repository/places/AutoCompletePlaceSearchInterface';

export const AutoCompletePlaceSearchStore = defineStore('AutoCompletePlaceSearchStore', {
    state: () => ({
        autoCompletePlaceSearchFailure: "",
        autoCompletePlaceSearchLoading: false,
        autoCompletePlaceSearchSuccess: [] as Place[]
    }),
    getters: {
        placeData: (state) => toRaw(state.autoCompletePlaceSearchSuccess),

        // isLoaded: (state) => toRaw(state.autoCompletePlaceSearchSuccess) !== null,

        getFailureMessage: (state) => state.autoCompletePlaceSearchFailure,
        getSuccessMessage: (state) => state.autoCompletePlaceSearchSuccess ? "Get places successfuly!" : "",
        autoCompletePlaceSearchStatusMessage(state): string | null {
            if (state.autoCompletePlaceSearchSuccess) {
                return 'Place loaded successful!';
            } else if (state.autoCompletePlaceSearchLoading) {
                return 'loading...';
            } else if (state.autoCompletePlaceSearchFailure) {
                return `Place Loading failed: ${state.autoCompletePlaceSearchFailure}`;
            } else {
                return null;
            }
        },
    },
    actions: {
        reset() { // Call this when you're done using the store
            this.$reset();
        },

        async autoCompletePlaceSearch(params: AutoCompletePlaceSearchRepository.Request) {
            this.autoCompletePlaceSearchLoading = true;
            const failureOrSucess = await placeRepository.autoCompletePlaceSearch({ query: params.query });
            failureOrSucess.fold(
                error => {
                    // ? left -> failure
                    // # failure state
                    // console.log(error.statusMessage);
                    this.autoCompletePlaceSearchFailure = error.statusMessage;
                    this.autoCompletePlaceSearchLoading = false;
                },
                (places) => {
                    // ? right -> data (success)
                    // # success state
                    this.autoCompletePlaceSearchSuccess = places;


                    // this just in developement
                    // setTimeout(() => {

                    this.autoCompletePlaceSearchLoading = false;
                    // }, 2500)
                    // this.reset();
                }
            )

        }
    }
});




