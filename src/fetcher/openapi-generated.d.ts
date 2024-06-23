export interface paths {
  "/api/v1/health/": {
    get: operations["get_api_v1_health__get"];
  };
  "/api/v1/update/": {
    get: operations["get_api_v1_update__get"];
  };
  "/api/v1/login/access-token/": {
    /**
     * Login Access Token
     * @description ユーザー名またはメールアドレスでログインしてアクセストークンを取得する
     */
    post: operations["login_access_token_api_v1_login_access_token__post"];
  };
  "/api/v1/users/": {
    /** Get Current User */
    get: operations["get_current_user_api_v1_users__get"];
    /** Create User */
    post: operations["create_user_api_v1_users__post"];
    /** Delete User */
    delete: operations["delete_user_api_v1_users__delete"];
  };
  "/api/v1/profiles/": {
    get: operations["get_owned_profiles_api_v1_profiles__get"];
    /** Create Profile */
    post: operations["create_profile_api_v1_profiles__post"];
  };
  "/api/v1/profiles/me/": {
    /** Get My Profile */
    get: operations["get_my_profile_api_v1_profiles_me__get"];
  };
  "/api/v1/profiles/{uuid}/": {
    /** Get Profile By Uuid */
    get: operations["get_profile_by_uuid_api_v1_profiles__uuid___get"];
    put: operations["update_profile_api_v1_profiles__uuid___put"];
  };
  "/api/v1/profiles/{username}/": {
    /** Get Profile By Username */
    get: operations["get_profile_by_username_api_v1_profiles__username___get"];
  };
  "/api/v1/profiles/{uuid}/icon/": {
    /** Update Profile Icon */
    put: operations["update_profile_icon_api_v1_profiles__uuid__icon__put"];
  };
  "/api/v1/profiles/{uuid}/link/": {
    patch: operations["link_user_to_profile_api_v1_profiles__uuid__link__patch"];
  };
  "/api/v1/quests/{uuid}/": {
    /** Get Quest */
    get: operations["get_quest_api_v1_quests__uuid___get"];
  };
  "/api/v1/quests/": {
    get: operations["get_quests_api_v1_quests__get"];
    post: operations["create_quest_api_v1_quests__post"];
  };
  "/api/v1/quest-requirements/suggest/": {
    get: operations["get_quest_requirements_suggestion_api_v1_quest_requirements_suggest__get"];
  };
  "/api/v1/quest-requirements/mine/": {
    get: operations["get_my_quest_requirements_api_v1_quest_requirements_mine__get"];
  };
  "/api/v1/quest-requirements/": {
    post: operations["create_quest_requirements_api_v1_quest_requirements__post"];
  };
  "/api/v1/memories/chronological/": {
    get: operations["get_memories_chronologically_api_v1_memories_chronological__get"];
  };
  "/api/v1/memories/random/": {
    get: operations["get_memories_randomly_api_v1_memories_random__get"];
  };
  "/api/v1/memories/public/": {
    /** Get Public Memories */
    get: operations["get_public_memories_api_v1_memories_public__get"];
  };
  "/api/v1/memories/{uuid}/": {
    /** Get Memory */
    get: operations["get_memory_api_v1_memories__uuid___get"];
  };
  "/api/v1/memories/{uuid}/add-own-profile/": {
    post: operations["add_own_profile_to_memory_api_v1_memories__uuid__add_own_profile__post"];
  };
  "/api/v1/image-memories/": {
    /** Create Image Memory */
    post: operations["create_image_memory_api_v1_image_memories__post"];
  };
  "/api/v1/quest-achievement-memories/": {
    /** Create Quest Achievement Memory */
    post: operations["create_quest_achievement_memory_api_v1_quest_achievement_memories__post"];
  };
  "/api/v1/faces/": {
    /** Detect Faces */
    post: operations["detect_faces_api_v1_faces__post"];
  };
}

export type webhooks = Record<string, never>;

export interface components {
  schemas: {
    /** Body_create_image_memory_api_v1_image_memories__post */
    Body_create_image_memory_api_v1_image_memories__post: {
      /**
       * Image
       * Format: binary
       */
      image: string;
      data: components["schemas"]["ImageMemoryCreate"];
    };
    /** Body_create_profile_api_v1_profiles__post */
    Body_create_profile_api_v1_profiles__post: {
      data: components["schemas"]["ProfileCreateUpdate"];
      /**
       * Icon
       * Format: binary
       */
      icon?: string;
    };
    /** Body_create_quest_achievement_memory_api_v1_quest_achievement_memories__post */
    Body_create_quest_achievement_memory_api_v1_quest_achievement_memories__post: {
      /**
       * Image
       * Format: binary
       */
      image: string;
      data: components["schemas"]["QuestAchievementMemoryCreate"];
    };
    /** Body_detect_faces_api_v1_faces__post */
    Body_detect_faces_api_v1_faces__post: {
      /**
       * Image
       * Format: binary
       * @description Image file to detect faces in. Supported formats: .jpg, .jpeg, .png, .heic
       */
      image: string;
    };
    /** Body_login_access_token_api_v1_login_access_token__post */
    Body_login_access_token_api_v1_login_access_token__post: {
      /** Grant Type */
      grant_type?: string | null;
      /** Username */
      username: string;
      /** Password */
      password: string;
      /**
       * Scope
       * @default
       */
      scope?: string;
      /** Client Id */
      client_id?: string | null;
      /** Client Secret */
      client_secret?: string | null;
    };
    /** Body_update_profile_icon_api_v1_profiles__uuid__icon__put */
    Body_update_profile_icon_api_v1_profiles__uuid__icon__put: {
      /**
       * Icon
       * Format: binary
       */
      icon?: string;
    };
    /** FaceDetectionRead */
    FaceDetectionRead: {
      /** Facelocations */
      faceLocations: {
          [key: string]: number;
        }[];
      /** Duration */
      duration: number;
    };
    /**
     * GetQuestsFilter
     * @enum {string}
     */
    GetQuestsFilter: "all" | "achieved" | "not_achieved";
    /** HTTPValidationError */
    HTTPValidationError: {
      /** Detail */
      detail?: components["schemas"]["ValidationError"][];
    };
    /** ImageMemoryCreate */
    ImageMemoryCreate: {
      /** Timestamp */
      timestamp?: string | null;
      /**
       * Memberprofiles
       * @description Memory作成者が全メンバーのProfileを指定することを前提としているため必ず指定してください。自分のProfileは自動的に追加されます。
       */
      memberProfiles: string[];
      /** Lat */
      lat?: number | null;
      /** Lng */
      lng?: number | null;
      /**
       * Ispublic
       * @default false
       */
      isPublic?: boolean;
      /** Description */
      description: string;
      /** Caption */
      caption: string;
      /** Timelabel */
      timeLabel: string;
    };
    /** ImageMemoryPublicRead */
    ImageMemoryPublicRead: {
      /** Memorytype */
      memoryType: string;
      /**
       * Uuid
       * Format: uuid
       */
      uuid: string;
      /** Imageurl */
      imageUrl: string;
      /** Caption */
      caption: string;
      /** Timelabel */
      timeLabel: string;
      /** Timestamp */
      timestamp: string | null;
      /** Screenaddress */
      screenAddress?: string | null;
    };
    /** ImageMemoryRead */
    ImageMemoryRead: {
      /** Memorytype */
      memoryType: string;
      /**
       * Uuid
       * Format: uuid
       */
      uuid: string;
      /** Imageurl */
      imageUrl: string;
      /** Caption */
      caption: string;
      /** Timelabel */
      timeLabel: string;
      /** Timestamp */
      timestamp: string | null;
      /** Screenaddress */
      screenAddress?: string | null;
      /** Member Profiles */
      member_profiles: components["schemas"]["SimpleProfileRead"][];
      /** Lat */
      lat?: number | null;
      /** Lng */
      lng?: number | null;
      /** Ispublic */
      isPublic: boolean;
      /** Description */
      description: string;
    };
    /** NativeUpdateResponse */
    NativeUpdateResponse: {
      /** Version */
      version: string;
      /** Url */
      url: string;
      /** Message */
      message: string;
    };
    /** Page[ProfileRead] */
    Page_ProfileRead_: {
      /** Items */
      items: components["schemas"]["ProfileRead"][];
      /** Total */
      total: number | null;
      /** Page */
      page: number | null;
      /** Size */
      size: number | null;
      /** Pages */
      pages?: number | null;
    };
    /** Page[QuestRead] */
    Page_QuestRead_: {
      /** Items */
      items: components["schemas"]["QuestRead"][];
      /** Total */
      total: number | null;
      /** Page */
      page: number | null;
      /** Size */
      size: number | null;
      /** Pages */
      pages?: number | null;
    };
    /** Page[QuestRequirementRead] */
    Page_QuestRequirementRead_: {
      /** Items */
      items: components["schemas"]["QuestRequirementRead"][];
      /** Total */
      total: number | null;
      /** Page */
      page: number | null;
      /** Size */
      size: number | null;
      /** Pages */
      pages?: number | null;
    };
    /** Page[Union[ImageMemoryPublicRead, QuestAchievementMemoryPublicRead]] */
    Page_Union_ImageMemoryPublicRead__QuestAchievementMemoryPublicRead__: {
      /** Items */
      items: (components["schemas"]["ImageMemoryPublicRead"] | components["schemas"]["QuestAchievementMemoryPublicRead"])[];
      /** Total */
      total: number | null;
      /** Page */
      page: number | null;
      /** Size */
      size: number | null;
      /** Pages */
      pages?: number | null;
    };
    /** Page[Union[ImageMemoryRead, QuestAchievementMemoryRead]] */
    Page_Union_ImageMemoryRead__QuestAchievementMemoryRead__: {
      /** Items */
      items: (components["schemas"]["ImageMemoryRead"] | components["schemas"]["QuestAchievementMemoryRead"])[];
      /** Total */
      total: number | null;
      /** Page */
      page: number | null;
      /** Size */
      size: number | null;
      /** Pages */
      pages?: number | null;
    };
    /** ProfileCreateUpdate */
    ProfileCreateUpdate: {
      /**
       * Screenname
       * @description screen_name is visible to others.
       */
      screenName: string;
      /**
       * Memo
       * @default
       */
      memo?: string;
      /**
       * Linkuserusername
       * @description 紐づけるUserのusername。紐づけない場合はnullを指定する。
       */
      linkUserUsername?: string | null;
    };
    /** ProfileLinkPatch */
    ProfileLinkPatch: {
      /** Linkuserusername */
      linkUserUsername: string;
    };
    /** ProfileRead */
    ProfileRead: {
      /**
       * Uuid
       * Format: uuid
       */
      uuid: string;
      /** Screenname */
      screenName: string;
      /** Iconurl */
      iconUrl?: string | null;
      linkedUser: components["schemas"]["UserReadForOthers"] | null;
      /** Memo */
      memo?: string | null;
    };
    /** QuestAchievementMemoryCreate */
    QuestAchievementMemoryCreate: {
      /** Timestamp */
      timestamp?: string | null;
      /**
       * Memberprofiles
       * @description Memory作成者が全メンバーのProfileを指定することを前提としているため必ず指定してください。自分のProfileは自動的に追加されます。
       */
      memberProfiles: string[];
      /** Lat */
      lat?: number | null;
      /** Lng */
      lng?: number | null;
      /**
       * Ispublic
       * @default false
       */
      isPublic?: boolean;
      /** Description */
      description: string;
      /** Caption */
      caption: string;
      /** Timelabel */
      timeLabel: string;
      /**
       * Questuuid
       * Format: uuid
       */
      questUuid: string;
      /** Achievedrequirementuuids */
      achievedRequirementUuids: string[];
    };
    /** QuestAchievementMemoryPublicRead */
    QuestAchievementMemoryPublicRead: {
      /** Memorytype */
      memoryType: string;
      /**
       * Uuid
       * Format: uuid
       */
      uuid: string;
      /** Imageurl */
      imageUrl: string;
      /** Caption */
      caption: string;
      /** Timelabel */
      timeLabel: string;
      /** Timestamp */
      timestamp: string | null;
      /** Screenaddress */
      screenAddress?: string | null;
    };
    /** QuestAchievementMemoryRead */
    QuestAchievementMemoryRead: {
      /** Memorytype */
      memoryType: string;
      /**
       * Uuid
       * Format: uuid
       */
      uuid: string;
      /** Imageurl */
      imageUrl: string;
      /** Caption */
      caption: string;
      /** Timelabel */
      timeLabel: string;
      /** Timestamp */
      timestamp: string | null;
      /** Screenaddress */
      screenAddress?: string | null;
      /** Member Profiles */
      member_profiles: components["schemas"]["SimpleProfileRead"][];
      /** Lat */
      lat?: number | null;
      /** Lng */
      lng?: number | null;
      /** Ispublic */
      isPublic: boolean;
      /** Description */
      description: string;
      quest: components["schemas"]["QuestRead"];
      /** Achieved Requirements */
      achieved_requirements: components["schemas"]["QuestRequirementRead"][];
    };
    /** QuestCreate */
    QuestCreate: {
      /** Name */
      name: string;
      /**
       * Originmemoryuuid
       * Format: uuid
       */
      originMemoryUuid: string;
      /** Requirementuuids */
      requirementUuids: string[];
    };
    /** QuestRead */
    QuestRead: {
      /**
       * Uuid
       * Format: uuid
       */
      uuid: string;
      /** Name */
      name: string;
      /** Originmemory */
      originMemory: components["schemas"]["ImageMemoryRead"] | components["schemas"]["QuestAchievementMemoryRead"];
      /** Requirements */
      requirements: components["schemas"]["QuestRequirementRead"][];
    };
    /** QuestRequirementCreate */
    QuestRequirementCreate: {
      /**
       * Detail
       * @description 他のユーザーも利用する設計としたため、変更出来ない仕様となっています。
       */
      detail: string;
    };
    /** QuestRequirementRead */
    QuestRequirementRead: {
      /**
       * Uuid
       * Format: uuid
       */
      uuid: string;
      /** Detail */
      detail: string;
    };
    /** SenderRead */
    SenderRead: {
      /** Username */
      username: string;
    };
    /** SimpleProfileRead */
    SimpleProfileRead: {
      /**
       * Uuid
       * Format: uuid
       */
      uuid: string;
      /** Screenname */
      screenName: string;
      /** Iconurl */
      iconUrl?: string | null;
      owner: components["schemas"]["UserReadForOthers"];
    };
    /** Token */
    Token: {
      /** Access Token */
      access_token: string;
      /**
       * Token Type
       * @default bearer
       */
      token_type?: string;
    };
    /** UpdateResponse */
    UpdateResponse: {
      ios: components["schemas"]["NativeUpdateResponse"];
      android: components["schemas"]["NativeUpdateResponse"];
    };
    /** UserCreate */
    UserCreate: {
      /** Username */
      username: string;
      /** Password */
      password: string;
      /** Email */
      email: string;
    };
    /** UserRead */
    UserRead: {
      /** Username */
      username: string;
    };
    /** UserReadForOthers */
    UserReadForOthers: {
      /** Username */
      username: string;
    };
    /** ValidationError */
    ValidationError: {
      /** Location */
      loc: (string | number)[];
      /** Message */
      msg: string;
      /** Error Type */
      type: string;
    };
  };
  responses: never;
  parameters: never;
  requestBodies: never;
  headers: never;
  pathItems: never;
}

export type $defs = Record<string, never>;

export type external = Record<string, never>;

export interface operations {

  /** Get */
  get_api_v1_health__get: {
    responses: {
      /** @description Successful Response */
      200: {
        content: {
          "application/json": {
            [key: string]: string;
          };
        };
      };
    };
  };
  /** Get */
  get_api_v1_update__get: {
    responses: {
      /** @description Successful Response */
      200: {
        content: {
          "application/json": components["schemas"]["UpdateResponse"];
        };
      };
    };
  };
  /**
   * Login Access Token
   * @description ユーザー名またはメールアドレスでログインしてアクセストークンを取得する
   */
  login_access_token_api_v1_login_access_token__post: {
    requestBody: {
      content: {
        "application/x-www-form-urlencoded": components["schemas"]["Body_login_access_token_api_v1_login_access_token__post"];
      };
    };
    responses: {
      /** @description Successful Response */
      200: {
        content: {
          "application/json": components["schemas"]["Token"];
        };
      };
      401: {
        content: {
          "application/json": unknown;
        };
      };
      /** @description Validation Error */
      422: {
        content: {
          "application/json": components["schemas"]["HTTPValidationError"];
        };
      };
    };
  };
  /** Get Current User */
  get_current_user_api_v1_users__get: {
    responses: {
      /** @description Successful Response */
      200: {
        content: {
          "application/json": components["schemas"]["UserRead"];
        };
      };
    };
  };
  /** Create User */
  create_user_api_v1_users__post: {
    requestBody: {
      content: {
        "application/json": components["schemas"]["UserCreate"];
      };
    };
    responses: {
      /** @description Successful Response */
      201: {
        content: {
          "application/json": components["schemas"]["UserRead"];
        };
      };
      409: {
        content: {
          "application/json": unknown;
        };
      };
      /** @description Validation Error */
      422: {
        content: {
          "application/json": components["schemas"]["HTTPValidationError"];
        };
      };
    };
  };
  /** Delete User */
  delete_user_api_v1_users__delete: {
    responses: {
      /** @description Successful Response */
      204: {
        content: never;
      };
    };
  };
  get_owned_profiles_api_v1_profiles__get: {
    parameters: {
      query?: {
        q?: string | null;
      };
    };
    responses: {
      /** @description Successful Response */
      200: {
        content: {
          "application/json": components["schemas"]["Page_ProfileRead_"];
        };
      };
      /** @description Validation Error */
      422: {
        content: {
          "application/json": components["schemas"]["HTTPValidationError"];
        };
      };
    };
  };
  /** Create Profile */
  create_profile_api_v1_profiles__post: {
    requestBody: {
      content: {
        "multipart/form-data": components["schemas"]["Body_create_profile_api_v1_profiles__post"];
      };
    };
    responses: {
      /** @description Successful Response */
      201: {
        content: {
          "application/json": components["schemas"]["ProfileRead"];
        };
      };
      404: {
        content: {
          "application/json": unknown;
        };
      };
      /** @description Validation Error */
      422: {
        content: {
          "application/json": components["schemas"]["HTTPValidationError"];
        };
      };
    };
  };
  /** Get My Profile */
  get_my_profile_api_v1_profiles_me__get: {
    responses: {
      /** @description Successful Response */
      200: {
        content: {
          "application/json": components["schemas"]["ProfileRead"];
        };
      };
    };
  };
  /** Get Profile By Uuid */
  get_profile_by_uuid_api_v1_profiles__uuid___get: {
    parameters: {
      path: {
        uuid: string;
      };
    };
    responses: {
      /** @description Successful Response */
      200: {
        content: {
          "application/json": components["schemas"]["ProfileRead"];
        };
      };
      403: {
        content: {
          "application/json": unknown;
        };
      };
      404: {
        content: {
          "application/json": unknown;
        };
      };
      /** @description Validation Error */
      422: {
        content: {
          "application/json": components["schemas"]["HTTPValidationError"];
        };
      };
    };
  };
  /**
   * Update Profile
   * @description Update the profile.
   *
   * ※ 画像の変更は別エンドポイント
   */
  update_profile_api_v1_profiles__uuid___put: {
    parameters: {
      path: {
        uuid: string;
      };
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["ProfileCreateUpdate"];
      };
    };
    responses: {
      /** @description Successful Response */
      200: {
        content: {
          "application/json": components["schemas"]["ProfileRead"];
        };
      };
      403: {
        content: {
          "application/json": unknown;
        };
      };
      404: {
        content: {
          "application/json": unknown;
        };
      };
      /** @description Validation Error */
      422: {
        content: {
          "application/json": components["schemas"]["HTTPValidationError"];
        };
      };
    };
  };
  /** Get Profile By Username */
  get_profile_by_username_api_v1_profiles__username___get: {
    parameters: {
      path: {
        username: string;
      };
    };
    responses: {
      /** @description Successful Response */
      200: {
        content: {
          "application/json": components["schemas"]["SimpleProfileRead"];
        };
      };
      404: {
        content: {
          "application/json": unknown;
        };
      };
      /** @description Validation Error */
      422: {
        content: {
          "application/json": components["schemas"]["HTTPValidationError"];
        };
      };
    };
  };
  /** Update Profile Icon */
  update_profile_icon_api_v1_profiles__uuid__icon__put: {
    parameters: {
      path: {
        uuid: string;
      };
    };
    requestBody?: {
      content: {
        "multipart/form-data": components["schemas"]["Body_update_profile_icon_api_v1_profiles__uuid__icon__put"];
      };
    };
    responses: {
      /** @description Successful Response */
      200: {
        content: {
          "application/json": components["schemas"]["ProfileRead"];
        };
      };
      403: {
        content: {
          "application/json": unknown;
        };
      };
      404: {
        content: {
          "application/json": unknown;
        };
      };
      /** @description Validation Error */
      422: {
        content: {
          "application/json": components["schemas"]["HTTPValidationError"];
        };
      };
    };
  };
  /**
   * Link User To Profile
   * @description 仮に作成していたProfileを実Userにリンクする.
   */
  link_user_to_profile_api_v1_profiles__uuid__link__patch: {
    parameters: {
      path: {
        uuid: string;
      };
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["ProfileLinkPatch"];
      };
    };
    responses: {
      /** @description Successful Response */
      200: {
        content: {
          "application/json": components["schemas"]["ProfileRead"];
        };
      };
      403: {
        content: {
          "application/json": unknown;
        };
      };
      404: {
        content: {
          "application/json": unknown;
        };
      };
      /** @description Validation Error */
      422: {
        content: {
          "application/json": components["schemas"]["HTTPValidationError"];
        };
      };
    };
  };
  /** Get Quest */
  get_quest_api_v1_quests__uuid___get: {
    parameters: {
      path: {
        uuid: string;
      };
    };
    responses: {
      /** @description Successful Response */
      200: {
        content: {
          "application/json": components["schemas"]["QuestRead"];
        };
      };
      403: {
        content: {
          "application/json": unknown;
        };
      };
      404: {
        content: {
          "application/json": unknown;
        };
      };
      /** @description Validation Error */
      422: {
        content: {
          "application/json": components["schemas"]["HTTPValidationError"];
        };
      };
    };
  };
  get_quests_api_v1_quests__get: {
    parameters: {
      query?: {
        filter?: components["schemas"]["GetQuestsFilter"];
      };
    };
    responses: {
      /** @description Successful Response */
      200: {
        content: {
          "application/json": components["schemas"]["Page_QuestRead_"];
        };
      };
      /** @description Validation Error */
      422: {
        content: {
          "application/json": components["schemas"]["HTTPValidationError"];
        };
      };
    };
  };
  create_quest_api_v1_quests__post: {
    requestBody: {
      content: {
        "application/json": components["schemas"]["QuestCreate"];
      };
    };
    responses: {
      /** @description Successful Response */
      201: {
        content: {
          "application/json": components["schemas"]["QuestRead"];
        };
      };
      403: {
        content: {
          "application/json": unknown;
        };
      };
      404: {
        content: {
          "application/json": unknown;
        };
      };
      /** @description Validation Error */
      422: {
        content: {
          "application/json": components["schemas"]["HTTPValidationError"];
        };
      };
    };
  };
  get_quest_requirements_suggestion_api_v1_quest_requirements_suggest__get: {
    responses: {
      /** @description Successful Response */
      200: {
        content: {
          "application/json": components["schemas"]["QuestRequirementRead"][];
        };
      };
    };
  };
  /** Get My Quest Requirements */
  get_my_quest_requirements_api_v1_quest_requirements_mine__get: {
    responses: {
      /** @description Successful Response */
      200: {
        content: {
          "application/json": components["schemas"]["Page_QuestRequirementRead_"];
        };
      };
    };
  };
  /** Create Quest Requirements */
  create_quest_requirements_api_v1_quest_requirements__post: {
    requestBody: {
      content: {
        "application/json": components["schemas"]["QuestRequirementCreate"];
      };
    };
    responses: {
      /** @description Successful Response */
      201: {
        content: {
          "application/json": components["schemas"]["QuestRequirementRead"];
        };
      };
      /** @description Validation Error */
      422: {
        content: {
          "application/json": components["schemas"]["HTTPValidationError"];
        };
      };
    };
  };
  get_memories_chronologically_api_v1_memories_chronological__get: {
    responses: {
      /** @description Successful Response */
      200: {
        content: {
          "application/json": components["schemas"]["Page_Union_ImageMemoryRead__QuestAchievementMemoryRead__"];
        };
      };
    };
  };
  /**
   * Get Memories Randomly
   * @description pagination出来ますが、randomであるため意味はありません
   */
  get_memories_randomly_api_v1_memories_random__get: {
    responses: {
      /** @description Successful Response */
      200: {
        content: {
          "application/json": components["schemas"]["Page_Union_ImageMemoryRead__QuestAchievementMemoryRead__"];
        };
      };
    };
  };
  /** Get Public Memories */
  get_public_memories_api_v1_memories_public__get: {
    responses: {
      /** @description Successful Response */
      200: {
        content: {
          "application/json": components["schemas"]["Page_Union_ImageMemoryPublicRead__QuestAchievementMemoryPublicRead__"];
        };
      };
    };
  };
  /** Get Memory */
  get_memory_api_v1_memories__uuid___get: {
    parameters: {
      path: {
        uuid: string;
      };
    };
    responses: {
      /** @description Successful Response */
      200: {
        content: {
          "application/json": components["schemas"]["ImageMemoryRead"] | components["schemas"]["QuestAchievementMemoryRead"] | components["schemas"]["ImageMemoryPublicRead"] | components["schemas"]["QuestAchievementMemoryPublicRead"];
        };
      };
      403: {
        content: {
          "application/json": unknown;
        };
      };
      404: {
        content: {
          "application/json": unknown;
        };
      };
      /** @description Validation Error */
      422: {
        content: {
          "application/json": components["schemas"]["HTTPValidationError"];
        };
      };
    };
  };
  add_own_profile_to_memory_api_v1_memories__uuid__add_own_profile__post: {
    parameters: {
      path: {
        uuid: string;
      };
    };
    responses: {
      /** @description Successful Response */
      204: {
        content: never;
      };
      400: {
        content: {
          "application/json": unknown;
        };
      };
      403: {
        content: {
          "application/json": unknown;
        };
      };
      404: {
        content: {
          "application/json": unknown;
        };
      };
      /** @description Validation Error */
      422: {
        content: {
          "application/json": components["schemas"]["HTTPValidationError"];
        };
      };
    };
  };
  /** Create Image Memory */
  create_image_memory_api_v1_image_memories__post: {
    requestBody: {
      content: {
        "multipart/form-data": components["schemas"]["Body_create_image_memory_api_v1_image_memories__post"];
      };
    };
    responses: {
      /** @description Successful Response */
      201: {
        content: {
          "application/json": components["schemas"]["ImageMemoryRead"];
        };
      };
      403: {
        content: {
          "application/json": unknown;
        };
      };
      404: {
        content: {
          "application/json": unknown;
        };
      };
      /** @description Validation Error */
      422: {
        content: {
          "application/json": components["schemas"]["HTTPValidationError"];
        };
      };
      500: {
        content: {
          "application/json": unknown;
        };
      };
      504: {
        content: {
          "application/json": unknown;
        };
      };
    };
  };
  /** Create Quest Achievement Memory */
  create_quest_achievement_memory_api_v1_quest_achievement_memories__post: {
    requestBody: {
      content: {
        "multipart/form-data": components["schemas"]["Body_create_quest_achievement_memory_api_v1_quest_achievement_memories__post"];
      };
    };
    responses: {
      /** @description Successful Response */
      201: {
        content: {
          "application/json": components["schemas"]["QuestAchievementMemoryRead"];
        };
      };
      403: {
        content: {
          "application/json": unknown;
        };
      };
      404: {
        content: {
          "application/json": unknown;
        };
      };
      /** @description Validation Error */
      422: {
        content: {
          "application/json": components["schemas"]["HTTPValidationError"];
        };
      };
      500: {
        content: {
          "application/json": unknown;
        };
      };
      504: {
        content: {
          "application/json": unknown;
        };
      };
    };
  };
  /** Detect Faces */
  detect_faces_api_v1_faces__post: {
    requestBody: {
      content: {
        "multipart/form-data": components["schemas"]["Body_detect_faces_api_v1_faces__post"];
      };
    };
    responses: {
      /** @description Successful Response */
      200: {
        content: {
          "application/json": components["schemas"]["FaceDetectionRead"];
        };
      };
      400: {
        content: {
          "application/json": unknown;
        };
      };
      /** @description Validation Error */
      422: {
        content: {
          "application/json": components["schemas"]["HTTPValidationError"];
        };
      };
    };
  };
}
