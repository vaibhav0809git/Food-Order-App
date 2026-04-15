import {
  Controller,
  Get,
  Post,
  Body,
  Req,
  UseGuards,
} from '@nestjs/common';
import { PaymentService } from './payment.service';
import { JwtAuthGuard } from '../../common/guards/jwt.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';

@Controller('payment')
export class PaymentController {
  constructor(private paymentService: PaymentService) {}

  // ✅ All logged-in users can view
  @UseGuards(JwtAuthGuard)
  @Get()
  getAll(@Req() req) {
    return this.paymentService.getAll(req.user);
  }

  // 🔒 ONLY ADMIN can add payment method
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @Post()
  add(@Req() req, @Body('type') type: string) {
    if (!type) {
      throw new Error('Type is required');
    }

    return this.paymentService.add(req.user, type);
  }
}