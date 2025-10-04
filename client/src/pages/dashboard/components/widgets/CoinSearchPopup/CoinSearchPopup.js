import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import Search from '@/shared/components/Search/Search';
import styles from './styles.module.css';
import { useState } from 'react';
import Loader from '@/pages/dashboard/components/ui/Loader/Loader';
import { useDebounce } from '@/pages/dashboard/hooks/useDebounce';
import { useFilter } from '@/pages/dashboard/hooks/useFilter';
const CoinSearchPopup = ({ tickers, panelIndex }) => {
    const [value, setValue] = useState('');
    const data = useDebounce(value, 1000);
    const filtred = useFilter(data, tickers);
    return (_jsxs(_Fragment, { children: [_jsx("div", { className: styles.header, children: _jsx("h3", { className: styles.addTitle, children: "\u0412\u044B\u0431\u0440\u0430\u0442\u044C \u0438\u043D\u0441\u0442\u0440\u0443\u043C\u0435\u043D\u0442" }) }), _jsxs("div", { className: styles.addWrapper, children: [_jsx(Search, { onChange: setValue, value: value }), _jsxs("div", { className: styles.buttons, children: [_jsx("button", { className: `${styles.btn} ${styles.btn_active}`, children: "\u0412\u0441\u0435" }), _jsx("button", { className: styles.btn, children: "\u0410\u043A\u0446\u0438\u0438" }), _jsx("button", { className: styles.btn, children: "\u0424\u043E\u043D\u0434\u044B" }), _jsx("button", { className: styles.btn, children: "\u0424\u044C\u044E\u0447\u0435\u0440\u0441\u044B" })] }), _jsx(Loader, { tick: filtred, panelIndex: panelIndex })] })] }));
};
export default CoinSearchPopup;
