import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { LoginDTO } from './dto/login.dto';
import { InitiateResetPasswordDTO } from './dto/initiate-reset-password.dto';
import { ResetPasswordDTO } from './dto/reset-password.dto';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { AuthGuard } from './auth.guard';
import { UserService } from 'src/user/user.service';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @Post('login')
  async login(@Body() dto: LoginDTO, @Res() res: Response) {
    console.log(dto);
    const result = await this.authService.login(dto);
    return res.status(result.status).json(result.response);
  }
  @Get('currentUser/:token')
  @UseGuards(AuthGuard)
  async getCurrentUser(@Param('token') token: string, @Req() req: Request) {
    const user = await this.userService.getUserById(req['user'].id);
    if (!user) {
      return { data: null, message: 'No user found!', success: false };
    }
    return { data: user, message: 'User found', success: true };
  }

}
