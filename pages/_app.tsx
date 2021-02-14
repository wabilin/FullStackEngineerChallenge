import { SWRConfig } from 'swr'
import axios from 'axios'
import '../styles/globals.css'

const fetcher = (url: string) => axios.get(url).then(res => res.data)

function MyApp({ Component, pageProps }) {
  return (
    <SWRConfig value={{ fetcher, shouldRetryOnError: false  }} >
      <Component {...pageProps} />
    </SWRConfig>
  )
}

export default MyApp
