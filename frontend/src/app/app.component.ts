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
  ],
  providers: [DatePipe, StatsService, NotificationsService, DecimalPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {

  readonly appName = appName;
  readonly availableCurrencies = supportedCurrencies;
  readonly timeFrames = timeFrames;
  readonly minDate = minDate;

  get isCustomTimeFrame(): boolean { 
    return timeFrames[this.selectedTimeFrameIndex].badge === 'CUSTOM';
  }

  get statistictsDominants(): string {
    const dominants = [...Object.keys(this.data.statistics.mode)];
    return dominants.map(d => this.decimalPipe.transform(d, '1.4-4')).join(' ');
  }

  readonly decimalPipe = inject(DecimalPipe);
  readonly statsService = inject(StatsService);
  readonly datePipe = inject(DatePipe);

  currencyFrom: Currency = defaultCurrencyFrom;
  currencyTo: Currency = defaultCurrencyTo;

  dateFrom!: Date;
  dateTo!: Date;

  selectedTimeFrameIndex: number = defaultTimeFrameIndex;
  selectedTimeFrame: TimeFrame = defaultTimeFrame;
  data: Data = blankData;

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

  onCurrencyFromSelectionChanged(): void {
    this.refreshData();
  }

  onCurrencyToSelectionChanged(): void {
    this.refreshData();
  }

  onDateFromValueChanged(): void {
    this.refreshData();
  }

  onDateToValueChanged(): void {
    this.refreshData();
  }

  onTimeFrameIndexSelectionChanged(index: number): void {
    this.selectedTimeFrameIndex = index;
    this.selectedTimeFrame = timeFrames[this.selectedTimeFrameIndex];
    
    this.dateFrom = this.selectedTimeFrame.dateFrom!;
    this.dateTo = this.selectedTimeFrame.dateTo!;

    this.refreshData();
  }
  
}
