import { ContentLayout } from "@/components/layout/ContentLayout";
import { HistoryList } from "@/components/layout/HistoryList";

export default function ChatsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ContentLayout sidebar={<HistoryList />}>{children}</ContentLayout>;
}
