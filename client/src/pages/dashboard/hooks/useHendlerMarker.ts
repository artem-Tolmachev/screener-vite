import { useAppDispatch, useAppSelector } from "@/app/store/store";
import { useState } from "react";
import { addMarker, removeMarker } from "../coinData/slices/CoinsSlice";

export  function useHendlerMarker(){
    const dispatch = useAppDispatch();
    const [isValue, setSetVel] = useState(false);
    const [justAddedMarker, setJustAddedMarker] = useState(false);

    const markerSettings = (
        event: React.MouseEvent<HTMLButtonElement> | undefined,
        symbol: string, 
        marker: string,
        screenId: number,
        panelIndex: number
    ) => {
    event?.stopPropagation();
            if(!marker){
            dispatch(addMarker({ symbol, marker: '#c51919', screenId, panelIndex}))
            setJustAddedMarker(true);
            setSetVel(true);
        }else{
            dispatch(removeMarker({symbol, screenId, panelIndex}));
            setJustAddedMarker(false);
            setSetVel(false);
        }
    }
    return {markerSettings, isValue, justAddedMarker, setSetVel}
}