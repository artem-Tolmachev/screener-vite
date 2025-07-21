import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import React, { Suspense } from "react";
import ChartSkeleton  from "@/shared/components/Skeleton/ChartSkeleton";
import DashboardSkeleton from "@/shared/components/Skeleton/DashBoardSkeleton";

function DashboardPage(){
    const Chart = React.lazy(() => import("@/pages/dashboard/components/widgets/Chart/Chart"));
    const DashboardQuotesSidebar = React.lazy(() => import("@/pages/dashboard/components/widgets/DashboardQuotesSidebar/DashboardQuotesSidebar"));
    return(
        <ResizablePanelGroup direction="horizontal" className="max-w-full rounded-lg border md:min-w-[450px]">
            <ResizablePanel  defaultSize={50}>
                <Suspense fallback={<ChartSkeleton/>}>
                    <Chart/>
                </Suspense>
            </ResizablePanel>
            <ResizableHandle />
            <ResizablePanel>
                <Suspense fallback={<DashboardSkeleton/>}>
                    <DashboardQuotesSidebar/>
                </Suspense>
            </ResizablePanel>
        </ResizablePanelGroup>
    )
}

export default DashboardPage;
