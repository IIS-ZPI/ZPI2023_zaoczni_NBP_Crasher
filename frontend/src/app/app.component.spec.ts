import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { AppComponent } from './app.component';

import { DxDateBoxComponent } from 'devextreme-angular/ui/date-box';
import { DxSelectBoxComponent, } from 'devextreme-angular/ui/select-box';
import { timeFrames } from './app.config';
import { availableCurrencies } from './app.model';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have the 'NBP Crasher' title`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.appName).toEqual('NBP Crasher');
  });

  it('should have disabled date fields on first page enter', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const app = fixture.componentInstance;

    const dateBoxes = fixture.debugElement.queryAll(By.directive(DxDateBoxComponent));

    const startDateBox = dateBoxes[0].componentInstance;
    const endDateBox = dateBoxes[1].componentInstance;

    expect(app.isCustomTimeFrame).toEqual(false);
    expect(startDateBox.disabled).toBe(true);
    expect(endDateBox.disabled).toBe(true);
  });

  it('should have enable date fields when custom time frame is selected', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const app = fixture.componentInstance;

    app.onTimeFrameIndexSelectionChanged(timeFrames.findIndex(tf => tf.badge === 'CUSTOM'));
    fixture.detectChanges();

    const dateBoxes = fixture.debugElement.queryAll(By.directive(DxDateBoxComponent));
    const startDateBox = dateBoxes[0].componentInstance;
    const endDateBox = dateBoxes[1].componentInstance;

    expect(app.isCustomTimeFrame).toEqual(true);

    expect(startDateBox.disabled).toBe(false);
    expect(endDateBox.disabled).toBe(false);

    expect(startDateBox.value).toBe(undefined);
    expect(endDateBox.value).toBe(undefined);
  });

  it('should have disable date fields when custom time frame is selected and then other is selected', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const app = fixture.componentInstance;

    app.onTimeFrameIndexSelectionChanged(timeFrames.findIndex(tf => tf.badge === 'CUSTOM'));
    fixture.detectChanges();

    let dateBoxes = fixture.debugElement.queryAll(By.directive(DxDateBoxComponent));
    let startDateBox = dateBoxes[0].componentInstance;
    let endDateBox = dateBoxes[1].componentInstance;

    expect(app.isCustomTimeFrame).toEqual(true);

    expect(startDateBox.disabled).toBe(false);
    expect(endDateBox.disabled).toBe(false);

    expect(startDateBox.value).toBe(undefined);
    expect(endDateBox.value).toBe(undefined);

    app.onTimeFrameIndexSelectionChanged(timeFrames.findIndex(tf => tf.badge === '2W'));
    fixture.detectChanges();

    dateBoxes = fixture.debugElement.queryAll(By.directive(DxDateBoxComponent));
    startDateBox = dateBoxes[0].componentInstance;
    endDateBox = dateBoxes[1].componentInstance;

    expect(app.isCustomTimeFrame).toEqual(false);

    expect(startDateBox.disabled).toBe(true);
    expect(endDateBox.disabled).toBe(true);

    expect(startDateBox.value).not.toBe(undefined);
    expect(endDateBox.value).not.toBe(undefined);
  });

  it('should refresh data when currency from is changed', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const app = fixture.componentInstance;

    spyOn(app, 'refreshData').and.callThrough();

    app.onCurrencyFromSelectionChanged();

    expect(app.refreshData).toHaveBeenCalled();
  });

  it('should refresh data when currency to is changed', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const app = fixture.componentInstance;
    
    spyOn(app, 'refreshData').and.callThrough();

    app.onCurrencyToSelectionChanged();

    expect(app.refreshData).toHaveBeenCalled();
  });

  it('should refresh data when date from is changed', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const app = fixture.componentInstance;

    spyOn(app, 'refreshData').and.callThrough();

    app.onDateFromValueChanged();

    expect(app.refreshData).toHaveBeenCalled();
  });

  it('should refresh data when date to is changed', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const app = fixture.componentInstance;

    spyOn(app, 'refreshData').and.callThrough();

    app.onDateToValueChanged();

    expect(app.refreshData).toHaveBeenCalled();
  });

  it('should select 1W time frame (range) on page encounter', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const app = fixture.componentInstance;

    expect(app.selectedTimeFrameIndex).toEqual(0);
    expect(app.selectedTimeFrame.badge).toEqual('1W')
  });

});
