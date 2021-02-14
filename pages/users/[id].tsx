import { useRouter } from 'next/router'
import { useState } from 'react'
import useSWR from 'swr'
import Layout from 'components/layout'
import { createReview } from 'apis'
import Button from 'components/Button'

function UserView({ id, username }) {
  const [body, setBody] = useState('')

  return (
    <>
      <h1>Employee {username}</h1>
      <h2>Create review</h2>
        <form onSubmit={async (e) => {
          e.preventDefault()
          try {
            await createReview(id, body)
          } catch {
            alert('Failed')
          }
          alert('Review Created')
          setBody('')
        }}>
          <div>
            <textarea value={body} onChange={(event) => {
              setBody(event.target.value)
            }} />
          </div>
          <Button type="submit">Submit</Button>
        </form>
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
