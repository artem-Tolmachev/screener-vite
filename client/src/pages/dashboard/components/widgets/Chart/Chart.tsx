import { useTimeSortedKlines } from '../../../hooks/useTimeSortedKlines';                       
import { ColorType, MouseEventParams, UTCTimestamp} from 'lightweight-charts';
import { useEffect, useRef, useState} from 'react';
import { useAppDispatch, useAppSelector } from '@/app/store/store';
import TradingInfoPanel from '../TradingInfoPanel/TradingInfoPanel';
import { useRialTimeKlines } from '@/pages/dashboard/hooks/useRialTimeKlines';
import { useGetKlinesQuery } from '@/pages/dashboard/coinData/services/getApiCoins';
import { Kline, Cand, LineData, TrendLine, LineType, HrzLineData } from '@/pages/dashboard/types';
import { DEFAULT_CHART_SETTINGS } from '@/pages/dashboard/coinData/constants/defaultSettings';
import { setuFullscreen, addCustomLine, addLineFlag, updateLinesEdit } from '@/pages/dashboard/coinData/slices/CoinsSlice';
import './styles.module.css';
import DiologRemooveLine from '@/shared/components/Dialog/DiologRemooveLine';

interface Props {
    panelIndex?: number;
}

function Chart({panelIndex}: Props) {
    const [isLine, setIsLine] = useState(false)
    const [lineId, setLineId] = useState<string | null>(null)
    const dispatch = useAppDispatch();
    const lineToolsRef = useRef<any>([]);
    const chartContainerRef = useRef<HTMLDivElement | null>(null);
    const chartInstance = useRef<any>(null);
    const candlestickSeriesRef = useRef<any>(null);
    const histogramSeriesRef = useRef<any>(null);
    const fullSceenChart = useAppSelector(state => state.coins.fullscreenChartId);
    const isLineType = useAppSelector(state => state.coins.flagLine);
    const screenId = useAppSelector(state => state.coins.mainScreen);
    const allScreens = useAppSelector(state => state.coins.allscreens);
    const activeScreen = allScreens.find(el => el.id === screenId);
    if(!activeScreen) return;
    if(panelIndex === undefined) return;
    const activeArray = activeScreen.screens[panelIndex];
    const activeList = activeArray.activeList;
    const activeItem = activeArray.storeList[activeList].item;
    const activeSymbol = activeArray.CoinData.symbol;
    const horzLineOfactiveItemArray = activeItem.find(c => c.symbol === activeSymbol)?.lines;
    const linesOfactiveList = horzLineOfactiveItemArray || [];
    const linesOfDefaultList = activeArray.CoinData.lines;
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

    const memoizedData = data;
    const memoizedVolume = volume;
    const defaultPanelChartData = activeArray.CoinData.id;

// ------ Chart -----------------------------
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
        candlestickSeriesRef.current.setData(memoizedData);
        histogramSeriesRef.current.setData(memoizedVolume);
        return () => {
            Chart.remove();
        }
    }, [chartSettings]);

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
    }, [chartSettings]);
    // --------- newHrzLine --------
    function renderHrzLine(){
        if (!chartInstance.current) return;
            if(activeSymbol === 'BTCUSDT' && !defaultPanelChartData){
                    linesOfDefaultList.forEach(el => {
                        if(el.name === "HorizontalLine"){
                            let price = el.price;
                            let lineData = {price: price, timestamp: el.timestamp}
                            if(chartInstance.current && lineData){
                                const lineTool = chartInstance.current?.addLineTool("HorizontalLine", [lineData], {
                                    id: el.id,
                                    line: {"color": "rgba(41,98,255,1)",
                                        "width": 2,
                                        "style": 0,
                                        "join": "round",
                                        "cap": "square",
                                        "end": {
                                            "left": 0,
                                            "right": 0
                                        },
                                        "extend": {
                                            "right": true,
                                            "left": true
                                        }},
                                    visible: true,
                                    editable: true,
                                });
                            lineToolsRef.current.push({
                                tool: lineTool
                            });  
                            }
                    }
                });
            }else{
                linesOfactiveList.forEach(el => {
                    if(el.name === "HorizontalLine"){
                        let price = el.price;
                        let lineData = {price: price, timestamp: el.timestamp}
                        if(chartInstance.current && lineData){
                            const lineTool = chartInstance.current?.addLineTool("HorizontalLine", [lineData], {
                                id: el.id,
                                line: {
                                    "color": "rgba(41,98,255,1)",
                                    "width": 2,
                                    "style": 0,
                                    "join": "round",
                                    "cap": "square",
                                    "end": {
                                        "left": 0,
                                        "right": 0
                                    },
                                    "extend": {
                                        "right": true,
                                        "left": true
                                    }
                                },
                                visible: true,
                                editable: true,
                            });
                            lineToolsRef.current.push({
                                tool: lineTool
                            });  
                        }  
                    }
                });
            }
    }
    useEffect(() => {
        if (!chartInstance.current) return;
            function newHrzLine(param: MouseEventParams){
            if (!param.point) return;
                const clickedPrice = candlestickSeriesRef.current?.coordinateToPrice(param.point.y);
                const clickedTime = param.time;
                if (clickedPrice == null || clickedTime == null) return;
                const lineId = `hrz-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;

                const hlPrice: number = clickedPrice;
                const hlTS = clickedTime as UTCTimestamp;
                const hlPoint: HrzLineData = {name: "HorizontalLine", price: hlPrice, timestamp: hlTS, id: lineId};
                if(panelIndex === undefined) return
                dispatch(addCustomLine({screenId, hlPoint, panelIndex, lineId}));
                dispatch(addLineFlag(LineType.NONE));

                chartInstance.current.timeScale().setVisibleLogicalRange(
                    chartInstance.current.timeScale().getVisibleLogicalRange()
                );
        }
        if(isLineType.isLineHrz){
            chartInstance.current.subscribeClick(newHrzLine)
        }     
        return () => {
            chartInstance.current.unsubscribeClick(newHrzLine);
        }
    },[chartSettings, isLineType.isLineHrz])
// -------- newTrendLine ------------
    function renderTrendLine(){
        if(chartInstance.current){
            if(activeSymbol === 'BTCUSDT' && !defaultPanelChartData){
                    linesOfDefaultList.forEach(el => {
                        if(el.name === "TrendLine"){
                            const lineTool = chartInstance.current?.addLineTool('TrendLine', el.points.map((p: any) => ({ ...p })), {
                                id: el.id,
                                "line": {
                                    "color": "rgba(41,98,255,1)",
                                    "width": 2,
                                    "style": 0,
                                    "join": "round",
                                    "cap": "square",
                                    "end": {
                                        "left": 0,
                                        "right": 0
                                    },
                                    "extend": {
                                        "right": false,
                                        "left": false
                                    }
                                },         
                                "visible": true,
                                "editable": true,
                            });

                             lineToolsRef.current.push({
                                tool: lineTool
                            });
                        }
                    });
            }else{
                linesOfactiveList.forEach(el => {
                    if(el.name === "TrendLine"){
                        const lineTool = chartInstance.current?.addLineTool('TrendLine', el.points.map((p: any )=> ({ ...p })), {
                            id: el.id,
                                "line": {
                                    "color": "rgba(41,98,255,1)",
                                    "width": 2,
                                    "style": 0,
                                    "join": "round",
                                    "cap": "square",
                                    "end": {
                                        "left": 0,
                                        "right": 0
                                    },
                                    "extend": {
                                        "right": false,
                                        "left": false
                                    }
                                },
                                "visible": true,
                                "editable": true
                            });

                            lineToolsRef.current.push({
                                tool: lineTool
                            });

                    }
                });
            }
        }
    }
    useEffect(() => {
        if (!chartInstance.current) return;
            function newTrendLine(param: MouseEventParams){
            if (!param.point) return;
                const clickedPrice = candlestickSeriesRef.current?.coordinateToPrice(param.point.y);
                const clickedTime = param.time;
                if (clickedPrice == null || clickedTime == null) return;
                const lineId = `trend-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
                const tlPrice1: number = clickedPrice;
                const tlTS1 = clickedTime as UTCTimestamp;
                const tlPoint1 = {price: tlPrice1, timestamp: tlTS1};
                const tlTS2 = (tlTS1 + 100000) as UTCTimestamp
                const tlPrice2 = tlPrice1 + tlPrice1 / 100;
                const tlPoint2 = {price: tlPrice2, timestamp: tlTS2};
                const hlPoint: TrendLine = {name: "TrendLine", points: [tlPoint1, tlPoint2], id: lineId}
                if(panelIndex === undefined) return
                dispatch(addCustomLine({screenId, hlPoint, panelIndex, lineId}));
                dispatch(addLineFlag(LineType.NONE));

                chartInstance.current.timeScale().setVisibleLogicalRange(
                    chartInstance.current.timeScale().getVisibleLogicalRange()
                );
        }
        if(isLineType.isLineTrend){
            chartInstance.current.subscribeClick(newTrendLine)
        }     
        return () => {
            chartInstance.current.unsubscribeClick(newTrendLine);
        }
    },[chartSettings, isLineType.isLineTrend])
// ---------------- newHOrzRay --------
    function renderHrzRay(){
        if (!chartInstance.current) return;
                if(activeSymbol === 'BTCUSDT' && !defaultPanelChartData){
                    linesOfDefaultList.forEach(el => {
                        if(el.name === "HorizontalRay"){
                            let price = el.price;
                            let lineData = {price: price, timestamp: el.timestamp}
                            if(chartInstance.current && lineData){
                                const lineTool = chartInstance.current?.addLineTool("HorizontalRay", [lineData], {
                                    id: el.id,
                                    line: { color: "rgba(41,98,255,1)", width: 2 },
                                    visible: true,
                                    editable: true,
                                });
                                lineToolsRef.current.push({
                                    tool: lineTool
                                }); 
                            } 
                    }
                });
            }else{
                linesOfactiveList.forEach(el => {
                    if(el.name === "HorizontalRay"){
                        let price = el.price;
                        let lineData = {price: price, timestamp: el.timestamp}
                        if(chartInstance.current && lineData){
                            const lineTool = chartInstance.current?.addLineTool("HorizontalRay", [lineData], {
                            id: el.id,
                            line: { color: "rgba(41,98,255,1)", width: 2 },
                            visible: true,
                            editable: true,
                        });
                        lineToolsRef.current.push({
                            tool: lineTool
                        });
                        }    
                    }
                });
            }
    }
    useEffect(() => {
        if (!chartInstance.current) return;
        function newHOrzRay(param: MouseEventParams){
            if (!param.point) return;
            const clickedPrice = candlestickSeriesRef.current?.coordinateToPrice(param.point.y);
            const clickedTime = param.time;
            if (clickedPrice == null || clickedTime == null) return;
            const hlPrice = clickedPrice;
            const hlTS = clickedTime as UTCTimestamp;
            const lineId = `ray-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
            const hlPoint: LineData = {name: "HorizontalRay", price: hlPrice, timestamp: hlTS, id: lineId};
            if(panelIndex === undefined) return
            dispatch(addCustomLine({screenId, hlPoint, panelIndex, lineId}));
            dispatch(addLineFlag(LineType.NONE));

            chartInstance.current.timeScale().setVisibleLogicalRange(
                chartInstance.current.timeScale().getVisibleLogicalRange()
            );
        }
        if(isLineType.isRay){
            chartInstance.current.subscribeClick(newHOrzRay)
        }  
        return () => {
            chartInstance.current.unsubscribeClick(newHOrzRay);
        }
    },[chartSettings, isLineType.isRay])
    // --------  handleChartClick ------
    useEffect(() => {
        if (!chartInstance.current) return;
        const handleChartClick = (param: MouseEventParams) => {
            if (!param.point || !param.time) return;
            const selectedLines = chartInstance.current.getSelectedLineTools();
            if (selectedLines && selectedLines.length > 0) {
                try {
                    const lineData = JSON.parse(selectedLines);
                    if (Array.isArray(lineData) && lineData[0]?.options?.id) {
                        setLineId(lineData[0].options.id);
                        setIsLine(true);
                    }
                } catch (err) {
                    console.error("Ошибка парсинга selectedLines:", err);
                }
            }
        };
        chartInstance.current.subscribeClick(handleChartClick);
        return () => {
            chartInstance.current.unsubscribeClick(handleChartClick);
        };
    }, [chartSettings]);
    //--- handleChartBackgroundClick ---
    useEffect(() => {
    if (!chartInstance.current) return;
    const handleChartBackgroundClick = () => {
        const selected = chartInstance.current.getSelectedLineTools?.();
        let parsed;
        try {
        parsed = typeof selected === 'string' ? JSON.parse(selected) : selected;
        } catch {
        parsed = null;
        }

        if (!parsed || parsed.length === 0) {
        setIsLine(false);
        setLineId(null);
        }
    };
    chartInstance.current.subscribeClick(handleChartBackgroundClick);
    return () => {
        chartInstance.current.unsubscribeClick(handleChartBackgroundClick);
    };
    }, []);

    useEffect(() => {
        if (!chartInstance.current) return;
        chartInstance.current.removeAllLineTools?.();
        renderHrzRay();
        renderTrendLine();
        renderHrzLine();
    }, [linesOfactiveList, linesOfDefaultList, chartSettings]);

    useEffect(() => {
        if (!candlestickSeriesRef.current || !histogramSeriesRef.current) return;
        if (data.length) {

            candlestickSeriesRef.current.setData(data);
        }
        if (volume.length) {
            histogramSeriesRef.current.setData(volume);
        }
    }, [activeList, data, volume, chartSettings]);

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

    useEffect(() => {
    if (!chartInstance.current) return;
        const handleLineEdit = (lineTool: any) => {
            const { selectedLineTool } = lineTool;
            const { toolType: name, options, points} = selectedLineTool;
            const { id: lineId } = options;
            const firstPoint = points[0];
            if (!lineId || !name) return;
            if (!firstPoint) return;
            const { price, timestamp } = firstPoint;
            switch(name){
                case "HorizontalRay": 
                    if (price === undefined || timestamp === undefined) return;
                    dispatch(updateLinesEdit({
                    lineId,
                    screenId,
                    panelIndex,
                    lineObject: {
                        name,
                        id: lineId,
                        price,
                        timestamp,
                    } as LineData
                }));
                break;
                case "HorizontalLine": 
                    if (price === undefined || timestamp === undefined) return;
                    dispatch(updateLinesEdit({
                    lineId,
                    screenId,
                    panelIndex,
                    lineObject: {
                        name,
                        id: lineId,
                        price,
                        timestamp,
                    } as HrzLineData
                }));
                break;
                case "TrendLine": 
                    if (!points) return;
                    dispatch(updateLinesEdit({
                    lineId,
                    screenId, 
                    panelIndex,
                    lineObject: {
                        name,
                        id: lineId,
                        points: points.map((p: any) => ({ ...p }))
                    } as TrendLine
                }));
                break;
                default:
                console.warn(`Не поддерживается линия: ${name}`);
            } 
        };
    chartInstance.current.subscribeLineToolsAfterEdit(handleLineEdit);
    return () => {
        chartInstance.current.unsubscribeLineToolsAfterEdit?.(handleLineEdit);
    };
    }, [chartSettings]);

    return (
        <div className={fullSceenChart === panelIndex ? 'absolute top-0 left-0 h-full w-full z-[9999]' : `section-chart max-w-full w-[100%] h-[100%]`}>
            <div className="wrapper-chart relative w-full h-full rounded-t-[8px] overflow-hidden">
                { isLine 
                    && 
                    <DiologRemooveLine 
                        screenId={screenId} 
                        panelIndex={panelIndex} 
                        lineId={lineId}
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
