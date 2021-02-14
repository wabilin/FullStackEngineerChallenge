import useSWR from 'swr'
import Layout from 'components/layout'

interface TableProps {
  users: any[]
}
function UsersTable({ users }: TableProps) {
  const trs = users.map(user => (
    <tr key={user.id}>
      <td>{user.username}</td>
      <td>Delete</td>
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
