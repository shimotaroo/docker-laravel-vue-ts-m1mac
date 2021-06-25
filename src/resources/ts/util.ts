/**
 * クッキーの値を取得
 */
export function getCookieValue(searchKey: string) {
  if (typeof searchKey === 'undefined') {
    return ''
  }

  let val: string = ''

  document.cookie.split(';').map(cookie => {
    const [key, value] = cookie.split('=')
    if (key === searchKey) {
      return val = value
    }
    return ''
  })

  return val
}

/**
 * レスポンスコードを定義
 * ハードコードされるのを防ぐ
 */
export const OK = 200 // 成功
export const CREATED = 201 // レコード作成成功
export const NO_CONTENT = 204 // 更新成功時
export const CONFRICT = 409 // 更新エラー
export const UNPROCESSABLE_ENTITY = 422 // バリデーションエラー
export const INTERNAL_SERVER_ERROR = 500 // システムエラー