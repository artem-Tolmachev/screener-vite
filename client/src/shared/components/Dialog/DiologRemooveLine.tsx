import { useAppDispatch } from "@/app/store/store";
import IconBacket from "../Icons/IconBacket";
import {removeHorzLine } from '@/pages/dashboard/coinData/slices/CoinsSlice';

interface Props {
    checkedLine: number | null;
    screenId: number;
    panelIndex: number;
    setIsLine: (args: boolean) => void;
}
export function DiologRemooveLine({setIsLine, checkedLine, screenId, panelIndex}: Props) {
    const dispatch = useAppDispatch()
    return (
        <div
            onClick={() => 
                {
                    dispatch(removeHorzLine({checkedLine, screenId, panelIndex}))
                    setIsLine(false)
                }
            }
        className="w-[50px] h-[50px] shadow-[0_2px_4px_0_#0006] rounded-[8px] cursor-pointer bg-gray-700 absolute top-[50%] left-[50%] z-1000">
            <IconBacket className="hover:text-red-500"/>
        </div>
    )
}

export default DiologRemooveLine