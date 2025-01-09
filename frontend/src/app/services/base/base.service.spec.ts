import { TestBed } from '@angular/core/testing';
import { NotificationsService } from 'angular2-notifications';
import { HttpErrorResponse, HttpParams } from '@angular/common/http';
import { BaseService } from './base.service';

describe('BaseService', () => {
  let service: BaseService;
  let notificationsServiceSpy: jasmine.SpyObj<NotificationsService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('NotificationsService', ['error']);

    TestBed.configureTestingModule({
      providers: [
        BaseService,
        { provide: NotificationsService, useValue: spy }
      ]
    });

    service = TestBed.inject(BaseService);
    notificationsServiceSpy = TestBed.inject(NotificationsService) as jasmine.SpyObj<NotificationsService>;
  });

  it('should generate HttpParams correctly', () => {
    const filters = { param1: 'value1', param2: 'value2' };
    const params = service.generateParams(filters);
    expect(params.get('param1')).toBe('value1');
    expect(params.get('param2')).toBe('value2');
  });

  it('should handle null or undefined filters in generateParams', () => {
    let params = service.generateParams(null);
    expect(params.keys().length).toBe(0);

    params = service.generateParams(undefined);
    expect(params.keys().length).toBe(0);
  });

  it('should handle array filters in generateParams', () => {
    const filters = { param1: ['value1', 'value2'] };
    const params = service.generateParams(filters);
    expect(params.getAll('param1')).toEqual(['value1', 'value2']);
  });

  it('should catch and handle custom errors', () => {
    const errorResponse = new HttpErrorResponse({ error: { detail: 'internal_server_error' } });

    service.catchCustomError(errorResponse).subscribe({
      error: (error: Error) => {
        expect(error.message).toBe('Internal server error');
        expect(notificationsServiceSpy.error).toHaveBeenCalledWith(
          'Error',
          'Internal server error',
          BaseService.notificationOverride
        );
      }
    });
  });

  // it('should return empty FormData when no data is provided', () => {
  //   const formData = service.getFormData();
  //   expect(Array.from(formData.keys()).length).toBe(0);
  // });

  it('should append data correctly to FormData', () => {
    const data = { key1: 'value1', key2: 'value2' };
    const formData = service.getFormData(data);
    expect(formData.get('key1')).toBe('value1');
    expect(formData.get('key2')).toBe('value2');
  });

});
