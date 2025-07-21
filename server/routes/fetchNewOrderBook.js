import express from 'express';
import loadOrderState from '../storage/loadOrderState.js';
import serializeOrderBooks from '../helpers/serializeOrderBooks.js';
import timeRanger from '../helpers/timeRanger.js';

const router = express.Router();

router.get('/new-orders', (req, res) => {
        const ordersbook = loadOrderState()
        const isRange = timeRanger(ordersbook);
        const result = serializeOrderBooks(isRange);
        res.json(result);
})

export default router;