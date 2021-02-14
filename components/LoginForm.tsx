import { useState } from 'react'

interface Props {
  onSubmit: (username: string, password: string) => void|Promise<void>
  buttonLabel: string
}
export default function UserIndex({onSubmit, buttonLabel}: Props) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  return (
      <form onSubmit={(event) => {
        event.preventDefault()
        onSubmit(username, password)
        setUsername('')
        setPassword('')
      }}>
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
            minLength={8}
            onChange={(event) => {
              setPassword(event.target.value)
            }}
          />
        </label>
        <br />
        <button type="submit">{buttonLabel}</button>
      </form>
  )
}
