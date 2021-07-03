<template>
  <v-container v-if="isfetchFinish" class="mt-15">
    <v-row>
      <Article
        v-for="(article, index) in articles"
        :key="index"
        :cols="6"
        :article="article"
      />
    </v-row>
    <Pagination :current-page="page" :last-page="lastPage" />
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
// TypeScriptの場合この記述が必要
import axios, { AxiosResponse } from 'axios'
// コンポーネント
import Article from '../components/Article.vue'
import Pagination from '../components/Pagination.vue'
// ステータスコード
import { OK } from '../util'

interface DataInterface {
  articles: object[],
  lastPage: number,
  isfetchFinish: boolean
}

export default Vue.extend({
  components: {
    Article,
    Pagination
  },
  data (): DataInterface {
    return {
      articles: [],
      // Pagination.vueにpropsとして渡すデータ
      lastPage: 0,
      isfetchFinish: false
    }
  },
  props: {
    page: {
      type: Number,
      required: false,
      // URLにクエリパラメータがない'/'の時は1にする
      default: 1
    }
  },
  methods: {
    async fetchArticles () {
      this.isfetchFinish = false

      const response: AxiosResponse = await axios.get(`api/articles/?page=${this.page}`)

      if (response.status !== OK) {
        this.$store.commit('error/setCode', response.status)
      }

      this.articles = response.data.data
      this.lastPage = response.data.last_page

      this.isfetchFinish = true
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
