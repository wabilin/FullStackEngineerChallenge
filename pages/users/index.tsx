import { useEffect } from 'react'
import useSWR from 'swr'
import Layout from 'components/layout'

export default function UserIndex() {
  const { data, error } = useSWR('/api/users')

  useEffect(() => {
    console.log(data)
  }, [data])

  return (
    <Layout>
      <h1>User Index</h1>
    </Layout>
  )
}
