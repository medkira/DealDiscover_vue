import { defineStore } from 'pinia'
import type { Place, placeTypes } from '@/domain/entities/Place';
import { placeRepository, userRepository } from '@/app/factory/di';
import { toRaw } from 'vue';
import type { NormalUser } from '@/domain/entities/NormalUser';
import type { UserRole } from '@/domain/entities/User';

export const GetUsersStore = defineStore('GetUsersStore', {
    state: () => ({
        GetUsersFailure: "",
        GetUsersLoading: false,
        GetUsersSuccess: [] as NormalUser[],
    }),
    getters: {
        isCreatedPlaceSuccess: (state) => state.GetUsersSuccess !== null,


        getFailureMessage: (state) => state.GetUsersFailure,
        getSuccessMessage: (state) => state.GetUsersSuccess ? "created post successfuly!" : "",
        GetUsersStatusMessage(state): string | null {
            if (state.GetUsersSuccess) {
                return 'Place loaded successful!';
            } else if (state.GetUsersLoading) {
                return 'loading...';
            } else if (state.GetUsersFailure) {
                return `Places Loading failed: ${state.GetUsersFailure}`;
            } else {
                return null;
            }
        },
    },
    actions: {
        reset() { // Call this when you're done using the store
            this.$reset();
        },

        async GetUsers(data: { page?: number, role?: UserRole, isEmailVerified?: boolean }) {
            this.GetUsersLoading = true;
            const failureOrSucess = await userRepository.getUsers(data);
            failureOrSucess.fold(
                error => {
                    // ? left -> failure
                    // # failure state
                    // console.log(error.statusMessage);
                    this.GetUsersFailure = error.statusMessage;
                    this.GetUsersLoading = false;
                },
                (response) => {
                    // ? right -> data (success)
                    // # success state
                    this.GetUsersSuccess = response.data;
                    console.log(response.data)

                    // this just in developement
                    setTimeout(() => {

                        this.GetUsersLoading = false;
                    }, 2500)
                    // this.reset();
                }
            )

        }
    }
});




