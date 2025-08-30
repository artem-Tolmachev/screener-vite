import { useAppDispatch, useAppSelector } from "@/app/store/store";
import { Label } from "@/components/ui/label";
import {
  RadioGroup,
  RadioGroupItem,
} from "@/components/ui/radio-group"
import { addMarker } from "@/pages/dashboard/coinData/slices/CoinsSlice";

type Props = {
  symbol: string;
  currentMarker: string;
}

export function RadioButtonsComponent({ symbol, currentMarker}: Props) {
  const screenId = useAppSelector(state => state.coins.mainScreen);
  const dispatch = useAppDispatch();
  const panelIndex = useAppSelector(store => store.coins.panelIndex);

  function onChaneMarker (val: string){
   dispatch(addMarker({ symbol, marker: val, screenId, panelIndex}));
  }
  
  return (
    <RadioGroup 
        className="flex justify-between"
        value={currentMarker}
        onValueChange={onChaneMarker}
    >
      <div className="flex items-center">
        <RadioGroupItem onClick={(e) => e.stopPropagation()}  className="radio-red border-4 w-5 h-5 text-[#c51919] cursor-pointer" value="#c51919" id="r1" />
        <Label htmlFor="r1"></Label>
      </div>
      <div className="flex items-center">
        <RadioGroupItem onClick={(e) => e.stopPropagation()}  className="radio-blue border-4 w-5 h-5 text-[#192dc5] cursor-pointer"  value="#192dc5" id="r2" />
        <Label htmlFor="r2"></Label>
      </div>
      <div className="flex items-center">
        <RadioGroupItem onClick={(e) => e.stopPropagation()}  className="radio-green border-4 w-5 h-5 text-[#19c56c] cursor-pointer"  value="#19c56c" id="r3" />
        <Label htmlFor="r3"></Label>
      </div>
      <div className="flex items-center ">
        <RadioGroupItem 
        onClick={(e) => e.stopPropagation()} 
        className="radio-pink border-4 w-5 h-5 text-[#c51986] cursor-pointer" 
        value="#c51986" 
        id="r4" 
        />
        <Label htmlFor="r4"></Label>
      </div>
    </RadioGroup>
  )
}