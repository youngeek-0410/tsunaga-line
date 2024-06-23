/* eslint-disable */
import type * as Types from '../../../@types'

export type Methods = {
  /**
   * Get owned profiles of the current user excluding my profile.
   * 
   * `q`:
   *     Search query for screen_name or linked_user.username. (case-insensitive)
   *     If `q` is None, return all profiles.
   */
  get: {
    query?: {
      q?: string | null | undefined
    } | undefined

    status: 200
    /** Successful Response */
    resBody: Types.Page_ProfileRead_
  }

  post: {
    status: 201
    /** Successful Response */
    resBody: Types.ProfileRead
    reqFormat: FormData
    reqBody: Types.Body_create_profile_api_v1_profiles__post
  }
}
