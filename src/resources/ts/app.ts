// Ajax通信で用いるAxiosライブラリの設定を読み込む
import './bootstrap'

// import Vue.js
import Vue from 'vue'
// import Vue ROuter
import router from './router'

// ipmpoert App.vue
import App from './App.vue'

// Vuetify（アイコン、フォント含む）
import Vuetify from "vuetify"
import 'vuetify/dist/vuetify.min.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import '@mdi/font/css/materialdesignicons.css'

// import store(Vuex)
import store from "./store"

Vue.use(Vuetify);

new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App),
    vuetify: new Vuetify()
})