import { WebSocket } from 'ws';
export const TICKERS_URL = 'https://api.bybit.com/v5/market/tickers?category=linear';
export const BASE_URL = 'https://api.bybit.com/v5/market/kline?';
export const SOCKET_FUTERES = new WebSocket('wss://stream.bybit.com/v5/public/linear');
