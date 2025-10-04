import { IDashboardHeaderItems } from "@/pages/dashboard/types";
import React from "react";
interface Props {
    paginatedRows: React.ReactNode[];
    columns: IDashboardHeaderItems[];
}
export declare function TableOrderBook({ paginatedRows, columns }: Props): import("react/jsx-runtime").JSX.Element;
export {};
