'use client'

import Link from "next/link"
import { usePathname } from 'next/navigation'
import type { Route } from 'next'

const navigationItems: { label: string; href: Route }[] = [
  {
    label: "チャット",
    href: "/chat",
  },
  {
    label:"シナリオ",
    href:"/scenario",
  },
  {
    label:"ブランド",
    href:"/brand",
  },
  {
    label:"API連携",
    href:"/apis",
  }
]

export function NavigationList() {
  const pathname = usePathname()

  return (
    <div className="bg-white h-full flex flex-col">
      <div className="p-6 border-b border-gray-100">
        <h1 className="text-xl font-semibold text-gray-900">Menu</h1>
      </div>
      <nav className="flex-1 p-4">
        <ul className="space-y-1">
          {navigationItems.map((item, index) => {
            const isActive = pathname === item.href || (item.href === '/chat' && pathname?.startsWith('/chat')) || (item.href === '/scenario' && pathname?.startsWith('/scenario')) || (item.href === '/brand' && pathname?.startsWith('/brand')) || (item.href === '/apis' && pathname?.startsWith('/apis'))
            return (
              <li key={index}>
                <Link
                  href={item.href}
                  className={`block px-4 py-3 rounded-lg text-sm font-medium ${
                    isActive 
                      ? "bg-gray-900 text-white shadow-sm" 
                      : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>
    </div>
  )
}
