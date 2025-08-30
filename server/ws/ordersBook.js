import { WebSocket } from 'ws';
import Tickers from '../services/tickers.js';
import filterOrders from '../helpers/filterOrders.js';
// import orderbookSaver from '../storage/orderbookSaver.js';
import topicsFetcher from '../ws/topicsFetcher.js';
import updateOrderbook from '../helpers/updateOrderbook.js';
import saveOrderState from '../storage/saveOrderState.js';
import saveHeatMapData from '../storage/saveHeatMapData.js';
export default async function OrdersBook(app) {
    const orderBooks = new Map(); // Для хранения последних состояний

    const allSymbols = await Tickers();
    let socket = new WebSocket('wss://stream.bybit.com/v5/public/linear');
    function setupSocketHandlers(ws) {
        ws.on('open', async () => {
            console.log('Подключено к Bybit');
            await topicsFetcher(allSymbols, ws);
            // Пинг каждые 20 секунд
            setInterval(() => {
                if (ws.readyState === WebSocket.OPEN) {
                    ws.send(JSON.stringify({
                        op: 'ping',
                        req_id: Date.now().toString()
                    }));
                }
            }, 20000);
        });

        ws.on('message', (data) => {
            let order;
            try {
                order = JSON.parse(data);
                // const orders = filterOrders(order);
                if (!order) return;
                // сохраняем данные в  .log
                // orderbookSaver(order)
                // saveHeatMapData(order)
                if (!order?.data?.s) {
                    // console.warn('⚠️ Пропущено сообщение без data.s:', order);
                    return;
                }
                const symbol = order.data.s;
                const time = order.ts;

                if(!orderBooks.has(symbol)){
                    orderBooks.set(symbol, { bids: new Map(order.data.b), asks: new Map(order.data.a), time});
                }else{
                    // Раскоментировать для поступления новых ордеров           
                    // const book = orderBooks.get(orders.data.s);
                    // updateOrderbook(book.bids, orders.data.b); // обновляем bids
                    // updateOrderbook(book.asks, orders.data.a); // обновляем asks
                    // book.time = time;
                }
                // Игнорируем служебные сообщения
                if (order.op === 'pong' || order.op === 'subscribe') return;
                if (!order.data || !order.data.b || !order.data.a) return;                
            } catch(error) {
                console.log('Ошибка обработки ордера:', error);
            }
        });

        ws.on('error', (err) => {
            console.error('WebSocket ошибка:', err.message);
        });
        
        ws.on('close', () => {
            console.log('Соединение с Bybit закрыто, переподключаемся...');
            setTimeout(() => {
                socket = new WebSocket('wss://stream.bybit.com/v5/public/linear');
                setupSocketHandlers(socket);
            }, 5000);
        });
    }
    // сохраняем Map в стейт
        setInterval(() => {
            // Раскоментировать для поступления новых ордеров      
            // saveOrderState(orderBooks); 
            // saveHeatMap(orderBooks)
        }, 5000); 
    setupSocketHandlers(socket);
}