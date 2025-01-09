import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { NotificationsService } from 'angular2-notifications';
import { StatsService } from './stats.service';
import { environment } from '../../../environments/environment';
import { GetStatsRequest, GetStatsResponse } from './stats.model';
import { HttpErrorResponse } from '@angular/common/http';
import { BaseService } from '../base/base.service';

describe('StatsService', () => {
  let service: StatsService;
  let httpMock: HttpTestingController;
  let notificationsServiceSpy: jasmine.SpyObj<NotificationsService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('NotificationsService', ['error']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        StatsService,
        { provide: NotificationsService, useValue: spy }
      ]
    });

    service = TestBed.inject(StatsService);
    httpMock = TestBed.inject(HttpTestingController);
    notificationsServiceSpy = TestBed.inject(NotificationsService) as jasmine.SpyObj<NotificationsService>;
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should make a GET request to retrieve stats', async () => {
    const filters: GetStatsRequest = {
      first_currency: 'USD',
      second_currency: 'EUR',

      date_from: '2025-01-05',
      date_end: '2025-05-05',
    };

    const mockResponse: GetStatsResponse = {
      statistics: {
        mode: {
          '3.9355': 2,
          '3.9352': 2,
          '3.9368': 2,
          '3.9389': 2,
          '3.9183': 2,
          '3.9922': 2,
        },
        standard_deviation: 5,
        variation_coefficient: 0.25,
        median: 15
      },
      sessions: {
        increasing_sessions: 3,
        decreasing_sessions: 2,
        no_change_sessions: 2
      },
      changes_distribution: [
        { rangeBegin: '-inf', rangeEnd: '-0.0116', value: 1 },
        { rangeBegin: '-0.0116', rangeEnd: '-0.0090', value: 2 },
        { rangeBegin: '-0.0090', rangeEnd: '-0.0064', value: 3 },
        { rangeBegin: '-0.0064', rangeEnd: '-0.0038', value: 0 },
        { rangeBegin: '-0.0038', rangeEnd: '-0.0012', value: 5 },
        { rangeBegin: '-0.0012', rangeEnd: '0.0014', value: 6 },
        { rangeBegin: '0.0014', rangeEnd: '0.0040', value: 7 },
        { rangeBegin: '0.0040', rangeEnd: '0.0066', value: 8 },
        { rangeBegin: '0.0066', rangeEnd: '0.0092', value: 9 },
        { rangeBegin: '0.0092', rangeEnd: '0.0118', value: 10 },
        { rangeBegin: '0.0118', rangeEnd: '0.0145', value: 11 },
        { rangeBegin: '0.0145', rangeEnd: '0.0171', value: 0 },
        { rangeBegin: '0.0171', rangeEnd: '0.0197', value: 13 },
        { rangeBegin: '0.0197', rangeEnd: '+inf', value: 14 },
      ],
    };

    const data = {
      statistics: {
        mode: {
          '3.9355': 2,
          '3.9352': 2,
          '3.9368': 2,
          '3.9389': 2,
          '3.9183': 2,
          '3.9922': 2,
        },
        standard_deviation: 5,
        variation_coefficient: 0.25,
        median: 15
      },
      sessions: {
        increasing_sessions: 3,
        decreasing_sessions: 2,
        no_change_sessions: 2
      },
      changes_distribution: [
        { rangeBegin: '-inf', rangeEnd: '-0.0116', value: 1 },
        { rangeBegin: '-0.0116', rangeEnd: '-0.0090', value: 2 },
        { rangeBegin: '-0.0090', rangeEnd: '-0.0064', value: 3 },
        { rangeBegin: '-0.0064', rangeEnd: '-0.0038', value: 0 },
        { rangeBegin: '-0.0038', rangeEnd: '-0.0012', value: 5 },
        { rangeBegin: '-0.0012', rangeEnd: '0.0014', value: 6 },
        { rangeBegin: '0.0014', rangeEnd: '0.0040', value: 7 },
        { rangeBegin: '0.0040', rangeEnd: '0.0066', value: 8 },
        { rangeBegin: '0.0066', rangeEnd: '0.0092', value: 9 },
        { rangeBegin: '0.0092', rangeEnd: '0.0118', value: 10 },
        { rangeBegin: '0.0118', rangeEnd: '0.0145', value: 11 },
        { rangeBegin: '0.0145', rangeEnd: '0.0171', value: 0 },
        { rangeBegin: '0.0171', rangeEnd: '0.0197', value: 13 },
        { rangeBegin: '0.0197', rangeEnd: '+inf', value: 14 },
      ],
    };

    service.get(filters).then(result => {
      expect(result).toEqual(data);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/stats?first_currency=USD&second_currency=EUR&date_from=2025-01-05&date_end=2025-05-05`);
    expect(req.request.method).toBe('GET');

    req.flush(mockResponse);
  });

  it('should handle errors on GET request', async () => {
    const filters: GetStatsRequest = {
      first_currency: 'USD',
      second_currency: 'EUR',

      date_from: '2025-01-05',
      date_end: '2025-05-05',
    };

    service.get(filters).catch(error => {
      expect(error).toBeTruthy();
      expect(notificationsServiceSpy.error).toHaveBeenCalled();
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/stats?first_currency=USD&second_currency=EUR&date_from=2025-01-05&date_end=2025-05-05`);
    req.flush({ detail: 'internal_server_error' }, { status: 500, statusText: 'Internal server error' });
  });

  it('should catch and handle custom errors', () => {
    const errorResponses = [
      {
        http: new HttpErrorResponse({ error: { detail: 'invalid_data' } }),
        expected: {
          errorCode: 'invalid_data',
          errorMessage: 'Invalid data',
        }
      },
      {
        http: new HttpErrorResponse({ error: { detail: 'date_not_supported' } }),
        expected: {
          errorCode: 'date_not_supported',
          errorMessage: 'Date not supported',
        }
      },
      {
        http: new HttpErrorResponse({ error: { detail: 'internal_server_error' } }),
        expected: {
          errorCode: 'internal_server_error',
          errorMessage: 'Internal server error',
        }
      },
    ];

    errorResponses.forEach(errorResponse => {
      service.catchCustomError(errorResponse.http).subscribe({
        error: (error: Error) => {
          expect(error.message).toBe(errorResponse.expected.errorMessage);
          expect(notificationsServiceSpy.error).toHaveBeenCalledWith(
            'Error',
            errorResponse.expected.errorMessage,
            BaseService.notificationOverride
          );
        }
      });
    })
  });

});
