import { Component } from '@angular/core';
import { appTitle } from './app.config';
import { DxDateBoxModule } from 'devextreme-angular/ui/date-box';
import { DxTabsModule } from 'devextreme-angular/ui/tabs';
import { DxSelectBoxModule } from 'devextreme-angular/ui/select-box';
import { DxDataGridModule } from 'devextreme-angular/ui/data-grid';
import { DxChartModule } from 'devextreme-angular/ui/chart';

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
  title = appTitle;
}
