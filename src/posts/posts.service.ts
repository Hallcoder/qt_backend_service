import { Injectable, NotFoundException } from '@nestjs/common';

import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './entities/post.entity';
import { PrismaService } from 'prisma/prisma.service';
import { CreatePostDto } from './dto/create-post-dto';

@Injectable()
export class PostsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createPostDto: CreatePostDto, userId: number): Promise<any> {
    return this.prisma.post.create({
      data: {
        ...createPostDto,
        authorId: userId,
      },
      include: {
        author: true,
      },
    });
  }

  async findAll(): Promise<any[]> {
    return this.prisma.post.findMany({
      include: {
        author: true,
        Comment:true
      },
    });
  }

  async findOne(id: number): Promise<any> {
    return this.prisma.post.findUnique({
      where: { id },
      include: { author: true },
    });
  }

  async update(id: number, updatePostDto: UpdatePostDto): Promise<any> {
    return this.prisma.post.update({
      where: { id },
      data: updatePostDto as any,
      include: { author: true },
    });
  }

  async remove(id: number): Promise<void> {
    await this.prisma.post.delete({
      where: { id },
    });
  }
}
