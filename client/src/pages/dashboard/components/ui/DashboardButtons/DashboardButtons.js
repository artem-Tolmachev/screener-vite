import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import styles from './styles.module.css';
import { DropdownMenuComponent } from '@/shared/components/DropdownMenu/DropdownMenu';
import { DialogAddTicker } from '@/shared/components/Dialog/DialogAddTicker';
import { Button } from '@/components/ui/button';
import { Tooltip } from 'react-tooltip';
const DashboardSettings = ({ panelIndex, onToggleModal }) => {
    return (_jsx(_Fragment, { children: _jsxs("div", { className: "flex px-5 items-center", children: [_jsx(DropdownMenuComponent, { panelIndex: panelIndex }), _jsxs("div", { className: 'ml-auto flex items-center', children: [_jsx(DialogAddTicker, { panelIndex: panelIndex }), _jsxs("div", { onClick: () => onToggleModal('settings'), className: styles.filter, children: [_jsx(Button, { variant: "ghost", "data-tooltip-id": `tooltip-settings ${panelIndex}`, "data-tooltip-content": "\u041D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0438", className: 'cursor-pointer w-[40px] h-[40px] bg-blue-950 hover:bg-blue-900 active:bg-blue-700', children: _jsx("svg", { style: { width: '40px', height: '40px' }, xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 28 28", width: "28", height: "28", children: _jsx("path", { fill: "currentColor", d: "M7.5 13a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM5 14.5a2.5 2.5 0 1 1 5 0 2.5 2.5 0 0 1-5 0zm9.5-1.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM12 14.5a2.5 2.5 0 1 1 5 0 2.5 2.5 0 0 1-5 0zm9.5-1.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM19 14.5a2.5 2.5 0 1 1 5 0 2.5 2.5 0 0 1-5 0z" }) }) }), _jsx(Tooltip, { id: `tooltip-settings ${panelIndex}`, variant: "light", place: 'bottom-end', className: 'z-1000', style: { fontSize: '18px' } })] })] })] }) }));
};
export default DashboardSettings;
