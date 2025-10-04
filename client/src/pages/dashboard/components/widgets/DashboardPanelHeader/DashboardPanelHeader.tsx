import styles from './styles.module.css';
import CustomCheckbox from '@/shared/components/CustomCheckbox/CustomCheckbox';
import PopupSettings from '../PopupSettings/PopupSettings';
import { IDashboardHeaderItems } from '@/pages/dashboard/types';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/store/store';
import { checkedLogo } from '@/pages/dashboard/coinData/slices/CoinsSlice';
import DashboardSettings from '@/pages/dashboard/components/ui/DashboardButtons/DashboardButtons';

interface Props {
    isOpen: boolean | string;
    onToggleModal: (arg: string | boolean) => void;
    columns: IDashboardHeaderItems[];
    toggleCheckBox: (arg: string) => void;
    panelIndex: number;
}

const DashboardPanelHeader = ({panelIndex, isOpen, onToggleModal, columns, toggleCheckBox}: Props) => {
    const [logoVisible, setLogoVisible] = useState<1 | 0>(1);
    const panelId = useAppSelector(store => store.coins.mainScreen);
    const dispatchLogo = useAppDispatch();

    useEffect(() => {
        dispatchLogo(checkedLogo({isLogo: (logoVisible === 1), panelIndex, panelId}));
    }, [logoVisible]);

    return (
        <div className={styles.header}>
            <DashboardSettings 
                onToggleModal={onToggleModal}
                panelIndex={panelIndex}
            />
            {isOpen === 'settings'
                && <PopupSettings
                    isOpen={isOpen}
                    onToggleModal={onToggleModal}
                    setLogoVisible={setLogoVisible}
                    logoVisible={logoVisible}
                >
                    {columns.map((checked) => (
                        <CustomCheckbox
                            key={checked.key}
                            label={checked.name}
                            checked={checked.visible}
                            onChange={() => toggleCheckBox(checked.key)}
                        />
                    ))}
                </PopupSettings>}
            <div className="flex h-[100%] items-end mx-5">
                <div className="w-[160px] flex items-center text-sm overflow-hidden fs-sm">Описаеие</div>
                {columns
                    .filter(col => col.visible !== 0)
                    .map((col, index) => (
                        <div className="w-[100px] text-right text-sm" key={`${col.key}-${index}`}>
                            <div>{col.name}</div>
                        </div>
                    ))}
            </div>
        </div>
    )
}

export default DashboardPanelHeader;




