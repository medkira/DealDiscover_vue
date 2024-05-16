<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import LoginOrRegisterDialog from '@/presentation/components/LoginOrRegisterDialog.vue';
import Avatar from 'primevue/avatar';
import Toast from 'primevue/toast';
import { AuthenticationStore } from '@/presentation/stores/Auth/AuthenticationStore';
import SearchBar from '@/presentation/components/landing/SearchBar.vue';
import RobotDiscover from '@/presentation/components/animation/RobotDiscover.vue';
import Menu from 'primevue/menu';

import { ref } from "vue";
import router from '@/presentation/router';
import FooterCard from '@/presentation/components/landing/footerCard.vue';
import ChatDialog from '@/presentation/components/chatBot/components/ChatDialog.vue';

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

import Image from 'primevue/image';
const showChatDialog = ref(false)
const position = ref<any>('center');

const openPosition = (pos: any) => {
  position.value = pos;
  showChatDialog.value = true;
}
</script>

<template>
  <!-- <Toast position="top-left" group="tl" />
  <header>


    <Avatar v-if="authenticationStore.isLoggedIn" @click="toggle" icon="user_image" class=" Avatar mr-2" size="xlarge"
      shape="circle" />
    <LoginOrRegisterDialog v-else />
    <Menu ref="menu" class="overlay_menu" :model="items" :popup="true" />
  </header> -->
  <main>

    <!-- <nav>
      <div>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/places">Places</RouterLink>
        <RouterLink to="/foods">Foods</RouterLink>
        <RouterLink to="/posts">Posts</RouterLink>

      </div>

    </nav> -->
    <div class="titles">
      <div class="font">
        <h2 class="title">Time To <span class="highlight">Discover</span></h2>
        <h3 class="subtitle">Let The Chat <span class="highlight">Choose</span> For You</h3>
      </div>
    </div>
    <SearchBar />

    <!-- <RouterView /> -->
    <slot />

    <RobotDiscover class="robot" @openDialog="openPosition('bottomright')" />
    <ChatDialog :is-visible="showChatDialog" :position="position" :convId="'1'" :convName="'test'"
      @update:visible="() => (showChatDialog = false)" />
    <FooterCard />
  </main>
</template>


<style scoped lang="scss">
.robot {
  // width: 1140px;
  height: 300px;
  position: fixed;
  bottom: 0%;
  left: -10%; // problem

  transform: scale(0.9);
}

@media (max-width: 1024px) {
  .robot {
    // background-color: #243c54;
    // width: 1140px;
    // height: 100%;

    position: fixed;
    bottom: -9%;
    left: -29%;
    // background-color: red;
    transform: scale(0.5);
  }
}

.titles {
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding-top: 7%;
  z-index: 1;
}

.font {
  font-size: 60px;
  font-weight: 400;
  font-style: normal;
}

.subtitle {
  font-weight: bold;
  color: #f6f6f6;
  margin-bottom: 1rem;
}

.title {
  font-weight: bold;
  color: #f6f6f6;
  padding-right: 55px;
}

.highlight {
  color: #243c54;
  font-weight: bold;
}


@media (max-width: 1024px) {
  .titles {
    margin-top: 26%;
  }

  .font {
    padding: 1rem;
    font-size: 50px;
  }

}












.logo {
  display: block;
  margin: 0 auto 2rem;
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




// header {
//   z-index: 1;
//   position: fixed;
//   right: 11%;
//   top: 1.7%;
// }

// nav {
//   z-index: 1;
//   font-size: 31px;
//   text-align: center;
//   /* margin-top: 2rem; */
//   position: fixed;
//   left: 0;
//   right: 0;
//   top: 10%;



//   div {
//     padding: 5px 35px 5px 40px;
//     background: rgba(255, 255, 255, 0.2);
//     border-radius: 50px;
//     box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
//     backdrop-filter: blur(5px);
//     -webkit-backdrop-filter: blur(5px);
//     border: 1px solid rgba(255, 255, 255, 0.3);
//   }

//   a {
//     margin: 5px;
//   }

// }



// nav>* {

//   display: inline-block;
//   padding: 0 1rem;
//   font-size: x-large;
// }


// @media (min-width: 1024px) {
//   header {
//     position: fixed;
//     right: 15%;
//     z-index: 2;
//   }


//   nav {
//     position: fixed;
//     left: 0px;
//     right: 0px;
//     top: 2.1%;
//   }

//   nav>* {
//     font-size: xx-large;
//   }

//   /* .logo {
//     margin: 0 2rem 0 0;
//   } */

//   /* header .wrapper {
//     display: flex;
//     place-items: flex-start;
//     flex-wrap: wrap;
//   } */
//   /* 
//   nav {
//     text-align: left;
//     margin-left: -1rem;
//     font-size: 1rem;

//     padding: 1rem 0;
//     margin-top: 1rem;
//   } */
// }</style>























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