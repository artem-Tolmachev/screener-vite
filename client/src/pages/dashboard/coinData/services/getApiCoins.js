import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { tickerParser, dataKlinesParser, dataValumeParser, defaultCoinParser } from '@/pages/dashboard/utils/Parser';
export const coinsApi = createApi({
    reducerPath: 'coinsApi',
    // baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000'}),
    baseQuery: fetchBaseQuery({ baseUrl: 'https://my-server-latest-1.onrender.com' }),
    endpoints: (builder) => ({
        getCoins: builder.query({
            query: () => '/api/get-futures',
            transformResponse: (response) => ({
                tickers: tickerParser(response.tickers),
                btcUsdt: defaultCoinParser(response.btcData)
            }),
        }),
        // getOrdersbook: builder.mutation<Record<string, OrderBookData>, {n: number}>({
        getOrdersbook: builder.mutation({
            query: (body) => ({
                url: '/api/new-orders',
                method: 'POST',
                body
            }),
            transformResponse: (result) => {
                const ordersBook = result;
                return ordersBook;
            }
        }),
        updateOrdersBookTickersData: builder.mutation({
            query: (body) => ({
                url: '/api/update-ticker',
                method: 'POST',
                body
            }),
            transformResponse: (result) => {
                const updetedPrices = result;
                return updetedPrices;
            }
        }),
        getHeatMap: builder.query({
            query: () => '/api/heatmap'
        }),
        getKlines: builder.query({
            query: ({ interval, symbol, limit, category }) => ({
                url: `/api/get-klines`,
                method: 'GET',
                params: { interval, symbol, limit, category }
            }),
            transformResponse: (response) => {
                const list = response?.result?.list || [];
                return {
                    dataKlines: dataKlinesParser(list),
                    dataValume: dataValumeParser(list)
                };
            }
        })
    })
});
export const { useLazyGetKlinesQuery, useGetCoinsQuery, useGetKlinesQuery, useGetOrdersbookMutation, useGetHeatMapQuery, useUpdateOrdersBookTickersDataMutation } = coinsApi;
