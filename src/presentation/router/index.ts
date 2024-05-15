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
// import DashBoard from '../views/admin/DashBoard.vue';
import UsersManagements from '../views/admin/UsersManagements.vue';
import OwnerLayout from '../views/owner/layout/ownerLayout.vue';

import OwnerPlacesMangement from '../views/owner/OwnerPlacesMangement.vue';
import FavouritePlacesView from '../views/favourites/FavouritePlacesView.vue';
import ChatBotView from '../views/chatBot/ChatBotView.vue';
import OwnerMenuManagement from '../views/owner/OwnerMenuManagement.vue';
import ProfileManagement from '../views/settings/ProfileManagement.vue';
import SettingsLayout from '../views/settings/layout/settingsLayout.vue';
import ActivityLogs from '../views/settings/ActivityLogs.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      alias: '/home',
      meta: { layout: LandingLayout } // Set layout for home route
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView,
      meta: { layout: LandingLayout } // Set layout for about route
    },
    {
      path: '/places',
      name: 'places',
      component: PlacesView,
      meta: { layout: LandingLayout } // Set layout for places route
    },
    {
      path: '/foods',
      name: 'foods',
      component: FoodsView,
      meta: { layout: LandingLayout } // Set layout for foods route
    },
    {
      path: '/posts',
      name: 'posts',
      component: PostView,
      meta: { layout: LandingLayout } // Set layout for posts route
    },
    {
      path: '/place/:id',
      name: 'place',
      component: CommunView
    },
    {
      path: '/place/add',
      name: 'placeAdd',
      component: AddPlaceView
    },
    {
      path: '/favourites',
      name: 'favourites',
      component: FavouritePlacesView
    },
    {
      path: '/chatBot',
      name: 'chatBot',
      component: ChatBotView
    },
    {
      path: '/settings',
      name: 'settings',
      meta: { layout: SettingsLayout },
      children: [
        {
          path: 'profileManagement',
          name: 'profileManagement',
          component: ProfileManagement
        },
        {
          path: 'ActivityLogs',
          name: 'ActivityLogs',
          component: ActivityLogs,
        }
      ]

    }
    ,
    // Admin routes
    {
      path: '/admin',
      name: 'admin',
      // component: DashBoard,
      meta: { layout: AdminLayout },
      children: [
        {
          path: 'imageContributions',
          name: 'imageContributions',
          component: ImageContributions
        },
        {
          path: 'adminPlacesManagement',
          name: 'adminPlacesManagement',
          component: PlacesMangement
        },
        {
          path: 'usersManagement',
          name: 'usersManagement',
          component: UsersManagements
        },
        // Add more admin child routes here
      ]
    },

    // Owner routes (assuming similar structure as admin)
    {
      path: '/owner',
      name: 'owner',
      // component: DashBoard,
      meta: { layout: OwnerLayout },
      children: [
        // Add owner child routes here
        {
          path: 'placesManagement',
          name: 'placesManagement',
          component: OwnerPlacesMangement
        },
        {
          path: 'menusManagement',
          name: 'menusManagement',
          component: OwnerMenuManagement
        }
      ]
    }
  ]
});

// Optional: Authentication guard (replace with your logic)
// router.beforeEach((to, from, next) => {
//   // Implement authentication logic and redirect if necessary
//   next();
// });

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