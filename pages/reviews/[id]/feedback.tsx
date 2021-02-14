import { useRouter } from 'next/router'
import useSWR from 'swr'
import Layout from 'components/layout'
import Button from 'components/Button'
import { createFeedback } from 'apis'
import { useState } from 'react'

interface CreateFeedbackProps {
  body: string
  reviewId: number
  username: string
}
function CreateFeedback({ body, reviewId, username }: CreateFeedbackProps) {
  const router = useRouter()
  const [feedback, setFeedback] = useState('')
  const [sending, setSending] = useState(false)

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
      <form onSubmit={async (e) => {
        e.preventDefault()
        setSending(true)
        try {
          await createFeedback(reviewId, feedback)
        } catch {
          alert('Failed')
          setSending(false)
          return
        }
          alert('Feedback submitted')
        router.push('/')
      }}>
        <textarea onChange={(e) => {
          setFeedback(e.target.value)
        }}>
          {feedback}
        </textarea>
        <div>
          <Button type="submit" disabled={sending}>Submit</Button>
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
