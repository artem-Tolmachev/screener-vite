import { useEffect, useState } from 'react';
import styles from './styles.module.css';
import { useAppDispatch } from '@/app/store/store';
import { changeInterval } from '@/pages/dashboard/coinData/slices/CoinsSlice';
import { usePersistedInterval } from '@/pages/dashboard/hooks/usePersistedInterval';

export default function DashboardPageHeader() {
  const interval = usePersistedInterval('interval');
  const [activeInterval, setActiveInterval] = useState<string | null>('60');
 
  useEffect(() => {
  if (interval) {
    setActiveInterval(interval);
  }
}, [interval]);

  const dispatch = useAppDispatch()
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {

  const value = event.currentTarget.getAttribute('data-interval');
    if (value) {
      dispatch(changeInterval({ interval: value }))
      setActiveInterval(value);
    }
  };

  return (
    <div className={styles.header}>
      <div className={styles.buttons}>
        {['60', '30', '15', '5'].map((interval) => (
          <button
            key={interval}
            data-interval={interval}
            className={`${styles.btn} ${activeInterval === interval ? styles.active : ''}`}
            onClick={handleClick}
          >
            {interval}
          </button>
        ))}
      </div>
    </div>
  );
}