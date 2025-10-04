import { PayloadAction } from "@reduxjs/toolkit";
import { MarketData, AnyLine, FlagIsLine, LineType } from "@/pages/dashboard/types";
import { BtcUsdtDate, DefaultCoin } from "../constants/defaultSettings";
import { ScreenGroup } from "../constants/screenData";
import { IconKey } from "@/shared/components/Icons/getIconsOfDiologToolBars";
export interface CoinsState {
    allscreens: ScreenGroup[];
    mainScreen: number;
    panelActiveId: number;
    activePanelBtn: IconKey;
    panelIndex: number;
    fullscreenChartId: number | null;
    flagLine: FlagIsLine;
    btcusdt: BtcUsdtDate;
}
export declare const coins: import("@reduxjs/toolkit").Slice<CoinsState, {
    setBtcUsdt: (state: import("immer").WritableDraft<CoinsState>, action: PayloadAction<DefaultCoin>) => void;
    setuFullscreen: (state: import("immer").WritableDraft<CoinsState>, action: PayloadAction<number | null>) => void;
    setActivePanelIndex: (state: import("immer").WritableDraft<CoinsState>, action: PayloadAction<number>) => void;
    defaultLoading: (state: import("immer").WritableDraft<CoinsState>, action: PayloadAction<DefaultCoin>) => void;
    newScreen: (state: import("immer").WritableDraft<CoinsState>, action: PayloadAction<{
        height: number;
        layoutSide: "right" | "left" | "top" | "bottom" | "";
        layoutCol: number;
        layoutRow: number;
        count: number;
        direction: "horizontal" | "vertical";
        screenid: number;
        panelIndex: number;
        greed: number;
    }>) => void;
    setMainScreen: (state: import("immer").WritableDraft<CoinsState>, action: PayloadAction<number>) => void;
    setActivePanelIcon: (state: import("immer").WritableDraft<CoinsState>, action: PayloadAction<{
        name: IconKey;
    }>) => void;
    setActivePanel: (state: import("immer").WritableDraft<CoinsState>, action: PayloadAction<{
        screenid: number;
        panelIndex: number;
    }>) => void;
    coinListUpdate: (state: import("immer").WritableDraft<CoinsState>, action: PayloadAction<{
        screenId: number;
        item: MarketData;
        marker: string;
        index: number;
    }>) => void;
    addCoinToList: (state: import("immer").WritableDraft<CoinsState>, action: PayloadAction<{
        panelIndex: number;
        item: MarketData;
        list: string;
        screenId: number;
    }>) => void;
    addMarker: (state: import("immer").WritableDraft<CoinsState>, action: PayloadAction<{
        symbol: string;
        marker: string;
        screenId: number;
        panelIndex: number;
    }>) => void;
    removeMarker: (state: import("immer").WritableDraft<CoinsState>, action: PayloadAction<{
        symbol: string;
        screenId: number;
        panelIndex: number;
    }>) => void;
    delCoin: (state: import("immer").WritableDraft<CoinsState>, action: PayloadAction<{
        item: MarketData;
        screenId: number;
        panelIndex: number;
    }>) => void;
    addChart: (state: import("immer").WritableDraft<CoinsState>, action: PayloadAction<{
        symbol: string;
        src: string;
        ask1Price: string;
        bid1Price: string;
        screenId: number;
        panelIndex: number;
        _t: number;
    }>) => void;
    changeInterval: (state: import("immer").WritableDraft<CoinsState>, action: PayloadAction<{
        interval: string;
        screenId: number;
        panelIndex: number;
    }>) => void;
    checkedLogo: (state: import("immer").WritableDraft<CoinsState>, action: PayloadAction<{
        panelId: number;
        isLogo: boolean;
        panelIndex: number;
    }>) => void;
    createNewList: (state: import("immer").WritableDraft<CoinsState>, action: PayloadAction<{
        panelIndex: number;
        listName: string;
        item?: MarketData;
        screenId?: number;
    }>) => void;
    setActiveList: (state: import("immer").WritableDraft<CoinsState>, action: PayloadAction<{
        listName: string;
        screenId: number;
        panelIndex: number;
    }>) => void;
    listCleaner: (state: import("immer").WritableDraft<CoinsState>, action: PayloadAction<{
        activeList?: string;
        screenId: number;
        panelIndex: number;
    }>) => void;
    listRemover: (state: import("immer").WritableDraft<CoinsState>, action: PayloadAction<{
        screenId: number;
        list: string;
        panelIndex: number;
    }>) => void;
    addLineFlag: (state: import("immer").WritableDraft<CoinsState>, action: PayloadAction<LineType>) => void;
    removeHorzLine: (state: import("immer").WritableDraft<CoinsState>, action: PayloadAction<{
        lineId: string | null;
        screenId: number;
        panelIndex: number;
    }>) => void;
    addCustomLine: (state: import("immer").WritableDraft<CoinsState>, action: PayloadAction<{
        lineId?: string;
        screenId: number;
        hlPoint: AnyLine;
        panelIndex: number;
    }>) => void;
    updateLinesEdit: (state: import("immer").WritableDraft<CoinsState>, action: PayloadAction<{
        lineId: string;
        screenId: number;
        lineObject: AnyLine;
        panelIndex: number;
    }>) => void;
}, "coins", "coins", import("@reduxjs/toolkit").SliceSelectors<CoinsState>>;
export declare const setBtcUsdt: import("@reduxjs/toolkit").ActionCreatorWithPayload<DefaultCoin, "coins/setBtcUsdt">, updateLinesEdit: import("@reduxjs/toolkit").ActionCreatorWithPayload<{
    lineId: string;
    screenId: number;
    lineObject: AnyLine;
    panelIndex: number;
}, "coins/updateLinesEdit">, removeHorzLine: import("@reduxjs/toolkit").ActionCreatorWithPayload<{
    lineId: string | null;
    screenId: number;
    panelIndex: number;
}, "coins/removeHorzLine">, addLineFlag: import("@reduxjs/toolkit").ActionCreatorWithPayload<LineType, "coins/addLineFlag">, addCustomLine: import("@reduxjs/toolkit").ActionCreatorWithPayload<{
    lineId?: string;
    screenId: number;
    hlPoint: AnyLine;
    panelIndex: number;
}, "coins/addCustomLine">, setuFullscreen: import("@reduxjs/toolkit").ActionCreatorWithPayload<number | null, "coins/setuFullscreen">, setActivePanelIndex: import("@reduxjs/toolkit").ActionCreatorWithPayload<number, "coins/setActivePanelIndex">, setActivePanelIcon: import("@reduxjs/toolkit").ActionCreatorWithPayload<{
    name: IconKey;
}, "coins/setActivePanelIcon">, setActivePanel: import("@reduxjs/toolkit").ActionCreatorWithPayload<{
    screenid: number;
    panelIndex: number;
}, "coins/setActivePanel">, setMainScreen: import("@reduxjs/toolkit").ActionCreatorWithPayload<number, "coins/setMainScreen">, newScreen: import("@reduxjs/toolkit").ActionCreatorWithPayload<{
    height: number;
    layoutSide: "right" | "left" | "top" | "bottom" | "";
    layoutCol: number;
    layoutRow: number;
    count: number;
    direction: "horizontal" | "vertical";
    screenid: number;
    panelIndex: number;
    greed: number;
}, "coins/newScreen">, coinListUpdate: import("@reduxjs/toolkit").ActionCreatorWithPayload<{
    screenId: number;
    item: MarketData;
    marker: string;
    index: number;
}, "coins/coinListUpdate">, removeMarker: import("@reduxjs/toolkit").ActionCreatorWithPayload<{
    symbol: string;
    screenId: number;
    panelIndex: number;
}, "coins/removeMarker">, addMarker: import("@reduxjs/toolkit").ActionCreatorWithPayload<{
    symbol: string;
    marker: string;
    screenId: number;
    panelIndex: number;
}, "coins/addMarker">, listRemover: import("@reduxjs/toolkit").ActionCreatorWithPayload<{
    screenId: number;
    list: string;
    panelIndex: number;
}, "coins/listRemover">, listCleaner: import("@reduxjs/toolkit").ActionCreatorWithPayload<{
    activeList?: string;
    screenId: number;
    panelIndex: number;
}, "coins/listCleaner">, setActiveList: import("@reduxjs/toolkit").ActionCreatorWithPayload<{
    listName: string;
    screenId: number;
    panelIndex: number;
}, "coins/setActiveList">, addCoinToList: import("@reduxjs/toolkit").ActionCreatorWithPayload<{
    panelIndex: number;
    item: MarketData;
    list: string;
    screenId: number;
}, "coins/addCoinToList">, delCoin: import("@reduxjs/toolkit").ActionCreatorWithPayload<{
    item: MarketData;
    screenId: number;
    panelIndex: number;
}, "coins/delCoin">, addChart: import("@reduxjs/toolkit").ActionCreatorWithPayload<{
    symbol: string;
    src: string;
    ask1Price: string;
    bid1Price: string;
    screenId: number;
    panelIndex: number;
    _t: number;
}, "coins/addChart">, defaultLoading: import("@reduxjs/toolkit").ActionCreatorWithPayload<DefaultCoin, "coins/defaultLoading">, changeInterval: import("@reduxjs/toolkit").ActionCreatorWithPayload<{
    interval: string;
    screenId: number;
    panelIndex: number;
}, "coins/changeInterval">, checkedLogo: import("@reduxjs/toolkit").ActionCreatorWithPayload<{
    panelId: number;
    isLogo: boolean;
    panelIndex: number;
}, "coins/checkedLogo">, createNewList: import("@reduxjs/toolkit").ActionCreatorWithPayload<{
    panelIndex: number;
    listName: string;
    item?: MarketData;
    screenId?: number;
}, "coins/createNewList">;
