<template>
  <v-card max-width="680px" class="mx-auto mt-15 pa-2">
    <v-card-title class="text-center">
      <p class="mx-auto mt-10 mb-5 px-8 py-2 grey white--text rounded-pill">マイページ</p>
    </v-card-title>
    <v-card-text>
      <v-row class="mt-5">
        <v-col cols="5" class="text-right">名前</v-col>
        <v-col cols="7">{{ name }}</v-col>
      </v-row>
      <v-row class="mt-5">
        <v-col cols="5" class="text-right">メールアドレス</v-col>
        <v-col cols="7">{{ email }}</v-col>
      </v-row>
      <v-row class="mt-5">
        <v-col cols="5" class="text-right">最終更新日</v-col>
        <v-col cols="7">{{ updated_at }}</v-col>
      </v-row>
    </v-card-text>
    <v-card-actions class="mt-5 mb-15">
      <v-btn class="text-center blue ml-auto py-4 px-8" width="160px">
        <router-link to="/">
          <v-icon class="mr-2">mdi-arrow-left</v-icon>戻る
        </router-link>
      </v-btn>
      <v-btn class="text-center mr-auto green py-4 px-8" width="160px">
        <router-link to="/">
          <v-icon class="mr-2">mdi-account-edit-outline</v-icon>編集する
        </router-link>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue'
import moment from 'moment'

interface DataInterface {
  id: number | null,
  name: string,
  email: string
  updated_at: string
}

export default Vue.extend({
  data (): DataInterface {
    return {
      id: null,
      name: '',
      email: '',
      updated_at: ''
    }
  },
  created () {
    const authUser = this.$store.state.auth.user

    console.log(authUser)

    if (!authUser) {
      this.$router.push('/')
    }

    this.id = authUser.id
    this.name = authUser.name
    this.email = authUser.email
    // Moment.jsでフォーマットする
    // https://momentjs.com/docs/
    this.updated_at = moment(authUser.updated_at).format('YYYY-MM-DD')
  }
})
</script>