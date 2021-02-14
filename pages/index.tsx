import { useEffect } from 'react'
import useSWR from 'swr'
import axios from 'axios'
import styles from '../styles/Home.module.css'
import Layout from '../components/layout'

export default function Home() {
  const { data } = useSWR('/api/users')
  useEffect(() => {
    console.log(data)
  }, [data])

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
      <button onClick={onClick}>
        Create admin
      </button>
      <button onClick={onSetCookiesClick}>
        Set Cookies
      </button>
    </Layout>
  )
}
