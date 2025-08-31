import styles from './styles.module.css';

interface Props {
    onChange: (value: string) => void;
    value: string;
} 

const Search = ({onChange, value}: Props) => {
    return(
        <label htmlFor="input" className={styles.label}>
            <span className={styles.icon}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 28" width="28" height="28" fill="none"><path stroke="currentColor" d="M17.4 17.5a7 7 0 1 0-4.9 2c1.9 0 3.64-.76 4.9-2zm0 0l5.1 5"></path></svg>
            </span>
        <input type="text" 
        id='input'
            className={styles.input}
            value={value}
            onChange={(e) => onChange(e.target.value)}
        />
        </label>
    )
}

export default Search;