import { useEffect, useRef } from 'react';
import styles from './styles.module.css';
import CustomCheckbox from '@/shared/components/CustomCheckbox/CustomCheckbox';

interface Props {
  isOpen: boolean | string;
  onToggleModal: (arg: boolean) => void;
  children: React.ReactNode;
  setLogoVisible: React.Dispatch<React.SetStateAction<1 | 0>>
  logoVisible: number;
}

function PopupSettings({isOpen, onToggleModal, children, setLogoVisible, logoVisible}: Props){
  const popupRef = useRef<HTMLDivElement>(null);
  
  function handleClickOutside(event: MouseEvent) {
    if (popupRef.current &&
      event.target instanceof Node &&
      !popupRef.current.contains(event.target)) {
        onToggleModal(false)
    }
  }

  function hendleChecked(){
     setLogoVisible((prev) => (prev === 1 ? 0 : 1))
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div ref={popupRef} className="bg-gray-800 text-gray-300 w-50 p-4 absolute left-1/2 -translate-x-1/2 top-1/2 z-10">
      <h3 className={styles.settingTitle}>НАСТРОЙКА СТОЛБЦОВ</h3>
      <div>
        {children}
      </div>
      <CustomCheckbox 
        label="Лого"
        checked={logoVisible}
        onChange={hendleChecked}
      />
    </div>
  )
}

export default PopupSettings;
