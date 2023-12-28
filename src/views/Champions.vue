<template>
    <div>
        <h1>This is the Champions page</h1>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    name: 'Champions',
    data() {
        return {
            champions: []
        }
    },
    methods: {
        getChamps() {
            const apiUrl = 'https://ddragon.leagueoflegends.com/cdn/13.24.1/data/en_US/champion.json';
            axios
                .get(apiUrl)
                .then((response) => {
                    console.log(response.data.data);
                    this.champs = response.data.data
                    this.champions = response.data.data
                    console.log(this.champions)
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
        this.getChamps()
    },
}
</script>

<style lang="scss" scoped></style>
