import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import LogInComponent from "@/pages/dashboard/components/ui/LogInComponent/LogInComponent";
import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog";
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';

// interface Props {
//     panelIndex: number;
// }

export function DialogLogin() {

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="ghost" className="text-lg text-gray-300 cursor-pointer hover:bg-gray-800 hover:text-lime-700">
                    Войти
                </Button>
            </DialogTrigger>
            <DialogContent className="w-[50%] p-[35px] bg-gray-800 text-gray-300 border-non h-[50%]">
                <LogInComponent/>
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