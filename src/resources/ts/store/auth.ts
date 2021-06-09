// TypeScriptの場合この記述が必要
import axios, { AxiosResponse } from "axios"

// Vuexのライブラリからcommit型の型情報をimportする
import { Commit } from "vuex"

// ステータスコード
import { OK, CREATED,UNPROCESSABLE_ENTITY } from '../util'

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
  user: user | null,
  apiStatus: boolean | null,
  loginErrorMessages: object | null
  registerErrorMessages: object | null
}

// : authStateでstateの型を定義
const state: authState = {
  user: null,
  apiStatus: null,
  loginErrorMessages: null,
  registerErrorMessages: null
}

const getters = {
  check: (state: authState) => !! state.user,
}

const mutations = {
  setUser (state: authState, user: user): void {
    state.user = user
  },
  setApiStatus (state: authState, apiStatus: boolean | null) {
    state.apiStatus = apiStatus
  },
  setRegisterErrorMessages (state: authState, registerErrorMessages: object | null) {
    state.registerErrorMessages = registerErrorMessages
  },
  setLoginErrorMessages (state: authState, loginErrorMessages: object | null) {
    state.loginErrorMessages = loginErrorMessages
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
    // レスポンスステータスをリセット
    context.commit('setApiStatus', null)
    // APIにPOST
    const response: AxiosResponse = await axios.post('/api/register', payload)

    // ユーザー登録成功
    if (response.status === CREATED) {
      // context.commitでmutationを呼ぶ
      context.commit('setApiStatus', true)
      context.commit('setUser', response.data)
      return
    }

    // ユーザー登録失敗
    context.commit('setApiStatus', false)
    if (response.status === UNPROCESSABLE_ENTITY) {
      // バリデーションエラーの場合はエラーメッセージをセット
      context.commit('setRegisterErrorMessages', response.data.errors)
    } else {
      // 別モジュール（ストア）のミューテーションを呼び出す場合は第三引数に{ root: true }を定義
      context.commit('error/setCode', response.status, { root: true })
    }
  },

  // ログイン
  async login (
    context: { commit: Commit },
    payload: { email: string, password: string }
    ) {
    // レスポンスステータスをリセット
    context.commit('setApiStatus', null)
    // APIにPOST
    const response: AxiosResponse = await axios.post('/api/login', payload)
      // .catch(error => error.response || error) bootstrap.tsにまとめて定義したので不要

    // ログイン成功
    if (response.status === OK) {
      context.commit('setApiStatus', true)
      context.commit('setUser', response.data)
      return
    }
    // ログイン失敗
    context.commit('setApiStatus', false)
    if (response.status === UNPROCESSABLE_ENTITY) {
      // バリデーションエラーの場合はエラーメッセージをセット
      context.commit('setLoginErrorMessages', response.data.errors)
    } else {
      // 別モジュール（ストア）のミューテーションを呼び出す場合は第三引数に{ root: true }を定義
      context.commit('error/setCode', response.status, { root: true })
    }
  },

  // ログアウト
  async logout (context: { commit: Commit }) {
    // レスポンスステータスをリセット
    context.commit('setApiStatus', null)
    // APIにPOST
    const response: AxiosResponse = await axios.post('/api/logout')

    // 成功
    if (response.status === OK) {
      context.commit('setApiStatus', true)
      context.commit('setUser', null)
      return
    }
    // 失敗
    context.commit('setApiStatus', false)
    context.commit('error/setCode', response.status, { root: true })
  },

  // ログインユーザー取得（ログインしてなかったらnull、してたらユーザーオブジェクト）
  async fetchLoginUser(context: { commit: Commit }) {
    // レスポンスステータスをリセット
    context.commit('setApiStatus', null)
    // APIにGET
    const response: AxiosResponse = await axios.get('/api/fetchLoginUser')
    const user: user | null = response.data || null

    // API成功
    if (response.status === OK) {
      context.commit('setApiStatus', true)
      context.commit('setUser', user)
      return
    }
    // API失敗
    context.commit('setApiStatus', false)
    context.commit('error/setCode', response.status, { root: true })
  }
}

export default {
  namespaced: true, // モジュールに分けたときにステートやミューテーションの名前が被ってもモジュール名で区別できる
  state,
  getters,
  mutations,
  actions
}