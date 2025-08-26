'use client'

import { memo, useCallback } from 'react'
import { BrandProfile } from "@/types/brandSettings"

interface RulesFormProps {
  form: BrandProfile
  onUpdate: (updates: Partial<BrandProfile>) => void
}

export const RulesForm = memo(function RulesForm({ form, onUpdate }: RulesFormProps) {
  const handleMustSayChange = useCallback((index: number, value: string) => {
    const newMustSay = [...(form.rules.mustSay || [])]
    newMustSay[index] = value
    onUpdate({ rules: { ...form.rules, mustSay: newMustSay } })
  }, [form.rules, onUpdate])

  const handleMustSayDelete = useCallback((index: number) => {
    const newMustSay = (form.rules.mustSay || []).filter((_, i) => i !== index)
    onUpdate({ rules: { ...form.rules, mustSay: newMustSay } })
  }, [form.rules, onUpdate])

  const handleMustSayAdd = useCallback(() => {
    const newMustSay = [...(form.rules.mustSay || []), '']
    onUpdate({ rules: { ...form.rules, mustSay: newMustSay } })
  }, [form.rules, onUpdate])

  const handleMustNotSayChange = useCallback((index: number, value: string) => {
    const newMustNotSay = [...(form.rules.mustNotSay || [])]
    newMustNotSay[index] = value
    onUpdate({ rules: { ...form.rules, mustNotSay: newMustNotSay } })
  }, [form.rules, onUpdate])

  const handleMustNotSayDelete = useCallback((index: number) => {
    const newMustNotSay = (form.rules.mustNotSay || []).filter((_, i) => i !== index)
    onUpdate({ rules: { ...form.rules, mustNotSay: newMustNotSay } })
  }, [form.rules, onUpdate])

  const handleMustNotSayAdd = useCallback(() => {
    const newMustNotSay = [...(form.rules.mustNotSay || []), '']
    onUpdate({ rules: { ...form.rules, mustNotSay: newMustNotSay } })
  }, [form.rules, onUpdate])

  return (
    <div className="space-y-8">
      {/* 必須表現 */}
      <div>
        <label className="block text-sm font-medium text-gray-900 mb-4">含めたい文言</label>
        <div className="space-y-2">
          {(form.rules.mustSay || []).map((item, index) => (
            <div key={index} className="flex items-center gap-2">
              <input
                type="text"
                value={item}
                onChange={(e) => handleMustSayChange(index, e.target.value)}
                className="flex-1 px-0 py-2 border-0 border-b border-gray-300 focus:border-gray-900 focus:ring-0 bg-transparent text-base"
                placeholder="必須の表現を入力"
              />
              <button
                onClick={() => handleMustSayDelete(index)}
                className="text-red-500 hover:text-red-700 text-sm"
              >
                削除
              </button>
            </div>
          ))}
          <button
            onClick={handleMustSayAdd}
            className="text-gray-500 hover:text-gray-700 text-sm border-b border-dashed border-gray-300 pb-1"
          >
            + 項目を追加
          </button>
        </div>
      </div>

      {/* 禁止表現 */}
      <div>
        <label className="block text-sm font-medium text-gray-900 mb-4">禁止表現</label>
        <div className="space-y-2">
          {(form.rules.mustNotSay || []).map((item, index) => (
            <div key={index} className="flex items-center gap-2">
              <input
                type="text"
                value={item}
                onChange={(e) => handleMustNotSayChange(index, e.target.value)}
                className="flex-1 px-0 py-2 border-0 border-b border-gray-300 focus:border-gray-900 focus:ring-0 bg-transparent text-base"
                placeholder="禁止する表現を入力"
              />
              <button
                onClick={() => handleMustNotSayDelete(index)}
                className="text-red-500 hover:text-red-700 text-sm"
              >
                削除
              </button>
            </div>
          ))}
          <button
            onClick={handleMustNotSayAdd}
            className="text-gray-500 hover:text-gray-700 text-sm border-b border-dashed border-gray-300 pb-1"
          >
            + 項目を追加
          </button>
        </div>
      </div>
    </div>
  )
})