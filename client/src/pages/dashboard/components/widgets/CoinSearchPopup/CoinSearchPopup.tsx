import Search from '@/shared/components/Search/Search';
import styles from './styles.module.css';
import { useState } from 'react';
import Loader from '@/pages/dashboard/components/ui/Loader/Loader';
import { MarketData } from '@/pages/dashboard/types';
import { useDebounce } from '@/pages/dashboard/hooks/useDebounce';
import { useFilter } from '@/pages/dashboard/hooks/useFilter';

interface Props {
    tickers: MarketData[];
    onToggleModal: (arg: boolean) => void;
}

const CoinSearchPopup = ({ tickers, onToggleModal}: Props) => {
    const [value, setValue] = useState('');
    const data = useDebounce(value, 1000)
    const filtred = useFilter(data, tickers);
 
    return (
        <>
            <div className={styles.header}>
                <h3 className={styles.addTitle}>Выбрать инструмент</h3>
                <div className={styles.close} onClick={() => onToggleModal(false)}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18" strokeWidth="18" height="18"><path stroke="currentColor" strokeWidth="1.2" d="m1.5 1.5 15 15m0-15-15 15"></path></svg>
                </div>
            </div>
            <div className={styles.addWrapper}>
                <Search onChange={setValue} value={value} />
                <div className={styles.buttons}>
                    <button className={`${styles.btn} ${styles.btn_active}`}>Все</button>
                    <button className={styles.btn}>Акции</button>
                    <button className={styles.btn}>Фонды</button>
                    <button className={styles.btn}>Фьючерсы</button>
                </div>
                <Loader 
                tick={filtred}
                closeAddModal={onToggleModal}
                />
            </div>
        </>
    )
}

export default CoinSearchPopup;
