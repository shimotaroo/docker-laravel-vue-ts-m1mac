import Vue from "vue"
import VueRouter, { RouteConfig } from "vue-router"

// ページコンポーネント
import Top from "./pages/Top.vue"
import Register from "./pages/auth/Register.vue"
import Login from "./pages/auth/Login.vue"
import ArticleCreateForm from './pages/article/Create.vue'
import ArticleDetail from './pages/article/Detail.vue'

// ページコンポーネント（エラー画面）
import SystemError from './pages/errors/System.vue'

//Vuex
import store from './store'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
      path: "/",
      component: Top
  },
  {
    path: "/register",
    component: Register,
    // ナビゲーションガード
    beforeEnter (to, from, next) {
      if (store.getters['auth/check']) {
        next('/')
      } else {
        next()
      }
    }
  },
  {
    path: "/login",
    component: Login,
    // ナビゲーションガード
    beforeEnter (to, from, next) {
      if (store.getters['auth/check']) {
        next('/')
      } else {
        next()
      }
    }
  },
  {
    path: '/article',
    component: ArticleCreateForm,
    // ナビゲーションガード
    beforeEnter (to, from, next) {
      if (store.getters['auth/check']) {
        next()
      } else {
        next('/login')
      }
    }
  },
  {
    path: '/article/:id',
    component: ArticleDetail,
    // props: trueとすることで:idの値がDetail.vueのpropsとして渡される
    props: true
  },
  {
    path: '/500',
    component: SystemError
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
