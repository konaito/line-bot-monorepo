'use client'

import { useState, useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { ContentList } from "@/components/ContentList"

// // JSONデータの型定義
// type ChatMessage = {
//   id: string
//   chatId: string
//   type: string
//   content: string
//   direction: 'incoming' | 'outgoing'
//   timestamp: string
// }

type ChatUser = {
  id: string
  userId: string
  userName: string
  userAvatar: string
  avatarUrl: string
  isConfirmed: boolean
}

type Chat = {
  id: string
  chatId: string
  type: string
  direction: 'incoming' | 'outgoing'
  timestamp: string
  content: string
}

// チャットセッションの型定義
type ChatSession = {
  user: ChatUser
  lastMessage: string
  lastMessageTime: string
  lastMessageDirection?: 'incoming' | 'outgoing'
  isConfirmed: boolean
}

export const HistoryList = () => {
  const router = useRouter()
  const pathname = usePathname()
  const [chatSessions, setChatSessions] = useState<ChatSession[]>([])

  // 現在選択中のユーザーIDを取得
  const getCurrentUserId = () => {
    const match = pathname?.match(/^\/chat\/([^\/]+)$/)
    return match ? match[1] : ''
  }

  const currentUserId = getCurrentUserId()

  // JSONデータからチャットセッションを構築
  useEffect(() => {
    const loadChatSessions = async () => {
      try {
        const [chatsResponse, usersResponse] = await Promise.all([
          fetch('/data/chats.json'),
          fetch('/data/chatUsers.json')
        ])
        
        const chats: Chat[] = await chatsResponse.json()
        const users: ChatUser[] = await usersResponse.json()
        
        // 各ユーザーの最新メッセージを取得
        const sessions: ChatSession[] = users.map(user => {
          const userChats = chats.filter(chat => chat.chatId === user.id)
          const lastChat = userChats
            .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())[0]
          
          return {
            user,
            lastMessage: lastChat?.content || 'メッセージなし',
            lastMessageTime: lastChat?.timestamp || new Date().toISOString(),
            lastMessageDirection: lastChat?.direction as 'incoming' | 'outgoing' | undefined,
            isConfirmed: user.isConfirmed
          }
        })
        
        setChatSessions(sessions)
      } catch (error) {
        console.error('チャットセッションの読み込みに失敗しました:', error)
      }
    }

    loadChatSessions()
  }, [])

  const formatRelativeTime = (timestamp: string) => {
    const now = new Date()
    const messageTime = new Date(timestamp)
    const diffInMinutes = Math.floor((now.getTime() - messageTime.getTime()) / (1000 * 60))
    
    if (diffInMinutes < 1) return '今'
    if (diffInMinutes < 60) return `${diffInMinutes}分前`
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}時間前`
    return `${Math.floor(diffInMinutes / 1440)}日前`
  }

  const chatListItems = chatSessions.map(session => ({
    id: session.user.userId,
    title: session.user.userName,
    summary: session.lastMessage,
    timestamp: formatRelativeTime(session.lastMessageTime),
    avatarUrl: session.user.avatarUrl.includes('example.com') 
      ? `https://i.pravatar.cc/150?u=${encodeURIComponent(session.user.userName)}` 
      : session.user.avatarUrl,
    lastMessageDirection: session.lastMessageDirection,
    isConfirmed: session.user.isConfirmed,
    onClick: () => {
      router.push(`/chat/${session.user.userId}`)
    }
  }))

  return (
    <ContentList 
      title="LINE BOT チャット履歴"
      items={chatListItems}
      selectedId={currentUserId}
    />
  )
}