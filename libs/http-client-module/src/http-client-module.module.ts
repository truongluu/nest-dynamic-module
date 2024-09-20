import { DynamicModule, Provider, Type } from '@nestjs/common';
import { HTTP_CLIENT_MODULE_OPTIONS, HTTP_CLIENT_TOKEN } from './const';
import {
  createHttpClientProvider,
  getHttpClientModuleOptions,
  HttpClientModuleAsyncOptions,
  HttpClientModuleFactory,
  HttpClientModuleOptions,
} from './helpers';

export class HttpClientModuleModule {
  public static forRoot(options: HttpClientModuleOptions): DynamicModule {
    const provider: Provider = createHttpClientProvider(options);
    return {
      module: HttpClientModuleModule,
      providers: [provider],
      exports: [provider],
    };
  }

  public static forRootAsync(
    options: HttpClientModuleAsyncOptions,
  ): DynamicModule {
    const provider: Provider = {
      inject: [HTTP_CLIENT_MODULE_OPTIONS],
      provide: HTTP_CLIENT_TOKEN,
      useFactory: async (options: HttpClientModuleOptions) => {
        return getHttpClientModuleOptions(options);
      },
    };
    const asyncProviders = this.createAsyncProviders(options);
    return {
      module: HttpClientModuleModule,
      imports: options.imports,
      providers: [...asyncProviders, provider],
      exports: [...asyncProviders, provider],
    };
  }

  private static createAsyncProviders(
    options: HttpClientModuleAsyncOptions,
  ): Provider[] {
    if (options.useExisting || options.useFactory) {
      return [this.createAsyncOptionsProvider(options)];
    }

    const useClass = options.useClass;

    return [
      this.createAsyncOptionsProvider(options),
      {
        provide: useClass,
        useClass,
      },
    ];
  }

  private static createAsyncOptionsProvider(
    options: HttpClientModuleAsyncOptions,
  ): Provider {
    if (options.useFactory) {
      return {
        provide: HTTP_CLIENT_MODULE_OPTIONS,
        useFactory: options.useFactory,
        inject: options.inject || [],
      };
    }

    const inject = [
      (options.useClass ||
        options.useExisting) as Type<HttpClientModuleFactory>,
    ];

    return {
      provide: HTTP_CLIENT_MODULE_OPTIONS,
      useFactory: async (optionsFactory: HttpClientModuleFactory) =>
        await optionsFactory.createHttpModuleOptions(),
      inject,
    };
  }
}
