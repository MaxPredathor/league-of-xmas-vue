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
    padding-bottom: 20px;

    video {
        width: 100%;
    }

    button {
        margin-top: 20px;
        margin-left: 46%;
        font-family: $font-LOL;
        font-size: 12pt;
        color: black;
        background: transparent;
        text-decoration: none;
        padding: 10px 20px;
        border: 3px solid white;
        position: relative;
        letter-spacing: 1px;
        outline: none;
        background-color: #13d8f6;

        &:hover::before,
        &:hover::after {
            width: 0;
            height: 0;
            background: #13d8f6;
        }

        &::before {
            content: '';
            width: 21px;
            height: 18px;
            background: #000000;
            border: 3px solid white;
            transform: rotate(45deg);
            position: absolute;
            border-top: 0;
            border-left: 0;
            border-bottom: 0;
            top: -12px;
            left: -13px;
            transition: width, height 0.1s linear;
        }

        &::after {
            content: '';
            width: 21px;
            height: 18px;
            background: #000000;
            border: 3px solid white;
            transform: rotate(-132deg);
            position: absolute;
            border-top: 0;
            border-left: 0;
            border-bottom: 0;
            top: auto;
            right: -13px;
            bottom: -12px;
            transition: width, height 0.1s linear;
        }
    }
}
</style>