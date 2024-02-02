import { Body, Controller, Get, Param, Post, Sse } from '@nestjs/common';
import { WalletAssetService } from './wallet-asset.service';
import { Observable, map } from 'rxjs';

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

  @Sse('events')
  events(@Param('wallet_id') wallet_id: string): Observable<any> {
    return this.walletAssetService.subscribeEvents(wallet_id).pipe(
      map((event) => ({
        type: 'wallet-asset-updated',
        data: event.data,
      })),
    );
  }
}
// events(@Param('wallet_id') wallet_id: string): Observable<MessageEvent<any>> {
//   return this.walletAssetService.subscribeEvents(wallet_id).pipe(
//     map((event) => {
//       const messageEvent = new MessageEvent('message', { data: event });
//       (messageEvent as any).type = event.event;
//       return messageEvent;
//     }),
//   );
// }
