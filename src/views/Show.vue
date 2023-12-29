<template>
    <div v-if="loaded">
        <div v-for="item in champion">
            <h1>This is the Show page!</h1>
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
import { store } from "../data/store";
import axios from "axios";
export default {
    name: "Show",
    data() {
        return {
            store,
            champion: null,
            loaded: false,
            champ: store.activeChamp,
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

<style lang="scss" scoped></style>