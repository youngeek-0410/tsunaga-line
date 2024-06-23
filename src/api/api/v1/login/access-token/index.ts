/* eslint-disable */
import type * as Types from '../../../../@types'

export type Methods = {
  /** ユーザー名またはメールアドレスでログインしてアクセストークンを取得する */
  post: {
    status: 200
    /** Successful Response */
    resBody: Types.Token
    reqFormat: URLSearchParams
    reqBody: Types.Body_login_access_token_api_v1_login_access_token__post
  }
}
