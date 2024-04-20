import { defineStore } from 'pinia';
// import AppCookie from '@/app/storage/app_cookie';
import { cookieAdapter } from '@/app/factory/di';


interface AuthenticationState {
    token: string | null;
}

export const AuthenticationStore = defineStore('AuthenticationStore', {
    state: (): AuthenticationState => ({
        token: "",
    }),
    getters: {
        isLoggedIn: (state): boolean => !!(state.token || cookieAdapter.getTokenCookie()),
    },

    actions: {
        setToken(token: string) {
            this.token = token;
            cookieAdapter.setTokenCookie(token)
        },
        logout() {
            // the problem that the state need to be updated to make the page render
            // what happening is pinia comparing token and find it token stata ="" and i make the tokn state =""
            // so for him the state didnt change and it will not rerender the component 
            // thats why i make it null here 
            // this.token = "a"; 
            this.token = null;
            cookieAdapter.removeTokenCookie()
            // Clear other stores as needed 
        },


    },
});


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