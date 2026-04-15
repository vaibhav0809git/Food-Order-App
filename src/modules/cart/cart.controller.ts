import {
  Controller,
  Post,
  Get,
  Delete,
  Param,
  Req,
  Body,
  UseGuards,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { JwtAuthGuard } from '../../common/guards/jwt.guard';

@Controller('cart')
export class CartController {
  constructor(private cartService: CartService) {}

  // ✅ Add item to cart
  @UseGuards(JwtAuthGuard)
  @Post()
  add(@Req() req, @Body('menuItemId') menuItemId: number) {
    if (!menuItemId) {
      throw new Error('menuItemId is required');
    }
    return this.cartService.add(req.user, menuItemId);
  }

  // ✅ Get cart
  @UseGuards(JwtAuthGuard)
  @Get()
  get(@Req() req) {
    return this.cartService.getCart(req.user);
  }

  // ✅ Remove item
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cartService.removeItem(Number(id));
  }

  // ✅ Clear full cart
  @UseGuards(JwtAuthGuard)
  @Delete('clear/all')
  clear(@Req() req) {
    return this.cartService.clearCart(req.user);
  }
}