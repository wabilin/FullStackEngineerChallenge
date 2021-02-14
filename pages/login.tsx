import {useState} from 'react'
import Layout from 'components/layout'
import {login} from 'apis'

export default function UserIndex() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const onLoginClick = async () => {
    try {
      await login(username, password)
    } catch {
      alert('Login Failed')
    }
  }

  return (
    <Layout>
      <h1>Login</h1>
      <div>
        <label>
          Username
          <input
            type="text" value={username}
            onChange={(event) => {
              setUsername(event.target.value)
            }}
          />
        </label>
        <br />
        <label>
          Password
          <input
            type="password" value={password}
            onChange={(event) => {
              setPassword(event.target.value)
            }}
          />
        </label>
        <br />
        <button type="button" onClick={onLoginClick}>
          Login
        </button>
      </div>
    </Layout>
  )
}
