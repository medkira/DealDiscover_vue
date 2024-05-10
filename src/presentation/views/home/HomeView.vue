<script setup lang="ts">
import { placeTypes } from '@/domain/entities/Place';
import RobotDiscover from '@/presentation/components/animation/RobotDiscover.vue';
import GallariaImages from '@/presentation/components/image-container/GallariaImages.vue';
import CrouselCards from '@/presentation/components/landing/CrouselCrads.vue'
import SliderCards from '@/presentation/components/landing/SliderCards.vue';
import { GetLatestsPlacesStore } from '@/presentation/stores/Places/GetLatestPlacesStore';
import { ref } from 'vue';

// const items = ref([{ message: 'Foo' }, { message: 'Bar' }, { message: 'Foo' }])
// const items = ref([{ message: 'Foo' }, { message: 'Bar' }, { message: 'Foo' }, { message: 'Foo' }, { message: 'Bar' }, { message: 'Foo' }])


const dataBeach = ref();
const dataHotel = ref();
// let data: any;
const getPlacesStore = GetLatestsPlacesStore();

const fetchData = async () => {
  await getPlacesStore.GetLatestPlaces({ page: 1, type: placeTypes.beach })
  dataBeach.value = getPlacesStore.GetLatestPlacesSuccess;
  await getPlacesStore.GetLatestPlaces({ page: 1, type: placeTypes.hotel })
  dataHotel.value = getPlacesStore.GetLatestPlacesSuccess;
  // console.log("from place ", dataHotel.value);

};
fetchData();

// console.log("hi")
</script>









<template>
  <main>
    <!-- <div class="titles">
      <div class="font">
        <h2 class="title">Time To <span class="highlight">Discover</span></h2>
        <h3 class="subtitle">Let The Chat <span class="highlight">Choose</span> For You</h3>
      </div>
    </div> -->

    <!-- data-aos-anchor-placement="center-center" -->

    <div class="image-container" data-aos="fade-up" data-aos-duration="2500" data-aos-once="true"
      data-aos-easing="ease-out-cubic">
      <GallariaImages />
    </div>

    <!-- <div class="image-container" data-aos="fade-up" data-aos-duration="2500" data-aos-once="true"
      data-aos-easing="ease-out-cubic">

      <div class="images-container">

        <img        <SliderCards title="Foods for you" sub-title="Use ChatBot for Personalized Recommendations" :data=[] />

          src="https://images.unsplash.com/photo-1527915676329-fd5ec8a12d4b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80"
          alt="" />

        <img
          src="https://images.unsplash.com/photo-1486299267070-83823f5448dd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80"
          alt="" />
        <img src="/src/presentation/resources/images/photoElJam.jpg" alt="" />

      </div>

    </div> -->
    <div style=" width: 100%; height: 50px"></div>
    <CrouselCards title="Best Beaches" sub-title="" :data=dataBeach />

    <!-- <SliderCards title="Best Restaurants" sub-title="" :data=[] /> -->

    <CrouselCards title="Top Hotels for your next vacation" sub-title="" :data=dataHotel />
  </main>
</template>

<style scoped lang="scss">
@media (max-width: 1024px) {
  .titles {
    margin-top: 20%;
  }



}



main {
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 25px;
  overflow: visible;

}



img {
  object-fit: cover;
  display: block;
  // width: 1140px;
  width: 500px !important;
  border-radius: 20px;
  position: relative;
  cursor: pointer;
  transition:
    transform 0.41s ease-in-out;

}

// @media (max-width: 1024px) {
//   .images-container {
//     height: 50;
//   }
// }


// .images-container {
//   display: flex;
//   flex-direction: column;
//   overflow: hidden;

//   img:nth-child(1) {
//     width: 500px;
//     position: absolute;
//     right: 13%;
//     top: 8%;
//     rotate: 10deg;

//   }

//   img:nth-child(2) {

//     width: 500px;
//     position: absolute;
//     right: 22%;
//     top: 49%;
//     rotate: -5deg;
//   }

//   img:nth-child(3) {

//     width: 500px;
//     position: absolute;
//     // right: 24%;
//     left: 26%;
//     top: 15%;
//     rotate: -3deg;
//   }
// }

.image-container {
  // padding: 2rem;
  // position: relative;
  // background-color: #88a2bb;
  height: 700px;
  width: 100%;

  margin-top: 50px;

}



.image-container:hover img {
  transform: scale(1.04);
}

@media (min-width: 1024px) {
  .image-container {
    margin-bottom: 60px;

  }
}

@media (max-width: 600px) {

  .image-container {
    // padding: 20px;

    img {

      width: 100%;
      height: 100%;
    }

    .text {
      font-size: x-large;
    }
  }
}

.text {
  z-index: 2;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 2.3rem;
  font-weight: bold;
  color: #fff;
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 1px;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);

  transition:
    transform 0.41s ease-in-out;
}






.titles {
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding-top: 7%;
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



.container {
  position: relative;
  background: linear-gradient(135deg, rgb(179, 208, 253) 0%, rgb(164, 202, 248) 100%);
  border-radius: 1000px;
  padding: 10px;
  display: grid;
  place-content: center;
  z-index: 0;
  max-width: 300px;
  margin: 0 10px;
}

.input {
  padding: 10px;
  width: 100%;
  background: linear-gradient(135deg, rgb(218, 232, 247) 0%, rgb(214, 229, 247) 100%);
  border: none;
  color: #9EBCD9;
  font-size: 20px;
  border-radius: 50px;
}

.input:focus {
  outline: none;
  background: linear-gradient(135deg, rgb(239, 247, 255) 0%, rgb(214, 229, 247) 100%);
}
</style>

<!--
// .more-explore {
// padding: 37px;
// background-color: rgb(#f6f6f6, 0.17);
// width: 100%;
// display: flex;
// flex-direction: row;
// overflow: scroll;


// div {
// background-color: #243c54;
// margin: 10px;
// padding: 0 275px;
// height: 300px;
// border-radius: 20px;
// }
// }

// @media (max-width: 1024px) {
// .more-explore {
// div {
// padding: 0 150px;
// height: 150px;
// }
// }
// } -->