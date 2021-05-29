// このファイルはAjax 通信で用いる Axios ライブラリの設定を記述

import { getCookieValue } from './util'
import Axios, { AxiosStatic } from 'axios'

declare global {
  interface Window {
    axios: AxiosStatic
  }
}

/**
 * We'll load the axios HTTP library which allows us to easily issue requests
 * to our Laravel back-end. This library automatically handles sending the
 * CSRF token as a header based on the value of the "XSRF" token cookie.
 */

window.axios = Axios

// window.axios = require('axios');

// Ajaxリクエストであることを示すヘッダーを付与する
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

// リクエストを送るときに実行する処理
window.axios.interceptors.request.use(config => {
  // クッキーからトークンを取り出してヘッダーに添付する
  config.headers['X-XSRF-TOKEN'] = getCookieValue('XSRF-TOKEN')

  return config
})

// レスポンスを受けた後の処理を上書きする
// これを書くことでstore/auth.tsのユーザー登録、ログイン、ログアウト、ログインユーザー取得で毎回
// .catch(error => error.response || error)を書かなくて済む
window.axios.interceptors.response.use(
  response => response,
  error => error.response || error
)

/**
 * Echo exposes an expressive API for subscribing to channels and listening
 * for events that are broadcast by Laravel. Echo and event broadcasting
 * allows your team to easily build robust real-time web applications.
 */

// import Echo from 'laravel-echo';

// window.Pusher = require('pusher-js');

// window.Echo = new Echo({
//     broadcaster: 'pusher',
//     key: process.env.MIX_PUSHER_APP_KEY,
//     cluster: process.env.MIX_PUSHER_APP_CLUSTER,
//     forceTLS: true
// });
