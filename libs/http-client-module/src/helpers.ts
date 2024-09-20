import { ModuleMetadata, Provider, Type } from '@nestjs/common';
import { HTTP_CLIENT_TOKEN } from './const';
import { HttpClientModuleService } from './http-client-module.service';

export function createHttpClientProvider(
  options: HttpClientModuleOptions,
): Provider {
  return {
    provide: HTTP_CLIENT_TOKEN,
    useValue: getHttpClientModuleOptions(options),
  };
}

export const getHttpClientModuleOptions = (
  options: HttpClientModuleOptions,
): HttpClientModuleService => new HttpClientModuleService(options);

export interface HttpClientModuleOptions {
  apiUrl: string;
  apiKey: string;
}

export interface HttpClientModuleFactory {
  createHttpModuleOptions: () =>
    | Promise<HttpClientModuleOptions>
    | HttpClientModuleOptions;
}

export interface HttpClientModuleAsyncOptions
  extends Pick<ModuleMetadata, 'imports'> {
  inject?: any[];
  useClass?: Type<HttpClientModuleFactory>;
  useExisting?: Type<HttpClientModuleFactory>;
  useFactory?: (
    ...args: any[]
  ) => Promise<HttpClientModuleOptions> | HttpClientModuleOptions;
}
