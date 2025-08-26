import { ContentArea } from "@/components/ContentArea"

export default function BrandPage() {
  return (
    <ContentArea title="ブランド設定">
      <div className="flex items-center justify-center h-full">
        <div className="text-center space-y-4">
          <p className="text-lg text-gray-500 mb-6">ブランドを選択してください</p>
        </div>
      </div>
    </ContentArea>
  )
}