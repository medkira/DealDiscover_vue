import { imageContributionRepository } from '@/app/factory/di';
import { defineStore } from 'pinia'


export const RefuseImageContributionStore = defineStore('RefuseImageContributionStore', {
    state: () => ({
        RefuseImageContributionByIdFailure: "",
        RefuseImageContributionByIdLoading: false,
        RefuseImageContributionByIdSuccess: false
    }),
    getters: {

        // isLoaded: (state) => toRaw(state.RefuseImageContributionByIdSuccess) !== null,

        getFailureMessage: (state) => state.RefuseImageContributionByIdFailure,
        getSuccessMessage: (state) => state.RefuseImageContributionByIdSuccess ? "created post successfuly!" : "",
        RefuseImageContributionByIdStatusMessage(state): string | null {
            if (state.RefuseImageContributionByIdSuccess) {
                return ' successful!';
            } else if (state.RefuseImageContributionByIdLoading) {
                return 'loading...';
            } else if (state.RefuseImageContributionByIdFailure) {
                return `Loading failed: ${state.RefuseImageContributionByIdFailure}`;
            } else {
                return null;
            }
        },
    },
    actions: {
        reset() { // Call this when you're done using the store
            this.$reset();
        },

        async RefuseImageContributionById(data: string) {
            this.RefuseImageContributionByIdLoading = true;
            const failureOrSucess = await imageContributionRepository.refuseImageContribution(data);
            failureOrSucess.fold(
                error => {
                    // ? left -> failure
                    // # failure state
                    // console.log(error.statusMessage);
                    this.RefuseImageContributionByIdFailure = error.statusMessage;
                    this.RefuseImageContributionByIdLoading = false;
                },
                (place) => {
                    // ? right -> data (success)
                    // # success state


                    // this just in developement
                    setTimeout(() => {
                        this.RefuseImageContributionByIdSuccess = true;

                        this.RefuseImageContributionByIdLoading = false;
                    }, 2500)
                    // this.reset();
                }
            )

        }
    }
});




