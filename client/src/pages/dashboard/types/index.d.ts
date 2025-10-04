import { CandlestickData, CandlestickSeriesOptions, ISeriesApi, Time, UTCTimestamp, WhitespaceData } from 'lightweight-charts';
import { chartSettings, DefaultCoin } from '../coinData/constants/defaultSettings';
import { tickerParser } from '../utils/Parser';
export interface CoinsData {
    ask1Price: string;
    ask1Size: string;
    basis: string;
    basisRate: string;
    bid1Price: string;
    bid1Size: string;
    curPreListingPhase: string;
    deliveryFeeRate: string;
    deliveryTime: string;
    fundingRate: string;
    highPrice24h: string;
    indexPrice: string;
    lastPrice: number;
    lowPrice24h: string;
    markPrice: string;
    nextFundingTime: string;
    openInterest: string;
    openInterestValue: string;
    preOpenPrice: string;
    preQty: string;
    predictedDeliveryPrice: string;
    prevPrice1h: string;
    prevPrice24h: string;
    price24hPcnt: string;
    symbol: string;
    turnover24h: number;
    volume24h: number;
    src: string;
    marker: string;
}
export declare enum LineType {
    HORIZONTAL_RAY = "horizontal-ray",
    HORIZONTAL_LINE = "horizontal-line",
    TREND = "trendline",
    NONE = "none"
}
export type FlagIsLine = {
    isLineHrz: boolean;
    isLineTrend: boolean;
    isRay: boolean;
};
export type MarketData = Pick<CoinsData, "turnover24h" | "volume24h" | "symbol" | "lastPrice" | "ask1Price" | "basis" | "basisRate" | "bid1Price" | "src" | "marker">;
export interface LineData {
    price: number;
    timestamp: UTCTimestamp;
    name: "HorizontalRay";
    id: string;
}
export interface HrzLineData {
    price: number;
    timestamp: UTCTimestamp;
    name: "HorizontalLine";
    id: string;
}
export interface TrendPoint {
    price: number;
    timestamp: UTCTimestamp;
}
export interface TrendLine {
    points: TrendPoint[];
    name: "TrendLine";
    id: string;
}
export type AnyLine = LineData | TrendLine | HrzLineData;
export interface MarketDataWithLines extends MarketData {
    lines?: AnyLine[];
}
export type TickerProps = {
    key: string;
    name: string;
    price: number;
    turnover: number;
    volume: number;
};
export type InitiaLChartSettings = {
    interval: string | undefined;
    symbol: string;
    limit: string;
    category: string;
};
export type Kline = {
    time: UTCTimestamp;
    open: number;
    high: number;
    low: number;
    close: number;
};
export type Cand = {
    time: UTCTimestamp;
    value: number;
    color: string;
};
export type UseKlinesResult = {
    data: Kline[];
    volume: Cand[];
};
export type KlineTuple = [number | string, number | string, number | string, number | string, number | string];
export type KlineTupleValume = [
    number | string,
    number | string,
    any,
    any,
    number | string,
    any,
    number | string
];
export interface IDashboardHeaderItems {
    key: string;
    name: string;
    visible: number;
}
export type Candlestick = ISeriesApi<"Candlestick", Time, CandlestickData<Time> | WhitespaceData<Time>, CandlestickSeriesOptions> | null;
export type BackendResponse = {
    tickers: CoinsData[];
    btcData: CoinsData;
};
export interface OriginalResponse {
    tickers: ReturnType<typeof tickerParser>;
    btcUsdt: DefaultCoin;
}
type HeatMapEntry = {
    price: number;
    volume: number;
    from: number;
    to?: number;
    side: 'bids' | 'asks';
};
export type HeatMapData = {
    [symbol: string]: HeatMapEntry[];
};
export interface FullTickerProps extends TickerProps {
    col: IDashboardHeaderItems[];
    src: string;
    item: MarketData;
    panelIndex: number;
}
interface itemList {
    item: MarketDataWithLines[];
    color: string;
    colorName: string;
}
export type NamedMarketDataLists = {
    [listName: string]: itemList;
};
export interface Layout {
    rows: number;
    col: number;
    side: 'right' | 'left' | 'top' | 'bottom' | '';
}
export interface OptionsScreen {
    greed: number;
    screens: number;
    direction: 'horizontal' | 'vertical';
    layout: Layout;
}
export interface AllDataCoin {
    chartSettings: chartSettings;
    CoinData: DefaultCoin & {
        src: string;
        symbol: string;
        lines: AnyLine[];
    };
    isLogo: boolean;
    storeList: NamedMarketDataLists;
    activeList: string;
    markers: Record<string, string>;
    isActive: boolean;
}
export {};
