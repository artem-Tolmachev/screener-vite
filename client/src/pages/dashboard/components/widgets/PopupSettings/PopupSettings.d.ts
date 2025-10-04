interface Props {
    isOpen: boolean | string;
    onToggleModal: (arg: boolean) => void;
    children: React.ReactNode;
    setLogoVisible: React.Dispatch<React.SetStateAction<1 | 0>>;
    logoVisible: number;
}
declare function PopupSettings({ isOpen, onToggleModal, children, setLogoVisible, logoVisible }: Props): import("react/jsx-runtime").JSX.Element;
export default PopupSettings;
