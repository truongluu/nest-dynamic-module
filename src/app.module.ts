import { HttpClientModuleModule } from '@app/http-client-module';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import apiConfig from './config/api';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [apiConfig],
    }),
    HttpClientModuleModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        return {
          apiKey: configService.get('api.apiKey'),
          apiUrl: configService.get('api.apiUrl'),
        };
      },
      inject: [ConfigService],
    }),
    // HttpClientModuleModule.forRoot({ apiKey: 'apikey', apiUrl: 'apiUrl' }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
