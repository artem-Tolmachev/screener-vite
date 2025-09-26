import IconCoin from '@/shared/components/IconCoin/IconCoin';
import { useAppSelector } from '@/app/store/store';
import { Tooltip } from 'react-tooltip';

interface Props {
    panelIndex: number;
}

function TradingInfoPanel({panelIndex}: Props) {
    const screenId = useAppSelector(state => state.coins.mainScreen);
    const allScreens = useAppSelector(state => state.coins.allscreens);
    const ativeArray = allScreens.find(el => el.id === screenId);
    const selectedItems = ativeArray?.screens[panelIndex].CoinData;
    
    if (!selectedItems) {
        return <div className='absolute top-0 left-0 z-30 w-[168px]'>Загрузка...</div>;
    }
    const { src, symbol, ask1Price, bid1Price } = selectedItems;

    return (
        <div className='absolute top-0 left-0 z-30 w-[168px]'>
            <div className='pt-5 pl-5 relative h-[100px] w-full top-0 left-0 text-[var(--color-text-primary)] cursor-pointer'>
                <div className='ml-5 max-w-full min-w-0 flex-1'>
                    <IconCoin panelIndex={panelIndex} src={src} symbol={symbol} VorceVisible={true}/>
                </div>
                <div className='mt-2.5 flex gap-2.5'>
                    <div
                        className='text-[1cqw] w-[100px] flex items-center justify-center p-2.5 rounded-[5px] border border-[var(--color-red)] text-[var(--color-red)]'
                        data-tooltip-id="tooltip"
                        data-tooltip-content="Цена продажи ( Ask )"
                    >
                        {ask1Price ?? '—'}
                    </div>
                    <div className='text-[1cqw] w-[100px] flex items-center justify-center p-2.5 rounded border border-[var(--color-blue)] text-[var(--color-blue)]'
                        data-tooltip-id="tooltip"
                        data-tooltip-content="Цена покупки ( Bid )"
                    >
                        {bid1Price ?? '—'}
                    </div>
                </div>
            </div>
            <Tooltip 
            id="tooltip" 
            variant="light"
            style={{ fontSize: '18px' }}
            place='bottom-end' />
        </div>
    );
}

export default TradingInfoPanel;
