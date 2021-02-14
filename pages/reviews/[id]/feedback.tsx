import { useRouter } from 'next/router'
import useSWR from 'swr'
import Layout from 'components/layout'
import Button from 'components/Button'
import { updateReview } from 'apis'
import { useState } from 'react'

interface CreateFeedbackProps {
  body: string
  reviewId: number
  username: string
}
function CreateFeedback({ body, reviewId, username }: CreateFeedbackProps) {
  const [feedback, setFeedback] = useState('')

  return (
    <>
      <h3>
        Review Target: {username}
      </h3>
      <h3>
        Review Content
      </h3>
      <div>
        {body}
      </div>
      <h3>
        Your Feedback
      </h3>
      <form onSubmit={(e) => {
        e.preventDefault()
      }}>
        <textarea onChange={(e) => {
          setFeedback(e.target.value)
        }}>
          {feedback}
        </textarea>
        <div>
          <Button>Submit</Button>
        </div>
      </form>
    </>
  )
}

export default function CreateFeedbackPage() {
  const { query } = useRouter()
  const { id } = query
  const { data } = useSWR(`/api/reviews/${id}`)

  return (
    <Layout>
      <h1>Feedback to #{id}</h1>
      {!data && 'loading...'}
      {data && <CreateFeedback body={data.body} reviewId={Number(id)} username={data.user.username} />}
    </Layout>
  )
}
