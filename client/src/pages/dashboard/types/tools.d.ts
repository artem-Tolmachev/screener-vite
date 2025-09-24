// import { IChartApi } from 'lightweight-charts';

// export {};

// declare global {
//   interface Window {
//     LightweightCharts: {
//       createChartTools: (...args: any[]) => ExtendedChartApi;
//       version?: string;
//     };
//   }

//   interface ExtendedChartApi extends IChartApi {
//     addLineTool: (toolName: string, points: any[], options: any) => void;
//     _private__chartWidget: {
//     addSeries: (seriesType: any, options?: any) => any;
//   };
//   }
// }

import { IChartApi } from 'lightweight-charts';
export {};
declare global {
  interface Window {
    LightweightCharts: typeof LightweightCharts & {
      createChartTools: (...args: any[]) => ExtendedChartApi;
      version?: string;
    };
  }
}

interface ExtendedChartApi extends IChartApi {
  addLineTool: (toolName: string, points: any[], options: any) => void;
  _private__chartWidget: {
    addSeries: (seriesType: any, options?: any) => any;
  };
}
