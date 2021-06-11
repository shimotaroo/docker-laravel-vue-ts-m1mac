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
            <v-icon class="mr-1">mdi-account-edit</v-icon>{{ article.user.name }}
            <v-row class="mt-5">
              <v-col cols="4" class="text-right">タイトル</v-col>
              <v-col cols="6">{{ article.title }}</v-col>
            </v-row>
            <v-row>
              <v-col cols="4" class="text-right">URL</v-col>
              <v-col cols="6"><a :href="article.url">{{ article.url }}</a></v-col>
            </v-row>
            <v-row>
              <v-col cols="4" class="text-right">投稿日時</v-col>
              <v-col cols="6">{{ article.created_at }}</v-col>
            </v-row>
          </v-card-text>
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
