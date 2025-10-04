import { IDashboardHeaderItems } from "@/pages/dashboard/types";
interface Props {
    columnsOfTable: IDashboardHeaderItems[];
    toggleCheckBox: (arg: string) => void;
    radioBtn: string;
    setRadioBtn: (arg: string) => void;
    hideAllColumns: () => void;
}
export declare function DialogForm({ hideAllColumns, columnsOfTable, toggleCheckBox, radioBtn, setRadioBtn }: Props): import("react/jsx-runtime").JSX.Element;
export {};
