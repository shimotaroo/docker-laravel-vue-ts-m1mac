<template>
    <v-app-bar
      app
      color="green"
      dark
    >
      <v-toolbar-title>
        <router-link to="/">
          Yanbaru Qiita
        </router-link>
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-toolbar-items v-if="isLogin">
        <v-btn text>
          <router-link to="/register">
            <v-icon class="mr-1">mdi-pencil-plus</v-icon>投稿する
          </router-link>
        </v-btn>
        <v-btn text @click="logout">
            <v-icon class="mr-1">mdi-account-arrow-right-outline</v-icon>ログアウト
        </v-btn>
      </v-toolbar-items>

      <v-toolbar-items v-else>
        <v-btn text>
          <router-link to="/register">
            <v-icon class="mr-1">mdi-account-plus-outline</v-icon>ユーザー登録
          </router-link>
        </v-btn>
        <v-btn text>
          <router-link to="/login">
            <v-icon class="mr-1">mdi-account-check-outline</v-icon>ログイン
          </router-link>
        </v-btn>
      </v-toolbar-items>

    </v-app-bar>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  computed: {
    isLogin() {
      return this.$store.getters['auth/check']
    },
    userName() {
      return this.$store.getters['auth/userName']
    }
  },
  methods: {
    async logout() {
      await this.$store.dispatch('auth/logout')
      if (this.$route.path !== '/') {
        this.$router.push('/')
      }
    }
  }
})
</script>