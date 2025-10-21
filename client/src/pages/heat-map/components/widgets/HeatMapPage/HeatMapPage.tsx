import React, { Suspense } from "react";
import ChartSkeleton from "@/shared/components/Skeleton/ChartSkeleton";
import DashboardSkeleton from "@/shared/components/Skeleton/DashBoardSkeleton";

const HeatMapPage = () => {
    const HeatMapChartLazy = React.lazy(() =>
      import("../HeatMapChart/HeatMapChart")
    );
    const HeatMapDashBoardLazy = React.lazy(() =>
      import("../HeatMapDashBoard/HeatMapDashBoard")
    );
        return (
            <div className="flex h-[90%] bg-cyan-900 w-full ">
                <Suspense fallback={<ChartSkeleton/>}>
                    <HeatMapChartLazy />
                </Suspense>
                <div className="w-50">
                    <Suspense fallback={<DashboardSkeleton/>}>
                        <HeatMapDashBoardLazy/>
                    </Suspense>
                </div>
            </div>
        );
    }

export default HeatMapPage;