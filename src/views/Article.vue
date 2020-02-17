<template>
    <div class="page-article " v-if="model">
        <div class="d-flex py-3 px-2 border-bottom">
            <div class="iconfont icon-Back text-blue" @click="$router.go(-1)"></div>
            <strong class="flex-1 text-ellipsis text-blue">{{model.title}}</strong>
            <div class="text-grey fs-xs">2020-01-05</div>
        </div>
        <div v-html="model.body" class="px-3 body fs-lg"></div>
        <div class="px-3 border-top py-2">
            <div class="d-flex ai-center">
                <i class="iconfont icon-menu1"></i>
                <strong class="text-blue fs-lg ml-1">相關資訊</strong>
            </div>
            <div class="pt-2 fs-md ">
                <router-link tag="div"
                             class="py-1"
                             v-for="item in model.related"
                             :key="item._id"
                             :to="`/article/${item._id}`">
                    {{item.title}}
                </router-link>
            </div>
        </div>


    </div>
</template>

<script>
    export default {
        name: "Article",
        props: {
            id: {required: true}
        },
        data() {
            return {
                model: null
            }
        },
        watch: {
            id() {
                this.fetch()
            }
        },
        methods: {
            async fetch() {
                const res = await this.$http.get(`articles/${this.id}`)
                this.model = res.data
            }
        },
        created() {
            this.fetch()
        }

    }
</script>

<style lang="scss">
    .page-article {
        .icon-Back {
            font-size: 1.693rem;
        }

        .body {
            img {
                max-width: 100%;
                height: auto
            }

            iframe {
                width: 100%;
                height: auto
            }


        }
    }
</style>
