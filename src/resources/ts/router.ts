import Vue from "vue"
// Vue Router
import VueRouter, { RouteConfig } from "vue-router"
//Vuex
import store from './store'

// =========================================
// ページコンポーネント
// =========================================
import Top from "./pages/Top.vue"

// 認証
import Register from "./pages/auth/Register.vue"
import Login from "./pages/auth/Login.vue"
// 投稿
import ArticleCreateForm from './pages/article/CreateForm.vue'
import ArticleDetail from './pages/article/Detail.vue'
import ArticleEditForm from './pages/article/EditForm.vue'

// ユーザー
import Mypage from './pages/user/Mypage.vue'

// エラー画面
import ConflictError from './pages/errors/Conflict.vue'
import SystemError from './pages/errors/System.vue'


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
    path: '/article/:id/edit',
    component: ArticleEditForm,
    // props: trueとすることで:idの値がDetail.vueのpropsとして渡される
    props: true,
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
    path: '/user',
    component: Mypage,
    beforeEnter (to, from, next) {
      if (store.getters['auth/check']) {
        next()
      } else {
        next('/login')
      }
    }
  },
  {
    path: '/409',
    component: ConflictError
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
