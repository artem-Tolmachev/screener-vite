import styles from './styles.module.css';
import { useEffect, useState } from 'react';
import DashboardPanelHeader from '../DashboardPanelHeader/DashboardPanelHeader';
import CoinSearchPopup from '../CoinSearchPopup/CoinSearchPopup';
import PopupAdditem from '../PopupAdditem/PopupAdditem';
import DashboardTickerOut from '../DashboardTickerOut/DashboardTickerOut';
import { useAppDispatch } from '@/app/store/store';
import { useGetCoinsQuery } from '@/pages/dashboard/coinData/services/getApiCoins';
import { useCollums } from '@/pages/dashboard/hooks/useCollums';
import { defaultLoading } from '@/pages/dashboard/coinData/slices/CoinsSlice';
import { IDashboardHeaderItems } from '@/pages/dashboard/types';

interface IControlCheced {
    columns: IDashboardHeaderItems[];
    toggleCheckBox: (arg: string) => void;
}

const DashboardQuotesSidebar = () => {
    const [isOpen, setIsOpen] = useState<boolean | string>(false);
    const { columns, toggleCheckBox }: IControlCheced = useCollums([
        { key: 'volume', name: 'Объем', visible: 1 },
        { key: 'price', name: 'Цена', visible: 1 },
        { key: 'turnover', name: 'Оборот', visible: 1 }
    ])

    const { data } = useGetCoinsQuery();
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (data?.btcUsdt) {
            dispatch(defaultLoading(data.btcUsdt));
        }
    }, [data?.btcUsdt]);

    const tickers = data?.tickers;

    if (!tickers) return <>Нет данных</>
    
    return (
        <div className="w-full rounded-t-[8px] bg-gray-950 h-full min-h-0 flex flex-col">
            <div className={`${styles.dashbord_right} parents-block`}>
                <DashboardPanelHeader
                    isOpen={isOpen}
                    onToggleModal={setIsOpen}
                    columns={columns}
                    toggleCheckBox={toggleCheckBox}
                />
                {isOpen === 'add'
                    && <PopupAdditem
                        isOpen={isOpen}
                        onToggleModal={setIsOpen}
                    >
                        {
                            isOpen === 'add' &&
                            <CoinSearchPopup tickers={tickers} onToggleModal={setIsOpen} />
                        }
                    </PopupAdditem>}
                <DashboardTickerOut
                    columns={columns}
                />
            </div>
        </div>
    )
}
export default DashboardQuotesSidebar;