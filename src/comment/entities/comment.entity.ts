import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../user/entities/user.entity';  // Adjust the path as necessary

export class Comment {
  @ApiProperty({ description: 'The unique identifier of the comment' })
  id: number;

  @ApiProperty({ description: 'The content of the comment' })
  content: string;

  @ApiProperty({ description: 'The ID of the author (user)' })
  authorId: number;

  @ApiProperty({ description: 'The author of the comment', type: () => User })
  author: User;

  @ApiProperty({ description: 'The ID of the related post' })
  postId: number;

  @ApiProperty({ description: 'Creation timestamp' })
  createdAt: Date;

  @ApiProperty({ description: 'Last update timestamp' })
  updatedAt: Date;
}
