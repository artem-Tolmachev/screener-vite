export interface OrdersFilterState {
    ordersFilter: {
        minValue: number;
        range: number;
        distance: number;
    };
}
export declare const ordersBookSlice: import("@reduxjs/toolkit").Slice<OrdersFilterState, {
    setFilter(state: import("immer").WritableDraft<OrdersFilterState>, action: {
        payload: any;
        type: string;
    }): void;
}, "ordersBook", "ordersBook", import("@reduxjs/toolkit").SliceSelectors<OrdersFilterState>>;
export declare const setFilter: import("@reduxjs/toolkit").ActionCreatorWithPayload<any, "ordersBook/setFilter">;
