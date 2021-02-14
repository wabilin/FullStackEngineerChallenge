import Link from 'next/link'
import styles from './button.module.css'

interface Props {
  label: string;
  href: string;
}
const LinkButton = ({ href, label }: Props) => (
  <Link href={href} passHref>
    <a className={styles.link}>{label}</a>
  </Link>
)

export default LinkButton
