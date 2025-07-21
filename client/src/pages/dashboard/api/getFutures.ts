// import axios from 'axios';
// import {tickerParser} from '../utilse/Parser';
// import { MarketData } from '../../../types/index';

// export const getFutures = async (
//     ): Promise< any | undefined > => {
//     let dataTicker: MarketData[] = [];
//     try {
//         const {data}= await axios.get('http://localhost:5000/get-futures');
//         const list = data?.result?.list || [];
//         dataTicker = tickerParser(list)
//     } catch (error: any) {
//         console.log('Ошибка на клиенте ' + error.message)
//     }
    
//     return dataTicker
// }
