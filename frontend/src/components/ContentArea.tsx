import { ReactNode } from 'react'

interface ContentAreaProps {
  title?: string
  children?: ReactNode
  loading?: boolean
}

export function ContentArea({ 
  title = "コンテンツ", 
  children, 
  loading = false 
}: ContentAreaProps) {
  return (
    <div className="bg-white h-full flex flex-col">
      <div className="p-6 border-b border-gray-100">
        <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
      </div>
      <div className="flex-1 overflow-y-auto">
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-gray-500">読み込み中...</div>
          </div>
        ) : (
          <div className="h-full">
            {children}
          </div>
        )}
      </div>
    </div>
  )
}