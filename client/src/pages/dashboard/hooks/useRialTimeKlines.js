import { useEffect } from 'react';
import { useAppSelector } from '@/app/store/store';
export const useRialTimeKlines = ({ candlestickSeriesRef, panelIndex }) => {
    let pingInterval;
    const screenId = useAppSelector(state => state.coins.mainScreen);
    const allScreens = useAppSelector(state => state.coins.allscreens);
    const ativeArray = allScreens.find(el => el.id === screenId);
    if (!ativeArray)
        return;
    const chartSettingsArrayScreens = ativeArray?.screens;
    if (!chartSettingsArrayScreens)
        return;
    const chartSettings = chartSettingsArrayScreens[panelIndex].chartSettings;
    if (!chartSettings)
        return;
    const { interval, symbol } = chartSettings;
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
            if (msg.topic?.startsWith('kline') && msg.data) {
                const klines = Array.isArray(msg.data) ? msg.data : [msg.data];
                klines.forEach((c) => {
                    const start = Number(c.start);
                    candlestickSeriesRef.current?.update({
                        time: Math.floor(start / 1000),
                        open: Number(c.open),
                        high: Number(c.high),
                        low: Number(c.low),
                        close: Number(c.close),
                    });
                });
            }
            if (msg.topic?.startsWith('orderbook')) {
                if (msg.type === 'snapshot' || msg.type === 'delta') {
                    // TODO: тут можно диспатчить обновление в Redux
                }
            }
        };
        return () => {
            if (pingInterval)
                clearInterval(pingInterval);
            socket.close();
        };
    }, [candlestickSeriesRef, interval, symbol, panelIndex]);
};
