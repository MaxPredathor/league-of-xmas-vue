<template>
    <!-- <div v-if="loaded"> -->
    <div>
        <Overview @loaded="loaded = true" />
    </div>
    <!-- </div> -->
    <!-- <div v-else>
        <h2>Loading</h2>
    </div> -->
</template>

<script>
import { store } from "../data/store";
import Overview from "../components/show-page/Overview.vue";
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
    },
    methods: {

    },
    mounted() {
    }
}
</script>

<style lang="scss" scoped></style>