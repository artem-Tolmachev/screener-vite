import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { TableCell, TableRow } from "@/components/ui/table";
import { formatDate } from "./formatData";
export function getOrderRows({ updatedPrice, orders, data, columns, radioBtn }) {
    const allRows = [];
    const firstColumn = columns.find(item => item.key === 'symbol' && item.visible !== 0);
    const lastColumn = columns.find(item => item.key === 'price' && item.visible !== 0);
    const middleColums = columns.filter(item => item.key !== 'symbol' && item.key !== 'price' && item.visible !== 0);
    orders.forEach((symbol) => {
        const item = updatedPrice?.find((ticker) => ticker.symbol === symbol);
        const bids = data?.[symbol]?.bids ?? [];
        const asks = data?.[symbol]?.asks ?? [];
        const ordersData = data ?? {};
        bids.forEach((bid, idx) => {
            if (radioBtn === 'sales')
                return;
            allRows.push(_jsxs(TableRow, { className: "text-blue-900", children: [firstColumn && _jsx(TableCell, { className: "font-medium text-gray-400", children: symbol }), middleColums.find(col => col.key === 'distance')?.visible === 1 && _jsx(TableCell, { className: " text-gray-400", children: item?.bid1Price
                            ? Math.abs((Number(bid[0]) - Number(item.bid1Price)) / Number(item.bid1Price) * 100).toFixed(0)
                            : '...' }), middleColums.find(col => col.key === 'duration')?.visible === 1 && _jsx(TableCell, { className: " text-gray-400", children: formatDate(ordersData[symbol].time) }), (middleColums.find(col => col.key === 'type')?.visible === 1) && _jsx(TableCell, { className: "text-green-600", children: "\u041F\u043E\u043A\u0443\u043F\u043A\u0430" }), middleColums.find(col => col.key === 'volume')?.visible === 1 && _jsx(TableCell, { className: " text-gray-400", children: Number(bid[1]).toLocaleString() }), middleColums.find(col => col.key === 'volume$')?.visible === 1 && _jsx(TableCell, { className: " text-gray-400", children: (Number(bid[0]) * Number(bid[1])).toLocaleString(undefined, { maximumFractionDigits: 2 }) }), lastColumn && _jsx(TableCell, { className: "text-right  text-gray-400", children: item?.bid1Price ?? '...' })] }, `${symbol}-bid-${idx}`));
        });
        asks.forEach((ask, idx) => {
            if (radioBtn === 'purchases')
                return;
            allRows.push(_jsxs(TableRow, { className: "text-blue-900", children: [firstColumn && _jsx(TableCell, { className: "font-medium text-gray-400", children: symbol }), middleColums.find(col => col.key === 'distance')?.visible === 1 && _jsx(TableCell, { className: "text-gray-400", children: item?.ask1Price
                            ? Math.abs((Number(ask[0]) - Number(item.ask1Price)) / Number(item.ask1Price) * 100).toFixed(0)
                            : '...' }), middleColums.find(col => col.key === 'duration')?.visible === 1 && _jsx(TableCell, { className: "text-gray-400", children: formatDate(ordersData[symbol].time) }), middleColums.find(col => col.key === 'type')?.visible === 1 && _jsx(TableCell, { className: "text-red-600", children: "\u041F\u0440\u043E\u0434\u0430\u0436\u0430" }), middleColums.find(col => col.key === 'volume')?.visible === 1 && _jsx(TableCell, { className: "text-gray-400", children: Number(ask[1]).toLocaleString() }), middleColums.find(col => col.key === 'volume$')?.visible === 1 && _jsx(TableCell, { className: "text-gray-400", children: (Number(ask[0]) * Number(ask[1])).toLocaleString(undefined, { maximumFractionDigits: 2 }) }), lastColumn && _jsx(TableCell, { className: "text-right text-gray-400", children: item?.ask1Price ?? '...' })] }, `${symbol}-ask-${idx}`));
        });
    });
    return allRows;
}
