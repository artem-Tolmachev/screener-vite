import { useEffect, useState } from "react"
import { MarketData } from "../types";

export const LOADING = 1;
export const LOADED = 2;
let itemStatusMap: { [index: number]: number } = {};

interface Props { tick: MarketData[];}

export const useInfiniteTickers = ({tick}: Props) => {
    const [items, setItems] = useState<MarketData[]>([]);

    const isItemLoaded: (index: number) => boolean = index => !!itemStatusMap[index];

    const fetchItems = (startIndex: number, stopIndex: number) => {
    const fetched = tick.slice(startIndex, stopIndex + 1);
    return Promise.resolve(fetched);
    };
    
      const loadMore = async (startIndex: number, stopIndex: number) => {
        const newItems = await fetchItems(startIndex, stopIndex);
        setItems(prev => {
          const updated = [...prev];
          for (let i = 0; i < newItems.length; i++) {
            updated[startIndex + i] = newItems[i];
            itemStatusMap[startIndex + i] = LOADED;
            
          }      
          return updated;
        });
      };
    
      useEffect(() => {
         itemStatusMap = {}; 
         loadMore(0, 9)
      },[tick])
    
    return {
    items,
    loadMore,
    isItemLoaded,
    itemStatusMap: itemStatusMap
  };
}