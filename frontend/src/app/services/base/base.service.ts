import { HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NotificationsService } from 'angular2-notifications';
import { Observable, throwError } from 'rxjs';
import { ApiError } from '../../models/error.model';
import { baseApiErrors } from './base.errors';

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  apiErrors: ApiError = baseApiErrors;

  static readonly notificationOverride = {
    timeOut: 9000,
  };

  readonly defaultError = {
    title: 'Error',
    code: 'internal_server_error',
  };

  constructor(protected readonly notificationsService: NotificationsService) { }

  generateParams(filters?: unknown): HttpParams {
    let params = new HttpParams();

    if (!filters) {
      return params;
    }

    for (const [name, value] of Object.entries(filters)) {
      if (value !== undefined && value !== null) {
        if (value instanceof Array) {
          value.forEach(v => {
            params = params.append(name, v);
          });
        } else {
          params = params.set(name, value as string | number | boolean);
        }
      }
    }

    return params;
  }

  catchCustomError(error: HttpErrorResponse): Observable<void> {
    const code = error.error?.detail ?? this.defaultError.code;
    const message = this.apiErrors[code];
    this.notificationsService.error(
      this.defaultError.title,
      message,
      BaseService.notificationOverride
    );

    return throwError(() => new Error(message));
  }
  
}
