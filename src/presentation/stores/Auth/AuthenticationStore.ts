import { defineStore } from 'pinia';
import AppCookie from '@/app/storage/app_cookie';
import { cookieAdapter } from '@/app/factory/di';

export const AuthenticationStore = defineStore('AuthenticationStore', {
    state: () => ({
        token: "",
    }),
    getters: {
        // isLoggedIn: (state) => !!state.token,
        isLoggedIn: (state): boolean => !!(state.token || cookieAdapter.getTokenCookie()),
        // {
        //     // console.log("i am working")
        //     const cookieToken = new AppCookie().getTokenCookie();
        //     // // console.log("cookieToken: ", cookieToken)
        //     // // console.log("state TOKEN", state.token)
        //     // // console.log("return ", (cookieToken || state.token))
        //     // // const test = !!(cookieToken || state.token)
        //     return !!(state.token || cookieToken);

        // }, :) ................


        // isLoggedIn: (state) => {
        //     console.log("i am working")
        //     const cookieToken = new AppCookie().getTokenCookie();
        //     // console.log("cookieToken: ", cookieToken)
        //     // console.log("state TOKEN", state.token)
        //     // console.log("return ", (cookieToken || state.token))
        //     // const test = !!(cookieToken || state.token)
        // this will work fine when state get updated 
        //     return !!(state.token || cookieToken); 

        // this will not work , even the function isLoggedIn will not get called
        //     return !!(cookieToken || state.token); 

        // },


    },
    actions: {
        setToken(token: string) {
            this.token = token;
            cookieAdapter.setTokenCookie(token)
            // new AppCookie().setTokenCookie(token);
        },
        logout() {
            this.token = "";
            cookieAdapter.removeTokenCookie()
            // new AppCookie().removeTokenCookie();
            // Clear other stores as needed 
        },


    },
});
