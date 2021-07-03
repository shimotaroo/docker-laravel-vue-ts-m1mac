// Vuetifyを使わないページネーションの作り方は以下のリポジトリ参照
// https://github.com/shimotaroo/Vue-VueRouter-Vuex-Laravel-Docker-SPA/blob/main/web/resources/js/components/Pagination.vue
// https://github.com/shimotaroo/Vue-VueRouter-Vuex-Laravel-Docker-SPA/blob/main/web/resources/js/pages/PhotoList.vue
// 参考チュートリアル：https://www.hypertextcandy.com/vue-laravel-tutorial-list-photos-part-2#%E3%83%9A%E3%83%BC%E3%82%B8%E3%83%8D%E3%83%BC%E3%82%B7%E3%83%A7%E3%83%B3

<template>
  <div class="text-center my-10">
    <v-pagination
      v-model="page"
      :length="lastPage"
      prev-icon="mdi-menu-left"
      next-icon="mdi-menu-right"
      @input="changePage"
    ></v-pagination>
  </div>
</template>

<script lang="ts">
import Vue from "vue"

interface DataInterface {
  page: number
}

export default Vue.extend({
  props: {
    // 現在ページ数
    currentPage: {
      type: Number,
      required: true
    },
    // 最後のページ数＝総ページ数
    lastPage: {
      type: Number,
      required: true
    }
  },
  data (): DataInterface {
    return {
      page: this.currentPage ? this.currentPage : 1
    }
  },
  methods: {
    changePage (pageNumber: number) {
      this.$router.push(`/?page=${pageNumber}`)
    }
  }
})
</script>