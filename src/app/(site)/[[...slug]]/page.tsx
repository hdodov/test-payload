import config from '@payload-config'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'

type Props = {
  params: Promise<{ slug?: string[] }>
}

export default async function Page({ params }: Props) {
  const { slug } = await params
  const url = Array.isArray(slug) ? slug.join('/') : notFound()

  const payload = await getPayload({ config })
  const result = await payload.find({
    collection: 'pages',
    where: {
      slug: { equals: url },
    },
  })
  const content = result?.docs[0]
  if (!content) notFound()

  return (
    <section>
      <h1>Visited page {url}</h1>
      <main>{content.text}</main>
    </section>
  )
}
