interface Props {
    screenId: number;
    panelIndex: number;
    lineId: string | null;
    setIsLine: (args: boolean) => void;
}
export declare function DiologRemooveLine({ setIsLine, lineId, screenId, panelIndex }: Props): import("react/jsx-runtime").JSX.Element;
export default DiologRemooveLine;
