import express from 'express';
import { updetePriceParcer } from '../helpers/updetePriceParcer.js';
const router = express.Router();

router.post('/update-ticker', async (req, res) => {
        const items = req.body
        const category = 'linear';
        const results = await Promise.all(
            items.map(symbol =>
                fetch(`https://api.bybit.com/v5/market/tickers?category=${category}&symbol=${symbol}`)
                .then(res => res.json())
            )
        );
        const result = updetePriceParcer(results)
        res.json(result);
})

export default router;