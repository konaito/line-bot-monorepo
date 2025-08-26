import ChatPageClient from './ChatPageClient'

export default async function ChatPage(props: PageProps<'/chat/[id]'>) {
  const { id } = await props.params

  return <ChatPageClient chatId={id} />
}