import { useEffect, useState } from "react";
export const usePersistedInterval = () => {
    const [PersistedItem, _] = useState();
    useEffect(() => {
        const rawFromLocalStorage = localStorage.getItem('persist:root');
        if (rawFromLocalStorage) {
            try {
            }
            catch (e) {
                console.error('Ошибка при парсинге localStorage:', e);
            }
        }
    }, []);
    return PersistedItem;
};
