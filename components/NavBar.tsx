import Link from 'next/link'
import { useRouter } from 'next/router'
import styles from './NavBar.module.css'
import {logout} from 'apis'

interface LinkProps {
  label: string;
  href: string;
}
const LinkButton = ({href, label}: LinkProps) => (
  <Link href={href} passHref>
    <a className={styles.link}>{label}</a>
  </Link>
)

const NavBar = () => {
  const router = useRouter()

  return (
    <nav className={styles.nav}>
      <LinkButton href="/" label="Home" />
      <LinkButton href="/login" label="Login" />
      <button type="button" className={styles.link} onClick={async () => {
        await logout()
        alert('Logged out.')
        router.push('/')
      }}>
        Logout
      </button>
    </nav>
  )
}

export default NavBar
