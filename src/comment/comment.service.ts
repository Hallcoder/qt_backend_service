import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateCommentDto } from 'src/posts/dto/create-comment.dto';
import { Comment } from 'src/posts/entities/comment.entity';


@Injectable()
export class CommentsService {
  constructor(private readonly prisma: PrismaService) {}

 
  async create(createCommentDto: CreateCommentDto): Promise<any> {
    const { postId, authorId, content } = createCommentDto;

    // Ensure the post exists
    const post = await this.prisma.post.findUnique({
      where: { id: postId },
    });
    if (!post) {
      throw new NotFoundException(`Post with ID ${postId} not found`);
    }

    // Ensure the user exists
    const user = await this.prisma.user.findUnique({
      where: { id: authorId },
    });
    if (!user) {
      throw new NotFoundException(`User with ID ${authorId} not found`);
    }

    return this.prisma.comment.create({
      data: {
        content,
        postId,
        authorId,
      },
      include: {
        author: true,
        post: true,
      },
    });
  }

  async findAll(): Promise<any[]> {
    return this.prisma.comment.findMany({
      include: {
        author: true,
        post: true,
      },
    });
  }
  async findByPostId(postId: number): Promise<any[]> {
    return this.prisma.comment.findMany({ where: { postId } });
  }
}
