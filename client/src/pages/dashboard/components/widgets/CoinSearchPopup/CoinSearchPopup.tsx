import Search from '@/shared/components/Search/Search';
import styles from './styles.module.css';
import { useEffect, useState } from 'react';
import Loader from '@/pages/dashboard/components/ui/Loader/Loader';
import { MarketData } from '@/pages/dashboard/types';
import { useDebounce } from '@/pages/dashboard/hooks/useDebounce';
import { useFilter } from '@/pages/dashboard/hooks/useFilter';
import { setActivePanelIndex } from '@/pages/dashboard/coinData/slices/CoinsSlice';
import { useAppDispatch } from '@/app/store/store';

interface Props {
    tickers: MarketData[];
    panelIndex: number;
}

const CoinSearchPopup = ({ tickers, panelIndex}: Props) => {
    const [value, setValue] = useState('');
    const data = useDebounce(value, 1000)
    const filtred = useFilter(data, tickers);
    //     const panelIndex = useAppSelector(state => state.coins.panelIndex);  
// console.log(panelIndex)
    return (
        <>
            <div className={styles.header}>
                <h3 className={styles.addTitle}>Выбрать инструмент</h3>
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
                panelIndex={panelIndex}
                />
            </div>
        </>
    )
}

export default CoinSearchPopup;
