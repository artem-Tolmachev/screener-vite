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
import IconClear from "../Icons/IconClear"
import { listCleaner } from "@/pages/dashboard/coinData/slices/CoinsSlice"
import { useAppDispatch, useAppSelector } from "@/app/store/store"

export default function  DialogComponentClearList() {
    const screenId = useAppSelector(store => store.coins.mainScreen);
    const screenOptionGroop = useAppSelector(state => state.coins.allscreens);
    const ativeArray = screenOptionGroop.find(el => el.id === screenId);
    const panelIndex = useAppSelector(store => store.coins.panelIndex);

    if(!ativeArray) return;
    const activedListData = ativeArray.screens[panelIndex]
    const activeList = activedListData?.activeList;
    const dispatch = useAppDispatch();

    return (
            <Dialog >
              <DialogTrigger asChild>
                <Button variant="link" className="flex justify-start text-lg text-blue-200  hover:text-blue-200 cursor-pointer">
                    Отчистить список
                    <IconClear className="dropDownIcon text-current" 
                        style={{ width: '22px', height: '22px' }}
                  />
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md bg-gray-600">
                <DialogHeader>
                  <DialogTitle>Подтвердите действия</DialogTitle>
                </DialogHeader>
                <DialogDescription>Вы действительно хотите удалить все инструменты из этого списка?</DialogDescription>
                <div className="flex items-center gap-2">
                  <div className="grid flex-1 gap-2">
                    <Label htmlFor="link" className="sr-only">
                      Link
                    </Label>
                  </div>
                </div>
                <DialogFooter className="sm:justify-start">
                  <DialogClose asChild>
                    <Button onClick={() => dispatch(listCleaner({activeList, screenId, panelIndex}))} type="button" variant="secondary" className="bg-gray-800 text-neutral-50 hover:bg-gray-700">
                      Да
                    </Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
    )
}