import { Module } from '@nestjs/common';
import { WalletsService } from './wallets.service';
import { WalletsController } from './wallets.controller';
import { WalletAssetController } from './wallet-asset/wallet-asset.controller';
import { WalletAssetService } from './wallet-asset/wallet-asset.service';

@Module({
  controllers: [WalletsController, WalletAssetController],
  providers: [WalletsService, WalletAssetService],
})
export class WalletsModule {}
