// TypeScriptの場合この記述が必要
import axios, { AxiosResponse } from "axios"

// Vuexのライブラリからcommit型の型情報をimportする
import { Commit } from "vuex"

interface user {
  name: string,
  email: string,
  password: string,
  password_confirmation: string,
  email_verified_at: string
  remember_token: string,
  created_at: string,
  updated_at: string
}

interface authState {
  user: user | null
}

// : authStateでstateの型を定義
const state: authState = {
  user: null
}

const getters = {
  check: (state: authState) => !! state.user,
  userName: (state: authState) => state.user ? state.user.name : ''
}

const mutations = {
  setUser (state: authState, user: user): void {
    state.user = user
  }
}

// アクションの第一引数にはContextオブジェクトが渡される
// https://vuex.vuejs.org/ja/api/#actions
// : registerPostでAPIの渡すデータの型定義
const actions = {
  // ユーザー登録
  async register (
    context: { commit: Commit },
    payload: {name: string, email: string, password: string, password_confirmation: string }
  ) {
    const response = await axios.post('/api/register', payload)
    console.log(response.data)
    // context.commitでmutationを呼ぶ
    context.commit('setUser', response.data)
  },
  // ログイン
  async login (
    context: { commit: Commit },
    payload: { email: string, password: string }
    ) {
    const response = await axios.post('/api/login', payload)
    context.commit('setUser', response.data)
  },
  // ログアウト
  async logout (context: { commit: Commit }) {
    const response = await axios.post('/api/logout')
    context.commit('setUser', null)
  },
  async fetchLoginUser(context: { commit: Commit }) {
    const response: AxiosResponse = await axios.get('/api/fetchLoginUser')
    const user: user | null = response.data || null
    context.commit('setUser', user)
  }
}

export default {
  namespaced: true, // モジュールに分けたときにステートやミューテーションの名前が被ってもモジュール名で区別できる
  state,
  getters,
  mutations,
  actions
}