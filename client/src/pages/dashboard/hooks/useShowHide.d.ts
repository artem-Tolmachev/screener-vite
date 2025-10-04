export default function useShowHide(initial?: boolean): {
    show: () => void;
    hide: () => void;
    isVisible: boolean;
    symbol: (ticker: string) => void;
    name: string;
};
