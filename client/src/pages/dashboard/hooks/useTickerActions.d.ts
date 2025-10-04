import { MarketData } from "../types";
interface Props {
    item: MarketData;
}
export default function useTickerActions({ item }: Props): {
    exist: boolean;
    addCoin: () => void;
    deliteCoin: () => void;
} | undefined;
export {};
