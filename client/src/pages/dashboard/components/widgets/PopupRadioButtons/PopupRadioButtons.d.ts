interface Props {
    isOpen: boolean | string;
    coin: string;
    currentMarker: string;
    isClose: (args: boolean) => void;
}
declare function PopupRadioButtons({ isClose, isOpen, coin, currentMarker }: Props): import("react/jsx-runtime").JSX.Element;
export default PopupRadioButtons;
