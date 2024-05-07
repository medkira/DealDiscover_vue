import { defineStore } from 'pinia'
import { Place } from '@/domain/entities/Place';
import { placeRepository } from '@/app/factory/di';
import { toRaw } from 'vue';

export const GetPlaceByIdStore = defineStore('GetPlaceByIdStore', {
    state: () => ({
        GetPlaceByIdFailure: "",
        GetPlaceByIdLoading: false,
        GetPlaceByIdSuccess: {} as Place
    }),
    getters: {
        placeData: (state) => toRaw(state.GetPlaceByIdSuccess),

        // isLoaded: (state) => toRaw(state.GetPlaceByIdSuccess) !== null,

        getFailureMessage: (state) => state.GetPlaceByIdFailure,
        getSuccessMessage: (state) => state.GetPlaceByIdSuccess ? "created post successfuly!" : "",
        GetPlaceByIdStatusMessage(state): string | null {
            if (state.GetPlaceByIdSuccess) {
                return 'Place loaded successful!';
            } else if (state.GetPlaceByIdLoading) {
                return 'loading...';
            } else if (state.GetPlaceByIdFailure) {
                return `Place Loading failed: ${state.GetPlaceByIdFailure}`;
            } else {
                return null;
            }
        },
    },
    actions: {
        reset() { // Call this when you're done using the store
            this.$reset();
        },

        async GetPlaceById(data: string) {
            this.GetPlaceByIdLoading = true;
            const failureOrSucess = await placeRepository.getPlaceById(data);
            failureOrSucess.fold(
                error => {
                    // ? left -> failure
                    // # failure state
                    // console.log(error.statusMessage);
                    this.GetPlaceByIdFailure = error.statusMessage;
                    this.GetPlaceByIdLoading = false;
                },
                (place) => {
                    // ? right -> data (success)
                    // # success state
                    this.GetPlaceByIdSuccess = place;


                    // this just in developement
                    setTimeout(() => {

                        this.GetPlaceByIdLoading = false;
                    }, 2500)
                    // this.reset();
                }
            )

        }
    }
});




