import * as React from 'react';
import { useTimeSortedKlines } from '../../../hooks/useTimeSortedKlines';
import { CandlestickSeries, ColorType, createChart, HistogramSeries, } from 'lightweight-charts';
import { useEffect, useRef } from 'react';
import { useAppSelector } from '@/app/store/store';
import TradingInfoPanel from '../TradingInfoPanel/TradingInfoPanel';
import { useRialTimeKlines } from '@/pages/dashboard/hooks/useRialTimeKlines';
import { useGetKlinesQuery } from '@/pages/dashboard/coinData/services/getApiCoins';
import { Kline, Cand, Candlestick, InitiaLChartSettings } from '@/pages/dashboard/types';

function Chart() {
    const chart = useRef<HTMLDivElement | null>(null);
    const chartInstance = useRef<ReturnType<typeof createChart> | null>(null);
    let candlestickSeriesRef = useRef<Candlestick | null>(null);
 
    useRialTimeKlines(candlestickSeriesRef);
    const chartSettings = useAppSelector<InitiaLChartSettings>((store) => store.coins.chartSettings);
    const { data: klinesData} = useGetKlinesQuery(chartSettings, { refetchOnMountOrArgChange: true });

    const dataKlines: Kline[] = [...klinesData?.dataKlines ?? []];
    const dataValume: Cand[] = [...klinesData?.dataValume ?? []];

    const { data, volume } = useTimeSortedKlines({ dataKlines, dataValume });
    const memoizedData = React.useMemo(() => data, [JSON.stringify(data)]);
    const memoizedVolume = React.useMemo(() => volume, [JSON.stringify(volume)]);

    useEffect(() => {
        if (!chart.current) return;
        const chartOptions = {
            layout: {
                textColor: '#fff',
                background: { type: ColorType.Solid, color: '#131722', fontSize: 20 }
            },
            grid: {
                vertLines: {
                    color: 'rgba(255,255,255,0.1)',
                    style: 0,
                    visible: true,
                },
                horzLines: {
                    color: 'rgba(255,255,255,0.1)',
                    style: 0,
                    visible: true,
                },
                autoSize: true,
                // -----------
            }
        };
        const Chart = createChart(chart.current, chartOptions);
        chartInstance.current = Chart;
        const histogramSeries = Chart.addSeries(HistogramSeries, {
            priceFormat: {
                type: 'volume'
            },
            priceScaleId: '',
            color: '#26a69a'
        });

        histogramSeries.priceScale().applyOptions({
            scaleMargins: {
                top: 0.9,
                bottom: 0
            }
        });

        histogramSeries.setData(volume);

        const candlestick = Chart.addSeries(CandlestickSeries, { upColor: '#26a69a', downColor: '#ef5350', borderVisible: false, wickUpColor: '#26a69a', wickDownColor: '#ef5350' });

        candlestickSeriesRef.current = candlestick;

        if (candlestick)
            candlestick.setData(data ?? []);

        Chart.timeScale().fitContent();
        
        return () => {
            Chart.remove();
        }
    }, [memoizedData, memoizedVolume])

    useEffect(() => {
	if (!chart.current || !chartInstance.current) return;

	const resizeObserver = new ResizeObserver(entries => {
		for (const entry of entries) {
			const { width, height } = entry.contentRect;
			chartInstance.current?.resize(width, height);
		}
	});

	resizeObserver.observe(chart.current);

	return () => resizeObserver.disconnect();
    }, []);
    return (

        <div className="section-chart max-w-full w-[100%] h-[100%] px-1">
            <div className="wrapper-chart relative w-full h-full rounded-t-[8px] overflow-hidden">
                <TradingInfoPanel />
                <div ref={chart} className="w-[100%] h-[500px]">
                </div>
            </div>
        </div>

    )
}

export default Chart;
