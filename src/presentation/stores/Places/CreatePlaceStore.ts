import { placeRepository } from '@/app/factory/di';
import { defineStore } from 'pinia'

export const CreatePlaceStore = defineStore('CreatePlaceStore', {
    state: () => ({
        CreatePlaceFailure: "",
        CreatePlaceLoading: false,
        CreatePlacegSuccess: { PlaceId: "" },
    }),
    getters: {
        isCreatedPlaceSuccess: (state) => state.CreatePlacegSuccess.PlaceId !== "",


        getFailureMessage: (state) => state.CreatePlaceFailure,
        getSuccessMessage: (state) => state.CreatePlacegSuccess ? "created Place successfuly!" : "",
        CreatePlaceStatusMessage(state): string | null {
            if (state.CreatePlacegSuccess.PlaceId) {
                return 'Create Place successful!';
            } else if (state.CreatePlaceLoading) {
                return 'loading...';
            } else if (state.CreatePlaceFailure) {
                return `Create Place failed: ${state.CreatePlaceFailure}`;
            } else {
                return null;
            }
        },
    },
    actions: {
        reset() { // Call this when you're done using the store
            this.$reset();
        },

        async CreatePlace(data: {
            name: string, type: string, location: string,
            description: string, url?: string, placeImage: string | string[]
        }) {
            this.CreatePlaceLoading = true;
            const failureOrSucess = await placeRepository.createPlace(data);
            failureOrSucess.fold(
                error => {
                    // ? left -> failure
                    // # failure state
                    // console.log(error.statusMessage);
                    this.CreatePlaceFailure = error.statusMessage;
                    this.CreatePlaceLoading = false;
                },
                (response) => {
                    // ? right -> data (success)
                    // # success state
                    this.CreatePlacegSuccess.PlaceId = response.postId;


                    // this just in developement
                    // setTimeout(() => {

                    this.CreatePlaceLoading = false;
                    // }, 2500);
                    // this.reset();
                }
            )

        }
    }
});




