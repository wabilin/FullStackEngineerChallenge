import { useRouter } from 'next/router'
import useSWR from 'swr'
import Layout from 'components/layout'
import ReviewForm from 'components/ReviewForm'
import { updateReview } from 'apis'
interface EditReviewProps {
  body: string
  id: number
}
function EditReview({ body, id }: EditReviewProps) {
  return (
    <ReviewForm keep initValue={body} onSubmit={async (body) => {
      try {
        await updateReview(id, body)
        alert('Updated')
      } catch {
        alert('Failed')
      }
    }} />
  )
}

export default function EditReviewPage() {
  const { query } = useRouter()
  const id = Number(query.id)
  const { data } = useSWR(`/api/reviews/${id}`)

  return (
    <Layout>
      <h1>Edit Review</h1>
      {!data && 'loading...'}
      {data && <EditReview body={data.body} id={id} />}
    </Layout>
  )
}
