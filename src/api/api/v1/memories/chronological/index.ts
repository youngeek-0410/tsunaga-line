/* eslint-disable */
import type * as Types from '../../../../@types'

export type Methods = {
  /**
   * Get memories that are related to the current user in chronological order.
   * 
   * Sort by `timestamp` if it exists, otherwise sort by `created_at` in descending order.
   */
  get: {
    status: 200
    /** Successful Response */
    resBody: Types.Page_Union_ImageMemoryRead__QuestAchievementMemoryRead__
  }
}
