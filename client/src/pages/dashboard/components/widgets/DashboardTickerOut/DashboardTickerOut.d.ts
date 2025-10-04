import { AllDataCoin, IDashboardHeaderItems } from '@/pages/dashboard/types';
interface Props {
    columns: IDashboardHeaderItems[];
    isActive: boolean;
    panelIndex: number;
    screensDataArray: AllDataCoin[] | undefined;
}
declare const DashboardTickerOut: ({ screensDataArray, panelIndex, columns }: Props) => import("react/jsx-runtime").JSX.Element | null | undefined;
export default DashboardTickerOut;
