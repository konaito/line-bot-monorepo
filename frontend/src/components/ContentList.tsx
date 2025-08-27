interface ContentItem {
  id: string
  title: string
  summary?: string
  onClick?: () => void
  badge?: string
  isActive?: boolean
  timestamp?: string
  avatarUrl?: string
  statusIcon?: string
  lastMessageDirection?: 'incoming' | 'outgoing' // 最後のメッセージの方向
  isConfirmed?: boolean // 確認済みかどうか
}

interface ContentListProps {
  title?: string
  items: ContentItem[]
  selectedId?: string
  onAddNew?: () => void
  addButtonText?: string
}

export function ContentList({ 
  title = "コンテンツリスト", 
  items, 
  selectedId,
  onAddNew,
  addButtonText = "追加"
}: ContentListProps) {
  return (
    <div className="bg-gray-50 h-full flex flex-col">
      <div className="p-6 border-b border-gray-200 bg-white">
        <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
      </div>
      <div className="flex-1 overflow-y-auto p-4">
        <ul className="space-y-1">
          {onAddNew && (
            <li>
              <button 
                onClick={onAddNew}
                className="w-full p-4 rounded-lg border border-dashed border-gray-300 bg-white hover:border-gray-400 hover:bg-gray-50 transition-colors"
              >
                <div className="text-center">
                  <div className="text-gray-400 text-lg mb-1">+</div>
                  <p className="text-sm text-gray-600">{addButtonText}</p>
                </div>
              </button>
            </li>
          )}
          {items.map((item) => {
            // 背景色を決定するロジック
            const getBackgroundColor = () => {
              if (selectedId === item.id) {
                return 'bg-gray-900 text-white border-gray-900 shadow-sm'
              }
              
              // BOTからのメッセージまたは確認済みの場合はグレー
              if (item.lastMessageDirection === 'outgoing' || item.isConfirmed) {
                return 'bg-gray-100 border-gray-200 hover:border-gray-300 hover:shadow-sm'
              }
              
              // LINEユーザーからのメッセージかつ未確認の場合は真っ白
              return 'bg-white border-gray-100 hover:border-gray-200 hover:shadow-sm'
            }
            
            return (
              <li 
                key={item.id}
                className={`rounded-lg cursor-pointer border transition-all duration-200 ${getBackgroundColor()}`}
                onClick={item.onClick}
              >
              <div className="p-4 flex items-start gap-3">
                {/* アバター */}
                <div className="flex-shrink-0 relative">
                  {item.avatarUrl && (
                    <img 
                      src={item.avatarUrl} 
                      alt={item.title}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  )}
                </div>

                {/* コンテンツ */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className={`font-semibold text-sm truncate ${
                      selectedId === item.id ? 'text-white' : 'text-gray-900'
                    }`}>
                      {item.title}
                    </h3>
                    <div className="flex items-center gap-1 ml-2">
                      {item.timestamp && (
                        <span className={`text-xs ${
                          selectedId === item.id ? 'text-gray-300' : 'text-gray-500'
                        }`}>
                          {item.timestamp}
                        </span>
                      )}
                      {item.badge && (
                        <span className="inline-flex items-center justify-center px-2 py-1 text-xs font-bold text-white bg-red-500 rounded-full min-w-[20px] h-5">
                          {item.badge}
                        </span>
                      )}
                    </div>
                  </div>
                  
                  {item.summary && (
                    <div className="flex items-center gap-2">
                      <p className={`text-xs line-clamp-2 flex-1 ${
                        selectedId === item.id ? 'text-gray-300' : 'text-gray-500'
                      }`}>
                        {item.summary}
                      </p>
                      {item.statusIcon && (
                        <span className="text-xs">{item.statusIcon}</span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}