import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger, DialogDescription } from "@/components/ui/dialog";
import IconFlag from "@/pages/dashboard/components/ui/IconFlag/IconFlag";
import { DialogTitle } from "@radix-ui/react-dialog";
export default function DialogRadioButtons() {
    return (_jsxs(Dialog, { children: [_jsx(DialogTrigger, { asChild: true, children: _jsx(Button, { variant: "secondary", size: "icon", className: "flex justify-start text-lg text-blue-200  hover:text-blue-200 cursor-pointer", children: _jsx(IconFlag, {}) }) }), _jsxs(DialogContent, { className: "sm:max-w-md bg-gray-600", hideCloseIcon: true, children: [_jsx(DialogTitle, { className: "sr-only", children: "\u041F\u043E\u0434\u0442\u0432\u0435\u0440\u0434\u0438\u0442\u0435 \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u044F" }), _jsx(DialogDescription, { className: "sr-only" })] })] }));
}
