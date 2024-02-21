import { Command, CommandRunner } from 'nest-commander';
import { AssetsService } from './assets/assets.service';

import { OrdersService } from './orders/orders.service';
import { PrismaService } from './prisma/prisma/prisma.service';
import { WalletsService } from './wallets/wallets.service';
import { WalletAssetService } from './wallets/wallet-asset/wallet-asset.service';

@Command({ name: 'simulate-assets-price' })
export class SimulateAssetsPriceCommand extends CommandRunner {
  constructor(
    private assetsService: AssetsService,
    private walletsService: WalletsService,
    private walletAssetsService: WalletAssetService,
    private ordersService: OrdersService,
    private prismaService: PrismaService,
  ) {
    super();
  }

  async run(_passedParam: string[], _options?: any): Promise<void> {
    console.log('Simulating assets price...');
    await this.cleanDatabase();

    await this.createAssets();

    await this.createWallets();

    await this.createWallets();

    // await this.createOrders();
  }

  async cleanDatabase() {
    await this.prismaService.$transaction([
      this.prismaService.transaction.deleteMany({}),
      this.prismaService.walletAsset.deleteMany({}),
      this.prismaService.assetDaily.deleteMany({}),
      this.prismaService.assetHistory.deleteMany({}),
      this.prismaService.order.deleteMany({}),
      this.prismaService.asset.deleteMany({}),
      this.prismaService.wallet.deleteMany({}),
    ]);
    console.log('Database cleaned');
  }

  async createAssets() {
    await this.assetsService.create({
      id: 'PETR4',
      price: 28.44, // Exemplo de preço, pode variar
      symbol: 'PETR4',
    });
    console.log('Ativo PETR4 criado');

    await this.assetsService.create({
      id: 'VALE3',
      price: 68.15, // Exemplo de preço, pode variar
      symbol: 'VALE3',
    });
    console.log('Ativo VALE3 criado');

    await this.assetsService.create({
      id: 'ITUB4',
      price: 22.3, // Exemplo de preço, pode variar
      symbol: 'ITUB4',
    });
    console.log('Ativo ITUB4 criado');

    await this.assetsService.create({
      id: 'MGLU3',
      price: 4.73, // Exemplo de preço, pode variar
      symbol: 'MGLU3',
    });
    console.log('Ativo MGLU3 criado');
  }

  async createWallets() {
    await this.walletsService.create({
      id: 'CarteiraDividendos',
    });
    console.log('Carteira de Dividendos criada');

    await this.walletsService.create({
      id: 'CarteiraCrescimento',
    });
    console.log('Carteira de Crescimento criada');

    await this.walletsService.create({
      id: 'CarteiraConservadora',
    });
    console.log('Carteira Conservadora criada');

    await this.walletsService.create({
      id: 'CarteiraAgressiva',
    });
    console.log('Carteira Agressiva criada');
  }

  // async createOrders() {
  //   console.log('Creating orders...');
  //   const range = (start: number, end: number) =>
  //     Array.from({ length: end - start }, (_, i) => i + start);

  //   for (const index of range(1, 5)) {
  //     await this.ordersService.initTransaction({
  //       asset_id: 'asset1',
  //       wallet_id: 'wallet1',
  //       price: 100 + index,
  //       shares: 1000,
  //       type: 'SELL',
  //     });

  //     await this.ordersService.initTransaction({
  //       asset_id: 'asset1',
  //       wallet_id: 'wallet2',
  //       price: 100 + index + 10,
  //       shares: 1000,
  //       type: 'BUY',
  //     });

  //     await this.ordersService.initTransaction({
  //       asset_id: 'asset2',
  //       wallet_id: 'wallet1',
  //       price: 200 + index,
  //       shares: 1000,
  //       type: 'SELL',
  //     });

  //     await this.ordersService.initTransaction({
  //       asset_id: 'asset2',
  //       wallet_id: 'wallet2',
  //       price: 200 + index + 10,
  //       shares: 1000,
  //       type: 'BUY',
  //     });

  //     await sleep(2000);
  //   }
  // }
}

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
