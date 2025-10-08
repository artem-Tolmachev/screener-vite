import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import RegisterComponent from "@/pages/dashboard/components/ui/RegisterComponent/RegisterComponent";
import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog";
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';

// interface Props {
//     panelIndex: number;
// }

export function DialogRegister() {

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="default" className="bg-lime-800 text-gray-300 hover:bg-lime-700 cursor-pointer">
                    Регистрация
                </Button>
            </DialogTrigger>
            <DialogContent className="w-[50%] p-[35px] bg-gray-800 text-gray-300 border-non h-[50%]">
                <RegisterComponent/>
                <VisuallyHidden>
                <DialogDescription>
                    Здесь вы можете выбрать торговую пару
                </DialogDescription>
                <DialogTitle>Выбрать манету</DialogTitle>
                </VisuallyHidden>
            </DialogContent>
        </Dialog>
    )
}