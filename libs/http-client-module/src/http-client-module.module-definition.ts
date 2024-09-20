import { ConfigurableModuleBuilder } from '@nestjs/common';
import { HttpClientModuleOptions } from './helpers';

export const {
  ConfigurableModuleClass,
  MODULE_OPTIONS_TOKEN,
  OPTIONS_TYPE,
  ASYNC_OPTIONS_TYPE,
} = new ConfigurableModuleBuilder<HttpClientModuleOptions>()
  .setFactoryMethodName('createConfigOptions')
  .build();
