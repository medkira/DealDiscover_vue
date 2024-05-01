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
            // console.log("TO RESULT, ", to)
            const publicRoutes = ['home', 'places', 'foods', 'place'];
            if (!isAuthenticated && !publicRoutes.includes(to.name as string)) {
                // if (!isAuthenticated && to.name !== 'home') {

                // Redirect the user to the login page if not authenticated
                return { name: 'home' }
            }

            // ! example mta3 infinite loop rour !!!
            // else if (isAuthenticated && to.name === 'home') {
            //     console.log("HI HOME")
            //     // Redirect the user to the home page if  authenticated
            //     return { name: 'home' }
            // }
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

