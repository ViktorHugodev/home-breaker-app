import { Test, TestingModule } from '@nestjs/testing';
import { WalletAssetService } from './wallet-asset.service';

describe('WalletAssetService', () => {
  let service: WalletAssetService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WalletAssetService],
    }).compile();

    service = module.get<WalletAssetService>(WalletAssetService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
