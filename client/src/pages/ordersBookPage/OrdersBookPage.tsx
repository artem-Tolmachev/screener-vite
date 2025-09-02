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
const [getOrdersbook, {data, isLoading} ] = useGetOrdersbookMutation();
const [updateOrdersBookTickersData, {data: updateTickers}] = useUpdateOrdersBookTickersDataMutation();
const updatedPrice = updateTickers ?? [];
const orders = data ? Object.keys(data) : [];
const [countOfOrders, setCountOfOrders] = useState(0);
const [radioBtn, setRadioBtn] = useState("all"); 
const { columns, toggleCheckBox, hideAllColumns}  = useCollums([
    { key: 'symbol', name: 'Пара', visible: 1 },
    { key: 'distance', name: 'Расстояние до заявки (%)', visible: 1 },
    { key: 'duration', name: 'Длительность заявки', visible: 1 },
    { key: 'type', name: 'Тип заявки', visible: 1 },
    { key: 'volume', name: 'Объем заявки в монетах', visible: 1 },
    { key: 'volume$', name: 'Объем заявки в ($)', visible: 1 },
    { key: 'price', name: 'Цена инструмента', visible: 1 },
])

const PAGE_SIZE = 8
const [currentPage, setCurrentPage] = useState(1);
const startIndex = (currentPage - 1) * PAGE_SIZE;
const countOfPage = Math.ceil(countOfOrders / PAGE_SIZE);

const allRows = getOrderRows({orders, updatedPrice, data, columns, radioBtn})
const paginatedRows = allRows.slice(startIndex, startIndex + PAGE_SIZE);

useEffect(() => {
    const fetch = async () => {
        try {
            await getOrdersbook(filter).unwrap(); 
        } catch (err) {
            console.error('Ошибка при получении ордербука:', err);
        }
    };
    fetch();
}, [filter, getOrdersbook]);

useEffect(() => {
    updateOrdersBookTickersData(orders)
    const interval = setInterval(() => {updateOrdersBookTickersData(orders)}, 50000)
    return () => clearInterval(interval)
}, [data]);

useEffect(() => {
    if (!data) return;
    setCountOfOrders(allRows.length)
    setCurrentPage(1)
}, [allRows.length]);

if (isLoading) return (
<>
    <SettingSection 
        toggleCheckBox={toggleCheckBox} 
        columnsOfTable={columns}
        radioBtn={radioBtn}
        setRadioBtn={setRadioBtn}
        hideAllColumns={hideAllColumns}
    />
    <OrdersBookPageSkeleton/>
</>);

    return (
        <div className='h-full'>
            {isLoading && <>
            <SettingSection 
                toggleCheckBox={toggleCheckBox} 
                columnsOfTable={columns}
                radioBtn={radioBtn}
                setRadioBtn={setRadioBtn}
                hideAllColumns={hideAllColumns}
            />
            <OrdersBookPageSkeleton/>
            </>}
            <div className='wr-table px-3 box-border'>
            {allRows.length === 0 
                ?<div className='flex justify-center mb-2 w-full'>
                    <div className='p-3 bg-gray-700 w-fit'>
                        <p className='text-[18px] text-gray-100'>Записей с текущими настройками не найдено</p>
                    </div>
                </div>
                :<PaginationOderBookPage 
                    setCurrentPage={setCurrentPage} 
                    currentPage={currentPage}
                    countOfPage={countOfPage}
                />
            }
                <TableOrderBook columns={columns} paginatedRows={paginatedRows}/>
            </div>
        </div>
    )
};

export default OrdersBookPage



