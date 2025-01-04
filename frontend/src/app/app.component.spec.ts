import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { AppComponent } from './app.component';

import { DxDateBoxComponent } from 'devextreme-angular/ui/date-box';
import { DxSelectBoxComponent, } from 'devextreme-angular/ui/select-box';
import { DxTabsComponent } from 'devextreme-angular/ui/tabs';
import { timeFrames } from './app.config';

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
  });

});
