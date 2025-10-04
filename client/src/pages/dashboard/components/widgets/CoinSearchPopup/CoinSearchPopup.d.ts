import { MarketData } from '@/pages/dashboard/types';
interface Props {
    tickers: MarketData[];
    panelIndex: number;
}
declare const CoinSearchPopup: ({ tickers, panelIndex }: Props) => import("react/jsx-runtime").JSX.Element;
export default CoinSearchPopup;
