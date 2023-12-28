<template>
    <div class="card-div">
        <img :src="store.ChampionsUrls.champImage + champ.id + '_0.jpg'" :alt="champ.name">
        <h3>{{ champ.name }}</h3>
    </div>
</template>

<script>
import { store } from "../assets/data/store.js";
export default {
    name: "ChampionCard",
    props: {
        champ: Object
    },
    data() {
        return {
            store,

        }
    }
}
</script>
    
<style lang="scss" scoped>
.card-div {

    img {
        width: 100%;
    }
}
</style>