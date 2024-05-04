<script setup lang="ts">
import { AuthenticationStore } from '@/presentation/stores/Auth/AuthenticationStore';
import { ref } from 'vue';
import router from '@/presentation/router';
import Menu from 'primevue/menu';
import Toast from 'primevue/toast';
import Avatar from 'primevue/avatar';
import LoginOrRegisterDialog from '@/presentation/components/LoginOrRegisterDialog.vue';
import { useToast } from 'primevue/usetoast';

const authenticationStore = AuthenticationStore(); // this need to be singleton in di
const menu = ref();

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

// const toast = useToast();
// const showSuccess = (msg: string) => { // i dont like this logic beeing handel here
//         toast.add({ severity: 'success', summary: 'Success Message', detail: msg, life: 3000, group: 'tl' });
// };


</script>

<template>

  <Toast position="top-left" group="tl" />

  <header>


    <Avatar v-if="authenticationStore.isLoggedIn" @click="toggle" icon="user_image" class=" Avatar mr-2" size="xlarge"
      shape="circle" />
    <LoginOrRegisterDialog v-else />
    <Menu ref="menu" class="overlay_menu" :model="items" :popup="true" />
  </header>

  <nav>

    <div>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/places">Places</RouterLink>
      <RouterLink to="/foods">Foods</RouterLink>
      <RouterLink to="/posts">Posts</RouterLink>

    </div>

  </nav>

  <component :is="$route.meta.layout || 'div'">
    <RouterView />
  </component>

</template>


<style scoped lang="scss">
header {
  z-index: 1;
  position: fixed;
  right: 11%;
  top: 1.7%;
}

nav {
  z-index: 1;
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
  header {
    position: fixed;
    right: 15%;
    z-index: 2;
  }


  nav {
    position: fixed;
    left: 0px;
    right: 0px;
    top: 2.1%;
  }

  nav>* {
    font-size: xx-large;
  }
}
</style>
