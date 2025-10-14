import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface HeatMapChartSettings{
    interval: string;
    symbol: string;
    limit: string;
    category: string;
}

export interface HeatMapState {
    chartSettings: HeatMapChartSettings;
}

const initialState: HeatMapState = {
    chartSettings: {
    interval: '5',
    symbol: 'BTCUSDT',
    limit: '20000',
    category: 'inverse',
    }
}

export const HeatMapSlice = createSlice({
  name: "heat-map",
  initialState,
  reducers: {
    addHeatMapChart: (state, action: PayloadAction<{ symbol: string }>) => {
        state.chartSettings.symbol = action.payload.symbol
    },
  },

});

export const { addHeatMapChart } = HeatMapSlice.actions;