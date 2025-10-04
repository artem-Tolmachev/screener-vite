import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Skeleton } from "@/components/ui/skeleton";
export default function ChartSkeleton() {
    return (_jsxs("div", { className: "flex pr-10 pt-10 space-x-4 h-[100%] w-[100%] bg-gray-900", children: [_jsx(Skeleton, { className: "h-12 w-12 rounded-full bg-gray-500" }), _jsxs("div", { className: "space-y-2", children: [_jsx(Skeleton, { className: "h-4 w-[250px] bg-gray-500" }), _jsx(Skeleton, { className: "h-4 w-[200px] bg-gray-500" })] })] }));
}
