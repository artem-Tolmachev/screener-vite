import { UTCTimestamp } from 'lightweight-charts';
import { useEffect } from 'react';
import { Candlestick } from '../types';
import { useAppSelector } from '@/app/store/store';

export const useRialTimeKlines = (candlestickRef: React.RefObject<Candlestick>) => {
  let pingInterval: ReturnType<typeof setInterval>;
  const {interval, symbol} = useAppSelector((store) => store.coins.chartSettings);

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

    socket.onmessage = (evt) => {
    const msg = JSON.parse(evt.data);

    switch (true) {
        case msg.topic?.startsWith('kline'):
        if (msg.data) {
            const c = msg.data[0];
            candlestickRef.current?.update({
            time: Math.floor(c.start / 1000) as UTCTimestamp,
            open: +c.open,
            high: +c.high,
            low: +c.low,
            close: +c.close,
            });
        }
        break;
        case msg.topic?.startsWith('orderbook'):
        if (msg.type === 'snapshot' || msg.type === 'delta') {
            // console.log(msg)
            // dispatch(updateOrderBook(msg)); // свой слайс стакана
        }
        break;
        }
    };

    return () => {
        if (pingInterval) clearInterval(pingInterval);
        socket.close();
    }
  }, [candlestickRef, interval, symbol]);
};
