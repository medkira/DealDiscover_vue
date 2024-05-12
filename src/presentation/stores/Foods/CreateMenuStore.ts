import { menuRepository } from '@/app/factory/di';
import { defineStore } from 'pinia'

export const CreateMenuStore = defineStore('CreateMenuStore', {
    state: () => ({
        CreateMenuFailure: "",
        CreateMenuLoading: false,
        CreateMenugSuccess: { MenuId: "" },
    }),
    getters: {
        isCreatedMenuSuccess: (state) => state.CreateMenugSuccess.MenuId !== "",


        getFailureMessage: (state) => state.CreateMenuFailure,
        getSuccessMessage: (state) => state.CreateMenugSuccess ? "created Menu successfuly!" : "",
        CreateMenuStatusMessage(state): string | null {
            if (state.CreateMenugSuccess.MenuId) {
                return 'Created Menu successfuly!';
            } else if (state.CreateMenuLoading) {
                return 'loading...';
            } else if (state.CreateMenuFailure) {
                return `Create Menu failed: ${state.CreateMenuFailure}`;
            } else {
                return null;
            }
        },
    },
    actions: {
        reset() { // Call this when you're done using the store
            this.$reset();
        },

        async CreateMenu(data: {
            menuImage: string | string[],
            place_id: string
        }) {
            this.CreateMenuLoading = true;
            const failureOrSucess = await menuRepository.createMenu(data);
            failureOrSucess.fold(
                error => {
                    // ? left -> failure
                    // # failure state
                    // console.log(error.statusMessage);
                    this.CreateMenuFailure = error.statusMessage;
                    this.CreateMenuLoading = false;
                },
                (response) => {
                    // ? right -> data (success)
                    // # success state
                    this.CreateMenugSuccess.MenuId = response.menuId;


                    // this just in developement
                    // setTimeout(() => {

                    this.CreateMenuLoading = false;
                    // }, 2500);
                    // this.reset();
                }
            )

        }
    }
});




