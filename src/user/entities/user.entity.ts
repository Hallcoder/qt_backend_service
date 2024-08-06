import { ApiProperty } from '@nestjs/swagger';
import { Post } from '../../posts/entities/post.entity';
import { Comment } from '../../comment/entities/comment.entity';  // Adjust the path as necessary

export class User {
  @ApiProperty({ description: 'The unique identifier of the user' })
  id: number;

  @ApiProperty({ description: 'The username of the user' })
  username: string;

  @ApiProperty({ description: 'The email of the user' })
  email: string;

  @ApiProperty({ description: 'List of posts created by the user', type: () => [Post] })
  posts: Post[];

  @ApiProperty({ description: 'List of comments made by the user', type: () => [Comment] })
  comments: Comment[];
}
