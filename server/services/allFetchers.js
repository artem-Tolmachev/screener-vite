import axios from 'axios';
import { TICKERS_URL } from '../config/utils.js';

export async function allFetchers() {
  const response = await axios.get(TICKERS_URL);

  if (!response) {
    throw new Error('Invalid tickers response structure');
  }
  return response;
}
