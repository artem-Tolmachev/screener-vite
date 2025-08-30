import { ListChildComponentProps } from 'react-window';
import TickerItem from "../TickerItem/TickerItem";
import TickerSckeleton from "../TickerSkeleton/TickerSkeleton";
import { MarketData } from '@/pages/dashboard/types';
import useTickerActions from '@/pages/dashboard/hooks/useTickerActions';

type ItemData = {
  items: MarketData[];
  itemStatusMap: { [index: number]: number };
  LOADED: number;
  LOADING: number;
  panelIndex: number;
};

const ContainerLoader = ({data, index, style}:
  ListChildComponentProps<ItemData>
) => {
  const item = data.items[index];
  const isLoaded = data.itemStatusMap[index] === data.LOADED;
  const tickerActions = useTickerActions({item});
  let panelIndex = data.panelIndex;
  
  if (!tickerActions) {
    return null; 
  }
  const {exist, addCoin, deliteCoin} = tickerActions;

  return (
      <div className='www' style={{...style, alignItems: 'center'}}>
        {isLoaded && item ? (
           <TickerItem
              coinData={item}
              key={item.symbol} 
              symbol={item.symbol}
              src={item.src}
              flag={exist}
              addCoin={addCoin}
              deliteCoin={deliteCoin}
              panelIndex={panelIndex}
        />
        ) : (
          <TickerSckeleton/>
        )}
      </div>
  );
};
export default ContainerLoader;