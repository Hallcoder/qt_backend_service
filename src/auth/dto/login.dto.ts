import { IsEmail, IsString, Max, MaxLength, MinLength } from '@nestjs/class-validator';

export class LoginDTO {
  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(4)
  @MaxLength(16)
  password: string;
}
