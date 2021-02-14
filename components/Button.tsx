import { HTMLProps } from 'react'
import styles from './button.module.css'

const Button = (props: HTMLProps<HTMLButtonElement>) => {
  return (
    // @ts-ignore
    <button className={styles.link} {...props}/>
  )
}

export default Button
