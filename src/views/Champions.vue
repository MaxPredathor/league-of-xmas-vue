<template>
    <div>
        <h1>This is the Champions page</h1>
        <div class="row">
            <div class="col-4" v-for="champ in champions" :key="champ.key">
                <ChampionsCard :champ="champ" />
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import { store } from "../assets/data/store.js";
import ChampionsCard from "../partials/ChampionCard.vue";
export default {
    name: "Champions",
    components: {
        ChampionsCard,
    },
    data() {
        return {
            champions: [],
        };
    },
    methods: {
        getChamps() {
            const apiUrl = store.ChampionsUrls.allChamps;
            axios
                .get(apiUrl)
                .then((response) => {
                    console.log(response.data.data);
                    this.champs = response.data.data;
                    this.champions = response.data.data;
                    console.log(this.champions);
                })
                .catch(function (error) {
                    // handle error
                    console.log(error);
                })
                .finally(function () {
                    // always executed
                });
        },
    },
    mounted() {
        this.getChamps();
    },
};
</script>

<style lang="scss" scoped></style>
