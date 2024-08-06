import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsInt } from 'class-validator';

export class CreateCommentDto {
  @ApiProperty({ description: 'The content of the comment' })
  @IsNotEmpty()
  @IsString()
  content: string;

  @ApiProperty({ description: 'The ID of the post' })
  @IsNotEmpty()
  @IsInt()
  postId: number;

  @ApiProperty({ description: 'The ID of the author (user)' })
  @IsNotEmpty()
  @IsInt()
  authorId: number;
}
