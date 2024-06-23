/* eslint-disable */
import type * as Types from '../../../@types'

export type Methods = {
  get: {
    status: 200
    /** Successful Response */
    resBody: Types.UserRead
  }

  post: {
    status: 201
    /** Successful Response */
    resBody: Types.UserRead
    reqBody: Types.UserCreate
  }
}
