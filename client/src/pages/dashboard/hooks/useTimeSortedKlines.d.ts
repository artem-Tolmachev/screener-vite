import { Kline, Cand, UseKlinesResult } from '../types/index';
interface Props {
    dataKlines: Kline[];
    dataValume: Cand[];
}
export declare const useTimeSortedKlines: ({ dataValume, dataKlines }: Props) => UseKlinesResult;
export {};
