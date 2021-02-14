import { useRouter } from 'next/router'
import styles from './NavBar.module.css'
import LinkButton from 'components/LinkButton'
import Button from 'components/Button'
import {logout} from 'apis'

const NavBar = () => {
  const router = useRouter()

  return (
    <nav className={styles.nav}>
      <LinkButton href="/" label="Home" />
      <LinkButton href="/login" label="Login" />
      <Button type="button"  onClick={async () => {
        await logout()
        alert('Logged out.')
        router.push('/login')
      }}>
        Logout
      </Button>
    </nav>
  )
}

export default NavBar
