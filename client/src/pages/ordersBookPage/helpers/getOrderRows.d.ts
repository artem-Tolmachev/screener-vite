import { CurrentPrice, OrdersBookResponse } from "../types";
import { IDashboardHeaderItems } from "@/pages/dashboard/types";
interface Props {
    orders: string[];
    data: OrdersBookResponse | undefined;
    updatedPrice: CurrentPrice[];
    columns: IDashboardHeaderItems[];
    radioBtn: string;
}
export declare function getOrderRows({ updatedPrice, orders, data, columns, radioBtn }: Props): import("react").ReactNode[];
export {};
