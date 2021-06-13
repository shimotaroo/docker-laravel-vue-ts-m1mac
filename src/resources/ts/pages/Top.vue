<template>
  <v-container class="mt-15">
    <v-row>
      <Article
        v-for="(article, index) in articles"
        :key="index"
        :cols="6"
        :article="article"
      />
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
// TypeScriptの場合この記述が必要
import axios, { AxiosResponse } from 'axios'
// コンポーネント
import Article from '../components/Article.vue'
// ステータスコード
import { OK } from '../util'

interface DataInterface {
  articles: object[],
}

export default Vue.extend({
  components: {
    Article
  },
  data (): DataInterface {
    return {
      articles: [],
    }
  },
  methods: {
    async fetchArticles () {
      const response: AxiosResponse = await axios.get('api/articles')

      if (response.status !== OK) {
        this.$store.commit('error/setCode', response.status)
      }

      this.articles = response.data.data
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
