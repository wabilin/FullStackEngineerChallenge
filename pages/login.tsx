import { useRouter } from 'next/router'
import Layout from 'components/layout'
import LoginForm from 'components/LoginForm'
import { login } from 'apis'

export default function UserIndex() {
  const router = useRouter()
  const error = router.query.error

  return (
    <Layout>
      <h1>Login</h1>
      {error && <p style={{color: 'red'}}>Please login first.</p>}
      <div>
        <LoginForm
          buttonLabel="Login"
          onSubmit={async (username, password) => {
            try {
              await login(username, password)
              alert('Login Success')
              router.push('/')
            } catch {
              alert('Login Failed')
            }
          }}
        />
      </div>
    </Layout>
  )
}
