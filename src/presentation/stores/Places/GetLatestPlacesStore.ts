import { defineStore } from 'pinia'
import type { Place, placeTypes } from '@/domain/entities/Place';
import { placeRepository } from '@/app/factory/di';
import { toRaw } from 'vue';

export const GetLatestsPlacesStore = defineStore('GetLatestsPlacesStore', {
    state: () => ({
        GetLatestPlacesFailure: "",
        GetLatestPlacesLoading: false,
        GetLatestPlacesSuccess: [] as Place[],
    }),
    getters: {
        isCreatedPlaceSuccess: (state) => state.GetLatestPlacesSuccess !== null,


        getFailureMessage: (state) => state.GetLatestPlacesFailure,
        getSuccessMessage: (state) => state.GetLatestPlacesSuccess ? "created post successfuly!" : "",
        GetLatestPlacesStatusMessage(state): string | null {
            if (state.GetLatestPlacesSuccess) {
                return 'Place loaded successful!';
            } else if (state.GetLatestPlacesLoading) {
                return 'loading...';
            } else if (state.GetLatestPlacesFailure) {
                return `Places Loading failed: ${state.GetLatestPlacesFailure}`;
            } else {
                return null;
            }
        },
    },
    actions: {
        reset() { // Call this when you're done using the store
            this.$reset();
        },

        async GetLatestPlaces(data: { page?: number, type?: placeTypes, location?: string, is_verified?: boolean, user_id?: string }) {
            this.GetLatestPlacesLoading = true;
            const failureOrSucess = await placeRepository.getPlaces(data);
            failureOrSucess.fold(
                error => {
                    // ? left -> failure
                    // # failure state
                    // console.log(error.statusMessage);
                    this.GetLatestPlacesFailure = error.statusMessage;
                    this.GetLatestPlacesLoading = false;
                },
                (response) => {
                    // ? right -> data (success)
                    // # success state
                    this.GetLatestPlacesSuccess = response.data;
                    // console.log(response.data)

                    // this just in developement
                    setTimeout(() => {

                        this.GetLatestPlacesLoading = false;
                    }, 2500)
                    // this.reset();
                }
            )

        }
    }
});




