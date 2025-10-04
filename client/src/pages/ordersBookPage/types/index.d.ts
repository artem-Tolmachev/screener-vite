import { IDashboardHeaderItems } from "@/pages/dashboard/types";
import { SetStateAction, Dispatch } from "react";
export type OrdersBookResponse = {
    [symbol: string]: {
        bids: [number, number][];
        asks: [number, number][];
        time: number;
    };
};
export type CurrentPrice = {
    symbol: string;
    bid1Price: number;
    ask1Price: number;
};
export interface IControlCheced {
    columns: IDashboardHeaderItems[];
    toggleCheckBox: (arg: string) => void;
    setColumns: Dispatch<SetStateAction<IDashboardHeaderItems[]>>;
    hideAllColumns: () => void;
}
