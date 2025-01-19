import { Component, inject } from '@angular/core';
import { DatePipe, DecimalPipe } from '@angular/common';
import { appName, dateFormat, defaultCurrencyFrom, defaultCurrencyTo, defaultTimeFrame, defaultTimeFrameIndex, minDate, blankData, timeFrames } from './app.config';
import { DxDateBoxModule } from 'devextreme-angular/ui/date-box';
import { DxTabsModule } from 'devextreme-angular/ui/tabs';
import { DxSelectBoxModule } from 'devextreme-angular/ui/select-box';
import { DxDataGridModule } from 'devextreme-angular/ui/data-grid';
import { DxChartModule } from 'devextreme-angular/ui/chart';
import { supportedCurrencies, Currency, Data, TimeFrame } from './app.model';
import { StatsService } from './services/stats/stats.service';
import { NotificationsService, SimpleNotificationsModule } from 'angular2-notifications';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    DxDateBoxModule,
    DxTabsModule,
    DxSelectBoxModule,
    DxDataGridModule,
    DxChartModule,
    SimpleNotificationsModule,
  ], // Imported modules
  providers: [DatePipe, StatsService, NotificationsService, DecimalPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {

  /** Application name */
  readonly appName = appName;
  
  /** Supported currencies */
  readonly availableCurrencies = supportedCurrencies;
  
  /** Available time frames */
  readonly timeFrames = timeFrames;
  
  /** Minimum date selectable */
  readonly minDate = minDate;

  /**
   * Determines if the selected time frame is custom
   * @returns {boolean} True if the selected time frame is custom, otherwise false
   */
  get isCustomTimeFrame(): boolean { 
    return timeFrames[this.selectedTimeFrameIndex].badge === 'CUSTOM';
  }

  /**
   * Returns the dominant values from statistics as a formatted string
   * @returns {string} The formatted dominant values
   */
  get statistictsDominants(): string {
    const dominants = [...Object.keys(this.data.statistics.mode)];
    return dominants.map(d => this.decimalPipe.transform(d, '1.4-4')).join(' ');
  }

  /** Dependency injection for DecimalPipe */
  readonly decimalPipe = inject(DecimalPipe);
  
  /** Dependency injection for StatsService */
  readonly statsService = inject(StatsService);
  
  /** Dependency injection for DatePipe */
  readonly datePipe = inject(DatePipe);

  /** Default "from" currency */
  currencyFrom: Currency = defaultCurrencyFrom;
  
  /** Default "to" currency */
  currencyTo: Currency = defaultCurrencyTo;

  /** Start date for data */
  dateFrom!: Date;
  
  /** End date for data */
  dateTo!: Date;

  /** Default time frame index */
  selectedTimeFrameIndex: number = defaultTimeFrameIndex;
  
  /** Default time frame */
  selectedTimeFrame: TimeFrame = defaultTimeFrame;
  
  /** Placeholder for data */
  data: Data = blankData;

  /**
   * Refreshes data based on selected parameters
   */
  async refreshData(): Promise<void> {
    try {
      this.data = await this.statsService.get({
        first_currency: this.currencyFrom.name,
        second_currency: this.currencyTo.name,
        date_from: this.datePipe.transform(this.dateFrom, dateFormat)!,
        date_end: this.datePipe.transform(this.dateTo, dateFormat)!,
      });
    } catch (e) {
      console.error(e);
    }
  }

  /**
   * Handler for when the "from" currency selection changes
   */
  onCurrencyFromSelectionChanged(): void {
    this.refreshData();
  }

  /**
   * Handler for when the "to" currency selection changes
   */
  onCurrencyToSelectionChanged(): void {
    this.refreshData();
  }

  /**
   * Handler for when the "from" date changes
   */
  onDateFromValueChanged(): void {
    this.refreshData();
  }

  /**
   * Handler for when the "to" date changes
   */
  onDateToValueChanged(): void {
    this.refreshData();
  }

  /**
   * Handler for when the time frame selection changes
   * @param {number} index The new time frame index
   */
  onTimeFrameIndexSelectionChanged(index: number): void {
    this.selectedTimeFrameIndex = index;
    this.selectedTimeFrame = timeFrames[this.selectedTimeFrameIndex];
    
    this.dateFrom = this.selectedTimeFrame.dateFrom!;
    this.dateTo = this.selectedTimeFrame.dateTo!;

    this.refreshData();
  }
  
}
