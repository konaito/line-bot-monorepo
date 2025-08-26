export function ContentLayout({
  children,
  sidebar,
}: {
  children: React.ReactNode
  sidebar: React.ReactNode
}) {
  return (
    <div className="flex h-full bg-white">
      <div className="w-1/3 border-x bg-gray-50 border-gray-100">
        {sidebar}
      </div>
      <div className="w-2/3 bg-white">
        {children}
      </div>
    </div>
  )
}