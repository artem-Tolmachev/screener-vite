import { useEffect, useState } from "react";
export const LOADING = 1;
export const LOADED = 2;
let itemStatusMap = {};
export const useInfiniteTickers = ({ tick }) => {
    const [items, setItems] = useState([]);
    const isItemLoaded = index => !!itemStatusMap[index];
    const fetchItems = (startIndex, stopIndex) => {
        const fetched = tick.slice(startIndex, stopIndex + 1);
        return Promise.resolve(fetched);
    };
    const loadMore = async (startIndex, stopIndex) => {
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
        loadMore(0, 9);
    }, [tick]);
    return {
        items,
        loadMore,
        isItemLoaded,
        itemStatusMap: itemStatusMap
    };
};
