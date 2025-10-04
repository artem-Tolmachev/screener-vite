import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import DashboardTicker from '@/pages/dashboard/components/ui/DashboardTicker/DashboardTicker';
import styles from './styles.module.css';
import sharedStyles from './sharedStyles.module.css';
import { useEffect, useState } from 'react';
import { useAppSelector } from '@/app/store/store';
import { useDispatch } from 'react-redux';
import DeliteButton from '../../ui/DeliteButton/DeliteButton';
import { usePersistedInterval } from '@/pages/dashboard/hooks/usePersistedInterval';
import { addChart, delCoin, removeMarker } from '@/pages/dashboard/coinData/slices/CoinsSlice';
import useShowHide from '@/pages/dashboard/hooks/useShowHide';
const DashboardTickerOut = ({ screensDataArray, panelIndex, columns }) => {
    const panel = screensDataArray?.[panelIndex];
    const activeList = panel?.activeList;
    const dispatch = useDispatch();
    if (!activeList)
        return;
    const list = panel?.storeList?.[activeList];
    if (!list)
        return null;
    const dataItem = list.item;
    const screenId = useAppSelector(store => store.coins.mainScreen);
    const [activeSymbol, setActiveSymbol] = useState(null);
    const activedSymbol = usePersistedInterval();
    const isHovered = useShowHide(false);
    useEffect(() => {
        if (activedSymbol) {
            setActiveSymbol(activedSymbol);
        }
    }, [activedSymbol]);
    useEffect(() => {
        if (activedSymbol) {
            setActiveSymbol(activedSymbol);
        }
    }, [activedSymbol]);
    function getActiveClass(symbol) {
        setActiveSymbol(symbol === activeSymbol ? activeSymbol : symbol);
    }
    const deliteCoin = (item) => {
        dispatch(delCoin({ item, screenId, panelIndex }));
        const symbol = item.symbol;
        dispatch(removeMarker({ symbol, screenId, panelIndex }));
    };
    let _t = Date.now();
    function hendleChart(name, src, ask1Price, bid1Price) {
        dispatch(addChart({
            symbol: name,
            src: src,
            ask1Price: ask1Price,
            bid1Price: bid1Price,
            screenId: screenId,
            panelIndex: panelIndex,
            _t: _t
        }));
        getActiveClass(name);
    }
    return (_jsx("div", { className: `${styles.DashboardTickerOut} parents-block`, children: dataItem.map((ticker) => (_jsxs("div", { onMouseEnter: () => { isHovered.show(), isHovered.symbol(ticker.symbol); }, onMouseLeave: () => { isHovered.hide(), isHovered.symbol(ticker.symbol); }, className: `ticker-dashboard-aut relative flex items-center py-2 pr-5 border-b border-[var(--color-active)] border-2 border-transparent hover:bg-[var(--color-active)] cursor-pointer ${ticker.symbol === activeSymbol ? sharedStyles.active : ''}`, onClick: () => hendleChart(ticker.symbol, ticker.src, ticker.ask1Price, ticker.bid1Price), children: [_jsx(DashboardTicker, { name: ticker.symbol, price: ticker.lastPrice, turnover: ticker.volume24h, volume: ticker.turnover24h, col: columns, src: ticker.src, item: ticker, panelIndex: panelIndex }, ticker.symbol), isHovered.name === ticker.symbol && isHovered.isVisible && _jsx(DeliteButton, { onClick: () => deliteCoin(ticker) })] }, ticker.symbol))) }));
};
export default DashboardTickerOut;
