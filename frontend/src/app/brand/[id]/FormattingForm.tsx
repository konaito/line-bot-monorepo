'use client'

import { memo } from 'react'
import { BrandProfile } from "@/types/brandSettings"

interface FormattingFormProps {
  form: BrandProfile
  onUpdate: (updates: Partial<BrandProfile>) => void
}

export const FormattingForm = memo(function FormattingForm({ form, onUpdate }: FormattingFormProps) {
  return (
    <div className="space-y-8">
      <div>
        <label className="block text-sm font-medium text-gray-900 mb-2">書き出し</label>
        <input
          type="text"
          value={form.formatting.prefix || ''}
          onChange={(e) => {
            onUpdate({ formatting: { ...form.formatting, prefix: e.target.value } })
          }}
          className="w-full px-0 py-2 border-0 border-b border-gray-300 focus:border-gray-900 focus:ring-0 bg-transparent text-base"
          placeholder="いつもお世話になっております。"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-900 mb-2">署名</label>
        <input
          type="text"
          value={form.formatting.signOff || ''}
          onChange={(e) => {
            onUpdate({ formatting: { ...form.formatting, signOff: e.target.value } })
          }}
          className="w-full px-0 py-2 border-0 border-b border-gray-300 focus:border-gray-900 focus:ring-0 bg-transparent text-base"
          placeholder="— ○○サポートチーム"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-900 mb-2">末尾定型文</label>
        <textarea
          value={form.formatting.suffix || ''}
          onChange={(e) => {
            onUpdate({ formatting: { ...form.formatting, suffix: e.target.value } })
          }}
          rows={3}
          className="w-full px-0 py-2 border-0 border-b border-gray-300 focus:border-gray-900 focus:ring-0 bg-transparent text-base resize-none"
          placeholder="ご不明な点がございましたら、お気軽にお声がけください。"
        />
      </div>
    </div>
  )
})