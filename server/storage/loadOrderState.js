import fs from 'fs';
import path from 'path';

export default function loadOrderState() {
  const orderBooks = new Map();
  const filePath = path.resolve('storage/store/orderState.json');
  
  if (fs.existsSync(filePath)) {
    const json = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    for (const symbol in json) {
      if(json[symbol].time)
      orderBooks.set(symbol, {
        bids: new Map(json[symbol].bids),
        asks: new Map(json[symbol].asks),
        time: json[symbol].time 
      });
    }
  }  

  return orderBooks;
}