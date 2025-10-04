import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import IconBookmarkPlus from "../Icons/IconBookmarkPlus";
import { useState } from "react";
import useCreateNewWatchList from "@/pages/dashboard/hooks/useCreateNewWatchList";
import { Input } from "@/components/ui/input";
import { useAppDispatch, useAppSelector } from "@/app/store/store";
import { setActiveList } from "@/pages/dashboard/coinData/slices/CoinsSlice";
export default function DialogComponentCreateList({ setListnameSelect }) {
    const [listName, setListname] = useState('');
    const panelIndex = useAppSelector(store => store.coins.panelIndex);
    const addListToStore = useCreateNewWatchList(listName, setListname, panelIndex);
    const screenId = useAppSelector(store => store.coins.mainScreen);
    const dispatch = useAppDispatch();
    function handelSave() {
        setListnameSelect(listName);
        addListToStore();
        dispatch(setActiveList({ listName, panelIndex, screenId }));
    }
    return (_jsxs(Dialog, { children: [_jsx(DialogTrigger, { asChild: true, children: _jsxs(Button, { variant: "link", className: " flex justify-start text-lg text-blue-200  hover:text-blue-200 cursor-pointer", children: ["\u0421\u043E\u0437\u0434\u0430\u0442\u044C \u043D\u043E\u0432\u044B\u0439 \u0441\u043F\u0438\u0441\u043E\u043A", _jsx(IconBookmarkPlus, { className: "dialogIcon", style: { width: '22px', height: '22px' } })] }) }), _jsxs(DialogContent, { className: "sm:max-w-md bg-gray-600", children: [_jsx(DialogHeader, { children: _jsx(DialogTitle, { children: "\u041D\u043E\u0432\u044B\u0439 \u0441\u043F\u0438\u0441\u043E\u043A" }) }), _jsx(DialogDescription, { children: "\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u043D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 \u0438 \u043D\u0430\u0436\u043C\u0438\u0442\u0435 \"\u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C\"." }), _jsx("div", { className: "flex items-center gap-2", children: _jsxs("div", { className: "grid flex-1 gap-2", children: [_jsx(Label, { htmlFor: "link", className: "sr-only", children: "Link" }), _jsx(Input, { id: "link", placeholder: "\u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 \u0441\u043F\u0438\u0441\u043A\u0430", value: listName, onChange: (e) => setListname(e.target.value) })] }) }), _jsx(DialogFooter, { className: "sm:justify-start", children: _jsx(DialogClose, { asChild: true, children: _jsx(Button, { onClick: handelSave, type: "button", variant: "secondary", className: "bg-gray-800 text-neutral-50 hover:bg-gray-700", children: "\u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C" }) }) })] })] }));
}
