import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogDescription
} from "@/components/ui/dialog"
import IconFlag from "@/pages/dashboard/components/ui/IconFlag/IconFlag"
import { DialogTitle } from "@radix-ui/react-dialog";
export default function DialogRadioButtons() {

    return (
            <Dialog>
              <DialogTrigger asChild>
              <Button variant="secondary" size="icon" className="flex justify-start text-lg text-blue-200  hover:text-blue-200 cursor-pointer">
                <IconFlag />
              </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md bg-gray-600" hideCloseIcon>
                  <DialogTitle className="sr-only">Подтвердите действия</DialogTitle>
                  <DialogDescription className="sr-only"></DialogDescription>
              </DialogContent>
            </Dialog>
    )
}