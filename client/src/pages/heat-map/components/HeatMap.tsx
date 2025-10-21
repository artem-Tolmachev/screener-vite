import HeatMapPage from "./widgets/HeatMapPage/HeatMapPage";
import HeatMapHeader from "./widgets/HetMapHeader/HeatMapHeader";

const HeatMap = () => {
    return(
        <div className="flex flex-col min-h-0 flex-1 bg-blue-950">
            <HeatMapHeader/>
            <HeatMapPage/>
        </div>
    )
}
export default HeatMap;