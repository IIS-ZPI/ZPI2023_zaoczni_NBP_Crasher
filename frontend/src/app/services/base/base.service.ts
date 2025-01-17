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

  /** Base API errors */
  apiErrors: ApiError = baseApiErrors;

  /** Override settings for notifications */
  static readonly notificationOverride = {
    timeOut: 9000,
  };

  /** Default error configuration */
  readonly defaultError = {
    title: 'Error',
    code: 'internal_server_error',
  };

  /**
   * Constructor for BaseService
   * @param {NotificationsService} notificationsService Service for displaying notifications
   */
  constructor(protected readonly notificationsService: NotificationsService) { }

  /**
   * Generates HttpParams from given filters
   * @param {unknown} filters Optional filters to be converted into HttpParams
   * @returns {HttpParams} The generated HttpParams
   */
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

  /**
   * Handles custom HTTP errors and displays appropriate notifications
   * @param {HttpErrorResponse} error The HTTP error response to handle
   * @returns {Observable<void>} An observable that throws the processed error message
   */
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
