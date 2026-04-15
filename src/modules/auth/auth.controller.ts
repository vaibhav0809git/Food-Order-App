import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // ✅ LOGIN
  @Post('login')
  async login(@Body() body: any) {
    if (!body.email || !body.password) {
      throw new Error('Email and password are required');
    }

    return this.authService.login(body.email, body.password);
  }
}