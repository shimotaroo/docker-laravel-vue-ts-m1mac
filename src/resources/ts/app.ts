import Vue from 'vue'
import router from './router'
import App from './App.vue'
import Vuetify from "vuetify"
import 'vuetify/dist/vuetify.min.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import '@mdi/font/css/materialdesignicons.css'

Vue.use(Vuetify);

new Vue({
    el: '#app',
    router,
    render: h => h(App),
    vuetify: new Vuetify()
})