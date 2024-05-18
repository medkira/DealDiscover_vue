import { defineStore } from 'pinia'
import { commentRepository } from '@/app/factory/di';
import type { CreateCommentRepository } from '@/domain/repository/comments/CreateCommentInterface';

export const CreateCommentStore = defineStore('CreateCommentStore', {
    state: () => ({
        CreateCommentFailure: "",
        CreateCommentLoading: false,
        CreateCommentgSuccess: { commentId: "" },
    }),
    getters: {
        isCreatedCommentSuccess: (state) => state.CreateCommentgSuccess.commentId !== "",


        getFailureMessage: (state) => state.CreateCommentFailure,
        getSuccessMessage: (state) => state.CreateCommentgSuccess ? "created comment successfuly!" : "",
        CreateCommentStatusMessage(state): string | null {
            if (state.CreateCommentgSuccess.commentId) {
                return 'Create comment successful!';
            } else if (state.CreateCommentLoading) {
                return 'loading...';
            } else if (state.CreateCommentFailure) {
                return `Create comment failed: ${state.CreateCommentFailure}`;
            } else {
                return null;
            }
        },
    },
    actions: {
        reset() { // Call this when you're done using the store
            this.$reset();
        },

        async CreateComment(data: CreateCommentRepository.Request) {
            this.CreateCommentLoading = true;
            const failureOrSucess = await commentRepository.createComment(data);
            failureOrSucess.fold(
                error => {
                    // ? left -> failure
                    // # failure state
                    // console.log(error.statusMessage);
                    this.CreateCommentFailure = error.statusMessage;
                    this.CreateCommentLoading = false;
                },
                (response) => {
                    // ? right -> data (success)
                    // # success state
                    this.CreateCommentgSuccess.commentId = response.commentId;

                    // this just in developement
                    setTimeout(() => {

                        this.CreateCommentLoading = false;
                    }, 2500);
                    // this.reset();
                }
            )

        }
    }
});




