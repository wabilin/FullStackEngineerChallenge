import { useEffect } from 'react'
import useSWR from 'swr'
import axios from 'axios'
import styles from '../styles/Home.module.css'
import Layout from '../components/layout'
import useCurrentUser from 'hooks/useCurrentUser'

export default function Home() {
  const user = useCurrentUser()

  const onClick = () => {
    axios.post('/api/users')
  }

  const onSetCookiesClick = () => {
    axios.post('/api/login')
  }

  return (
    <Layout>
      <h1 className={styles.title}>
        Review System
      </h1>
      {
        user?.role === 'admin' && 'ADMIN VIEW'
      }
      <button onClick={onClick}>
        Create admin
      </button>
      <button onClick={onSetCookiesClick}>
        Set Cookies
      </button>
    </Layout>
  )
}
