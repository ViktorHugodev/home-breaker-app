import { Module } from '@nestjs/common';
import { AssetsService } from './assets.service';
import { AssetsController } from './assets.controller';
import { Asset, AssetSchema } from './asset.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { AssetDaily, AssetDailySchema } from './asset-daily.schema';
import { AssetsDailyController } from './assets-daily.controller';
import { AssetsDailyService } from './assets-daily.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Asset.name, schema: AssetSchema },
      { name: AssetDaily.name, schema: AssetDailySchema },
    ]),
  ],
  controllers: [AssetsController, AssetsDailyController],
  providers: [AssetsService, AssetsDailyService],
  exports: [AssetsService],
})
export class AssetsModule {}
