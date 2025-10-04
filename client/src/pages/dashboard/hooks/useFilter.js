import { useMemo } from 'react';
export function useFilter(filter, data) {
    return useMemo(() => {
        const normalized = filter.trim().toLowerCase();
        if (!normalized)
            return data;
        return data.filter((item) => item.symbol.toLowerCase().includes(normalized));
    }, [filter, data]);
}
