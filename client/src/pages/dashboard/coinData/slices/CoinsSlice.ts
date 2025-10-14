import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {MarketData, AnyLine, FlagIsLine, LineType, LineData, TrendLine, HrzLineData, LoginResponse} from "@/pages/dashboard/types";
import { BtcUsdtDate, DEFAULT_CHART_SETTINGS, DEFAULT_COIN_OPTION, DefaultCoin } from "../constants/defaultSettings";
import { screen, screenData, ScreenGroup } from "../constants/screenData";
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
  userData: LoginResponse;
}

const initialState: CoinsState = {
  btcusdt: {
    ...DEFAULT_CHART_SETTINGS,
    ...DEFAULT_COIN_OPTION,
    src: 'https://s3-symbol-logo.tradingview.com/crypto/XTVCBTC.svg'
  },
  allscreens: [screen],
  mainScreen: 0,
  panelActiveId: 0,
  activePanelBtn: 'btn-1',
  panelIndex: 0,
  fullscreenChartId: null,
  flagLine: {
    isLineHrz: false,
    isLineTrend: false,
    isRay: false
  },
  userData: {
    success: false,
    token: undefined,
    user: undefined,
  },
};

export const coins = createSlice({
  name: 'coins',
  initialState,
  reducers: {
  setBtcUsdt: (state, action: PayloadAction<DefaultCoin>) => {
    const {ask1Price, bid1Price} = action.payload;
    if(!ask1Price || !bid1Price) return
    state.btcusdt.ask1Price = ask1Price;
    state.btcusdt.bid1Price = bid1Price;
  },
  setuFullscreen:  (state, action: PayloadAction<number | null>) => {
    state.fullscreenChartId = action.payload;
  },
  setActivePanelIndex:  (state, action: PayloadAction<number>) => {
    state.panelIndex = action.payload;
  },
  defaultLoading: (state, action: PayloadAction<DefaultCoin>) => { 
    state.allscreens.forEach(screen => {
      screen.screens.forEach(el => {
        el.CoinData = {
          ...el.CoinData,
          ask1Price: action.payload.ask1Price,
          bid1Price: action.payload.bid1Price
        }
      })
    })
  },
  newScreen:(state, action: PayloadAction<{height: number, layoutSide: 'right' | 'left' | 'top' | 'bottom' | '', layoutCol: number, layoutRow: number, count: number, direction: 'horizontal' | 'vertical', screenid: number, panelIndex: number, greed: number}>) => {
  const {greed, count, direction, screenid, panelIndex, height, layoutRow, layoutCol, layoutSide} = action.payload;
  
  state.allscreens.forEach(screen => {
    screen.screens.forEach(el => {
      el.isActive = false
    })
  });

  const newScreens = Array.from({ length: count }).map((_, i) => ({
    ...screenData,
    isActive: i === panelIndex 
  }));
  const newItem = {
    id: screenid,
      screens: newScreens,
      screenOptions: {
      greed: greed,
      screens: count,
      direction: direction,
      layout: {rows: layoutRow, col: layoutCol, side: layoutSide},
      height: height
    }
  };
  state.allscreens.push(newItem);   
  },
  setMainScreen: (state, action: PayloadAction<number>) => {
    state.mainScreen = action.payload
  },
  setActivePanelIcon: (state, action: PayloadAction<{name: IconKey}>) => {
    const IconName = action.payload.name;
    state.activePanelBtn = IconName;
  },
  setActivePanel: (state, action: PayloadAction<{ screenid: number; panelIndex: number }>) => {
      const { panelIndex } = action.payload;
      state.panelActiveId = panelIndex;
  },
  coinListUpdate:(state, action: PayloadAction<{screenId: number, item: MarketData, marker: string, index: number}>) => {
    const {item, marker, index, screenId} = action.payload;
    const activeArray = state.allscreens.find(arr => arr.id === screenId);
    const activedState = activeArray?.screens[index];
    if(!activedState) return

    Object.keys(activedState.storeList).forEach((listKey) => {
      if (!['Красный', 'Синий', 'Зеленый', 'Розовый'].includes(listKey)) return
      const list = activedState.storeList[listKey];
      list.item = list.item.filter((coin) => coin.symbol !== item.symbol);
      if (list.color === marker) {
          list.item.push({
            ...item,
            marker: marker
          });
        }
    })
  },
  addCoinToList: (state, action: PayloadAction<{panelIndex: number, item: MarketData, list: string, screenId: number}>) => {
    const {item, list, screenId, panelIndex} = action.payload;
    const activeArray = state.allscreens.find(arr => arr.id === screenId);
    const activeState = activeArray?.screens[panelIndex];
    const targetArray = activeState?.storeList[list].item;
    targetArray?.push({
          ...item,
          lines: []
    })
  },
  addMarker: (state, action: PayloadAction<{symbol: string, marker: string, screenId: number, panelIndex: number}>) => {
      const { symbol, marker, screenId, panelIndex} = action.payload;
      const activeArray = state.allscreens.find(arr => arr.id === screenId);
      const activedState = activeArray?.screens[panelIndex];

      if(!activedState) return
        activedState.markers[symbol] = marker;
        const listName = activedState.activeList;
        const coin = activedState.storeList[listName].item.find((item) => item.symbol === symbol);
        if (coin) {
          coin.marker = marker;
        }
  },
  removeMarker: (state, action: PayloadAction<{ symbol: string, screenId: number,  panelIndex: number}>) => {
      const { symbol, screenId, panelIndex} = action.payload;
      const activeArray = state.allscreens.find(arr => arr.id === screenId);
      const activedState = activeArray?.screens[panelIndex];
      if(!activedState) return
      delete activedState.markers[symbol];
  },
  delCoin: (state, action: PayloadAction<{item: MarketData, screenId: number, panelIndex: number}>) => {
    const {item, screenId, panelIndex } = action.payload;
    const activeArray = state.allscreens.find(arr => arr.id === screenId);
    const activedState = activeArray?.screens[panelIndex];
    if(!activedState) return
    const listName = activedState.activeList;
    const coin = item;
    activedState.storeList[listName].item = activedState.storeList[listName].item.filter(item => item.symbol !== coin.symbol);

    const {ask1Price, bid1Price, src, symbol} = state.btcusdt;

    if (activedState.CoinData.symbol === item.symbol) {
      activedState.CoinData = {
        ask1Price: ask1Price,
        bid1Price: bid1Price,
        src: src,
        symbol: symbol,
        id: null,
        lines: [...activedState.CoinData.lines]
      };
      activedState.chartSettings = {
        ...DEFAULT_CHART_SETTINGS
    };
    }
  },
  addChart: (state, action: PayloadAction<{ 
    symbol: string,
    src: string,
    ask1Price: string,
    bid1Price: string,
    screenId: number,
    panelIndex: number | undefined,
    _t: number
  }>) => {
    const {screenId, symbol, src, ask1Price, bid1Price, panelIndex, _t} = action.payload;
    const activeArray = state.allscreens.find(arr => arr.id === screenId);
    if(panelIndex === undefined) return;
    const activedState = activeArray?.screens[panelIndex];
    let activeList = activedState?.activeList;
    const id = screenId + '-' + panelIndex + '-' + activeList + '-' + symbol;
    if(!activedState) return;
    const CoinDataId = activedState.CoinData.id;
    if(CoinDataId === id) return

    if(!activedState) return;
      activedState.CoinData = {
        ...activedState.CoinData,
        symbol: symbol,
        src: src,
        ask1Price: ask1Price,
        bid1Price: bid1Price,
        id: id
      };
      activedState.chartSettings = {
        ...activedState.chartSettings,
        symbol: symbol,
        _t: _t
      }
  },
  changeInterval: (state, action: PayloadAction<{interval: string, screenId: number, panelIndex: number}>) => {
    const {interval, screenId, panelIndex} = action.payload;
    const activeArray = state.allscreens.find(arr => arr.id === screenId);
    const activedState = activeArray?.screens[panelIndex];
    if(!activedState) return;
      activedState.chartSettings = {
          ...activedState.chartSettings,
          interval: interval
        }
  },
  checkedLogo: (state, action: PayloadAction<{panelId: number, isLogo: boolean, panelIndex: number}>) => {
    const {isLogo, panelIndex, panelId} = action.payload;
    const activeArray = state.allscreens.find(arr => arr.id === panelId);
    const activedState = activeArray?.screens[panelIndex];
    if(!activedState) return;
    activedState.isLogo = isLogo;
  },
  createNewList: (state, action: PayloadAction<{panelIndex: number, listName: string, item?: MarketData, screenId?: number}>) => {
    const {listName, item, screenId, panelIndex} = action.payload
    const activeArray = state.allscreens.find(arr => arr.id === screenId);
    
    const activedState = activeArray?.screens[panelIndex];
    if(activedState){
      if (!activedState.storeList[listName]) {
          activedState.storeList[listName] = {
          item: item ? [item] : [],
          color: '',
          colorName: ''
        };
      }
    }
  },
  setActiveList: (state, action: PayloadAction<{listName: string, screenId: number, panelIndex: number}>) => {
    const {screenId, listName, panelIndex} = action.payload;
    const activeArrayState = state.allscreens.find(arr => arr.id === screenId);
    const activedState = activeArrayState?.screens[panelIndex];
    const {ask1Price, bid1Price, src, symbol} = state.btcusdt;
    if (activeArrayState?.screens?.[panelIndex]) {
      activeArrayState.screens[panelIndex].activeList = listName;
    }
    if(!activedState) return;
      activedState.CoinData = {
        ask1Price: ask1Price,
        bid1Price: bid1Price,
        src: src,
        symbol: symbol,
        id: null,
        lines: [...activedState.CoinData.lines]
      };
      activedState.chartSettings = {
        ...DEFAULT_CHART_SETTINGS
    };
  },
  listCleaner: (state, action: PayloadAction<{activeList?: string, screenId: number, panelIndex: number}>) => {
    const {activeList, screenId, panelIndex} = action.payload
    const listName = activeList;
    const activeArray = state.allscreens.find(arr => arr.id === screenId);
    if(!activeArray) return
    const activedState = activeArray.screens[panelIndex];
 
    if (listName && activedState) {
      const targetList = activedState.storeList[listName];
      if (targetList) {
        targetList.item = [];
      } else {
        console.warn(`listCleaner: storeList[${listName}] не найден`, activedState.storeList);
      }
    }
  },
  listRemover: (state, action: PayloadAction<{screenId: number, list: string, panelIndex: number}>) => {
    const {list, screenId, panelIndex} = action.payload;
    const activeArray = state.allscreens.find(arr => arr.id === screenId);
    const activedState = activeArray?.screens[panelIndex];

    if(!activedState) return;
    delete activedState.storeList[list];
  },

  addLineFlag: (state, action: PayloadAction<LineType>) => {
    switch (action.payload) {
      case LineType.HORIZONTAL_LINE:
        state.flagLine.isLineHrz = true;
        state.flagLine.isLineTrend = false;
        state.flagLine.isRay = false;
        break;
      case LineType.HORIZONTAL_RAY:
        state.flagLine.isRay = true;
        state.flagLine.isLineHrz = false;
        state.flagLine.isLineTrend = false;
        break;
      case LineType.TREND:
        state.flagLine.isRay = false;
        state.flagLine.isLineHrz = false;
        state.flagLine.isLineTrend = true;
        break;
      case LineType.NONE:
        state.flagLine.isLineHrz = false;
        state.flagLine.isLineTrend = false;
        state.flagLine.isRay = false;
    }
    
  },
  removeHorzLine: (state, action: PayloadAction<{lineId: string | null, screenId: number, panelIndex: number}>) => {
    const {screenId, panelIndex, lineId} = action.payload;
    const activeArray = state.allscreens.find(arr => arr.id === screenId);
    const activedState = activeArray?.screens[panelIndex];
    if(!activedState) return
    const defaultChartDataId = activedState.CoinData.id;

    if(!defaultChartDataId){
      activedState.CoinData.lines = activedState.CoinData.lines.filter(item => item.id !== lineId)
    }

    const activeList = activedState?.activeList;
    if(!activeList) return;
    const items = activedState?.storeList[activeList].item;
    if (!items) return;
    const activeSymbol = activedState?.CoinData.symbol;
    const coin = items.find(c => c.symbol === activeSymbol);
    if (!coin?.lines) return 
      coin.lines = coin.lines.filter((coin) => coin.id !== lineId);
  },
  addCustomLine: (state, action: PayloadAction<{lineId?: string, screenId: number, hlPoint: AnyLine, panelIndex: number}>) => {
    const { hlPoint, screenId, panelIndex } = action.payload;
    const activeArray = state.allscreens.find(arr => arr.id === screenId);
    const activedState = activeArray?.screens[panelIndex];
    const activeList = activedState?.activeList;
    if(!activeList) return;
    const items = activedState?.storeList[activeList].item;
    if (!items) return;
    const activeSymbol = activedState?.CoinData.symbol;
    const coin = items.find(c => c.symbol === activeSymbol);

    if (coin) {
      if (!coin.lines) {
        coin.lines = [];
      }
      coin.lines.push(hlPoint);
    }

    if(!activedState.CoinData.id){
      activedState.CoinData.lines.push(hlPoint);
    }
  },
  updateLinesEdit: (
    state,
    action: PayloadAction<{
      lineId: string;
      screenId: number;
      lineObject: AnyLine;
      panelIndex: number;
    }>
  ) => {
  const { lineId, lineObject, screenId, panelIndex } = action.payload;
  const activeArray = state.allscreens.find(arr => arr.id === screenId);
  const activedState = activeArray?.screens[panelIndex];
  if (!activedState) return;
  const activeList = activedState.activeList;
  if (!activeList) return;
  const items = activedState.storeList[activeList].item;
  if (!items) return;
  const activeSymbol = activedState.CoinData.symbol;
  let chartFromList = items.find(c => c.symbol === activeSymbol);
  const isChartFromList = activedState.CoinData.id;
  // --- обновляем CoinData (для горизонтальных)
  if (!isChartFromList) {
    const updatedLines = activedState.CoinData.lines.map(line => {
      if (line.id === lineId && line.name === "HorizontalRay") {
        const { price, timestamp } = lineObject as LineData;
        return { ...line, price, timestamp };
      }else if(line.id === lineId && line.name === "HorizontalLine"){
        const { price, timestamp } = lineObject as HrzLineData;
        return { ...line, price, timestamp };
      }else if(line.id === lineId && line.name === "TrendLine"){
        const { points } = lineObject as TrendLine;
        return { ...line,  points: [...points] };
      }
      return line;
    });

    activedState.CoinData = {
      ...activedState.CoinData,
      lines: updatedLines,
    };
  }

    if (chartFromList) {
      if (!chartFromList.lines) return;
      const updatedLines = chartFromList.lines.map(line => {
        if (line.id === lineId && line.name === "HorizontalRay"){
          const { price, timestamp } = lineObject as LineData;
          return { ...line, price, timestamp };
        }
        if (line.id === lineId && line.name === "HorizontalLine"){
          const { price, timestamp } = lineObject as LineData;
          return { ...line, price, timestamp };
        }
        if (line.id === lineId && line.name === "TrendLine") {
          const { points } = lineObject as TrendLine;
          return { ...line, points: [...points] };
        }
        return line;
      });
      activedState.storeList[activeList].item = items.map(c =>
        c.symbol === activeSymbol ? { ...c, lines: updatedLines } : c
      );
    }
  }
}})

export const {
  setBtcUsdt,
  updateLinesEdit,
  removeHorzLine,
  addLineFlag,
  addCustomLine,
  setuFullscreen,
  setActivePanelIndex,
  setActivePanelIcon,
  setActivePanel,
  setMainScreen,
  newScreen,
  coinListUpdate,
  removeMarker,
  addMarker,
  listRemover, 
  listCleaner,
  setActiveList, 
  addCoinToList, 
  delCoin, 
  addChart, 
  defaultLoading, 
  changeInterval, 
  checkedLogo, 
  createNewList
} = coins.actions





