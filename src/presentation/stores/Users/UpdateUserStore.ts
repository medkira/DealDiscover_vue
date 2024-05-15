import { userRepository } from '@/app/factory/di';
import { defineStore } from 'pinia'

export const UpdateUserStore = defineStore('UpdateUserStore', {
    state: () => ({
        UpdateUserFailure: "",
        UpdateUserLoading: false,
        UpdateUsergSuccess: { UserId: "" },
    }),
    getters: {
        isUpdatedUserSuccess: (state) => state.UpdateUsergSuccess.UserId !== "",


        getFailureMessage: (state) => state.UpdateUserFailure,
        getSuccessMessage: (state) => state.UpdateUsergSuccess ? "created User successfuly!" : "",
        UpdateUserStatusMessage(state): string | null {
            if (state.UpdateUsergSuccess.UserId) {
                return 'Update User successful!';
            } else if (state.UpdateUserLoading) {
                return 'loading...';
            } else if (state.UpdateUserFailure) {
                return `Update User failed: ${state.UpdateUserFailure}`;
            } else {
                return null;
            }
        },
    },
    actions: {
        reset() { // Call this when you're done using the store
            this.$reset();
        },

        async UpdateUser(data: {
            image?: File;
            username: string;
            email: string;
            salary: string;
            phoneNumber: string;
            firstName: string;
            lastName: string;
            country: string;
            socialStatus: string;
            address: string;
            jobTitle: string;
            profileImage: string;
        }) {
            this.UpdateUserLoading = true;
            const failureOrSucess = await userRepository.updateUser(data);
            failureOrSucess.fold(
                error => {
                    // ? left -> failure
                    // # failure state
                    // console.log(error.statusMessage);
                    this.UpdateUserFailure = error.statusMessage;
                    this.UpdateUserLoading = false;
                },
                (response) => {
                    // ? right -> data (success)
                    // # success state
                    this.UpdateUsergSuccess.UserId = response.id;


                    // this just in developement
                    // setTimeout(() => {

                    this.UpdateUserLoading = false;
                    // }, 2500);
                    // this.reset();
                }
            )

        }
    }
});




