/* eslint-disable */
export type Methods = {
  /**
   * Add own profile to the memory.
   * 
   * ログインユーザーが所属するMemoryに、自身のProfileが表示されるようにする。
   * 異なるユーザーが'hoge'や'fuga'のようなProfileを設定している場合、デフォルトではMemoryのmember_profilesにはMemoryを作成した人の所有するProfileが表示されるため、このエンドポイントが必要になる。
   * 
   * ※UserにリンクされていないProfileに関しては、このエンドポイントでは処理できないため、Memory作成者のProfile.screen_nameが引き続き表示されます。
   */
  post: {
    status: 204
  }
}
