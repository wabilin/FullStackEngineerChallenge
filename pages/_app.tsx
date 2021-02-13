import { SWRConfig } from 'swr'
import '../styles/globals.css'

type Fetch = typeof fetch
const fetcher = (...args: Parameters<Fetch>) => fetch(...args).then(res => res.json())

function MyApp({ Component, pageProps }) {
  return (
    <SWRConfig value={{ fetcher }} >
      <Component {...pageProps} />
    </SWRConfig>
  )
}

export default MyApp
