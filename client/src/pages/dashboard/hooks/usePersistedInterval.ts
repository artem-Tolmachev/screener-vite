import { useEffect, useState } from "react"

export const usePersistedInterval = (item: string) => {
    const [PersistedItem, setPersistedItem] = useState();

      useEffect(() => {
        const rawFromLocalStorage = localStorage.getItem('persist:root');
    
        if (rawFromLocalStorage) {
          try {
            const parsedRoot = JSON.parse(rawFromLocalStorage);
            const coinsString = parsedRoot.coins;
            const coinsData = JSON.parse(coinsString);
            setPersistedItem(coinsData.chartSettings[item]);
          } catch (e) {
            console.error('Ошибка при парсинге localStorage:', e);
          }
        }
      }, []);
      
    return PersistedItem;
}