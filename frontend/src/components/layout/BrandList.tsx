'use client'

import { useRouter, usePathname } from 'next/navigation'
import { ContentList } from "@/components/ContentList"
import { BRAND_SETTING_CATEGORIES } from "@/types/brandSettings"

export const BrandList = () => {
  const router = useRouter()
  const pathname = usePathname()

  // 現在の設定項目IDを取得
  const getCurrentSettingId = () => {
    const match = pathname?.match(/^\/brand\/([^\/]+)$/)
    return match ? match[1] : ''
  }

  const currentSettingId = getCurrentSettingId()

  const settingListItems = BRAND_SETTING_CATEGORIES.map(category => ({
    id: category.id,
    title: category.title,
    summary: category.description,
    onClick: () => {
      router.push(`/brand/${category.id}`)
    }
  }))

  return (
    <ContentList 
      title="ブランド設定"
      items={settingListItems}
      selectedId={currentSettingId}
    />
  )
}