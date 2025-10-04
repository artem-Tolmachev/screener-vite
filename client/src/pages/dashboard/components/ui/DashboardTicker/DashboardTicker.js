import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import styles from './styles.module.css';
import IconCoin from '@/shared/components/IconCoin/IconCoin';
import { formatNumber } from '@/pages/dashboard/utils/formatData';
import MarkerComponent from '../MarkerComponent/MarkerComponent';
import { useAppDispatch, useAppSelector } from '@/app/store/store';
import { useHendlerMarker } from '@/pages/dashboard/hooks/useHendlerMarker';
import PopupRadioButtons from '../../widgets/PopupRadioButtons/PopupRadioButtons';
import { useEffect } from 'react';
import { coinListUpdate } from '@/pages/dashboard/coinData/slices/CoinsSlice';
const DashboardTicker = ({ name, price, volume, turnover, col, src, item, panelIndex }) => {
    const screenId = useAppSelector(state => state.coins.mainScreen);
    const allScreens = useAppSelector(state => state.coins.allscreens);
    const ativeArray = allScreens.find(el => el.id === screenId);
    const index = useAppSelector(store => store.coins.panelIndex);
    if (!ativeArray)
        return;
    const activeMarkerArray = ativeArray.screens[panelIndex];
    let marker = activeMarkerArray?.markers[name] || '';
    const { markerSettings, isValue, justAddedMarker, setSetVel } = useHendlerMarker();
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(coinListUpdate({ marker, item, index, screenId }));
    }, [marker]);
    return (_jsxs("div", { className: "ticker flex w-full relative items-center", children: [_jsx(MarkerComponent, { panelIndex: panelIndex, marker: marker, symbol: name, markerSettings: markerSettings }), isValue && justAddedMarker && (_jsx(PopupRadioButtons, { currentMarker: marker, coin: name, isOpen: isValue, isClose: setSetVel })), _jsx("div", { className: "w-[160px] flex items-center overflow-hidden", children: _jsx(IconCoin, { panelIndex: panelIndex, src: src, symbol: name }) }), col.find(c => c.key === 'price')?.visible === 1
                && _jsx("div", { className: "w-[100px] text-right", children: _jsx("div", { className: styles.price, children: formatNumber(price) }) }), col.find(c => c.key === 'turnover')?.visible === 1
                && _jsx("div", { className: "w-[100px] text-right", children: _jsx("div", { className: styles.turnover, children: formatNumber(turnover) }) }), col.find(c => c.key === 'volume')?.visible === 1
                && _jsx("div", { className: "w-[100px] text-right", children: _jsx("div", { className: styles.volume, children: formatNumber(volume) }) })] }));
};
export default DashboardTicker;
