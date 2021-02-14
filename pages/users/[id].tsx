import { useRouter } from 'next/router'
import { useState } from 'react'
import useSWR from 'swr'
import Layout from 'components/layout'
import { createReview } from 'apis'
import Button from 'components/Button'
import LinkButton from 'components/LinkButton'
import ReviewForm from 'components/ReviewForm'

interface CreateReviewProps {
  id: number
}
function CreateReview({ id }: CreateReviewProps) {
  return (
    <>
      <h2>Create review</h2>
      <ReviewForm
        initValue=""
        onSubmit={async (body) => {
          try {
            await createReview(id, body)
          } catch {
            alert('Failed')
          }
          alert('Review Created')
        }}
      />
    </>
  )
}
interface ReviewListProps {
  id: number
}
function ReviewList({ id }: ReviewListProps) {
  const { data } = useSWR(`/api/reviews/?userId=${id}`)

  const links = data && data.map(({id}) => (
    <li style={{margin: 12}}>
      #{id}
      <LinkButton href={`/reviews/${id}/edit`} label='Edit' />
      <LinkButton href={`/reviews/${id}/edit`} label='Assign' />
    </li>
  ))

  return (
    <>
      <h2>Review List</h2>
      {!data && "loading..."}
      {data && (
        <ul>
          {links}
        </ul>
      )}
    </>
  )
}

interface UserViewProps {
  id: number
  username: string
}
function UserView({ id, username }: UserViewProps) {
  return (
    <>
      <h1>Employee {username}</h1>
      <CreateReview id={id} />
      <ReviewList id={id} />
    </>
  )
}

export default function UserIndex() {
  const { query } = useRouter()
  const { id } = query
  const { data } = useSWR(`/api/users/${id}`)

  return (
    <Layout>
      {!data && "loading"}
      {data && (
        <UserView id={data.id} username={data.username} />
      )}
    </Layout>
  )
}
