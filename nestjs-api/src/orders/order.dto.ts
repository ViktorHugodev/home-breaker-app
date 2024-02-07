import { OrderStatus, OrderType } from '@prisma/client';

export interface InitTransactionDTO {
  asset_id: string;
  wallet_id: string;
  shares: number;
  price: number;
  type: OrderType;
}

export interface ExecuteTransactionDTO {
  order_id: string;
  status: 'OPEN' | 'CLOSED';
  related_investor_id: string;
  price: number;
  broker_transaction_id: string;
  negotiated_shares: number;
}
