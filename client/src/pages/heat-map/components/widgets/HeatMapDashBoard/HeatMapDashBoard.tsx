import { useAppDispatch } from "@/app/store/store";
import { useGetHeatMapSymbolsQuery } from "@/pages/dashboard/coinData/services/getApiCoins";
import { addHeatMapChart } from "@/pages/heat-map/heapMapData/slices/HeatMapSlice";

const HeatMapDashBoard = () => {
    const { data: symbols, isLoading: isSymbolsLoading } = useGetHeatMapSymbolsQuery();
    const dispatch = useAppDispatch();

    function addTicker(ticker: string){
        dispatch(addHeatMapChart({ticker}))
    }

    return (
        <div className="pt-5 h-full bg-gray-900 border-l-1 border-l-gray-500">
            <div className="h-full py-1 overflow-y-auto w-full p-2 [scrollbar-width:none]">
                {symbols?.map(ticker => (
                    <div 
                        key={ticker}
                        className="flex p-1 mt-1 cursor-pointer items-center flex-wrap text-gray-100 border-t-1 border-t-gray-500"
                        onClick={() => addTicker(ticker)}>
                        <span className="text-[12px]">{ticker}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default HeatMapDashBoard;
