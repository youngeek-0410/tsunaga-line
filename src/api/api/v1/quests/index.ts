/* eslint-disable */
import type * as Types from '../../../@types'

export type Methods = {
  /**
   * Get quests that are related to the current user.
   * 
   * FIXME（要仕様検討）:
   * 
   * origin_memoryが自分のものまたはリンクされたもののかという条件で絞っている。
   * そのため、QuestAchievementMemoryに新メンバーがいる場合、不整合が生じる
   * （しかし、QuestAchievementMemoryで新メンバーを追加したいニーズがあると考えられるので、Createに制限はかけない）
   */
  get: {
    query?: {
      filter?: Types.GetQuestsFilter | undefined
    } | undefined

    status: 200
    /** Successful Response */
    resBody: Types.Page_QuestRead_
  }

  /**
   * Create a new quest.
   * 
   * You need to create QuestRequirement before, and pass the UUIDs of the requirements to this endpoint.
   */
  post: {
    status: 201
    /** Successful Response */
    resBody: Types.QuestRead
    reqBody: Types.QuestCreate
  }
}
