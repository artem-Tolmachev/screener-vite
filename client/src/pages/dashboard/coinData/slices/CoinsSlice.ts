import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {MarketData, LineData} from "@/pages/dashboard/types";
import {
  DefaultCoin
 } from "../constants/defaultSettings";
import { screen, screenData, ScreenGroup } from "../constants/screenData";
import { IconKey } from "@/shared/components/Icons/getIconsOfDiologToolBars";

export interface CoinsState {
  allscreens: ScreenGroup[];
  mainScreen: number;
  panelActiveId: number;
  activePanelBtn: IconKey;
  panelIndex: number;
  fullscreenChartId: number | null;
  flagLine: boolean;
}

const initialState: CoinsState = {
  allscreens: [screen],
  mainScreen: 0,
  panelActiveId: 0,
  activePanelBtn: 'btn-1',
  panelIndex: 0,
  fullscreenChartId: null,
  flagLine: false
};

export const coins = createSlice({
  name: 'coins',
  initialState,
  reducers: {
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

  // const safePanelIndex = Math.min(panelIndex, count - 1);

  const newScreens = Array.from({ length: count }).map((_, i) => ({
    ...screenData,
    isActive: i === panelIndex 
  }));

  // const newScreens = Array.from({ length: count }).map((_, i) => ({
  //   ...screenData,
  //   isActive: i === safePanelIndex
  // }));

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
      if (!['Красный', 'Синий', 'Зеленный', 'Розовый'].includes(listKey)) return
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

    // activeArray?.screens.forEach((key) => {
    //   const targetList = key.activeList ?? list;
    //   const marker = key.markers[item.symbol]|| '';
      
    //   if (targetList) {
    //   const alreadyAddedToTarget = key.storeList[targetList].item.some(
    //     coin => coin.symbol === item.symbol
    //   );

    //   if (!alreadyAddedToTarget) {
    //     key.storeList[targetList].item.push({
    //       ...item,
    //       marker: marker
    //     });
    //   }
    //   Object.keys(key.storeList).forEach((listKey) => {
    //       if (
    //         key.storeList[listKey].color === marker &&
    //         listKey !== targetList && // ← Prevent duplicate push
    //         !key.storeList[listKey].item.some(coin => coin.symbol === item.symbol)&&
    //         key.storeList[listKey].color != ""
    //       ) {
    //         key.storeList[listKey].item.push({
    //           ...item
    //         });
    //         }
    //   });
    //   }
    // })
    // --------------
  // const { item, list, screenId, panelIndex } = action.payload;
  // const activeArray = state.allscreens.find(arr => arr.id === screenId);

  // if (!activeArray) return;

  // const screen = activeArray.screens[panelIndex];
  // if (!screen) return;

  // const targetList = screen.activeList ?? list;
  // const marker = screen.markers[item.symbol] || '';

  // const alreadyAddedToTarget = screen.storeList[targetList].item.some(
  //   coin => coin.symbol === item.symbol
  // );

  // if (!alreadyAddedToTarget) {
  //   screen.storeList[targetList].item.push({
  //     ...item,
  //     marker: marker
  //   });
  // }

  // // если нужно учитывать цветовые маркеры
  // Object.keys(screen.storeList).forEach(listKey => {
  //   if (
  //     screen.storeList[listKey].color === marker &&
  //     listKey !== targetList &&
  //     !screen.storeList[listKey].item.some(coin => coin.symbol === item.symbol) &&
  //     screen.storeList[listKey].color !== ''
  //   ) {
  //     screen.storeList[listKey].item.push({
  //       ...item
  //     });
  //   }
  // });
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
    const {item, screenId, panelIndex} = action.payload;
    const activeArray = state.allscreens.find(arr => arr.id === screenId);
    const activedState = activeArray?.screens[panelIndex];
    if(!activedState) return
    const listName = activedState.activeList;
    const coin = item;
    activedState.storeList[listName].item = activedState.storeList[listName].item.filter(item => item.symbol !== coin.symbol);
  },
  addChart: (state, action: PayloadAction<{ 
    symbol: string,
    src: string,
    ask1Price: string,
    bid1Price: string,
    screenId: number,
    panelIndex: number,
    _t: number
  }>) => {
    const {screenId, symbol, src, ask1Price, bid1Price, panelIndex, _t} = action.payload;
    const activeArray = state.allscreens.find(arr => arr.id === screenId);
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
    // state.allscreens.forEach(screen => {
    //   screen.screens.forEach(el => {
    //     el.isLogo = action.payload
    //   })
    // })

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
    if (activeArrayState?.screens?.[panelIndex]) {
      activeArrayState.screens[panelIndex].activeList = listName;
    }
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
    delete activedState.storeList[list]
  },
  addHorzLine: (state, action: PayloadAction<{screenId: number, hlPoint: LineData, panelIndex: number}>) => {
    const {hlPoint, screenId, panelIndex} = action.payload;
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
    if(!items.length){
      if (!activedState.CoinData.lines) {
        activedState.CoinData.lines = []; 
      }
        activedState.CoinData.lines.push(hlPoint);
      }
  },
  addLineFlag: (state, action: PayloadAction<boolean>) => {
    state.flagLine = action.payload
  },
  removeHorzLine: (state, action: PayloadAction<{screenId: number, panelIndex: number, checkedLine: number | null}>) => {
    const {screenId, panelIndex, checkedLine} = action.payload;
    const activeArray = state.allscreens.find(arr => arr.id === screenId);
    const activedState = activeArray?.screens[panelIndex];
    if(!activedState) return
    const defaultChartDataId = activedState.CoinData.id;
    if(!defaultChartDataId){
      activedState.CoinData.lines = activedState.CoinData.lines.filter((coin) => coin.price !== checkedLine);
    }
    const activeList = activedState?.activeList;
    if(!activeList) return;
    const items = activedState?.storeList[activeList].item;
    if (!items) return;
    const activeSymbol = activedState?.CoinData.symbol;
    const coin = items.find(c => c.symbol === activeSymbol);
    if (!coin?.lines) return 
      coin.lines = coin.lines.filter((coin) => coin.price !== checkedLine);
    },
}})

export const {
  removeHorzLine,
  addLineFlag,
  addHorzLine,
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





