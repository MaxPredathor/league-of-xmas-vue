<template>
    <div v-if="loaded">
        <div class="container" v-for="item in champion">
            <h1>{{ item.name }}</h1>
            <img :src="store.ChampionsUrls.champImage + store.activeChamp + '_0.jpg'" :alt="item.name" />
            <h3>
                <span>{{ item.name }} -
                    <em class="fw-regular">{{ item.title }}</em>
                </span>
            </h3>
            <p>{{ item.lore }}</p>
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
    created() {
        console.log(this.item)
    },
    mounted() {
        this.getSpecificChamp();
    }
}
</script>

<style lang="scss" scoped></style>