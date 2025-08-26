'use client'

import { useState, useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { ContentList } from "@/components/ContentList"
import { ScenarioModel } from "@/lib/models/ScenarioModel"
import { ScenarioSummary, ATTITUDE_LABELS } from "@/types/scenario"

export const ScenarioList = () => {
  const router = useRouter()
  const pathname = usePathname()
  const [scenarioSummaries, setScenarioSummaries] = useState<ScenarioSummary[]>([])
  
  const scenarioModel = ScenarioModel.getInstance()

  // 現在のシナリオIDを取得
  const getCurrentScenarioId = () => {
    const match = pathname?.match(/^\/scenario\/([^\/]+)$/)
    return match ? match[1] : ''
  }

  const currentScenarioId = getCurrentScenarioId()

  // データの初期化とロード
  useEffect(() => {
    const loadScenarioSummaries = () => {
      const summaries = scenarioModel.getAllScenarioSummaries()
      setScenarioSummaries(summaries)
    }

    // 初回ロード
    loadScenarioSummaries()

    // モデルの変更をリスニング
    const unsubscribe = scenarioModel.addListener(loadScenarioSummaries)
    
    return unsubscribe
  }, [])

  const scenarioListItems = scenarioSummaries.map(scenario => ({
    id: scenario.id,
    title: scenario.title,
    summary: `${ATTITUDE_LABELS[scenario.attitude]} • ${scenario.enabled ? '有効' : '無効'}`,
    onClick: () => {
      router.push(`/scenario/${scenario.id}`)
    }
  }))

  const handleAddNew = () => {
    router.push('/scenario/new')
  }

  const isNewSelected = currentScenarioId === 'new'

  return (
    <ContentList 
      title="シナリオ一覧"
      items={scenarioListItems}
      selectedId={isNewSelected ? 'new' : currentScenarioId}
      onAddNew={handleAddNew}
      addButtonText="新しいシナリオを追加"
    />
  )
}