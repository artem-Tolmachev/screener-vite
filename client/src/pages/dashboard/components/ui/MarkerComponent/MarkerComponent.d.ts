import React from "react";
interface Props {
    markerSettings: (event: React.MouseEvent<HTMLButtonElement>, symbol: string, marker: string, screenId: number, panelIndex: number) => void;
    symbol: string;
    marker: string;
    panelIndex: number;
}
export default function MarkerComponent({ markerSettings, symbol, marker, panelIndex }: Props): import("react/jsx-runtime").JSX.Element;
export {};
