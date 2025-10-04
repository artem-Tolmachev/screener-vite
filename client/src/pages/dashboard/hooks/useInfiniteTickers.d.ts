import { MarketData } from "../types";
export declare const LOADING = 1;
export declare const LOADED = 2;
interface Props {
    tick: MarketData[];
}
export declare const useInfiniteTickers: ({ tick }: Props) => {
    items: MarketData[];
    loadMore: (startIndex: number, stopIndex: number) => Promise<void>;
    isItemLoaded: (index: number) => boolean;
    itemStatusMap: {
        [index: number]: number;
    };
};
export {};
