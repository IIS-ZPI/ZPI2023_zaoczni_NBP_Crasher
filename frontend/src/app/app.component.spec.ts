import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { By } from '@angular/platform-browser';
import { DxDateBoxComponent } from 'devextreme-angular/ui/date-box';
import { DxSelectBoxComponent } from 'devextreme-angular';

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

});
