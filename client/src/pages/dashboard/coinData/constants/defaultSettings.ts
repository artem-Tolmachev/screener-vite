export interface DefaultCoin{
  ask1Price: string,
  bid1Price: string,
  id?: string
}
export interface chartSettings {
  interval: string;
  symbol: string;
  limit: string;
  category: string;
  _t: number;
};

export const DEFAULT_CHART_SETTINGS: chartSettings = {
  interval: '60',
  symbol: 'BTCUSDT',
  limit: '20000',
  category: 'inverse',
  _t: Date.now()
};

export const DEFAULT_COIN_OPTION: DefaultCoin = {
  ask1Price: '',
  bid1Price: ''
};

