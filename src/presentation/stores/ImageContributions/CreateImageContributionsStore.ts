import { defineStore } from 'pinia'
import { imageContributionRepository } from '@/app/factory/di';

export const CreateImageContributionsStore = defineStore('CreateImageContributionsStore', {
    state: () => ({
        CreateImageContributionFailure: "",
        CreateImageContributionLoading: false,
        CreateImageContributiongSuccess: { imageContributionId: "" },
    }),
    getters: {
        isCreatedSuccess: (state) => state.CreateImageContributiongSuccess.imageContributionId !== "",


        getFailureMessage: (state) => state.CreateImageContributionFailure,
        getSuccessMessage: (state) => state.CreateImageContributiongSuccess ? "Image contribution created successfuly!" : "",
        CreateImageContributionStatusMessage(state): string | null {
            if (state.CreateImageContributiongSuccess.imageContributionId) {
                return 'Create post successful!';
            } else if (state.CreateImageContributionLoading) {
                return 'loading...';
            } else if (state.CreateImageContributionFailure) {
                return `Create post failed: ${state.CreateImageContributionFailure}`;
            } else {
                return null;
            }
        },
    },
    actions: {
        reset() { // Call this when you're done using the store
            this.$reset();
        },

        async CreateImageContribution(data: { place_id: string, postImage: File[] }) {
            this.CreateImageContributionLoading = true;
            const failureOrSucess = await imageContributionRepository.createImageContribution(data);
            failureOrSucess.fold(
                error => {
                    // ? left -> failure
                    // # failure state
                    // console.log(error.statusMessage);
                    this.CreateImageContributionFailure = error.statusMessage;
                    this.CreateImageContributionLoading = false;
                },
                (response) => {
                    // ? right -> data (success)
                    // # success state
                    this.CreateImageContributiongSuccess.imageContributionId = response.imageContributionId;



                    this.CreateImageContributionLoading = false;
                    // this.reset();
                }
            )

        }
    }
});




