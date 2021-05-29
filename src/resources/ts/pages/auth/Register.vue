<template>
  <v-card max-width="680px" class="mx-auto mt-15">
    <v-card-title class="text-center">
      <p class="mx-auto mt-10 mb-5 px-8 py-2 grey white--text rounded-pill">ユーザー登録</p>
    </v-card-title>
    <v-card-text>
      <!-- preventでデフォルトのフォーム送信の挙動をキャンセルしページリロードを抑制 -->
      <v-form @submit.prevent="register" class="mx-auto text-center">
        <!-- バリデーションメッセージ表示エリア -->
        <div v-if="registerErrorMessages">
          <ul v-if="registerErrorMessages.name" class="error-msg">
            <li v-for="msg in registerErrorMessages.name" :key="msg">{{ msg }}</li>
          </ul>
          <ul v-if="registerErrorMessages.email" class="error-msg">
            <li v-for="msg in registerErrorMessages.email" :key="msg">{{ msg }}</li>
          </ul>
          <ul v-if="registerErrorMessages.password" class="error-msg">
            <li v-for="msg in registerErrorMessages.password" :key="msg">{{ msg }}</li>
          </ul>
        </div>
        <!-- 入力フォーム表示エリア -->
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
import { mapState } from 'vuex'

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
  // computed: {
  //   apiStatus () {
  //     return this.$store.state.auth.apiStatus
  //   },
  //   registerErrorMessages () {
  //     return this.$store.state.auth.registerErrorMessages
  //   }
  // },
  // 上記のcomputedをmap関数を使って書く
  computed: {
    ...mapState('auth',['apiStatus', 'registerErrorMessages'])
  },
  methods: {
    async register() {
      // this.$store.dispach('A/B', data)
      // store/A.tsというストアのBアクションを呼ぶ。dataを引数として送る
      await this.$store.dispatch('auth/register', this.registerForm)

      if (this.apiStatus) {
        this.$router.push('/')
      }
    },
    clearError() {
      this.$store.commit('auth/setRegisterErrorMessages', null)
    }
  },
  // ページ遷移した時にバリデーションメッセージをリセットする
  // これがないと別画面遷移後にログイン画面に戻ってもバリデーションメッセージが残り続ける
  created () {
    this.clearError()
  }
})
</script>