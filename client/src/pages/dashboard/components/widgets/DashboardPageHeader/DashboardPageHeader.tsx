import styles from './styles.module.css';
import { useAppDispatch, useAppSelector } from '@/app/store/store';
import { changeInterval, setuFullscreen, addLineFlag } from '@/pages/dashboard/coinData/slices/CoinsSlice';
import { Tooltip } from 'react-tooltip';

import { DropDownOfHeadesToolbar } from '@/shared/components/DropdownMenu/DropDownOfHeadesToolbar';
import { Button } from '@/components/ui/button';

export default function DashboardPageHeader() {
  const screenId = useAppSelector(store => store.coins.mainScreen);
  const panelIndex = useAppSelector(store => store.coins.panelIndex);
  const allScreens = useAppSelector(state => state.coins.allscreens);
  const dispatch = useAppDispatch();
  const isHrzLine = useAppSelector(state => state.coins.flagLine);
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
          <svg style={{height: '36px', width: '36px'}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 28" width="28" height="28"><path fill="currentColor" d="M8.5 6A2.5 2.5 0 0 0 6 8.5V11h1V8.5C7 7.67 7.67 7 8.5 7H11V6H8.5zM6 17v2.5A2.5 2.5 0 0 0 8.5 22H11v-1H8.5A1.5 1.5 0 0 1 7 19.5V17H6zM19.5 7H17V6h2.5A2.5 2.5 0 0 1 22 8.5V11h-1V8.5c0-.83-.67-1.5-1.5-1.5zM22 19.5V17h-1v2.5c0 .83-.67 1.5-1.5 1.5H17v1h2.5a2.5 2.5 0 0 0 2.5-2.5z"></path>
          </svg> 
        </Button>
      </div>
      <div className='toolBar'>
        <DropDownOfHeadesToolbar/>
      </div>
      <button 
        onClick={() => dispatch(addLineFlag(true))}
        data-tooltip-id="tooltip-hrz-line"
        data-tooltip-content="Горизонтальный луч"
        className={`cursor-pointer rounded-[4px] ml-2 p-0 text-[rgba(245,166,35,1)] hover:bg-gray-800 ${isHrzLine && 'bg-gray-800'}`}
        >
          <svg  style={{height: '36px', width: '36px'}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 28" width="30" height="30"><g fill="currentColor" fill-rule="nonzero"><path d="M8.5 15h16.5v-1h-16.5z"></path><path d="M6.5 16c.828 0 1.5-.672 1.5-1.5s-.672-1.5-1.5-1.5-1.5.672-1.5 1.5.672 1.5 1.5 1.5zm0 1c-1.381 0-2.5-1.119-2.5-2.5s1.119-2.5 2.5-2.5 2.5 1.119 2.5 2.5-1.119 2.5-2.5 2.5z"></path></g></svg>
      </button>
      <Tooltip 
        id="tooltip-hrz-line" 
        variant="light"
        place='bottom-end'
        className='z-1000'
        style={{ fontSize: '18px' }}
      />
    </div>
  );
}
