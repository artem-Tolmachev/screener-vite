import { match } from 'assert';
import  fs from 'fs';
const json = {};

function Parser(symbol, order, time, side) {
  if (!json[symbol]) {
    json[symbol] = [];
  }
  if (!order || order.length === 0) {
    return
  }
  for (const [price, volume] of order) {
    // если ордер был исполнен добавляем поле to: время исполнения
    const floatPrice = parseFloat(price);
    const existing = json[symbol].find(entry =>
      Math.abs(entry.price - floatPrice) < 0.0000001 && entry.side === side && !entry.to
    );

    if (existing) {
      // Ордер исполнился, ставим дату окончания
      existing.to = Math.floor(time);
    } else {
      // Новый ордер, добавляем
      json[symbol].push({
        price: floatPrice,
        volume: parseFloat(price) * parseFloat(volume),
        from: Math.floor(time),
        side: side
      });
    }
  }  
}

export default function saveHeatMapData(orderBooks) {
  if (!orderBooks?.data?.b || !orderBooks?.data?.a) {
    console.log('[OrderBookData] пропуск некорректного пакета:', orderBooks);
    return;
  }
  const bids = orderBooks.data.b;
  const asks = orderBooks.data.a;
  const time = +orderBooks.ts / 1000;
  const symbol = orderBooks.data.s;

  let rengeUsdt = 150000

  for (const [price, volume] of bids){
      if((price * volume) < rengeUsdt) return
  }
  for (const [price, volume] of asks){
      if((price * volume) < rengeUsdt) return
  }
  
  Parser(symbol, bids, time, 'bids');
  Parser(symbol, asks, time, 'asks');

  fs.writeFileSync('storage/store/heatMap.json', JSON.stringify(json, null, 2));
}

