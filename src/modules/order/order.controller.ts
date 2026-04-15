import {
  Controller,
  Post,
  Get,
  Body,
  Req,
  UseGuards,
  ForbiddenException,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { JwtAuthGuard } from '../../common/guards/jwt.guard';

@Controller('order')
export class OrderController {
  constructor(private orderService: OrderService) {}

  // ✅ Create order
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Req() req) {
    return this.orderService.create(req.user);
  }

  // ✅ Get my orders
  @UseGuards(JwtAuthGuard)
  @Get()
  getMyOrders(@Req() req) {
    return this.orderService.getMyOrders(req.user);
  }

  // ✅ Checkout
  @UseGuards(JwtAuthGuard)
  @Post('checkout')
  checkout(@Req() req, @Body('orderId') orderId: number) {
    // 🔥 ROLE CHECK HERE
    if (req.user.role === 'MEMBER') {
      throw new ForbiddenException('Members cannot checkout');
    }

    return this.orderService.checkout(orderId);
  }

  // ✅ Cancel
  @UseGuards(JwtAuthGuard)
  @Post('cancel')
  cancel(@Req() req, @Body('orderId') orderId: number) {
    // 🔥 ROLE CHECK HERE
    if (req.user.role === 'MEMBER') {
      throw new ForbiddenException('Members cannot cancel orders');
    }

    return this.orderService.cancel(orderId);
  }
}