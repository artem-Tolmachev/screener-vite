import styles from './styles.module.css';

const TickerSckeleton = () => {
    return (
        <li className={styles.item}>
            <div className={styles.icon}></div>
            <div className={styles.text}></div>
        </li>
    )
}

export default TickerSckeleton;