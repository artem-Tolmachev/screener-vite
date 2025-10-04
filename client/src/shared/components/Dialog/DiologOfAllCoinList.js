import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger, } from "@/components/ui/dialog";
import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog";
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { useGetCoinsQuery } from "@/pages/dashboard/coinData/services/getApiCoins";
import ListInfarmation from "@/pages/dashboard/components/ui/ListInfarmation/ListInfarmation";
export function DiologOfAllCoinList({ listsData, panelIndex }) {
    const { data } = useGetCoinsQuery();
    if (!data)
        return;
    return (_jsxs(Dialog, { children: [_jsx(DialogTrigger, { asChild: true, children: _jsxs(Button, { variant: "link", className: " flex justify-start text-lg text-blue-200  hover:text-blue-200 cursor-pointer", children: ["\u041E\u0442\u043A\u0440\u044B\u0442\u044C \u0441\u043F\u0438\u0441\u043E\u043A", _jsx("svg", { style: { width: '22px', height: '22px' }, xmlns: "http://www.w3.org/2000/svg", width: "28", height: "28", fill: "none", children: _jsx("path", { stroke: "currentColor", d: "M5.5 11.5v8a1 1 0 0 0 1 1h15a1 1 0 0 0 1-1v-8m-17 0v-4a1 1 0 0 1 1-1h4l2 2h9a1 1 0 0 1 1 1v2m-17 0h17" }) })] }) }), _jsxs(DialogContent, { className: "bg-gray-800 text-gray-300 p-0 border-non h-auto pb-5", children: [_jsx(ListInfarmation, { listsData: listsData, panelIndex: panelIndex }), _jsxs(VisuallyHidden, { children: [_jsx(DialogDescription, { children: "\u0417\u0434\u0435\u0441\u044C \u0432\u044B \u043C\u043E\u0436\u0435\u0442\u0435 \u0432\u044B\u0431\u0440\u0430\u0442\u044C \u0442\u043E\u0440\u0433\u043E\u0432\u0443\u044E \u043F\u0430\u0440\u0443" }), _jsx(DialogTitle, { children: "\u0412\u044B\u0431\u0440\u0430\u0442\u044C \u043C\u0430\u043D\u0435\u0442\u0443" })] })] })] }));
}
