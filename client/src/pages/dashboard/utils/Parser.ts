import { KlineTuple, KlineTupleValume, MarketData } from '../types/index';
import { UTCTimestamp } from 'lightweight-charts';
import { extractTokenSymbol } from './utils';
import { DefaultCoin } from '../coinData/constants/defaultSettings';

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
    ask1Price,
    basis, 
    basisRate, 
    bid1Price,
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

