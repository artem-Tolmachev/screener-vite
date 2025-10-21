import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BackendResponse,  HeatMapData, OriginalResponse } from '@/pages/dashboard/types';
import { tickerParser, dataKlinesParser, dataValumeParser, defaultCoinParser} from '@/pages/dashboard/utils/Parser';
import { CurrentPrice, OrdersBookResponse } from '@/pages/ordersBookPage/types';

export const coinsApi = createApi({
    reducerPath: 'coinsApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000'}),
    // baseQuery: fetchBaseQuery({ baseUrl: 'https://my-server-latest-1.onrender.com' }),
    endpoints: (builder) => ({
        getCoins: builder.query<OriginalResponse, void>({
            query: () => '/api/get-futures',
            transformResponse: (response: BackendResponse) => ({
                tickers: tickerParser(response.tickers),
                btcUsdt: defaultCoinParser(response.btcData)
            }),
        }),
        // getOrdersbook: builder.mutation<Record<string, OrderBookData>, {n: number}>({
         getOrdersbook: builder.mutation<OrdersBookResponse, {minValue: number; range: number}>({
            query: (body) => ({
                url: '/api/new-orders',
                method: 'POST',
                body
            }),
            transformResponse: (result: OrdersBookResponse) => {
                const ordersBook = result;
                return ordersBook 
            }
        }),
        updateOrdersBookTickersData: builder.mutation<CurrentPrice[], string[]>({
            query: (body) => ({
                url: '/api/update-ticker',
                method: 'POST',
                body
            }),
            transformResponse: (result: CurrentPrice[]) => {
                const updetedPrices = result;
                return updetedPrices 
            }
        }),
        getHeatMapSymbols: builder.query<string[], void>({
            query: () => '/api/heatmap',
            transformResponse: (response: { symbols: string[] }) => response.symbols
        }),
        getHeatMap: builder.query<any, string | null>({
            query: (symbol) => `api/heatmap?symbol=${symbol}`,
                keepUnusedDataFor: 300
            }),
        getKlines: builder.query<{
            dataKlines: ReturnType<typeof dataKlinesParser>,
            dataValume: ReturnType<typeof dataValumeParser>
        }, { interval: string | undefined, symbol: string, limit: string, category: string }>({
            query: ({ interval, symbol, limit, category}) => ({
                url: `/api/get-klines`,
                method: 'GET',
                params: { interval, symbol, limit, category}
            }),
            transformResponse: (response?: { result?: { list?: any[] } }) => {
                const list = response?.result?.list || [];
                return {
                    dataKlines: dataKlinesParser(list),
                    dataValume: dataValumeParser(list)
                }
            }
        }),
        register: builder.mutation<{ success: boolean; error?: string }, { email: string;   password: string }>({
        query: (body) => ({
                url: '/api/register',
                method: 'POST',
                body,
            }),
        }),
        login: builder.mutation<
              { success: boolean; token: string; user?: { id: number; email: string }; error?: string },
            { email: string; password: string }
            >({
        query: (body) => ({
                url: '/api/login',
                method: 'POST',
                body,
            }),
        }),
    })
})

export const {useGetHeatMapSymbolsQuery, useRegisterMutation, useLoginMutation, useLazyGetKlinesQuery, useGetCoinsQuery, useGetKlinesQuery, useGetOrdersbookMutation, useGetHeatMapQuery, useUpdateOrdersBookTickersDataMutation } = coinsApi;
