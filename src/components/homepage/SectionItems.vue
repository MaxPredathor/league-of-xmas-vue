<template>
    <div>
        <div v-for="(item,index) in randomItems">
            <img :src="store.ItemsUrls.itemIcon + item[0] + '.png'" alt="">
        </div>
    </div>
</template>

<script>
import { store } from "../../data/store";
import axios from "axios";
export default {
    data() {
        return {
            store,
            items: [],
            randomItems: []
        }
    },
    methods: {
        // Api to get items infos
        getItems() {
            axios.get(store.ItemsUrls.allItems).then((res) => {
                this.items = Object.entries(res.data.data);
                this.getRandItems();
                console.log(this.items);
            });
        },
        getRandItems() {
            while (this.randomItems.length < 10) {
                const randNumber = Math.floor(Math.random() * (this.items.length + 1));
                if (!this.randomItems.includes(this.items[randNumber])) {
                    this.randomItems.push(this.items[randNumber]);
                }
            }
            console.log(this.randomItems);
        }
    },
    mounted() {
        this.getItems();
    }
}
</script>

<style lang="scss" scoped></style>