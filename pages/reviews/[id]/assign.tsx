import { useRouter } from 'next/router'
import useSWR from 'swr'
import Layout from 'components/layout'
import Button from 'components/Button'
import { assignFeedback } from 'apis'

interface AssignReviewProps {
  id: number
  users: any[]
}

function AssignReview({ id, users }: AssignReviewProps) {
  const assigns = users.map(({id: userId, username}) => (
    <li key={id} style={{ margin: 12 } }>
      {username}
      <Button type="button" onClick={async () =>{
        try{
          await assignFeedback(id, userId)
          alert('Assigned')
        } catch {
          alert('Failed')
        }
      }}>
        Assign Feedback
      </Button>
    </li>
  ))

  return (
    <ul>
      {assigns}
    </ul>
  )
}

export default function AssignReviewPage() {
  const { query } = useRouter()
  const { id } = query
  const { data } = useSWR(`/api/users`)

  return (
    <Layout>
      <h1>Edit Review</h1>
      {!data && 'loading...'}
      {data && <AssignReview users={data} id={id} />}
    </Layout>
  )
}
