import { createSlice } from "@reduxjs/toolkit";

export interface OrdersFilterState {
  ordersFilter: {
    minValue: number;
    range: number;
    distance: number
  }
}

const initialState: OrdersFilterState = {
  ordersFilter: {
    minValue: 50000,
    range: 1800000,
    distance: 1
  }
};

export const ordersBookSlice = createSlice({
  name: 'ordersBook',
  initialState,
  reducers: {
    setFilter(state, action) {
      state.ordersFilter.minValue = action.payload.minValue;
      state.ordersFilter.range = action.payload.range;
      state.ordersFilter.distance = action.payload.distance;
    },
  },
});

export const { setFilter } = ordersBookSlice.actions;

