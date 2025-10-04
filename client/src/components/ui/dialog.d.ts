import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
declare const Dialog: (props: React.ComponentPropsWithoutRef<typeof DialogPrimitive.Root>) => import("react/jsx-runtime").JSX.Element;
declare const DialogTrigger: React.ForwardRefExoticComponent<Omit<DialogPrimitive.DialogTriggerProps & React.RefAttributes<HTMLButtonElement>, "ref"> & React.RefAttributes<HTMLButtonElement>>;
declare const DialogPortal: (props: React.ComponentPropsWithoutRef<typeof DialogPrimitive.Portal>) => import("react/jsx-runtime").JSX.Element;
declare function DialogClose({ ...props }: React.ComponentProps<typeof DialogPrimitive.Close>): import("react/jsx-runtime").JSX.Element;
declare const DialogOverlay: React.ForwardRefExoticComponent<Omit<DialogPrimitive.DialogOverlayProps & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
interface CustomDialogProps extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> {
    className?: string;
    showCloseButton?: boolean;
    hideCloseIcon?: boolean;
}
declare const DialogContent: React.FC<CustomDialogProps>;
declare function DialogHeader({ className, ...props }: React.ComponentProps<"div">): import("react/jsx-runtime").JSX.Element;
declare function DialogFooter({ className, ...props }: React.ComponentProps<"div">): import("react/jsx-runtime").JSX.Element;
declare function DialogTitle({ className, ...props }: React.ComponentProps<typeof DialogPrimitive.Title>): import("react/jsx-runtime").JSX.Element;
declare function DialogDescription({ className, ...props }: React.ComponentProps<typeof DialogPrimitive.Description>): import("react/jsx-runtime").JSX.Element;
export { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogOverlay, DialogPortal, DialogTitle, DialogTrigger, };
