import { Item as DxTabsItem } from 'devextreme/ui/tabs';

export type SupportedCurrency = 'USD' | 'EUR' | 'GBP' | 'JPY' | 'CHF' | 'PLN';

export type Currency = {
  name: SupportedCurrency;
}

export const supportedCurrencies: Currency[] =  [
  { name: 'USD' },
  { name: 'EUR' },
  { name: 'GBP' },
  { name: 'JPY' },
  { name: 'CHF' },
  { name: 'PLN' },
];

export type TimeFrame = DxTabsItem & { dateFrom?: Date, dateTo?: Date };

export type Statistics = {
  mode: {
    [key: string]: number;
  };
  standard_deviation: number;
  variation_coefficient: number;
  median: number;
}

export type Session = {
  increasing_sessions: number;
  decreasing_sessions: number;
  no_change_sessions: number;
}

export type ChangeDistribution = {
  rangeBegin: string;
  rangeEnd: string;
  value: number;
}

export type Data = {
  statistics: Statistics;
  sessions: Session;
  changes_distribution: ChangeDistribution[];
}
