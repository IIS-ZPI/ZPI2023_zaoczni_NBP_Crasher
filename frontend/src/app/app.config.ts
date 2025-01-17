import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { CommonModule } from '@angular/common';
import { provideHttpClient } from '@angular/common/http';

import { SimpleNotificationsModule } from 'angular2-notifications';

import { routes } from './app.routes';
import { Currency, Data, TimeFrame } from './app.model';

/** Application configuration with providers */
export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    importProvidersFrom(
      SimpleNotificationsModule.forRoot(),
      CommonModule,
    ),
    provideHttpClient(),
  ],
};

/** Application name */
export const appName: string = 'NBP Crasher';

/** Default "from" currency */
export const defaultCurrencyFrom: Currency = {
  name: 'USD',
};

/** Default "to" currency */
export const defaultCurrencyTo: Currency = {
  name: 'EUR',
};

/** Minimum date selectable (Based on NBP API docs) */
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

const sixMonthsDateFrom = new Date(startDate);
sixMonthsDateFrom.setDate(now.getDate() - 180);

const oneYearMonthsDateFrom = new Date(startDate);
oneYearMonthsDateFrom.setDate(now.getDate() - 365);

/** Array of available time frames */
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

/** Default time frame index (1W) */
export const defaultTimeFrameIndex: number = 0;

/** Default time frame (1W) */
export const defaultTimeFrame: TimeFrame = {
  badge: '1W',
  dateFrom: oneWeekDateFrom,
  dateTo: new Date(endDate),
};

/** Date format */
export const dateFormat: string = 'yyyy-MM-dd';

/** Placeholder for blank data */
export const blankData: Data = {
  statistics: {
    mode: {
      '0.0000': 0,
    },
    standard_deviation: 0,
    variation_coefficient: 0,
    median: 0
  },
  sessions: {
    increasing_sessions: 0,
    decreasing_sessions: 0,
    no_change_sessions: 0
  },
  changes_distribution: [],
};
