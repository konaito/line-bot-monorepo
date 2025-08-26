import { ReactNode } from 'react'

interface ThreeColumnLayoutProps {
  navigation: ReactNode
  contentList: ReactNode
  content: ReactNode
  className?: string
}

export function ThreeColumnLayout({
  navigation,
  contentList,
  content,
  className = ""
}: ThreeColumnLayoutProps) {
  return (
    <div className={`h-screen flex ${className}`}>
      {/* 左カラム - ナビゲーション */}
      <div className="p-4 flex flex-col w-1/5">
        {navigation}
      </div>

      {/* 中央カラム - コンテンツリスト */}
      <div className="bg-gray-50 p-4 flex flex-col w-1/5">
        {contentList}
      </div>

      {/* 右カラム - コンテンツ */}
      <div className="p-4 flex flex-col w-3/5">
        {content}
      </div>
    </div>
  )
}