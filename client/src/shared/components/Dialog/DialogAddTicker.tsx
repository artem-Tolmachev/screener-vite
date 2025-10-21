import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog";
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { useGetCoinsQuery } from "@/pages/dashboard/coinData/services/getApiCoins";
import CoinSearchPopup from "@/pages/dashboard/components/widgets/CoinSearchPopup/CoinSearchPopup";
import { setActivePanelIndex } from "@/pages/dashboard/coinData/slices/CoinsSlice";
import { useAppDispatch } from "@/app/store/store";

interface Props {
    panelIndex: number;
}

export function DialogAddTicker({panelIndex}: Props) {
    const { data } = useGetCoinsQuery();
    if(!data) return;
    const tickers = data?.tickers;
    const dispath = useAppDispatch()
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    variant="ghost" className="cursor-pointer w-[40px] h-[40px] bg-blue-950  hover:bg-blue-900 active:bg-blue-700"
                    onClick={() => dispath(setActivePanelIndex(panelIndex))}
                >
                    <svg style={{width: '40px', height: '40px'}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 28" width="28" height="28" fill="none"><path fill="currentColor" d="M7 13h7V6h1v7h7v1h-7v7h-1v-7H7v-1z"></path></svg>
                </Button>
            </DialogTrigger>
            <DialogContent className="w-[50%] bg-gray-800 text-gray-300 p-0 border-non h-[90%]">
                <CoinSearchPopup tickers={tickers} panelIndex={panelIndex}/>
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
