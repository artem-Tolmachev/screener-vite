import { useState } from "react";
import { IDashboardHeaderItems } from "../types";

export const useCollums = (col: IDashboardHeaderItems[]) => {
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
 return {columns, toggleCheckBox};
}