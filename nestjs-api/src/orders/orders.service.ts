import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma/prisma.service';
import { ExecuteTransactionDTO, InitTransactionDTO } from './order.dto';
import { OrderStatus } from '@prisma/client';

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
      },
    });
  }

  executeTransaction(input: ExecuteTransactionDTO) {}

  all() {
    return this.prismaService.order.findMany();
  }
}
