import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NotificationsService } from 'angular2-notifications';

import { firstValueFrom } from 'rxjs';

import { BaseService } from '../base/base.service';
import { statsApiErrors } from './stats.errors';
import { GetStatsRequest, GetStatsResponse } from './stats.model';
import { Data } from '../../app.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StatsService extends BaseService {

  readonly baseRoutePath: string = 'stats';

  constructor(
    private readonly notifications: NotificationsService,
    private readonly httpClient: HttpClient,
  ) {
    super(notifications);
    this.apiErrors = { ...statsApiErrors, ...this.apiErrors };
  }

  async get(filters: GetStatsRequest): Promise<Data> {
    const params = this.generateParams(filters);
    const request = this.httpClient.get<GetStatsResponse>(
      `${environment.apiUrl}/${this.baseRoutePath}`,
      { params }
    );

    return await firstValueFrom(request) as Data;
  }

}
