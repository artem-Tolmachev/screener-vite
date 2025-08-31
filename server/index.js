import express from 'express';
import cors from 'cors';

import klines from './routes/klines.js';
import futures from './routes/futures.js';
import fetchNewOrderBook from './routes/fetchNewOrderBook.js';
import fetchNewHeatMap from './routes/fetchNewHeatMap.js'
import fetchTickersForOrderBook from './routes/fetchTickersForOrderBook.js'
import OrdersBook from './ws/ordersBook.js';

const PORT = process.env.PORT || 5000;
const app = express();
app.use(express.json());

// app.use(cors({
//   origin: (origin, callback) => {
//     const allowedOrigins = ['http://localhost:5173', 'https://screener-vite.vercel.app'];
//     if (!origin || allowedOrigins.includes(origin)) {
//       callback(null, true);
//     } else {
//       callback(new Error('Not allowed by CORS'));
//     }
//   }
// }));

app.use(cors({
  origin: ['https://screener-vite.vercel.app'], 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true, // если нужны куки или авторизация
}));


app.use('/api', futures);
app.use('/api', klines);
app.use('/api', fetchNewOrderBook);
app.use('/api', fetchNewHeatMap)
app.use('/api', fetchTickersForOrderBook)

OrdersBook(app);

app.listen(PORT, () => console.log(`🟢 Сервер стартовал на http://localhost:${PORT}`));