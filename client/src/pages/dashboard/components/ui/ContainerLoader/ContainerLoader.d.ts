import { ListChildComponentProps } from 'react-window';
import { MarketData } from '@/pages/dashboard/types';
type ItemData = {
    items: MarketData[];
    itemStatusMap: {
        [index: number]: number;
    };
    LOADED: number;
    LOADING: number;
    panelIndex: number;
};
declare const ContainerLoader: ({ data, index, style }: ListChildComponentProps<ItemData>) => import("react/jsx-runtime").JSX.Element | null;
export default ContainerLoader;
