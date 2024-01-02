<template>
    <div>

    </div>
</template>

<script>
import { store } from "../../data/store.js";
export default {
    name: "ChampStat",
    props: {
        obj: Object
    },
    data() {
        return {
            store,
        }
    }
}
</script>

<style lang="scss" scoped>
@use "../../assets/style/partials/variables" as *;

div {
    background-color: $color-showpage;
    height: 500px;
}
</style>