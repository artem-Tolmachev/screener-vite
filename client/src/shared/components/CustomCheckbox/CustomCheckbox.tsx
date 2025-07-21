import styles from './styles.module.css';

interface Props {
  checked: number;
  onChange: () => void;
  label: string;
}

function CustomCheckbox({ checked, onChange, label }: Props) {
  const isChecked = checked === 1;
  return (
    <label className={styles.container}>
      <input
        type="checkbox"
        checked={isChecked}
        onChange={onChange}
      />
      <span className={styles.checkmark}></span>
      <span className={styles.label}>{label}</span>
    </label>
  )
}

export default CustomCheckbox;