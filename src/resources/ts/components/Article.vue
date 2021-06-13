<template>
  <v-col>
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
        <v-btn class="text-center mx-auto blue py-4 px-8">
          <router-link :to="`/article/${article.id}`">
            <v-icon class="mr-2">mdi-dots-horizontal-circle-outline</v-icon>詳細を見る
          </router-link>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-col>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    article: {
      type: Object,
      required: false
    }
  }
})
</script>
