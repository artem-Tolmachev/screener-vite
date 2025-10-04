import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger, } from "@/components/ui/dialog";
import IconSetting from "../Icons/IconSetting";
import { TabsSettings } from "../Tabs/TabsSettings";
import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog";
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
export function DialogForm({ hideAllColumns, columnsOfTable, toggleCheckBox, radioBtn, setRadioBtn }) {
    return (_jsxs(Dialog, { children: [_jsx(DialogTrigger, { asChild: true, children: _jsxs(Button, { variant: "ghost", className: "cursor-pointer text-xl text-gray-300 hover:text-gray-100", children: ["\u041D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0438 \u0441\u043A\u0440\u0438\u043D\u0435\u0440\u0430", _jsx(IconSetting, {})] }) }), _jsxs(DialogContent, { className: "border-1 border-white sm:max-w-[90%] text-gray-300 p-0  bg-gray-800 h-[70%px]", children: [_jsx(TabsSettings, { toggleCheckBox: toggleCheckBox, columnsOfTable: columnsOfTable, radioBtn: radioBtn, setRadioBtn: setRadioBtn, hideAllColumns: hideAllColumns }), _jsxs(VisuallyHidden, { children: [_jsx(DialogDescription, { children: "\u0417\u0434\u0435\u0441\u044C \u0432\u044B \u043C\u043E\u0436\u0435\u0442\u0435 \u0438\u0437\u043C\u0435\u043D\u0438\u0442\u044C \u043F\u0430\u0440\u0430\u043C\u0435\u0442\u0440\u044B \u043E\u0442\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u044F \u043E\u0440\u0434\u0435\u0440\u0431\u0443\u043A\u0430." }), _jsx(DialogTitle, { children: "Edit profile" })] })] })] }));
}
