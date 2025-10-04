import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useAppSelector } from "@/app/store/store";
const IconCoin = ({ panelIndex, symbol, src, VorceVisible }) => {
    const screenId = useAppSelector(state => state.coins.mainScreen);
    const allScreens = useAppSelector(state => state.coins.allscreens);
    const ativeArray = allScreens.find(el => el.id === screenId);
    if (!ativeArray)
        return;
    const activeScreen = ativeArray.screens[panelIndex];
    if (!activeScreen)
        return;
    const isLogo = activeScreen.isLogo;
    const showLogo = VorceVisible ?? isLogo;
    return (_jsxs("div", { className: "flex items-center h-full max-w-full min-w-0 ", children: [showLogo ? _jsx("img", { className: "w-5 h-5 mr-1 rounded-full", src: src, width: "20px", height: "20px", loading: "lazy", onError: (e) => {
                    e.currentTarget.src = 'https://s3-symbol-logo.tradingview.com/crypto/XTVCUSDT.svg';
                } }) : null, _jsx("span", { className: "truncate", children: symbol })] }));
};
export default IconCoin;
