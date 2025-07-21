import { useAppDispatch, useAppSelector } from "@/app/store/store";
import { MarketData } from "../types";
import { addCoinToList, addMarker, delCoin } from "../coinData/slices/CoinsSlice";

interface Props{
    item:  MarketData
}
export default function useTickerActions({item}: Props) {
      
    const dispatch = useAppDispatch();
    const activeList = useAppSelector(store => store.coins.activeList);
    const markeredActiveList: MarketData[] = useAppSelector((store) => store.coins.storeList[activeList].item ?? []);
    const ativeMarkerColor = useAppSelector((store) => store.coins.storeList[activeList].color);

    let exist = markeredActiveList.some(el => el?.symbol === item?.symbol);


    const addCoin = () => {
    if (!['Красный', 'Синий', 'Зеленный', 'Розовый'].includes(activeList)) {
        if (!exist) {
      dispatch(addCoinToList({item, list: 'List'}));
    }
    }else{
        let symbol = item.symbol;
    if(!exist){
      dispatch(addCoinToList({item, list: activeList}));
      dispatch(addMarker({ symbol, marker: ativeMarkerColor}));
    }
  }
  }
  const deliteCoin = () => {
    dispatch(delCoin(item));
  }

  return {addCoin, deliteCoin, exist}
} 