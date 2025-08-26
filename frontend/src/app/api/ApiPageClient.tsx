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
                  {/* <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">チャンネルID *</label>
                    <input
                      type="text"
                      value={form.channelId}
                      onChange={(e) => {
                        setForm({...form, channelId: e.target.value})
                        setHasChanges(true)
                      }}
                      className="w-full px-0 py-2 border-0 border-b border-gray-300 focus:border-gray-900 focus:ring-0 bg-transparent text-base"
                      placeholder="チャンネルIDを入力"
                    />
                  </div> */}


                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">公式アカウント表示名</label>
                    <div className="w-full px-0 py-2 border-0 border-b border-gray-200 bg-transparent text-base text-gray-500">
                      {form.officialAccountName || '（チャンネルID・シークレットから自動取得）'}
                    </div>
                  </div>
                </div>
              </div>

              {/* API認証情報セクション */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-6">API認証情報</h3>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">チャンネルシークレット *</label>
                    <input
                      type="password"
                      value={form.channelSecret}
                      onChange={(e) => {
                        setForm({...form, channelSecret: e.target.value})
                        setHasChanges(true)
                      }}
                      // onBlur={fetchOfficialAccountName}
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
                      // onBlur={fetchChannelAccessToken}
                      className="w-full px-0 py-2 border-0 border-b border-gray-300 focus:border-gray-900 focus:ring-0 bg-transparent text-base"
                      placeholder="チャンネルアクセストークンを入力"
                    />
                  </div>

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
                </div>
              </div>

              {/* 保存ボタン */}
              <div className="pt-6 mt-8">
                <button
                  onClick={handleSave}
                  disabled={!hasChanges || loading}
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