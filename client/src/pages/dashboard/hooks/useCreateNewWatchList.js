import { useAppDispatch, useAppSelector } from "@/app/store/store";
import { createNewList } from "../coinData/slices/CoinsSlice";
export default function useCreateNewWatchList(listName, setListname, panelIndex) {
    const dispatch = useAppDispatch();
    const screenId = useAppSelector(store => store.coins.mainScreen);
    const addListToStore = () => {
        if (!listName.trim())
            return;
        dispatch(createNewList({ listName, screenId, panelIndex }));
        setListname('');
    };
    return addListToStore;
}
