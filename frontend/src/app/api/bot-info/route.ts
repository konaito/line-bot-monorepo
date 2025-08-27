// ボット
// LINE公式アカウントのボットの基本情報を取得できます。

import { EXPORT_DETAIL } from "next/dist/shared/lib/constants";

// エンドポイント一覧
// GET /v2/bot/info
// #ボットの情報を取得する
// GET https://api.line.me/v2/bot/info
// ボットの基本情報を取得します。

// リクエストの例

// Shell
// curl -X GET \
// -H 'Authorization: Bearer {channel access token}' \
// https://api.line.me/v2/bot/info
// #レート制限
// 2,000リクエスト/秒

// レート制限について詳しくは、「レート制限」を参照してください。

// #リクエストヘッダー
// Authorization
// 必須
// Bearer {channel access token}

// #レスポンス
// ステータスコード200と以下の情報を含むJSONオブジェクトを返します。

// userId
// String
// ボットのユーザーID

// basicId
// String
// ボットのベーシックID

// premiumId
// String
// 含まれないことがあります
// ボットのプレミアムID。プレミアムIDが未設定の場合、この値は含まれません。

// displayName
// String
// ボットの表示名

// pictureUrl
// String
// 含まれないことがあります
// プロフィール画像のURL。「https://」から始まる画像URLです。ボットにプロフィール画像を設定していない場合は、レスポンスに含まれません。

// chatMode
// String
// LINE Official Account Manager (opens new window)のチャットの設定。以下のいずれかの値が返ります。

// chat：チャットがオンに設定されています。
// bot：チャットがオフに設定されています。
// markAsReadMode
// String
// メッセージの自動既読設定。チャットを「オフ」にしていればauto、「オン」にしていればmanualが返ります。

// auto：自動既読設定が有効です。
// manual：自動既読設定が無効です。

// bearerでchannleaccesstokenを渡されて，返答をそのまま返すように

import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const { headers } = request
  const channelAccessToken = headers.get('Authorization')?.split(' ')[1]

  if (!channelAccessToken) {
    return NextResponse.json(
      { error: 'Authorization header with Bearer token is required' }, 
      { status: 401 }
    )
  }

  try {
    const response = await fetch(`https://api.line.me/v2/bot/info`, {
      headers: {
        'Authorization': `Bearer ${channelAccessToken}`
      }
    })

    const data = await response.json()
    
    if (!response.ok) {
      return NextResponse.json(data, { status: response.status })
    }

    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch bot info' }, 
      { status: 500 }
    )
  }
}