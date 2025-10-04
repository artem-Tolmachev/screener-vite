import { IDashboardHeaderItems } from '@/pages/dashboard/types';
interface Props {
    isOpen: boolean | string;
    onToggleModal: (arg: string | boolean) => void;
    columns: IDashboardHeaderItems[];
    toggleCheckBox: (arg: string) => void;
    panelIndex: number;
}
declare const DashboardPanelHeader: ({ panelIndex, isOpen, onToggleModal, columns, toggleCheckBox }: Props) => import("react/jsx-runtime").JSX.Element;
export default DashboardPanelHeader;
