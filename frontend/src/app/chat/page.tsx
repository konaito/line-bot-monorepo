import { ContentArea } from "@/components/ContentArea"

export default function ChatsPage() {

  return (
    <ContentArea title="チャット">
      <div className="flex items-center justify-center h-full">
        <div className="text-center space-y-4">
          <p className="text-lg text-gray-500 mb-6">チャット一覧から選択してください</p>
        </div>
      </div>
    </ContentArea>
  )
}