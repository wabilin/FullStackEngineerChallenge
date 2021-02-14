import axios from 'axios'
import styles from 'styles/Home.module.css'
import Layout from 'components/layout'
import Link from 'components/LinkButton'
import useCurrentUser from 'hooks/useCurrentUser'

function AdminIndex() {
  return (
    <>
      <Link href='users/new' label='Create User' />
    </>
  )
}

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
        user?.role === 'admin' && <AdminIndex />
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
