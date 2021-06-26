<template>
  <v-card max-width="680px" class="mx-auto mt-15 pa-2" v-if="article">
    <v-card-title class="text-center">
      <p class="mx-auto mt-10 mb-5 px-8 py-2 grey white--text rounded-pill">投稿詳細</p>
    </v-card-title>
    <v-card-text>
      <v-row align="center">
        <v-col>
          <v-icon class="mr-2 ml-5">mdi-account-edit</v-icon>{{ article.user.name }}
        </v-col>
        <v-col v-if="isOwnArticle" class="text-right">
            <v-btn class="text-center green py-4 px-8">
            <router-link :to="`/article/${article.id}/edit`">
                <v-icon class="mr-2">mdi-file-edit-outline</v-icon>編集する
            </router-link>
            </v-btn>
        </v-col>
      </v-row>
      <v-divider class="mt-5"></v-divider>
      <v-row class="mt-5">
        <v-col cols="4" class="text-right">タイトル</v-col>
        <v-col cols="8">{{ article.title }}</v-col>
      </v-row>
      <v-row class="mt-5">
        <v-col cols="4" class="text-right">カテゴリー</v-col>
        <v-col cols="8">{{ article.category.name }}</v-col>
      </v-row>
      <v-row>
        <v-col cols="4" class="text-right">URL</v-col>
        <v-col cols="8"><a :href="article.url">{{ article.url }}</a></v-col>
      </v-row>
      <v-row>
        <v-col cols="4" class="text-right">投稿日時</v-col>
        <v-col cols="8">{{ article.created_at }}</v-col>
      </v-row>
    </v-card-text>
    <v-card-actions class="mt-5 mb-15">
      <v-btn class="text-center mx-auto blue py-4 px-8">
        <router-link to="/">
          <v-icon class="mr-2">mdi-arrow-left</v-icon>戻る
        </router-link>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue'
// TypeScriptの場合この記述が必要
import axios, { AxiosResponse } from "axios"
// ステータスコード
import { OK } from '../../util'

interface DataInterface {
  article: any
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
      article: null
    }
  },
  computed: {
    // ログインユーザーと記事のユーザーが一致しているかどうか（＝編集できるかどうかの判定用）
    isOwnArticle (): Boolean {
      if (!this.article ) {
        return false
      }
      const authUser = this.$store.state.auth.user

      if (!authUser) {
        return false
      }

      return this.article.user_id === authUser.id
    }
  },
  async created () {
    const response: AxiosResponse = await axios.get(`/api/article/${this.id}`)

    if (response.status !== OK) {
      this.$store.commit('error/setCode', response.status)
    }

    this.article = response.data
  }
})
</script>
