// import express from 'express';
// import axios from 'axios';

// const router = express.Router();
// const TICKERS_URL = 'https://api.bybit.com/v5/market/tickers?category=linear';
// let isSocketReady = false;

// app.post('/get-ordersbook', async (req, res) => {
//   try {
//     const response = await axios.get(TICKERS_URL);
//     const list = response.data?.result?.list;

//     if (!Array.isArray(list)) {
//       return res.status(500).json({ error: 'Некорректный формат ответа Bybit' });
//     }

//     if (!isSocketReady) {
//       return res.status(503).json({ error: 'WebSocket ещё не готов' });
//     }

//     const symbols = list.map(item => item.symbol);

//     // Отправляем подписки
//     symbols.forEach((symbol) => {
//       const topic = `orderbook.1.${symbol}`;
//       socket.send(JSON.stringify({
//         op: 'subscribe',
//         args: [topic]
//       }));
//       console.log(`📨 Подписка отправлена на ${topic}`);
//     });

//     res.json({ success: true, message: `Подписались на ${symbols.length} символов` });

//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'Ошибка получения данных' });
//   }
// });

// export default router