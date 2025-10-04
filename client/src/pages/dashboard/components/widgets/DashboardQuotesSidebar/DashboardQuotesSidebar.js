import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import styles from './styles.module.css';
import { useEffect, useState } from 'react';
import DashboardPanelHeader from '../DashboardPanelHeader/DashboardPanelHeader';
import DashboardTickerOut from '../DashboardTickerOut/DashboardTickerOut';
import { useAppDispatch } from '@/app/store/store';
import { useGetCoinsQuery } from '@/pages/dashboard/coinData/services/getApiCoins';
import { useCollums } from '@/pages/dashboard/hooks/useCollums';
import { defaultLoading, setBtcUsdt } from '@/pages/dashboard/coinData/slices/CoinsSlice';
import DashboardSkeleton from '@/shared/components/Skeleton/DashBoardSkeleton';
const DashboardQuotesSidebar = ({ screensDataArray, panelIndex, isActive }) => {
    const [isOpen, setIsOpen] = useState(false);
    const { columns, toggleCheckBox } = useCollums([
        { key: 'price', name: 'Цена', visible: 1 },
        { key: 'volume', name: 'Объем', visible: 1 },
        { key: 'turnover', name: 'Оборот', visible: 1 }
    ]);
    const { data, isLoading } = useGetCoinsQuery();
    const dispatch = useAppDispatch();
    useEffect(() => {
        if (data?.btcUsdt) {
            dispatch(defaultLoading(data.btcUsdt));
        }
    }, [data?.btcUsdt]);
    useEffect(() => {
        if (data?.btcUsdt) {
            dispatch(setBtcUsdt(data.btcUsdt));
        }
    }, [data?.btcUsdt]);
    const tickers = data?.tickers;
    if (isLoading) {
        return _jsx(DashboardSkeleton, {});
    }
    if (!tickers) {
        return _jsx(DashboardSkeleton, {});
    }
    return (_jsx("div", { className: "w-full rounded-tl-[8px] bg-gray-950 h-full min-h-0 flex flex-col", children: _jsxs("div", { className: `${styles.dashbord_right} parents-block`, children: [_jsx(DashboardPanelHeader, { isOpen: isOpen, onToggleModal: setIsOpen, columns: columns, toggleCheckBox: toggleCheckBox, panelIndex: panelIndex }), _jsx(DashboardTickerOut, { columns: columns, isActive: isActive, panelIndex: panelIndex, screensDataArray: screensDataArray })] }) }));
};
export default DashboardQuotesSidebar;
