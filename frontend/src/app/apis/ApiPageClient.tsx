'use client'

import { useState, useEffect } from 'react'
import { ContentArea } from "@/components/ContentArea"

interface ApiSettings {
  channelId: string
  channelSecret: string
  channelAccessToken: string
  webhookUrl: string
  officialAccountName: string
}

export function ApiPageClient() {
  const [form, setForm] = useState<ApiSettings>({
    channelId: '',
    channelSecret: '',
    channelAccessToken: '',
    webhookUrl: '',
    officialAccountName: ''
  })
  const [hasChanges, setHasChanges] = useState(false)
  const [loading, setLoading] = useState(false)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    // TODO: 既存のAPI設定を読み込み
    const loadApiSettings = () => {
      // 仮のデータ
      setForm({
        channelId: '',
        channelSecret: '',
        channelAccessToken: '',
        webhookUrl: process.env.NEXT_PUBLIC_WEBHOOK_URL || '',
        officialAccountName: ''
      })
    }
    
    loadApiSettings()
  }, [])

  const handleSave = async () => {
    setLoading(true)
    try {
      // TODO: API設定を保存
      console.log('Saving API settings:', form)
      setHasChanges(false)
    } catch (error) {
      console.error('Failed to save API settings:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleCopyWebhookUrl = async () => {
    try {
      await navigator.clipboard.writeText(form.webhookUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error('Failed to copy webhook URL:', error)
    }
  }

  const handleGetBotInfo = async () => {
    if (!form.channelAccessToken.trim()) {
      alert('チャンネルアクセストークンを入力してください')
      return
    }

    setLoading(true)
    try {
      const response = await fetch('/api/bot-info', {
        headers: {
          'Authorization': `Bearer ${form.channelAccessToken}`
        }
      })
      
      const data = await response.json()
      
      if (!response.ok) {
        console.error('Bot info fetch failed:', data)
        let errorMessage = 'ボット情報の取得に失敗しました'
        
        if (response.status === 401) {
          errorMessage = 'チャンネルアクセストークンが無効です。正しいトークンを入力してください。'
        } else if (response.status === 403) {
          errorMessage = 'アクセス権限がありません。トークンの権限を確認してください。'
        } else if (data.error) {
          errorMessage = data.error
        } else if (data.message) {
          errorMessage = data.message
        }
        
        alert(`エラー: ${errorMessage}`)
        return
      }

      // 取得した情報をフォームに反映
      setForm(prev => ({
        ...prev,
        officialAccountName: data.displayName || ''
      }))
      
      console.log('Bot info retrieved:', data)
    } catch (error) {
      console.error('Failed to fetch bot info:', error)
      alert('ネットワークエラーが発生しました')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex h-screen border-l border-gray-100">
      <div className="flex-1">
        <ContentArea title="API連携設定">
          <div className="p-8 max-w-2xl">
            <div className="space-y-8">
              {/* アカウント情報セクション */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-6">アカウント情報</h3>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">公式アカウント表示名 *</label>
                    <div className="w-full px-0 py-2 border-0 border-b border-gray-200 bg-transparent text-base text-gray-500">
                      {form.officialAccountName || '（チャンネルアクセストークンから自動取得）'}
                    </div>
                  </div>
                </div>
              </div>

              {/* API認証情報セクション */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-6">API認証情報</h3>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">Webhook URL</label>
                    <div className="relative">
                      <div className="w-full px-0 py-2 pr-12 border-0 border-b border-gray-200 bg-transparent text-base text-gray-500">
                        {form.webhookUrl}
                      </div>
                      <button
                        onClick={handleCopyWebhookUrl}
                        className="absolute right-0 top-2 px-2 py-1 text-xs text-gray-500 hover:text-gray-700 focus:outline-none"
                        title="URLをコピー"
                      >
                        {copied ? 'Copied!' : 'Copy'}
                      </button>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      このURLをLINE Developersコンソールに設定してください
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">チャンネルシークレット *</label>
                    <input
                      type="password"
                      value={form.channelSecret}
                      onChange={(e) => {
                        setForm({...form, channelSecret: e.target.value})
                        setHasChanges(true)
                      }}
                      className="w-full px-0 py-2 border-0 border-b border-gray-300 focus:border-gray-900 focus:ring-0 bg-transparent text-base"
                      placeholder="チャンネルシークレットを入力"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">チャンネルアクセストークン *</label>
                    <input
                      type="password"
                      value={form.channelAccessToken}
                      onChange={(e) => {
                        setForm({...form, channelAccessToken: e.target.value})
                        setHasChanges(true)
                      }}
                      className="w-full px-0 py-2 border-0 border-b border-gray-300 focus:border-gray-900 focus:ring-0 bg-transparent text-base"
                      placeholder="チャンネルアクセストークンを入力"
                    />
                  </div>
                </div>
              </div>

              {/* ボタンセクション */}
              <div className="pt-6 mt-8 flex gap-4">
                <button
                  onClick={handleGetBotInfo}
                  disabled={loading || !form.channelAccessToken.trim()}
                  className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? '取得中...' : 'ボット情報を取得'}
                </button>
                <button
                  onClick={handleSave}
                  disabled={!hasChanges || loading || !form.officialAccountName.trim()}
                  className="px-6 py-2 bg-gray-900 text-white rounded hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? '保存中...' : '保存'}
                </button>
              </div>
            </div>
          </div>
        </ContentArea>
      </div>
    </div>
  )
}