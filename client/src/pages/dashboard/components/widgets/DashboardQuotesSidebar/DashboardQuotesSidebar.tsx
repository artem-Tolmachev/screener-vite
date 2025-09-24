import styles from './styles.module.css';
import { useEffect, useState } from 'react';
import DashboardPanelHeader from '../DashboardPanelHeader/DashboardPanelHeader';
import DashboardTickerOut from '../DashboardTickerOut/DashboardTickerOut';
import { useAppDispatch } from '@/app/store/store';
import { useGetCoinsQuery } from '@/pages/dashboard/coinData/services/getApiCoins';
import { useCollums } from '@/pages/dashboard/hooks/useCollums';
import { defaultLoading } from '@/pages/dashboard/coinData/slices/CoinsSlice';
import { AllDataCoin, IDashboardHeaderItems, MarketData } from '@/pages/dashboard/types';
import DashboardSkeleton from '@/shared/components/Skeleton/DashBoardSkeleton';

interface IControlCheced {
    columns: IDashboardHeaderItems[];
    toggleCheckBox: (arg: string) => void;
}
interface Props {
    isActive: boolean;
   selectedCoin: MarketData[];   
   panelIndex: number;  
   screensDataArray: AllDataCoin[] | undefined;             
}
const DashboardQuotesSidebar = ({screensDataArray, panelIndex, selectedCoin, isActive}:Props) => {
    const [isOpen, setIsOpen] = useState<boolean | string>(false);
    const { columns, toggleCheckBox }: IControlCheced = useCollums([
        { key: 'volume', name: 'Объем', visible: 1 },
        { key: 'price', name: 'Цена', visible: 1 },
        { key: 'turnover', name: 'Оборот', visible: 1 }
    ])
    const { data, isLoading } = useGetCoinsQuery();
    const dispatch = useAppDispatch();
    useEffect(() => {
        if (data?.btcUsdt) {
            dispatch(defaultLoading(data.btcUsdt));
        }
    }, [data?.btcUsdt]);

    const tickers = data?.tickers;

    if (isLoading) {
        return <DashboardSkeleton />;
    }

    if (!tickers) {
        return <DashboardSkeleton />;
    }
    
    return (
        <div className="w-full rounded-tl-[8px] bg-gray-950 h-full min-h-0 flex flex-col">
            <div className={`${styles.dashbord_right} parents-block`}>
                <DashboardPanelHeader
                    isOpen={isOpen}
                    onToggleModal={setIsOpen}
                    columns={columns}
                    toggleCheckBox={toggleCheckBox}
                    panelIndex={panelIndex}
                />
                <DashboardTickerOut
                    columns={columns}
                    selectedCoin={selectedCoin}
                    isActive={isActive}
                    panelIndex={panelIndex}
                    screensDataArray={screensDataArray}
                />
            </div>
        </div>
    )
}
export default DashboardQuotesSidebar;