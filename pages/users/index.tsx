import useSWR from 'swr'
import Layout from 'components/layout'
import Button from 'components/Button'
import LinkButton from 'components/LinkButton'
import { deleteUser } from 'apis'

interface TableProps {
  users: any[]
}
function UsersTable({ users }: TableProps) {
  const trs = users.map(({id, username}) => (
    <tr key={id}>
      <td>{username}</td>
      <td>
        <Button onClick={async() => {
          try {
            await deleteUser(id)
          } catch {
            alert('Failed')
            return
          }
          alert('Deleted')
        }}>
          Delete
        </Button>
      </td>
      <td>
        <LinkButton label="Review" href={`/users/${id}`} />
      </td>
    </tr>
  ))

  return (
    <table>
      <thead>
        <tr>
          <th>name</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {trs}
      </tbody>
    </table>
  )
}

export default function UserIndex() {
  const { data } = useSWR('/api/users')

  return (
    <Layout>
      <h1>User Index</h1>
      {!data && "loading..."}
      {data && <UsersTable users={data}/>}
    </Layout>
  )
}
