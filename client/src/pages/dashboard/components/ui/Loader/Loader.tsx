import { FixedSizeList as List } from "react-window";
import InfiniteLoader from "react-window-infinite-loader";
import ContainerLoader from "../ContainerLoader/ContainerLoader";
import { useInfiniteTickers, LOADED, LOADING} from "../../../hooks/useInfiniteTickers";
import { MarketData } from "@/pages/dashboard/types";

interface Props { 
  tick: MarketData[];
  closeAddModal: (arg: boolean) => void;
}

export default function Loader({tick, closeAddModal}: Props) {
  const {isItemLoaded, loadMore, items, itemStatusMap} = useInfiniteTickers({tick});
  
  return (
    <>
      <InfiniteLoader
        isItemLoaded={isItemLoaded}
        itemCount={tick.length}
        loadMoreItems={loadMore}
      >
        {({ onItemsRendered, ref }: any) => (
          <List
            className="List"
            height={250}
            itemCount={tick.length}
            itemSize={50}
            onItemsRendered={onItemsRendered}
            ref={ref}
            width='100%'
            itemData={{
              items,
              itemStatusMap,
              LOADED,
              LOADING,
              closeAddModal,
            }}
          >
            {ContainerLoader}
          </List>
        )}
      </InfiniteLoader>
    </>
  );
}