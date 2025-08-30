import * as React from 'react';
import { useTimeSortedKlines } from '../../../hooks/useTimeSortedKlines';
import { CandlestickSeries, ColorType, createChart, HistogramSeries, } from 'lightweight-charts';
import { useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/store/store';
import TradingInfoPanel from '../TradingInfoPanel/TradingInfoPanel';
import { useRialTimeKlines } from '@/pages/dashboard/hooks/useRialTimeKlines';
import { useGetKlinesQuery } from '@/pages/dashboard/coinData/services/getApiCoins';
import { Kline, Cand, Candlestick } from '@/pages/dashboard/types';
import { DEFAULT_CHART_SETTINGS } from '@/pages/dashboard/coinData/constants/defaultSettings';
import { setuFullscreen } from '@/pages/dashboard/coinData/slices/CoinsSlice';
import './styles.module.css';

interface Props {
    panelIndex: number;
}

function Chart({panelIndex}: Props) {
    const dispatch = useAppDispatch();
    const chart = useRef<HTMLDivElement | null>(null);
    const chartInstance = useRef<ReturnType<typeof createChart> | null>(null);
    let candlestickSeriesRef = useRef<Candlestick | null>(null);
    const fullSceenChart = useAppSelector(state => state.coins.fullscreenChartId);
    
    const screenId = useAppSelector(state => state.coins.mainScreen);
    const allScreens = useAppSelector(state => state.coins.allscreens);
    const activeScreen = allScreens.find(el => el.id === screenId);

    if(!activeScreen) return;
    const activeArray = activeScreen.screens[panelIndex];

    if(!activeArray) return;
    const chartSettings = activeArray?.chartSettings;
    if(!chartSettings) return;

    useRialTimeKlines({candlestickSeriesRef, panelIndex});

    const { data: klinesData } = useGetKlinesQuery(chartSettings ?? DEFAULT_CHART_SETTINGS, {
        skip: !chartSettings, 
        refetchOnMountOrArgChange: true,
    });

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
    }, [memoizedData, memoizedVolume, chartSettings])

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

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                if(fullSceenChart === panelIndex){
                    dispatch(setuFullscreen(null))
                }
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [fullSceenChart]);

    return (
        <div className={fullSceenChart === panelIndex ? 'absolute top-0 left-0 h-full w-full z-[9999]' : `section-chart max-w-full w-[100%] h-[100%]`}>
            <div className="wrapper-chart relative w-full h-full rounded-t-[8px] overflow-hidden">
                <TradingInfoPanel panelIndex={panelIndex}/>
                    <div ref={chart} className="chart-wr w-[100%] h-full">
                </div>
            </div>
        </div>

    )
}

export default Chart;
