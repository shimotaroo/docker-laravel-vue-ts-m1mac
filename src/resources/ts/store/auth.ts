// TypeScriptの場合この記述が必要
import axios from "axios"

// Vuexのライブラリからcommit型の型情報をimportする
import { Commit } from "vuex"

interface authState {
  user: object | null
}

interface registerPost {
  name: string
  email: string,
  password: string,
  password_confirmation: string
}

// : authStateでstateの型を定義
const state: authState = {
  user: null
}

const getters = {}

const mutations = {
  setUser (state: authState, user: object) {
    console.log(state.user)
    console.log(user)
    state.user = user
    console.log(state.user)
  }
}

// アクションの第一引数にはContextオブジェクトが渡される
// https://vuex.vuejs.org/ja/api/#actions
// : registerPostでAPIの渡すデータの型定義
const actions = {
  async register (context: { commit: Commit }, payload: registerPost) {
    const response = await axios.post('/api/register', payload)
    console.log(response.data)
    // context.commitでmutationを呼ぶ
    context.commit('setUser', response.data)
  }
}

export default {
  namespaced: true, // モジュールに分けたときにステートやミューテーションの名前が被ってもモジュール名で区別できる
  state,
  getters,
  mutations,
  actions
}