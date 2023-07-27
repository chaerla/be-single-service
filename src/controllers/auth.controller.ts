import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { LoginDTO } from '../core/dtos/auth.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../guards/auth.guard';
import { ResponseMessage } from '../decorators/response.decorator';

@ApiTags('auth')
@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  @ResponseMessage('Login successful!')
  signIn(@Body() loginInfo: LoginDTO) {
    return this.authService.login({ ...loginInfo });
  }

  @UseGuards(AuthGuard)
  @Get('self')
  @ApiBearerAuth()
  getProfile(@Request() req) {
    return req.user;
  }
}
