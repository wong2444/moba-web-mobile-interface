<template>
    <div class="card bg-white p-3 mt-3">
        <div class=" d-flex ai-center " :class="{'card-header':!plain,'pb-3':!plain}">
            <i class="iconfont" :class="`icon-${icon}`"></i>
            <div class="fs-xl flex-1 px-2">{{title}}</div>
            <i v-if="!plain" class="iconfont icon-menu"></i>
        </div>
        <div class="card-body pt-3">
            <slot></slot>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Card",
        props: {
            title: {type: String, required: true},
            icon: {type: String, required: true},
            plain: {type: Boolean}
        }
    }
</script>

<style lang="scss" scoped>
    @import "../assets/scss/_variables.scss";

    .card {
        .card-header {
            border-bottom: 1px solid $border-color;
        }

        border-bottom: 1px solid $border-color;
    }
</style>
