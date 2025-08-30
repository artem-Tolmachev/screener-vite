export function updetePriceParcer(responseArray){
   const responses = responseArray
    const mergedList = responses.flatMap(item => item.result?.list ?? []);

    const data = mergedList.map(item => 
        ({
            symbol: item.symbol,
            bid1Price: item.bid1Price,
            ask1Price: item.ask1Price
        })
    )

    return data;
}
