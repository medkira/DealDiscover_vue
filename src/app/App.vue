<script setup lang="ts">
import { AuthenticationStore } from '@/presentation/stores/Auth/AuthenticationStore';
import { onMounted, onUnmounted, ref } from 'vue';
import router from '@/presentation/router';
import Menu from 'primevue/menu';
import Toast from 'primevue/toast';
import Avatar from 'primevue/avatar';
import LoginOrRegisterDialog from '@/presentation/components/LoginOrRegisterDialog.vue';
import SearchBar from '@/presentation/components/landing/SearchBar.vue';

const authenticationStore = AuthenticationStore(); // this need to be singleton in di
const menu = ref();

const itemsAdmin = ref([
  {
    label: 'Documents',
    items: [
      {
        label: 'Add Place',
        icon: 'pi pi-plus',
        command: () => {
          router.push({ name: 'placeAdd' })
        }
      },
      {
        label: 'Favourit Places',
        icon: 'pi pi-heart',
        command: () => {
          router.push({ name: 'favourites' })
        }
      }
    ]
  },
  {
    label: 'Profile',
    items: [
      {
        label: 'Settings',
        icon: 'pi pi-cog',
        command: () => {
          router.push({ name: 'settings' })
        }

      },
      {
        label: 'Logout',
        icon: 'pi pi-sign-out',
        command: () => {

          logOut()

        }
      }
    ]
  },
  {
    label: 'Admin',
    items: [
      {
        label: 'DashBoard',
        icon: 'pi pi-book',
        command: () => {
          router.push({ name: 'admin' })

        }
      }
    ]
  }
]);

const itemsUser = ref([
  {
    label: 'Documents',
    items: [
      {
        label: 'Add Place',
        icon: 'pi pi-plus',
        command: () => {
          router.push({ name: 'placeAdd' })
        }
      },

      {
        label: 'Favourit Places',
        icon: 'pi pi-heart',
        command: () => {
          router.push({ name: 'favourites' })
        }
      }
    ]
  },
  {
    label: 'Profile',
    items: [
      {
        label: 'Settings',
        icon: 'pi pi-cog',
        command: () => {
          router.push({ name: 'settings' })
        }

      },
      {
        label: 'Logout',
        icon: 'pi pi-sign-out',
        command: () => {
          logOut();


        }
      }
    ]
  }
]);

const itemsOwner = ref([
  {
    label: 'Documents',
    items: [
      {
        label: 'Add Place',
        icon: 'pi pi-plus',
        command: () => {
          router.push({ name: 'placeAdd' })
        }
      },

      {
        label: 'Favourit Places',
        icon: 'pi pi-heart',
        command: () => {
          router.push({ name: 'favourites' })
        }
      }
    ]
  },
  {
    label: 'Profile',
    items: [
      {
        label: 'Settings',
        icon: 'pi pi-cog',
        command: () => {
          router.push({ name: 'settings' })
        }

      },
      {
        label: 'Logout',
        icon: 'pi pi-sign-out',
        command: () => {
          logOut()
          // const role = ref();
          // role.value = cookieAdapter.getRoleFromToken();
          // if (role.value === 'admin') {
          //   items.value.pop()
          // }

        }
      }
    ]
  },
  {
    label: 'Owner',
    items: [
      {
        label: 'DashBoard',
        icon: 'pi pi-book',
        command: () => {
          router.push({ path: '/owner/placesManagement' })

        }
      }
    ]
  }
]);


const logOut = () => {
  authenticationStore.logout();
  router.push({ name: 'home', replace: true });

}
const toggle = (event: any) => {
  menu.value.toggle(event);
};

// const toast = useToast();
// const showSuccess = (msg: string) => { // i dont like this logic beeing handel here
//         toast.add({ severity: 'success', summary: 'Success Message', detail: msg, life: 3000, group: 'tl' });
// };

// onMounted(() => {
//   const resetValues = () => {
//     items.value.pop()
//   };
//   resetValues()
// })
authenticationStore.isAdmin();
authenticationStore.isOwner();



///* STYLE SCROLL *//
const searchBarVisible = ref(false);
const scrollThreshold = 480;

const handleScroll = () => {
  searchBarVisible.value = window.scrollY > scrollThreshold;
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<template>

  <Toast position="top-left" group="tl" />

  <header>
    <div class="searchBarContainer">

      <SearchBar v-if="searchBarVisible" />
    </div>

    <div v-if="authenticationStore.isLoggedIn">
      <Avatar @click="toggle" icon="user_image" class=" Avatar mr-2 " size="xlarge" shape="circle" />
    </div>


    <LoginOrRegisterDialog v-else />
    <Menu v-if="authenticationStore.isadmin" ref="menu" class="overlay_menu" :model="itemsAdmin" :popup="true" />
    <Menu v-else-if="authenticationStore.isowner" ref="menu" class="overlay_menu" :model="itemsOwner" :popup="true" />
    <Menu v-else ref="menu" class="overlay_menu" :model="itemsUser" :popup="true" />

    <RouterLink to="/">
      <img class="logo" src="/src/presentation/resources/images/Logo.png" alt="">
    </RouterLink>

  </header>

  <nav>
    <div>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/places">Places</RouterLink>
      <RouterLink to="/foods">Foods</RouterLink>
      <RouterLink to="/posts">Posts</RouterLink>
    </div>

  </nav>

  <component class="main" :is="$route.meta.layout || 'div'">
    <RouterView />
  </component>

</template>


<style scoped lang="scss">
.logo {
  height: 4.9rem;
  z-index: 1;
  position: fixed;

  left: 11%;
  z-index: 5;
  top: 1rem;

}

@media (max-width: 1024px) {
  .logo {
    height: 3.5rem;
    left: 14.5%;
  }

  header {
    margin-top: -5px;
    margin-right: -7px;
  }

  .LoginOrRegisterDialog {
    transform: scale(0.9);
    background-color: #bed9e5;
  }
}

@media (min-width: 1024px) {
  .main>* {
    margin-left: 10rem;
    margin-right: 10rem;
  }

  a:nth-child(1) {
    margin-left: 5rem;
  }

}

.searchBarContainer {
  //   opacity: 0;
  display: none;
  z-index: 10;
}

header {
  z-index: 1;
  position: fixed;
  right: 11%;
  top: 1.7%;
}

nav {
  z-index: 4;
  font-size: 31px;
  text-align: center;
  /* margin-top: 2rem; */
  position: fixed;
  left: 0;
  right: 0;
  top: 10%;
  pointer-events: none;

  div {
    padding: 5px 25px 5px 25px;
    background: rgba(255, 255, 255, 0.2);
    border-radius: 50px;
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(5px);
    -webkit-backdrop-filter: blur(5px);
    border: 1px solid rgba(255, 255, 255, 0.3);
    pointer-events: all;
    color: #bed9e5;

  }

  a {
    margin: 5px;
  }



}



nav>* {

  display: inline-block;
  padding: 0 1rem;
  font-size: x-large;
}



@media (min-width: 1024px) {

  .searchBarContainer {
    // opacity: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    // right: 7em;
    left: 19rem;
    right: 0rem;
    z-index: 2;
    top: -0.95rem;
    // padding: 5rem;
    // background-color: red;
    // height: 50px;
    transform: scale(0.5);
    // width: 100%;

    section {
      // background-color: aliceblue;
      width: 100%;

      // div {
      //   // border-radius: 1px;

      // }
    }
  }

  header {
    position: fixed;
    right: 9rem;
    z-index: 5;
    top: 1.6rem;

    div {
      // background-color: #bed9e5;
      position: fixed;
      right: 12rem;
      top: 1.4rem;

    }
  }


  nav {
    position: fixed;
    left: 11.5rem;
    right: 11.5rem;
    // top: 0rem;
    top: 1rem;
    // background-color: red;
    transform: scale(0.8);

    div {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      gap: 1rem;

      a {
        padding: 0.2rem;
        font-size: xx-large;
        font-weight: bold;
      }
    }
  }

  nav>* {
    font-size: xx-large;
  }
}
</style>