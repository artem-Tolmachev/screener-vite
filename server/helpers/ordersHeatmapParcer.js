// export default function ordersHeatmapParcer(order) {
//     const json = {}
//     const asks = order.data.a || [];
//     const bids = order.data.b || [];
//     const asksAndBids = [...asks, ...bids];

//     // json[order.data.s] = {
//     //     time: +order.ts / 1000,
//     //     cells: asksAndBids.map(arr => ({
//     //         low: +arr[0],
//     //         high: +arr[0] / 2,
//     //         amount: +arr[1] * +arr[0],
//     //     }))
//     // };
    
//     json[order.data.s] = {
//         time: +order.ts / 1000,
//         cells: asksAndBids.map(arr => ({
//             low: +arr[0],
//             high: +arr[0] / 2,
//             amount: +arr[1] * +arr[0],
//         }))
//     };
//     return json;
// }

// [
//   {
//     "topic": "orderbook.50.BTCUSDT",
//     "type": "delta",
//     "ts": 1751381198379,
//     "data": {
//       "s": "BTCUSDT",
//       "b": [
//         ["105772.00", "5.207"],
//         ["105770.50", "0.090"],
//       ],
//       "a": [
//         ["105772.10", "9.589"],
//         ["105777.30", "0.561"],
//       ],
//       "u": 46175540,
//       "seq": 423823598845
//     },
//     "cts": 1751381198377
//   }
// ]
