import { Component } from '@angular/core';
import { appName as appName, defaultCurrencyFrom, defaultCurrencyTo, defaultTimeFrame, defaultTimeFrameIndex, minDateFrom, tempData, timeFrames } from './app.config';
import { DxDateBoxModule } from 'devextreme-angular/ui/date-box';
import { DxTabsModule } from 'devextreme-angular/ui/tabs';
import { DxSelectBoxModule } from 'devextreme-angular/ui/select-box';
import { DxDataGridModule } from 'devextreme-angular/ui/data-grid';
import { DxChartModule } from 'devextreme-angular/ui/chart';
import { availableCurrencies, Currency, Data, TimeFrame } from './app.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    DxDateBoxModule,
    DxTabsModule,
    DxSelectBoxModule,
    DxDataGridModule,
    DxChartModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  readonly appName = appName;
  readonly availableCurrencies = availableCurrencies;
  readonly timeFrames = timeFrames;
  readonly minDateFrom = minDateFrom;

  get isCustomTimeFrame(): boolean { 
    return timeFrames[this.selectedTimeFrameIndex].badge === 'CUSTOM';
  }

  get maxMode(): number {
    return Math.max(...Object.values(this.data.statistics.mode));
  }

  currencyFrom: Currency = defaultCurrencyFrom;
  currencyTo: Currency = defaultCurrencyTo;

  dateFrom!: Date;
  dateTo!: Date;

  selectedTimeFrameIndex: number = defaultTimeFrameIndex;
  selectedTimeFrame: TimeFrame = defaultTimeFrame;
  data: Data = tempData;

  async refreshData(): Promise<void> {
    try {
      console.error('TODO');
    } catch (e) {
      console.error(e);
    }
  }

  onCurrencyFromSelectionChanged(): void {
    this.refreshData();
  }

  onCurrencyToSelectionChanged(): void {
    this.refreshData();
    this.maxMode
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
