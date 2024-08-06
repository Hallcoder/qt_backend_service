import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../user/entities/user.entity';  // Adjust the import path accordingly

export class Post {
  @ApiProperty({ description: 'The unique identifier of the post' })
  id: number;

  @ApiProperty({ description: 'The title of the post' })
  title: string;

  @ApiProperty({ description: 'The content of the post' })
  content: string;

  @ApiProperty({ description: 'The ID of the author (user)' })
  authorId: number;

  @ApiProperty({ description: 'The author of the post', type: () => User })
  author: User;  // Include the related user

  @ApiProperty({ description: 'Creation timestamp' })
  createdAt: Date;

  @ApiProperty({ description: 'Last update timestamp' })
  updatedAt: Date;
}
