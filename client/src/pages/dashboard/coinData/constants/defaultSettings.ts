export interface DefaultCoin{
  ask1Price: string,
  bid1Price: string,
}
export interface chartSettings {
  interval: string;
  symbol: string;
  limit: string;
  category: string;
};

export const DEFAULT_CHART_SETTINGS: chartSettings = {
  interval: '60',
  symbol: 'BTCUSDT',
  limit: '100',
  category: 'inverse'
};

export const DEFAULT_COIN_OPTION: DefaultCoin = {
  ask1Price: '',
  bid1Price: '',
};

