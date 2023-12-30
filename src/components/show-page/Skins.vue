<template>
    <div id="background">
        <div class="container">
            <div class="row">
                <div class="col-12"
                    :style="{ 'background-image': 'url(' + store.ChampionsUrls.champImage + store.activeChamp + '_' + skinDisplay + '.jpg' + ')' }">
                    <div class="available">
                        <h1> Aveilable Skins</h1>
                        <div class="skins" v-for="item in obj">
                            <div class="skin-container" v-for="skin in item.skins" @click="skinDisplay = skin.num">
                                <div class="skin-img">
                                    <img :src="store.ChampionsUrls.champImage + store.activeChamp + '_' + skin.num + '.jpg'"
                                        alt="">
                                </div>
                                <div v-if="skin.num !== 0" class="skin" @click="skinDisplay = skin.num">
                                    {{ skin.name.toUpperCase() }}
                                </div>
                                <div v-else class="skin">
                                    {{ item.name.toUpperCase() }}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { store } from "../../data/store.js";
export default {
    name: "Skins",
    data() {
        return {
            store,
            skinDisplay: 0,
        }
    },
    props: {
        obj: Object,
    }
}
</script>

<style lang="scss" scoped>
@use "../../assets/style/partials/variables" as *;

#background {
    background-color: ghostwhite;

    .container {

        .row {
            .col-12 {
                margin: 40px 0;
                height: 850px;
                padding: 0;
                border: 1px solid black;
                background-repeat: no-repeat;
                background-size: cover;
                transition: all 0.4s linear;

                .available {
                    height: 100%;
                    width: 25%;
                    background-color: rgba(0, 0, 0, 0.8);
                    overflow: hidden;

                    h1 {
                        font-size: 40px;
                        font-family: $font-LOL;
                        text-align: center;
                        transform: skew(-15deg);
                        font-weight: bolder;
                        color: white;
                        margin: 0;
                        border-bottom: 1px solid white;
                    }

                    .skins {

                        .skin-container {
                            display: flex;
                            margin: 10px 0;
                            cursor: pointer;

                            .skin {
                                font-family: $font-spiegel;
                                font-size: 1em;
                                color: white;
                                height: 50px;
                                padding: 5px 10px;
                            }

                            .skin-img {
                                width: 30%;
                                margin-left: 20px;

                                img {
                                    width: 50px;
                                    height: 100%;
                                    object-fit: cover;
                                }
                            }
                        }

                    }
                }

            }
        }
    }
}
</style>