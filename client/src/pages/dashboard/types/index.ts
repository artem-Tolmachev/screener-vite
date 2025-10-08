import { CandlestickData, CandlestickSeriesOptions, ISeriesApi, Time, UTCTimestamp, WhitespaceData } from 'lightweight-charts';
import { chartSettings, DefaultCoin } from '../coinData/constants/defaultSettings';
import { tickerParser } from '../utils/Parser';

export interface CoinsData {
  ask1Price: string; // Лучшая цена продажи (аск) на текущий момент
  ask1Size: string; // Количество доступное на продаже по лучшей цене
  basis: string; // Базис (разница между ценой фьючерса и спотовой ценой), иногда пустое
  basisRate: string; // Процентная ставка базиса
  bid1Price: string; // Лучшая цена покупки (бид) на текущий момент
  bid1Size: string; // Количество доступное на покупке по лучшей цене
  curPreListingPhase: string; // Фаза предварительного листинга (если есть)
  deliveryFeeRate: string; // Комиссия за доставку (если фьючерс поставочный)
  deliveryTime: string; // Время доставки фьючерсного контракта (в миллисекундах или "0")
  fundingRate: string; // Текущая ставка финансирования (для бессрочных фьючерсов)
  highPrice24h: string; // Максимальная цена за последние 24 часа
  indexPrice: string; // Индексная цена актива (средневзвешенная по биржам)
  lastPrice: number; // Последняя цена сделки
  lowPrice24h: string; // Минимальная цена за последние 24 часа
  markPrice: string; // Маркированная цена (используется для расчёта ликвидаций)
  nextFundingTime: string; // Время следующего финансирования (в миллисекундах)
  openInterest: string; // Открытый интерес (общее количество открытых контрактов)
  openInterestValue: string; // Общая стоимость открытого интереса в долларах
  preOpenPrice: string; // Цена на момент предварительного открытия (если есть)
  preQty: string; // Объём предварительных сделок (если есть)
  predictedDeliveryPrice: string; // Прогнозируемая цена на момент доставки
  prevPrice1h: string; // Цена закрытия один час назад
  prevPrice24h: string; // Цена закрытия 24 часа назад
  price24hPcnt: string; // Изменение цены за 24 часа в процентах
  symbol: string; // Название торговой пары (символ), например "BTCUSDT"
  turnover24h: number; // Оборот за последние 24 часа (сумма всех сделок)
  volume24h: number; // Объём торговли за 24 часа (в единицах базового актива)
  src: string;
  marker: string;
}

export enum LineType {
  HORIZONTAL_RAY = 'horizontal-ray',
  HORIZONTAL_LINE = 'horizontal-line',
  TREND = 'trendline',
  NONE = 'none'
}

export type FlagIsLine = {
  isLineHrz: boolean;
  isLineTrend: boolean;
  isRay: boolean;
}

export type MarketData = 
  Pick<CoinsData, 
  "turnover24h" 
  | "volume24h" 
  | "symbol" 
  | "lastPrice"
  | "ask1Price"
  | "basis"
  | "basisRate"
  | "bid1Price"
  | "src"
  | "marker"
  >;

export interface LineData {
  price: number;
  timestamp: UTCTimestamp;
  name: "HorizontalRay";
  id: string;
}  
export interface HrzLineData {
  price: number;
  timestamp: UTCTimestamp;
  name: "HorizontalLine";
  id: string;
}
export interface TrendPoint {
  price: number;
  timestamp: UTCTimestamp;
}
export interface TrendLine {
  points: TrendPoint[];
  name: "TrendLine";
   id: string;
}
export type AnyLine = LineData | TrendLine | HrzLineData; 
export interface MarketDataWithLines extends MarketData {
  lines?: AnyLine[];
}
export type TickerProps = {
  key: string;
  name: string;
  price: number;
  turnover: number;
  volume: number;
};
export type InitiaLChartSettings = {
    interval: string | undefined;
    symbol: string;
    limit: string;
    category: string;
}
export type Kline = {
    time: UTCTimestamp;
    open: number;
    high: number;
    low: number;
    close: number;
  };

export type Cand = {
    time: UTCTimestamp;
    value: number;
    color: string;
}

export type UseKlinesResult = {
    data: Kline[];
    volume: Cand[];
};

export type KlineTuple = [number | string, number | string, number | string, number | string, number | string];

export type KlineTupleValume = [
  number | string, 
  number | string, 
  any,            
  any,            
  number | string, 
  any,           
  number | string  
];

export interface IDashboardHeaderItems {
  key: string;
  name: string;
  visible: number;
}

export type Candlestick = ISeriesApi<"Candlestick", Time, CandlestickData<Time> | WhitespaceData<Time>, CandlestickSeriesOptions>  | null;

// RTK -------
export type BackendResponse = {
    tickers: CoinsData[];
    btcData: CoinsData;
}

export interface OriginalResponse {
  tickers: ReturnType<typeof tickerParser>;
  btcUsdt: DefaultCoin;
}

type HeatMapEntry = {
  price: number;
  volume: number;
  from: number; // timestamp
  to?: number;  // может отсутствовать
  side: 'bids' | 'asks';
};

export type HeatMapData = {
  [symbol: string]: HeatMapEntry[];
};

export interface FullTickerProps extends TickerProps{
  col: IDashboardHeaderItems[];
  src: string;
  item: MarketData;
  panelIndex: number;
}

interface itemList{
  item: MarketDataWithLines[];
  color: string;
  colorName: string;
} 

export type NamedMarketDataLists = {
  [listName: string]: itemList;
};

export interface Layout {
   rows: number;
   col: number;
   side: 'right' | 'left' | 'top' | 'bottom' | '';
}

export interface OptionsScreen {
    greed: number;
    screens: number;
    direction: 'horizontal' | 'vertical';
    layout: Layout;
}

export interface AllDataCoin {
    chartSettings: chartSettings;
    CoinData: DefaultCoin & {
    src: string;
    symbol: string;
    lines: AnyLine[];
    };
    isLogo: boolean;
    storeList: NamedMarketDataLists;
    activeList: string;
    markers: Record<string, string>
    isActive: boolean;
}
export interface LoginResponse {
  success: boolean;
  token?: string; 
  user?: {
    id: number;
    email: string;
  };
}