<script setup lang="ts">
const cities = [
    {
        name: 'bizerte',
        description: 'Beach',
        imageUrl: "/images/image1.jpg",
        rating: 4.5
    },
    {
        name: 'Sidi bou said',
        description: 'Beach',
        imageUrl: "/images/image2.jpg",
        rating: 4.5
    }, {
        name: 'Mahdia',
        description: 'Beach',
        imageUrl: "/images/image3.jpg",
        rating: 4.5
    }, {
        name: 'Beja',
        description: 'Bridge',
        imageUrl: "/images/image4.jpg",
        rating: 4.5
    }, {
        name: 'Djem',
        description: 'Amphitheater',
        imageUrl: "/images/image5.jpg",
        rating: 4.5
    },
    {
        name: 'Sousse',
        description: 'Beach',
        imageUrl: "/images/image6.jpg",
        rating: 4.5
    },
]
</script>


<template>
    <div class="main">
        <section class="test">
            <div v-for="(city, index) in cities" :key="index" class="card">
                <div class="card__img">
                    <img :src=city.imageUrl>
                    <div class="card__overlay">
                        <h2>{{ city.name }}</h2>
                        <p>{{ city.description }}</p>
                    </div>
                </div>

            </div>
        </section>
    </div>
</template>




<style scoped lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&display=swap");

* {
    margin: 0;
    padding: 0;
    // box-sizing: border-box;

}

@media (max-width: 1024px) {
    section {
        height: 500px !important
    }
}

.main {
    // width: min(90%, 100rem);
    margin: 10px auto;
    padding-left: 7%;
    padding-right: 7%;
    display: grid;
    place-items: center;
    font-family: "Poppins", sans-serif;
    font-weight: 400;
    letter-spacing: 0.5px;
    // margin-bottom: -10rem;
    // margin-top: -4rem;

}

// .test {
//     background-color: red;
//     margin-top: -500px;
// }

img {
    width: 100%;
    display: block;
    height: 100%;
    object-fit: cover;
}

h2 {
    font-size: clamp(1rem, 0.8750rem + 0.6250vw, 1.5rem);
    line-height: 1.3;
    font-weight: 700;
}

section .card {
    /* Other styles */
    transition: transform 0.4s ease-in-out;
}

section {
    display: grid;
    grid-template-columns: 25% 30% 15% 25%;
    gap: 15px;
    place-content: center;
    grid-template-rows: 40% 50%;
    height: 80vh;
    min-height: 460px;
    transition: transform scale 5s ease-in-out;
    // padding: max(2vh, 1.5rem);
    // background-color: red;
}

section .card:hover {
    z-index: 5;
    transform: scale(1.1);
    cursor: pointer;
}

@media screen and (max-width: 690px) {
    section {
        height: 65vh;
    }
}

@media screen and (max-width: 470px) {
    section {
        grid-template-columns: repeat(2, 1fr);
        grid-template-rows: repeat(3, 35%);
    }
}

section .card {
    border-radius: 25px;
    box-shadow: -2px 4px 15px rgba(0, 0, 0, 0.26);
}

@media screen and (max-width: 470px) {
    section .card {
        grid-column: span 1;
    }
}

section .card:nth-child(2) {
    grid-column: 2/3;
    grid-row: span 2;
}

@media screen and (max-width: 690px) {
    section .card:nth-child(2) {
        grid-column: span 1;
        grid-row: span 1;
    }
}

section .card:nth-child(3) {
    grid-column: span 2;
}

@media screen and (max-width: 690px) {
    section .card:nth-child(3) {
        grid-column: 2/4;
        grid-row: 1/2;
    }
}

@media screen and (max-width: 690px) {
    section .card:nth-child(6) {
        grid-column: 2/4;
        grid-row: 2/3;
    }
}

@media screen and (max-width: 470px) {
    section .card:nth-child(5) {
        grid-column: span 2;
    }
}

section .card p {
    font-size: clamp(0.9rem, 0.8750rem + 0.1250vw, 1rem);
    line-height: 1.4;
}

section .card img {
    border-radius: 25px;
}

section .card .card__img {
    position: relative;
    height: 100%;
}

section .card .card__img .card__overlay {
    position: absolute;
    bottom: 0;
    left: 0;
    content: "";
    color: #fff;
    padding: clamp(0.938rem, 5vw, 1.563rem);
    background: #02022e;
    background: linear-gradient(0deg, rgba(0, 0, 0, 0.57) 0%, rgba(255, 255, 255, 0) 100%);
    width: 100%;
    height: 100%;
    border-radius: 25px;
    display: flex;
    justify-content: flex-end;
    flex-direction: column;
}

section .card .card__img span {
    position: absolute;
    top: 25px;
    left: min(2vmax, 1.563rem);
    color: #ff7b29;
    background: #fff;
    border-radius: 50px;
    padding: 2px 8px 2px 6px;
    display: flex;
    box-shadow: 0px 1px 20px #0000002b;
}

@media screen and (max-width: 690px) {
    section .card .card__img span {
        top: 20px;
    }
}

@media screen and (max-width: 470px) {
    section .card .card__img span {
        top: 15px;
    }
}

section .card .card__img span svg {
    fill: #ff7b29;
    width: 20px;
    margin-right: 2px;
}
</style>