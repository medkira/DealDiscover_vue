<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import LoginOrRegisterDialog from '@/presentation/components/LoginOrRegisterDialog.vue'
import Avatar from 'primevue/avatar';
import Toast from 'primevue/toast';
import { AuthenticationStore } from '@/presentation/stores/Auth/AuthenticationStore';
import OverlayPanel from 'primevue/overlaypanel';
import Button from 'primevue/button';
import Menu from 'primevue/menu';

import { ref } from "vue";
import router from '@/presentation/router';

const menu = ref();
const authenticationStore = AuthenticationStore(); // this need to be singleton in di
const items = ref([
  {
    label: 'Documents',
    items: [
      {
        label: 'New',
        icon: 'pi pi-plus'
      },
      {
        label: 'Search',
        icon: 'pi pi-search'
      }
    ]
  },
  {
    label: 'Profile',
    items: [
      {
        label: 'Settings',
        icon: 'pi pi-cog'
      },
      {
        label: 'Logout',
        icon: 'pi pi-sign-out',
        command: () => {
          authenticationStore.logout();
          router.push({ name: 'home', replace: true });

        }
      }
    ]
  }
]);
const toggle = (event: any) => {
  menu.value.toggle(event);
};


</script>

<template>

  <Toast position="top-left" group="tl" />
  <header>
    <Avatar v-if="authenticationStore.isLoggedIn" @click="toggle" icon="user_image" class="mr-2" size="xlarge"
      shape="circle" />
    <LoginOrRegisterDialog v-else />



    <!-- <div class="card flex justify-center align-middle bg-white"> -->
    <Menu ref="menu" class="overlay_menu" :model="items" :popup="true" />
    <!-- </div> -->
  </header>
  <main>
    <nav>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/about">About</RouterLink>
      <RouterLink to="/places">places</RouterLink>
      <RouterLink to="/foods">foods</RouterLink>
    </nav>

    <RouterView />

  </main>
</template>










<style scoped>
header {
  display: flex;
  justify-content: end;
  align-items: center;
}

.test {
  background-color: red;
}

header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 31px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}


.tooltip::before {
  position: absolute;
  content: "";
  height: 0.6em;
  width: 0.6em;
  bottom: -0.2em;
  left: 50%;
  transform: translate(-50%) rotate(45deg);
  background-color: rgb(255, 255, 255);
}

/* @media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
} */
</style>
<!-- 
    <div class="card flex justify-center">
      <Button label="Show" icon="pi pi-external-link" @click="visible = true" color="" />

      <Dialog v-model:visible="visible" modal header="Header" :style="{ width: '50rem' }"
        :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
          consequat.
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
          Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>
      </Dialog>
    </div> -->




<!-- 

    <div class="m-10 flex rounded-lg overflow-hidden bg-gray-800 shadow-md w-full max-w-md mx-auto">
      <input type="search" name="search" id="search"
        class="flex-grow px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 rounded-l-lg text-gray-300 bg-transparent placeholder-gray-500"
        placeholder="Search">
      <button type="submit"
        class="px-4 py-3 text-white font-medium bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white rounded-r-lg">
        Search
      </button>

    </div> -->