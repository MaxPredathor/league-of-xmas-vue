<template>
    <div class="container">
        <div class="d-flex">
            <div v-show="!randomItems.length<10">
                <div>
                    {{ randomItems[activeIndex] }}
                </div>
            </div>
            <div>
                <div v-for="(item, index) in randomItems" class="d-flex justify-content-end align-items-center my-2" @click="activeIndex=index">
                    <div class="me-2">
                        {{ item[1].name }}
                    </div>
                    <div class="rounded-circle overflow-hidden">
                       <img :src="store.ItemsUrls.itemIcon + item[0] + '.png'" :alt="item[1].name"> 
                    </div>
                </div>
            </div>
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
            randomItems: [],
            activeIndex:0
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