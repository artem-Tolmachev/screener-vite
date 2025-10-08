import styles from './styles.module.css';
import { useAppDispatch, useAppSelector } from '@/app/store/store';
import { changeInterval, setuFullscreen, addLineFlag } from '@/pages/dashboard/coinData/slices/CoinsSlice';
import { Tooltip } from 'react-tooltip';

import { DropDownOfHeadesToolbar } from '@/shared/components/DropdownMenu/DropDownOfHeadesToolbar';
import { Button } from '@/components/ui/button';
import { LineType } from '@/pages/dashboard/types';
import { DialogRegister } from '@/shared/components/Dialog/DiologRegister';
import { DialogLogin } from '@/shared/components/Dialog/DiologLogIn';
import { SheetAccount } from '@/shared/components/Sheet/SheetAccount';

export default function DashboardPageHeader() {
  const screenId = useAppSelector(store => store.coins.mainScreen);
  const panelIndex = useAppSelector(store => store.coins.panelIndex);
  const allScreens = useAppSelector(state => state.coins.allscreens);
  const dispatch = useAppDispatch();
  const isLine = useAppSelector(state => state.coins.flagLine);
  const activeScreen = allScreens.find(el => el.id === screenId);
  const activeArray = activeScreen?.screens?.[panelIndex];
  const chartSettings = activeArray?.chartSettings;
  const isInterval = chartSettings?.interval;
  const dataUser = useAppSelector(store => store.user);
  if(!dataUser) return;
  
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
    <div className="h-[10%] justify-between flex items-center text-[var(--color-text-primary)] w-full bg-[var(--color-bg-panel)] ">
      <div className='flex gap-6'>
        <div className="flex gap-1">
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
        </div>

        <div className='h-full flex items-center justify-center px-[20px] py-[5px] border-1 border-fuchsia-700 text-fuchsia-700'>
          <div className='mr-2'>Экран</div>
          <span>{panelIndex}</span>
        </div>

        <div>
          <Button 
            className='cursor-pointer text-[18px] text-cyan-800 hover:text-cyan-400'
            onClick={fullscreen}
            variant="outline"
            data-tooltip-id="tooltip-screen-full"
            data-tooltip-content="Полноэкранный режим"
          >
            <svg style={{height: '36px', width: '36px'}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 28" width="28" height="28"><path fill="currentColor" d="M8.5 6A2.5 2.5 0 0 0 6 8.5V11h1V8.5C7 7.67 7.67 7 8.5 7H11V6H8.5zM6 17v2.5A2.5 2.5 0 0 0 8.5 22H11v-1H8.5A1.5 1.5 0 0 1 7 19.5V17H6zM19.5 7H17V6h2.5A2.5 2.5 0 0 1 22 8.5V11h-1V8.5c0-.83-.67-1.5-1.5-1.5zM22 19.5V17h-1v2.5c0 .83-.67 1.5-1.5 1.5H17v1h2.5a2.5 2.5 0 0 0 2.5-2.5z"></path>
            </svg> 
          </Button>
        </div>

        <div className='toolBar'>
          <DropDownOfHeadesToolbar/>
        </div>

        <div className='flex gap-1'>
          <Button 
            onClick={() => dispatch(addLineFlag(LineType.HORIZONTAL_RAY))}
            data-tooltip-id="tooltip-hrz-ray"
            data-tooltip-content="Горизонтальный луч"
            className={`cursor-pointer rounded-[4px] text-blue-900 border-1 border-blue-900 hover:border-blue-600 hover:text-blue-600 ${isLine.isRay && 'text-blue-600 border-1 border-blue-600' }`}
            >
              <svg  style={{height: '36px', width: '36px'}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 28" width="30" height="30"><g fill="currentColor" fillRule="nonzero"><path d="M8.5 15h16.5v-1h-16.5z"></path><path d="M6.5 16c.828 0 1.5-.672 1.5-1.5s-.672-1.5-1.5-1.5-1.5.672-1.5 1.5.672 1.5 1.5 1.5zm0 1c-1.381 0-2.5-1.119-2.5-2.5s1.119-2.5 2.5-2.5 2.5 1.119 2.5 2.5-1.119 2.5-2.5 2.5z"></path></g></svg>
          </Button>

          <Button 
          onClick={() => dispatch(addLineFlag(LineType.TREND))}
            className={`cursor-pointer rounded-[4px] text-blue-900 border-1 border-blue-900 hover:border-blue-600 hover:text-blue-600 ${isLine.isLineTrend && 'text-blue-600 border-1 border-blue-600' }`}
            data-tooltip-id="tooltip-trend-line"
            data-tooltip-content="Линия Теренда"
          >
            <svg style={{height: '36px', width: '36px'}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 28" width="28" height="28"><g fill="currentColor" fill-rule="nonzero"><path d="M7.354 21.354l14-14-.707-.707-14 14z"></path><path d="M22.5 7c.828 0 1.5-.672 1.5-1.5s-.672-1.5-1.5-1.5-1.5.672-1.5 1.5.672 1.5 1.5 1.5zm0 1c-1.381 0-2.5-1.119-2.5-2.5s1.119-2.5 2.5-2.5 2.5 1.119 2.5 2.5-1.119 2.5-2.5 2.5zM5.5 24c.828 0 1.5-.672 1.5-1.5s-.672-1.5-1.5-1.5-1.5.672-1.5 1.5.672 1.5 1.5 1.5zm0 1c-1.381 0-2.5-1.119-2.5-2.5s1.119-2.5 2.5-2.5 2.5 1.119 2.5 2.5-1.119 2.5-2.5 2.5z"></path></g></svg>
          </Button>

          <Button 
            onClick={() => dispatch(addLineFlag(LineType.HORIZONTAL_LINE))}
            data-tooltip-id="tooltip-hrz-line"
            data-tooltip-content="Горизонтальная линия"
            className={`cursor-pointer rounded-[4px] text-blue-900 border-1 border-blue-900 hover:border-blue-600 hover:text-blue-600 ${isLine.isLineHrz && 'text-blue-600 border-1 border-blue-600' }`}
            >
            <svg style={{height: '36px', width: '36px'}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 28" width="28" height="28"><g fill="currentColor" fill-rule="nonzero"><path d="M4 15h8.5v-1h-8.5zM16.5 15h8.5v-1h-8.5z"></path><path d="M14.5 16c.828 0 1.5-.672 1.5-1.5s-.672-1.5-1.5-1.5-1.5.672-1.5 1.5.672 1.5 1.5 1.5zm0 1c-1.381 0-2.5-1.119-2.5-2.5s1.119-2.5 2.5-2.5 2.5 1.119 2.5 2.5-1.119 2.5-2.5 2.5z"></path></g></svg>
          </Button>
        </div>
      </div>

      <div className='pr-4'>
        {!dataUser.success ? <div className='flex gap-2'>
          <DialogLogin/>
          <DialogRegister/>
        </div> : <SheetAccount data={dataUser}/>}
      </div>
      <Tooltip 
        id="tooltip-hrz-ray" 
        variant="light"
        place='bottom-end'
        className='z-1000'
        style={{ fontSize: '18px' }}
      />
      <Tooltip 
        id="tooltip-trend-line" 
        variant="light"
        place='bottom-end'
        className='z-1000'
        style={{ fontSize: '18px' }}
      />
      <Tooltip 
        id="tooltip-hrz-line" 
        variant="light"
        place='bottom-end'
        className='z-1000'
        style={{ fontSize: '18px' }}
      />
      <Tooltip 
        id="tooltip-screen-full" 
        variant="light"
        place='bottom-end'
        className='z-1000'
        style={{ fontSize: '18px' }}
      />
    </div>
  );
}
