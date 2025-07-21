import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogDescription,
  DialogPortal
} from "@/components/ui/dialog"
import { RadioButtonsComponent } from "../RadioButtons/RadioButtonsComponent"
import IconFlag from "@/pages/dashboard/components/ui/IconFlag/IconFlag"
import styles from './styles.module.css';
import { DialogTitle } from "@radix-ui/react-dialog";
export default function DialogRadioButtons() {

    return (
            <Dialog>
              <DialogTrigger asChild>
              <Button variant="secondary" size="icon" className="flex justify-start text-lg text-blue-200  hover:text-blue-200 cursor-pointer">
                <IconFlag  className={`${styles.iconFlag} `}/>
              </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md bg-gray-600" hideCloseIcon>
                {/* <RadioButtonsComponent/> */}
                  <DialogTitle className="sr-only">Подтвердите действия</DialogTitle>
                  <DialogDescription className="sr-only"></DialogDescription>
              </DialogContent>
            </Dialog>
    )
}