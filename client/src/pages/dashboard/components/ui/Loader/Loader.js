import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { FixedSizeList as List } from "react-window";
import InfiniteLoader from "react-window-infinite-loader";
import ContainerLoader from "../ContainerLoader/ContainerLoader";
import { useInfiniteTickers, LOADED, LOADING } from "../../../hooks/useInfiniteTickers";
export default function Loader({ tick, panelIndex }) {
    const { isItemLoaded, loadMore, items, itemStatusMap } = useInfiniteTickers({ tick });
    return (_jsx(_Fragment, { children: _jsx(InfiniteLoader, { isItemLoaded: isItemLoaded, itemCount: tick.length, loadMoreItems: loadMore, children: ({ onItemsRendered, ref }) => (_jsx(List, { className: "List", height: 250, itemCount: tick.length, itemSize: 50, onItemsRendered: onItemsRendered, ref: ref, width: '100%', itemData: {
                    items,
                    itemStatusMap,
                    LOADED,
                    LOADING,
                    panelIndex
                }, children: ContainerLoader })) }) }));
}
