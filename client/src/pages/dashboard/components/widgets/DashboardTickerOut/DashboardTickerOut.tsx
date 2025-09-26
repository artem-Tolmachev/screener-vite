import DashboardTicker from '@/pages/dashboard/components/ui/DashboardTicker/DashboardTicker';
import styles from './styles.module.css';
import sharedStyles from './sharedStyles.module.css';
import { useEffect, useState } from 'react';
import { useAppSelector } from '@/app/store/store';
import { useDispatch } from 'react-redux';
import DeliteButton from '../../ui/DeliteButton/DeliteButton';
import { usePersistedInterval } from '@/pages/dashboard/hooks/usePersistedInterval';
import { AllDataCoin, IDashboardHeaderItems, MarketData } from '@/pages/dashboard/types';
import { addChart, defaultLoading, delCoin, removeMarker } from '@/pages/dashboard/coinData/slices/CoinsSlice';
import useShowHide from '@/pages/dashboard/hooks/useShowHide';
import { screenData } from '@/pages/dashboard/coinData/constants/screenData';
import { DefaultCoin } from '@/pages/dashboard/coinData/constants/defaultSettings';

interface Props {
    columns: IDashboardHeaderItems[];
    isActive: boolean;
    panelIndex: number;
    screensDataArray: AllDataCoin[] | undefined;
    btsUsdt: DefaultCoin ;
}

const DashboardTickerOut = ({screensDataArray, panelIndex, columns, btsUsdt}: Props) => {
    const panel = screensDataArray?.[panelIndex];
    const activeList = panel?.activeList;
    // const defaultItem = screenData.CoinData
    const dispatch = useDispatch();
    if(!activeList) return
    const list = panel?.storeList?.[activeList];
   
    if (!list) return null;
    const dataItem = list.item;
    const screenId = useAppSelector(store => store.coins.mainScreen);
    const [activeSymbol, setActiveSymbol] = useState<string | null>(null);
    const activedSymbol = usePersistedInterval();
    const isHovered = useShowHide(false);

    useEffect(() => {
        if (activedSymbol) { 
            setActiveSymbol(activedSymbol)
        }
    }, [activedSymbol])

    useEffect(() => {
        if (activedSymbol) {
            setActiveSymbol(activedSymbol)
        }
    }, [activedSymbol])

    function getActiveClass(symbol: string) {
        setActiveSymbol(symbol === activeSymbol ? activeSymbol : symbol);
    }

    const deliteCoin = (item: MarketData) => {
        dispatch(delCoin({item, screenId, panelIndex, btsUsdt}));
        const symbol = item.symbol;
        dispatch(removeMarker({symbol, screenId, panelIndex}));
    }

    let _t = Date.now();
    function hendleChart(name: string, src: string, ask1Price: string, bid1Price: string) {
        dispatch(addChart({
            symbol: name,
            src: src,
            ask1Price: ask1Price,
            bid1Price: bid1Price,
            screenId: screenId,
            panelIndex: panelIndex,
            _t: _t
        }))
        getActiveClass(name)
    }

    return (
        <div className={`${styles.DashboardTickerOut} parents-block`}>
            {
                dataItem.map((ticker) => (
                    <div
                        onMouseEnter={() => {isHovered.show(), isHovered.symbol(ticker.symbol)}}
                        onMouseLeave={() => {isHovered.hide(), isHovered.symbol(ticker.symbol)}}
                        key={ticker.symbol}
                        className={`ticker-dashboard-aut relative flex items-center py-2 pr-5 border-b border-[var(--color-active)] border-2 border-transparent hover:bg-[var(--color-active)] cursor-pointer ${ticker.symbol === activeSymbol ? sharedStyles.active : ''}`}
                        onClick={() => hendleChart(ticker.symbol, ticker.src, ticker.ask1Price, ticker.bid1Price)}
                    >
                        <DashboardTicker
                            key={ticker.symbol}
                            name={ticker.symbol}
                            price={ticker.lastPrice}
                            turnover={ticker.volume24h}
                            volume={ticker.turnover24h}
                            col={columns}
                            src={ticker.src}
                            item={ticker}
                            panelIndex={panelIndex}
                        />
                        {isHovered.name === ticker.symbol && isHovered.isVisible && <DeliteButton onClick={() => deliteCoin(ticker)}/>}
                    </div>
                    )
                )
            }
        </div>
    )
}
export default DashboardTickerOut;
