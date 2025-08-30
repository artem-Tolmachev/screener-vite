import { useAppDispatch, useAppSelector } from "@/app/store/store";
import { MarketData } from "../types";
import { addCoinToList, addMarker, delCoin } from "../coinData/slices/CoinsSlice";

interface Props {
  item: MarketData;
}
export default function useTickerActions({item}: Props) {
    const dispatch = useAppDispatch();
    const screenOptionGroop = useAppSelector(state => state.coins.allscreens);
    const screenId = useAppSelector(store => store.coins.mainScreen);
    const ativeArray = screenOptionGroop.find(el => el.id === screenId);
    const panelIndex = useAppSelector(store => store.coins.panelIndex);
    if(!ativeArray) return;
    const activeListArr = ativeArray.screens;
    if(!activeListArr) return;
    const activeListItem = activeListArr[panelIndex];
    const activeList = activeListItem.activeList;
    const exist = activeListItem.storeList[activeList].item.some(el => el?.symbol === item?.symbol)
    const ativeMarkerColor = activeListItem.storeList[activeList].color;
   
    const addCoin = () => {
      if (!['Красный', 'Синий', 'Зеленный', 'Розовый'].includes(activeList)) {
          if (!exist && item) {
          dispatch(addCoinToList({item, list: activeList, screenId, panelIndex}));
      }
      }else{
        let symbol = item?.symbol;
        if(!exist && symbol && item){
          dispatch(addCoinToList({item, list: activeList, screenId, panelIndex}));
          dispatch(addMarker({ symbol, marker: ativeMarkerColor, screenId, panelIndex}));
        }
      } 
    }
    const deliteCoin = () => {
      if(!item) return;
      dispatch(delCoin({item, screenId, panelIndex}));
    }
    return {exist, addCoin, deliteCoin}
} 