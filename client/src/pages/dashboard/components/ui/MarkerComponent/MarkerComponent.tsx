import IconFlag from "../IconFlag/IconFlag"
import React from "react";
import { Button } from "@/components/ui/button";
import { MarketData } from "@/pages/dashboard/types";

interface Props {
  markerSettings: (
    event: React.MouseEvent<HTMLButtonElement>,
    symbol: string,
    marker: string,
    item: MarketData,
    flag?: string
  ) => void;
  symbol: string;
  marker: string;
  item: MarketData;
  flag?: string;
}

export default function MarkerComponent({
  markerSettings,
  symbol,
  marker,
  item,
  flag
}: Props) {
  function MarkerHandler(event: React.MouseEvent<HTMLButtonElement>) {
    markerSettings(event, symbol, marker, item, flag);
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
