import IconFlag from "../IconFlag/IconFlag"
import React from "react";
import { Button } from "@/components/ui/button";
import { MarketData } from "@/pages/dashboard/types";
import { useAppDispatch, useAppSelector } from "@/app/store/store";
import { setActivePanelIndex } from "@/pages/dashboard/coinData/slices/CoinsSlice";

interface Props {
  markerSettings: (
    event: React.MouseEvent<HTMLButtonElement>,
    symbol: string,
    marker: string,
    screenId: number,
    panelIndex: number
  ) => void;
  symbol: string;
  marker: string;
  panelIndex: number
}

export default function MarkerComponent({
  markerSettings,
  symbol,
  marker,
  panelIndex
}: Props) {
  const screenId = useAppSelector(state => state.coins.mainScreen);
    const dispatch = useAppDispatch();
    function MarkerHandler(event: React.MouseEvent<HTMLButtonElement>) {
      dispatch(setActivePanelIndex(panelIndex))
      markerSettings(event, symbol, marker, screenId, panelIndex);
    }

    return (
      <Button
        className="cursor-pointer w-auto mr-1"
        size="icon"
        onClick={MarkerHandler}
      >
        <IconFlag marker={marker} />
      </Button>
    );
}
