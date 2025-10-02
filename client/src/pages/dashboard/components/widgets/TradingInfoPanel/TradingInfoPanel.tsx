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
        <div className='absolute top-0 left-0 z-30'>
            <div className='pt-1 pl-2 relative w-[250px] top-0 left-0 text-[var(--color-text-primary)] cursor-pointer'>
                <div className='max-w-full min-w-0 flex items-center gap-2'>
                    <IconCoin panelIndex={panelIndex} src={src} symbol={symbol} VorceVisible={true}/>
                   <div
                        className='text-[var(--color-red)] text-sm'
                        data-tooltip-id={`tooltip ${panelIndex}`}
                        data-tooltip-content="Цена продажи ( Ask )"
                    >
                        {ask1Price ?? '—'}
                    </div>
                    <div className='text-[var(--color-blue)] text-sm'
                        data-tooltip-id={`tooltip ${panelIndex}`}
                        data-tooltip-content="Цена покупки ( Bid )"
                    >
                        {bid1Price ?? '—'}
                    </div>
                </div>
            </div>
            <Tooltip 
                id={`tooltip ${panelIndex}`}
                variant="light"
                style={{ fontSize: '18px' }}
                place='bottom-end' />
        </div>
    );
}

export default TradingInfoPanel;
