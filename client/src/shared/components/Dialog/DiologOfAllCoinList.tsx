import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog"
import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog"
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { useGetCoinsQuery } from "@/pages/dashboard/coinData/services/getApiCoins";
import ListInfarmation from "@/pages/dashboard/components/ui/ListInfarmation/ListInfarmation";
import { NamedMarketDataLists } from "@/pages/dashboard/types";

interface Props {
    listsData: NamedMarketDataLists;
    panelIndex: number;
}

export function DiologOfAllCoinList({listsData, panelIndex}: Props) {
    const { data } = useGetCoinsQuery();
    if(!data) return;

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="link" className=" flex justify-start text-lg text-blue-200  hover:text-blue-200 cursor-pointer">
                    Открыть список
                    <svg style={{width: '22px', height: '22px'}} xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="none"><path stroke="currentColor" d="M5.5 11.5v8a1 1 0 0 0 1 1h15a1 1 0 0 0 1-1v-8m-17 0v-4a1 1 0 0 1 1-1h4l2 2h9a1 1 0 0 1 1 1v2m-17 0h17"></path></svg>
                </Button>
            </DialogTrigger>
            <DialogContent className="bg-gray-800 text-gray-300 p-0 border-non h-auto pb-5">
                <ListInfarmation listsData={listsData} panelIndex={panelIndex}/>
                <VisuallyHidden>
                <DialogDescription>
                    Здесь вы можете выбрать торговую пару
                </DialogDescription>
                <DialogTitle>Выбрать манету</DialogTitle>
                </VisuallyHidden>
            </DialogContent>
        </Dialog>
    )
}
