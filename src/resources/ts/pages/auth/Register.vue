<template>
  <v-card max-width="680px" class="mx-auto mt-15">
    <v-card-title class="text-center">
      <p class="mx-auto mt-10 mb-5 px-8 py-2 grey white--text rounded-pill">ユーザー登録</p>
    </v-card-title>
    <v-card-text>
      <!-- preventでデフォルトのフォーム送信の挙動をキャンセルしページリロードを抑制 -->
      <v-form @submit.prevent="register" class="mx-auto text-center">
          <v-text-field
            label="名前"
            placeholder="やんばる太郎"
            :rules="[required]"
            v-model="registerForm.name"
          >
          </v-text-field>
          <v-text-field
            label="メールアドレス"
            placeholder="sample@mail.com"
            :rules="[required]"
            v-model="registerForm.email"
          >
          </v-text-field>
          <v-text-field
            label="パスワード"
            type="password"
            :rules="[required, passwordRules]"
            v-model="registerForm.password"
          >
          </v-text-field>
          <v-text-field
            label="パスワード（確認）"
            type="password"
            :rules="[required, passwordRules]"
            v-model="registerForm.password_confirmation"
          >
          </v-text-field>
          <v-btn
            large
            elevation="3"
            type="submit"
            class="mt-5 mb-10 mx-auto blue white--text rounded-lg"
          >
            登録
          </v-btn>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue'

// 登録フォームの型定義
interface RegisterFormInterface {
  name: string,
  email: string,
  password: string,
  password_confirmation: string
}

// dataプロパティの型定義
interface DataInterface {
  registerForm: RegisterFormInterface,
  required: any,
  passwordRules: any,
}

export default Vue.extend({
  data(): DataInterface {
    return {
      registerForm: {
        name: "",
        email: "",
        password: "",
        password_confirmation: ""
      },
      required: (value: string): boolean | string => !!value || "入力必須です",
      passwordRules: (value: string): boolean | string => /^[a-zA-Z0-9]{8,}$/i.test(value) || "8文字以上の半角英数字で入力してください"
    }
  },
  methods: {
    register() {
    }
  }
})
</script>