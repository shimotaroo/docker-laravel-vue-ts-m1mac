<template>
  <v-card max-width="680px" class="mx-auto mt-15">
    <v-card-title class="text-center">
      <p class="mx-auto mt-10 mb-5 px-8 py-2 grey white--text rounded-pill">ログイン</p>
    </v-card-title>
    <v-card-text>
      <v-form @submit.prevent="login" class="mx-auto text-center">
          <v-text-field
            v-model="loginForm.email"
            :rules="[required]"
            label="メールアドレス"
            placeholder="sample@mail.com"
          ></v-text-field>
          <v-text-field
            v-model="loginForm.password"
            :rules="[required, passwordRules]"
            label="パスワード"
            placeholder="********"
          ></v-text-field>
          <v-btn
            type="submit"
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

<script lang="ts">
import Vue from 'vue'

interface LoginFormInterface {
  email: string,
  password: string,
}

interface DataInterface {
  loginForm: LoginFormInterface,
  required: any,
  passwordRules: any
}

export default Vue.extend({
  data(): DataInterface {
    return {
      loginForm: {
        email: '',
        password: '',
      },
      required: (value: string): boolean | string => !!value || "入力必須です",
      passwordRules: (value: string): boolean | string => /^[a-zA-Z0-9]{8,}$/i.test(value) || "8文字以上の半角英数字で入力してください"
    }
  },
  computed: {
    apiStatus (): boolean | null {
       return this.$store.state.auth.apiStatus
    }
  },
  methods: {
    async login() {
      await this.$store.dispatch('auth/login', this.loginForm)

      if (this.apiStatus) {
        // ログイン成功時にトップページに移動する
        this.$router.push('/')
      }
    }
  }
})
</script>