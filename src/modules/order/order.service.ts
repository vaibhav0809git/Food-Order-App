import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class OrderService {
  constructor(private prisma: PrismaService) {}

  // ✅ CREATE ORDER FROM CART
  async create(user: any) {
    const cartItems = await this.prisma.cartItem.findMany({
      where: { userId: user.id },
      include: { menuItem: true },
    });

    if (cartItems.length === 0) {
      throw new Error('Cart is empty');
    }

    const order = await this.prisma.order.create({
      data: {
        userId: user.id,
        status: 'CREATED',
        items: {
          create: cartItems.map((item) => ({
            menuItemId: item.menuItemId,
            quantity: item.quantity,
          })),
        },
      },
      include: { items: true },
    });

    await this.prisma.cartItem.deleteMany({
      where: { userId: user.id },
    });

    return order;
  }

  // 📄 GET MY ORDERS
  async getMyOrders(user: any) {
    return this.prisma.order.findMany({
      where: { userId: user.id },
      include: { items: true },
    });
  }

  // 💳 CHECKOUT
  async checkout(orderId: number) {
    return this.prisma.order.update({
      where: { id: orderId },
      data: { status: 'PAID' },
    });
  }

  // ❌ CANCEL
  async cancel(orderId: number) {
    return this.prisma.order.update({
      where: { id: orderId },
      data: { status: 'CANCELLED' },
    });
  }
}