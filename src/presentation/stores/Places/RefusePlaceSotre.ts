import { imageContributionRepository, placeRepository } from '@/app/factory/di';
import { defineStore } from 'pinia'


export const RefusePlaceContributionStore = defineStore('RefusePlaceContributionStore', {
    state: () => ({
        RefusePlaceContributionByIdFailure: "",
        RefusePlaceContributionByIdLoading: false,
        RefusePlaceContributionByIdSuccess: false
    }),
    getters: {

        // isLoaded: (state) => toRaw(state.RefusePlaceContributionByIdSuccess) !== null,

        getFailureMessage: (state) => state.RefusePlaceContributionByIdFailure,
        getSuccessMessage: (state) => state.RefusePlaceContributionByIdSuccess ? "created post successfuly!" : "",
        RefusePlaceContributionByIdStatusMessage(state): string | null {
            if (state.RefusePlaceContributionByIdSuccess) {
                return ' successful!';
            } else if (state.RefusePlaceContributionByIdLoading) {
                return 'loading...';
            } else if (state.RefusePlaceContributionByIdFailure) {
                return `Loading failed: ${state.RefusePlaceContributionByIdFailure}`;
            } else {
                return null;
            }
        },
    },
    actions: {
        reset() { // Call this when you're done using the store
            this.$reset();
        },

        async RefusePlaceContributionById(placeId: string) {
            this.RefusePlaceContributionByIdLoading = true;
            const failureOrSucess = await placeRepository.deleteplace(placeId);
            failureOrSucess.fold(
                error => {
                    // ? left -> failure
                    // # failure state
                    // console.log(error.statusMessage);
                    this.RefusePlaceContributionByIdFailure = error.statusMessage;
                    this.RefusePlaceContributionByIdLoading = false;
                },
                (place) => {
                    // ? right -> data (success)
                    // # success state


                    // this just in developement
                    setTimeout(() => {
                        this.RefusePlaceContributionByIdSuccess = true;

                        this.RefusePlaceContributionByIdLoading = false;
                    }, 2500)
                    // this.reset();
                }
            )

        }
    }
});




