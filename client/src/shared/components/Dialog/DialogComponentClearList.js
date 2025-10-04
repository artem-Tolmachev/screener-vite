import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import IconClear from "../Icons/IconClear";
import { listCleaner } from "@/pages/dashboard/coinData/slices/CoinsSlice";
import { useAppDispatch, useAppSelector } from "@/app/store/store";
export default function DialogComponentClearList() {
    const screenId = useAppSelector(store => store.coins.mainScreen);
    const screenOptionGroop = useAppSelector(state => state.coins.allscreens);
    const ativeArray = screenOptionGroop.find(el => el.id === screenId);
    const panelIndex = useAppSelector(store => store.coins.panelIndex);
    if (!ativeArray)
        return;
    const activedListData = ativeArray.screens[panelIndex];
    const activeList = activedListData?.activeList;
    const dispatch = useAppDispatch();
    return (_jsxs(Dialog, { children: [_jsx(DialogTrigger, { asChild: true, children: _jsxs(Button, { variant: "link", className: "flex justify-start text-lg text-blue-200  hover:text-blue-200 cursor-pointer", children: ["\u041E\u0442\u0447\u0438\u0441\u0442\u0438\u0442\u044C \u0441\u043F\u0438\u0441\u043E\u043A", _jsx(IconClear, { className: "dropDownIcon text-current", style: { width: '22px', height: '22px' } })] }) }), _jsxs(DialogContent, { className: "sm:max-w-md bg-gray-600", children: [_jsx(DialogHeader, { children: _jsx(DialogTitle, { children: "\u041F\u043E\u0434\u0442\u0432\u0435\u0440\u0434\u0438\u0442\u0435 \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u044F" }) }), _jsx(DialogDescription, { children: "\u0412\u044B \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u0442\u0435\u043B\u044C\u043D\u043E \u0445\u043E\u0442\u0438\u0442\u0435 \u0443\u0434\u0430\u043B\u0438\u0442\u044C \u0432\u0441\u0435 \u0438\u043D\u0441\u0442\u0440\u0443\u043C\u0435\u043D\u0442\u044B \u0438\u0437 \u044D\u0442\u043E\u0433\u043E \u0441\u043F\u0438\u0441\u043A\u0430?" }), _jsx("div", { className: "flex items-center gap-2", children: _jsx("div", { className: "grid flex-1 gap-2", children: _jsx(Label, { htmlFor: "link", className: "sr-only", children: "Link" }) }) }), _jsx(DialogFooter, { className: "sm:justify-start", children: _jsx(DialogClose, { asChild: true, children: _jsx(Button, { onClick: () => dispatch(listCleaner({ activeList, screenId, panelIndex })), type: "button", variant: "secondary", className: "bg-gray-800 text-neutral-50 hover:bg-gray-700", children: "\u0414\u0430" }) }) })] })] }));
}
