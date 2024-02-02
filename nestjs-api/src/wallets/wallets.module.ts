import { Module } from '@nestjs/common';
import { WalletsService } from './wallets.service';
import { WalletsController } from './wallets.controller';
import { WalletAssetController } from './wallet-asset/wallet-asset.controller';
import { WalletAssetService } from './wallet-asset/wallet-asset.service';
import { MongooseModule } from '@nestjs/mongoose';
import {
  WalletAsset,
  WalletAssetSchema,
} from './wallet-asset/wallet-asset.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: WalletAsset.name, schema: WalletAssetSchema },
    ]),
  ],
  controllers: [WalletsController, WalletAssetController],
  providers: [WalletsService, WalletAssetService],
})
export class WalletsModule {}
