import styles from './styles.module.css';
import IconCoin from '@/shared/components/IconCoin/IconCoin';
import { FullTickerProps } from '@/pages/dashboard/types';
import { formatNumber } from '@/pages/dashboard/utils/formatData';
import MarkerComponent from '../MarkerComponent/MarkerComponent';
import { useAppDispatch, useAppSelector } from '@/app/store/store';
import { useHendlerMarker } from '@/pages/dashboard/hooks/useHendlerMarker';
import PopupRadioButtons from '../../widgets/PopupRadioButtons/PopupRadioButtons';
import { useEffect } from 'react';
import { coinListUpdate} from '@/pages/dashboard/coinData/slices/CoinsSlice';

const DashboardTicker = ({ 
    name, price, 
    volume, turnover, 
    col, src, item, panelIndex
}: FullTickerProps) => {
    const screenId = useAppSelector(state => state.coins.mainScreen);
    const allScreens = useAppSelector(state => state.coins.allscreens);
    const ativeArray = allScreens.find(el => el.id === screenId);
    const index = useAppSelector(store => store.coins.panelIndex);

    if(!ativeArray) return;
    const activeMarkerArray = ativeArray.screens[panelIndex];
    // const activeMarkerArray = ativeArray.screens.find(item => item.isActive === true)
    let marker = activeMarkerArray?.markers[name] || ''

    const {markerSettings, isValue, justAddedMarker, setSetVel} = useHendlerMarker();
    const dispatch = useAppDispatch();

    useEffect(() => {
       dispatch(coinListUpdate({marker, item, index, screenId}))
    },[marker])

    return (
        <div 
            className="ticker flex w-full relative items-center">
            <MarkerComponent panelIndex={panelIndex} marker={marker} symbol={name} markerSettings={markerSettings}/>
            {isValue && justAddedMarker && (<PopupRadioButtons currentMarker={marker} coin={name} isOpen={isValue} isClose={setSetVel}/>)}
            {<div className="w-[160px] flex items-center overflow-hidden">
                 <IconCoin panelIndex={panelIndex} src={src} symbol={name} />
            </div>}
            {col.find(c => c.key === 'price')?.visible === 1
                && <div className="w-[100px] text-right">
                    <div className={styles.price}>{formatNumber(price)}</div>
                </div>}
            {col.find(c => c.key === 'turnover')?.visible === 1
                && <div className="w-[100px] text-right">
                    <div className={styles.turnover}>{formatNumber(turnover)}</div>
                </div>}
            {col.find(c => c.key === 'volume')?.visible === 1
                && <div className="w-[100px] text-right">
                    <div className={styles.volume}>{formatNumber(volume)}</div>
                </div>}
        </div>
    )
}
export default DashboardTicker;