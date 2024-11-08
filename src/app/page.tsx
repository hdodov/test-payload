import config from '@payload-config'
import { getPayload } from 'payload'

export default async function Page() {
  const payload = await getPayload({ config })
  const result = await payload.find({ collection: 'users', limit: 1 })
  const user = result?.docs[0]
  return <h1>Hello {user ? user.email : 'World'}</h1>
}
