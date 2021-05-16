import Vue from 'vue'
// import router from './router'
// import App from './App.vue'
import Vuetify from "vuetify";

Vue.use(Vuetify);

new Vue({
    el: '#app',
    // router,
    // components: { App },
    // template: '<App />',
    template: '<h1>Hello world!!!</h1>',
    vuetify: new Vuetify()
})