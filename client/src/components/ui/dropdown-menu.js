import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { CheckIcon, ChevronRightIcon, CircleIcon } from "lucide-react";
import { cn } from "@/lib/utils";
// Root & Portal
const DropdownMenu = DropdownMenuPrimitive.Root;
const DropdownMenuPortal = DropdownMenuPrimitive.Portal;
const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup;
const DropdownMenuGroup = DropdownMenuPrimitive.Group;
const DropdownMenuSub = DropdownMenuPrimitive.Sub;
// Trigger
const DropdownMenuTrigger = React.forwardRef((props, ref) => (_jsx(DropdownMenuPrimitive.Trigger, { ref: ref, "data-slot": "dropdown-menu-trigger", ...props })));
DropdownMenuTrigger.displayName = "DropdownMenuTrigger";
// Content
const DropdownMenuContent = React.forwardRef(({ className, sideOffset = 4, ...props }, ref) => (_jsx(DropdownMenuPrimitive.Portal, { children: _jsx(DropdownMenuPrimitive.Content, { ref: ref, sideOffset: sideOffset, "data-slot": "dropdown-menu-content", className: cn("bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 max-h-(--radix-dropdown-menu-content-available-height) min-w-[8rem] origin-(--radix-dropdown-menu-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-md border p-1 shadow-md", className), ...props }) })));
DropdownMenuContent.displayName = "DropdownMenuContent";
// Item
const DropdownMenuItem = React.forwardRef(({ className, inset, variant = "default", ...props }, ref) => (_jsx(DropdownMenuPrimitive.Item, { ref: ref, "data-slot": "dropdown-menu-item", "data-inset": inset, "data-variant": variant, className: cn("focus:bg-accent focus:text-accent-foreground data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 dark:data-[variant=destructive]:focus:bg-destructive/20 data-[variant=destructive]:focus:text-destructive data-[variant=destructive]:*:[svg]:!text-destructive [&_svg:not([class*='text-'])]:text-muted-foreground relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[inset]:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4", className), ...props })));
DropdownMenuItem.displayName = "DropdownMenuItem";
// CheckboxItem
const DropdownMenuCheckboxItem = React.forwardRef(({ className, children, checked, ...props }, ref) => (_jsxs(DropdownMenuPrimitive.CheckboxItem, { ref: ref, "data-slot": "dropdown-menu-checkbox-item", className: cn("focus:bg-accent focus:text-accent-foreground relative flex cursor-default items-center gap-2 rounded-sm py-1.5 pr-2 pl-8 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4", className), checked: checked, ...props, children: [_jsx("span", { className: "pointer-events-none absolute left-2 flex size-3.5 items-center justify-center", children: _jsx(DropdownMenuPrimitive.ItemIndicator, { children: _jsx(CheckIcon, { className: "size-4" }) }) }), children] })));
DropdownMenuCheckboxItem.displayName = "DropdownMenuCheckboxItem";
// RadioItem
const DropdownMenuRadioItem = React.forwardRef(({ className, children, ...props }, ref) => (_jsxs(DropdownMenuPrimitive.RadioItem, { ref: ref, "data-slot": "dropdown-menu-radio-item", className: cn("focus:bg-accent focus:text-accent-foreground relative flex cursor-default items-center gap-2 rounded-sm py-1.5 pr-2 pl-8 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4", className), ...props, children: [_jsx("span", { className: "pointer-events-none absolute left-2 flex size-3.5 items-center justify-center", children: _jsx(DropdownMenuPrimitive.ItemIndicator, { children: _jsx(CircleIcon, { className: "size-2 fill-current" }) }) }), children] })));
DropdownMenuRadioItem.displayName = "DropdownMenuRadioItem";
// Label
const DropdownMenuLabel = React.forwardRef(({ className, inset, ...props }, ref) => (_jsx(DropdownMenuPrimitive.Label, { ref: ref, "data-slot": "dropdown-menu-label", "data-inset": inset, className: cn("px-2 py-1.5 text-sm font-medium data-[inset]:pl-8", className), ...props })));
DropdownMenuLabel.displayName = "DropdownMenuLabel";
// Separator
const DropdownMenuSeparator = React.forwardRef(({ className, ...props }, ref) => (_jsx(DropdownMenuPrimitive.Separator, { ref: ref, "data-slot": "dropdown-menu-separator", className: cn("bg-border -mx-1 my-1 h-px", className), ...props })));
DropdownMenuSeparator.displayName = "DropdownMenuSeparator";
// Shortcut (не требует ref)
const DropdownMenuShortcut = ({ className, ...props }) => (_jsx("span", { "data-slot": "dropdown-menu-shortcut", className: cn("text-muted-foreground ml-auto text-xs tracking-widest", className), ...props }));
// SubTrigger
const DropdownMenuSubTrigger = React.forwardRef(({ className, inset, children, ...props }, ref) => (_jsxs(DropdownMenuPrimitive.SubTrigger, { ref: ref, "data-slot": "dropdown-menu-sub-trigger", "data-inset": inset, className: cn("focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground flex cursor-default items-center rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[inset]:pl-8", className), ...props, children: [children, _jsx(ChevronRightIcon, { className: "ml-auto size-4" })] })));
DropdownMenuSubTrigger.displayName = "DropdownMenuSubTrigger";
// SubContent
const DropdownMenuSubContent = React.forwardRef(({ className, ...props }, ref) => (_jsx(DropdownMenuPrimitive.SubContent, { ref: ref, "data-slot": "dropdown-menu-sub-content", className: cn("bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 min-w-[8rem] origin-(--radix-dropdown-menu-content-transform-origin) overflow-hidden rounded-md border p-1 shadow-lg", className), ...props })));
DropdownMenuSubContent.displayName = "DropdownMenuSubContent";
export { DropdownMenu, DropdownMenuPortal, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuGroup, DropdownMenuLabel, DropdownMenuItem, DropdownMenuCheckboxItem, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuSub, DropdownMenuSubTrigger, DropdownMenuSubContent, };
