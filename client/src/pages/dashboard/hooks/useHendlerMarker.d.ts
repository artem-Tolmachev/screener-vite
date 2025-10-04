export declare function useHendlerMarker(): {
    markerSettings: (event: React.MouseEvent<HTMLButtonElement> | undefined, symbol: string, marker: string, screenId: number, panelIndex: number) => void;
    isValue: boolean;
    justAddedMarker: boolean;
    setSetVel: import("react").Dispatch<import("react").SetStateAction<boolean>>;
};
