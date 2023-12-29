<template>
    <div id="background"
        :style="{ 'background-image': 'url(' + store.ChampionsUrls.champImage + store.activeChamp + '_0.jpg' + ')' }"
        v-if="loaded">
        <div class="blur">
            <div class="container" v-for="item in champion">
                <h1>{{ item.name }}</h1>
                <h4>{{ item.title }}</h4>
                <img :src="store.ChampionsUrls.champImage + store.activeChamp + '_0.jpg'" :alt="item.name" />
            </div>
        </div>
    </div>
    <div v-else>
        <h2>Loading</h2>
    </div>
</template>

<script>
import { store } from "../../data/store.js";
import axios from "axios";
export default {
    name: "Overview",
    data() {
        return {
            store,
            champion: null,
            champ: store.activeChamp,
            loaded: false,
        }
    },
    methods: {
        getSpecificChamp() {
            const apiUrl = store.ChampionsUrls.specificChamp + store.activeChamp + '.json';
            console.log(apiUrl);
            axios
                .get(apiUrl)
                .then((response) => {
                    console.log(response.data.data);
                    this.champion = response.data.data;
                    console.log(this.champion);
                    this.loaded = true
                })
                .catch(function (error) {
                    // handle error
                    console.log(error);
                })
                .finally(function () {
                    // always executed
                });
        }
    },
    mounted() {
        this.getSpecificChamp();
    }
}
</script>

<style lang="scss" scoped>
@use "../../assets/style/partials/variables" as *;

#background {
    background-repeat: no-repeat;
    background-size: cover;
    z-index: 0;
    color: white;

    .blur {
        backdrop-filter: blur(6px);
        backdrop-filter: greyscale(70%);
        background-color: $color-showpage-opacity;

        .container {
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            z-index: 1;
            position: relative;

            h1 {
                font-size: 120px;
                position: absolute;
                top: 600px;
                font-family: $font-LOL;
                // margin: 20px 0;
                text-align: center;
            }

            h4 {
                font-family: $font-LOL;
                font-size: 24px;
                position: absolute;
                top: 600px;
                text-align: center;
            }

            img {
                width: 100%;
            }
        }
    }
}
</style>