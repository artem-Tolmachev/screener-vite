import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import styles from './styles.module.css';
import CustomCheckbox from '@/shared/components/CustomCheckbox/CustomCheckbox';
import PopupSettings from '../PopupSettings/PopupSettings';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/store/store';
import { checkedLogo } from '@/pages/dashboard/coinData/slices/CoinsSlice';
import DashboardSettings from '@/pages/dashboard/components/ui/DashboardButtons/DashboardButtons';
const DashboardPanelHeader = ({ panelIndex, isOpen, onToggleModal, columns, toggleCheckBox }) => {
    const [logoVisible, setLogoVisible] = useState(1);
    const panelId = useAppSelector(store => store.coins.mainScreen);
    const dispatchLogo = useAppDispatch();
    useEffect(() => {
        dispatchLogo(checkedLogo({ isLogo: (logoVisible === 1), panelIndex, panelId }));
    }, [logoVisible]);
    return (_jsxs("div", { className: styles.header, children: [_jsx(DashboardSettings, { onToggleModal: onToggleModal, panelIndex: panelIndex }), isOpen === 'settings'
                && _jsx(PopupSettings, { isOpen: isOpen, onToggleModal: onToggleModal, setLogoVisible: setLogoVisible, logoVisible: logoVisible, children: columns.map((checked) => (_jsx(CustomCheckbox, { label: checked.name, checked: checked.visible, onChange: () => toggleCheckBox(checked.key) }, checked.key))) }), _jsxs("div", { className: "flex h-[100%] items-end mx-5", children: [_jsx("div", { className: "w-[160px] flex items-center text-sm overflow-hidden fs-sm", children: "\u041E\u043F\u0438\u0441\u0430\u0435\u0438\u0435" }), columns
                        .filter(col => col.visible !== 0)
                        .map((col, index) => (_jsx("div", { className: "w-[100px] text-right text-sm", children: _jsx("div", { children: col.name }) }, `${col.key}-${index}`)))] })] }));
};
export default DashboardPanelHeader;
