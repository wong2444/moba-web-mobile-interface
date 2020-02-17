<template>
    <div class="page-hero" v-if="model">
        <div class="topbar bg-black py-2 px-4 text-white d-flex ai-center">
            <img src="../assets/logo.png" style="height: 30px">
            <div class="px-2 flex-1">
                <span class="text-white">王者榮耀</span>
                <span class="text-white pl-2 ">攻略站</span>
            </div>

            <div class="fs-xs">更多英雄 <span class="fs-lg pl-1" style="vertical-align: middle">&gt</span></div>
        </div>
        <div class="top" :style="{'background-image':`url(${model.banner})`}">
            <div class="info text-white p-3 d-flex flex-column jc-end h-100">
                <div class="fs-sm">{{model.title}}</div>
                <h2 class="my-2">{{model.name}}</h2>
                <div class="fs-sm">{{model.categories.map(v=>{return v.name}).join("/")}}</div>
                <div class="d-flex jc-between">
                    <div class="scores d-flex ai-center" v-if="model.scores">
                        <span class="fs-sm">難度</span>
                        <span class="badge bg-primary">{{model.scores.difficult}}</span>
                        <span class="fs-sm">技能</span>
                        <span class="badge bg-blue-1">{{model.scores.skills}}</span>
                        <span class="fs-sm">攻擊</span>
                        <span class="badge bg-danger">{{model.scores.attack}}</span>
                        <span class="fs-sm">生存</span>
                        <span class="badge bg-dark">{{model.scores.survive}}</span>
                    </div>
                    <router-link to="" tag="span" class="text-grey fs-xs">
                        皮肤：5 &gt
                    </router-link>
                </div>
            </div>
        </div>
        <!--end of top-->
        <div>
            <div class="bg-white px-3">
                <div class="nav d-flex jc-around pt-3 pb-2 border-bottom">
                    <div class="nav-item active">
                        <div class="nav-link">英雄初識</div>
                    </div>
                    <div class="nav-item">
                        <div class="nav-link">進階攻略</div>
                    </div>
                </div>
            </div>
            <swiper>
                <swiper-slide>
                    <div>
                        <div class="p-3 bg-white border-bottom">
                            <div class="d-flex jc-around">
                                <router-link tag="button" to="/" class="btn btn-lg flex-1">
                                    <i class="iconfont icon-menu1"></i>
                                    英雄介紹視頻
                                </router-link>
                                <router-link tag="button" to="/" class="btn btn-lg flex-1 ml-2">
                                    <i class="iconfont icon-menu1"></i>
                                    一圖識英雄
                                </router-link>
                            </div>
                            <div class="skills mt-4">
                                <div class="d-flex jc-around">
                                    <img v-for="(skill,i) in model.skills"
                                         :key="skill.name"
                                         :src="skill.icon"
                                         class="icon"
                                         :class="{active:currentSkillIndex===i}"
                                         @click="currentSkillIndex=i"
                                    />
                                </div>
                                <div v-if="currentSkill">
                                    <div class="d-flex pt-4 pb-3">
                                        <h3 class="m-0">{{currentSkill.name}}</h3>
                                        <span class="text-grey-1 ml-4">
                                            (冷卻值: {{currentSkill.delay}} 消耗: {{currentSkill.cost}})
                                        </span>
                                    </div>
                                    <p>{{currentSkill.description}}</p>
                                    <div class="border-bottom"></div>
                                    <p class="text-grey-1">小提示: {{currentSkill.tips}}</p>
                                </div>
                            </div>
                        </div>
                        <m-card plain icon="menu1" title="出裝推薦" class="hero-items">
                            <div class="fs-xl">順風出裝</div>
                            <div class="d-flex jc-around text-center py-3">
                                <div v-for="item in model.items1.items" :key="item.name">
                                    <img :src="item.icon" class="icon">
                                    <div class="fs-xxs">{{item.name}}</div>
                                </div>
                            </div>
                            <p class="m-0 text-grey pb-3">小提示: {{model.items1.tips}}</p>
                            <div class="border-bottom"></div>

                            <div class="fs-xl pt-3">逆風出裝</div>
                            <div class="d-flex jc-around text-center py-3">
                                <div v-for="item in model.items2.items" :key="item.name">
                                    <img :src="item.icon" class="icon">
                                    <div class="fs-xxs">{{item.name}}</div>
                                </div>
                            </div>
                            <p class="m-0 text-grey pb-3">小提示: {{model.items2.tips}}</p>
                        </m-card>

                        <m-card plain icon="menu1" title="使用技巧">
                            <p class="m-0">{{model.usageTips}}</p>
                        </m-card>

                        <m-card plain icon="menu1" title="對抗技巧">
                            <p class="m-0">{{model.battleTips}}</p>
                        </m-card>
                        <m-card plain icon="menu1" title="團戰思路">
                            <p class="m-0">{{model.teamTips}}</p>

                        </m-card>
                        <m-card plain icon="menu1" title="英雄關係">
                            <p class="m-0">最佳搭擋</p>
                            <div class="d-flex  pb-2" v-for="(partner,i) in model.partners" :key="i">
                                <img class="mt-1" style="height: 60px" :src="partner.hero.avatar">
                                <p class="pl-3 m-0">{{partner.hero.name}}: {{partner.description}}</p>
                            </div>


                        </m-card>
                    </div>
                </swiper-slide>
            </swiper>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Hero",
        props: {
            id: {required: true}
        },
        data() {
            return {
                model: null,
                currentSkillIndex: 0
            }
        },
        computed: {
            currentSkill() {
                return this.model.skills[this.currentSkillIndex]
            }
        },
        methods: {
            async fetch() {
                const res = await this.$http.get(`heroes/${this.id}`)
                this.model = res.data
            }
        },
        created() {
            this.fetch()
        }
    }
</script>

<style lang="scss">
    @import "../assets/scss/variables";

    .page-hero {
        .top {
            height: 50vw;
            background: #fff no-repeat top center;
            background-size: auto 100%;
        }

        .info {
            background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1));

            .scores {
                .badge {
                    margin: 0 0.25rem;
                    display: inline-block;
                    width: 1rem;
                    height: 1rem;
                    line-height: 0.9rem;
                    text-align: center;
                    border-radius: 50%;
                    font-size: 0.6rem;
                    border: 1px solid rgba(255, 255, 255, 0.2);
                }
            }
        }

        .skills {
            img.icon {
                border: 3px solid map-get($colors, 'white');
                border-radius: 50%;
                width: 70px;
                height: 70px;

                &.active {
                    border-color: map-get($colors, 'primary');
                }
            }
        }
    }
    .hero-items{
        img.icon{
            width: 45px;
            height: 45px;
            border-radius: 50%;

        }
    }
</style>
