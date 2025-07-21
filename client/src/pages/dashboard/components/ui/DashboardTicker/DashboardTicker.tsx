import styles from './styles.module.css';
import IconCoin from '@/shared/components/IconCoin/IconCoin';
import { FullTickerProps } from '@/pages/dashboard/types';
import { formatNumber } from '@/pages/dashboard/utils/formatData';
import MarkerComponent from '../MarkerComponent/MarkerComponent';
import { useAppDispatch, useAppSelector } from '@/app/store/store';
import { useHendlerMarker } from '@/pages/dashboard/hooks/useHendlerMarker';
import PopupRadioButtons from '../../widgets/PopupRadioButtons/PopupRadioButtons';
import { useEffect } from 'react';
import { coinListUpdate } from '@/pages/dashboard/coinData/slices/CoinsSlice';

const DashboardTicker = ({ 
    name, price, 
    volume, turnover, 
    col, src, item
}: FullTickerProps) => {
    const marker = useAppSelector(state => state.coins.markers[name] || '');
    const {markerSettings, isValue, justAddedMarker, setSetVel} = useHendlerMarker();
    const dispatch = useAppDispatch();

    useEffect(() => {
       dispatch(coinListUpdate({marker, item}))
    },[marker])

    return (
        <div 
            className="ticker flex w-full relative items-center" >
            <MarkerComponent flag='dashboard' item={item} marker={marker} symbol={name} markerSettings={markerSettings}/>
            {isValue && justAddedMarker && (<PopupRadioButtons currentMarker={marker} coin={name} isOpen={isValue} isClose={setSetVel}/>)}
            {<div className="w-[160px] flex items-center overflow-hidden">
                 <IconCoin src={src} symbol={name} />
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