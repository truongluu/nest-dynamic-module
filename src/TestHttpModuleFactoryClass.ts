import {
  HttpClientModuleFactory,
  HttpClientModuleOptions,
} from '@app/http-client-module';

export class TestHttpModuleFactoryClass implements HttpClientModuleFactory {
  createHttpModuleOptions(): HttpClientModuleOptions {
    return {
      apiKey: 'api from class',
      apiUrl: 'api url from class',
    };
  }
}
