import { Button } from "@/components/ui/button"
import clsx from 'clsx';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import DialogComponentCreateList  from "../Dialog/DialogComponentCreateList";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/app/store/store";
import { listRemover, setActiveList, setActivePanelIndex } from "@/pages/dashboard/coinData/slices/CoinsSlice";
import DialogComponentClearList from "../Dialog/DialogComponentClearList";
import IconBacket from "../Icons/IconBacket";
import IconFlag from "@/pages/dashboard/components/ui/IconFlag/IconFlag";

interface Props {
  panelIndex: number;
}

export function DropdownMenuComponent({panelIndex}: Props)  {
  const [_, setListnameSelect] = useState('');
  const screenOptionGroop = useAppSelector(store => store.coins.allscreens);
  const screenId = useAppSelector(store => store.coins.mainScreen);
  const ativeArray = screenOptionGroop.find(el => el.id === screenId);
  const screensArray = ativeArray?.screens;
  if(!screensArray) return;
  if(!screensArray[panelIndex])return
  const listsArray = screensArray[panelIndex].storeList;
  const listName = screensArray[panelIndex].activeList;
  if(!listsArray) return; 
  const dispatch = useAppDispatch()

  function chooseList(listName: string){
    dispatch(setActiveList({listName, screenId, panelIndex}))
  }

  function delList(list: string){
    dispatch(listRemover({list, screenId, panelIndex}))
    dispatch(setActiveList({listName: "List", screenId, panelIndex}))
  }

  return (
    <DropdownMenu onOpenChange={() => dispatch(setActivePanelIndex(panelIndex))}>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" 
          className="cursor-pointer"
          >
            {listName}
            {listName !== 'List' && <IconFlag marker={listsArray[listName].color}/>}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-100 bg-gray-800 " align="start">
          <DropdownMenuLabel className="text-lg text-blue-200  hover:text-blue-200 focus:text-blue-200 cursor-pointer">My Account</DropdownMenuLabel>
          <DropdownMenuGroup>
          {Object.keys(listsArray).map((list, index) => {
          return <DropdownMenuItem 
          key={list + index}
          onClick={() => chooseList(list)}
          className={clsx('text-lg text-blue-200',  
          'hover:text-blue-200', 
          'focus:text-blue-200', 
          'cursor-pointer',
            list ===  listName && 'bg-gray-900 hover:!bg-gray-900'
          )}
          >
            {list}
            {
                list !== 'List' && (
                listsArray[list].colorName === 'red'  ||
                listsArray[list].colorName === 'pink' ||
                listsArray[list].colorName === 'blue' ||
                listsArray[list].colorName === 'green' ? (
                <IconFlag marker={listsArray[list].color} />
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
