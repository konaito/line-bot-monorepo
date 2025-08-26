import { ContentLayout } from "@/components/layout/ContentLayout";
import { BrandList } from "@/components/layout/BrandList";

export default function BrandLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ContentLayout sidebar={<BrandList />}>{children}</ContentLayout>;
}