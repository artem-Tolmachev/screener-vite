import { useMemo } from "react";
export const useTimeSortedKlines = ({ dataValume, dataKlines }) => {
    function TimeSort(array) {
        return array.sort((a, b) => a.time - b.time);
    }
    const volume = useMemo(() => TimeSort(dataValume), [dataValume]);
    const data = useMemo(() => TimeSort(dataKlines), [dataKlines]);
    return { data, volume };
};
