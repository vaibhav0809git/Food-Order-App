import { Controller, Get, Post, Body, Param, Delete, Req, UseGuards } from '@nestjs/common';
import { RestaurantService } from './restaurant.service';
import { JwtAuthGuard } from '../../common/guards/jwt.guard';

@Controller('restaurant')
export class RestaurantController {
  constructor(private readonly restaurantService: RestaurantService) {}

  // ✅ Get all (filtered by user country)
  @UseGuards(JwtAuthGuard)
  @Get()
  getAll(@Req() req: any) {
    return this.restaurantService.getAll(req.user);
  }

  // ✅ Get one
  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.restaurantService.getOne(Number(id));
  }

  // ✅ Create
  @Post()
  create(@Body() body: any) {
    return this.restaurantService.create(body);
  }

  // ✅ Delete
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.restaurantService.remove(Number(id));
  }
}