import express from 'express';
import axios from 'axios';
import {TICKERS_URL } from '../config/utils.js';

const router = express.Router();

router.get('/get-futures', async (req, res) => {
  try {
    // 1. Получаем список всех символов
    const tickersResponse = await axios.get(TICKERS_URL);
    if (!tickersResponse.data?.result?.list) {
      throw new Error('Invalid tickers response structure');
    }
    const allSymbols = tickersResponse.data?.result?.list.map(item => item.symbol);
    const defaultCoin = tickersResponse.data?.result?.list?.find((ticker) => ticker.symbol === 'BTCUSDT');  
  
    res.json({
      tickers: tickersResponse.data?.result?.list, // Переименовываем для ясности
      btcData: defaultCoin
    });
  } catch (error) {
    console.error('Global error:', error);
    res.status(500).json({
      error: error instanceof Error ? error.message : 'Unknown error',
      details: error.response?.data ?? null
    });
  }
});

export default router;