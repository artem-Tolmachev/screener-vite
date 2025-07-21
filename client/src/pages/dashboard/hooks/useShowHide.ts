import { useState } from "react";

export default function useShowHide(initial = false){
        const [isVisible, setIsVisible] = useState(initial);
        const [name, setName] = useState('');

        const show = () => setIsVisible(true)
        const hide = () => setIsVisible(false)
        const symbol = (ticker: string) => setName(ticker)

        return {show, hide, isVisible, symbol, name}
}