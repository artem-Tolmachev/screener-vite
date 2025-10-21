import styles from './styles.module.css';
import { DropdownMenuComponent } from '@/shared/components/DropdownMenu/DropdownMenu';
import { DialogAddTicker } from '@/shared/components/Dialog/DialogAddTicker';
import { Button } from '@/components/ui/button';
import { Tooltip } from 'react-tooltip';

interface Props {
    onToggleModal: (arg: string)  => void;
    panelIndex: number;
}

const DashboardSettings = ({panelIndex, onToggleModal}: Props) => { 
    return (
            <>
                <div className="flex px-5 items-center">
                    <div 
                        data-tooltip-id={`tooltip-add-coin ${panelIndex}`}
                        data-tooltip-content="Настройки списков">
                        <DropdownMenuComponent 
                            panelIndex={panelIndex}
                        />
                    </div>
                    <div className='ml-auto flex items-center'>
                        <div
                            data-tooltip-id={`tooltip-add-coin ${panelIndex}`}
                            data-tooltip-content="Добавить инструмент"
                            className='h-full w-full flex'
                        >
                        <DialogAddTicker panelIndex={panelIndex}/>
                    </div>
                        <div onClick={() => onToggleModal('settings')} className={styles.filter}>
                            <Button  
                                variant="ghost" 
                                data-tooltip-id={`tooltip-settings ${panelIndex}`}
                                data-tooltip-content="Настройки"
                                className='cursor-pointer w-[40px] h-[40px] bg-blue-950 hover:bg-blue-900 active:bg-blue-700'
                                >
                                <svg style={{width: '40px', height: '40px'}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 28" width="28" height="28"><path fill="currentColor" d="M7.5 13a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM5 14.5a2.5 2.5 0 1 1 5 0 2.5 2.5 0 0 1-5 0zm9.5-1.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM12 14.5a2.5 2.5 0 1 1 5 0 2.5 2.5 0 0 1-5 0zm9.5-1.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM19 14.5a2.5 2.5 0 1 1 5 0 2.5 2.5 0 0 1-5 0z"></path>
                                </svg>
                            </Button>
                        </div>
                    </div>
                </div>
                <Tooltip
                    id={`tooltip-settings ${panelIndex}`}
                    variant="light"
                    place='bottom-end'
                    className='z-1000'
                    style={{ fontSize: '18px' }}
                />
                <Tooltip
                    id={`tooltip-add-coin ${panelIndex}`}
                    variant="light"
                    place='bottom-end'
                    className='z-1000'
                    style={{ fontSize: '18px'}}
                />
                <Tooltip
                    id={`tooltip-add-coin ${panelIndex}`}
                    variant="light"
                    place='bottom-end'
                    className='z-1000'
                    style={{ fontSize: '18px'}}
                />
            </>
    )
}

export default DashboardSettings;
