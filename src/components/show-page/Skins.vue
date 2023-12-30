<template>
    <div id="background">
        <div class="container">
            <div class="row">
                <div class="col-12"
                    :style="{ 'background-image': 'url(' + store.ChampionsUrls.champImage + store.activeChamp + '_' + skinDisplay + '.jpg' + ')' }">
                    <div class="available" ref="skins">
                        <h1> Aveilable Skins</h1>
                        <div class="skins" v-for="item in obj">
                            <div class="skin-container" v-for="skin in item.skins" @click="scrollSkin(skin.num)">
                                <div class="skin-img">
                                    <img :src="store.ChampionsUrls.champImage + store.activeChamp + '_' + skin.num + '.jpg'"
                                        alt="">
                                </div>
                                <div v-if="skin.num !== 0" class="skin">
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
            lastSkin: 0,
        }
    },
    props: {
        obj: Object,
    },
    methods: {
        scrollSkin(num) {
            this.skinDisplay = num
            const mySkin = this.$refs.skins
            if (this.lastSkin > num) {
                mySkin.scrollBy({
                    top: -80,
                    left: 0,
                    behavior: "smooth"
                });
            } else {
                mySkin.scrollBy({
                    top: 80,
                    left: 0,
                    behavior: "smooth"
                });
            }
            this.lastSkin = num;
        }
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
                background-repeat: no-repeat;
                background-size: cover;
                transition: all 0.4s linear;

                .available {
                    height: 100%;
                    width: 35%;
                    background-color: rgba(0, 0, 0, 0.5);
                    backdrop-filter: blur(6px);
                    display: flex;
                    flex-direction: column;
                    flex-wrap: nowrap;
                    overflow: hidden;

                    h1 {
                        font-size: 40px;
                        font-family: $font-LOL;
                        text-align: center;
                        transform: skew(-15deg);
                        font-weight: bolder;
                        color: white;
                        margin: 0;
                    }

                    .skins {
                        user-select: none;
                        scrollbar-width: none;

                        &::-webkit-scrollbar {
                            display: none;
                        }

                        .skin-container {
                            display: flex;
                            margin: 20px 0;
                            cursor: pointer;

                            .skin {
                                width: 85%;
                                font-family: $font-spiegel;
                                font-size: 0.8em;
                                color: white;
                                height: 50px;
                                padding: 5px 0;
                                display: flex;
                                align-items: center;
                                font-weight: bold;
                            }

                            .skin-img {
                                width: 15%;
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