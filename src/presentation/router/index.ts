import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/presentation/views/home/HomeView.vue'
import AboutView from '../views/about/AboutView.vue'
import PlacesView from '../views/places/PlacesView.vue';
// import LoginView from '@/presentation/views/login/View/LoginView.vue'
// import LandingLayout from '@/presentation/views/landing/LandingLayout.vue';

// import AppCookie from '@/app/storage/app_cookie'
import RouterGuard from './Guard/routerGuards';
import FoodsView from '../views/foods/FoodsView.vue';
import PostView from '../views/posts/PostView.vue';
import CommunView from '../views/communViews/CommunView.vue';
import LandingLayout from '../layouts/landing/LandingLayout.vue'; import AddPlaceView from '../views/AddPlace/AddPlaceView.vue';
'../views/landing/LandingLayout.vue';
// import LoginOrRegisterDialog from '../components/LoginOrRegisterDialog.vue';

import ImageContributions from '../views/admin/ImageContributions.vue';
import AdminLayout from '../views/admin/Layout/AdminLayout.vue';
import PlacesMangement from '../views/admin/PlacesMangement.vue';
import DashBoard from '../views/admin/DashBoard.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/about',
      name: 'about',
      component: AboutView
    },

    {
      path: '/places',
      name: 'places',
      component: PlacesView,
      meta: { layout: LandingLayout }

      // children: [
      //   {
      //     path: 'place/:id',
      //     name: 'place',
      //     component: CommunView,
      //   }
      // ]

    },
    {
      path: '/foods',
      name: 'foods',
      component: FoodsView,
      meta: { layout: LandingLayout }

    },

    {
      path: '/posts',
      name: 'posts',
      component: PostView,
      meta: { layout: LandingLayout }

    },



    {
      path: '/place/:id',
      name: 'place',
      component: CommunView,

    },
    {
      path: '/place/add',
      name: 'placeAdd',
      component: AddPlaceView,

    },
    {
      path: '/',
      name: 'home',
      component: HomeView,
      alias: '/home',

      meta: { layout: LandingLayout }

    },
    {
      path: '/admin',
      name: 'admin',
      meta: { layout: AdminLayout },

      component: DashBoard
    },
    {
      path: '/ImageContributions',
      name: 'ImageContributions',
      component: ImageContributions,
      meta: { layout: AdminLayout }

    },
    {
      path: '/placesManagement',
      name: 'placesManagement',
      component: PlacesMangement,
      meta: { layout: AdminLayout }

    }
  ]
});

export default router



new RouterGuard();














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