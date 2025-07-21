import styles from './styles.module.css';
import { DropdownMenuComponent } from '@/shared/components/DropdownMenu/DropdownMenu';

interface Props {
     onToggleModal: (arg: string)  => void;
}

const DashboardSettings = ({ onToggleModal}: Props) => {

    return (
        <>
            <div className="flex px-5">
                <DropdownMenuComponent/>
                <div className='ml-auto flex'>
                    <div onClick={() => onToggleModal('add')} className={styles.filter}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 28" width="28" height="28" fill="none"><path fill="currentColor" d="M7 13h7V6h1v7h7v1h-7v7h-1v-7H7v-1z"></path></svg>
                    </div>
                    <div onClick={() => onToggleModal('settings')} className={styles.filter}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 28" width="28" height="28"><path fill="currentColor" d="M7.5 13a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM5 14.5a2.5 2.5 0 1 1 5 0 2.5 2.5 0 0 1-5 0zm9.5-1.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM12 14.5a2.5 2.5 0 1 1 5 0 2.5 2.5 0 0 1-5 0zm9.5-1.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM19 14.5a2.5 2.5 0 1 1 5 0 2.5 2.5 0 0 1-5 0z"></path></svg>
                    </div>
                </div>
            </div>
        </>
    )
}
export default DashboardSettings;




