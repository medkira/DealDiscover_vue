import AppCookie from '@/app/storage/app_cookie';
import router from '@/presentation/router';

export default class RouterGuard {
    constructor() {
        this.setAuthGuard();
    }

    private setAuthGuard() {
        router.beforeEach(async (to, from) => {
            const cookieAdapter = new AppCookie();
            const isAuthenticated = cookieAdapter.getTokenCookie();
            if (!isAuthenticated && to.name !== 'home') {
                // Redirect the user to the login page if not authenticated
                return { name: 'home' }
            } else if (isAuthenticated && to.name === 'home') {
                // Redirect the user to the home page if  authenticated
                return { name: 'home' }
            }
        });
    }
}





















// import AppCookie from '@/app/storage/app_cookie';
// import router from '@/presentation/router'

// export default class RouterGuard {
//     constructor() { }


//     public setAuthGuard = () => {
//         router.beforeEach(async (to, from) => {

//             const cookieAdapter = new AppCookie();
//             const isAuthenticated = cookieAdapter.getTokenCookie();
//             if (
//                 // make sure the user is authenticated
//                 !isAuthenticated &&
//                 // ❗️ Avoid an infinite redirect
//                 to.name !== 'login'
//             ) {
//                 // redirect the user to the login page
//                 return { name: 'login' }
//             }
//         })
//     }

// }

