'use client'

import { useState, useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { ContentList } from "@/components/ContentList"
import { ChatModel } from "@/lib/models/ChatModel"
import { ChatSummary } from "@/types/chat"

export const HistoryList = () => {
  const router = useRouter()
  const pathname = usePathname()
  const [chatSummaries, setChatSummaries] = useState<ChatSummary[]>([])
  
  // ChatModelは常に同じインスタンス（シングルトン）なので、stateではなく直接取得
  const chatModel = ChatModel.getInstance()

  // 現在のチャットIDを取得
  const getCurrentChatId = () => {
    const match = pathname?.match(/^\/chat\/([^\/]+)$/)
    return match ? match[1] : ''
  }

  const currentChatId = getCurrentChatId()

  // データの初期化とロード - 依存配列は空配列でOK（chatModelは常に同じインスタンス）
  useEffect(() => {
    const loadChatSummaries = () => {
      const summaries = chatModel.getAllChatSummaries()
      setChatSummaries(summaries)
    }

    // 初回ロード
    loadChatSummaries()

    // モデルの変更をリスニング
    const unsubscribe = chatModel.addListener(loadChatSummaries)
    
    return unsubscribe
  }, []) // 空の依存配列 - マウント時のみ実行

  const chatListItems = chatSummaries.map(chat => ({
    id: chat.id,
    title: chat.title,
    summary: chat.lastMessage || '新しいチャット',
    onClick: () => {
      router.push(`/chat/${chat.id}`)
    }
  }))

  return (
    <ContentList 
      title="チャット履歴"
      items={chatListItems}
      selectedId={currentChatId}
    />
  )
}