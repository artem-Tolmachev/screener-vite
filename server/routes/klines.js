import express from 'express';
import axios from 'axios';
import { BASE_URL } from '../config/utils.js';

const router = express.Router();

router.get('/get-klines', async (req, res) => {
  const requiredParams = ['category', 'symbol', 'interval', 'limit'];
  for (let param of requiredParams) {
    if (!req.query[param]) {
      return res.status(400).json({ error: `Missing query parameter: ${param}` });
    }
  }
  try {
    const {_t, ...paramsRtk} = req.query;
    const response = await axios.get(BASE_URL, {
      params: {
        category: paramsRtk.category,
        symbol: paramsRtk.symbol,
        interval: paramsRtk.interval,
        start: paramsRtk.start,
        limit: paramsRtk.limit,
      },
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;