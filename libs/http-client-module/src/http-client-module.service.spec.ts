import { Test, TestingModule } from '@nestjs/testing';
import { HttpClientModuleService } from './http-client-module.service';

describe('HttpClientModuleService', () => {
  let service: HttpClientModuleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HttpClientModuleService],
    }).compile();

    service = module.get<HttpClientModuleService>(HttpClientModuleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
