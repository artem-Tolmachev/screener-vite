import { DEFAULT_CHART_SETTINGS, DEFAULT_COIN_OPTION } from "./defaultSettings";
export const screenData = {
    chartSettings: DEFAULT_CHART_SETTINGS,
    CoinData: {
        ...DEFAULT_COIN_OPTION,
        src: 'https://s3-symbol-logo.tradingview.com/crypto/XTVCBTC.svg',
        symbol: 'BTCUSDT',
        lines: []
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
        Зеленый: {
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
    markers: {},
    isActive: true
};
export const screen = {
    id: 0,
    screens: [screenData],
    screenOptions: {
        screens: 1,
        greed: 0,
        direction: 'horizontal',
        layout: { rows: 1, col: 0, side: '' }
    }
};
