import {  BybitOrderbookResponse, BybitOrderbookResult, KlineTuple, KlineTupleValume, MarketData } from '../types/index';
import { UTCTimestamp } from 'lightweight-charts';
import { extractTokenSymbol } from './utils';
import { DefaultCoin } from '../coinData/constants/defaultSettings';
import { HeatMapData } from '../components/widgets/HeatMap/data';

export const dataKlinesParser = (list: KlineTuple[]) =>
  list.map(([time, open, high, low, close]) => ({
    time: (+time / 1000) as UTCTimestamp,
    open: +open,
    high: +high,
    low: +low,
    close: +close
  }));

export const dataValumeParser = (list: KlineTupleValume[]) =>
  list.map(([time, open, , , close, , volume]) => ({
    time: (+time / 1000) as UTCTimestamp,
    value: +volume,
    color: +open > +close ? '#ef5350' : '#26a69a',
  }));

export const tickerParser = (list: MarketData[]) =>
  list.map(({ 
    turnover24h, 
    volume24h, 
    symbol, 
    lastPrice, 
    src,
    ask1Price,
    basis, 
    basisRate, 
    bid1Price,
    marker
   }) => {
    const token = extractTokenSymbol(symbol);
    return {
      turnover24h: +turnover24h,
      volume24h: +volume24h / 100,
      symbol,
      lastPrice: +lastPrice,
      src: `https://s3-symbol-logo.tradingview.com/crypto/XTVC${token}.svg`,
      ask1Price: ask1Price,
      basis: basis,
      basisRate: basisRate,
      bid1Price: bid1Price,
      marker: ''
    };
  });

export const defaultCoinParser = ({ 
  ask1Price,
  bid1Price
}: DefaultCoin) => ({
  ask1Price,
  bid1Price
});

// export const dataHeatMapParser = (res: BybitOrderbookResult | BybitOrderbookResult[]): HeatMapData[] =>
//   (
//     Array.isArray(res) ? res : [res]).map(({ cts, a }) => ({
//     time: (+cts / 1000) as UTCTimestamp,
//     cells: a.map(arr => ({
//       low: +arr[0],
//       high: +arr[0] / 2,
//       amount: +arr[1],
//     })),
//   })
// );
