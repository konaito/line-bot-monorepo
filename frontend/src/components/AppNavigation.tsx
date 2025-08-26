'use client'

import { useRouter, usePathname } from 'next/navigation'
import { Navigation } from './Navigation'
import { ChatModel } from '@/lib/models/ChatModel'

interface AppNavigationProps {
  chatModel?: ChatModel
}

export function AppNavigation({ chatModel }: AppNavigationProps) {
  const router = useRouter()
  const pathname = usePathname()

  const createNewChat = () => {
    if (chatModel) {
      const newChat = chatModel.createChat()
      router.push(`/chat/${newChat.id}`)
    } else {
      // ChatModelが利用できない場合はタイムスタンプベース
      const newChatId = Date.now().toString()
      router.push(`/chat/${newChatId}`)
    }
  }

  const getNavigationItems = () => {
    const baseItems = [
      { 
        label: 'ホーム', 
        href: '/',
        isActive: pathname === '/'
      },
      { 
        label: 'チャット一覧', 
        href: '/chats',
        isActive: pathname === '/chats'
      },
      { 
        label: '新しいチャット', 
        href: '#', 
        onClick: createNewChat,
        isAction: true
      }
    ]

    // 現在のパスに応じて追加項目を設定
    if (pathname?.startsWith('/chats/') && pathname !== '/chats') {
      baseItems.splice(2, 0, {
        label: '現在のチャット',
        href: pathname,
        isActive: true
      })
    }

    baseItems.push(
      { 
        label: '設定', 
        href: '/settings',
        isActive: pathname === '/settings'
      }
    )

    return baseItems
  }

  return (
    <Navigation 
      title="メニュー"
      items={getNavigationItems().map(item => ({
        label: item.label,
        href: item.href,
        onClick: item.onClick,
        className: item.isActive 
          ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300' 
          : item.isAction 
            ? 'bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 font-semibold'
            : ''
      }))}
    />
  )
}