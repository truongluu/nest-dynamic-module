// Package.
import { Inject } from '@nestjs/common';
import axios from 'axios';

// Internal.
import { HTTP_CLIENT_MODULE_OPTIONS } from './const';
import { HttpClientModuleOptions } from './helpers';

export class HttpClientModuleService {
  private readonly apiUrl: string = '';
  private readonly apiKey: string = '';

  constructor(
    @Inject(HTTP_CLIENT_MODULE_OPTIONS)
    private readonly options: HttpClientModuleOptions,
  ) {
    this.apiUrl = this.options.apiUrl;
    this.apiKey = this.options.apiKey;
  }

  public async fetchData(method: string, payload?: any) {
    return axios({
      method,
      url: `${this.apiUrl}/health`,
      data: payload,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.apiKey}`,
      },
    });
  }
}
