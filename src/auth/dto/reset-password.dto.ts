import { IsEmail, IsString, MaxLength, MinLength } from '@nestjs/class-validator';

export class ResetPasswordDTO {
  @IsString()
  @MinLength(4)
  @MaxLength(16)
  newPassword: string;
}
