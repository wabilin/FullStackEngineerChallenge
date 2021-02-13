import { FC } from 'react'
import Head from 'next/head'
import styles from './layout.module.css'

const Layout: FC = ({ children }) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Review System</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        {children}
      </main>
    </div>
  )
}

export default Layout
