import express from 'express';
import loadOrderState from '../storage/loadOrderState.js';
import filterOrders from '../helpers/filterOrders.js';
import serializeOrderBooks from '../helpers/serializeOrderBooks.js';
const router = express.Router();

router.post('/new-orders', async (req, res) => {
        const orderBooks = loadOrderState()
        const minValue = Number(req.body.minValue) || 50000;
        const range = Number(req.body.range) || 1800000;
        const spredDistance = Number(req.body.distance) || 0.5;
        const filtred = await filterOrders(orderBooks, minValue, range, spredDistance); 
        const result = serializeOrderBooks(filtred);
        res.json(result);
})

export default router;