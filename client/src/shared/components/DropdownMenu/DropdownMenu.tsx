import { Button } from "@/components/ui/button"
import clsx from 'clsx';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import DialogComponentCreateList  from "../Dialog/DialogComponentCreateList";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/app/store/store";
import { listRemover, setActiveList } from "@/pages/dashboard/coinData/slices/CoinsSlice";
import DialogComponentClearList from "../Dialog/DialogComponentClearList";
import IconBacket from "../Icons/IconBacket";
import IconFlag from "@/pages/dashboard/components/ui/IconFlag/IconFlag";

export function DropdownMenuComponent() {
  const [_, setListnameSelect] = useState('')
  const lists = useAppSelector(store => store.coins.storeList)
  const activedList = useAppSelector(store => store.coins.activeList)
  const dispatch = useAppDispatch()

  function chooseList(list: string){
    dispatch(setActiveList(list))
  }
  function delList(list: string){
    dispatch(listRemover(list))
    dispatch(setActiveList("List"))
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="cursor-pointer">
          {activedList}
          {activedList !== 'List' && <IconFlag marker={lists[activedList].color}/>}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-100 bg-gray-800 " align="start">
        <DropdownMenuLabel className="text-lg text-blue-200  hover:text-blue-200 focus:text-blue-200 cursor-pointer">My Account</DropdownMenuLabel>
        <DropdownMenuGroup>
        {Object.keys(lists).map((list, index) => {
         return <DropdownMenuItem 
         key={list + index}
         onClick={() => chooseList(list)}
         className={clsx('text-lg text-blue-200',  
         'hover:text-blue-200', 
         'focus:text-blue-200', 
         'cursor-pointer',
          list ===  activedList && 'bg-gray-900 hover:!bg-gray-900'
        )}
         >
          {list}
          {
            list !== 'List' && (
            lists[list].colorName === 'red' ||
            lists[list].colorName === 'pink' ||
            lists[list].colorName === 'blue' ||
            lists[list].colorName === 'green' ? (
              <IconFlag marker={lists[list].color} />
            ) : (
              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  delList(list);
                }}
                className="cursor-pointer hover:bg-gray-600 w-5"
              >
                <IconBacket style={{ width: '22px', height: '22px' }} />
              </Button>
          )
          )
          }
          </DropdownMenuItem>
        })}
        </DropdownMenuGroup>
        <DropdownMenuSeparator/>
        <DropdownMenuGroup>
          <DialogComponentCreateList setListnameSelect={setListnameSelect} />
          <DialogComponentClearList/>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
