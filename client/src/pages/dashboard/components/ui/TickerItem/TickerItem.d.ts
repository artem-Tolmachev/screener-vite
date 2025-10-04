import { MarketData } from '@/pages/dashboard/types';
interface Props {
    symbol: string;
    src: string;
    flag: boolean;
    coinData: MarketData;
    addCoin: () => void;
    deliteCoin: () => void;
    panelIndex: number;
}
declare const TickerItem: ({ panelIndex, deliteCoin, addCoin, symbol, src, flag }: Props) => import("react/jsx-runtime").JSX.Element | undefined;
export default TickerItem;
