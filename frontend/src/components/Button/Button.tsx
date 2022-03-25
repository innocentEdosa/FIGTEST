import { HTMLAttributes } from 'react'
import styles from './button.module.css'

export type Props = HTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode
  disabled?: boolean
}

const Button = ({ children, onClick, disabled, ...rest }: Props) => {
  return (
    <button
      {...rest}
      disabled={disabled}
      onClick={onClick}
      className={styles.button}
    >
      {children}
    </button>
  )
}

export default Button
