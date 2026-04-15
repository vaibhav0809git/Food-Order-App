import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class CartService {
  constructor(private prisma: PrismaService) {}

  

  // ✅ Add item (with quantity logic)
  async add(user: any, menuItemId: number) {
    const existing = await this.prisma.cartItem.findFirst({
      where: {
        userId: user.id,
        menuItemId: menuItemId,
      },
    });

    if (existing) {
      return this.prisma.cartItem.update({
        where: { id: existing.id },
        data: {
          quantity: existing.quantity + 1,
        },
      });
    }

    return this.prisma.cartItem.create({
      data: {
        userId: user.id,
        menuItemId: menuItemId,
        quantity: 1,
      },
    });
  }

  // ✅ Get cart + total
  async getCart(user: any) {
    const items = await this.prisma.cartItem.findMany({
      where: {
        userId: user.id,
      },
      include: {
        menuItem: true,
      },
      
    });

    const total = items.reduce(
      (sum, item) => sum + item.quantity * item.menuItem.price,
      0,
    );

    return {
      items,
      total,
    };
  }

  // ✅ Remove item
  async removeItem(cartItemId: number) {
    return this.prisma.cartItem.delete({
      where: {
        id: cartItemId,
      },
    });
  }

  // ✅ Clear cart
  async clearCart(user: any) {
    return this.prisma.cartItem.deleteMany({
      where: {
        userId: user.id,
      },
    });
  }

  
}