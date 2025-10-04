import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useAppDispatch, useAppSelector } from "@/app/store/store";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem, } from "@/components/ui/radio-group";
import { addMarker } from "@/pages/dashboard/coinData/slices/CoinsSlice";
export function RadioButtonsComponent({ symbol, currentMarker }) {
    const screenId = useAppSelector(state => state.coins.mainScreen);
    const dispatch = useAppDispatch();
    const panelIndex = useAppSelector(store => store.coins.panelIndex);
    function onChaneMarker(val) {
        dispatch(addMarker({ symbol, marker: val, screenId, panelIndex }));
    }
    return (_jsxs(RadioGroup, { className: "flex justify-between", value: currentMarker, onValueChange: onChaneMarker, children: [_jsxs("div", { className: "flex items-center", children: [_jsx(RadioGroupItem, { onClick: (e) => e.stopPropagation(), className: "radio-red border-4 w-5 h-5 text-[#c51919] cursor-pointer", value: "#c51919", id: "r1" }), _jsx(Label, { htmlFor: "r1" })] }), _jsxs("div", { className: "flex items-center", children: [_jsx(RadioGroupItem, { onClick: (e) => e.stopPropagation(), className: "radio-blue border-4 w-5 h-5 text-[#192dc5] cursor-pointer", value: "#192dc5", id: "r2" }), _jsx(Label, { htmlFor: "r2" })] }), _jsxs("div", { className: "flex items-center", children: [_jsx(RadioGroupItem, { onClick: (e) => e.stopPropagation(), className: "radio-green border-4 w-5 h-5 text-[#19c56c] cursor-pointer", value: "#19c56c", id: "r3" }), _jsx(Label, { htmlFor: "r3" })] }), _jsxs("div", { className: "flex items-center ", children: [_jsx(RadioGroupItem, { onClick: (e) => e.stopPropagation(), className: "radio-pink border-4 w-5 h-5 text-[#c51986] cursor-pointer", value: "#c51986", id: "r4" }), _jsx(Label, { htmlFor: "r4" })] })] }));
}
