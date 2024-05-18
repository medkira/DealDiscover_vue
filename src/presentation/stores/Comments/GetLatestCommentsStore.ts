import { defineStore } from 'pinia'
import { commentRepository } from '@/app/factory/di';
import type { GetLatestCommentsRepository } from '@/domain/repository/comments/GetLatestCommentsInterface';
import { Comment } from '@/domain/entities/Comment';
export const GetLatestsCommentsStore = defineStore('GetLatestsCommentsStore', {
    state: () => ({
        GetLatestCommentsFailure: "",
        GetLatestCommentsLoading: false,
        GetLatestCommentsSuccess: [] as Comment[],
    }),
    getters: {
        isCreatedCommetsSuccess: (state) => state.GetLatestCommentsSuccess !== null,


        getFailureMessage: (state) => state.GetLatestCommentsFailure,
        getSuccessMessage: (state) => state.GetLatestCommentsSuccess ? "created post successfuly!" : "",
        GetLatestCommentsStatusMessage(state): string | null {
            if (state.GetLatestCommentsSuccess) {
                return 'Commets loaded successful!';
            } else if (state.GetLatestCommentsLoading) {
                return 'loading...';
            } else if (state.GetLatestCommentsFailure) {
                return `Comments Loading failed: ${state.GetLatestCommentsFailure}`;
            } else {
                return null;
            }
        },
    },
    actions: {
        reset() { // Call this when you're done using the store
            this.$reset();
        },

        async GetLatestComments(data: GetLatestCommentsRepository.Request) {
            this.GetLatestCommentsLoading = true;
            const failureOrSucess = await commentRepository.getLatestCommets(data);
            failureOrSucess.fold(
                error => {
                    // ? left -> failure
                    // # failure state
                    // console.log(error.statusMessage);
                    this.GetLatestCommentsFailure = error.statusMessage;
                    this.GetLatestCommentsLoading = false;
                },
                (response) => {
                    // ? right -> data (success)
                    // # success state
                    this.GetLatestCommentsSuccess = response.data;


                    // this just in developement
                    // setTimeout(() => {

                    this.GetLatestCommentsLoading = false;
                    // }, 2500)
                    // this.reset();
                }
            )

        }
    }
});




