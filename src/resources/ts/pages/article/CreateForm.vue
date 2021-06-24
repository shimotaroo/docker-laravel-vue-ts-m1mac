<template>
  <v-card max-width="680px" class="mx-auto mt-15">
    <v-card-title class="text-center">
      <p class="mx-auto mt-10 mb-5 px-8 py-2 grey white--text rounded-pill">新規投稿</p>
    </v-card-title>
    <v-card-text>
      <!-- preventでデフォルトのフォーム送信の挙動をキャンセルしページリロードを抑制 -->
      <v-form @submit.prevent="store" class="mx-auto text-center">
        <!-- バリデーションメッセージ表示エリア -->
        <div v-if="validationMessages">
          <ul v-if="validationMessages.title" class="error-msg">
            <li v-for="msg in validationMessages.title" :key="msg">{{ msg }}</li>
          </ul>
          <ul v-if="validationMessages.category_id" class="error-msg">
            <li v-for="msg in validationMessages.category_id" :key="msg">{{ msg }}</li>
          </ul>
          <ul v-if="validationMessages.summary" class="error-msg">
            <li v-for="msg in validationMessages.summary" :key="msg">{{ msg }}</li>
          </ul>
          <ul v-if="validationMessages.url" class="error-msg">
            <li v-for="msg in validationMessages.url" :key="msg">{{ msg }}</li>
          </ul>
        </div>
        <!-- 入力フォーム表示エリア -->
        <v-text-field
          label="タイトル"
          placeholder="例）Laravelのディレクトリ構成まとめ"
          :rules="[required]"
          v-model="title"
        >
        </v-text-field>
        <v-radio-group
          v-model="category_id"
          :rules="[required]"
          row
        >
          <v-radio
            v-for="item in categoryList"
            :label="item.label"
            :value="item.id"
            :key="item.id"
          ></v-radio>
        </v-radio-group>
        <v-textarea
          counter
          label="概要"
          placeholder="例）PHPのフレームワークであるLaravelのデフォルトのディレクトリ構成についてまとめました。"
          :rules="[required, minLength30]"
          v-model="summary"
        ></v-textarea>
        <v-text-field
          label="URL"
          :rules="[required]"
          v-model="url"
        >
        </v-text-field>
        <v-btn
          large
          elevation="3"
          type="submit"
          class="mt-5 mb-10 mx-auto blue white--text rounded-lg"
        >
          投稿する
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
import { CREATED,UNPROCESSABLE_ENTITY } from '../../util'

// dataプロパティの型定義
interface DataInterface {
  categoryList: object[],
  title: string,
  category_id: number,
  summary: string,
  url: string
  validationMessages: object | null,
  required: any,
  minLength30: any
}

export default Vue.extend({
  data(): DataInterface {
    return {
      categoryList: [
        {id: 1, label: 'Laravel'},
        {id: 2, label: 'PHP'},
        {id: 3, label: 'Web知識'},
      ],
      title: '',
      category_id: 1,
      summary: '',
      url: '',
      validationMessages: null,
      required: (value: string): boolean | string => !!value || "入力必須です",
      minLength30: (value: string): boolean | string => value.length >= 30 || "30文字以上で入力してください"
    }
  },
  methods: {
    async store() {
      // フォームのデータをまとめる
      const createForm = {
        title: this.title,
        category_id: this.category_id,
        summary: this.summary,
        url: this.url
      }

      // Laravel（API）にPOSTして登録処理を実行
      const response: AxiosResponse = await axios.post('/api/article/store', createForm)
      if (response.status === UNPROCESSABLE_ENTITY) {
        this.validationMessages = response.data.errors
        return
      }

      if (response.status !== CREATED) {
        this.$store.commit('error/setCode', response.status)
        return
      }

      this.clearForm()
      this.$router.push('/')
    },
    clearForm () {
      this.title = ''
      this.category_id = 1
      this.summary = ''
      this.url = ''
    }
  },
})
</script>

<style scoped>
.v-form {
  max-width: 350px;
}
</style>
