import { KlineTuple, KlineTupleValume, MarketData } from '../types/index';
import { UTCTimestamp } from 'lightweight-charts';
import { DefaultCoin } from '../coinData/constants/defaultSettings';
export declare const dataKlinesParser: (list: KlineTuple[]) => {
    time: UTCTimestamp;
    open: number;
    high: number;
    low: number;
    close: number;
}[];
export declare const dataValumeParser: (list: KlineTupleValume[]) => {
    time: UTCTimestamp;
    value: number;
    color: string;
}[];
export declare const tickerParser: (list: MarketData[]) => {
    turnover24h: number;
    volume24h: number;
    symbol: string;
    lastPrice: number;
    src: string;
    ask1Price: string;
    basis: string;
    basisRate: string;
    bid1Price: string;
    marker: string;
}[];
export declare const defaultCoinParser: ({ ask1Price, bid1Price }: DefaultCoin) => {
    ask1Price: string;
    bid1Price: string;
};
