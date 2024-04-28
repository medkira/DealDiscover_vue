import { defineStore } from 'pinia'
import { postRepository } from '@/app/factory/di';
import { Post, type postType } from '@/domain/entities/Post';

export const GetLatestsPostsStore = defineStore('GetLatestsPostsStore', {
    state: () => ({
        GetLatestPostsFailure: "",
        GetLatestPostsLoading: false,
        GetLatestPostsSuccess: [] as Post[],
    }),
    getters: {
        isCreatedPostSuccess: (state) => state.GetLatestPostsSuccess !== null,


        getFailureMessage: (state) => state.GetLatestPostsFailure,
        getSuccessMessage: (state) => state.GetLatestPostsSuccess ? "created post successfuly!" : "",
        GetLatestPostsStatusMessage(state): string | null {
            if (state.GetLatestPostsSuccess) {
                return 'Post loaded successful!';
            } else if (state.GetLatestPostsLoading) {
                return 'loading...';
            } else if (state.GetLatestPostsFailure) {
                return `Posts Loading failed: ${state.GetLatestPostsFailure}`;
            } else {
                return null;
            }
        },
    },
    actions: {
        reset() { // Call this when you're done using the store
            this.$reset();
        },

        async GetLatestPosts(data: { page?: number, type?: postType, title?: string }) {
            this.GetLatestPostsLoading = true;
            const failureOrSucess = await postRepository.getPosts(data);
            failureOrSucess.fold(
                error => {
                    // ? left -> failure
                    // # failure state
                    // console.log(error.statusMessage);
                    this.GetLatestPostsFailure = error.statusMessage;
                    this.GetLatestPostsLoading = false;
                },
                (response) => {
                    // ? right -> data (success)
                    // # success state
                    this.GetLatestPostsSuccess = response.data;


                    // this just in developement
                    setTimeout(() => {

                        this.GetLatestPostsLoading = false;
                    }, 2500)
                    // this.reset();
                }
            )

        }
    }
});




