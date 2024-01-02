<template>
    <swiper :autoplay="{ delay: 2500, disableOnInteraction: false, pauseOnMouseEnter: true }" :modules="modules"
        class="mySwiper">
        <swiper-slide v-for="item in imgs">
            <div class="position-relative">
                <img :src="imgUrl + item.img">
                <div class="position-absolute title-p display-1 h1">
                    {{ item.title }}
                </div>
            </div>
        </swiper-slide>
    </swiper>
</template>
<script>
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue';

// Import Swiper styles
import 'swiper/css';

import 'swiper/css/pagination';
// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

export default {
    components: {
        Swiper,
        SwiperSlide,
    },
    setup() {
        return {
            modules: [Autoplay, Pagination],
        };
    },
    data() {
        return {
            imgUrl: '/images/JumboImages/',
            imgs: [
                {
                    title: 'Choose your Champion',
                    img: 'hwei-lol-splash-art-4k-wallpaper-uhdpaper.com-41@1@n.jpg'
                },
                {
                    title: 'Play with your friends',
                    img: 'lol-heartsteel-ksante-ezreal-yone-aphelios-sett-kayn-4k-wallpaper-uhdpaper.com-42@1@n.jpg'
                },
                {
                    title: 'Supercalifragilistichespiralitoso',
                    img: 'heartsteel-yone-prestige-edition-skin-lol-splash-art-2k-wallpaper-uhdpaper.com-664@1@m.jpg'
                }
            ]
        };
    }
};
</script>
<style lang="scss" scoped>
@use '../../assets/style/partials/variables' as *;
.swiper {
    width: 100%;
    height: 70vh;
}

.swiper-slide {
    display: flex;
    justify-content: center;
    align-items: start;
}

.swiper-slide img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.title-p {
    top: 20%;
    left: 30%;
    transform: translate(-50%, -50%);
    color: rgb(94, 106, 117);
    font-family: $font-LOL;
    -webkit-text-stroke-width: 3px;
    -webkit-text-stroke-color: black;
}
</style>