<template>
  <v-app>
    <Header />
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue'

// コンポーネント
import Header from './components/Header.vue'

// TypeScriptの場合この記述が必要
import axios from "axios"

// ステータスコード
import { NOT_FOUND, CONFRICT, UNAUTHORIZED, INTERNAL_SERVER_ERROR } from './util'

export default Vue.extend({
  components: {
    Header
  },
  computed: {
    errorCode (): number | null {
      return this.$store.state.error.code
    }
  },
  watch: {
    errorCode: {
      async handler (value) {
        if (value === INTERNAL_SERVER_ERROR) {
          this.$router.push('/500')
        } else if (value === CONFRICT) {
          this.$router.push('/409')
        } else if (value === UNAUTHORIZED) {
          // トークンをリフレッシュ
          await axios.get('/api/refresh-token')
          // ストアのuserをクリア（クリアしておかないとログインページにアクセスできない）
          this.$store.commit('auth/setUser', null)
          // ログイン画面へ
          this.$router.push('/login')
        } else if (value === NOT_FOUND) {
          this.$router.push('404')
        }
      },
      // immediate: trueにすることでコンポーネントが生成されたタイミングでも実行される
      immediate: true
    },
    // $route を監視してページが切り替わったときに fetchArticles が実行される
    $route () {
      this.$store.commit('error/setCode', null)
    }
  }
})
</script>