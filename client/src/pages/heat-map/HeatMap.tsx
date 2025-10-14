import React, { useEffect, useRef } from "react";
import { ColorType } from 'lightweight-charts';
import { useRialTimeKlines } from "../dashboard/hooks/useRialTimeKlines";
import { useGetCoinsQuery, useGetHeatMapQuery, useGetKlinesQuery } from "../dashboard/coinData/services/getApiCoins";
import { Cand, Kline } from "../dashboard/types";
import { useTimeSortedKlines } from "../dashboard/hooks/useTimeSortedKlines";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { useAppDispatch, useAppSelector } from "@/app/store/store";
import { addHeatMapChart } from "./heapMapData/slices/HeatMapSlice";

const HeatMap = () => {
    const dispatch = useAppDispatch();
    const chartInstance = useRef<any>(null);
    const chartContainerRef = useRef<HTMLDivElement | null>(null);
    const candlestickSeriesRef = useRef<any>(null);
    const histogramSeriesRef = useRef<any>(null);
    const chartSettingsMap = useAppSelector(store => store.heatMap.chartSettings);
    useRialTimeKlines({candlestickSeriesRef});  
    const { data: tickers } = useGetCoinsQuery();
    const tickersData = tickers?.tickers ?? [];
    if(!chartSettingsMap) return;
    
    const { interval, symbol, limit, category } = chartSettingsMap ?? {};

    const { data: klinesData } = useGetKlinesQuery(
    { interval, symbol, limit, category },
    {
        skip: !symbol,
        refetchOnMountOrArgChange: true,
    }
    );

    const dataKlines: Kline[] = [...klinesData?.dataKlines ?? []];
    const dataValume: Cand[] = [...klinesData?.dataValume ?? []];
    const { data, volume } = useTimeSortedKlines({ dataKlines, dataValume });
    const memoizedData = React.useMemo(() => data, [JSON.stringify(data)]);
    const memoizedVolume = React.useMemo(() => volume, [JSON.stringify(volume)]);
    
    const dataHeatMap = useGetHeatMapQuery()
    const HeatMapItemSymbol = dataHeatMap.currentData ? Object.keys(dataHeatMap.currentData) : [];
 
    // function addChart(){
    //     dispatch(addHeatMapChart());
    // }
    const dataHeatMapItem = dataHeatMap.currentData ?? {}

    console.log('dataHeatMap ', dataHeatMapItem[symbol])

    useEffect(() => {
    if (!chartContainerRef.current || !window.LightweightCharts?.createChart) return;
        const Chart = window.LightweightCharts.createChart(chartContainerRef.current);
        const newOptions = {
            layout: {
                textColor: '#000',
                background: { type: ColorType.Solid, color: '#fefff0', fontSize: 20 }
            },
            grid: {
                vertLines: {
                    color: '#5b64a87d',
                    style: 0,
                    visible: true,
                },
                horzLines: {
                    color: '#5b64a87d',
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
        Chart.applyOptions(newOptions);
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
        return () => {
            Chart.remove();
        }
    }, [chartSettingsMap]);

    useEffect(() => {
        if (!candlestickSeriesRef.current || !histogramSeriesRef.current) return;
        if (memoizedData.length) {
            candlestickSeriesRef.current.setData(memoizedData);
        }
        if (memoizedVolume.length) {
            histogramSeriesRef.current.setData(memoizedVolume);
        }
    }, [memoizedData, memoizedVolume]);

// --------------------------------------------------

// useEffect(() => {
//     if(!candlestickSeriesRef.current) return;
//     dataHeatMapItem[symbol].forEach(data => {
//         const tlPrice1 = data.price;
//         const tlTS1 = data.from / 1000 as UTCTimestamp;
//         const tlPoint1 = {price: tlPrice1, timestamp: tlTS1};

//         const tlTS2 = Date.parse('2019-04-15') / 1000;
//         const tlPoint2 = {price: tlPrice1, timestamp: tlTS2};
//     })

//     const lineTool = chartInstance.current?.addLineTool('TrendLine', [tlPoint1, tlPoint2], {
//     "line": {
//         "color": "rgba(41,98,255,1)",
//         "width": 2,
//         "style": 0,
//         "join": "round",
//         "cap": "square",
//         "end": {
//             "left": 0,
//             "right": 0
//         },
//         "extend": {
//             "right": false,
//             "left": false
//         }
//     },
//     "visible": true,
//     "editable": true
//     });
// }, [symbol, chartSettingsMap])
    // if (isLoading) {
    //     return <DashboardSkeleton />;
    // }

    // if (!tickersData) {
    //     return <DashboardSkeleton />;
    // }



    return (
        <ResizablePanelGroup direction='horizontal' className="pl-1 pb-1 min-h-0 flex-1">
            <ResizablePanel>
                <div className="flex-1 w-full h-full">
                    <div className="wrapper-chart relative w-full h-full overflow-hidden">
                        <div ref={chartContainerRef} className="w-[100%] h-full"></div>
                    </div>
                </div>
            </ResizablePanel>
            <ResizableHandle className={"data-[panel-group-direction=vertical]:h-1 data-[panel-group-direction=horizontal]:w-1 border-2 border-blue-700"}/>
            <ResizablePanel>
                <div className="bg-gray-400  h-full py-1 overflow-y-auto">
                    {HeatMapItemSymbol.map(symbol => (
                        <div 
                            key={symbol}
                            className="flex bg-gray-500 p-1 mt-1 "
                            onClick={() => dispatch(addHeatMapChart({symbol}))}
                            >
                            <div>{symbol}</div>
                        </div>
                    ))}
                </div>
            </ResizablePanel>
        </ResizablePanelGroup>
    );
}
export default HeatMap;




