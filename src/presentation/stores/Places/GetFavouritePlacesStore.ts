import { defineStore } from 'pinia'
import { Place } from '@/domain/entities/Place';
import { placeRepository } from '@/app/factory/di';
import { ref, toRaw } from 'vue';

export const GetFavouritePlaceStore = defineStore('GetFavouritePlaceStore', {
    state: () => ({
        GetFavouritePlaceFailure: "",
        GetFavouritePlaceLoading: false,
        GetFavouritePlaceSuccess: [] as String[],

        isLiked: false
    }),
    getters: {
        favouritePlaceData: (state) => toRaw(state.isLiked),

        getFailureMessage: (state) => state.GetFavouritePlaceFailure,
        getSuccessMessage: (state) => state.GetFavouritePlaceSuccess ? "created post successfuly!" : "",
        GetFavouritePlaceStatusMessage(state): string | null {
            if (state.GetFavouritePlaceSuccess) {
                return 'Place loaded successful!';
            } else if (state.GetFavouritePlaceLoading) {
                return 'loading...';
            } else if (state.GetFavouritePlaceFailure) {
                return `Place Loading failed: ${state.GetFavouritePlaceFailure}`;
            } else {
                return null;
            }
        },

        GetIsLiked: (state) => state.isLiked
    },
    actions: {
        reset() { // Call this when you're done using the store
            this.$reset();
        },

        async GetFavouritePlaces(placeId: string) {
            this.GetFavouritePlaceLoading = true;
            const failureOrSucess = await placeRepository.getFavouritePlaces();
            failureOrSucess.fold(
                error => {
                    // ? left -> failure
                    // # failure state
                    // console.log(error.statusMessage);
                    this.GetFavouritePlaceFailure = error.statusMessage;
                    this.GetFavouritePlaceLoading = false;
                },
                (place) => {
                    // ? right -> data (success)
                    // # success state


                    this.GetFavouritePlaceSuccess = place.favouritePlaces;

                    this.GetFavouritePlaceSuccess.map((element) => {
                        // this.isLiked = false;

                        if (element === placeId) {
                            this.isLiked = true;

                        }
                    })



                    // this just in developement
                    // setTimeout(() => {

                    this.GetFavouritePlaceLoading = false;
                    // }, 2500)
                    // this.$reset();
                }
            )

        }
    }
});




