# Components API Reference

## ThreeColumnLayout

3つのカラムに分かれたレイアウトコンポーネント

### Props

| プロパティ | 型 | 必須 | デフォルト | 説明 |
|-----------|-----|-----|-----------|-----|
| `navigation` | `ReactNode` | ✓ | - | 左カラムに表示するコンテンツ |
| `contentList` | `ReactNode` | ✓ | - | 中央カラムに表示するコンテンツ |
| `content` | `ReactNode` | ✓ | - | 右カラムに表示するコンテンツ |
| `className` | `string` | - | `""` | 追加のCSSクラス |

### 使用例

```tsx
<ThreeColumnLayout
  navigation={<Navigation items={navItems} />}
  contentList={<ContentList items={items} />}
  content={<ContentArea>コンテンツ</ContentArea>}
/>
```

---

## Navigation

ナビゲーションリストを表示するコンポーネント

### Types

```tsx
interface NavigationItem {
  label: string
  href: string
  onClick?: () => void
}
```

### Props

| プロパティ | 型 | 必須 | デフォルト | 説明 |
|-----------|-----|-----|-----------|-----|
| `title` | `string` | - | `"Navigation"` | ナビゲーションのタイトル |
| `items` | `NavigationItem[]` | ✓ | - | ナビゲーション項目の配列 |

### 使用例

```tsx
const navItems = [
  { label: 'ホーム', href: '/' },
  { label: 'プロフィール', href: '/profile', onClick: handleProfileClick },
];

<Navigation title="メニュー" items={navItems} />
```

---

## ContentList

コンテンツのリストを表示するコンポーネント

### Types

```tsx
interface ContentItem {
  id: string
  title: string
  summary?: string
  onClick?: () => void
}
```

### Props

| プロパティ | 型 | 必須 | デフォルト | 説明 |
|-----------|-----|-----|-----------|-----|
| `title` | `string` | - | `"コンテンツリスト"` | リストのタイトル |
| `items` | `ContentItem[]` | ✓ | - | コンテンツ項目の配列 |
| `selectedId` | `string` | - | - | 現在選択されているアイテムのID |

### 使用例

```tsx
const items = [
  { 
    id: '1', 
    title: '記事タイトル', 
    summary: '概要文',
    onClick: () => setSelected('1')
  }
];

<ContentList 
  title="記事一覧"
  items={items} 
  selectedId={selectedId}
/>
```

---

## ContentArea

コンテンツの詳細を表示するエリアコンポーネント

### Props

| プロパティ | 型 | 必須 | デフォルト | 説明 |
|-----------|-----|-----|-----------|-----|
| `title` | `string` | - | `"コンテンツ"` | エリアのタイトル |
| `children` | `ReactNode` | ✓ | - | 表示するコンテンツ |
| `loading` | `boolean` | - | `false` | 読み込み状態の表示 |

### 使用例

```tsx
<ContentArea title="記事詳細" loading={isLoading}>
  <h1>{article.title}</h1>
  <p>{article.content}</p>
</ContentArea>
```

---

## 共通のスタイリングクラス

### 背景色
- `bg-gray-100 dark:bg-gray-800` - メインエリアの背景
- `bg-white dark:bg-gray-700` - コンテンツカードの背景

### インタラクション
- `hover:bg-gray-200 dark:hover:bg-gray-700` - ホバー時の背景変化
- `transition-colors` - スムーズな色の変化

### レイアウト
- `rounded-lg` - 角丸のボーダー
- `overflow-y-auto` - 縦スクロール対応
- `space-y-2` - 子要素間のスペース

### 状態表示
- `bg-blue-100 dark:bg-blue-900` - 選択状態の背景色