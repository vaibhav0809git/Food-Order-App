import { Injectable, UnauthorizedException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class PaymentService {
  constructor(private prisma: PrismaService) {}

  // ✅ Only ADMIN can add payment method
  async add(user: any, type: string) {
    // 🔒 Check user exists
    if (!user) {
      throw new UnauthorizedException('User not logged in');
    }

    // 🔒 Check role
    if (user.role !== 'ADMIN') {
      throw new ForbiddenException('Only admin can add payment method');
    }

    return this.prisma.paymentMethod.create({
      data: {
        userId: user.id,
        type: type,
      },
    });
  }

  // ✅ Get user payment methods
  async getAll(user: any) {
    // 🔒 Prevent crash
    if (!user) {
      throw new UnauthorizedException('User not logged in');
    }

    return this.prisma.paymentMethod.findMany({
      where: {
        userId: user.id,
      },
    });
  }
}