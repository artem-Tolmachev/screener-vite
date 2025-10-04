import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import styles from './styles.module.css';
const Search = ({ onChange, value }) => {
    return (_jsxs("label", { htmlFor: "input", className: styles.label, children: [_jsx("span", { className: styles.icon, children: _jsx("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 28 28", width: "28", height: "28", fill: "none", children: _jsx("path", { stroke: "currentColor", d: "M17.4 17.5a7 7 0 1 0-4.9 2c1.9 0 3.64-.76 4.9-2zm0 0l5.1 5" }) }) }), _jsx("input", { type: "text", id: 'input', className: styles.input, value: value, onChange: (e) => onChange(e.target.value) })] }));
};
export default Search;
