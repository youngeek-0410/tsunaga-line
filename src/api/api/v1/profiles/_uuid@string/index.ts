/* eslint-disable */
import type * as Types from '../../../../@types'

export type Methods = {
  /**
   * Update the profile.
   * 
   * ※ 画像の変更は別エンドポイント
   */
  put: {
    status: 200
    /** Successful Response */
    resBody: Types.ProfileRead
    reqBody: Types.ProfileCreateUpdate
  }
}
