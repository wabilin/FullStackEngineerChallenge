
import Layout from 'components/layout'

export default function Review() {
  const { data } = useSWR(`/api/reviews/?userId=${id}`)

  return (
    <Layout>
      <h1>Review</h1>
    </Layout>
  )
}
