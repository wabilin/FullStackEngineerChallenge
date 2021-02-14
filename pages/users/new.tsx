import Layout from 'components/layout'
import LoginForm from 'components/LoginForm'
import {createUser} from 'apis'

export default function NewUser() {
  return (
    <Layout>
      <h2>New User</h2>
      <div>
        <LoginForm
          buttonLabel="Create User"
          onSubmit={async (username, password) => {
            try {
              await createUser(username, password)
            } catch {
              alert('Failed')
              return
            }
            alert('User created')
          }}
        />
      </div>
    </Layout>
  )
}
