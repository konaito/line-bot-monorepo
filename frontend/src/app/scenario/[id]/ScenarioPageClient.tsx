'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { ContentArea } from "@/components/ContentArea"
import { ScenarioModel } from "@/lib/models/ScenarioModel"
import { Scenario, Attitude } from "@/types/scenario"

interface ScenarioPageClientProps {
  scenarioId: string
}

export default function ScenarioPageClient({ scenarioId }: ScenarioPageClientProps) {
  const [scenario, setScenario] = useState<Scenario | null>(null)
  const [loading, setLoading] = useState(true)
  const [form, setForm] = useState({
    title: '',
    description: '',
    attitude: 'OTHER' as Attitude,
    enabled: true
  })
  const [hasChanges, setHasChanges] = useState(false)
  const [isNewScenario, setIsNewScenario] = useState(false)

  const scenarioModel = ScenarioModel.getInstance()
  const router = useRouter()

  useEffect(() => {
    const loadScenario = () => {
      if (scenarioId === 'new') {
        setIsNewScenario(true)
        setScenario(null)
        setForm({
          title: '',
          description: '',
          attitude: 'OTHER' as Attitude,
          enabled: true
        })
        setHasChanges(false)
        setLoading(false)
        return
      }

      const scenarioData = scenarioModel.getScenarioById(scenarioId)
      if (scenarioData) {
        setIsNewScenario(false)
        setScenario(scenarioData)
        setForm({
          title: scenarioData.title,
          description: scenarioData.description || '',
          attitude: scenarioData.attitude,
          enabled: scenarioData.enabled
        })
        setHasChanges(false)
      }
      setLoading(false)
    }

    loadScenario()

    if (scenarioId !== 'new') {
      const unsubscribe = scenarioModel.addListener(() => {
        loadScenario()
      })
      
      return unsubscribe
    }
  }, [scenarioId])

  const handleSave = () => {
    if (isNewScenario) {
      const newScenario = scenarioModel.createScenario(form)
      router.push(`/scenario/${newScenario.id}`)
    } else if (scenario) {
      scenarioModel.updateScenario(scenario.id, form)
      setHasChanges(false)
    }
  }

  const handleDelete = () => {
    if (scenario && confirm('このシナリオを削除しますか？')) {
      scenarioModel.deleteScenario(scenario.id)
      router.push('/scenario')
    }
  }

  if (loading) {
    return <ContentArea title="シナリオ" loading={true}></ContentArea>
  }

  if (!scenario && !isNewScenario) {
    return (
      <ContentArea title="シナリオが見つかりません">
        <div className="flex items-center justify-center h-full">
          <p className="text-gray-500">指定されたシナリオが見つかりませんでした</p>
        </div>
      </ContentArea>
    )
  }

  const isFormValid = form.title.trim() !== ''

  return (
    <ContentArea title={isNewScenario ? "新しいシナリオ" : "シナリオ"}>
      <div className="p-8 max-w-2xl">
        <div className="space-y-8">
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">タイトル *</label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => {
                setForm({...form, title: e.target.value})
                setHasChanges(true)
              }}
              className="w-full px-0 py-2 border-0 border-b border-gray-300 focus:border-gray-900 focus:ring-0 bg-transparent text-base"
              placeholder="タイトルを入力"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">態度</label>
            <select
              value={form.attitude}
              onChange={(e) => {
                const newAttitude = e.target.value as Attitude
                setForm({...form, attitude: newAttitude})
                setHasChanges(true)
              }}
              className="w-full px-0 py-2 border-0 border-b border-gray-300 focus:border-gray-900 focus:ring-0 bg-transparent text-base"
            >
              <option value="POSITIVE">肯定的</option>
              <option value="NEGATIVE">否定的</option>
              <option value="OTHER">その他</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">説明</label>
            <textarea
              value={form.description}
              onChange={(e) => {
                setForm({...form, description: e.target.value})
                setHasChanges(true)
              }}
              rows={4}
              className="w-full px-0 py-2 border-0 border-b border-gray-300 focus:border-gray-900 focus:ring-0 bg-transparent text-base resize-none"
              placeholder="シナリオの詳細な説明を入力してください"
            />
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="enabled"
              checked={form.enabled}
              onChange={(e) => {
                setForm({...form, enabled: e.target.checked})
                setHasChanges(true)
              }}
              className="h-4 w-4 text-gray-900 focus:ring-gray-900 border-gray-300 rounded"
            />
            <label htmlFor="enabled" className="ml-2 text-sm text-gray-900">有効にする</label>
          </div>

          <div className="pt-4 flex justify-between items-center">
            {!isNewScenario && (
              <button
                onClick={handleDelete}
                className="px-6 py-2 border border-red-300 text-red-600 rounded hover:bg-red-50"
                >
                削除
              </button>
            )}
            <div className="flex-1"></div>
            <button
              onClick={handleSave}
              disabled={isNewScenario ? !isFormValid : !hasChanges}
              className="px-6 py-2 bg-gray-900 text-white rounded hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isNewScenario ? '追加' : '保存'}
            </button>
          </div>
        </div>
      </div>
    </ContentArea>
  )
}