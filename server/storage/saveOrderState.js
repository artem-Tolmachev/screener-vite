import  fs from 'fs';

export default function saveOrderState(orderBooks) {
  const json = {};
  for (const [symbol, { bids, asks, time }] of orderBooks.entries()) {
    json[symbol] = {
      bids: Array.from(bids.entries()),
      asks: Array.from(asks.entries()),
      time
    };
  };
  fs.writeFileSync('server/store/orderState.json', JSON.stringify(json, null, 2));
}
