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
import IconBookmarkPlus from "../Icons/IconBookmarkPlus"
import { useState } from "react"
import useCreateNewWatchList from "@/pages/dashboard/hooks/useCreateNewWatchList"
import { Input } from "@/components/ui/input"
import { useAppDispatch, useAppSelector } from "@/app/store/store"
import { setActiveList } from "@/pages/dashboard/coinData/slices/CoinsSlice"

interface Props {
  setListnameSelect: (value: string) => void;
}

export default function DialogComponentCreateList({setListnameSelect}: Props)  {
  const [listName, setListname] = useState('')
  const panelIndex = useAppSelector(store => store.coins.panelIndex);
  const addListToStore = useCreateNewWatchList(listName, setListname, panelIndex);
  const screenId = useAppSelector(store => store.coins.mainScreen);
  const dispatch = useAppDispatch();

  function handelSave(){
    setListnameSelect(listName)
    addListToStore()
    dispatch(setActiveList({listName, panelIndex, screenId}))
  }


  return (
    <Dialog>
      <DialogTrigger asChild>
          <Button variant="link" className=" flex justify-start text-lg text-blue-200  hover:text-blue-200 cursor-pointer">
            Создать новый список
            <IconBookmarkPlus
              className="dialogIcon" 
              style={{ width: '22px', height: '22px' }}
            />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md bg-gray-600">
        <DialogHeader>
          <DialogTitle>Новый список</DialogTitle>
        </DialogHeader>
        <DialogDescription>Введите название и нажмите "Сохранить".</DialogDescription>
        <div className="flex items-center gap-2">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="link" className="sr-only">
              Link
            </Label>
            <Input
              id="link"
              placeholder="Название списка"
              value={listName}
              onChange={(e) => setListname(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button  onClick={handelSave} type="button" variant="secondary" className="bg-gray-800 text-neutral-50 hover:bg-gray-700">
              Сохранить
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}



