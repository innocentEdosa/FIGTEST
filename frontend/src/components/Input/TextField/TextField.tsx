import { InputHTMLAttributes, ChangeEvent } from 'react'
import styles from './textField.module.css'
import { Overwrite } from '../../../utils/overwrite'

type InputProps = Overwrite<
  InputHTMLAttributes<HTMLInputElement>,
  {
    onChange: (value: Record<string, string>) => void
  }
>

const TextField = ({
  placeholder,
  onChange,
  name = 'input',
  ...rest
}: InputProps) => {
  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target
    onChange({ [name]: value })
  }

  return (
    <input
      {...rest}
      name={name}
      onChange={onInputChange}
      placeholder={placeholder}
      className={styles.textField}
    />
  )
}

export default TextField
