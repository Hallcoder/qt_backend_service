import {
    Controller,
    Post,
    Body,
    Param,
    Get,
    UseGuards,
    HttpCode,
    HttpStatus,
    ParseIntPipe,
    NotFoundException,
  } from '@nestjs/common';
  import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
  import { AuthGuard } from '../auth/auth.guard';
import { CommentsService } from './comment.service';
import { CreateCommentDto } from 'src/posts/dto/create-comment.dto';
import { Comment } from 'src/posts/entities/comment.entity';
import { User } from 'src/user/user.decorator';
  
  @ApiTags('comments')
  @Controller('comments')
  export class CommentsController {
    constructor(private readonly commentsService: CommentsService) {}
  
    @Post()
    @UseGuards(AuthGuard)
    @ApiBearerAuth('JWT-auth')
    @ApiOperation({ summary: 'Create a new comment' })
    @ApiResponse({ status: 201, description: 'The comment has been successfully created.', type: Comment })
    @ApiResponse({ status: 400, description: 'Bad Request. Validation errors.' })
    async create(
      @Body() createCommentDto: CreateCommentDto,
      @User() user: any,
    ): Promise<Comment> {
      return this.commentsService.create({ ...createCommentDto, authorId: user.id });
    }
  
    @Get('post/:postId')
    @ApiOperation({ summary: 'Get all comments for a post' })
    @ApiResponse({ status: 200, description: 'List of comments for the post', type: [Comment] })
    @ApiResponse({ status: 404, description: 'Post not found.' })
    async findByPostId(@Param('postId', ParseIntPipe) postId: number): Promise<Comment[]> {
      const comments = await this.commentsService.findByPostId(postId);
      if (!comments) {
        throw new NotFoundException(`No comments found for Post with ID ${postId}`);
      }
      return comments;
    }
  }
  