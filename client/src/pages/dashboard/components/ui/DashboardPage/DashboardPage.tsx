import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup
}from "@/components/ui/resizable";

import React, { Suspense } from "react";
import ChartSkeleton  from "@/shared/components/Skeleton/ChartSkeleton";
import DashboardSkeleton from "@/shared/components/Skeleton/DashBoardSkeleton";
import DashboardSettingsPanel from "../DashboardSettingsPanel/DashboardSettingsPanel";
import { useControlerSettingsButtons } from "@/pages/dashboard/hooks/useControlerSettingsButtons";
import { setActivePanelIndex } from "@/pages/dashboard/coinData/slices/CoinsSlice";
import { useAppDispatch } from "@/app/store/store";

const ChartLazy = React.lazy(() =>
  import("@/pages/dashboard/components/widgets/Chart/Chart")
);

const DashboardQuotesSidebarLazy = React.lazy(() =>
  import(
    "@/pages/dashboard/components/widgets/DashboardQuotesSidebar/DashboardQuotesSidebar"
  )
);

function DashboardPage(){
  const controler = useControlerSettingsButtons();
  const dispatch = useAppDispatch()
  if (!controler || !controler.layout) {
    return <div>Loading...</div>; // Или другой индикатор загрузки
  }
  
  if(!controler) return;
  const {screensDataArray, screenId, isActiveList, togglePanel, toggle, screens, direction, layout, greed, screenIndex} = controler

  const { rows, col, side } = layout || {};

  if (!screensDataArray || !isActiveList) {
    return <div>Loading data...</div>;
  }
  return (
    <>
      {
        rows ? (
          <ResizablePanelGroup direction={direction} className="pl-1 pb-1 min-h-0 flex-1">
            <ResizablePanel>
              <ResizablePanelGroup direction={direction} className="pt-0">
                {Array.from({ length: screens }).map((_, outerIndex) => {
                  const panelIndex = outerIndex;
                  return (
                    <React.Fragment key={`outer-fragment-${outerIndex}`}>
                      <ResizablePanel
                        key={`outer-main-panel-${outerIndex}`}
                        id={`outer-main-panel-${outerIndex}`}
                        order={outerIndex}
                        onMouseEnter={() => toggle(panelIndex, screenId)}
                      >
                        <ResizablePanelGroup
                          key={`outer-main-panel-groop-${outerIndex}`}
                          direction="horizontal"
                          className="pt-0"
                          onClick={() => dispatch(setActivePanelIndex(panelIndex))}
                        >
                          <ResizablePanel
                            key={`outer-chart4-${outerIndex}`}
                            id={`outer-chart4-${outerIndex}`}
                            order={outerIndex * 10 + 1}
                            defaultSize={isActiveList[panelIndex] ? 50 : 100}
                            className='p-0'
                          >
                            <Suspense fallback={<ChartSkeleton />}>
                              <ChartLazy panelIndex={panelIndex} />
                            </Suspense>
                          </ResizablePanel>
                        {isActiveList[panelIndex] && (
                          <>
                            <ResizableHandle className={`data-[panel-group-direction=vertical]:h-1 data-[panel-group-direction=horizontal]:w-1 ${screenIndex === panelIndex ? "border-2 border-blue-700" : "border-transparent border-2"}`}/>
                            <ResizablePanel
                              key={`outer-dashboard-${outerIndex}`}
                              id={`outer-dashboard-${outerIndex}`}
                              order={outerIndex * 10 + 2}
                            >
                              <Suspense fallback={<DashboardSkeleton/>}>
                                <DashboardQuotesSidebarLazy 
                                //  selectedCoin={selectedCoin}
                                  isActive={isActiveList[panelIndex]}
                                  panelIndex={panelIndex}
                                  screensDataArray={screensDataArray}
                                />
                              </Suspense>
                            </ResizablePanel>
                          </>)
                        }
                          <DashboardSettingsPanel
                            onCLick={() => togglePanel(panelIndex)}
                            isActive={isActiveList[panelIndex]}
                          />
                        </ResizablePanelGroup>
                      </ResizablePanel>
                      {(rows && screens > 1 && screens - 1 > outerIndex) && <ResizableHandle className="data-[panel-group-direction=vertical]:h-1 data-[panel-group-direction=horizontal]:w-1" />}
                    </React.Fragment>
                  );
                })}
              </ResizablePanelGroup>
            </ResizablePanel>
          </ResizablePanelGroup>
          ) : col && side === "left" ? (
            <ResizablePanelGroup direction="horizontal" className="pl-1 pb-1">
              <ResizablePanel>
                <ResizablePanelGroup direction="vertical" className="pt-0">
                  {Array.from({ length: screens - 1 }).map((_, outerIndex) => {
                    const panelIndex = outerIndex;
                    return (
                      <React.Fragment  key={`outer-fragment-left-${outerIndex}`}>
                        <ResizablePanel
                          key={`outer-main-panel-${outerIndex}`}
                          id={`outer-main-panel-left-${outerIndex}`}
                          order={outerIndex * 10 + 3}
                          onMouseEnter={() => toggle(panelIndex, screenId)}
                        >
                          <ResizablePanelGroup 
                            direction="horizontal" 
                            className="pt-0 cursor-pointer"
                            onClick={() => dispatch(setActivePanelIndex(panelIndex))}
                            >
                            <ResizablePanel
                              key={`outer-chart2-${outerIndex}`}
                              id={`outer-chart2-${outerIndex}`}
                              order={outerIndex * 10 + 4}
                              defaultSize={isActiveList[panelIndex] ? 40 : 100}
                            >
                              <Suspense fallback={<ChartSkeleton />}>
                                <ChartLazy panelIndex={panelIndex}/>
                              </Suspense>
                            </ResizablePanel>
                            {isActiveList[panelIndex] && <>
                              <ResizableHandle className={`data-[panel-group-direction=vertical]:h-1 data-[panel-group-direction=horizontal]:w-1 ${screenIndex === panelIndex ? "border-2 border-blue-700" : "border-transparent border-2"}`}/>
                              <ResizablePanel
                                key={`outer-dashboard-${outerIndex}`}
                                id={`outer-dashboard-left-${outerIndex}`}
                                order={outerIndex * 10 + 5}
                            >
                              <Suspense fallback={<DashboardSkeleton />}>
                                <DashboardQuotesSidebarLazy 
                                  // selectedCoin={selectedCoin}
                                  isActive={isActiveList[panelIndex]}
                                  panelIndex={panelIndex}
                                  screensDataArray={screensDataArray}
                                />
                              </Suspense>
                            </ResizablePanel>
                            </>}
                            <DashboardSettingsPanel
                              onCLick={() => togglePanel(panelIndex)}
                              isActive={isActiveList[panelIndex]}
                            />
                          </ResizablePanelGroup>
                        </ResizablePanel>
                        {(col > 1 && outerIndex < col - 1) && <ResizableHandle className="data-[panel-group-direction=vertical]:h-1 data-[panel-group-direction=horizontal]:w-1"/>}
                      </React.Fragment>
                    );
                  })}
                </ResizablePanelGroup>
              </ResizablePanel>
          <ResizableHandle className={`data-[panel-group-direction=vertical]:h-1 data-[panel-group-direction=horizontal]:w-1`}/>
              <ResizablePanel 
                onMouseEnter={() => toggle((screens - 1), screenId)}
              >
                <ResizablePanelGroup  
                  direction="horizontal"
                  className="pt-0 cursor-pointer"
                  onClick={() => dispatch(setActivePanelIndex(screens - 1))}
                 >
                  <ResizablePanel>
                    <Suspense fallback={<ChartSkeleton />}>
                      <ChartLazy panelIndex={screens - 1}/>
                    </Suspense>
                  </ResizablePanel>
                  {isActiveList[screens - 1] && <>
                  <ResizableHandle className={`data-[panel-group-direction=vertical]:h-1 data-[panel-group-direction=horizontal]:w-1 ${screenIndex === screens - 1 ? "border-2 border-blue-700" : "border-transparent border-2"}`}/>
                    <ResizablePanel>
                    <Suspense fallback={<DashboardSkeleton />}>
                      <DashboardQuotesSidebarLazy
                      isActive={isActiveList[screens - 1]} 
                      // selectedCoin={selectedCoin}
                      screensDataArray={screensDataArray}
                      panelIndex={screens - 1}
                      />
                    </Suspense>
                  </ResizablePanel>
                  </>}
                  <DashboardSettingsPanel
                    onCLick={() => togglePanel(screens - 1)}
                    isActive={isActiveList[screens - 1]}
                  />
                </ResizablePanelGroup>
              </ResizablePanel>
            </ResizablePanelGroup>
          ) : col && side === "right" ? (
            <ResizablePanelGroup direction="horizontal" className="pl-1 pb-1">
              <ResizablePanel onMouseEnter={() => toggle((screens - 1), screenId)}>
                <ResizablePanelGroup direction="horizontal" className="pt-0 cursor-pointer" onClick={() => dispatch(setActivePanelIndex(screens - 1))}>
                  <ResizablePanel >
                    <Suspense fallback={<ChartSkeleton />}>
                      <ChartLazy panelIndex={screens - 1}/>
                    </Suspense>
                  </ResizablePanel>
                  {isActiveList[screens - 1] && <>
                    <ResizableHandle className={`data-[panel-group-direction=vertical]:h-1 data-[panel-group-direction=horizontal]:w-1 ${screenIndex === screens - 1 ? "border-2 border-blue-700" : "border-transparent border-2"}`}/>
                    <ResizablePanel>
                      <Suspense fallback={<DashboardSkeleton />}>
                        <DashboardQuotesSidebarLazy
                          // selectedCoin={selectedCoin}
                          isActive={isActiveList[screens - 1]}
                          panelIndex={screens - 1}
                          screensDataArray={screensDataArray}
                        />
                      </Suspense>
                    </ResizablePanel>
                  </>}
                  <DashboardSettingsPanel
                    onCLick={() => togglePanel(screens - 1)}
                    isActive={isActiveList[screens - 1]}
                  />
                </ResizablePanelGroup>
              </ResizablePanel>
              <ResizableHandle className="data-[panel-group-direction=vertical]:h-1 data-[panel-group-direction=horizontal]:w-1" />
              <ResizablePanel>
                <ResizablePanelGroup direction="vertical" className="pt-0">
                  {Array.from({ length: screens - 1}).map((_, outerIndex) => {
                    const panelIndex = outerIndex;
                    return (
                      <React.Fragment key={`outer-fragment-right${outerIndex}`}>
                        <ResizablePanel
                          key={`outer-main-panel-right-${outerIndex}`}
                          id={`outer-main-panel-right-${outerIndex}`}
                          order={outerIndex * 10 + 6}
                          onMouseEnter={() => toggle(panelIndex, screenId)}
                        >
                          <ResizablePanelGroup 
                          direction="horizontal" 
                          className="pt-0 cursor-pointer"
                          onClick={() => dispatch(setActivePanelIndex(panelIndex))}
                          >
                            <ResizablePanel
                              key={`outer-chart1-${outerIndex}`}
                              id={`outer-chart1-right-${outerIndex}`}
                              order={outerIndex * 10 + 7}
                            >
                              <Suspense fallback={<ChartSkeleton />}>
                                <ChartLazy panelIndex={panelIndex}/>
                              </Suspense>
                            </ResizablePanel>
                            {isActiveList[panelIndex] && <>
                              <ResizableHandle className={`data-[panel-group-direction=vertical]:h-1 data-[panel-group-direction=horizontal]:w-1 ${screenIndex === panelIndex ? "border-2 border-blue-700" : "border-transparent border-2"}`}/>
                              <ResizablePanel
                              key={`outer-dashboard-${outerIndex}`}
                              id={`outer-dashboard-right-${outerIndex}`}
                              order={outerIndex * 10 + 8}
                            >
                              <Suspense fallback={<DashboardSkeleton />}>
                                <DashboardQuotesSidebarLazy 
                                  // selectedCoin={selectedCoin}
                                  isActive={isActiveList[panelIndex]}
                                  panelIndex={panelIndex}
                                  screensDataArray={screensDataArray}
                                />
                              </Suspense>
                            </ResizablePanel>
                            </>}
                            <DashboardSettingsPanel
                              onCLick={() => togglePanel(panelIndex)}
                              isActive={isActiveList[panelIndex]}
                            />
                          </ResizablePanelGroup>
                        </ResizablePanel>
                        {(screens > 1 && outerIndex < (screens - 2) ) && <ResizableHandle className="data-[panel-group-direction=vertical]:h-1 data-[panel-group-direction=horizontal]:w-1" />}
                      </React.Fragment>
                    );
                  })}
                </ResizablePanelGroup>
              </ResizablePanel>
            </ResizablePanelGroup>
          ) : col && side === "top" ? (
            <ResizablePanelGroup direction="vertical" className="pl-1 pb-1">
              <ResizablePanel>
                <ResizablePanelGroup direction="horizontal" className="pt-0">
                  {Array.from({ length: col }).map((_, outerIndex) => {
                    const panelIndex = outerIndex;
                    return (
                      <React.Fragment key={`outer-fragment-top-${outerIndex}`}>
                        <ResizablePanel 
                          className="panel-top"
                          onMouseEnter={() => toggle(panelIndex, screenId)}
                        >
                          <ResizablePanelGroup 
                          direction="horizontal" 
                          className="pt-0 cursor-pointer"
                          onClick={() => dispatch(setActivePanelIndex(panelIndex))}
                          >
                          <ResizablePanel
                            key={`outer-${outerIndex}`}
                            id={`outer-top-${outerIndex}`}
                            order={outerIndex * 10 + 9}
                          >

                          <Suspense fallback={<ChartSkeleton />}>
                            <ChartLazy panelIndex={panelIndex}/>
                          </Suspense>
                          </ResizablePanel>
                          {isActiveList[panelIndex] && <>
                          <ResizableHandle className={`data-[panel-group-direction=vertical]:h-1 data-[panel-group-direction=horizontal]:w-1 ${screenIndex === panelIndex ? "border-2 border-blue-700" : "border-transparent border-2"}`}/>
                          <ResizablePanel
                          key={`outer-dashboard-${outerIndex}`}
                          id={`outer-dashboard-top-${outerIndex}`}
                          order={outerIndex * 10 + 10}
                        >
                          <Suspense fallback={<DashboardSkeleton />}>
                            <DashboardQuotesSidebarLazy 
                              // selectedCoin={selectedCoin}
                              isActive={isActiveList[panelIndex]}
                              panelIndex={panelIndex}
                              screensDataArray={screensDataArray}
                            />
                          </Suspense>
                        </ResizablePanel>
                          </>}
                        <DashboardSettingsPanel
                          
                          onCLick={() => togglePanel(panelIndex)}
                          isActive={isActiveList[panelIndex]}
                        />
                          </ResizablePanelGroup>
                        </ResizablePanel>
                        {(col > 1 && outerIndex < col - 1) && (
                          <ResizableHandle key={`handle-outer-${outerIndex}`} className="data-[panel-group-direction=vertical]:h-1 data-[panel-group-direction=horizontal]:w-1" />
                        )}
                      </React.Fragment>
                    );
                  })}
                </ResizablePanelGroup>
              </ResizablePanel>
              <ResizableHandle className="data-[panel-group-direction=vertical]:h-1 data-[panel-group-direction=horizontal]:w-1"/>
              <ResizablePanel onMouseEnter={() => toggle((screens - 1), screenId)}>
                <ResizablePanelGroup 
                  direction="horizontal" 
                  className="pt-0 cursor-pointer"
                  onClick={() => dispatch(setActivePanelIndex(screens - 1))}
                  >
                  <ResizablePanel>
                    <Suspense fallback={<ChartSkeleton />}>
                      <ChartLazy panelIndex={screens - 1}/>
                    </Suspense>
                  </ResizablePanel>
                  {isActiveList[screens - 1] && <>
                      <ResizableHandle className={`data-[panel-group-direction=vertical]:h-1 data-[panel-group-direction=horizontal]:w-1 ${screenIndex === screens - 1 ? "border-2 border-blue-700" : "border-transparent border-2"}`}/>
                  <ResizablePanel>
                    <Suspense fallback={<DashboardSkeleton />}>
                      <DashboardQuotesSidebarLazy 
                        // selectedCoin={selectedCoin}
                        isActive={isActiveList[screens - 1]}
                        panelIndex={screens - 1}
                        screensDataArray={screensDataArray}
                      />
                    </Suspense>
                  </ResizablePanel>
                  </>
                  }
                  <DashboardSettingsPanel
                    
                    onCLick={() => togglePanel(screens - 1)}
                    isActive={isActiveList[screens - 1]}
                  />
                </ResizablePanelGroup>
              </ResizablePanel>
            </ResizablePanelGroup>
          ) : col && side === "bottom" ? (
            <ResizablePanelGroup direction="vertical" className="pl-1 pb-1">
              <ResizablePanel onMouseEnter={() => toggle((screens - 1), screenId)}>
                <ResizablePanelGroup 
                  direction="horizontal" 
                  className="pt-0 cursor-pointer"
                  onClick={() => dispatch(setActivePanelIndex(screens - 1))}
                  >
                  <ResizablePanel>
                    <Suspense fallback={<ChartSkeleton />}>
                      <ChartLazy panelIndex={screens - 1}/>
                    </Suspense>
                  </ResizablePanel>
                  {isActiveList[screens - 1] && <>
                    <ResizableHandle className={`data-[panel-group-direction=vertical]:h-1 data-[panel-group-direction=horizontal]:w-1 ${screenIndex === screens - 1 ? "border-2 border-blue-700" : "border-transparent border-2"}`}/>
                  <ResizablePanel>
                    <Suspense fallback={<DashboardSkeleton />}>
                      <DashboardQuotesSidebarLazy 
                        // selectedCoin={selectedCoin}
                        isActive={isActiveList[screens - 1]}
                        panelIndex={screens - 1}
                        screensDataArray={screensDataArray}
                      />
                    </Suspense>
                  </ResizablePanel>
                  </>}
                  <DashboardSettingsPanel
                    onCLick={() => togglePanel(screens - 1)}
                    isActive={isActiveList[screens - 1]}
                  />
                </ResizablePanelGroup>
              </ResizablePanel>
              <ResizableHandle className="data-[panel-group-direction=vertical]:h-1 data-[panel-group-direction=horizontal]:w-1" />
              <ResizablePanel>
                <ResizablePanelGroup direction="horizontal" className="pt-0">
                  {Array.from({ length: col }).map((_, outerIndex) => {
                    const panelIndex = outerIndex;
                    return (
                      <React.Fragment key={`outer-fragment-bottom-${outerIndex}`}>
                        <ResizablePanel 
                        onMouseEnter={() => toggle(panelIndex, screenId)}
                        className="panel-bottom"
                        >
                          <ResizablePanelGroup 
                            direction="horizontal" 
                            className="pt-0 cursor-pointer"
                            onClick={() => dispatch(setActivePanelIndex(panelIndex))}
                            >
                          <ResizablePanel
                            key={`outer-${outerIndex}`}
                            id={`outer-bottom-${outerIndex}`}
                            order={outerIndex * 10 + 11}
                        >
                          <Suspense fallback={<ChartSkeleton />}>
                            <ChartLazy panelIndex={panelIndex}/>
                          </Suspense>
                        </ResizablePanel>
                        {isActiveList[panelIndex] && <>
                        <ResizableHandle className={`data-[panel-group-direction=vertical]:h-1 data-[panel-group-direction=horizontal]:w-1 ${screenIndex === panelIndex ? "border-2 border-blue-700" : "border-transparent border-2"}`}/>
                        <ResizablePanel
                          key={`outer-dashboard-${outerIndex}`}
                          id={`outer-dashboard-bottom-${outerIndex}`}
                          order={outerIndex * 10 + 12}
                        >
                          <Suspense fallback={<DashboardSkeleton />}>
                            <DashboardQuotesSidebarLazy 
                              // selectedCoin={selectedCoin}
                              isActive={isActiveList[panelIndex]}
                              panelIndex={panelIndex}
                              screensDataArray={screensDataArray}
                            />
                          </Suspense>
                        </ResizablePanel>
                        </>}
                        <DashboardSettingsPanel
                          onCLick={() => togglePanel(panelIndex)}
                          isActive={isActiveList[panelIndex]}
                        />
                          </ResizablePanelGroup>
                        </ResizablePanel>
                        {(col > 1 && outerIndex < col - 1) && (
                          <ResizableHandle className="data-[panel-group-direction=vertical]:h-1 data-[panel-group-direction=horizontal]:w-1" key={`handle-outer-${outerIndex}`} />
                        )}
                      </React.Fragment>
                    );
                  })}
                </ResizablePanelGroup>
              </ResizablePanel>
            </ResizablePanelGroup>
          ) : (
          <ResizablePanelGroup direction="vertical" className="pl-1 pb-1">
            <ResizablePanel>
              <ResizablePanelGroup direction="horizontal" className="pt-0">
                {Array.from({ length: greed }).map((_, outerIndex) => {
                  const panelIndex = outerIndex;
                  return (
                    <React.Fragment key={`outer-fragment-greed-${outerIndex}`}>
                      <ResizablePanel 
                      className="greed-panel-top"
                      onMouseEnter={() => toggle(panelIndex, screenId)}
                      >
                      <ResizablePanelGroup 
                        direction="horizontal" 
                        className="pt-0"
                        onClick={() => dispatch(setActivePanelIndex(panelIndex))}
                        >
                      <ResizablePanel
                        key={`outer-${outerIndex}`}
                        id={`outer-greed-${outerIndex}`}
                        order={outerIndex * 10 + 13}
                      >
                        <Suspense fallback={<ChartSkeleton />}>
                          <ChartLazy panelIndex={panelIndex}/>
                        </Suspense>
                      </ResizablePanel>
                      {isActiveList[panelIndex] && <>
                        <ResizableHandle className={`data-[panel-group-direction=vertical]:h-1 data-[panel-group-direction=horizontal]:w-1 ${screenIndex === panelIndex ? "border-2 border-blue-700" : "border-transparent border-2"}`}/>
                        <ResizablePanel
                          key={`outer-dashboard-${outerIndex}`}
                          id={`outer-dashboard-greed-${outerIndex}`}
                          order={outerIndex * 10 + 14}
                        >
                          <Suspense fallback={<DashboardSkeleton />}>
                            <DashboardQuotesSidebarLazy 
                              // selectedCoin={selectedCoin}
                              isActive={isActiveList[panelIndex]}
                              panelIndex={panelIndex}
                              screensDataArray={screensDataArray}
                            />
                          </Suspense>
                        </ResizablePanel>
                      </>}
                      <DashboardSettingsPanel
                        onCLick={() => togglePanel(panelIndex)}
                        isActive={isActiveList[panelIndex]}
                      />
                        </ResizablePanelGroup>
                      </ResizablePanel>
                      {(greed > 1 && outerIndex < greed - 1) && (
                      <ResizableHandle key={`handle-outer-${outerIndex}`} className="data-[panel-group-direction=vertical]:h-1 data-[panel-group-direction=horizontal]:w-1" />
                      )}
                    </React.Fragment>
                  );
                })}
              </ResizablePanelGroup>
            </ResizablePanel>
            <ResizableHandle className="data-[panel-group-direction=vertical]:h-1 data-[panel-group-direction=horizontal]:w-1"/>
            <ResizablePanel>
              <ResizablePanelGroup direction="horizontal" className="pt-0">
                {Array.from({ length: greed}).map((_, outerIndex) => {
                  const panelIndex = greed + outerIndex
                  return (
                    <React.Fragment key={`outer-fragment-greed2-${outerIndex}`}>
                      <ResizablePanel
                        className="greed-panel-bottom"
                        onMouseEnter={() => toggle(panelIndex, screenId)}
                      >
                        <ResizablePanelGroup 
                          direction="horizontal" 
                          className="pt-0"
                          onClick={() => dispatch(setActivePanelIndex(panelIndex))}
                          >
                      <ResizablePanel
                        key={`outer-${outerIndex}`}
                        id={`outer-greed2-${outerIndex}`}
                        order={outerIndex * 10 + 15}
                      >
                        <Suspense fallback={<ChartSkeleton />}>
                          <ChartLazy panelIndex={panelIndex}/>
                        </Suspense>
                      </ResizablePanel>
                      {isActiveList[panelIndex] && <>
                        <ResizableHandle className={`data-[panel-group-direction=vertical]:h-1 data-[panel-group-direction=horizontal]:w-1 ${screenIndex === panelIndex ? "border-2 border-blue-700" : "border-transparent border-2"}`}/>
                        <ResizablePanel
                          key={`outer-dashboard-${outerIndex}`}
                          id={`outer-dashboard-greed2-${outerIndex}`}
                          order={outerIndex * 10 + 16}
                        >
                          <Suspense fallback={<DashboardSkeleton/>}>
                            <DashboardQuotesSidebarLazy 
                              // selectedCoin={selectedCoin}
                              isActive={isActiveList[panelIndex]}
                              panelIndex={panelIndex}
                              screensDataArray={screensDataArray}
                            />
                          </Suspense>
                        </ResizablePanel>
                      </>}
                      <DashboardSettingsPanel
                        onCLick={() => togglePanel(panelIndex)}
                        isActive={isActiveList[panelIndex]}
                      />
                        </ResizablePanelGroup>
                      </ResizablePanel>
                      {(greed > 1 && outerIndex < greed - 1) && (
                      <ResizableHandle key={`handle-outer-${outerIndex}`} className="data-[panel-group-direction=vertical]:h-1 data-[panel-group-direction=horizontal]:w-1" />
                      )}
                    </React.Fragment>
                  );
                })}
              </ResizablePanelGroup>
            </ResizablePanel>
          </ResizablePanelGroup>
        )
      }
    </>
  )
}
export default DashboardPage;

