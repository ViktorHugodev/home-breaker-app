import { Test, TestingModule } from '@nestjs/testing';
import { WalletAssetController } from './wallet-asset.controller';

describe('WalletAssetController', () => {
  let controller: WalletAssetController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WalletAssetController],
    }).compile();

    controller = module.get<WalletAssetController>(WalletAssetController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
