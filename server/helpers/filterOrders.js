import { allFetchers } from "../services/allFetchers.js";


export default async function filterOrders(orderBooks, minValue, range, spredDistance){

  const now = Date.now();
  const result = new Map();
  const timeRange = range;

  const tickersResponse = await allFetchers();

  for (const [symbol, book] of orderBooks.entries()) {
    if (book.time > now - timeRange) continue; 

    const allTikcersInTarget = tickersResponse.data?.result?.list.find(ticker => ticker.symbol === symbol)
    const currentPriceOfBid = allTikcersInTarget.bid1Price;
    const currentPriceOfAsk = allTikcersInTarget.ask1Price;

    const bids = [...book.bids.entries()].filter(([price, qty]) =>
      (Number(price) * Number(qty) >= minValue &&
        (Math.abs(price - currentPriceOfBid) / currentPriceOfBid * 100) <= spredDistance
      )
    )
  

    const asks = [...book.asks.entries()].filter(([price, qty]) =>
      (Number(price) * Number(qty) >= minValue &&
        (Math.abs(price - currentPriceOfAsk) / currentPriceOfAsk * 100) <= spredDistance
      )
    );

    if (bids.length === 0 && asks.length === 0) continue;

    result.set(symbol, {
      bids: new Map(bids),
      asks: new Map(asks),
      time: book.time
    });
  }

  return result;
}
