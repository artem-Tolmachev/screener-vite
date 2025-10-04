import { jsx as _jsx } from "react/jsx-runtime";
import IconFlag from "../IconFlag/IconFlag";
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/app/store/store";
import { setActivePanelIndex } from "@/pages/dashboard/coinData/slices/CoinsSlice";
export default function MarkerComponent({ markerSettings, symbol, marker, panelIndex }) {
    const screenId = useAppSelector(state => state.coins.mainScreen);
    const dispatch = useAppDispatch();
    function MarkerHandler(event) {
        dispatch(setActivePanelIndex(panelIndex));
        markerSettings(event, symbol, marker, screenId, panelIndex);
    }
    return (_jsx(Button, { className: "cursor-pointer w-auto mr-1", size: "icon", onClick: MarkerHandler, children: _jsx(IconFlag, { marker: marker }) }));
}
