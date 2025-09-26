import * as React from 'react';
import { useTimeSortedKlines } from '../../../hooks/useTimeSortedKlines';                       
import { ColorType, MouseEventParams, UTCTimestamp} from 'lightweight-charts';
import { useEffect, useRef, useState} from 'react';
import { useAppDispatch, useAppSelector } from '@/app/store/store';
import TradingInfoPanel from '../TradingInfoPanel/TradingInfoPanel';
import { useRialTimeKlines } from '@/pages/dashboard/hooks/useRialTimeKlines';
import { useGetKlinesQuery } from '@/pages/dashboard/coinData/services/getApiCoins';
import { Kline, Cand } from '@/pages/dashboard/types';
import { DEFAULT_CHART_SETTINGS } from '@/pages/dashboard/coinData/constants/defaultSettings';
import { setuFullscreen, addHorzLine, addLineFlag } from '@/pages/dashboard/coinData/slices/CoinsSlice';
import './styles.module.css';
import DiologRemooveLine from '@/shared/components/Dialog/DiologRemooveLine';

interface Props {
    panelIndex: number;
}

function Chart({panelIndex}: Props) {
    const [isLine, setIsLine] = useState(false)
    const [checkedLine, setCheckedLine] = useState<number | null>(null)
    const dispatch = useAppDispatch();
    const lineToolsRef = useRef<any>([]);
    const chartContainerRef = useRef<HTMLDivElement | null>(null);
    const chartInstance = useRef<any>(null);
    const candlestickSeriesRef = useRef<any>(null);
    const histogramSeriesRef = useRef<any>(null);
    const fullSceenChart = useAppSelector(state => state.coins.fullscreenChartId);
    const isHrzLine = useAppSelector(state => state.coins.flagLine);
    const screenId = useAppSelector(state => state.coins.mainScreen);
    const allScreens = useAppSelector(state => state.coins.allscreens);
    const activeScreen = allScreens.find(el => el.id === screenId);
    if(!activeScreen) return;
    const activeArray = activeScreen.screens[panelIndex];
    const activeList = activeArray.activeList;
    const activeItem = activeArray.storeList[activeList].item;
    const activeSymbol = activeArray.CoinData.symbol;
    const horzLineOfactiveItemArray = activeItem.find(c => c.symbol === activeSymbol)?.lines;
    const horzLineOfactiveItems = horzLineOfactiveItemArray || [];
    const horzLineOfDefaultCoin = activeArray.CoinData.lines;
    if(!activeArray) return;
    const chartSettings = activeArray?.chartSettings;
    if(!chartSettings) return;
    
    useRialTimeKlines({candlestickSeriesRef, panelIndex});
    const { data: klinesData } = useGetKlinesQuery( 
        chartSettings ?? DEFAULT_CHART_SETTINGS, {
        skip: !chartSettings, 
        refetchOnMountOrArgChange: true,
    });

    const dataKlines: Kline[] = [...klinesData?.dataKlines ?? []];
    const dataValume: Cand[] = [...klinesData?.dataValume ?? []];
    const { data, volume } = useTimeSortedKlines({ dataKlines, dataValume });
    const memoizedData = React.useMemo(() => data, [JSON.stringify(data)]);
    const memoizedVolume = React.useMemo(() => volume, [JSON.stringify(volume)]);
    const defaultPanelChartData = activeArray.CoinData.id;
    
    useEffect(() => {
    if (!chartContainerRef.current || !window.LightweightCharts?.createChart) return;
        const Chart = window.LightweightCharts.createChart(chartContainerRef.current);
        const newOptions = {
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
            },
            timeScale: {
                rightOffset: 12,
                barSpacing: 3,
                minBarSpacing: 2,
                fixLeftEdge: true,
                fixRightEdge: true,
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
        renderLines()
        return () => {
            Chart.remove();
        }
    }, [chartSettings]);

    useEffect(() => {
        if (!chartInstance.current) return;
        function newHOrzLine(param: MouseEventParams){
            if (!param.point) return;
                const clickedPrice = candlestickSeriesRef.current.coordinateToPrice(param.point.y);
                const clickedTime = param.time;
                if (clickedPrice == null || clickedTime == null) return;
                    const hlPrice = clickedPrice;
                    const hlTS = clickedTime as UTCTimestamp;
                    const hlPoint = {price: hlPrice, timestamp: hlTS};
                    dispatch(addHorzLine({screenId, hlPoint, panelIndex}));
                    dispatch(addLineFlag(false));
                    chartInstance.current.timeScale().setVisibleLogicalRange(
                        chartInstance.current.timeScale().getVisibleLogicalRange()
                    );
            }
        if(isHrzLine){
            chartInstance.current.subscribeClick(newHOrzLine)
        }
        return () => {
            chartInstance.current.unsubscribeClick(newHOrzLine);
        }
    }, [isHrzLine, chartSettings])

    useEffect(() => { 
        if (!chartInstance.current) return;
        const findClosestLine = (
            clickedPrice: number,
            clickedTime: number,
            lines: any[]
        ) => {
        if (!lines || lines.length === 0) return null;
        const validLines = lines.filter(line => clickedTime >= line.tool.Rg.Ls[0].timestamp);
            if (validLines.length === 0) return null;
            return validLines.reduce((closest: any, current: any) => {
                const currentDiff = Math.abs(clickedPrice - current.tool.Rg.Ls[0].price);
                const closestDiff = Math.abs(clickedPrice - closest.tool.Rg.Ls[0].price);
                return currentDiff < closestDiff ? current : closest;
            });
    };

    const isClickNearLine = (clickedY: number, linePrice: number, thresholdPx = 5) => {
        const lineY = candlestickSeriesRef.current.priceToCoordinate(linePrice);
        if (lineY == null) return false;
        return Math.abs(clickedY - lineY) <= thresholdPx;
    };

    const handleChartClick = (param: MouseEventParams) => {
        if (!param.point || !param.time) return;

        const clickedPrice = candlestickSeriesRef.current.coordinateToPrice(param.point.y);
        const clickedY = param.point.y;
        const clickedTime = param.time as number;

        const closestLine = findClosestLine(clickedPrice, clickedTime, lineToolsRef.current);
        if (closestLine) {
        const linePrice = closestLine.tool.Rg.Ls[0].price;
        if (isClickNearLine(clickedY, linePrice)) {
                setIsLine(true)
                setCheckedLine(linePrice)
            }else{
                setIsLine(false)
            }
        }
    };

    chartInstance.current.subscribeClick(handleChartClick);
    return () => chartInstance.current.unsubscribeClick(handleChartClick);
    }, [lineToolsRef.current, horzLineOfactiveItems, isLine]);

    function renderLines(){
        if(chartInstance.current){
            chartInstance.current.removeAllLineTools?.();
                if(activeSymbol === 'BTCUSDT' && !defaultPanelChartData){
                    horzLineOfDefaultCoin.forEach(el => {
                    let lineTool = chartInstance.current.addLineTool("HorizontalRay", [el], {
                        line: { color: "rgba(245,166,35,1)", width: 1 },
                        visible: true,
                        editable: true,
                    });
                    lineToolsRef.current.push({
                        tool: lineTool
                    });   
                });
            }else{
                horzLineOfactiveItems.forEach(el => {
                let lineTool = chartInstance.current.addLineTool("HorizontalRay", [el], {
                        line: { color: "rgba(245,166,35,1)", width: 1 },
                        visible: true,
                        editable: true,
                    });
                    lineToolsRef.current.push({
                        tool: lineTool
                    });    
                });
            }
        }
    }

    useEffect(() => {
        renderLines();
    }, [horzLineOfactiveItems]);

    useEffect(() => {
        if (candlestickSeriesRef.current && memoizedData) {
            candlestickSeriesRef.current.setData(memoizedData);
        }
    }, [memoizedData]);

    useEffect(() => {
        if (histogramSeriesRef.current && memoizedVolume) {
            histogramSeriesRef.current.setData(memoizedVolume);
        }
    }, [memoizedVolume]);

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
                { isLine 
                    && 
                    <DiologRemooveLine 
                        screenId={screenId} 
                        panelIndex= {panelIndex} 
                        checkedLine={checkedLine}
                        setIsLine={setIsLine}
                    />
                }
                <TradingInfoPanel panelIndex={panelIndex}/>
                <div ref={chartContainerRef} className="chart-wr w-[100%] h-full"></div>
            </div>
        </div>

    )
}

export default Chart;
