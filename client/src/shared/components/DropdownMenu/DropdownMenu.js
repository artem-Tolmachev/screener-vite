import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from "@/components/ui/button";
import clsx from 'clsx';
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import DialogComponentCreateList from "../Dialog/DialogComponentCreateList";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/app/store/store";
import { listRemover, setActiveList, setActivePanelIndex } from "@/pages/dashboard/coinData/slices/CoinsSlice";
import DialogComponentClearList from "../Dialog/DialogComponentClearList";
import IconBacket from "../Icons/IconBacket";
import IconFlag from "@/pages/dashboard/components/ui/IconFlag/IconFlag";
import { DiologOfAllCoinList } from "../Dialog/DiologOfAllCoinList";
export function DropdownMenuComponent({ panelIndex }) {
    const [_, setListnameSelect] = useState('');
    const screenOptionGroop = useAppSelector(store => store.coins.allscreens);
    const screenId = useAppSelector(store => store.coins.mainScreen);
    const ativeArray = screenOptionGroop.find(el => el.id === screenId);
    const screensArray = ativeArray?.screens;
    if (!screensArray)
        return;
    if (!screensArray[panelIndex])
        return;
    const listsArray = screensArray[panelIndex].storeList;
    const listName = screensArray[panelIndex].activeList;
    if (!listsArray)
        return;
    const dispatch = useAppDispatch();
    function chooseList(listName) {
        dispatch(setActiveList({ listName, screenId, panelIndex }));
    }
    function delList(list) {
        dispatch(listRemover({ list, screenId, panelIndex }));
        dispatch(setActiveList({ listName: "List", screenId, panelIndex }));
    }
    function DropdownMenuHendler() {
        dispatch(setActivePanelIndex(panelIndex));
    }
    return (_jsxs(DropdownMenu, { onOpenChange: DropdownMenuHendler, children: [_jsx(DropdownMenuTrigger, { asChild: true, children: _jsxs(Button, { variant: "outline", className: "cursor-pointer", children: [listName, listName !== 'List' && _jsx(IconFlag, { marker: listsArray[listName].color })] }) }), _jsxs(DropdownMenuContent, { className: "w-100 bg-gray-800", align: "start", children: [_jsx(DropdownMenuLabel, { className: "text-lg text-blue-200  hover:text-blue-200 focus:text-blue-200 cursor-pointer", children: "My Account" }), _jsx(DropdownMenuGroup, { children: Object.keys(listsArray).map((list, index) => {
                            return _jsxs(DropdownMenuItem, { onClick: () => chooseList(list), className: clsx('text-lg text-blue-200', 'hover:text-blue-200', 'focus:text-blue-200', 'cursor-pointer', list === listName && 'bg-gray-900 hover:!bg-gray-900'), children: [list, list !== 'List' && (listsArray[list].colorName === 'red' ||
                                        listsArray[list].colorName === 'pink' ||
                                        listsArray[list].colorName === 'blue' ||
                                        listsArray[list].colorName === 'green' ? (_jsx(IconFlag, { marker: listsArray[list].color })) : (_jsx(Button, { onClick: (e) => {
                                            e.stopPropagation();
                                            delList(list);
                                        }, className: "cursor-pointer hover:bg-gray-600 w-5", children: _jsx(IconBacket, { style: { width: '22px', height: '22px' } }) })))] }, list + index);
                        }) }), _jsx(DropdownMenuSeparator, {}), _jsxs(DropdownMenuGroup, { children: [_jsx(DialogComponentCreateList, { setListnameSelect: setListnameSelect }), _jsx(DialogComponentClearList, {})] }), _jsx(DropdownMenuSeparator, {}), _jsx(DropdownMenuGroup, { children: _jsx(DiologOfAllCoinList, { listsData: listsArray, panelIndex: panelIndex }) })] })] }));
}
