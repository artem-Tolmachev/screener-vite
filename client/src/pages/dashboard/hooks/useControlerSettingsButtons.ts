import { useAppDispatch, useAppSelector } from "@/app/store/store";
import { useEffect, useState } from "react";
import { setActivePanel } from "../coinData/slices/CoinsSlice";
import { AllDataCoin, Layout, MarketData } from "../types/index";
import { ScreenGroup } from "../coinData/constants/screenData";

interface ControlerBtn {
    isActiveList: boolean[];
    togglePanel: (panelIndex: number) => void;
    toggle: (panelIndex: number, screenid: number) => void;
    screens: number;
    direction: "horizontal" | "vertical";
    layout: Layout;
    greed: number;
    screenId: number;
    mainScreenOption: ScreenGroup;
    selectedCoin: MarketData[];
    screensDataArray: AllDataCoin[] | undefined;
    screenIndex: number
}

export const useControlerSettingsButtons = (): ControlerBtn | undefined => {
    const [isActiveList, setIsActiveList] = useState<boolean[]>([]);
    const screenOptionGroop = useAppSelector(state => state.coins.allscreens);
    const screenIndex = useAppSelector(state => state.coins.panelActiveId);

    const screenId = useAppSelector(store => store.coins.mainScreen);
    const mainScreenOption = screenOptionGroop.find(screen => screen.id === screenId);
    const screensDataArray = mainScreenOption?.screens;
    const activedListData = mainScreenOption?.screens.find(item => item.activeList);
    const activeList = activedListData?.activeList;
    if(!activeList) return;
    const selectedList = activedListData?.storeList[activeList];
    const selectedCoin = selectedList?.item ?? [];

    const dispatch = useAppDispatch();
    if(!mainScreenOption) return;
    let {screens, direction, layout, greed} = mainScreenOption?.screenOptions;

    useEffect(() => {
        setIsActiveList(Array(screens).fill(true)); 
    }, [screens]);

    const togglePanel = (panelIndex: number) => {
        setIsActiveList(prev =>
            prev.map((active, idx) => idx === panelIndex ? !active : active)
        );
    };

    function toggle(panelIndex: number, screenid: number){
        dispatch(setActivePanel({panelIndex, screenid}))
    }

    return {screensDataArray, selectedCoin, mainScreenOption, screenId, isActiveList, togglePanel, toggle, screens, direction, layout, greed, screenIndex};
}