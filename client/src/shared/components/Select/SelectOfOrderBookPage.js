import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Select, SelectContent, SelectGroup, SelectLabel, SelectTrigger, SelectValue, } from "@/components/ui/select";
export function SelectOfOrderBookPage({ columnsOfTable, toggleCheckBox }) {
    const hiddenOptions = columnsOfTable.filter((col) => col.visible === 0);
    return (_jsxs(Select, { children: [_jsx(SelectTrigger, { className: "w-[50px] h-full border-2 cursor-pointer", children: _jsx(SelectValue, { placeholder: "" }) }), _jsx(SelectContent, { side: "bottom", align: "end", sideOffset: 20, className: "bg-gray-400 w-[300px]", children: _jsx(SelectGroup, { children: hiddenOptions.length === 0
                        ? _jsx("span", { className: "text-2xl", children: "\u041D\u0435\u0442 \u043E\u043F\u0446\u0438\u0439" })
                        : hiddenOptions.map(option => _jsx(SelectLabel, { className: "text-gray-900 text-2xl hover:bg-gray-600 hover:text-gray-400 cursor-pointer", onClick: () => toggleCheckBox(option.key), children: option.name }, option.name)) }) })] }));
}
