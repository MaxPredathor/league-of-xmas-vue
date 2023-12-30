<template>
    <Overview @loaded="loaded = true" />
    <ChampStat />
    <Skins />
</template>

<script>
import { store } from "../data/store";
import Overview from "../components/show-page/Overview.vue";
import ChampStat from "../components/show-page/ChampStat.vue";
import Skins from "../components/show-page/Skins.vue";
export default {
    name: "Show",
    data() {
        return {
            store,
            loaded: false,
        }
    },
    components: {
        Overview,
        ChampStat,
        Skins,
    },
    methods: {

    },
    mounted() {
    }
}
</script>

<style lang="scss" scoped></style>