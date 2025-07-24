import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BackendResponse,  HeatMapData,  OrdersBookResponse, OriginalResponse } from '@/pages/dashboard/types';
import { tickerParser, dataKlinesParser, dataValumeParser, defaultCoinParser} from '@/pages/dashboard/utils/Parser';
    // baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000' }),
export const coinsApi = createApi({
    reducerPath: 'coinsApi',
baseQuery: fetchBaseQuery({ baseUrl: 'https://my-server-latest-1.onrender.com' }),
    endpoints: (builder) => ({
        getCoins: builder.query<OriginalResponse, void>({
            query: () => 'api/get-futures',
            transformResponse: (response: BackendResponse) => ({
                tickers: tickerParser(response.tickers),
                btcUsdt: defaultCoinParser(response.btcData)
            }),
        }),
        // getOrdersbook: builder.mutation<Record<string, OrderBookData>, {n: number}>({
        getOrdersbook: builder.query<OrdersBookResponse, void>({
            query: () => 'api/new-orders',

            transformResponse: (result: OrdersBookResponse) => {
                const ordersBook = result;
                return ordersBook
            }
        }),
        getHeatMap: builder.query<HeatMapData, void>({
            query: () => 'api/heatmap'
        }),
        getKlines: builder.query<{
            dataKlines: ReturnType<typeof dataKlinesParser>,
            dataValume: ReturnType<typeof dataValumeParser>
        }, { interval: string | undefined, symbol: string, limit: string, category: string }>({
            query: ({ interval, symbol, limit, category }) => ({
                url: `api/get-klines`,
                method: 'GET',
                params: { interval, symbol, limit, category }
            }),
            transformResponse: (response?: { result?: { list?: any[] } }) => {
                const list = response?.result?.list || [];
                return {
                    dataKlines: dataKlinesParser(list),
                    dataValume: dataValumeParser(list)
                }
            }
        })
    })
})

export const { useGetCoinsQuery, useGetKlinesQuery, useGetOrdersbookQuery, useGetHeatMapQuery } = coinsApi
