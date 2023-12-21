import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma/prisma.service';
import { ExecuteTransactionDTO, InitTransactionDTO } from './order.dto';
import { OrderStatus, OrderType } from '@prisma/client';

@Injectable()
export class OrdersService {
  constructor(private prismaService: PrismaService) {}

  initTransaction(input: InitTransactionDTO) {
    return this.prismaService.order.create({
      data: {
        asset_id: input.asset_id,
        wallet_id: input.wallet_id,
        shares: input.shares,
        price: input.price,
        type: input.type,
        status: OrderStatus.PENDING,
        partial: input.shares,
        version: 1,
      },
    });
  }

  async executeTransaction(input: ExecuteTransactionDTO) {
    console.log('INPUT', input);
    return this.prismaService.$transaction(async (prisma) => {
      const order = await prisma.order.findUniqueOrThrow({
        where: {
          id: input.order_id,
        },
      });
      await prisma.order.update({
        where: { id: input.order_id, version: order.version },
        data: {
          partial: order.partial - input.negotiated_shares,
          status: input.status,
          Transactions: {
            create: {
              broker_transaction_id: input.broker_transaction_id,
              related_investor_id: input.related_investor_id,
              shares: input.negotiated_shares,
              price: input.price,
            },
          },
          version: { increment: 1 },
        },
      });

      if (input.status === OrderStatus.CLOSE) {
        await prisma.asset.update({
          where: { id: order.asset_id },
          data: {
            price: input.price,
          },
        });
      }
      const walletAsset = await prisma.walletAsset.findUnique({
        where: {
          wallet_id_asset_id: {
            asset_id: order.asset_id,
            wallet_id: order.wallet_id,
          },
        },
      });

      if (walletAsset) {
        console.log('walletAsset', walletAsset);
        await prisma.walletAsset.update({
          where: {
            wallet_id_asset_id: {
              asset_id: order.asset_id,
              wallet_id: order.wallet_id,
            },
            version: walletAsset.version,
          },
          data: {
            shares:
              order.type === OrderType.BUY
                ? walletAsset.shares + order.shares
                : walletAsset.shares - order.shares,
            version: {
              increment: 1,
            },
          },
        });
      } else {
        await prisma.walletAsset.create({
          data: {
            asset_id: order.asset_id,
            wallet_id: order.wallet_id,
            shares: input.negotiated_shares,
            version: 1,
          },
        });
      }
    });
  }

  all(filter: { wallet_id: string }) {
    return this.prismaService.order.findMany({
      where: {
        wallet_id: filter.wallet_id,
      },
      include: {
        Transactions: true,
        Asset: {
          select: {
            id: true,
            symbol: true,
          },
        },
      },
      orderBy: {
        updated_at: 'desc',
      },
    });
  }
}
