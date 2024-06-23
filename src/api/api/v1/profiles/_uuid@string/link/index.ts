/* eslint-disable */
import type * as Types from '../../../../../@types'

export type Methods = {
  /** 仮に作成していたProfileを実Userにリンクする. */
  patch: {
    status: 200
    /** Successful Response */
    resBody: Types.ProfileRead
    reqBody: Types.ProfileLinkPatch
  }
}
