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
    screenIndex: number;
}
export declare const useControlerSettingsButtons: () => ControlerBtn | undefined;
export {};
