import BrandPageClient from './BrandPageClient'

export default async function BrandPage(props: PageProps<'/brand/[id]'>) {
  const { id } = await props.params

  return <BrandPageClient settingId={id} />
}