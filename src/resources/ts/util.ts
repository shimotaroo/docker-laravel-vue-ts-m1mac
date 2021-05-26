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
export const OK = 200
export const CREATED = 201
export const INTERNAL_SERVER_ERROR = 500