import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog"
import IconSetting from "../Icons/IconSetting"
import { TabsSettings } from "../Tabs/TabsSettings"
import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog"
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { IDashboardHeaderItems } from "@/pages/dashboard/types"

interface Props {
  columnsOfTable: IDashboardHeaderItems[];
  toggleCheckBox: (arg: string) => void;
  radioBtn: string;
  setRadioBtn: (arg: string) => void;
  hideAllColumns: () => void;
}
export function DialogForm({hideAllColumns, columnsOfTable, toggleCheckBox, radioBtn, setRadioBtn}: Props) {

  return (
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="ghost" className="cursor-pointer text-xl text-gray-300 hover:text-gray-100">
            Настройки скринера
            <IconSetting/>
          </Button>
        </DialogTrigger>
        <DialogContent className="border-1 border-white sm:max-w-[90%] text-gray-300 p-0  bg-gray-800 h-[700px]">
          <TabsSettings 
            toggleCheckBox={toggleCheckBox} 
            columnsOfTable={columnsOfTable}
            radioBtn={radioBtn}
            setRadioBtn={setRadioBtn}
            hideAllColumns={hideAllColumns}
            />
            <VisuallyHidden>
              <DialogDescription>
                Здесь вы можете изменить параметры отображения ордербука.
              </DialogDescription>
              <DialogTitle>Edit profile</DialogTitle>
            </VisuallyHidden>
        </DialogContent>
      </Dialog>
  )
}
