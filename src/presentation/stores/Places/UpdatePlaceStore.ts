import { placeRepository } from '@/app/factory/di';
import type { placeTypes } from '@/domain/entities/Place';
import { defineStore } from 'pinia'

export const UpdatePlaceStore = defineStore('UpdatePlaceStore', {
    state: () => ({
        UpdatePlaceFailure: "",
        UpdatePlaceLoading: false,
        UpdatePlacegSuccess: { PlaceId: "" },
    }),
    getters: {
        isUpdatedPlaceSuccess: (state) => state.UpdatePlacegSuccess.PlaceId !== "",


        getFailureMessage: (state) => state.UpdatePlaceFailure,
        getSuccessMessage: (state) => state.UpdatePlacegSuccess ? "created Place successfuly!" : "",
        UpdatePlaceStatusMessage(state): string | null {
            if (state.UpdatePlacegSuccess.PlaceId) {
                return 'Update Place successful!';
            } else if (state.UpdatePlaceLoading) {
                return 'loading...';
            } else if (state.UpdatePlaceFailure) {
                return `Update Place failed: ${state.UpdatePlaceFailure}`;
            } else {
                return null;
            }
        },
    },
    actions: {
        reset() { // Call this when you're done using the store
            this.$reset();
        },

        async UpdatePlace(data: {
            name: string, type: string, location: string,
            description: string, url?: string, placeImage: string | string[], placeId: string
        }) {
            this.UpdatePlaceLoading = true;
            const failureOrSucess = await placeRepository.updatePlace({ placeData: data, placeId: data.placeId });
            failureOrSucess.fold(
                error => {
                    // ? left -> failure
                    // # failure state
                    // console.log(error.statusMessage);
                    this.UpdatePlaceFailure = error.statusMessage;
                    this.UpdatePlaceLoading = false;
                },
                (response) => {
                    // ? right -> data (success)
                    // # success state
                    this.UpdatePlacegSuccess.PlaceId = response.id;


                    // this just in developement
                    // setTimeout(() => {

                    this.UpdatePlaceLoading = false;
                    // }, 2500);
                    // this.reset();
                }
            )

        }
    }
});




