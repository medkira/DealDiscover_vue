import { imageContributionRepository, placeRepository } from '@/app/factory/di';
import { defineStore } from 'pinia'


export const AcceptPlaceContributionStore = defineStore('AcceptPlaceContributionStore', {
    state: () => ({
        AcceptPlaceContributionByIdFailure: "",
        AcceptPlaceContributionByIdLoading: false,
        AcceptPlaceContributionByIdSuccess: false
    }),
    getters: {

        // isLoaded: (state) => toRaw(state.AcceptPlaceContributionByIdSuccess) !== null,

        getFailureMessage: (state) => state.AcceptPlaceContributionByIdFailure,
        getSuccessMessage: (state) => state.AcceptPlaceContributionByIdSuccess ? "created post successfuly!" : "",
        AcceptPlaceContributionByIdStatusMessage(state): string | null {
            if (state.AcceptPlaceContributionByIdSuccess) {
                return ' successful!';
            } else if (state.AcceptPlaceContributionByIdLoading) {
                return 'loading...';
            } else if (state.AcceptPlaceContributionByIdFailure) {
                return `Loading failed: ${state.AcceptPlaceContributionByIdFailure}`;
            } else {
                return null;
            }
        },
    },
    actions: {
        reset() { // Call this when you're done using the store
            this.$reset();
        },

        async AcceptPlaceContributionById(data: string) {
            this.AcceptPlaceContributionByIdLoading = true;
            const failureOrSucess = await placeRepository.validatePlace(data);
            failureOrSucess.fold(
                error => {
                    // ? left -> failure
                    // # failure state
                    // console.log(error.statusMessage);
                    this.AcceptPlaceContributionByIdFailure = error.statusMessage;
                    this.AcceptPlaceContributionByIdLoading = false;
                },
                (place) => {
                    // ? right -> data (success)
                    // # success state
                    this.AcceptPlaceContributionByIdSuccess = true;


                    // this just in developement
                    // setTimeout(() => {

                    this.AcceptPlaceContributionByIdLoading = false;
                    // }, 2500)
                    // this.reset();
                }
            )

        }
    }
});




