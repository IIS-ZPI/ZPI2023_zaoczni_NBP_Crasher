
import { Item as DxTabsItem } from 'devextreme/ui/tabs';

export type Currency = {
  name: string;
}

export const availableCurrencies: Currency[] =  [
  {
    name: 'USD',
  },
  {
    name: 'EUR',
  },
  {
    name: 'GBP',
  },
  {
    name: 'JPY',
  },
  {
    name: 'CHF',
  },
  {
    name: 'PLN',
  },
];

export type TimeFrame = DxTabsItem & { dateFrom?: Date, dateTo?: Date };

export type ChangeDistribution = {
  rangeBegin: string;
  rangeEnd: string;
  value: number;
}

export type Data = {
  statistics: {
    mode: {
      [key: string]: number;
    };
    standard_deviation: number;
    variation_coefficient: number;
    median: number;
  };
  session: {
    increasing_sessions: number;
    decreasing_sessions: number;
    no_change_sessions: number;
  };
  changes_distribution: ChangeDistribution[];
}
