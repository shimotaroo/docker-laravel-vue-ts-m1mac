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

// ステータスコード
import { INTERNAL_SERVER_ERROR } from './util'

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
      handler (value) {
        if (value === INTERNAL_SERVER_ERROR) {
          this.$router.push('/500')
        }
      },
      immediate: true
    },
    $route () {
      this.$store.commit('error/setCode', null)
    }
  }
})
</script>