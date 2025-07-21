import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { listCleaner } from "@/pages/dashboard/coinData/slices/CoinsSlice"
import { useAppDispatch, useAppSelector } from "@/app/store/store"
import IconDel from "../Icons/IconDel"

export default function  DialogComponentDelList() {
    const activedList = useAppSelector(store => store.coins.activeList)
    const dispatch = useAppDispatch()

    if (activedList === 'List') return null
    return (
            <Dialog >
              <DialogTrigger asChild>
              <Button variant="link" className="flex justify-start text-lg text-blue-200  hover:text-blue-200 cursor-pointer">
                Удалить список
                <IconDel className="dropDownIcon text-current" 
                    style={{ width: '22px', height: '22px' }}
                />
              </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md bg-gray-600">
                <DialogHeader>
                  <DialogTitle>Подтвердите действия</DialogTitle>
                </DialogHeader>
                <DialogDescription>Вы действительно хотите удалить этот список?</DialogDescription>
                <div className="flex items-center gap-2">
                  <div className="grid flex-1 gap-2">
                    <Label htmlFor="link" className="sr-only">
                      Link
                    </Label>
                  </div>
                </div>
                <DialogFooter className="sm:justify-start">
                  <DialogClose asChild>
                    <Button onClick={() => dispatch(listCleaner(activedList))} type="button" variant="secondary" className="bg-gray-800 text-neutral-50 hover:bg-gray-700">
                      Да
                    </Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
    )
}