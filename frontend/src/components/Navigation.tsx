import Link from 'next/link'
import { Route } from 'next'

interface NavigationItem {
  label: string
  href: string
  onClick?: () => void
  className?: string
}

interface NavigationProps {
  title?: string
  items: NavigationItem[]
}

export function Navigation({ title = "Navigation", items }: NavigationProps) {
  return (
    <>
      <h2 className="text-lg font-bold mb-6">{title}</h2>
      <nav className="flex-1">
        <ul className="space-y-2">
          {items.map((item, index) => (
            <li key={index}>
              {item.onClick ? (
                <button 
                  onClick={item.onClick}
                  className={`w-full text-left block px-3 py-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors ${item.className || ''}`}
                >
                  {item.label}
                </button>
              ) : (
                <Link 
                  href={item.href as Route}
                  className={`block px-3 py-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors ${item.className || ''}`}
                >
                  {item.label}
                </Link>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </>
  )
}