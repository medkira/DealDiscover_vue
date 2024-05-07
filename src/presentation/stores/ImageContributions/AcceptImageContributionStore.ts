import { imageContributionRepository } from '@/app/factory/di';
import { defineStore } from 'pinia'


export const AcceptImageContributionStore = defineStore('AcceptImageContributionStore', {
    state: () => ({
        AcceptImageContributionByIdFailure: "",
        AcceptImageContributionByIdLoading: false,
        AcceptImageContributionByIdSuccess: false
    }),
    getters: {

        // isLoaded: (state) => toRaw(state.AcceptImageContributionByIdSuccess) !== null,

        getFailureMessage: (state) => state.AcceptImageContributionByIdFailure,
        getSuccessMessage: (state) => state.AcceptImageContributionByIdSuccess ? "created post successfuly!" : "",
        AcceptImageContributionByIdStatusMessage(state): string | null {
            if (state.AcceptImageContributionByIdSuccess) {
                return ' successful!';
            } else if (state.AcceptImageContributionByIdLoading) {
                return 'loading...';
            } else if (state.AcceptImageContributionByIdFailure) {
                return `Loading failed: ${state.AcceptImageContributionByIdFailure}`;
            } else {
                return null;
            }
        },
    },
    actions: {
        reset() { // Call this when you're done using the store
            this.$reset();
        },

        async AcceptImageContributionById(data: string) {
            this.AcceptImageContributionByIdLoading = true;
            const failureOrSucess = await imageContributionRepository.acceptImageContribution(data);
            failureOrSucess.fold(
                error => {
                    // ? left -> failure
                    // # failure state
                    // console.log(error.statusMessage);
                    this.AcceptImageContributionByIdFailure = error.statusMessage;
                    this.AcceptImageContributionByIdLoading = false;
                },
                (place) => {
                    // ? right -> data (success)
                    // # success state
                    this.AcceptImageContributionByIdSuccess = true;


                    // this just in developement
                    // setTimeout(() => {

                    this.AcceptImageContributionByIdLoading = false;
                    // }, 2500)
                    // this.reset();
                }
            )

        }
    }
});




