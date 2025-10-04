import { IDashboardHeaderItems } from "@/pages/dashboard/types";
interface Props {
    columnsOfTable: IDashboardHeaderItems[];
    toggleCheckBox: (arg: string) => void;
}
export declare function SelectOfOrderBookPage({ columnsOfTable, toggleCheckBox }: Props): import("react/jsx-runtime").JSX.Element;
export {};
