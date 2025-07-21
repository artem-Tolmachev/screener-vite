import {  useMemo } from "react"
import { Kline, Cand, UseKlinesResult } from '../types/index';

interface Props {
   dataKlines: Kline[];
   dataValume: Cand[];
}

export const useTimeSortedKlines = ({dataValume, dataKlines }: Props): UseKlinesResult => {

    function TimeSort<T extends { time: number }>(array: T[]): T[]{
        return array.sort((a, b) => a.time - b.time);
    }

    const volume = useMemo(() => TimeSort(dataValume), [dataValume]);
    const data = useMemo(() => TimeSort(dataKlines), [dataKlines]);

    return {data, volume}
}