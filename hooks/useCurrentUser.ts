import { useEffect } from 'react'
import useSWR from 'swr'
import { useRouter } from 'next/router'

export default function useCurrentUser() {
  const router = useRouter()
  const { data, error } = useSWR('/api/user')

  useEffect(() => {
    if (error) {
      router.push({
        pathname: '/login',
        query: { error: 'need-login' }
      })
    }
  }, [error])

  return data
}
