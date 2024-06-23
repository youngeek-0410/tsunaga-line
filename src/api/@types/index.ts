/* eslint-disable */
import type { ReadStream } from 'fs'

export type Body_create_image_memory_api_v1_image_memories__post = {
  image: (File | ReadStream)
  data: ImageMemoryCreate
}

export type Body_create_profile_api_v1_profiles__post = {
  data: ProfileCreateUpdate
  icon?: (File | ReadStream) | undefined
}

export type Body_create_quest_achievement_memory_api_v1_quest_achievement_memories__post = {
  image: (File | ReadStream)
  data: QuestAchievementMemoryCreate
}

export type Body_detect_faces_api_v1_faces__post = {
  /** Image file to detect faces in. Supported formats: .jpg, .jpeg, .png, .heic */
  image: (File | ReadStream)
}

export type Body_login_access_token_api_v1_login_access_token__post = {
  grant_type?: string | null | undefined

  username: string
  password: string
  scope?: string | undefined

  client_id?: string | null | undefined

  client_secret?: string | null | undefined
}

export type Body_send_chat_message_api_v1_chat_rooms__uuid__messages__post = {
  image?: (File | ReadStream) | undefined
  data: ChatMessageCreate
}

export type Body_update_profile_icon_api_v1_profiles__uuid__icon__put = {
  icon?: (File | ReadStream) | undefined
}

export type ChatMessageCreate = {
  /** サーバーからのレスポンスが何らかの理由でロストした場合、重複して送信されることがある。その場合、この値を使って重複を検知する。 */
  clientMessageUuid: string

  text?: string | null | undefined
}

export type ChatMessageRead = {
  timestamp: string

  text?: string | null | undefined

  imageUrl?: string | null | undefined

  sender: SenderRead

  clientMessageUuid: string | null
}

export type ChatRoomCreate = {
  name: string

  originMemoryUuid?: string | null | undefined

  participantUserUsernames?: string[] | undefined
}

export type ChatRoomRead = {
  uuid: string
  name: string
  participantUsers: UserReadForOthers[]

  originMemory?: ImageMemoryRead | QuestAchievementMemoryRead | null | undefined
}

export type FaceDetectionRead = {
  faceLocations: {
    [key: string]: number
  }[]
  duration: number
}

export type GetQuestsFilter = 'all' | 'achieved' | 'not_achieved'

export type HTTPValidationError = {
  detail?: ValidationError[] | undefined
}

export type ImageMemoryCreate = {
  timestamp?: string | null | undefined

  /** Memory作成者が全メンバーのProfileを指定することを前提としているため必ず指定してください。自分のProfileは自動的に追加されます。 */
  memberProfiles: string[]

  lat?: number | null | undefined

  lng?: number | null | undefined

  isPublic?: boolean | undefined
  description: string
  caption: string
  timeLabel: string
}

export type ImageMemoryPublicRead = {
  memoryType: string
  uuid: string
  imageUrl: string
  caption: string
  timeLabel: string

  timestamp: string | null

  screenAddress?: string | null | undefined
}

export type ImageMemoryRead = {
  memoryType: string
  uuid: string
  imageUrl: string
  caption: string
  timeLabel: string

  timestamp: string | null

  screenAddress?: string | null | undefined

  member_profiles: SimpleProfileRead[]

  lat?: number | null | undefined

  lng?: number | null | undefined

  isPublic: boolean
  description: string
}

export type Page_ChatRoomRead_ = {
  items: ChatRoomRead[]

  total: number | null

  page: number | null

  size: number | null

  pages?: number | null | undefined
}

export type Page_ProfileRead_ = {
  items: ProfileRead[]

  total: number | null

  page: number | null

  size: number | null

  pages?: number | null | undefined
}

export type Page_QuestRead_ = {
  items: QuestRead[]

  total: number | null

  page: number | null

  size: number | null

  pages?: number | null | undefined
}

export type Page_QuestRequirementRead_ = {
  items: QuestRequirementRead[]

  total: number | null

  page: number | null

  size: number | null

  pages?: number | null | undefined
}

export type Page_Union_ImageMemoryPublicRead__QuestAchievementMemoryPublicRead__ = {
  items: (ImageMemoryPublicRead | QuestAchievementMemoryPublicRead)[]

  total: number | null

  page: number | null

  size: number | null

  pages?: number | null | undefined
}

export type Page_Union_ImageMemoryRead__QuestAchievementMemoryRead__ = {
  items: (ImageMemoryRead | QuestAchievementMemoryRead)[]

  total: number | null

  page: number | null

  size: number | null

  pages?: number | null | undefined
}

export type ProfileCreateUpdate = {
  /** screen_name is visible to others. */
  screenName: string
  memo?: string | undefined

  /** 紐づけるUserのusername。紐づけない場合はnullを指定する。 */
  linkUserUsername?: string | null | undefined
}

export type ProfileLinkPatch = {
  linkUserUsername: string
}

export type ProfileRead = {
  uuid: string
  screenName: string

  iconUrl?: string | null | undefined

  linkedUser: UserReadForOthers | null

  memo?: string | null | undefined
}

export type QuestAchievementMemoryCreate = {
  timestamp?: string | null | undefined

  /** Memory作成者が全メンバーのProfileを指定することを前提としているため必ず指定してください。自分のProfileは自動的に追加されます。 */
  memberProfiles: string[]

  lat?: number | null | undefined

  lng?: number | null | undefined

  isPublic?: boolean | undefined
  description: string
  caption: string
  timeLabel: string
  questUuid: string
  achievedRequirementUuids: string[]
}

export type QuestAchievementMemoryPublicRead = {
  memoryType: string
  uuid: string
  imageUrl: string
  caption: string
  timeLabel: string

  timestamp: string | null

  screenAddress?: string | null | undefined
}

export type QuestAchievementMemoryRead = {
  memoryType: string
  uuid: string
  imageUrl: string
  caption: string
  timeLabel: string

  timestamp: string | null

  screenAddress?: string | null | undefined

  member_profiles: SimpleProfileRead[]

  lat?: number | null | undefined

  lng?: number | null | undefined

  isPublic: boolean
  description: string
  quest: QuestRead
  achieved_requirements: QuestRequirementRead[]
}

export type QuestCreate = {
  name: string
  originMemoryUuid: string
  requirementUuids: string[]
}

export type QuestRead = {
  uuid: string
  name: string

  originMemory: ImageMemoryRead | QuestAchievementMemoryRead

  requirements: QuestRequirementRead[]
}

export type QuestRequirementCreate = {
  /** 他のユーザーも利用する設計としたため、変更出来ない仕様となっています。 */
  detail: string
}

export type QuestRequirementRead = {
  uuid: string
  detail: string
}

export type SenderRead = {
  username: string
}

export type SimpleProfileRead = {
  uuid: string
  screenName: string

  iconUrl?: string | null | undefined

  owner: UserReadForOthers
}

export type Token = {
  access_token: string
  token_type?: string | undefined
}

export type UserCreate = {
  username: string
  password: string
  email: string
}

export type UserRead = {
  username: string
}

export type UserReadForOthers = {
  username: string
}

export type ValidationError = {
  loc: (string | number)[]
  msg: string
  type: string
}
