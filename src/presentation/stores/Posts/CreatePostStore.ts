import { defineStore } from 'pinia'
import { postRepository } from '@/app/factory/di';
import type { postType } from '@/domain/entities/Post';

export const CreatePostStore = defineStore('CreatePostStore', {
    state: () => ({
        CreatePostFailure: "",
        CreatePostLoading: false,
        CreatePostgSuccess: { postId: "" },
    }),
    getters: {
        isCreatedPostSuccess: (state) => state.CreatePostgSuccess.postId !== "",


        getFailureMessage: (state) => state.CreatePostFailure,
        getSuccessMessage: (state) => state.CreatePostgSuccess ? "created post successfuly!" : "",
        CreatePostStatusMessage(state): string | null {
            if (state.CreatePostgSuccess.postId) {
                return 'Create post successful!';
            } else if (state.CreatePostLoading) {
                return 'loading...';
            } else if (state.CreatePostFailure) {
                return `Create post failed: ${state.CreatePostFailure}`;
            } else {
                return null;
            }
        },
    },
    actions: {
        reset() { // Call this when you're done using the store
            this.$reset();
        },

        async CreatePost(data: { content: string, post_type: postType, postImage: File[], rate: number }) {
            this.CreatePostLoading = true;
            const failureOrSucess = await postRepository.createPost(data);
            failureOrSucess.fold(
                error => {
                    // ? left -> failure
                    // # failure state
                    // console.log(error.statusMessage);
                    this.CreatePostFailure = error.statusMessage;
                    this.CreatePostLoading = false;
                },
                (response) => {
                    // ? right -> data (success)
                    // # success state
                    this.CreatePostgSuccess.postId = response.postId;


                    // this just in developement
                    setTimeout(() => {

                        this.CreatePostLoading = false;
                    }, 2500);
                    // this.reset();
                }
            )

        }
    }
});




