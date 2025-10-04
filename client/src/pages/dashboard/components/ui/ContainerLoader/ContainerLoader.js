import { jsx as _jsx } from "react/jsx-runtime";
import TickerItem from "../TickerItem/TickerItem";
import TickerSckeleton from "../TickerSkeleton/TickerSkeleton";
import useTickerActions from '@/pages/dashboard/hooks/useTickerActions';
const ContainerLoader = ({ data, index, style }) => {
    const item = data.items[index];
    const isLoaded = data.itemStatusMap[index] === data.LOADED;
    const tickerActions = useTickerActions({ item });
    let panelIndex = data.panelIndex;
    if (!tickerActions) {
        return null;
    }
    const { exist, addCoin, deliteCoin } = tickerActions;
    return (_jsx("div", { className: 'www', style: { ...style, alignItems: 'center' }, children: isLoaded && item ? (_jsx(TickerItem, { coinData: item, symbol: item.symbol, src: item.src, flag: exist, addCoin: addCoin, deliteCoin: deliteCoin, panelIndex: panelIndex }, item.symbol)) : (_jsx(TickerSckeleton, {})) }));
};
export default ContainerLoader;
