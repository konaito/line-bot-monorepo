# Frontend Documentation

このディレクトリには、フロントエンドアプリケーションのドキュメントが含まれています。

## ドキュメント一覧

### [Three Column Layout System](./three-column-layout.md)
3カラムレイアウトシステムの全体的な設計思想とアーキテクチャについて

**内容:**
- システム概要
- アーキテクチャ図
- コンポーネント構成
- 使用例
- ベストプラクティス
- トラブルシューティング

### [Components API Reference](./components-api.md)
各コンポーネントの詳細なAPI仕様

**内容:**
- 各コンポーネントのProps仕様
- TypeScript型定義
- 使用例
- スタイリングクラス

## 技術スタック

- **Framework**: Next.js 15.5.0
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4.0
- **Authentication**: Supabase Auth (Anonymous Login)
- **State Management**: React useState/useEffect

## プロジェクト構成

```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # ルートレイアウト
│   ├── page.tsx           # ホームページ
│   └── globals.css        # グローバルCSS
├── components/            # 再利用可能コンポーネント
│   ├── ThreeColumnLayout.tsx
│   ├── Navigation.tsx
│   ├── ContentList.tsx
│   ├── ContentArea.tsx
│   ├── AutoAuth.tsx
│   └── AuthButton.tsx
└── lib/                   # ユーティリティとライブラリ
    ├── auth/              # 認証関連
    └── supabase/          # Supabase クライアント設定
```

## 開発ガイド

### セットアップ

```bash
# 依存関係のインストール
bun install

# 開発サーバー起動
bun run dev

# ビルド
bun run build

# Lint実行
bun run lint
```

### コンポーネント開発原則

1. **単一責任の原則**: 各コンポーネントは一つの明確な責務を持つ
2. **型安全性**: TypeScriptの型システムを最大限活用
3. **再利用性**: props による柔軟なカスタマイズを可能にする
4. **アクセシビリティ**: 適切なセマンティクスとaria属性の使用
5. **パフォーマンス**: 不要な再レンダリングを避ける

### スタイリング規約

- Tailwind CSS のユーティリティクラスを使用
- ダークモード対応は必須
- レスポンシブデザインの考慮
- 一貫性のあるスペーシングとカラーパレット

## 認証システム

- Supabase Anonymous Authentication を使用
- 自動ログイン機能（初回訪問時）
- セッション管理
- サーバーサイドでの認証状態確認

## 今後の拡張予定

- [ ] モバイル対応の強化
- [ ] 検索機能の追加
- [ ] フィルタリング機能
- [ ] 無限スクロール
- [ ] 状態管理ライブラリの導入
- [ ] ユニットテストの実装
- [ ] E2Eテストの実装

## 貢献ガイド

1. 新機能追加時は必ずドキュメントを更新
2. TypeScript型定義を適切に設定
3. Tailwind CSS のベストプラクティスに従う
4. コンポーネントの抽象化レベルを適切に保つ
5. アクセシビリティを考慮した実装