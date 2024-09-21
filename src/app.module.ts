import { HttpClientModuleModule } from '@app/http-client-module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import apiConfig from './config/api';
import { TestHttpModuleFactoryClass } from './TestHttpModuleFactoryClass';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [apiConfig],
    }),
    // HttpClientModuleModule.forRoot({ apiKey: 'apikey', apiUrl: 'apiUrl' }), // First way using forRoot method to create a provider immidiately by passing options
    // HttpClientModuleModule.forRootAsync({
    //   imports: [ConfigModule],
    //   useFactory: (configService: ConfigService) => {
    //     return {
    //       apiKey: configService.get('api.apiKey'),
    //       apiUrl: configService.get('api.apiUrl'),
    //     };
    //   },
    //   inject: [ConfigService],
    // }), // Second way using useFactory

    HttpClientModuleModule.forRootAsync({
      useClass: TestHttpModuleFactoryClass,
    }), // Third way using useClass
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
