<template >
    <div @click="search = false">
        <h1>This is the Champions page</h1>
        <nav class="navbar navbar-expand-lg py-3">
            <div class="container-fluid">
                <div class="collapse navbar-collapse justify-content-between" id="navbarNav">
                    <div class="search" @click.stop="search = true">
                        <h4 v-if="!search">Search</h4>
                        <input v-else type="text" v-model="searchValue">
                        <div class="search-dropdown" :class="{ 'd-block': search }">
                            <div class="search-option" v-for="champs in champions"
                                @click="filterChamps(null, null, champs.id)"
                                v-show="champs.id.toLowerCase().includes(searchValue.toLowerCase()) || searchValue === ''">
                                {{ champs.name }}
                            </div>
                        </div>
                    </div>
                    <ul class="navbar-nav">
                        <li class="nav-item">
                            <button class="nav-link" :class="{ active: tag === ' ' }" @click="filterChamps('', null, null)">
                                All
                            </button>
                        </li>
                        <li class="nav-item">
                            <button class="nav-link" @click="filterChamps('Assassin', null, null)"
                                :class="{ active: tag === 'Assassin' }">
                                Assassins
                            </button>
                        </li>
                        <li class="nav-item">
                            <button class="nav-link" @click="filterChamps('Fighter', null, null)"
                                :class="{ active: tag === 'Fighter' }">
                                Fighters
                            </button>
                        </li>
                        <li class="nav-item">
                            <button class="nav-link" @click="filterChamps('Mage', null, null)"
                                :class="{ active: tag === 'Mage' }">
                                Mages
                            </button>
                        </li>
                        <li class="nav-item">
                            <button class="nav-link" @click="filterChamps('Marksman', null, null)"
                                :class="{ active: tag === 'Marksman' }">
                                Marksmen
                            </button>
                        </li>
                        <li class="nav-item">
                            <button class="nav-link" @click="filterChamps('Support', null, null)"
                                :class="{ active: tag === 'Support' }">
                                Supports
                            </button>
                        </li>
                        <li class="nav-item">
                            <button class="nav-link" @click="filterChamps('Tank', null, null)"
                                :class="{ active: tag === 'Tank' }">
                                Tanks
                            </button>
                        </li>
                    </ul>
                    <div class="difficulty">
                        <select @change="filterChamps(null, $event.target.value, null)" name="difficulty" id="">
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
            <ChampionsCard v-for="champ in champions" :key="champ.key" :champ="champ" :activeTag="tag" :champId="champsId"
                :filteredChamp="diff" />
        </div>
    </div>
</template>

<script>
import axios from "axios";
import { store } from "../data/store";
import ChampionsCard from "../components/partials/ChampionCard.vue";
export default {
    name: "Champions",
    components: {
        ChampionsCard,
    },
    data() {
        return {
            champions: [],
            tag: ' ',
            store,
            bgImg: "",
            loading: false,
            diff: "/",
            search: false,
            searchValue: "",
            champsId: "",
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
        filterChamps(tag, select, id) {
            this.loading = true;
            setTimeout(() => {
                if (tag !== null && tag !== '') {
                    this.tag = tag
                } else if (tag === '') {
                    this.tag = ' '
                }
                if (select) {
                    this.diff = select
                }
                if (id) {
                    this.champsId = id
                    this.search = false
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

.search {
    position: relative;

    .search-dropdown {
        display: none;
        height: 200px;
        overflow-y: scroll;
        position: absolute;
        z-index: 100;
        background-color: white;
        width: 250px;

        .search-option {
            z-index: 101;
            width: 100%;

            &:hover {
                background-color: #f0f0f0;
            }
        }
    }
}
</style>
