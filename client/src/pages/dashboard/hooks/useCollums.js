import { useState } from "react";
export const useCollums = (col) => {
    const [columns, setColumns] = useState(col);
    function toggleCheckBox(key) {
        let updatedColums = columns.map(col => {
            if (col.key === key) {
                return { ...col, visible: col.visible === 1 ? 0 : 1 };
            }
            else {
                return col;
            }
        });
        setColumns(updatedColums);
    }
    const hideAllColumns = () => {
        setColumns(prev => prev.map(col => ({
            ...col,
            visible: 1
        })));
    };
    return { columns, toggleCheckBox, setColumns, hideAllColumns };
};
