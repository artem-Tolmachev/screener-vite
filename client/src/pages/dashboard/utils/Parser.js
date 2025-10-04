import { extractTokenSymbol } from './utils';
export const dataKlinesParser = (list) => list.map(([time, open, high, low, close]) => ({
    time: (+time / 1000),
    open: +open,
    high: +high,
    low: +low,
    close: +close
}));
export const dataValumeParser = (list) => list.map(([time, open, , , close, , volume]) => ({
    time: (+time / 1000),
    value: +volume,
    color: +open > +close ? '#ef5350' : '#26a69a',
}));
export const tickerParser = (list) => list.map(({ turnover24h, volume24h, symbol, lastPrice, ask1Price, basis, basisRate, bid1Price, }) => {
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
export const defaultCoinParser = ({ ask1Price, bid1Price }) => ({
    ask1Price,
    bid1Price
});
