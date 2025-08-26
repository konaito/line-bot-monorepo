import ScenarioPageClient from './ScenarioPageClient'

export default async function ScenarioPage(props: PageProps<'/scenario/[id]'>) {
  const { id } = await props.params

  return <ScenarioPageClient scenarioId={id} />
}