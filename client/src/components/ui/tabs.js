import { jsx as _jsx } from "react/jsx-runtime";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { cn } from "@/lib/utils";
function Tabs({ className, ...props }) {
    return (_jsx(TabsPrimitive.Root, { "data-slot": "tabs", className: cn("flex flex-col gap-2", className), ...props }));
}
function TabsList({ className, ...props }) {
    return (_jsx(TabsPrimitive.List, { "data-slot": "tabs-list", className: cn("bg-muted text-muted-foreground inline-flex h-9 w-fit items-center justify-center rounded-lg ", className), ...props }));
}
function TabsTrigger({ className, ...props }) {
    return (_jsx(TabsPrimitive.Trigger, { "data-slot": "tabs-trigger", className: cn("data-[state=active]:border-b-gray-300 data-[state=active]:bg-gray-700 data-[state=active]:text-gray-300 focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:outline-ring dark:data-[state=active]:border-input dark:data-[state=active]:bg-input/30 text-foreground dark:text-muted-foreground inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-md border border-b-4 border-transparent  text-sm font-medium whitespace-nowrap transition-[color,box-shadow] disabled:pointer-events-none disabled:opacity-50  [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 hover:text-gray-200 cursor-pointer", className), ...props }));
}
function TabsContent({ className, ...props }) {
    return (_jsx(TabsPrimitive.Content, { "data-slot": "tabs-content", className: cn("flex-1 outline-none", className), ...props }));
}
export { Tabs, TabsList, TabsTrigger, TabsContent };
