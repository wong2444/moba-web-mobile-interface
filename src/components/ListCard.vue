<template>
    <m-card :icon="icon" :title="title">
        <div class="nav jc-between">

            <div v-for="(c,i) in categories" :key="i" class="nav-item"
                 :class="{active:active===i}" @click="$refs.list.swiper.slideTo(i)">
                <div class="nav-link">{{c.name}}</div>
            </div>
        </div>
        <div class="pt-3">
            <swiper ref="list" :options="{autoHeight:true}" @slide-change="()=>active=$refs.list.swiper.realIndex">
                <swiper-slide v-for="(category,index) in categories" :key="index">
                    <slot name="items" :category="category"></slot>
                </swiper-slide>
            </swiper>
        </div>
    </m-card>
</template>

<script>
    export default {
        name: "ListCard",
        props: {
            title: {type: String, required: true},
            icon: {type: String, required: true},
            categories: {type: Array, required: true}
        },
        data() {
            return {
                active: 0,

            }
        }
    }
</script>

<style scoped>

</style>
