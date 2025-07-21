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
  closeAddModal: (arg: boolean) => void;
};

const ContainerLoader = ({ data, index, style}:
  ListChildComponentProps<ItemData>
) => {
  const item = data.items[index];
  const isLoaded = data.itemStatusMap[index] === data.LOADED;

  const {addCoin, deliteCoin, exist} = useTickerActions({item})

  return (
    <div style={{...style, alignItems: 'center'}}>
        {isLoaded && item ? (
        <TickerItem
          coinData={item}
          addCoin={addCoin}
          deliteCoin={deliteCoin}
          key={item.symbol}
          symbol={item.symbol}
          src={item.src}
          flag={exist}
          closeModal={data.closeAddModal}
        />
        ) : (
          <TickerSckeleton/>
        )}
    </div>
  );
};
export default ContainerLoader;