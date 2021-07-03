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
import UserEditForm from './pages/user/EditForm.vue'

// エラー画面
import ConflictError from './pages/errors/Conflict.vue'
import SystemError from './pages/errors/System.vue'
import NotFound from './pages/errors/NotFound.vue'


Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
      path: "/",
      component: Top,
      // クエリパラメータ page の値が、page という props として渡される
      // propsに関数を指定する場合はその返り値がpropsとして渡される
      // 関数の引数にはルート情報を表すroute
      props: route => {
        const page: any = route.query.page
        return { page: /^[1-9][0-9]*$/.test(page) ? page * 1 : 1 }
      }
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
    path: '/user/edit',
    component: UserEditForm,
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
  },
  // *は任意の意味（定義されたルート以外のパスは全てここになる）
  {
    path: '*',
    component: NotFound
  }
]

// VueRouterインスタンスを生成する時の処理
const router = new VueRouter({
  mode: 'history',
  // scrollBehaviorの使い方：https://router.vuejs.org/ja/guide/advanced/scroll-behavior.html
  scrollBehavior () {
    return { x: 0, y: 0 }
  },
  routes
})

export default router
