import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
export function TableOrderBook({ paginatedRows, columns }) {
    const firstItemHeader = columns.find(item => item.key === 'symbol' && item.visible !== 0);
    const lastItemHeader = columns.find(item => item.key === 'price' && item.visible !== 0);
    const middleItems = columns.filter(item => item.key !== 'symbol' && item.key !== 'price' && item.visible !== 0);
    return (_jsxs(Table, { className: "w-full bg-gray-950 rounded-[8px] h-full", children: [_jsx(TableHeader, { className: "", children: _jsxs(TableRow, { className: "text-blue-900", children: [firstItemHeader && (_jsx(TableHead, { className: "w-[100px] text-gray-200", children: firstItemHeader.name })), middleItems.map((col) => (_jsx(TableHead, { className: "text-gray-100", children: col.name }, col.key))), lastItemHeader && (_jsx(TableHead, { className: "text-right text-gray-300", children: lastItemHeader.name }))] }) }), _jsx(TableBody, { className: "overflow-y-auto text-gray-400 ", children: paginatedRows })] }));
}
