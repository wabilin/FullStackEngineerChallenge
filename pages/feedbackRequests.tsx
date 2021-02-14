import useSWR from 'swr'
import Layout from 'components/layout'
import Button from 'components/Button'
import LinkButton from 'components/LinkButton'
import { deleteUser } from 'apis'

interface RequestListProps {
  requests: any[]
}
function RequestList({ requests }: RequestListProps) {
  const items = requests.map(({ userId, reviewId }) => (
    <li key={`${userId}-${reviewId}`}>
      <LinkButton href={`/reviews/${reviewId}/feedback`} label={`#${reviewId}`}/>
    </li>
  ))

  return (
    <ul>
      {items}
    </ul>
  )
}

export default function FeedbackRequests() {
  const { data } = useSWR('/api/feedbackRequests')

  return (
    <Layout>
      <h1>Feedback Requests</h1>
      {!data && "loading..."}
      {data && <RequestList requests={data} />}
    </Layout>
  )
}
