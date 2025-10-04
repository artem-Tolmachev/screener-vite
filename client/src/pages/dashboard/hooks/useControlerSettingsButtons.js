import { useAppDispatch, useAppSelector } from "@/app/store/store";
import { useEffect, useState } from "react";
import { setActivePanel } from "../coinData/slices/CoinsSlice";
export const useControlerSettingsButtons = () => {
    const [isActiveList, setIsActiveList] = useState([]);
    const screenOptionGroop = useAppSelector(state => state.coins.allscreens);
    const screenIndex = useAppSelector(state => state.coins.panelActiveId);
    const screenId = useAppSelector(store => store.coins.mainScreen);
    const mainScreenOption = screenOptionGroop.find(screen => screen.id === screenId);
    const screensDataArray = mainScreenOption?.screens;
    const activedListData = mainScreenOption?.screens.find(item => item.activeList);
    const activeList = activedListData?.activeList;
    if (!activeList)
        return;
    const selectedList = activedListData?.storeList[activeList];
    const selectedCoin = selectedList?.item ?? [];
    const dispatch = useAppDispatch();
    if (!mainScreenOption)
        return;
    let { screens, direction, layout, greed } = mainScreenOption?.screenOptions;
    useEffect(() => {
        setIsActiveList(Array(screens).fill(true));
    }, [screens]);
    const togglePanel = (panelIndex) => {
        setIsActiveList(prev => prev.map((active, idx) => idx === panelIndex ? !active : active));
    };
    function toggle(panelIndex, screenid) {
        dispatch(setActivePanel({ panelIndex, screenid }));
    }
    return { screensDataArray, selectedCoin, mainScreenOption, screenId, isActiveList, togglePanel, toggle, screens, direction, layout, greed, screenIndex };
};
