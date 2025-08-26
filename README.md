# LINE Bot Management System

LINE公式アカウントのボット管理システムです。チャット機能、ブランド設定、シナリオ管理、API連携を統合的に管理できます。

## 構成

```
line/
├── frontend/          # Next.js フロントエンド
└── supabase/          # Supabase 設定・マイグレーション
```

## 機能

### 🔄 チャット管理
- リアルタイムメッセージ履歴
- チャット一覧・詳細表示
- 新規チャット作成

### 🏢 ブランド設定
- **会社情報**: 正式名称、住所、連絡先
- **コミュニケーション**: 口調、文章長、絵文字設定
- **対応ルール**: 必須文言・禁止表現
- **フォーマット**: 署名、定型文、書き出し

### 📝 シナリオ管理
- シナリオのCRUD操作
- 態度設定（肯定的・否定的・その他）
- 有効/無効切り替え

### 🔌 API連携
- LINE Developers設定
- チャンネルシークレット・アクセストークン管理
- Webhook URL自動生成・コピー機能

## 技術スタック

### フロントエンド
- **Framework**: Next.js 15.5.0
- **Package Manager**: Bun
- **Styling**: Tailwind CSS
- **Language**: TypeScript
- **State Management**: React Hooks

### バックエンド
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **API**: Supabase Edge Functions

## セットアップ

### 必要環境
- Node.js 18+
- Bun
- Supabase CLI

### 1. リポジトリクローン
```bash
git clone https://github.com/konaito/line-bot-monorepo.git
cd line-bot-monorepo
```

### 2. フロントエンド セットアップ
```bash
cd frontend
bun install
```

### 3. 環境変数設定
```bash
cp .env.local.example .env.local
```

`.env.local` に以下を設定:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_WEBHOOK_URL=your_webhook_url
```

### 4. Supabase セットアップ
```bash
cd ../supabase
supabase start
supabase db reset
```

### 5. 開発サーバー起動
```bash
cd ../frontend
bun run dev
```

## 開発

### フロントエンド開発
```bash
cd frontend
bun run dev      # 開発サーバー
bun run build    # プロダクションビルド
bun run lint     # リント
```

### データベース操作
```bash
cd supabase
supabase db reset         # DBリセット
supabase db push --local  # ローカル反映
supabase db lint         # マイグレーション検証
```

## パフォーマンス最適化

- **React.memo**: 全フォームコンポーネント
- **useCallback**: イベントハンドラー
- **コンポーネント分離**: 再レンダリング最小化
- **遅延ローディング**: 必要時のみコンポーネント読み込み

## ディレクトリ構成

```
frontend/
├── src/
│   ├── app/                 # App Router
│   │   ├── chat/           # チャット機能
│   │   ├── brand/          # ブランド設定
│   │   ├── scenario/       # シナリオ管理
│   │   └── api/            # API連携
│   ├── components/         # 共通コンポーネント
│   │   └── layout/         # レイアウト専用
│   ├── lib/                # ユーティリティ
│   │   ├── models/         # データモデル
│   │   └── supabase/       # Supabase設定
│   └── types/              # TypeScript型定義
```

## デプロイ

### Vercel (推奨)
1. Vercelにリポジトリ連携
2. Root Directory: `frontend`
3. 環境変数設定
4. デプロイ

### Supabase
1. Supabaseプロジェクト作成
2. マイグレーション実行:
   ```bash
   supabase db push
   ```

## ライセンス

MIT License

## 貢献

Issue・Pull Request歓迎です。

---

🤖 Generated with [Claude Code](https://claude.ai/code)