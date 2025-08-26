import { Chat, ChatSummary, Message } from '@/types/chat'

export class ChatModel {
  private static instance: ChatModel
  private chats: Map<string, Chat> = new Map()
  private listeners: Set<() => void> = new Set()

  private constructor() {
    this.initializeSampleData()
  }

  static getInstance(): ChatModel {
    if (!ChatModel.instance) {
      ChatModel.instance = new ChatModel()
    }
    return ChatModel.instance
  }

  private initializeSampleData(): void {
    const sampleChats: Chat[] = [
      {
        id: '1',
        title: 'プログラミングについて',
        messages: [
          {
            id: '1',
            content: 'Reactについて教えてください',
            sender: 'user',
            timestamp: new Date('2025-01-01 10:00')
          },
          {
            id: '2',
            content: 'Reactは、ユーザーインターフェースを構築するためのJavaScriptライブラリです。コンポーネントベースのアーキテクチャを採用しており、再利用可能なUIコンポーネントを作成できます。',
            sender: 'ai',
            timestamp: new Date('2025-01-01 10:01')
          }
        ],
        lastMessage: 'Reactは、ユーザーインターフェースを構築するためのJavaScriptライブラリです...',
        updatedAt: new Date('2025-01-01 10:01'),
        messageCount: 2
      },
      {
        id: '2',
        title: '料理のレシピ',
        messages: [
          {
            id: '3',
            content: '簡単なパスタのレシピを教えてください',
            sender: 'user',
            timestamp: new Date('2025-01-01 09:30')
          },
          {
            id: '4',
            content: 'シンプルなトマトパスタのレシピをご紹介します。材料はパスタ、トマト缶、にんにく、オリーブオイル、バジルです。',
            sender: 'ai',
            timestamp: new Date('2025-01-01 09:31')
          }
        ],
        lastMessage: 'シンプルなトマトパスタのレシピをご紹介します...',
        updatedAt: new Date('2025-01-01 09:31'),
        messageCount: 2
      },
      {
        id: '3',
        title: '旅行の計画',
        messages: [
          {
            id: '5',
            content: '京都旅行のおすすめスポットについて教えてください',
            sender: 'user',
            timestamp: new Date('2025-01-01 08:15')
          }
        ],
        lastMessage: '京都旅行のおすすめスポットについて教えてください',
        updatedAt: new Date('2025-01-01 08:15'),
        messageCount: 1
      }
    ]

    sampleChats.forEach(chat => {
      this.chats.set(chat.id, chat)
    })
  }

  private notifyListeners() {
    this.listeners.forEach(listener => listener())
  }

  addListener(listener: () => void): () => void {
    this.listeners.add(listener)
    return () => {
      this.listeners.delete(listener)
    }
  }

  // すべてのチャットのサマリーを取得
  getAllChatSummaries(): ChatSummary[] {
    const summaries = Array.from(this.chats.values()).map(chat => ({
      id: chat.id,
      title: chat.title,
      lastMessage: chat.lastMessage,
      updatedAt: chat.updatedAt,
      messageCount: chat.messageCount
    }))

    return summaries.sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime())
  }

  // 特定のチャットを取得
  getChat(id: string): Chat | null {
    return this.chats.get(id) || null
  }

  // 新しいチャットを作成
  createChat(id?: string): Chat {
    const chatId = id || Date.now().toString()
    const newChat: Chat = {
      id: chatId,
      title: '新しいチャット',
      messages: [],
      updatedAt: new Date(),
      messageCount: 0
    }

    this.chats.set(chatId, newChat)
    this.notifyListeners()
    return newChat
  }

  // チャットにメッセージを追加
  addMessage(chatId: string, content: string, sender: 'user' | 'ai'): Message | null {
    const chat = this.chats.get(chatId)
    if (!chat) return null

    const message: Message = {
      id: Date.now().toString(),
      content,
      sender,
      timestamp: new Date()
    }

    chat.messages.push(message)
    chat.lastMessage = content
    chat.updatedAt = new Date()
    chat.messageCount = chat.messages.length

    // チャットのタイトルが「新しいチャット」の場合、最初のメッセージから生成
    if (chat.title === '新しいチャット' && sender === 'user') {
      chat.title = content.length > 20 ? content.substring(0, 20) + '...' : content
    }

    this.notifyListeners()
    return message
  }

  // チャットを削除
  deleteChat(id: string): boolean {
    const result = this.chats.delete(id)
    if (result) {
      this.notifyListeners()
    }
    return result
  }

  // チャットのタイトルを更新
  updateChatTitle(id: string, title: string): boolean {
    const chat = this.chats.get(id)
    if (!chat) return false

    chat.title = title
    chat.updatedAt = new Date()
    this.notifyListeners()
    return true
  }

  // AIの応答をシミュレート
  async simulateAIResponse(chatId: string, userMessage: string): Promise<Message | null> {
    await new Promise(resolve => setTimeout(resolve, 1000)) // 1秒待機

    const responses = [
      `「${userMessage}」について考えてみます。これは興味深い質問ですね。`,
      `${userMessage}に関して、詳しく説明させていただきます。`,
      `そのご質問にお答えします。${userMessage}について...`,
      `${userMessage}ですね。とても良い質問です。`,
      `${userMessage}に関連して、いくつかのポイントをお話しします。`
    ]

    const randomResponse = responses[Math.floor(Math.random() * responses.length)]
    return this.addMessage(chatId, randomResponse, 'ai')
  }
}