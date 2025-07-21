// import { useEffect, useMemo, useState } from "react"
// import { MarketData } from "types";
// import { getFutures } from "../api/getFutures";

// export const useTickers = () => {
//     const [tickers, setTickers] = useState<MarketData[]>([]);
  
//     useEffect(() => {
//         const coins = localStorage.getItem('tickers');
//         if(coins){
//             setTickers(JSON.parse(coins))
//         }
//         const loadTicker = async () => {
//             let data = await getFutures()
            
//             if(data && Array.isArray(data)){
//                 setTickers(data)
//                 localStorage.setItem('tickers', JSON.stringify(data))
//             }
//         }        
//         loadTicker()
//     }, [])

//       return tickers;
// }