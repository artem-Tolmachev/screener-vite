import { UTCTimestamp } from 'lightweight-charts';
import { useEffect } from 'react';
import { Candlestick } from '../types';
import { useAppSelector } from '@/app/store/store';

export interface BybitKline {
  start: string;
  end: string;
  interval: string;
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
  turnover: string;
  confirm: boolean;
  timestamp: string;
}

interface Props {
  candlestickSeriesRef: React.RefObject<Candlestick>;
  panelIndex: number;
}

export const useRialTimeKlines = ({candlestickSeriesRef, panelIndex}: Props) => {
  let pingInterval: ReturnType<typeof setInterval>;
  const screenId = useAppSelector(state => state.coins.mainScreen);
  const allScreens = useAppSelector(state => state.coins.allscreens);    
  const ativeArray = allScreens.find(el => el.id === screenId);
  // const panelIndex = useAppSelector(state => state.coins.panelIndex);   
  if(!ativeArray) return;
  const chartSettingsArrayScreens = ativeArray?.screens;
  if(!chartSettingsArrayScreens) return;
  const chartSettings = chartSettingsArrayScreens[panelIndex].chartSettings
  if(!chartSettings) return;
  const {interval, symbol } = chartSettings;

  useEffect(() => {

    const socket = new WebSocket('wss://stream.bybit.com/v5/public/linear');
    
    const topic = [
        `kline.${interval}.${symbol}`,
        `orderbook.${'1'}.${'BTCUSDT'}`,
    ];

        socket.onopen = () => {
        console.log('🔗 WebSocket подключен');
        socket.send(JSON.stringify({
            op: 'subscribe',
            args: topic
        }));

      pingInterval = setInterval(() => {
        socket.send(JSON.stringify({
          req_id: Date.now().toString(),
          op: 'ping'
        }));
      }, 20000);
    };

    // socket.onmessage = (evt) => {
    // const msg = JSON.parse(evt.data);

    // switch (true) {
    //     case msg.topic?.startsWith('kline'):
    //     if (msg.data) {
    //         const c = msg.data[0];
    //         candlestickRef.current?.update({
    //         time: Math.floor(c.start / 1000) as UTCTimestamp,
    //         open: +c.open,
    //         high: +c.high,
    //         low: +c.low,
    //         close: +c.close,
    //         });
    //     }
    //     break;
    //     case msg.topic?.startsWith('orderbook'):
    //     if (msg.type === 'snapshot' || msg.type === 'delta') {
    //         // console.log(msg)
    //         // dispatch(updateOrderBook(msg)); // свой слайс стакана
    //     }
    //     break;
    //     }
    // };

      socket.onmessage = (evt) => {
  const msg = JSON.parse(evt.data);

  // --- Свечи (klines) ---
  if (msg.topic?.startsWith('kline') && msg.data) {
    const klines: BybitKline[] = Array.isArray(msg.data) ? msg.data : [msg.data];

    klines.forEach((c: BybitKline) => {
      const start = Number(c.start);

      candlestickSeriesRef.current?.update({
        time: Math.floor(start / 1000) as UTCTimestamp,
        open: Number(c.open),
        high: Number(c.high),
        low: Number(c.low),
        close: Number(c.close),
      });
    });
  }

  // --- Стакан (orderbook) ---
  if (msg.topic?.startsWith('orderbook')) {
    if (msg.type === 'snapshot' || msg.type === 'delta') {
      // TODO: тут можно диспатчить обновление в Redux
    }
  }
};


    return () => {
        if (pingInterval) clearInterval(pingInterval);
        socket.close();
    }
  }, [candlestickSeriesRef, interval, symbol, panelIndex]);

//   useEffect(() => {
//     const socket = new WebSocket('wss://stream.bybit.com/v5/public/linear');
//     let pingInterval: NodeJS.Timeout;

//     const topic = [
//       `kline.${interval}.${symbol}`,
//       `orderbook.1.${symbol}`,
//     ];

//     socket.onopen = () => {
//       console.log('🔗 WebSocket подключен');
//       socket.send(JSON.stringify({
//         op: 'subscribe',
//         args: topic,
//       }));

//       pingInterval = setInterval(() => {
//         socket.send('ping');
//       }, 20000);
//   };

//   socket.onmessage = (evt) => {
//     const msg = JSON.parse(evt.data);

//     switch (true) {
//       case msg.topic?.startsWith('kline'):
//         if (msg.data) {
//           const c = msg.data[0];
//           candlestickRef.current?.update({
//             time: Math.floor(c.start / 1000) as UTCTimestamp,
//             open: +c.open,
//             high: +c.high,
//             low: +c.low,
//             close: +c.close,
//           });
//         }
//         break;
//       case msg.topic?.startsWith('orderbook'):
//         if (msg.type === 'snapshot' || msg.type === 'delta') {
//           // console.log(msg);
//         }
//         break;
//     }
//   };

//   return () => {
//     if (pingInterval) clearInterval(pingInterval);
//     socket.close();
//   };
// }, [candlestickRef, interval, symbol]);

};
