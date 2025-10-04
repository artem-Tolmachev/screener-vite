import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger, } from "@/components/ui/dialog";
import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog";
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { useGetCoinsQuery } from "@/pages/dashboard/coinData/services/getApiCoins";
import CoinSearchPopup from "@/pages/dashboard/components/widgets/CoinSearchPopup/CoinSearchPopup";
import { setActivePanelIndex } from "@/pages/dashboard/coinData/slices/CoinsSlice";
import { useAppDispatch } from "@/app/store/store";
import { Tooltip } from "react-tooltip";
export function DialogAddTicker({ panelIndex }) {
    const { data } = useGetCoinsQuery();
    if (!data)
        return;
    const tickers = data?.tickers;
    const dispath = useAppDispatch();
    return (_jsxs(Dialog, { children: [_jsx(DialogTrigger, { asChild: true, children: _jsx(Button, { "data-tooltip-id": `tooltip-add-coin ${panelIndex}`, "data-tooltip-content": "\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u0438\u043D\u0441\u0442\u0440\u0443\u043C\u0435\u043D\u0442", variant: "ghost", className: "cursor-pointer w-[40px] h-[40px] bg-blue-950  hover:bg-blue-900 active:bg-blue-700", onClick: () => dispath(setActivePanelIndex(panelIndex)), children: _jsx("svg", { style: { width: '40px', height: '40px' }, xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 28 28", width: "28", height: "28", fill: "none", children: _jsx("path", { fill: "currentColor", d: "M7 13h7V6h1v7h7v1h-7v7h-1v-7H7v-1z" }) }) }) }), _jsxs(DialogContent, { className: "w-[50%] bg-gray-800 text-gray-300 p-0 border-non h-[90%]", children: [_jsx(CoinSearchPopup, { tickers: tickers, panelIndex: panelIndex }), _jsxs(VisuallyHidden, { children: [_jsx(DialogDescription, { children: "\u0417\u0434\u0435\u0441\u044C \u0432\u044B \u043C\u043E\u0436\u0435\u0442\u0435 \u0432\u044B\u0431\u0440\u0430\u0442\u044C \u0442\u043E\u0440\u0433\u043E\u0432\u0443\u044E \u043F\u0430\u0440\u0443" }), _jsx(DialogTitle, { children: "\u0412\u044B\u0431\u0440\u0430\u0442\u044C \u043C\u0430\u043D\u0435\u0442\u0443" })] })] }), _jsx(Tooltip, { id: `tooltip-add-coin ${panelIndex}`, variant: "light", place: 'bottom-end', className: 'z-1000', style: { fontSize: '18px' } })] }));
}
