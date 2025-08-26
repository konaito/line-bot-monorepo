import { ContentLayout } from "@/components/layout/ContentLayout";
import { ScenarioList } from "@/components/layout/ScenarioList";

export default function ScenarioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ContentLayout sidebar={<ScenarioList />}>{children}</ContentLayout>;
}
