import { useMemo } from 'react';
import { MarketData } from '../types';

export function useFilter(filter: string, data: MarketData[]): MarketData[] {
    return useMemo(() => {
      const normalized = filter.trim().toLowerCase();
      if (!normalized) return data;
      return data.filter((item) =>
        item.symbol.toLowerCase().includes(normalized)
      );
    }, [filter, data]);
}
 