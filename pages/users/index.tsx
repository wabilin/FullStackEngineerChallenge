import useSWR from 'swr'
import Layout from 'components/layout'
import Button from 'components/Button'
import { deleteUser } from 'apis'

interface TableProps {
  users: any[]
}
function UsersTable({ users }: TableProps) {
  const trs = users.map(user => (
    <tr key={user.id}>
      <td>{user.username}</td>
      <td>
        <Button onClick={async() => {
          try {
            await deleteUser(user.id)
          } catch {
            alert('failed')
            return
          }
          alert('Deleted')
        }}>
          Delete
        </Button>
      </td>
      <td>Add Review</td>
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
