import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import styles from './styles.module.css';
function CustomCheckbox({ checked, onChange, label }) {
    const isChecked = checked === 1;
    return (_jsxs("label", { className: styles.container, children: [_jsx("input", { type: "checkbox", checked: isChecked, onChange: onChange }), _jsx("span", { className: styles.checkmark }), _jsx("span", { className: styles.label, children: label })] }));
}
export default CustomCheckbox;
