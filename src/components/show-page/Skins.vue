<template>
    <div id="background">
        <div class="container">
            <div class="row">
                <div class="col-12">

                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "Skins",
}
</script>

<style lang="scss" scoped>
@use "../../assets/style/partials/variables" as *;

#background {
    background-color: ghostwhite;

    .container {
        .row {
            .col-12 {}
        }
    }
}
</style>