import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { Currency, Data, TimeFrame } from './app.model';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes)]
};

export const appName: string = 'NBP Crasher';

export const defaultCurrencyFrom: Currency = {
  name: 'USD',
};

export const defaultCurrencyTo: Currency = {
  name: 'EUR',
};

/**
 * Based on NBP API docs
 */
export const minDateFrom = '2002-01-02';

const now = new Date();
const startDate = new Date();

const endDate = new Date();

const oneWeekDateFrom = new Date(startDate);
oneWeekDateFrom.setDate(now.getDate() - 7);

const twoWeeksDateFrom = new Date(startDate);
twoWeeksDateFrom.setDate(now.getDate() - 14);

const oneMonthDateFrom = new Date(startDate);
oneMonthDateFrom.setDate(now.getDate() - 30);

const threeMonthsDateFrom = new Date(startDate);
threeMonthsDateFrom.setDate(now.getDate() - 90);

const sixMonthsDateFrom = new Date(startDate)
sixMonthsDateFrom.setDate(now.getDate() - 180);

const oneYearMonthsDateFrom = new Date(startDate);
oneYearMonthsDateFrom.setDate(now.getDate() - 365);

export const timeFrames: TimeFrame[] = [
  {
    badge: '1W',
    dateFrom: oneWeekDateFrom,
    dateTo: new Date(endDate),
  },
  {
    badge: '2W',
    dateFrom: twoWeeksDateFrom,
    dateTo: new Date(endDate),
  },
  {
    badge: '1M',
    dateFrom: oneMonthDateFrom,
    dateTo: new Date(endDate),
  },
  {
    badge: '3M',
    dateFrom: threeMonthsDateFrom,
    dateTo: new Date(endDate),
  },
  {
    badge: '6M',
    dateFrom: sixMonthsDateFrom,
    dateTo: new Date(endDate),
  },
  {
    badge: '1Y',
    dateFrom: oneYearMonthsDateFrom,
    dateTo: new Date(endDate),
  },
  {
    badge: 'CUSTOM',
    dateFrom: undefined,
    dateTo: undefined,
  },
];

export const defaultTimeFrameIndex: number = 1; // 2W

export const defaultTimeFrame: TimeFrame = {
  badge: '2W',
  dateFrom: twoWeeksDateFrom,
  dateTo: new Date(endDate),
};

// Sample data based before an actual API integration
export const tempData: Data = {
  statistics: {
    mode: {
      '3.9355': 2,
      '3.9352': 2,
      '3.9368': 2,
      '3.9389': 2,
      '3.9183': 2,
      '3.9922': 2,
    },
    standard_deviation: 5,
    variation_coefficient: 0.25,
    median: 15
  },
  session: {
    increasing_sessions: 3,
    decreasing_sessions: 2,
    no_change_sessions: 2
  },
  changes_distribution: [
    { rangeBegin: '-∞', rangeEnd: '-0.0116', value: 1 },
    { rangeBegin: '-0.0116', rangeEnd: '-0.0090', value: 2 },
    { rangeBegin: '-0.0090', rangeEnd: '-0.0064', value: 3 },
    { rangeBegin: '-0.0064', rangeEnd: '-0.0038', value: 0 },
    { rangeBegin: '-0.0038', rangeEnd: '-0.0012', value: 5 },
    { rangeBegin: '-0.0012', rangeEnd: '0.0014', value: 6 },
    { rangeBegin: '0.0014', rangeEnd: '0.0040', value: 7 },
    { rangeBegin: '0.0040', rangeEnd: '0.0066', value: 8 },
    { rangeBegin: '0.0066', rangeEnd: '0.0092', value: 9 },
    { rangeBegin: '0.0092', rangeEnd: '0.0118', value: 10 },
    { rangeBegin: '0.0118', rangeEnd: '0.0145', value: 11 },
    { rangeBegin: '0.0145', rangeEnd: '0.0171', value: 0 },
    { rangeBegin: '0.0171', rangeEnd: '0.0197', value: 13 },
    { rangeBegin: '0.0197', rangeEnd: '+∞', value: 14 },
  ],
};
