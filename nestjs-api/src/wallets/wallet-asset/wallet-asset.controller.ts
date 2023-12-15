import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { WalletAssetService } from './wallet-asset.service';

@Controller('wallets/:wallet_id/assets')
export class WalletAssetController {
  constructor(private walletAssetService: WalletAssetService) {}
  @Get()
  all(@Param('wallet_id') wallet_id: string) {
    return this.walletAssetService.all({ wallet_id });
  }

  @Post()
  create(
    @Param('wallet_id') wallet_id: string,
    @Body() body: { asset_id: string; shares: number },
  ) {
    return this.walletAssetService.create({
      wallet_id,
      ...body,
    });
  }
}
