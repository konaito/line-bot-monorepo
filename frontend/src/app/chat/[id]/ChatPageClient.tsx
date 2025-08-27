'use client'

import { useState, useEffect } from 'react'
import { ContentArea } from "@/components/ContentArea"
import { ChatInterface } from "@/components/ChatInterface"

interface ChatPageClientProps {
  chatId: string // LINEユーザーID
}

// JSONデータの型定義
type ChatMessage = {
  id: string
  chatId: string
  type: 'text' | 'image' | 'video' | 'audio' | 'file'
  content: string
  direction: 'incoming' | 'outgoing'
  timestamp: string
}

type ChatUser = {
  id: string
  userId: string
  userName: string
  userAvatar: string
  avatarUrl: string
  isConfirmed: boolean
}

export default function ChatPageClient({ chatId }: ChatPageClientProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [chatUser, setChatUser] = useState<ChatUser | null>(null)
  // const [userInfo, setUserInfo] = useState<{
  //   userId: string
  //   displayName: string
  //   pictureUrl?: string
  //   statusMessage?: string
  //   isBlocked: boolean
  //   isFollowing: boolean
  //   lastActiveTime: string
  // } | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // LINE BOTのメッセージ履歴とユーザー情報をロード
  useEffect(() => {
    const loadChatData = async () => {
      if (!chatId) return
      
      setIsLoading(true)
      setError(null)
      
      try {
        // JSONデータを読み込み
        const [chatsResponse, usersResponse] = await Promise.all([
          fetch('/data/chats.json'),
          fetch('/data/chatUsers.json')
        ])
        
        const allMessages: ChatMessage[] = await chatsResponse.json()
        const allUsers: ChatUser[] = await usersResponse.json()
        
        // 現在のチャットIDに対応するユーザーを検索
        const currentUser = allUsers.find(user => user.userId === chatId)
        const currentChatId = currentUser?.id
        
        if (!currentUser || !currentChatId) {
          throw new Error('ユーザーが見つかりません')
        }
        
        // このチャットのメッセージをフィルタリング
        const chatMessages = allMessages.filter(msg => msg.chatId === currentChatId)
        
        setMessages(chatMessages)
        setChatUser(currentUser)
        // setUserInfo({
        //   userId: currentUser.userId,
        //   displayName: currentUser.userName,
        //   pictureUrl: currentUser.avatarUrl,
        //   statusMessage: undefined,
        //   isBlocked: false,
        //   isFollowing: true,
        //   lastActiveTime: new Date().toISOString()
        // })
      } catch (error) {
        console.error('チャットデータの読み込みに失敗:', error)
        setError('チャットデータの読み込みに失敗しました')
      } finally {
        setIsLoading(false)
      }
    }

    loadChatData()
  }, [chatId])

  // LINE BOTからユーザーへメッセージを送信
  const sendMessage = async (content: string) => {
    if (!content.trim() || !chatUser) return
    
    setIsLoading(true)
    
    try {
      // メッセージを一時的に追加（送信中状態）
      const newMessage: ChatMessage = {
        id: `msg_${Date.now()}`,
        chatId: chatId, // userIdではなくchatId
        content,
        timestamp: new Date().toISOString(),
        type: 'text',
        direction: 'outgoing'
      }
      
      setMessages(prev => [...prev, newMessage])

      // モック送信シミュレーション
      await new Promise(resolve => setTimeout(resolve, 1000))
      
    } catch (error) {
      console.error('メッセージの送信に失敗:', error)
      setError('メッセージの送信に失敗しました')
    } finally {
      setIsLoading(false)
    }
  }

  // メッセージをChatInterface用の形式に変換
  const chatMessages = messages.map(msg => ({
    id: msg.id,
    content: msg.content,
    sender: msg.direction === 'incoming' ? 'ai' as const : 'user' as const, // incoming=LINEユーザー(左・グレー)、outgoing=BOT(右・青)
    timestamp: new Date(msg.timestamp)
  }))

  const getTitle = () => {
    if (chatUser) {
      return `${chatUser.userName}`
    }
    return chatId ? `ユーザー: ${chatId.substring(0, 8)}...` : '🤖 LINE BOT 管理'
  }

  return (
    <ContentArea appbar={
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">{getTitle()}</h2>
          <button className={`${chatUser?.isConfirmed  ? 'text-gray-500' : 'text-blue-500 hover:text-blue-700'} `}>
          <span className="text-sm">対応済みにする</span>
          {/* <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg> */}
        </button>
      </div>
    }>
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      {isLoading && messages.length === 0 ? (
        <div className="flex items-center justify-center h-full">
          <p className="text-gray-500">チャットデータを読み込み中...</p>
        </div>
      ) : chatId ? (
        <div className="h-full">
          <ChatInterface 
            messages={chatMessages}
            onSendMessage={sendMessage}
          />
        </div>
      ) : (
        <div className="flex items-center justify-center h-full">
          <p className="text-gray-500">ユーザーを選択してください</p>
        </div>
      )}
    </ContentArea>
  )
}