import { jsx as _jsx } from "react/jsx-runtime";
import { useEffect, useRef } from 'react';
import { RadioButtonsComponent } from '@/shared/components/RadioButtons/RadioButtonsComponent';
function PopupRadioButtons({ isClose, isOpen, coin, currentMarker }) {
    const popupRef = useRef(null);
    function handleClickOutside(event) {
        if (popupRef.current &&
            event.target instanceof Node &&
            !popupRef.current.contains(event.target)) {
            isClose(false);
        }
    }
    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);
    useEffect(() => {
        const handleMouseMove = (event) => {
            if (!popupRef.current)
                return;
            const rect = popupRef.current.getBoundingClientRect();
            const buffer = 30; // 5px отступ
            const outside = event.clientX < rect.left - buffer ||
                event.clientX > rect.right + buffer ||
                event.clientY < rect.top - buffer ||
                event.clientY > rect.bottom + buffer;
            if (outside) {
                isClose(false);
            }
        };
        document.addEventListener('mousemove', handleMouseMove);
        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);
    return (_jsx("div", { ref: popupRef, className: "rounded-4xl bg-gray-900 w-50 py-2 px-4  absolute left-8 top-1/2 transform -translate-y-1/2 transform ", children: _jsx(RadioButtonsComponent, { currentMarker: currentMarker, symbol: coin }) }));
}
export default PopupRadioButtons;
