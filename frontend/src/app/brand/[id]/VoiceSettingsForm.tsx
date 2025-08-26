'use client'

import { memo } from 'react'
import { BrandProfile } from "@/types/brandSettings"

interface VoiceSettingsFormProps {
  form: BrandProfile
  onUpdate: (updates: Partial<BrandProfile>) => void
}

export const VoiceSettingsForm = memo(function VoiceSettingsForm({ form, onUpdate }: VoiceSettingsFormProps) {
  return (
    <div className="space-y-8">
      <div>
        <label className="block text-sm font-medium text-gray-900 mb-2">口調</label>
        <select
          value={form.voice.tone}
          onChange={(e) => {
            onUpdate({ voice: { ...form.voice, tone: e.target.value as 'formal' | 'friendly' | 'casual' | 'polite' } })
          }}
          className="w-full px-0 py-2 border-0 border-b border-gray-300 focus:border-gray-900 focus:ring-0 bg-transparent text-base"
        >
          <option value="formal">丁寧</option>
          <option value="friendly">親しみやすい</option>
          <option value="casual">カジュアル</option>
          <option value="polite">礼儀正しい</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-900 mb-2">文章の長さ</label>
        <select
          value={form.voice.lengthPreference || 'medium'}
          onChange={(e) => {
            onUpdate({ voice: { ...form.voice, lengthPreference: e.target.value as 'short' | 'medium' | 'long' } })
          }}
          className="w-full px-0 py-2 border-0 border-b border-gray-300 focus:border-gray-900 focus:ring-0 bg-transparent text-base"
        >
          <option value="short">簡潔</option>
          <option value="medium">標準</option>
          <option value="long">詳細</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-900 mb-2">口調のメモ</label>
        <textarea
          value={form.voice.personaNotes || ''}
          onChange={(e) => {
            onUpdate({ voice: { ...form.voice, personaNotes: e.target.value } })
          }}
          rows={4}
          className="w-full px-0 py-2 border-0 border-b border-gray-300 focus:border-gray-900 focus:ring-0 bg-transparent text-base resize-none"
          placeholder="語尾の特徴、敬語レベル、NGワードなど"
        />
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          id="emojiAllowed"
          checked={form.voice.emojiAllowed || false}
          onChange={(e) => {
            onUpdate({ voice: { ...form.voice, emojiAllowed: e.target.checked } })
          }}
          className="h-4 w-4 text-gray-900 focus:ring-gray-900 border-gray-300 rounded"
        />
        <label htmlFor="emojiAllowed" className="ml-2 text-sm text-gray-900">絵文字使用を許可する</label>
      </div>
    </div>
  )
})