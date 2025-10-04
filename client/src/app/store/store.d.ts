import { TypedUseSelectorHook } from 'react-redux';
export declare const store: import("@reduxjs/toolkit").EnhancedStore<{
    coinsApi: import("@reduxjs/toolkit/query").CombinedState<{
        getCoins: import("@reduxjs/toolkit/query").QueryDefinition<void, import("@reduxjs/toolkit/query").BaseQueryFn<string | import("@reduxjs/toolkit/query").FetchArgs, unknown, import("@reduxjs/toolkit/query").FetchBaseQueryError, {}, import("@reduxjs/toolkit/query").FetchBaseQueryMeta>, never, import("../../pages/dashboard/types").OriginalResponse, "coinsApi">;
        getOrdersbook: import("@reduxjs/toolkit/query").MutationDefinition<{
            minValue: number;
            range: number;
        }, import("@reduxjs/toolkit/query").BaseQueryFn<string | import("@reduxjs/toolkit/query").FetchArgs, unknown, import("@reduxjs/toolkit/query").FetchBaseQueryError, {}, import("@reduxjs/toolkit/query").FetchBaseQueryMeta>, never, import("../../pages/ordersBookPage/types").OrdersBookResponse, "coinsApi">;
        updateOrdersBookTickersData: import("@reduxjs/toolkit/query").MutationDefinition<string[], import("@reduxjs/toolkit/query").BaseQueryFn<string | import("@reduxjs/toolkit/query").FetchArgs, unknown, import("@reduxjs/toolkit/query").FetchBaseQueryError, {}, import("@reduxjs/toolkit/query").FetchBaseQueryMeta>, never, import("../../pages/ordersBookPage/types").CurrentPrice[], "coinsApi">;
        getHeatMap: import("@reduxjs/toolkit/query").QueryDefinition<void, import("@reduxjs/toolkit/query").BaseQueryFn<string | import("@reduxjs/toolkit/query").FetchArgs, unknown, import("@reduxjs/toolkit/query").FetchBaseQueryError, {}, import("@reduxjs/toolkit/query").FetchBaseQueryMeta>, never, import("../../pages/dashboard/types").HeatMapData, "coinsApi">;
        getKlines: import("@reduxjs/toolkit/query").QueryDefinition<{
            interval: string | undefined;
            symbol: string;
            limit: string;
            category: string;
        }, import("@reduxjs/toolkit/query").BaseQueryFn<string | import("@reduxjs/toolkit/query").FetchArgs, unknown, import("@reduxjs/toolkit/query").FetchBaseQueryError, {}, import("@reduxjs/toolkit/query").FetchBaseQueryMeta>, never, {
            dataKlines: ReturnType<typeof import("../../pages/dashboard/utils/Parser").dataKlinesParser>;
            dataValume: ReturnType<typeof import("../../pages/dashboard/utils/Parser").dataValumeParser>;
        }, "coinsApi">;
    }, never, "coinsApi">;
    coins: import("@/pages/dashboard/coinData/slices/CoinsSlice").CoinsState;
    ordersBook: import("@/pages/ordersBookPage/ordesData/slices/slicesOrdersBook").OrdersFilterState;
} & import("redux-persist/es/persistReducer").PersistPartial, import("redux").UnknownAction, import("@reduxjs/toolkit").Tuple<[import("redux").StoreEnhancer<{
    dispatch: import("redux-thunk").ThunkDispatch<{
        coinsApi: import("@reduxjs/toolkit/query").CombinedState<{
            getCoins: import("@reduxjs/toolkit/query").QueryDefinition<void, import("@reduxjs/toolkit/query").BaseQueryFn<string | import("@reduxjs/toolkit/query").FetchArgs, unknown, import("@reduxjs/toolkit/query").FetchBaseQueryError, {}, import("@reduxjs/toolkit/query").FetchBaseQueryMeta>, never, import("../../pages/dashboard/types").OriginalResponse, "coinsApi">;
            getOrdersbook: import("@reduxjs/toolkit/query").MutationDefinition<{
                minValue: number;
                range: number;
            }, import("@reduxjs/toolkit/query").BaseQueryFn<string | import("@reduxjs/toolkit/query").FetchArgs, unknown, import("@reduxjs/toolkit/query").FetchBaseQueryError, {}, import("@reduxjs/toolkit/query").FetchBaseQueryMeta>, never, import("../../pages/ordersBookPage/types").OrdersBookResponse, "coinsApi">;
            updateOrdersBookTickersData: import("@reduxjs/toolkit/query").MutationDefinition<string[], import("@reduxjs/toolkit/query").BaseQueryFn<string | import("@reduxjs/toolkit/query").FetchArgs, unknown, import("@reduxjs/toolkit/query").FetchBaseQueryError, {}, import("@reduxjs/toolkit/query").FetchBaseQueryMeta>, never, import("../../pages/ordersBookPage/types").CurrentPrice[], "coinsApi">;
            getHeatMap: import("@reduxjs/toolkit/query").QueryDefinition<void, import("@reduxjs/toolkit/query").BaseQueryFn<string | import("@reduxjs/toolkit/query").FetchArgs, unknown, import("@reduxjs/toolkit/query").FetchBaseQueryError, {}, import("@reduxjs/toolkit/query").FetchBaseQueryMeta>, never, import("../../pages/dashboard/types").HeatMapData, "coinsApi">;
            getKlines: import("@reduxjs/toolkit/query").QueryDefinition<{
                interval: string | undefined;
                symbol: string;
                limit: string;
                category: string;
            }, import("@reduxjs/toolkit/query").BaseQueryFn<string | import("@reduxjs/toolkit/query").FetchArgs, unknown, import("@reduxjs/toolkit/query").FetchBaseQueryError, {}, import("@reduxjs/toolkit/query").FetchBaseQueryMeta>, never, {
                dataKlines: ReturnType<typeof import("../../pages/dashboard/utils/Parser").dataKlinesParser>;
                dataValume: ReturnType<typeof import("../../pages/dashboard/utils/Parser").dataValumeParser>;
            }, "coinsApi">;
        }, never, "coinsApi">;
        coins: import("@/pages/dashboard/coinData/slices/CoinsSlice").CoinsState;
        ordersBook: import("@/pages/ordersBookPage/ordesData/slices/slicesOrdersBook").OrdersFilterState;
    } & import("redux-persist/es/persistReducer").PersistPartial, undefined, import("redux").UnknownAction>;
}>, import("redux").StoreEnhancer]>>;
export declare const persistor: import("redux-persist").Persistor;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export declare const useAppDispatch: () => AppDispatch;
export declare const useAppSelector: TypedUseSelectorHook<RootState>;
