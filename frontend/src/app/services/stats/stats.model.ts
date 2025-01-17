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

  /**
   * Must conform {@link dateFormat}
   */
  date_from: string;
  
  /**
   * Must conform {@link dateFormat}
   */
  date_end: string;
}

/**
 * Represents a get request response for stats
 */
export type GetStatsResponse = Data;
