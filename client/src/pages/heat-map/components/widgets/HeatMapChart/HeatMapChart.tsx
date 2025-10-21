import { useEffect, useRef, useState } from "react";
import { ColorType, UTCTimestamp} from 'lightweight-charts';
import { useRialTimeKlines } from "@/pages/dashboard/hooks/useRialTimeKlines";
import { useAppSelector } from "@/app/store/store";
import { Cand, Kline } from "@/pages/dashboard/types";
import { useTimeSortedKlines } from "@/pages/dashboard/hooks/useTimeSortedKlines";
import { useGetHeatMapQuery, useGetKlinesQuery} from "@/pages/dashboard/coinData/services/getApiCoins";

const HeatMapChart = () => {
    const chartInstance = useRef<any>(null);
    const chartContainerRef = useRef<HTMLDivElement | null>(null);
    const candlestickSeriesRef = useRef<any>(null);
    const histogramSeriesRef = useRef<any>(null);
    const chartSettingsMap = useAppSelector(store => store.heatMap.chartSettings);
    useRialTimeKlines({candlestickSeriesRef});  
    const heatMapSeriesRef = useRef<any>(null);

    const [allLineIsLoaded, setLineIsLoaded] = useState(false);

    if(!chartSettingsMap) return;
    
    const { interval, symbol, limit, category } = chartSettingsMap ?? {};

    const { data: klinesData, isFetching: isKlines } = useGetKlinesQuery(
        { interval, symbol, limit, category }, { skip: !symbol, refetchOnMountOrArgChange: true }
    );

    const dataKlines: Kline[] = [...klinesData?.dataKlines ?? []];
    const dataValume: Cand[] = [...klinesData?.dataValume ?? []];
    const { data, volume } = useTimeSortedKlines({ dataKlines, dataValume });
    
    const memoizedData = data;
    const memoizedVolume = volume;

    // const { data: heatMapData, isFetching } = useGetHeatMapQuery(symbol, {
    //     skip: !symbol
    // });

    useEffect(() => {
    if (!chartContainerRef.current || !window.LightweightCharts?.createChart) return;
        const Chart = window.LightweightCharts.createChart(chartContainerRef.current);
        chartInstance.current = Chart;

        candlestickSeriesRef.current = chartInstance.current.addCandlestickSeries();
        histogramSeriesRef.current = chartInstance.current.addHistogramSeries({
            priceFormat: { type: 'volume' },
            priceScaleId: 'volume',
            color: '#26a69a',
        });
        histogramSeriesRef.current.priceScale().applyOptions({
            scaleMargins: { top: 0.9, bottom: 0 },
        });
        histogramSeriesRef.current.setData(volume);
        candlestickSeriesRef.current.setData(data);
        return () => {
            Chart.remove();
        }
    }, []);

    useEffect(() => {
        if (!chartInstance.current) return;
        const newOptions = {
            layout: {
                textColor: '#fff',
                background: { type: ColorType.Solid, color: '#101828', fontSize: 20 }
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
            },
            timeScale: {
                rightOffset: 12,
                barSpacing: 3,
                minBarSpacing: 2,
                fixLeftEdge: true,
                fixRightEdge: false,
            },
        };
        chartInstance.current.applyOptions(newOptions);
    }, [chartSettingsMap]);
        
// useEffect(() => {
//   if (!symbol || !heatMapData || !chartInstance.current) return;
//   const symbolData = heatMapData[symbol];
//   if (!symbolData) return;

//   let isCancelled = false;
//   const chunkSize = 3; 
//   let i = 0;

//   const drawChunk = () => {
//     const start = performance.now();
//     const end = Math.min(i + chunkSize, symbolData.length);
//     for (; i < end; i++) {
//       if (isCancelled) return;
//       const data = symbolData[i];
//       const tlPrice1 = data.price;
//       const tlTS1 = data.from as UTCTimestamp;
//       const tlPoint1 = { price: tlPrice1, timestamp: tlTS1 };
//       const tlTS2 = data.to ? Number(data.to) as UTCTimestamp : Math.floor(Date.now() / 1000) as UTCTimestamp;
//       const tlPoint2 = { price: tlPrice1, timestamp: tlTS2 };

//       let line = chartInstance.current?.addLineTool('HeatMapLine', [tlPoint1, tlPoint2], {
//         line: {
//           color: "rgba(41,98,255,0.5)",
//           width: 2,
//           style: 0,
//           join: "round",
//           cap: "square",
//         },
//         visible: true,
//         editable: false,
//       });
//     }

//     if (performance.now() - start > 40) {
//         console.warn('Чанк выполняется слишком долго, уменьшайте chunkSize');
//     }
//     if (i < symbolData.length) {
//       requestIdleCallback(drawChunk);
//     }
//     if(i === symbolData.length && chartInstance.current?.timeScale()){
//         chartInstance.current.timeScale().setVisibleLogicalRange(
//             chartInstance.current.timeScale().getVisibleLogicalRange()
//         );
//         setLineIsLoaded(false);
//     }
//   };
//   setLineIsLoaded(true);
//   console.log('setLineIsLoaded ', allLineIsLoaded)
//   requestIdleCallback(drawChunk);
//   return () => {
//     isCancelled = true;
//   };
// }, [symbol, heatMapData]);


// useEffect(() => {
//   if (!symbol || !heatMapData || !chartInstance.current) return;
//   const symbolData = heatMapData[symbol];
//   if (!symbolData) return;

//   console.log(symbol)
//   let isCancelled = false;
//   const chunkSize = 3; 
//   let i = 0;

//   const drawChunk = () => {
//     const end = Math.min(i + chunkSize, symbolData.length);

//     for (; i < end; i++) {
//       if (isCancelled) return;
//         const data = symbolData[i];
//         const tlTS2 = data.to ? Number(data.to) as UTCTimestamp : Math.floor(Date.now() / 1000) as UTCTimestamp;
//         let series = chartInstance.current.addLineSeries({
//             color: 'rgba(41,98,255,0.5)',
//             lineWidth: 2,
//         });

//         const allPoints = [];
//         const priceOffset = tlTS2 + (i % 100) * 0.001;
        
//         allPoints.push(
//             { time: data.from as UTCTimestamp, value: data.price },
//             { time: priceOffset as UTCTimestamp, value: data.price }
//         );

//         series.setData(allPoints);
//         series.applyOptions({
//             priceLineVisible: false,
//             lastValueVisible: false,
//         });
//     }

//     if (i < symbolData.length) {
//       requestIdleCallback(drawChunk);
//     }
//     if(i === symbolData.length && chartInstance.current?.timeScale()){
//         chartInstance.current.timeScale().setVisibleLogicalRange(
//             chartInstance.current.timeScale().getVisibleLogicalRange()
//         );
//     }
//   };
//   requestIdleCallback(drawChunk);
//   return () => {
//     isCancelled = true;
//   };
// }, [symbol, heatMapData]);

    useEffect(() => {
        if (!candlestickSeriesRef.current || !histogramSeriesRef.current) return;
        if (memoizedData.length) {
            candlestickSeriesRef.current.setData(memoizedData);
        }
        
        if (memoizedVolume.length) {
            histogramSeriesRef.current.setData(memoizedVolume);
        }

    }, [memoizedData, memoizedVolume, symbol]);

    useEffect(() => {
        if (!chartContainerRef.current || !chartInstance.current) return;
            const resizeObserver = new ResizeObserver(entries => {
                for (const entry of entries) {
                    const { width, height } = entry.contentRect;
                    chartInstance.current?.resize(width, height);
                }
        });
            resizeObserver.observe(chartContainerRef.current);
        return () => {
            resizeObserver.disconnect()
        }
    }, []);

        return (
            <div className={`h-full !important max-w-full w-[100%]`}>
                <div className="h-full !important relative w-full h-full overflow-hidden">
                {allLineIsLoaded && klinesData &&
                    <div className="absolute inset-0 flex items-center justify-center z-50">
                        <svg className="animate-spin h-8 w-8 text-blue-400" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                        </svg>
                    </div>
                    }
                    <div ref={chartContainerRef} className="w-[100%] h-full"></div>
                </div>
            </div>
        );
    }

export default HeatMapChart;