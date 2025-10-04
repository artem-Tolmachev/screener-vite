import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useAppSelector } from '@/app/store/store';
import SettingSection from './SettingSection/SettingSection';
import { useGetOrdersbookMutation, useUpdateOrdersBookTickersDataMutation } from "@/pages/dashboard/coinData/services/getApiCoins";
import { useEffect, useState } from 'react';
import { TableOrderBook } from '@/shared/components/Table/TableOrderBook';
import { PaginationOderBookPage } from '@/shared/components/Pagination/PaginationOderBookPage';
import { getOrderRows } from './helpers/getOrderRows';
import OrdersBookPageSkeleton from '@/shared/components/Skeleton/OrdersBookPageSkeleton';
import { useCollums } from '../dashboard/hooks/useCollums';
const OrdersBookPage = () => {
    const filter = useAppSelector((state) => state.ordersBook.ordersFilter);
    const [getOrdersbook, { data, isLoading }] = useGetOrdersbookMutation();
    const [updateOrdersBookTickersData, { data: updateTickers }] = useUpdateOrdersBookTickersDataMutation();
    const updatedPrice = updateTickers ?? [];
    const orders = data ? Object.keys(data) : [];
    const [countOfOrders, setCountOfOrders] = useState(0);
    const [radioBtn, setRadioBtn] = useState("all");
    const { columns, toggleCheckBox, hideAllColumns } = useCollums([
        { key: 'symbol', name: 'Пара', visible: 1 },
        { key: 'distance', name: 'Расстояние до заявки (%)', visible: 1 },
        { key: 'duration', name: 'Длительность заявки', visible: 1 },
        { key: 'type', name: 'Тип заявки', visible: 1 },
        { key: 'volume', name: 'Объем заявки в монетах', visible: 1 },
        { key: 'volume$', name: 'Объем заявки в ($)', visible: 1 },
        { key: 'price', name: 'Цена инструмента', visible: 1 },
    ]);
    const PAGE_SIZE = 8;
    const [currentPage, setCurrentPage] = useState(1);
    const startIndex = (currentPage - 1) * PAGE_SIZE;
    const countOfPage = Math.ceil(countOfOrders / PAGE_SIZE);
    const allRows = getOrderRows({ orders, updatedPrice, data, columns, radioBtn });
    const paginatedRows = allRows.slice(startIndex, startIndex + PAGE_SIZE);
    useEffect(() => {
        const fetch = async () => {
            try {
                await getOrdersbook(filter).unwrap();
            }
            catch (err) {
                console.error('Ошибка при получении ордербука:', err);
            }
        };
        fetch();
    }, [filter, getOrdersbook]);
    useEffect(() => {
        updateOrdersBookTickersData(orders);
        const interval = setInterval(() => { updateOrdersBookTickersData(orders); }, 50000);
        return () => clearInterval(interval);
    }, [data]);
    useEffect(() => {
        if (!data)
            return;
        setCountOfOrders(allRows.length);
        setCurrentPage(1);
    }, [allRows.length]);
    return (_jsxs("div", { className: 'h-full', children: [_jsx(SettingSection, { toggleCheckBox: toggleCheckBox, columnsOfTable: columns, radioBtn: radioBtn, setRadioBtn: setRadioBtn, hideAllColumns: hideAllColumns }), isLoading
                ? _jsx(OrdersBookPageSkeleton, {})
                : _jsxs("div", { className: 'wr-table px-3 box-border', children: [allRows.length === 0
                            ? _jsx("div", { className: 'flex justify-center mb-2 w-full', children: _jsx("div", { className: 'p-3 bg-gray-700 w-fit', children: _jsx("p", { className: 'text-[18px] text-gray-100', children: "\u0417\u0430\u043F\u0438\u0441\u0435\u0439 \u0441 \u0442\u0435\u043A\u0443\u0449\u0438\u043C\u0438 \u043D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0430\u043C\u0438 \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D\u043E" }) }) })
                            : _jsx(PaginationOderBookPage, { setCurrentPage: setCurrentPage, currentPage: currentPage, countOfPage: countOfPage }), _jsx(TableOrderBook, { columns: columns, paginatedRows: paginatedRows })] })] }));
};
export default OrdersBookPage;
