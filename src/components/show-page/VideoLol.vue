<template>
    <div>
        <video autoplay loop muted ref="video">
            <source :src="currentVideo" type="video/mp4">
        </video>
        <button>GIOCA GRATIS</button>
    </div>
</template>

<script>
import { store } from "../../data/store.js";
export default {
    name: "VideoLol",
    data() {
        return {
            store,
            currentVideo: null,
            videoList: [
                'https://assets.contentstack.io/v3/assets/blt731acb42bb3d1659/blt441f3bc092c69d44/5f49597070ca0f65ba10a435/ss2020_kaisa_ez_1920x1080.mp4',
                'https://assets.contentstack.io/v3/assets/blt731acb42bb3d1659/blt7de86c03defc8902/5f4959882ecc864927d8d392/ss2020_galio_lux_1920x1080.mp4',
                'https://assets.contentstack.io/v3/assets/blt731acb42bb3d1659/blt755ed452ae53c9a2/5f49597270ca0f65ba10a439/ss2020_sylas_garen_lux_1920x1080.mp4',
                'https://assets.contentstack.io/v3/assets/blt731acb42bb3d1659/bltbb792e3456cb02b7/5f4959269586f1653fc65a1b/ss2020_urgot_vi_cait_1920x1080.mp4',
                'https://assets.contentstack.io/v3/assets/blt731acb42bb3d1659/blte5d5ac96b514d502/5f495971a21dbd47faf26c0b/ss2020_kaisa_1920x1080.mp4',
                'https://assets.contentstack.io/v3/assets/blt731acb42bb3d1659/bltfa2accf67922dd3a/5f495972a11538653ea58f65/ss2020_lux_sylas_1920x1080.mp4'
            ],
        }
    },
    methods: {
        randomizeVideo() {
            const randomIndex = Math.floor(Math.random() * this.videoList.length);
            this.currentVideo = this.videoList[randomIndex];
            this.playVideo()
        },
        playVideo() {
            this.$refs.video.load();
            this.$refs.video.play();
        }
    },
    mounted() {
        this.randomizeVideo();
    }
}
</script>

<style lang="scss" scoped>
@use "../../assets/style/partials/variables" as *;

div {
    width: 100%;
    background-color: black;
    position: relative;

    video {
        width: 100%;
    }

    button {
        width: 200px;
        height: 60px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: #13d8f6;
        font-size: 0.7em;
        letter-spacing: 0.15em;
        font-weight: bold;
        color: black;
        border: none;


        &::before {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 210px;
            height: 70px;
            display: block;
            clip-path: polygon(15% 0, 100% 0, 100% 70%, 85% 100%, 0 100%, 0 30%);
            content: "";
            border-top: 1px solid #8595a5;
            border-right: 1px solid #b1beca;
            border-left: 1px solid #b1beca;
            border-bottom: 1px solid #8595a5;
            // border-radius: 19% 28% 13% 28% / 35% 0% 24% 0%;

        }

        // position: relative;
        // display: inline-block;
        // padding: 15px 30px;
        // background: linear-gradient(45deg, #3498db, #3498db 50%, #2980b9 50%, #2980b9);
        // color: #fff;
        // text-decoration: none;
        // font-size: 16px;
        // transition: all 0.3s ease;


        // &::before {
        //     content: '';
        //     position: absolute;
        //     top: 0;
        //     left: 0;
        //     width: 100%;
        //     height: 100%;
        //     border: 2px solid #2980b9;
        //     box-sizing: border-box;
        //     transform-origin: top left;
        //     transform: scaleY(0);
        //     transition: transform 0.3s ease;
        // }
    }
}
</style>