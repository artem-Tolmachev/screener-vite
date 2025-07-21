export default async function topicsFetcher(allSymbols, socket){
    const topics = allSymbols
    .map(symbol => `orderbook.50.${symbol}`);
    const chunkSize = 10;
    for (let i = 0; i < topics.length; i += chunkSize) {
        const chunk = topics.slice(i, i + chunkSize);
        socket.send(JSON.stringify({
        op: 'subscribe',
        args: chunk
    }));
        await new Promise(r => setTimeout(r, 200));
    }
}