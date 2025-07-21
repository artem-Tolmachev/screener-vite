import { useAppDispatch } from "@/app/store/store"
import { createNewList } from "../coinData/slices/CoinsSlice"

export default function useCreateNewWatchList(listName: string, setListname: (value: string) => void){
    
    const dispatch = useAppDispatch()
    const addListToStore = () => {
        if (!listName.trim()) return;
        dispatch(createNewList({listName}));
        setListname('')
    }

    return addListToStore
}