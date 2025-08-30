import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { allIconsName, IconKey, toolBarBtn } from "../Icons/getIconsOfDiologToolBars";
import { useAppDispatch, useAppSelector } from "@/app/store/store";
import { newScreen, setActivePanelIcon, setActivePanelIndex, setMainScreen } from "@/pages/dashboard/coinData/slices/CoinsSlice";

export function DropDownOfHeadesToolbar() {
    const dispatch = useAppDispatch();
    const activeButton = useAppSelector(store => store.coins.activePanelBtn);
    
    function changeOptions(name: IconKey, screenid: number, panelIndex: number){
        dispatch(setActivePanelIcon({name}))
        const item = toolBarBtn[name];
        dispatch(newScreen({greed: item.greed, count: item.screens, direction: item.direction, screenid, panelIndex, height: item.height, layoutRow: item.layout.rows, layoutCol: item.layout.col, layoutSide: item.layout.side}))
        dispatch(setMainScreen(screenid))
        dispatch(setActivePanelIndex(0))
    } 

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" className="cursor-pointer text-[18px] text-gray-600">
                    Расположение графика
                    {toolBarBtn[activeButton].icon}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-full bg-gray-800 " align="start">
                <DropdownMenuGroup className="block">
                    {allIconsName.slice(0, 1).map((name, i) => {
                        const IndexId = i;
                        return <DropdownMenuItem 
                                    onClick={() => changeOptions(name, IndexId, i)}
                                    className={`cursor-pointer block hover:text-blue-600 ${activeButton === name ? 'text-blue-600': 'text-gray-400'}`}
                                    key={name}>
                            <span className="hover:text-blue-600">{toolBarBtn[name].icon}</span>
                            </DropdownMenuItem>
                    })}
                </DropdownMenuGroup>
            <DropdownMenuSeparator/>
                <DropdownMenuGroup className="flex">
                    {allIconsName.slice(1, 13).map((name, i) => {
                        const IndexId = i + 1;
                        return  <DropdownMenuItem 
                                    onClick={() => changeOptions(name, IndexId, i)}
                                    className={`cursor-pointer hover:text-blue-600 ${activeButton === name ? 'text-blue-600': 'text-gray-400'}`}
                                    key={name}>
                            <span className="hover:text-blue-600">{toolBarBtn[name].icon}</span>
                            </DropdownMenuItem>
                    })}
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}