import { Item as DxTabsItem } from 'devextreme/ui/tabs';

/** Supported currencies type definition */
export type SupportedCurrency = 'USD' | 'EUR' | 'GBP' | 'JPY' | 'CHF' | 'PLN';

/** Currency type with name property */
export type Currency = {
  name: SupportedCurrency;
}

/** Array of supported currencies */
export const supportedCurrencies: Currency[] =  [
  { name: 'USD' },
  { name: 'EUR' },
  { name: 'GBP' },
  { name: 'JPY' },
  { name: 'CHF' },
  { name: 'PLN' },
];

/** Time frame type extending DxTabsItem with optional dateFrom and dateTo properties */
export type TimeFrame = DxTabsItem & { dateFrom?: Date, dateTo?: Date };

/** Statistics type definition */
export type Statistics = {
  mode: {
    [key: string]: number;
  };
  standard_deviation: number;
  variation_coefficient: number;
  median: number;
}

/** Session type definition */
export type Session = {
  increasing_sessions: number;
  decreasing_sessions: number;
  no_change_sessions: number;
}

/** Change distribution type definition */
export type ChangeDistribution = {
  rangeBegin: string;
  rangeEnd: string;
  value: number;
}

/** Data type definition, aggregating statistics, sessions, and changes distribution */
export type Data = {
  statistics: Statistics;
  sessions: Session;
  changes_distribution: ChangeDistribution[];
}
