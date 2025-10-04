import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger, } from "@/components/ui/dropdown-menu";
import { allIconsName, toolBarBtn } from "../Icons/getIconsOfDiologToolBars";
import { useAppDispatch, useAppSelector } from "@/app/store/store";
import { newScreen, setActivePanelIcon, setActivePanelIndex, setMainScreen } from "@/pages/dashboard/coinData/slices/CoinsSlice";
export function DropDownOfHeadesToolbar() {
    const dispatch = useAppDispatch();
    const activeButton = useAppSelector(store => store.coins.activePanelBtn);
    function changeOptions(name, screenid, panelIndex) {
        dispatch(setActivePanelIcon({ name }));
        const item = toolBarBtn[name];
        dispatch(newScreen({ greed: item.greed, count: item.screens, direction: item.direction, screenid, panelIndex, height: item.height, layoutRow: item.layout.rows, layoutCol: item.layout.col, layoutSide: item.layout.side }));
        dispatch(setMainScreen(screenid));
        dispatch(setActivePanelIndex(0));
    }
    return (_jsxs(DropdownMenu, { children: [_jsx(DropdownMenuTrigger, { asChild: true, children: _jsxs(Button, { variant: "outline", className: "cursor-pointer text-[18px] text-gray-600", children: ["\u0420\u0430\u0441\u043F\u043E\u043B\u043E\u0436\u0435\u043D\u0438\u0435 \u0433\u0440\u0430\u0444\u0438\u043A\u0430", toolBarBtn[activeButton].icon] }) }), _jsxs(DropdownMenuContent, { className: "w-full bg-gray-800 ", align: "start", children: [_jsx(DropdownMenuGroup, { className: "block", children: allIconsName.slice(0, 1).map((name, i) => {
                            const IndexId = i;
                            return _jsx(DropdownMenuItem, { onClick: () => changeOptions(name, IndexId, i), className: `cursor-pointer block hover:text-blue-600 ${activeButton === name ? 'text-blue-600' : 'text-gray-400'}`, children: _jsx("span", { className: "hover:text-blue-600", children: toolBarBtn[name].icon }) }, name);
                        }) }), _jsx(DropdownMenuSeparator, {}), _jsx(DropdownMenuGroup, { className: "flex", children: allIconsName.slice(1, 13).map((name, i) => {
                            const IndexId = i + 1;
                            return _jsx(DropdownMenuItem, { onClick: () => changeOptions(name, IndexId, i), className: `cursor-pointer hover:text-blue-600 ${activeButton === name ? 'text-blue-600' : 'text-gray-400'}`, children: _jsx("span", { className: "hover:text-blue-600", children: toolBarBtn[name].icon }) }, name);
                        }) })] })] }));
}
