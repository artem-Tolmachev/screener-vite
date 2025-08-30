import { useState } from "react";
import { IDashboardHeaderItems } from "../types";
import { IControlCheced } from "@/pages/ordersBookPage/types";

export const useCollums = (col: IDashboardHeaderItems[]): IControlCheced => {
    const [columns, setColumns] = useState<IDashboardHeaderItems[]>(col)

    function toggleCheckBox(key: string) {
            let updatedColums = columns.map(col => {
                if (col.key === key) {
                    return { ...col, visible: col.visible === 1 ? 0 : 1 };
                } else {
                    return col
                }
            }
        );
        setColumns(updatedColums)
    }

    const hideAllColumns = () => {
        setColumns(prev =>
        prev.map(col => ({
            ...col,
            visible: 1
        }))
        );
    };

    return {columns, toggleCheckBox, setColumns, hideAllColumns};
}