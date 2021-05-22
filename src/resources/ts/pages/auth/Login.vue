<template>
  <v-card max-width="680px" class="mx-auto mt-15">
    <v-card-title class="text-center">
      <p class="mx-auto mt-10 mb-5 px-8 py-2 grey white--text rounded-pill">ログイン</p>
    </v-card-title>
    <v-card-text>
      <v-form class="mx-auto text-center">
          <v-text-field label="メールアドレス"></v-text-field>
          <v-text-field label="パスワード"></v-text-field>
          <v-btn
            large
            elevation="3"
            class="mt-5 mb-10 mx-auto blue white--text rounded-lg"
          >
            ログイン
          </v-btn>
      </v-form>
    </v-card-text>
  </v-card>
</template>