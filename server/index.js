import express from 'express';
import cors from 'cors';

import klines from './routes/klines.js';
import futures from './routes/futures.js';
import fetchNewOrderBook from './routes/fetchNewOrderBook.js';
import fetchNewHeatMap from './routes/fetchNewHeatMap.js'
import OrdersBook from './ws/ordersBook.js';

const PORT = process.env.PORT || 5000;
const app = express();
app.use(express.json());
app.use(cors({ origin: 'http://localhost:5173' }));

app.use('/api', futures);
app.use('/api', klines);
app.use('/api', fetchNewOrderBook);
app.use('/api', fetchNewHeatMap)

OrdersBook(app);

app.listen(PORT, () => console.log(`🟢 Сервер стартовал на http://localhost:${PORT}`));