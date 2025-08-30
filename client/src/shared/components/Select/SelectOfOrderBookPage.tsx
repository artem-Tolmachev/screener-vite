import {
  Select,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { IDashboardHeaderItems } from "@/pages/dashboard/types";

interface Props {
    columnsOfTable: IDashboardHeaderItems[];
    toggleCheckBox: (arg: string) => void;
}

export function SelectOfOrderBookPage({columnsOfTable, toggleCheckBox}: Props) {
    const hiddenOptions = columnsOfTable.filter((col) => col.visible === 0);

    return (
        <Select>
            <SelectTrigger className="w-[50px] h-full border-2 cursor-pointer">
                <SelectValue placeholder="">
                </SelectValue>
            </SelectTrigger>
        <SelectContent side="bottom" align="end" sideOffset={20} className="bg-gray-400 w-[300px]">
            <SelectGroup >
                {hiddenOptions.length === 0 
                ? <span className="text-2xl">Нет опций</span>
                : hiddenOptions.map(option => <SelectLabel key={option.name}
                className="text-gray-900 text-2xl hover:bg-gray-600 hover:text-gray-400 cursor-pointer"
                onClick={() => toggleCheckBox(option.key)}
                >{option.name}</SelectLabel>)}
            </SelectGroup>
        </SelectContent>
        </Select>
    )
}
