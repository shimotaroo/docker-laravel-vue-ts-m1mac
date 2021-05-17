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

      <v-toolbar-items>
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