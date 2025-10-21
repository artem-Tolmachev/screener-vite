export default function serializeOrderBooks(filtred) {
    
    const result = {};
    for (const [symbol, { bids, asks, time }] of filtred.entries()) {
        result[symbol] = {
            bids: Array.from(bids.entries()),
            asks: Array.from(asks.entries()),
            time
        };
    }

    return result;
}