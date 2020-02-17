import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/scss/style.scss'
import './assets/iconfont/iconfont.css'

Vue.config.productionTip = false
import VueAwesomeSwiper from 'vue-awesome-swiper'

// require styles
import 'swiper/dist/css/swiper.css'

Vue.use(VueAwesomeSwiper, /* { default global options } */)

import Card from './components/Card.vue'
import ListCard from './components/ListCard.vue'

Vue.component('m-card', Card)
Vue.component('m-list-card', ListCard)

import axios from 'axios'

Vue.prototype.$http = axios.create({
    baseURL: 'http://localhost:3001/web/api'
})


new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
