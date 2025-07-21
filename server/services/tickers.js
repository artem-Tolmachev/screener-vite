import axios from 'axios';
import {TICKERS_URL} from '../config/utils.js';

export default async function Tickers() {
  try {
    const tickersResponse = await axios.get(TICKERS_URL);
    if (!tickersResponse.data?.result?.list) {
      throw new Error('Invalid tickers response structure');
    }
    const allSymbols = tickersResponse.data.result.list.map(item => item.symbol);
    return allSymbols;
  } catch (error) {
    console.error('Ошибка в tickers.js', error); // лучше добавить сам error для дебага
    
    return [];
  }
}