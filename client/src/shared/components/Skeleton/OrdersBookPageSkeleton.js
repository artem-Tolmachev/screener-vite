import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Skeleton } from "@/components/ui/skeleton";
export default function OrdersBookPageSkeleton() {
    return (_jsx("div", { className: "flex pr-10 py-14 pl-[12px] space-x-4 h-[85%] w-[100%] bg-blue-950", children: _jsxs("div", { className: "flex flex-col space-y-5 bg-gray-900 p-6 rounded-[5px] h-full w-full", children: [_jsxs("div", { className: "flex justify-between\r\n", children: [_jsx(Skeleton, { className: "h-4 w-[150px] rounded-2xl bg-gray-500" }), _jsx(Skeleton, { className: "h-4 w-[150px] rounded-2xl bg-gray-500" }), _jsx(Skeleton, { className: "h-4 w-[150px] rounded-2xl bg-gray-500" }), _jsx(Skeleton, { className: "h-4 w-[150px] rounded-2xl bg-gray-500" }), _jsx(Skeleton, { className: "h-4 w-[150px] rounded-2xl bg-gray-500" }), _jsx(Skeleton, { className: "h-4 w-[150px] rounded-2xl bg-gray-500" })] }), _jsx("div", { className: "flex space-x-5 justify-between", children: Array.from({ length: 6 }, (_, i) => {
                        return _jsx("div", { className: "w-[150px] flex justify-end", children: _jsx(Skeleton, { className: "h-4 w-[70px] rounded-2xl bg-gray-500" }) }, `row1-${i}`);
                    }) }), _jsx("div", { className: "flex space-x-5 justify-between", children: Array.from({ length: 6 }, (_, i) => {
                        return _jsx("div", { className: "w-[150px] flex justify-end", children: _jsx(Skeleton, { className: "h-4 w-[70px] rounded-2xl bg-gray-500" }) }, `row2-${i}`);
                    }) }), _jsx("div", { className: "flex space-x-5 justify-between", children: Array.from({ length: 6 }, (_, i) => {
                        return _jsx("div", { className: "w-[150px] flex justify-end", children: _jsx(Skeleton, { className: "h-4 w-[70px] rounded-2xl bg-gray-500" }) }, `row3-${i}`);
                    }) }), _jsx("div", { className: "flex space-x-5 justify-between", children: Array.from({ length: 6 }, (_, i) => {
                        return _jsx("div", { className: "w-[150px] flex justify-end", children: _jsx(Skeleton, { className: "h-4 w-[70px] rounded-2xl bg-gray-500" }) }, `row4-${i}`);
                    }) })] }) }));
}
