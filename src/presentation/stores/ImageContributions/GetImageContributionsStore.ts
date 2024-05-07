import { defineStore } from 'pinia'
import { imageContributionRepository } from '@/app/factory/di';
import { toRaw } from 'vue';
import type { ImageContribution } from '@/domain/entities/ImageContribution';

export const GetImageContributionsStoreStore = defineStore('GetImageContributionsStoreStore', {
    state: () => ({
        GetImageContributionsStoreFailure: false,
        GetImageContributionsStoreLoading: false,
        GetImageContributionsStoreSuccess: [] as ImageContribution[],
    }),
    getters: {
        imageContributionsData: (state) => toRaw(state.GetImageContributionsStoreSuccess),

        isCreatedImageContributionsSuccess: (state) => state.GetImageContributionsStoreSuccess !== null,


        getFailureMessage: (state) => state.GetImageContributionsStoreFailure,
        getSuccessMessage: (state) => state.GetImageContributionsStoreSuccess ? "created post successfuly!" : "",
        GetImageContributionsStoreStatusMessage(state): string | null {
            if (state.GetImageContributionsStoreSuccess) {
                return 'ImageContributions loaded successful!';
            } else if (state.GetImageContributionsStoreLoading) {
                return 'loading...';
            } else if (state.GetImageContributionsStoreFailure) {
                return `ImageContributions Loading failed: ${state.GetImageContributionsStoreFailure}`;
            } else {
                return null;
            }
        },
    },
    actions: {
        reset() { // Call this when you're done using the store
            this.$reset();
        },

        async GetImageContributions(data: { page?: number, is_verified?: false }) {
            this.GetImageContributionsStoreLoading = true;
            const failureOrSucess = await imageContributionRepository.getLatetstImageContributions(data);
            failureOrSucess.fold(
                error => {
                    // ? left -> failure
                    // # failure state
                    // console.log(error.statusMessage);
                    this.GetImageContributionsStoreFailure = error.statusMessage;
                    this.GetImageContributionsStoreLoading = false;
                },
                (response) => {
                    // ? right -> data (success)
                    // # success state
                    this.GetImageContributionsStoreSuccess = response.data;
                    if (response.total === 0) {
                        this.GetImageContributionsStoreFailure = true
                    }
                    // this just in developement
                    // setTimeout(() => {

                    this.GetImageContributionsStoreLoading = false;
                    // }, 2500)
                    // this.reset();
                }
            )

        }
    }
});




