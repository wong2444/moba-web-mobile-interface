<template>
    <div class="home">
        <swiper :options="swiperOption">
            <swiper-slide>
                <img class="w-100" src="../assets/images/210794580bb9303653804bb7b482f2a4.jpeg" alt="">
            </swiper-slide>
            <swiper-slide>
                <img class="w-100" src="../assets/images/210794580bb9303653804bb7b482f2a4.jpeg" alt="">
            </swiper-slide>
            <swiper-slide>
                <img class="w-100" src="../assets/images/210794580bb9303653804bb7b482f2a4.jpeg" alt="">
            </swiper-slide>
            <swiper-slide>
                <img class="w-100" src="../assets/images/210794580bb9303653804bb7b482f2a4.jpeg" alt="">
            </swiper-slide>
            <div class="swiper-pagination pagination-home text-right px-3 pb-2" slot="pagination"></div>
        </swiper>
        <div class="nav-icons bg-white  text-center mt-3 pt-3 text-dark-1">
            <div class="d-flex flex-wrap">
                <div class="nav-item mb-3" v-for="n in 10" :key="n">
                    <i class="sprite sprite-news"></i>
                    <div class="py-2">爆料站</div>
                </div>
            </div>
            <div class="bg-light py-2 fs-sm">
                <i class="sprite sprite-arrow mr-1"></i>
                <span>收起</span>
            </div>
        </div>
        <!--end -of nav icons-->

        <m-list-card icon="menu-1" title="新聞資訊" :categories="newsCats">
            <template #items="{category}">
                <router-link tag="div"
                             class="py-2 fs-lg d-flex"
                             v-for="(news,i) in category.newsList" :key="i"
                             :to="`/article/${news._id}`">
                    <span class="text-info">[{{news.categoryName}}]</span>
                    <span class="px-2">|</span>
                    <span class="flex-1 text-dark-1 text-ellipsis pr-2">{{news.title}}</span>
                    <span class="text-grey-1 fs-sm">{{news.createdAt|date}}</span>
                </router-link>
            </template>

        </m-list-card>


        <m-list-card icon="card-hero" title="英雄列表" :categories="heroCats">
            <template #items="{category}">
                <div class="d-flex flex-wrap" style="margin: 0 -0.5rem">
                    <router-link tag="div" :to="`/hero/${hero._id}`"
                                 class="p-2 text-center" style="width: 20%"
                                 v-for="(hero,i) in category.heroList" :key="i">
                        <img :src="hero.avatar" class="w-100" alt="">
                        <div>{{hero.name}}</div>
                    </router-link>
                </div>
            </template>
        </m-list-card>
    </div>
</template>

<script>

    import dayjs from 'dayjs'

    export default {
        name: 'home',
        filters: {
            date(val) {
                return dayjs(val).format('MM/DD')
            }
        },
        data() {
            return {
                newsCats: [],
                heroCats: [],
                swiperOption: {
                    loop: true,
                    slidesPerView: "auto",
                    // loopedSlides: _this.bannerList.length,
                    autoplay: {
                        disableOnInteraction: false, //手动滑动之后不打断播放
                        delay: 2000
                    },
                    observer: true, //监听，当改变swiper的样式（例如隐藏/显示）或者修改swiper的子元素时，自动初始化swiper。
                    pagination: {
                        el: '.pagination-home'
                    },


                },

                swiperSlides: [1, 2, 3, 4, 5]
            }
        },
        methods: {
            async fetchNewsCats() {
                const res = await this.$http.get('news/list')
                this.newsCats = res.data
            },
            async fetchHeroCats() {
                const res = await this.$http.get('heroes/list')
                this.heroCats = res.data
            }
        },
        created() {
            this.fetchNewsCats()
            this.fetchHeroCats()
        },
        components: {},

    }
</script>
<style lang="scss">

    @import "../assets/scss/variables";

    .pagination-home {
        .swiper-pagination-bullet {
            opacity: 1;
            border-radius: 0.1538rem;
            background: map-get($colors, 'white');

            &.swiper-pagination-bullet-active {
                background: map-get($colors, 'info');
            }
        }
    }

    .nav-icons {
        border-top: 1px solid $border-color;
        border-bottom: 1px solid $border-color;

        .nav-item {

            width: 25%;
            border-right: 1px solid $border-color;

            &:nth-child(4n) {
                border-right: none;
            }
        }
    }

    .sprite {
        background: url(../assets/images/index.png) no-repeat 0 0;
        background-size: 28.8462rem;
        display: inline-block;

        &.sprite-news {
            width: 1.7692rem;
            height: 1.5385rem;
            background-position: 63.546% 15.517%;
        }

        &.sprite-arrow {
            width: 0.7692rem;
            height: 0.7692rem;
            background-position: 38.577% 52.076%;
        }

    }
</style>
