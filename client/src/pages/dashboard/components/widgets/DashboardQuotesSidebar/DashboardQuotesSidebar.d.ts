import { AllDataCoin } from '@/pages/dashboard/types';
interface Props {
    isActive: boolean;
    panelIndex: number;
    screensDataArray: AllDataCoin[] | undefined;
}
declare const DashboardQuotesSidebar: ({ screensDataArray, panelIndex, isActive }: Props) => import("react/jsx-runtime").JSX.Element;
export default DashboardQuotesSidebar;
