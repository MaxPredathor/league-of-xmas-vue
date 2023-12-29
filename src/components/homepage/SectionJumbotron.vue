<template>
    <swiper :autoplay="{ delay: 2500, disableOnInteraction: false, }" :modules="modules" class="mySwiper">
        <swiper-slide v-for="item in imgs">
            <div>
                <img :src="imgUrl + item">
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
            modules: [Autoplay, Pagination, Navigation],
        };
    },
    data() {
        return {
            imgUrl: '/images/JumboImages/',
            imgs: [
                'hwei-lol-splash-art-4k-wallpaper-uhdpaper.com-41@1@n.jpg',
                'lol-heartsteel-ksante-ezreal-yone-aphelios-sett-kayn-4k-wallpaper-uhdpaper.com-42@1@n.jpg',
            ]
        };
    }
};
</script>
<style lang="scss" scoped>
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
</style>
  

<!-- <template>
    <swiper 
    :autoplay="{
      delay: 2500,
      disableOnInteraction: false,
    }"
    class="mySwiper">
        <swiper-slide v-for="item in imgs">
            <div>
               <img :src="imgUrl + item"> 
            </div>
        </swiper-slide>
    </swiper>
</template>
<script>
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue';

// Import Swiper styles
import 'swiper/css';

export default {
    components: {
        Swiper,
        SwiperSlide,
    },
    setup() {
        return {};
    },
    data() {
        return {
            imgUrl:'/images/JumboImages/',
            imgs:[
                'hwei-lol-splash-art-4k-wallpaper-uhdpaper.com-41@1@n.jpg',
                'lol-heartsteel-ksante-ezreal-yone-aphelios-sett-kayn-4k-wallpaper-uhdpaper.com-42@1@n.jpg',
            ]
        };
    }
};
</script>

<style lang="scss" scoped>
.swiper {
    width: 100vw;
    height: 70vh;
}

.swiper-slide {
    margin-top: -150px;
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
</style> -->