'use client'

import { useState, useEffect } from 'react'
import { ContentArea } from "@/components/ContentArea"
import { ChatInterface } from "@/components/ChatInterface"
import { ChatModel } from "@/lib/models/ChatModel"
import { Chat } from "@/types/chat"

interface ChatPageClientProps {
  chatId: string
}

export default function ChatPageClient({ chatId }: ChatPageClientProps) {
  const [currentChat, setCurrentChat] = useState<Chat | null>(null)
  const [chatModel] = useState(() => ChatModel.getInstance())

  // データの初期化とロード
  useEffect(() => {
    const loadData = () => {
      let current = chatModel.getChat(chatId)
      if (!current) {
        // チャットが存在しない場合は新規作成
        current = chatModel.createChat(chatId)
      }
      setCurrentChat(current)
    }

    loadData()
  }, [chatId, chatModel])

  const sendMessage = async (content: string) => {
    if (!currentChat) return

    // ユーザーメッセージを追加
    chatModel.addMessage(chatId, content, 'user')
    
    // チャットデータを再取得
    const updatedChat = chatModel.getChat(chatId)
    if (updatedChat) {
      setCurrentChat(updatedChat)
    }

    // AIの応答をシミュレート
    try {
      await chatModel.simulateAIResponse(chatId, content)
      
      // AIの応答後にデータを再取得
      const chatWithAIResponse = chatModel.getChat(chatId)
      if (chatWithAIResponse) {
        setCurrentChat(chatWithAIResponse)
      }
    } catch (error) {
      console.error('AI応答の生成に失敗:', error)
    }
  }

  return (
    <ContentArea title={currentChat?.title || 'チャットを選択'}>
      {currentChat ? (
        <ChatInterface 
          messages={currentChat.messages}
          onSendMessage={sendMessage}
        />
      ) : (
        <div className="flex items-center justify-center h-full">
          <p className="text-gray-500">チャットを選択してください</p>
        </div>
      )}
    </ContentArea>
  )
}