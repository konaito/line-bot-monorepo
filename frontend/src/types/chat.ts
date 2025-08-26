export interface Message {
  id: string
  content: string
  sender: 'user' | 'ai'
  timestamp: Date
}

export interface Chat {
  id: string
  title: string
  messages: Message[]
  lastMessage?: string
  updatedAt: Date
  messageCount: number
}

export interface ChatSummary {
  id: string
  title: string
  lastMessage?: string
  updatedAt: Date
  messageCount: number
}