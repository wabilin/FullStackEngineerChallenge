import { useRouter } from 'next/router'
import useSWR from 'swr'
import Layout from 'components/layout'

interface ReviewProps {
  body: string
  feedbacks: any[]
}
function Review({ body, feedbacks }: ReviewProps) {
  const feedbackItems = feedbacks.map(feedback => (
    <div key={feedback.id}>
      <h3>Feedback #{feedback.id}</h3>
      <p>{feedback.body}</p>
      <p>By: {feedback.user.username}</p>
    </div>
  ))
  return (
    <div >
      {body}
      <div>
        <h2>Feedbacks</h2>
        {feedbackItems}
      </div>
    </div>
  )
}

export default function ReviewPage() {
  const { query } = useRouter()
  const id = query.id
  const { data } = useSWR(`/api/reviews/${id}`)
  const { data: feedbacks } = useSWR(`/api/feedbacks?reviewId=${id}`)
  const loading = !(data && feedbacks)

  return (
    <Layout>
      <h1>Review #{id}</h1>
      {loading && 'loading...'}
      {!loading && <Review body={data.body} feedbacks={feedbacks} />}
    </Layout>
  )
}
