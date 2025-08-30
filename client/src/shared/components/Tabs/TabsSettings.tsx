import { useAppDispatch, useAppSelector } from "@/app/store/store"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { IDashboardHeaderItems } from "@/pages/dashboard/types"
import { setFilter } from "@/pages/ordersBookPage/ordesData/slices/slicesOrdersBook"
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { useState } from "react"
import { RadioButtonsOrderbookFilter } from "../RadioButtons/RadioButtonsOrderbookFilter"
import { SelectOfOrderBookPage } from "../Select/SelectOfOrderBookPage"
import { SetStateAction, Dispatch} from "react";
interface Props {
  columnsOfTable: IDashboardHeaderItems[];
  toggleCheckBox: (arg: string) => void;
  radioBtn: string;
  setRadioBtn: (arg: string) => void;
  hideAllColumns: () => void;
}

export function TabsSettings({hideAllColumns, columnsOfTable, toggleCheckBox, radioBtn, setRadioBtn}: Props) {
  const filter = useAppSelector((state) => state.ordersBook.ordersFilter);
  const [value, setValue] = useState(filter);

  const dispatch = useAppDispatch()
  const pushOptionsForOrderBook = () => {
    dispatch(setFilter(value))
  }

  return (
    <div className="max-w-full flex w-full h-full flex-col gap-6 rounded-[100px]">
      <Tabs defaultValue="account">
        <TabsList className="w-full max-w-full h-[100px] border-b-2 border-b-gray-600 pb-[-5px]">
          <TabsTrigger value="account" className="text-gray-400 text-xl mb-[-4px]">Скринер</TabsTrigger>
          <TabsTrigger value="password" className="text-gray-400 text-xl mb-[-4px]">Настройки</TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          <Card className="pt-5">
            <VisuallyHidden>
              <CardHeader>
                <CardTitle>Фильтр ордеров</CardTitle>
                  <CardDescription>
                      Внесите изменения
                  </CardDescription>
              </CardHeader>
            </VisuallyHidden>
            <CardContent className="grid gap-6 rounded-3xl">
              <div className="grid gap-3">
                <Label htmlFor="tabs-demo-name" className="text-lg">Близость заявки к цене(%):</Label>
                <Input  
                  className="text-lg md:text-lg" 
                  value={value.distance}
                  onChange={(e) =>
                    setValue((prev) => ({ ...prev, distance: Number(e.target.value) }))
                  }
                  />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="tabs-demo-username" className="text-lg">Длительность заявки(минуты):</Label>
                <Input 
                  onChange={(e) => setValue(prev => ({...prev, range: Number(e.target.value)}))}
                  id="tabs-demo-username" 
                  value={value.range} 
                  className="text-lg md:text-lg" 
                />
              </div>
                <div className="grid gap-3">
                <Label htmlFor="tabs-demo-username" className="text-lg">Размер заявки($):</Label>
                <Input 
                onChange={(e) => setValue(prev => ({...prev, minValue: Number(e.target.value)}))}
                id="tabs-demo-username" 
                className="text-lg md:text-lg" 
                value={value.minValue}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button
              onClick={pushOptionsForOrderBook}
               className="text-lg w-full cursor-pointer bg-blue-950 border-2 border-transparent text-gray-400 hover:border-gray-400 hover:bg-transparent hover:text-gray-400">Сохранить параметры</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="password">
          <Card className="pt-5">
            <CardHeader>
              <CardTitle className="text-lg">Показывать поля для скринера</CardTitle>
            </CardHeader>
            <CardContent className="">
                <div className="items-center bg-gray-600 flex justify-between  border-1 rounded-[8px] border-blue-700 w-full min-h-5 p-2">
                 <div className="buttons-wr flex flex-wrap space-x-2 space-y-2 flex-[1_1_0%]">
                    {columnsOfTable.filter(col => col.visible !== 0).length === 0 ? (
                  <span className="text-gray-400 text-3xl">...</span>
                  ) : (
                    columnsOfTable.map((button) =>
                      button.visible !== 0 && (
                        <button
                          onClick={() => toggleCheckBox(button.key)}
                          className="flex cursor-pointer bg-gray-800 py-2 px-2 max-h-[40px] w-fit hover:bg-gray-900"
                          key={button.key}
                        >
                          {button.name}
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="lucide lucide-x ml-2"
                          >
                            <path d="M18 6 6 18" />
                            <path d="m6 6 12 12" />
                          </svg>
                        </button>
                      )
                    )
                  )}
                 </div>
                <SelectOfOrderBookPage 
                  toggleCheckBox={toggleCheckBox}
                  columnsOfTable={columnsOfTable}/>
                </div>
                <div className="radioButtons-wr mt-2">
                  <RadioButtonsOrderbookFilter
                    radioBtn={radioBtn}
                    setRadioBtn={setRadioBtn}
                  />
                </div>
            </CardContent>
            <CardFooter>
              <Button 
              onClick={hideAllColumns}
              className="text-lg w-full cursor-pointer bg-blue-800 border-2 border-transparent hover:border-blue-700 hover:bg-transparent hover:text-blue-700">Сбросить параметры</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
