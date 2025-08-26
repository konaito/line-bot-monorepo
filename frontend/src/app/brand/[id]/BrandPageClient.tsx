'use client'

import { useState, useEffect, useCallback } from 'react'
import { ContentArea } from "@/components/ContentArea"
import { BrandModel } from "@/lib/models/BrandModel"
import { BrandProfile, BRAND_SETTING_CATEGORIES } from "@/types/brandSettings"
import { CompanyInfoForm } from "./CompanyInfoForm"
import { VoiceSettingsForm } from "./VoiceSettingsForm"
import { RulesForm } from "./RulesForm"
import { FormattingForm } from "./FormattingForm"

interface BrandPageClientProps {
  settingId: string
}

export default function BrandPageClient({ settingId }: BrandPageClientProps) {
  const [brand, setBrand] = useState<BrandProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [hasChanges, setHasChanges] = useState<Record<string, boolean>>({})
  const [form, setForm] = useState<BrandProfile | null>(null)

  const brandModel = BrandModel.getInstance()
  const currentSetting = BRAND_SETTING_CATEGORIES.find(cat => cat.id === settingId)

  const handleSave = useCallback(() => {
    if (brand && form) {
      brandModel.updateBrand(brand.id, form)
      setBrand(form)
      setHasChanges(prev => ({...prev, [settingId]: false}))
    }
  }, [brand, form, settingId, brandModel])

  const handleFormUpdate = useCallback((updates: Partial<BrandProfile>) => {
    if (form) {
      setForm({ ...form, ...updates })
      setHasChanges(prev => ({...prev, [settingId]: true}))
    }
  }, [form, settingId])

  const renderSettingForm = useCallback(() => {
    if (!form) return null
    
    switch(settingId) {
      case 'company':
        return <CompanyInfoForm form={form} onUpdate={handleFormUpdate} />
      case 'voice':
        return <VoiceSettingsForm form={form} onUpdate={handleFormUpdate} />
      case 'rules':
        return <RulesForm form={form} onUpdate={handleFormUpdate} />
      case 'formatting':
        return <FormattingForm form={form} onUpdate={handleFormUpdate} />
      default:
        return (
          <div className="flex items-center justify-center h-64">
            <p className="text-gray-500">この設定項目はまだ実装されていません</p>
          </div>
        )
    }
  }, [settingId, form, handleFormUpdate])

  useEffect(() => {
    const loadBrand = () => {
      // 仮のブランドデータ（実際は選択されたブランドを取得）
      const brandData = brandModel.getAllBrands()[0] 
      if (brandData) {
        setBrand(brandData)
        setForm(brandData)
        setHasChanges({})
      }
      setLoading(false)
    }

    loadBrand()

    const unsubscribe = brandModel.addListener(() => {
      loadBrand()
    })

    return unsubscribe
  }, [])

  if (loading) {
    return <ContentArea title="ブランド設定" loading={true}></ContentArea>
  }

  if (!currentSetting) {
    return (
      <ContentArea title="設定項目が見つかりません">
        <div className="flex items-center justify-center h-full">
          <p className="text-gray-500">指定された設定項目が見つかりませんでした</p>
        </div>
      </ContentArea>
    )
  }

  if (!brand || !form) {
    return (
      <ContentArea title="ブランドデータを初期化中">
        <div className="flex items-center justify-center h-full">
          <p className="text-gray-500">ブランドデータがありません</p>
        </div>
      </ContentArea>
    )
  }

  return (
    <ContentArea title={currentSetting.title}>
      <div className="p-8 max-w-2xl">
        <div className="mb-6">
          <p className="text-gray-600">{currentSetting.description}</p>
        </div>
        {renderSettingForm()}
        
        <div className="pt-6 mt-8">
          <button
            onClick={handleSave}
            disabled={!hasChanges[settingId]}
            className="px-6 py-2 bg-gray-900 text-white rounded hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            保存
          </button>
        </div>
      </div>
    </ContentArea>
  )
}