import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MarketData, NamedMarketDataLists } from "@/pages/dashboard/types";
import { DEFAULT_CHART_SETTINGS,
  DEFAULT_COIN_OPTION,
  DefaultCoin,
  chartSettings
 } from "../constants/defaultSettings";

export interface CoinsState {
  chartSettings: chartSettings;
  CoinData: DefaultCoin & {
    src: string;
    symbol: string;
  };
  isLogo: boolean;
  storeList: NamedMarketDataLists;
  activeList: string;
  markers: Record<string, string>
}

const initialState: CoinsState = {
  chartSettings: DEFAULT_CHART_SETTINGS,
  CoinData: {
    ...DEFAULT_COIN_OPTION,
    src: 'https://s3-symbol-logo.tradingview.com/crypto/XTVCBTC.svg',
    symbol: 'BTCUSDT'
  },
  isLogo: true,
    storeList: {
    List: {
      item: [],
      color: '',
      colorName: ''
    },
    Красный: {
      item: [],
      color: '#c51919',
      colorName: 'red',
    },
    Синий: {
      item: [],
      color: '#192dc5',
      colorName: 'blue'
    },
    Зеленный: {
      item: [],
      color: '#19c56c',
      colorName: 'green'
    }, 
    Розовый: {
      item: [],
      color: '#c51986',
      colorName: 'pink'
    }, 
  },
  activeList: 'List',
  markers: {

  }
};

export const coins = createSlice({
  name: 'coins',
  initialState,
  reducers: {
  defaultLoading: (state, action: PayloadAction<DefaultCoin>) => { state.CoinData = {
            ...state.CoinData,
    ask1Price: action.payload.ask1Price,
    bid1Price: action.payload.bid1Price
    }
  },
  coinListUpdate:(state, action: PayloadAction<{item: MarketData, marker: string}>) => {
    const {item, marker} = action.payload;

    Object.keys(state.storeList).forEach((listKey) => {
    if (!['Красный', 'Синий', 'Зеленный', 'Розовый'].includes(listKey)) return
    const list = state.storeList[listKey];
    list.item = list.item.filter((coin) => coin.symbol !== item.symbol);

    if (list.color === marker) {
      list.item.push({
        ...item,
        marker: marker
      });
    }

    });
    
  },
  addCoinToList: (state, action: PayloadAction<{item: MarketData, list: string}>) => {
    const {item, list} = action.payload;
    const targetList = list ?? state.activeList;
    const marker = state.markers[item.symbol] || '';

  if (targetList) {
    const alreadyAddedToTarget = state.storeList[targetList].item.some(
      coin => coin.symbol === item.symbol
  );

  if (!alreadyAddedToTarget) {
    state.storeList[targetList].item.push({
      ...item,
      marker: marker
    });
  }

  Object.keys(state.storeList).forEach((listKey) => {
    if (
      state.storeList[listKey].color === marker &&
      listKey !== targetList && // ← Prevent duplicate push
      !state.storeList[listKey].item.some(coin => coin.symbol === item.symbol)
    ) {
      state.storeList[listKey].item.push({
        ...item
      });
    }
  });
}

  },

  addMarker: (state, action: PayloadAction<{symbol: string, marker: string}>) => {
      const { symbol, marker } = action.payload;
      state.markers[symbol] = marker;
      const listName = state.activeList;
      const coin = state.storeList[listName].item.find((item) => item.symbol === symbol);

      if (coin) {
        coin.marker = marker;
      }

  },
  removeMarker: (state, action: PayloadAction<{ symbol: string }>) => {
      delete state.markers[action.payload.symbol];
  },
  delCoin: (state, action: PayloadAction<MarketData>) => {
    const listName = state.activeList;
    const coin = action.payload;
    state.storeList[listName].item = state.storeList[listName].item.filter(item => item.symbol !== coin.symbol);
  },
  addChart: (state, action: PayloadAction<{ 
    symbol: string,
    src: string,
    ask1Price: string,
    bid1Price: string
  }>) => {
    state.CoinData = {
      ...state.CoinData,
      symbol: action.payload.symbol,
      src: action.payload.src,
      ask1Price: action.payload.ask1Price,
      bid1Price: action.payload.bid1Price
    };
    state.chartSettings = {
      ...state.chartSettings,
      symbol: action.payload.symbol,
    }
  },
  changeInterval: (state, action: PayloadAction<{interval: string}>) => {
    state.chartSettings = {
    ...state.chartSettings,
    interval: action.payload.interval
  }
  },
  checkedLogo: (state, action: PayloadAction<boolean>) => {
    state.isLogo = action.payload
  },
  createNewList: (state, action: PayloadAction<{listName: string, item?: MarketData}>) => {
    const {listName, item } = action.payload
      if (!state.storeList[listName]) {
        state.storeList[listName] = {
          item: item ? [item] : [],
          color: '',
          colorName: ''
        };
      }
  },
  setActiveList: (state, action: PayloadAction<string>) => {
    state.activeList = action.payload
  },
    listCleaner: (state, action: PayloadAction<string>) => {
    const listName = state.activeList;
    state.storeList[listName].item = [];
  },
  listRemover: (state, action: PayloadAction<string>) => {
    const remoovedList = action.payload;
    delete state.storeList[remoovedList]
  }
}})

export const {
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
  createNewList} = coins.actions

