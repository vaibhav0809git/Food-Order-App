import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class RestaurantService {
  constructor(private prisma: PrismaService) {}

  // ✅ Get restaurants based on user country
  async getAll(user: any) {
    return this.prisma.restaurant.findMany({
      where: {
        country: user.country,
      },
    });
  }

  // ✅ Get single restaurant
  async getOne(id: number) {
    return this.prisma.restaurant.findUnique({
      where: { id },
    });
  }

  // ✅ Create (user-defined)
  async create(data: any) {
    return this.prisma.restaurant.create({
      data: {
        name: data.name,
        country: data.country,
      },
    });
  }

  // ✅ Delete
  async remove(id: number) {
    return this.prisma.restaurant.delete({
      where: { id },
    });
  }
}