import { Candlestick } from '../types';
export interface BybitKline {
    start: string;
    end: string;
    interval: string;
    open: string;
    high: string;
    low: string;
    close: string;
    volume: string;
    turnover: string;
    confirm: boolean;
    timestamp: string;
}
interface Props {
    candlestickSeriesRef: React.RefObject<Candlestick>;
    panelIndex: number;
}
export declare const useRialTimeKlines: ({ candlestickSeriesRef, panelIndex }: Props) => void;
export {};
