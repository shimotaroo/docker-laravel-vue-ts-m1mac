<template>
  <v-card max-width="680px" class="mx-auto mt-15">
    <v-card-title class="text-center">
      <p class="mx-auto mt-10 mb-5 px-8 py-2 grey white--text rounded-pill">投稿編集</p>
    </v-card-title>
    <v-card-text>
      <!-- preventでデフォルトのフォーム送信の挙動をキャンセルしページリロードを抑制 -->
      <v-form @submit.prevent="update" class="mx-auto text-center">
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
          v-model="title"
          :rules="[required]"
        >
        </v-text-field>
        <v-radio-group
          v-model="category_id"
          row
          :rules="[required]"
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
          v-model="summary"
          :rules="[required]"
        ></v-textarea>
        <v-text-field
          label="URL"
          v-model="url"
          :rules="[required, minLength30]"
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
import { OK, NO_CONTENT, UNPROCESSABLE_ENTITY } from '../../util'

interface DataInterface {
  article: any,
  categoryList: object[],
  title: string,
  category_id: number,
  summary: string,
  url: string,
  validationMessages: object | null,
  required: any,
  minLength30: any
}

export default Vue.extend({
  // router.tsでprops: trueを定義したので:idをpropsとして渡せる
  props: {
    id: {
      type: String,
      required: true
    }
  },
  data (): DataInterface {
    return {
      article: null,
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
  async created () {
    const response: AxiosResponse = await axios.get(`/api/article/${this.id}`)

    if (response.status !== OK) {
      this.$store.commit('error/setCode', response.status)
    }

    this.article = response.data
    this.category_id = this.article.category_id
    this.title = this.article.title
    this.summary = this.article.summary
    this.url = this.article.url
  },
  methods: {
    async update() {
      // フォームのデータをまとめる
      const editForm = {
        title: this.title,
        category_id: this.category_id,
        summary: this.summary,
        url: this.url
      }

      // Laravel（API）にPOSTして登録処理を実行
      const response: AxiosResponse = await axios.put(`/api/article/${this.id}`, editForm)

      // バリデーションエラー
      if (response.status === UNPROCESSABLE_ENTITY) {
        this.validationMessages = response.data.errors
        return
      }

      // それ以外のエラー（システムエラー、更新処理エラー等）
      if (response.status !== NO_CONTENT) {
        this.$store.commit('error/setCode', response.status)
        return
      }

      this.$router.push('/')
    }
  }
})
</script>

<style scoped>
.v-form {
  max-width: 350px;
}
</style>
