export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  return <h1 className="text-2xl font-bold">Project {id}</h1>
}
