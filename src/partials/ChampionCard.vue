<template>
    <div class="col-4"
        v-if="(champ.tags.includes(activeTag) || activeTag === ' ') && (filteredChamp === '/' || (filteredChamp <= 3 && champ.info.difficulty <= 3) || (filteredChamp <= 7 && champ.info.difficulty > 3 && champ.info.difficulty <= filteredChamp) || (filteredChamp <= 10 && champ.info.difficulty > 7 && champ.info.difficulty <= filteredChamp)) && (champ.id === champId || champId == '')">
        <div class="card-div">
            <div>
                <img :src="store.ChampionsUrls.champImage + champ.id + '_' + skin + '.jpg'" :alt="champ.name" />
            </div>
            <h3>
                <span>{{ champ.name }} - <em class="fw-regular">{{ champ.title }}</em></span>
            </h3>
        </div>
    </div>
</template>

<script>
import { store } from "../assets/data/store.js";
export default {
    name: "ChampionCard",
    props: {
        champ: Object,
        activeTag: String,
        filteredChamp: String,
        champId: String,
    },
    data() {
        return {
            store,
            skin: 0,
        };
    },
};
</script>

<style lang="scss" scoped>
@use '../assets/style/partials/variables' as *;

.card-div {
    position: relative;
    margin-bottom: 20px;
    cursor: pointer;

    div {
        overflow: hidden;

        img {
            width: 100%;
            transition: all 0.1s linear;
        }
    }

    h3 {
        position: absolute;
        bottom: 0;
        left: 0;
        padding: 10px 15px;
        background-color: rgba($color: #000000, $alpha: 0.5);
        color: #fff;
        margin: 0;
        width: 100%;
        font-size: 1.3em;
        transition: all 0.1s linear;
    }

    span {
        transition: all 0.1s linear;
    }

    &:hover {
        -webkit-box-shadow: 1px 3.5px 9px 2px $color-sky-blue;
        -moz-box-shadow: 1px 3.5px 9px 2px $color-sky-blue;
        box-shadow: 1px 3.5px 9px 2px $color-sky-blue;
        transition: all 0.1s linear;
    }

    &:hover img {
        transform: scale(1.1);
        transition: all 0.3s linear;
    }

    &:hover span {
        margin-left: 10px;
        transition: all 0.2s linear;
    }

    &:hover h3 {
        background-color: rgba($color: #000000, $alpha: 1);
        transition: all 0.2s linear;
    }
}
</style>
