/* eslint-disable */
import type * as Types from '../../../../@types'

export type Methods = {
  /** 運営側で任意の数のみプリセットするためpaginationは行っていない */
  get: {
    status: 200
    /** Successful Response */
    resBody: Types.QuestRequirementRead[]
  }
}
