import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import IconCoin from '@/shared/components/IconCoin/IconCoin';
import { useAppSelector } from '@/app/store/store';
import { Tooltip } from 'react-tooltip';
function TradingInfoPanel({ panelIndex }) {
    const screenId = useAppSelector(state => state.coins.mainScreen);
    const allScreens = useAppSelector(state => state.coins.allscreens);
    const ativeArray = allScreens.find(el => el.id === screenId);
    const selectedItems = ativeArray?.screens[panelIndex].CoinData;
    if (!selectedItems) {
        return _jsx("div", { className: 'absolute top-0 left-0 z-30 w-[168px]', children: "\u0417\u0430\u0433\u0440\u0443\u0437\u043A\u0430..." });
    }
    const { src, symbol, ask1Price, bid1Price } = selectedItems;
    return (_jsxs("div", { className: 'absolute top-0 left-0 z-30', children: [_jsx("div", { className: 'pt-1 pl-2 relative w-[250px] top-0 left-0 text-[var(--color-text-primary)] cursor-pointer', children: _jsxs("div", { className: 'max-w-full min-w-0 flex items-center gap-2', children: [_jsx(IconCoin, { panelIndex: panelIndex, src: src, symbol: symbol, VorceVisible: true }), _jsx("div", { className: 'text-[var(--color-red)] text-sm', "data-tooltip-id": `tooltip ${panelIndex}`, "data-tooltip-content": "\u0426\u0435\u043D\u0430 \u043F\u0440\u043E\u0434\u0430\u0436\u0438 ( Ask )", children: ask1Price ?? '—' }), _jsx("div", { className: 'text-[var(--color-blue)] text-sm', "data-tooltip-id": `tooltip ${panelIndex}`, "data-tooltip-content": "\u0426\u0435\u043D\u0430 \u043F\u043E\u043A\u0443\u043F\u043A\u0438 ( Bid )", children: bid1Price ?? '—' })] }) }), _jsx(Tooltip, { id: `tooltip ${panelIndex}`, variant: "light", style: { fontSize: '18px' }, place: 'bottom-end' })] }));
}
export default TradingInfoPanel;
