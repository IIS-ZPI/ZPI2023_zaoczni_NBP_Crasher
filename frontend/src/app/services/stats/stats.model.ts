import { Data, SupportedCurrency } from '../../app.model';

/**
 * Represents a get request for stats
 */
export type GetStatsRequest = {
  /**
   * 3 chars ISO code for the currency
   */
  first_currency: SupportedCurrency;
  
  /**
   * 3 chars ISO code for the currency
   */
  second_currency: SupportedCurrency;

  date_from: Date;
  date_end: Date;
}

export type GetStatsResponse = Data;
