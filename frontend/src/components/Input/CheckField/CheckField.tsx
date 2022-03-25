import styles from './checkField.module.css'

const CheckField = ({
  label,
  name,
  onChange,
}: {
  label: string
  name: string
  onChange: (value: Record<string, boolean>) => void
}) => {
  const onChangeHandler = (e: any) => {
    const { checked, name } = e.target
    onChange({ [name]: checked })
  }

  return (
    <label className={styles.checkBox}>
      <input name={name} onChange={onChangeHandler} type="checkbox" />
      <span className={styles.label}>{label}</span>
    </label>
  )
}

export default CheckField
