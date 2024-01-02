<template>
    <Overview :obj="champion" />
    <ChampStat :obj="champion" />
    <Skins :obj="champion" />
    <VideoLol />
</template>

<script>
import { store } from "../data/store";
import Overview from "../components/show-page/Overview.vue";
import ChampStat from "../components/show-page/ChampStat.vue";
import Skins from "../components/show-page/Skins.vue";
import VideoLol from "../components/show-page/VideoLol.vue";
import axios from "axios";
export default {
    name: "Show",
    data() {
        return {
            store,
            champion: [],
        }
    },
    components: {
        Overview,
        ChampStat,
        Skins,
        VideoLol,
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