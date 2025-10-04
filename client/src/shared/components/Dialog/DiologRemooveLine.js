import { jsx as _jsx } from "react/jsx-runtime";
import { useAppDispatch } from "@/app/store/store";
import IconBacket from "../Icons/IconBacket";
import { removeHorzLine } from '@/pages/dashboard/coinData/slices/CoinsSlice';
export function DiologRemooveLine({ setIsLine, lineId, screenId, panelIndex }) {
    const dispatch = useAppDispatch();
    return (_jsx("div", { onClick: () => {
            dispatch(removeHorzLine({ screenId, panelIndex, lineId }));
            setIsLine(false);
        }, className: "w-[50px] h-[50px] shadow-[0_2px_4px_0_#0006] rounded-[8px] cursor-pointer bg-gray-700 absolute top-[50%] left-[50%] z-1000", children: _jsx(IconBacket, { className: "hover:text-red-500" }) }));
}
export default DiologRemooveLine;
