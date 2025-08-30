import { Label } from "@/components/ui/label";
import {
  RadioGroup,
  RadioGroupItem,
} from "@/components/ui/radio-group";

interface Props{
    radioBtn: string;
    setRadioBtn: (arg: string) => void;
}

export function RadioButtonsOrderbookFilter({setRadioBtn, radioBtn}:Props) {
  
  return (
    <RadioGroup
      className="flex flex-col text-gray-400"
      value={radioBtn}
      onValueChange={setRadioBtn}
    >
      <div className="flex items-center">
        <RadioGroupItem
          onClick={(e) => e.stopPropagation()}
          className="mr-2 radio-blue border-4 w-5 h-5 text-blue-800 cursor-pointer"
          value="all"
          id="all"
        />
        <Label htmlFor="all" className="text-[20px]">
          Все
        </Label>
      </div>

      <div className="flex items-center">
        <RadioGroupItem
          onClick={(e) => e.stopPropagation()}
          className="mr-2 radio-blue border-4 w-5 h-5 text-blue-800 cursor-pointer"
          value="purchases"
          id="purchases"
        />
        <Label htmlFor="purchases" className="text-[20px]">
          Покупки
        </Label>
      </div>

      <div className="flex items-center">
        <RadioGroupItem
          onClick={(e) => e.stopPropagation()}
          className="mr-2 radio-blue border-4 w-5 h-5 text-blue-800 cursor-pointer"
          value="sales"
          id="sales"
        />
        <Label htmlFor="sales" className="text-[20px]">
          Продажи
        </Label>
      </div>
    </RadioGroup>
  );
}
