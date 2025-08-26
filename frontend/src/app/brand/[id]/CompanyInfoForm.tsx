'use client'

import { memo } from 'react'
import { BrandProfile } from "@/types/brandSettings"

interface CompanyInfoFormProps {
  form: BrandProfile
  onUpdate: (updates: Partial<BrandProfile>) => void
}

export const CompanyInfoForm = memo(function CompanyInfoForm({ form, onUpdate }: CompanyInfoFormProps) {
  return (
    <div className="space-y-8">
      <div>
        <label className="block text-sm font-medium text-gray-900 mb-2">正式名称</label>
        <input
          type="text"
          value={form.company.legalName || ''}
          onChange={(e) => {
            onUpdate({ company: { ...form.company, legalName: e.target.value } })
          }}
          className="w-full px-0 py-2 border-0 border-b border-gray-300 focus:border-gray-900 focus:ring-0 bg-transparent text-base"
          placeholder="株式会社○○"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-900 mb-2">住所</label>
        <input
          type="text"
          value={form.company.address || ''}
          onChange={(e) => {
            onUpdate({ company: { ...form.company, address: e.target.value } })
          }}
          className="w-full px-0 py-2 border-0 border-b border-gray-300 focus:border-gray-900 focus:ring-0 bg-transparent text-base"
          placeholder="東京都渋谷区1-1-1"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-900 mb-2">電話番号</label>
        <input
          type="text"
          value={form.company.phone || ''}
          onChange={(e) => {
            onUpdate({ company: { ...form.company, phone: e.target.value } })
          }}
          className="w-full px-0 py-2 border-0 border-b border-gray-300 focus:border-gray-900 focus:ring-0 bg-transparent text-base"
          placeholder="03-1234-5678"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-900 mb-2">営業時間</label>
        <input
          type="text"
          value={form.company.businessHours || ''}
          onChange={(e) => {
            onUpdate({ company: { ...form.company, businessHours: e.target.value } })
          }}
          className="w-full px-0 py-2 border-0 border-b border-gray-300 focus:border-gray-900 focus:ring-0 bg-transparent text-base"
          placeholder="平日 9:00-18:00"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-900 mb-2">備考</label>
        <textarea
          value={form.company.notes || ''}
          onChange={(e) => {
            onUpdate({ company: { ...form.company, notes: e.target.value } })
          }}
          rows={3}
          className="w-full px-0 py-2 border-0 border-b border-gray-300 focus:border-gray-900 focus:ring-0 bg-transparent text-base resize-none"
          placeholder="その他会社に関する追加情報"
        />
      </div>
    </div>
  )
})