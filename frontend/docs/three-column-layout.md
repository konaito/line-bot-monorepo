# Three Column Layout System

3カラムレイアウトシステムは、ナビゲーション、コンテンツリスト、コンテンツ詳細を表示するための再利用可能なコンポーネント群です。

## アーキテクチャ

```
┌─────────────────────────────────────────────────────────┐
│                ThreeColumnLayout                        │
├──────────────┬──────────────┬──────────────────────────┤
│  Navigation  │ ContentList  │      ContentArea         │
│              │              │                          │
│ - ナビ項目    │ - アイテム一覧 │ - 詳細コンテンツ          │
│ - ルーティング │ - 選択状態    │ - 読み込み状態            │
│              │ - フィルタリング│ - スクロール対応          │
└──────────────┴──────────────┴──────────────────────────┘
```

## コンポーネント構成

### 1. ThreeColumnLayout

メインのレイアウトコンポーネント

```tsx
interface ThreeColumnLayoutProps {
  navigation: ReactNode     // 左カラムのコンテンツ
  contentList: ReactNode    // 中央カラムのコンテンツ
  content: ReactNode        // 右カラムのコンテンツ
  className?: string        // 追加のスタイル
}
```

**特徴:**
- CSS Grid を使用した3カラムレイアウト
- 各カラムは独立したスクロール領域
- レスポンシブ対応
- ダークモード対応

### 2. Navigation

左サイドバーのナビゲーションコンポーネント

```tsx
interface NavigationItem {
  label: string           // 表示テキスト
  href: string           // リンク先URL
  onClick?: () => void   // クリックハンドラ
}

interface NavigationProps {
  title?: string         // ナビゲーションタイトル
  items: NavigationItem[] // ナビゲーション項目配列
}
```

**機能:**
- ナビゲーション項目のリスト表示
- ホバーエフェクト
- カスタムクリックハンドラ対応

### 3. ContentList

中央のコンテンツ一覧表示コンポーネント

```tsx
interface ContentItem {
  id: string              // 一意識別子
  title: string           // タイトル
  summary?: string        // 概要（オプション）
  onClick?: () => void    // クリックハンドラ
}

interface ContentListProps {
  title?: string          // リストタイトル
  items: ContentItem[]    // コンテンツ項目配列
  selectedId?: string     // 現在選択中のID
}
```

**機能:**
- アイテム一覧の表示
- 選択状態の可視化
- 縦スクロール対応
- アイテムクリックによる選択

### 4. ContentArea

右側のコンテンツ詳細表示エリア

```tsx
interface ContentAreaProps {
  title?: string     // エリアタイトル
  children: ReactNode // 表示コンテンツ
  loading?: boolean   // 読み込み状態
}
```

**機能:**
- 任意のReactNodeの表示
- 読み込み状態の表示
- prose クラスによるタイポグラフィ
- 縦スクロール対応

## 使用例

### 基本的な使用方法

```tsx
import { ThreeColumnLayout } from "@/components/ThreeColumnLayout";
import { Navigation } from "@/components/Navigation";
import { ContentList } from "@/components/ContentList";
import { ContentArea } from "@/components/ContentArea";

export default function ExamplePage() {
  const [selectedId, setSelectedId] = useState('1');

  const navItems = [
    { label: 'ホーム', href: '/' },
    { label: '設定', href: '/settings' },
  ];

  const contentItems = [
    { 
      id: '1', 
      title: '記事1', 
      summary: '概要...',
      onClick: () => setSelectedId('1')
    },
  ];

  return (
    <ThreeColumnLayout
      navigation={<Navigation items={navItems} />}
      contentList={
        <ContentList 
          items={contentItems}
          selectedId={selectedId}
        />
      }
      content={
        <ContentArea>
          <h1>選択されたコンテンツ</h1>
        </ContentArea>
      }
    />
  );
}
```

### カスタマイズ例

```tsx
// カスタムナビゲーション
<Navigation 
  title="メニュー" 
  items={[
    { 
      label: 'ダッシュボード', 
      href: '#',
      onClick: () => router.push('/dashboard')
    }
  ]} 
/>

// 読み込み状態付きコンテンツエリア
<ContentArea title="詳細" loading={isLoading}>
  {selectedContent ? (
    <div>
      <h1>{selectedContent.title}</h1>
      <p>{selectedContent.body}</p>
    </div>
  ) : (
    <p>コンテンツを選択してください</p>
  )}
</ContentArea>
```

## スタイリング

### CSS クラス

すべてのコンポーネントは Tailwind CSS を使用してスタイリングされています：

- `bg-gray-100 dark:bg-gray-800` - 背景色（ライト/ダークモード対応）
- `rounded-lg` - 角丸
- `transition-colors` - スムーズな色変化
- `overflow-y-auto` - 縦スクロール対応

### カスタムスタイル

追加のスタイリングが必要な場合：

```tsx
<ThreeColumnLayout 
  className="custom-layout-class"
  // ... props
/>
```

## 拡張性

### 新しいコンポーネントの追加

1. 新しいコンポーネントを作成
2. 適切なインターフェースを定義
3. ThreeColumnLayout に組み込み

### 状態管理の統合

```tsx
// Redux/Zustand などの状態管理ライブラリとの統合例
const selectedItem = useSelector(selectCurrentItem);
const dispatch = useDispatch();

<ContentList 
  items={items}
  selectedId={selectedItem?.id}
  onItemClick={(id) => dispatch(selectItem(id))}
/>
```

## ベストプラクティス

1. **コンポーネントの責務分離**: 各コンポーネントは単一の責務を持つ
2. **型安全性**: TypeScript インターフェースを活用
3. **アクセシビリティ**: 適切な aria 属性の付与
4. **パフォーマンス**: 大量のデータに対する仮想化の検討
5. **テスト**: 各コンポーネントの単体テスト実装

## トラブルシューティング

### よくある問題

**Q: レイアウトが崩れる**
A: CSS Grid の grid-cols-3 が適用されているか確認してください。

**Q: スクロールが効かない**
A: overflow-y-auto クラスと適切な高さ制限があることを確認してください。

**Q: ダークモードが反映されない** 
A: Tailwind CSS の dark: プレフィックスが正しく設定されているか確認してください。