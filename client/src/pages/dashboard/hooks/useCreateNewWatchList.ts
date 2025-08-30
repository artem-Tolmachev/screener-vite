import { useAppDispatch, useAppSelector } from "@/app/store/store";
import { createNewList } from "../coinData/slices/CoinsSlice";

export default function useCreateNewWatchList(listName: string, setListname: (value: string) => void, panelIndex: number){
    const dispatch = useAppDispatch()
    const screenId = useAppSelector(store => store.coins.mainScreen);

    const addListToStore = () => {
        if (!listName.trim()) return;
        dispatch(createNewList({listName, screenId, panelIndex}));
        setListname('')
    }
    return addListToStore;

}