import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useRef } from 'react';
import styles from './styles.module.css';
import CustomCheckbox from '@/shared/components/CustomCheckbox/CustomCheckbox';
function PopupSettings({ isOpen, onToggleModal, children, setLogoVisible, logoVisible }) {
    const popupRef = useRef(null);
    function handleClickOutside(event) {
        if (popupRef.current &&
            event.target instanceof Node &&
            !popupRef.current.contains(event.target)) {
            onToggleModal(false);
        }
    }
    function hendleChecked() {
        setLogoVisible((prev) => (prev === 1 ? 0 : 1));
    }
    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);
    return (_jsxs("div", { ref: popupRef, className: "bg-gray-800 text-gray-300 w-50 p-4 absolute left-1/2 -translate-x-1/2 top-1/2 z-10", children: [_jsx("h3", { className: styles.settingTitle, children: "\u041D\u0410\u0421\u0422\u0420\u041E\u0419\u041A\u0410 \u0421\u0422\u041E\u041B\u0411\u0426\u041E\u0412" }), _jsx("div", { children: children }), _jsx(CustomCheckbox, { label: "\u041B\u043E\u0433\u043E", checked: logoVisible, onChange: hendleChecked })] }));
}
export default PopupSettings;
