import { IsEmail } from '@nestjs/class-validator';

export class InitiateResetPasswordDTO {
  @IsEmail()
  email: string;
}
