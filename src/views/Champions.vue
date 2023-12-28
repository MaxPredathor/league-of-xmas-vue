<template>
    <div>
        <h1>This is the Champions page</h1>
        <nav class="navbar navbar-expand-lg py-3">
            <div class="container-fluid">
                <div class="collapse navbar-collapse justify-content-between" id="navbarNav">
                    <div class="search">Search</div>
                    <ul class="navbar-nav">
                        <li class="nav-item">
                            <button class="nav-link" :class="{ active: tag === '' }" aria-current="page"
                                @click="filterChamps('', null)">
                                All
                            </button>
                        </li>
                        <li class="nav-item">
                            <button class="nav-link" @click="filterChamps('Assassin', null)"
                                :class="{ active: tag === 'Assassin' }">
                                Assassins
                            </button>
                        </li>
                        <li class="nav-item">
                            <button class="nav-link" @click="filterChamps('Fighter', null)"
                                :class="{ active: tag === 'Fighter' }">
                                Fighters
                            </button>
                        </li>
                        <li class="nav-item">
                            <button class="nav-link" @click="filterChamps('Mage', null)"
                                :class="{ active: tag === 'Mage' }">
                                Mages
                            </button>
                        </li>
                        <li class="nav-item">
                            <button class="nav-link" @click="filterChamps('Marksman', null)"
                                :class="{ active: tag === 'Marksman' }">
                                Marksmen
                            </button>
                        </li>
                        <li class="nav-item">
                            <button class="nav-link" @click="filterChamps('Support', null)"
                                :class="{ active: tag === 'Support' }">
                                Supports
                            </button>
                        </li>
                        <li class="nav-item">
                            <button class="nav-link" @click="filterChamps('Tank', null)"
                                :class="{ active: tag === 'Tank' }">
                                Tanks
                            </button>
                        </li>
                    </ul>
                    <div class="difficulty">
                        <select @change="filterChamps(null, $event.target.value)" name="difficulty" id="">
                            <option value="/">All</option>
                            <option value="3">Easy</option>
                            <option value="7">Medium</option>
                            <option value="10">Hard</option>
                        </select>
                    </div>
                </div>
            </div>
        </nav>
        <div class="row" :class="{ 'opacited': loading }">
            <ChampionsCard v-for="champ in champions" :key="champ.key" :champ="champ" :activeTag="tag"
                :filteredChamp="diff" />
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
            diff: "/",
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
        filterChamps(tag, select) {
            this.loading = true;
            setTimeout(() => {
                if (tag) {
                    this.tag = tag
                }
                if (select) {
                    this.diff = select
                }
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
