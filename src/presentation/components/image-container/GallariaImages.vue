<script setup lang="ts">
const cities = [
    {
        name: '',
        description: '',
        imageUrl: 'src/presentation/resources/images/image3.jpg',
        rating: 4.5
    },
    {
        name: '',
        description: '',
        imageUrl: '/src/presentation/resources/images/image2.jpg',
        rating: 4.5
    }, {
        name: '',
        description: '',
        imageUrl: '/src/presentation/resources/images/image3.jpg',
        rating: 4.5
    }, {
        name: '',
        description: '',
        imageUrl: '/src/presentation/resources/images/image4.jpg',
        rating: 4.5
    }, {
        name: '',
        description: '',
        imageUrl: '/src/presentation/resources/images/image5.jpg',
        rating: 4.5
    },
    {
        name: '',
        description: '',
        imageUrl: '/src/presentation/resources/images/image6.jpg',
        rating: 4.5
    },
]
</script>
<template>

    <body>
        <section>
            <!-- <div>
                <div v-for="(city, index) in cities" :key="index" class="card">
                    <div class="card__img">
                        <img :src="city.imageUrl" :alt="city.name">
                        <span>
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20"
                                fill="currentColor">
                                <path
                                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                            {{ city.rating }}
                        </span>
                        <div class="card__overlay">
                            <h2>{{ city.name }}</h2>
                            <p>{{ city.description }}</p>
                        </div>
                    </div>
                </div>
            </div> -->

            <div class="card">
                <div class="card__img">
                    <img :src="cities[0].imageUrl" :alt="cities[0].name">
                    <span><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20"
                            fill="currentColor">
                            <path
                                d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>4.5</span>
                    <div class="card__overlay">
                        <h2>London</h2>
                        <p>Big Ben</p>
                    </div>
                </div>
            </div>
            <div class="card">
                <div class="card__img">
                    <img :src="cities[1].imageUrl" :alt="cities[0].name">
                    <span><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20"
                            fill="currentColor">
                            <path
                                d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>5</span>
                    <div class="card__overlay">
                        <h2>Paris</h2>
                        <p>Eiffel Tower</p>
                    </div>
                </div>
            </div>
            <div class="card">
                <div class="card__img">
                    <img :src="cities[2].imageUrl" :alt="cities[0].name">
                    <span><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20"
                            fill="currentColor">
                            <path
                                d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>4.7</span>
                    <div class="card__overlay">
                        <h2>Rome</h2>
                        <p>Colosseum</p>
                    </div>
                </div>
            </div>
            <div class="card">
                <div class="card__img">
                    <img :src="cities[3].imageUrl" :alt="cities[0].name">
                    <span><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20"
                            fill="currentColor">
                            <path
                                d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>4.3</span>
                    <div class="card__overlay">
                        <h2>Pisa</h2>
                        <p>Pisa Tower</p>
                    </div>
                </div>
            </div>
            <div class="card">
                <div class="card__img">
                    <img :src="cities[4].imageUrl" :alt="cities[0].name">
                    <span><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20"
                            fill="currentColor">
                            <path
                                d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>4.8</span>
                    <div class="card__overlay">
                        <h2>New York</h2>
                        <p>Statue of Liberty</p>
                    </div>
                </div>
            </div>
            <div class="card">
                <div class="card__img">
                    <img :src="cities[5].imageUrl" :alt="cities[0].name">
                    <span><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20"
                            fill="currentColor">
                            <path
                                d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>5</span>
                    <div class="card__overlay">
                        <h2>Sydney</h2>
                        <p>Sydney Opera House</p>
                    </div>
                </div>
            </div>

        </section>
    </body>

</template>

<style scoped lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&display=swap");

* {
    margin: 0;
    padding: 0;
    // box-sizing: border-box;

}

body {
    // width: min(90%, 100rem);
    margin: 10px auto;
    padding-left: 7%;
    padding-right: 7%;
    display: grid;
    place-items: center;
    font-family: "Poppins", sans-serif;
    font-weight: 400;
    letter-spacing: 0.5px;
    margin-bottom: -10rem;
    margin-top: -4rem;

}

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

section {
    display: grid;
    grid-template-columns: 25% 30% 15% 25%;
    gap: 15px;
    place-content: center;
    grid-template-rows: 50% 50%;
    height: 80vh;
    min-height: 460px;
    padding: max(2vh, 1.5rem);
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