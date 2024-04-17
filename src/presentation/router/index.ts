import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/presentation/views/home/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import PlacesView from '../views/places/PlacesView.vue'
import LandingView from '@/presentation/views/landing/LandingView.vue'
import LatestPlace from '../components/LatestPlace.vue'
// import LoginView from '@/presentation/views/login/View/LoginView.vue'
// import LandingView from '@/presentation/views/landing/LandingView.vue';

// import AppCookie from '@/app/storage/app_cookie'
import RouterGuard from './Guard/routerGuards'
// import LoginOrRegisterDialog from '../components/LoginOrRegisterDialog.vue';
import DefaultLayout from '../layout/DefaultLayout.vue'
import PostsView from '../components/PostsView.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/Places',
      name: 'Places',
      component: LatestPlace,
      meta: {
        layout: DefaultLayout
      }
    },
    {
      path: '/Posts',
      name: 'Posts',
      component: PostsView,
      meta: {
        layout: DefaultLayout
      }
    },
    // {
    //   path: '/Foods',
    //   name: 'Foods',
    //   component: AboutView,
    //   meta: {
    //     layout: DefaultLayout
    //   }
    // },
    {
      path: '/',
      name: 'landing',
      component: LandingView,
      meta: {
        layout: DefaultLayout
      }
    },

    // {
    //   path: '/auth',
    //   name: 'auth',
    //   // component: HomeView,
    //   children: [
    //     {
    //       path: 'login',
    //       name: 'login',
    //       component: LoginOrRegisterDialog
    //     },
    //     {
    //       path: 'register',
    //       name: 'register',
    //       component: AboutView
    //     },
    //   ]
    // },
    {
      path: '/place/:id',
      name: 'place',
      component: PlacesView
    }

    // {
    //   path: '/',
    //   name: 'home',
    //   component: HomeView,
    //   alias: '/home',
    // children: [
    //   {
    //     path: 'places',
    //     name: 'places',
    //     component: PlacesView,
    //   },

    //   {
    //     path: 'foods',
    //     name: 'foods',
    //     component: FoodsView,
    //   }
    // ]
    // },
  ]
})

export default router

// new RouterGuard();

// router.beforeEach((to, from, next) => {
//   if (to.name !== 'login' && !isAuthenticated) next({ name: 'login' })
//   else next()
// })

// {
//   path: '/about',
//   name: 'about',
//   // route level code-splitting
//   // this generates a separate chunk (About.[hash].js) for this route
//   // which is lazy-loaded when the route is visited.
//   component: () => import('../views/AboutView.vue')
// }
