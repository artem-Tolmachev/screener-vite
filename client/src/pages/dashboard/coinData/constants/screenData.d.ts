import { AllDataCoin, OptionsScreen } from "../../types";
export type ScreenData = typeof screenData;
export interface ScreenGroup {
    id: number;
    screens: ScreenData[];
    screenOptions: OptionsScreen;
}
export declare const screenData: AllDataCoin;
export declare const screen: ScreenGroup;
