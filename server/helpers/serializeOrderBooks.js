export default function serializeOrderBooks(orderBooks) {
    
    const result = {};
    for (const [symbol, { bids, asks, time }] of orderBooks.entries()) {
        result[symbol] = {
            bids: Array.from(bids.entries()), // [[price, volume], ...]
            asks: Array.from(asks.entries()),
            time
        };
    }

    return result;
}