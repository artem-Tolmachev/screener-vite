export interface DefaultCoin {
    ask1Price: string;
    bid1Price: string;
    id?: string | null;
}
export interface chartSettings {
    interval: string;
    symbol: string;
    limit: string;
    category: string;
    _t: number;
}
export declare const DEFAULT_CHART_SETTINGS: chartSettings;
export declare const DEFAULT_COIN_OPTION: DefaultCoin;
export interface BtcUsdtDate extends chartSettings, DefaultCoin {
    src: string;
}
