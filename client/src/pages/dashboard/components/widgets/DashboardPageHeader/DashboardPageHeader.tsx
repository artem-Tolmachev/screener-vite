import styles from './styles.module.css';
import { useAppDispatch, useAppSelector } from '@/app/store/store';
import { changeInterval, setuFullscreen } from '@/pages/dashboard/coinData/slices/CoinsSlice';

import { DropDownOfHeadesToolbar } from '@/shared/components/DropdownMenu/DropDownOfHeadesToolbar';
import { Button } from '@/components/ui/button';

export default function DashboardPageHeader() {
  const screenId = useAppSelector(store => store.coins.mainScreen);
  const panelIndex = useAppSelector(store => store.coins.panelIndex);
  const allScreens = useAppSelector(state => state.coins.allscreens);
  const dispatch = useAppDispatch();

  const activeScreen = allScreens.find(el => el.id === screenId);
  const activeArray = activeScreen?.screens?.[panelIndex];
  const chartSettings = activeArray?.chartSettings;
  const isInterval = chartSettings?.interval;
  
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const value = event.currentTarget.getAttribute('data-interval');
    if (value) {
      dispatch(changeInterval({ interval: value, screenId, panelIndex }))
    }
  };
  
  function fullscreen(){
    dispatch(setuFullscreen(panelIndex))
  }

  if (!activeScreen || !activeArray || !chartSettings) {
    return <div className={styles.header}>Нет данных для отображения</div>;
  }

  return (
    <div className={styles.header}>
      <div className={styles.buttons}>
        {['60', '30', '15', '5'].map((interval) => (
          <Button
            key={interval}
            data-interval={interval}
            className={`${styles.btn} ${isInterval === interval ? styles.active : ''}`}
            onClick={handleClick}
            variant="outline"
          >
            {interval}
          </Button>
        ))}
        <div className='h-full flex items-center justify-center px-[20px] py-[5px] border-1 border-fuchsia-700 text-fuchsia-700'>
          <div className='mr-2'>Экран</div>
          <span>{panelIndex}</span>
        </div>
        <Button 
          className='cursor-pointer text-[18px] text-cyan-800 hover:text-cyan-400'
          onClick={fullscreen}
          variant="outline"
        >
          Полноэкранный режим
          <svg style={{height: '36px', width: '36px'}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 28" width="28" height="28"><path fill="currentColor" d="M8.5 6A2.5 2.5 0 0 0 6 8.5V11h1V8.5C7 7.67 7.67 7 8.5 7H11V6H8.5zM6 17v2.5A2.5 2.5 0 0 0 8.5 22H11v-1H8.5A1.5 1.5 0 0 1 7 19.5V17H6zM19.5 7H17V6h2.5A2.5 2.5 0 0 1 22 8.5V11h-1V8.5c0-.83-.67-1.5-1.5-1.5zM22 19.5V17h-1v2.5c0 .83-.67 1.5-1.5 1.5H17v1h2.5a2.5 2.5 0 0 0 2.5-2.5z"></path></svg> 
        </Button>
      </div>
      <div className='toolBar'>
        <DropDownOfHeadesToolbar/>
      </div>
    </div>
  );
}
