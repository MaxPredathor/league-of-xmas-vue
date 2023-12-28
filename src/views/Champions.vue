<template>
    <div>
        <h1>This is the Champions page</h1>
        <nav class="navbar navbar-expand-lg py-3">
            <div class="container-fluid">
                <div class="collapse navbar-collapse justify-content-center" id="navbarNav">
                    <ul class="navbar-nav">
                        <li class="nav-item">
                            <button class="nav-link" :class="{ active: tag === '' }" aria-current="page"
                                @click="filterChamps('')">
                                All
                            </button>
                        </li>
                        <li class="nav-item">
                            <button class="nav-link" @click="filterChamps('Assassin')"
                                :class="{ active: tag === 'Assassin' }">
                                Assassins
                            </button>
                        </li>
                        <li class="nav-item">
                            <button class="nav-link" @click="filterChamps('Fighter')"
                                :class="{ active: tag === 'Fighter' }">
                                Fighters
                            </button>
                        </li>
                        <li class="nav-item">
                            <button class="nav-link" @click="filterChamps('Mage')" :class="{ active: tag === 'Mage' }">
                                Mages
                            </button>
                        </li>
                        <li class="nav-item">
                            <button class="nav-link" @click="filterChamps('Marksman')"
                                :class="{ active: tag === 'Marksman' }">
                                Marksmen
                            </button>
                        </li>
                        <li class="nav-item">
                            <button class="nav-link" @click="filterChamps('Support')"
                                :class="{ active: tag === 'Support' }">
                                Supports
                            </button>
                        </li>
                        <li class="nav-item">
                            <button class="nav-link" @click="filterChamps('Tank')" :class="{ active: tag === 'Tank' }">
                                Tanks
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
        <div class="row" :class="{ 'opacited': loading }">
            <ChampionsCard v-for="champ in champions" :key="champ.key" :champ="champ" :activeTag="tag" />
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
            tag: "",
            store,
            bgImg: "",
            loading: false,
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
        filterChamps(tag) {
            this.loading = true;
            setTimeout(() => {
                this.tag = tag
            }, 400)
            setTimeout(() => {
                this.loading = false;
            }, 700);
        },
    },
    mounted() {
        this.getChamps();
    },
};
</script>

<style lang="scss" scoped>
@use "../assets/style/partials/_variables.scss" as *;

nav {
    font-size: 1.3em;

    button {
        &.active {
            font-weight: bold;

            &:after {
                transform: translateY(0px);
                opacity: 1;
            }
        }

        &:hover {
            &:after {
                transform: translateY(0px);
                opacity: 1;
            }
        }

        &:after {
            content: "";
            display: block;
            width: 100%;
            height: 3px;
            background-color: $color-selective-yellow;
            transform: translateY(8px);
            opacity: 0;
            transition: all 0.3s linear;
        }
    }
}

.row {
    transition: all 0.3s linear;

    &.opacited {
        opacity: 0;
    }
}
</style>
