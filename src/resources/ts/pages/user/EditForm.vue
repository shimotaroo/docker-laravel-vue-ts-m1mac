<template>
  <v-card max-width="680px" class="mx-auto mt-15 pa-2">
    <v-card-title class="text-center">
      <p class="mx-auto mt-10 mb-5 px-8 py-2 grey white--text rounded-pill">ユーザー情報変更</p>
    </v-card-title>
    <v-card-text>
      <!-- preventでデフォルトのフォーム送信の挙動をキャンセルしページリロードを抑制 -->
      <v-form @submit.prevent="update" class="mx-auto text-center">
        <!-- バリデーションメッセージ表示エリア -->
        <div v-if="validationMessages">
          <ul v-if="validationMessages.name" class="error-msg">
            <li v-for="msg in validationMessages.name" :key="msg">{{ msg }}</li>
          </ul>
          <ul v-if="validationMessages.email" class="error-msg">
            <li v-for="msg in validationMessages.email" :key="msg">{{ msg }}</li>
          </ul>
        </div>
        <!-- 入力フォーム表示エリア -->
        <v-text-field
          label="名前"
          v-model="name"
          :rules="[required]"
        >
        </v-text-field>
        <v-text-field
          label="メールアドレス"
          v-model="email"
          :rules="[required]"
        >
        </v-text-field>
        <v-btn
          large
          elevation="3"
          type="submit"
          class="mt-5 mb-10 mx-auto blue white--text rounded-lg"
        >
          変更する
        </v-btn>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue'
// TypeScriptの場合この記述が必要
import axios, { AxiosResponse } from "axios"
// ステータスコード
import { OK, UNPROCESSABLE_ENTITY } from '../../util'


interface DataInterface {
  name: string,
  email: string
  validationMessages: object | null,
  required: any,
}

export default Vue.extend({
  data (): DataInterface {
    return {
      name: '',
      email: '',
      validationMessages: null,
      required: (value: string): boolean | string => !!value || "入力必須です"
    }
  },
  created () {
    const authUser = this.$store.state.auth.user

    if (!authUser) {
      this.$router.push('/')
    }

    this.name = authUser.name
    this.email = authUser.email
  },
  methods: {
    async update () {
      // フォームのデータをまとめる
      const editForm = {
        name: this.name,
        email: this.email,
      }

      // Laravel（API）にPOSTしてユーザー情報変更処理を実行
      const response: AxiosResponse = await axios.put(`/api/user`, editForm)

      // バリデーションエラー
      if (response.status === UNPROCESSABLE_ENTITY) {
        this.validationMessages = response.data.errors
        return
      }

      // それ以外のエラー（システムエラー、更新処理エラー等）
      if (response.status !== OK) {
        this.$store.commit('error/setCode', response.status)
        return
      }

      this.$store.commit('auth/setUser', response.data)

      this.$router.push('/')
    }
  }
})
</script>