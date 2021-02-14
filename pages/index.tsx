import styles from 'styles/Home.module.css'
import Layout from 'components/layout'
import Link from 'components/LinkButton'
import useCurrentUser from 'hooks/useCurrentUser'

function AdminIndex() {
  return (
    <>
      <Link href='/users/new' label='Create User' />
      <Link href='/users' label='User List' />
    </>
  )
}

function EmployeeIndex() {
  return (
    <>
      <Link href='/feedbackRequests' label='Reviews Need Your Feedback' />
    </>
  )
}

export default function Home() {
  const user = useCurrentUser()

  return (
    <Layout>
      <h1 className={styles.title}>
        Review System
      </h1>
      {
        user?.role === 'admin' && <AdminIndex />
      }
      {
        user?.role === 'employee' && <EmployeeIndex />
      }
    </Layout>
  )
}
