import { useEffect, useRef} from 'react';
import { RadioButtonsComponent } from '@/shared/components/RadioButtons/RadioButtonsComponent';

interface Props {
  isOpen: boolean | string;
  coin: string;
  currentMarker: string;
  isClose: (args: boolean) => void
}

function PopupRadioButtons({isClose,  isOpen, coin, currentMarker}: Props){
  const popupRef = useRef<HTMLDivElement>(null);
  
  function handleClickOutside(event: MouseEvent) {
    if (popupRef.current &&
      event.target instanceof Node &&
      !popupRef.current.contains(event.target)) {
        isClose(false)
    }
  }
  useEffect(() => {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [isOpen]);

  useEffect(() => {
  const handleMouseMove = (event: MouseEvent) => {
    if (!popupRef.current) return;

    const rect = popupRef.current.getBoundingClientRect();

    const buffer = 30; // 5px отступ
    const outside =
      event.clientX < rect.left - buffer ||
      event.clientX > rect.right + buffer ||
      event.clientY < rect.top - buffer ||
      event.clientY > rect.bottom + buffer;

    if (outside) {
      isClose(false);
    }
  };

  document.addEventListener('mousemove', handleMouseMove);

  return () => {
    document.removeEventListener('mousemove', handleMouseMove);
  };
}, []);
  
  return (
    <div ref={popupRef}  className="rounded-4xl bg-gray-900 w-50 py-2 px-4  absolute left-8 top-1/2 transform -translate-y-1/2 transform ">
        <RadioButtonsComponent currentMarker={currentMarker} symbol={coin}/>
    </div>
  )
}

export default PopupRadioButtons;
