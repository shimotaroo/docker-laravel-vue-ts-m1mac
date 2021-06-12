<template>
  <v-container class="mt-15">
    <v-row>
      <v-col
        v-for="(article, index) in articles"
        :key="index"
        cols="6"
      >
        <v-card class="pa-2">
          <v-card-text>
            <v-icon class="mr-2 ml-5">mdi-account-edit</v-icon>{{ article.user.name }}
            <v-divider class="mt-5"></v-divider>
            <v-row class="mt-5">
              <v-col cols="4" class="text-right">タイトル</v-col>
              <v-col cols="8">{{ article.title }}</v-col>
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
          <v-card-actions class="mb-5">
            <v-btn class="text-center mx-auto blue py-2 px-4">
              <router-link to="/login">
                <v-icon class="mr-2">mdi-dots-horizontal-circle-outline</v-icon>詳細を見る
              </router-link>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import axios, { AxiosResponse } from "axios"

interface DataInterface {
  articles: object[],
  count: number
}

export default Vue.extend({
  data () {
    return {
      articles: [],
      count: 0
    }
  },
  methods: {
    async fetchArticles () {
      const response: AxiosResponse = await axios.get('api/articles')
      this.articles = response.data.data
      this.count = this.articles.length
      console.log(this.articles)
      console.log(this.count)
    }
  },
  // $route を監視してページが切り替わったときに fetchArticles が実行される
  // immediate: trueにすることでコンポーネントが生成されたタイミングでも実行される
  watch: {
    $route: {
      async handler () {
        await this.fetchArticles()
      },
      immediate: true
    }
  }
})
</script>
