interface ContentItem {
  id: string
  title: string
  summary?: string
  onClick?: () => void
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
          {items.map((item) => (
            <li 
              key={item.id}
              className={`p-4 rounded-lg cursor-pointer border ${
                selectedId === item.id
                  ? 'bg-gray-900 text-white border-gray-900 shadow-sm'
                  : 'bg-white border-gray-100 hover:border-gray-200 hover:shadow-sm'
              }`}
              onClick={item.onClick}
            >
              <h3 className={`font-semibold text-sm mb-1 ${
                selectedId === item.id ? 'text-white' : 'text-gray-900'
              }`}>
                {item.title}
              </h3>
              {item.summary && (
                <p className={`text-xs line-clamp-2 ${
                  selectedId === item.id ? 'text-gray-300' : 'text-gray-500'
                }`}>
                  {item.summary}
                </p>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}