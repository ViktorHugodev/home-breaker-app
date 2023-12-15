import { Body, Controller, Post } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { ExecuteTransactionDTO, InitTransactionDTO } from './order.dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}
  @Post()
  initTransaction(@Body() body: InitTransactionDTO) {
    return this.ordersService.initTransaction(body);
  }

  executeTransaction(@Body() body: ExecuteTransactionDTO) {
    return this.ordersService.executeTransaction(body);
  }
}
